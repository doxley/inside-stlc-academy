-- ============================================================
-- Payment / Stripe Schema Updates
-- Run in Supabase SQL Editor (safe to run more than once)
-- ============================================================

-- ── Extend the existing payments table for Stripe Checkout ──
alter table public.payments
  add column if not exists stripe_session_id text;

-- Idempotency: one fulfilment per Checkout Session.
create unique index if not exists payments_stripe_session_id_key
  on public.payments (stripe_session_id)
  where stripe_session_id is not null;

-- Helpful indexes for the admin purchases view and lookups.
create index if not exists payments_provider_payment_id_idx
  on public.payments (provider_payment_id);
create index if not exists payments_user_id_idx on public.payments (user_id);
create index if not exists payments_course_id_idx on public.payments (course_id);

-- ── Ensure all sellable courses exist (slug matches /course/<slug>) ──
-- The 90-Day course already ships in seed.sql; these two are added so the
-- webhook can resolve them by slug and grant access.
insert into public.courses (title, slug, description, status)
values
  (
    'AI for QA Testers',
    'ai-for-qa-testers',
    'Learn how to use AI tools professionally across test design, documentation, automation support, defect analysis, and QA workflows.',
    'published'
  ),
  (
    'QA Interview Accelerator',
    'qa-interview-accelerator',
    'Prepare for QA interviews with real questions, answer structures, CV guidance, test task preparation, and a final readiness pack.',
    'published'
  )
on conflict (slug) do nothing;
