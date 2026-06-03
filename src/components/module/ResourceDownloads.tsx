'use client';

import { Download, FileText, File } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { formatFileSize } from '@/lib/utils';
import type { Resource } from '@/types';

interface Props {
  resources: Resource[];
}

function fileIcon(type: string | null) {
  if (!type) return File;
  if (type.includes('pdf')) return FileText;
  return File;
}

export function ResourceDownloads({ resources }: Props) {
  async function handleDownload(resource: Resource) {
    const supabase = createClient();
    const { data, error } = await supabase.storage
      .from('course-resources')
      .createSignedUrl(resource.file_url, 60);

    if (error || !data?.signedUrl) {
      alert('Could not generate download link. Please try again.');
      return;
    }

    const a = document.createElement('a');
    a.href = data.signedUrl;
    a.download = resource.title;
    a.click();
  }

  return (
    <div className="space-y-2">
      {resources.map(resource => {
        const Icon = fileIcon(resource.file_type);
        return (
          <div
            key={resource.id}
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-brand-200 hover:bg-brand-50 transition-colors group"
          >
            <div className="w-9 h-9 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon className="w-4 h-4 text-brand-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{resource.title}</p>
              <div className="flex items-center gap-2 mt-0.5">
                {resource.file_type && (
                  <span className="text-xs text-gray-400 uppercase">{resource.file_type}</span>
                )}
                {resource.file_size_bytes && (
                  <span className="text-xs text-gray-400">{formatFileSize(resource.file_size_bytes)}</span>
                )}
              </div>
            </div>
            <button
              onClick={() => handleDownload(resource)}
              className="flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-700 bg-brand-100 hover:bg-brand-200 px-3 py-1.5 rounded-md transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
          </div>
        );
      })}
    </div>
  );
}
