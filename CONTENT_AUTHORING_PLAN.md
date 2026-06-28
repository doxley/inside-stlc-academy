# Content Authoring Plan — Deepening the Programmes (Stage 2)

Phase 1 (marketing, pricing, checkout, dashboard, certificates) is done.
This document covers Phase 2: turning the three existing courses into real
**learning experiences** with a proper **Module → Lessons** structure.

## The model (now built)

- **Modules** group **Lessons** (Lesson 1, 2, 3…). A new `lessons` table holds
  each lesson's full content; `lesson_progress` tracks per-lesson completion.
- A **lesson page** (`/dashboard/course/[courseId]/module/[moduleId]/lesson/[lessonId]`)
  renders: Learning Objectives, Estimated Time, Lesson notes, Worked Example,
  Real Industry Tip, Common Mistakes, Exercise, Downloads, Reflection,
  Knowledge Check, and **Mark Lesson Complete** — no video.
- The **module page** lists its lessons with progress; when **all lessons are
  complete the module auto-completes**, which feeds the dashboard % and
  certificate eligibility (no change needed to those).
- Modules with **no** lessons keep the existing single-page guided behaviour, so
  nothing breaks during the rollout.

## What's authored so far (exemplar)

- **90-Day Roadmap · Module 1: Introduction to Software Testing** — 9 lessons,
  fully written (`supabase/seed-90day-module1-lessons.sql`). Use this as the
  quality bar and structural template for every other module.

## How to author a module

Each lesson is one row in `lessons`. Author via a seed SQL file that resolves
the module by course slug + module number (see the exemplar), or via a future
admin Lesson editor. Fields per lesson:

- `lesson_number`, `title`, `estimated_time`
- `learning_objectives` (text[])
- `lesson_notes` — main content (`## Heading`, `- bullet`, blank line = paragraph)
- `worked_example`, `common_mistakes`, `real_world_tip`, `exercise`
- `reflection_question`, `knowledge_check`
- `video_url` — optional, off by default

Downloads attach to a lesson via `resources.lesson_id` (upload through the admin
resource uploader, or seed rows pointing at the lesson).

## Roadmap (remaining content)

> Each item is a seed SQL file (or admin authoring) following the exemplar.

### 90-Day Software Testing Career Roadmap
- [x] Module 1 — Introduction to Software Testing (9 lessons)
- [x] Module 2 — Test Design Techniques (7 lessons)
- [x] Module 3 — Defect Management (6 lessons)
- [x] Module 4 — Agile & Scrum for Testers (6 lessons)
- [x] Module 5 — Jira & Test Management (6 lessons)
- [x] Module 6 — API Testing with Postman (6 lessons)
- [x] Module 7 — SQL for Testers (6 lessons)
- [x] Module 8 — Automation Fundamentals (6 lessons)
- [x] Module 9 — AI for Software Testing (6 lessons)
- [x] Module 10 — Portfolio Building (5 lessons)
- [x] Module 11 — CV & LinkedIn Mastery (5 lessons)
- [x] Module 12 — Interview Mastery & Job Search (5 lessons)
- ✅ **90-Day Roadmap fully drafted (all 12 modules).**

### AI for QA Testers
- [x] Seed the 12 modules into the DB (`seed-ai-qa-modules.sql`)
- [x] Module 1 — The AI Shift in QA (4 lessons)
- [x] Module 2 — AI Fundamentals for Testers (5 lessons)
- [x] Module 3 — Prompt Engineering for QA (6 lessons)
- [x] Module 4 — Requirements Analysis with AI (5 lessons)
- [x] Module 5 — AI-Assisted Test Case Design (5 lessons)
- [x] Module 6 — Exploratory Testing with AI (5 lessons)
- [x] Module 7 — Defect Reporting & Root Cause Support (5 lessons)
- [x] Module 8 — API Testing with AI (5 lessons)
- [x] Module 9 — Automation Support with AI (5 lessons)
- [x] Module 10 — AI in Agile QA Workflows (5 lessons)
- [x] Module 11 — AI Risks, Ethics and Governance (5 lessons)
- [x] Module 12 — Building Your AI QA Workflow (4 lessons)
- ✅ **AI for QA Testers fully drafted (all 12 modules).**
[done]
      Test Case Design, Exploratory, Defect/Root Cause, API, Automation, Agile
      Workflows, Risks/Ethics, Building Your AI QA Workflow).
- [ ] Module download packs (Claude/ChatGPT Prompt Packs, Requirements Review,
      Bug Report, Risk Analysis prompts).

### QA Interview Accelerator
- [x] Seed the 8 modules (`seed-qa-interview-modules.sql`)
- [x] Module 1 — Understanding the QA Interview Process (4 lessons)
- [x] Module 2 — Your QA Career Story (4 lessons)
- [x] Module 3 — Core Software Testing Questions (4 lessons)
- [x] Module 4 — Agile, Scrum and Team-Based Questions (4 lessons)
- [x] Module 5 — Scenario-Based QA Questions (4 lessons)
- [x] Module 6 — Test Task Preparation (4 lessons)
- [ ] Modules 3–8 — draft lessons (Core Testing Questions, Agile/Team,
      Scenario-Based, Test Task Prep, CV/LinkedIn/Applications, Final Pack).
- [ ] Downloads: STAR Template, CV Checklist, LinkedIn Guide, Interview Tracker,
      Employer Questions.

### Every course ends with a Portfolio Project (not an exam)
- Already supported: assignments with `submission_type = 'url'` accept a GitHub
  repo; file submissions accept documents. Certificates issue on completion.

## Suggested follow-ups (engineering)
- **Admin Lesson editor** UI (today lessons are authored via seed SQL).
- Upload the named download files into the resources table per lesson/module.
- Optional: model-solution auto-compare for portfolio submissions.

## Migrations to run (in order)
1. `supabase/lessons-schema.sql` — lessons + lesson_progress + resources.lesson_id
2. `supabase/seed-90day-module1-lessons.sql` — the exemplar module
3. (then each future module seed as it's authored)
