'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, AlertCircle, Mail, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { siteUrl } from '@/lib/site-url';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

type Status = 'verifying' | 'ready' | 'invalid';

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState<Status>('verifying');

  // Recovery ("send me a new link") state.
  const [resendEmail, setResendEmail] = useState('');
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [resendError, setResendError] = useState('');

  useEffect(() => {
    let settled = false;
    const done = (s: Status) => { if (!settled) { settled = true; setStatus(s); } };

    // 1. An error in the URL hash means the link is expired / invalid / used.
    //    Checked before touching the client so the user always gets a way out.
    if (typeof window !== 'undefined' && window.location.hash.includes('error')) {
      const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
      if (params.get('error') || params.get('error_code')) {
        done('invalid');
        return;
      }
    }

    const supabase = createClient();

    // 2. If a PKCE code is present, try to exchange it for a session.
    (async () => {
      const code = new URLSearchParams(window.location.search).get('code');
      if (code) {
        try { await supabase.auth.exchangeCodeForSession(code); } catch { /* handled below */ }
      }
    })();

    // 3. React to the SDK establishing a session from the URL (hash or code).
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN' || event === 'INITIAL_SESSION')) {
        done('ready');
      }
    });

    // 4. Direct check in case the session was already present.
    supabase.auth.getSession().then(({ data }) => { if (data.session) done('ready'); });

    // 5. Fallback: if nothing established a session, show a recovery path
    //    instead of an infinite spinner.
    const timeout = setTimeout(() => done('invalid'), 8000);

    return () => { sub.subscription.unsubscribe(); clearTimeout(timeout); };
  }, []);

  async function handleSetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }

    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) { setError(updateError.message); setLoading(false); return; }

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      router.push(profile?.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      router.push('/dashboard');
    }
  }

  const handleResend = useCallback(async () => {
    const email = resendEmail.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setResendError('Enter a valid email address.');
      return;
    }
    setResending(true);
    setResendError('');
    const supabase = createClient();
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl()}/update-password`,
    });
    if (err) { setResendError(err.message); setResending(false); return; }
    setResent(true);
    setResending(false);
  }, [resendEmail]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Inside STLC Academy</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Set your password</h1>
          <p className="text-gray-500 mt-1">Choose a password to activate your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {status === 'verifying' && (
            <div className="text-center text-gray-500 py-4">
              <div className="animate-spin w-6 h-6 border-2 border-brand-600 border-t-transparent rounded-full mx-auto mb-3" />
              Verifying your link…
            </div>
          )}

          {status === 'ready' && (
            <form onSubmit={handleSetPassword} className="space-y-5">
              <Input label="New password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters" required autoComplete="new-password" />
              <Input label="Confirm password" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Re-enter your password" required autoComplete="new-password" />
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
              )}
              <Button type="submit" className="w-full" size="lg" loading={loading}>Set password &amp; log in</Button>
            </form>
          )}

          {status === 'invalid' && (
            resent ? (
              <div className="text-center py-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <p className="font-medium text-gray-900">Check your email</p>
                <p className="text-sm text-gray-500 mt-1">If that address has an account, a fresh link is on its way. It can take a minute — check spam too.</p>
              </div>
            ) : (
              <div>
                <div className="flex items-start gap-3 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 mb-5">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium">This link isn&apos;t valid anymore</p>
                    <p className="mt-0.5">Set-up and reset links expire and can only be used once. Enter your email below and we&apos;ll send a fresh one.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <Input label="Email address" type="email" value={resendEmail} onChange={e => setResendEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
                  {resendError && (
                    <p className="text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{resendError}</p>
                  )}
                  <Button onClick={handleResend} className="w-full" size="lg" loading={resending}>
                    <Mail className="w-4 h-4 mr-1.5" />Send me a new link
                  </Button>
                  <p className="text-center text-xs text-gray-400">
                    Still stuck? Email <a href="mailto:info@insidestlc.com" className="text-brand-600 hover:underline">info@insidestlc.com</a>
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
