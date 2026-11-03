import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import { Card } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';
import type { CvReview } from '@/types';

function statusBadge(status: string) {
  const map: Record<string, string> = {
    awaiting_upload: 'bg-gray-100 text-gray-600',
    submitted: 'bg-yellow-100 text-yellow-800',
    in_review: 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800',
    followup_submitted: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-700',
  };
  return map[status] ?? 'bg-gray-100 text-gray-700';
}

const STATUS_LABEL: Record<string, string> = {
  awaiting_upload: 'Awaiting upload',
  submitted: 'Needs review',
  in_review: 'In review (AI drafted)',
  delivered: 'Delivered',
  followup_submitted: 'Follow-up to review',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export const dynamic = 'force-dynamic';

export default async function AdminCvReviewsPage() {
  const db = createAdminClient();
  const { data } = await db
    .from('cv_reviews')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200);

  const rows = (data ?? []) as CvReview[];
  const needaction = rows.filter((r) => r.status === 'submitted' || r.status === 'followup_submitted').length;

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">CV Reviews</h1>
        <p className="text-gray-500 mt-1">AI-assisted CV reviews — generate a draft, check it, then deliver.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <p className="text-sm text-gray-500">Total orders</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{rows.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Awaiting your review</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{needaction}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{rows.filter((r) => r.status === 'completed').length}</p>
        </Card>
      </div>

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Options</th>
                <th className="px-4 py-3 font-medium">Due</th>
                <th className="px-4 py-3 font-medium">Ordered</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400">No CV reviews yet.</td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-900">{r.email ?? '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge(r.status)}`}>
                        {STATUS_LABEL[r.status] ?? r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {r.express && <span className="inline-block mr-1 px-1.5 py-0.5 rounded bg-brand-100 text-brand-700 text-xs">Express</span>}
                      {r.amend_addon && <span className="inline-block px-1.5 py-0.5 rounded bg-gold-100 text-gold-700 text-xs">Amend</span>}
                      {!r.express && !r.amend_addon && '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{r.due_at ? formatDate(r.due_at) : '—'}</td>
                    <td className="px-4 py-3 text-gray-500">{formatDate(r.created_at)}</td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/cv-reviews/${r.id}`} className="text-brand-600 font-medium hover:text-brand-700">
                        Open →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
