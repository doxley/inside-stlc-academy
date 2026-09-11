// Modern Test Automation Bootcamp — Module 11: Cross-Browser, Parallelisation & Scale.
// Playwright + TypeScript module on running a suite across browsers and devices,
// parallelising and sharding it, and keeping it fast and trusted as it grows.
// Every lesson reinforces that a large suite is only valuable while it stays
// fast and trusted — a slow, flaky suite that people ignore is worse than none.
export default {
  courseSlug: 'modern-test-automation-bootcamp',
  moduleNumber: 11,
  lessonsPrefix: 'modern-automation',
  enhPrefix: 'modern-automation',
  enhSep: '-',
  lessons: [
    {
      lessonNumber: 1,
      title: 'Browser Projects',
      estimatedTime: '18 minute read',
      lessonOverview: `Playwright runs the same tests against Chromium, Firefox and WebKit — and against emulated devices — through the \`projects\` array in \`playwright.config.ts\`. This lesson shows how to configure them and, more importantly, how to decide what is actually worth running everywhere rather than tripling your run time out of habit.`,
      learningObjectives: [
        'Configure chromium, firefox and webkit projects in playwright.config.ts',
        'Add a device project using Playwright’s built-in device descriptors',
        'Decide which tests are worth running on every browser and which are not',
      ],
      lessonNotes: `## Projects are how Playwright fans out
A "project" in Playwright is a named run configuration with its own settings. The most common use is one project per browser engine, each pointing at the same tests:

~~~ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
~~~

Run all three with \`npx playwright test\`, or one with \`npx playwright test --project=firefox\`. Every spec runs once per project, so three browser projects means three times the tests — a cost you are choosing to pay.

## The three engines that matter
Playwright bundles three rendering engines, and between them they cover the real world:

- **Chromium** — Chrome, Edge and the many embedded browsers built on it.
- **Firefox** — Gecko, the one genuinely independent engine left on the desktop.
- **WebKit** — Safari, and crucially *every* browser on iOS, which are all WebKit underneath regardless of their branding.

WebKit is the one teams forget and the one that bites, because iOS Safari is where layout and CSS behave differently and where a large slice of real users are.

## Device projects
A device project layers a viewport, user-agent, touch support and scale factor on top of an engine, emulating a phone or tablet:

~~~ts
projects: [
  { name: 'Desktop Chrome', use: { ...devices['Desktop Chrome'] } },
  { name: 'Mobile Safari', use: { ...devices['iPhone 14'] } },
  { name: 'Mobile Chrome', use: { ...devices['Pixel 7'] } },
],
~~~

This is emulation, not a real device: it sets the viewport and touch flags, so it catches responsive-layout and touch-target problems, but it does not reproduce real hardware, real GPUs or real network conditions. Treat it as a fast, cheap check that covers most mobile bugs, not as a substitute for the occasional real-device test.

## A pragmatic cross-browser strategy
Running your whole suite on three browsers plus two devices is five times the cost, and most of that cost buys nothing — your business logic behaves identically on every engine. What actually differs between browsers is the *rendering layer*: CSS, layout, fonts, form controls, date pickers, media. So spend your cross-browser budget there.

A strategy that holds up on a real team:

- Run the **full suite on one browser** (usually Chromium) on every push — this is your fast feedback loop.
- Run a **curated subset — critical user journeys and layout-sensitive pages — on Firefox and WebKit**, less often (nightly, or on a merge to main).
- Add **device projects for the handful of screens where mobile layout genuinely matters**, not blanketed across everything.

The goal is not "every test on every browser". It is "every browser-specific risk covered somewhere, without paying five times over for logic that cannot vary by engine".

## Green on Chromium is not green everywhere
A suite that is all green on Chromium tells you nothing about Safari. If your users are on iOS and you never run WebKit, your evidence has a hole exactly where a big share of your traffic lives. Cross-browser coverage is about matching where your evidence is strong to where your users actually are.

## Key takeaway
Configure browser and device coverage through the \`projects\` array, but treat cross-browser runs as a budget to spend where rendering genuinely differs: full suite on one engine for speed, a curated subset on Firefox and WebKit for real coverage, and device projects only where mobile layout truly matters.`,
      workedExample: `A config that runs the full suite on Chromium but only tagged critical tests on the other engines:

~~~ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: { baseURL: process.env.BASE_URL ?? 'http://localhost:3000' },
  projects: [
    // Fast feedback: everything, one engine, every push.
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },

    // Cross-browser coverage: only the journeys tagged @critical.
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      grep: /@critical/,
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      grep: /@critical/,
    },

    // Mobile layout: the same critical journeys on an emulated phone.
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 14'] },
      grep: /@critical/,
    },
  ],
});
~~~

The \`grep\` option on a project restricts it to tests whose title matches — so Chromium runs everything while Firefox, WebKit and the emulated iPhone run only the journeys you tagged \`@critical\`. Tag a test simply by putting the marker in its title:

~~~ts
import { test, expect } from '@playwright/test';

test('checkout completes end to end @critical', async ({ page }) => {
  await page.goto('/checkout');
  await page.getByLabel('Card number').fill('4242 4242 4242 4242');
  await page.getByRole('button', { name: 'Pay now' }).click();
  await expect(page.getByRole('heading', { name: 'Order confirmed' })).toBeVisible();
});
~~~

Now a push runs the whole suite once on Chromium for speed, and the handful of journeys that would actually break differently on Safari or a phone get real coverage on those engines — without paying to run every trivial test five times.`,
      commonMistakes: `- Running the entire suite on three browsers by default, tripling run time to re-test logic that cannot vary by engine
- Omitting WebKit, then being surprised by iOS Safari bugs no test ever had a chance to catch
- Treating an emulated device project as if it were a real phone, and assuming it covers hardware and network behaviour
- Copying a config with five projects from a tutorial and never questioning whether the cost matches the risk`,
      realWorldTip: `On a delivery team, decide your cross-browser matrix from where your users actually are, not from a default. Pull the browser and device breakdown from your analytics, then match your coverage to it: if two percent of traffic is Firefox and forty percent is iOS Safari, your WebKit coverage matters far more than your Firefox coverage. Write the matrix down in the repo so the next person understands why the config looks the way it does, and revisit it when the traffic shifts.`,
      exercise: `Take an existing single-browser Playwright config and turn it into a pragmatic matrix: keep the full suite on Chromium, add Firefox and WebKit projects restricted with \`grep\` to a \`@critical\` tag, and add one emulated mobile project. Tag two or three genuine critical journeys. Deliverable: the updated \`playwright.config.ts\`, the tagged tests, and a one-paragraph note justifying your matrix against your app’s actual user base.`,
      reflectionQuestion: `Your suite is green on Chromium and you have never run WebKit. A large share of your users are on iOS. What can you honestly claim about those users’ experience, and what have you simply not tested?`,
      knowledgeCheck: `Which rendering engine covers every browser on iOS, regardless of the browser’s branding? (Answer: WebKit — all iOS browsers are WebKit underneath)`,
      completionChecklist: [
        'I can configure chromium, firefox and webkit projects in playwright.config.ts',
        'I can add an emulated device project using a built-in device descriptor',
        'I can decide which tests are worth running on every browser and which are not',
      ],
      enhancements: {
        industryStory: `A team ran their whole suite on all three browsers on every push out of a belief that "more coverage is safer". Runs took twenty minutes, developers stopped waiting for them, and the cross-browser signal got ignored along with everything else. When they finally looked, almost none of the failures on Firefox and WebKit were real browser differences — they were the same flakes failing three times over. Cutting to full-Chromium-on-push plus a tagged critical subset on the other engines dropped the push run to four minutes and made the cross-browser failures, when they happened, worth reading.`,
        visualAid: {
          type: 'comparison',
          title: 'Where cross-browser budget is worth spending',
          headers: ['Area', 'Varies by browser?', 'Cross-browser worth it?'],
          rows: [
            ['Business logic / API calls', 'No — same engine-independent code', 'No — one browser is enough'],
            ['CSS layout & responsive design', 'Yes — engines lay out differently', 'Yes, especially WebKit'],
            ['Form controls & date pickers', 'Yes — native widgets differ', 'Yes'],
            ['Media playback & fonts', 'Yes — codec and rendering differences', 'Yes, where they matter to users'],
          ],
        },
        davidTip: `Set \`grep\` on a project, not \`grepInvert\` scattered through your tests, to build a cross-browser subset. Keeping the "what runs where" decision in the config means one place to read and change your matrix, instead of hunting for tags across hundreds of specs.`,
      },
    },
    {
      lessonNumber: 2,
      title: 'Parallel Execution',
      estimatedTime: '18 minute read',
      lessonOverview: `Playwright runs tests in parallel across worker processes by default, which is most of why it is fast. That speed only holds if your tests are genuinely independent. This lesson covers workers, the isolation Playwright gives you for free, and the discipline you must add yourself: no shared mutable state, and unique data per test.`,
      learningObjectives: [
        'Explain how Playwright workers and fullyParallel parallelise a run',
        'Describe the isolation Playwright provides per test and per worker',
        'Write parallel-safe tests with no shared mutable state and unique data',
      ],
      lessonNotes: `## Workers are separate processes
Playwright spreads your tests across several **worker processes**, each running tests independently on its own core. You control how many with \`workers\`:

~~~ts
export default defineConfig({
  workers: process.env.CI ? 4 : undefined, // undefined = half your CPU cores
  fullyParallel: true,
});
~~~

With \`fullyParallel: true\`, Playwright parallelises at the level of individual tests, not just files — so even the tests within one file can run at the same time across workers. This is where the speed comes from, and it is the default posture you should aim for.

## What Playwright isolates for you
Playwright gives you real isolation, and understanding its boundaries is the key to writing safe tests:

- **Each test gets a fresh \`BrowserContext\`** — a clean, incognito-like session with no cookies, no local storage, no shared login. One test cannot see another’s browser state.
- **Workers are separate OS processes** — they share no JavaScript memory. A module-level variable in one worker is invisible to another.

So within the browser, tests are already well isolated. What Playwright *cannot* isolate for you is everything outside the browser: your database, your test accounts, files on disk, a shared third-party sandbox. Two tests hitting the same database row at the same time will collide no matter how clean their browser contexts are.

## The two rules of parallel-safe tests
Everything about writing for parallelism reduces to two disciplines.

**No shared mutable state.** Tests must not depend on running in a particular order, and must not read or write a value another test might change at the same moment. A module-level counter, a hardcoded "the first test creates the user the second logs in as", a fixture that mutates a shared object — all of these break the instant two tests run concurrently. Each test must set up everything it needs and assume nothing another test did.

**Unique data per test.** If every test registers \`user@example.com\`, the second one to run hits a "already exists" error or clobbers the first. Generate unique data — a timestamp, a random suffix, a UUID — so no two tests contend for the same record:

~~~ts
const email = \`user-\${Date.now()}-\${Math.random().toString(36).slice(2)}@example.com\`;
~~~

## Flakiness is often just a parallelism bug
A test that passes alone and fails in the suite is rarely "flaky" in some mysterious way — it is usually a hidden dependency on shared state or a data collision, exposed the moment it runs alongside its neighbours. The fix is not a retry; it is making the test truly independent.

## A green parallel run must be a trustworthy one
Speed from parallelism is only worth having if the results still mean something. A suite that runs fast but goes red at random because tests collide teaches people to ignore it — which is worse than a slow suite they trust. Parallel-safety is not a nicety; it is what keeps a fast suite believable.

## Key takeaway
Playwright parallelises across worker processes and gives each test a fresh browser context, but isolation ends at the browser: write tests with no shared mutable state and unique data per test, because a fast suite that collides with itself is a fast way to lose everyone’s trust.`,
      workedExample: `The same registration test written to collide, then written to be parallel-safe:

~~~ts
import { test, expect } from '@playwright/test';

// Unsafe: every parallel run fights over the same email address.
test('register a new user (collides)', async ({ page }) => {
  await page.goto('/register');
  await page.getByLabel('Email').fill('newuser@example.com'); // shared — second run fails
  await page.getByLabel('Password').fill('S3cure!pass');
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page.getByText('Welcome')).toBeVisible();
});
~~~

Run that with four workers and two copies land on \`newuser@example.com\` at once; one wins, the other sees "email already registered", and the failure looks random. The fix is unique data generated inside the test:

~~~ts
import { test, expect } from '@playwright/test';

function uniqueEmail() {
  return \`user-\${Date.now()}-\${Math.random().toString(36).slice(2)}@example.com\`;
}

test('register a new user (parallel-safe)', async ({ page }) => {
  const email = uniqueEmail(); // unique per test run — no contention
  await page.goto('/register');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill('S3cure!pass');
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
});
~~~

Each run of the second test creates its own user, so any number of workers can run it at once without collision. Nothing is shared, nothing is assumed about order, and the data is unique — the three properties that make a test safe to parallelise.`,
      commonMistakes: `- A module-level variable (a counter, a "current user") that two workers read and write at once, producing random failures
- Tests that depend on order — "test 2 logs in as the user test 1 created" — which breaks the instant they run in parallel
- Reusing a fixed email, username or record ID across tests, so concurrent runs collide on the same data
- Reaching for \`retries\` to paper over a collision instead of removing the shared state that caused it`,
      realWorldTip: `On a delivery team, make "unique data per test" a reviewable habit, not a hope: a small helper that mints a unique email or record and is used everywhere is easier to enforce than a rule people forget. When a test passes locally but fails in CI, suspect parallelism first — run it with \`--workers=1\` and if it suddenly passes, you have a shared-state or data-collision bug, not a flaky test. Fix the isolation; do not add a retry.`,
      exercise: `Take a test that creates or modifies data and audit it for parallel-safety. Remove any dependency on other tests or on module-level state, and replace every fixed identifier with uniquely generated data. Then prove it: run it with \`--workers=4 --repeat-each=5\` and confirm it passes every time. Deliverable: the rewritten test plus the command output showing repeated concurrent runs all green.`,
      reflectionQuestion: `A test passes on its own and fails when the full suite runs. Before you reach for a retry, what are the two most likely causes, and how would you confirm which one it is?`,
      knowledgeCheck: `What does Playwright give each individual test to isolate its browser state? (Answer: a fresh BrowserContext — a clean, incognito-like session with no shared cookies or storage)`,
      completionChecklist: [
        'I can explain how workers and fullyParallel parallelise a run',
        'I can describe what Playwright isolates per test and what it does not',
        'I can write a parallel-safe test with no shared mutable state and unique data',
      ],
      enhancements: {
        badGood: {
          label: 'order-dependent vs self-contained',
          bad: `~~~ts
// Two tests coupled by shared state — safe only in serial, in this order.
let createdUserId: string;

test('creates a user', async ({ request }) => {
  const res = await request.post('/api/users', { data: { name: 'Sam' } });
  createdUserId = (await res.json()).id; // module-level, shared across workers
});

test('deletes the user', async ({ request }) => {
  await request.delete(\`/api/users/\${createdUserId}\`); // undefined in another worker
});
~~~`,
          good: `~~~ts
// Each test creates and cleans up its own data — no coupling, no order.
test('creates and deletes a user', async ({ request }) => {
  const res = await request.post('/api/users', {
    data: { name: \`Sam-\${Date.now()}-\${Math.random().toString(36).slice(2)}\` },
  });
  const { id } = await res.json();

  const check = await request.get(\`/api/users/\${id}\`);
  expect(check.ok()).toBeTruthy();

  await request.delete(\`/api/users/\${id}\`);
});
~~~`,
        },
        davidTip: `When you suspect a parallelism bug, \`--repeat-each=10 --workers=4\` is your best friend: it hammers the test concurrently and surfaces a collision that a single run hides. If it goes red under that and green at \`--workers=1\`, you have found a shared-state bug, not a flaky test — and the fix is isolation, never a retry.`,
        miniChallenge: `Deliberately introduce a shared module-level variable across two tests, run them with four workers and \`--repeat-each=5\`, and watch them fail intermittently. Then remove the shared state and watch the failures disappear. Seeing it fail on purpose builds the instinct to spot it in review.`,
      },
    },
    {
      lessonNumber: 3,
      title: 'Sharding a Suite',
      estimatedTime: '17 minute read',
      lessonOverview: `Parallel workers speed a suite up on one machine, but one machine has a ceiling. Sharding splits the suite across *several* machines or CI jobs that run at the same time, cutting wall-clock time far below what a single box can manage. This lesson covers \`--shard\`, wiring it into CI, and merging the reports back together.`,
      learningObjectives: [
        'Split a suite across machines with the --shard flag',
        'Wire sharding into a CI matrix so jobs run concurrently',
        'Merge sharded reports into a single result with blob reports',
      ],
      lessonNotes: `## Where workers stop and sharding starts
Workers parallelise across the cores of *one* machine. Once you have saturated those cores, the only way to go faster is to add more machines — and that is what sharding does. It divides the whole set of tests into equal slices and runs each slice on a separate machine, all at once.

The flag is \`--shard=<index>/<total>\`:

~~~bash
# Machine 1 runs the first quarter, machine 2 the second, and so on.
npx playwright test --shard=1/4
npx playwright test --shard=2/4
npx playwright test --shard=3/4
npx playwright test --shard=4/4
~~~

Each command runs a disjoint quarter of the suite. Four machines running one shard each finish in roughly a quarter of the wall-clock time — on top of the parallelism the workers already give you within each machine.

## Sharding in CI
In practice you never type those commands by hand — you express them as a **matrix** in your CI configuration and let the platform spin up the jobs. Each job gets its shard index from the matrix and runs its slice:

~~~yaml
strategy:
  matrix:
    shard: [1, 2, 3, 4]
steps:
  - run: npx playwright test --shard=\${{ matrix.shard }}/4
~~~

Four jobs start together, each owning a quarter of the tests. The total machine time is unchanged — you are still running every test once — but the *wall-clock* time, the thing developers actually wait for, drops sharply.

## Merging the reports
Sharding creates a problem: each machine produces its own partial report, and four separate reports are useless for seeing whether the whole suite passed. The answer is the **blob reporter**. Each shard writes a machine-readable blob, then a final job merges them into one coherent HTML report:

~~~ts
// playwright.config.ts — emit a blob report so shards can be merged.
export default defineConfig({
  reporter: process.env.CI ? 'blob' : 'html',
});
~~~

~~~bash
# A final job, after all shards finish, merges every blob into one report.
npx playwright merge-reports --reporter=html ./all-blob-reports
~~~

Now you have a single, unified report across all four shards — one place to see the whole suite’s result, as if it had run on one machine.

## Balance and honesty
Playwright splits shards to balance the number of tests, not their duration, so an uneven suite can leave one shard finishing long after the others. If one shard is consistently the slow one, that is where to look for a handful of heavy tests dragging the whole run. And remember: sharding changes *where* tests run, never *what* they prove. A green merged report across four shards means exactly what a green run on one machine would — no more, no less. Sharding buys speed, not extra confidence.

## Key takeaway
Sharding with \`--shard=index/total\` splits a suite across several machines or CI jobs to cut wall-clock time past a single machine’s ceiling; drive it from a CI matrix and merge the per-shard blob reports into one, remembering that sharding changes only how fast you get the result, not what the result proves.`,
      workedExample: `A complete four-way shard in CI with a merge step producing one report:

~~~yaml
# .github/workflows/e2e.yml
name: e2e
on: [push]

jobs:
  test:
    strategy:
      fail-fast: false          # let every shard finish so you see all failures
      matrix:
        shard: [1, 2, 3, 4]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --shard=\${{ matrix.shard }}/4
      - uses: actions/upload-artifact@v4
        if: \${{ !cancelled() }}
        with:
          name: blob-report-\${{ matrix.shard }}
          path: blob-report
          retention-days: 1

  merge:
    needs: [test]
    if: \${{ !cancelled() }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - uses: actions/download-artifact@v4
        with: { path: all-blob-reports, pattern: blob-report-* }
      - run: npx playwright merge-reports --reporter=html ./all-blob-reports
~~~

The \`test\` job runs four times in parallel, each shard executing a disjoint quarter of the suite and uploading its blob report as an artifact. The \`merge\` job waits for all four (\`needs: [test]\`), downloads every blob, and runs \`merge-reports\` to stitch them into a single HTML report. Two settings matter for trust: \`fail-fast: false\` stops one shard’s failure from cancelling the others so you see the *whole* picture, and \`if: !cancelled()\` ensures reports are gathered and merged even when some tests failed — because a failed run is exactly when you most need the report.`,
      commonMistakes: `- Sharding but never merging, leaving four partial reports and no single view of whether the suite passed
- Leaving \`fail-fast\` on its default, so one shard failing cancels the rest and hides the true set of failures
- Forgetting \`if: !cancelled()\` on the upload and merge steps, so reports vanish precisely when a run fails
- Adding shards to fix a suite that is slow because a few tests are heavy — throwing machines at a problem better solved by fixing those tests`,
      realWorldTip: `On a delivery team, reach for sharding only once you have wrung the easy speed out of a single machine — right \`workers\`, no needless waits, parallel-safe tests. Sharding costs real money (four machines instead of one) and adds a merge step to maintain, so it earns its place when wall-clock time is genuinely blocking developers, not as a first move. When you do shard, watch for one shard that is always the slow one: that is a signal a few heavy tests are the real bottleneck, and speeding them up may cut the whole run more cheaply than adding another shard.`,
      exercise: `Take a suite that runs on a single CI job and convert it to a four-way shard: add a matrix over shard indices, switch to the blob reporter in CI, upload each shard’s report as an artifact, and add a merge job that produces one HTML report. Deliverable: the CI config plus a before/after note on wall-clock time and a sentence on which shard, if any, is the slow one and why.`,
      reflectionQuestion: `You shard your suite four ways and the wall-clock time drops from twenty minutes to six. What has genuinely improved for the team, and what — in terms of what the suite proves about the product — is exactly the same as before?`,
      knowledgeCheck: `After running a suite as four shards on four machines, which Playwright command combines their partial reports into one? (Answer: npx playwright merge-reports, using the blob reports each shard emitted)`,
      completionChecklist: [
        'I can split a suite across machines with --shard=index/total',
        'I can drive sharding from a CI matrix so jobs run concurrently',
        'I can merge per-shard blob reports into one unified result',
      ],
      enhancements: {
        visualAid: {
          type: 'flow',
          title: 'A sharded run, end to end',
          steps: [
            { label: 'Split', detail: 'CI matrix launches N jobs, each with --shard=i/N.' },
            { label: 'Run in parallel', detail: 'Each shard runs its disjoint slice, with workers inside it.' },
            { label: 'Emit blobs', detail: 'Each shard writes a blob report and uploads it as an artifact.' },
            { label: 'Merge', detail: 'A final job downloads all blobs and runs merge-reports.' },
            { label: 'One result', detail: 'A single HTML report, as if the suite ran on one machine.' },
          ],
        },
        davidTip: `Keep the shard count in exactly one place if you can — a CI variable the matrix and the \`--shard\` flag both read — so bumping from four shards to eight is a one-line change, not a hunt for every hardcoded \`/4\`. Mismatched totals (a matrix of eight against \`--shard=n/4\`) silently run only half your tests, and a green report that quietly skipped half the suite is the worst kind of false confidence.`,
        miniChallenge: `Time your suite on one machine, then as two shards, then as four. Plot the wall-clock times and note where the curve flattens — the point where adding shards stops paying off because the merge overhead and the slowest single test dominate. That knee in the curve is your practical shard limit.`,
      },
    },
    {
      lessonNumber: 4,
      title: 'Keeping a Large Suite Fast',
      estimatedTime: '18 minute read',
      lessonOverview: `Parallelism and sharding buy speed by adding machines. This lesson is about the cheaper, more durable kind of speed: running fewer tests when you can, tagging so you can choose the right subset, and cutting the slow patterns that quietly bloat every run. A fast suite people wait for is worth more than a thorough one they route around.`,
      learningObjectives: [
        'Use tags like @smoke and @regression to run purposeful subsets',
        'Select which tests to run with --grep, --project and last-failed',
        'Identify and remove the slow patterns that bloat a suite’s run time',
      ],
      lessonNotes: `## The cheapest fast test is the one you did not run
Before adding machines, ask whether every test needs to run *this time*. A five-minute smoke set on every push and the full regression suite nightly is often far more useful than the whole suite on every push — because feedback in five minutes changes behaviour, and feedback in forty minutes gets ignored. Selective running is the first and cheapest speed lever, and it costs no extra hardware.

## Tags let you choose a purposeful subset
Tag tests by intent so you can run the right slice at the right moment. In modern Playwright, tags are first-class:

~~~ts
import { test, expect } from '@playwright/test';

test('user can log in', { tag: '@smoke' }, async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('known@example.com');
  await page.getByLabel('Password').fill('correct-horse');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});

test('login rejects a locked account', { tag: '@regression' }, async ({ page }) => {
  // ...deeper edge-case coverage that need not run on every push
});
~~~

Then select by tag:

~~~bash
npx playwright test --grep @smoke          # fast, run on every push
npx playwright test --grep @regression     # deeper, run nightly
npx playwright test --grep-invert @slow    # everything except the slow ones
~~~

- **@smoke** — a small set proving the critical paths work; fast enough to run on every push.
- **@regression** — the broad, deep coverage; run less often, on a schedule or before release.

The tags are a contract: \`@smoke\` must stay small and fast, or it stops being a smoke test.

## Other ways to run less
Beyond tags, Playwright gives you sharp selection tools:

- \`--grep\` / \`--grep-invert\` — by tag or title pattern.
- \`--project=chromium\` — one browser instead of the matrix.
- \`--last-failed\` — re-run only the tests that failed last time, invaluable while fixing.
- A path or file — \`npx playwright test tests/checkout\` — to run just the area you are working on.

## The slow patterns that bloat every run
The other half of "fast" is not doing slow things needlessly. The usual culprits:

- **Hard waits.** \`await page.waitForTimeout(3000)\` sleeps whether or not it needs to. Replace every one with a web-first assertion — \`await expect(locator).toBeVisible()\` — which waits only as long as necessary and no longer.
- **Logging in through the UI in every test.** Filling the login form hundreds of times adds up. Authenticate once and reuse the storage state (\`storageState\`) so most tests start already logged in.
- **Rebuilding the world per test.** Seeding a database or creating an account through slow UI flows when a single API call would set up the state instantly.
- **Over-broad cross-browser and re-testing logic on every engine** — covered in Lesson 1, and still one of the biggest sources of wasted time.

Each of these is invisible in one test and crushing across a thousand.

## Fast is a feature of a *trusted* suite
Speed is not vanity. A suite that returns a verdict in minutes gets run, watched and believed; a suite that takes forty minutes gets skipped, backgrounded and worked around, until its evidence stops informing anyone’s decisions. Keeping the suite fast is how you keep it *used* — and an unused test suite, however thorough, proves nothing about the product because nobody is looking at it.

## Key takeaway
Make a large suite fast by running fewer tests when you can — smoke on every push, regression on a schedule, \`--last-failed\` while fixing — and by cutting the slow patterns (hard waits, UI login everywhere, rebuilding state per test) that bloat every run; a fast suite is one people actually use, and an unused suite proves nothing.`,
      workedExample: `Setting up authentication once so hundreds of tests skip the login flow entirely:

~~~ts
// auth.setup.ts — runs once, saves an authenticated session to disk.
import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('known@example.com');
  await page.getByLabel('Password').fill('correct-horse');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await page.context().storageState({ path: authFile });
});
~~~

~~~ts
// playwright.config.ts — a setup project runs first, everything else reuses its state.
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    { name: 'setup', testMatch: /auth\\.setup\\.ts/ },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/user.json' },
      dependencies: ['setup'], // wait for auth, then start already logged in
    },
  ],
});
~~~

The \`setup\` project logs in once and writes the session to \`user.json\`; the \`chromium\` project declares it \`dependencies: ['setup']\` and loads that \`storageState\`, so every test in it begins authenticated without touching the login form. On a suite of five hundred tests that each used to log in through the UI, this alone can cut minutes off every run. Compare the slow pattern it replaces:

~~~ts
// Slow: every single test drives the login form from scratch.
test('view the dashboard', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('known@example.com');
  await page.getByLabel('Password').fill('correct-horse');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.goto('/dashboard'); // the actual test only starts here
  await expect(page.getByText('Recent activity')).toBeVisible();
});
~~~

With shared auth, that test opens directly on \`/dashboard\` already signed in, and the four setup lines vanish from every spec that carried them.`,
      commonMistakes: `- Running the whole suite on every push when a small \`@smoke\` set would give the same fast signal in a fraction of the time
- Letting \`@smoke\` grow until it is really a regression run wearing a smoke tag, so the fast lane is no longer fast
- Scattering \`waitForTimeout\` sleeps that add fixed dead time to every run whether the app is ready or not
- Logging in through the UI in every test instead of authenticating once and reusing the storage state`,
      realWorldTip: `On a delivery team, treat run time as a number you watch, not an accident you discover. Put the suite’s duration on the dashboard next to its pass rate, and when it creeps up, find out why — usually a few slow tests or a crept-in \`waitForTimeout\`, not a uniform bloat. Agree a budget ("smoke stays under five minutes") and defend it in review, because the erosion is gradual: no single test makes the suite slow, but unwatched, the sum quietly crosses the line where people stop waiting for it.`,
      exercise: `Profile a suite and make it meaningfully faster without dropping coverage. Tag a small \`@smoke\` subset, replace every \`waitForTimeout\` you find with a web-first assertion, and introduce a shared \`storageState\` so tests skip UI login. Deliverable: the \`@smoke\` command and its run time, a count of the hard waits you removed, and a before/after wall-clock time for the full suite.`,
      reflectionQuestion: `Your suite is thorough and green, but it takes forty minutes and developers have started merging without waiting for it. Is that suite doing its job? What would you change first, and why does speed decide the answer?`,
      knowledgeCheck: `Which Playwright flag re-runs only the tests that failed on the previous run, so you get tight feedback while fixing them? (Answer: --last-failed)`,
      completionChecklist: [
        'I can tag tests and run purposeful subsets like @smoke and @regression',
        'I can select tests with --grep, --project and --last-failed',
        'I can identify and remove slow patterns like hard waits and per-test UI login',
      ],
      enhancements: {
        badGood: {
          label: 'hard wait vs web-first assertion',
          bad: `~~~ts
// Sleeps a fixed three seconds every run, ready or not — dead time times a thousand tests.
await page.getByRole('button', { name: 'Save' }).click();
await page.waitForTimeout(3000);
await expect(page.getByText('Saved')).toBeVisible();
~~~`,
          good: `~~~ts
// Waits only until the confirmation actually appears — usually a fraction of a second.
await page.getByRole('button', { name: 'Save' }).click();
await expect(page.getByText('Saved')).toBeVisible();
~~~`,
        },
        davidTip: `Ask Playwright where the time goes before you optimise: the HTML report lists per-test durations, and a quick sort surfaces the handful of tests eating the run. Speeding up the slowest ten is almost always cheaper and more effective than shaving a little off everything, and you will often find one \`waitForTimeout\` or one UI-login pattern behind most of the cost.`,
        miniChallenge: `Grep your whole test directory for \`waitForTimeout\` and count the hits. Replace each with a web-first assertion on the thing the sleep was really waiting for, re-run the suite, and record how much wall-clock time those changes alone gave back.`,
      },
    },
    {
      lessonNumber: 5,
      title: 'Trust at Scale',
      estimatedTime: '19 minute read',
      lessonOverview: `A large suite lives or dies on whether people believe its verdict. One reliably flaky test that fails at random teaches the whole team to shrug at red — and once that habit sets in, a real failure gets shrugged at too. This closing lesson is about defending trust: quarantining flaky tests, monitoring the suite’s health, and refusing to let a big suite rot into noise people ignore.`,
      learningObjectives: [
        'Quarantine a flaky test so it stops eroding trust while it is fixed',
        'Monitor suite health with pass rate, flake rate and duration over time',
        'Keep a large suite trusted by treating flakiness as a defect, not a fact of life',
      ],
      lessonNotes: `## Flakiness is a trust problem, not a test problem
A flaky test — one that passes and fails without the code changing — does damage out of all proportion to its size. The moment a team learns that red does not reliably mean broken, they start ignoring red. And a team that ignores red will, sooner or later, ignore a real regression sitting in the same wall of noise. The cost of flakiness is not the failed run; it is the slow death of the suite’s authority. So flakiness is not a minor annoyance to retry away — it is the single biggest threat to a large suite’s value.

## Retries reveal flakiness; they do not fix it
Playwright’s \`retries\` re-run a failed test, and on CI a small number is reasonable — it stops one transient blip from failing a whole build. But be clear about what a retry is: a *measurement*, not a cure. A test that passes only on retry is flaky, and Playwright marks it exactly that in the report:

~~~ts
export default defineConfig({
  retries: process.env.CI ? 2 : 0, // absorb blips, but surface what needed retrying
});
~~~

Treat the flaky marker as a to-do list, not a success. If you let retries silently paper over flakiness, you are hiding the very signal that tells you a test needs fixing.

## Quarantine: contain the damage, keep the signal
When a test is flaky and you cannot fix it immediately, the wrong response is to leave it failing the build at random; the also-wrong response is to delete it and lose the coverage. The right response is to **quarantine** it — move it out of the blocking suite so it stops failing pull requests, but keep running it visibly so its coverage and its flakiness stay tracked. A simple tag does it:

~~~ts
test('report export completes', { tag: '@quarantine' }, async ({ page }) => {
  // known-flaky; runs but does not block, until fixed
});
~~~

~~~bash
npx playwright test --grep-invert @quarantine   # the blocking suite: no known flakes
npx playwright test --grep @quarantine           # the watch-list: run, but non-blocking
~~~

The blocking suite is now clean, so red there means something. The quarantine list is a visible, finite backlog — not a dumping ground. The discipline that makes this work is a rule: quarantine is temporary, every quarantined test has an owner and a ticket, and the list is not allowed to grow unbounded. A quarantine that fills up and is never emptied is just a slow way of deleting your coverage.

## Monitor the suite like a product
You cannot defend what you do not measure. A large suite needs a few health signals watched over time, not just glanced at per run:

- **Pass rate** — trending down means something is rotting.
- **Flake rate** — how many tests passed only on retry; the leading indicator of eroding trust.
- **Duration** — creeping up (Lesson 4) until people stop waiting.
- **Top flaky tests** — a ranked list so you fix the worst offenders first.

Playwright’s reports and CI history give you the raw data; the point is to look at the *trend*, because rot is gradual. A suite does not lose its credibility in a day — it loses it one ignored red at a time.

## The green light must mean something
Everything in this module — cross-browser choices, parallelism, sharding, speed — serves one end: a suite whose verdict a team can act on without second-guessing. That only holds if green reliably means "working" and red reliably means "broken". Flakiness attacks exactly that link. Defending it — by quarantining flakes, fixing them, and watching the trend — is not housekeeping; it is what makes the entire investment in automation worth anything. A large suite people trust is a powerful thing. A large suite people have learned to ignore is worse than no suite at all, because it costs money and effort while providing false comfort.

## Key takeaway
A large suite is only valuable while people trust its verdict, and flakiness is the thing that destroys that trust: treat a flaky test as a defect, quarantine it out of the blocking suite without losing its coverage, monitor pass rate, flake rate and duration as trends, and never let the suite rot into noise people have learned to ignore.`,
      workedExample: `A quarantine setup that keeps the blocking suite clean while the flaky test stays tracked:

~~~ts
// playwright.config.ts — two logical suites via projects, split by the @quarantine tag.
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  retries: process.env.CI ? 2 : 0,
  reporter: [['html'], ['list']],
  projects: [
    {
      name: 'blocking',                       // gates merges — must be clean
      use: { ...devices['Desktop Chrome'] },
      grepInvert: /@quarantine/,
    },
    {
      name: 'quarantine',                      // runs and reports, never blocks
      use: { ...devices['Desktop Chrome'] },
      grep: /@quarantine/,
    },
  ],
});
~~~

~~~ts
// A test caught being flaky is tagged and given an owner and a ticket in a comment.
import { test, expect } from '@playwright/test';

// QUARANTINED 2026-09-01 — owner: @ana — ticket: FLAKE-142
// Fails intermittently on the export polling; do not delete, fix and un-tag.
test('report export completes @quarantine', async ({ page }) => {
  await page.goto('/reports');
  await page.getByRole('button', { name: 'Export' }).click();
  await expect(page.getByText('Export ready')).toBeVisible();
});
~~~

In CI you run the \`blocking\` project as the gate on every pull request and the \`quarantine\` project as a separate, non-blocking job:

~~~bash
npx playwright test --project=blocking     # red here blocks the merge and means something
npx playwright test --project=quarantine   # red here is tracked, not blocking
~~~

The blocking suite no longer fails pull requests for a known flake, so its red regains its meaning. The quarantined test keeps running, keeps its coverage, and — because it carries an owner, a date and a ticket right there in the code — stays a visible item to fix rather than a silent hole. What makes this healthy rather than a graveyard is the rule around it: the list is reviewed, it is expected to shrink, and a test that sits quarantined for months is escalated, not forgotten.`,
      commonMistakes: `- Bumping \`retries\` until flaky tests go green on their own and calling the problem solved, when you have only hidden the signal
- Deleting a flaky test to make the build green, losing real coverage instead of fixing the flake
- Quarantining tests and never emptying the list, so quarantine becomes a permanent graveyard of abandoned coverage
- Watching only per-run pass/fail and never the trend, so gradual rot in flake rate and duration goes unnoticed until people already ignore the suite`,
      realWorldTip: `On a delivery team, make flakiness a first-class defect with a name, an owner and a place in the backlog — not a background grumble. When a test is quarantined, log a ticket the same day with who owns it and by when, and review the quarantine list in the team’s regular cadence so it stays small and moving. Watch the flake rate as a trend on the same board as the pass rate, because it is the early warning: flake rate rising is the sound of trust leaking, and it is far cheaper to fix ten flaky tests now than to rebuild a team’s belief in a suite they have already learned to ignore.`,
      exercise: `Set up a quarantine mechanism for a suite: add a \`@quarantine\` tag, split the config into a blocking project that excludes it and a non-blocking project that runs only it, and move one genuinely flaky (or deliberately made flaky) test into quarantine with an owner and a ticket reference in a comment. Then write down the three health signals you would monitor and where they would be displayed. Deliverable: the config, the quarantined test with its metadata, and a short note on your monitoring and your rule for keeping the quarantine list from growing.`,
      reflectionQuestion: `Your team has started merging on red because "it’s probably just the flaky ones". What has actually been lost, and why is quarantining the flakes more valuable than simply adding another retry to make the red go away?`,
      knowledgeCheck: `Why is raising \`retries\` until flaky tests pass not a real fix for flakiness? (Answer: a retry hides the signal rather than removing the cause — the test is still flaky, you have just stopped seeing it, so the underlying defect and the trust problem remain)`,
      completionChecklist: [
        'I can quarantine a flaky test out of the blocking suite without losing its coverage',
        'I can name the health signals — pass rate, flake rate, duration — worth monitoring as trends',
        'I treat flakiness as a defect to fix, not a fact of life to retry around',
      ],
      enhancements: {
        industryStory: `A team let their retry count creep up whenever a test got flaky — two retries, then three — until almost nothing ever failed the build on the first try. The suite was reliably green, and slowly, entirely useless: real regressions passed on retry alongside the flakes, and nobody could tell the difference. When a genuine bug finally shipped through a green pipeline, they rebuilt trust the hard way — dropped retries back to two, quarantined every test that needed a retry to pass, and gave each one an owner and a deadline. The quarantine list started long and shrank every week, and within a month a red build meant something again. The lesson they drew: retries measure flakiness, they do not fix it, and a suite that never fails is not necessarily a suite that works.`,
        visualAid: {
          type: 'comparison',
          title: 'Responses to a flaky test, ranked',
          headers: ['Response', 'Keeps coverage?', 'Keeps the suite trusted?'],
          rows: [
            ['Fix the root cause', 'Yes', 'Yes — the ideal outcome'],
            ['Quarantine with owner + ticket', 'Yes', 'Yes — blocking suite stays clean'],
            ['Just add more retries', 'Yes', 'No — hides the signal, rot continues'],
            ['Delete the test', 'No', 'Short term yes, but coverage is gone'],
            ['Leave it failing at random', 'Yes', 'No — trains the team to ignore red'],
          ],
        },
        davidTip: `Put flake rate on the wall next to pass rate. Pass rate tells you today’s result; flake rate tells you whether people are about to stop believing it. When flake rate starts climbing, you have a narrow window to act before "it’s probably just a flaky one" becomes the team’s default reaction to every red — and once that habit forms, it is far harder to reverse than any individual flaky test is to fix.`,
        miniChallenge: `Audit your last month of CI runs and build a ranked list of the tests that most often passed only on retry. Those are your top flakes. Pick the worst one, find why it is non-deterministic (timing, shared data, order), and fix it properly — then check whether your overall flake rate visibly drops. Fixing the worst offender usually moves the number more than you expect.`,
      },
    },
  ],
};
