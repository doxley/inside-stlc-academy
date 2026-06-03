import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { QuizSection } from '@/components/module/QuizSection';
import { AssignmentSection } from '@/components/module/AssignmentSection';
import { ResourceDownloads } from '@/components/module/ResourceDownloads';
import { ModuleStartTracker } from '@/components/module/ModuleStartTracker';
import { Clock, Target, Video, Download, ClipboardList, Upload, CheckCircle2 } from 'lucide-react';
import type { Module, Quiz, Resource, Assignment, AssignmentSubmission, QuizAttempt } from '@/types';

export default async function ModulePage({ params }: { params: Promise<{ courseId: string; moduleId: string }> }) {
  const { courseId, moduleId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const db = createAdminClient();

  const { data: enrolment } = await db.from('enrolments').select('id').eq('user_id', user.id).eq('course_id', courseId).eq('status', 'active').single();
  if (!enrolment) notFound();

  const [{ data: module }, { data: resources }, { data: quiz }, { data: progress }] = await Promise.all([
    db.from('modules').select('*').eq('id', moduleId).single(),
    db.from('resources').select('*').eq('module_id', moduleId).eq('visible_to_students', true).order('sort_order'),
    db.from('quizzes').select('*, quiz_questions(*, quiz_answers(*))').eq('module_id', moduleId).single(),
    db.from('module_progress').select('*').eq('user_id', user.id).eq('module_id', moduleId).single(),
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

      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm font-medium text-brand-600 mb-1">Module {mod.module_number}</p>
            <h1 className="text-2xl font-bold text-gray-900">{mod.title}</h1>
            {mod.description && <p className="text-gray-500 mt-2 max-w-2xl">{mod.description}</p>}
            {mod.estimated_duration && (
              <p className="text-sm text-gray-400 mt-2 flex items-center gap-1.5"><Clock className="w-4 h-4" />{mod.estimated_duration}</p>
            )}
          </div>
          {isCompleted && <Badge variant="green" className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" />Completed</Badge>}
        </div>
      </div>

      <div className="space-y-6">
        {(mod.learning_objectives ?? []).length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2"><Target className="w-5 h-5 text-brand-600" /><CardTitle>Learning Objectives</CardTitle></div>
            </CardHeader>
            <ul className="space-y-2">
              {(mod.learning_objectives ?? []).map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />{obj}
                </li>
              ))}
            </ul>
          </Card>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2"><Video className="w-5 h-5 text-brand-600" /><CardTitle>Video Lesson</CardTitle></div>
          </CardHeader>
          {mod.video_url ? (
            <div className="aspect-video rounded-lg overflow-hidden bg-black">
              <iframe src={mod.video_url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')} className="w-full h-full" allowFullScreen title={mod.title} />
            </div>
          ) : (
            <div className="aspect-video rounded-lg bg-gray-100 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <Video className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p className="text-sm">Video lesson coming soon</p>
              </div>
            </div>
          )}
        </Card>

        {(resources ?? []).length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2"><Download className="w-5 h-5 text-brand-600" /><CardTitle>Downloads</CardTitle></div>
            </CardHeader>
            <ResourceDownloads resources={resources as Resource[]} />
          </Card>
        )}

        {quiz && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><ClipboardList className="w-5 h-5 text-brand-600" /><CardTitle>Module Quiz</CardTitle></div>
                {quizPassed && <Badge variant="green">Passed</Badge>}
              </div>
            </CardHeader>
            <QuizSection quiz={quiz as Quiz} userId={user.id} bestAttempt={bestAttempt} quizPassed={quizPassed} />
          </Card>
        )}

        {assignment && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><Upload className="w-5 h-5 text-brand-600" /><CardTitle>Assignment Submission</CardTitle></div>
                {latestSubmission?.status === 'passed' && <Badge variant="green">Passed</Badge>}
              </div>
            </CardHeader>
            <AssignmentSection assignment={assignment as Assignment} userId={user.id} courseId={courseId} latestSubmission={latestSubmission} allSubmissions={assignmentSubmissions as AssignmentSubmission[]} />
          </Card>
        )}
      </div>
    </div>
  );
}
