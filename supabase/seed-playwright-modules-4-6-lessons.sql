-- ============================================================
-- Practical Test Automation with Playwright — first-draft lessons for
-- Module 4 (Playwright Essentials), Module 5 (Page Object Model) and
-- Module 6 (Test Data Management). Run AFTER seed-playwright-modules.sql.
-- Idempotent.
-- ============================================================

-- ─────────────── MODULE 4: PLAYWRIGHT ESSENTIALS ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Installing & Configuring Playwright', '12 minute read',
  $$Before writing tests you need a clean, working setup. This lesson takes you from nothing to a running Playwright project with TypeScript.$$,
  array['Install Playwright with TypeScript','Understand the generated project','Run the example tests'],
  $$## Setup steps
- Create a project folder and run: npm init playwright@latest
- Choose TypeScript, a tests folder, and add the GitHub Actions workflow
- Run the example tests: npx playwright test
- Open the report: npx playwright show-report

## What gets created
- playwright.config.ts (global config)
- tests/ (your specs)
- a sample workflow for CI$$,
  $$Running npm init playwright@latest scaffolds a working project in under a minute; npx playwright test then runs the bundled example tests so you know the setup is healthy before you write a line.$$,
  $$- Skipping the example run, so setup issues surface later
- Forgetting npx playwright install for browsers
- Committing node_modules instead of using .gitignore$$,
  $$Push your project to GitHub from the first commit. A public Playwright repo with a clear README is one of the strongest portfolio pieces a tester can show.$$,
  $$Set up a fresh Playwright project, run the example tests, and open the HTML report.$$,
  $$Why run the bundled example tests immediately after setup?$$,
  $$You scaffold a new Playwright project with: A) npm start B) npm init playwright@latest C) playwright new. (Answer: B)$$,
  array['I can set up a Playwright project','I can run the example tests']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Project Structure & Running Tests', '12 minute read',
  $$Understanding the project layout and how to run tests selectively makes you far faster day to day. This lesson covers structure and the test runner.$$,
  array['Navigate the project structure','Run tests selectively','Read the HTML report'],
  $$## Key paths
- playwright.config.ts: browsers, baseURL, reporters
- tests/: your *.spec.ts files
- playwright-report/: HTML report output

## Running tests
- All: npx playwright test
- One file: npx playwright test login.spec.ts
- By title: npx playwright test -g "valid login"
- Headed: --headed; UI mode: --ui$$,
  $$While developing a single flaky test you run npx playwright test -g "expired code" --ui — running just that test in UI mode instead of the whole suite saves minutes every iteration.$$,
  $$- Always running the full suite when -g would do
- Ignoring the HTML report after failures
- Mixing unrelated tests into one giant spec file$$,
  $$Learn -g and --ui early. Being able to run and watch exactly the test you care about, instantly, is what makes you fast at writing and fixing automation.$$,
  $$Run a single test by title, then open it in UI mode, then view the HTML report.$$,
  $$How would you run only the tests whose title contains "checkout"?$$,
  $$To run tests matching a title you use: A) --headed B) -g "title" C) --report. (Answer: B)$$,
  array['I can navigate the project','I can run tests selectively']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Locators', '14 minute read',
  $$Locators are where automation succeeds or fails. This lesson covers Playwright locators in priority order so your tests are stable and readable.$$,
  array['Choose robust user-facing locators','Use the recommended locator priority','Avoid brittle selectors'],
  $$## Locator priority (best first)
- getByRole: buttons, links, headings, inputs by role and name
- getByLabel: form fields with a label
- getByPlaceholder / getByText: where appropriate
- getByTestId: when nothing user-facing is stable
- CSS / XPath: last resort

## Why user-facing wins
They survive markup refactors, double as accessibility checks, and read like the user intent.$$,
  $$page.getByRole("button", { name: "Sign in" }) keeps working even after the markup and CSS classes change, because it targets what the user sees rather than how it is built.$$,
  $$- Long CSS chains tied to layout
- Using nth-child or indexes that shift
- Defaulting to XPath everywhere$$,
  $$Locate elements the way a user would describe them. If you would say "the Sign in button", use getByRole with that name — it is the single biggest factor in stable tests.$$,
  $$On any page, locate five elements using only getByRole/getByLabel/getByText. Only fall back to getByTestId if you truly cannot.$$,
  $$Why are user-facing locators more stable than CSS selectors?$$,
  $$The preferred Playwright locator for a named button is: A) CSS class B) getByRole C) XPath. (Answer: B)$$,
  array['I can choose robust locators','I follow the locator priority']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Web-First Assertions & Auto-Waiting', '14 minute read',
  $$Playwright auto-waits for elements and retries assertions, which removes most flakiness — if you rely on it. This lesson covers web-first assertions and waiting.$$,
  array['Use web-first assertions','Rely on auto-waiting','Eliminate manual sleeps'],
  $$## How it works
- Actions (click, fill) wait for the element to be visible, stable and enabled
- expect(locator) assertions retry until they pass or time out
- You almost never need manual waits

## Do this, not that
- Replace waitForTimeout with expect(locator).toBeVisible()
- Wait on events (waitForURL, waitForResponse), not arbitrary time$$,
  $$Instead of waiting 3 seconds for a toast, assert it: await expect(page.getByText("Saved")).toBeVisible(); Playwright retries until it appears, so the test is faster and more reliable.$$,
  $$- Sprinkling waitForTimeout to "fix" flakiness
- Asserting a value you fetched manually instead of the locator
- Waiting on fixed times that fail under load$$,
  $$Every fixed waitForTimeout is either too long (slow) or too short (flaky). Replace them all with assertions on the actual outcome you are waiting for.$$,
  $$Find any waitForTimeout in a test and replace it with a web-first assertion. Confirm it still passes and runs faster.$$,
  $$Why do web-first assertions reduce flakiness compared with manual waits?$$,
  $$Web-first assertions like expect(locator).toBeVisible(): A) need a manual sleep first B) auto-retry until they pass or time out C) only run once. (Answer: B)$$,
  array['I use web-first assertions','I rely on auto-waiting']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Fixtures & Configuration', '13 minute read',
  $$Fixtures provide ready-made state to tests, and the config controls the whole suite. This lesson covers both.$$,
  array['Use built-in and custom fixtures','Configure baseURL and projects','Set sensible defaults'],
  $$## Fixtures
- Built-in: page, request, context
- Custom: provide reusable state (e.g. a logged-in page) created on demand and torn down automatically

## Config essentials
- use.baseURL so tests use relative paths
- trace: on-first-retry; screenshot: only-on-failure
- projects for browsers; retries in CI only$$,
  $$A custom loggedInPage fixture logs in once and hands tests an authenticated page, so each test starts signed in without repeating setup code.$$,
  $$- Hard-coding full URLs instead of baseURL
- Heavy shared state mutated across tests
- High retries locally that hide flakiness$$,
  $$Set retries in CI but keep them at 0 locally. Retries mask flakiness — you want to see and fix it on your machine, not paper over it in the pipeline.$$,
  $$Add a baseURL to your config and switch a test to a relative path. Then create a simple custom fixture.$$,
  $$What problem does a custom fixture solve compared with repeating beforeEach?$$,
  $$You should generally enable retries: A) everywhere B) only in CI C) never. (Answer: B)$$,
  array['I can use fixtures','I can configure the suite']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 6, 'Debugging & the Trace Viewer', '13 minute read',
  $$When a test fails, good tooling turns confusion into a quick fix. This lesson covers Playwright debugging and the trace viewer.$$,
  array['Debug tests with UI and debug modes','Read a trace','Use codegen for locators'],
  $$## Debugging toolkit
- UI mode: npx playwright test --ui (watch, step, time-travel)
- Debug mode: --debug (step with the Inspector)
- Trace viewer: npx playwright show-trace trace.zip
- Codegen: npx playwright codegen <url>

## Reading a trace
A timeline of every action with before/after DOM snapshots, network and console — it usually shows the cause in seconds.$$,
  $$A CI test fails; you enable trace on-first-retry, download the trace artefact, open it, and see the click happened before the element was ready — pointing straight to the fix.$$,
  $$- Guessing at failures instead of opening the trace
- No artefacts captured in CI
- Re-running blindly hoping it passes$$,
  $$Before changing any code to fix a failure, open the trace. The trace viewer is the best debugging feature in Playwright and usually reveals the cause immediately.$$,
  $$Deliberately break a locator, run with traces on, open the trace and identify where and why it failed.$$,
  $$What information does the trace viewer give you about a failure?$$,
  $$The trace viewer is opened with: A) show-report B) show-trace C) --debug. (Answer: B)$$,
  array['I can debug failing tests','I can read a trace']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;

-- ─────────────── MODULE 5: PAGE OBJECT MODEL ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Why POM Matters', '11 minute read',
  $$The Page Object Model keeps locators and actions for a page in one place, so tests read clearly and changes happen in one spot. This lesson explains why it matters.$$,
  array['Explain the benefits of POM','Recognise when to introduce it','Avoid premature abstraction'],
  $$## What POM gives you
- One place to change a page locator
- Tests that read as intent (login, addToCart)
- Reuse across many tests

## When to introduce it
When you find yourself repeating locators. Premature POM on a tiny project is as harmful as none.$$,
  $$When a login field id changes, a POM means you update one page class — not twenty tests that each hard-coded the locator.$$,
  $$- Over-engineering POM for a trivial project
- Duplicating locators across files instead of reusing the object
- Mixing test logic into page objects$$,
  $$Let duplication tell you when to abstract. Introduce a page object the moment two tests need the same locators — not before.$$,
  $$Identify a page in any app and list the locators and actions a page object for it would hold.$$,
  $$What is the main maintainability benefit of the Page Object Model?$$,
  $$POM mainly helps because: A) it makes tests longer B) a page change is fixed in one place C) it removes assertions. (Answer: B)$$,
  array['I can explain why POM matters','I know when to introduce it']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Designing Page Classes', '13 minute read',
  $$A good page class is focused, readable and exposes intent. This lesson covers how to design one.$$,
  array['Design a focused page class','Expose intent-revealing methods','Keep locators encapsulated'],
  $$## Structure of a page class
- A constructor that receives the page
- Locators as private/internal members
- Public methods that express user intent (goto, login, addToCart)

## One object per page/component
Keep each class scoped to a single page or reusable component.$$,
  $$A LoginPage exposes goto() and login(email, password); the test reads const login = new LoginPage(page); await login.login(user, pass); — clear and locator-free.$$,
  $$- One giant page object for the whole app
- Exposing raw locators instead of intent methods
- Page objects that also assert everything$$,
  $$Name methods after what the user does, not what the code does. addToBasket() reads better than clickAddButton() and survives UI changes.$$,
  $$Write a page class (pseudocode or real) for a login page with goto() and login() methods.$$,
  $$Why expose intent-revealing methods rather than raw locators?$$,
  $$A page class should expose: A) raw CSS selectors B) methods that express user intent C) the test assertions. (Answer: B)$$,
  array['I can design a page class','I keep locators encapsulated']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Methods vs Assertions', '11 minute read',
  $$Where should assertions live — in the page object or the test? This lesson covers the common conventions and trade-offs.$$,
  array['Decide where assertions belong','Keep page objects action-focused','Use verify methods judiciously'],
  $$## The common split
- Page objects: actions and locators
- Tests: assertions about outcomes

## A pragmatic exception
Expose small verify methods (e.g. expectDashboardVisible()) when an assertion is reused widely — but keep the page object mostly about actions.$$,
  $$The test performs await checkout.placeOrder(); then asserts await expect(page.getByText("Order confirmed")).toBeVisible(); — the action is in the page object, the assertion stays in the test.$$,
  $$- Burying all assertions inside page objects
- Page objects that both act and assert everything
- Tests with no assertions because the page object "checks"$$,
  $$Keeping assertions in the test makes failures read clearly in the report. Reach for verify methods only when the same assertion repeats across many tests.$$,
  $$Take a test and ensure actions live in the page object while assertions stay in the test.$$,
  $$What is the usual convention for where assertions live?$$,
  $$By convention, assertions usually belong in: A) the page object B) the test C) the config. (Answer: B)$$,
  array['I know where assertions belong','I keep page objects action-focused']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Reusable Components', '11 minute read',
  $$Shared UI like navigation bars, modals and tables appear on many pages. Component objects let you model them once. This lesson covers component objects.$$,
  array['Model shared UI as components','Compose pages from components','Reduce duplication'],
  $$## Component objects
- Model a recurring widget (nav bar, search box, data table) as its own class
- Pages compose components rather than re-declaring their locators
- Update the component once, every page benefits

## When to extract
When the same UI appears on three or more pages.$$,
  $$A NavBar component holds the menu locators and a goTo(section) method; LoginPage, Dashboard and Account all reuse it instead of each re-declaring the nav.$$,
  $$- Re-declaring shared UI locators on every page
- Over-componentising one-off elements
- Components that know about specific pages (keep them generic)$$,
  $$Treat shared widgets like reusable code, not test detail. A single well-modelled NavBar component can remove dozens of duplicate locators across your suite.$$,
  $$Identify one shared UI element in an app and sketch a component object for it.$$,
  $$When is it worth extracting a UI element into a component object?$$,
  $$A component object is best used for: A) a one-off button B) UI shared across many pages C) the test assertions. (Answer: B)$$,
  array['I can model shared UI as components','I can compose pages from components']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Maintaining Page Objects', '11 minute read',
  $$Page objects only pay off if you keep them healthy. This lesson covers maintaining them as the app evolves.$$,
  array['Keep page objects maintainable','Refactor as the app changes','Avoid bloat'],
  $$## Maintenance habits
- Update locators in one place when the UI changes
- Keep methods small and intent-revealing
- Delete unused methods; consolidate duplicates
- Keep components generic and reusable

## Signs of trouble
Huge page classes, duplicated locators, methods nobody calls.$$,
  $$When a redesign moves the checkout button, you update CheckoutPage once; every test that calls placeOrder() keeps working unchanged.$$,
  $$- Letting page classes grow huge and unfocused
- Leaving dead methods around
- Duplicating locators a component should own$$,
  $$Refactor page objects as readily as you add to them. A lean, well-named set of page objects is what keeps a large suite cheap to maintain.$$,
  $$Review a page object and improve it: remove a dead method or consolidate a duplicated locator.$$,
  $$What are two warning signs that a page object needs refactoring?$$,
  $$A healthy page object is: A) large and all-knowing B) focused with small intent methods C) full of assertions. (Answer: B)$$,
  array['I can maintain page objects','I can refactor to avoid bloat']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;

-- ─────────────── MODULE 6: TEST DATA MANAGEMENT ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Static, Dynamic & Random Data', '12 minute read',
  $$Test data choices drive reliability. This lesson covers static, dynamic and random data and when to use each.$$,
  array['Distinguish data types','Choose the right data per test','Avoid data collisions'],
  $$## The three kinds
- Static: fixed, known values (good for predictable assertions)
- Dynamic: created at run time (e.g. via API) for the test
- Random/unique: generated to avoid collisions (e.g. unique emails)

## Choosing
Use unique data where records must not clash; use static where you assert exact values.$$,
  $$A registration test generates user+timestamp@example.com each run, so it never collides with a previous run and can execute any number of times.$$,
  $$- Reusing one shared record across tests
- Hard-coded data that breaks on re-run
- Random data where the test asserts an exact value$$,
  $$Unique-by-default data is the simplest cure for order-dependent, flaky suites. Generate it rather than relying on records that already exist.$$,
  $$For a test that signs up a new user, decide what data should be static, dynamic or unique, and why.$$,
  $$When should test data be unique rather than static?$$,
  $$To avoid collisions between runs you should use: A) one shared record B) unique generated data C) the same email every time. (Answer: B)$$,
  array['I can choose the right data type','I avoid data collisions']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Data Factories', '12 minute read',
  $$Factories generate valid, varied test data on demand. This lesson covers the factory pattern for test data.$$,
  array['Use factory functions for data','Generate valid varied records','Keep data setup readable'],
  $$## The factory pattern
- A function that returns a valid object, with sensible defaults
- Override only the fields a test cares about
- Combine with unique values for ids/emails

## Why it helps
Tests state only what matters; the factory fills the rest with valid defaults.$$,
  $$makeUser({ role: "admin" }) returns a complete valid user with a unique email and default fields, so the test focuses purely on the admin behaviour it is checking.$$,
  $$- Building full data objects by hand in every test
- Factories that produce invalid data
- Overriding nothing, so all records look identical$$,
  $$A good factory lets a test say only what is special about its data. That keeps tests short and makes their intent obvious at a glance.$$,
  $$Write a factory function that returns a valid user and lets you override the role.$$,
  $$How does a factory keep tests readable?$$,
  $$A data factory: A) returns a valid object with overridable defaults B) deletes the database C) replaces assertions. (Answer: A)$$,
  array['I can write a data factory','I keep data setup readable']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'JSON & CSV Data', '11 minute read',
  $$External data files keep large or shared data out of test code. This lesson covers JSON and CSV data sources.$$,
  array['Load data from JSON/CSV','Drive tests from data files','Keep data maintainable'],
  $$## When to use files
- Reusable fixtures shared across tests
- Larger data sets
- Data maintained by non-developers (CSV)

## How
Read the file, then iterate rows to drive parameterised tests — one file row per case.$$,
  $$A discounts.json holds code/result pairs; the test loads it and runs the same assertion for each entry, so adding a new case is a one-line data change.$$,
  $$- Embedding huge data arrays inline in tests
- Unvalidated file data that silently breaks tests
- Duplicating the same fixture in many files$$,
  $$Data files shine when cases change often or are owned by others. Keep them small, validated and close to the tests that use them.$$,
  $$Move an inline data set into a JSON file and load it in the test.$$,
  $$When is an external data file better than inline data?$$,
  $$External JSON/CSV data is most useful for: A) one-off values B) larger or shared data sets C) assertions. (Answer: B)$$,
  array['I can load data from files','I keep data maintainable']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Secrets & Environment Variables', '12 minute read',
  $$Credentials and environment differences must never be hard-coded. This lesson covers handling secrets and environment variables safely.$$,
  array['Keep secrets out of code','Use environment variables','Support multiple environments'],
  $$## Rules
- Never commit secrets (passwords, API keys, tokens)
- Read them from environment variables (e.g. process.env)
- Use a .env file locally and CI secrets in the pipeline
- Add .env to .gitignore

## Environments
Drive baseURL and credentials from env so the same suite runs against dev, staging and prod.$$,
  $$The test reads process.env.TEST_PASSWORD instead of a literal; locally it comes from .env, in CI from a GitHub Actions secret — the password never touches the repo.$$,
  $$- Hard-coding credentials in tests
- Committing a .env file with real secrets
- One environment baked in, so tests cannot run elsewhere$$,
  $$Treat any committed secret as compromised. Read them from the environment, gitignore your .env, and store CI secrets in the pipeline's secret store.$$,
  $$Refactor a test that hard-codes a password to read it from an environment variable instead.$$,
  $$Why must secrets be read from environment variables rather than code?$$,
  $$Secrets in automation should be: A) hard-coded for convenience B) read from environment variables and never committed C) shared in the README. (Answer: B)$$,
  array['I keep secrets out of code','I can support multiple environments']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Keeping Tests Data-Independent', '11 minute read',
  $$Reliable suites have tests that own their data and clean up. This lesson pulls the data principles together.$$,
  array['Make tests data-independent','Set up and tear down data','Run tests in any order'],
  $$## Principles
- Each test owns its data; none depends on another
- Create what you need (ideally via API), then clean up
- Generate unique values to avoid clashes
- Never rely on execution order

## The proof
A reliable test passes alone or with others, in any order, any number of times.$$,
  $$A test creates its account via the API, runs the UI behaviour, then deletes the account in teardown — so it can run repeatedly and in parallel without interfering.$$,
  $$- Tests sharing one record and interfering
- No cleanup, leaving environments messy
- Assuming a previous test created the data$$,
  $$If your tests pass alone but fail together, data coupling is almost always the cause. Independent, self-cleaning data is the fix.$$,
  $$Take an order-dependent test and refactor it to create its own data and clean up. Run it twice to confirm independence.$$,
  $$What does it mean for a test to be data-independent?$$,
  $$A data-independent test: A) reuses shared records B) owns and cleans up its own data C) must run in a fixed order. (Answer: B)$$,
  array['I can make tests data-independent','I set up and tear down data']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;
