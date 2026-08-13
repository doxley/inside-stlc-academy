'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { UserMinus } from 'lucide-react';

interface Props {
  studentId: string;
  courseId: string;
  courseTitle: string;
}

export function RemoveEnrolmentButton({ studentId, courseId, courseTitle }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleRemove() {
    setLoading(true);
    setError(null);
    const res = await fetch('/api/admin/unenrol-student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, courseId }),
    });
    if (res.ok) {
      // The student page only lists active enrolments, so a refresh drops this row.
      router.refresh();
      return;
    }
    const data = await res.json().catch(() => ({}));
    setError(data.error || 'Could not remove enrolment');
    setLoading(false);
    setConfirming(false);
  }

  if (confirming) {
    return (
      <span className="flex items-center gap-2">
        <span className="text-xs text-gray-500">Remove from “{courseTitle}”?</span>
        <Button size="sm" variant="danger" onClick={handleRemove} loading={loading} className="text-xs">
          Confirm
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setConfirming(false)} disabled={loading} className="text-xs">
          Cancel
        </Button>
      </span>
    );
  }

  return (
    <span className="flex items-center gap-2">
      {error && <span className="text-xs text-red-600">{error}</span>}
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setConfirming(true)}
        className="text-xs text-red-600 hover:text-red-700"
      >
        <UserMinus className="w-3 h-3" /> Remove
      </Button>
    </span>
  );
}
