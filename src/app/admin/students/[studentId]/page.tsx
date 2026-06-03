import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { EnrolStudentForm } from '@/components/admin/EnrolStudentForm';
import { formatDate, getSubmissionStatusColour, getSubmissionStatusLabel } from '@/lib/utils';
import { ArrowLeft, User } from 'lucide-react';
import type { Module, ModuleProgress, AssignmentSubmission, Assignment } from '@/types';

export default async function StudentDetailPage({ params }: { params: Promise<{ studentId: string }> }) {
  const { studentId } = await params;
  const db = createAdminClient();

  const [{ data: student }, { data: enrolment }, { data: courses }] = await Promise.all([
    db.from('profiles').select('*').eq('id', studentId).eq('role', 'student').single(),
    db.from('enrolments').select('*, courses(*)').eq('user_id', studentId).eq('status', 'active').single(),
    db.from('courses').select('id, title').eq('status', 'published'),
  ]);

  if (!student) notFound();

  let modules: Module[] = [];
  let progressList: ModuleProgress[] = [];
  let submissions: (AssignmentSubmission & { assignments: Assignment })[] = [];

  if (enrolment) {
    const course = (enrolment as { courses: { id: string } }).courses;
    const [{ data: mods }, { data: prog }, { data: subs }] = await Promise.all([
      db.from('modules').select('*').eq('course_id', course.id).order('module_number'),
      db.from('module_progress').select('*').eq('user_id', studentId).eq('course_id', course.id),
      db.from('assignment_submissions').select('*, assignments(title, module_id)').eq('user_id', studentId).order('submitted_at', { ascending: false }),
    ]);
    modules = (mods ?? []) as Module[];
    progressList = (prog ?? []) as ModuleProgress[];
    submissions = (subs ?? []) as (AssignmentSubmission & { assignments: Assignment })[];
  }

  const progressMap = new Map(progressList.map(p => [p.module_id, p]));
  const completedCount = progressList.filter(p => p.status === 'completed').length;
  const percent = modules.length > 0 ? Math.round((completedCount / modules.length) * 100) : 0;

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <Link href="/admin/students" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to students
      </Link>

      <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-brand-100 rounded-full flex items-center justify-center">
            <User className="w-7 h-7 text-brand-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{student.first_name} {student.last_name}</h1>
            <p className="text-gray-500">{student.email}</p>
            <p className="text-xs text-gray-400 mt-0.5">Joined {formatDate(student.created_at)}</p>
          </div>
        </div>
        {!enrolment && (
          <EnrolStudentForm studentId={studentId} courses={(courses ?? []) as { id: string; title: string }[]} />
        )}
      </div>

      {enrolment ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Course Progress</CardTitle>
                <span className="text-sm text-gray-500">{completedCount}/{modules.length} modules</span>
              </div>
            </CardHeader>
            <ProgressBar value={percent} className="mb-6" />
            <div className="space-y-2">
              {modules.map(mod => {
                const prog = progressMap.get(mod.id);
                const status = prog?.status ?? 'not_started';
                return (
                  <div key={mod.id} className="flex items-center gap-3 py-1">
                    <span className="w-6 h-6 rounded-full bg-gray-100 text-xs flex items-center justify-center text-gray-500 font-medium flex-shrink-0">{mod.module_number}</span>
                    <span className="flex-1 text-sm text-gray-700">{mod.title}</span>
                    <Badge variant={status === 'completed' ? 'green' : status === 'in_progress' ? 'purple' : 'gray'}>
                      {status === 'completed' ? 'Completed' : status === 'in_progress' ? 'In Progress' : 'Not Started'}
                    </Badge>
                    {prog?.completed_at && <span className="text-xs text-gray-400">{formatDate(prog.completed_at)}</span>}
                  </div>
                );
              })}
            </div>
          </Card>

          <Card>
            <CardHeader><CardTitle>Assignment Submissions</CardTitle></CardHeader>
            {submissions.length === 0 ? (
              <p className="text-sm text-gray-400">No submissions yet.</p>
            ) : (
              <div className="space-y-3">
                {submissions.map(sub => (
                  <div key={sub.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{sub.assignments?.title}</p>
                      <p className="text-xs text-gray-500">{sub.original_filename} · {formatDate(sub.submitted_at)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getSubmissionStatusColour(sub.status)}`}>
                        {getSubmissionStatusLabel(sub.status)}
                      </span>
                      <Link href={`/admin/assignments?submission=${sub.id}`} className="text-xs text-brand-600 hover:underline">Review</Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      ) : (
        <Card className="text-center py-12">
          <p className="text-gray-500">This student is not enrolled in any course.</p>
        </Card>
      )}
    </div>
  );
}
