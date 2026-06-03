import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { getSubmissionStatusColour, getSubmissionStatusLabel } from '@/lib/utils';
import { BookOpen, ChevronRight, Award, FileText, MessageCircle } from 'lucide-react';
import type { Module, ModuleProgress, AssignmentSubmission, Assignment, Certificate } from '@/types';

type ModuleStatusVariant = 'green' | 'purple' | 'blue' | 'gray';
function moduleStatusBadge(status: string): { label: string; variant: ModuleStatusVariant } {
  const map: Record<string, { label: string; variant: ModuleStatusVariant }> = {
    completed:   { label: 'Completed',   variant: 'green'  },
    in_progress: { label: 'In Progress', variant: 'purple' },
    not_started: { label: 'Not Started', variant: 'gray'   },
  };
  return map[status] ?? { label: 'Locked', variant: 'gray' };
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const db = createAdminClient();

  const [{ data: profile }, { data: enrolment }] = await Promise.all([
    db.from('profiles').select('*').eq('id', user.id).single(),
    db.from('enrolments').select('*, courses(*)').eq('user_id', user.id).eq('status', 'active').single(),
  ]);

  if (!enrolment) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center mt-20">
        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">No active enrolment</h2>
        <p className="text-gray-500 mb-4">You are not currently enrolled in any course. Please contact us to get started.</p>
        <a href="mailto:support@insidestlc.com" className="bg-brand-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors inline-block">
          Contact support
        </a>
      </div>
    );
  }

  const course = (enrolment as { courses: { id: string; title: string } }).courses;

  const [{ data: modules }, { data: allProgress }, { data: recentSubmissions }, { data: certificate }] = await Promise.all([
    db.from('modules').select('*').eq('course_id', course.id).order('module_number'),
    db.from('module_progress').select('*').eq('user_id', user.id).eq('course_id', course.id),
    db.from('assignment_submissions').select('*, assignments(title, module_id)').eq('user_id', user.id).order('submitted_at', { ascending: false }).limit(5),
    db.from('certificates').select('*').eq('user_id', user.id).eq('course_id', course.id).single(),
  ]);

  const progressMap = new Map<string, ModuleProgress>((allProgress ?? []).map((p: ModuleProgress) => [p.module_id, p]));
  const completedModules = (allProgress ?? []).filter((p: ModuleProgress) => p.status === 'completed').length;
  const totalModules = (modules ?? []).length;
  const progressPercent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
  const currentModule = (modules ?? []).find((m: Module) => { const p = progressMap.get(m.id); return !p || p.status !== 'completed'; });
  const firstName = profile?.first_name ?? 'Student';

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {firstName} 👋</h1>
        <p className="text-gray-500 mt-1">{course.title}</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Card className="col-span-full sm:col-span-2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Overall Progress</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{progressPercent}%</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Modules completed</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">{completedModules} / {totalModules}</p>
            </div>
          </div>
          <ProgressBar value={progressPercent} showPercent={false} />
          {currentModule && (
            <div className="mt-4 p-3 bg-brand-50 rounded-lg border border-brand-100">
              <p className="text-xs text-brand-600 font-medium uppercase tracking-wide mb-1">Next step</p>
              <p className="text-sm font-medium text-brand-900">Module {currentModule.module_number} – {currentModule.title}</p>
              <Link href={`/dashboard/course/${course.id}/module/${currentModule.id}`} className="text-xs text-brand-600 font-medium hover:underline mt-1 inline-flex items-center gap-1">
                Continue <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-brand-600" />
            <h3 className="font-semibold text-gray-900">Certificate</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Modules</span>
              <span className="font-medium">{completedModules}/{totalModules}</span>
            </div>
          </div>
          {(certificate as Certificate | null)?.status === 'issued' ? (
            <div className="mt-4 p-2 bg-green-50 rounded-lg text-center"><p className="text-xs font-medium text-green-700">Certificate earned!</p></div>
          ) : (
            <div className="mt-4 p-2 bg-gray-50 rounded-lg text-center"><p className="text-xs text-gray-500">Complete all modules to earn your certificate</p></div>
          )}
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Course Modules</h2>
            <Link href={`/dashboard/course/${course.id}`} className="text-sm text-brand-600 hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {(modules ?? []).map((module: Module) => {
              const progress = progressMap.get(module.id);
              const progressStatus = progress?.status ?? 'not_started';
              const isLocked = module.status === 'coming_soon';
              const badge = moduleStatusBadge(isLocked ? 'locked' : progressStatus);
              return (
                <div key={module.id} className={`flex items-center gap-4 bg-white border rounded-xl p-4 transition-colors ${isLocked ? 'opacity-60' : 'hover:border-brand-200 hover:shadow-sm'}`}>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${progressStatus === 'completed' ? 'bg-green-100 text-green-700' : isLocked ? 'bg-gray-100 text-gray-400' : 'bg-brand-100 text-brand-700'}`}>
                    {module.module_number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{module.title}</p>
                    {module.estimated_duration && <p className="text-xs text-gray-400 mt-0.5">{module.estimated_duration}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={isLocked ? 'gray' : badge.variant}>{isLocked ? 'Coming Soon' : badge.label}</Badge>
                    {!isLocked && (
                      <Link href={`/dashboard/course/${course.id}/module/${module.id}`}>
                        <ChevronRight className="w-4 h-4 text-gray-400 hover:text-brand-600" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-brand-600" />
              <h3 className="font-semibold text-gray-900 text-sm">Recent Submissions</h3>
            </div>
            {(recentSubmissions ?? []).length === 0 ? (
              <p className="text-xs text-gray-400">No submissions yet.</p>
            ) : (
              <div className="space-y-3">
                {(recentSubmissions as (AssignmentSubmission & { assignments: Assignment })[]).map(sub => (
                  <div key={sub.id} className="text-xs">
                    <p className="font-medium text-gray-700 truncate">{sub.assignments?.title}</p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${getSubmissionStatusColour(sub.status)}`}>
                      {getSubmissionStatusLabel(sub.status)}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <Link href="/dashboard/assignments" className="text-xs text-brand-600 hover:underline mt-3 block">View all assignments →</Link>
          </Card>

          <Card className="bg-brand-50 border-brand-100">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="w-4 h-4 text-brand-600" />
              <h3 className="font-semibold text-brand-900 text-sm">Need help?</h3>
            </div>
            <p className="text-xs text-brand-700 mb-3">Contact Inside STLC if you have any questions about the course.</p>
            <a href="mailto:support@insidestlc.com" className="text-xs bg-brand-600 text-white px-3 py-1.5 rounded-lg inline-block hover:bg-brand-700 transition-colors">Contact support</a>
          </Card>
        </div>
      </div>
    </div>
  );
}
