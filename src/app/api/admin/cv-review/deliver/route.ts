import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { isAdmin } from '@/lib/access';
import { getSiteUrl } from '@/lib/stripe';
import { sendCvReviewReadyNotification } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Admin-only: deliver the (edited, approved) review to the customer.
//   stage 'initial'  -> delivers score/good/improve/summary (+ amended CV),
//                       then purges the uploaded CV (the follow-up is a fresh
//                       upload, so the original is no longer needed).
//   stage 'followup' -> delivers follow-up notes, completes the order, and
//                       purges the amended-CV file.
export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  if (!(await isAdmin(user.id))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  let b: {
    cvReviewId?: string;
    stage?: 'initial' | 'followup';
    score?: number;
    good?: string;
    improve?: string;
    summary?: string;
    amendedCv?: string;
    followupNotes?: string;
  };
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
  if (!b.cvReviewId) return NextResponse.json({ error: 'cvReviewId required' }, { status: 400 });
  const stage = b.stage ?? 'initial';

  const db = createAdminClient();
  const { data: review } = await db
    .from('cv_reviews')
    .select('id, user_id, email, cv_file_path, followup_file_path, cv_deleted_at')
    .eq('id', b.cvReviewId)
    .maybeSingle();
  if (!review) return NextResponse.json({ error: 'Review not found' }, { status: 404 });

  const now = new Date().toISOString();

  if (stage === 'initial') {
    if (b.score == null || !b.good || !b.improve || !b.summary) {
      return NextResponse.json({ error: 'Score, strengths, improvements and summary are all required.' }, { status: 400 });
    }
    await db
      .from('cv_reviews')
      .update({
        score: Math.max(0, Math.min(100, Math.round(b.score))),
        review_good: b.good,
        review_improve: b.improve,
        review_summary: b.summary,
        amended_cv: b.amendedCv ?? null,
        status: 'delivered',
        delivered_at: now,
      })
      .eq('id', review.id);

    // Purge the original uploaded CV — no longer needed.
    if (review.cv_file_path) {
      await db.storage.from('cv-uploads').remove([review.cv_file_path]);
      await db
        .from('cv_reviews')
        .update({ cv_file_path: null, cv_deleted_at: review.followup_file_path ? null : now })
        .eq('id', review.id);
    }
  } else {
    if (!b.followupNotes) {
      return NextResponse.json({ error: 'Follow-up notes are required.' }, { status: 400 });
    }
    await db
      .from('cv_reviews')
      .update({ followup_notes: b.followupNotes, status: 'completed', completed_at: now })
      .eq('id', review.id);

    // Purge the amended-CV file and mark the order's data deleted.
    const toRemove = [review.cv_file_path, review.followup_file_path].filter(Boolean) as string[];
    if (toRemove.length) await db.storage.from('cv-uploads').remove(toRemove);
    await db
      .from('cv_reviews')
      .update({ cv_file_path: null, followup_file_path: null, cv_deleted_at: now })
      .eq('id', review.id);
  }

  await sendCvReviewReadyNotification({
    to: review.email ?? '',
    isFollowUp: stage === 'followup',
    dashboardUrl: `${getSiteUrl()}/dashboard/cv-review/${review.id}`,
  });

  return NextResponse.json({ ok: true });
}
