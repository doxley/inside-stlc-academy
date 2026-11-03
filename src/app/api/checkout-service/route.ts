import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getStripe, getSiteUrl } from '@/lib/stripe';
import { getServiceConfig, TERMS_VERSION } from '@/lib/services';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Creates a Stripe Checkout Session for a paid service (currently CV Review).
// Two shapes:
//   { service: 'cv-review', express?: boolean, termsAccepted: true }  -> new order
//   { service: 'cv-review-amend', cvReviewId: string, termsAccepted }  -> add-on
export async function POST(req: Request) {
  try {
    let body: { service?: string; express?: boolean; cvReviewId?: string; termsAccepted?: boolean };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    if (!body.termsAccepted) {
      return NextResponse.json({ error: 'You must accept the Terms to continue.' }, { status: 400 });
    }

    let stripe: Stripe;
    try {
      stripe = getStripe();
    } catch {
      return NextResponse.json({ error: 'Payments are not configured' }, { status: 503 });
    }

    // Current user (optional for the base order; required for the add-on).
    let userId: string | undefined;
    let userEmail: string | undefined;
    try {
      const supabase = await createClient();
      const { data } = await supabase.auth.getUser();
      userId = data.user?.id;
      userEmail = data.user?.email;
    } catch {
      /* guest checkout */
    }

    const siteUrl = getSiteUrl();
    const nowIso = new Date().toISOString();

    // ── Amend add-on (purchased after the initial review) ──
    if (body.service === 'cv-review-amend') {
      if (!userId) return NextResponse.json({ error: 'Please log in to buy the amend add-on.' }, { status: 401 });
      if (!body.cvReviewId) return NextResponse.json({ error: 'Missing review reference' }, { status: 400 });

      const db = createAdminClient();
      const { data: review } = await db
        .from('cv_reviews')
        .select('id, user_id, amend_addon')
        .eq('id', body.cvReviewId)
        .maybeSingle();
      if (!review || review.user_id !== userId) {
        return NextResponse.json({ error: 'Review not found' }, { status: 404 });
      }
      if (review.amend_addon) {
        return NextResponse.json({ error: 'The amend add-on is already active on this review.' }, { status: 409 });
      }

      const svc = getServiceConfig('cv-review')!;
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: svc.currency,
              unit_amount: svc.amendAmount,
              product_data: { name: 'CV Review — We Amend It For You' },
            },
          },
        ],
        success_url: `${siteUrl}/dashboard/cv-review/${review.id}?addon=amend`,
        cancel_url: `${siteUrl}/dashboard/cv-review/${review.id}`,
        client_reference_id: userId,
        customer_email: userEmail,
        metadata: {
          service: 'cv-review-amend',
          cv_review_id: review.id,
          user_id: userId,
          terms_accepted_at: nowIso,
          terms_version: TERMS_VERSION,
          product_label: 'CV Review — Amend add-on',
        },
      });

      if (!session.url) return NextResponse.json({ error: 'Stripe did not return a URL' }, { status: 502 });
      return NextResponse.json({ url: session.url });
    }

    // ── New CV review order (base + optional express) ──
    const svc = getServiceConfig(body.service ?? '');
    if (!svc) return NextResponse.json({ error: 'Unknown service' }, { status: 404 });

    const express = Boolean(body.express);
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: svc.currency,
          unit_amount: svc.amount,
          product_data: { name: `${svc.title} — Initial review + 1 follow-up` },
        },
      },
    ];
    if (express) {
      lineItems.push({
        quantity: 1,
        price_data: {
          currency: svc.currency,
          unit_amount: svc.expressAmount,
          product_data: { name: `${svc.title} — Express (${svc.expressHours}h) upgrade` },
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${siteUrl}/services/cv-review/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}${svc.route}`,
      client_reference_id: userId,
      customer_email: userEmail,
      metadata: {
        service: 'cv-review',
        express: express ? 'true' : 'false',
        user_id: userId ?? '',
        terms_accepted_at: nowIso,
        terms_version: TERMS_VERSION,
        product_label: express ? `${svc.title} — Express` : svc.title,
      },
    });

    if (!session.url) return NextResponse.json({ error: 'Stripe did not return a URL' }, { status: 502 });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Checkout failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
