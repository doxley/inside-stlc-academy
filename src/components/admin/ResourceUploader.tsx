'use client';

import { useState, useCallback } from 'react';
import { useDropzone, type FileRejection } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Upload, X } from 'lucide-react';
import type { Module } from '@/types';

interface Props {
  courseId: string;
  modules: Module[];
  defaultModuleId?: string;
}

const CATEGORIES = ['beginner', 'templates', 'career', 'ai', 'general'];

export function ResourceUploader({ courseId, modules, defaultModuleId }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('general');
  const [moduleId, setModuleId] = useState(defaultModuleId ?? '');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const onDrop = useCallback((accepted: File[]) => {
    setFile(accepted[0]);
    if (!title) setTitle(accepted[0].name.replace(/\.[^.]+$/, ''));
  }, [title]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: 100 * 1024 * 1024,
  });

  async function handleUpload() {
    if (!file || !title) return;
    setUploading(true);
    setError('');

    const supabase = createClient();
    const ext = file.name.split('.').pop();
    const path = `${courseId}/${Date.now()}-${file.name}`;

    const { error: storageError } = await supabase.storage
      .from('course-resources')
      .upload(path, file, { upsert: false });

    if (storageError) {
      setError('Upload failed: ' + storageError.message);
      setUploading(false);
      return;
    }

    await supabase.from('resources').insert({
      course_id: courseId,
      module_id: moduleId || null,
      title,
      category,
      file_url: path,
      file_type: ext?.toUpperCase(),
      file_size_bytes: file.size,
      visible_to_students: true,
    });

    setOpen(false);
    setTitle(''); setFile(null); setModuleId(''); setCategory('general');
    router.refresh();
    setUploading(false);
  }

  if (!open) {
    return (
      <Button size="sm" onClick={() => setOpen(true)}>
        <Upload className="w-4 h-4" />
        Upload resource
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Upload Resource</h2>
          <button onClick={() => setOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
        </div>

        <div className="space-y-4">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-brand-400 bg-brand-50' : file ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-brand-300'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className={`w-8 h-8 mx-auto mb-2 ${file ? 'text-green-500' : 'text-gray-400'}`} />
            {file ? (
              <p className="text-sm font-medium text-gray-900">{file.name}</p>
            ) : (
              <p className="text-sm text-gray-500">Drop a file here, or click to browse</p>
            )}
          </div>

          <Input label="Resource title" value={title} onChange={e => setTitle(e.target.value)} required />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link to module (optional)</label>
            <select
              value={moduleId}
              onChange={e => setModuleId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Not linked to a module</option>
              {modules.map(m => (
                <option key={m.id} value={m.id}>Module {m.module_number}: {m.title}</option>
              ))}
            </select>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        <div className="flex gap-3 mt-6">
          <Button onClick={handleUpload} loading={uploading} disabled={!file || !title} className="flex-1">
            Upload
          </Button>
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}
