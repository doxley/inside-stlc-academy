-- ============================================================
-- Assignments for "Practical Test Automation with Playwright".
-- One practical assignment per module, each linked to a matching
-- Automation Resource Vault template (assignments.template_slug).
-- Run AFTER seed-playwright-modules.sql and assignment-templates.sql
-- (which adds the template_slug column). Idempotent.
-- ============================================================

insert into public.assignments (module_id, title, instructions, required, submission_type, template_slug)
select m.id, v.title, v.instructions, true, v.submission_type, v.template_slug
from public.modules m
join public.courses c on c.id = m.course_id
cross join (values
  (1,  'Module 1 Assignment — Automation Fundamentals', 'Review twenty sample test cases (your own or from an app you know) and decide for each whether it should be automated and at which layer (unit, API, UI), with a one-line reason. Summarise your automation strategy in a short document. Submit as a PDF or DOCX.', 'file', 'automation-best-practices-checklist'),
  (2,  'Module 2 Assignment — Behaviour Driven Development', 'Write feature files for Login, Checkout and Registration. Include happy-path, negative and at least one scenario outline with an examples table. Keep the language declarative and readable. Submit as a PDF or DOCX (or a link to the .feature files).', 'file', 'test-structure-naming-guide'),
  (3,  'Module 3 Assignment — Step Definitions', 'Convert your feature files from Module 2 into working step definitions. Keep steps thin and reusable, delegate to page objects, and avoid duplication. Submit your step definition code as a PDF/DOCX export or a repository link.', 'file', 'automation-code-review-checklist'),
  (4,  'Module 4 Assignment — Playwright Essentials', 'Build your first Playwright suite: at least five tests using robust locators (getByRole/getByLabel) and web-first assertions, with no waitForTimeout. Include a screenshot of a passing run and your config. Submit as a PDF/DOCX or a repository link.', 'file', 'locator-strategy-cheat-sheet'),
  (5,  'Module 5 Assignment — Page Object Model', 'Create page objects for Login, Dashboard, Shopping Basket and Checkout, and refactor your tests to use them. Show how a test reads using the page objects. Submit as a PDF/DOCX or a repository link.', 'file', 'page-object-model-template'),
  (6,  'Module 6 Assignment — Test Data Management', 'Create reusable test data for your suite: a factory that generates unique valid records, plus one JSON or CSV data set driving a parameterised test. Show that a test creates and cleans up its own data. Submit as a PDF/DOCX or a repository link.', 'file', 'test-data-management-template'),
  (7,  'Module 7 Assignment — Framework Architecture', 'Refactor your framework into a clean, scalable structure (tests, pages, components, fixtures, utils, data). Document the folder structure and explain two architecture decisions you made. Submit as a PDF/DOCX or a repository link.', 'file', 'test-structure-naming-guide'),
  (8,  'Module 8 Assignment — API Automation', 'Automate a public REST API: write at least five API tests covering GET/POST and an error case, asserting status and key response fields. Then use an API call to set up state for one UI test. Submit as a PDF/DOCX or a repository link.', 'file', 'api-testing-with-playwright-template'),
  (9,  'Module 9 Assignment — Git & CI/CD', 'Connect your framework to GitHub and add a GitHub Actions workflow that installs browsers, runs the suite, and uploads the report. Submit a link to a successful (green) workflow run, plus a short note on your setup.', 'url', 'ci-cd-integration-guide'),
  (10, 'Module 10 Assignment — AI Assisted Automation', 'Use AI to improve your framework: generate or refactor a test/page object, document the prompts you used, what AI produced, and what you verified or changed before trusting it. Include your responsible-AI rules. Submit as a PDF or DOCX.', 'file', 'ai-prompt-library-automation'),
  (11, 'Module 11 Assignment — Framework Maintenance', 'Take an intentionally poor or flaky test (yours or provided) and fix it: diagnose with the checklist and trace, remove sleeps/brittleness, and prove reliability with a repeat-each run. Document before/after. Submit as a PDF or DOCX.', 'file', 'flaky-test-troubleshooting-checklist'),
  (12, 'Module 12 Assignment — Portfolio Project', 'Build a complete automation framework (BDD, feature files, step definitions, Playwright tests, page objects, utilities, configuration, reporting, GitHub repository, CI pipeline and a professional README). Submit your public GitHub repository URL for self-review against the model solution. This is your graduation submission.', 'url', 'automation-portfolio-project-workbook')
) as v(module_number, title, instructions, submission_type, template_slug)
where c.slug = 'practical-test-automation-playwright'
  and m.module_number = v.module_number
  and not exists (select 1 from public.assignments a where a.module_id = m.id);
