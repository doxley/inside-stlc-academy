import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getStripe, getSiteUrl } from '@/lib/stripe';
import { getCourseConfig } from '@/lib/courses';

// Creates a Stripe Checkout Session for a single course purchase.
// - Logged-in users: their account email is prefilled and their id is
//   attached as client_reference_id so access maps straight to them.
// - Logged-out users: Stripe collects the email; the webhook then
//   creates/matches the account by that email.
export async function POST(req: Request) {
  let slug: string | undefined;
  try {
    ({ slug } = await req.json());
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!slug) {
    return NextResponse.json({ error: 'Course slug is required' }, { status: 400 });
  }

  const course = getCourseConfig(slug);
  if (!course) {
    return NextResponse.json({ error: 'Unknown course' }, { status: 404 });
  }

  let stripe;
  try {
    stripe = getStripe();
  } catch {
    return NextResponse.json({ error: 'Payments are not configured' }, { status: 503 });
  }

  // Current user is optional — checkout is allowed when logged out.
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const siteUrl = getSiteUrl();

  // Use a pre-created Stripe Price when available, otherwise an inline price.
  const lineItem: import('stripe').Stripe.Checkout.SessionCreateParams.LineItem = course.stripePriceId
    ? { price: course.stripePriceId, quantity: 1 }
    : {
        quantity: 1,
        price_data: {
          currency: course.currency,
          unit_amount: course.amount,
          product_data: { name: course.title },
        },
      };

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [lineItem],
      success_url: `${siteUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/payment/cancelled`,
      client_reference_id: user?.id,
      customer_email: user?.email,
      // email is collected by Stripe when logged out
      metadata: {
        course_slug: course.slug,
        course_title: course.title,
        user_id: user?.id ?? '',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Checkout failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
