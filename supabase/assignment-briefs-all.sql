-- ============================================================
-- COMBINED Assignment Briefs links — paste once into Supabase.
-- Adds brief_slug + links all 4 courses' assignments to their briefs.
-- Requires the assignments to exist (assignment-templates*.sql). Idempotent.
-- ============================================================

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

-- ▶ ai

-- ============================================================
-- Link AI for QA Testers assignments to their dedicated Assignment Briefs.
-- Run AFTER assignment-briefs.sql (adds brief_slug) and the AI assignments
-- exist (assignment-templates.sql). Idempotent.
-- ============================================================

update public.assignments a
set brief_slug = v.brief_slug
from public.modules m
join public.courses c on c.id = m.course_id
cross join (values
  (1,  'ai-m1-assignment-brief'),
  (2,  'ai-m2-assignment-brief'),
  (3,  'ai-m3-assignment-brief'),
  (4,  'ai-m4-assignment-brief'),
  (5,  'ai-m5-assignment-brief'),
  (6,  'ai-m6-assignment-brief'),
  (7,  'ai-m7-assignment-brief'),
  (8,  'ai-m8-assignment-brief'),
  (9,  'ai-m9-assignment-brief'),
  (10, 'ai-m10-assignment-brief'),
  (11, 'ai-m11-assignment-brief'),
  (12, 'ai-m12-assignment-brief')
) as v(module_number, brief_slug)
where a.module_id = m.id
  and c.slug = 'ai-for-qa-testers'
  and m.module_number = v.module_number;

-- ▶ qa

-- ============================================================
-- Link QA Interview Accelerator assignments to their Assignment Briefs.
-- Run AFTER assignment-briefs.sql and the QA assignments exist
-- (assignment-templates.sql). Idempotent.
-- ============================================================

update public.assignments a
set brief_slug = v.brief_slug
from public.modules m
join public.courses c on c.id = m.course_id
cross join (values
  (1, 'qa-m1-assignment-brief'),
  (2, 'qa-m2-assignment-brief'),
  (3, 'qa-m3-assignment-brief'),
  (4, 'qa-m4-assignment-brief'),
  (5, 'qa-m5-assignment-brief'),
  (6, 'qa-m6-assignment-brief'),
  (7, 'qa-m7-assignment-brief'),
  (8, 'qa-m8-assignment-brief')
) as v(module_number, brief_slug)
where a.module_id = m.id
  and c.slug = 'qa-interview-accelerator'
  and m.module_number = v.module_number;

-- ▶ pw

-- ============================================================
-- Link Playwright assignments to their Assignment Briefs.
-- Run AFTER assignment-briefs.sql and the Playwright assignments exist
-- (assignment-templates-playwright.sql). Idempotent.
-- ============================================================

update public.assignments a
set brief_slug = v.brief_slug
from public.modules m
join public.courses c on c.id = m.course_id
cross join (values
  (1,  'pw-m1-assignment-brief'),
  (2,  'pw-m2-assignment-brief'),
  (3,  'pw-m3-assignment-brief'),
  (4,  'pw-m4-assignment-brief'),
  (5,  'pw-m5-assignment-brief'),
  (6,  'pw-m6-assignment-brief'),
  (7,  'pw-m7-assignment-brief'),
  (8,  'pw-m8-assignment-brief'),
  (9,  'pw-m9-assignment-brief'),
  (10, 'pw-m10-assignment-brief'),
  (11, 'pw-m11-assignment-brief'),
  (12, 'pw-m12-assignment-brief')
) as v(module_number, brief_slug)
where a.module_id = m.id
  and c.slug = 'practical-test-automation-playwright'
  and m.module_number = v.module_number;
