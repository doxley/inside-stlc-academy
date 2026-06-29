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
