# Course Build Status — Practical Test Automation with Playwright

## New routes created
- `/course/practical-test-automation-playwright` — full marketing/course page
  (`src/app/course/practical-test-automation-playwright/page.tsx`).

## Components reused
- `SiteNav`, `SiteFooter` — shared marketing chrome.
- `EnrolButton` — Stripe Checkout entry point (hero, pricing, final CTA).
- `CourseCard` — used on the homepage to list the course (Price + View Course + Enrol Now).
- Existing branding system (navy/gold/teal, mobile-first grids) and the
  `<details>` accordion pattern from the other course pages.

## Components added
- None new were required — the page is built from the existing reusable
  components plus on-page data arrays (audience, outcomes, 12 modules with
  lessons/practical/downloads/AI prompt/knowledge check, resource vault, FAQ).

## Catalogue / commerce integration
- Added the course to `src/lib/courses.ts` (slug, £149 / 14900, optional
  `STRIPE_PRICE_PLAYWRIGHT`), so checkout + the webhook grant access by slug.
- Added the homepage course card (badge "Professional", £149) and bumped the
  homepage stats to 4 courses / 40+ modules.
- `.env.local.example` documents `STRIPE_PRICE_PLAYWRIGHT`.

## Database
- `supabase/add-playwright-course.sql` inserts the course row (slug matches the
  route) so the Stripe webhook can resolve it and create the enrolment.
  **Run this in Supabase before selling the course.**

## Resource placeholders
- The on-page **Resource Vault** and per-module **Downloads** list the templates,
  cheat sheets and AI prompt packs by name. The actual downloadable files are
  uploaded per module via **Admin → Courses → (module) → resources** and served
  through the existing protected `ResourceDownloads` viewer + `/dashboard/resources`.
  No files are bundled yet — names are placeholders until uploaded.

## Progress tracking integration
- Uses the existing platform model: once the course modules are created in the
  DB (Admin → Courses), learner progress flows through `module_progress`,
  the **Mark as Complete** button, and the multi-course `/dashboard`
  (progress %, certificate status, Continue Learning) with no extra work.
- Guided written-lesson rendering (Lesson Overview, Guided Notes, Practical
  Activity, Resources, Reflection, Mark Complete) already applies to this
  course's modules via `GuidedLessonLayout`. No video placeholders are rendered.

## TODO / future enhancements
- **Author module content in the DB** (lessons, guided notes, practical tasks,
  reflection, completion checklist) and upload the Resource Vault files. The
  marketing page is complete; the in-dashboard lesson content is created via the
  admin module editor.
- **Certificate generation**: a visual certificate (name, date, unique ID) is
  described on the page and tracked via the `certificates` table; an actual
  rendered/downloadable certificate artifact is a future enhancement.
- **GitHub portfolio submission review**: Module 12 asks learners to submit a
  GitHub repo URL. Today that can be submitted via the assignment upload flow;
  a dedicated URL-submission + model-solution comparison view is a future add.
- **Optional video**: intentionally omitted. Video remains supported per-module
  only when a real `video_url` is set (disabled by default).
- Consider per-course Stripe Price IDs in production (`STRIPE_PRICE_PLAYWRIGHT`)
  rather than the inline-price fallback.
