-- ============================================================
-- Phase 3 Schema Updates
-- Run in Supabase SQL Editor
-- ============================================================

-- Add drip release settings to courses
alter table public.courses
  add column if not exists drip_enabled boolean not null default false,
  add column if not exists drip_type text not null default 'none'
    check (drip_type in ('none','days_after_enrolment','manual')),
  add column if not exists default_module_gap_days int default 7;

-- Add manual unlock table for admin overrides
create table if not exists public.module_unlocks (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  module_id   uuid not null references public.modules(id) on delete cascade,
  unlocked_by uuid references public.profiles(id),
  unlocked_at timestamptz not null default now(),
  note        text,
  unique (user_id, module_id)
);

alter table public.module_unlocks enable row level security;

create policy "Students view own unlocks"
  on public.module_unlocks for select using (auth.uid() = user_id);

create policy "Admins manage unlocks"
  on public.module_unlocks for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Add quiz published flag
alter table public.quizzes
  add column if not exists published boolean not null default true,
  add column if not exists unlimited_attempts boolean not null default true,
  add column if not exists show_correct_answers boolean not null default false;

-- Add assignment published flag and file settings
alter table public.assignments
  add column if not exists published boolean not null default true,
  add column if not exists max_file_size_mb int default 25;
