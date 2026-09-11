# Modern Test Automation Bootcamp — go-live runbook

Everything below is **additive and idempotent**. It does **not** touch the
existing "Practical Test Automation with Playwright" course or any other course
or student data. The course row is seeded as `draft` and only becomes visible
when you publish it in the final step.

## 0. Prerequisites (already applied in production for the other courses)
These should already exist; listed for completeness. Safe to re-run.
- `lessons-schema.sql`
- `lesson-enhancements-schema.sql`
- `phase3-schema-update.sql` (drip columns)
- `phase-completion-gating.sql` (adds `courses.completion_gating` — the course
  seed also adds it defensively, so you can skip if unsure)

## 1. Course shell
1. `add-modern-automation-course.sql`
2. `seed-modern-automation-modules.sql`

## 2. Lessons (16 files)
`seed-modern-automation-module-1-lessons.sql` … `-16-lessons.sql`

## 3. Lesson enhancements (16 files)
`seed-modern-automation-module-1-enhancements.sql` … `-16-enhancements.sql`

## 4. Assignments (12 labs + 3 projects)
`seed-modern-automation-assignments.sql`

## 5. Quizzes (10 quizzes / 110 questions)
1. `seed-modern-automation-quizzes-a.sql`
2. `seed-modern-automation-quizzes-b.sql`

## 6. Certificate grade capability (Pass / Distinction)
`phase-certificate-grade.sql`

## 7. Verify (optional but recommended)
```sql
with c as (select id from public.courses where slug = 'modern-test-automation-bootcamp')
select 'modules' as entity, count(*) as actual, 16 as expected from public.modules where course_id = (select id from c)
union all select 'lessons', count(*), 91 from public.lessons l join public.modules m on m.id = l.module_id where m.course_id = (select id from c)
union all select 'lessons w/ enhancements', count(*), 91 from public.lessons l join public.modules m on m.id = l.module_id where m.course_id = (select id from c) and l.enhancements is not null
union all select 'assignments', count(*), 15 from public.assignments a join public.modules m on m.id = a.module_id where m.course_id = (select id from c)
union all select 'quizzes', count(*), 10 from public.quizzes q join public.modules m on m.id = q.module_id where m.course_id = (select id from c)
union all select 'quiz questions', count(*), 110 from public.quiz_questions qq join public.quizzes q on q.id = qq.quiz_id join public.modules m on m.id = q.module_id where m.course_id = (select id from c)
order by entity;
```
Every `actual` should equal `expected`.

## 8. Publish (makes it live in the catalogue)
Only after the checks pass and you've reviewed the running course. The homepage
already links to it (it was promoted from "Coming Soon" in this change), so
publish before/at the same time as the code merge to avoid a live-but-empty card.
```sql
update public.courses set status = 'published'
where slug = 'modern-test-automation-bootcamp';
```

## 9. (Optional) enrol your test account
Re-run `enrol-test-user.sql`, or enrol via the admin UI, to preview it end to end.

---
### Notes
- **Pricing:** £199 (in `src/lib/courses.ts`). A £149 launch price is wired as a
  dormant capability (`launchActive: false`) — flip it on there when you want the
  launch promo.
- **Tutor answer key** for all 15 assignments: `docs/MODERN_AUTOMATION_TUTOR_ANSWER_KEY.md`.
- **Distinction certificates:** the `grade` column is nullable; set
  `grade = 'distinction'` (or `'pass'`) on a certificate row when you issue it to
  show the distinction seal.
