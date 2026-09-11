-- ============================================================
-- Add a grade to certificates so they can record Pass vs Distinction.
-- Nullable and unconstrained-by-default so existing certificates are
-- unaffected. Off/absent means an un-graded (plain) certificate.
-- ============================================================

alter table public.certificates
  add column if not exists grade text
  check (grade is null or grade in ('pass', 'distinction'));
