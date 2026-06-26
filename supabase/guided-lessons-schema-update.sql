-- ============================================================
-- Guided Written Lessons — Schema Updates
-- Repositions modules as practical written lessons (no video reliance).
-- Run in Supabase SQL Editor (safe to run more than once).
-- ============================================================

alter table public.modules
  add column if not exists lesson_overview      text,
  add column if not exists guided_notes         text,
  add column if not exists practical_task       text,
  add column if not exists reflection_question  text,
  add column if not exists completion_checklist text[];

-- video_url already exists and stays OPTIONAL. Courses do not rely on video;
-- a video only renders when a module has a real video_url value.
comment on column public.modules.video_url is
  'Optional. Video is disabled by default — no video UI renders unless this is set.';
