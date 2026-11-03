'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, FileText, Trash2, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import type { CvReview } from '@/types';

interface Props {
  review: CvReview;
  customerName: string;
  customerEmail: string;
  cvUrl: string | null;
  followupUrl: string | null;
}

export function AdminCvReviewPanel({ review, customerName, customerEmail, cvUrl, followupUrl }: Props) {
  const router = useRouter();

  const draft = review.ai_draft;
  const [score, setScore] = useState<number>(review.score ?? draft?.score ?? 0);
  const [good, setGood] = useState(review.review_good ?? draft?.good ?? '');
  const [improve, setImprove] = useState(review.review_improve ?? draft?.improve ?? '');
  const [summary, setSummary] = useState(review.review_summary ?? draft?.summary ?? '');
  const [amendedCv, setAmendedCv] = useState(review.amended_cv ?? draft?.amendedCv ?? '');
  const [followupNotes, setFollowupNotes] = useState(review.followup_notes ?? '');

  const [generating, setGenerating] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const isInitialStage = review.status === 'submitted' || review.status === 'in_review';
  const isFollowupStage = review.status === 'followup_submitted';
  const delivered = review.status === 'delivered' || review.status === 'completed';

  async function post(url: string, body: unknown) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const raw = await res.text();
    let data: { error?: string; draft?: CvReview['ai_draft'] } = {};
    if (raw) { try { data = JSON.parse(raw); } catch { throw new Error(`Unexpected response (HTTP ${res.status})`); } }
    if (!res.ok) throw new Error(data.error || `Request failed (HTTP ${res.status})`);
    return data;
  }

  async function generate() {
    setGenerating(true); setError(''); setNotice('');
    try {
      const data = await post('/api/admin/cv-review/generate', { cvReviewId: review.id });
      if (data.draft) {
        setScore(data.draft.score);
        setGood(data.draft.good);
        setImprove(data.draft.improve);
        setSummary(data.draft.summary);
        if (data.draft.amendedCv) setAmendedCv(data.draft.amendedCv);
        setNotice('AI draft generated. Review and edit it below, then Approve & Deliver.');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'AI generation failed');
    } finally {
      setGenerating(false);
    }
  }

  async function deliver(stage: 'initial' | 'followup') {
    setBusy(true); setError(''); setNotice('');
    try {
      await post('/api/admin/cv-review/deliver',
        stage === 'initial'
          ? { cvReviewId: review.id, stage, score, good, improve, summary, amendedCv: review.amend_addon ? amendedCv : amendedCv }
          : { cvReviewId: review.id, stage, followupNotes });
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delivery failed');
    } finally {
      setBusy(false);
    }
  }

  async function deleteCv() {
    if (!confirm('Permanently delete the uploaded CV file(s) for this order? This cannot be undone.')) return;
    setBusy(true); setError('');
    try {
      await post('/api/admin/cv-review/delete-cv', { cvReviewId: review.id });
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">CV Review — {customerName}</h1>
        <p className="text-gray-500 mt-1">{customerEmail}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          <Flag>{review.status.replace(/_/g, ' ')}</Flag>
          {review.express && <Flag className="bg-brand-100 text-brand-700">Express (24h)</Flag>}
          {review.amend_addon && <Flag className="bg-gold-100 text-gold-700">Amend add-on paid</Flag>}
          {review.due_at && (
            <Flag className="bg-gray-100 text-gray-600"><Clock className="w-3 h-3" /> Due {new Date(review.due_at).toLocaleString('en-GB')}</Flag>
          )}
        </div>
      </div>

      {error && <Banner tone="error"><AlertTriangle className="w-4 h-4" /> {error}</Banner>}
      {notice && <Banner tone="ok"><CheckCircle2 className="w-4 h-4" /> {notice}</Banner>}

      {/* CV file */}
      <section className="bg-white border rounded-xl p-5">
        <h2 className="font-semibold text-gray-900 mb-3">Uploaded CV</h2>
        {review.cv_deleted_at ? (
          <p className="text-sm text-gray-500">CV file deleted on {new Date(review.cv_deleted_at).toLocaleString('en-GB')} (privacy).</p>
        ) : cvUrl ? (
          <div className="flex items-center gap-3">
            <a href={cvUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700">
              <FileText className="w-4 h-4" /> View / download CV ({review.cv_file_name ?? 'file'})
            </a>
            <button onClick={deleteCv} disabled={busy}
              className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700 disabled:opacity-50">
              <Trash2 className="w-3.5 h-3.5" /> Delete now
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No CV uploaded yet (awaiting the customer).</p>
        )}
        {followupUrl && (
          <a href={followupUrl} target="_blank" rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700">
            <FileText className="w-4 h-4" /> View amended CV ({review.followup_file_name ?? 'file'})
          </a>
        )}
      </section>

      {/* AI + review editor (initial stage) */}
      {(isInitialStage || delivered) && (
        <section className="bg-white border rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Review</h2>
            {!review.cv_deleted_at && (isInitialStage) && (
              <button onClick={generate} disabled={generating || !review.cv_file_path}
                className="inline-flex items-center gap-2 bg-navy-900 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50">
                <Sparkles className="w-4 h-4" /> {generating ? 'Generating…' : review.ai_draft ? 'Regenerate with AI' : 'Generate with AI'}
              </button>
            )}
          </div>
          {review.ai_generated_at && (
            <p className="text-xs text-gray-400">AI draft generated {new Date(review.ai_generated_at).toLocaleString('en-GB')} ({review.ai_model}). Edit anything below before delivering.</p>
          )}

          <Field label="Score (0–100)">
            <input type="number" min={0} max={100} value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              className="w-28 px-3 py-2 border rounded-lg text-sm" />
          </Field>
          <Field label="What's good (markdown)">
            <textarea value={good} onChange={(e) => setGood(e.target.value)} rows={5} className="w-full px-3 py-2 border rounded-lg text-sm font-mono" />
          </Field>
          <Field label="What to improve (markdown)">
            <textarea value={improve} onChange={(e) => setImprove(e.target.value)} rows={7} className="w-full px-3 py-2 border rounded-lg text-sm font-mono" />
          </Field>
          <Field label="Overall summary">
            <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} className="w-full px-3 py-2 border rounded-lg text-sm" />
          </Field>
          <Field label={`Amended CV ${review.amend_addon ? '(delivered — amend add-on paid)' : '(draft only — amend add-on NOT purchased, not shown to customer)'}`}>
            <textarea value={amendedCv} onChange={(e) => setAmendedCv(e.target.value)} rows={8} className="w-full px-3 py-2 border rounded-lg text-sm font-mono" />
          </Field>

          {isInitialStage && (
            <button onClick={() => deliver('initial')} disabled={busy}
              className="inline-flex items-center gap-2 bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-green-700 disabled:opacity-50">
              <CheckCircle2 className="w-4 h-4" /> {busy ? 'Delivering…' : 'Approve & Deliver to customer'}
            </button>
          )}
          {delivered && <p className="text-sm text-green-700">Delivered{review.delivered_at ? ` on ${new Date(review.delivered_at).toLocaleString('en-GB')}` : ''}. Editing and re-delivering will update what the customer sees.</p>}
          {delivered && (
            <button onClick={() => deliver('initial')} disabled={busy}
              className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-semibold px-4 py-2 rounded-lg hover:border-gray-400 disabled:opacity-50">
              Re-deliver edits
            </button>
          )}
        </section>
      )}

      {/* Follow-up stage */}
      {isFollowupStage && (
        <section className="bg-white border rounded-xl p-5 space-y-4">
          <h2 className="font-semibold text-gray-900">Follow-up review</h2>
          <p className="text-sm text-gray-500">The customer has uploaded an amended CV. Review it against your earlier feedback and write your follow-up notes.</p>
          <Field label="Follow-up notes (markdown)">
            <textarea value={followupNotes} onChange={(e) => setFollowupNotes(e.target.value)} rows={8} className="w-full px-3 py-2 border rounded-lg text-sm font-mono" />
          </Field>
          <button onClick={() => deliver('followup')} disabled={busy}
            className="inline-flex items-center gap-2 bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-green-700 disabled:opacity-50">
            <CheckCircle2 className="w-4 h-4" /> {busy ? 'Delivering…' : 'Deliver follow-up & complete'}
          </button>
        </section>
      )}

      {review.status === 'awaiting_upload' && (
        <Banner tone="muted">Waiting for the customer to upload their CV.</Banner>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
      {children}
    </label>
  );
}
function Flag({ children, className = 'bg-gray-100 text-gray-700' }: { children: React.ReactNode; className?: string }) {
  return <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${className}`}>{children}</span>;
}
function Banner({ children, tone }: { children: React.ReactNode; tone: 'error' | 'ok' | 'muted' }) {
  const map = { error: 'bg-red-50 text-red-700 border-red-200', ok: 'bg-green-50 text-green-700 border-green-200', muted: 'bg-gray-50 text-gray-600 border-gray-200' };
  return <div className={`flex items-center gap-2 text-sm border rounded-lg px-4 py-3 ${map[tone]}`}>{children}</div>;
}
