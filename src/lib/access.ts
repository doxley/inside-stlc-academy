import { createAdminClient } from '@/lib/supabase/admin';

// ─────────────────────────────────────────────────────────────
// Course access model
//   - Public users: marketing/landing pages only
//   - Logged-in unpaid users: previews only
//   - Paid users: an active `enrolments` row grants module access
//   - Admins: access everything
// Access is represented by an active row in `enrolments`.
// ─────────────────────────────────────────────────────────────

export async function isAdmin(userId: string): Promise<boolean> {
  const db = createAdminClient();
  const { data } = await db.from('profiles').select('role').eq('id', userId).single();
  return data?.role === 'admin';
}

/** True when the user has paid access (active enrolment) to a course, or is an admin. */
export async function hasCourseAccess(userId: string, courseId: string): Promise<boolean> {
  const db = createAdminClient();

  const { data: profile } = await db.from('profiles').select('role').eq('id', userId).single();
  if (profile?.role === 'admin') return true;

  const { data: enrolment } = await db
    .from('enrolments')
    .select('id')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .eq('status', 'active')
    .maybeSingle();

  return Boolean(enrolment);
}

/** Look up a course id by its slug (slug matches the public route). */
export async function getCourseIdBySlug(slug: string): Promise<string | null> {
  const db = createAdminClient();
  const { data } = await db.from('courses').select('id').eq('slug', slug).maybeSingle();
  return data?.id ?? null;
}
