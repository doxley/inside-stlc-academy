-- ─────────────────────────────────────────────────────────────
-- Add profiles.last_seen_at — the "last active" signal.
--
-- Updated (throttled) by the dashboard layout each time a learner opens
-- any dashboard page, so admins can gauge whether a student is active.
-- Distinct from auth.users.last_sign_in_at (their last actual login),
-- which is read live from the Auth admin API on the student detail page.
-- Idempotent — safe to re-run.
-- ─────────────────────────────────────────────────────────────

alter table public.profiles
  add column if not exists last_seen_at timestamptz;
