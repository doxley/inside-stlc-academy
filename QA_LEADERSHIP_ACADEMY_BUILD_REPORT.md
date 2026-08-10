# QA Leadership Academy — Build Report

> **Status: BATCH 1 of 6 COMPLETE — NOT the finished programme.**
> This report covers the course shell + Modules 1–3, paused deliberately for a
> content-quality review before Modules 4–12 are built. Nothing here should be
> read as "the programme is done".

---

## Batch 1 scope (delivered)

**Course shell**
- Course row: `qa-leadership-academy` (`supabase/add-qa-leadership-course.sql`).
- Pricing: added to `src/lib/courses.ts` at **£199** (`amount: 19900`, Stripe price via `STRIPE_PRICE_QA_LEADERSHIP` env, inline-price fallback like every other course).
- Marketing landing page: `src/app/course/qa-leadership-academy/page.tsx` — full page in the existing Academy design (navy/gold/teal), with every section the brief asked for.
- Homepage: promoted from "Coming soon" into the live catalogue (`src/app/page.tsx`), badge **Leadership Edition**, £199.
- 12 module rows seeded (`supabase/seed-qa-leadership-modules.sql`) — the full curriculum shell so the course reads complete on the marketing page and dashboard.
- Case-study organisation defined once and reused: **Northstar Digital** (`docs/NORTHSTAR_DIGITAL.md`).

**Content (Modules 1–3)**
- **Module 1 — From Tester to QA Leader** (6 lessons) — authored to the Gold Standard as the reference module.
- **Module 2 — Assessing QA Maturity & Capability** (6 lessons).
- **Module 3 — Building High-Performing QA Teams** (6 lessons).
- Each lesson fills every base field (overview, objectives, guided notes, worked example, common mistakes, real-world tip, exercise, reflection, knowledge check, completion checklist) **and** a rich `enhancements` block (industry story, visual aid, David's tip, bad/good, mini-challenge/decision scenario, model answer, plus managers-review / portfolio-builder / resource-preview where they fit).
- 3 module assignments (one professional portfolio artefact each).

---

## By the numbers (Batch 1)

| Item | Count |
|---|---|
| Course created | 1 (`qa-leadership-academy`) |
| Modules seeded | 12 (shell); **3 fully authored** (1–3) |
| Deep-dive lessons authored | **18** (6 per module) |
| Enhancement blocks | 18 (industry story, visual aid, David tip, bad/good, mini-challenge, model answer, etc.) |
| Decision scenarios (mini-challenge + model answer) | 18 |
| Knowledge checks (judgement-based) | 18 |
| Module assignments | 3 (portfolio artefacts) |
| Approx. focused learning (Modules 1–3) | ~5–6 hours of reading + practical work |
| `DAVID INPUT REQUIRED` placeholders | 5 (see below) |

---

## Architecture reuse (no new patterns invented)

Confirmed against production before building; Batch 1 reuses the **exact** canonical patterns:
- **Lessons** authored as `scripts/content/qa-leadership-module{1,2,3}.mjs` → generated to SQL by the existing `scripts/content/build-module.mjs` (base fields via `$L$` dollar-quoting; enhancements as validated JSONB). Same pipeline as the ISTQB and API courses.
- **Modules/assignments** seeded by `courses.slug` + `module_number` — **no hardcoded UUIDs**, so nothing can collide with existing course IDs.
- **Rendering** uses the existing lesson renderer and `LessonEnhancements` components (all five visual-aid types — flow/timeline/comparison/matrix/tree — confirmed supported by `VisualLearningBlock`).
- **Marketing page** mirrors the ISTQB page's responsive, theme-consistent structure.
- **Assessment, resources, certificates, progress** all use the existing tables and flows — no schema replacement.

**Non-destructive:** every SQL file is additive and idempotent (`on conflict do nothing`, `add column if not exists`, `not exists` guards). No existing course, row, ID or learner-progress record is touched.

---

## Database changes (all additive; run per RUN_ORDER.md Phase G)

`add-qa-leadership-course.sql` · `seed-qa-leadership-modules.sql` ·
`seed-qa-leadership-module-{1,2,3}-lessons.sql` ·
`seed-qa-leadership-module-{1,2,3}-enhancements.sql` ·
`seed-qa-leadership-assignments.sql`

⚠️ **These must be run in the Supabase SQL editor** (Phase G, steps 39–47) before the course is populated. Prereqs `lessons-schema.sql` + `lesson-enhancements-schema.sql` are already applied from earlier phases.

## Routes added
- `/course/qa-leadership-academy` (marketing landing page). Dashboard/lesson routes are the existing dynamic routes — no new ones needed.

## Landing page status
Complete: Hero (with "Stop Managing Testing. Start Leading Quality."), stats, Who It's For, Problems This Programme Solves, Learning Outcomes, 12-Module Curriculum, Professional Toolkit, Portfolio Outputs, Final Transformation Project, How Assessment Works, Certificate, Pricing, FAQ, Enrol CTA. Builds cleanly.

## Certificate status
Uses the existing certificate mechanism; wording will render as "Inside STLC Academy – QA Leadership Academy Certificate of Completion". No external-accreditation claim made.

## Mobile / visual QA status
Reuses the exact responsive patterns of the shipped ISTQB page (same grid/section classes). A visual pass on the deployed preview is recommended but low-risk.

---

## `DAVID INPUT REQUIRED` placeholders (5)

These are deliberately left for authentic personal input rather than fabricated:
1. **M1 L1** (industryStory) — the first time "doing it yourself" made you the team's bottleneck, and what you stopped doing.
2. **M1 L5** (industryStory) — a consultancy example where a technically-sound QA approach was wrong for the context.
3. **M2 L3** (industryStory) — a specific memory of a value-stream map changing a team's conversation.
4. **M3 L2** (davidTip) — a time you filled a *role* when the real need was a *skill/process fix*.
5. **M3 L5** (industryStory) — developing someone by reducing their firefighting load / a stretch assignment with a safety net.

Everything around them is complete and reads well; they can be filled in later without rework.

---

## Outstanding TODOs (later batches — NOT started)

- **Batch 2:** Modules 4–6 (Hiring, QA Strategy, Risk-Based Quality Leadership).
- **Batch 3:** Modules 7–9 (Metrics, Automation Strategy, AI Strategy).
- **Batch 4:** Modules 10–12 (Stakeholder Management, Coaching/Performance, Transformation Roadmap) + the **Final Capstone Project** (the 15-part Northstar QA Leadership Portfolio).
- **Batch 5:** Resources — the 30+ real working templates/tools, generated via the existing resource pipeline (`scripts/resources/`), then wired to assignments via `template_slug` / `brief_slug` (currently null for M1–3).
- **Batch 6:** Assessments & QA — module knowledge-check quizzes (module-level `quizzes`/`quiz_questions`), a full senior-professional content audit, and end-to-end wiring/mobile check.
- Fill the 5 David placeholders.
- Enrol the test user into the new course once content is live.

---

## Batch 1 quality self-check
- Would a QA Manager with 10 years' experience learn something? **Yes** — risk-mindset, ownership splits, context-fit team design, the "don't chase Level 5" discipline are pitched at judgement, not basics.
- Generic or nuanced? **Nuanced** — every module states trade-offs and refuses one-size-fits-all; banned filler phrases avoided or made operational.
- Fabricated stories/stats? **None** — genuine anecdotes are marked as David placeholders; no invented companies/quotes/numbers.
- Anchored in reality? **Yes** — Northstar Digital runs through all worked examples, mini-challenges and model answers.

**Recommendation:** review Module 1 (the reference module) and a lesson or two from Modules 2–3 in the running app, confirm the depth and tone are right, then green-light Batch 2.
