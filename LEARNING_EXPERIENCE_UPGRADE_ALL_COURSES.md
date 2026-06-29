# Learning Experience Upgrade — All Courses

The premium lesson-enhancement pattern built for the 90-Day course (see
`LEARNING_EXPERIENCE_UPGRADE_90DAY.md`) is now applied to all four courses.
Same components, same `lessons.enhancements` JSONB field, same authoring
pipeline (`scripts/enhancements/*` → `build-enhancements.mjs`).

## Coverage
| Course | Modules | Lessons enhanced |
| --- | --- | --- |
| 90-Day Software Testing Career Roadmap | 12 | 73 |
| AI for QA Testers | 12 | 59 |
| QA Interview Accelerator | 8 | 32 |
| Practical Test Automation with Playwright | 12 | 61 |
| **Total** | **44** | **225** |

## What each lesson gained (where appropriate)
Industry story · visual learning aid (flow / timeline / comparison / matrix /
tree, pure CSS) · worked example · bad-vs-good · David's Industry Tip ·
common mistakes · mini challenge · model answer · manager's review · portfolio
builder · resource preview. Cards render only when their field is present, so
lessons degrade cleanly.

## Components & data model
- Components: `src/components/module/LessonEnhancements.tsx`
- Field: `lessons.enhancements jsonb` (`supabase/lesson-enhancements-schema.sql`)
- Types: `LessonEnhancements` in `src/types/index.ts`
- No existing columns changed → progress, assignments, quizzes, certificates untouched.

## To run (Supabase SQL editor) — idempotent
1. `lesson-enhancements-schema.sql` (once, adds the column)
2. Per course, the combined file (each includes all that course's modules):
   - `seed-90day-all-enhancements.sql`
   - `seed-ai-all-enhancements.sql`
   - `seed-qa-all-enhancements.sql`
   - `seed-pw-all-enhancements.sql`

(Or run the individual `seed-<course>-module<N>-enhancements.sql` files.)

## Authoring / regenerating
Content lives as JS objects in `scripts/enhancements/<course>-module<N>.mjs`.
Regenerate a module's SQL with:
```
node scripts/enhancements/build-enhancements.mjs ai-module5
# → supabase/seed-ai-module5-enhancements.sql
```

## TODOs / manual review
- Visual QA pass on the deployed site for each course once the SQL is run.
- All four courses enhanced (225 lessons). ✅
