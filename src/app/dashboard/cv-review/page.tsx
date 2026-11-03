import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { formatDate } from '@/lib/utils';
import { FileSearch, ArrowRight } from 'lucide-react';
import type { CvReview } from '@/types';

export const dynamic = 'force-dynamic';

const LABEL: Record<string, { text: string; cls: string }> = {
  awaiting_upload: { text: 'Upload your CV', cls: 'bg-brand-100 text-brand-700' },
  submitted: { text: 'Being reviewed', cls: 'bg-yellow-100 text-yellow-800' },
  in_review: { text: 'Being reviewed', cls: 'bg-yellow-100 text-yellow-800' },
  delivered: { text: 'Review ready', cls: 'bg-green-100 text-green-800' },
  followup_submitted: { text: 'Follow-up in progress', cls: 'bg-yellow-100 text-yellow-800' },
  completed: { text: 'Completed', cls: 'bg-gray-100 text-gray-600' },
  cancelled: { text: 'Cancelled', cls: 'bg-red-100 text-red-700' },
};

export default async function MyCvReviewsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const db = createAdminClient();
  const { data } = await db.from('cv_reviews').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
  const rows = (data ?? []) as CvReview[];

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">← Dashboard</Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">My CV Reviews</h1>
      <p className="text-gray-500 mb-6">Your professional CV review orders.</p>

      {rows.length === 0 ? (
        <div className="bg-white border rounded-xl p-8 text-center">
          <FileSearch className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">You don&apos;t have any CV reviews yet.</p>
          <Link href="/services/cv-review" className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-5 py-2.5 rounded-lg">
            Get your CV reviewed <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map((r) => {
            const l = LABEL[r.status] ?? { text: r.status, cls: 'bg-gray-100 text-gray-600' };
            return (
              <Link key={r.id} href={`/dashboard/cv-review/${r.id}`}
                className="flex items-center gap-4 bg-white border rounded-xl p-5 hover:border-brand-200 hover:shadow-sm transition">
                <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                  <FileSearch className="w-5 h-5 text-brand-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">CV Review{r.express ? ' (Express)' : ''}</p>
                  <p className="text-xs text-gray-400">Ordered {formatDate(r.created_at)}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${l.cls}`}>{l.text}</span>
                <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
