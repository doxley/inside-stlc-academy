// Modern Test Automation Bootcamp — practical assignments (12 labs + 3 projects).
// Course: Modern Test Automation Bootcamp
// Consumed by scripts/content/build-assignments.mjs to generate the seed SQL.
// Do not import framework code here. Tutor model answers live in
// docs/MODERN_AUTOMATION_TUTOR_ANSWER_KEY.md.
//
// instructions use the lightweight markdown the app renders:
//   ## Heading, - bullet, blank line = paragraph, `inline code`,
//   and ~~~ fenced code (TILDE fences, never triple backticks).

export default {
  courseSlug: 'modern-test-automation-bootcamp',
  assignments: [
    // ── 1 ──────────────────────────────────────────────────────────────────
    {
      moduleNumber: 1,
      title: 'Lab: Automation Candidate Assessment',
      submissionType: 'file',
      instructions: `## Scenario
You have joined the QA function for "Northwind Books", an online bookshop. The team is drowning in a large manual regression pack and wants to start automating, but nobody has decided *what* is worth automating or at which level. Your test lead has handed you a backlog of features and existing test cases and asked for a reasoned plan before a single test is written.

Below is the candidate list you must assess. Treat it as representative rather than exhaustive.

- Search returns relevant titles for a keyword
- Add-to-basket updates the basket count and subtotal
- Checkout applies UK VAT correctly to the order total
- Payment is captured via the third-party card provider
- Promotional banner renders the correct seasonal artwork
- Password-reset email is delivered and the link works
- Recommendations carousel ("customers also bought") ordering
- Account registration validation (email format, password rules)
- Order-history page lists a customer's past orders
- Cookie-consent banner appears for first-time visitors

## Your task
1. For each candidate, decide whether to automate it or leave it manual, and record the decision.
2. For every item you choose to automate, assign the *cheapest level that still buys the confidence*: unit, API/integration, or UI end-to-end. Justify the level, not just the yes/no.
3. Score each item against three factors — **risk** (what is the cost if it breaks?), **stability** (how often does the behaviour or its interface change?) and **value/frequency** (how often is it exercised, and by how many users?). A simple High/Medium/Low per factor is fine.
4. Explicitly call out at least two items you would *not* automate, and say what you would do instead (exploratory session, visual review, monitoring, a manual smoke check).
5. Summarise the shape of the resulting suite against the test pyramid, and name the single item you would automate first and why.

## Deliverables
- A document (PDF, Markdown or Word) of roughly one to three pages.
- A decision table with one row per candidate: item, automate? (Y/N), level, risk, stability, value, and a one-line justification.
- A short narrative (a few paragraphs) covering: your first automation target, your two-plus deliberate non-automation decisions, and how the plan maps onto the pyramid.

## Assessment rubric
- **Level selection** — good work pushes checks down to the cheapest level that still covers the risk (VAT logic at unit/API, not a slow UI journey) and reserves UI for genuine cross-system journeys.
- **Risk-based reasoning** — good justifications tie back to consequence and likelihood, not to "it's easy to automate" or "it's important" in the abstract.
- **Stability awareness** — good work flags volatile or presentational items (banner artwork, carousel ordering) as poor automation candidates and explains the maintenance cost.
- **Deliberate non-automation** — good work treats "do not automate" as a first-class, defended decision with a stated alternative, not an omission.
- **Suite shape** — good work produces a bottom-heavy distribution and can articulate why, rather than defaulting everything to UI.

## Pass criteria
Every candidate has an explicit decision, a level (where automated) and a risk-based justification; at least two items are deliberately left manual with a stated alternative; the overall shape is defensible against the pyramid. A distinction additionally shows genuine trade-off reasoning (e.g. choosing API over UI for the VAT calculation and explaining the confidence lost and gained).`,
    },

    // ── 2 ──────────────────────────────────────────────────────────────────
    {
      moduleNumber: 2,
      title: 'Lab: TypeScript Refactoring',
      submissionType: 'file',
      instructions: `## Scenario
A colleague has left behind an untyped JavaScript helper and a hand-rolled page object that the team keeps tripping over. Nothing is typed, parameters are positional and ambiguous, and \`any\` leaks everywhere. Your job is to refactor it into clean, strict TypeScript that the compiler can defend, without changing what it does.

Here is the starting point you must refactor:

~~~ts
// login.js — the untyped starting point
export function makeUser(name, opts) {
  return {
    name: name,
    role: opts && opts.role ? opts.role : 'user',
    active: opts && opts.active,
  };
}

export class LoginPage {
  constructor(page) {
    this.page = page;
  }
  async login(user, pw, remember) {
    await this.page.fill('#email', user);
    await this.page.fill('#password', pw);
    if (remember) await this.page.check('#remember');
    await this.page.click('button[type=submit]');
    return this.page.url();
  }
  async errors() {
    return this.page.$$eval('.error', (els) => els.map((e) => e.textContent));
  }
}
~~~

## Your task
1. Convert the module to TypeScript under \`strict\` (\`"strict": true\`, and treat \`noImplicitAny\` as non-negotiable).
2. Define an \`interface\` (or \`type\`) for the user object and its options, with a union type for \`role\` (e.g. \`'admin' | 'user' | 'guest'\`) rather than a bare \`string\`.
3. Give every function and method typed parameters and an explicit return type. Replace positional boolean/params with a typed options object where it improves the call site.
4. Type the Playwright \`page\` correctly (import \`Page\` from \`@playwright/test\`) and remove every \`any\`, implicit or explicit.
5. Tighten the \`errors()\` return (no \`(string | null)[]\` leaking out — decide and enforce the contract).
6. Provide a tiny usage snippet showing the refactored code being called, and confirm it compiles with no errors.

## Deliverables
- The refactored \`.ts\` file(s).
- A \`tsconfig\` (or the relevant excerpt) showing strict mode enabled.
- A short note (a paragraph or two) listing the specific type problems you found and how each was resolved.
- Evidence of a clean type-check (paste of \`tsc --noEmit\` output, or a screenshot).

## Assessment rubric
- **No \`any\`** — good work has zero \`any\`, implicit or explicit, and does not silence the compiler with \`as any\` or \`@ts-ignore\`.
- **Meaningful types** — good work uses unions/literals for constrained values and models optionality honestly (\`?\` and \`undefined\` handled), rather than typing everything as \`string\`/\`boolean\`.
- **Contracts at the boundary** — good work gives every exported function an explicit return type so the public surface is pinned.
- **Behaviour preserved** — good work is a genuine refactor: the runtime behaviour is unchanged, only the types and clarity improve.
- **Ergonomics** — good work improves call sites (named options over mystery booleans) and reads better than the original.

## Pass criteria
Compiles clean under strict mode with no \`any\` and no suppressions; user/role modelled with an interface and a union; all exported functions carry explicit parameter and return types; behaviour is unchanged. A distinction shows thoughtful modelling (e.g. discriminated options, readonly where appropriate) and a clear write-up of the defects found.`,
    },

    // ── 3 ──────────────────────────────────────────────────────────────────
    {
      moduleNumber: 3,
      title: 'Lab: Git & GitHub Workflow',
      submissionType: 'url',
      instructions: `## Scenario
Every automation team you will join runs its work through pull requests. Before you write serious test code, you need the muscle memory: branch, commit in small steps, push, open a PR, and describe the change so a reviewer can trust it. This lab is deliberately small in code and strict on workflow.

## Your task
1. Create a new public GitHub repository (a minimal Playwright + TypeScript project is ideal; even a single trivial test is enough).
2. Commit the baseline to \`main\`, then create a feature branch with a descriptive name (e.g. \`feature/add-title-check\`).
3. On the branch, make a *small* test change across **at least three separate, meaningful commits** — each commit self-contained with a clear message (imperative mood, e.g. "Add homepage title assertion"). Do not squash everything into one "stuff" commit.
4. Push the branch and open a pull request back into \`main\`.
5. Write a proper PR description: what changed, why, and how you verified it (e.g. the test command and that it ran green locally).
6. Leave the PR open (do not merge) so the reviewer can see the diff, the commit history and the description. Submit the PR URL.

## Deliverables
- The pull request URL (this is what you submit).
- A branch with at least three atomic commits and readable messages.
- A PR description covering change, rationale and verification.
- A \`.gitignore\` that excludes \`node_modules\`, test artefacts and any secrets.

## Assessment rubric
- **Atomic history** — good work has small, coherent commits that each do one thing and read as a sensible story, not one dump or noise commits ("wip", "fix", "asdf").
- **Message quality** — good messages use the imperative mood and say *what and why*, not "updated files".
- **Branch and PR hygiene** — good work branches off \`main\`, keeps \`main\` clean, and opens the PR from the branch rather than committing straight to \`main\`.
- **PR description** — good descriptions let a reviewer understand and trust the change without reading every line, and state how it was verified.
- **Repo hygiene** — good work ignores \`node_modules\`/artefacts and commits no secrets or committed \`.env\`.

## Pass criteria
A public repo with a feature branch, at least three atomic well-messaged commits, and an open (unmerged) PR into \`main\` with a description covering change, rationale and verification; no secrets committed. A distinction shows genuinely clean, professional history and a PR description a real reviewer would be glad to receive.`,
    },

    // ── 4 ──────────────────────────────────────────────────────────────────
    {
      moduleNumber: 4,
      title: 'Lab: Your First Customer Journey',
      submissionType: 'url',
      instructions: `## Scenario
A stakeholder cares about one thing: can a customer actually get through the core journey? You will automate a realistic multi-step journey end to end using resilient, user-facing locators and web-first assertions. Use a public practice site you are permitted to automate (for example a demo shop such as the Playwright/Sauce-style demo apps, or an app you own). Do not automate a site you have no permission to hit.

The journey must be genuinely multi-step, for example: **search for a product → open its detail page → add it to the basket → begin checkout and fill the delivery form → assert the order summary**.

## Your task
1. Scaffold a Playwright + TypeScript project (\`npm init playwright@latest\`).
2. Automate the full journey as one coherent test (or a small set of tests) covering at least four distinct steps.
3. Locate elements by role, label, placeholder or text (\`getByRole\`, \`getByLabel\`, \`getByText\`) wherever possible. Avoid brittle CSS/XPath chains; a \`getByTestId\` is acceptable where the app exposes stable test ids.
4. Assert with web-first, auto-retrying assertions (\`await expect(locator).toBeVisible()\`, \`toHaveText\`, \`toHaveURL\`) at each meaningful checkpoint — not just at the very end.
5. Assert something that would actually matter to a customer (the *right* product in the basket, the *correct* subtotal), not merely that a page loaded.
6. Ensure the test is runnable from a clean clone: \`npm ci\` then \`npx playwright test\`.

## Deliverables
- A public GitHub repo link (this is what you submit).
- A \`README\` with the target site, how to install and how to run.
- At least one end-to-end test with four-plus steps and role-based locators.
- Meaningful assertions at intermediate checkpoints, not only at the end.

## Assessment rubric
- **Locator quality** — good work uses user-facing, role/label-based locators and avoids brittle selectors; any \`testId\` use is deliberate.
- **Web-first assertions** — good work uses auto-retrying \`expect(locator)\` assertions and contains no arbitrary \`waitForTimeout\`/\`sleep\`.
- **Meaningful checkpoints** — good work asserts customer-relevant facts (correct item, correct price) at each stage, so a passing run genuinely means the journey worked.
- **Runs from clean clone** — good work runs green after \`npm ci\` with no hidden manual setup.
- **Readability** — good work reads like a journey; steps are clear and the intent is obvious.

## Pass criteria
A public repo whose test automates a four-plus-step journey with role-based locators and web-first assertions, asserts at least one customer-relevant fact mid-journey, and runs green from a clean clone. A distinction shows resilient locators throughout, no hard waits, and assertions that would actually catch a regression a customer would notice.`,
    },

    // ── 5 ──────────────────────────────────────────────────────────────────
    {
      moduleNumber: 5,
      title: 'Lab: Strengthen Weak Tests',
      submissionType: 'file',
      instructions: `## Scenario
You inherit a suite that is entirely green — and almost worthless. The tests pass because they assert nothing meaningful. Your job is to explain *why* each is weak and rewrite it so a real regression would actually turn it red.

Here are the weak tests you must strengthen:

~~~ts
import { test, expect } from '@playwright/test';

// 1
test('checkout works', async ({ page }) => {
  await page.goto('/checkout');
  await expect(page).toBeTruthy();
});

// 2
test('shows results', async ({ page }) => {
  await page.goto('/search?q=camera');
  await page.waitForTimeout(3000);
  const results = page.locator('.result');
  expect(await results.count()).toBeGreaterThanOrEqual(0);
});

// 3
test('total is correct', async ({ page }) => {
  await page.goto('/basket');
  const total = await page.locator('#total').textContent();
  expect(total).toContain('£');
});

// 4
test('login', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('a@b.com');
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  // no assertion
});
~~~

## Your task
1. For each test, write a short diagnosis: what risk was it *supposed* to cover, and why does the current version fail to cover it (tautology, over-broad assertion, timing hack, missing assertion)?
2. Rewrite each test so it asserts something meaningful and would fail if the behaviour regressed.
3. Replace \`waitForTimeout\` with a web-first assertion that waits on the real condition.
4. Make assertions specific: assert the actual expected total, the presence of relevant results for the query, the destination after login, etc. State any assumptions about the app you are testing against.
5. For at least one test, add a negative or boundary case (e.g. wrong password shows an error) to show the behaviour is genuinely pinned.

## Deliverables
- A document pairing each original test with (a) its weakness diagnosis and (b) the rewritten test.
- Rewritten tests that use web-first assertions and contain no \`waitForTimeout\`.
- At least one added negative/boundary case with a note on the risk it covers.

## Assessment rubric
- **Diagnosis accuracy** — good work names the specific failure mode (tautology, \`toBeTruthy\` on a never-null value, \`>= 0\` always true, missing assertion) rather than a vague "it's weak".
- **Meaningful assertions** — good work asserts the actual expected value/state, so a regression turns it red; it does not swap one weak assertion for another.
- **No timing hacks** — good work removes \`waitForTimeout\` in favour of asserting the real condition.
- **Coverage of intent** — good rewrites cover the risk the test was meant to cover, and add a negative/boundary case where it strengthens the pin.
- **Assumptions stated** — good work is explicit about expected values so the assertions are checkable.

## Pass criteria
Every test has a correct weakness diagnosis and a rewrite that would fail on a real regression; all \`waitForTimeout\` calls are gone; at least one negative/boundary case is added. A distinction articulates the risk behind each test and demonstrates (or convincingly argues) that the rewritten assertion catches the specific regression the original missed.`,
    },

    // ── 6 ──────────────────────────────────────────────────────────────────
    {
      moduleNumber: 6,
      title: 'Lab: Flaky Suite Rescue',
      submissionType: 'url',
      instructions: `## Scenario
A team hands you a suite that "passes on my machine" but fails randomly in CI. It is riddled with hard waits, shared mutable state and order-dependence. You are asked to make it reliable and *prove* it, then explain what was wrong. A starter repo of deliberately flaky tests is provided in the module resources; if you cannot access it, reproduce equivalent flakiness in a small repo of your own (hard waits, a shared account mutated across tests, reliance on execution order) and then fix it.

## Your task
1. Run the suite enough times to observe the flakiness and characterise it (which tests, how often, what symptom).
2. Diagnose the root causes. Look specifically for: \`waitForTimeout\`/sleeps, races against not-yet-ready UI, tests that depend on data left behind by other tests, and shared state that leaks between tests.
3. Fix them properly: replace hard waits with web-first assertions/\`expect.poll\`, make each test set up and tear down its own data, remove order-dependence, and isolate state (fresh context/storage per test where needed).
4. Prove reliability: run \`npx playwright test --repeat-each=20\` (and/or a sharded/parallel run) and show it green and stable. Do not "fix" flakiness by adding retries or increasing timeouts as the primary remedy — reserve \`retries\` for genuine external noise and say so.
5. Write a short causes-and-fixes note.

## Deliverables
- A public GitHub repo link (this is what you submit).
- A short write-up (in the README or a separate doc): the causes you found, the fix for each, and how you proved reliability.
- Evidence of a stable repeated run (e.g. \`--repeat-each=20\` output or a CI log), with no hard waits remaining.

## Assessment rubric
- **Correct root cause** — good work identifies the actual causes (timing races, leaked/ordered state) rather than masking symptoms.
- **Proper fixes** — good work replaces hard waits with real conditions and makes each test self-contained and order-independent; retries are not used as the main cure.
- **Proof of reliability** — good work demonstrates stability under \`--repeat-each\`/parallel runs, not a single lucky green.
- **Isolation** — good work shows each test owns its data and state, so tests can run in any order or in parallel.
- **Explanation** — good work explains *why* each change removes the flakiness, showing understanding rather than trial-and-error.

## Pass criteria
The suite runs green and stable under \`--repeat-each=20\` (or equivalent repeated/parallel run) with no \`waitForTimeout\` remaining and no order-dependence; the write-up correctly attributes and fixes each cause. A distinction shows the before/after clearly, uses retries only for justified external noise, and demonstrates the fixes hold under parallel execution.`,
    },

    // ── 7 ──────────────────────────────────────────────────────────────────
    {
      moduleNumber: 7,
      title: 'Project 1: UI Automation',
      submissionType: 'url',
      instructions: `## Scenario
This is your first **portfolio project**. You will build a small but real UI automation suite against a public, customer-facing web application you are permitted to automate (a public demo shop, or an app you own). Treat it as work you would show an interviewer: it must demonstrate you can automate meaningful journeys reliably and maintainably. Do not claim this represents paid or client work — it is a portfolio piece, and should be described as such.

## Your task
1. Choose a realistic web app and identify three to five journeys that carry real user value (e.g. search-and-filter, add-to-basket, checkout form, account area). Note the risks each covers.
2. Automate them in Playwright + TypeScript using role-based locators and web-first assertions.
3. Structure for maintenance: page objects and/or component objects, and fixtures for shared setup. No copy-pasted selectors littered across tests.
4. Handle state properly: each test independent, its own data, no order-dependence; parallel-safe.
5. Make it reliable: no hard waits, stable across repeated runs.
6. Write a \`README\` that states the target app, the journeys covered and the risks they address, how to run, and honest limitations. Make clear it is a portfolio/practice project.

## Deliverables
- A public GitHub repo link (this is what you submit).
- Three to five meaningful journeys automated, with role-based locators and web-first assertions.
- A maintainable structure (page/component objects + fixtures), not selectors scattered through tests.
- A \`README\` covering scope, risks covered, how to run, limitations, and a clear "portfolio project" framing.

## Assessment rubric
- **Journey value** — good work automates journeys that carry real risk and can articulate what each protects, not just what was easy to click.
- **Maintainable structure** — good work isolates locators in page/component objects and shares setup via fixtures, so a UI change is a one-place edit.
- **Reliability** — good work runs green across repeated/parallel runs with no hard waits.
- **State handling** — good work keeps tests independent and parallel-safe, each owning its data.
- **Professional framing** — good work reads like a portfolio piece: clear README, honest limitations, no overclaiming of commercial experience.

## Pass criteria
A public repo automating three-plus meaningful journeys with role-based locators, web-first assertions, a maintainable page-object/fixture structure, independent parallel-safe tests, no hard waits, and a README that scopes the work honestly as a portfolio project. A distinction shows a clean, extensible structure, well-chosen risk-driven journeys, and reliability demonstrated under repeated runs.`,
    },

    // ── 8 ──────────────────────────────────────────────────────────────────
    {
      moduleNumber: 8,
      title: 'Lab: Multi-Role Authentication',
      submissionType: 'url',
      instructions: `## Scenario
Most real apps have roles — an admin sees things a standard user does not. Logging in through the UI in every test is slow and flaky. You will implement fast, reliable authentication for multiple roles using \`storageState\`, add a programmatic (API) login path, and run per-role projects so the right tests run as the right user. Use a demo app with at least two roles, or stub an auth service you control.

## Your task
1. Implement a login **setup** that authenticates each role once and saves its session with \`storageState\` (e.g. \`admin.json\`, \`user.json\`), wired via a \`setup\` project dependency.
2. Add a **programmatic/API login** (obtain the session via an API request and inject cookies/tokens into the context) as an alternative to driving the login form, and note when each approach is preferable.
3. Configure **per-role projects** in \`playwright.config.ts\` so tests declare which role they need and reuse the saved state — no logging in inside individual tests.
4. Write at least one test per role that proves the role boundary: an admin-only action that succeeds as admin and is *denied/absent* for a standard user.
5. Keep credentials out of the repo (environment variables / \`.env\` that is git-ignored). Ensure it runs from a clean clone with documented env setup.

## Deliverables
- A public GitHub repo link (this is what you submit).
- A setup project producing per-role \`storageState\`, plus a programmatic/API login path.
- Per-role projects in the config and at least one test per role, including a role-boundary assertion (admin can, user cannot).
- A \`README\` documenting required env vars and how to run; no committed secrets.

## Assessment rubric
- **State reuse** — good work authenticates once per role and reuses \`storageState\`; tests do not log in through the UI each time.
- **Programmatic login** — good work implements a genuine API/programmatic login and can explain when to prefer it over UI login.
- **Role separation** — good work runs tests under the correct role via projects and proves the boundary (admin-only action denied to a user).
- **Secret hygiene** — good work keeps credentials in env/git-ignored files, with nothing sensitive committed.
- **Reproducibility** — good work runs from a clean clone with documented setup.

## Pass criteria
Per-role \`storageState\` produced by a setup dependency and reused via per-role projects; a working programmatic/API login; at least one test per role including a proven role boundary; no committed secrets; runs from a clean clone. A distinction cleanly separates roles, justifies UI-vs-API login trade-offs, and asserts the negative case (a user is genuinely denied the admin action) rather than only the positive.`,
    },

    // ── 9 ──────────────────────────────────────────────────────────────────
    {
      moduleNumber: 9,
      title: 'Lab: API + UI Hybrid Automation',
      submissionType: 'url',
      instructions: `## Scenario
Driving every precondition through the UI is slow and brittle. Mature suites set up state via the API and verify the *outcome* in the UI. You will write API tests in their own right, then use API calls to arrange (and tear down) the state a UI test needs, so the UI test stays fast and focused on what only the UI can prove. Use an app that exposes an API (a demo REST app you own, or a public practice API paired with its UI).

## Your task
1. Write a small set of **API tests** using Playwright's \`request\` fixture: at least one create/read/update flow with status-code and response-body assertions (schema-shaped assertions, not just \`200\`).
2. Build an **API setup helper** that creates the data a UI test depends on (e.g. seed an order, a product, or a user) and returns identifiers the UI test can use.
3. Write a **UI test** that consumes that seeded state — navigating straight to the relevant page and asserting the UI reflects it — instead of clicking through creation in the browser.
4. **Tear down** the created data afterwards (API delete in an \`afterEach\`/fixture), so the test leaves no residue and can run repeatedly.
5. Explain, briefly, the split: what you deliberately verify via API vs via UI, and why the hybrid is faster and more reliable than a pure-UI setup.

## Deliverables
- A public GitHub repo link (this is what you submit).
- API tests with meaningful body/status assertions.
- A UI test whose preconditions are created via the API and torn down afterwards.
- A short note on the API-vs-UI split and its rationale.

## Assessment rubric
- **Real API assertions** — good work asserts response bodies/shape and correct status codes, not merely that a request did not error.
- **API-driven setup** — good work seeds UI preconditions through the API and navigates directly, rather than re-driving creation in the browser.
- **Clean teardown** — good work removes what it created so the test is repeatable and leaves no residue.
- **Sensible split** — good work verifies at the cheapest useful level and can justify what is checked where.
- **Reliability** — good work runs repeatably from a clean clone with independent state.

## Pass criteria
Standalone API tests with body/status assertions; a UI test whose state is created via the API and torn down afterwards; a clear rationale for the API/UI split; repeatable from a clean clone. A distinction shows genuinely schema-aware API assertions, robust setup/teardown via fixtures, and a convincing account of why the hybrid reduces flakiness and run time.`,
    },

    // ── 10 ─────────────────────────────────────────────────────────────────
    {
      moduleNumber: 10,
      title: 'Lab: Network Mocking',
      submissionType: 'url',
      instructions: `## Scenario
Some states are hard to trigger for real: a 500 from a downstream service, or a genuinely empty result set for a brand-new account. Rather than hoping the backend cooperates, you will intercept and mock the network to force these states deterministically and assert the UI handles them gracefully. Use an app whose front-end calls an API you can intercept.

## Your task
1. Identify the API call(s) the page depends on for its data.
2. Use \`page.route\` to intercept the request and **fulfil** it with a controlled response.
3. Write a test for an **error state**: mock a failing response (e.g. HTTP 500 or a malformed body) and assert the UI shows the correct error affordance (a message, a retry option) rather than a blank page or an unhandled crash.
4. Write a test for an **empty state**: mock a valid-but-empty response (e.g. \`[]\`) and assert the UI shows the intended empty-state messaging, not a broken layout.
5. Keep the real, unmocked happy-path test alongside them, so the mocks demonstrably change behaviour and you are not only ever testing fiction. Note the risk that over-mocking can hide real integration failures, and how you mitigate it.

## Deliverables
- A public GitHub repo link (this is what you submit).
- An intercepted **error-state** test asserting graceful handling.
- An intercepted **empty-state** test asserting correct empty messaging.
- A real happy-path test kept alongside the mocked ones.
- A short note on the over-mocking risk and your mitigation.

## Assessment rubric
- **Correct interception** — good work routes and fulfils the right request with a controlled response, targeting the actual data call.
- **Error handling asserted** — good work forces a failure and asserts the UI degrades gracefully (clear message/retry), not a blank or crashed page.
- **Empty state asserted** — good work forces an empty payload and asserts the intended empty-state UI.
- **Balance** — good work keeps a real happy-path test and acknowledges that mocks can mask integration issues, with a stated mitigation.
- **Determinism** — good work produces reliable, repeatable results independent of backend state.

## Pass criteria
Both an error-state and an empty-state are forced via \`page.route\` interception with assertions that the UI handles each gracefully; a real happy-path test remains; the over-mocking risk is acknowledged with a mitigation. A distinction shows precise, minimal mocking, asserts genuinely user-relevant handling of each state, and reasons clearly about where mocking helps and where it hides risk.`,
    },

    // ── 11 ─────────────────────────────────────────────────────────────────
    {
      moduleNumber: 12,
      title: 'Project 2: Full-Stack Automation with CI',
      submissionType: 'url',
      instructions: `## Scenario
This is your second **portfolio project**. You will bring the pieces together into a suite that looks like something a real team would run: API-driven setup and verification, UI tests, authentication, a deliberate test-data strategy, multiple browser projects, and a GitHub Actions workflow that runs it all and goes green. It is a portfolio/practice project — describe it as such and do not claim it as commercial work.

## Your task
1. Pick a target app that exposes both an API and a UI (a demo app you own or a public practice app + API).
2. Implement a **test-data strategy**: how data is created (API seed), isolated per test/worker, and cleaned up — documented, not accidental.
3. Combine **API setup/verification with UI tests**: use the API to arrange state and to verify outcomes the UI cannot easily show, and the UI for what only it can prove.
4. Add **authentication** with \`storageState\` and per-role reuse where relevant.
5. Configure **multiple browser projects** (e.g. Chromium, Firefox, WebKit) and sensible tagging (\`@smoke\` vs \`@regression\`).
6. Add a **GitHub Actions workflow** that installs, runs the suite (at least on push/PR), uploads the HTML report/traces as artefacts, and passes. Link to a **successful run**.
7. Write a \`README\`: architecture, data strategy, how to run locally and in CI, and honest limitations.

## Deliverables
- A public GitHub repo link **and** a link to a successful CI run (both submitted).
- API + UI tests sharing an API-driven, cleaned-up data strategy.
- Authentication via \`storageState\`; multiple browser projects; smoke/regression tagging.
- A green GitHub Actions workflow that uploads report/trace artefacts.
- A \`README\` covering architecture, data strategy, running locally and in CI, and limitations.

## Assessment rubric
- **Integration** — good work genuinely combines API setup/verification with UI checks, each used where it is strongest.
- **Data strategy** — good work has a documented, isolated, self-cleaning approach to test data that survives parallel execution.
- **CI quality** — good work runs on push/PR, is green, and uploads useful artefacts (report/traces), not a token workflow.
- **Config maturity** — good work uses multiple projects and meaningful tags so a fast smoke run and a fuller regression run both exist.
- **Professional framing** — good work has a clear README and honest limitations, framed as a portfolio project.

## Pass criteria
A public repo combining API and UI tests with a documented, isolated test-data strategy, authentication via \`storageState\`, multiple browser projects, smoke/regression tagging, and a GitHub Actions workflow that runs the suite green and uploads artefacts — with a link to a successful run. A distinction shows a coherent architecture, a data strategy that holds under parallel CI, meaningful tag-driven run profiles, and a README a reviewer could act on immediately.`,
    },

    // ── 12 ─────────────────────────────────────────────────────────────────
    {
      moduleNumber: 13,
      title: 'Lab: Debugging & Reporting',
      submissionType: 'file',
      instructions: `## Scenario
Two tests are failing and the error messages alone do not tell the whole story. A senior engineer diagnoses these by reading traces, not by adding \`console.log\` and guessing. You will use Playwright's trace viewer and reporters to find the real root cause of each failure and produce evidence-backed diagnoses. A repo with two seeded failing tests is provided in the module resources; if you cannot access it, create two tests that fail for two *different* reasons (e.g. a genuine assertion/locator bug and a timing/state issue) and debug those.

## Your task
1. Run the suite with tracing on (\`--trace on\` or \`trace: 'on-first-retry'\`) and open the trace for each failure in the trace viewer.
2. For **each** failing test, use the trace (snapshots, network, console, the timeline and the failing action) to find the actual root cause — distinguish a real product/assertion bug from a test defect (bad locator, race, stale state).
3. Fix each failure correctly (fix the test where the test is wrong; if the trace reveals a genuine product bug, say so and adjust the test to pin it).
4. Capture **trace evidence** for each: the specific frame/network entry/console line that revealed the cause.
5. Use the HTML reporter to show the before (red) and after (green) state.
6. Write a short root-cause report per failure: symptom → what the trace showed → root cause → fix → prevention.

## Deliverables
- A short report (one to three pages) with a section per failing test.
- For each: the symptom, the trace evidence (screenshot/snapshot of the telling frame or network/console entry), the root cause, the fix, and one prevention idea.
- Evidence of the suite going from red to green (HTML report before/after).

## Assessment rubric
- **Trace-led diagnosis** — good work reads the trace (snapshots/network/console/timeline) to locate the cause, rather than guessing or brute-forcing.
- **Correct root cause** — good work identifies the *actual* cause and correctly distinguishes a test defect from a product bug.
- **Evidence** — good work shows the specific trace artefact that revealed each cause, not a generic screenshot.
- **Appropriate fix** — good work fixes the real problem (and pins a genuine product bug rather than deleting the assertion) and does not just loosen the test to make red go green.
- **Prevention** — good work suggests how a similar failure would be caught or avoided earlier.

## Pass criteria
Both failures are diagnosed from trace evidence with a correct root cause, an appropriate fix, and the suite ending green, each backed by the specific trace artefact that revealed the cause. A distinction cleanly separates test defects from product bugs, cites precise trace evidence, and gives credible prevention measures rather than "be more careful".`,
    },

    // ── 13 ─────────────────────────────────────────────────────────────────
    {
      moduleNumber: 14,
      title: 'Lab: AI-Generated Test Critique',
      submissionType: 'file',
      instructions: `## Scenario
AI assistants will happily generate a whole test file in seconds — confidently, and often wrongly. This is a **required AI assignment**. The skill that matters now is not prompting; it is *critique*: spotting hallucinated APIs and selectors, green-but-wrong assertions, and missing cases, then correcting them. You will generate tests with an AI tool and then do the senior work of making them trustworthy.

## Your task
1. Choose a feature to cover (e.g. a login form, a search-and-filter, or a checkout step) against an app you can actually run or reason about concretely.
2. Ask an AI assistant to generate a set of automated tests (Playwright + TypeScript) for that feature. **Keep the original output verbatim.**
3. Critically review the generated tests and identify their weaknesses, including at least: **hallucinated or non-existent APIs/methods**, **invented or brittle selectors**, **assertions that are weak or green-but-wrong** (assert the wrong thing, or pass regardless), and **missing cases** (negative paths, boundaries, error/empty states).
4. Produce a **corrected version** that is genuinely runnable and meaningful: real APIs, resilient locators, assertions that would fail on a real regression, and the missing cases added.
5. Write a short **AI-usage declaration**: which tool, what you asked, what it got wrong, what you changed and why, and your judgement on where AI helped vs where it would have misled a less experienced engineer.

## Deliverables
- The **original AI output**, unedited (clearly labelled).
- Your **corrected version** (runnable, meaningful).
- A defect list mapping each identified weakness to its correction.
- A short **AI-usage declaration** (tool, prompt, what was wrong, what you changed and why).

## Assessment rubric
- **Defect detection** — good work finds the real problems, especially hallucinated APIs/selectors and green-but-wrong assertions, not just cosmetic tidy-ups.
- **Quality of correction** — good corrections are genuinely runnable, use real APIs and resilient locators, and assert things that would catch regressions.
- **Coverage gaps closed** — good work adds the negative/boundary/error cases the AI omitted.
- **Critical judgement** — good work evaluates *where* the AI was trustworthy and where it was dangerous, showing you can supervise the tool rather than defer to it.
- **Honest declaration** — good work is transparent about tool, prompt and the specific changes made.

## Pass criteria
Original AI output preserved; weaknesses (including at least one hallucinated API/selector and one weak/green-but-wrong assertion) identified and corrected into a runnable, meaningful version; missing cases added; a clear AI-usage declaration provided. A distinction demonstrates sharp critical judgement — precisely characterising each failure mode and articulating how an unwary engineer would have shipped the AI's version believing it worked.`,
    },

    // ── 14 ─────────────────────────────────────────────────────────────────
    {
      moduleNumber: 15,
      title: 'Lab: Team Automation Strategy',
      submissionType: 'file',
      instructions: `## Scenario
You have been asked to set the automation direction for a team. The context: "Meridian Health", a web app for booking clinic appointments, with a React front-end, a REST API, a payments integration and a small team shipping weekly. Leadership wants confidence to release without a two-day manual regression, but the team has limited time. You will write a concise, senior automation strategy — including the parts you would deliberately *not* automate.

## Your task
1. State the **goals and constraints**: what confidence the strategy must buy, and the real limits (team size, time, weekly cadence).
2. Set out **what to automate at which level** — unit, API/integration, UI — with the reasoning, and roughly how the effort should be distributed (pyramid shape) for *this* product.
3. Make explicit **coverage and trade-off decisions**: the highest-risk areas to cover first (e.g. booking, payment), and what confidence you are choosing to forgo and why.
4. Define a **tagging strategy** (e.g. \`@smoke\` for a fast pre-merge gate, \`@regression\` for the fuller run) and where each runs (pre-merge vs nightly).
5. State clearly **what you would NOT automate** — and why — with the alternative (exploratory testing, monitoring/observability in production, manual visual review, accessibility audits), so "not automated" is a decision, not a gap.
6. Keep it to one to two pages. This is a decision document, not an essay.

## Deliverables
- A one-to-two page strategy document.
- A level-by-level plan (unit/API/UI) with rationale and target shape for this product.
- Explicit risk-first coverage priorities and stated trade-offs.
- A tagging strategy tied to where tests run.
- A clear "will not automate" section with alternatives.

## Assessment rubric
- **Risk-led prioritisation** — good work targets the highest-risk journeys first (booking, payment) and justifies the order by consequence and likelihood.
- **Level choices** — good work assigns checks to the cheapest effective level and defends the pyramid shape for this specific product and cadence.
- **Explicit trade-offs** — good work names the confidence it is choosing to forgo, rather than implying everything is covered.
- **Deliberate non-automation** — good work treats "not automated" as a defended decision with a concrete alternative, not silence.
- **Fit and concision** — good work is tailored to the given team/constraints and reads as a crisp decision document a lead could act on.

## Pass criteria
A concise strategy that assigns coverage across unit/API/UI with rationale, prioritises the highest-risk areas, defines a tagging approach tied to where tests run, and explicitly states what will not be automated and why with alternatives — all tailored to the given constraints. A distinction shows genuine trade-off reasoning specific to Meridian Health and a strategy a real lead could adopt with minimal change.`,
    },

    // ── 15 ─────────────────────────────────────────────────────────────────
    {
      moduleNumber: 16,
      title: 'Project 3: Final Capstone',
      submissionType: 'url',
      instructions: `## Scenario
This is your **portfolio capstone**. Working independently, you will build a complete, production-style automation repository — the kind of artefact you would put in front of a hiring panel. It should stand on its own: someone could clone it, read the README, run it, and understand both what it does and the reasoning behind it. It is a portfolio/practice project built against a demo or self-owned app — present it honestly as such, and do not describe it as commercial or client work.

## Your task
Build a single, coherent Playwright + TypeScript repository that demonstrates the full toolkit. It must include:

1. **UI automation** — meaningful customer journeys with role-based locators and web-first assertions.
2. **API automation** — standalone API tests plus API-driven setup/verification.
3. **Reusable fixtures/components** — page/component objects and fixtures; no scattered selectors.
4. **Authentication / state handling** — \`storageState\`, per-role where relevant.
5. **Test-data strategy** — documented creation, isolation and cleanup.
6. **Environment configuration** — run against more than one environment via config/env (e.g. \`baseURL\` per environment), no hard-coded URLs/secrets.
7. **Browser projects** — multiple projects configured.
8. **Smoke/regression tagging** — a fast gate and a fuller run.
9. **CI/CD workflow** — GitHub Actions running the suite green, with artefacts.
10. **Reporting** — HTML report/traces, retained as CI artefacts.
11. **README** — architecture, how to run locally and in CI, and how the pieces fit.
12. **Automation strategy + risk/coverage decisions + limitations** — a short written section: what you automated at which level and why, what you deliberately left out, and honest limitations.
13. **AI-usage declaration** — where and how AI assisted (if at all), and what you verified yourself.

## Deliverables
- A public GitHub repo link (this is what you submit), with a green CI run.
- All twelve technical elements above present and working from a clean clone.
- A README plus a written strategy/risk/limitations section and an AI-usage declaration.

## Assessment rubric
- **Completeness** — good work includes every required element, each actually functional, not stubbed.
- **Coherence** — good work is one well-structured repo where the parts fit together (fixtures, data strategy, config) rather than disconnected demos.
- **Reliability and CI** — good work runs green from a clean clone and in CI, with useful artefacts and no hard waits.
- **Reasoning** — good work explains its risk/coverage decisions and limitations honestly, showing judgement, not just mechanics.
- **Professionalism** — good work reads as a portfolio piece: clear README, honest framing, transparent AI declaration, no overclaiming of commercial experience.

## Pass criteria
A single public repo delivering all required outputs — UI + API automation, reusable fixtures/components, authentication/state, a test-data strategy, environment config, browser projects, smoke/regression tags, a green CI/CD workflow, reporting, a README, a written automation strategy with risk/coverage decisions and limitations, and an AI-usage declaration — runnable from a clean clone. A distinction is a genuinely employable portfolio piece: coherent architecture, reliable in CI, well-reasoned strategy, and honest, professional framing throughout.`,
    },
  ],
};
