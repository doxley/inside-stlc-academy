-- ============================================================
-- Add the "API Testing Masterclass" course.
-- Run in Supabase SQL Editor (safe to run more than once).
-- The slug must match the route /course/<slug> and src/lib/courses.ts
-- so the Stripe webhook can resolve the course and grant access.
-- ============================================================

insert into public.courses (title, slug, description, status)
values (
  'API Testing Masterclass',
  'api-testing-masterclass',
  'Learn how to design, execute and automate API testing using Postman, REST principles, authentication, contract testing and AI-assisted workflows.',
  'published'
)
on conflict (slug) do nothing;
