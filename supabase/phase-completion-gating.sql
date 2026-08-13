-- ============================================================
-- Completion-based module gating.
--
-- Adds a per-course flag. When true, a module only unlocks once the PREVIOUS
-- module is "complete" — its assignment passed (if it has one) and its quiz
-- passed (if it has one); modules with neither fall back to module_progress
-- being 'completed'. This combines with the existing drip settings (both
-- must allow unlock) and is always overridden by a manual unlock
-- (public.module_unlocks / the admin "Unlock" button).
--
-- Off by default, so existing courses are unaffected until explicitly enabled.
-- ============================================================

alter table public.courses
  add column if not exists completion_gating boolean not null default false;

-- Enable it for a course by slug, e.g. the 90-Day roadmap:
--   update public.courses set completion_gating = true
--   where slug = '90-day-software-testing-career-roadmap';
