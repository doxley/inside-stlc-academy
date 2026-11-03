import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import { AdminCvReviewPanel } from '@/components/admin/AdminCvReviewPanel';
import type { CvReview, Profile } from '@/types';

export const dynamic = 'force-dynamic';

export default async function AdminCvReviewDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = createAdminClient();

  const { data } = await db.from('cv_reviews').select('*').eq('id', id).maybeSingle();
  if (!data) notFound();
  const review = data as CvReview;

  const { data: profile } = await db
    .from('profiles')
    .select('first_name, last_name, email')
    .eq('id', review.user_id)
    .maybeSingle();
  const customer = profile as Pick<Profile, 'first_name' | 'last_name' | 'email'> | null;

  // Short-lived signed URLs so the admin can view/download the CV(s).
  let cvUrl: string | null = null;
  let followupUrl: string | null = null;
  if (review.cv_file_path) {
    const { data: s } = await db.storage.from('cv-uploads').createSignedUrl(review.cv_file_path, 600);
    cvUrl = s?.signedUrl ?? null;
  }
  if (review.followup_file_path) {
    const { data: s } = await db.storage.from('cv-uploads').createSignedUrl(review.followup_file_path, 600);
    followupUrl = s?.signedUrl ?? null;
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <Link href="/admin/cv-reviews" className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">
        ← All CV reviews
      </Link>
      <AdminCvReviewPanel
        review={review}
        customerName={[customer?.first_name, customer?.last_name].filter(Boolean).join(' ') || (customer?.email ?? 'Customer')}
        customerEmail={customer?.email ?? review.email ?? ''}
        cvUrl={cvUrl}
        followupUrl={followupUrl}
      />
    </div>
  );
}
