-- ============================================================
-- Add the "Practical Test Automation with Playwright" course
-- Run in Supabase SQL Editor (safe to run more than once).
-- The slug must match the route /course/<slug> and src/lib/courses.ts
-- so the Stripe webhook can resolve the course and grant access.
-- ============================================================

insert into public.courses (title, slug, description, status)
values (
  'Practical Test Automation with Playwright',
  'practical-test-automation-playwright',
  'Master modern test automation from the ground up using Playwright, industry best practices, Page Object Models, BDD, Git, CI/CD and AI-assisted development.',
  'published'
)
on conflict (slug) do nothing;
