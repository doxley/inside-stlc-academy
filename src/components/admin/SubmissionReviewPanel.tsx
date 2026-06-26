'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import { Download, CheckCircle, XCircle, Eye } from 'lucide-react';
import type { AssignmentSubmission, Assignment, Profile } from '@/types';

type FullSub = AssignmentSubmission & {
  assignments: Assignment;
  profiles: Profile;
};

interface Props {
  submission: FullSub;
}

const STATUSES = [
  { value: 'reviewed', label: 'Reviewed', icon: Eye, colour: 'bg-yellow-50 border-yellow-200 text-yellow-800' },
  { value: 'passed', label: 'Passed', icon: CheckCircle, colour: 'bg-green-50 border-green-200 text-green-800' },
  { value: 'needs_changes', label: 'Needs Changes', icon: XCircle, colour: 'bg-red-50 border-red-200 text-red-800' },
];

export function SubmissionReviewPanel({ submission }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState(submission.status);
  const [feedback, setFeedback] = useState(submission.feedback ?? '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    await supabase.from('assignment_submissions').update({
      status,
      feedback,
      reviewed_by: user?.id,
      reviewed_at: new Date().toISOString(),
    }).eq('id', submission.id);

    // Notify the learner that feedback is ready (best-effort).
    fetch('/api/notifications/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ submissionId: submission.id }),
    }).catch(() => {});

    setSaved(true);
    setSaving(false);
    setTimeout(() => setSaved(false), 2000);
    router.refresh();
  }

  async function handleDownload() {
    const supabase = createClient();
    const { data, error } = await supabase.storage
      .from('assignment-submissions')
      .createSignedUrl(submission.file_url, 60);

    if (error || !data?.signedUrl) {
      alert('Could not generate download link.');
      return;
    }

    const a = document.createElement('a');
    a.href = data.signedUrl;
    a.download = submission.original_filename;
    a.click();
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 sticky top-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">{submission.assignments?.title}</h2>
        <p className="text-sm text-gray-500 mt-1">
          {submission.profiles?.first_name} {submission.profiles?.last_name} · {submission.profiles?.email}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">Submitted {formatDate(submission.submitted_at)}</p>
      </div>

      {/* File download */}
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{submission.original_filename}</p>
        </div>
        <Button variant="secondary" size="sm" onClick={handleDownload}>
          <Download className="w-3.5 h-3.5" />
          Download
        </Button>
      </div>

      {/* Status selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Update status</label>
        <div className="space-y-2">
          {STATUSES.map(s => {
            const Icon = s.icon;
            return (
              <label
                key={s.value}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  status === s.value ? s.colour : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  value={s.value}
                  checked={status === s.value}
                  onChange={() => setStatus(s.value as AssignmentSubmission['status'])}
                  className="text-brand-600"
                />
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{s.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Feedback */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Feedback to student
        </label>
        <textarea
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          rows={5}
          placeholder="Leave detailed feedback for the student..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
        />
      </div>

      <Button onClick={handleSave} loading={saving} className="w-full">
        {saved ? 'Saved!' : 'Save review'}
      </Button>
    </div>
  );
}
