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
