import { createAdminClient } from '@/lib/supabase/admin';
import type { Certificate } from '@/types';

// Ensures a certificate row exists for a user+course, issuing it (status
// 'issued' + issued_at) once the learner is eligible (all modules complete).
// Idempotent: safe to call on every dashboard render.
export async function ensureCertificate(
  userId: string,
  courseId: string,
  eligible: boolean
): Promise<Certificate | null> {
  const db = createAdminClient();

  const { data: existing } = await db
    .from('certificates')
    .select('*')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .maybeSingle();

  if (existing) {
    if (eligible && existing.status !== 'issued') {
      const { data } = await db
        .from('certificates')
        .update({ status: 'issued', issued_at: new Date().toISOString() })
        .eq('id', existing.id)
        .select('*')
        .single();
      return (data as Certificate) ?? (existing as Certificate);
    }
    return existing as Certificate;
  }

  const { data } = await db
    .from('certificates')
    .insert({
      user_id: userId,
      course_id: courseId,
      status: eligible ? 'issued' : 'pending',
      issued_at: eligible ? new Date().toISOString() : null,
    })
    .select('*')
    .single();

  return (data as Certificate) ?? null;
}
