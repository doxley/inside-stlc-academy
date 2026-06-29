-- ============================================================
-- Practical Test Automation with Playwright — first-draft lessons for
-- Module 7 (Framework Architecture), Module 8 (API Automation) and
-- Module 9 (Git & CI/CD). Run AFTER seed-playwright-modules.sql. Idempotent.
-- ============================================================

-- ─────────────── MODULE 7: FRAMEWORK ARCHITECTURE ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Folder Structure', '11 minute read',
  $$A clear folder structure keeps a growing framework navigable. This lesson covers a sensible layout.$$,
  array['Lay out a maintainable framework','Separate concerns by folder','Keep things easy to find'],
  $$## A sensible layout
- tests/ : specs grouped by feature
- pages/ : page objects
- components/ : reusable component objects
- fixtures/ : custom fixtures
- utils/ : helpers
- data/ : JSON/CSV test data

## Principle
Group by concern so anyone can guess where a file lives.$$,
  $$A new team member needs to change the login page object; because pages/ holds page objects grouped by area, they find LoginPage in seconds without asking.$$,
  $$- One flat folder with everything mixed together
- Inconsistent naming across folders
- Test data scattered through spec files$$,
  $$A predictable structure is onboarding documentation in itself. If a newcomer can guess where a file lives, your layout is working.$$,
  $$Sketch a folder structure for an automation framework with tests, pages, fixtures, utils and data.$$,
  $$Why does grouping by concern help a growing framework?$$,
  $$A good framework layout groups files by: A) file size B) concern (pages, tests, utils) C) author. (Answer: B)$$,
  array['I can lay out a framework','I separate concerns by folder']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Utilities & Helpers', '11 minute read',
  $$Helpers remove repetition and keep tests focused. This lesson covers writing useful utilities without overdoing it.$$,
  array['Extract useful helpers','Avoid premature abstraction','Keep helpers well-named'],
  $$## Good helper candidates
- Generating unique data (emails, ids)
- Formatting dates or currency for assertions
- Small repeated sequences used across tests

## A caution
Extract a helper when you see real repetition — not speculative "might need it" utilities.$$,
  $$A uniqueEmail() helper is used by several tests; instead of repeating the timestamp logic, each test calls the helper and reads clearly.$$,
  $$- A "utils" dumping ground of unrelated functions
- Helpers that hide important test logic
- Abstracting before any repetition exists$$,
  $$Helpers should make tests clearer, not hide what they do. If a reader has to open a helper to understand the test, reconsider the abstraction.$$,
  $$Identify one repeated snippet across tests and extract it into a well-named helper.$$,
  $$When should you extract a helper function?$$,
  $$You should extract a helper when: A) you might need it later B) you see real repetition C) the file is short. (Answer: B)$$,
  array['I can extract useful helpers','I avoid premature abstraction']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Base Classes & Shared Setup', '11 minute read',
  $$Base classes and shared setup remove boilerplate from page objects and tests. This lesson covers using them well.$$,
  array['Use base classes appropriately','Share common setup','Avoid over-inheritance'],
  $$## Where base classes help
- A BasePage with shared navigation/utilities every page reuses
- Shared fixtures for common state (logged-in page)

## A caution
Prefer composition (fixtures, components) over deep inheritance. One shallow base layer is usually enough.$$,
  $$A BasePage provides goto(path) and a common waitForLoaded(); LoginPage and Dashboard extend it and only add their own specifics.$$,
  $$- Deep inheritance chains that obscure behaviour
- Putting page-specific logic in the base class
- Reinventing fixtures with inheritance$$,
  $$Favour fixtures and components over deep inheritance. A single thin BasePage is helpful; a five-level class hierarchy is a maintenance trap.$$,
  $$Design a BasePage with one shared method that your page objects could extend.$$,
  $$Why prefer composition over deep inheritance in a framework?$$,
  $$For shared state, the framework should prefer: A) deep inheritance B) fixtures and composition C) global variables. (Answer: B)$$,
  array['I can use base classes appropriately','I avoid over-inheritance']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Logging & Reporting', '11 minute read',
  $$When tests fail, logs and reports tell the story. This lesson covers Playwright reporting and useful logging.$$,
  array['Use Playwright reporters','Capture useful artefacts','Add logging where it helps'],
  $$## Reporting
- The HTML reporter shows results, steps and attachments
- Capture trace, screenshot and video on failure
- Reports double as evidence for stakeholders

## Logging
Log meaningful context (which data, which environment) — not noise. Let the trace carry step detail.$$,
  $$On a CI failure, the HTML report links the trace, a screenshot and the console log, so the cause is clear without re-running locally.$$,
  $$- No artefacts on failure, so CI failures are undiagnosable
- Noisy logging that buries the signal
- Treating reports as optional$$,
  $$Configure artefacts on failure once and you rarely debug blind again. The report plus trace usually answers "why did this fail?" on its own.$$,
  $$Enable the HTML reporter and on-failure artefacts, force a failure, and review the report.$$,
  $$What artefacts make a CI failure easiest to diagnose?$$,
  $$The most useful default for diagnosing failures is: A) more retries B) trace/screenshot on failure C) verbose logs everywhere. (Answer: B)$$,
  array['I can use reporters','I capture useful artefacts']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Designing for Scalability', '11 minute read',
  $$A framework that works for 10 tests must still work for 1,000. This lesson covers designing for scale.$$,
  array['Design for growth','Keep tests independent and parallel-safe','Plan for many tests'],
  $$## Scalability principles
- Independent, parallel-safe tests (no shared mutable state)
- Reusable pages, components, fixtures and helpers
- Consistent structure and naming
- Fast where possible (API setup, right layer)

## The payoff
Adding the hundredth test should feel like adding the tenth.$$,
  $$Because tests create their own data and share no state, the suite scales from 20 to 500 tests and still runs in parallel without flakiness.$$,
  $$- Shared mutable state that breaks under parallelism
- Copy-paste growth instead of reuse
- Slow UI-only setup that does not scale$$,
  $$Independent, parallel-safe tests are the foundation of scale. If tests cannot run in parallel, the suite gets slower with every addition.$$,
  $$List three properties your framework needs so the 100th test is as easy to add as the 10th.$$,
  $$What property is essential for a framework to scale and run in parallel?$$,
  $$For a suite to scale, tests must be: A) ordered B) independent and parallel-safe C) UI-only. (Answer: B)$$,
  array['I can design for growth','I keep tests parallel-safe']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;

-- ─────────────── MODULE 8: API AUTOMATION ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'REST Basics for Testers', '12 minute read',
  $$API automation starts with understanding REST. This lesson covers the essentials you need to test APIs confidently.$$,
  array['Explain REST basics','Read status codes','Understand requests and responses'],
  $$## REST essentials
- Methods: GET (read), POST (create), PUT/PATCH (update), DELETE (remove)
- Status codes: 200 ok, 201 created, 400 bad request, 401 unauthorised, 404 not found, 500 server error
- Request: method, URL, headers, body; Response: status, headers, body

## Why test at this layer
Faster and more stable than the UI, and able to test logic before a UI exists.$$,
  $$A POST to /api/users returns 201 with the new user in the body; the test asserts the status is 201 and the returned name matches what was sent.$$,
  $$- Confusing 401 (unauthorised) with 404 (not found)
- Only checking status, never the body
- Treating API testing as harder than it is$$,
  $$Knowing your status codes cold makes you faster at both API testing and interviews. 200, 201, 400, 401, 404, 500 cover most of what you will see.$$,
  $$For a public API, list one example each of a GET, POST, PUT and DELETE and the status code you would expect.$$,
  $$What does a 401 status code indicate?$$,
  $$A 201 status code means: A) bad request B) created C) server error. (Answer: B)$$,
  array['I understand REST basics','I can read status codes']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Playwright''s request API', '13 minute read',
  $$Playwright can test APIs directly through the request fixture. This lesson covers making and asserting API calls.$$,
  array['Use the request fixture','Send GET/POST requests','Assert status and body'],
  $$## The request fixture
- test("...", async ({ request }) => { ... })
- const res = await request.post("/api/users", { data: {...} })
- expect(res.status()).toBe(201)
- const body = await res.json()

## No browser needed
API tests run without a page — fast and stable.$$,
  $$An API test posts a new user, asserts res.status() is 201, parses the body and asserts body.name equals the value sent — all without opening a browser.$$,
  $$- Forgetting to await the request or the json() parse
- Asserting only the status, ignoring the body
- Hard-coding base URLs instead of using config$$,
  $$API tests are the fastest, most stable tests you can write in Playwright. Reach for them whenever a check does not truly need the browser.$$,
  $$Write a Playwright API test that GETs a public endpoint and asserts the status and one field of the body.$$,
  $$What does the request fixture let you do without a browser page?$$,
  $$In Playwright, API calls are made through the: A) page fixture B) request fixture C) context fixture. (Answer: B)$$,
  array['I can use the request fixture','I can assert status and body']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Authentication', '12 minute read',
  $$Most real APIs require authentication. This lesson covers handling tokens and auth in your API tests.$$,
  array['Authenticate API requests','Reuse auth across tests','Keep credentials safe'],
  $$## Common approaches
- Send a token in an Authorization header
- Obtain the token once (login request) and reuse it
- Store credentials in environment variables, never in code

## Reuse
Acquire auth in setup/a fixture so each test does not log in again.$$,
  $$A setup step logs in via the API, captures the token, and a fixture attaches it to every request header — so tests run authenticated without repeating the login.$$,
  $$- Logging in inside every single test
- Hard-coding tokens or passwords
- Leaking real credentials into the repo$$,
  $$Acquire auth once and reuse it. Repeated logins are slow and noisy; a token captured in setup keeps the suite fast and clean.$$,
  $$Outline how you would authenticate once and reuse the token across several API tests.$$,
  $$Why obtain an auth token once rather than per test?$$,
  $$API credentials should be stored in: A) the test file B) environment variables C) the README. (Answer: B)$$,
  array['I can authenticate requests','I keep credentials safe']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Validating Responses', '12 minute read',
  $$A useful API test checks more than the status code. This lesson covers validating response bodies properly.$$,
  array['Validate response bodies','Assert the fields that matter','Cover error responses'],
  $$## What to validate
- Status code
- Key fields and values in the body
- Response shape (expected fields present)
- Error responses (4xx/5xx) behave correctly

## Balance
Assert what matters for the behaviour — not every field, but the meaningful ones.$$,
  $$A test for creating an order asserts status 201, that body.id exists, and that body.total equals the expected amount — plus a negative test that an invalid payload returns 400.$$,
  $$- Only checking status, never the body
- Asserting every field rigidly, so tests break on harmless changes
- Ignoring error/negative responses$$,
  $$Test the unhappy paths too. A 400 on bad input or a 401 without auth are behaviours worth asserting, not just the happy 200.$$,
  $$Write assertions for a create endpoint: status, one key field, and a negative case for invalid input.$$,
  $$Why assert the response body and not just the status code?$$,
  $$A strong API test validates: A) only the status B) status plus the meaningful body fields and error cases C) nothing. (Answer: B)$$,
  array['I can validate response bodies','I cover error responses']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Using APIs to Set Up Test Data', '12 minute read',
  $$The fastest UI tests do their setup through the API. This lesson covers using API calls to seed state for UI tests.$$,
  array['Seed UI tests via the API','Keep UI tests focused','Clean up created data'],
  $$## The pattern
- Create the data you need via request.post (fast, reliable)
- Drive only the behaviour under test through the UI
- Tear down via the API afterwards

## Why
UI setup clicks are slow and brittle; API setup is fast and stable.$$,
  $$To test the account page, the test creates the account via the API, then the UI test simply logs in and checks the page — instead of clicking through a slow multi-step sign-up first.$$,
  $$- Doing all setup through slow UI clicks
- Leaving created data behind, polluting environments
- Mixing setup behaviour into the test under test$$,
  $$Reserve the UI for the behaviour you are actually testing. Everything else — setup, teardown — is faster and more stable through the API.$$,
  $$Take a UI test with slow setup and redesign it to create its starting state via the API.$$,
  $$Why use the API to set up state for a UI test?$$,
  $$Using the API to seed UI tests makes them: A) slower B) faster and more stable C) unable to run. (Answer: B)$$,
  array['I can seed UI tests via the API','I clean up created data']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;

-- ─────────────── MODULE 9: GIT & CI/CD ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Git Basics', '12 minute read',
  $$Version control is essential for any automation work. This lesson covers the Git basics you use daily.$$,
  array['Use core Git commands','Commit meaningful changes','Work with a remote'],
  $$## Daily Git
- clone, status, add, commit, push, pull
- Write clear commit messages (what and why)
- Commit small, logical changes

## Why it matters
Your framework lives in Git; employers expect you to use it competently.$$,
  $$After adding a new test you run git add, git commit -m "Add checkout discount test", and git push — a small, clearly described change that is easy to review.$$,
  $$- Giant commits mixing many unrelated changes
- Vague messages like "fix" or "stuff"
- Committing secrets or node_modules$$,
  $$Clear, small commits make your work readable and your GitHub history a portfolio asset. Treat commit messages as communication, not an afterthought.$$,
  $$Initialise a repo (or use your project), make a small change, and commit it with a clear message.$$,
  $$What makes a good commit message?$$,
  $$A good commit is: A) large and mixes many changes B) small, logical, with a clear message C) untracked. (Answer: B)$$,
  array['I can use core Git commands','I write clear commits']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 9
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Branches & Pull Requests', '12 minute read',
  $$Branches and pull requests are how teams collaborate on code. This lesson covers the workflow.$$,
  array['Work on feature branches','Open pull requests','Collaborate through review'],
  $$## The workflow
- Create a feature branch off main
- Commit your work, push the branch
- Open a pull request for review
- Merge once approved and green

## Why
Branches isolate work; PRs enable review and run CI before merging.$$,
  $$You branch feature/checkout-tests, push your new tests, open a PR; CI runs them automatically and a teammate reviews before it merges to main.$$,
  $$- Committing straight to main
- Huge PRs that are hard to review
- Merging before CI passes$$,
  $$Small, focused pull requests get reviewed faster and merge sooner. A PR that does one thing is a gift to your reviewer.$$,
  $$Create a feature branch, push a change, and open a pull request (on your own repo is fine).$$,
  $$Why work on a feature branch and open a PR rather than committing to main?$$,
  $$A pull request lets the team: A) skip review B) review and run CI before merging C) avoid branches. (Answer: B)$$,
  array['I can work on feature branches','I can open pull requests']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 9
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'GitHub Actions', '13 minute read',
  $$Automated tests deliver most value when they run automatically. This lesson covers running Playwright in GitHub Actions.$$,
  array['Set up a CI workflow','Install browsers in CI','Upload reports as artefacts'],
  $$## Workflow steps
- Checkout, setup Node, npm ci
- npx playwright install --with-deps
- npx playwright test
- Upload playwright-report/ as an artefact (if: always())

## Triggers
Run on push and pull_request so every change is checked.$$,
  $$A workflow runs the suite on every pull request; if a test fails, the uploaded HTML report and trace let you diagnose it straight from the Actions run.$$,
  $$- Forgetting --with-deps, so browsers fail to launch
- Not uploading artefacts, so failures are undiagnosable
- Letting flaky tests erode trust in CI$$,
  $$A green CI badge on a public repo is a powerful portfolio signal — it shows you can wire tests into a real pipeline, not just write them.$$,
  $$Add a GitHub Actions workflow to your project that runs Playwright and uploads the report.$$,
  $$Why must CI run npx playwright install --with-deps?$$,
  $$In CI you upload the HTML report so that: A) tests run faster B) failures can be diagnosed C) browsers install. (Answer: B)$$,
  array['I can set up a CI workflow','I upload reports as artefacts']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 9
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Running Tests Automatically', '11 minute read',
  $$CI is most useful when it gates changes. This lesson covers triggers, gating and keeping CI reliable.$$,
  array['Trigger tests on changes','Gate merges on green CI','Keep CI reliable'],
  $$## Gating
- Run tests on every push and PR
- Require the check to pass before merge
- Treat a red build as "stop and fix"

## Reliability
Use retries in CI for rare infra blips, trace on first retry, and tune workers — but fix real flakiness rather than masking it.$$,
  $$The repo requires the Playwright check to pass before a PR can merge, so a broken test cannot reach main — quality is enforced automatically.$$,
  $$- Allowing merges over a red build
- High retries that mask genuine flakiness
- No required check, so CI is advisory only$$,
  $$Make the test check required for merging. CI that can be ignored is just decoration; CI that gates merges actually protects your main branch.$$,
  $$Configure your project so tests run on every PR; describe how you would require them to pass before merge.$$,
  $$What turns CI from advisory into a real quality gate?$$,
  $$CI becomes a real gate when: A) it only runs nightly B) the check is required before merge C) failures are ignored. (Answer: B)$$,
  array['I can trigger tests on changes','I can gate merges on CI']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 9
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Parallel Execution & Reporting', '11 minute read',
  $$Parallel execution keeps a growing suite fast; reporting makes results visible. This lesson covers both in CI.$$,
  array['Run tests in parallel','Keep parallel tests safe','Surface results clearly'],
  $$## Parallelism
- Playwright runs tests in parallel by default (workers)
- Independent, data-safe tests are required for this to work
- Tune workers to the CI runner

## Reporting in CI
Publish the HTML report and surface pass/fail on the PR so results are visible to everyone.$$,
  $$With independent tests, the suite runs across multiple workers and finishes in a quarter of the time; the PR shows a clear pass/fail and links the report.$$,
  $$- Shared state that breaks under parallelism
- Too many workers for the runner, causing instability
- Hiding results so nobody sees failures$$,
  $$Parallelism is free speed — but only if your tests are independent. The work you did on data-independence is exactly what makes parallel runs reliable.$$,
  $$Run your suite with multiple workers and confirm it still passes; note the time saved.$$,
  $$What must be true of tests for parallel execution to be reliable?$$,
  $$Parallel execution requires tests that are: A) ordered B) independent and data-safe C) UI-only. (Answer: B)$$,
  array['I can run tests in parallel','I keep parallel tests safe']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 9
on conflict (module_id, lesson_number) do nothing;
