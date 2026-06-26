import { ClipboardList } from 'lucide-react';

interface Props {
  task: string;
  title?: string;
}

// Renders the module's hands-on activity. Supports simple multi-line text
// (each line becomes a paragraph / step).
export function PracticalTaskCard({ task, title = 'Practical Activity' }: Props) {
  const lines = task.split('\n').map((l) => l.trim()).filter(Boolean);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 bg-brand-100 rounded-lg flex items-center justify-center">
          <ClipboardList className="w-4 h-4 text-brand-600" />
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
        {lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  );
}
