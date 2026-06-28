import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LessonProse } from '@/components/module/LessonProse';
import { PracticalTaskCard } from '@/components/module/PracticalTaskCard';
import { ResourceDownloads } from '@/components/module/ResourceDownloads';
import { LessonCompleteButton } from '@/components/module/LessonCompleteButton';
import { Clock, Target, Lightbulb, AlertTriangle, HelpCircle, CheckCircle2, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import type { Lesson, LessonProgress, Resource } from '@/types';

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; moduleId: string; lessonId: string }>;
}) {
  const { courseId, moduleId, lessonId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const db = createAdminClient();

  const { data: enrolment } = await db.from('enrolments').select('id').eq('user_id', user.id).eq('course_id', courseId).eq('status', 'active').single();
  if (!enrolment) notFound();

  const [{ data: lesson }, { data: siblings }, { data: progress }, { data: resources }] = await Promise.all([
    db.from('lessons').select('*').eq('id', lessonId).single(),
    db.from('lessons').select('id, lesson_number, title').eq('module_id', moduleId).order('lesson_number'),
    db.from('lesson_progress').select('*').eq('user_id', user.id).eq('lesson_id', lessonId).maybeSingle(),
    db.from('resources').select('*').eq('lesson_id', lessonId).eq('visible_to_students', true).order('sort_order'),
  ]);

  if (!lesson) notFound();
  const l = lesson as Lesson;
  const sibs = (siblings ?? []) as { id: string; lesson_number: number; title: string }[];
  const idx = sibs.findIndex((s) => s.id === lessonId);
  const prev = idx > 0 ? sibs[idx - 1] : null;
  const next = idx >= 0 && idx < sibs.length - 1 ? sibs[idx + 1] : null;
  const isCompleted = (progress as LessonProgress | null)?.status === 'completed';

  const moduleHref = `/dashboard/course/${courseId}/module/${moduleId}`;

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/dashboard" className="hover:text-gray-700">Dashboard</Link>
        <span>/</span>
        <Link href={moduleHref} className="hover:text-gray-700">Module</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Lesson {l.lesson_number}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
        <div>
          <p className="text-sm font-medium text-brand-600 mb-1">Lesson {l.lesson_number}</p>
          <h1 className="text-2xl font-bold text-gray-900">{l.title}</h1>
          {l.estimated_time && (
            <p className="text-sm text-gray-400 mt-2 flex items-center gap-1.5"><Clock className="w-4 h-4" />{l.estimated_time}</p>
          )}
        </div>
        <Badge variant={isCompleted ? 'green' : 'gray'} className="flex items-center gap-1">
          {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}{isCompleted ? 'Completed' : 'In progress'}
        </Badge>
      </div>

      <div className="space-y-6">
        {(l.learning_objectives ?? []).length > 0 && (
          <Card>
            <CardHeader><div className="flex items-center gap-2"><Target className="w-5 h-5 text-brand-600" /><CardTitle>Learning Objectives</CardTitle></div></CardHeader>
            <ul className="space-y-2">
              {(l.learning_objectives ?? []).map((o, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />{o}</li>
              ))}
            </ul>
          </Card>
        )}

        {l.lesson_notes && (
          <Card>
            <CardHeader><div className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-brand-600" /><CardTitle>Lesson</CardTitle></div></CardHeader>
            <LessonProse content={l.lesson_notes} />
          </Card>
        )}

        {l.worked_example && (
          <Card>
            <CardHeader><CardTitle>Worked Example</CardTitle></CardHeader>
            <LessonProse content={l.worked_example} />
          </Card>
        )}

        {l.real_world_tip && (
          <div className="flex items-start gap-3 bg-gold-500/10 border border-gold-500/30 rounded-xl p-5">
            <Lightbulb className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 text-sm mb-1">Real Industry Tip</p>
              <div className="text-sm text-gray-700"><LessonProse content={l.real_world_tip} /></div>
            </div>
          </div>
        )}

        {l.common_mistakes && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-5">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 text-sm mb-1">Common Mistakes</p>
              <div className="text-sm text-gray-700"><LessonProse content={l.common_mistakes} /></div>
            </div>
          </div>
        )}

        {l.exercise && <PracticalTaskCard task={l.exercise} title="Exercise" />}

        {(resources ?? []).length > 0 && (
          <Card>
            <CardHeader><CardTitle>Downloads</CardTitle></CardHeader>
            <ResourceDownloads resources={resources as Resource[]} />
          </Card>
        )}

        {l.reflection_question && (
          <Card>
            <CardHeader><CardTitle>Reflection</CardTitle></CardHeader>
            <LessonProse content={l.reflection_question} />
          </Card>
        )}

        {l.knowledge_check && (
          <Card>
            <CardHeader><div className="flex items-center gap-2"><HelpCircle className="w-5 h-5 text-brand-600" /><CardTitle>Knowledge Check</CardTitle></div></CardHeader>
            <LessonProse content={l.knowledge_check} />
          </Card>
        )}

        {/* Mark complete */}
        <Card>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle2 className="w-4 h-4 text-brand-600" />
              Finished this lesson? Mark it complete to track your progress.
            </div>
            <LessonCompleteButton lessonId={lessonId} moduleId={moduleId} courseId={courseId} isCompleted={isCompleted} />
          </div>
        </Card>

        {/* Prev / next */}
        <div className="flex items-center justify-between gap-4 pt-2">
          {prev ? (
            <Link href={`/dashboard/course/${courseId}/module/${moduleId}/lesson/${prev.id}`} className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-brand-600">
              <ChevronLeft className="w-4 h-4" /> Lesson {prev.lesson_number}
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/dashboard/course/${courseId}/module/${moduleId}/lesson/${next.id}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700">
              Lesson {next.lesson_number} <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link href={moduleHref} className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700">
              Back to module <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
