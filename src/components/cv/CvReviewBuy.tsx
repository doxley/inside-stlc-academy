'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CV_REVIEW } from '@/lib/services';

export function CvReviewBuy() {
  const [express, setExpress] = useState(false);
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const total = (CV_REVIEW.amount + (express ? CV_REVIEW.expressAmount : 0)) / 100;

  async function buy() {
    if (!terms) { setError('Please accept the Terms to continue.'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/checkout-service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service: 'cv-review', express, termsAccepted: true }),
      });
      const raw = await res.text();
      let data: { url?: string; error?: string } = {};
      if (raw) { try { data = JSON.parse(raw); } catch { throw new Error(`Unexpected response (HTTP ${res.status})`); } }
      if (!res.ok || !data.url) throw new Error(data.error || 'Could not start checkout');
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
      setLoading(false);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-4xl font-bold text-gray-900">£{total.toFixed(0)}</span>
        <span className="text-gray-500">one-off</span>
      </div>
      <p className="text-sm text-gray-500 mb-5">Initial review + one follow-up after you amend.</p>

      <label className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer mb-3 hover:border-brand-300">
        <input type="checkbox" checked={express} onChange={(e) => setExpress(e.target.checked)} className="mt-0.5" />
        <span className="text-sm">
          <span className="font-semibold text-gray-900">Express — {CV_REVIEW.expressLabel}</span>
          <span className="block text-gray-500">Reviewed within {CV_REVIEW.expressHours} hours instead of {CV_REVIEW.turnaroundHours}.</span>
        </span>
      </label>

      <label className="flex items-start gap-2.5 mb-4 text-sm text-gray-600">
        <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="mt-0.5" />
        <span>I agree to the{' '}
          <Link href="/terms" target="_blank" className="text-brand-600 underline">Terms &amp; Refund Policy</Link>, and understand my CV is processed with AI assistance and deleted after my review.
        </span>
      </label>

      <button onClick={buy} disabled={loading}
        className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-60">
        {loading ? 'Redirecting…' : 'Get my CV reviewed'}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <p className="text-xs text-gray-400 mt-3 text-center">Secure checkout via Stripe. You&apos;ll upload your CV straight after payment.</p>
    </div>
  );
}
