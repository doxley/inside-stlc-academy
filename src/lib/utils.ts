import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function getModuleStatusLabel(status: string) {
  const map: Record<string, string> = {
    not_started: 'Not Started',
    in_progress: 'In Progress',
    completed: 'Completed',
    coming_soon: 'Coming Soon',
    locked: 'Locked',
  };
  return map[status] ?? status;
}

export function getSubmissionStatusLabel(status: string) {
  const map: Record<string, string> = {
    submitted: 'Submitted',
    reviewed: 'Reviewed',
    passed: 'Passed',
    needs_changes: 'Needs Changes',
  };
  return map[status] ?? status;
}

export function getSubmissionStatusColour(status: string) {
  const map: Record<string, string> = {
    submitted: 'bg-blue-100 text-blue-800',
    reviewed: 'bg-yellow-100 text-yellow-800',
    passed: 'bg-green-100 text-green-800',
    needs_changes: 'bg-red-100 text-red-800',
  };
  return map[status] ?? 'bg-gray-100 text-gray-800';
}
