# Payment Migration Plan — Inside STLC Academy

This plan covers moving course sales from the Ionis shop to direct
Stripe Checkout on the Academy website.

## Overview

- **Provider:** Stripe Checkout (one-time payments)
- **Access model:** a paid purchase creates an active row in `enrolments`,
  which is what unlocks course modules in the dashboard.
- **Source of truth for prices:** `src/lib/courses.ts`
- **Webhook fulfilment:** `src/app/api/stripe/webhook/route.ts`

Courses sold:

| Course | Slug | Price |
| --- | --- | --- |
| 90-Day Software Testing Career Roadmap | `90-day-software-testing-career-roadmap` | £99 |
| AI for QA Testers | `ai-for-qa-testers` | £99 |
| QA Interview Accelerator | `qa-interview-accelerator` | £49 |

---

## 1. Stripe account setup

1. Create / log in to a Stripe account at https://stripe.com.
2. Go to **Developers → API keys** and copy:
   - **Secret key** → `STRIPE_SECRET_KEY`
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Use **test mode** keys first (`sk_test_…`, `pk_test_…`). Switch to live
   keys only after the testing checklist passes.

## 2. Product and price setup

You can run with **inline prices** (no setup needed — amounts come from
`src/lib/courses.ts`), but for production create real Products/Prices:

1. **Products → Add product** for each course (name = course title).
2. Add a **one-time price** in GBP:
   - 90-Day Roadmap → £99.00
   - AI for QA Testers → £99.00
   - QA Interview Accelerator → £49.00
3. Copy each **Price ID** (`price_…`) into env vars:
   - `STRIPE_PRICE_90_DAY`
   - `STRIPE_PRICE_AI_QA`
   - `STRIPE_PRICE_QA_INTERVIEW`

When these are set, Checkout uses them; otherwise it falls back to inline
prices. Keeping amounts in `courses.ts` in sync with Stripe is recommended.

## 3. Database setup

Run `supabase/payment-schema-update.sql` in the Supabase SQL Editor. It:

- adds `stripe_session_id` to `payments` (+ a unique index for idempotency),
- adds lookup indexes,
- inserts the `ai-for-qa-testers` and `qa-interview-accelerator` courses
  (the 90-Day course already ships in `seed.sql`).

Confirm all three slugs exist:

```sql
select slug, title, status from public.courses order by title;
```

## 4. Webhook setup

1. **Developers → Webhooks → Add endpoint.**
2. Endpoint URL: `https://<your-domain>/api/stripe/webhook`
3. Subscribe to events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `charge.refunded`
   - `invoice.payment_succeeded` (only needed if subscriptions are added)
4. Copy the **Signing secret** (`whsec_…`) → `STRIPE_WEBHOOK_SECRET`.
5. Local testing: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
   and use the printed `whsec_…` as your local secret.

## 5. Environment variables

Set these in `.env.local` (dev) and in Vercel project settings (prod):

```
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
NEXT_PUBLIC_SITE_URL=https://insidestlcacademy.com
# optional
STRIPE_PRICE_90_DAY=price_...
STRIPE_PRICE_AI_QA=price_...
STRIPE_PRICE_QA_INTERVIEW=price_...
```

Secret keys are server-only — never referenced from client components.

## 6. Test card checkout

Use Stripe test mode and card `4242 4242 4242 4242`, any future expiry,
any CVC, any postcode. Walk the full flow: course page → **Enrol Now** →
Checkout → success page → dashboard. See `PAYMENT_TESTING_CHECKLIST.md`.

## 7. How to confirm course access

After a successful test payment:

1. **Admin → Purchases** shows the purchase (email, course, status, date).
2. The buyer's `/dashboard` lists the purchased course with a Continue button.
3. In Supabase, an active `enrolments` row exists for that user + course.
4. Course modules under `/dashboard/course/<id>` are reachable (locked before
   purchase, unlocked after).

## 8. How to replace Ionis links

1. Anywhere the site/marketing links to the Ionis shop product, replace the
   link with the relevant course page (`/course/<slug>`) or the homepage
   `#courses` section — the **Enrol Now** button now drives Stripe Checkout.
2. The `EnrolButton` component (`src/components/marketing/EnrolButton.tsx`) is
   the single reusable purchase entry point; reuse it for any new placement.
3. Remove Ionis buy buttons / embeds from external pages and point them here.

## 9. How to redirect insidestlc.com shop traffic

Pick whichever matches where the shop lives:

- **DNS / hosting redirect:** 301 the shop path (e.g. `/shop`, `/product/*`)
  to the matching Academy course page.
- **Vercel redirects:** add entries to `next.config.ts` `redirects()`:

  ```ts
  async redirects() {
    return [
      { source: '/shop', destination: '/#courses', permanent: true },
      { source: '/product/90-day', destination: '/course/90-day-software-testing-career-roadmap', permanent: true },
      { source: '/product/ai-for-qa', destination: '/course/ai-for-qa-testers', permanent: true },
      { source: '/product/qa-interview', destination: '/course/qa-interview-accelerator', permanent: true },
    ];
  }
  ```

- Keep redirects **permanent (301)** so search engines transfer ranking to the
  Academy pages.

## 10. Go-live checklist

- [ ] Swap test keys for live keys in Vercel.
- [ ] Re-point the Stripe webhook to the production domain + live signing secret.
- [ ] Run one real low-value test (or a £1 test price) end-to-end.
- [ ] Confirm Admin → Purchases and dashboard access.
- [ ] Enable the Ionis → Academy redirects.
