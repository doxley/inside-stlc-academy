'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Props {
  moduleId: string;
  courseId: string;
  isCompleted: boolean;
}

// Module completion is learner-driven: marking a module complete is what
// advances dashboard progress (alongside practical tasks / portfolio work).
export function MarkCompleteButton({ moduleId, courseId, isCompleted }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function setStatus(status: 'completed' | 'in_progress') {
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setSaving(false);
      return;
    }
    await supabase.from('module_progress').upsert(
      {
        user_id: user.id,
        module_id: moduleId,
        course_id: courseId,
        status,
        completed_at: status === 'completed' ? new Date().toISOString() : null,
      },
      { onConflict: 'user_id,module_id' }
    );
    setSaving(false);
    router.refresh();
  }

  if (isCompleted) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <span className="inline-flex items-center gap-2 text-green-700 font-medium">
          <CheckCircle2 className="w-5 h-5" /> Module complete
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
      {saving ? 'Saving…' : 'Mark as Complete'}
    </button>
  );
}
