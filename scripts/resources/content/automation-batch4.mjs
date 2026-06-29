// Practical Test Automation with Playwright — Automation Resource Vault, batch 4 (completes 21).
const COURSE = 'Practical Test Automation with Playwright';
const proTip = (text) => ({ t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text });

// ---- AI Prompt Library for Automation Engineers ----
const PROMPT_CATEGORIES = [
  { name: 'Writing Tests', prompts: [
    'Act as a senior automation engineer. Write a Playwright test in TypeScript for [behaviour]. Use getByRole/getByLabel locators and web-first assertions. Do not use waitForTimeout.',
    'Generate a Playwright test for the login flow: valid login, invalid password, and empty fields. Use the AAA pattern and clear test names.',
    'Convert these manual test steps into a Playwright test, keeping one behaviour per test: [paste steps].',
    'Write a data-driven Playwright test that runs the same flow for this set of inputs: [paste data].',
  ] },
  { name: 'Locators', prompts: [
    'Given this HTML, suggest the most robust Playwright locator using role/label/text where possible, avoiding brittle CSS: [paste HTML].',
    'Review these locators and flag any that are brittle (CSS chains, nth-child, indexes). Suggest user-facing alternatives: [paste locators].',
    'Explain why getByRole is preferred over CSS selectors, with two concrete examples.',
  ] },
  { name: 'Page Objects & Structure', prompts: [
    'Refactor this Playwright test into a Page Object Model. Keep locators and actions in the class and assertions in the test: [paste test].',
    'Suggest a folder structure and naming convention for a growing Playwright suite covering auth, checkout and account features.',
    'Create a reusable custom fixture that provides a logged-in page for my tests.',
  ] },
  { name: 'Debugging & Flakiness', prompts: [
    'This Playwright test is flaky. Review it for timing issues, missing awaits, shared state and brittle locators, and suggest fixes: [paste test].',
    'Explain what this Playwright error means and how to fix it: [paste error].',
    'Suggest how to make this test reliable without using retries or waitForTimeout: [paste test].',
  ] },
  { name: 'API & Data', prompts: [
    'Write a Playwright API test using the request fixture that creates a resource and asserts the status and key response fields for: [endpoint + payload].',
    'Show how to use an API call to set up state before a UI test, so the UI test only covers the behaviour under test.',
    'Generate a factory function that produces unique, valid test data for [entity], ensuring no collisions between test runs.',
  ] },
  { name: 'CI/CD & Config', prompts: [
    'Write a GitHub Actions workflow that installs dependencies and browsers, runs Playwright tests, and uploads the report on failure.',
    'Review my playwright.config.ts and suggest improvements for reliability and speed: [paste config].',
    'Explain how to configure traces and screenshots so CI failures are easy to diagnose.',
  ] },
  { name: 'Learning & Explaining', prompts: [
    'Explain Playwright auto-waiting simply, then give a before/after example replacing a manual wait with an assertion.',
    'Explain the test pyramid and where Playwright UI and API tests fit, with a QA example.',
    'Quiz me with five questions on Playwright locators and assertions, then mark my answers.',
  ] },
];

const promptLibraryBlocks = () => {
  const blocks = [
    { t: 'h1', text: 'Introduction' },
    { t: 'p', text: 'AI is a powerful pair-programmer for automation — but only when you prompt it well and verify the output. This library gives you ready-to-use prompts grouped by task, plus the safety rules that keep your use professional.' },
    { t: 'h1', text: 'How to Use This Library' },
    { t: 'ul', items: [
      'Copy a prompt and replace the [bracketed] parts with your context.',
      'Always review and run the generated code — never trust it blindly.',
      'Never paste secrets, credentials or production data.',
      'Treat AI output as a draft you own and verify.',
    ] },
  ];
  for (const cat of PROMPT_CATEGORIES) {
    blocks.push({ t: 'h1', text: cat.name });
    blocks.push({ t: 'ol', items: cat.prompts });
  }
  blocks.push({ t: 'h1', text: 'Safety Rules' });
  blocks.push({ t: 'ul', items: [
    'No secrets, credentials, customer or production data in prompts.',
    'Run and review every generated test before committing.',
    'Verify locators and assertions against the real app.',
    'You own the code — AI drafts, you decide.',
  ] });
  blocks.push({ t: 'h1', text: 'Common Mistakes' });
  blocks.push({ t: 'ul', items: ['Committing AI code without running it.', 'Accepting brittle locators it suggests.', 'Pasting sensitive data or proprietary code into public tools.'] });
  blocks.push(proTip('AI accelerates automation, but reviewing what it writes is where your engineering judgement shows. The best engineers prompt fast and verify hard.'));
  return blocks;
};

export default [
  {
    slug: 'ai-prompt-library-automation',
    title: 'AI Prompt Library for Automation Engineers',
    subtitle: 'Ready-to-use prompts for writing, debugging and improving Playwright tests.',
    courseTitle: COURSE, category: 'AI Prompt Packs',
    blocks: promptLibraryBlocks(),
  },

  {
    slug: 'automation-portfolio-project-workbook',
    title: 'Automation Portfolio Project Workbook',
    subtitle: 'Build a public Playwright project that proves you can automate.',
    courseTitle: COURSE, category: 'Career Resources',
    blocks: [
      { t: 'h1', text: 'Introduction' },
      { t: 'p', text: 'A public automation project is the single most convincing proof that you can do the job. This workbook guides you to build, document and present a Playwright project employers will take seriously.' },
      { t: 'h1', text: 'What to Build' },
      { t: 'ul', items: [
        'Pick a public demo app (e.g. a demo shop or todo app).',
        'Automate 8–12 meaningful tests across key journeys.',
        'Include UI tests, at least one API test, and a page object.',
        'Wire it up to run in GitHub Actions.',
      ] },
      { t: 'h1', text: 'Step-by-Step' },
      { t: 'ol', items: [
        'Set up a clean Playwright + TypeScript project.',
        'Write tests for the main journeys (one behaviour each, robust locators).',
        'Add page objects and a fixture for shared setup.',
        'Add an API test and use API setup for one UI test.',
        'Add a GitHub Actions workflow with report upload.',
        'Write a clear README: what it tests, how to run it, what it demonstrates.',
        'Push to GitHub (public) and confirm CI is green.',
      ] },
      { t: 'h1', text: 'README Checklist' },
      { t: 'ul', items: [
        'One-paragraph overview of the project and app under test',
        'How to install and run the tests',
        'What is covered and why (your test strategy)',
        'Tech used (Playwright, TypeScript, CI)',
        'A note on what it demonstrates about your skills',
      ] },
      { t: 'h1', text: 'Self-Review Checklist' },
      { t: 'ul', items: [
        'Tests are reliable (pass on repeat runs)',
        'Locators are user-facing and robust',
        'Code is clean and consistent',
        'CI is green and report uploads',
        'README is clear and the repo is public',
      ] },
      { t: 'h1', text: 'Practical Exercise' },
      { t: 'p', text: 'Build the project to the checklists above, then prepare a 60-second walkthrough explaining what it demonstrates about you.' },
      { t: 'h1', text: 'Common Mistakes' },
      { t: 'ul', items: ['A private repo or broken CI a reviewer cannot see.', 'Lots of trivial tests instead of meaningful journeys.', 'No README, so the work has no context.'] },
      proTip('A public Playwright repo with green CI and a clear README does more for your job hunt than any certificate. It lets an employer see exactly how you think and code.'),
    ],
  },

  {
    slug: 'playwright-command-cheat-sheet',
    title: 'Playwright Command Cheat Sheet',
    subtitle: 'The CLI commands you will use every day, in one place.',
    courseTitle: COURSE, category: 'Cheat Sheets',
    blocks: [
      { t: 'h1', text: 'Introduction' },
      { t: 'p', text: 'Keep this beside you while you work. It collects the Playwright CLI commands you will reach for most often, from running tests to debugging and reporting.' },
      { t: 'h1', text: 'Running Tests' },
      { t: 'table', headers: ['Command', 'Does'], rows: [
        ['npx playwright test', 'Run all tests'],
        ['npx playwright test file.spec.ts', 'Run one file'],
        ['npx playwright test -g "name"', 'Run tests matching a title'],
        ['npx playwright test --project=firefox', 'Run one project/browser'],
        ['npx playwright test --headed', 'Run with a visible browser'],
        ['npx playwright test --repeat-each=10', 'Stress-test for flakiness'],
      ] },
      { t: 'h1', text: 'Debugging' },
      { t: 'table', headers: ['Command', 'Does'], rows: [
        ['npx playwright test --ui', 'Open UI mode (watch/step/time-travel)'],
        ['npx playwright test --debug', 'Step through with the Inspector'],
        ['npx playwright show-trace trace.zip', 'Open a trace'],
        ['npx playwright codegen <url>', 'Record actions and get locators'],
      ] },
      { t: 'h1', text: 'Reports & Setup' },
      { t: 'table', headers: ['Command', 'Does'], rows: [
        ['npx playwright show-report', 'Open the HTML report'],
        ['npx playwright install', 'Install browsers'],
        ['npx playwright install --with-deps', 'Install browsers + OS deps (CI)'],
        ['npm init playwright@latest', 'Scaffold a new project'],
      ] },
      { t: 'h1', text: 'Updating Snapshots' },
      { t: 'ul', items: ['npx playwright test --update-snapshots — refresh visual baselines (review the diff first)'] },
      { t: 'h1', text: 'Practical Exercise' },
      { t: 'p', text: 'Run a single test by title with -g, then open it in UI mode, then view the HTML report. Get comfortable switching between them.' },
      { t: 'h1', text: 'Common Mistakes' },
      { t: 'ul', items: ['Always running the full suite when -g would be faster.', 'Forgetting --with-deps in CI.', 'Updating snapshots without reviewing the diff.'] },
      proTip('Master --ui mode and -g early. Being able to run and inspect exactly the test you care about — instantly — makes you dramatically faster at writing and fixing automation.'),
    ],
  },
];
