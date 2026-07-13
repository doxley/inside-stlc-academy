-- ============================================================================
-- ISTQB Exam Practice Mode — schema (question bank, attempts, mock results).
-- Additive & idempotent. Run in the Supabase SQL editor before the question seed.
-- ============================================================================

-- ── Question bank ──────────────────────────────────────────────────
create table if not exists public.practice_questions (
  id             uuid primary key default uuid_generate_v4(),
  course_id      uuid not null references public.courses(id) on delete cascade,
  ext_key        text not null,             -- stable seed key (e.g. 'm4-07', 'mock1-12') for idempotent re-seeds
  syllabus_topic text not null,            -- e.g. 'Fundamentals of Testing'
  module_number  int,                       -- 1..12 (maps to a module)
  k_level        text check (k_level is null or k_level in ('K1','K2','K3')),
  mock           int,                        -- null = topic bank; 1 or 2 = mock exam
  mock_order     int,                        -- position within a mock exam
  question_text  text not null,
  options        jsonb not null,             -- [{ "text": str, "correct": bool, "why": str }]
  explanation    text not null,
  workplace_example text,
  created_at     timestamptz not null default now(),
  unique (course_id, ext_key)
);
create index if not exists practice_questions_course_idx on public.practice_questions(course_id, syllabus_topic);
create index if not exists practice_questions_mock_idx on public.practice_questions(course_id, mock, mock_order);

alter table public.practice_questions enable row level security;
drop policy if exists "Authenticated view practice questions" on public.practice_questions;
create policy "Authenticated view practice questions"
  on public.practice_questions for select using (auth.role() = 'authenticated');
drop policy if exists "Admins manage practice questions" on public.practice_questions;
create policy "Admins manage practice questions"
  on public.practice_questions for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ── Per-answer attempts (weak-area tracking) ───────────────────────
create table if not exists public.question_attempts (
  id             uuid primary key default uuid_generate_v4(),
  user_id        uuid not null references public.profiles(id) on delete cascade,
  question_id    uuid not null references public.practice_questions(id) on delete cascade,
  course_id      uuid not null references public.courses(id) on delete cascade,
  syllabus_topic text,
  is_correct     boolean not null,
  mode           text,                       -- 'topic' | 'random' | 'timed' | 'mock' | 'revision'
  attempted_at   timestamptz not null default now()
);
create index if not exists question_attempts_user_idx on public.question_attempts(user_id, course_id);

alter table public.question_attempts enable row level security;
drop policy if exists "Students view own attempts" on public.question_attempts;
create policy "Students view own attempts"
  on public.question_attempts for select using (auth.uid() = user_id);
drop policy if exists "Students insert own attempts" on public.question_attempts;
create policy "Students insert own attempts"
  on public.question_attempts for insert with check (auth.uid() = user_id);
drop policy if exists "Admins view all attempts" on public.question_attempts;
create policy "Admins view all attempts"
  on public.question_attempts for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ── Mock exam results ──────────────────────────────────────────────
create table if not exists public.mock_exam_results (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  course_id   uuid not null references public.courses(id) on delete cascade,
  mock        int not null,
  score       int not null,
  total       int not null,
  passed      boolean not null,
  weak_topics jsonb,
  taken_at    timestamptz not null default now()
);
create index if not exists mock_exam_results_user_idx on public.mock_exam_results(user_id, course_id);

alter table public.mock_exam_results enable row level security;
drop policy if exists "Students view own mock results" on public.mock_exam_results;
create policy "Students view own mock results"
  on public.mock_exam_results for select using (auth.uid() = user_id);
drop policy if exists "Students insert own mock results" on public.mock_exam_results;
create policy "Students insert own mock results"
  on public.mock_exam_results for insert with check (auth.uid() = user_id);
drop policy if exists "Admins view all mock results" on public.mock_exam_results;
create policy "Admins view all mock results"
  on public.mock_exam_results for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );
