'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

interface Props {
  studentId: string;
  // Courses the student is NOT already enrolled in.
  courses: { id: string; title: string }[];
}

export function EnrolStudentForm({ studentId, courses }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  async function handleEnrol() {
    if (selected.length === 0) return;
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/enrol-student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, courseIds: selected }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? 'Failed to enrol');
      setLoading(false);
      return;
    }
    setSelected([]);
    router.refresh();
  }

  if (courses.length === 0) {
    return <p className="text-sm text-gray-400">Enrolled in all available courses.</p>;
  }

  return (
    <div className="w-full sm:w-auto sm:min-w-[260px]">
      <p className="text-sm font-medium text-gray-700 mb-2">Enrol in courses</p>
      <div className="space-y-1.5 mb-3">
        {courses.map((c) => (
          <label key={c.id} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(c.id)}
              onChange={() => toggle(c.id)}
              className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
            />
            {c.title}
          </label>
        ))}
      </div>
      <Button onClick={handleEnrol} loading={loading} size="sm" disabled={selected.length === 0}>
        {selected.length > 1 ? `Enrol in ${selected.length} courses` : 'Enrol student'}
      </Button>
      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
    </div>
  );
}
