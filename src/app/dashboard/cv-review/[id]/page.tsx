import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { CvReviewWorkspace } from '@/components/cv/CvReviewWorkspace';
import type { CvReview } from '@/types';

export const dynamic = 'force-dynamic';

export default async function CvReviewWorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const db = createAdminClient();
  const { data } = await db.from('cv_reviews').select('*').eq('id', id).maybeSingle();
  if (!data || data.user_id !== user.id) notFound();

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <Link href="/dashboard/cv-review" className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">
        ← All my CV reviews
      </Link>
      <CvReviewWorkspace review={data as CvReview} userId={user.id} />
    </div>
  );
}
