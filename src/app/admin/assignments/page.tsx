import { createAdminClient } from '@/lib/supabase/admin';
import { Card } from '@/components/ui/Card';
import { formatDate, getSubmissionStatusColour, getSubmissionStatusLabel } from '@/lib/utils';
import { FileText } from 'lucide-react';
import { SubmissionReviewPanel } from '@/components/admin/SubmissionReviewPanel';
import type { AssignmentSubmission, Assignment, Profile } from '@/types';

export default async function AdminAssignmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; submission?: string }>;
}) {
  const { status: filterStatus, submission: selectedId } = await searchParams;
  const db = createAdminClient();

  let query = db
    .from('assignment_submissions')
    .select('*, assignments(title, module_id), profiles(id, first_name, last_name, email)')
    .order('submitted_at', { ascending: false });

  if (filterStatus) query = query.eq('status', filterStatus);

  const { data: submissions } = await query;

  type FullSub = AssignmentSubmission & { assignments: Assignment; profiles: Profile };
  const typed = (submissions ?? []) as FullSub[];
  const selected = selectedId ? typed.find(s => s.id === selectedId) : null;

  const statusFilters = [
    { value: '', label: 'All' },
    { value: 'submitted', label: 'Awaiting Review' },
    { value: 'reviewed', label: 'Reviewed' },
    { value: 'passed', label: 'Passed' },
    { value: 'needs_changes', label: 'Needs Changes' },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <FileText className="w-6 h-6 text-brand-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assignment Submissions</h1>
          <p className="text-gray-500 text-sm">{typed.length} total</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {statusFilters.map(f => (
          <a key={f.value}
            href={f.value ? `/admin/assignments?status=${f.value}` : '/admin/assignments'}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              (filterStatus ?? '') === f.value
                ? 'bg-brand-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-300'
            }`}>
            {f.label}
          </a>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          {typed.length === 0 ? (
            <Card className="text-center py-12">
              <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No submissions found.</p>
            </Card>
          ) : (
            typed.map(sub => (
              <a key={sub.id}
                href={`/admin/assignments?submission=${sub.id}${filterStatus ? `&status=${filterStatus}` : ''}`}
                className={`block bg-white border rounded-xl p-4 hover:border-brand-200 transition-colors ${selectedId === sub.id ? 'border-brand-400 shadow-sm' : 'border-gray-200'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{sub.assignments?.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{sub.profiles?.first_name} {sub.profiles?.last_name} · {sub.profiles?.email}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(sub.submitted_at)}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${getSubmissionStatusColour(sub.status)}`}>
                    {getSubmissionStatusLabel(sub.status)}
                  </span>
                </div>
              </a>
            ))
          )}
        </div>

        {selected ? (
          <SubmissionReviewPanel submission={selected} />
        ) : (
          <Card className="flex items-center justify-center py-20 text-center">
            <div>
              <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-400">Select a submission to review</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
