/**
 * Canonical site URL for building auth redirect links (confirm signup, reset
 * password, invite). Prefers the explicit env var so links always point at the
 * deployed domain — never localhost — and falls back to the current browser
 * origin, then localhost for local dev.
 *
 * Set NEXT_PUBLIC_SITE_URL in Vercel to your canonical app domain
 * (e.g. https://www.insidestlcacademy.com) so emailed links resolve correctly.
 */
export function siteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  if (typeof window !== 'undefined' && window.location?.origin) return window.location.origin;
  return 'http://localhost:3000';
}
