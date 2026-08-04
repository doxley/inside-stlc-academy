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

/** Human-friendly "time ago" for activity timestamps. */
export function formatRelativeTime(dateStr: string) {
  const then = new Date(dateStr).getTime();
  const diffMs = Date.now() - then;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} minute${mins === 1 ? '' : 's'} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years === 1 ? '' : 's'} ago`;
}

/**
 * Coarse activity status from a "last active" timestamp, for an at-a-glance
 * badge: active within a week, idle within a month, otherwise inactive.
 */
export function getActivityStatus(dateStr: string | null): { label: string; colour: string } {
  if (!dateStr) return { label: 'Never active', colour: 'bg-gray-100 text-gray-600' };
  const days = (Date.now() - new Date(dateStr).getTime()) / 86400000;
  if (days <= 7) return { label: 'Active', colour: 'bg-green-100 text-green-800' };
  if (days <= 30) return { label: 'Idle', colour: 'bg-yellow-100 text-yellow-800' };
  return { label: 'Inactive', colour: 'bg-red-100 text-red-800' };
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
