-- ============================================================
-- Lessons layer — turns Modules into Module → Lessons.
-- Each lesson is a full guided written lesson (objectives, notes,
-- worked example, mistakes, exercise, reflection, knowledge check).
-- Run in Supabase SQL Editor (safe to re-run).
-- ============================================================

create table if not exists public.lessons (
  id                  uuid primary key default uuid_generate_v4(),
  module_id           uuid not null references public.modules(id) on delete cascade,
  lesson_number       int not null,
  title               text not null,
  estimated_time      text,
  learning_objectives text[],
  lesson_notes        text,   -- guided notes ("## Heading", "- bullet")
  worked_example      text,
  common_mistakes     text,
  real_world_tip      text,
  exercise            text,
  reflection_question text,
  knowledge_check     text,
  video_url           text,   -- optional, off by default
  status              text not null default 'published' check (status in ('draft','published')),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  unique (module_id, lesson_number)
);

-- Added fields (idempotent — safe whether or not the table pre-existed).
alter table public.lessons
  add column if not exists lesson_overview      text,
  add column if not exists completion_checklist text[];

alter table public.lessons enable row level security;

create policy "Authenticated users can view lessons"
  on public.lessons for select using (auth.role() = 'authenticated');

create policy "Admins manage lessons"
  on public.lessons for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Per-lesson progress.
create table if not exists public.lesson_progress (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  lesson_id    uuid not null references public.lessons(id) on delete cascade,
  course_id    uuid not null references public.courses(id) on delete cascade,
  status       text not null default 'not_started' check (status in ('not_started','in_progress','completed')),
  started_at   timestamptz,
  completed_at timestamptz,
  unique (user_id, lesson_id)
);

alter table public.lesson_progress enable row level security;

create policy "Students view own lesson progress"
  on public.lesson_progress for select using (auth.uid() = user_id);

create policy "Students upsert own lesson progress"
  on public.lesson_progress for all using (auth.uid() = user_id);

create policy "Admins view all lesson progress"
  on public.lesson_progress for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Resources can attach to a specific lesson (in addition to module/course).
alter table public.resources
  add column if not exists lesson_id uuid references public.lessons(id) on delete set null;

create index if not exists lessons_module_id_idx on public.lessons (module_id);
create index if not exists lesson_progress_user_idx on public.lesson_progress (user_id);
create index if not exists lesson_progress_course_idx on public.lesson_progress (course_id);
