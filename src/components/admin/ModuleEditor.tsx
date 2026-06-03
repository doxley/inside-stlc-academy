'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Edit2, X } from 'lucide-react';
import type { Module } from '@/types';

interface Props {
  module: Module;
  courseId: string;
}

export function ModuleEditor({ module, courseId }: Props) {
  const [open, setOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState(module.video_url ?? '');
  const [status, setStatus] = useState(module.status);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();
    await supabase.from('modules').update({
      video_url: videoUrl || null,
      status,
      updated_at: new Date().toISOString(),
    }).eq('id', module.id);
    setSaving(false);
    setOpen(false);
    router.refresh();
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="text-gray-400 hover:text-brand-600 transition-colors">
        <Edit2 className="w-4 h-4" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Edit Module</h2>
            <p className="text-sm text-gray-500">Module {module.module_number} – {module.title}</p>
          </div>
          <button onClick={() => setOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
            <Input
              value={videoUrl}
              onChange={e => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
            />
            <p className="text-xs text-gray-400 mt-1">YouTube or Vimeo URL</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as Module['status'])}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="coming_soon">Coming Soon</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button onClick={handleSave} loading={saving} className="flex-1">Save changes</Button>
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}
