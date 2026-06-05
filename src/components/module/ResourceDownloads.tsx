'use client';

import { useState } from 'react';
import { FileText, File, Eye, X, Lock } from 'lucide-react';
import { formatFileSize } from '@/lib/utils';
import type { Resource } from '@/types';

interface Props {
  resources: Resource[];
}

function fileIcon(type: string | null) {
  if (!type) return File;
  if (type.toLowerCase().includes('pdf')) return FileText;
  return File;
}

function isPdf(resource: Resource) {
  return resource.file_type?.toLowerCase() === 'pdf' ||
    resource.file_url?.toLowerCase().endsWith('.pdf');
}

export function ResourceDownloads({ resources }: Props) {
  const [viewingUrl, setViewingUrl] = useState<string | null>(null);
  const [viewingTitle, setViewingTitle] = useState<string>('');
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  async function handleView(resource: Resource) {
    setError('');
    setLoading(resource.id);

    const res = await fetch('/api/resources/signed-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resourceId: resource.id }),
    });

    const data = await res.json();
    setLoading(null);

    if (!res.ok) {
      setError(data.error ?? 'Could not open resource.');
      return;
    }

    setViewingTitle(resource.title);
    setViewingUrl(data.url);
  }

  return (
    <>
      <div className="space-y-2">
        {resources.map(resource => {
          const Icon = fileIcon(resource.file_type);
          const pdf = isPdf(resource);
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
                  <span className="text-xs text-gray-300 flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> Protected
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleView(resource)}
                disabled={loading === resource.id}
                className="flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-700 bg-brand-100 hover:bg-brand-200 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
              >
                {loading === resource.id ? (
                  <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <Eye className="w-3.5 h-3.5" />
                )}
                {pdf ? 'View' : 'Open'}
              </button>
            </div>
          );
        })}
        {error && (
          <p className="text-xs text-red-600 mt-2">{error}</p>
        )}
      </div>

      {/* Inline PDF viewer modal */}
      {viewingUrl && (
        <div className="fixed inset-0 bg-black/70 z-50 flex flex-col">
          {/* Viewer toolbar */}
          <div className="bg-navy-900 text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-brand-400" />
              <span className="text-sm font-medium truncate max-w-md">{viewingTitle}</span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Lock className="w-3 h-3" /> Protected content
              </span>
            </div>
            <button
              onClick={() => { setViewingUrl(null); setViewingTitle(''); }}
              className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors ml-4"
            >
              <X className="w-4 h-4" /> Close
            </button>
          </div>

          {/* PDF iframe — no toolbar, no download button */}
          <div className="flex-1 bg-gray-800 overflow-hidden">
            <iframe
              src={`${viewingUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
              className="w-full h-full border-0"
              title={viewingTitle}
              // Disable right-click context menu on the iframe area via CSS pointer-events trick
            />
          </div>

          <div className="bg-navy-900 text-gray-400 text-xs text-center py-2 flex-shrink-0">
            © Inside STLC Academy — This content is for enrolled students only. Do not share or distribute.
          </div>
        </div>
      )}
    </>
  );
}
