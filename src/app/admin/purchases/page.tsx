import { createAdminClient } from '@/lib/supabase/admin';
import { Card } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';
import type { Payment, Profile, Course } from '@/types';

type PaymentRow = Payment & {
  profiles: Pick<Profile, 'email' | 'first_name' | 'last_name'> | null;
  courses: Pick<Course, 'title'> | null;
};

function statusColour(status: string) {
  const map: Record<string, string> = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    refunded: 'bg-red-100 text-red-800',
    failed: 'bg-gray-100 text-gray-700',
  };
  return map[status] ?? 'bg-gray-100 text-gray-700';
}

function formatAmount(amount: number | null, currency: string) {
  if (amount == null) return '—';
  const symbol = currency?.toLowerCase() === 'gbp' ? '£' : '';
  return `${symbol}${(amount / 100).toFixed(2)}`;
}

export default async function AdminPurchasesPage() {
  const db = createAdminClient();

  const [{ data: payments }, { count: completedCount }, { data: revenueRows }] = await Promise.all([
    db
      .from('payments')
      .select('*, profiles(email, first_name, last_name), courses(title)')
      .order('created_at', { ascending: false })
      .limit(200),
    db.from('payments').select('*', { count: 'exact', head: true }).eq('status', 'completed'),
    db.from('payments').select('amount').eq('status', 'completed'),
  ]);

  const rows = (payments ?? []) as PaymentRow[];
  const totalRevenue = (revenueRows ?? []).reduce(
    (sum: number, r: { amount: number | null }) => sum + (r.amount ?? 0),
    0
  );

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Purchases</h1>
        <p className="text-gray-500 mt-1">Stripe payments and course purchases</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <p className="text-sm text-gray-500">Total purchases</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{rows.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{completedCount ?? 0}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Revenue (completed)</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">£{(totalRevenue / 100).toFixed(2)}</p>
        </Card>
      </div>

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="px-4 py-3 font-medium">User email</th>
                <th className="px-4 py-3 font-medium">Course bought</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Payment status</th>
                <th className="px-4 py-3 font-medium">Purchase date</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                    No purchases yet.
                  </td>
                </tr>
              ) : (
                rows.map((p) => (
                  <tr key={p.id} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-3 text-gray-900">{p.profiles?.email ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-700">{p.courses?.title ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-700">{formatAmount(p.amount, p.currency)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColour(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{formatDate(p.created_at)}</td>
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
