'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useRouter } from 'next/navigation';

export function CreateStudentForm() {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/create-student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? 'Failed to create student');
      setLoading(false);
      return;
    }

    setOpen(false);
    setFirstName(''); setLastName(''); setEmail('');
    router.refresh();
  }

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)} size="sm">
        <Plus className="w-4 h-4" />
        Add student
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Create Student</h2>
          <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="First name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
            <Input label="Last name" value={lastName} onChange={e => setLastName(e.target.value)} required />
          </div>
          <Input label="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} required />

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          <p className="text-xs text-gray-500">
            The student will receive an email invitation to set their password.
          </p>

          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={loading} className="flex-1">Create student</Button>
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
