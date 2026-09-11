-- ============================================================
-- Seed the 16 modules for "Modern Test Automation Bootcamp"
-- (slug modern-test-automation-bootcamp). Run AFTER the course row exists
-- and BEFORE the lesson seeds. Safe to re-run.
-- unlock_day is 0 for all — sequencing is handled by completion_gating.
-- ============================================================

insert into public.modules (course_id, module_number, title, slug, description, estimated_duration, status, unlock_day)
select c.id, v.module_number, v.title, v.slug, v.description, v.estimated_duration, 'published', 0
from public.courses c
cross join (values
  (1,  'Thinking Like an Automation Engineer', 'thinking-like-an-automation-engineer', 'What automation is actually for, what to automate and what to leave manual, the real cost of bad automation, and the engineering mindset that separates automators from tutorial-followers.', '~3 hours'),
  (2,  'TypeScript for Testers', 'typescript-for-testers', 'Just enough TypeScript to write clean, typed Playwright tests: types and interfaces, functions and modules, async/await, and the everyday patterns you will actually use.', '~4 hours'),
  (3,  'Git, GitHub & Professional Workflow', 'git-github-and-professional-workflow', 'Branching, commits, pull requests and code review — how real teams collaborate on a shared test codebase without stepping on each other.', '~3 hours'),
  (4,  'Playwright Foundations', 'playwright-foundations', 'Installing and configuring Playwright, the test runner, locators, actions and web-first assertions, and the config that underpins everything else.', '~4 hours'),
  (5,  'Writing Tests That Actually Test Something', 'writing-tests-that-actually-test-something', 'Test design for automation: what a test should assert, meaningful versus weak assertions, and why a green test is not automatically a good test.', '~4 hours'),
  (6,  'Reliable Playwright Automation', 'reliable-playwright-automation', 'Auto-waiting, web-first assertions, the real causes of flakiness, and how to build tests that stay green for the right reasons.', '~4 hours'),
  (7,  'Framework Architecture', 'framework-architecture', 'Page objects, fixtures, components and project structure — designing a maintainable framework without over-engineering it.', '~4 hours'),
  (8,  'Authentication, State & Test Data', 'authentication-state-and-test-data', 'Logging in once and reusing storage state, handling multiple roles, and creating and cleaning up test data so tests own their own state.', '~4 hours'),
  (9,  'API Automation with Playwright', 'api-automation-with-playwright', 'Testing REST APIs with Playwright''s request context, asserting status and payloads, and using API calls to set up and verify state for UI tests.', '~4 hours'),
  (10, 'Network Control & Mocking', 'network-control-and-mocking', 'Intercepting, stubbing and mocking network traffic to test edge cases, isolate the UI and control flaky third-party dependencies.', '~3 hours'),
  (11, 'Cross-Browser, Parallelisation & Scale', 'cross-browser-parallelisation-and-scale', 'Browser projects, parallel execution and sharding — keeping a large suite fast, trustworthy and cheap to run.', '~3 hours'),
  (12, 'CI/CD with GitHub Actions', 'ci-cd-with-github-actions', 'Running the suite automatically on every push: workflows, browsers in CI, artifacts and reports, and using automation as a real quality gate.', '~4 hours'),
  (13, 'Reporting, Observability & Maintenance', 'reporting-observability-and-maintenance', 'Reporters, traces, screenshots and video; debugging failures fast, and keeping a suite healthy and trusted over time.', '~3 hours'),
  (14, 'AI-Assisted Test Automation', 'ai-assisted-test-automation', 'Using AI coding assistants as an engineering tool — pair-programming, generation, debugging and refactoring — and rigorously reviewing what they produce for hallucinations, weak assertions and security risks.', '~4 hours'),
  (15, 'Working in a Real Automation Team', 'working-in-a-real-automation-team', 'How automation fits a delivery team: what to automate for a story, code review, shared ownership, and communicating quality and risk to the people who make release decisions.', '~3 hours'),
  (16, 'Production-Style Automation Capstone', 'production-style-automation-capstone', 'Independently build a complete, production-style automation repository — UI, API, fixtures, auth, data, CI/CD, reporting and a README — that brings the whole programme together as portfolio evidence.', '~6 hours')
) as v(module_number, title, slug, description, estimated_duration)
where c.slug = 'modern-test-automation-bootcamp'
on conflict (course_id, module_number) do nothing;
