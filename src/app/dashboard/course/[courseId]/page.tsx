import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { ChevronRight, Clock, CheckCircle2, Lock, Circle, Calendar, GraduationCap } from 'lucide-react';
import { isModuleUnlocked, getModuleUnlockDate, formatUnlockDate, isModuleGatingComplete } from '@/lib/drip';
import type { Module, ModuleProgress, Course, Enrolment } from '@/types';

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const db = createAdminClient();

  const [{ data: enrolment }, { data: modules }, { data: allProgress }, { data: course }, { data: unlocks }, { count: questionCount }, { data: courseAssignments }, { data: courseQuizzes }, { data: passedSubs }, { data: passedAttempts }] =
    await Promise.all([
      db.from('enrolments').select('*, courses(*)').eq('user_id', user.id).eq('course_id', courseId).eq('status', 'active').single(),
      db.from('modules').select('*').eq('course_id', courseId).order('module_number'),
      db.from('module_progress').select('*').eq('user_id', user.id).eq('course_id', courseId),
      db.from('courses').select('*').eq('id', courseId).single(),
      db.from('module_unlocks').select('module_id').eq('user_id', user.id),
      db.from('practice_questions').select('id', { count: 'exact', head: true }).eq('course_id', courseId),
      db.from('assignments').select('id, module_id, modules!inner(course_id)').eq('modules.course_id', courseId),
      db.from('quizzes').select('id, module_id, modules!inner(course_id)').eq('modules.course_id', courseId),
      db.from('assignment_submissions').select('assignment_id').eq('user_id', user.id).eq('status', 'passed'),
      db.from('quiz_attempts').select('quiz_id').eq('user_id', user.id).eq('passed', true),
    ]);

  if (!enrolment) notFound();

  const c = course as Course;
  const enr = enrolment as unknown as Enrolment;
  const manualUnlockIds = (unlocks ?? []).map((u: { module_id: string }) => u.module_id);

  const progressMap = new Map<string, ModuleProgress>((allProgress ?? []).map((p: ModuleProgress) => [p.module_id, p]));

  // Completion-gating inputs: which module has which assignment/quiz, and
  // which the student has already passed.
  const assignmentByModule = new Map<string, string>((courseAssignments ?? []).map((a: { id: string; module_id: string }) => [a.module_id, a.id]));
  const quizByModule = new Map<string, string>((courseQuizzes ?? []).map((q: { id: string; module_id: string }) => [q.module_id, q.id]));
  const passedAssignmentIds = new Set<string>((passedSubs ?? []).map((s: { assignment_id: string }) => s.assignment_id));
  const passedQuizIds = new Set<string>((passedAttempts ?? []).map((a: { quiz_id: string }) => a.quiz_id));
  const gatingComplete = (m: Module) => isModuleGatingComplete({
    assignmentId: assignmentByModule.get(m.id) ?? null,
    quizId: quizByModule.get(m.id) ?? null,
    passedAssignmentIds,
    passedQuizIds,
    moduleProgressStatus: progressMap.get(m.id)?.status ?? null,
  });

  const completedCount = (allProgress ?? []).filter((p: ModuleProgress) => p.status === 'completed').length;
  const totalCount = (modules ?? []).length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">← Back to dashboard</Link>
        <h1 className="text-2xl font-bold text-gray-900">{c.title}</h1>
        {c.description && <p className="text-gray-500 mt-2 max-w-2xl">{c.description}</p>}
      </div>

      <Card className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900">Your Progress</h2>
          <span className="text-sm text-gray-500">{completedCount} of {totalCount} modules completed</span>
        </div>
        <ProgressBar value={percent} />
      </Card>

      {(questionCount ?? 0) > 0 && (
        <Link href={`/dashboard/course/${courseId}/exam`} className="block mb-8">
          <div className="flex items-center gap-4 bg-navy-900 text-white rounded-xl p-5 hover:opacity-95 transition-opacity">
            <div className="w-11 h-11 flex-shrink-0 bg-gold-500/20 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-gold-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold">Exam Practice Mode</p>
              <p className="text-sm text-gray-300">{questionCount} practice questions, topic quizzes, timed mock exams and a weak-area tracker.</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
          </div>
        </Link>
      )}

      <div className="space-y-3">
        {(modules ?? []).map((module: Module, idx: number, arr: Module[]) => {
          const progress = progressMap.get(module.id);
          const isCompleted = progress?.status === 'completed';
          const isInProgress = progress?.status === 'in_progress';
          const prevModule = idx > 0 ? arr[idx - 1] : null;
          const previousComplete = prevModule ? gatingComplete(prevModule) : true;
          const unlocked = isModuleUnlocked(module, enr, c.drip_enabled ?? false, manualUnlockIds, c.completion_gating ?? false, previousComplete);
          const unlockDate = !unlocked && c.drip_enabled ? getModuleUnlockDate(module, enr) : null;
          // Locked specifically because the previous module isn't finished.
          const gatedOnPrevious = !unlocked && (c.completion_gating ?? false) && !!prevModule && !previousComplete && !manualUnlockIds.includes(module.id);

          return (
            <div key={module.id} className={`bg-white border rounded-xl transition-all ${!unlocked ? 'opacity-70' : 'hover:border-brand-200 hover:shadow-sm'}`}>
              <div className="flex items-center gap-4 p-5">
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : !unlocked ? (
                    <Lock className="w-6 h-6 text-gray-300" />
                  ) : (
                    <Circle className={`w-6 h-6 ${isInProgress ? 'text-brand-400' : 'text-gray-300'}`} />
                  )}
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${isCompleted ? 'bg-green-100 text-green-700' : !unlocked ? 'bg-gray-100 text-gray-400' : 'bg-brand-100 text-brand-700'}`}>
                  {module.module_number}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{module.title}</p>
                  {module.description && <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{module.description}</p>}
                  <div className="flex items-center gap-3 mt-1">
                    {module.estimated_duration && (
                      <p className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{module.estimated_duration}</p>
                    )}
                    {gatedOnPrevious ? (
                      <p className="text-xs text-gray-400 flex items-center gap-1"><Lock className="w-3 h-3" />Complete Module {prevModule?.module_number} to unlock</p>
                    ) : unlockDate && (
                      <p className="text-xs text-gray-400 flex items-center gap-1"><Calendar className="w-3 h-3" />{formatUnlockDate(unlockDate)}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {isCompleted && <Badge variant="green">Completed</Badge>}
                  {isInProgress && !isCompleted && <Badge variant="purple">In Progress</Badge>}
                  {!isCompleted && !isInProgress && unlocked && <Badge variant="gray">Not Started</Badge>}
                  {!unlocked && <Badge variant="gray">Locked</Badge>}
                  {unlocked && (
                    <Link href={`/dashboard/course/${courseId}/module/${module.id}`}>
                      <ChevronRight className="w-5 h-5 text-gray-400 hover:text-brand-600" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
