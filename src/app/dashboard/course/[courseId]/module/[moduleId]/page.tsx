import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { QuizSection } from '@/components/module/QuizSection';
import { AssignmentSection } from '@/components/module/AssignmentSection';
import { ResourceDownloads } from '@/components/module/ResourceDownloads';
import { ResourceDownloadCard } from '@/components/module/ResourceDownloadCard';
import { ModuleStartTracker } from '@/components/module/ModuleStartTracker';
import { GuidedLessonLayout } from '@/components/module/GuidedLessonLayout';
import { PracticalTaskCard } from '@/components/module/PracticalTaskCard';
import { MarkCompleteButton } from '@/components/module/MarkCompleteButton';
import { Download, Upload, HelpCircle, CheckCircle2, Circle } from 'lucide-react';
import type { Module, Quiz, QuizQuestion, QuizAnswer, Resource, Assignment, AssignmentSubmission, QuizAttempt, Course } from '@/types';

export default async function ModulePage({ params }: { params: Promise<{ courseId: string; moduleId: string }> }) {
  const { courseId, moduleId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const db = createAdminClient();

  const { data: enrolment } = await db.from('enrolments').select('id').eq('user_id', user.id).eq('course_id', courseId).eq('status', 'active').single();
  if (!enrolment) notFound();

  const [{ data: module }, { data: course }, { data: resources }, { data: quiz }, { data: progress }, { data: lessons }, { data: lessonProgress }] = await Promise.all([
    db.from('modules').select('*').eq('id', moduleId).single(),
    db.from('courses').select('title').eq('id', courseId).single(),
    db.from('resources').select('*').eq('module_id', moduleId).eq('visible_to_students', true).order('sort_order'),
    db.from('quizzes').select('*, quiz_questions(*, quiz_answers(*))').eq('module_id', moduleId).single(),
    db.from('module_progress').select('*').eq('user_id', user.id).eq('module_id', moduleId).single(),
    db.from('lessons').select('id, lesson_number, title, estimated_time').eq('module_id', moduleId).eq('status', 'published').order('lesson_number'),
    db.from('lesson_progress').select('lesson_id, status').eq('user_id', user.id),
  ]);

  if (!module) notFound();

  if ((module as Module).status === 'coming_soon') {
    return (
      <div className="p-8 max-w-2xl mx-auto mt-20 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Module Coming Soon</h2>
        <p className="text-gray-500 mb-4">This module will be available shortly. Keep up the great work!</p>
        <Link href={`/dashboard/course/${courseId}`} className="text-brand-600 hover:underline text-sm">← Back to course</Link>
      </div>
    );
  }

  const mod = module as Module;
  const courseName = (course as Pick<Course, 'title'> | null)?.title ?? 'Course';

  const [{ data: quizAttempts }, { data: assignment }, { data: submissions }] = await Promise.all([
    quiz ? db.from('quiz_attempts').select('*').eq('quiz_id', (quiz as Quiz).id).eq('user_id', user.id).order('attempted_at', { ascending: false }) : Promise.resolve({ data: [] }),
    db.from('assignments').select('*').eq('module_id', moduleId).single(),
    db.from('assignment_submissions').select('*').eq('user_id', user.id).order('submitted_at', { ascending: false }),
  ]);

  const bestAttempt = (quizAttempts ?? []).find((a: QuizAttempt) => a.passed) ?? (quizAttempts ?? [])[0];
  const quizPassed = bestAttempt?.passed ?? false;
  const assignmentSubmissions = (submissions ?? []).filter((s: AssignmentSubmission) => s.assignment_id === (assignment as Assignment | null)?.id);
  const latestSubmission = assignmentSubmissions[0] as AssignmentSubmission | undefined;
  const isCompleted = progress?.status === 'completed';

  // Fall back to legacy fields so existing modules still read well.
  const lessonOverview = mod.lesson_overview ?? mod.description;
  const guidedNotes = mod.guided_notes
    ?? ((mod.learning_objectives ?? []).length
        ? `## What you'll learn\n${(mod.learning_objectives ?? []).map((o) => `- ${o}`).join('\n')}`
        : null);

  const checklist = mod.completion_checklist ?? [];

  // Lessons (Module → Lessons). When a module has lessons, the lesson pages
  // carry the learning content and completion; the module completes via roll-up.
  const lessonList = (lessons ?? []) as { id: string; lesson_number: number; title: string; estimated_time: string | null }[];
  const completedLessonIds = new Set(
    (lessonProgress ?? []).filter((p: { status: string }) => p.status === 'completed').map((p: { lesson_id: string }) => p.lesson_id)
  );
  const hasLessons = lessonList.length > 0;

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <ModuleStartTracker moduleId={moduleId} courseId={courseId} currentStatus={progress?.status} />

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/dashboard" className="hover:text-gray-700">Dashboard</Link>
        <span>/</span>
        <Link href={`/dashboard/course/${courseId}`} className="hover:text-gray-700">Course</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Module {mod.module_number}</span>
      </div>

      {/* Sections 1–3 (header, overview, guided notes) + dynamic sections below */}
      <GuidedLessonLayout
        moduleNumber={mod.module_number}
        title={mod.title}
        courseName={courseName}
        estimatedTime={mod.estimated_duration}
        isCompleted={isCompleted}
        lessonOverview={lessonOverview}
        guidedNotes={guidedNotes}
      >
        {/* Lessons in this module */}
        {hasLessons && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Lessons</CardTitle>
                <span className="text-sm text-gray-500">{completedLessonIds.size} / {lessonList.length} complete</span>
              </div>
            </CardHeader>
            <div className="space-y-2">
              {lessonList.map((ls) => {
                const done = completedLessonIds.has(ls.id);
                return (
                  <Link
                    key={ls.id}
                    href={`/dashboard/course/${courseId}/module/${moduleId}/lesson/${ls.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-brand-200 hover:bg-brand-50 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${done ? 'bg-green-100 text-green-700' : 'bg-brand-100 text-brand-700'}`}>
                      {done ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{ls.lesson_number}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">Lesson {ls.lesson_number}: {ls.title}</p>
                      {ls.estimated_time && <p className="text-xs text-gray-400">{ls.estimated_time}</p>}
                    </div>
                    <Circle className={`w-2 h-2 ${done ? 'text-green-500 fill-green-500' : 'text-gray-300'}`} />
                  </Link>
                );
              })}
            </div>
          </Card>
        )}

        {/* Optional video — disabled by default. Video support may be added
            later, but no video UI renders unless a module has a real
            video_url value (never an empty placeholder). */}
        {mod.video_url && (
          <Card>
            <div className="aspect-video rounded-lg overflow-hidden bg-black">
              <iframe
                src={mod.video_url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                className="w-full h-full"
                allowFullScreen
                title={mod.title}
              />
            </div>
          </Card>
        )}

        {/* 4. Practical Activity */}
        {mod.practical_task && <PracticalTaskCard task={mod.practical_task} />}

        {assignment && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><Upload className="w-5 h-5 text-brand-600" /><CardTitle>Practical Task — Submission</CardTitle></div>
                {latestSubmission?.status === 'passed' && <Badge variant="green">Passed</Badge>}
              </div>
            </CardHeader>
            <AssignmentSection assignment={assignment as Assignment} userId={user.id} courseId={courseId} latestSubmission={latestSubmission} allSubmissions={assignmentSubmissions as AssignmentSubmission[]} />
          </Card>
        )}

        {/* 5. Resources */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2"><Download className="w-5 h-5 text-brand-600" /><CardTitle>Resources</CardTitle></div>
          </CardHeader>
          {(resources ?? []).length > 0 && <ResourceDownloads resources={resources as Resource[]} />}
          <div className="mt-3">
            <ResourceDownloadCard
              title="Resource Library"
              description="All templates, prompts, checklists and downloads for your courses"
              href="/dashboard/resources"
            />
          </div>
        </Card>

        {/* 6. Reflection / Knowledge Check */}
        {(mod.reflection_question || checklist.length > 0 || quiz) && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><HelpCircle className="w-5 h-5 text-brand-600" /><CardTitle>Reflection &amp; Knowledge Check</CardTitle></div>
                {quizPassed && <Badge variant="green">Passed</Badge>}
              </div>
            </CardHeader>

            {mod.reflection_question && (
              <p className="text-sm text-gray-700 leading-relaxed mb-4">{mod.reflection_question}</p>
            )}

            {checklist.length > 0 && (
              <ul className="space-y-2 mb-4">
                {checklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <Circle className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            )}

            {quiz && (
              <QuizSection quiz={quiz as Quiz & { quiz_questions: (QuizQuestion & { quiz_answers: QuizAnswer[] })[] }} userId={user.id} bestAttempt={bestAttempt} quizPassed={quizPassed} />
            )}
          </Card>
        )}

        {/* 7. Mark as Complete — only for modules without discrete lessons.
            With lessons, the module completes automatically once every lesson
            is marked complete. */}
        {!hasLessons && (
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CheckCircle2 className="w-4 h-4 text-brand-600" />
                Finished this module? Mark it complete to track your progress.
              </div>
              <MarkCompleteButton moduleId={moduleId} courseId={courseId} isCompleted={isCompleted} />
            </div>
          </Card>
        )}
      </GuidedLessonLayout>
    </div>
  );
}
