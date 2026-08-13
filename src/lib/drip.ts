import type { Module, Enrolment } from '@/types';

/**
 * Given a module's unlock_day and the enrolment date,
 * returns whether the module is currently unlocked for the student.
 */
export function isModuleUnlocked(
  module: Module,
  enrolment: { enrolled_at: string } | null,
  dripEnabled: boolean,
  manualUnlockIds: string[] = [],
  // Completion-based gating (opt-in per course). When completionGating is true,
  // the module stays locked until the previous module is complete. Both these
  // default to off/true so existing callers behave exactly as before.
  completionGating = false,
  previousModuleComplete = true
): boolean {
  // Manual override always unlocks
  if (manualUnlockIds.includes(module.id)) return true;

  // Module must be published
  if (module.status !== 'published') return false;

  // Completion gate: the previous module must be finished first.
  if (completionGating && !previousModuleComplete) return false;

  // If drip is disabled, a published module is otherwise unlocked
  if (!dripEnabled) return true;

  // Module with unlock_day = 0 is always available (drip-wise)
  if (!module.unlock_day || module.unlock_day === 0) return true;

  if (!enrolment) return false;

  const enrolledDate = new Date(enrolment.enrolled_at);
  const unlockDate = new Date(enrolledDate);
  unlockDate.setDate(unlockDate.getDate() + module.unlock_day);

  return new Date() >= unlockDate;
}

/**
 * Whether a module counts as "complete" for completion-based gating:
 * its assignment is passed (if it has one) AND its quiz is passed (if it has
 * one). A module with neither falls back to its module_progress being
 * 'completed' (e.g. all lessons done / marked complete).
 */
export function isModuleGatingComplete(opts: {
  assignmentId: string | null;
  quizId: string | null;
  passedAssignmentIds: Set<string>;
  passedQuizIds: Set<string>;
  moduleProgressStatus?: string | null;
}): boolean {
  const { assignmentId, quizId, passedAssignmentIds, passedQuizIds, moduleProgressStatus } = opts;
  if (!assignmentId && !quizId) return moduleProgressStatus === 'completed';
  const assignmentOk = !assignmentId || passedAssignmentIds.has(assignmentId);
  const quizOk = !quizId || passedQuizIds.has(quizId);
  return assignmentOk && quizOk;
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
