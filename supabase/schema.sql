-- ============================================================
-- Inside STLC Academy – Database Schema
-- Run this in Supabase SQL Editor after creating your project
-- ============================================================

-- Enable extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────
-- PROFILES (extends Supabase auth.users)
-- ─────────────────────────────────────────────────────────────
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  first_name  text,
  last_name   text,
  role        text not null default 'student' check (role in ('student','admin','tutor')),
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "Admins can insert profiles"
  on public.profiles for insert with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Automatically create a profile when a user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, first_name, last_name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    coalesce(new.raw_user_meta_data->>'role', 'student')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─────────────────────────────────────────────────────────────
-- COURSES
-- ─────────────────────────────────────────────────────────────
create table public.courses (
  id            uuid primary key default uuid_generate_v4(),
  title         text not null,
  slug          text not null unique,
  description   text,
  thumbnail_url text,
  status        text not null default 'draft' check (status in ('draft','published')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.courses enable row level security;

create policy "Published courses visible to all authenticated users"
  on public.courses for select using (
    status = 'published'
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "Admins manage courses"
  on public.courses for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ─────────────────────────────────────────────────────────────
-- MODULES
-- ─────────────────────────────────────────────────────────────
create table public.modules (
  id                  uuid primary key default uuid_generate_v4(),
  course_id           uuid not null references public.courses(id) on delete cascade,
  module_number       int not null,
  title               text not null,
  slug                text not null,
  description         text,
  learning_objectives text[],
  estimated_duration  text,
  video_url           text,
  status              text not null default 'draft' check (status in ('draft','published','coming_soon')),
  unlock_day          int default 0,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  unique (course_id, module_number),
  unique (course_id, slug)
);

alter table public.modules enable row level security;

create policy "Authenticated users can view modules"
  on public.modules for select using (auth.role() = 'authenticated');

create policy "Admins manage modules"
  on public.modules for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ─────────────────────────────────────────────────────────────
-- ENROLMENTS  (must come before resources so its RLS can reference this)
-- ─────────────────────────────────────────────────────────────
create table public.enrolments (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  course_id    uuid not null references public.courses(id) on delete cascade,
  status       text not null default 'active' check (status in ('active','suspended','completed')),
  enrolled_at  timestamptz not null default now(),
  completed_at timestamptz,
  unique (user_id, course_id)
);

alter table public.enrolments enable row level security;

create policy "Students view own enrolments"
  on public.enrolments for select using (auth.uid() = user_id);

create policy "Admins manage enrolments"
  on public.enrolments for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ─────────────────────────────────────────────────────────────
-- RESOURCES (downloads) — enrolments must exist first
-- ─────────────────────────────────────────────────────────────
create table public.resources (
  id                  uuid primary key default uuid_generate_v4(),
  course_id           uuid references public.courses(id) on delete cascade,
  module_id           uuid references public.modules(id) on delete set null,
  title               text not null,
  description         text,
  category            text not null default 'general',
  file_url            text not null,
  file_type           text,
  file_size_bytes     bigint,
  visible_to_students boolean not null default true,
  sort_order          int default 0,
  created_at          timestamptz not null default now()
);

alter table public.resources enable row level security;

create policy "Enrolled students can view resources"
  on public.resources for select using (
    visible_to_students = true
    and (
      exists (
        select 1 from public.enrolments e
        where e.user_id = auth.uid()
          and e.course_id = resources.course_id
          and e.status = 'active'
      )
      or exists (
        select 1 from public.profiles p
        where p.id = auth.uid() and p.role = 'admin'
      )
    )
  );

create policy "Admins manage resources"
  on public.resources for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ─────────────────────────────────────────────────────────────
-- MODULE PROGRESS
-- ─────────────────────────────────────────────────────────────
create table public.module_progress (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  course_id    uuid not null references public.courses(id) on delete cascade,
  module_id    uuid not null references public.modules(id) on delete cascade,
  status       text not null default 'not_started' check (status in ('not_started','in_progress','completed')),
  started_at   timestamptz,
  completed_at timestamptz,
  unique (user_id, module_id)
);

alter table public.module_progress enable row level security;

create policy "Students view own progress"
  on public.module_progress for select using (auth.uid() = user_id);

create policy "Students upsert own progress"
  on public.module_progress for all using (auth.uid() = user_id);

create policy "Admins view all progress"
  on public.module_progress for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "Admins update all progress"
  on public.module_progress for update using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ─────────────────────────────────────────────────────────────
-- ASSIGNMENTS (definition per module)
-- ─────────────────────────────────────────────────────────────
create table public.assignments (
  id           uuid primary key default uuid_generate_v4(),
  module_id    uuid not null references public.modules(id) on delete cascade,
  title        text not null,
  instructions text,
  required     boolean not null default true,
  created_at   timestamptz not null default now()
);

alter table public.assignments enable row level security;

create policy "Authenticated users view assignments"
  on public.assignments for select using (auth.role() = 'authenticated');

create policy "Admins manage assignments"
  on public.assignments for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ─────────────────────────────────────────────────────────────
-- ASSIGNMENT SUBMISSIONS
-- ─────────────────────────────────────────────────────────────
create table public.assignment_submissions (
  id                uuid primary key default uuid_generate_v4(),
  assignment_id     uuid not null references public.assignments(id) on delete cascade,
  user_id           uuid not null references public.profiles(id) on delete cascade,
  file_url          text not null,
  original_filename text not null,
  status            text not null default 'submitted'
                      check (status in ('submitted','reviewed','passed','needs_changes')),
  feedback          text,
  reviewed_by       uuid references public.profiles(id),
  submitted_at      timestamptz not null default now(),
  reviewed_at       timestamptz
);

alter table public.assignment_submissions enable row level security;

create policy "Students view own submissions"
  on public.assignment_submissions for select using (auth.uid() = user_id);

create policy "Students insert submissions"
  on public.assignment_submissions for insert with check (auth.uid() = user_id);

create policy "Admins manage all submissions"
  on public.assignment_submissions for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ─────────────────────────────────────────────────────────────
-- QUIZZES
-- ─────────────────────────────────────────────────────────────
create table public.quizzes (
  id         uuid primary key default uuid_generate_v4(),
  module_id  uuid not null references public.modules(id) on delete cascade,
  title      text not null,
  pass_mark  int not null default 70,
  created_at timestamptz not null default now()
);

alter table public.quizzes enable row level security;

create policy "Authenticated users view quizzes"
  on public.quizzes for select using (auth.role() = 'authenticated');

create policy "Admins manage quizzes"
  on public.quizzes for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- QUIZ QUESTIONS
create table public.quiz_questions (
  id            uuid primary key default uuid_generate_v4(),
  quiz_id       uuid not null references public.quizzes(id) on delete cascade,
  question_text text not null,
  question_type text not null default 'multiple_choice'
                  check (question_type in ('multiple_choice','true_false')),
  sort_order    int default 0
);

alter table public.quiz_questions enable row level security;

create policy "Authenticated users view questions"
  on public.quiz_questions for select using (auth.role() = 'authenticated');

create policy "Admins manage questions"
  on public.quiz_questions for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- QUIZ ANSWERS
create table public.quiz_answers (
  id          uuid primary key default uuid_generate_v4(),
  question_id uuid not null references public.quiz_questions(id) on delete cascade,
  answer_text text not null,
  is_correct  boolean not null default false
);

alter table public.quiz_answers enable row level security;

create policy "Authenticated users view answers"
  on public.quiz_answers for select using (auth.role() = 'authenticated');

create policy "Admins manage answers"
  on public.quiz_answers for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- QUIZ ATTEMPTS
create table public.quiz_attempts (
  id           uuid primary key default uuid_generate_v4(),
  quiz_id      uuid not null references public.quizzes(id) on delete cascade,
  user_id      uuid not null references public.profiles(id) on delete cascade,
  score        int not null,
  passed       boolean not null,
  attempted_at timestamptz not null default now()
);

alter table public.quiz_attempts enable row level security;

create policy "Students view own attempts"
  on public.quiz_attempts for select using (auth.uid() = user_id);

create policy "Students insert attempts"
  on public.quiz_attempts for insert with check (auth.uid() = user_id);

create policy "Admins view all attempts"
  on public.quiz_attempts for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ─────────────────────────────────────────────────────────────
-- CERTIFICATES
-- ─────────────────────────────────────────────────────────────
create table public.certificates (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid not null references public.profiles(id) on delete cascade,
  course_id        uuid not null references public.courses(id) on delete cascade,
  certificate_code text unique default encode(gen_random_bytes(12), 'hex'),
  status           text not null default 'pending'
                     check (status in ('pending','eligible','issued')),
  issued_at        timestamptz,
  unique (user_id, course_id)
);

alter table public.certificates enable row level security;

create policy "Students view own certificate"
  on public.certificates for select using (auth.uid() = user_id);

create policy "Admins manage certificates"
  on public.certificates for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ─────────────────────────────────────────────────────────────
-- PAYMENTS (Phase 2 placeholder)
-- ─────────────────────────────────────────────────────────────
create table public.payments (
  id                  uuid primary key default uuid_generate_v4(),
  user_id             uuid not null references public.profiles(id) on delete cascade,
  course_id           uuid references public.courses(id),
  provider            text not null default 'stripe',
  provider_payment_id text,
  amount              int,
  currency            text default 'gbp',
  status              text not null default 'pending',
  created_at          timestamptz not null default now()
);

alter table public.payments enable row level security;

create policy "Students view own payments"
  on public.payments for select using (auth.uid() = user_id);

create policy "Admins manage payments"
  on public.payments for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );
