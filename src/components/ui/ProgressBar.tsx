import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  className?: string;
  showPercent?: boolean;
  size?: 'sm' | 'md';
}

export function ProgressBar({ value, max = 100, label, className, showPercent = true, size = 'md' }: ProgressBarProps) {
  const percent = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercent) && (
        <div className="flex justify-between mb-1">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercent && <span className="text-sm text-gray-500">{percent}%</span>}
        </div>
      )}
      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', size === 'sm' ? 'h-2' : 'h-3')}>
        <div
          className="bg-brand-600 h-full rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
