'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase puts the token in the URL hash for invite/reset flows.
    // The client SDK picks it up automatically on load.
    const supabase = createClient();
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
        setReady(true);
      }
    });
    // Also check if already signed in (invite flow auto-signs in)
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setReady(true);
    });
  }, []);

  async function handleSetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    // Check role and redirect
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      router.push(profile?.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      router.push('/dashboard');
    }
  }

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
          {!ready ? (
            <div className="text-center text-gray-500 py-4">
              <div className="animate-spin w-6 h-6 border-2 border-brand-600 border-t-transparent rounded-full mx-auto mb-3" />
              Verifying your invitation...
            </div>
          ) : (
            <form onSubmit={handleSetPassword} className="space-y-5">
              <Input
                label="New password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                required
                autoComplete="new-password"
              />
              <Input
                label="Confirm password"
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="Re-enter your password"
                required
                autoComplete="new-password"
              />
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full" size="lg" loading={loading}>
                Set password &amp; log in
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
