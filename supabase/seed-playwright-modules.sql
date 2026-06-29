-- ============================================================
-- Seed the 12 modules for "Practical Test Automation with Playwright"
-- (slug practical-test-automation-playwright).
-- Run AFTER the course row exists (add-playwright-course.sql) and
-- BEFORE the Playwright lesson seeds. Safe to re-run.
-- ============================================================

insert into public.modules (course_id, module_number, title, slug, description, learning_objectives, estimated_duration, status, unlock_day)
select c.id, v.module_number, v.title, v.slug, v.description, v.learning_objectives, v.estimated_duration, 'published', 0
from public.courses c
cross join (values
  (1,  'Automation Fundamentals', 'automation-fundamentals',
       'Why we automate, what to automate, the test automation pyramid, ROI, common failures, and building an automation mindset.',
       array['Explain why and when to automate','Apply the test automation pyramid','Judge automation ROI and avoid common failures'], '~2 hours'),
  (2,  'Behaviour Driven Development (BDD)', 'behaviour-driven-development',
       'BDD, user stories, Gherkin syntax, feature files, scenarios, scenario outlines and writing readable tests.',
       array['Write clear Gherkin feature files','Use scenarios and scenario outlines','Express behaviour in readable, testable terms'], '~2 hours'),
  (3,  'Step Definitions', 'step-definitions',
       'Mapping features to code: Given/When/Then, parameterisation, reusable steps and avoiding duplication.',
       array['Map feature steps to step definitions','Parameterise and reuse steps','Avoid duplicate and brittle steps'], '~2 hours'),
  (4,  'Playwright Essentials', 'playwright-essentials',
       'Installing and configuring Playwright, project structure, locators, assertions, waiting, fixtures, debugging and the trace viewer.',
       array['Set up and run a Playwright project','Use robust locators and web-first assertions','Debug failures with the trace viewer'], '~3 hours'),
  (5,  'Page Object Model', 'page-object-model',
       'Why POM matters, design principles, page classes, methods vs assertions, reusable components and maintenance.',
       array['Design clean page objects','Separate actions from assertions','Keep page objects maintainable'], '~2 hours'),
  (6,  'Test Data Management', 'test-data-management',
       'Static, dynamic and random data, factories, JSON/CSV, secrets and environment variables.',
       array['Manage test data cleanly','Generate unique, valid data','Handle secrets and environments safely'], '~2 hours'),
  (7,  'Framework Architecture', 'framework-architecture',
       'Folder structure, utilities, helpers, base classes, configuration, logging, reporting and scalability.',
       array['Structure a scalable framework','Extract utilities and base classes','Add logging and reporting'], '~2 hours'),
  (8,  'API Automation', 'api-automation',
       'REST basics, authentication, Playwright''s request API, validation and using APIs to set up test data.',
       array['Automate REST API tests with Playwright','Validate status and response bodies','Use the API to seed UI tests'], '~2 hours'),
  (9,  'Git & CI/CD', 'git-and-ci-cd',
       'Git basics, branches, pull requests, GitHub, GitHub Actions, running tests automatically and parallel execution.',
       array['Use Git and pull requests confidently','Run Playwright tests in GitHub Actions','Parallelise and report CI runs'], '~2 hours'),
  (10, 'AI Assisted Automation', 'ai-assisted-automation',
       'Using Claude and ChatGPT to generate tests and page objects, debug, review and refactor — with the risks and best practice.',
       array['Use AI to accelerate automation','Generate and review tests/page objects safely','Apply responsible-AI practices'], '~2 hours'),
  (11, 'Framework Maintenance', 'framework-maintenance',
       'Flaky tests, technical debt, code reviews, refactoring, reporting, logging, performance and scalability.',
       array['Diagnose and fix flaky tests','Reduce technical debt through refactoring','Keep a framework healthy at scale'], '~2 hours'),
  (12, 'Portfolio Project', 'portfolio-project',
       'Build a complete automation framework (BDD, Playwright, page objects, utilities, CI, README) and submit it for self-review against the model solution.',
       array['Build an end-to-end automation framework','Document it professionally','Publish it as a portfolio piece'], '~4 hours')
) as v(module_number, title, slug, description, learning_objectives, estimated_duration)
where c.slug = 'practical-test-automation-playwright'
on conflict (course_id, module_number) do nothing;
