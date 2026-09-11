// Modern Test Automation Bootcamp — knowledge-check quizzes (set B).
// Modules 7, 8, 9, 12 and 14. Plain data file consumed by a builder
// (scripts/content/build-quizzes.mjs) — no imports.
// One quiz per module; each quiz has 11 questions; each question has exactly
// four answers with exactly one correct. Questions mix scenario/judgement,
// multiple-choice, code interpretation, debugging and design decisions rather
// than plain recall. The recurring theme: a green test is not automatically a
// good test, and every architectural choice is a trade-off.
// British English. No invented statistics, companies or quotations.
export default {
  courseSlug: 'modern-test-automation-bootcamp',
  outFile: 'seed-modern-automation-quizzes-b.sql',
  passMark: 70,
  quizzes: [
    {
      moduleNumber: 7,
      title: 'Reflection & Knowledge Check',
      questions: [
        {
          text: `A "page object" on your team is a class whose only members are getters that return locators, like \`get emailInput() { return this.page.getByLabel('Email'); }\`, and every spec still calls \`.fill()\` and \`.click()\` itself. What is the strongest criticism of this design?`,
          answers: [
            { text: 'It is getter-soup: it renames selectors but moves no behaviour, so the flow logic and its duplication still live in the specs and a workflow change still touches many files', correct: true },
            { text: 'Returning locators from getters is a Playwright anti-pattern because locators must be created inside the test function to auto-wait correctly', correct: false },
            { text: 'Page objects must not expose locators at all; the fix is to make every getter private and unreachable from the spec', correct: false },
            { text: 'The design is sound and complete; centralising selectors in getters is the entire purpose of the Page Object Model', correct: false },
          ],
        },
        {
          text: 'A team automating a five-spec smoke test proposes building a base page class, a component library and a fixture layer before writing any tests. Why is this a poor decision?',
          answers: [
            { text: 'It pays the cost of structure before they have the pain it solves; abstraction is overhead until duplication and shotgun edits justify it, and five specs rarely do', correct: true },
            { text: 'A base page class is always wrong in Playwright because composition is the only supported pattern', correct: false },
            { text: 'Smoke tests specifically are exempt from any structure and must always be single-file scripts by convention', correct: false },
            { text: 'The plan is correct; more architecture up front always reduces maintenance later regardless of suite size', correct: false },
          ],
        },
        {
          text: `What does this custom fixture provide to a test that requests \`loggedInPage\`?

~~~ts
export const test = base.extend<{ loggedInPage: Page }>({
  loggedInPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: 'auth/user.json' });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});
~~~`,
          answers: [
            { text: 'A page in a fresh context pre-seeded with saved authentication state, set up before the test body and torn down after via the code following `use`', correct: true },
            { text: 'A page that logs in through the UI on every test by replaying the steps stored in the JSON file', correct: false },
            { text: 'A single shared page reused across every test in the file, so state from one test carries into the next', correct: false },
            { text: 'A page object instance; `loggedInPage` is Playwright syntax for generating a POM automatically', correct: false },
          ],
        },
        {
          text: 'When does introducing a Page Object Model genuinely pay off, rather than adding indirection for its own sake?',
          answers: [
            { text: 'When a UI area is driven by many specs so that centralising its interactions gives one place to change when the UI shifts', correct: true },
            { text: 'Always, on the first spec, because every professional Playwright suite is required to use POM', correct: false },
            { text: 'Only for pages with more than a fixed number of form fields, below which POM is forbidden', correct: false },
            { text: 'Never in Playwright, because locators and fixtures make the Page Object Model obsolete in every case', correct: false },
          ],
        },
        {
          text: 'A `LoginPage` class exposes a method `async login(email, password)` that fills the form and clicks submit, but it also contains `expect(this.page).toHaveURL(\'/dashboard\')` inside that method. Why do many teams consider putting the assertion there a mistake?',
          answers: [
            { text: 'It bakes one expected outcome into the reusable action, so the page object cannot be used to test a failed login without lying about what "login" means', correct: true },
            { text: 'Assertions are not allowed to run inside async methods and will be silently skipped', correct: false },
            { text: 'Page objects are forbidden from importing `expect`, so the file will not compile', correct: false },
            { text: 'The assertion makes the method slower, which is the only real objection', correct: false },
          ],
        },
        {
          text: 'Your suite has grown to hundreds of specs and you want to run only the fast, critical checks on every pull request. Which approach best supports this without duplicating specs?',
          answers: [
            { text: 'Tag specs (for example `@smoke`, `@slow`) and select them at run time with a grep/tag filter, keeping one copy of each test', correct: true },
            { text: 'Copy the critical specs into a separate folder and maintain both copies by hand', correct: false },
            { text: 'Comment out the slow specs before each pull-request run and uncomment them afterwards', correct: false },
            { text: 'Delete the slow specs, since anything not run on every pull request has no value', correct: false },
          ],
        },
        {
          text: 'A reviewer says a helper called `createOrder()` that navigates the UI, fills a checkout form and asserts a confirmation banner is "doing too much". In framework terms, what is the underlying concern?',
          answers: [
            { text: 'It mixes navigation, interaction and assertion into one opaque unit, so it cannot be reused as a setup step without also forcing its assertion and it is hard to reason about failures', correct: true },
            { text: 'Helper functions are not permitted to call more than one Playwright API method', correct: false },
            { text: 'The concern is purely naming; renaming it to `checkout()` resolves the design problem entirely', correct: false },
            { text: 'Nothing is wrong; a single all-in-one helper per feature is the recommended structure at any scale', correct: false },
          ],
        },
        {
          text: 'Which situation is the clearest sign that a suite has outgrown its lack of structure and now needs some?',
          answers: [
            { text: 'Adding a "remember me" checkbox to the login form requires editing dozens of specs because each drives the login form directly', correct: true },
            { text: 'A single new engineer asks where a test file lives on their first day', correct: false },
            { text: 'The suite contains more than a round number of spec files, regardless of duplication', correct: false },
            { text: 'One spec occasionally takes slightly longer than the others to run', correct: false },
          ],
        },
        {
          text: 'What is the practical difference between using fixtures for dependency injection versus calling helper functions at the top of each test?',
          answers: [
            { text: 'Fixtures declare a test’s needs by parameter and guarantee setup and teardown around the test, whereas a manually-called helper leaves teardown and ordering to the author to remember', correct: true },
            { text: 'There is no difference; fixtures are only syntactic sugar over calling a helper and behave identically on failure', correct: false },
            { text: 'Helper functions run in parallel automatically while fixtures always force serial execution', correct: false },
            { text: 'Fixtures can only provide primitive values, so any object such as a page must come from a helper', correct: false },
          ],
        },
        {
          text: 'A team decides every spec must extend a deep inheritance chain: `BasePage` → `AuthenticatedPage` → `DashboardPage` → `ReportsPage`. Six months on, changes to `BasePage` break unrelated pages. What does this illustrate?',
          answers: [
            { text: 'Deep inheritance couples unrelated pages through a shared base, so a change high in the chain ripples widely; composition of small components is usually the more flexible choice', correct: true },
            { text: 'Inheritance is never usable in test frameworks and the language should forbid it', correct: false },
            { text: 'The chain is simply one level too short; adding another base class would have prevented the breakage', correct: false },
            { text: 'The breakage proves the pages were not tagged correctly, which is the real root cause', correct: false },
          ],
        },
        {
          text: 'You are asked to justify a proposed component object for a reusable date-picker that appears on eight different pages. Which justification is soundest?',
          answers: [
            { text: 'The widget is duplicated across many pages, so a component object gives one place to change its interactions and stops eight copies drifting apart', correct: true },
            { text: 'Every widget should have a component object regardless of how many places it appears, for consistency', correct: false },
            { text: 'A date-picker is complex, and complex widgets must always be abstracted even if they appear only once', correct: false },
            { text: 'Component objects make tests run faster, which is the primary reason to introduce one', correct: false },
          ],
        },
      ],
    },
    {
      moduleNumber: 8,
      title: 'Reflection & Knowledge Check',
      questions: [
        {
          text: 'A setup project logs in once through the UI and calls `await page.context().storageState({ path: \'auth/user.json\' })`. Later tests load that file as `storageState`. What has this achieved?',
          answers: [
            { text: 'It captured the authenticated cookies and local storage to a file so subsequent tests start already logged in without repeating the UI login', correct: true },
            { text: 'It recorded the login steps so Playwright can replay the clicks before each test', correct: false },
            { text: 'It stored the user’s password in plain text so tests can re-enter it automatically', correct: false },
            { text: 'It enabled session sharing so all parallel workers mutate one live server session together', correct: false },
          ],
        },
        {
          text: 'Why do many teams prefer a programmatic or API-based login for their setup step over driving the login form in the browser?',
          answers: [
            { text: 'It is faster and far less flaky, since it avoids the UI entirely and does not break when the login page markup changes', correct: true },
            { text: 'API login is the only method that can produce a valid storageState file; UI login cannot', correct: false },
            { text: 'Browser login cannot set cookies, so an API call is technically required to authenticate', correct: false },
            { text: 'API login runs the real user journey more faithfully than clicking through the form', correct: false },
          ],
        },
        {
          text: 'You need tests for an admin and a standard user to run in the same suite. Which configuration approach keeps their sessions cleanly separated?',
          answers: [
            { text: 'Define per-role Playwright projects, each with its own storageState file, and route each spec to the project whose role it needs', correct: true },
            { text: 'Log in as admin once and downgrade the role inside each standard-user test at run time', correct: false },
            { text: 'Store both roles in a single storageState file and hope the correct one is used per test', correct: false },
            { text: 'Share one session and switch roles by editing cookies mid-test from within each spec', correct: false },
          ],
        },
        {
          text: 'A test passes in isolation but fails when the whole file runs, and the failure changes depending on which test ran before it. What is the most likely cause?',
          answers: [
            { text: 'Order dependence from shared mutable state: an earlier test leaves data or session state behind that a later test unknowingly relies on or is broken by', correct: true },
            { text: 'A genuine product bug that only appears when the server is under the load of several tests', correct: false },
            { text: 'Playwright caps the number of tests per file, so later tests are throttled and fail', correct: false },
            { text: 'The assertions are correct but the reporter miscounts results when many tests run together', correct: false },
          ],
        },
        {
          text: 'What is the risk of every test creating a user named `test@example.com` with a fixed username?',
          answers: [
            { text: 'Collisions: parallel or repeated runs clash on the unique field and fail non-deterministically or leave the database in a state that breaks later runs', correct: true },
            { text: 'None; a fixed identity is the recommended way to make tests deterministic', correct: false },
            { text: 'The only risk is slightly slower tests because the server must check the name each time', correct: false },
            { text: 'Playwright rejects duplicate email strings within a run and skips the affected tests silently', correct: false },
          ],
        },
        {
          text: 'A team seeds test data by calling the product’s own API in a fixture before each test and deletes it afterwards. Compared with relying on a shared, pre-populated database, what is the main advantage?',
          answers: [
            { text: 'Each test owns and controls its own data, so tests do not interfere with each other and can run in parallel without stepping on shared fixtures', correct: true },
            { text: 'It removes the need to assert anything, since API-seeded data is guaranteed correct', correct: false },
            { text: 'It makes the tests independent of the product entirely, so they still pass when the product is broken', correct: false },
            { text: 'A shared database is always faster, so the only reason to seed per test is code style', correct: false },
          ],
        },
        {
          text: 'A saved `storageState` file that used to work now causes tests to start on the login page again. What is the most likely explanation?',
          answers: [
            { text: 'The stored session token expired or was invalidated, so the saved state no longer authenticates and must be regenerated', correct: true },
            { text: 'storageState files can only be read once and are consumed after the first test', correct: false },
            { text: 'Playwright deletes storageState files automatically at the start of every run', correct: false },
            { text: 'The file format changed with the browser version, so the JSON is now unreadable', correct: false },
          ],
        },
        {
          text: 'Which practice most directly makes it safe to run tests in a random order?',
          answers: [
            { text: 'Each test creates the state it needs and cleans up after itself, depending on no artefact left by another test', correct: true },
            { text: 'Fixing the order in the config so it can never change, and documenting the required sequence', correct: false },
            { text: 'Running everything in a single worker so nothing overlaps in time', correct: false },
            { text: 'Adding a fixed wait at the start of each test to let previous state settle', correct: false },
          ],
        },
        {
          text: 'A colleague’s new test authenticates as admin but forgets to specify a project, so it inherits the default standard-user storageState and fails with a permissions error. What does this teach about test-data and state strategy?',
          answers: [
            { text: 'The role a test runs as should be explicit and enforced by configuration, not left to an inherited default that is easy to get silently wrong', correct: true },
            { text: 'Admin tests are impossible in Playwright and should be run manually instead', correct: false },
            { text: 'The permissions error is a product bug, since the credentials were valid admin credentials', correct: false },
            { text: 'storageState cannot represent an admin role, so a fresh UI login was required', correct: false },
          ],
        },
        {
          text: 'What is the purpose of pairing `page.on(\'request\')` or an API teardown step with data created during a test?',
          answers: [
            { text: 'To ensure created records are removed after the test so the environment does not accumulate leftover data that leaks into later runs', correct: true },
            { text: 'To make the test assert faster by caching every network request it observed', correct: false },
            { text: 'To force the test to fail if any network request occurs, proving the page is static', correct: false },
            { text: 'To replay the same requests on the next run instead of hitting the real server', correct: false },
          ],
        },
        {
          text: 'A suite runs green locally but flakes in CI, and the flaky tests all read a "welcome back" banner that only appears on a user’s second-ever login. What is the underlying design flaw?',
          answers: [
            { text: 'The assertion depends on hidden historical state of a shared account rather than on state the test sets up itself, so the outcome varies with account history', correct: true },
            { text: 'CI machines render banners differently, so the banner text should be matched case-insensitively', correct: false },
            { text: 'The banner is a genuine intermittent product bug that only CI is fast enough to trigger', correct: false },
            { text: 'The test is fine; CI simply needs a longer default timeout for the banner to appear', correct: false },
          ],
        },
      ],
    },
    {
      moduleNumber: 9,
      title: 'Reflection & Knowledge Check',
      questions: [
        {
          text: `What does this request-context code assert?

~~~ts
const res = await request.post('/api/orders', {
  data: { sku: 'ABC-1', qty: 2 },
});
expect(res.status()).toBe(201);
const body = await res.json();
expect(body).toHaveProperty('id');
~~~`,
          answers: [
            { text: 'That creating an order returns HTTP 201 and a JSON body containing an `id`, testing the API directly without a browser', correct: true },
            { text: 'That the order appears in the UI order list after the request completes', correct: false },
            { text: 'That the response takes fewer than 201 milliseconds to arrive', correct: false },
            { text: 'That exactly two orders were created, one per unit of `qty`', correct: false },
          ],
        },
        {
          text: 'Which assertion most meaningfully verifies a `GET /api/users/42` response, beyond just checking it did not error?',
          answers: [
            { text: 'Assert the status is 200 and that the parsed body’s `id` equals 42 and expected fields are present with the right types', correct: true },
            { text: 'Assert only that `res.ok()` is true, since a 2xx status means the data must be correct', correct: false },
            { text: 'Assert that the raw response text is non-empty, which proves the user exists', correct: false },
            { text: 'Assert that the request completed without throwing, and treat any returned body as valid', correct: false },
          ],
        },
        {
          text: 'To call an authenticated API endpoint from Playwright’s request context, which approach is most appropriate?',
          answers: [
            { text: 'Attach the auth token, for example via an `Authorization` header or a request context created with stored auth state, so the API accepts the call', correct: true },
            { text: 'Open the login page in a browser first; API requests automatically inherit browser cookies with no further setup', correct: false },
            { text: 'Send the username and password as query parameters on every request', correct: false },
            { text: 'Disable authentication on the endpoint for the duration of the test run', correct: false },
          ],
        },
        {
          text: 'A UI test needs a pre-existing order to exist before it checks the order-history page. What is the strongest reason to create that order via the API rather than through the checkout UI?',
          answers: [
            { text: 'The order is arrange, not the thing under test; creating it by API is faster and less flaky, keeping the test focused on the history page', correct: true },
            { text: 'Creating it through the UI would make the test more thorough, so the API route is only a shortcut for lazy teams', correct: false },
            { text: 'The API is the only way to create an order in any Playwright test', correct: false },
            { text: 'UI creation cannot produce a real order, so the history page would have nothing to show', correct: false },
          ],
        },
        {
          text: 'What does `expect(res.ok()).toBeTruthy()` actually check, and why is it weaker than checking a specific status?',
          answers: [
            { text: 'It only checks the status is in the 200–299 range, so it would pass for a 204 when you expected a 201, hiding a real behavioural difference', correct: true },
            { text: 'It checks the response body is valid JSON, which is stricter than a status check', correct: false },
            { text: 'It verifies the response arrived within the timeout, unrelated to the status code', correct: false },
            { text: 'It is identical to `toBe(200)` and there is no practical difference between them', correct: false },
          ],
        },
        {
          text: 'A hybrid test seeds data via the API and then verifies it in the UI. Which sequencing best avoids a race where the UI loads before the data exists?',
          answers: [
            { text: 'Await the API seeding call to complete (and confirm its success) before navigating the page that should display the data', correct: true },
            { text: 'Fire the API call and the navigation together and add a fixed two-second wait to let them settle', correct: false },
            { text: 'Navigate first and rely on the page auto-refreshing until the later API call lands', correct: false },
            { text: 'Poll the UI in a loop and retry the API call each time the assertion fails', correct: false },
          ],
        },
        {
          text: 'A test for a "delete order" endpoint asserts only `expect(res.status()).toBe(200)`. What important verification is it missing?',
          answers: [
            { text: 'That the order is actually gone afterwards — a follow-up GET should now return 404, confirming the side effect rather than just the acknowledgement', correct: true },
            { text: 'Nothing; a 200 status is a complete proof that the resource was deleted', correct: false },
            { text: 'It should also assert the response time, which is the real measure of a delete', correct: false },
            { text: 'It should assert the response body contains the full deleted record for auditing', correct: false },
          ],
        },
        {
          text: 'When is testing at the API layer clearly preferable to driving the same behaviour through the UI?',
          answers: [
            { text: 'When you are verifying business rules, validation and status codes of an endpoint, where the API layer is faster, more stable and more precise than clicking through screens', correct: true },
            { text: 'Whenever a UI exists, because UI tests provide no value once an API test covers the same endpoint', correct: false },
            { text: 'Only when the UI has no automated coverage at all, as a temporary stopgap', correct: false },
            { text: 'Never; any behaviour reachable through the UI must be tested exclusively through the UI', correct: false },
          ],
        },
        {
          text: `This request-context call is expected to be rejected for bad input. Which assertion correctly captures that intent?

~~~ts
const res = await request.post('/api/orders', {
  data: { sku: '', qty: -5 },
});
~~~`,
          answers: [
            { text: '`expect(res.status()).toBe(400)` — verify the API rejects invalid input with a client-error status rather than silently accepting it', correct: true },
            { text: '`expect(res.ok()).toBeTruthy()` — the request went through, so it should be treated as a success', correct: false },
            { text: '`expect(res.status()).toBe(201)` — the endpoint should create the order and correct the values itself', correct: false },
            { text: '`await expect(page).toHaveURL(’/error’)` — check the browser was redirected to an error page', correct: false },
          ],
        },
        {
          text: 'Why should an API test that creates a resource typically clean it up (or run against isolated data), even though the assertions have already passed?',
          answers: [
            { text: 'Leftover resources accumulate and can make later runs collide or assert against stale data, so cleanup keeps the suite repeatable', correct: true },
            { text: 'Uncleaned resources cause Playwright to mark the passing test as failed on the next run', correct: false },
            { text: 'Cleanup is only a stylistic nicety and has no effect on other tests’ reliability', correct: false },
            { text: 'The API will refuse further requests until previously created resources are deleted', correct: false },
          ],
        },
        {
          text: 'A team wants to log in once via the API and reuse the token for a batch of API tests. Which setup fits Playwright’s model best?',
          answers: [
            { text: 'Obtain the token in a fixture or setup step and build a request context (or default headers) carrying it, so each test reuses the authenticated context', correct: true },
            { text: 'Hard-code the token as a string literal in every spec so there is no shared setup to maintain', correct: false },
            { text: 'Re-authenticate inside every single test to be safe, accepting the extra calls as necessary', correct: false },
            { text: 'Store the token in the page’s local storage and read it back for API calls, since request context shares browser storage by default', correct: false },
          ],
        },
      ],
    },
    {
      moduleNumber: 12,
      title: 'Reflection & Knowledge Check',
      questions: [
        {
          text: `What does this workflow fragment cause to happen?

~~~yaml
on:
  pull_request:
    branches: [main]
jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
~~~`,
          answers: [
            { text: 'On every pull request targeting `main`, it checks out the code, installs dependencies and browsers, then runs the Playwright suite on an Ubuntu runner', correct: true },
            { text: 'It runs the Playwright suite once per day on a schedule against the `main` branch', correct: false },
            { text: 'It runs only when someone pushes directly to `main`, not on pull requests', correct: false },
            { text: 'It deploys the application to production after the tests pass', correct: false },
          ],
        },
        {
          text: 'Why is `npx playwright install --with-deps` typically required in CI but not on a developer’s machine?',
          answers: [
            { text: 'A fresh CI runner has no browsers or their system libraries, so they must be installed each run, whereas a developer machine usually already has them', correct: true },
            { text: 'The flag upgrades Playwright to the latest version, which developers do manually', correct: false },
            { text: 'CI cannot run `npm ci`, so browser installation replaces it', correct: false },
            { text: 'It is only needed to enable video recording, which developers rarely use', correct: false },
          ],
        },
        {
          text: `What is the effect of this caching step, and its main limitation?

~~~yaml
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: npm-\${{ hashFiles('package-lock.json') }}
~~~`,
          answers: [
            { text: 'It restores the npm download cache when the lockfile is unchanged, speeding up `npm ci`; it does not cache the Playwright browser binaries, which live elsewhere', correct: true },
            { text: 'It caches the Playwright browsers, so the install step can be removed entirely', correct: false },
            { text: 'It caches the test results so unchanged tests are skipped on the next run', correct: false },
            { text: 'It disables installation completely whenever the cache key matches', correct: false },
          ],
        },
        {
          text: 'A team wants a failing Playwright suite to block a pull request from merging. Beyond adding the workflow, what else is required?',
          answers: [
            { text: 'A branch protection rule that marks the test job a required status check, so the merge is blocked until it passes', correct: true },
            { text: 'Nothing else; any failing workflow automatically prevents merging by default', correct: false },
            { text: 'A manual reviewer must re-run the tests locally and confirm before each merge', correct: false },
            { text: 'The workflow must be renamed to `required.yml` for GitHub to enforce it', correct: false },
          ],
        },
        {
          text: `What does this matrix configuration do?

~~~yaml
strategy:
  matrix:
    shard: [1, 2, 3, 4]
steps:
  - run: npx playwright test --shard=\${{ matrix.shard }}/4
~~~`,
          answers: [
            { text: 'It splits the suite into four shards run as four parallel jobs, each executing a quarter of the tests, to cut wall-clock time', correct: true },
            { text: 'It runs the entire suite four times over to detect flaky tests through repetition', correct: false },
            { text: 'It runs the suite on four different browsers, one per shard number', correct: false },
            { text: 'It retries the suite up to four times if the first run fails', correct: false },
          ],
        },
        {
          text: 'After sharding a suite across four parallel jobs, how do you obtain a single combined test report?',
          answers: [
            { text: 'Have each shard upload its blob report as an artifact, then a final job downloads them all and merges them into one report', correct: true },
            { text: 'The last shard to finish automatically overwrites the others with a complete report', correct: false },
            { text: 'Sharded runs cannot be reported together; you must read four separate reports', correct: false },
            { text: 'Set a flag so shard 1 alone produces the full report for the whole suite', correct: false },
          ],
        },
        {
          text: 'A CI run is green, but a developer notices the Playwright step actually exited before running because a prior step failed silently and `continue-on-error: true` was set on the test step. What is the real problem?',
          answers: [
            { text: 'The quality gate is not enforcing anything: `continue-on-error` lets the job report success regardless of the test outcome, so a green tick no longer means the tests passed', correct: true },
            { text: 'Nothing is wrong; `continue-on-error` is the correct way to make flaky suites reliable', correct: false },
            { text: 'The tests genuinely passed; a green run is definitive proof by itself', correct: false },
            { text: 'The problem is only cosmetic reporting and does not affect whether merges are blocked', correct: false },
          ],
        },
        {
          text: 'Why is running the browsers in headless mode the sensible default in CI, whereas a developer often wants headed mode locally?',
          answers: [
            { text: 'CI runners have no display and headless is faster, while a developer benefits from watching the browser when debugging a failure', correct: true },
            { text: 'Headless mode runs a different, more lenient set of assertions suited to servers', correct: false },
            { text: 'Headed mode is impossible in CI because Playwright forbids it entirely', correct: false },
            { text: 'Headless tests and headed tests exercise different code paths in the product, so CI needs headless for coverage', correct: false },
          ],
        },
        {
          text: 'A workflow always uploads the HTML report and traces only when tests fail, using `if: failure()` on the upload step. Why is this a good pattern?',
          answers: [
            { text: 'It preserves the diagnostic artefacts needed to debug a CI-only failure, while avoiding uploading large reports for every green run', correct: true },
            { text: 'It makes failing tests pass by attaching a report to them', correct: false },
            { text: 'It is required syntax; Playwright reports cannot be uploaded on success', correct: false },
            { text: 'It retries the failed tests using the uploaded trace as input', correct: false },
          ],
        },
        {
          text: 'A pull-request suite takes far too long, so a team pins the CI to a single worker to "make it stable". Runs are stable but even slower. What is the better trade-off to investigate first?',
          answers: [
            { text: 'Keep parallelism and instead fix the tests’ shared-state coupling and shard the run, so speed is retained without the flakiness that parallelism exposed', correct: true },
            { text: 'A single worker is the correct permanent setting; parallel testing is inherently unreliable', correct: false },
            { text: 'Reduce the number of tests until the suite is fast, since slow suites have no value', correct: false },
            { text: 'Increase the default timeout so slow serial runs stop failing, accepting the longer time', correct: false },
          ],
        },
        {
          text: 'What does `runs-on` combined with a `matrix.browser: [chromium, firefox, webkit]` express in a workflow?',
          answers: [
            { text: 'The job fans out into parallel runs, one per listed browser, so the suite is exercised across all three engines', correct: true },
            { text: 'It selects a single browser at random from the three for each run', correct: false },
            { text: 'It installs all three browsers but runs the tests only on the first that succeeds', correct: false },
            { text: 'It merges the three browsers into one combined engine for the run', correct: false },
          ],
        },
      ],
    },
    {
      moduleNumber: 14,
      title: 'Reflection & Knowledge Check',
      questions: [
        {
          text: `An assistant generates this test for a login page. What is the most serious problem a reviewer should catch?

~~~ts
test('login works', async ({ page }) => {
  await page.goto('/login');
  await page.fillForm({ email: 'a@b.com', password: 'pw' });
  await page.clickButton('Sign in');
  await expect(page).toBeTruthy();
});
~~~`,
          answers: [
            { text: 'It uses hallucinated APIs (`page.fillForm`, `page.clickButton` do not exist) and a meaningless assertion (`expect(page).toBeTruthy()` is always true), so it would not even represent a real, passing test of login', correct: true },
            { text: 'The email address is not a real inbox, so the test cannot authenticate', correct: false },
            { text: 'The only issue is the missing `await` on the final expect', correct: false },
            { text: 'It is fine as written; these are standard Playwright convenience methods', correct: false },
          ],
        },
        {
          text: 'An AI-written test passes reliably. On review you find its single assertion is `await expect(page.locator(\'body\')).toBeVisible()` after submitting a payment form. Why should this test not be trusted?',
          answers: [
            { text: 'The assertion is true for essentially any page that loads, so the test would stay green even if the payment silently failed — it verifies nothing about the behaviour under test', correct: true },
            { text: 'Asserting on the body element is slower than asserting on a specific locator', correct: false },
            { text: 'The test is trustworthy precisely because it passes reliably; reliability is the goal', correct: false },
            { text: 'The problem is only that `body` should be selected with a data-testid instead', correct: false },
          ],
        },
        {
          text: 'An assistant confidently suggests calling `await page.waitForNetworkIdle()` to fix a flaky test. You cannot find that method in the Playwright API. What is the right conclusion?',
          answers: [
            { text: 'It is likely a hallucinated API; verify against the real documentation and use a supported wait such as awaiting a specific response or a web-first assertion instead', correct: true },
            { text: 'The method exists but is hidden; call it anyway since the assistant is usually right', correct: false },
            { text: 'Any method an assistant suggests must exist, so the local Playwright install is simply out of date', correct: false },
            { text: 'Flakiness cannot be fixed without that method, so the test should be deleted', correct: false },
          ],
        },
        {
          text: 'An assistant offers to speed up your setup by embedding a working admin API key directly in the committed test file. What is the correct response?',
          answers: [
            { text: 'Refuse: secrets must not be committed; inject the key from an environment variable or secret store, and rotate the exposed key if it was ever shared', correct: true },
            { text: 'Accept it for now, since a key in a private repository is not really exposed', correct: false },
            { text: 'Accept it but add a code comment asking colleagues not to look at the key', correct: false },
            { text: 'Accept it only if the key belongs to a test environment, as those keys are exempt from secret handling', correct: false },
          ],
        },
        {
          text: 'A generated test asserts `expect(response.status()).toBe(200)` for an endpoint whose specification says a successful creation returns 201. The test is green against a stub that returns 200. What has gone wrong?',
          answers: [
            { text: 'The assertion encodes the wrong expected status; it passes against the stub but would wrongly fail (or hide a defect) against the real API — green here does not mean correct', correct: true },
            { text: 'Nothing; 200 and 201 are interchangeable and the test is correct', correct: false },
            { text: 'The stub is faulty and the test is right; the real API should also return 200', correct: false },
            { text: 'The only fix needed is to increase the request timeout', correct: false },
          ],
        },
        {
          text: 'What is the most reliable way to review an AI-generated Playwright test for correctness before trusting it?',
          answers: [
            { text: 'Read what each assertion actually proves, confirm every API used exists, and check it fails when the behaviour is broken — not just that it passes today', correct: true },
            { text: 'Run it once; if it is green, it is correct and needs no further scrutiny', correct: false },
            { text: 'Trust it if the assistant expresses high confidence in its explanation', correct: false },
            { text: 'Accept it if it compiles without type errors, since that proves the logic is sound', correct: false },
          ],
        },
        {
          text: 'An assistant produces a test with the assertion `expect(await page.title()).toContain(\'\')`. Why is this a red flag even though it passes?',
          answers: [
            { text: 'Every string contains the empty string, so the assertion can never fail — it is a tautology dressed up as a check', correct: true },
            { text: 'Page titles cannot be read asynchronously, so the await is misplaced', correct: false },
            { text: 'It should use `toBe` rather than `toContain` for titles, which is the only issue', correct: false },
            { text: 'It is a strong assertion because it confirms the page has a title element at all', correct: false },
          ],
        },
        {
          text: 'When an AI assistant writes tests for you, who is accountable for a defect that a weak generated assertion let slip into production?',
          answers: [
            { text: 'The engineer who reviewed and merged the test; authorship by a tool does not transfer responsibility for what ships', correct: true },
            { text: 'The assistant vendor, since their model produced the assertion', correct: false },
            { text: 'Nobody, because AI-generated code carries no ownership', correct: false },
            { text: 'The original test framework authors, for allowing weak assertions to compile', correct: false },
          ],
        },
        {
          text: 'A generated suite has high line coverage and all tests are green, and the assistant cites the coverage number as evidence of quality. What is the sound rebuttal?',
          answers: [
            { text: 'Coverage measures which code ran, not whether the assertions would catch a defect; tests can execute every line while asserting nothing meaningful', correct: true },
            { text: 'High coverage does guarantee quality, so the assistant is correct and no rebuttal is needed', correct: false },
            { text: 'Coverage is irrelevant because only the number of tests matters', correct: false },
            { text: 'The coverage figure must be wrong, since green suites cannot have measurable coverage', correct: false },
          ],
        },
        {
          text: 'An assistant proposes pasting a failing production log containing real customer records into a public model prompt to help debug a test. How should you judge this?',
          answers: [
            { text: 'Reject it: sending real customer data to an external service risks a privacy and security breach; redact or synthesise the data before sharing any excerpt', correct: true },
            { text: 'Allow it, since debugging is a legitimate purpose that overrides data-handling rules', correct: false },
            { text: 'Allow it if the prompt is deleted afterwards, which removes any exposure', correct: false },
            { text: 'Allow it because logs are technical artefacts and never count as personal data', correct: false },
          ],
        },
        {
          text: 'An assistant generates a test that uses `page.getByRole(\'button\', { name: \'Submit\' })` and asserts `await expect(page.getByText(\'Thank you\')).toBeVisible()` after a real form submission. How should a reviewer treat this one?',
          answers: [
            { text: 'It uses real APIs and a meaningful, behaviour-specific assertion, so it is a reasonable starting point — still verify the locator matches the app and that it fails when submission breaks', correct: true },
            { text: 'Reject it outright, because any AI-generated test is untrustworthy regardless of content', correct: false },
            { text: 'Accept it without review, because it uses role-based locators which are always correct', correct: false },
            { text: 'Reject it because visible-text assertions are inherently weak and prove nothing', correct: false },
          ],
        },
      ],
    },
  ],
};
