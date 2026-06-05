import type { Module, Enrolment } from '@/types';

/**
 * Given a module's unlock_day and the enrolment date,
 * returns whether the module is currently unlocked for the student.
 */
export function isModuleUnlocked(
  module: Module,
  enrolment: { enrolled_at: string } | null,
  dripEnabled: boolean,
  manualUnlockIds: string[] = []
): boolean {
  // Manual override always unlocks
  if (manualUnlockIds.includes(module.id)) return true;

  // If drip is disabled, all published modules are unlocked
  if (!dripEnabled) return module.status === 'published';

  // Module must be published
  if (module.status !== 'published') return false;

  // Module with unlock_day = 0 is always available
  if (!module.unlock_day || module.unlock_day === 0) return true;

  if (!enrolment) return false;

  const enrolledDate = new Date(enrolment.enrolled_at);
  const unlockDate = new Date(enrolledDate);
  unlockDate.setDate(unlockDate.getDate() + module.unlock_day);

  return new Date() >= unlockDate;
}

/**
 * Returns the date a module unlocks for a student.
 */
export function getModuleUnlockDate(
  module: Module,
  enrolment: { enrolled_at: string }
): Date {
  const enrolledDate = new Date(enrolment.enrolled_at);
  const unlockDate = new Date(enrolledDate);
  unlockDate.setDate(unlockDate.getDate() + (module.unlock_day ?? 0));
  return unlockDate;
}

/**
 * Formats a future unlock date for display.
 */
export function formatUnlockDate(date: Date): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 'Available now';
  if (diffDays === 1) return 'Unlocks tomorrow';
  if (diffDays < 7) return `Unlocks in ${diffDays} days`;

  return `Unlocks ${date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}`;
}
