'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Props {
  lessonId: string;
  moduleId: string;
  courseId: string;
  isCompleted: boolean;
}

// Marking a lesson complete drives progress. When every lesson in the module
// is complete, the module itself is auto-marked complete (which feeds the
// dashboard % and certificate eligibility).
export function LessonCompleteButton({ lessonId, moduleId, courseId, isCompleted }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function rollUpModule(supabase: ReturnType<typeof createClient>, userId: string) {
    const { data: lessons } = await supabase.from('lessons').select('id').eq('module_id', moduleId);
    const lessonIds = (lessons ?? []).map((l: { id: string }) => l.id);
    if (lessonIds.length === 0) return;

    const { data: completed } = await supabase
      .from('lesson_progress')
      .select('lesson_id')
      .eq('user_id', userId)
      .eq('status', 'completed')
      .in('lesson_id', lessonIds);

    const allDone = (completed ?? []).length >= lessonIds.length;
    await supabase.from('module_progress').upsert(
      {
        user_id: userId,
        module_id: moduleId,
        course_id: courseId,
        status: allDone ? 'completed' : 'in_progress',
        completed_at: allDone ? new Date().toISOString() : null,
      },
      { onConflict: 'user_id,module_id' }
    );
  }

  async function setStatus(status: 'completed' | 'in_progress') {
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setSaving(false);
      return;
    }
    await supabase.from('lesson_progress').upsert(
      {
        user_id: user.id,
        lesson_id: lessonId,
        course_id: courseId,
        status,
        completed_at: status === 'completed' ? new Date().toISOString() : null,
      },
      { onConflict: 'user_id,lesson_id' }
    );
    await rollUpModule(supabase, user.id);
    setSaving(false);
    router.refresh();
  }

  if (isCompleted) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <span className="inline-flex items-center gap-2 text-green-700 font-medium">
          <CheckCircle2 className="w-5 h-5" /> Lesson complete
        </span>
        <button
          onClick={() => setStatus('in_progress')}
          disabled={saving}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Mark as not complete
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setStatus('completed')}
      disabled={saving}
      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-60"
    >
      <CheckCircle2 className="w-5 h-5" />
      {saving ? 'Saving…' : 'Mark Lesson Complete'}
    </button>
  );
}
