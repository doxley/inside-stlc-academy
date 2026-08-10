# QA Leadership Academy — Build Report

> **Status: ALL 6 BATCHES BUILT — content-complete, pending three things before go-live.**
> 12 modules (94 lessons) + capstone + 56 resources + 12 module quizzes are all
> written, generated and building clean; a senior content audit has been run and
> its findings actioned (pronoun continuity fixed). **Before go-live:** (1) run
> the Phase G SQL in Supabase; (2) a decision on the David-voice anecdotes (see
> "Content audit" below); (3) the production merge. Not "done" until those.

## Batch 6 — assessments & audit (built)
- **Module knowledge-check quizzes:** one quiz per module (all 12), 6
  judgement-based questions each (4 options, one correct, 70% pass), grounded in
  Northstar — `seed-qa-leadership-quizzes-1-6.sql` + `-7-12.sql`, produced by the
  idempotent `scripts/content/build-quizzes.mjs`. This is Level-1 of the
  three-layer model; Level-2 decision scenarios live in the lessons, Level-3
  professional assignments have rubric-style briefs.
- **Senior content audit (actioned):** verdict — genuinely senior-grade, **no
  fabricated statistics/companies/quotations**, clean British English, no video
  references, strong Northstar continuity. One continuity bug fixed (a ramping
  hire's pronoun in Module 9). **One decision for the client:** ~75 first-person
  `industryStory`/`davidTip` anecdotes are written in David's voice as lived
  experience but are anonymised composites, not marked `[DAVID INPUT REQUIRED]`.
  They contain no fabricated facts, but for a course sold on David's authority he
  should either (a) sign them off as genuinely his, or (b) they should be
  relabelled to explicitly illustrative/composite voice ("a pattern I see
  repeatedly…" rather than "I once watched…"). This is a review/labelling
  decision, not a rewrite.

## Resources (Batch 5 — complete)
56 branded DOCX+PDF resources in `public/resources/qa-leadership-academy/`, merged
into `public/resources/manifest.json`: **36 Templates, 5 Automation Resources,
3 Checklists, 12 Assignment Briefs** (44 professional tools + 12 briefs). Each
tool carries Purpose / When to use / Instructions / a Northstar worked example /
a blank reusable version / Common mistakes / interpretation — real instruments,
not empty worksheets. Every assignment is wired to its primary template
(`template_slug`) and brief (`brief_slug`). Resources are file-based (served from
`public/` via the manifest) — **no SQL needed** for them.

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

| Item | Count (Batches 1–2) |
|---|---|
| Course created | 1 (`qa-leadership-academy`) |
| Modules authored | **12 of 12** (all) |
| Deep-dive lessons authored | **94** (M1–3: 6; M4–5: 10; M6: 6; M7–8: 8; M9: 9; M10: 8; M11: 9; M12: 8) |
| Enhancement blocks | 94 (industry story, visual aid, David tip, bad/good, mini-challenge, model answer, etc.) |
| Decision scenarios (mini-challenge + model answer) | 94 |
| Knowledge checks (judgement-based) | 94 |
| Module assignments | 12 (portfolio artefacts) incl. the Final Capstone (15-part transformation portfolio) |
| Approx. focused learning (all modules) | ~28–32 hours of reading + practical work |
| `DAVID INPUT REQUIRED` placeholders | 22 (see below) |

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
6. **M4 L7** (industryStory) — a take-home / practical assessment that crossed the line, and how you made it fair yet predictive.
7. **M4 L9** (industryStory) — a close-call senior hire where the "best on paper" candidate wasn't the right hire for the team's gap.
8. **M5 L1** (industryStory) — a thorough-but-ignored 40-page strategy vs a lightweight one that changed behaviour.
9. **M5 L10** (industryStory) — a strategy that lived or died on how well its trade-offs (especially non-goals) were communicated.
10. **M6 L5** (industryStory) — a release-eve go/no-go that turned on how residual risk was presented to and owned by the accountable stakeholder.
11. **M7 L1** (industryStory) — a team whose metrics looked excellent while quality quietly worsened, and the metric you swapped in.
12. **M7 L8** (industryStory) — delivering difficult quality news to leadership and how the framing shaped trust.
13. **M8 L1** (industryStory) — an automation programme that failed from a coverage/count target or orphaned ownership.
14. **M8 L6** (industryStory) — an orphaned suite maintained by one engineer that was turned around (quarantining/deleting flaky tests).
15. **M9 L1** (industryStory) — the first time you found testers using a public AI tool informally, and what you did instead of banning/ignoring it.
16. **M9 L5** (industryStory) — an organisation dealing with shadow AI use (a backfired ban, or an early get-ahead win).
17. **M10 L5** (industryStory) — a high-pressure deadline where a structured risk-and-recommendation beat a flat "no".
18. **M10 L8** (industryStory) — a board/exec quality conversation where risk-and-money framing landed and test-case counts fell flat.
19. **M11 L4** (industryStory) — a performance conversation where preparation changed the outcome, and the line to a formal HR process.
20. **M11 L6** (industryStory) — an underperformance case where diagnosing the real cause changed everything, and where HR was engaged.
21. **M12 L1** (industryStory) — pulling separate quality analyses into one coherent leadership narrative (or a pile of docs that weakened the case).
22. **M12 L7** (industryStory) — an executive presentation where *how* it was presented decided the outcome.

Everything around them is complete and reads well; they can be filled in later without rework.

---

## Outstanding TODOs (later batches — NOT started)

- ~~**Batch 2:** Modules 4–6 (Hiring, QA Strategy, Risk-Based Quality Leadership).~~ ✅ **Done.**
- ~~**Batch 3:** Modules 7–9 (Metrics, Automation Strategy, AI Strategy).~~ ✅ **Done.**
- ~~**Batch 4:** Modules 10–12 + the **Final Capstone Project** (15-part Northstar QA Leadership Portfolio).~~ ✅ **Done.**
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
