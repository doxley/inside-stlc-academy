-- ─────────────────────────────────────────────────────────────
-- STORAGE: assignment-submissions bucket
--
-- The learner assignment upload (AssignmentSection) writes to a private
-- Storage bucket called "assignment-submissions"; the admin review panel
-- reads back via a signed URL. Without this bucket the upload fails with
-- "Bucket not found". This migration is idempotent — safe to re-run.
--
-- Object path convention (set in the app):
--   {user_id}/{assignment_id}/{timestamp}.{ext}
-- so the first path segment is always the owning user's id.
-- ─────────────────────────────────────────────────────────────

-- 1. Create the bucket (private — files are only reachable via signed URLs).
insert into storage.buckets (id, name, public)
values ('assignment-submissions', 'assignment-submissions', false)
on conflict (id) do nothing;

-- 2. RLS policies on storage.objects for this bucket.
--    Dropped-then-created so the script is safe to run repeatedly.

-- Students upload only into their own folder.
drop policy if exists "Students upload own submissions" on storage.objects;
create policy "Students upload own submissions"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'assignment-submissions'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Students can read back their own submissions.
drop policy if exists "Students read own submissions" on storage.objects;
create policy "Students read own submissions"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'assignment-submissions'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Admins (and tutors) can read every submission — powers the review panel's
-- signed-URL download.
drop policy if exists "Admins read all submissions" on storage.objects;
create policy "Admins read all submissions"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'assignment-submissions'
    and exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'tutor')
    )
  );
