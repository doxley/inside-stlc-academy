import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { hasCourseAccess } from '@/lib/access';
import { ExamPracticeMode } from '@/components/exam/ExamPracticeMode';
import type { PracticeQuestion, QuestionAttempt, MockExamResult, Course } from '@/types';

export const dynamic = 'force-dynamic';

export default async function ExamPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const allowed = await hasCourseAccess(user.id, courseId);
  if (!allowed) notFound();

  const db = createAdminClient();
  const [{ data: course }, { data: questions }, { data: attempts }, { data: mockResults }] = await Promise.all([
    db.from('courses').select('*').eq('id', courseId).single(),
    db.from('practice_questions').select('*').eq('course_id', courseId).order('module_number', { ascending: true }).order('mock_order', { ascending: true }),
    db.from('question_attempts').select('*').eq('user_id', user.id).eq('course_id', courseId),
    db.from('mock_exam_results').select('*').eq('user_id', user.id).eq('course_id', courseId).order('taken_at', { ascending: false }),
  ]);

  if (!questions || questions.length === 0) {
    return (
      <div className="p-6 lg:p-8 max-w-3xl mx-auto">
        <Link href={`/dashboard/course/${courseId}`} className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">← Back to course</Link>
        <div className="bg-white border rounded-xl p-8 text-center text-gray-500">
          Exam practice questions are not available for this course yet.
        </div>
      </div>
    );
  }

  return (
    <ExamPracticeMode
      courseId={courseId}
      courseTitle={(course as Course)?.title ?? 'Course'}
      userId={user.id}
      questions={questions as PracticeQuestion[]}
      initialAttempts={(attempts ?? []) as QuestionAttempt[]}
      initialMockResults={(mockResults ?? []) as MockExamResult[]}
    />
  );
}
