-- ============================================================
-- Modern Test Automation Bootcamp — course row.
-- Created as 'draft' so it is NOT catalogue-visible until the content is
-- populated and it is explicitly published in the final step. Idempotent.
-- Uses completion_gating so each module unlocks only when the previous
-- module's assignment + quiz are passed.
-- ============================================================

-- Defensive: the completion-gating column may not exist yet in this database.
alter table public.courses add column if not exists completion_gating boolean not null default false;

insert into public.courses (title, slug, description, status, drip_enabled, drip_type, completion_gating)
values (
  'Modern Test Automation Bootcamp',
  'modern-test-automation-bootcamp',
  'Hands-on Playwright, TypeScript, API, CI/CD and AI automation with real projects. Build a production-style automation framework and prove it with three portfolio projects — then publish it as portfolio evidence.',
  'draft',
  false,
  'none',
  true
)
on conflict (slug) do nothing;
