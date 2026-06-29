import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe, getSiteUrl } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendPurchaseConfirmation, sendAdminEnrolmentNotification } from '@/lib/email';

// Stripe must receive the raw request body to verify the signature,
// so this route reads req.text() and never uses a JSON body parser.
// Signature verification needs the Node.js runtime (not Edge).
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid signature';
    return NextResponse.json({ error: `Webhook verification failed: ${message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await fulfilCheckout(event.data.object as Stripe.Checkout.Session);
        break;

      case 'charge.refunded':
        await handleRefund(event.data.object as Stripe.Charge);
        break;

      // One-time payment access is granted at checkout.session.completed.
      // These are acknowledged so Stripe stops retrying; subscriptions
      // (invoice.payment_succeeded) can be handled here if added later.
      case 'payment_intent.succeeded':
      case 'payment_intent.payment_failed':
      case 'invoice.payment_succeeded':
        break;

      default:
        break;
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Handler error';
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

// ─────────────────────────────────────────────────────────────
// Fulfilment: record purchase + grant course access (idempotent).
// ─────────────────────────────────────────────────────────────
async function fulfilCheckout(session: Stripe.Checkout.Session) {
  const db = createAdminClient();

  const slug = session.metadata?.course_slug;
  const email = session.customer_details?.email ?? session.customer_email ?? undefined;
  if (!slug || !email) return;

  // Resolve the course by slug.
  const { data: course } = await db
    .from('courses')
    .select('id, title')
    .eq('slug', slug)
    .maybeSingle();
  if (!course) return;

  // Idempotency — skip if this session was already fulfilled.
  const { data: existing } = await db
    .from('payments')
    .select('id')
    .eq('stripe_session_id', session.id)
    .maybeSingle();
  if (existing) return;

  // Resolve or create the user account by email.
  const userId = await resolveUserId(db, session.client_reference_id, email);
  if (!userId) return;

  const paymentIntentId =
    typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id ?? null;

  // Record the purchase.
  await db.from('payments').insert({
    user_id: userId,
    course_id: course.id,
    provider: 'stripe',
    provider_payment_id: paymentIntentId,
    stripe_session_id: session.id,
    amount: session.amount_total,
    currency: session.currency ?? 'gbp',
    status: 'completed',
  });

  // Grant access — an active enrolment is the access record.
  await db.from('enrolments').upsert(
    {
      user_id: userId,
      course_id: course.id,
      status: 'active',
      enrolled_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,course_id' }
  );

  const siteUrl = getSiteUrl();
  const amountLabel =
    session.amount_total != null
      ? `${(session.currency ?? 'gbp').toUpperCase()} ${(session.amount_total / 100).toFixed(2)}`
      : undefined;

  await Promise.all([
    sendPurchaseConfirmation({
      to: email,
      courseTitle: course.title,
      dashboardUrl: `${siteUrl}/dashboard`,
    }),
    sendAdminEnrolmentNotification({
      studentEmail: email,
      courseTitle: course.title,
      amountLabel,
      adminUrl: `${siteUrl}/admin/purchases`,
    }),
  ]);
}

// ─────────────────────────────────────────────────────────────
// Refund: mark payment refunded and suspend course access.
// ─────────────────────────────────────────────────────────────
async function handleRefund(charge: Stripe.Charge) {
  const db = createAdminClient();
  const paymentIntentId =
    typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id;
  if (!paymentIntentId) return;

  const { data: payment } = await db
    .from('payments')
    .select('id, user_id, course_id')
    .eq('provider_payment_id', paymentIntentId)
    .maybeSingle();
  if (!payment) return;

  await db.from('payments').update({ status: 'refunded' }).eq('id', payment.id);

  await db
    .from('enrolments')
    .update({ status: 'suspended' })
    .eq('user_id', payment.user_id)
    .eq('course_id', payment.course_id);
}

// Find a profile by id (logged-in purchase) or email, creating + inviting
// the user when no account exists yet.
async function resolveUserId(
  db: ReturnType<typeof createAdminClient>,
  clientReferenceId: string | null,
  email: string
): Promise<string | null> {
  if (clientReferenceId) {
    const { data } = await db.from('profiles').select('id').eq('id', clientReferenceId).maybeSingle();
    if (data) return data.id;
  }

  const { data: byEmail } = await db
    .from('profiles')
    .select('id')
    .ilike('email', email)
    .maybeSingle();
  if (byEmail) return byEmail.id;

  // No account yet — create one and send a Supabase invite so they can set a password.
  const { data: invited, error } = await db.auth.admin.inviteUserByEmail(email, {
    data: { role: 'student' },
    redirectTo: `${getSiteUrl()}/update-password`,
  });
  if (error || !invited?.user) return null;
  return invited.user.id;
}
