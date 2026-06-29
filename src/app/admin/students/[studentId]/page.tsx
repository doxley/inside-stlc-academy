import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { EnrolStudentForm } from '@/components/admin/EnrolStudentForm';
import { ResendInviteButton } from '@/components/admin/ResendInviteButton';
import { formatDate, getSubmissionStatusColour, getSubmissionStatusLabel } from '@/lib/utils';
import { ArrowLeft, User, BookOpen } from 'lucide-react';
import { ManualUnlockButton } from '@/components/admin/ManualUnlockButton';
import { isModuleUnlocked } from '@/lib/drip';
import type { Course, Enrolment, ModuleUnlock } from '@/types';
import type { Module, ModuleProgress, AssignmentSubmission, Assignment } from '@/types';

export default async function StudentDetailPage({ params }: { params: Promise<{ studentId: string }> }) {
  const { studentId } = await params;
  const db = createAdminClient();

  const [{ data: student }, { data: enrolmentsData }, { data: courses }] = await Promise.all([
    db.from('profiles').select('*').eq('id', studentId).eq('role', 'student').single(),
    db.from('enrolments').select('*, courses(*)').eq('user_id', studentId).eq('status', 'active').order('enrolled_at'),
    db.from('courses').select('id, title').eq('status', 'published').order('title'),
  ]);

  if (!student) notFound();

  // A student can have several active enrolments. The detailed progress view
  // below shows the first (earliest) enrolment; all are listed in the summary.
  const enrolments = (enrolmentsData ?? []) as (Enrolment & { courses: Course })[];
  const enrolment = enrolments[0] ?? null;
  const allCourses = (courses ?? []) as { id: string; title: string }[];
  const enrolledIds = new Set(enrolments.map((e) => e.courses?.id).filter(Boolean));
  const availableCourses = allCourses.filter((c) => !enrolledIds.has(c.id));

  let modules: Module[] = [];
  let progressList: ModuleProgress[] = [];
  let submissions: (AssignmentSubmission & { assignments: Assignment })[] = [];
  let manualUnlockIds: string[] = [];

  if (enrolment) {
    const course = (enrolment as { courses: { id: string } }).courses;
    const [{ data: mods }, { data: prog }, { data: subs }, { data: unlocks }] = await Promise.all([
      db.from('modules').select('*').eq('course_id', course.id).order('module_number'),
      db.from('module_progress').select('*').eq('user_id', studentId).eq('course_id', course.id),
      db.from('assignment_submissions').select('*, assignments(title, module_id)').eq('user_id', studentId).order('submitted_at', { ascending: false }),
      db.from('module_unlocks').select('module_id').eq('user_id', studentId),
    ]);
    modules = (mods ?? []) as Module[];
    progressList = (prog ?? []) as ModuleProgress[];
    submissions = (subs ?? []) as (AssignmentSubmission & { assignments: Assignment })[];
    manualUnlockIds = (unlocks ?? []).map((u: { module_id: string }) => u.module_id);
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
            <div className="mt-3">
              <ResendInviteButton email={student.email} />
            </div>
          </div>
        </div>
        <EnrolStudentForm studentId={studentId} courses={availableCourses} />
      </div>

      {/* Enrolled courses summary */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-brand-600" /><CardTitle>Enrolled courses</CardTitle></div>
        </CardHeader>
        {enrolments.length === 0 ? (
          <p className="text-sm text-gray-400">Not enrolled in any course yet.</p>
        ) : (
          <div className="space-y-2">
            {enrolments.map((e) => (
              <div key={e.id} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                <span className="text-sm font-medium text-gray-800">{e.courses?.title}</span>
                <span className="text-xs text-gray-400">Enrolled {formatDate(e.enrolled_at)}</span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {enrolment ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Progress — {enrolment.courses?.title}</CardTitle>
                <span className="text-sm text-gray-500">{completedCount}/{modules.length} modules</span>
              </div>
            </CardHeader>
            <ProgressBar value={percent} className="mb-6" />
            <div className="space-y-2">
              {modules.map(mod => {
                const prog = progressMap.get(mod.id);
                const status = prog?.status ?? 'not_started';
                const alreadyUnlocked = manualUnlockIds.includes(mod.id);
                return (
                  <div key={mod.id} className="flex items-center gap-3 py-1">
                    <span className="w-6 h-6 rounded-full bg-gray-100 text-xs flex items-center justify-center text-gray-500 font-medium flex-shrink-0">{mod.module_number}</span>
                    <span className="flex-1 text-sm text-gray-700">{mod.title}</span>
                    <Badge variant={status === 'completed' ? 'green' : status === 'in_progress' ? 'purple' : 'gray'}>
                      {status === 'completed' ? 'Completed' : status === 'in_progress' ? 'In Progress' : 'Not Started'}
                    </Badge>
                    {prog?.completed_at && <span className="text-xs text-gray-400">{formatDate(prog.completed_at)}</span>}
                    {status === 'not_started' && (
                      <ManualUnlockButton studentId={studentId} moduleId={mod.id} moduleName={mod.title} alreadyUnlocked={alreadyUnlocked} />
                    )}
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
