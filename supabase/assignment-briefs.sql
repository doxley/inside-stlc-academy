-- ============================================================
-- Adds assignments.brief_slug — links an assignment to its dedicated,
-- module-specific Assignment Brief (a Resource Vault doc with the full
-- scenario, deliverables, steps and assessment criteria). Separate from
-- template_slug (a structuring aid). Idempotent.
--
-- This file links the 90-Day course. AI / QA-Interview / Playwright are
-- linked in assignment-briefs-<course>.sql once their briefs are generated.
-- ============================================================

alter table public.assignments add column if not exists brief_slug text;

-- 90-Day: link each assignment to its brief (matched by module UUID).
update public.assignments set brief_slug = '90day-m1-assignment-brief'  where module_id = 'b1000001-0000-0000-0000-000000000001';
update public.assignments set brief_slug = '90day-m2-assignment-brief'  where module_id = 'b1000002-0000-0000-0000-000000000001';
update public.assignments set brief_slug = '90day-m3-assignment-brief'  where module_id = 'b1000003-0000-0000-0000-000000000001';
update public.assignments set brief_slug = '90day-m4-assignment-brief'  where module_id = 'b1000004-0000-0000-0000-000000000001';
update public.assignments set brief_slug = '90day-m5-assignment-brief'  where module_id = 'b1000005-0000-0000-0000-000000000001';
update public.assignments set brief_slug = '90day-m6-assignment-brief'  where module_id = 'b1000006-0000-0000-0000-000000000001';
update public.assignments set brief_slug = '90day-m7-assignment-brief'  where module_id = 'b1000007-0000-0000-0000-000000000001';
update public.assignments set brief_slug = '90day-m8-assignment-brief'  where module_id = 'b1000008-0000-0000-0000-000000000001';
update public.assignments set brief_slug = '90day-m9-assignment-brief'  where module_id = 'b1000009-0000-0000-0000-000000000001';
update public.assignments set brief_slug = '90day-m10-assignment-brief' where module_id = 'b1000010-0000-0000-0000-000000000001';
update public.assignments set brief_slug = '90day-m11-assignment-brief' where module_id = 'b1000011-0000-0000-0000-000000000001';
update public.assignments set brief_slug = '90day-m12-assignment-brief' where module_id = 'b1000012-0000-0000-0000-000000000001';
