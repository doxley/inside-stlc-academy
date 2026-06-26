import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';
import { getStripe, getSiteUrl } from '@/lib/stripe';
import { getCourseConfig } from '@/lib/courses';

// The Stripe SDK requires the Node.js runtime (not Edge).
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Creates a Stripe Checkout Session for a single course purchase.
// - Logged-in users: their account email is prefilled and their id is
//   attached as client_reference_id so access maps straight to them.
// - Logged-out users: Stripe collects the email; the webhook then
//   creates/matches the account by that email.
//
// The whole handler is wrapped so it ALWAYS responds with JSON — an empty
// body would surface to the client as "Unexpected end of JSON input".
export async function POST(req: Request) {
  try {
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

    let stripe: Stripe;
    try {
      stripe = getStripe();
    } catch {
      return NextResponse.json({ error: 'Payments are not configured' }, { status: 503 });
    }

    // Current user is optional — checkout is allowed when logged out.
    // Never let an auth hiccup crash checkout.
    let userId: string | undefined;
    let userEmail: string | undefined;
    try {
      const supabase = await createClient();
      const { data } = await supabase.auth.getUser();
      userId = data.user?.id;
      userEmail = data.user?.email;
    } catch {
      // proceed as a guest checkout
    }

    const siteUrl = getSiteUrl();

    // Use a pre-created Stripe Price only when it's a real Price ID
    // (price_…). A misconfigured product ID (prod_…) or anything else
    // falls back to an inline price so checkout still works.
    const usePriceId = course.stripePriceId?.startsWith('price_');
    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = usePriceId
      ? { price: course.stripePriceId, quantity: 1 }
      : {
          quantity: 1,
          price_data: {
            currency: course.currency,
            unit_amount: course.amount,
            product_data: { name: course.title },
          },
        };

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [lineItem],
      success_url: `${siteUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/payment/cancelled`,
      client_reference_id: userId,
      customer_email: userEmail,
      metadata: {
        course_slug: course.slug,
        course_title: course.title,
        user_id: userId ?? '',
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Stripe did not return a checkout URL' }, { status: 502 });
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Checkout failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
