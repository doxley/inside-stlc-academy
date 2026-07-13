-- ============================================================
-- Add the "ISTQB Foundation Masterclass" course.
-- Run in Supabase SQL Editor (safe to run more than once).
-- Slug must match /course/<slug> and src/lib/courses.ts.
-- ============================================================

insert into public.courses (title, slug, description, status)
values (
  'ISTQB Foundation Masterclass',
  'istqb-foundation-masterclass',
  'Master the ISTQB Foundation syllabus while learning how experienced QA professionals apply these principles in real software testing projects.',
  'published'
)
on conflict (slug) do nothing;
