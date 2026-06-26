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

const textareaClass =
  'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500';

export function ModuleEditor({ module }: Props) {
  const [open, setOpen] = useState(false);
  const [lessonOverview, setLessonOverview] = useState(module.lesson_overview ?? '');
  const [guidedNotes, setGuidedNotes] = useState(module.guided_notes ?? '');
  const [practicalTask, setPracticalTask] = useState(module.practical_task ?? '');
  const [reflectionQuestion, setReflectionQuestion] = useState(module.reflection_question ?? '');
  const [checklist, setChecklist] = useState((module.completion_checklist ?? []).join('\n'));
  const [estimatedDuration, setEstimatedDuration] = useState(module.estimated_duration ?? '');
  const [videoUrl, setVideoUrl] = useState(module.video_url ?? '');
  const [status, setStatus] = useState(module.status);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();
    await supabase.from('modules').update({
      lesson_overview: lessonOverview || null,
      guided_notes: guidedNotes || null,
      practical_task: practicalTask || null,
      reflection_question: reflectionQuestion || null,
      completion_checklist: checklist.split('\n').map((l) => l.trim()).filter(Boolean),
      estimated_duration: estimatedDuration || null,
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Edit Module</h2>
            <p className="text-sm text-gray-500">Module {module.module_number} – {module.title}</p>
          </div>
          <button onClick={() => setOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Overview</label>
            <textarea rows={2} value={lessonOverview} onChange={e => setLessonOverview(e.target.value)} className={textareaClass} placeholder="What the learner will understand…" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Guided Lesson Notes</label>
            <textarea rows={6} value={guidedNotes} onChange={e => setGuidedNotes(e.target.value)} className={textareaClass} placeholder={'Written content. Use "## Heading" for headings and "- " for bullet points.'} />
            <p className="text-xs text-gray-400 mt-1">Supports <code>## Heading</code> and <code>- bullet</code> lines.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Practical Activity</label>
            <textarea rows={3} value={practicalTask} onChange={e => setPracticalTask(e.target.value)} className={textareaClass} placeholder="A task the learner completes using the lesson…" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reflection Question</label>
            <textarea rows={2} value={reflectionQuestion} onChange={e => setReflectionQuestion(e.target.value)} className={textareaClass} placeholder="A question to confirm understanding…" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Completion Checklist</label>
            <textarea rows={3} value={checklist} onChange={e => setChecklist(e.target.value)} className={textareaClass} placeholder="One checklist item per line" />
            <p className="text-xs text-gray-400 mt-1">One item per line.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estimated completion time</label>
            <Input value={estimatedDuration} onChange={e => setEstimatedDuration(e.target.value)} placeholder="e.g. 45 minutes" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Video URL <span className="text-gray-400 font-normal">(optional)</span></label>
            <Input value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
            <p className="text-xs text-gray-400 mt-1">Optional and off by default — a video only appears if this is set.</p>
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
