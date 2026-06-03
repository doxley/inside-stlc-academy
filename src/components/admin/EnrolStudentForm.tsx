'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

interface Props {
  studentId: string;
  courses: { id: string; title: string }[];
}

export function EnrolStudentForm({ studentId, courses }: Props) {
  const [courseId, setCourseId] = useState(courses[0]?.id ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleEnrol() {
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/enrol-student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, courseId }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? 'Failed to enrol');
      setLoading(false);
      return;
    }
    router.refresh();
  }

  if (courses.length === 0) {
    return <p className="text-sm text-gray-400">No published courses available.</p>;
  }

  return (
    <div className="flex items-center gap-3">
      <select
        value={courseId}
        onChange={e => setCourseId(e.target.value)}
        className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
      >
        {courses.map(c => (
          <option key={c.id} value={c.id}>{c.title}</option>
        ))}
      </select>
      <Button onClick={handleEnrol} loading={loading} size="sm">Enrol student</Button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
