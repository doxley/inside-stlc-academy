-- ============================================================================
-- CV Review Service — schema (orders, AI-assisted review, private uploads).
-- Additive & idempotent. Run in the Supabase SQL editor.
-- ============================================================================

-- ── Orders / reviews ───────────────────────────────────────────────
create table if not exists public.cv_reviews (
  id                  uuid primary key default uuid_generate_v4(),
  user_id             uuid not null references public.profiles(id) on delete cascade,
  email               text,                     -- buyer email (helps guest→account mapping)

  -- lifecycle status:
  --   awaiting_upload  -> paid, waiting for the customer to upload their CV
  --   submitted        -> CV uploaded, waiting for review
  --   in_review        -> admin working on it (AI draft may exist)
  --   delivered        -> initial review delivered to the customer
  --   followup_submitted -> customer uploaded an amended CV for the included follow-up
  --   completed        -> follow-up delivered / order closed
  --   cancelled        -> refunded / cancelled
  status              text not null default 'awaiting_upload',

  express             boolean not null default false,  -- +£29, 24h turnaround
  amend_addon         boolean not null default false,  -- +£39, "we amend it for you"

  -- Files live in the private `cv-uploads` bucket; these are object paths.
  cv_file_path        text,
  cv_file_name        text,
  followup_file_path  text,
  followup_file_name  text,

  -- Delivered review content (shown to the customer once delivered).
  score               int check (score is null or (score >= 0 and score <= 100)),
  review_good         text,
  review_improve      text,
  review_summary      text,
  amended_cv          text,                     -- rewritten CV (markdown), when amend_addon
  followup_notes      text,                     -- follow-up review after the amended resubmission

  -- AI draft (human-in-the-loop). Never shown to the customer until an admin
  -- copies/edits it into the fields above and delivers. Shape:
  --   { score, good, improve, summary, amendedCv, model, generatedAt }
  ai_draft            jsonb,
  ai_model            text,
  ai_generated_at     timestamptz,

  -- Timeline.
  submitted_at        timestamptz,
  due_at              timestamptz,
  delivered_at        timestamptz,
  followup_submitted_at timestamptz,
  completed_at        timestamptz,
  cv_deleted_at       timestamptz,              -- when uploaded files were purged

  -- Payment linkage.
  stripe_session_id   text,
  amount_total        int,

  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);
create index if not exists cv_reviews_user_idx on public.cv_reviews(user_id);
create index if not exists cv_reviews_status_idx on public.cv_reviews(status);

alter table public.cv_reviews enable row level security;

drop policy if exists "Customers view own cv reviews" on public.cv_reviews;
create policy "Customers view own cv reviews"
  on public.cv_reviews for select using (auth.uid() = user_id);

-- Customers may update only their own row (used to attach an uploaded file /
-- mark it submitted). Column-level safety is enforced in the app via the
-- service role for all status/review writes; this policy just scopes ownership.
drop policy if exists "Customers update own cv reviews" on public.cv_reviews;
create policy "Customers update own cv reviews"
  on public.cv_reviews for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Admins manage cv reviews" on public.cv_reviews;
create policy "Admins manage cv reviews"
  on public.cv_reviews for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Keep updated_at fresh.
create or replace function public.touch_cv_reviews_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;
drop trigger if exists cv_reviews_touch on public.cv_reviews;
create trigger cv_reviews_touch before update on public.cv_reviews
  for each row execute function public.touch_cv_reviews_updated_at();

-- ── STORAGE: private cv-uploads bucket ─────────────────────────────
-- Object path convention: {user_id}/{cv_review_id}/{timestamp}.{ext}
insert into storage.buckets (id, name, public)
values ('cv-uploads', 'cv-uploads', false)
on conflict (id) do nothing;

drop policy if exists "Customers upload own cv" on storage.objects;
create policy "Customers upload own cv"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'cv-uploads' and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Customers read own cv" on storage.objects;
create policy "Customers read own cv"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'cv-uploads' and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Customers delete own cv" on storage.objects;
create policy "Customers delete own cv"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'cv-uploads' and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Admins read all cv uploads" on storage.objects;
create policy "Admins read all cv uploads"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'cv-uploads'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ── Terms acceptance (recorded at checkout) ────────────────────────
-- Additive columns on payments so we have a record of which terms version a
-- customer accepted when they paid.
alter table public.payments add column if not exists terms_accepted_at timestamptz;
alter table public.payments add column if not exists terms_version text;
-- A short human label for non-course purchases (e.g. "CV Review", "CV Review — Express").
alter table public.payments add column if not exists product_label text;
