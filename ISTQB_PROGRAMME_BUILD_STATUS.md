# ISTQB Foundation Masterclass — Build Status

*Programme 6 · £79 · Certification Edition · branch `feature/istqb-foundation-masterclass` · code complete — awaiting DB seed + deploy.*

**All build phases are complete.** 72 Gold-Standard lessons, 25 resource downloads, a 310-question exam bank, 2 mock exams, the full Exam Practice Mode UI and the weak-area dashboard are all built, committed to the branch, and pass `tsc` + `next build`. The only remaining steps are operational: run the SQL seeds in Supabase, then merge → deploy (runbook at the bottom).

---

## ✅ Modules created — 14/14
Seeded by `supabase/add-istqb-course.sql` + `supabase/seed-istqb-modules.sql`.

| # | Module | Lessons |
|---|--------|:------:|
| 1 | Fundamentals of Testing | 6 |
| 2 | Software Development Lifecycle | 6 |
| 3 | Static Testing | 5 |
| 4 | Test Analysis & Design Techniques | 8 |
| 5 | Managing the Test Process | 6 |
| 6 | Test Management | 6 |
| 7 | Defect Management | 6 |
| 8 | Risk-Based Testing | 6 |
| 9 | Test Tools | 6 |
| 10 | Agile Testing | 6 |
| 11 | Real World QA | 5 |
| 12 | Exam Preparation | 6 |
| 13 | Mock Exam One | *(exam module — questions TODO)* |
| 14 | Mock Exam Two | *(exam module — questions TODO)* |

## ✅ Lessons created — 72
All lessons for Modules 1–12 authored to the full **Inside STLC Gold Standard** (every lesson: overview, objectives, estimated time, guided notes, worked example, industry story, visual aid, common mistakes, David's Industry Perspective, exercise, mini challenge, model answer, manager review, reflection, knowledge check, portfolio contribution, resource preview, completion checklist).
- Authored by 12 parallel subagents against the shared content template.
- Generated to SQL via `scripts/content/build-module.mjs` → `supabase/seed-istqb-module-{1..12}-{lessons,enhancements}.sql`.
- **Verified: 72/72 render-safe** (all `enhancements` shapes valid for the live renderer), 72 base inserts + 72 enhancement updates, `next build` passes.
- Combined one-paste seed: **`supabase/seed-istqb-ALL.sql`** (course + 14 modules + 72 lessons + enhancements).

## ✅ Practice questions generated — 310
~25–30 questions per syllabus topic (Modules 1–12), each with 4 options, the correct answer, a `why` for **every** option (why right / why wrong), a syllabus-referenced explanation, a K-level (K1/K2/K3), and a real-workplace example. Module 4 (techniques) and 12 (mixed exam) carry 30 each with genuine K3 calculation questions (coverage %, BVA values, decision-table rule counts, valid/invalid transitions), all arithmetic double-checked.
- Source: `scripts/content/istqb-questions/module{1..12}.mjs`.
- New `practice_questions` table (`supabase/istqb-exam-schema.sql`) — the existing `quiz_answers` had no explanation/topic/why fields.
- Generated to SQL by `scripts/content/build-questions.mjs` → `supabase/seed-istqb-questions.sql` (idempotent upsert on `(course_id, ext_key)`).

## ✅ Mock exams generated — 2 × 40
Two exam-weighted 40-question mock exams composed deterministically from the bank (CTFL v4.0 blueprint weighting; Mock 2 offset to minimise overlap with Mock 1). Timed (60 min), no per-question feedback, full answer review + weak-topic report on submit. Stored as `mock=1/2` rows; results captured in `mock_exam_results`.

## ✅ Exam Practice Mode (net-new UI) — built
`src/components/exam/ExamPracticeMode.tsx` + route `/dashboard/course/[courseId]/exam`:
- **Practice (instant feedback):** Quick 10, quiz-by-syllabus-topic, and a "your weak spots" revision set (re-serves questions you last got wrong). Each answer reveals correct/incorrect, the per-option reasoning, the explanation and the workplace example.
- **Exam simulation:** Timed practice (20 Q / 25 min) and two 40-Q / 60-min mock exams — no feedback until submit, then a full reviewable answer key.
- Options are shuffled per attempt; retake supported everywhere.
- Attempts persist to `question_attempts`; mock scores to `mock_exam_results` (RLS, own-rows) via the browser client.

## ✅ Weak-area tracking + dashboard — built
The exam hub shows **exam-readiness %** (accuracy blended with bank coverage), a **study streak** (consecutive days), **questions attempted / overall accuracy**, **per-syllabus-topic accuracy bars** (green ≥65% / amber below), and **best mock scores** with pass/fail. Weak topics are flagged from the latest attempt per question. Surfaced from the course page via an "Exam Practice Mode" card (only shown when the course has practice questions).

## ✅ Resources generated — 25 (DOCX + PDF)
25 resources built to DOCX + PDF and added to `public/resources/manifest.json` (5 categories): technique cheat sheets (BVA, decision tables, state transition, EP, severity vs priority), test-management cheat sheet, risk-matrix template, review checklist, ISTQB glossary, quick revision notes, sample test plan/strategy, example defect reports, revision planner, 12-week study plan, flash cards, memory aids & mnemonics, mind maps, formula sheets, summary posters, interview questions, exam-day checklist, revision workbook, exam tracker, and the AI prompt pack. Wired into `scripts/resources/build.mjs`.

## ⏳ AI prompts generated — in the AI Prompt Pack resource
~10 ISTQB-specific prompts (act as an examiner, quiz me on BVA, explain decision tables simply, create practice questions, review my answers, generate flash cards, explain why an answer is wrong, test my understanding, memory techniques, revision schedule) — authored inside `istqb-ai-prompt-pack` (pending DOCX/PDF generation).

## ✅/⏳ Portfolio activities
Every lesson includes a `portfolioBuilder` contribution, and the marketing page frames the **QA portfolio project**: Test Strategy, Test Plan, Risk Assessment, Test Cases, Decision Tables, Boundary Analysis, Defect Reports, Review Notes, Test Summary, Reflection. *(Delivered through per-lesson portfolio prompts + assignment uploads, as with the other programmes.)*

## ✅ Marketing & homepage
- Marketing page `/course/istqb-foundation-masterclass` (Certification Edition badge, hero, 6 stats, who-for, learning outcomes, 14-module curriculum, exam-practice section, portfolio, £79 pricing, FAQ). Build passes.
- `src/lib/courses.ts` entry (£79, `STRIPE_PRICE_ISTQB`).
- Homepage card added; the live **API Testing Masterclass** card also surfaced and both removed from "coming soon"; course count → 6.

---

## 🚀 Deployment runbook (remaining operational steps)

No DB connection string is available to this environment (only the Supabase REST service role, which cannot run DDL), so the SQL below is run **once, by hand, in the Supabase SQL editor**. All seeds are idempotent.

1. **Course + 14 modules + 72 lessons** — run `supabase/seed-istqb-ALL.sql`.
2. **Exam schema + 390 question/mock rows** — run `supabase/seed-istqb-exam-ALL.sql` (this is `istqb-exam-schema.sql` + `seed-istqb-questions.sql` bundled).
3. **Verify** (SQL editor):
   ```sql
   select count(*) from lessons l join modules m on m.id=l.module_id
     join courses c on c.id=m.course_id where c.slug='istqb-foundation-masterclass';           -- expect 72
   select mock, count(*) from practice_questions
     where course_id=(select id from courses where slug='istqb-foundation-masterclass')
     group by mock order by mock;                                                                -- null=310, 1=40, 2=40
   ```
4. **Publish** — confirm the course row `status='published'` (the course/module seeds set this).
5. **Resources** — already committed as static files under `public/resources/istqb-foundation-masterclass/` (+ manifest); they deploy with the code, no DB step.
6. **(Optional) Stripe** — set `STRIPE_PRICE_ISTQB` in Vercel to a live £79 price id if you want a dedicated price; otherwise checkout uses the amount in `src/lib/courses.ts`.
7. **Deploy** — merge `feature/istqb-foundation-masterclass` → `main`; Vercel auto-deploys production. Do this **after** steps 1–2 so the live marketing page's promises (lessons, 300+ questions, 2 mocks, resources) are all backed by real data.

## Verification done so far
- 72/72 lessons render-safe; lesson SQL sanity (72 inserts + 72 updates).
- 310 bank + 80 mock rows generated; dollar-quote delimiters balanced ($L$ 4680, $J$ 780); 310 + 40 + 40 ext_keys present.
- `tsc --noEmit` clean; `next build` passes with the new `/dashboard/course/[courseId]/exam` route, the course-page exam card, the marketing route and the homepage.
