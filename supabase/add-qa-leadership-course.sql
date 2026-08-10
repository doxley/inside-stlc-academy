-- ============================================================
-- Add the "QA Leadership Academy" course (Course 7).
-- Run in Supabase SQL Editor (safe to run more than once).
-- Slug must match /course/<slug> and src/lib/courses.ts.
-- Additive & non-destructive — new slug, no existing rows touched.
-- ============================================================

insert into public.courses (title, slug, description, status)
values (
  'QA Leadership Academy',
  'qa-leadership-academy',
  'A practical QA leadership programme for Test Leads, QA Managers and experienced testers who want to build high-performing teams, create effective quality strategies and influence engineering organisations at leadership level.',
  'published'
)
on conflict (slug) do nothing;
