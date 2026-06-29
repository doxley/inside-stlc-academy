# Supabase SQL — Run Order (go-live runbook)

Run these in the **Supabase SQL editor**, top to bottom. **Every file is
idempotent** — safe to re-run. If you are unsure what has already been run,
running the whole list again will do no harm.

---

## What your dashboard tells us right now
- **90-Day** shows 12 modules → its content is loaded ✅
- **AI for QA / QA Interview** show **0 modules** → their module/lesson seeds
  have **not** been run yet ❌
- **Playwright** is missing entirely → its course row has **not** been created ❌

If you only want to fix that, jump to **"Minimum set to run now"** at the bottom.

---

## Full order

### Phase A — Schema & structure (run once each)
1. `schema.sql` — base tables
2. `phase3-schema-update.sql`
3. `payment-schema-update.sql` — payment tables **+ creates the AI for QA and QA Interview course rows**
4. `guided-lessons-schema-update.sql`
5. `portfolio-url-submission.sql` — adds `assignments.submission_type`
6. `lessons-schema.sql` — `lessons` + `lesson_progress` tables

### Phase B — Course rows & modules
7. `seed.sql` — 90-Day course + Module 1 + quizzes
8. `seed-phase3.sql` — 90-Day Modules 2–12 + assignments + quizzes
9. `add-playwright-course.sql` — **Playwright course row**
10. `seed-ai-qa-modules.sql` — AI for QA: 12 modules
11. `seed-qa-interview-modules.sql` — QA Interview: 8 modules
12. `seed-playwright-modules.sql` — Playwright: 12 modules

### Phase C — Lessons
**90-Day:**
13. `seed-90day-module1-lessons.sql`
14. `seed-90day-modules-2-3-lessons.sql`
15. `seed-90day-modules-4-5-lessons.sql`
16. `seed-90day-modules-6-7-lessons.sql`
17. `seed-90day-modules-8-9-lessons.sql`
18. `seed-90day-modules-10-12-lessons.sql`

**AI for QA:**
19. `seed-ai-qa-modules-1-2-lessons.sql`
20. `seed-ai-qa-modules-3-4-lessons.sql`
21. `seed-ai-qa-modules-5-6-lessons.sql`
22. `seed-ai-qa-modules-7-8-lessons.sql`
23. `seed-ai-qa-modules-9-10-lessons.sql`
24. `seed-ai-qa-modules-11-12-lessons.sql`

**QA Interview:**
25. `seed-qa-interview-modules-1-2-lessons.sql`
26. `seed-qa-interview-modules-3-4-lessons.sql`
27. `seed-qa-interview-modules-5-6-lessons.sql`
28. `seed-qa-interview-modules-7-8-lessons.sql`

**Playwright:**
29. `seed-playwright-modules-1-3-lessons.sql`
30. `seed-playwright-modules-4-6-lessons.sql`
31. `seed-playwright-modules-7-9-lessons.sql`
32. `seed-playwright-modules-10-12-lessons.sql`

### Phase D — Assignments & templates
33. `assignment-templates.sql` — adds `assignments.template_slug`, links 90-Day assignments, **seeds AI for QA (12) + QA Interview (8) assignments**
34. `assignment-templates-playwright.sql` — Playwright: 12 assignments (needs #33 first)

### Phase E — Test user
35. `enrol-test-user.sql` — enrols `doxley9@gmail.com` into all courses (re-run after Playwright exists so it gets picked up)

---

## Minimum set to run now (to match what you've already done)
You've already run Phase A + the 90-Day content. To bring the other three
courses up to the same state, run **in this order**:

```
add-playwright-course.sql
seed-ai-qa-modules.sql
seed-qa-interview-modules.sql
seed-playwright-modules.sql
seed-ai-qa-modules-1-2-lessons.sql
seed-ai-qa-modules-3-4-lessons.sql
seed-ai-qa-modules-5-6-lessons.sql
seed-ai-qa-modules-7-8-lessons.sql
seed-ai-qa-modules-9-10-lessons.sql
seed-ai-qa-modules-11-12-lessons.sql
seed-qa-interview-modules-1-2-lessons.sql
seed-qa-interview-modules-3-4-lessons.sql
seed-qa-interview-modules-5-6-lessons.sql
seed-qa-interview-modules-7-8-lessons.sql
seed-playwright-modules-1-3-lessons.sql
seed-playwright-modules-4-6-lessons.sql
seed-playwright-modules-7-9-lessons.sql
seed-playwright-modules-10-12-lessons.sql
assignment-templates.sql
assignment-templates-playwright.sql
enrol-test-user.sql
```

After that: refresh the dashboard — all four courses should show their module
counts, lessons and assignments, and your test user will be enrolled in all four.

---

## Separate from SQL — auth emails / login links
Not database work, but still outstanding (see `EMAIL_SETUP.md`):
- Enable **custom SMTP** in Supabase (required before you can edit templates),
  then paste the branded templates from `supabase/email-templates/`.
- Set Supabase **Site URL** + add Redirect URLs, and set `NEXT_PUBLIC_SITE_URL`
  in Vercel — this is what stops auth links pointing at `localhost`.
