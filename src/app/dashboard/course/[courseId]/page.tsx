import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { ChevronRight, Clock, CheckCircle2, Lock, Circle } from 'lucide-react';
import type { Module, ModuleProgress } from '@/types';

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const db = createAdminClient();

  const [{ data: enrolment }, { data: modules }, { data: allProgress }] = await Promise.all([
    db.from('enrolments').select('*, courses(*)').eq('user_id', user.id).eq('course_id', courseId).eq('status', 'active').single(),
    db.from('modules').select('*').eq('course_id', courseId).order('module_number'),
    db.from('module_progress').select('*').eq('user_id', user.id).eq('course_id', courseId),
  ]);

  if (!enrolment) notFound();

  const course = (enrolment as { courses: { id: string; title: string; description: string } }).courses;
  const progressMap = new Map<string, ModuleProgress>((allProgress ?? []).map((p: ModuleProgress) => [p.module_id, p]));
  const completedCount = (allProgress ?? []).filter((p: ModuleProgress) => p.status === 'completed').length;
  const totalCount = (modules ?? []).length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">← Back to dashboard</Link>
        <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
        {course.description && <p className="text-gray-500 mt-2 max-w-2xl">{course.description}</p>}
      </div>

      <Card className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900">Your Progress</h2>
          <span className="text-sm text-gray-500">{completedCount} of {totalCount} modules completed</span>
        </div>
        <ProgressBar value={percent} />
      </Card>

      <div className="space-y-3">
        {(modules ?? []).map((module: Module) => {
          const progress = progressMap.get(module.id);
          const isCompleted = progress?.status === 'completed';
          const isInProgress = progress?.status === 'in_progress';
          const isLocked = module.status === 'coming_soon';
          return (
            <div key={module.id} className={`bg-white border rounded-xl transition-all ${isLocked ? 'opacity-60' : 'hover:border-brand-200 hover:shadow-sm'}`}>
              <div className="flex items-center gap-4 p-5">
                <div className="flex-shrink-0">
                  {isCompleted ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : isLocked ? <Lock className="w-6 h-6 text-gray-300" /> : <Circle className={`w-6 h-6 ${isInProgress ? 'text-brand-400' : 'text-gray-300'}`} />}
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${isCompleted ? 'bg-green-100 text-green-700' : isLocked ? 'bg-gray-100 text-gray-400' : 'bg-brand-100 text-brand-700'}`}>
                  {module.module_number}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{module.title}</p>
                  {module.description && <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{module.description}</p>}
                  {module.estimated_duration && (
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><Clock className="w-3 h-3" />{module.estimated_duration}</p>
                  )}
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {isCompleted && <Badge variant="green">Completed</Badge>}
                  {isInProgress && !isCompleted && <Badge variant="purple">In Progress</Badge>}
                  {!isCompleted && !isInProgress && !isLocked && <Badge variant="gray">Not Started</Badge>}
                  {isLocked && <Badge variant="gray">Coming Soon</Badge>}
                  {!isLocked && (
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
