// Modern Test Automation Bootcamp — Module 8: Authentication, State & Test Data.
// Practical module on getting past login efficiently, running as multiple roles,
// owning your own test data, and handling secrets safely. All code targets
// modern @playwright/test + TypeScript.
export default {
  courseSlug: 'modern-test-automation-bootcamp',
  moduleNumber: 8,
  lessonsPrefix: 'modern-automation',
  enhPrefix: 'modern-automation',
  enhSep: '-',
  lessons: [
    {
      lessonNumber: 1,
      title: 'Logging In Once with Storage State',
      estimatedTime: '18 minute read',
      lessonOverview: `Driving the login form at the start of every test is slow and fragile. This lesson shows how to log in once, save the authenticated session to disk, and reuse it across the whole suite with a global setup and project dependencies.`,
      learningObjectives: [
        'Save an authenticated session to a storageState file in a setup project',
        'Reuse that state across tests via storageState and project dependencies',
        'Explain why logging in once per suite is faster and more reliable than per test',
      ],
      lessonNotes: `## The problem with logging in per test
Most applications hide the interesting behaviour behind a login. The naive approach is a \`beforeEach\` that fills the login form before every test. On a suite of two hundred tests that is two hundred round-trips through the slowest, most incidental screen in the product. It is slow, and every one of those logins is a chance for a flake that has nothing to do with the feature under test.

## What storage state is
After a successful login, the browser holds the session: cookies and, increasingly, \`localStorage\` tokens. Playwright can serialise all of that to a JSON file — the **storage state** — and load it into a fresh browser context later. A context created with that state starts already logged in, without touching the login form.

- \`await context.storageState({ path: 'playwright/.auth/user.json' })\` writes the current session to disk.
- \`use: { storageState: 'playwright/.auth/user.json' }\` starts every test in that project already authenticated.

## Doing it once, properly
The clean pattern is a dedicated **setup project** that logs in and saves the state, and then making your real test projects **depend** on it. Playwright's project dependencies guarantee the setup runs first and finishes before the tests that need it:

- A \`setup\` project matches a single \`auth.setup.ts\` file whose only job is to log in and save state.
- Each browser project declares \`dependencies: ['setup']\` and \`use: { storageState }\`.

The login now happens once per run, not once per test. Every test starts on the page it actually cares about.

## Keep the state out of git
The \`.auth\` files contain live session tokens. Add \`playwright/.auth\` to \`.gitignore\` — committing them leaks credentials and the tokens go stale anyway.

## Key takeaway
Log in once in a setup project, save the session with \`storageState\`, and have your test projects depend on it — the suite gets faster and steadier because it stops re-testing the login screen it does not care about.`,
      workedExample: `A global-setup style login using a dedicated setup project. First the setup file that logs in and saves the session:

~~~ts
// tests/auth.setup.ts
import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill(process.env.USER_EMAIL!);
  await page.getByLabel('Password').fill(process.env.USER_PASSWORD!);
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Wait for a real signed-in signal before saving — never save a half-finished login.
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  await page.context().storageState({ path: authFile });
});
~~~

Then the config wires the setup project in as a dependency of the real ones:

~~~ts
// playwright.config.ts (excerpt)
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    { name: 'setup', testMatch: /.*\\.setup\\.ts/ },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/user.json' },
      dependencies: ['setup'],
    },
  ],
});
~~~

Now every test in the \`chromium\` project opens already authenticated. A test can go straight to \`/account\` and assert on it — no login form in sight.`,
      commonMistakes: `- Saving the storage state before the login has actually completed, capturing a logged-out session
- Committing \`playwright/.auth\` to git, leaking real session tokens into the repository
- Reusing a single stale state file for days until the token expires, then blaming Playwright for the failures
- Keeping a \`beforeEach\` that logs in through the UI as well, so you pay the cost twice`,
      realWorldTip: `On a delivery team, treat the login flow itself as deserving exactly one or two dedicated UI tests — it is a real feature and should be checked. Every other test should reuse storage state and never touch the login form. That split gives you honest coverage of authentication without paying its cost two hundred times, and it keeps the rest of the suite fast enough that people actually run it before pushing.`,
      exercise: `Add an \`auth.setup.ts\` that logs into any application, waits for a signed-in signal, and saves \`storageState\` to \`playwright/.auth/user.json\`. Wire it into \`playwright.config.ts\` as a \`setup\` project that your browser project depends on, and add \`playwright/.auth\` to \`.gitignore\`. Deliverable: the setup file, the config excerpt, and one test that starts already logged in.`,
      reflectionQuestion: `If two hundred tests each logged in through the UI, what are you actually re-testing two hundred times, and what does that cost the team beyond the wall-clock seconds?`,
      knowledgeCheck: `Which Playwright config option makes a project's tests start already authenticated? (Answer: use.storageState pointing at a saved state file)`,
      completionChecklist: [
        'I can save an authenticated session to a storageState file',
        'I can reuse that state across a project with a setup dependency',
        'I can explain why logging in once per suite beats logging in per test',
      ],
      enhancements: {
        industryStory: `A team's end-to-end suite took nearly forty minutes and flaked most runs. Tracing the failures showed the vast majority landed on the login screen — a step none of those tests were meant to exercise. Moving to a single setup-project login with reused storage state cut the run to under fifteen minutes and removed a whole category of flake overnight. Login was still covered — by two tests that existed to cover it, and nothing else.`,
        visualAid: {
          type: 'flow',
          title: 'Log in once, reuse everywhere',
          steps: [
            { label: 'Setup project runs first', detail: 'auth.setup.ts drives the login form a single time' },
            { label: 'Save the session', detail: 'context.storageState() writes cookies and tokens to a JSON file' },
            { label: 'Tests depend on setup', detail: 'dependencies: [setup] guarantees it finished before they start' },
            { label: 'Every test starts authenticated', detail: 'use.storageState loads the session into a fresh context' },
          ],
        },
        davidTip: `Always assert a genuine signed-in signal before calling \`storageState\`. Saving too early — right after the click, before the dashboard renders — captures a session that is not really logged in, and you get a baffling suite where every test fails at the first authenticated action.`,
        miniChallenge: `Add a second dedicated UI test that logs in through the form and asserts the dashboard appears. Keep it as the only test that touches the login screen, and confirm the rest of your suite still reuses storage state.`,
      },
    },
    {
      lessonNumber: 2,
      title: 'Handling Multiple Roles',
      estimatedTime: '18 minute read',
      lessonOverview: `Real applications behave differently for an admin, a standard user and a guest. This lesson extends the storage-state pattern to several roles at once, so a test can pick the identity it needs without ever re-authenticating by hand.`,
      learningObjectives: [
        'Save a separate storage-state file per role in the setup project',
        'Configure one Playwright project per role, each with its own storageState',
        'Choose the right role for a test and assert role-specific behaviour',
      ],
      lessonNotes: `## One session file is not enough
The single-user pattern from the last lesson breaks the moment you need to test permissions. Can a standard user see the admin settings link? Does an admin get the delete button a normal user does not? To answer those you need to be signed in as *different people* within the same suite.

The fix is simple: save one storage-state file per role, and give each role its own project.

## A file per role
Extend the setup file so it logs in as each role and saves each session separately:

- \`playwright/.auth/admin.json\`
- \`playwright/.auth/user.json\`

Each is produced by its own login, exactly as before, just pointed at a different account and a different output path.

## A project per role
Then declare a project per role in the config, each loading the matching state and depending on setup:

- an \`admin\` project with \`use: { storageState: 'playwright/.auth/admin.json' }\`
- a \`user\` project with \`use: { storageState: 'playwright/.auth/user.json' }\`

A test file placed under the \`admin\` project runs as the admin; one under \`user\` runs as the standard user. You select a role by choosing which project a test belongs to — via \`testMatch\`, folder layout, or running \`--project=admin\`.

## Testing the boundary, not just the happy path
The most valuable role tests are the negative ones: a standard user must *not* reach an admin-only page. Assert that the guarded control is absent, or that navigating directly returns a forbidden state. A permissions bug that lets an ordinary user delete records is exactly the kind of defect a green "admin can delete" test will never catch on its own.

## Key takeaway
Give every role its own storage-state file and its own project; then a test simply picks the identity it needs — and remember that proving a user *cannot* do something is often worth more than proving an admin can.`,
      workedExample: `A setup file that authenticates two roles, and a config with a project for each. The setup:

~~~ts
// tests/auth.setup.ts
import { test as setup, expect } from '@playwright/test';

async function login(page, email: string, password: string, file: string) {
  await page.goto('/login');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await page.context().storageState({ path: file });
}

setup('authenticate as admin', async ({ page }) => {
  await login(page, process.env.ADMIN_EMAIL!, process.env.ADMIN_PASSWORD!, 'playwright/.auth/admin.json');
});

setup('authenticate as user', async ({ page }) => {
  await login(page, process.env.USER_EMAIL!, process.env.USER_PASSWORD!, 'playwright/.auth/user.json');
});
~~~

The projects, each tied to a role and its state file:

~~~ts
// playwright.config.ts (excerpt)
projects: [
  { name: 'setup', testMatch: /.*\\.setup\\.ts/ },
  {
    name: 'admin',
    testMatch: /.*\\.admin\\.spec\\.ts/,
    use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/admin.json' },
    dependencies: ['setup'],
  },
  {
    name: 'user',
    testMatch: /.*\\.user\\.spec\\.ts/,
    use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/user.json' },
    dependencies: ['setup'],
  },
],
~~~

A boundary test in the \`user\` project proves the standard user cannot reach admin territory:

~~~ts
// settings.user.spec.ts — runs as the standard user
import { test, expect } from '@playwright/test';

test('a standard user cannot see admin settings', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.getByRole('link', { name: 'User management' })).toBeHidden();
});
~~~`,
      commonMistakes: `- Sharing one storage-state file between roles and wondering why permission tests are meaningless
- Only ever testing that the admin *can* do things, never that a normal user *cannot*
- Hardcoding each role's credentials in the spec instead of reading them from the environment
- Letting role state files drift, so an "admin" file actually holds an expired or downgraded session`,
      realWorldTip: `On a delivery team, keep the list of roles you test aligned with the permission model the product actually ships — usually a small set: an admin, a standard user, and perhaps an unauthenticated visitor. Resist adding a project for every fine-grained permission; instead, pick the roles that sit either side of the important boundaries and test those boundaries hard. That keeps the matrix small enough to stay green and pointed at the access rules that would actually hurt if they broke.`,
      exercise: `Extend your setup to authenticate two roles (for example admin and standard user) into separate state files, and add a project per role to the config. Write one positive test (the admin sees an admin-only control) and one negative test (the standard user does not). Deliverable: the setup file, the config excerpt, and both spec files.`,
      reflectionQuestion: `Your suite proves the admin can delete a record. What important question about the standard user does that test leave completely unanswered, and how would you close the gap?`,
      knowledgeCheck: `How do you run tests as a specific role in a multi-role storage-state setup? (Answer: assign the test to that role's project, e.g. run with --project=admin)`,
      completionChecklist: [
        'I can save a separate storage-state file for each role',
        'I can configure one project per role, each with its own state',
        'I write negative role tests that prove a user cannot cross a boundary',
      ],
      enhancements: {
        badGood: {
          label: 'testing permissions',
          bad: `~~~ts
// One shared session, so this only ever proves the happy path for whoever is logged in.
test('admin panel works', async ({ page }) => {
  await page.goto('/admin');
  await expect(page.getByRole('heading', { name: 'Admin' })).toBeVisible();
});
~~~`,
          good: `~~~ts
// user.spec.ts runs under the 'user' project with the standard-user state.
test('a standard user is refused the admin panel', async ({ page }) => {
  const response = await page.goto('/admin');
  expect(response?.status()).toBe(403);
  await expect(page.getByText('You do not have access')).toBeVisible();
});
~~~`,
        },
        davidTip: `When a permissions test goes red, check which role's state file it loaded before you touch the application. A common false alarm is a test in the wrong project — running admin-only assertions against the standard-user session — which looks like a product bug but is really a config mistake.`,
        miniChallenge: `Add a third identity: an unauthenticated visitor, using \`storageState: { cookies: [], origins: [] }\` so the project starts logged out. Write a test proving a protected page redirects that visitor to login.`,
      },
    },
    {
      lessonNumber: 3,
      title: 'Programmatic Login',
      estimatedTime: '18 minute read',
      lessonOverview: `Even once per suite, driving the login form is the slowest and least reliable way to authenticate. This lesson shows how to log in through the API using Playwright's request context, then hand the resulting session to the browser — faster setup that does not depend on the login UI at all.`,
      learningObjectives: [
        'Authenticate by calling the login API with Playwright’s request context',
        'Save the resulting session as storageState without driving the login form',
        'Explain when programmatic login is the right choice and when UI login still matters',
      ],
      lessonNotes: `## Why go around the UI
The login screen is a user-facing feature, but for *setup* it is pure overhead. It renders a page, runs client-side validation, posts a form, waits for a redirect — many steps, any of which can flake, none of which the test under it cares about. Most applications authenticate by exchanging credentials for a token or a session cookie over HTTP. You can do that directly.

Playwright ships a **request context** — an HTTP client that shares Playwright's networking and, crucially, its cookie jar. Call the login endpoint with it, and the session it establishes can be serialised to storage state just like a UI login.

## The shape of it
- \`request.post('/api/login', { data: { email, password } })\` sends credentials to the API.
- The response sets a session cookie, or returns a token you place into \`localStorage\`.
- \`request.storageState({ path })\` saves that session to disk, ready for browser projects to load.

For a cookie-based session this is almost trivial: the request context captures the \`Set-Cookie\`, and \`storageState\` writes it out. For a token in \`localStorage\`, you seed the token into a browser origin's storage before saving. Either way, no page ever loads the login form.

## Faster and steadier
Programmatic login is typically several times faster than the UI equivalent and has far fewer moving parts to fail. In a suite that authenticates several roles, that saving compounds. It also decouples the *setup* for every test from the *stability* of the login page — a slow or flaky login screen no longer taxes the whole suite.

## Do not throw the UI test away
Bypassing the form for setup does not mean the form is untested. Keep one or two tests that genuinely drive the login UI — fill the fields, submit, assert the signed-in state — because that is a real user journey and a real feature. Use the API for the other hundred setups; use the UI to prove the login page itself works.

## Key takeaway
Authenticate through the API with Playwright's request context and save it as storage state — setup gets faster and stops depending on the login screen — while a couple of dedicated UI tests keep the login journey itself honestly covered.`,
      workedExample: `A cookie-based programmatic login inside a setup project. It calls the API and saves the session, never rendering the login page:

~~~ts
// tests/auth.setup.ts
import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate via API', async ({ request }) => {
  const response = await request.post('/api/login', {
    data: { email: process.env.USER_EMAIL!, password: process.env.USER_PASSWORD! },
  });
  expect(response.ok()).toBeTruthy();

  // The request context captured the session cookie; write it out as storage state.
  await request.storageState({ path: authFile });
});
~~~

If the app instead returns a bearer token stored in \`localStorage\`, seed it into the origin before saving:

~~~ts
// tests/auth.setup.ts (token variant)
import { test as setup, expect, request as apiRequest } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate via API token', async ({ playwright, baseURL }) => {
  const context = await playwright.request.newContext();
  const response = await context.post('/api/login', {
    data: { email: process.env.USER_EMAIL!, password: process.env.USER_PASSWORD! },
  });
  expect(response.ok()).toBeTruthy();
  const { token } = await response.json();

  await context.storageState({ path: authFile });
  // Persist the token into localStorage for the app's origin so the browser starts signed in.
  const state = require('fs');
  const parsed = JSON.parse(state.readFileSync(authFile, 'utf-8'));
  parsed.origins = [{ origin: baseURL!, localStorage: [{ name: 'auth_token', value: token }] }];
  state.writeFileSync(authFile, JSON.stringify(parsed));
});
~~~

Both write the same kind of \`storageState\` file the browser projects already load — so the rest of the suite is unchanged. The login form is exercised only by the handful of tests you keep for it deliberately.`,
      commonMistakes: `- Assuming the API and UI log in the same way — check what the real login request actually sends and sets
- Deleting the UI login test after switching setup to the API, leaving the login page uncovered
- Forgetting that a token in \`localStorage\` must be seeded into the browser origin, not just held in memory
- Not asserting \`response.ok()\`, so a failed API login silently saves an unauthenticated state`,
      realWorldTip: `On a delivery team, work with the developers to understand the real authentication flow before automating it — which endpoint, what payload, cookie or token, any CSRF handling. That five-minute conversation saves hours of guessing and produces a programmatic login that mirrors how the product genuinely authenticates. It also tends to surface undocumented behaviour (a required header, a second redirect) that would have flaked your UI tests too.`,
      exercise: `Replace a UI-driven setup login with a programmatic one using the request context. Call the login endpoint, assert the response is OK, and save \`storageState\`. Keep exactly one UI login test that drives the form and asserts the signed-in state. Deliverable: the API setup file, the surviving UI login test, and a note of how much faster setup became.`,
      reflectionQuestion: `You have moved every setup login to the API for speed. What have you stopped testing as a result, and which single test would you keep to cover it?`,
      knowledgeCheck: `Which Playwright feature lets you call the login API and reuse its session in the browser? (Answer: the request context, whose storageState can be loaded by browser projects)`,
      completionChecklist: [
        'I can authenticate by calling the login API with the request context',
        'I can save that session as storageState for browser projects to reuse',
        'I keep a dedicated UI login test even after moving setup to the API',
      ],
      enhancements: {
        industryStory: `A team moved all their authentication setup from the login form to a single API call and cut minutes off every run. A sprint later a redesign quietly broke the login page's submit button — and nobody noticed for days, because no automated test drove the form any more. The lesson was not "don't use API login"; it was "keep one UI login test as the canary". They added it back and it caught the next such regression the same afternoon.`,
        visualAid: {
          type: 'comparison',
          title: 'UI login vs programmatic login for setup',
          headers: ['Aspect', 'UI login', 'Programmatic (API) login'],
          rows: [
            ['Speed', 'Slow — renders and drives a whole page', 'Fast — one HTTP request'],
            ['Points of failure', 'Many (render, validation, redirect)', 'Few (one endpoint)'],
            ['Best used for', 'Covering the login journey itself', 'Setup for every other test'],
            ['Depends on the login UI', 'Yes', 'No'],
          ],
        },
        davidTip: `Always assert the login response succeeded before saving state. A failed API login that goes unchecked writes an empty, logged-out storage file, and then every test downstream fails at its first authenticated step — a confusing red suite whose real cause is one missing \`expect(response.ok())\`.`,
        miniChallenge: `Instrument both approaches: time your UI login setup, then time the programmatic one, and record the difference. Multiply it by the number of roles you authenticate to see the real saving across a full run.`,
      },
    },
    {
      lessonNumber: 4,
      title: 'A Test Data Strategy',
      estimatedTime: '19 minute read',
      lessonOverview: `Tests need data, and where that data comes from decides whether your suite is reliable or a source of mystery failures. This lesson compares fixtures, factories and seeded data, and makes the case for generating unique data per test to avoid collisions.`,
      learningObjectives: [
        'Distinguish fixtures, factories and seeded data and when each fits',
        'Generate unique data per test to avoid collisions between runs',
        'Build a small data factory that produces sensible, overridable defaults',
      ],
      lessonNotes: `## Three ways to get test data
There is no single right answer, but there are three common sources, and mixing them thoughtlessly is where trouble starts:

- **Fixtures** — fixed, static data defined up front (a JSON file, a constant). Cheap and readable, but shared and unchanging: if two tests both use the fixture "user@example.com" and one deletes it, the other breaks.
- **Factories** — functions that *generate* data on demand, with sensible defaults you can override per test. \`makeUser({ role: 'admin' })\` returns a fresh, valid user every call. This is the workhorse for most suites.
- **Seeded data** — data loaded into the environment before tests run, usually via a script or API. Right for reference data (a product catalogue, a list of countries) that many tests read but none should own.

## The collision problem
The single biggest cause of data-related flakiness is **shared, non-unique data**. Two tests both create an account named "Test User"; run them in parallel and the second hits a "name already taken" error. Run the same test twice and it fails the second time because it left the first run's record behind.

The cure is **uniqueness per test**. Never hardcode an email, username or reference that must be unique — generate it. A timestamp, a random suffix, or a proper UUID all work:

~~~ts
const email = \`user_\${Date.now()}_\${Math.random().toString(36).slice(2, 8)}@example.com\`;
~~~

## Prefer factories over fixtures for owned data
Data a test *creates and mutates* should come from a factory so each test gets its own fresh copy. Data a test only *reads* can be a fixture or seeded. The rule of thumb: if a test writes to it, generate it uniquely; if a test only reads it, sharing is fine.

## Realistic, not random noise
A factory should produce data that is valid and realistic by default — a plausible name, a well-formed email, a sensible age — so a test reads clearly, and only override the fields the test actually cares about. Libraries like \`@faker-js/faker\` help, but a handful of hand-written factories often beats a pile of random values nobody can read.

## Key takeaway
Reach for factories to generate fresh, unique data each test owns, seed the shared reference data tests only read, and never hardcode a value that must be unique — collisions between tests and between runs are the quiet cause of half of all "flaky" data failures.`,
      workedExample: `A small, typed data factory with overridable defaults and guaranteed-unique fields:

~~~ts
// tests/factories/user.ts
export type User = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
};

let counter = 0;

export function makeUser(overrides: Partial<User> = {}): User {
  counter += 1;
  const unique = \`\${Date.now()}_\${counter}\`;
  return {
    name: \`Test User \${unique}\`,
    email: \`user_\${unique}@example.com\`,
    password: 'Str0ng-Passw0rd!',
    role: 'user',
    ...overrides,
  };
}
~~~

Each call returns a fresh, valid user; the \`counter\` plus a timestamp keeps the email unique even for two calls in the same millisecond. Tests override only what matters:

~~~ts
// tests/register.spec.ts
import { test, expect } from '@playwright/test';
import { makeUser } from './factories/user';

test('a new user can register', async ({ page }) => {
  const user = makeUser(); // unique email every run — no collisions

  await page.goto('/register');
  await page.getByLabel('Name').fill(user.name);
  await page.getByLabel('Email').fill(user.email);
  await page.getByLabel('Password').fill(user.password);
  await page.getByRole('button', { name: 'Create account' }).click();

  await expect(page.getByRole('heading', { name: \`Welcome, \${user.name}\` })).toBeVisible();
});

test('an admin sees the admin badge', async ({ page }) => {
  const admin = makeUser({ role: 'admin' }); // same factory, one field overridden
  // ...register admin and assert the admin-only badge appears
  expect(admin.role).toBe('admin');
});
~~~

The register test can run in parallel with itself a hundred times and never collide, because every user's email is unique. The second test reuses the same factory and changes only the role — the intent is obvious at a glance.`,
      commonMistakes: `- Hardcoding a unique field like an email, so the test fails the second time it runs
- Sharing one mutable fixture across tests, so one test's changes break another
- Generating so much random data that a failing test is unreadable — override only what the test cares about
- Seeding data a test then mutates, coupling that test to global state it does not own`,
      realWorldTip: `On a delivery team, put your factories in one place and treat them as shared, reviewed code — they are as important as the tests themselves. A well-designed factory with good defaults means a new test needs one line to get a valid user, and a change to the user model (a new required field, say) is fixed in one factory rather than across two hundred specs. When onboarding gets easier and model changes stop rippling through the suite, you know the factory layer is earning its place.`,
      exercise: `Write a typed data factory for a domain entity in your application (a user, an order, a product) with realistic defaults, a \`Partial\` overrides argument, and at least one guaranteed-unique field. Use it in two tests — one with defaults, one overriding a field — and prove the unique field never collides by running the suite twice. Deliverable: the factory module and both specs.`,
      reflectionQuestion: `A test passes the first time you run it and fails every time after. Before looking at the application, what is the most likely cause in the test's data, and how would a factory have prevented it?`,
      knowledgeCheck: `What is the main advantage of a data factory over a static fixture for data a test creates? (Answer: it produces fresh, unique data per test, avoiding collisions between tests and runs)`,
      completionChecklist: [
        'I can distinguish fixtures, factories and seeded data and pick the right one',
        'I generate unique data per test for anything that must not collide',
        'I can build a factory with realistic defaults and per-test overrides',
      ],
      enhancements: {
        badGood: {
          label: 'test data uniqueness',
          bad: `~~~ts
test('user can register', async ({ page }) => {
  // Hardcoded email — passes once, then fails with "email already in use".
  await page.getByLabel('Email').fill('test.user@example.com');
  // ...
});
~~~`,
          good: `~~~ts
import { makeUser } from './factories/user';

test('user can register', async ({ page }) => {
  const user = makeUser(); // unique email every run
  await page.getByLabel('Email').fill(user.email);
  // ...
});
~~~`,
        },
        visualAid: {
          type: 'comparison',
          title: 'Choosing a data source',
          headers: ['Source', 'Good for', 'Watch out for'],
          rows: [
            ['Fixture (static)', 'Small, read-only values', 'Breaks if a test mutates or deletes it'],
            ['Factory (generated)', 'Data a test creates and owns', 'Keep defaults realistic and readable'],
            ['Seeded data', 'Shared reference data many tests read', 'No test should own or mutate it'],
          ],
        },
        davidTip: `Make a factory generate valid data by default and force the test to opt into invalid data explicitly. A test called "rejects a malformed email" reads far better as \`makeUser({ email: 'not-an-email' })\` than as a wall of hardcoded fields where the one that matters is buried.`,
        miniChallenge: `Refactor an existing test that hardcodes a unique value to use a factory instead. Run the whole suite twice in a row and confirm the test now passes both times.`,
      },
    },
    {
      lessonNumber: 5,
      title: 'Setting Up & Cleaning Up State',
      estimatedTime: '18 minute read',
      lessonOverview: `A test that leaves data behind, or leans on data another test created, is a time bomb. This lesson is about tests owning their own state end to end: creating what they need, cleaning up after themselves, staying idempotent, and never depending on run order.`,
      learningObjectives: [
        'Have each test create the state it needs rather than assuming it exists',
        'Clean up created data reliably so tests are idempotent and repeatable',
        'Explain why order-dependent tests are fragile and how to remove the dependency',
      ],
      lessonNotes: `## A test owns its state
The healthiest rule in the suite: a test creates the state it needs, uses it, and removes it — and could run alone, twice in a row, or in parallel with everything else, and still pass. When every test owns its state, the order tests run in stops mattering, and "it only fails when run after test X" disappears as a category of bug.

## Set up through the fast path
Create preconditions the cheapest reliable way — usually the API, not the UI. If a test needs an existing order to test cancellation, create that order with a request-context call in setup, not by clicking through the whole order flow. The UI order flow deserves its own test; this test is about cancellation and should get to the point.

## Clean up, and clean up reliably
Data a test creates should be removed when it finishes, so the environment does not silently fill with orphaned records that eventually cause collisions or slow things down. Two reliable patterns:

- A worker-scoped or test-scoped **fixture** that yields the created entity and deletes it after the test body, so teardown runs even when the test fails.
- An \`afterEach\` that removes what the test registered — acceptable, but a fixture keeps setup and teardown together and harder to forget.

The important property is that teardown runs *even on failure*. A cleanup that only happens when the test passes will leak exactly when things are going wrong.

## Idempotency and independence
An **idempotent** test yields the same result however many times it runs. Achieve it by generating unique data (previous lesson) and cleaning up (this one). The two together make a test safe to run repeatedly and in parallel. The anti-pattern to hunt down: a test that passes in the full suite but fails when run alone — a dead giveaway that it depends on state some other test happened to create.

## Do not over-clean shared reference data
Owning your state does not mean deleting the seeded catalogue every test reads. Clean up what your test *created*; leave shared, read-only reference data alone. The distinction from the data-strategy lesson holds: you own what you write, you share what you only read.

## Key takeaway
Make every test create its own preconditions and tear them down even on failure; unique data plus reliable cleanup gives you idempotent, order-independent tests — and kills the "only fails after that other test" class of flake for good.`,
      workedExample: `A fixture that creates an entity via the API before the test and deletes it afterwards, even if the test fails:

~~~ts
// tests/fixtures/order.ts
import { test as base, expect } from '@playwright/test';
import { makeUser } from '../factories/user';

type Fixtures = { order: { id: string; reference: string } };

export const test = base.extend<Fixtures>({
  order: async ({ request }, use) => {
    // Setup: create the precondition via the API (the fast, reliable path).
    const response = await request.post('/api/orders', {
      data: { reference: \`ord_\${Date.now()}\`, customer: makeUser().email },
    });
    expect(response.ok()).toBeTruthy();
    const order = await response.json();

    // Hand the created order to the test.
    await use(order);

    // Teardown: runs after the test body whether it passed or failed.
    await request.delete(\`/api/orders/\${order.id}\`);
  },
});

export { expect };
~~~

A test that uses it never sets up or cleans up by hand — the fixture owns both ends:

~~~ts
// tests/cancel-order.spec.ts
import { test, expect } from './fixtures/order';

test('a customer can cancel an open order', async ({ page, order }) => {
  await page.goto(\`/orders/\${order.id}\`);
  await page.getByRole('button', { name: 'Cancel order' }).click();

  await expect(page.getByText('Order cancelled')).toBeVisible();
  // No manual cleanup: the fixture deletes the order after the test, even on failure.
});
~~~

The test creates its order through the fast API path, exercises exactly the behaviour it cares about — cancellation — and leaves nothing behind. Run it alone, twice, or alongside a hundred others, and it behaves identically every time.`,
      commonMistakes: `- Cleaning up only at the end of the test body, so teardown is skipped when the test fails and leaks data
- Building preconditions through the slow UI flow when an API call would set them up in one step
- Writing a test that passes in the suite but fails alone, because it depends on another test's leftovers
- Deleting shared reference data the whole suite relies on, breaking every other test`,
      realWorldTip: `On a delivery team, prove independence in CI by running the suite with \`--shuffle\` (randomised order) or by running a single suspect test in isolation. A suite that only passes in one particular order is not really passing — it has hidden couplings that will surface as a mystery failure the day someone adds, removes or reorders a test. Making order-independence a standing check turns a whole class of intermittent CI failures into something you catch deliberately, on your terms.`,
      exercise: `Convert a test that currently assumes some data already exists into one that owns its state: create the precondition via the API in a fixture, yield it to the test, and delete it in teardown so cleanup runs even on failure. Prove independence by running the test alone and twice in a row. Deliverable: the fixture, the updated spec, and the commands you used to prove independence.`,
      reflectionQuestion: `A test passes as part of the full suite but fails when you run it on its own. What does that tell you about how it gets its data, and what is the fix?`,
      knowledgeCheck: `Why should teardown live in a fixture rather than at the end of the test body? (Answer: a fixture's teardown runs even when the test fails, so created data is still cleaned up)`,
      completionChecklist: [
        'I can make a test create the state it needs instead of assuming it exists',
        'I clean up created data reliably, even when the test fails',
        'I can spot and remove a hidden dependency on test run order',
      ],
      enhancements: {
        industryStory: `A suite was reliably green until someone reordered a couple of test files and a dozen tests started failing. The reordered tests had been quietly depending on records an earlier test created and never cleaned up — the suite only ever passed in one accidental order. Rewriting them to create and tear down their own data through fixtures, and then running with \`--shuffle\` in CI, made the order irrelevant and the failures vanished. The team kept the shuffle on permanently as a guard.`,
        badGood: {
          label: 'cleanup that survives failure',
          bad: `~~~ts
test('cancel order', async ({ page, request }) => {
  const order = await createOrder(request);
  await page.goto(\`/orders/\${order.id}\`);
  await page.getByRole('button', { name: 'Cancel order' }).click();
  await expect(page.getByText('Order cancelled')).toBeVisible();
  // If any line above throws, this cleanup never runs — the order leaks.
  await request.delete(\`/api/orders/\${order.id}\`);
});
~~~`,
          good: `~~~ts
// Teardown lives in the fixture, after use(), so it runs even when the body throws.
export const test = base.extend({
  order: async ({ request }, use) => {
    const order = await createOrder(request);
    await use(order);
    await request.delete(\`/api/orders/\${order.id}\`); // always runs
  },
});
~~~`,
        },
        davidTip: `Run any test you are unsure about twice in a row on its own. If the second run fails, the test is leaving state behind or depending on state it did not create — fix that before you trust it in the suite. It is a ten-second check that catches the most common source of "works in CI, fails locally" arguments.`,
        miniChallenge: `Add \`--shuffle\` to one CI run of your suite and see whether anything fails. Any test that only passes in a fixed order has a hidden dependency worth removing.`,
      },
    },
    {
      lessonNumber: 6,
      title: 'Secrets & Environments',
      estimatedTime: '18 minute read',
      lessonOverview: `The test data you have been reading from the environment has to come from somewhere safe. This lesson covers keeping credentials out of the repository, loading them from \`.env\` locally and CI secrets in the pipeline, and configuring the suite per environment without editing a line of test code.`,
      learningObjectives: [
        'Keep credentials out of the repository using .env locally and CI secrets in the pipeline',
        'Read configuration and secrets from environment variables in the config',
        'Switch cleanly between environments (local, staging) without changing test code',
      ],
      lessonNotes: `## Credentials never live in the repo
The unbreakable rule: no password, API key, token or secret is ever committed to version control. Once a secret is in git history it is compromised — history is forever, repositories get cloned and forked, and a leaked test credential can be as damaging as a production one. Everything the earlier lessons read from \`process.env\` exists precisely so that the secret lives outside the code.

## Locally: a .env file, git-ignored
For local runs, put non-production credentials and config in a \`.env\` file and load it before tests run:

- Add \`.env\` to \`.gitignore\` — this file is never committed.
- Commit a \`.env.example\` with the *keys* and dummy values, so a new engineer knows what to fill in without ever seeing a real secret.
- Load it in the config with \`dotenv\` so \`process.env.USER_PASSWORD\` is populated.

## In CI: the pipeline's secret store
CI systems have their own encrypted secret storage — GitHub Actions secrets, GitLab CI variables, and so on. You store the credential there once, and the pipeline injects it as an environment variable at run time. The test code does not change at all: it still reads \`process.env.USER_PASSWORD\`, whether that value came from a local \`.env\` or from the CI secret store.

## Per-environment configuration
The same suite often needs to run against several environments — a local app, a shared staging deployment. Drive the differences from environment variables, not from edits to the tests:

- \`baseURL\` from \`process.env.BASE_URL\` so the same tests hit localhost or staging.
- Environment-specific accounts from environment-specific variables.

Selecting an environment then becomes a matter of which variables are set — an \`.env.staging\` file, or a CI job's configured secrets — never a code change.

## Never point destructive tests at production
Tests that create and delete data must run against a dedicated test or staging environment, never production. Guarding the \`baseURL\` and using clearly non-production credentials keeps a data-owning suite from ever cleaning up real customer records.

## Key takeaway
Keep every secret out of git — a git-ignored \`.env\` locally, the pipeline's secret store in CI — read them and the \`baseURL\` from environment variables, and you can point one unchanged suite at any environment while never committing a credential.`,
      workedExample: `Loading local secrets from \`.env\` and driving everything from environment variables in the config:

~~~ts
// playwright.config.ts (excerpt)
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

// Locally this populates process.env from .env; in CI the variables are already
// injected by the pipeline's secret store, so a missing file is fine.
dotenv.config();

export default defineConfig({
  use: {
    // Same tests, any environment — the URL comes from the environment.
    baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
  },
});
~~~

The setup code reads only from the environment — it never contains a literal secret:

~~~ts
// tests/auth.setup.ts
import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ request }) => {
  const email = process.env.USER_EMAIL;
  const password = process.env.USER_PASSWORD;
  if (!email || !password) {
    throw new Error('USER_EMAIL and USER_PASSWORD must be set — see .env.example');
  }

  const response = await request.post('/api/login', { data: { email, password } });
  expect(response.ok()).toBeTruthy();
  await request.storageState({ path: 'playwright/.auth/user.json' });
});
~~~

The repository holds a \`.env.example\` documenting the keys, and \`.gitignore\` excludes the real files:

~~~text
# .env.example  (committed — keys only, no real values)
BASE_URL=http://localhost:3000
USER_EMAIL=you@example.com
USER_PASSWORD=change-me
~~~

~~~text
# .gitignore
.env
.env.*
!.env.example
playwright/.auth
~~~

In CI, \`USER_EMAIL\`, \`USER_PASSWORD\` and \`BASE_URL\` come from the pipeline's secret store and are injected as environment variables — the exact same test code runs, reading the exact same \`process.env\` names, with nothing secret ever committed.`,
      commonMistakes: `- Committing a \`.env\` with real credentials, or hardcoding a token in a spec "just for now"
- Forgetting \`.env\` in \`.gitignore\`, so the first commit quietly leaks every secret
- Storing CI secrets in plain pipeline config or logs instead of the encrypted secret store
- Pointing a data-creating, data-deleting suite at production because the \`baseURL\` was left unset`,
      realWorldTip: `On a delivery team, add a secret-scanning check to the pipeline and pre-commit hooks so a committed credential is caught before it ever reaches the shared repository. And treat any secret that does slip into git history as compromised: rotate it, do not just delete the file. Removing the file leaves the value sitting in every clone and in the history — the only safe response to a leaked credential is to change it. Building that reflex into the team turns a potential incident into a routine rotation.`,
      exercise: `Move every hardcoded credential and URL in a small suite into environment variables. Add a \`.env\` (git-ignored) for local values, commit a \`.env.example\` documenting the keys, load \`.env\` via \`dotenv\` in the config, and drive \`baseURL\` from \`process.env.BASE_URL\`. Prove the same suite runs against two environments by changing only the variables. Deliverable: the config excerpt, the \`.env.example\`, the \`.gitignore\` entries, and a note of how you switched environments.`,
      reflectionQuestion: `A real password was committed to the repository last week and the file has since been deleted. Is the credential safe now, and if not, what is the only thing that actually resolves it?`,
      knowledgeCheck: `Where should test credentials come from in a CI pipeline? (Answer: the CI system's encrypted secret store, injected as environment variables at run time — never committed to the repo)`,
      completionChecklist: [
        'I keep credentials out of the repository using .env locally and CI secrets in the pipeline',
        'I read configuration and secrets from environment variables in the config',
        'I can point one unchanged suite at different environments via variables alone',
      ],
      enhancements: {
        industryStory: `A team committed a test account's password to a config file to "get CI green quickly", meaning to remove it later. The repository was mirrored to a fork before anyone did, and the credential had to be rotated across several systems once it was noticed. The fix that stuck was not just deleting the line — it was moving all secrets to the CI secret store and \`.env\`, adding secret scanning to the pipeline, and treating any historic leak as a rotation, not a deletion.`,
        visualAid: {
          type: 'flow',
          title: 'Where a secret lives at each stage',
          steps: [
            { label: 'Author writes code', detail: 'Reads process.env only — never a literal secret in the source' },
            { label: 'Local run', detail: 'Values come from a git-ignored .env, loaded with dotenv' },
            { label: 'Committed to git', detail: 'Only .env.example (keys, dummy values) is ever committed' },
            { label: 'CI run', detail: 'The pipeline injects the same variable names from its encrypted secret store' },
          ],
        },
        davidTip: `Commit a \`.env.example\` from day one. It documents exactly which variables the suite needs without exposing a single real value, and it turns "the tests fail on a fresh clone with a cryptic error" into "copy \`.env.example\` to \`.env\` and fill in the blanks" — the difference between an hour of onboarding friction and five minutes.`,
        miniChallenge: `Add a guard to your config that throws a clear error if a required secret is missing, naming the variable and pointing at \`.env.example\`. A precise "USER_PASSWORD is not set" beats a confusing login failure three steps later.`,
      },
    },
  ],
};
