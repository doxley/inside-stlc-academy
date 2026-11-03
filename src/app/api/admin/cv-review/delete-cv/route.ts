import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { isAdmin } from '@/lib/access';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Admin-only: permanently delete the customer's uploaded CV file(s) from
// storage. Honours the "we delete your CV after the review" promise and can be
// run at any time.
export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  if (!(await isAdmin(user.id))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  let cvReviewId: string | undefined;
  try {
    ({ cvReviewId } = await req.json());
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
  if (!cvReviewId) return NextResponse.json({ error: 'cvReviewId required' }, { status: 400 });

  const db = createAdminClient();
  const { data: review } = await db
    .from('cv_reviews')
    .select('id, cv_file_path, followup_file_path')
    .eq('id', cvReviewId)
    .maybeSingle();
  if (!review) return NextResponse.json({ error: 'Review not found' }, { status: 404 });

  const toRemove = [review.cv_file_path, review.followup_file_path].filter(Boolean) as string[];
  if (toRemove.length) await db.storage.from('cv-uploads').remove(toRemove);

  await db
    .from('cv_reviews')
    .update({ cv_file_path: null, followup_file_path: null, cv_deleted_at: new Date().toISOString() })
    .eq('id', review.id);

  return NextResponse.json({ ok: true });
}
