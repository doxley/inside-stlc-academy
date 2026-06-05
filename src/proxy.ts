import { type NextRequest, NextResponse } from 'next/server';

// Next.js 16 uses proxy.ts instead of middleware.ts
// Auth protection is handled in each layout (server components),
// so this proxy just passes requests through cleanly.
export function proxy(request: NextRequest) {
  return NextResponse.next({ request });
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
