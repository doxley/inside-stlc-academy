import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

/**
 * Auth redirect target for emailed links (confirm signup, password reset,
 * invite). Supabase appends a one-time `code` (PKCE) — we exchange it for a
 * session cookie here, then forward the user to `next`. Handling it in a route
 * handler (rather than a client page) means the session is established
 * server-side before the destination page renders.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') || '/dashboard';
  // Only allow same-origin relative paths to avoid open-redirects.
  const safeNext = next.startsWith('/') ? next : '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(new URL('/login?error=auth_callback', url.origin));
    }
  }

  return NextResponse.redirect(new URL(safeNext, url.origin));
}
