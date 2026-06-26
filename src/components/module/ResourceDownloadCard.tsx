import { FileText } from 'lucide-react';

interface Props {
  title: string;
  description?: string;
  href?: string;
}

// A single resource entry — a template, prompt set, checklist, or download.
// Used for resources described in module content; protected file downloads
// from the resources table are handled by ResourceDownloads.
export function ResourceDownloadCard({ title, description, href }: Props) {
  const inner = (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:border-brand-200 hover:bg-brand-50 transition-colors h-full">
      <div className="w-9 h-9 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <FileText className="w-4 h-4 text-brand-600" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {inner}
      </a>
    );
  }
  return inner;
}
