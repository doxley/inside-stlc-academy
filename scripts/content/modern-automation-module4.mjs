// Modern Test Automation Bootcamp — Module 4: Playwright Foundations.
// Code-heavy module establishing the Playwright + TypeScript toolkit the rest
// of the course builds on. All code targets modern @playwright/test.
export default {
  courseSlug: 'modern-test-automation-bootcamp',
  moduleNumber: 4,
  lessonsPrefix: 'modern-automation',
  enhPrefix: 'modern-automation',
  enhSep: '-',
  lessons: [
    {
      lessonNumber: 1,
      title: 'Installing & Configuring Playwright',
      estimatedTime: '15 minute read',
      lessonOverview: `Before a single assertion, you need a working project. This lesson takes you from an empty folder to a green test, and shows you what every generated file is for so nothing feels like magic.`,
      learningObjectives: [
        'Scaffold a Playwright + TypeScript project with npm init playwright',
        'Explain the purpose of each file the scaffold produces',
        'Run the example test headed and headless and read the result',
      ],
      lessonNotes: `## Scaffolding a project
Playwright ships its own test runner, \`@playwright/test\`. You do not bolt it onto Jest or Mocha — it is the whole toolkit. The official way in is:

~~~bash
npm init playwright@latest
~~~

Answer the prompts: choose **TypeScript**, accept \`tests\` as the test folder, add a GitHub Actions workflow if you want CI later, and let it install browsers. The last step matters — Playwright drives real Chromium, Firefox and WebKit binaries, and it downloads them for you.

## What you get
The scaffold produces a small, deliberate structure:

- \`playwright.config.ts\` — the single source of truth for how tests run (covered in Lesson 7).
- \`tests/example.spec.ts\` — a working example test so you can prove the install.
- \`tests-examples/\` — a larger demo suite you can delete once you are oriented.
- \`package.json\` — now lists \`@playwright/test\` as a dev dependency.

## Running the example
From the project root:

~~~bash
npx playwright test
~~~

This runs **headless** (no visible browser) across the configured projects. To watch it drive a real browser, add \`--headed\`. To see a rich report afterwards:

~~~bash
npx playwright show-report
~~~

## A note on discipline
A passing example test proves the plumbing works. It does not prove *your* application is tested. Treat the scaffold as scaffolding — the real work starts when you replace the example with a test that asserts something your team actually cares about.

## Key takeaway
\`npm init playwright@latest\` gives you a runner, browsers and a working example in one step; your job is to understand each generated file, not to accept it on faith.`,
      workedExample: `A minimal replacement for the generated example. Point it at a real app under test and assert a user-facing outcome:

~~~ts
import { test, expect } from '@playwright/test';

test('the home page shows the product name', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
  await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
});
~~~

Two things to notice. First, \`test\` and \`expect\` both come from \`@playwright/test\`, not from any other library. Second, the assertions describe what a user would see — a title and a visible link — rather than internal HTML. Run it with \`npx playwright test\`, then \`npx playwright test --headed\` to watch it drive Chromium.`,
      commonMistakes: `- Installing \`playwright\` (the library) instead of \`@playwright/test\` (the runner) and then wondering where \`test()\` went
- Skipping the browser download step, so runs fail with a "browser not found" error
- Keeping the giant \`tests-examples/\` folder in the repo and confusing teammates about which tests are real
- Treating the green example as evidence the application is tested`,
      realWorldTip: `On a delivery team, commit \`playwright.config.ts\` and the \`tests\` folder but add the browser cache and \`playwright-report/\` to \`.gitignore\`. Pin the \`@playwright/test\` version in \`package.json\` so every engineer and the CI runner drive the same browser builds — version drift between laptops and CI is a classic source of "works on my machine" flakiness.`,
      exercise: `Scaffold a fresh Playwright + TypeScript project with \`npm init playwright@latest\`. Delete \`tests-examples/\`, replace \`tests/example.spec.ts\` with a single test that navigates to any public site and asserts one visible element, and run it both headless and headed. Deliverable: the passing spec file plus a one-line note of the command you used to run it headed.`,
      reflectionQuestion: `The example test passed on first run. What has that actually proved, and what has it not proved about your application?`,
      knowledgeCheck: `Which npm package provides Playwright's test() and expect() functions? (Answer: @playwright/test)`,
      completionChecklist: [
        'I can scaffold a Playwright + TypeScript project from scratch',
        'I can explain what each generated file is for',
        'I can run a test headed and headless and open the report',
      ],
      enhancements: {
        industryStory: `A team adopted Playwright, saw the example test go green in CI, and told stakeholders automation was "in place". Weeks later a release broke checkout, yet the pipeline stayed green — the only test running was still the scaffolded example against an unrelated demo site. The lesson stuck: a passing suite is only meaningful when the tests exercise your own application.`,
        davidTip: `Before you write any tests, spend ten minutes reading \`playwright.config.ts\` and deleting what you do not need. Starting from a config you understand beats inheriting one you copied.`,
        miniChallenge: `Add an npm script \`"test:e2e": "playwright test"\` to \`package.json\` and run your suite through \`npm run test:e2e\` instead of \`npx\`. This is the entry point CI will call.`,
      },
    },
    {
      lessonNumber: 2,
      title: 'The Test Runner',
      estimatedTime: '17 minute read',
      lessonOverview: `Playwright's runner gives you a small, sharp vocabulary: test, expect, describe and hooks. Used well they keep tests independent and readable; used carelessly they leak state between tests. This lesson establishes the good habits early.`,
      learningObjectives: [
        'Structure tests with test() and group them with test.describe',
        'Use beforeEach and afterEach hooks appropriately',
        'Explain why each Playwright test runs in an isolated browser context',
      ],
      lessonNotes: `## The building blocks
A test is a named function that receives fixtures:

- \`test('name', async ({ page }) => { ... })\` declares one test. The \`{ page }\` argument is a **fixture** — a fresh page handed to you by the runner.
- \`test.describe('group', () => { ... })\` groups related tests for reporting and shared hooks.
- \`expect(...)\` makes assertions (Lesson 5 covers the web-first variety in depth).

## Hooks
Hooks run setup and teardown around your tests:

- \`test.beforeEach(async ({ page }) => { ... })\` runs before every test in scope — ideal for navigating to a starting page or logging in.
- \`test.afterEach\` runs after each test — useful for cleanup, though Playwright's isolation means you rarely need it.
- \`beforeAll\`/\`afterAll\` run once for the whole group. Use them sparingly; shared mutable state is where flakiness breeds.

## Isolation is the headline feature
Every test gets its own **browser context** — effectively a fresh, private browser window with no shared cookies, storage or cache. Tests cannot pollute one another, and you can run them in parallel safely. This is why you should never write "test B depends on test A having run first". Each test must set up its own preconditions and stand alone.

## Green is not enough
The runner reports pass or fail, but it cannot judge whether your assertions are meaningful. A test that navigates a page and asserts nothing about the outcome will pass forever while telling you nothing. Make every test end on an assertion about something a user would notice.

## Key takeaway
The runner's whole design pushes you towards independent tests — lean into it: each test sets up its own state, asserts a real outcome, and never leans on another test.`,
      workedExample: `A describe block with a shared hook and two independent tests:

~~~ts
import { test, expect } from '@playwright/test';

test.describe('Product search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows results for a known product', async ({ page }) => {
    await page.getByRole('searchbox', { name: 'Search' }).fill('keyboard');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByRole('heading', { name: /results for "keyboard"/i })).toBeVisible();
  });

  test('shows a friendly message for no matches', async ({ page }) => {
    await page.getByRole('searchbox', { name: 'Search' }).fill('zzzzzz');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByText('No products found')).toBeVisible();
  });
});
~~~

The \`beforeEach\` removes the duplicated navigation, but each test still fills its own query and asserts its own outcome. Neither test depends on the other — run them in any order, or in parallel, and both stand alone.`,
      commonMistakes: `- Chaining tests so test 2 assumes test 1 left the app in a certain state
- Putting assertions inside \`beforeEach\` where a failure is reported confusingly
- Overusing \`beforeAll\` to "speed things up", then fighting shared-state flakiness
- Writing a test with actions but no final assertion, so it can never fail`,
      realWorldTip: `On a delivery team, agree a convention: one behaviour per test, and every test able to run alone with \`npx playwright test -g "test name"\`. When a reviewer can point at any single test and run it in isolation, your suite is genuinely parallel-safe — and the CI feedback loop stays fast because tests never queue behind each other's state.`,
      exercise: `Write a \`test.describe\` group of two tests for any form-based flow, sharing navigation in a \`beforeEach\`. Prove independence by running each in isolation with \`-g\`. Deliverable: the spec file and the two commands you used to run each test on its own.`,
      reflectionQuestion: `Playwright gives every test its own browser context. What class of bug does that isolation prevent, and what habit does it let you drop?`,
      knowledgeCheck: `What runs before every test within its scope in Playwright? (Answer: a test.beforeEach hook)`,
      completionChecklist: [
        'I can group tests with test.describe and share setup with beforeEach',
        'I can explain why each test runs in an isolated context',
        'I write tests that stand alone and end on a meaningful assertion',
      ],
      enhancements: {
        badGood: {
          label: 'test independence',
          bad: `~~~ts
test('logs in', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('secret');
  await page.getByRole('button', { name: 'Sign in' }).click();
});

test('sees the dashboard', async ({ page }) => {
  // assumes the previous test already logged in — it did not, contexts are isolated
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
~~~`,
          good: `~~~ts
test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('secret');
  await page.getByRole('button', { name: 'Sign in' }).click();
});

test('sees the dashboard after login', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
~~~`,
        },
        davidTip: `If two tests must share expensive setup like authentication, do it through a storage-state fixture, not by chaining tests. Sharing state through a fixture keeps isolation; sharing it through execution order destroys it.`,
        miniChallenge: `Take a test that currently depends on a previous test's state and make it self-sufficient by moving the setup into a \`beforeEach\`. Confirm it passes when run alone.`,
      },
    },
    {
      lessonNumber: 3,
      title: 'Locators — Finding Elements Well',
      estimatedTime: '18 minute read',
      lessonOverview: `How you find elements decides how resilient your tests are. Playwright's locator philosophy is to find elements the way a user or an assistive technology would — by role and accessible name — not by brittle CSS paths. This lesson is the most important habit in the whole module.`,
      learningObjectives: [
        'Choose the right locator from getByRole, getByLabel, getByText and getByTestId',
        'Explain why user-facing locators outlast CSS and XPath selectors',
        'Recognise and fix strict-mode violations from ambiguous locators',
      ],
      lessonNotes: `## What a locator is
A **locator** is a lazy, re-evaluated description of how to find an element — not a snapshot of the element itself. You create it once and Playwright re-resolves it every time you act or assert, which is what makes auto-waiting (Lesson 5) possible.

## The recommended order
Prefer locators that reflect how people actually perceive and operate the page:

1. \`getByRole('button', { name: 'Sign in' })\` — role plus accessible name. This is the first choice for almost everything: buttons, links, headings, checkboxes, text inputs.
2. \`getByLabel('Email')\` — form fields by their associated label.
3. \`getByPlaceholder('Search products')\` — when there is no label.
4. \`getByText('Welcome back')\` — non-interactive content.
5. \`getByTestId('cart-total')\` — an explicit \`data-testid\` escape hatch when nothing user-facing is stable.

CSS and XPath still exist via \`page.locator('...')\`, but they are the last resort. \`.locator('div.MuiBox-root > span:nth-child(3)')\` breaks the moment a designer touches the markup; \`getByRole('button', { name: 'Add to basket' })\` survives a full restyle.

## Why user-facing wins
Role-based locators are coupled to *behaviour and content*, which changes rarely, rather than *structure and styling*, which changes constantly. As a bonus, if \`getByRole\` cannot find your button, that is often a genuine accessibility defect — your locators double as an accessibility smoke test.

## Strict mode
Locators are **strict** by default: if a locator matches more than one element, the action throws instead of silently picking the first. This is a feature. It forces you to write a locator specific enough to be unambiguous — narrow with \`{ name: ... }\`, \`.filter()\`, or by scoping inside a parent locator rather than reaching for \`.first()\`.

## Key takeaway
Locate elements by what the user sees — role, label, text — not by where they sit in the DOM; a locator tied to behaviour survives the refactors that shatter CSS selectors.`,
      workedExample: `Scoping and filtering to resolve ambiguity without \`.first()\`:

~~~ts
import { test, expect } from '@playwright/test';

test('adds the correct item from a list to the basket', async ({ page }) => {
  await page.goto('/products');

  // Two products both have an "Add to basket" button — scope to the row we want.
  const keyboardRow = page.getByRole('listitem').filter({ hasText: 'Mechanical keyboard' });
  await keyboardRow.getByRole('button', { name: 'Add to basket' }).click();

  await expect(page.getByRole('status')).toHaveText('Mechanical keyboard added to basket');
});
~~~

Rather than \`page.getByRole('button', { name: 'Add to basket' }).first()\` — which would silently click whatever happens to be first — we scope to the specific list item with \`.filter({ hasText })\`, then find the button inside it. The intent is explicit and the test will not break if the product order changes.`,
      commonMistakes: `- Reaching for \`page.locator('css=...')\` or XPath by default instead of \`getByRole\`
- Papering over a strict-mode violation with \`.first()\` instead of writing a more specific locator
- Using \`getByText\` for interactive elements that have a proper role
- Sprinkling \`data-testid\` everywhere as a first choice rather than a last resort`,
      realWorldTip: `On a delivery team, make role-based locators a code-review standard: a pull request that introduces a CSS or XPath selector should explain why no user-facing locator worked. Nine times out of ten the honest answer is that the element is missing an accessible name — which is a bug worth raising with the developers, not routing around.`,
      exercise: `Take three existing selectors (yours or a colleague's) that use CSS or XPath and rewrite each as a user-facing locator. Where you cannot, note what accessible name or label the element is missing. Deliverable: a before/after table of the three locators plus your notes on any that resisted.`,
      reflectionQuestion: `A locator using \`getByRole\` fails because the element has no accessible name. Is that a test problem or a product problem, and who should hear about it?`,
      knowledgeCheck: `Which locator should be your first choice for a button or link in Playwright? (Answer: getByRole with an accessible name)`,
      completionChecklist: [
        'I can choose the right getBy* locator for a given element',
        'I can resolve a strict-mode violation by scoping instead of using .first()',
        'I can explain why user-facing locators outlast CSS and XPath',
      ],
      enhancements: {
        industryStory: `A suite leaned heavily on CSS selectors generated from a component library's class names. A routine dependency upgrade reshuffled those class names and hundreds of tests failed overnight — none because of a real defect. Rewriting the worst offenders as \`getByRole\` and \`getByLabel\` locators made the suite survive the next three upgrades untouched.`,
        badGood: {
          label: 'brittle vs resilient locator',
          bad: `~~~ts
await page.locator('div.card > div:nth-child(2) > button.btn-primary').click();
~~~`,
          good: `~~~ts
await page.getByRole('button', { name: 'Add to basket' }).click();
~~~`,
        },
        visualAid: {
          type: 'comparison',
          title: 'Locator strategy at a glance',
          headers: ['Strategy', 'Coupled to', 'Survives a restyle?'],
          rows: [
            ['getByRole / getByLabel', 'Behaviour and accessible name', 'Yes'],
            ['getByText', 'Visible content', 'Usually'],
            ['getByTestId', 'An explicit test hook', 'Yes, if the hook is kept'],
            ['CSS / XPath', 'DOM structure and classes', 'Rarely'],
          ],
        },
        miniChallenge: `Find one \`.first()\` in your suite and replace it with a scoped or filtered locator that is unambiguous on its own. Confirm the test still passes.`,
      },
    },
    {
      lessonNumber: 4,
      title: 'Actions',
      estimatedTime: '15 minute read',
      lessonOverview: `Actions are how a test drives the application: clicking, typing, checking, selecting. In Playwright you act through locators, and every action carries built-in actionability checks so you rarely fight timing. This lesson covers the everyday verbs and the guarantees behind them.`,
      learningObjectives: [
        'Perform the core actions: click, fill, check, selectOption, press and hover',
        'Explain the actionability checks Playwright runs before each action',
        'Choose fill over type for entering text, and know when press is right',
      ],
      lessonNotes: `## Acting through locators
You do not act on the page directly; you act on a locator. \`page.getByLabel('Email').fill('a@b.com')\` finds the field, waits for it to be ready, and types. Because the locator is re-resolved at action time, the element does not have to exist yet when you write the line.

## The everyday verbs
- \`click()\` — clicks an element. Variants: \`dblclick()\`, \`click({ button: 'right' })\`.
- \`fill(value)\` — clears the field and sets its value in one step. This is the right way to enter text almost always.
- \`pressSequentially(text)\` — types character by character, firing each keystroke. Reserve it for inputs with per-key behaviour like autocomplete or input masks.
- \`check()\` / \`uncheck()\` — sets a checkbox or radio to the desired state, and asserts it ended up there.
- \`selectOption('value')\` — selects an option in a native \`<select>\`, by value, label or index.
- \`press('Enter')\` — sends a single key or chord such as \`press('Control+A')\`.
- \`hover()\` — moves the pointer over an element, for menus that open on hover.

## Actionability checks
Before every action, Playwright waits for the element to be **actionable**: attached to the DOM, visible, stable (not animating), enabled, and able to receive events (not covered by an overlay). If any check is unmet it retries until the timeout. This is why you almost never need manual waits — the action itself waits for the right conditions.

## fill versus pressSequentially
\`fill\` is faster and more reliable: it sets the value directly and fires the appropriate events. Only drop to \`pressSequentially\` when the application genuinely reacts to individual keystrokes and \`fill\` misses that behaviour.

## Key takeaway
Actions run through locators and wait for the element to be genuinely usable first; prefer \`fill\` for text and \`check\` for checkboxes, and let the built-in actionability checks replace the manual waits you would write in older tools.`,
      workedExample: `Driving a form with the core actions:

~~~ts
import { test, expect } from '@playwright/test';

test('submits the sign-up form', async ({ page }) => {
  await page.goto('/sign-up');

  await page.getByLabel('Full name').fill('Priya Patel');
  await page.getByLabel('Email').fill('priya@example.com');
  await page.getByLabel('Country').selectOption('GB');
  await page.getByLabel('Subscribe to updates').check();

  await page.getByRole('button', { name: 'Create account' }).click();

  await expect(page.getByRole('heading', { name: 'Welcome, Priya' })).toBeVisible();
});
~~~

Each action targets a user-facing locator. \`fill\` sets the text fields, \`selectOption\` picks a country by its value, \`check\` ticks the box, and \`click\` submits. There is not a single explicit wait in the test — every action waited for its element to be actionable, and the final assertion confirms a real outcome rather than just that the button was clicked.`,
      commonMistakes: `- Using \`pressSequentially\` everywhere when \`fill\` is faster and more reliable
- Adding \`page.waitForTimeout(2000)\` before a click "to be safe" — the action already waits
- Clicking a submit button and asserting nothing about what the submission produced
- Using \`selectOption\` on a custom dropdown that is not a native \`<select>\` (use the option's role instead)`,
      realWorldTip: `On a delivery team, ban fixed sleeps like \`waitForTimeout\` in review. They are the single biggest cause of both flaky tests and slow suites: too short and the test fails intermittently, too long and every run wastes those seconds. Playwright's actionability checks make almost all of them unnecessary — if an action seems to need a sleep, the real fix is usually a better locator or a web-first assertion.`,
      exercise: `Automate a form that uses at least four distinct action types (for example fill, check, selectOption and click). End the test on an assertion about the result of submitting. Deliverable: the spec file, with a comment on any field where you deliberately chose \`pressSequentially\` over \`fill\` and why.`,
      reflectionQuestion: `A colleague adds \`await page.waitForTimeout(3000)\` before every click and the suite gets slower but "more stable". What is actually happening, and what should they do instead?`,
      knowledgeCheck: `Which action clears a text field and sets its value in a single step? (Answer: fill)`,
      completionChecklist: [
        'I can perform click, fill, check, selectOption, press and hover through locators',
        'I can explain the actionability checks that run before each action',
        'I avoid fixed sleeps and let actions wait for readiness',
      ],
      enhancements: {
        davidTip: `When an action mysteriously fails, do not add a sleep — run with \`--debug\` and read which actionability check never passed. "Element is not visible" and "element is covered by another element" point straight at the real problem, usually a modal or a sticky header you forgot about.`,
        badGood: {
          label: 'entering text',
          bad: `~~~ts
await page.getByLabel('Email').click();
await page.waitForTimeout(500);
await page.getByLabel('Email').pressSequentially('user@example.com');
~~~`,
          good: `~~~ts
await page.getByLabel('Email').fill('user@example.com');
~~~`,
        },
        miniChallenge: `Take a test that uses \`pressSequentially\` for a plain text field and switch it to \`fill\`. Time both runs and note the difference.`,
      },
    },
    {
      lessonNumber: 5,
      title: 'Web-First Assertions & Auto-Waiting',
      estimatedTime: '17 minute read',
      lessonOverview: `Web-first assertions are Playwright's answer to the flakiness that plagues older tools. They retry until the condition is met or the timeout expires, which removes almost every explicit wait you would otherwise write. This lesson shows how to assert meaningful outcomes without a single manual sleep.`,
      learningObjectives: [
        'Use web-first assertions like toBeVisible, toHaveText and toHaveValue',
        'Explain how auto-retrying assertions remove the need for manual waits',
        'Distinguish an assertion that retries from one that does not',
      ],
      lessonNotes: `## What "web-first" means
A web-first assertion takes a **locator**, not a value, and retries until it passes or times out:

~~~ts
await expect(page.getByRole('alert')).toHaveText('Saved');
~~~

Playwright re-checks the alert's text repeatedly for up to the assertion timeout. If the message appears after 300ms of network latency, the assertion simply waits and then passes. You did not write a wait — the assertion is the wait.

## The everyday assertions
- \`toBeVisible()\` / \`toBeHidden()\` — element is shown or not.
- \`toHaveText(expected)\` — exact text, or a regex for partial matches; \`toContainText\` for substrings.
- \`toHaveValue(expected)\` — the value of an input.
- \`toBeEnabled()\` / \`toBeDisabled()\` / \`toBeChecked()\` — control state.
- \`toHaveCount(n)\` — how many elements a locator matches.
- \`toHaveURL(expected)\` and \`expect(page).toHaveTitle(expected)\` — page-level checks.

## Retrying versus not
The rule of thumb: if you pass a **locator** to \`expect\`, the assertion retries. If you pass a plain value — \`expect(items.length).toBe(3)\` after reading \`length\` once — it does **not** retry, because you snapshotted the value before asserting. Prefer \`await expect(locator).toHaveCount(3)\` so Playwright re-queries the DOM for you.

## await is not optional
Every web-first assertion returns a promise. Forget the \`await\` and the assertion fires and forgets — the test passes even when the condition is false, because nothing waited for the result. A missing \`await\` is one of the most dangerous bugs you can write in a Playwright test, precisely because it looks green.

## Green still is not enough
Auto-waiting makes tests stable, but stability is not correctness. \`await expect(page.getByRole('button')).toBeVisible()\` proves a button exists — it says nothing about whether clicking it did the right thing. Assert the *outcome*: the confirmation message, the updated total, the new URL.

## Key takeaway
Pass a locator to \`expect\` and always \`await\` it: the assertion retries the DOM for you, replacing manual waits — but only a meaningful assertion, on the outcome a user cares about, makes the green trustworthy.`,
      workedExample: `Asserting an outcome that appears asynchronously, with no manual wait:

~~~ts
import { test, expect } from '@playwright/test';

test('saving a note shows a confirmation and updates the list', async ({ page }) => {
  await page.goto('/notes');

  await page.getByLabel('New note').fill('Buy milk');
  await page.getByRole('button', { name: 'Save' }).click();

  // The save is async — the assertion retries until the alert appears.
  await expect(page.getByRole('alert')).toHaveText('Note saved');

  // Re-queries the list; retries until the count reflects the new note.
  await expect(page.getByRole('listitem')).toHaveCount(1);
  await expect(page.getByRole('listitem').first()).toContainText('Buy milk');
});
~~~

There is no \`waitForTimeout\` and no manual polling. Each assertion waits exactly as long as it needs to and no longer. Crucially, the test asserts what the save *produced* — a confirmation, a new list item, the right text — not merely that the Save button could be clicked.`,
      commonMistakes: `- Forgetting \`await\`, so the assertion never actually blocks and failures pass silently
- Reading a value first (\`const n = await locator.count()\`) then asserting on it, losing the retry
- Using a manual \`waitForSelector\` before an assertion that would have waited anyway
- Asserting only that an element is visible when the real question is what it says or does`,
      realWorldTip: `On a delivery team, add the \`@typescript-eslint/no-floating-promises\` rule to your lint config. It flags any web-first assertion missing its \`await\` — the one mistake that turns a whole test suite into a green light that means nothing. Catching it in lint is far cheaper than discovering it after a real bug ships past the pipeline.`,
      exercise: `Write a test for an action whose result appears asynchronously (a save, a search, a login). Assert the outcome with at least two web-first assertions and no explicit waits. Then deliberately remove one \`await\` and observe that the test still "passes" — restore it and note what you saw. Deliverable: the spec plus a sentence describing the missing-await behaviour.`,
      reflectionQuestion: `Two tests are both green. One asserts a button is visible; the other asserts the confirmation message the button produces. Why is only one of them protecting the team?`,
      knowledgeCheck: `What must you always put in front of a web-first assertion for it to actually block the test? (Answer: await)`,
      completionChecklist: [
        'I can assert outcomes with web-first assertions instead of manual waits',
        'I can tell a retrying assertion from a non-retrying one',
        'I always await my assertions and I assert meaningful outcomes',
      ],
      enhancements: {
        industryStory: `A suite of a few hundred tests was reliably green until someone noticed a bug had shipped that the tests should have caught. The cause was a family of assertions missing their \`await\` — copied and pasted across dozens of specs. They had never once failed, because a fire-and-forget assertion cannot fail. A lint rule for floating promises was added the same day and immediately lit up the offending lines.`,
        davidTip: `Treat a test with no assertion, or only a "toBeVisible" on a container, as unfinished. The question to ask in review is always: "if the feature silently broke, would this test go red?" If the answer is no, the test is decoration.`,
        visualAid: {
          type: 'flow',
          title: 'How a web-first assertion resolves',
          steps: [
            'Query the locator against the current DOM',
            'Check the expectation (text, visibility, count...)',
            'If met, pass immediately',
            'If not met and time remains, wait a beat and re-query',
            'If the timeout expires, fail with the last observed state',
          ],
        },
        miniChallenge: `Find a test that uses \`waitForSelector\` or \`waitForTimeout\` before checking something. Delete the wait and let a web-first assertion do the waiting instead. Confirm it still passes.`,
      },
    },
    {
      lessonNumber: 6,
      title: 'Running & Debugging Tests',
      estimatedTime: '16 minute read',
      lessonOverview: `A test that fails and leaves you guessing is nearly useless. Playwright's tooling — UI mode, the trace viewer and the inspector — turns a red run into a clear story of what happened. This lesson is about reading failures fast and fixing the real cause.`,
      learningObjectives: [
        'Run tests headed, headless and in UI mode, and know when to use each',
        'Open and read a trace to diagnose a failure after the fact',
        'Use --debug and the inspector to step through a test live',
      ],
      lessonNotes: `## Ways to run
- \`npx playwright test\` — headless, the default, fastest, what CI uses.
- \`npx playwright test --headed\` — shows the browser so you can watch the run.
- \`npx playwright test --ui\` — **UI mode**, an interactive time-travel runner. Pick tests, watch each step, hover the timeline to see the page at that moment, and re-run on file changes. This is the single most useful command for developing tests.
- \`npx playwright test --debug\` — opens the **Playwright Inspector**, pausing before each step so you can step through live and try locators in the console.
- \`npx playwright test -g "partial name"\` — run only tests whose title matches.

## The trace viewer
A **trace** is a recorded, replayable capture of a run: a DOM snapshot at every step, the action log, network requests, console output and screenshots. Configure it in \`playwright.config.ts\`, typically:

~~~ts
use: { trace: 'on-first-retry' },
~~~

which records a trace only when a test fails and is retried — cheap in CI, invaluable when it matters. Open one with:

~~~bash
npx playwright show-trace trace.zip
~~~

You can then scrub through the run, see exactly which locator was targeted, and view the page's DOM at the moment of failure. Most "why did this fail in CI but not locally" questions are answered in under a minute here.

## Reading a failure
Playwright's failure messages are specific: they name the locator, the expected and actual state, and how long it waited. Read the message before touching the code. "Timed out waiting for locator to be visible" plus a trace usually points at an overlay, a wrong locator, or a genuine bug — not at Playwright.

## Key takeaway
Reach for UI mode while writing tests and the trace viewer when CI goes red; both let you time-travel to the exact failing step, so you fix the real cause instead of guessing or padding the test with sleeps.`,
      workedExample: `Enabling traces and retries so CI failures are debuggable, then reading one:

~~~ts
// playwright.config.ts (excerpt)
import { defineConfig } from '@playwright/test';

export default defineConfig({
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
});
~~~

With this in place, a test that fails in CI is retried and a trace is captured on that retry. Download the \`trace.zip\` the report links to and open it:

~~~bash
npx playwright show-trace trace.zip
~~~

Scrub to the failing step. Suppose the trace shows the "Save" click landed, but the confirmation never appeared because a cookie banner was covering the button on the CI viewport. The fix is not a longer timeout — it is dismissing the banner in setup. The trace turned a vague "flaky in CI" into a precise, fixable cause.`,
      commonMistakes: `- Debugging by adding \`console.log\` and re-running blindly instead of opening the trace
- Responding to a timeout by raising the timeout rather than reading why it timed out
- Never enabling traces, so CI failures are impossible to diagnose after the fact
- Running everything headed all the time, making local runs needlessly slow`,
      realWorldTip: `On a delivery team, set \`trace: 'on-first-retry'\` and publish the HTML report and traces as CI artefacts. When a test fails in the pipeline, anyone — including a developer who has never opened Playwright — can download the trace, scrub to the failing step, and see the page exactly as it was. That single habit collapses "it fails in CI, works on my machine" from a day of back-and-forth into a five-minute look.`,
      exercise: `Deliberately break one of your tests (wrong expected text, say). Run it headless to see the failure message, then run it in \`--ui\` mode and locate the failing step on the timeline. Finally, enable \`trace: 'on-first-retry'\`, reproduce, and open the trace. Deliverable: a short note of what the failure message, UI mode and trace each told you.`,
      reflectionQuestion: `A test is "flaky in CI" but always passes locally. Which tool answers why fastest, and why is raising the timeout the wrong first move?`,
      knowledgeCheck: `Which command opens Playwright's interactive time-travel test runner? (Answer: npx playwright test --ui)`,
      completionChecklist: [
        'I can run tests headed, headless and in UI mode and choose appropriately',
        'I can open a trace and scrub to the failing step',
        'I read a failure message before changing any code',
      ],
      enhancements: {
        industryStory: `A team burned two days blaming Playwright for a test that failed only in CI. When they finally enabled traces and opened one, the DOM snapshot showed a consent banner — present on the CI viewport but dismissed by a browser profile locally — sitting over the button the test clicked. The fix was one line of setup. The real lesson was that the trace should have been the first move, not the last.`,
        davidTip: `Develop new tests in \`--ui\` mode from the start. Watching each step resolve, and seeing the page state at the moment an assertion runs, catches wrong locators and bad assumptions long before the test reaches CI.`,
        badGood: {
          label: 'reacting to a timeout',
          bad: `~~~ts
// "It times out sometimes, so give it longer."
await expect(page.getByRole('alert')).toBeVisible({ timeout: 30000 });
~~~`,
          good: `~~~ts
// Open the trace, find the cookie banner covering the button, dismiss it in setup,
// then keep the default timeout because the real cause is fixed.
await page.getByRole('button', { name: 'Accept cookies' }).click();
await page.getByRole('button', { name: 'Save' }).click();
await expect(page.getByRole('alert')).toBeVisible();
~~~`,
        },
        miniChallenge: `Enable \`trace: 'on-first-retry'\`, force a test to fail, and practise opening the resulting trace with \`npx playwright show-trace\`. Find the exact step where expected and actual diverged.`,
      },
    },
    {
      lessonNumber: 7,
      title: 'playwright.config.ts',
      estimatedTime: '18 minute read',
      lessonOverview: `The config file is the control room for your whole suite: where tests point, which browsers they run on, how long they wait, whether they retry, and what they record. Understanding it is what separates a suite that runs the same everywhere from one that behaves differently on every machine.`,
      learningObjectives: [
        'Configure baseURL, projects, timeouts, retries and the reporter',
        'Use the use{} block to set shared options like trace and headless',
        'Explain why centralised config makes a suite portable and consistent',
      ],
      lessonNotes: `## One source of truth
\`playwright.config.ts\` is loaded for every run. Anything you would otherwise repeat in each test — the base URL, the browser, the timeout — lives here once. Change it in one place and the whole suite follows.

## The options that matter most
- \`baseURL\` — set it and \`page.goto('/login')\` resolves against it. Point at localhost in dev, at a staging URL in CI, without editing a single test.
- \`projects\` — run the same tests across multiple configurations: Chromium, Firefox, WebKit, or a mobile viewport. Each project can override \`use\` options.
- \`timeout\` — per-test timeout; \`expect.timeout\` — per-assertion timeout. Tune them deliberately rather than raising them to mask flakiness.
- \`retries\` — how many times a failed test is retried. Common pattern: \`process.env.CI ? 2 : 0\` — retry in CI to absorb genuine infrastructure blips, never locally where a flake should be felt and fixed.
- \`reporter\` — \`'html'\` for a rich local report, \`'list'\` or \`'dot'\` for terminal output, and multiple reporters for CI (for example \`'github'\` plus \`'html'\`).
- \`use\` — shared context options: \`headless\`, \`trace\`, \`screenshot\`, \`video\`, \`viewport\`, \`locale\`, and so on.
- \`webServer\` — optionally start your app before the tests and shut it down after, so \`npm test\` spins up everything it needs.

## Why config discipline matters
When the config is explicit, every engineer and the CI runner execute tests identically: same base URL, same browsers, same timeouts. When it drifts — one person hardcoding URLs, another bumping a timeout locally — you get results that cannot be compared and "passes for me" arguments. A tidy config is the difference between a suite the team trusts and one they argue about.

## Retries are a trade-off, not a cure
Retries hide intermittent failures so the pipeline stays green, which is useful for real infrastructure noise — but a test that only passes on retry is telling you something. Track which tests retry and treat a persistent retrier as a bug to fix, not a setting to celebrate.

## Key takeaway
Put shared behaviour — \`baseURL\`, \`projects\`, timeouts, retries, reporter and \`use\` options — in \`playwright.config.ts\` so every run matches; a config the whole team understands is what makes the suite portable and its green trustworthy.`,
      workedExample: `A realistic config covering the options a delivery team actually sets:

~~~ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['github'], ['html']] : 'list',
  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 13'] } },
  ],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
~~~

Notice how the environment drives behaviour: \`baseURL\` comes from \`process.env.BASE_URL\` so the same tests run against localhost or staging; retries and reporters differ between local and CI. The three projects run every test across Chromium, Firefox and a mobile viewport with no change to the tests themselves, and \`webServer\` starts the app before the run so a single command brings up everything.`,
      commonMistakes: `- Hardcoding full URLs in every test instead of setting \`baseURL\` once
- Raising \`timeout\` globally to paper over a flaky test rather than fixing its cause
- Enabling retries locally, so genuine flakiness is hidden from the person who could fix it
- Recording video and trace \`'on'\` for every test, ballooning CI storage and runtime`,
      realWorldTip: `On a delivery team, drive the config from environment variables — \`baseURL\`, headless, retries — so the same committed file runs correctly on a developer's laptop, in a review app, and in CI without edits. Review changes to \`playwright.config.ts\` as carefully as production code: a quiet bump to the global timeout or an added blanket retry can mask real regressions for weeks, and everyone inherits the change on their next pull.`,
      exercise: `Configure a \`playwright.config.ts\` with a \`baseURL\`, at least two \`projects\`, \`retries\` that differ between local and CI, and \`trace: 'on-first-retry'\`. Rewrite one test to use a relative path via \`baseURL\`. Deliverable: the config file and the updated test, with a comment explaining your retry choice.`,
      reflectionQuestion: `A teammate proposes raising the global \`timeout\` to 60 seconds because "some tests are slow". What are they actually asking for, and what should the team investigate first?`,
      knowledgeCheck: `Which config option lets tests use relative paths like page.goto('/login')? (Answer: baseURL)`,
      completionChecklist: [
        'I can configure baseURL, projects, timeouts, retries and the reporter',
        'I can set shared options like trace and headless in the use block',
        'I can explain how centralised config keeps a suite portable and consistent',
      ],
      enhancements: {
        industryStory: `A suite passed on every developer's machine but failed unpredictably in CI. The cause was config drift: local runs quietly had retries enabled and a generous timeout, while CI did not. Nobody could reproduce anyone else's results. Consolidating everything into one environment-driven \`playwright.config.ts\`, reviewed like production code, ended the "works for me" standoffs within a sprint.`,
        davidTip: `Make retries visible, not invisible. A test that only ever passes on its second attempt is a defect wearing a green badge — put a retry count in the report and treat any persistent retrier as a bug to investigate, not a setting to leave running.`,
        visualAid: {
          type: 'comparison',
          title: 'Config in one place vs scattered across tests',
          headers: ['Concern', 'Scattered in tests', 'Centralised in config'],
          rows: [
            ['Base URL', 'Hardcoded per test', 'baseURL set once'],
            ['Browsers', 'Whatever ran locally', 'projects run all of them'],
            ['Retries', 'Ad hoc, inconsistent', 'CI-only, explicit'],
            ['Portability', 'Works for me', 'Same run everywhere'],
          ],
        },
        miniChallenge: `Add a second project to your config for a mobile viewport using \`devices['iPhone 13']\` and run your existing suite across both desktop and mobile without changing any test.`,
      },
    },
  ],
};
