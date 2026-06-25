import Stripe from 'stripe';

// Server-only Stripe client. The secret key must never reach the browser —
// only import this from server components, API routes, or server actions.
let stripeSingleton: Stripe | null = null;

export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  if (!stripeSingleton) {
    stripeSingleton = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripeSingleton;
}

/** Base site URL used for Checkout success/cancel redirects. */
export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    'http://localhost:3000'
  ).replace(/\/$/, '');
}
