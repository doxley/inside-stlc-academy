'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Unlock } from 'lucide-react';

interface Props {
  studentId: string;
  moduleId: string;
  moduleName: string;
  alreadyUnlocked: boolean;
}

export function ManualUnlockButton({ studentId, moduleId, moduleName, alreadyUnlocked }: Props) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(alreadyUnlocked);
  const router = useRouter();

  async function handleUnlock() {
    setLoading(true);
    const res = await fetch('/api/admin/unlock-module', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, moduleId, note: 'Manual unlock by admin' }),
    });
    if (res.ok) {
      setDone(true);
      router.refresh();
    }
    setLoading(false);
  }

  if (done) {
    return <span className="text-xs text-green-600 font-medium flex items-center gap-1"><Unlock className="w-3 h-3" />Unlocked</span>;
  }

  return (
    <Button size="sm" variant="ghost" onClick={handleUnlock} loading={loading} className="text-xs">
      <Unlock className="w-3 h-3" /> Unlock
    </Button>
  );
}
