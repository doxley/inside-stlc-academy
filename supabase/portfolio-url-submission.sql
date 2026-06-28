-- ============================================================
-- Portfolio URL submissions (e.g. GitHub repo for the Playwright
-- portfolio project). Run in Supabase SQL Editor (safe to re-run).
-- ============================================================

-- Assignments can require a URL instead of a file upload.
alter table public.assignments
  add column if not exists submission_type text not null default 'file'
    check (submission_type in ('file','url'));

-- Submissions can carry a URL (file_url stays populated for compatibility).
alter table public.assignment_submissions
  add column if not exists submission_url text;
