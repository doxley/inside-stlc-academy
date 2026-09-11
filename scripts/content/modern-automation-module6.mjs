// Modern Test Automation Bootcamp — Module 6: Reliable Playwright Automation.
// The reliability module: why tests flake, and how Playwright's design lets you
// build suites teams actually trust. All code targets modern @playwright/test.
export default {
  courseSlug: 'modern-test-automation-bootcamp',
  moduleNumber: 6,
  lessonsPrefix: 'modern-automation',
  enhPrefix: 'modern-automation',
  enhSep: '-',
  lessons: [
    {
      lessonNumber: 1,
      title: 'How Auto-Waiting Actually Works',
      estimatedTime: '16 minute read',
      lessonOverview: `Most flakiness in older tools came from guessing when the page was ready. Playwright removes that guesswork with actionability checks and a built-in retry loop, so you rarely wait manually. This lesson shows you exactly what happens before every action and assertion.`,
      learningObjectives: [
        'Describe the actionability checks Playwright runs before an action',
        'Explain the built-in retry loop behind actions and web-first assertions',
        'Recognise when you genuinely need an explicit wait and when you do not',
      ],
      lessonNotes: `## The problem auto-waiting solves
In older tools a test would find an element, then act on it, and the two steps were separate. If the element was not ready yet — still animating, still disabled, still behind a spinner — the action failed. Teams patched this with sleeps, and sleeps are the root of most flakiness. Playwright's answer is to make waiting part of every action rather than something you bolt on.

## Actionability checks
Before Playwright clicks, fills or checks anything, it waits for the target element to satisfy a set of **actionability checks**. Depending on the action these include:

- **Attached** — the element is present in the DOM.
- **Visible** — it has a non-empty bounding box and is not \`visibility: hidden\`.
- **Stable** — it has stopped moving; the same bounding box across two animation frames.
- **Enabled** — it is not disabled.
- **Receives events** — it is the actual hit target at its centre point, not covered by an overlay.
- **Editable** — for \`fill\`, the field is not read-only.

If any required check is not yet met, Playwright does not fail. It waits and re-checks, up to the action's timeout.

## The retry loop
The same idea powers web-first assertions. \`await expect(locator).toBeVisible()\` does not sample the page once — it re-queries the locator and re-evaluates the condition on a loop until it passes or the timeout expires. Actions and assertions share this "poll until ready" model, which is why a well-written Playwright test almost never contains an explicit wait.

## When you genuinely need to wait
Auto-waiting covers the element you are acting on. It cannot know about conditions it has no locator for — a background job finishing, a specific network response you care about, an animation with no DOM signal. For those, you use targeted waits (\`waitForResponse\`, \`expect(...).toPass()\`), covered later in this module — never a blind sleep.

## Key takeaway
Every Playwright action and web-first assertion runs a retry loop that waits for the element to be genuinely usable first; understanding those actionability checks is what lets you delete manual waits with confidence instead of superstition.`,
      workedExample: `A test with no explicit waits, where auto-waiting quietly does the work:

~~~ts
import { test, expect } from '@playwright/test';

test('a disabled button becomes clickable after valid input', async ({ page }) => {
  await page.goto('/transfer');

  // The "Send" button starts disabled until the form validates.
  const send = page.getByRole('button', { name: 'Send' });

  await page.getByLabel('Amount').fill('50');
  await page.getByLabel('Recipient').fill('alex@example.com');

  // No sleep needed: click waits for the button to pass the "enabled" check.
  await send.click();

  // The assertion retries until the confirmation appears.
  await expect(page.getByRole('alert')).toHaveText('Transfer sent');
});
~~~

The button is disabled when the page loads and only enables once both fields are valid. There is no \`waitForTimeout\` guessing how long validation takes — \`click()\` keeps re-checking the actionability of \`send\` until it is enabled and stable, then clicks. The final assertion waits for the async confirmation. The test reads like a description of user intent, and the waiting is invisible because Playwright owns it.`,
      commonMistakes: `- Adding \`waitForTimeout\` before an action "to be safe" when the action already waits
- Assuming auto-waiting covers a background process it has no locator for
- Reading an element's state once into a variable, then acting on the stale snapshot
- Blaming Playwright for a timeout instead of reading which actionability check never passed`,
      realWorldTip: `On a delivery team, treat any explicit sleep in a pull request as a question to answer in review: "what condition are you actually waiting for?" Nine times in ten the honest answer names something with a DOM signal — a button enabling, a spinner disappearing — that a locator and auto-waiting handle for free. The rare tenth case is a real asynchronous condition that deserves a targeted wait, not a fixed delay.`,
      exercise: `Find or build a flow where a control is disabled until a form is valid (a payment or transfer form is ideal). Write a test that fills the form and clicks the control with no explicit wait, then assert the outcome. Deliverable: the spec file plus one sentence naming which actionability check made the click safe.`,
      reflectionQuestion: `If Playwright already waits for elements to be actionable, why does flakiness still exist at all? What kinds of conditions fall outside what auto-waiting can see?`,
      knowledgeCheck: `Name two of the actionability checks Playwright runs before clicking an element. (Answer: any two of attached, visible, stable, enabled, receives events)`,
      completionChecklist: [
        'I can describe the actionability checks that gate an action',
        'I can explain the retry loop shared by actions and assertions',
        'I can tell when auto-waiting is enough and when a targeted wait is needed',
      ],
      enhancements: {
        davidTip: `When an action times out, do not reach for a longer timeout — run with \`--debug\` and read the actionability report Playwright prints. "Element is not enabled" and "element intercepts pointer events" tell you the real cause in plain words, and it is almost never "Playwright is too fast".`,
        visualAid: {
          type: 'flow',
          title: 'What happens before a single click',
          steps: [
            { label: 'Resolve the locator', detail: 'Re-query the DOM for the element right now, not when the line was written.' },
            { label: 'Run actionability checks', detail: 'Attached, visible, stable, enabled, receives events — in order.' },
            { label: 'Any check unmet?', detail: 'Wait a beat and re-resolve, looping until the timeout.' },
            { label: 'All checks met', detail: 'Perform the click at the element\'s hit point.' },
          ],
        },
        miniChallenge: `Take a test that has a \`waitForTimeout\` before a click. Delete the sleep, run the test ten times with \`--repeat-each=10\`, and confirm auto-waiting made the wait redundant.`,
      },
    },
    {
      lessonNumber: 2,
      title: 'The Real Causes of Flakiness',
      estimatedTime: '18 minute read',
      lessonOverview: `Flaky tests feel like bad luck, but they almost never are. They are a design problem with a small set of recurring causes. This lesson names those causes so you can diagnose flakiness structurally instead of retrying and hoping.`,
      learningObjectives: [
        'Name the main structural causes of flaky tests',
        'Explain why flakiness is a design problem rather than random misfortune',
        'Diagnose which category a given flaky failure belongs to',
      ],
      lessonNotes: `## Flakiness is not luck
A flaky test passes and fails on the same code without any change. It is tempting to call this random and move on, but "random" here just means "caused by something you have not identified yet". Almost every flake traces back to one of a handful of design faults. Name the category and the fix usually becomes obvious.

## Timing and race conditions
The classic cause: the test acts before the application is ready, or asserts before the result has arrived. Fixed sleeps make this worse, not better — too short and it fails, too long and it wastes time and still fails under load. The fix is auto-waiting and web-first assertions that wait for the actual condition.

## Shared or leaked state
Tests that share a database record, a user account, a logged-in session or a global counter will interfere with each other, especially in parallel. Test A mutates something test B assumed. This is the most damaging category because the failing test is often not the one that caused the problem.

## Poor test data
Tests that depend on data someone might change, on "the third row of the table", or on a record that another test also edits, are fragile by construction. Good tests create the data they need and clean up after themselves, or use isolated, deterministic fixtures.

## Environment
Differences between where a test passes and where it fails: a slower CI machine, a different viewport that shows a cookie banner, a different time zone or locale, a service that is up locally but rate-limited in CI. "Works on my machine" is an environment flake.

## Test ordering
If a suite only passes when tests run in a particular order, the tests are coupled. Playwright isolates browser contexts to help, but shared back-end state can still leak. A suite you can run in any order, or shuffled, is a suite that is honestly independent.

## Key takeaway
Flakiness is a design signal, not noise: timing, shared state, poor data, environment and ordering account for nearly all of it — diagnose the category and you fix the cause, rather than retrying a symptom forever.`,
      workedExample: `A flaky test caused by shared state, and the isolated version that fixes it:

~~~ts
import { test, expect } from '@playwright/test';

// Flaky: every test edits the SAME shared account. In parallel they collide.
test('updates the display name', async ({ page }) => {
  await page.goto('/profile');
  await page.getByLabel('Display name').fill('Jordan');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('alert')).toHaveText('Profile updated');
});
~~~

If another test signs in as the same user and changes the name concurrently, this one may see the wrong value or a stale session. The fix is to give each test its own data:

~~~ts
import { test, expect } from '@playwright/test';
import { createUser } from './helpers/users';

test('updates the display name', async ({ page }) => {
  // Each test creates its own user, so nothing is shared.
  const user = await createUser();
  await page.goto('/login');
  await page.getByLabel('Email').fill(user.email);
  await page.getByLabel('Password').fill(user.password);
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.goto('/profile');
  await page.getByLabel('Display name').fill('Jordan');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('alert')).toHaveText('Profile updated');
});
~~~

The behaviour under test is identical. The difference is that the second version owns its data end to end, so no other test can invalidate its assumptions — the flake disappears because the shared state that caused it is gone.`,
      commonMistakes: `- Labelling a test "just flaky" and adding a retry instead of finding the cause
- Sharing one seeded user or record across many tests that all mutate it
- Depending on data ("row 3", "the newest order") that other tests or people can change
- Assuming a test that passes locally is order-independent without ever shuffling the suite`,
      realWorldTip: `On a delivery team, keep a flaky-test log: when a test fails then passes on rerun, record it rather than shrugging. Within a sprint the log almost always shows clusters — a set of tests sharing one account, a handful that only fail on the slower CI runner. Flakiness treated as data reveals its structural cause; flakiness treated as luck stays forever.`,
      exercise: `Take a suite (yours or a sample) and run it with tests shuffled and in parallel. For any test that fails, classify the failure into one of the five categories — timing, shared state, data, environment, ordering. Deliverable: a short table of the failures you found and the category each belongs to.`,
      reflectionQuestion: `A test fails roughly one run in twenty and always passes on rerun. Which of the five categories would you investigate first, and what evidence would tell you you were right?`,
      knowledgeCheck: `Why is shared state considered the most damaging cause of flakiness? (Answer: because the test that fails is often not the one that caused the problem, making it hard to trace)`,
      completionChecklist: [
        'I can name the main structural causes of flakiness',
        'I can classify a flaky failure into the right category',
        'I treat flakiness as a design problem to diagnose, not luck to absorb',
      ],
      enhancements: {
        industryStory: `A team had a suite that failed a couple of times a week, always on a different test, always green on rerun. They lived with it for months by rerunning the pipeline. When someone finally logged the failures, a pattern emerged in a day: every flaky test authenticated as the same shared seed user, and they collided whenever two ran in parallel. Giving each test its own user removed the entire class of failures at once — the "random" flakiness had been one design fault all along.`,
        visualAid: {
          type: 'comparison',
          title: 'Five causes of flakiness and their fixes',
          headers: ['Cause', 'Typical symptom', 'Structural fix'],
          rows: [
            ['Timing', 'Fails under load, passes on rerun', 'Auto-waiting and web-first assertions'],
            ['Shared state', 'A different test fails each time', 'Isolated per-test data'],
            ['Poor test data', 'Breaks when data changes', 'Create and own the data you need'],
            ['Environment', 'Fails only in CI', 'Pin viewport, locale, browser versions'],
            ['Test ordering', 'Only passes in one order', 'Make every test self-sufficient'],
          ],
        },
        davidTip: `When you hit a flake, resist the rerun button for five minutes and ask "which category is this?" first. The rerun tells you nothing; the category tells you the fix. A team that names causes gets a stable suite, a team that reruns gets a slow one that still lies to them.`,
      },
    },
    {
      lessonNumber: 3,
      title: 'Never Use Hard Waits',
      estimatedTime: '17 minute read',
      lessonOverview: `The single most common flakiness anti-pattern is the hard wait — \`waitForTimeout\`. This lesson shows you how to replace every one with a web-first assertion, a targeted \`locator.waitFor\`, or \`expect(...).toPass()\` for conditions that need polling.`,
      learningObjectives: [
        'Explain why fixed-duration waits both slow the suite and increase flakiness',
        'Replace waitForTimeout with web-first assertions and locator.waitFor',
        'Use expect(...).toPass() to poll a custom condition correctly',
      ],
      lessonNotes: `## Why hard waits are a trap
\`await page.waitForTimeout(3000)\` waits exactly three seconds, no matter what. This fails you in both directions. If the app is slow today — a loaded CI machine, a cold cache — three seconds is not enough and the test flakes. If the app is fast, you have thrown away nearly three seconds on every run, and a suite of hundreds of tests bleeds minutes. A fixed wait is a guess about a duration you cannot actually predict.

## The default replacement: web-first assertions
Most of the time you are sleeping because you are waiting for something to appear or change. Assert that thing directly and let the assertion do the waiting:

~~~ts
await expect(page.getByRole('alert')).toHaveText('Saved');
~~~

This waits precisely until the alert says "Saved" — no longer, no shorter. It is faster than any sleep on a good day and more reliable on a bad one.

## Waiting for a locator to reach a state
When you need to wait for an element to appear or disappear but are not yet asserting on it, use \`locator.waitFor\`:

~~~ts
await page.getByText('Loading…').waitFor({ state: 'hidden' });
~~~

States are \`attached\`, \`detached\`, \`visible\` and \`hidden\`. This is the honest way to wait out a spinner.

## Polling a custom condition: toPass
Sometimes the condition is not a single assertion — it is a small block that should eventually all hold, perhaps re-fetching data. \`expect(...).toPass()\` retries the whole block:

~~~ts
await expect(async () => {
  const orders = await api.get('/orders');
  expect(orders.status).toBe(200);
  expect(orders.data).toHaveLength(1);
}).toPass();
~~~

Playwright re-runs the callback until it stops throwing or the timeout hits. This is the correct tool for eventual consistency — a job that finishes shortly after you trigger it — and it replaces the ugliest sleeps of all.

## Key takeaway
There is no condition a fixed sleep handles better than a web-first assertion, \`locator.waitFor\`, or \`expect(...).toPass()\`; each waits for the actual state instead of a guessed duration, so replacing hard waits makes a suite both faster and more reliable at once.`,
      workedExample: `Replacing a sleep-driven flow with targeted waits:

~~~ts
import { test, expect } from '@playwright/test';

test('exported report becomes available for download', async ({ page }) => {
  await page.goto('/reports');
  await page.getByRole('button', { name: 'Export' }).click();

  // The export runs in the background. Wait for the spinner to clear...
  await page.getByText('Preparing export…').waitFor({ state: 'hidden' });

  // ...then assert the real outcome, which retries until it holds.
  await expect(page.getByRole('link', { name: 'Download report' })).toBeVisible();
});
~~~

No step guesses a duration. \`waitFor({ state: 'hidden' })\` waits exactly as long as the export takes, and the web-first assertion confirms the download link actually appeared. On a fast run this finishes in a fraction of a second; on a slow CI run it waits patiently — and either way it asserts a genuine outcome rather than hoping three seconds was enough.`,
      commonMistakes: `- Reaching for \`waitForTimeout\` as the default fix for any intermittent failure
- Converting a sleep into a longer sleep when it flakes, doubling the wasted time
- Using \`waitForTimeout\` to wait out an animation that has a perfectly good DOM signal
- Wrapping a single assertion in \`toPass()\` when a plain web-first assertion already retries`,
      realWorldTip: `On a delivery team, add a lint rule or a simple CI grep that fails the build if \`waitForTimeout\` appears in the test suite. It sounds heavy-handed, but it forces the real conversation every time: "what are you actually waiting for?" The handful of legitimate cases (a deliberate debounce you are testing, say) can be allow-listed explicitly, and everyone can see exactly where and why a fixed wait was justified.`,
      exercise: `Find every \`waitForTimeout\` in a suite (or write three tests that misuse it). Replace each with the right tool: a web-first assertion, \`locator.waitFor\`, or \`expect(...).toPass()\`. Deliverable: the before/after for each, with a one-line note on which replacement you chose and why.`,
      reflectionQuestion: `A hard wait of three seconds "fixes" a flaky test. In what two different ways is that fix an illusion, and what is the test really waiting for?`,
      knowledgeCheck: `Which Playwright API retries an entire block of assertions until it stops throwing? (Answer: expect(...).toPass())`,
      completionChecklist: [
        'I can explain why fixed sleeps both slow tests and increase flakiness',
        'I can replace a waitForTimeout with the correct targeted wait',
        'I can use expect(...).toPass() to poll a custom condition',
      ],
      enhancements: {
        badGood: {
          label: 'waiting for an async result',
          bad: `~~~ts
await page.getByRole('button', { name: 'Save' }).click();
// Hope 3s is enough for the save to complete and the toast to appear.
await page.waitForTimeout(3000);
await expect(page.getByRole('alert')).toHaveText('Saved');
~~~`,
          good: `~~~ts
await page.getByRole('button', { name: 'Save' }).click();
// The assertion IS the wait: it retries until the toast says "Saved".
await expect(page.getByRole('alert')).toHaveText('Saved');
~~~`,
        },
        davidTip: `The tell-tale sign of a hard wait is that nobody can explain the number. Ask "why three seconds and not two, or five?" — there is never an answer, because the number was tuned until the test stopped failing that afternoon. A web-first assertion needs no such number, which is exactly why it does not rot.`,
        miniChallenge: `Write a test against an eventually-consistent endpoint (a job you trigger, then poll) using \`expect(...).toPass()\`. Confirm it passes when the job is fast and still passes when you artificially slow the job down.`,
      },
    },
    {
      lessonNumber: 4,
      title: 'Locators That Survive Change',
      estimatedTime: '18 minute read',
      lessonOverview: `A resilient locator is coupled to what a user perceives, not to how the page is built. This lesson contrasts role, label and test-id strategies with the brittle CSS and XPath selectors that shatter on the next refactor, and shows how locator choice is itself a reliability decision.`,
      learningObjectives: [
        'Prefer role, label and test-id locators over structural CSS and XPath',
        'Explain why structural selectors break on refactors that change nothing a user sees',
        'Choose a resilient locator and add a test-id only as a deliberate escape hatch',
      ],
      lessonNotes: `## Locator choice is a reliability decision
Flakiness is not only about timing. A locator that breaks whenever a developer restructures the markup is a reliability problem too — it produces red runs with no real defect behind them, which erodes trust in the suite exactly as much as a timing flake does. The most durable locators describe the element the way a person or an assistive technology would.

## The resilient strategies
Prefer, in roughly this order:

1. \`getByRole('button', { name: 'Add to basket' })\` — role plus accessible name. Buttons, links, headings, checkboxes, inputs. This is coupled to behaviour and content, which change rarely.
2. \`getByLabel('Email')\` — form fields by their visible label.
3. \`getByText('Order confirmed')\` — non-interactive content.
4. \`getByTestId('cart-total')\` — an explicit, agreed \`data-testid\` hook for cases where nothing user-facing is stable enough.

## Why structural selectors break
\`page.locator('div.sidebar > ul > li:nth-child(3) > a')\` encodes the current DOM shape. It says nothing about what the element *is* — only where it happens to sit today. The moment a developer wraps that list in a new container, reorders items, or swaps a CSS-in-JS class hash, the selector points at nothing or, worse, at the wrong element. None of those changes altered what the user sees, yet the test breaks. That mismatch — the test failing when nothing meaningful changed — is the definition of brittle.

## Test-ids are a tool, not a default
A \`data-testid\` is stable because your team agrees not to change it, and it is invisible to users so it never accidentally couples a test to copy or styling. That makes it a good escape hatch — for a canvas, a chart, an icon-only control with no accessible name. But reach for it last: if \`getByRole\` cannot find a control because it has no accessible name, that is often a genuine accessibility bug, and adding a test-id routes around a defect instead of raising it.

## Key takeaway
Locate by what the user perceives — role, label, text — and keep \`data-testid\` as a deliberate escape hatch; a locator tied to behaviour survives the refactors that shatter CSS and XPath, which makes locator choice a first-class reliability decision, not a stylistic one.`,
      workedExample: `The same element located brittly and resiliently, and a justified test-id:

~~~ts
import { test, expect } from '@playwright/test';

test('resilient locators for a product card', async ({ page }) => {
  await page.goto('/products');

  // Brittle — breaks if the card markup is restructured:
  // await page.locator('.card:nth-child(2) button.btn-primary').click();

  // Resilient — scoped to the item, found by role and name:
  const card = page.getByRole('listitem').filter({ hasText: 'Mechanical keyboard' });
  await card.getByRole('button', { name: 'Add to basket' }).click();

  await expect(page.getByRole('status')).toHaveText('Mechanical keyboard added to basket');

  // Justified test-id: an icon-only rating widget with no accessible text.
  await expect(page.getByTestId('rating-stars')).toHaveAttribute('data-value', '4');
});
~~~

The click is located by scoping to the right list item and then finding the button by its accessible name, so reordering the products or restyling the card cannot break it. The one \`getByTestId\` is a conscious choice for a widget that genuinely has no user-facing text to target — the exception that proves the rule, not the default.`,
      commonMistakes: `- Defaulting to CSS or XPath because the editor's "copy selector" produces it
- Locating by a CSS-in-JS class hash that changes on every build
- Adding \`data-testid\` everywhere as a first choice instead of a last resort
- Routing around a missing accessible name with a test-id instead of raising the accessibility bug`,
      realWorldTip: `On a delivery team, make "no new structural selectors without justification" a review standard, and pair it with the developers rather than fighting them. When a test needs a hook the product does not offer, the best outcome is usually a shared \`data-testid\` the developers agree to keep stable, added at the same time as the feature — not a fragile CSS path bolted on afterwards by whoever wrote the test. Locator resilience is a contract between test and product, negotiated up front.`,
      exercise: `Take five locators from an existing suite that use CSS or XPath. Rewrite each as the most resilient user-facing locator you can. For any you cannot, decide between raising a missing-accessible-name bug and agreeing a \`data-testid\`, and say which. Deliverable: a before/after table plus your decision on each stubborn case.`,
      reflectionQuestion: `A refactor that changed no user-visible behaviour turned dozens of tests red. What does that tell you about how those tests were located, and what would have prevented it?`,
      knowledgeCheck: `Why does a role-based locator survive a restyle that breaks a CSS selector? (Answer: it is coupled to behaviour and accessible name, which the restyle did not change, rather than to DOM structure and classes)`,
      completionChecklist: [
        'I default to role, label and text locators over structural selectors',
        'I can explain why structural selectors break on cosmetic refactors',
        'I use data-testid deliberately, as an agreed escape hatch, not a default',
      ],
      enhancements: {
        industryStory: `A team's suite relied on selectors auto-generated from a component library's class names. A routine library upgrade changed those hashed class names and several hundred tests failed overnight — not one because of a real defect. The rescue was not to pin the old library but to rewrite the worst offenders as \`getByRole\` and \`getByLabel\`; the rebuilt tests then sailed through the next two upgrades untouched, because they were coupled to what users see rather than to a build artefact.`,
        badGood: {
          label: 'brittle vs resilient locator',
          bad: `~~~ts
await page.locator('div.MuiCard-root > div:nth-child(2) > button.css-1a2b3c').click();
~~~`,
          good: `~~~ts
await page
  .getByRole('listitem')
  .filter({ hasText: 'Mechanical keyboard' })
  .getByRole('button', { name: 'Add to basket' })
  .click();
~~~`,
        },
        miniChallenge: `Find one locator in your suite built on a class-name hash or an \`nth-child\` path. Rewrite it by role and accessible name, then have a colleague restructure that component and confirm the test still passes.`,
      },
    },
    {
      lessonNumber: 5,
      title: 'Handling Async UI',
      estimatedTime: '18 minute read',
      lessonOverview: `Dialogs, toasts, animations, navigations and in-flight network requests are where sleeps sneak back in. This lesson shows how to handle each asynchronous UI pattern by waiting for the real signal — an event, a state, a response — instead of a fixed delay.`,
      learningObjectives: [
        'Handle dialogs, toasts and animations without sleeps',
        'Wait for navigations and specific network responses deterministically',
        'Choose the narrowest reliable signal for each async pattern',
      ],
      lessonNotes: `## The general rule
Every asynchronous UI pattern has a real signal you can wait for: an element appearing, a class settling, a URL changing, a response arriving. The reliable approach is always to wait for that specific signal, never for a duration. Below are the patterns you meet most.

## Dialogs
Native \`alert\`, \`confirm\` and \`prompt\` dialogs block the page. Register a handler **before** the action that triggers them:

~~~ts
page.on('dialog', dialog => dialog.accept());
await page.getByRole('button', { name: 'Delete account' }).click();
~~~

Custom in-page modals are just elements — locate the modal and act on it with normal web-first assertions; no special handling needed.

## Toasts and transient messages
A toast that auto-dismisses is a race: assert it while it is there, and do not sleep waiting for it to go. \`await expect(page.getByRole('alert')).toHaveText('Saved')\` catches it during its lifetime because the assertion retries from the moment you call it.

## Animations
Auto-waiting already includes a **stability** check — Playwright waits for an element to stop moving before acting on it. So a button sliding into place is handled for you. If you must wait for an animation with no actionable target, wait on a state change (a class, an \`aria\` attribute) rather than a fixed duration.

## Navigations
You rarely need an explicit wait: asserting on the destination is enough, because the assertion retries across the navigation.

~~~ts
await page.getByRole('link', { name: 'Checkout' }).click();
await expect(page).toHaveURL(/\\/checkout/);
~~~

For a click that triggers a navigation you want to bracket explicitly, use \`waitForURL\`.

## Network settling
Do not wait for "the network to be idle" as a blunt instrument — it is fragile on pages with polling or analytics. Wait for the **specific** response you care about:

~~~ts
const response = page.waitForResponse(r => r.url().includes('/api/orders') && r.ok());
await page.getByRole('button', { name: 'Place order' }).click();
await response;
await expect(page.getByRole('heading', { name: 'Order confirmed' })).toBeVisible();
~~~

## Key takeaway
Every async pattern — dialog, toast, animation, navigation, network — has a precise signal; wait for that signal, not a duration, and prefer the narrowest one (a specific response over "network idle", a state change over a sleep) so the test is both deterministic and fast.`,
      workedExample: `Bracketing a network call and confirming the resulting UI, with no sleeps:

~~~ts
import { test, expect } from '@playwright/test';

test('placing an order waits for the API, not a timer', async ({ page }) => {
  await page.goto('/cart');

  // Arm the wait BEFORE the click so we cannot miss the response.
  const orderPosted = page.waitForResponse(
    r => r.url().includes('/api/orders') && r.request().method() === 'POST' && r.ok(),
  );

  await page.getByRole('button', { name: 'Place order' }).click();

  const response = await orderPosted;
  const body = await response.json();
  expect(body.status).toBe('confirmed');

  // The UI outcome is asserted with a retrying web-first assertion.
  await expect(page.getByRole('heading', { name: 'Order confirmed' })).toBeVisible();
  await expect(page).toHaveURL(/\\/orders\\/[a-z0-9-]+/);
});
~~~

The \`waitForResponse\` is armed before the click, so there is no window in which the response could arrive unobserved. The test then checks both the API result and the user-facing outcome — the heading and the new URL — each waited for by its own retrying assertion. Nothing here guesses a duration, so it runs fast when the API is fast and stays reliable when it is slow.`,
      commonMistakes: `- Registering a \`dialog\` handler after the click that triggers the dialog
- Sleeping to wait out a toast instead of asserting on it while it is visible
- Using \`waitForLoadState('networkidle')\` on a page that polls, so it never settles
- Arming \`waitForResponse\` after the action, creating a race where the response is missed`,
      realWorldTip: `On a delivery team, prefer \`waitForResponse\` on a specific endpoint over any "wait for the network to be quiet" approach. Real applications fire analytics beacons, heartbeat polls and lazy-loaded chunks that mean the network is never truly idle — a blanket network wait either hangs or resolves at an arbitrary moment. Naming the one request that matters makes the test say what it actually depends on, which is also documentation for the next person.`,
      exercise: `Write a test for a flow that makes a specific API call (a submit, a search, a save). Arm \`waitForResponse\` on that endpoint before the action, assert on the response body, then assert the resulting UI with web-first assertions. Deliverable: the spec file with a comment explaining why the wait is armed before the action.`,
      reflectionQuestion: `Playwright's stability check already handles most animations. Given that, when is waiting on an animation still your responsibility, and what signal would you wait for instead of a sleep?`,
      knowledgeCheck: `Why should you arm waitForResponse before the action that triggers it? (Answer: so the response cannot arrive and be missed in the gap between acting and starting to wait)`,
      completionChecklist: [
        'I can handle dialogs, toasts and animations without sleeps',
        'I can wait for a navigation and a specific network response deterministically',
        'I choose the narrowest reliable signal for each async pattern',
      ],
      enhancements: {
        badGood: {
          label: 'waiting for a network result',
          bad: `~~~ts
await page.getByRole('button', { name: 'Place order' }).click();
await page.waitForLoadState('networkidle'); // never settles: the page polls for notifications
await expect(page.getByRole('heading', { name: 'Order confirmed' })).toBeVisible();
~~~`,
          good: `~~~ts
const orderPosted = page.waitForResponse(r => r.url().includes('/api/orders') && r.ok());
await page.getByRole('button', { name: 'Place order' }).click();
await orderPosted;
await expect(page.getByRole('heading', { name: 'Order confirmed' })).toBeVisible();
~~~`,
        },
        davidTip: `When a page "never finishes loading" in your test, open the network tab in a trace — you will usually find a heartbeat or analytics request firing every few seconds. That is why \`networkidle\` is a trap. Wait for the one response your feature actually produces and ignore the noise.`,
        visualAid: {
          type: 'comparison',
          title: 'Async patterns and the signal to wait for',
          headers: ['Pattern', 'Wrong: fixed wait', 'Right: real signal'],
          rows: [
            ['Native dialog', 'Sleep then click', 'page.on(\'dialog\') before the action'],
            ['Toast message', 'Sleep to catch it', 'Retrying assertion on the alert'],
            ['Animation', 'Sleep out the transition', 'Stability check, or wait on a state class'],
            ['Navigation', 'Sleep after click', 'toHaveURL or waitForURL'],
            ['Network call', 'networkidle or sleep', 'waitForResponse on the specific endpoint'],
          ],
        },
      },
    },
    {
      lessonNumber: 6,
      title: 'Diagnosing & Fixing a Flaky Test',
      estimatedTime: '20 minute read',
      lessonOverview: `This lesson is a worked rescue. You will take a test that fails roughly one run in ten, reproduce it deliberately with \`--repeat-each\`, find the true cause in the trace viewer, and fix it so it goes green for the right reason — not because you padded it with a wait.`,
      learningObjectives: [
        'Reproduce an intermittent failure deliberately with --repeat-each',
        'Use the trace viewer to locate the exact step where a flaky test diverges',
        'Fix the underlying cause so the test passes for the right reason',
      ],
      lessonNotes: `## Reproduce before you fix
You cannot fix what you cannot see fail. A test that fails one run in ten will almost never fail while you watch it once. Force it:

~~~bash
npx playwright test flaky.spec.ts --repeat-each=20
~~~

\`--repeat-each\` runs each selected test that many times in one go. If it fails a few times out of twenty, you now have a reproducible flake to investigate. Combine with \`--workers\` to reproduce parallelism-related flakes, or \`--retries=0\` so a flake is not silently absorbed while you are hunting it.

## Capture a trace of the failure
Set traces to record on failure so the flaky run leaves evidence:

~~~ts
// playwright.config.ts (excerpt)
use: { trace: 'on-first-retry' },
~~~

Or force it for the hunt with \`--trace on\`. When a repeated run fails, open the trace it captured:

~~~bash
npx playwright show-trace test-results/.../trace.zip
~~~

## Read the trace, do not guess
In the trace viewer, scrub to the failing step. You get a DOM snapshot at that exact moment, the action log, network activity and console output. The questions to answer:

- What was on the page when the step failed? An overlay? A spinner still visible?
- Did the locator resolve to the element you expected, or to nothing?
- Was a network response still in flight that the test assumed had arrived?

Most flaky tests reveal their cause here in under a minute — a cookie banner over a button on the CI viewport, a save that had not completed, a shared record another test had changed.

## Fix the cause, not the symptom
The wrong fix is a longer timeout or a sleep — that makes the test pass sometimes-more-often while leaving the real fault in place. The right fix addresses the category from Lesson 2: dismiss the overlay in setup, wait for the specific response, give the test its own data. Then prove it:

~~~bash
npx playwright test flaky.spec.ts --repeat-each=50
~~~

Fifty green runs is evidence the flake is gone. One green run never was.

## Green for the right reason
A test that now passes because you fixed the race is trustworthy. A test that passes because you raised its timeout to thirty seconds is a slower version of the same lie. The goal of this whole module is a suite whose green means what the team thinks it means — timely, honest evidence about the product, not a light that stays green by luck.

## Key takeaway
Rescue a flaky test in four moves: reproduce it with \`--repeat-each\`, capture and read a trace to find the true cause, fix that cause structurally, and re-run many times to prove it — so the test ends up green for the right reason rather than padded into silence.`,
      workedExample: `A full rescue of a flake caused by an unobserved network call.

The failing test asserts a total immediately after a click, but the total is populated by an async request:

~~~ts
// Flaky: reads the total before the pricing API has responded.
test('shows the order total', async ({ page }) => {
  await page.goto('/cart');
  await page.getByRole('button', { name: 'Recalculate' }).click();
  await expect(page.getByTestId('order-total')).toHaveText('£42.00');
});
~~~

Reproduce it:

~~~bash
npx playwright test cart.spec.ts --repeat-each=20 --trace on
~~~

It fails perhaps three times in twenty. Open one failing trace with \`npx playwright show-trace\`. The DOM snapshot at the failing step shows \`order-total\` still reading \`£0.00\`, and the network panel shows the \`/api/price\` request only completing a beat later. The assertion was retrying, but on a slow run it timed out before the response landed because the element existed with stale text the whole time.

The correct fix waits for the specific response, not a longer timeout:

~~~ts
test('shows the order total', async ({ page }) => {
  await page.goto('/cart');

  const priced = page.waitForResponse(r => r.url().includes('/api/price') && r.ok());
  await page.getByRole('button', { name: 'Recalculate' }).click();
  await priced;

  await expect(page.getByTestId('order-total')).toHaveText('£42.00');
});
~~~

Prove it with \`npx playwright test cart.spec.ts --repeat-each=50\` — fifty green runs. The test now passes because the race is gone, not because it was given more time to get lucky.`,
      commonMistakes: `- Trying to fix a flake you have not reproduced, so you cannot tell if the fix worked
- Adding \`console.log\` and re-running blindly instead of opening the trace
- "Fixing" the flake by raising the timeout, leaving the real race in place
- Declaring victory after one green run rather than many repeated runs`,
      realWorldTip: `On a delivery team, make trace-first the norm for any flaky-test ticket: the ticket is not "investigate flaky test", it is "attach the trace of a reproduced failure and name the cause". That framing stops the endless rerun-and-hope loop and turns a vague annoyance into a concrete, fixable bug. Publish traces as CI artefacts so anyone — including the developer who wrote the feature — can open the failing step without reproducing it themselves.`,
      exercise: `Take a flaky test (or introduce a realistic race — assert an async value without waiting for its response). Reproduce it with \`--repeat-each\`, capture a trace, identify the cause from the trace, fix the underlying issue, and prove stability with fifty repeated runs. Deliverable: the before/after test plus a short note of what the trace showed and how you proved the fix.`,
      reflectionQuestion: `You have two ways to make a flaky test stop failing: fix the race it exposes, or raise its timeout until it stops. Both make CI green. Why is only one of them a real fix, and what does the other cost the team later?`,
      knowledgeCheck: `Which Playwright flag runs each selected test many times in one command to reproduce an intermittent failure? (Answer: --repeat-each)`,
      completionChecklist: [
        'I can reproduce an intermittent failure deliberately with --repeat-each',
        'I can use the trace viewer to find the exact step a flaky test diverges',
        'I fix the underlying cause and prove stability with repeated runs',
      ],
      enhancements: {
        industryStory: `A team had one test that failed roughly once a fortnight and had been reran-into-green so many times nobody trusted it. An engineer finally ran it fifty times with \`--repeat-each\`, caught two failures, and opened the traces. Both showed the same thing: a pricing call still in flight when the assertion checked the total. A three-line \`waitForResponse\` fixed it permanently. The wider change was cultural — the team stopped closing flaky tickets on a rerun and started requiring a reproduced trace, and their fortnightly mystery failures dried up over a quarter.`,
        badGood: {
          label: 'fixing a flaky assertion',
          bad: `~~~ts
// Reran until it "mostly" passed, then padded the timeout to hide the race.
await page.getByRole('button', { name: 'Recalculate' }).click();
await expect(page.getByTestId('order-total')).toHaveText('£42.00', { timeout: 30000 });
~~~`,
          good: `~~~ts
// Wait for the actual pricing response, so the assertion checks fresh data.
const priced = page.waitForResponse(r => r.url().includes('/api/price') && r.ok());
await page.getByRole('button', { name: 'Recalculate' }).click();
await priced;
await expect(page.getByTestId('order-total')).toHaveText('£42.00');
~~~`,
        },
        visualAid: {
          type: 'flow',
          title: 'The flaky-test rescue loop',
          steps: [
            { label: 'Reproduce', detail: 'Run with --repeat-each until the failure is reliable to trigger.' },
            { label: 'Capture', detail: 'Record a trace of a failing run (--trace on or on-first-retry).' },
            { label: 'Diagnose', detail: 'Scrub the trace to the failing step; read the DOM, network and log.' },
            { label: 'Fix the cause', detail: 'Address the category — race, overlay, shared data — not the timeout.' },
            { label: 'Prove it', detail: 'Re-run many times; many greens, not one, is the evidence.' },
          ],
        },
        miniChallenge: `Introduce a deliberate race into a passing test, reproduce it with \`--repeat-each=30\`, then fix it with a targeted wait and show it survives another 50 runs. Keep the trace of the original failure as evidence.`,
      },
    },
  ],
};
