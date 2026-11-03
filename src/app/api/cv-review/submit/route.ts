import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getSiteUrl } from '@/lib/stripe';
import { sendAdminCvSubmissionNotification } from '@/lib/email';
import { CV_REVIEW } from '@/lib/services';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Customer attaches an uploaded CV to their order. The file is uploaded
// client-side to the private `cv-uploads` bucket (own folder via RLS); this
// route records the path and advances the order. Handles both the initial CV
// and the included follow-up (amended) CV.
export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  let body: { cvReviewId?: string; filePath?: string; fileName?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
  const { cvReviewId, filePath, fileName } = body;
  if (!cvReviewId || !filePath || !fileName) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  // Path must live under the caller's own folder.
  if (!filePath.startsWith(`${user.id}/`)) {
    return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
  }

  const db = createAdminClient();
  const { data: review } = await db
    .from('cv_reviews')
    .select('id, user_id, status, express, email')
    .eq('id', cvReviewId)
    .maybeSingle();

  if (!review || review.user_id !== user.id) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 });
  }

  const now = new Date();
  const isFollowUp = review.status === 'delivered';

  if (review.status === 'awaiting_upload') {
    const hours = review.express ? CV_REVIEW.expressHours : CV_REVIEW.turnaroundHours;
    const dueAt = new Date(now.getTime() + hours * 3600 * 1000);
    await db
      .from('cv_reviews')
      .update({
        cv_file_path: filePath,
        cv_file_name: fileName,
        status: 'submitted',
        submitted_at: now.toISOString(),
        due_at: dueAt.toISOString(),
      })
      .eq('id', review.id);
  } else if (isFollowUp) {
    await db
      .from('cv_reviews')
      .update({
        followup_file_path: filePath,
        followup_file_name: fileName,
        status: 'followup_submitted',
        followup_submitted_at: now.toISOString(),
      })
      .eq('id', review.id);
  } else {
    return NextResponse.json({ error: 'This order is not awaiting an upload.' }, { status: 409 });
  }

  await sendAdminCvSubmissionNotification({
    studentEmail: review.email ?? user.email ?? 'unknown',
    express: review.express,
    isFollowUp,
    reviewUrl: `${getSiteUrl()}/admin/cv-reviews/${review.id}`,
  });

  return NextResponse.json({ ok: true, isFollowUp });
}
