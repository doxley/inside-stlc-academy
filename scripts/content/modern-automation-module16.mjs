// Modern Test Automation Bootcamp — Module 16: Production-Style Automation Capstone.
// The capstone. This module does not teach new Playwright syntax — the learner has
// it already. It GUIDES them to independently build a complete, production-style
// Playwright + TypeScript automation repository as portfolio evidence, and to
// document and present it honestly. Throughout: a green suite is not the goal; the
// repo must give timely, useful evidence about product quality and risk, and be
// defensible in an interview without overclaiming.
export default {
  courseSlug: 'modern-test-automation-bootcamp',
  moduleNumber: 16,
  lessonsPrefix: 'modern-automation',
  enhPrefix: 'modern-automation',
  enhSep: '-',
  lessons: [
    {
      lessonNumber: 1,
      title: 'The Capstone Brief',
      estimatedTime: '18 minute read',
      lessonOverview: `This is the brief for the piece of work that ties the whole course together: a complete, production-style Playwright + TypeScript automation repository for a realistic application, built by you, from scratch. This lesson lays out exactly what "complete" means so you know the target before you write a line.`,
      learningObjectives: [
        'State what a production-style automation repository must contain end to end',
        'Read the full capstone requirements checklist and understand why each item earns its place',
        'Choose a realistic application to automate that is rich enough to show the full checklist',
      ],
      lessonNotes: `## What you are building
By now you have learned the pieces: locators, fixtures, the Page Object and component patterns, API testing, authentication and storage state, test data, configuration, projects, tagging, CI and reporting. The capstone asks you to assemble all of it into one coherent repository that looks and behaves like something a real delivery team would own.

The point is not to prove you can make tests go green. Green is easy and, on its own, means nothing. The point is to produce evidence: a repository a reviewer can open and, within a few minutes, understand what is tested, why, at which level, with what trade-offs — and trust that the green is meaningful.

## Pick a realistic target
Choose an application with enough surface to exercise the whole checklist:

- A public demo or sandbox app (many exist specifically for practice), or
- A small app you build or already have, or
- A realistic open API plus a UI that consumes it.

It must have a login, some data that changes, at least one meaningful workflow (create something, edit it, see it reflected), and an API you can reach directly. A single static page is not enough — you cannot show authentication, data strategy or API automation against it.

## The full requirements checklist
Your finished repository must demonstrate all of the following. Treat this as the definition of done for the capstone:

- **UI automation** — role-based, web-first tests covering the app's key user journeys.
- **API automation** — direct requests to the backend, both as coverage in their own right and as fast setup for UI tests.
- **Reusable fixtures and components** — custom fixtures and Page Object / component classes so tests read as intent, not mechanics.
- **Authentication and state handling** — a login solved once (storage state), reused across tests, with the strategy documented.
- **Test-data strategy** — deliberate choices about how data is created, isolated and cleaned up; no reliance on hand-made records that rot.
- **Environment configuration** — \`baseURL\`, credentials and secrets driven by config and environment variables, never hardcoded.
- **Browser projects** — a sensible \`projects\` setup (e.g. chromium plus one more, and a setup project for auth).
- **Smoke and regression tagging** — tags so a fast smoke subset and the full regression run can be selected independently.
- **CI/CD workflow** — a pipeline that installs, runs the suite (smoke on every push, fuller run on a schedule or before release) and publishes results.
- **Reporting** — the HTML report plus a CI-friendly reporter, with traces on failure.
- **README** — how to install, configure and run it, written for someone who has never seen the repo.
- **Automation strategy document** — a short written account of what you automate, at which level, and why.
- **Risk and coverage decisions** — an explicit statement of what you prioritised and what you deliberately left out.
- **Limitations** — an honest list of what this suite does not prove.
- **AI-usage declaration** — a truthful note on where and how you used AI assistance while building it.

## Why the writing matters as much as the code
Four of those items are prose, not tests. That is deliberate. Anyone can generate tests; a senior engineer can explain the *shape* of their coverage, defend the trade-offs, and be honest about the gaps. In an interview it is the strategy, the risk decisions and the limitations that separate a portfolio repo from a folder of scripts.

## Key takeaway
The capstone is one coherent, production-style Playwright + TypeScript repository against a realistic app, and it is "done" only when it meets the full checklist — automation at both UI and API level, reusable structure, auth, data, config, projects, tagging, CI and reporting, plus the written strategy, risk decisions, limitations and AI declaration that make the green trustworthy.`,
      workedExample: `The checklist is easiest to hold in your head as the folder tree it implies. This is roughly what a finished capstone repo looks like — a target to build towards, not a template to copy blindly:

~~~text
capstone-automation/
  .github/
    workflows/
      ci.yml                 # smoke on push, regression on schedule
  playwright.config.ts        # baseURL, projects, reporters, env-driven
  package.json
  .env.example                # documents required vars, holds no secrets
  README.md                   # install, configure, run
  docs/
    automation-strategy.md    # what/where/why, risk, limitations, AI note
  tests/
    ui/
      auth.spec.ts
      checkout.spec.ts
    api/
      orders.spec.ts
    smoke/
      critical-path.spec.ts   # @smoke tagged
  src/
    fixtures/
      test-fixtures.ts        # custom fixtures compose here
    pages/
      login.page.ts
      dashboard.page.ts
    components/
      nav.component.ts
    data/
      user-factory.ts         # builds test data deterministically
  auth/
    .gitignore                # storageState lives here, never committed
  playwright/.auth/           # generated storage state (git-ignored)
~~~

Notice what this tree tells a reviewer before they read any test: there is API coverage as well as UI, structure is separated from specs, data is built by a factory rather than hardcoded, secrets are documented but not committed, and the strategy lives in writing next to the code. The tree itself is a claim about how you think — which is exactly what a portfolio piece is for.`,
      commonMistakes: `- Choosing an app so simple (a single static page) that half the checklist cannot be shown against it
- Reading the checklist as fourteen boxes to tick rather than one coherent system that should hang together
- Treating the four written deliverables as optional extras rather than half of what makes the repo senior-level
- Planning to make everything green and calling that "done", with no statement of what the green does and does not prove`,
      realWorldTip: `On a delivery team this brief is essentially the shape of a real automation foundation: someone joins, is handed an app, and is expected to stand up trustworthy coverage plus the documents that let the rest of the team understand and maintain it. Hiring managers know this, which is why a capstone that mirrors it reads as job-ready. Pick a target you genuinely find interesting — you will live with it for the length of the build, and quiet enthusiasm shows in the quality of the decisions.`,
      exercise: `Choose the application you will automate for the whole capstone and write a one-page scoping note. State: the app and why it is rich enough, the main user journeys you will cover, where its API lives, and how you will get test credentials or accounts. Then copy the fourteen-item checklist above and, for each item, write one sentence on how this specific app will let you demonstrate it. Deliverable: the scoping note plus the annotated checklist.`,
      reflectionQuestion: `Of the fourteen checklist items, which one will be hardest to show well against the app you have chosen, and does that tell you anything about whether it is the right target?`,
      knowledgeCheck: `Four of the capstone deliverables are prose rather than tests. Name them and say why they matter as much as the code. (Answer: the README, the automation strategy document, the risk/coverage decisions and the limitations — plus the AI-usage declaration; they matter because anyone can generate green tests, but explaining the shape of coverage, defending the trade-offs and being honest about the gaps is what makes the repo senior-level and defensible in an interview.)`,
      completionChecklist: [
        'I can list what a production-style automation repository must contain end to end',
        'I have chosen a realistic target app rich enough to exercise the full checklist',
        'I understand that the written deliverables carry as much weight as the tests',
      ],
      enhancements: {
        industryStory: `Consider a team hiring a senior automation engineer who asked every shortlisted candidate for a link to a repo. Most sent folders of passing Playwright tests against a demo site. One sent a smaller repo with fewer tests but a two-page strategy document explaining what was covered at UI versus API level, which risks were prioritised, and a blunt list of what the suite did not prove. That candidate was the one the team could actually talk to in the interview, because there was something to discuss beyond "the tests pass". The lesson generalises: reviewers buy judgement, and judgement only shows when you write it down.`,
        davidTip: `Do not start coding on day one. Spend the first session just using the app you chose as a real user would, taking notes on its journeys, its data, and where it feels fragile. That exploration is what turns a generic test suite into one that clearly understands the product — and it is the raw material for your strategy document.`,
      },
    },
    {
      lessonNumber: 2,
      title: 'Designing Your Framework & Strategy',
      estimatedTime: '20 minute read',
      lessonOverview: `Before you write tests you make decisions: what to automate, at which level, what to prioritise, what to leave out, and how the repository is shaped. This lesson is about writing the strategy first, so the code that follows is the consequence of choices you can defend rather than an accretion of whatever was easy to test.`,
      learningObjectives: [
        'Decide what to cover at UI level and what belongs at API level, and why',
        'Make explicit risk and coverage choices, including deliberate exclusions',
        'Design a folder structure and tagging scheme before writing tests',
      ],
      lessonNotes: `## Strategy is a document, written first
The single habit that separates a portfolio repo from a pile of scripts is writing the strategy before the tests. It need not be long — a page or two — but it forces the decisions that otherwise get made accidentally, one convenient test at a time. Write it in \`docs/automation-strategy.md\` and let it drive everything that follows.

## Choose the level for each thing you cover
The most important design decision is what to test at which level. A rough guide:

- **API level** — business rules, data validation, error handling, and anything you would otherwise set up slowly through the UI. API tests are fast, stable and precise. Push coverage down here wherever the logic lives in the backend.
- **UI level** — the things only the UI can prove: that a user can actually complete a journey, that the right data reaches the screen, that the interface holds together. Keep UI tests focused on journeys, not on re-verifying every backend rule through a browser.
- **Setup via API, assert via UI** — the strongest pattern. Create the state you need with a fast API call, then drive only the UI step you actually care about. This keeps UI tests short and about one thing.

If you find yourself testing the same rule fifteen times through the UI, that is a signal it belongs in an API test with one UI test to confirm the wiring.

## Make risk decisions, and write down the exclusions
You cannot automate everything, and pretending you did is a red flag, not a strength. Decide deliberately:

- What is highest risk — usually money, auth, data loss, anything a user cannot recover from? That gets the most coverage and the most real (least mocked) coverage.
- What is low risk or low change — cover it lightly or not at all.
- What are you explicitly *not* covering in this capstone — and why? A named exclusion ("no visual regression; no cross-browser beyond chromium and webkit; no performance testing") reads as judgement. An unnamed gap reads as an oversight.

## Shape the repository before you fill it
Decide the structure up front so tests have a home:

- Separate structure (\`src/pages\`, \`src/components\`, \`src/fixtures\`, \`src/data\`) from specs (\`tests/\`).
- Split specs by level (\`tests/ui\`, \`tests/api\`) and pull a smoke subset out by tag rather than by folder.
- Decide your tagging scheme now: \`@smoke\` for the fast critical-path subset, \`@regression\` (or untagged) for the full run, and any others you genuinely need. Fewer tags, used consistently, beat a taxonomy nobody follows.

## The green-means-something clause
Your strategy should say, in one line, what a passing run of this suite actually claims. "A green smoke run means a user can log in, reach the dashboard and complete the core purchase journey against a real backend" is a claim you can stand behind. "Everything works" is not. Writing that sentence forces honesty about coverage before anyone is depending on it.

## Key takeaway
Design the framework and strategy on paper first: choose the level for each thing you cover, make risk and exclusion decisions explicitly, fix the folder structure and a small tagging scheme, and state in one sentence what a green run actually proves — so the code you write next is the consequence of defensible choices rather than of whatever was easy.`,
      workedExample: `A strategy document does not need to be elaborate. This outline is enough to drive the whole build, and it is exactly the artefact a reviewer will read first:

~~~text
# Automation strategy — <app name>

## Scope
The core journeys covered and the ones consciously excluded.

## Levels — what runs where, and why
- API: business rules, validation, error paths, and setup for UI tests.
- UI: end-to-end journeys a user must be able to complete.
- Pattern: create state via API, assert the one step that matters via UI.

## Risk priorities
- Highest: auth, payment, anything unrecoverable — most and least-mocked coverage.
- Lower: static content, rarely-changed screens — light or no coverage.

## Deliberate exclusions
- No visual regression (out of scope for this capstone).
- No cross-browser beyond chromium + webkit.
- Third parties stubbed in the fast suite; real coverage nightly only.

## Tagging
- @smoke: critical path, runs on every push, target < 2 minutes.
- Full regression: everything, runs on schedule and before release.

## What a green run claims
"A green smoke run proves a user can log in, reach the dashboard and complete
the core order journey against a real backend. It does not prove <named gaps>."
~~~

And the levels decision made concrete — the "set up via API, assert via UI" pattern that keeps journey tests short:

~~~ts
import { test, expect } from '../src/fixtures/test-fixtures';

// The business rule (an order must have at least one line item) is covered by a
// fast API test elsewhere. Here we prove only the UI journey, and we build the
// starting state with an API call rather than clicking through creation.
test('user sees a newly placed order in their history @smoke', async ({ page, api }) => {
  const order = await api.createOrder({ items: [{ sku: 'BOOK-1', qty: 1 }] });

  await page.goto('/account/orders');
  await expect(page.getByRole('row', { name: new RegExp(order.reference) })).toBeVisible();
});
~~~

The API fixture does the slow setup; the UI test asserts exactly one thing — that the order reaches the history screen. The strategy document is why this test is shaped that way, and the shape is what makes the suite fast and readable.`,
      commonMistakes: `- Writing tests first and reverse-engineering a "strategy" afterwards to match whatever you happened to build
- Re-verifying every backend rule through the UI, producing a slow, brittle suite that an API test would cover in a fraction of the time
- Leaving exclusions unstated, so genuine scope decisions look like things you forgot
- Inventing an elaborate tag taxonomy on day one that nobody, including you, applies consistently`,
      realWorldTip: `On a delivery team the strategy document is the thing you actually get challenged on. A tech lead rarely audits every locator; they ask "why is this at UI level?", "what did you decide not to cover?", "what does a green pipeline let us claim to stakeholders?". Practising those answers on your capstone is practising the conversation that gets you hired and, later, trusted with the real test architecture. Write the document as if that lead is going to read it, because in an interview someone will.`,
      exercise: `Write the first draft of \`docs/automation-strategy.md\` for your chosen app before writing any tests. Cover: scope, the level (UI/API) for each area and why, risk priorities, at least three deliberate exclusions with reasons, your tagging scheme, and the one-sentence statement of what a green run claims. Then sketch your folder structure. Deliverable: the strategy draft plus the folder tree.`,
      reflectionQuestion: `Look at your levels decisions. Is there anything you have put at UI level only because it was the first way that came to mind, that would be faster, more stable and just as meaningful as an API test?`,
      knowledgeCheck: `What is the "set up via API, assert via UI" pattern, and why does it produce better UI tests? (Answer: create the state a test needs with a fast API call, then drive and assert only the single UI step you care about; it keeps UI tests short, fast and focused on one thing instead of clicking slowly through setup that the API can do instantly and reliably.)`,
      completionChecklist: [
        'I can decide what to cover at UI versus API level and justify each choice',
        'I have written explicit risk priorities and deliberate exclusions',
        'I have designed my folder structure and a small, consistent tagging scheme before coding',
      ],
      enhancements: {
        badGood: {
          label: 'strategy after the fact vs strategy first',
          bad: `~~~text
Approach: open the editor, start writing UI tests for whatever screen is open,
add more when a bug is found, and at the end write a "strategy" that describes
the pile that resulted. Every rule is checked through the browser because that
was the first tool to hand. Nobody can say what a green run proves.
~~~`,
          good: `~~~text
Approach: write docs/automation-strategy.md first. Decide payment and auth are
highest risk and get real UI coverage; validation rules go to fast API tests;
UI tests set up state via API and assert one journey step each. Exclusions are
named. A green smoke run has a written, defensible claim. Then the code follows.
~~~`,
        },
        davidTip: `When you are unsure whether something belongs at UI or API level, ask what would break if you got it wrong. If a broken backend rule shows up as a wrong number on a screen, an API test finds it faster and tells you exactly where. Reserve the UI test for "can a human actually get through this journey" — that is the thing only a UI test can prove.`,
        visualAid: {
          type: 'comparison',
          title: 'Choosing the level for a piece of coverage',
          headers: ['What you are checking', 'Best level', 'Why'],
          rows: [
            ['A backend validation or business rule', 'API', 'Fast, precise, stable; points straight at the logic'],
            ['A user can complete a journey', 'UI', 'Only a real browser journey proves this'],
            ['State needed before a UI assertion', 'API setup', 'Instant and reliable versus slow clicking'],
            ['Error and edge-case handling', 'API (mostly)', 'Cheap to trigger every branch directly'],
          ],
        },
      },
    },
    {
      lessonNumber: 3,
      title: 'Building & Integrating',
      estimatedTime: '20 minute read',
      lessonOverview: `With the strategy written, you build — and the skill on show here is integration: making UI tests, API tests, fixtures, authentication, test data, configuration, CI and reporting work together as one system rather than as parts that each happen to run. This lesson gives a sensible build order and the judgement to stop before you over-engineer.`,
      learningObjectives: [
        'Follow a build order that gets a thin end-to-end slice working before breadth',
        'Integrate fixtures, auth, data, config, projects, CI and reporting into one coherent repo',
        'Recognise and resist over-engineering — build the structure the tests actually need',
      ],
      lessonNotes: `## Build a thin slice first, then widen
Do not build all the fixtures, then all the pages, then all the tests. Build one complete vertical slice end to end — config, one page object, auth, one UI test, one API test, running in CI — and prove it green before you widen. A thin slice that runs in the pipeline flushes out the integration problems (auth, environment, secrets in CI) while they are cheap to fix. Breadth added onto a working slice is easy; breadth added before anything runs end to end is where capstones stall.

## A sensible build order
1. **Config and one environment** — \`playwright.config.ts\` with an env-driven \`baseURL\` and a single browser project. Get one trivial test running locally.
2. **Authentication once** — a setup project that logs in and saves storage state, reused by everything else. Solve this early; it touches every other test.
3. **One page object and one real UI test** — prove the fixture/page pattern against a genuine journey.
4. **The API layer** — a request fixture and one API test, then use it for setup in the UI slice.
5. **Test data** — a small factory that builds the data your tests need deterministically, with a cleanup story.
6. **Projects and tagging** — add a second browser project and your \`@smoke\` tag once there is something to tag.
7. **CI and reporting** — wire the pipeline: install, run smoke on push, publish the HTML report and traces on failure.
8. **Widen** — only now add the rest of the coverage the strategy calls for.

## Integrate through fixtures, not copy-paste
The seam that holds the repo together is the custom fixture. Compose auth, the API client, page objects and data helpers so a test declares what it needs and receives it ready to use. This is what makes the integration real rather than a set of independent files:

- The auth setup produces storage state; the config points every project at it.
- The API fixture is available to both API specs and UI specs (for setup).
- Page objects and data factories are injected the same way, so tests read as intent.

When these are wired through one \`test-fixtures.ts\`, adding a new test is declaring dependencies, not re-plumbing.

## Config and secrets, done properly
Nothing hardcoded. \`baseURL\`, credentials and any keys come from environment variables, documented in \`.env.example\` and supplied in CI as secrets. Storage state and \`.env\` are git-ignored. This is not polish — a reviewer checks it immediately, because a repo with a committed password is a repo they cannot trust with anything.

## Do not over-engineer
The opposite failure is building a framework grander than the tests justify: a five-layer abstraction, a bespoke config system, a base-page hierarchy nobody needed, for a suite of thirty tests. Over-engineering reads as inexperience, not sophistication. Build the smallest structure that keeps the tests readable and DRY, and let it grow when a real second use appears. If an abstraction has exactly one caller, it is probably premature.

## Green is a checkpoint, not the destination
As the slice comes together it will go green — and that is the moment to ask the module's recurring question: does this green mean anything? A UI test that navigates and asserts a heading is visible but never checks the data is a green light with nothing behind it. Every test you integrate should make a claim you would be comfortable defending, not just exercise a path.

## Key takeaway
Build a thin end-to-end slice first — config, auth, one page object, one UI and one API test, running in CI — then widen; integrate the pieces through composed fixtures rather than copy-paste; keep config and secrets environment-driven and git-ignored; and resist over-engineering, because the aim is a coherent, trustworthy system, not the most elaborate framework you can construct.`,
      workedExample: `The integration seam is the composed fixture. This is roughly what \`src/fixtures/test-fixtures.ts\` looks like when auth, the API client, a page object and a data factory are wired into one \`test\` object:

~~~ts
import { test as base, expect } from '@playwright/test';
import { ApiClient } from '../api/api-client';
import { LoginPage } from '../pages/login.page';
import { UserFactory } from '../data/user-factory';

type Fixtures = {
  api: ApiClient;
  loginPage: LoginPage;
  users: UserFactory;
};

export const test = base.extend<Fixtures>({
  // A ready-to-use API client, authenticated from env-driven config.
  api: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({
      baseURL: process.env.API_BASE_URL,
      extraHTTPHeaders: { Authorization: \`Bearer \${process.env.API_TOKEN}\` },
    });
    await use(new ApiClient(context));
    await context.dispose();
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  // Data built deterministically; the factory owns creation and cleanup.
  users: async ({ api }, use) => {
    const factory = new UserFactory(api);
    await use(factory);
    await factory.cleanup();
  },
});

export { expect };
~~~

Because auth is solved once in a setup project and stored as state, the config wires every project to reuse it:

~~~ts
// playwright.config.ts (excerpt)
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: { baseURL: process.env.BASE_URL, trace: 'on-first-retry' },
  reporter: [['html', { open: 'never' }], ['github'], ['list']],
  projects: [
    { name: 'setup', testMatch: /auth\\.setup\\.ts/ },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/user.json' },
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], storageState: 'playwright/.auth/user.json' },
      dependencies: ['setup'],
    },
  ],
});
~~~

A test then declares only what it needs — \`{ page, api, users }\` — and receives an authenticated browser, a working API client and a data factory that cleans up after itself. Nothing is re-plumbed per test, secrets come from the environment, and the report and traces are configured once. That is what "integrated" means: the pieces know about each other through one seam, not through copy-paste.`,
      commonMistakes: `- Building every fixture, page and helper before a single test runs end to end in CI, so integration problems surface late and all at once
- Solving authentication last, after dozens of tests already assume a logged-in state that does not exist yet
- Hardcoding \`baseURL\`, credentials or tokens, or committing storage state and \`.env\` — an instant loss of a reviewer's trust
- Over-engineering: deep base-class hierarchies and bespoke frameworks for a suite that would be clearer with far less
- Integrating tests that go green without asserting anything meaningful, mistaking a passing path for evidence`,
      realWorldTip: `On a delivery team the person who gets a thin slice running in CI on day two is worth more than the one who spends two weeks on a beautiful framework that has never executed in the pipeline. Real integration pain — auth in CI, secrets, environment differences — only appears when the thing actually runs somewhere other than your laptop, so get it running somewhere else early. And when a teammate reads your repo, the composed fixture is the first thing that tells them whether the codebase will be pleasant or painful to add to; make that seam clean and the rest is forgiven.`,
      exercise: `Build the thin end-to-end slice for your capstone: env-driven config, a setup project that logs in and saves storage state, one page object, one meaningful UI test and one API test, all wired through a single \`test-fixtures.ts\` and running green in a CI workflow. Confirm no secret or storage-state file is committed. Deliverable: the running slice (config, fixtures, the two specs, the CI workflow) with a note of one integration problem CI surfaced that local runs did not.`,
      reflectionQuestion: `Look at your repository so far for the opposite failure modes. Is there an abstraction with only one caller that you built too early — and is there any place a real integration risk is still hidden because that part has only ever run on your machine?`,
      knowledgeCheck: `Why build a thin end-to-end slice running in CI before widening coverage? (Answer: because integration problems — authentication in CI, secrets, environment differences — only appear when the suite actually runs in the pipeline, and surfacing them against one slice while they are cheap to fix is far easier than discovering them across a broad suite built before anything ran end to end.)`,
      completionChecklist: [
        'I can get a thin slice running end to end in CI before adding breadth',
        'I can integrate auth, API, fixtures, data, config and reporting through one composed seam',
        'I can tell when I am over-engineering and build only the structure the tests need',
      ],
      enhancements: {
        industryStory: `Consider two engineers given the same capstone. One spent a week building an elegant base-page hierarchy, a custom config loader and a plugin system — none of which had run in CI by the deadline, and half of which had a single caller. The other had a plainer repo: one composed fixture, a setup project for auth, thirty focused tests, and a green pipeline from day three. In review, the second repo was the one people wanted to extend, because everything in it earned its place and it demonstrably worked where it would actually run. Sophistication is building exactly what the tests need and no more.`,
        davidTip: `Get authentication working end to end before you write your second test. It touches everything — every UI test assumes a session, the config wires storage state into every project, and CI has to log in without a human. Solving it early makes the rest of the build a straight line; solving it late means retrofitting a session into tests that already assumed one.`,
        miniChallenge: `Once your slice is green in CI, deliberately break authentication (revoke the test token or point \`BASE_URL\` at the wrong environment) and watch how the pipeline fails. A good failure names the problem clearly in the report and trace; if yours is a cryptic timeout, improve the setup project's error handling so future-you is not debugging blind.`,
      },
    },
    {
      lessonNumber: 4,
      title: 'Documenting & Presenting Your Work',
      estimatedTime: '19 minute read',
      lessonOverview: `A repository nobody can understand is not portfolio evidence. This closing lesson is about the writing that makes the code defensible: a README that lets a stranger run it, a strategy document that explains the coverage, an honest statement of limitations, and a truthful AI-usage declaration — presented in a way that is credible in an interview without ever claiming experience you do not have.`,
      learningObjectives: [
        'Write a README that lets someone who has never seen the repo install, configure and run it',
        'Present the strategy, risk decisions and limitations so the repo is defensible in an interview',
        'Write an honest AI-usage declaration and avoid overclaiming commercial experience',
      ],
      lessonNotes: `## The README is the front door
A reviewer's first action is to try to run your repo. If they cannot, in a few minutes, from the README alone, the quality of the tests is irrelevant — they never reach them. A good README for an automation repo covers, briefly:

- **What this is** — one paragraph: the app, and what the suite covers at a glance.
- **Prerequisites** — Node version, \`npm install\`, \`npx playwright install\`.
- **Configuration** — the environment variables required, pointing at \`.env.example\`, and how to get test credentials.
- **How to run** — the smoke run, the full run, a single test, the UI mode, and how to open the report.
- **How it is structured** — a few lines mapping the folders, linking to the strategy document.
- **CI** — what runs when, and where to find results.

Write it for a competent stranger, not for yourself. The test is whether a peer could clone it cold and get a green smoke run without asking you anything.

## The strategy document earns the interview
You drafted \`docs/automation-strategy.md\` in Lesson 2; now finish it as the centrepiece of your presentation. It is what turns "here are some tests" into "here is how I think about testing this product". Make sure it states, clearly: what you cover at UI versus API level and why, your risk priorities, your deliberate exclusions, and the one-sentence claim a green run makes. This is the document an interviewer will point at and say "walk me through this decision" — so every decision in it should be one you can defend out loud.

## Limitations, stated honestly
A section that says plainly what this suite does *not* prove is a strength, not a confession. It shows you understand coverage as a set of trade-offs rather than a wall of green. Be specific:

- No performance or load testing.
- No accessibility audit beyond role-based locators.
- Third parties stubbed in the fast suite; contract changes only caught nightly.
- Runs against the staging environment; production config not exercised.

An engineer who names their gaps is far more trustworthy than one who implies there are none. This is the same principle the whole course rests on: a green suite gives useful evidence about quality and risk, and being clear about what it does not cover is part of giving that evidence honestly.

## The AI-usage declaration
Modern work uses AI assistance, and hiding it is both dishonest and easy to catch. Declare it plainly and specifically — where it helped, where you drove:

- What you used AI for (scaffolding, a first draft of a page object, explaining an error).
- What you reviewed, corrected or rewrote — and what you understand well enough to defend.
- What you deliberately did not delegate (the strategy, the risk decisions, the judgement).

A specific, honest declaration reads as maturity. A vague "no AI was used" that a single question unravels is far worse than the honest version.

## Present without overclaiming
This is a capstone project, and it should be presented as exactly that — evidence of skill built through study and independent practice. Do not dress it up as commercial delivery. Concretely:

- Describe it as a personal or capstone project, not as "work delivered for a client" or "production experience".
- Do not invent a team, a company, tickets, or years of use it never had.
- Frame it as "I built this to demonstrate X", which is both true and, to a good interviewer, more impressive than a hollow claim they can puncture in one question.

Skill demonstrated honestly is genuinely persuasive. A borrowed job history is not, and the moment it collapses under a follow-up question it takes the rest of your credibility with it. Let the work speak for what it actually is.

## Key takeaway
Documentation is what turns a working repository into defensible portfolio evidence: a README a stranger can run from, a strategy document that explains your coverage decisions, an honest limitations section, and a specific AI-usage declaration — all presented truthfully as a capstone project you built to demonstrate skill, never as commercial experience you have not had.`,
      workedExample: `A README does not need to be long — it needs to get a stranger to green fast. This outline is enough:

~~~text
# <App> automation — Playwright + TypeScript

Automated UI and API tests for <app>. Smoke suite runs in ~90s; full regression
covers the core order, auth and account journeys. See docs/automation-strategy.md
for what is covered, at which level, and what is deliberately out of scope.

## Prerequisites
- Node 20+, then: npm install && npx playwright install

## Configuration
Copy .env.example to .env and set BASE_URL, API_BASE_URL, TEST_USER, TEST_PASSWORD.
Test credentials: see docs/automation-strategy.md > Test data.

## Running
- Smoke:      npm run test:smoke        (npx playwright test --grep @smoke)
- Full:       npm run test
- One file:   npx playwright test tests/ui/checkout.spec.ts
- UI mode:    npx playwright test --ui
- Report:     npx playwright show-report

## Structure
- src/       fixtures, page objects, components, data factories
- tests/     ui/ and api/ specs; @smoke marks the critical-path subset
- .github/workflows/ci.yml  smoke on push, regression nightly

## CI
Smoke runs on every push; full regression nightly. HTML report and traces on
failure are published as workflow artefacts.
~~~

And the two written sections that make the repo honest — a limitations note and an AI-usage declaration — read like this:

~~~text
## Limitations — what this suite does NOT prove
- No performance, load or security testing.
- Third parties (payment, email) are stubbed in the fast suite; their real
  contracts are only exercised by the nightly job.
- Runs against staging; production configuration is not tested here.
- A green run proves the covered journeys work against staging; it is not a
  guarantee the whole application is defect-free.

## AI-usage declaration
This is a personal capstone project built to demonstrate automation skill. I used
an AI assistant to scaffold the initial config and to draft one page object, both
of which I then reviewed and rewrote to fit the app. I used it to explain a
storage-state error I was debugging. The automation strategy, the risk and
coverage decisions, and all test assertions are my own work and I can explain
every one. This project is study and independent practice, not commercial delivery.
~~~

Notice what these two sections do: they pre-empt the interviewer's sharpest questions by answering them honestly first. "What doesn't this cover?" and "how much of this did you actually do?" are disarmed before they are asked — which is exactly the effect you want.`,
      commonMistakes: `- A README that assumes the reader already knows how to configure and run the repo, so a stranger stalls before reaching the tests
- Presenting a folder of tests with no strategy or limitations, leaving nothing to discuss in an interview beyond "they pass"
- A limitations section that is empty or vague, implying the suite proves more than it does
- A missing, dishonest or unravellable AI-usage declaration
- Dressing the capstone up as commercial or client work — inventing a team, tickets or years of production use it never had`,
      realWorldTip: `On a delivery team, the documents you are writing here are the same ones a new automation lead produces in their first month: a README so the team can run the suite, a strategy so everyone understands the coverage, and honest limitations so nobody over-trusts the green. Interviewers know this, and a capstone that demonstrates it — presented truthfully as a capstone — often lands better than a vague claim of years of experience, because they can see the actual quality of your thinking on the page. Let the work carry the weight; it is more convincing than any borrowed history, and it never collapses under a follow-up question.`,
      exercise: `Finish the documentation for your capstone. Write the README so a peer could clone the repo cold and reach a green smoke run without asking you anything (test this on someone if you can). Complete \`docs/automation-strategy.md\` with the levels, risk priorities, exclusions and green-run claim. Add a specific limitations section and an honest AI-usage declaration. Deliverable: the finished README, strategy document, limitations section and AI declaration — with the repo presented as a capstone project, making no claim of commercial experience.`,
      reflectionQuestion: `Imagine an interviewer opens your repo, points at one decision in your strategy document and asks "why did you do it this way?". Which decision are you least ready to defend out loud — and what does that tell you to go and firm up before you present it?`,
      knowledgeCheck: `Why is an honest limitations section a strength rather than a weakness in a portfolio repo? (Answer: because it shows you understand coverage as a set of deliberate trade-offs rather than a wall of green; naming what the suite does not prove demonstrates the exact judgement a senior role requires, and an engineer who states their gaps is far more trustworthy than one who implies there are none.)`,
      completionChecklist: [
        'I can write a README a stranger could clone the repo cold and run from',
        'I can present my strategy, risk decisions and limitations so the repo is defensible in an interview',
        'I can write an honest AI-usage declaration and present the work without claiming commercial experience',
      ],
      enhancements: {
        badGood: {
          label: 'overclaiming vs honest framing',
          bad: `~~~text
"Automation framework I built and maintained in production for a fintech client,
covering their full regression suite used by a team of eight over two years."

(None of it true. One question — "which fintech, and what was the hardest flake
you fixed in those two years?" — and the whole story, and your credibility, fold.)
~~~`,
          good: `~~~text
"A capstone automation project I built independently to demonstrate a
production-style Playwright + TypeScript setup: UI and API coverage, auth via
storage state, CI, and a written strategy. It is study and practice, not client
work — and I can walk you through every decision in it."

(True, specific, and it invites exactly the conversation you are prepared for.)
~~~`,
        },
        davidTip: `The strongest thing you can do in an interview is volunteer a limitation before you are asked. "Here's what this suite deliberately doesn't cover, and why" tells the interviewer you think in trade-offs, not absolutes — and it is the single clearest signal of a senior mindset. Practise saying your exclusions out loud until they sound like judgement, which is what they are.`,
        visualAid: {
          type: 'flow',
          title: 'Turning a working repo into defensible evidence',
          steps: [
            { label: 'Can a stranger run it?', detail: 'A README that gets them to a green smoke run without asking you.' },
            { label: 'Can they understand the coverage?', detail: 'A strategy document: levels, risk, exclusions, the green-run claim.' },
            { label: 'Do they know the gaps?', detail: 'An honest limitations section — what the suite does not prove.' },
            { label: 'Do they trust how it was built?', detail: 'A specific AI-usage declaration; what you drove versus assisted.' },
            { label: 'Is it framed truthfully?', detail: 'A capstone project you built to show skill — never commercial experience you have not had.' },
          ],
        },
      },
    },
  ],
};
