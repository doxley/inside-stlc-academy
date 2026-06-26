import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getSiteUrl } from '@/lib/stripe';
import { sendAdminSubmissionNotification } from '@/lib/email';

export const runtime = 'nodejs';

// Called by the student after a successful assignment submission to notify
// the admin. Best-effort: returns ok even if email is unconfigured.
export async function POST(req: Request) {
  try {
    const { submissionId } = await req.json();
    if (!submissionId) {
      return NextResponse.json({ error: 'submissionId required' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

    const db = createAdminClient();
    const { data: submission } = await db
      .from('assignment_submissions')
      .select('id, user_id, assignments(title), profiles(first_name, last_name, email)')
      .eq('id', submissionId)
      .maybeSingle();

    // Only the owner of the submission can trigger its notification.
    if (!submission || submission.user_id !== user.id) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const assignment = submission.assignments as { title?: string } | null;
    const profile = submission.profiles as { first_name?: string; last_name?: string; email?: string } | null;

    await sendAdminSubmissionNotification({
      studentName: `${profile?.first_name ?? ''} ${profile?.last_name ?? ''}`.trim() || 'A learner',
      studentEmail: profile?.email ?? user.email ?? 'unknown',
      assignmentTitle: assignment?.title ?? 'Assignment',
      reviewUrl: `${getSiteUrl()}/admin/assignments?submission=${submissionId}`,
    });

    return NextResponse.json({ ok: true });
  } catch {
    // Never block the submission flow on a notification failure.
    return NextResponse.json({ ok: false });
  }
}
