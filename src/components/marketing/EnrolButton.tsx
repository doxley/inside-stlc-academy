'use client';

import { useState } from 'react';

interface EnrolButtonProps {
  slug: string;
  label?: string;
  className?: string;
  /** Wrapper class — pass a full-width wrapper for block-style buttons. */
  containerClassName?: string;
}

const DEFAULT_CLASS =
  'inline-flex items-center justify-center bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed';

export function EnrolButton({
  slug,
  label = 'Enrol Now',
  className,
  containerClassName = 'inline-flex flex-col items-center',
}: EnrolButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleEnrol() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Could not start checkout');
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  }

  return (
    <span className={containerClassName}>
      <button type="button" onClick={handleEnrol} disabled={loading} className={className ?? DEFAULT_CLASS}>
        {loading ? 'Redirecting…' : label}
      </button>
      {error && <span className="text-red-400 text-sm mt-2">{error}</span>}
    </span>
  );
}
