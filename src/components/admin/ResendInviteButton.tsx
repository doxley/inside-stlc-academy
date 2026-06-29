'use client';

import { useState } from 'react';
import { Mail, Check } from 'lucide-react';

// Resends an access / set-password link to a student. Admin only.
export function ResendInviteButton({ email }: { email: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  async function resend() {
    setState('sending');
    setError('');
    const res = await fetch('/api/admin/resend-invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? 'Failed to send');
      setState('error');
      return;
    }
    setState('sent');
  }

  return (
    <div className="flex flex-col items-end">
      <button
        onClick={resend}
        disabled={state === 'sending' || state === 'sent'}
        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60"
      >
        {state === 'sent' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Mail className="w-3.5 h-3.5" />}
        {state === 'sending' ? 'Sending…' : state === 'sent' ? 'Invite sent' : 'Resend invite'}
      </button>
      {state === 'error' && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
