# ISTQB Foundation Masterclass — Build Status

*Programme 6 · £79 · Certification Edition · branch `feature/istqb-foundation-masterclass` · NOT yet seeded or deployed.*

This is a large, multi-phase build. The **content programme (72 Gold-Standard lessons)** is complete via the proven pipeline. The **interactive exam features (question bank, mock exams, practice mode, dashboard)** are net-new engineering and are the outstanding work.

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

## ⏳ Practice questions generated — 0 / ~300 (TODO)
Not yet started. Plan: ~25 questions per syllabus topic (Modules 1–12), each with correct answer, explanation, why-other-options-are-wrong, syllabus reference, and a real-workplace example. Requires a new `practice_questions` table (the existing `quiz_answers` has no explanation/topic fields).

## ⏳ Mock exams generated — 0 / 2 (TODO)
Two 40-question timed mock exams (Modules 13 & 14), with immediate feedback, full explanations, and a weak-area report.

## ⏳ Resources generated — 25 authoring / vault build pending
25 resources authored (5 batches, `scripts/resources/content/istqb-batch{1..5}.mjs`): technique cheat sheets (BVA, decision tables, state transition, EP, severity vs priority), test-management cheat sheet, risk-matrix template, review checklist, ISTQB glossary, quick revision notes, sample test plan/strategy, example defect reports, revision planner, 12-week study plan, flash cards, memory aids & mnemonics, mind maps, formula sheets, summary posters, interview questions, exam-day checklist, revision workbook, exam tracker, and the AI prompt pack.
- **Remaining:** wire into `scripts/resources/build.mjs`, generate DOCX+PDF (via `PW_CHROMIUM=<Edge>`), update `public/resources/manifest.json`.

## ⏳ AI prompts generated — in the AI Prompt Pack resource
~10 ISTQB-specific prompts (act as an examiner, quiz me on BVA, explain decision tables simply, create practice questions, review my answers, generate flash cards, explain why an answer is wrong, test my understanding, memory techniques, revision schedule) — authored inside `istqb-ai-prompt-pack` (pending DOCX/PDF generation).

## ✅/⏳ Portfolio activities
Every lesson includes a `portfolioBuilder` contribution, and the marketing page frames the **QA portfolio project**: Test Strategy, Test Plan, Risk Assessment, Test Cases, Decision Tables, Boundary Analysis, Defect Reports, Review Notes, Test Summary, Reflection. *(Delivered through per-lesson portfolio prompts + assignment uploads, as with the other programmes.)*

## ✅ Marketing & homepage
- Marketing page `/course/istqb-foundation-masterclass` (Certification Edition badge, hero, 6 stats, who-for, learning outcomes, 14-module curriculum, exam-practice section, portfolio, £79 pricing, FAQ). Build passes.
- `src/lib/courses.ts` entry (£79, `STRIPE_PRICE_ISTQB`).
- Homepage card added; the live **API Testing Masterclass** card also surfaced and both removed from "coming soon"; course count → 6.

---

## Outstanding TODO items (in priority order)
1. **Practice Question Bank (~300)** — design `practice_questions` schema (question, options+why-wrong, explanation, syllabus_topic, workplace_example, k_level); author content (agents); seed.
2. **2 Mock Exams** — 40 timed questions each (Modules 13 & 14).
3. **Exam Practice Mode (net-new UI)** — topic quizzes, random quizzes, timed mode, review with explanations, retake, revision mode.
4. **Weak-area tracking + dashboard** — progress by syllabus topic, study streak, mock scores, revision readiness, certificate eligibility.
5. **Finish Resource Vault** — generate DOCX+PDF for the 25 resources, update manifest, wire in.
6. **Seed the DB** — run `supabase/seed-istqb-ALL.sql` (lessons) + resource/question/mock seeds.
7. **Go live** — set `STRIPE_PRICE_ISTQB` (optional), verify, then merge `feature/istqb-foundation-masterclass` → `main` and deploy. **Do not publish until questions/mocks/resources exist** (the marketing page promises them).

## Verification done so far
- 72/72 lessons render-safe; SQL sanity (72 inserts + 72 updates); `next build` passes with the new route + homepage.
