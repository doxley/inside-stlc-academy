import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getSiteUrl } from '@/lib/stripe';
import { sendStudentFeedbackNotification } from '@/lib/email';
import { getSubmissionStatusLabel } from '@/lib/utils';

export const runtime = 'nodejs';

// Called by an admin after reviewing a submission to notify the learner that
// feedback is ready. Best-effort.
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

    // Only admins may trigger learner feedback notifications.
    const { data: profile } = await db.from('profiles').select('role').eq('id', user.id).maybeSingle();
    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { data: submission } = await db
      .from('assignment_submissions')
      .select('id, status, feedback, assignments(title), profiles(email)')
      .eq('id', submissionId)
      .maybeSingle();
    if (!submission) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const assignment = submission.assignments as { title?: string } | null;
    const student = submission.profiles as { email?: string } | null;
    if (!student?.email) return NextResponse.json({ ok: false });

    await sendStudentFeedbackNotification({
      to: student.email,
      assignmentTitle: assignment?.title ?? 'Assignment',
      statusLabel: getSubmissionStatusLabel(submission.status),
      feedback: submission.feedback ?? undefined,
      dashboardUrl: `${getSiteUrl()}/dashboard`,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
