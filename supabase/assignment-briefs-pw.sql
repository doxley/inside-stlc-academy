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
