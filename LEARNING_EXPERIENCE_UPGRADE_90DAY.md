# Learning Experience Upgrade — 90-Day Software Testing Career Roadmap

Upgrades each lesson from "written notes" into a premium, practical training
experience, using reusable components driven by structured lesson data.

## Components added
All in `src/components/module/LessonEnhancements.tsx` (presentational,
server-component safe, Inside STLC design language — navy / gold / teal):

| Component | Purpose |
| --- | --- |
| `IndustryStoryCard` | Realistic QA workplace story showing why the lesson matters |
| `VisualLearningBlock` | Clean CSS/HTML diagrams (no images): `flow`, `timeline`, `comparison`, `matrix`, `tree` |
| `WorkedExampleCard` | Wraps the existing `worked_example` content in a consistent card |
| `BadGoodExample` | Side-by-side poor vs professional version |
| `IndustryTipCard` | "David's Industry Tip" — highlighted coaching note (QA lead voice) |
| `CommonMistakesCard` | Wraps the existing `common_mistakes` content |
| `MiniChallengeCard` | A 10–20 minute practical task |
| `ModelAnswerCard` | Collapsible model answer (learner tries first) |
| `ManagersReviewCard` | "If I received this as a QA lead…" — strengths / gaps / improvements |
| `PortfolioBuilderCard` | How the lesson contributes to the final QA portfolio |
| `ResourcePreviewCard` | Preview of a referenced template (name, use, when, formats) |

## Data model change
One column added — `lessons.enhancements jsonb` (migration:
`supabase/lesson-enhancements-schema.sql`). No existing columns changed, so
progress tracking, assignments, quizzes and certificates are untouched.

The TypeScript shape lives in `src/types/index.ts` as `LessonEnhancements`:

```
{
  industryStory?: string,
  visualAid?: { type, title, caption?, steps?, headers?, rows?,
                colLabels?, rowLabels?, cells?, branches? },
  badGood?: { label, bad, good },
  davidTip?: string,
  miniChallenge?: string,
  modelAnswer?: string,
  managersReview?: { intro?, strengths?, gaps?, improvements? },
  portfolioBuilder?: string,
  resourcePreview?: { name, purpose, whenToUse, formats? }
}
```

Existing fields (`worked_example`, `common_mistakes`, `real_world_tip`,
`exercise`, etc.) are reused, not duplicated. Every enhancement card renders
only when its field is present, so partially-enhanced lessons degrade cleanly.

## How content is authored
To keep the JSON valid, enhancements are written as JS objects in
`scripts/enhancements/90day-module<N>.mjs` and compiled to SQL with
`scripts/enhancements/build-enhancements.mjs`:

```
node scripts/enhancements/build-enhancements.mjs 90day-module1
# → supabase/seed-90day-module1-enhancements.sql
```

The generated SQL `UPDATE`s `lessons.enhancements`, matched by course slug +
module number + lesson number. Idempotent and re-runnable.

## Modules enhanced
- [x] **Module 1 — Introduction to Software Testing** (reference standard, 9 lessons)
- [x] **Module 2 — Test Design Techniques** (7 lessons)
- [x] **Module 3 — Defect Management** (6 lessons)
- [x] **Module 4 — Agile & Scrum for Testers** (6 lessons)
- [x] **Module 5 — Jira & Test Management** (6 lessons)
- [x] **Module 6 — API Testing with Postman** (6 lessons)
- [x] **Module 7 — SQL for Testers** (6 lessons)
- [ ] Module 8 — Automation Fundamentals
- [ ] Module 9 — AI for Software Testing
- [ ] Module 10 — Portfolio Building
- [ ] Module 11 — CV & LinkedIn Mastery
- [ ] Module 12 — Interview Mastery & Job Search

(Checkboxes updated as each batch ships.)

## Assumptions
- Teaching lessons get the full set of cards; administrative lessons
  (Knowledge Check, Assignment, Module Summary) get a lighter, relevant subset.
- `ResourcePreviewCard` references existing Resource Vault docs by name; it
  points learners to the Vault rather than deep-linking each file.
- "David" = the QA lead/test-manager coaching voice; tips avoid unsupported
  personal claims and use "in real QA teams / as a QA lead" framing.
- The existing `real_world_tip` ("Real Industry Tip") is kept alongside the new
  `davidTip` — they serve different purposes (quick fact vs coaching note).

## To run (Supabase SQL editor, in order)
1. `supabase/lesson-enhancements-schema.sql` (adds the column)
2. `supabase/seed-90day-module1-enhancements.sql`
3. …subsequent `seed-90day-module<N>-enhancements.sql` files as they ship

## TODOs / manual review
- Visual QA pass on the deployed site once the SQL is run (spot-check a
  teaching lesson, the assignment lesson, and a light lesson on mobile).
- Roll the pattern out to Modules 2–12 (in progress).
- Optionally extend the same enhancements to the other three courses later.
