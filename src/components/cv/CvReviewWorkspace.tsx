'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { UploadCloud, Clock, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import type { CvReview } from '@/types';

const ACCEPT = '.pdf,.docx';
const MAX_BYTES = 10 * 1024 * 1024;

export function CvReviewWorkspace({ review, userId }: { review: CvReview; userId: string }) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [buying, setBuying] = useState(false);

  const isAwaitingUpload = review.status === 'awaiting_upload';
  const isUnderReview = review.status === 'submitted' || review.status === 'in_review';
  const isDelivered = review.status === 'delivered';
  const isFollowupUnderReview = review.status === 'followup_submitted';
  const isCompleted = review.status === 'completed';

  async function handleFile(file: File) {
    setError('');
    if (file.size > MAX_BYTES) { setError('Please upload a file under 10 MB.'); return; }
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext !== 'pdf' && ext !== 'docx') { setError('Please upload a PDF or Word (.docx) file.'); return; }

    setUploading(true);
    try {
      const supabase = createClient();
      const path = `${userId}/${review.id}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from('cv-uploads').upload(path, file, {
        upsert: false,
        contentType: file.type || undefined,
      });
      if (upErr) throw new Error(upErr.message);

      const res = await fetch('/api/cv-review/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvReviewId: review.id, filePath: path, fileName: file.name }),
      });
      const raw = await res.text();
      let data: { error?: string } = {};
      if (raw) { try { data = JSON.parse(raw); } catch { throw new Error(`Unexpected response (HTTP ${res.status})`); } }
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  async function buyAmend() {
    setBuying(true); setError('');
    try {
      const res = await fetch('/api/checkout-service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service: 'cv-review-amend', cvReviewId: review.id, termsAccepted: true }),
      });
      const raw = await res.text();
      let data: { url?: string; error?: string } = {};
      if (raw) { try { data = JSON.parse(raw); } catch { throw new Error(`Unexpected response (HTTP ${res.status})`); } }
      if (!res.ok || !data.url) throw new Error(data.error || 'Could not start checkout');
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
      setBuying(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Your CV Review</h1>
        <p className="text-gray-500 mt-1">
          {review.express ? 'Express (24h) · ' : ''}Initial review + one follow-up
          {review.amend_addon ? ' · Amend add-on' : ''}
        </p>
      </div>

      {error && <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg px-4 py-3 text-sm">{error}</div>}

      {/* Upload (initial) */}
      {isAwaitingUpload && (
        <UploadCard title="Upload your CV" subtitle="PDF or Word (.docx), up to 10 MB. We'll review it and email you when it's ready." uploading={uploading} onFile={handleFile} />
      )}

      {/* Under review */}
      {isUnderReview && (
        <StatusCard icon={Clock} tone="blue"
          title="Your CV is being reviewed"
          body={`We'll email you when it's ready${review.due_at ? ` — due by ${new Date(review.due_at).toLocaleString('en-GB')}` : ''}.`} />
      )}

      {/* Delivered review */}
      {(isDelivered || isFollowupUnderReview || isCompleted) && review.review_summary && (
        <div className="bg-white border rounded-xl p-6 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center">
              <span className="text-2xl font-bold text-brand-600">{review.score ?? '—'}</span>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-gray-400">Your CV score</div>
              <div className="font-semibold text-gray-900">out of 100</div>
            </div>
          </div>
          <Block title="Overall" text={review.review_summary} />
          {review.review_good && <Block title="What's working well" text={review.review_good} />}
          {review.review_improve && <Block title="What to improve" text={review.review_improve} />}
          {review.amend_addon && review.amended_cv && <Block title="Your amended CV" text={review.amended_cv} mono />}
          {isCompleted && review.followup_notes && <Block title="Follow-up review" text={review.followup_notes} />}
        </div>
      )}

      {/* Post-delivery: amend options */}
      {isDelivered && (
        <div className="bg-white border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Next step</h2>
          <p className="text-sm text-gray-600">Make the improvements above, then upload your amended CV for your included follow-up review.</p>
          <UploadCard title="Upload your amended CV" subtitle="Your included follow-up review." uploading={uploading} onFile={handleFile} compact />
          {!review.amend_addon && (
            <div className="border-t pt-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Prefer us to do the rewrite?</p>
                  <p className="text-sm text-gray-500 mb-3">We&apos;ll amend your CV for you and send back an improved version.</p>
                  <button onClick={buyAmend} disabled={buying}
                    className="bg-navy-900 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50">
                    {buying ? 'Redirecting…' : 'Add “we amend it for you” — £39'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {isFollowupUnderReview && (
        <StatusCard icon={Clock} tone="blue" title="Your amended CV is being reviewed" body="We'll email you when your follow-up is ready." />
      )}

      {isCompleted && (
        <StatusCard icon={CheckCircle2} tone="green" title="Review complete" body="Your uploaded CV has been deleted from our systems. Best of luck with your applications!" />
      )}
    </div>
  );
}

function UploadCard({ title, subtitle, uploading, onFile, compact }: {
  title: string; subtitle: string; uploading: boolean; onFile: (f: File) => void; compact?: boolean;
}) {
  return (
    <div className={`bg-white border rounded-xl ${compact ? 'p-4' : 'p-6'}`}>
      {!compact && <h2 className="font-semibold text-gray-900 mb-1">{title}</h2>}
      <p className="text-sm text-gray-500 mb-4">{subtitle}</p>
      <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl py-8 cursor-pointer hover:border-brand-400 transition-colors">
        <UploadCloud className="w-7 h-7 text-gray-400" />
        <span className="text-sm font-medium text-brand-600">{uploading ? 'Uploading…' : 'Choose a file'}</span>
        <span className="text-xs text-gray-400">PDF or .docx</span>
        <input type="file" accept={ACCEPT} className="hidden" disabled={uploading}
          onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); e.target.value = ''; }} />
      </label>
    </div>
  );
}

function StatusCard({ icon: Icon, tone, title, body }: {
  icon: React.ComponentType<{ className?: string }>; tone: 'blue' | 'green'; title: string; body: string;
}) {
  const map = { blue: 'bg-blue-50 border-blue-200 text-blue-800', green: 'bg-green-50 border-green-200 text-green-800' };
  return (
    <div className={`border rounded-xl p-6 flex items-start gap-4 ${map[tone]}`}>
      <Icon className="w-6 h-6 flex-shrink-0" />
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p className="text-sm opacity-90 mt-0.5">{body}</p>
      </div>
    </div>
  );
}

function Block({ title, text, mono }: { title: string; text: string; mono?: boolean }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{title}</h3>
      <div className={`text-sm text-gray-700 leading-relaxed whitespace-pre-wrap ${mono ? 'font-mono bg-gray-50 border rounded-lg p-3 text-xs' : ''}`}>{text}</div>
    </div>
  );
}
