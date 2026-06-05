'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Upload, Edit2, Save } from 'lucide-react';
import type { Assignment } from '@/types';

interface Props {
  assignment: Assignment | null;
  moduleId: string;
}

export function AssignmentEditor({ assignment, moduleId }: Props) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(assignment?.title ?? '');
  const [instructions, setInstructions] = useState(assignment?.instructions ?? '');
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();

    if (assignment) {
      await supabase.from('assignments').update({ title, instructions }).eq('id', assignment.id);
    } else {
      await supabase.from('assignments').insert({ module_id: moduleId, title, instructions, required: true });
    }

    setEditing(false);
    router.refresh();
    setSaving(false);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-brand-600" />
            <CardTitle>Assignment</CardTitle>
          </div>
          {assignment && !editing && (
            <button onClick={() => setEditing(true)} className="text-gray-400 hover:text-brand-600 transition-colors">
              <Edit2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </CardHeader>

      {!assignment && !editing ? (
        <div className="text-center py-6">
          <p className="text-sm text-gray-500 mb-3">No assignment created for this module yet.</p>
          <Button size="sm" onClick={() => setEditing(true)}>Create assignment</Button>
        </div>
      ) : editing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assignment title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="e.g. Module 2 Assignment – Test Design Techniques"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instructions (shown to students)</label>
            <textarea
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
              rows={8}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
              placeholder="Describe what students need to submit..."
            />
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave} loading={saving}>
              <Save className="w-4 h-4" /> Save assignment
            </Button>
            {assignment && <Button size="sm" variant="ghost" onClick={() => { setEditing(false); setTitle(assignment.title); setInstructions(assignment.instructions ?? ''); }}>Cancel</Button>}
          </div>
        </div>
      ) : (
        <div>
          <p className="text-sm font-medium text-gray-900 mb-2">{assignment?.title}</p>
          <p className="text-sm text-gray-600 whitespace-pre-line">{assignment?.instructions}</p>
        </div>
      )}
    </Card>
  );
}
