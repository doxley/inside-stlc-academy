# Payment Testing Checklist — Inside STLC Academy

Run in Stripe **test mode**. Test card: `4242 4242 4242 4242`, any future
expiry, any CVC, any postcode. Decline card: `4000 0000 0000 0002`.

> Tip: run `stripe listen --forward-to localhost:3000/api/stripe/webhook`
> so webhook events reach your local app, and watch the CLI output.

## Logged-out purchase
- [ ] Open `/course/ai-for-qa-testers` while logged out.
- [ ] Click **Enrol Now** → redirected to Stripe Checkout.
- [ ] Stripe collects an email (no account required to pay).
- [ ] Complete payment → land on `/payment/success`.
- [ ] Webhook creates/matches an account for that email (invite email sent).

## Logged-in purchase
- [ ] Log in, open a course page, click **Enrol Now**.
- [ ] Checkout is prefilled with the account email.
- [ ] Complete payment → `/payment/success` → **Go to Dashboard**.
- [ ] Purchase is attributed to the logged-in user (not a new account).

## Payment success
- [ ] `/payment/success` shows "Payment successful. Your course access has
      been unlocked." with a **Go to Dashboard** CTA.
- [ ] A `payments` row exists with `status = completed`.

## Payment cancelled
- [ ] Start Checkout, then cancel / hit back.
- [ ] Land on `/payment/cancelled` with "No payment has been taken."
- [ ] No `payments` row and no `enrolments` row were created.

## Course access granted
- [ ] After payment, an active `enrolments` row exists (user + course).
- [ ] `/dashboard/course/<id>` and its modules are reachable.

## Course locked before purchase
- [ ] As a logged-in user with no purchase, visiting
      `/dashboard/course/<id>` returns not-found / no access.
- [ ] Course modules are not reachable without an active enrolment.

## Dashboard shows purchased course
- [ ] `/dashboard` lists each purchased course.
- [ ] Shows progress %, certificate status, and account email.
- [ ] **Continue / Start Learning** links into the course.

## Webhook works
- [ ] `checkout.session.completed` is received and returns `200`.
- [ ] Invalid signature is rejected with `400`.
- [ ] Webhook records the purchase and grants the enrolment.

## Duplicate purchase handling
- [ ] Re-send the same `checkout.session.completed` event (Stripe CLI
      `stripe events resend <id>`): no duplicate `payments` row is created
      (idempotent on `stripe_session_id`).
- [ ] Enrolment upsert does not create a second row (unique user+course).

## Refund / access removal behaviour
- [ ] Refund a payment in Stripe → `charge.refunded` received.
- [ ] The `payments` row status becomes `refunded`.
- [ ] The matching `enrolments` row becomes `suspended` (access revoked).
- [ ] The course no longer appears as active on the user's dashboard.

## Mobile checkout flow
- [ ] On a mobile viewport, course cards show Price + View Course + Enrol Now.
- [ ] **Enrol Now** buttons are full-width and tappable.
- [ ] Stripe Checkout renders correctly on mobile and completes.
- [ ] `/payment/success` and `/dashboard` are responsive on mobile.

## Admin view
- [ ] **Admin → Purchases** lists user email, course bought, payment status,
      amount, and purchase date.
- [ ] Totals (purchases, completed, revenue) are correct.
