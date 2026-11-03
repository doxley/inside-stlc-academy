import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CvReviewSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Resolve the order created by the webhook (may lag a moment after redirect).
  let reviewId: string | null = null;
  if (session_id) {
    const db = createAdminClient();
    const { data } = await db.from('cv_reviews').select('id, user_id').eq('stripe_session_id', session_id).maybeSingle();
    if (data && user && data.user_id === user.id) reviewId = data.id;
  }

  if (reviewId) redirect(`/dashboard/cv-review/${reviewId}`);

  return (
    <div className="min-h-screen bg-navy-900 text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-3">Payment received — thank you!</h1>
        {user ? (
          <>
            <p className="text-gray-300 mb-6">
              We&apos;re setting up your CV review order. Head to your dashboard to upload your CV.
            </p>
            <Link href="/dashboard/cv-review" className="inline-block bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl">
              Go to my CV reviews
            </Link>
          </>
        ) : (
          <>
            <p className="text-gray-300 mb-6">
              Check your inbox for an email to set your password, then log in to upload your CV.
            </p>
            <Link href="/login" className="inline-block bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl">
              Log in
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
