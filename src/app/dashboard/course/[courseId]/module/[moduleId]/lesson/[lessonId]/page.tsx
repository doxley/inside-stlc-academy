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
import {
  IndustryStoryCard, VisualLearningBlock, WorkedExampleCard, BadGoodExample,
  IndustryTipCard, CommonMistakesCard, MiniChallengeCard, ModelAnswerCard,
  ManagersReviewCard, PortfolioBuilderCard, ResourcePreviewCard,
} from '@/components/module/LessonEnhancements';
import { Clock, Target, Lightbulb, HelpCircle, CheckCircle2, Circle, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import type { Lesson, LessonProgress, Resource, LessonEnhancements } from '@/types';

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
  const e: LessonEnhancements = l.enhancements ?? {};

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
        {l.lesson_overview && (
          <Card>
            <CardHeader><div className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-brand-600" /><CardTitle>Lesson Overview</CardTitle></div></CardHeader>
            <LessonProse content={l.lesson_overview} />
          </Card>
        )}

        {e.industryStory && <IndustryStoryCard story={e.industryStory} />}

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

        {e.visualAid && <VisualLearningBlock visual={e.visualAid} />}

        {l.worked_example && <WorkedExampleCard content={l.worked_example} />}

        {e.badGood && <BadGoodExample data={e.badGood} />}

        {e.davidTip && <IndustryTipCard tip={e.davidTip} />}

        {l.real_world_tip && (
          <div className="flex items-start gap-3 bg-gold-500/10 border border-gold-500/30 rounded-xl p-5">
            <Lightbulb className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 text-sm mb-1">Real Industry Tip</p>
              <div className="text-sm text-gray-700"><LessonProse content={l.real_world_tip} /></div>
            </div>
          </div>
        )}

        {l.common_mistakes && <CommonMistakesCard content={l.common_mistakes} />}

        {e.resourcePreview && <ResourcePreviewCard resource={e.resourcePreview} />}

        {(resources ?? []).length > 0 && (
          <Card>
            <CardHeader><CardTitle>Downloads</CardTitle></CardHeader>
            <ResourceDownloads resources={resources as Resource[]} />
          </Card>
        )}

        {l.exercise && <PracticalTaskCard task={l.exercise} title="Exercise" />}

        {e.miniChallenge && <MiniChallengeCard challenge={e.miniChallenge} />}

        {e.modelAnswer && <ModelAnswerCard answer={e.modelAnswer} />}

        {e.managersReview && <ManagersReviewCard review={e.managersReview} />}

        {e.portfolioBuilder && <PortfolioBuilderCard content={e.portfolioBuilder} />}

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

        {(l.completion_checklist ?? []).length > 0 && (
          <Card>
            <CardHeader><div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-600" /><CardTitle>Completion Checklist</CardTitle></div></CardHeader>
            <ul className="space-y-2">
              {(l.completion_checklist ?? []).map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <Circle className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />{item}
                </li>
              ))}
            </ul>
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
