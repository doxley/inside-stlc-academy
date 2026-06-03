'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Props {
  moduleId: string;
  courseId: string;
  currentStatus: string | undefined;
}

export function ModuleStartTracker({ moduleId, courseId, currentStatus }: Props) {
  useEffect(() => {
    if (currentStatus && currentStatus !== 'not_started') return;

    async function markStarted() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from('module_progress').upsert({
        user_id: user.id,
        module_id: moduleId,
        course_id: courseId,
        status: 'in_progress',
        started_at: new Date().toISOString(),
      }, { onConflict: 'user_id,module_id' });
    }

    markStarted();
  }, [moduleId, courseId, currentStatus]);

  return null;
}
