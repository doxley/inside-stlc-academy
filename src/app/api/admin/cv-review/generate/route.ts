import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { isAdmin } from '@/lib/access';
import { extractCvContent } from '@/lib/cv/extract';
import { generateCvReview } from '@/lib/cv/review';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300; // AI review can take a while

// Admin-only: generate an AI draft review for a CV. The draft is stored on the
// cv_reviews row and returned; it is NEVER shown to the customer until an admin
// copies/edits it into the delivered fields and approves.
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
    .select('id, cv_file_path, amend_addon, cv_deleted_at')
    .eq('id', cvReviewId)
    .maybeSingle();

  if (!review) return NextResponse.json({ error: 'Review not found' }, { status: 404 });
  if (review.cv_deleted_at) return NextResponse.json({ error: 'The CV for this review has been deleted.' }, { status: 409 });
  if (!review.cv_file_path) return NextResponse.json({ error: 'No CV has been uploaded yet.' }, { status: 409 });

  try {
    const content = await extractCvContent(review.cv_file_path);
    const draft = await generateCvReview(content, { amend: Boolean(review.amend_addon) });

    await db
      .from('cv_reviews')
      .update({
        ai_draft: draft,
        ai_model: draft.model,
        ai_generated_at: draft.generatedAt,
        status: 'in_review',
      })
      .eq('id', review.id);

    return NextResponse.json({ draft });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'AI review failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
