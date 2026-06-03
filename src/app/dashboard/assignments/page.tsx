import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Card } from '@/components/ui/Card';
import { formatDate, getSubmissionStatusColour, getSubmissionStatusLabel } from '@/lib/utils';
import { FileText } from 'lucide-react';
import Link from 'next/link';
import type { AssignmentSubmission, Assignment, Module } from '@/types';

export default async function AssignmentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const db = createAdminClient();
  const { data: enrolment } = await db.from('enrolments').select('course_id').eq('user_id', user.id).eq('status', 'active').single();

  if (!enrolment) return <div className="p-8 text-center mt-20"><p className="text-gray-500">No active enrolment.</p></div>;

  const { data: submissions } = await db
    .from('assignment_submissions')
    .select('*, assignments(title, module_id, modules(id, module_number, title, course_id))')
    .eq('user_id', user.id)
    .order('submitted_at', { ascending: false });

  type FullSubmission = AssignmentSubmission & { assignments: Assignment & { modules: Module & { course_id: string } } };
  const typed = (submissions ?? []) as FullSubmission[];

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <FileText className="w-6 h-6 text-brand-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-500 text-sm mt-0.5">Track all your assignment submissions</p>
        </div>
      </div>
      {typed.length === 0 ? (
        <Card className="text-center py-12">
          <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No submissions yet. Complete a module to submit your first assignment.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {typed.map(sub => {
            const mod = sub.assignments?.modules;
            const courseId = mod?.course_id ?? enrolment.course_id;
            return (
              <Card key={sub.id} className="hover:border-brand-200 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {mod && <span className="text-xs font-medium text-brand-600">Module {mod.module_number}</span>}
                    <p className="font-medium text-gray-900">{sub.assignments?.title}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{sub.original_filename}</p>
                    <p className="text-xs text-gray-400 mt-1">Submitted {formatDate(sub.submitted_at)}</p>
                    {sub.feedback && (
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                        <p className="text-xs font-semibold text-blue-800 mb-1">Tutor feedback</p>
                        <p className="text-sm text-blue-900">{sub.feedback}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubmissionStatusColour(sub.status)}`}>
                      {getSubmissionStatusLabel(sub.status)}
                    </span>
                    {mod && <Link href={`/dashboard/course/${courseId}/module/${mod.id}`} className="text-xs text-brand-600 hover:underline">View module →</Link>}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
