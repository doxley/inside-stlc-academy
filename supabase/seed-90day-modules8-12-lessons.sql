-- Modules 8–12: Automation Fundamentals, AI for Testing, Portfolio, CV, Interview Mastery
-- 6 lessons per module (5 teaching + 1 assignment)

-- ═══════════════════════════════════════════════════════════════════
-- MODULE 8: Automation Fundamentals
-- ═══════════════════════════════════════════════════════════════════

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'What is Test Automation & When to Use It', '10 minute read',
$$Test automation is one of the most talked-about topics in QA. It''s also one of the most misunderstood. This lesson cuts through the hype: what automation actually is, what it''s good at, where it fails, and how to decide when to automate.$$,
array['Explain what test automation is and how it differs from manual testing','Describe the types of tests that are good candidates for automation','Apply the cost-benefit framework to decide whether to automate a test'],
$$## What is Test Automation?

Test automation is the use of software to execute test cases and compare actual results with expected results — without a human clicking through the UI each time.

A manual tester: opens the browser, goes to the login page, types credentials, clicks submit, looks for the dashboard.

An automated test: a script does all of that in 2 seconds, checks the result, and reports pass or fail.

## The Business Case for Automation

**Time savings:** A regression suite that takes a human 8 hours to run manually can be executed by automation in 20 minutes.

**Frequency:** Automated tests can run on every code commit — giving feedback within minutes of a change.

**Consistency:** Automation always follows the same steps exactly. Humans get tired, make errors, and occasionally miss a step.

**Cost over time:** An automated test has a high upfront cost (time to write) but near-zero cost to run repeatedly. A manual test costs the same every time it''s run.

## When NOT to Automate

Automation is not always the answer:

| Don''t automate | Why |
|---|---|
| One-off tests | Cost to write > cost to run once manually |
| Rapidly changing UI | Automation breaks with every UI change |
| Exploratory testing | You can''t automate curiosity |
| Usability and UX assessment | Requires human judgement |
| Tests you''re not sure about yet | Automate stable, understood behaviour |

## The Automation Paradox

More automation doesn''t always equal better quality. A large, poorly maintained automation suite gives false confidence, breaks constantly, and costs more to fix than it saves. Quality > quantity.

## Good Candidates for Automation

- Regression tests run every sprint
- Smoke tests run on every deployment
- Data-driven tests with many input combinations
- API tests (fast, stable, high ROI)
- Performance tests (impossible to replicate manually)

## The ROI Formula

Simple check before automating anything:
- **Manual cost:** (time to run × how often × how many testers)
- **Automation cost:** (time to write + time to maintain per sprint)

If manual cost over 6 months > automation cost: automate it.$$,
$$**Should we automate this test?**

Test: "User can log in with valid credentials"
- Run frequency: Every sprint (26 times per year)
- Manual time: 3 minutes
- Total manual cost per year: 26 × 3 = 78 minutes

Automation write time: 2 hours
Automation run time: 5 seconds
Maintenance per sprint: 5 minutes

Automation cost year 1: 2 hours + (26 × 5 min) = ~4.2 hours
Automation cost year 2+: 26 × 5 min = 2.2 hours

After year 1, we save 78 - 130 = not yet profitable. But by year 2 we''re saving significantly. This test is a good automation candidate — it''s stable and runs frequently.$$,
$$- Automating everything — not every test should be automated
- Expecting automation to replace testers — automation handles repetition; testers handle intelligence
- Treating automation as a "phase 2" project that never starts — start small with one stable test
- Measuring success by number of tests, not quality and reliability$$,
$$"Automate your regression; explore manually." The most effective testing strategies combine both. Automation handles the known, repetitive checks. Experienced testers use their time for exploratory testing where human intuition finds bugs no script would find.$$,
$$Choose 5 test cases from your work or practice projects. For each one, calculate a rough ROI and decide: automate or keep manual? Write your reasoning.$$,
$$In what scenario does it NOT make sense to automate a test?$$,
$$What does the ROI calculation for test automation compare?$$,
array['I can explain what test automation is in plain terms','I can identify good and poor candidates for automation','I can apply a basic ROI framework to an automation decision']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'The Automation Pyramid & Choosing a Framework', '11 minute read',
$$The Automation Pyramid tells you where to invest your automation effort for maximum return. This lesson covers the pyramid, explains the main automation frameworks in the market today, and gives you a framework for choosing the right tool.$$,
array['Explain the three layers of the Automation Pyramid','Compare Selenium, Playwright, and Cypress for UI automation','Choose an appropriate automation framework based on team context'],
$$## The Automation Pyramid

The Automation Pyramid (Mike Cohn, 2009) shows the ideal distribution of automated tests:

```
        /\
       /UI\          ← Slow, brittle, expensive — but user-visible
      /----\
     /API   \        ← Fast, stable, high value
    /--------\
   /Unit Tests\      ← Fastest, most numerous, cheapest to run
  /____________\
```

**Unit Tests (bottom):** Test individual functions and classes in isolation. Written by developers. Very fast (milliseconds each), run thousands per minute. Catch bugs closest to where they''re written.

**API/Integration Tests (middle):** Test the communication between components. Fast (seconds), stable (no UI), high value. This is where QA automation adds the most ROI.

**UI/End-to-End Tests (top):** Test the full application through the browser, as a user would. Slow, prone to breaking when UI changes, expensive to maintain. Use sparingly — focus on critical journeys only.

**The key insight:** Most teams have it inverted — too many brittle UI tests, not enough API tests. Aim for: many unit + many API + few critical UI tests.

## UI Automation Frameworks — The Main Players

### Selenium WebDriver
- Oldest and most widely known
- Works across all browsers (Chrome, Firefox, Safari, Edge)
- Supports multiple languages (Java, Python, C#, JavaScript)
- Large community and support
- More verbose code; slower to write

### Playwright (by Microsoft)
- Modern, actively developed
- Supports JavaScript/TypeScript, Python, Java, C#
- Auto-waits for elements (fewer flaky tests)
- Built-in test runner, tracing, screenshot comparison
- Best-in-class for new projects

### Cypress
- JavaScript/TypeScript only
- Runs inside the browser (no WebDriver)
- Excellent developer experience and debugging
- Great for frontend-heavy teams
- Limited multi-tab and multi-origin support

### Choosing a Framework

| Choose | If |
|---|---|
| Playwright | You''re starting a new project, any language |
| Cypress | Your team is JavaScript-first, frontend focus |
| Selenium | Your company already uses it; legacy Java/C# codebase |

For API automation specifically: **REST Assured** (Java), **Requests** (Python), or **Postman/Newman** (any language via CLI).$$,
$$**Framework decision at a startup:**

"We''re a small team of 3 developers and 1 QA. Our stack is React + Node.js API. We want to start automation. What do you recommend?"

Answer: Start at the API layer with Postman/Newman (fast wins, no setup beyond what you already have). For UI automation, Playwright + TypeScript aligns with the JavaScript team. Start with 5 critical E2E tests: sign up, login, core user flow, checkout, logout. Keep the suite small and fast. Expand only when the suite is reliable.

This is a considered recommendation, not "just pick Selenium because everyone uses it."$$,
$$- Starting with UI automation before API — the pyramid says start from the bottom
- Choosing a framework based on hype rather than team context
- Building too many UI tests early — a slow, brittle suite undermines confidence in automation
- Expecting automation to be stable from day 1 — all suites need maintenance$$,
$$"A flaky test is worse than no test." A test that sometimes passes and sometimes fails for no reason poisons the suite. The team starts ignoring all failures. Fix or delete flaky tests immediately — they erode trust faster than bugs do.$$,
$$Research Playwright by reading the "Getting Started" page at playwright.dev. Write a 100-word summary of: what it does, what languages it supports, and one feature that stands out to you.$$,
$$According to the Automation Pyramid, which type of tests should you have the MOST of?$$,
$$Why are UI (end-to-end) tests at the TOP of the pyramid?$$,
array['I can explain the three layers of the Automation Pyramid','I can describe Selenium, Playwright, and Cypress and their key differences','I can recommend an appropriate framework for a given team context']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Writing Your First Automated Test', '14 minute read',
$$Theory meets practice. In this lesson you''ll write and run a real automated test using Playwright — the most modern and beginner-friendly framework available. By the end you''ll have a running test you can put in your portfolio.$$,
array['Set up a Playwright test project','Write a test that navigates to a page and asserts on content','Run the test and interpret the results'],
$$## Setup

Prerequisites: Node.js installed (nodejs.org — download the LTS version).

```bash
# Create a new project folder
mkdir my-first-automation
cd my-first-automation

# Initialise a Node.js project
npm init -y

# Install Playwright
npm init playwright@latest
```

When prompted:
- Choose TypeScript or JavaScript (TypeScript is recommended for new learners — better autocomplete)
- Choose the test directory: tests
- Add a GitHub Actions workflow: No (for now)
- Install Playwright browsers: Yes

## Your First Test

Playwright creates a sample test. Let''s write our own. Create `tests/login.spec.ts`:

```typescript
import { test, expect } from ''@playwright/test'';

test(''homepage has correct title'', async ({ page }) => {
  // Navigate to the page
  await page.goto(''https://playwright.dev'');

  // Assert the page title
  await expect(page).toHaveTitle(/Playwright/);
});

test(''get started link works'', async ({ page }) => {
  await page.goto(''https://playwright.dev'');

  // Click the "Get started" link
  await page.getByRole(''link'', { name: ''Get started'' }).click();

  // Verify we''re on the docs page
  await expect(page).toHaveURL(/.*intro/);
});
```

## Running the Tests

```bash
# Run all tests (headless — no browser window)
npx playwright test

# Run with browser visible
npx playwright test --headed

# Run a specific file
npx playwright test tests/login.spec.ts

# View the HTML test report
npx playwright show-report
```

## Understanding the Test Structure

```typescript
test(''description of what you''re testing'', async ({ page }) => {
  // page = a browser page/tab

  // Navigate
  await page.goto(''url'');

  // Interact
  await page.fill(''[data-testid="email"]'', ''user@example.com'');
  await page.fill(''[data-testid="password"]'', ''Password123'');
  await page.click(''[data-testid="login-button"]'');

  // Assert
  await expect(page).toHaveURL(''/dashboard'');
  await expect(page.locator(''h1'')).toContainText(''Welcome'');
});
```

## Locators — Finding Elements

| Locator | Example | Best for |
|---|---|---|
| Role | `getByRole(''button'', { name: ''Submit'' })` | Accessible elements |
| Text | `getByText(''Sign in'')` | Visible text |
| TestId | `getByTestId(''login-btn'')` | Elements with data-testid attribute |
| CSS selector | `locator(''.submit-btn'')` | When above don''t work |
| XPath | `locator(''//button[@type="submit"]'')` | Legacy fallback only |

**Best practice:** Use `getByRole` and `getByTestId` first. CSS selectors break easily when styling changes. XPath is fragile — last resort only.$$,
$$**First real test — login to a demo site:**

Using https://practicetestautomation.com/practice-test-login/:

```typescript
import { test, expect } from ''@playwright/test'';

test(''successful login redirects to success page'', async ({ page }) => {
  await page.goto(''https://practicetestautomation.com/practice-test-login/'');

  await page.fill(''#username'', ''student'');
  await page.fill(''#password'', ''Password123'');
  await page.click(''#submit'');

  await expect(page).toHaveURL(/logged-in-successfully/);
  await expect(page.locator(''h1'')).toContainText(''Logged In Successfully'');
});

test(''wrong password shows error'', async ({ page }) => {
  await page.goto(''https://practicetestautomation.com/practice-test-login/'');

  await page.fill(''#username'', ''student'');
  await page.fill(''#password'', ''wrongpassword'');
  await page.click(''#submit'');

  await expect(page.locator(''#error'')).toContainText(''Your password is invalid'');
});
```

Run it: `npx playwright test --headed`

Watch the browser open, fill in the fields, click, and check the results — all in about 3 seconds.$$,
$$- Using CSS selectors tied to styling (classes that change with redesigns) — prefer roles and test IDs
- Not using async/await — all Playwright operations are async; forgetting await causes silent failures
- Hardcoding test data in the test — use variables or fixtures
- Not reading the Playwright HTML report — it shows screenshots and traces of failures; invaluable for debugging$$,
$$After your first test runs green, run it 10 times back to back: `npx playwright test --repeat-each=10`. If it passes all 10 times, it''s stable. If it fails intermittently, you have a flaky test to fix before it becomes a problem.$$,
$$Install Playwright and write two tests for the practice login site (links above). Test 1: successful login. Test 2: failed login. Run both. Screenshot the passing test report and save it — this is your first automation portfolio piece.$$,
$$In Playwright, why is `getByRole()` preferred over CSS selectors for locating elements?$$,
$$What does `await expect(page).toHaveURL(/dashboard/)` check?$$,
array['I have Playwright installed and can run tests from the command line','I can write a test that navigates, interacts with elements, and asserts on results','I understand the difference between good and brittle locator strategies']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Page Object Model & Test Organisation', '11 minute read',
$$Once you have more than 5 tests, you''ll feel the pain of duplicated locators and repeated setup code. The Page Object Model (POM) is the standard pattern for writing maintainable, scalable automation code. This lesson shows you how.$$,
array['Explain what the Page Object Model is and why it''s used','Refactor duplicate test code into a Page Object class','Organise tests into logical files and use beforeEach hooks'],
$$## The Problem with Inline Tests

Imagine 10 tests that all log in. Each one has:
```typescript
await page.fill(''#username'', ''student'');
await page.fill(''#password'', ''Password123'');
await page.click(''#submit'');
```

If the login button''s selector changes from `#submit` to `button[type="submit"]`, you''re updating 10 tests. That''s maintenance hell.

## The Page Object Model

POM creates a class for each page of your application. The class encapsulates:
- Locators for that page''s elements
- Methods for actions you perform on that page

Tests then use these page objects — they don''t know or care about selectors.

## Example: LoginPage Class

```typescript
// tests/pages/LoginPage.ts
import { Page, Locator } from ''@playwright/test'';

export class LoginPage {
  private page: Page;
  private usernameField: Locator;
  private passwordField: Locator;
  private submitButton: Locator;
  private errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator(''#username'');
    this.passwordField = page.locator(''#password'');
    this.submitButton = page.locator(''#submit'');
    this.errorMessage = page.locator(''#error'');
  }

  async navigate() {
    await this.page.goto(''https://practicetestautomation.com/practice-test-login/'');
  }

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.submitButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return this.errorMessage.innerText();
  }
}
```

## Refactored Tests Using POM

```typescript
// tests/login.spec.ts
import { test, expect } from ''@playwright/test'';
import { LoginPage } from ''./pages/LoginPage'';

test.describe(''Login'', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test(''valid credentials → success'', async ({ page }) => {
    await loginPage.login(''student'', ''Password123'');
    await expect(page).toHaveURL(/logged-in-successfully/);
  });

  test(''wrong password → error message'', async () => {
    await loginPage.login(''student'', ''wrongpassword'');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain(''Your password is invalid'');
  });
});
```

Now if the selector changes, you update ONE place: the LoginPage class.

## File Organisation

```
tests/
├── pages/
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   └── CheckoutPage.ts
├── login.spec.ts
├── checkout.spec.ts
└── fixtures/
    └── testData.ts
```$$,
$$**Before POM:**
30 tests all containing `await page.fill(''input[name="email"]'', testEmail)` — the selector is repeated 30 times.

The team redesigns the form and changes `name="email"` to `data-testid="email-input"`.

Result: 30 tests fail. 30 updates needed. 2 hours of maintenance.

**After POM:**
1 update in `LoginPage.ts`: `page.getByTestId(''email-input'')`

Result: All 30 tests updated in 30 seconds. 2 hours saved every time the UI changes.

Over a year, with quarterly redesigns, POM saves approximately 8 hours of maintenance work — not counting the reduction in bugs caused by inconsistent updates.$$,
$$- Not using POM until the suite is already a mess — introduce it from test 1
- Making Page Object methods too specific (one method per test step) — methods should represent user actions, not test steps
- Putting assertions inside Page Objects — Page Objects should describe interactions; assertions belong in tests
- Over-engineering POM with inheritance hierarchies — keep it simple$$,
$$The best question to ask when writing a Page Object method: "Would a real user describe their action this way?" `loginPage.login(username, password)` — yes, a user logs in. `loginPage.fillEmailAndClickSubmit()` — no, that''s a technical step, not a user action.$$,
$$Refactor the two tests you wrote in the previous lesson to use a LoginPage Page Object class. Your test file should import the class and use its methods — no raw locators in the test file. Push the result to GitHub.$$,
$$What is the main benefit of the Page Object Model (POM)?$$,
$$Where should assertions go in a POM architecture — inside Page Objects or inside test files?$$,
array['I understand what the Page Object Model is and why it''s used','I can write a Page Object class with locators and action methods','I can refactor raw test code to use POM']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Running Tests in CI/CD', '9 minute read',
$$The final piece of the automation puzzle: making your tests run automatically on every code change. CI/CD (Continuous Integration / Continuous Delivery) is how professional teams keep their test suites running without anyone having to remember to press "run".$$,
array['Explain what CI/CD is and why automated testing is central to it','Describe how a Playwright test suite integrates with GitHub Actions','Interpret a CI test run report and understand common failure modes'],
$$## What is CI/CD?

**Continuous Integration (CI):** Every time a developer pushes code to the repository, an automated pipeline runs — compiling the code, running tests, and reporting whether everything passes.

**Continuous Delivery (CD):** If CI passes, the code is automatically deployed to a staging (or even production) environment.

The test suite is the gatekeeper. If tests fail, the deployment stops. If they pass, confidence grows.

## Why This Matters for Testers

Without CI:
- Tests run whenever a tester remembers to run them
- Bugs can sit for days before being discovered
- "It works on my machine" is common

With CI:
- Tests run on every commit (within minutes)
- Bugs are caught immediately, closest to when they were introduced
- The team has a shared, objective measure of quality at all times

## GitHub Actions — The Basics

GitHub Actions is a free CI system built into GitHub. You define workflows in YAML files stored in `.github/workflows/`.

A basic Playwright workflow:

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: npx playwright test

      - name: Upload test report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
```

When this is in place:
1. Developer pushes a commit
2. GitHub Actions runs automatically
3. Playwright tests execute in a clean Linux environment
4. Results appear in the GitHub "Actions" tab
5. A failed test blocks the pull request from merging

## Reading CI Results

In GitHub Actions, you''ll see:
- Green tick (✓) — all tests passed
- Red cross (✗) — one or more tests failed
- Click into the failed run → see the test name, error message, and screenshot (if you uploaded reports)

Common CI failure modes:
- **Test environment issue:** The staging API is down
- **Test data dependency:** A test depends on data that doesn''t exist in CI
- **Timing issue:** A page element loads slower in CI (headless Linux) than locally — add `await expect(element).toBeVisible()`
- **Real bug:** The developer''s change broke something — exactly what CI is for$$,
$$**CI workflow in practice:**

Developer opens a pull request: "Add promo code field to checkout"

GitHub Actions triggers:
1. Checkout code
2. Install dependencies (2 minutes)
3. Run 45 Playwright tests (3 minutes)
4. Results: 43 passed, 2 failed

Failed tests:
- `checkout.spec.ts: Order total updates when promo code applied` — FAILED
- `checkout.spec.ts: Promo code field is visible` — FAILED

Developer sees this in the PR before anyone has manually tested. They investigate: the promo code field is there but the `data-testid` attribute is missing, so the tests can''t find the element. They add the attribute, push a fix, CI runs again, all 45 pass. PR is merged.

Total time from bug creation to fix: 8 minutes. Without CI: potentially days.$$,
$$- Running tests only locally — if they''re not in CI, they''re not really "automated"
- Treating a CI failure as someone else''s problem — every team member is responsible for the green build
- Not reviewing CI failure reports — CI is only useful if people actually look at the results
- Making CI too slow — a 30-minute test suite discourages frequent commits; keep it under 10 minutes for fast feedback$$,
$$When you set up your first GitHub Actions workflow and see that green tick on your first passing CI run, take a screenshot. It''s a milestone worth noting — and a great addition to your portfolio showing you understand the full delivery pipeline, not just test writing.$$,
$$Create a GitHub repository for your Playwright project. Add the GitHub Actions workflow above. Push your tests and watch the Actions tab. Screenshot the passing CI run — this is a portfolio piece showing CI/CD skills.$$,
$$In CI/CD, what happens when automated tests fail on a pull request?$$,
$$What is the difference between Continuous Integration (CI) and Continuous Delivery (CD)?$$,
array['I can explain what CI/CD is and why automated testing is central to it','I understand how a GitHub Actions workflow runs Playwright tests','I can read a CI run result and identify the type of failure']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 6, 'Module 8 Assignment & Knowledge Check', '90 minutes',
$$Your automation assignment: build a small but complete Playwright test suite, pushed to GitHub with a passing CI run. This is one of the most valuable portfolio pieces you can create.$$,
array['Build a Playwright test suite with POM for a real website','Set up GitHub Actions CI for the test suite','Document your automation approach and findings'],
$$## Your Assignment

### Part 1: Test Suite (primary deliverable)

Using **https://automationexercise.com** (a free site built for automation practice), build a Playwright test suite covering these 5 scenarios:

1. Homepage loads and displays the expected title
2. User can navigate to the Products page and see at least 1 product listed
3. User can search for a product by keyword and see relevant results
4. User can add a product to the cart (verify cart item count changes)
5. Contact Us form validation — submitting with empty required fields shows an error

**Requirements:**
- Use TypeScript (or JavaScript)
- Use Page Object Model — create at least one Page Object class
- Each test must have at least 2 assertions
- Tests must all pass when run locally

### Part 2: GitHub Repository

- Push your project to a GitHub repository (public or private — share the link)
- Include a README explaining: what the suite tests, how to install and run it, and the framework used
- Add a GitHub Actions workflow that runs the tests automatically on push

### Part 3: Evidence

- Screenshot of all 5 tests passing locally (`npx playwright show-report`)
- Screenshot of the green CI run in GitHub Actions

### Part 4: Reflection (100 words)

What was hardest about this assignment? What would you add to this suite if you had another day?

---

## Assessment Criteria

You''ll be assessed on: tests run and pass; POM is implemented; CI is set up and green; code is readable and well-organised.$$,
null, null, null,
$$Submit: GitHub repository link, both screenshots, and your reflection. If CI is taking time to set up, submit the local screenshots first and push CI later.$$,
$$Looking at your finished suite — what makes you most proud of it? What would a senior QA engineer suggest you improve?$$,
$$Before submitting: do all 5 tests pass locally? Does the CI run show green? Is your README complete?$$,
array['I built a 5-test Playwright suite using POM','All tests pass locally and the CI run is green','I have a GitHub repository with a README','I wrote a reflection on the assignment']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;

-- ═══════════════════════════════════════════════════════════════════
-- MODULE 9: AI for Software Testing
-- ═══════════════════════════════════════════════════════════════════

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'How AI is Changing QA', '9 minute read',
$$AI is reshaping software testing — and testers who understand how are positioned to lead the change rather than be left behind. This lesson gives you an honest, practical overview of where AI is having real impact in QA today.$$,
array['Describe the current state of AI in software testing','Identify the testing tasks most affected by AI tools','Explain the skills that remain uniquely human in testing'],
$$## The Real State of AI in QA (2024–2025)

AI in testing is no longer futuristic — it''s here. But it''s not replacing testers. It''s changing which parts of testing require human effort.

**What AI is genuinely good at in testing:**
- Generating test case ideas from requirements or user stories
- Writing boilerplate automation code from plain-English descriptions
- Identifying patterns in large test result datasets (flakiness, regression trends)
- Generating realistic test data at scale
- Reviewing code for common bug patterns (static analysis enhanced by ML)
- Self-healing automation locators (updating selectors when UI changes)

**What AI still can''t do well:**
- Exploratory testing (noticing that something feels wrong, even when technically correct)
- Understanding business context ("this field will be misused by our specific user base")
- Ethical and UX judgement
- Building trust with stakeholders about quality
- Deciding *what* to test and *why*

## The Tester''s New Role

The best testers are increasingly AI-literate collaborators: they use AI tools to do the repetitive, generative work faster — and spend their freed time on the work that needs human intelligence.

Think of it like calculators in maths. Calculators didn''t replace mathematicians — they freed them from arithmetic to focus on harder problems. AI tools are doing the same for testers.

## AI Tools Testers Are Using Now

| Tool | Used for |
|---|---|
| ChatGPT / Claude | Test case generation, bug report drafting, code explanation |
| GitHub Copilot | Autocompleting automation code |
| Testim / Mabl | Self-healing UI test automation |
| Applitools | Visual AI testing (screenshot comparison) |
| Diffblue Cover | AI-generated unit tests for Java |
| Katalon | AI-assisted test generation and maintenance |$$,
$$**Before AI tools:** A tester receives a 20-page requirements document. They spend 3 hours reading, then 4 hours writing test cases.

**With AI tools:** The tester pastes the key requirements into Claude or ChatGPT and asks: "Generate a comprehensive test case list for these requirements." AI produces 60 test cases in 30 seconds. The tester spends 2 hours reviewing, editing, and adding the domain-specific cases AI missed.

Total time: 2 hours vs 7 hours. Quality: the AI covers breadth quickly; the tester adds the nuanced, context-specific cases.

The tester isn''t replaced. They''re more effective.$$,
$$- Assuming AI output is correct without review — AI confidently generates wrong test cases; always review
- Fearing AI will replace you — it won''t; it replaces the least valuable parts of your work
- Using AI as a black box — understand what you''re asking and why; don''t blindly submit AI output
- Ignoring AI tools entirely — testers who refuse to engage will be outpaced by those who do$$,
$$The testers I''ve seen thrive with AI are the ones who treat it like a junior colleague: useful for drafting, generating options, and handling volume — but always reviewed and directed by someone who understands the context. You''re the senior. Act like it.$$,
$$Pick one testing task you do regularly (writing test cases, bug reports, test data). Spend 20 minutes asking ChatGPT or Claude to help with it. Note: what did it do well? What did it miss? How did you improve on it?$$,
$$Which testing activities remain uniquely valuable as human skills even with AI tools available?$$,
$$What is the most accurate way to describe AI''s current impact on the testing profession?$$,
array['I can describe where AI is genuinely impacting QA today','I can explain what remains uniquely human in testing','I understand the AI tools testers are currently using']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 9
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'AI-Assisted Test Case Generation', '11 minute read',
$$Test case generation is one of the highest-ROI uses of AI in testing. This lesson teaches you how to write effective prompts that produce useful test cases — and how to critically review and improve what AI generates.$$,
array['Write effective prompts for AI test case generation','Critically review AI-generated test cases for quality and coverage','Identify gaps in AI-generated test cases that require human knowledge'],
$$## Why AI is Good at Test Case Generation

AI models are trained on vast amounts of software documentation, test cases, and code. They''ve seen thousands of login forms, checkout flows, and user registration pages. When you describe a feature, they can draw on that knowledge to suggest test cases you might have missed.

## The Prompting Formula for Test Cases

Structure your prompt with four elements:
1. **Context:** What is the feature? What does it do?
2. **Format:** How do you want the output? (table, numbered list, Given/When/Then)
3. **Scope:** What should be covered? (happy path, negative, edge cases, security)
4. **Constraints:** Any specific requirements or known risks?

## Prompt Examples

**Weak prompt:**
"Write test cases for the login page."

**Strong prompt:**
"You are an experienced QA engineer testing a web application login feature.

The login page has:
- Email field (required)
- Password field (required, masked)
- Remember me checkbox
- "Forgot password?" link
- Submit button

The system requires email validation, locks accounts after 5 failed attempts for 15 minutes, and supports SSO login via Google.

Generate a comprehensive test case list covering: happy paths, validation errors, account lockout, password edge cases, SSO, and security considerations. Format as a numbered list with: test case title, preconditions, input, expected result."

**Result:** AI will generate 30–40 well-structured test cases covering scenarios you might not have thought of immediately.

## Reviewing AI Output — What to Look For

After AI generates test cases, check for:

1. **Missing business context:** AI doesn''t know your specific users. A banking app should test that accounts from sanctioned countries are rejected. AI won''t know that.

2. **Incorrect assumptions:** AI might assume fields are required when they''re optional in your system.

3. **Missing integration tests:** AI typically generates test cases in isolation. Who tests the flow from login → dashboard → profile update?

4. **Generic vs specific:** AI gives you "test with an invalid email." Your system might specifically care about emails with plus signs (user+tag@example.com) — a specific concern AI wouldn''t know.

5. **Duplicates:** AI often generates variations of the same test case. Prune ruthlessly.$$,
$$**Prompt used:**
"Generate test cases for a password reset flow. The user clicks ''Forgot password'', enters their email, receives a link, clicks it, sets a new password, and is redirected to login. Cover happy path, error states, expiry, and security. Output as a table with: ID, Title, Steps, Expected Result."

**AI output (selected):**
| ID | Title | Expected Result |
|---|---|---|
| TC-001 | Valid email → reset link sent | Email received within 2 minutes |
| TC-007 | Expired link (>1hr) | Error: link expired; show "request new link" |
| TC-012 | Reset link used twice | Second use: error "link already used" |
| TC-018 | New password same as old | Error: "New password must differ from current" |

**Tester''s additions (business context):**
- TC-025: Email address with apostrophe (O''Brien@example.com) — known edge case in our system
- TC-026: Reset requested for an account that was suspended — what happens?
- TC-027: Password reset during active session on another device — does other session expire?

The AI gave breadth; the tester added depth.$$,
$$- Accepting AI output without reading it — always read every test case and verify it makes sense
- Using AI-generated test cases without understanding the feature — if you can''t explain why a test case exists, don''t use it
- Asking for too much in one prompt — complex features work better broken into focused prompts (login separately from registration)$$,
$$Save your best AI prompts for test case generation in a "prompt library" document. A well-crafted prompt for login testing works on every login page you ever test. Build this library over time and you''ll have a powerful personal asset.$$,
$$Choose a feature from your daily life (e.g. a banking app transfer, a food delivery order, a social media post). Write a strong AI prompt and generate test cases using ChatGPT or Claude. Review the output, note 3 gaps, and add the missing test cases.$$,
$$When AI generates test cases, what is the most important thing a tester should do before using them?$$,
$$What makes a prompt for test case generation "strong" compared to a "weak" prompt?$$,
array['I can write a strong, structured prompt for AI test case generation','I can critically review AI output and identify gaps','I can supplement AI-generated test cases with domain-specific knowledge']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 9
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Using AI Tools in Your Daily Testing Workflow', '10 minute read',
$$Beyond test case generation, AI can help at every stage of the testing process. This lesson gives you concrete, practical ways to use AI tools day-to-day — saving hours each week and producing better outputs.$$,
array['Use AI to accelerate bug report writing','Use AI to generate and validate test data','Use GitHub Copilot or AI chat tools to assist with automation code'],
$$## AI for Bug Report Writing

Bug reports are time-consuming to write well. AI can draft them in seconds from your notes.

**Your notes:** "Login crashes on iOS 16.3 Safari when the keyboard autocomplete triggers on the email field. Tried 3 times. Error in console says TypeError: undefined"

**Prompt:** "Convert these tester notes into a professional bug report with: Summary, Environment, Steps to Reproduce, Actual Result, Expected Result, Severity, and any notes."

**AI output:** A complete, well-structured bug report in 10 seconds. You edit for accuracy (AI doesn''t know your specific environment), add the screenshot, and log it.

Time saved: 10 minutes per bug report × 5 bugs per day = ~50 minutes per day.

## AI for Test Data Generation

**Realistic personal data:**
"Generate 20 realistic UK user profiles for test data. Include: full name, email, phone number (UK format), postcode, date of birth (18–65 years old), and occupation. Format as CSV."

**Edge case data:**
"Generate 10 email addresses that are valid RFC 5321 but edge-case: very long local part, plus signs, dots, subdomains, and international domains."

**SQL INSERT statements:**
"Generate SQL INSERT statements for 5 test orders with varying statuses (pending, completed, refunded), different product combinations, and realistic UK addresses."

## AI for Automation Code

**Scenario:** You want to write a Playwright test but aren''t sure of the exact syntax.

**Prompt:** "Write a Playwright TypeScript test that: navigates to a login page, fills in email and password fields using data-testid locators, clicks submit, and asserts the URL changes to /dashboard. Use the Page Object Model."

AI generates the code. You review it, adapt it to your actual locators, and run it.

**GitHub Copilot in your editor:**
Start typing a test description in a comment:
```typescript
// Test: user cannot login with expired password
```
Copilot suggests the entire test body based on existing patterns in your file.

## AI for Understanding Code

When you''re given code to review for testability:
"Explain what this function does and identify the edge cases I should test for it."

Paste the function. AI explains it in plain English and suggests test cases.

## Being a Critical Consumer

AI is a powerful tool and a plausible liar. It confidently produces wrong information. Rules for using AI in testing:
- **Verify outputs against actual behaviour** — AI doesn''t know your specific system
- **Never log an AI-drafted bug report without manually reproducing the bug first**
- **Review automation code before running it** — AI sometimes generates code that compiles but doesn''t test what you intended$$,
$$**Workflow in a sprint:**

Monday 9am: New sprint starts. 4 stories in the backlog.

9:15am: Paste all 4 story descriptions into Claude. Prompt: "Generate test case ideas for each story. Cover happy path, error cases, and edge cases."

9:30am: Review the 60 generated test cases. Delete duplicates, add 8 domain-specific cases, refine wording. 40 quality test cases ready.

Time: 30 minutes instead of 2–3 hours.

During the sprint: Use Copilot to draft automation boilerplate. Use ChatGPT to draft 3 bug reports from field notes. Use AI to generate test data for the edge case scenarios.

End of sprint: More thorough test coverage, more time for exploratory testing, better bug reports.$$,
$$- Copying AI output directly without review — this is the most common and dangerous mistake
- Over-relying on AI for judgement calls — "is this a bug?" requires human context
- Not understanding the code Copilot writes — you own it; make sure you understand it$$,
$$Develop a personal "AI testing workflow" — a list of prompts and processes you''ll use regularly. Share it with your cohort. Teaching others what works cements your own learning.$$,
$$Over the next week, use AI tools for at least 3 testing tasks (test case generation, bug report drafting, test data, or automation code). Document what worked, what didn''t, and how you improved on the AI output.$$,
$$When using AI to draft a bug report from your notes, what must you always do before submitting it?$$,
$$What is the risk of directly using GitHub Copilot''s suggested automation code without reviewing it?$$,
array['I can use AI to accelerate bug report writing','I can prompt AI to generate realistic and edge-case test data','I can use AI tools to assist with automation code while retaining critical review']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 9
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'AI in Automation: Self-Healing Tests & Visual Testing', '9 minute read',
$$Two of the most exciting AI applications in test automation: self-healing tests that fix broken locators automatically, and visual AI testing that catches UI changes no script could detect. This lesson explains both.$$,
array['Explain what self-healing test automation is and how it works','Describe visual AI testing and when to use it','Evaluate which AI automation tools are appropriate for different team contexts'],
$$## The Locator Problem in UI Automation

Every time the UI changes, automation tests break. A button''s CSS class changes, an ID is renamed, an element moves — and 20 tests fail simultaneously.

This is the biggest maintenance cost in UI automation. Teams spend more time fixing broken locators than writing new tests.

## Self-Healing Test Automation

Self-healing automation tools (Testim, Mabl, Healenium) use ML to:
1. Learn multiple ways to identify each element (by position, nearby text, attributes, visual fingerprint)
2. When one identifier breaks, try the others automatically
3. Update the test to use the working identifier going forward
4. Report which elements healed — so engineers can investigate why the UI changed

**Result:** Tests that previously broke on every UI sprint now run for months without manual maintenance.

**Tools:**
- **Testim:** AI-first testing platform; tests recorded in browser, auto-healed
- **Mabl:** Similar; integrates with CI/CD pipelines
- **Healenium:** Open source; adds self-healing to existing Selenium/Playwright suites

## Visual AI Testing

Traditional automation checks: "Is the text 'Welcome' on this page?"

Visual AI testing checks: "Does this page LOOK correct?" It takes screenshots at each step and compares them against a baseline, flagging unexpected visual differences.

**Applitools Eyes** is the industry leader. It uses AI to:
- Ignore intentional differences (dynamic content, timestamps)
- Detect genuine visual regressions (layout shifts, colour changes, missing elements)
- Run tests across browser/device combinations simultaneously

**When to use visual testing:**
- After major UI redesigns (verify the new design is consistent)
- For marketing pages and landing pages (brand consistency matters)
- For complex data visualisations (charts, graphs)
- For multi-browser/device testing (catch IE vs Chrome rendering differences)

**When NOT to use it:**
- For functional logic testing (visual testing catches appearance, not behaviour)
- On highly dynamic pages with content that changes frequently

## The AI Testing Platform Landscape

| Tool | Category | Best for |
|---|---|---|
| Testim | Self-healing UI | Teams tired of Selenium maintenance |
| Mabl | Self-healing UI + API | End-to-end testing teams |
| Applitools | Visual AI | UI consistency, cross-browser |
| Diffblue Cover | Unit test generation | Java codebases |
| Katalon | All-in-one AI testing | Teams wanting one tool |$$,
$$**Before Applitools (visual regression story):**

A frontend developer updates the global CSS for button colours — a quick change. Tests pass (no functional breakage). The change is deployed.

Result: Buttons are now white text on white background in Safari. Unreadable. Found by a customer on the first day. Support tickets filed.

**After Applitools:**

The same CSS change triggers a visual test run. Applitools flags: "Button text contrast has changed in Safari — here is the baseline vs new screenshot."

The developer sees it before deployment. Fix takes 5 minutes.

The AI caught what no functional test could — a visual rendering difference across browsers.$$,
$$- Thinking self-healing tools eliminate maintenance entirely — they reduce it, not eliminate it; still need human review
- Using visual testing for dynamic content (dashboards with live data) — too many false positives
- Ignoring the cost — AI testing tools are subscription-based; justify ROI before recommending them to your team$$,
$$Even without expensive AI tools, you can do basic visual regression testing free with Playwright''s screenshot comparison feature (`await expect(page).toHaveScreenshot()`). Set up baselines, run against each deployment, and review diffs. It''s not AI, but it catches visual regressions before customers do.$$,
$$Research either Testim, Mabl, or Applitools. Find their free trial or demo. Write a 200-word summary: what the tool does, how it handles the locator/visual problem, what it costs, and whether you''d recommend it to a team you work on.$$,
$$What is the primary problem that self-healing test automation tools solve?$$,
$$When is visual AI testing most useful?$$,
array['I can explain how self-healing automation works','I can describe visual AI testing and name at least one tool','I can evaluate when AI testing tools are appropriate for a team']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 9
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Module 9 Assignment & Knowledge Check', '45 minutes',
$$Your AI for Testing assignment. You''ll use AI tools hands-on to generate test cases, draft a bug report, and reflect on how these tools fit into your testing practice.$$,
array['Use AI tools to generate and critically evaluate test cases','Draft a professional bug report using AI assistance','Reflect on how AI changes your testing workflow'],
$$## Your Assignment

### Part 1: AI-Generated Test Cases (30 minutes)

Choose one of these features to test with AI:
- A "Book a flight" search form (origin, destination, dates, passengers, cabin class)
- A "Create a team" feature in a project management app
- A "Make a payment" flow in a banking app

**Step 1:** Write a strong AI prompt for test case generation (use the formula from Lesson 2 — context, format, scope, constraints).

**Step 2:** Run the prompt in ChatGPT, Claude, or your preferred AI tool. Paste the output into your submission.

**Step 3:** Review the output. Identify:
- 3 test cases AI generated that you consider high quality
- 3 test cases that are weak, wrong, or missing context
- 5 test cases AI missed that you would add (using your own testing knowledge)

### Part 2: AI-Assisted Bug Report (15 minutes)

You found the following bug while testing:

*"I was testing the flight search. I set the return date to before the departure date — the 10th of Jan as return, 20th of Jan as departure. Expected: error message. Actual: the search ran and returned flights. No error shown. Tried 3 times on Chrome on my laptop, latest version."*

Use AI to turn these notes into a professional bug report. Paste both your prompt AND the AI output. Then edit the AI output to make it publish-ready.

### Part 3: Reflection (150 words)

1. What surprised you about the AI-generated test cases?
2. Where did AI clearly fall short?
3. How will you use AI tools in your testing work going forward?$$,
null, null, null,
$$Submit all three parts as one document. Include: your prompt, the raw AI output, your edits/additions, and your reflection.$$,
$$After this module — are you more or less confident about AI''s role in your career as a tester? Why?$$,
$$Before submitting: Did you include both the raw AI output AND your edited version? Did you identify specific strengths and gaps in the AI output?$$,
array['I wrote and ran a strong AI prompt for test case generation','I identified strengths and gaps in the AI output','I used AI to draft a bug report and improved on it','I completed the reflection on AI in my testing practice']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 9
on conflict (module_id, lesson_number) do nothing;

-- ═══════════════════════════════════════════════════════════════════
-- MODULE 10: Portfolio Building
-- ═══════════════════════════════════════════════════════════════════

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Why a Portfolio Matters — and What to Include', '9 minute read',
$$Most QA candidates say they can test. A portfolio proves it. This lesson explains why portfolios are increasingly expected in the industry, what to include, and how to frame your work to impress hiring managers.$$,
array['Explain why a QA portfolio is valuable in a job search','List the types of artefacts that make a strong QA portfolio','Describe what hiring managers look for in a QA portfolio'],
$$## The QA Portfolio Problem

Other technical roles have built-in portfolios: developers have GitHub repos, designers have Behance, data scientists have Kaggle. QA testers traditionally had... a list of tools on a CV.

That''s changing. Modern hiring managers expect to see evidence of your skills, not just claims about them. A portfolio lets you:

- Prove you can write test cases, not just say you can
- Show you understand automation, not just that you''ve "used Selenium"
- Demonstrate professional thinking through your documentation
- Stand out from the 80% of candidates who submit a CV with no evidence

## What to Include in a QA Portfolio

**1. Test Case Suite (manual testing)**
A well-written set of test cases for a real or practice application. Demonstrates: can write structured, reusable test cases with clear expected results.

**2. Bug Reports**
3–5 high-quality bug reports, ideally from real bugs you found on real or practice websites. Demonstrates: professional communication, attention to detail, understanding of severity/priority.

**3. Automation Project (GitHub repository)**
A Playwright or Cypress test suite with Page Object Model, running in CI/CD. Demonstrates: automation skills, code quality, DevOps awareness.

**4. API Testing Collection**
A Postman collection with test scripts for a public API. Demonstrates: understands APIs, can write assertions, organised thinker.

**5. SQL Test Queries**
A documented set of data validation queries. Demonstrates: technical depth, database awareness.

**6. Test Plan or Test Strategy**
A lightweight test plan for a feature or sprint. Demonstrates: strategic thinking, not just execution.

**7. Process and Thinking (blog posts or a case study)**
A short write-up of how you approached testing a complex feature. Demonstrates: communication skills, QA thinking process.

## What Hiring Managers Look For

- **Evidence, not assertions:** Show me your bug report, don''t tell me you''re detail-oriented
- **Organisation:** A portfolio that''s hard to navigate is a red flag — organise it clearly
- **Depth over breadth:** 2 excellent pieces are better than 10 mediocre ones
- **Your voice:** A portfolio that sounds like a human with opinions is more compelling than a template$$,
$$**Before portfolio:** "I have 2 years of manual testing experience and I''ve used Jira, Selenium, and Postman."

**After portfolio:** "Here are 3 bug reports I wrote testing the Swag Labs e-commerce site — notice I categorised by severity and included reproduction steps. Here''s my Playwright test suite on GitHub — it''s 12 tests, uses POM, and has a green CI run. Here''s a Postman collection I built for the ReqRes API with assertions on every request."

The second candidate is markedly more hireable. The portfolio turns claims into evidence.$$,
$$- Waiting until you have a "real job" to build a portfolio — practice projects are perfectly valid
- Putting quantity over quality — 2 excellent pieces beat 10 average ones
- Not organising the portfolio — hiring managers spend minutes, not hours; make it easy to navigate
- Hiding your portfolio behind a login — make it publicly accessible$$,
$$A portfolio built during this course — starting from scratch — is more impressive than you might think. A hiring manager seeing a candidate who proactively built projects to practice while learning shows initiative. That''s exactly the mindset employers want.$$,
$$Audit your current portfolio (even if it''s just a list of things you plan to make). List what you have, what you''ll build from this course''s assignments, and what you still need. Create a simple portfolio roadmap.$$,
$$Why is a QA portfolio increasingly important in the modern job market?$$,
$$Which portfolio piece most directly demonstrates automation skills?$$,
array['I can explain why a QA portfolio is valuable','I can list at least 5 types of artefacts for a strong portfolio','I understand what hiring managers look for in a portfolio']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 10
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'GitHub for Testers', '11 minute read',
$$GitHub isn''t just for developers. It''s where QA engineers store their automation code, share their portfolios, and show employers their work. This lesson gets you confident with Git and GitHub — no prior coding experience needed.$$,
array['Create a GitHub repository and push files to it','Understand the basic Git workflow (add, commit, push)','Use GitHub to present your testing portfolio professionally'],
$$## Why QA Engineers Need GitHub

- Store and version-control automation test suites
- Collaborate with developers on the same codebase
- Show employers your work (the GitHub profile IS the portfolio for many tech roles)
- Trigger CI/CD pipelines (GitHub Actions)
- Document your work with READMEs

## Core Git Concepts

**Repository (repo):** A folder tracked by Git. Contains your project files and the history of every change made to them.

**Commit:** A saved snapshot of your changes with a message describing what changed.

**Branch:** A separate line of development. `main` is the default branch. You create branches to work on features without affecting main.

**Push:** Upload your local commits to GitHub (the remote repository).

**Clone:** Download a remote repository to your local machine.

## The Basic Git Workflow

```bash
# 1. Initialise a new repo (or clone an existing one)
git init
# OR
git clone https://github.com/username/repo-name.git

# 2. Make changes to your files

# 3. Stage the changes (tell Git which files to include in the next commit)
git add .              # all files
git add filename.ts   # specific file

# 4. Commit with a descriptive message
git commit -m "Add login test cases for Module 8 assignment"

# 5. Push to GitHub
git push origin main
```

## Setting Up Your QA Portfolio Repository

1. Go to github.com → New repository
2. Name it: `qa-portfolio` (public)
3. Add a README (tick the checkbox)
4. Clone it locally: `git clone https://github.com/yourusername/qa-portfolio.git`

Organise it like this:
```
qa-portfolio/
├── README.md                  ← overview of who you are and what''s here
├── manual-testing/
│   ├── test-cases/            ← your test case spreadsheets or markdown files
│   └── bug-reports/           ← 3–5 professional bug reports
├── api-testing/
│   └── postman-collections/   ← exported .json Postman collections
├── automation/
│   └── playwright-suite/      ← your Playwright project
└── sql/
    └── data-validation-queries.sql
```

## Writing a Great README

Your README.md is the first thing anyone sees. Include:
- Who you are (1–2 sentences)
- What''s in the portfolio
- How to run the automation suite (install steps, run commands)
- Technologies used

Write it as if a hiring manager who knows nothing about you will read it on a Friday afternoon.$$,
$$**Good GitHub README opening:**

```markdown
# QA Portfolio — Jane Smith

Software tester with a focus on manual testing, API testing, and UI automation.
Currently completing the 90-Day Software Testing Career Roadmap by Inside STLC Academy.

## What''s in here

| Section | Contents |
|---|---|
| manual-testing/ | Test cases and bug reports for Swag Labs (e-commerce practice site) |
| api-testing/ | Postman collection for the ReqRes API with 8 requests and test assertions |
| automation/ | Playwright test suite — 5 E2E tests using Page Object Model, CI/CD via GitHub Actions |
| sql/ | Data validation queries for an e-commerce schema |

## Running the Automation

```bash
cd automation/playwright-suite
npm install
npx playwright install
npx playwright test
```

**Stack:** Playwright, TypeScript, GitHub Actions
```

Clean. Professional. Easy to navigate. A hiring manager can understand everything in 60 seconds.$$,
$$- Making the repository private — employers can''t see it; make portfolios public
- Committing sensitive data (real passwords, API keys) — check .gitignore before pushing
- Not writing a README — without it, no one knows what your repo is or how to use it
- Inconsistent commit history — "added stuff" and "fixed things" tell no story; write meaningful commit messages$$,
$$Your GitHub profile picture and bio matter. Add a professional photo (or a clean avatar), write a one-line bio ("QA Engineer | Playwright | API Testing | UK"), and pin your portfolio repo. Employers look at profiles, not just code.$$,
$$Create your `qa-portfolio` GitHub repository with the structure above. Push your test cases from this module (or earlier modules) as the first commit. Write a README. Share the link.$$,
$$Why should your QA portfolio GitHub repository be public (not private)?$$,
$$What is the difference between `git add` and `git commit`?$$,
array['I have a GitHub account and can create a repository','I can execute the basic Git workflow (add, commit, push)','I have a `qa-portfolio` repository with a README and at least one piece of content']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 10
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Documenting Your Testing Work', '10 minute read',
$$How you document your testing work is as important as the work itself. Employers read your artefacts to understand how you think. This lesson covers how to present test cases, bug reports, and test summaries professionally.$$,
array['Structure test documentation for a professional audience','Write concise and effective test case descriptions','Present a test summary report that communicates quality clearly'],
$$## Documenting Test Cases for a Portfolio

Test cases in a portfolio aren''t just for running — they''re evidence of how you think. Write them as if a senior QA engineer who doesn''t know the feature will read them.

**Format options:**
- **Markdown table** (great for GitHub — renders cleanly)
- **Google Sheets / Excel** (familiar to most hiring managers)
- **PDF export** (professional, easy to share)

**What makes portfolio test cases stand out:**
1. Clear, specific titles (not "test login" — "Successful login with valid email/password redirects to dashboard")
2. Explicit preconditions ("User is on /login. No active session.")
3. Numbered steps that someone could follow without knowing the system
4. Expected results that are specific (not "works correctly" — "User is redirected to /dashboard and username appears in top navigation")
5. Negative tests included — shows you think beyond the happy path

## Documenting Bug Reports

A great bug report portfolio demonstrates:
- You write clearly under pressure
- You provide enough detail to reproduce issues without hand-holding
- You understand severity vs priority
- You''ve tested in multiple environments

**Format your bug reports consistently.** Even if the bug is real and the screenshot is genuine, a messy write-up undermines credibility. Use a standard template every time.

## Test Summary Reports

A test summary report after a sprint or release tells the quality story:
- What was tested and what wasn''t
- Pass/fail rates
- Bugs found by severity
- Risk areas
- Recommendation (ready to release? hold? release with known issues?)

A well-written test summary report in your portfolio shows strategic thinking — you understand that testing is in service of a release decision, not just a tick-box exercise.

## The QA Portfolio Case Study

A case study walks through your approach to testing a complete feature or application:

**Structure:**
1. What you were testing (feature/app description)
2. Your test strategy (how you decided what to test)
3. Test cases you wrote
4. Bugs you found (with reports)
5. What you learned

This format is compelling because it tells a story — the hiring manager can see your thinking, not just your outputs.$$,
$$**Portfolio case study excerpt:**

"I chose to test Swag Labs (https://www.saucedemo.com) — an e-commerce practice site — as a portfolio project. I tested the end-to-end purchase flow: login → browse products → add to cart → checkout → order confirmation.

**Strategy:** I focused on the checkout flow as the highest-risk path (money changes hands). I used equivalence partitioning for the form fields and identified 3 decision points requiring boundary testing (quantity, postcode format, card expiry).

**Test cases written:** 22 (14 functional, 5 negative, 3 edge cases)

**Bugs found:**
1. Locked-out user receives generic error instead of account-specific message (High)
2. Cart retains items after logout and re-login as different user (Critical)
3. Checkout total does not include shipping cost in the summary subtotal (Medium)

**What I learned:** The cart persistence bug was the most significant — it''s a data isolation issue that could expose one user''s information to another. I wouldn''t have found it without thinking beyond my own user flow and considering multi-user scenarios."

This is what quality documentation looks like. It shows thinking, not just output.$$,
$$- Generic descriptions ("tested the login") with no specifics — tells employers nothing
- Perfect test cases with no bugs found — real testing always finds something; add more exploratory depth
- Inconsistent formatting across the portfolio — use the same template throughout
- Not explaining your thinking — the WHY is as important as the WHAT$$,
$$Write your portfolio artefacts as if you''re writing to your future self. Clear enough that you''d understand them in 6 months. That standard produces exactly the quality employers appreciate.$$,
$$Write a short case study (300–400 words) documenting your testing of any practice website (Swag Labs, AutomationExercise, The Internet). Follow the case study structure: what, strategy, test cases, bugs found, what you learned.$$,
$$What distinguishes a "portfolio-quality" test case from a basic test case?$$,
$$What does a test summary report demonstrate about a tester''s thinking?$$,
array['I can write test case documentation at a professional standard','I can structure a bug report for a portfolio audience','I can write a case study documenting my testing approach for a feature']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 10
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Building Your Portfolio Website', '10 minute read',
$$A GitHub repo is great. A personal website is even better. This lesson shows you the fastest way to build a simple, professional portfolio site — no web development experience needed.$$,
array['Choose and set up a portfolio website platform','Structure the content of a QA portfolio website effectively','Make your portfolio easily shareable and findable by employers'],
$$## Do You Need a Website?

A GitHub repo is enough for most junior QA roles. But a personal website:
- Looks more polished and intentional
- Is easier to share (one link instead of "here''s my GitHub, and my Google Drive, and...")
- Lets you tell your story in a way a repo can''t
- Differentiates you from candidates who only have a CV

If you''re targeting roles at tech companies, a website signals you take your craft seriously.

## The Fastest Options (No Coding Required)

**Option 1: GitHub Pages (free, simplest)**
GitHub will host a static website from your repository. Great if you already have your portfolio as markdown files.

1. Create a repo named `yourusername.github.io`
2. Add an `index.html` or use a Jekyll theme
3. Your site is live at `https://yourusername.github.io`

**Option 2: Notion (free, easiest)**
Create a Notion page, structure it like a portfolio, and make it public. Share the link.
Pros: Beautiful, no setup. Cons: The URL is ugly (notion.so/yourusername/longid)

**Option 3: Read.cv (free, portfolio-focused)**
read.cv is built specifically for professional portfolios. Clean, minimal, quick to set up.

**Option 4: Wix / Squarespace / Framer (paid)**
More powerful, more customisable. Worth it if you want a genuinely impressive site.

## Portfolio Website Structure

Keep it simple. A one-page site with these sections is all you need:

**1. Introduction**
Name, title ("QA Engineer"), 2–3 sentences about you and what you specialise in.

**2. Skills**
Tools and technologies. Group logically: Testing (Manual Testing, Exploratory Testing, Bug Reporting), Automation (Playwright, Postman), Tools (Jira, Zephyr, SQL).

**3. Projects / Portfolio**
3–5 projects with: title, brief description, what you did, and a link to the artefact or repo.

**4. About**
Background: where you came from, why you moved into testing, what you bring from previous experience.

**5. Contact**
Email link and LinkedIn URL. Nothing else.

## Making Your Portfolio Findable

- Use your full name in the page title
- Add "QA Engineer" or "Software Tester" to the page description
- Link to it from your LinkedIn profile
- Add it to your email signature$$,
$$**Simple but effective portfolio intro:**

"Hi, I''m Jane Smith — a QA engineer transitioning from a customer service background into software testing.

I bring strong attention to detail, clear written communication, and a user-empathy mindset to everything I test. Over the past 90 days I''ve built skills in manual testing, API testing with Postman, and UI automation with Playwright.

My portfolio includes a full test case suite, 4 bug reports from real testing, a Playwright automation project running in CI/CD, and a Postman collection for the ReqRes API.

I''m looking for a junior QA role where I can contribute immediately while continuing to grow."

Clear. Confident. Specific. No fluff.$$,
$$- Overthinking the design — a simple, clean layout beats a complex one that took a week to build
- Not updating it after you get a role — your portfolio is your career asset; maintain it
- Including everything you''ve ever done — curate ruthlessly; quality over quantity
- No contact information — make it easy for employers to reach you$$,
$$Your portfolio website is never finished. Set a calendar reminder every 3 months to update it with new projects, new skills, and new experience. A stale portfolio signals a stale career.$$,
$$Set up your portfolio using one of the options above (GitHub Pages, Notion, or read.cv). Add at least: your introduction, your skills, and one project from this course. Share the link with your cohort for feedback.$$,
$$Why is a personal portfolio website more effective than a GitHub repository alone?$$,
$$What are the five essential sections of a QA portfolio website?$$,
array['I have chosen a portfolio website platform','My portfolio has an introduction, skills section, and at least one project','My portfolio is publicly accessible and I have a shareable link']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 10
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Module 10 Assignment — Portfolio Sprint', '120 minutes',
$$This is your biggest assignment yet. You''ll produce the core artefacts for a complete QA portfolio — the evidence that will support your job applications from this point forward.$$,
array['Produce 3 professional portfolio artefacts','Push them to a GitHub repository with a descriptive README','Present your portfolio in a format ready to share with employers'],
$$## Your Assignment

### Deliverables

**Deliverable 1: Test Case Suite (Google Sheet or Markdown)**

Test any practice website of your choice (recommendations: Swag Labs, AutomationExercise, OpenCart demo, The Internet). Write a test case suite of at least 15 test cases covering:
- At least one complete user journey (e.g. login → browse → add to cart → checkout)
- At least 4 negative test cases
- At least 2 edge cases
Use a professional format with all fields: ID, Title, Preconditions, Steps, Expected Result, Test Data.

**Deliverable 2: Bug Reports**

Find and document at least 3 real bugs on any practice website. Each report must include: Summary, Environment, Steps to Reproduce, Actual Result, Expected Result, Severity, Priority, screenshot.

**Deliverable 3: Portfolio README Update**

Update your `qa-portfolio` GitHub README to:
- Include a clear introduction (who you are, what the portfolio contains)
- List all three deliverables with a brief description of each
- Link to each artefact (test cases as a file, bug reports as a file or folder)
- Include a "Skills" section listing technologies you''ve learned

### Bonus (optional)

Write a 400-word case study for your chosen practice website: your test strategy, interesting bugs you found, and what you''d focus on next.

---

## Assessment

You''ll be assessed on: professional quality of test cases, completeness of bug reports, clarity of README, and evidence that real testing was done (not just theory).$$,
null, null, null,
$$Submit your GitHub portfolio link. Make sure it''s public. Your tutor will navigate the repository as a hiring manager would — introduction first, then artefacts.$$,
$$Looking at your finished portfolio: if you were a hiring manager, would you interview this person? What would you want to see more of?$$,
$$Before submitting: Is your GitHub repo public? Does the README link to your artefacts? Do your bug reports include screenshots?$$,
array['I have a complete test case suite of at least 15 test cases on GitHub','I have at least 3 complete bug reports with screenshots on GitHub','My portfolio README is clear, professional, and links to all artefacts','My portfolio is public and ready to share']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 10
on conflict (module_id, lesson_number) do nothing;

-- ═══════════════════════════════════════════════════════════════════
-- MODULE 11: CV & LinkedIn Mastery
-- ═══════════════════════════════════════════════════════════════════

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'The QA CV That Gets Interviews', '12 minute read',
$$A CV is a marketing document. It doesn''t have to list everything you''ve done — it has to convince a hiring manager to give you 30 minutes. This lesson shows you how to write a QA CV that does exactly that.$$,
array['Structure a QA CV using the format that hiring managers prefer','Write bullet points that demonstrate impact, not just activities','Tailor a CV for a specific job description'],
$$## CV vs Resume

In the UK, it''s called a CV (Curriculum Vitae). In the US, it''s a resume. For QA roles they''re the same thing: a 1–2 page document summarising your experience and skills.

Target length: **2 pages maximum.** Hiring managers spend an average of 7 seconds on a first pass.

## CV Structure for QA Roles

**1. Name and Contact Details**
Full name (large, prominent), email, phone, LinkedIn URL, portfolio URL, location (city, not full address). No photo required in UK job applications.

**2. Professional Summary (3–4 sentences)**
Who you are, what you specialise in, and what you bring. Written in third person is optional; first person is increasingly common and more personable.

**3. Skills**
Two columns of your key technical and methodology skills. Not sentences — just keywords that ATS (Applicant Tracking Systems) scan for. Include: tools, methodologies, and platforms.

**4. Professional Experience**
Reverse chronological (most recent first). For each role: company, job title, dates, 3–5 bullet points.

**5. Education & Certifications**
Degree (if applicable), ISTQB Foundation/Advanced, any relevant certifications.

**6. Portfolio (link)**
Direct link to your portfolio website or GitHub.

## Writing Impact Bullet Points

The formula: **Action verb + What you did + The result/impact**

**Weak:** "Responsible for testing the checkout feature."
**Strong:** "Designed and executed 40 test cases for the checkout flow, identifying 3 critical defects before release that prevented an estimated £15,000 in customer refund costs."

**Weak:** "Used Playwright for automation."
**Strong:** "Implemented a 25-test Playwright E2E suite using Page Object Model, reducing manual regression time from 4 hours to 8 minutes per sprint."

You don''t always have exact numbers — estimate honestly. "3 sprints" or "approximately 20 hours saved" is fine.

## Tailoring to Job Descriptions

Most candidates send the same CV to every role. The ones who get interviews tailor it.

**Process:**
1. Read the job description carefully
2. Highlight the 5 most important requirements
3. Make sure your CV addresses each one explicitly
4. Mirror the exact language the job uses (if they say "Agile Scrum", use "Agile Scrum", not "Agile")

ATS systems often filter CVs before humans see them. If the job says "Playwright" and your CV says "automated UI testing", you may be filtered out.$$,
$$**Before tailoring (applying to a Playwright + Agile role):**
Skills section: "Test automation, Selenium, manual testing, Agile"

**After tailoring:**
Skills section: "Test automation (Playwright, TypeScript), Agile Scrum, manual testing, Selenium"

Summary before: "Experienced tester with automation skills looking for a new challenge."

Summary after: "QA engineer with 2 years'' manual and automation testing experience in Agile teams. Specialism in Playwright UI automation and API testing with Postman. Seeking a role where I can contribute to quality in fast-moving product teams."

The second version matches the job description language and is specific about skills. It takes 3 extra minutes to write and significantly improves interview chances.$$,
$$- CV longer than 2 pages — cut ruthlessly; every line must earn its place
- Listing responsibilities instead of achievements ("I was responsible for" vs "I reduced")
- Same CV for every application — tailoring is the single highest ROI activity in job searching
- No portfolio link — for QA roles, evidence is expected
- Using "References available on request" — this wastes a line; it''s assumed$$,
$$Get your CV reviewed by 3 people before sending it: one QA professional (for technical accuracy), one hiring manager or recruiter (for format and impression), and one non-technical friend (for clarity). Each will catch something different.$$,
$$Find a real QA job listing that interests you. Rewrite your CV summary and skills section to specifically target that role. Compare your before and after — what changed?$$,
$$What is the correct formula for a strong CV bullet point?$$,
$$Why is tailoring a CV to each job description important?$$,
array['My CV is 2 pages or fewer','Each bullet point follows the action-impact formula','My CV includes a portfolio link','I understand how to tailor my CV for a specific job description']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 11
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'LinkedIn Profile Optimisation for QA', '10 minute read',
$$LinkedIn is where 85% of hiring happens. Your profile is a CV that works 24/7. This lesson shows you how to optimise your LinkedIn profile to attract recruiters and stand out in QA-specific searches.$$,
array['Optimise a LinkedIn profile headline and summary for QA roles','Use the LinkedIn experience section to demonstrate QA impact','Understand how LinkedIn search works and how to rank for relevant terms'],
$$## Why LinkedIn Matters More Than You Think

Many candidates underestimate LinkedIn. Recruiters use it to:
- Search for candidates proactively (not just wait for applications)
- Verify CVs (does your LinkedIn match your CV?)
- Assess your professional brand (what do you post? how do you engage?)
- Check who you know in common

A strong LinkedIn profile generates inbound interest — recruiters contact you, not just the other way around.

## The Headline

LinkedIn''s algorithm weights the headline heavily. Don''t waste it on just your job title.

**Weak:** "Looking for new opportunities"
**Weak:** "Tester at ABC Company"

**Strong:** "QA Engineer | Playwright | API Testing | Agile | ISTQB | Open to work"

The headline is prime keyword real estate. Pack it with the terms recruiters search for.

## The About Section

Write in first person. Tell your story in 3–4 paragraphs:

1. **Who you are** — your background and how you got into testing
2. **What you specialise in** — tools, methodologies, types of testing
3. **What you''ve delivered** — 2–3 concrete examples or achievements
4. **What you''re looking for** — type of role, team, industry

End with a call to action: "Open to QA Engineer opportunities in fintech and SaaS. Connect or message me."

## The Experience Section

Match your CV bullet points. For each role:
- Use quantified, impact-focused bullets (same formula as CV)
- Add links to portfolio artefacts directly in the experience entries (LinkedIn supports media attachments)

## Featured Section

Pin your best portfolio pieces:
- Link to your GitHub portfolio
- Screenshot of your CI/CD green build
- Your portfolio website

This section appears prominently on your profile and is the first thing many visitors explore.

## Skills and Endorsements

Add every relevant skill: Selenium, Playwright, Postman, SQL, Jira, Agile, ISTQB, API Testing, Regression Testing, etc. Get connections to endorse them — even 3–5 endorsements signal credibility.

## Activity and Engagement

Commenting on posts by QA influencers, sharing your learning, and posting about projects you''re working on builds visibility. Recruiters notice active profiles. Even one thoughtful comment per week is more than 90% of users.$$,
$$**Before/After LinkedIn Headline:**

Before: "Software Tester at XYZ Company"

After: "QA Engineer | Manual & Automation Testing | Playwright | Postman | ISTQB Foundation | Agile Scrum | UK"

The second version contains 8 searchable keywords. When a recruiter searches "QA Engineer Playwright UK", you now appear in results. The first version would not.$$,
$$- Not having a photo — profiles without photos get significantly fewer views
- A generic "summary" that says nothing specific ("I am a detail-oriented team player")
- Not enabling "Open to Work" when you are looking — recruiters use this filter
- Connections under 100 — LinkedIn limits search visibility for low-connection profiles; connect with everyone you know$$,
$$Connect with everyone you''ve ever worked with, studied with, or met professionally. 500+ connections isn''t vanity — it increases your visibility in LinkedIn''s algorithm and means you''re one connection away from most hiring managers in your industry.$$,
$$Update your LinkedIn profile with the optimised headline, an improved About section, and at least 3 Featured items (portfolio link, GitHub, or a post about your learning). Share your updated profile URL in the course community for feedback.$$,
$$What is the most important section to optimise for LinkedIn search visibility?$$,
$$What should the LinkedIn Featured section contain for a QA professional?$$,
array['My LinkedIn headline contains relevant QA keywords','My About section tells my story in 3–4 clear paragraphs','I have at least 3 items in the Featured section','I have the key QA skills listed in the Skills section']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 11
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Getting Found by Recruiters & the Hidden Job Market', '9 minute read',
$$Most jobs are filled before they''re advertised. The "hidden job market" is real — and the candidates who access it get less competition and better offers. This lesson shows you how to get found, not just how to apply.$$,
array['Explain what the hidden job market is and how to access it','Build a targeted networking strategy for QA roles','Use LinkedIn outreach to get in front of hiring managers directly'],
$$## The Hidden Job Market

Studies suggest 60–80% of jobs are filled without ever being publicly advertised. They''re filled by:
- Internal referrals
- Candidates recruiters already know
- People who reached out before the job was posted

This means applying to job boards alone means you''re competing for 20–40% of available roles — the hardest ones (most competition, slowest process).

## How to Access the Hidden Market

**1. Build your network before you need it**
Connect with QA engineers, test leads, and engineering managers at companies you want to work for. Comment on their posts. Share useful content. Become a familiar name — not a cold applicant.

**2. Talk to recruiters proactively**
Technology-sector recruiters (like Hays Technology, Nigel Frank, Mason Frank for QA roles) have access to roles before they''re posted. Connect with specialist QA recruiters on LinkedIn. A 15-minute call can put you in front of 10 companies.

**3. Direct outreach to hiring managers**
Find engineering managers or QA leads at companies you admire. Send a short, personalised note:

"Hi [Name], I''ve been following [Company]''s work on [specific product/blog/talk] and I admire how you approach [specific aspect]. I''m a QA engineer specialising in Playwright and API testing, exploring opportunities at product companies like yours. Would you be open to a 15-minute conversation? I''d love to learn more about how your team approaches quality."

This works. Most people don''t do it because it feels uncomfortable. That''s why it''s effective.

**4. QA Communities**
- Ministry of Testing (ministryoftesting.com) — the largest QA community
- QA Stack community (Discord, Slack channels)
- Local meetups (Meetup.com → search "software testing" + your city)

Being visible in communities leads to introductions, referrals, and opportunities that never appear on job boards.

## Referrals — The Most Powerful Route

A referral from someone inside the company is 5× more likely to result in an interview than a cold application. Every course colleague, former colleague, and connection is a potential referrer. Invest in those relationships.$$,
$$**Outreach message that got a response:**

"Hi Priya, I came across your post about building a test automation strategy for a distributed team — really resonated with me, especially the point about test ownership. I''m currently a manual tester building Playwright skills and exploring product QA roles. Would you be open to a 15-minute conversation about how quality works at [Company]? No agenda other than learning — happy to be flexible on timing."

Response: "Hi Jane, what a nice message! Happy to chat. Here''s my Calendly link."

Two weeks later: Jane was referred internally. She got an interview. She got the job.

The message worked because: it was specific (mentioned the actual post), it was genuine (not asking for a job), and it made saying yes easy (low commitment — 15 minutes, flexible timing).$$,
$$- Applying to hundreds of jobs without networking — high volume, low conversion
- Treating networking as transactional ("I need a job") — build real connections first
- Giving up after 2 rejections — job searching is a numbers game with a long tail
- Only applying when "ready" — the best time to start building your network is before you''re looking$$,
$$Write 3 LinkedIn outreach messages right now — to 3 QA professionals you admire (can be people you''ve found via content, not people you know). Send them. Track the responses. One conversation from this exercise is worth 50 job board applications.$$,
$$Write and send one LinkedIn message to a QA engineer or test lead at a company you''d like to work for. Share what you sent (no names needed) and whether you received a reply.$$,
$$What is the "hidden job market" and why does it matter?$$,
$$Why is a referral 5× more effective than a cold application?$$,
array['I understand what the hidden job market is','I have identified 3 companies I''d like to target and connected with someone at each','I have sent at least 1 outreach message to a QA professional']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 11
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Module 11 Assignment — CV & LinkedIn Audit', '60 minutes',
$$Time to put your career materials together. This assignment produces the CV and LinkedIn profile you''ll actually use in your job search.$$,
array['Produce a polished, tailored QA CV','Optimise a LinkedIn profile for QA job searches','Receive and apply peer feedback on career materials'],
$$## Your Assignment

### Part 1: QA CV

Produce or significantly update your QA CV. Requirements:
- Maximum 2 pages
- Professional summary (3–4 sentences, specific to QA)
- Skills section with relevant tools and methodologies
- Experience section with impact-focused bullets (action-impact formula)
- Education and certifications
- Portfolio link

Tailor your CV to ONE specific job posting (include the job URL in your submission). In a covering note (half a page), explain the 3 changes you made specifically for this role.

### Part 2: LinkedIn Profile

Share the URL to your updated LinkedIn profile. It must have:
- Optimised headline with QA keywords
- About section in first person (3–4 paragraphs)
- Featured section with at least 2 portfolio links
- Skills section with at least 8 relevant skills listed
- Your most recent relevant experience with bullet points

### Part 3: Peer Review

Exchange your CV with one other course participant. Give and receive feedback on:
- Does the summary clearly communicate their QA specialisation?
- Are the bullet points impact-focused or activity-focused?
- Does the skills section match the industry language?
- Is the portfolio link prominent and working?

Write 5 specific pieces of feedback. Apply the feedback you receive.

---

## Assessment

Your tutor will review your CV and LinkedIn profile as a hiring manager would. They''ll assess: clarity, impact focus, ATS-friendliness, and whether the portfolio link is accessible.$$,
null, null, null,
$$Submit: your CV as a PDF, your LinkedIn URL, the job posting URL you tailored for, and your peer feedback notes.$$,
$$Looking at your CV — if you were a hiring manager, what would you want to ask about? Is your portfolio link prominent? Does your summary make you want to read further?$$,
$$Before submitting: Is your CV under 2 pages? Are all bullet points using the action-impact formula? Is your LinkedIn URL personalised (not the default number string)?$$,
array['My CV is 2 pages or fewer with all required sections','My CV is tailored to a specific job posting','My LinkedIn profile has an optimised headline and About section','I have given and received peer feedback']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 11
on conflict (module_id, lesson_number) do nothing;

-- ═══════════════════════════════════════════════════════════════════
-- MODULE 12: Interview Mastery & Job Search
-- ═══════════════════════════════════════════════════════════════════

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Types of QA Interviews & What to Expect', '10 minute read',
$$QA interviews come in many forms — and being surprised by the format costs you. This lesson maps out every type of QA interview you''re likely to encounter, what each one tests, and how to prepare specifically for each.$$,
array['Describe the main types of QA interview formats','Explain what each interview stage assesses','Prepare appropriately for each stage of a typical QA interview process'],
$$## The Typical QA Interview Process

Most QA roles have 2–4 stages:

**Stage 1: Recruiter Screen (20–30 minutes)**
A recruiter checks basic fit: salary expectations, notice period, location, high-level experience. Not deeply technical. Focus: be clear and confident about what you''re looking for.

**Stage 2: Technical Screen (30–60 minutes)**
Often with a QA lead or senior engineer. Tests: testing theory, tool knowledge, process understanding. May include scenario questions ("how would you test X?").

**Stage 3: Technical Assessment / Take-Home Task**
A practical exercise. Common formats:
- Exploratory testing session on a demo app — find bugs, document them
- Write test cases for a given feature description
- Write a simple automation script
Time typically: 1–3 hours. Some companies expect this before Stage 2.

**Stage 4: Final Interview (60–90 minutes)**
With hiring manager and possibly the team. Covers: behavioural questions (STAR method), culture fit, deeper technical discussion. May include a portfolio walkthrough.

## Question Types by Stage

**Testing theory questions (Stage 2)**
- "What''s the difference between smoke testing and regression testing?"
- "Explain the difference between verification and validation."
- "What''s the test pyramid?"
- "How do you decide what to automate?"

**Scenario questions (Stage 2 & 4)**
- "How would you test a login page?"
- "You''ve found a critical bug 1 hour before release. What do you do?"
- "The developer says your bug isn''t a bug. What do you do?"

**Behavioural questions (Stage 4 — STAR format)**
- "Tell me about a time you found a critical bug."
- "Describe a situation where you disagreed with a developer."
- "Tell me about a time your testing prevented a major issue."

**Portfolio questions (Stage 4)**
- "Walk me through this test suite."
- "Why did you choose this locator strategy?"
- "What would you do differently if you were starting this over?"$$,
$$**What the interview process looks like at a mid-size tech company:**

Week 1: Apply. Recruiter calls within 3 days.
Week 2: 45-minute Zoom with the QA lead. Covers: test theory, tool experience, one scenario question.
Week 2: Take-home test — 90 minutes to test a demo e-commerce app and submit a bug report + test case summary.
Week 3: Final interview — 60 minutes with QA lead + engineering manager. Behavioural questions + portfolio walkthrough + "do you have questions for us?"

Total time from application to offer: 3 weeks. Common for companies that are well-organised. Some companies take 6–8 weeks. Some make offers in 5 days.

Knowing the stages means you can prepare the right things at the right time.$$,
$$- Not asking about the interview format when you schedule it — always ask: "Can you tell me what the interview will involve so I can prepare?"
- Over-preparing for the wrong stage — most interview coaching focuses on behavioural questions, but QA interviews often fail candidates at the technical screen
- Not practising out loud — thinking an answer vs saying it are completely different skills
- Treating every stage as equally formal — the recruiter screen is a conversation; the final is a performance$$,
$$The best preparation for "how would you test X?" is to actually test things. The more apps you''ve tested and documented, the more naturally these answers come. Your portfolio projects aren''t just evidence — they''re practice for these questions.$$,
$$Research 3 real QA job listings. For each, identify: what interview stages they mention, what skills they emphasise, and what one question you''d struggle to answer. Plan how to address those gaps.$$,
$$What does Stage 2 (Technical Screen) of a QA interview typically assess?$$,
$$What is the purpose of a "take-home technical assessment" in a QA interview?$$,
array['I can describe the 4 main stages of a QA interview process','I understand what each stage tests','I have researched the interview format for roles I''m targeting']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 12
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Technical Interview Questions — Answered', '13 minute read',
$$The 20 most common QA technical interview questions — with model answers. Use these to prepare, practise, and adapt to your own experience.$$,
array['Answer common QA testing theory questions confidently','Explain testing concepts clearly without jargon','Handle "how would you test X?" scenario questions systematically'],
$$## Testing Theory — The Questions You Will Be Asked

**Q: What is the difference between verification and validation?**
Verification: Are we building the product right? (checking against specifications, reviewing designs)
Validation: Are we building the right product? (checking it meets user needs, user acceptance testing)

**Q: What is smoke testing? What is regression testing?**
Smoke testing: A quick, shallow test of the most critical functions after a new build — "does it basically work?"
Regression testing: A broader test to ensure that new changes haven''t broken existing functionality.

**Q: What is exploratory testing?**
Simultaneous learning, test design, and test execution. The tester designs tests as they execute them, guided by what they discover. Not ad hoc — it''s structured through charters, time boxes, and documentation.

**Q: What''s the difference between functional and non-functional testing?**
Functional: Does the feature do what it''s supposed to? (login works, order is placed)
Non-functional: How well does it do it? (performance, security, accessibility, usability)

**Q: Explain the Test Pyramid.**
Three layers:
- Bottom: Unit tests (many, fast, cheap, written by developers)
- Middle: API/integration tests (moderate number, fast, reliable)
- Top: UI/E2E tests (few, slow, expensive to maintain)
Ideal: more tests at the bottom, fewer at the top.

**Q: What is a test plan? What does it contain?**
A test plan documents the scope, approach, resources, and schedule for testing. Key sections: objectives, scope, approach, test environments, test data, risks, entry/exit criteria.

## Scenario Questions — The Framework

When asked "How would you test X?", use this structure:

1. **Clarify** — "Can I ask a few questions first? What platform is this? Who are the users?"
2. **Scope** — "I''d test: functional behaviour, edge cases, error handling, and a few non-functional aspects."
3. **Happy path** — walk through the main flow
4. **Negative cases** — invalid input, error states
5. **Edge cases** — boundaries, special characters, timing
6. **Non-functional** — performance, security, accessibility
7. **Sign off** — "I''d also check with the BA if there are any business rules I should know about."

**Example Q: "How would you test a lift/elevator?"**
Structure your answer: Happy path (press a floor button, lift arrives, doors open, ride to floor, doors open). Negative: button doesn''t work, overweight sensor. Edge: pressing all floors simultaneously, fire mode. Non-functional: door timing, weight capacity, accessibility (audio announcements, Braille buttons). Security: what happens if the emergency button is pressed?

This structured approach shows a senior QA mindset — even for a non-software question.

**Example Q: "You find a critical bug 30 minutes before release. What do you do?"**
1. Document and communicate immediately — raise it to the QA lead, dev lead, and product owner
2. Assess impact — how many users affected? Is there a workaround?
3. Help make the decision — "This affects the checkout flow for 100% of users. My recommendation is to delay release until fixed. But that''s a business call."
4. If released with the bug: document it, monitor it, and prioritise the fix

Don''t say "block the release" without evidence. Don''t say "it''s not my decision" without giving your assessment. Act like a QA professional with a voice.$$,
$$**Interview transcript — scenario question handled well:**

Interviewer: "How would you test a login page?"

Candidate: "Happy to walk you through that. Before I start, can I ask — is this a web app, mobile, or both? And are there any specific concerns you have, like login via social media or SSO?"

Interviewer: "Good questions. Web app, standard email/password, no SSO for now."

Candidate: "Great. I''d start with the happy paths — valid credentials, successful login, redirect to the expected page. Then I''d cover the negative cases: wrong password, unregistered email, empty fields. Then edge cases: password at maximum length, email with unusual formatting, SQL injection in the email field. For non-functional: I''d check the password is masked and not visible in the page source, check that failed attempts are rate-limited, and check the session expires after the correct timeout period.

I''d also check the ''Forgot password'' flow and the ''Remember me'' option if those exist on your system. Does that cover the scope you had in mind?"

Interviewer (impressed): "Yes — actually more than we were expecting."

This answer shows structure, asks smart questions, covers all categories, and confirms scope at the end. That''s a senior answer from someone who hasn''t had a senior job yet.$$,
$$- Saying "I don''t know" to testing theory questions without attempting an answer — always give a partial answer and ask if they can clarify
- Answering scenario questions without asking clarifying questions first — shows you think before acting
- Using jargon without being able to explain it — if you mention "shift-left testing", be ready to explain it in plain English
- Not practising out loud — interview answers that sound great in your head sound very different when you say them$$,
$$Mock interviews are the single best way to prepare. Find a fellow student or friend to interview you using 5 questions from this lesson. Record it. Watch it back. You''ll immediately see what to improve.$$,
$$Write out your answers to these 5 questions as if you''re in an interview. Then record yourself saying them out loud. Watch back and note: Did you hesitate? Did you use filler words? Were your answers concise?
1. What is regression testing?
2. How would you test a search bar?
3. What''s the test pyramid?
4. You find a bug — what do you do?
5. What''s the difference between severity and priority?$$,
$$When asked "how would you test X?" what is the FIRST thing a strong candidate should do?$$,
$$What''s the difference between smoke testing and regression testing?$$,
array['I can answer testing theory questions in plain English','I can structure a "how would you test X?" answer systematically','I have practised answers out loud for at least 5 common questions']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 12
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Behavioural Interviews — STAR Method for QA', '10 minute read',
$$Behavioural questions test how you''ve handled real situations — because past behaviour predicts future behaviour. This lesson teaches you the STAR method and how to prepare powerful, specific answers that show QA maturity.$$,
array['Use the STAR method to structure behavioural interview answers','Prepare STAR answers for the 5 most common QA behavioural questions','Deliver answers that demonstrate QA professionalism and judgement'],
$$## The STAR Method

**S — Situation:** Set the scene briefly. Where were you? What project? What was happening?
**T — Task:** What was your specific responsibility in this situation?
**A — Action:** What did YOU do? Specific, first-person actions.
**R — Result:** What happened? Quantify if possible. What did you learn?

Target length: 2–3 minutes per answer. Practise to this timing.

## The 5 QA Behavioural Questions — With STAR Frameworks

**Q: "Tell me about a time you found a critical bug."**
S: Describe the project and the feature you were testing
T: What were you testing and what were the stakes?
A: How did you find the bug? What did you do when you found it?
R: What was the outcome? Was it fixed? What was the impact of finding vs missing it?

**Q: "Tell me about a time you disagreed with a developer about a bug."**
S: What was the bug? What did the developer say?
T: Your role was to advocate for quality
A: How did you handle the disagreement? Did you escalate? Provide evidence? Find a compromise?
R: What happened? Was it fixed? What did you learn about working with developers?

**Q: "Describe a time you worked under pressure to a tight deadline."**
S: What was the release timeline? What happened?
T: You had to test X in Y time
A: How did you prioritise? What did you test first? What did you communicate?
R: Did you release? Any issues? What would you do differently?

**Q: "Tell me about a time you improved a testing process."**
S: What was the existing process? What was the problem?
T: You identified an improvement
A: What did you propose and implement?
R: What changed? How was it received? What was the impact?

**Q: "Describe a time you had to communicate bad news about quality to a stakeholder."**
S: What was the situation? Who was the stakeholder?
T: You needed to communicate difficult information
A: How did you prepare? How did you frame it? What evidence did you use?
R: How was it received? What happened next?

## If You Don''t Have "Real" Experience

Many of the best STAR answers come from:
- Course projects (testing practice apps — real bugs, real decisions)
- Non-QA roles (customer service: "I raised a product quality concern with management...")
- Volunteering or side projects

The key: be specific. A detailed story from a course project beats a vague story from a real job.$$,
$$**Full STAR answer for "Tell me about a time you found a critical bug":**

"During my portfolio project testing the Swag Labs e-commerce app, I was testing the checkout flow. My task was to verify the complete purchase journey.

While testing, I discovered that after completing a purchase, if I pressed the browser back button twice and refreshed, the order was placed a second time — but the system showed it as a new order with a new ID, and charged again. The user had no indication this had happened.

I documented the bug with full reproduction steps, a video recording, and classified it as Critical — because it would result in double charges to customers and duplicate orders the business would need to fulfil.

I also raised two related questions: was there a server-side idempotency check to prevent this? And was the session being cleared after purchase?

I included this bug in my portfolio case study as an example of finding issues beyond the scripted test path. In an interview at [Company], the hiring manager said it was one of the most interesting portfolio bugs they''d seen — because it showed I think about the user''s actual behaviour, not just the happy path flow.

The lesson I took: always test what happens after the happy path, not just during it."

This answer is specific, shows QA thinking, and connects to real outcomes (the interview itself).$$,
$$- Answering with hypothetical situations ("I would do X") instead of real ones — behavioural questions want evidence, not plans
- Vague answers with no specific details — "I improved the testing process" means nothing without specifics
- Focusing on the team ("we") not your individual contribution — STAR answers should be about YOU
- Going over 4 minutes — rehearse to 2–3 minutes maximum$$,
$$Write your STAR stories before the interview, not during it. Prepare 10 stories from your experience (real or project-based) that cover different themes: finding a bug, improving a process, working under pressure, disagreeing with a colleague, learning a new skill. You''ll use them across many interviews.$$,
$$Prepare a full STAR answer for each of the 5 questions above. Write them out fully, then practise saying them out loud until each is 2–3 minutes. Record one and watch it back.$$,
$$In the STAR method, what should the "Action" part focus on?$$,
$$Why is a specific project-based story often better than a vague work experience story in a behavioural interview?$$,
array['I understand the STAR method and can apply it to any question','I have prepared written STAR answers for 5 common QA behavioural questions','I have practised at least 2 STAR answers out loud']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 12
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Salary, Negotiation & Evaluating Offers', '9 minute read',
$$Most candidates accept the first offer. The ones who negotiate earn 10–20% more — often without any risk to the offer. This lesson teaches you how to research market rates, negotiate confidently, and evaluate an offer holistically.$$,
array['Research market salary rates for QA roles accurately','Use proven negotiation language to improve a job offer','Evaluate a job offer beyond salary using a holistic framework'],
$$## Researching Market Rates

Before you negotiate, know the market. UK QA salary ranges (2024 benchmarks):

| Role | London | Major UK Cities | Remote |
|---|---|---|---|
| Junior QA Engineer | £28–38k | £24–32k | £26–34k |
| Mid QA Engineer | £38–52k | £32–45k | £35–48k |
| Senior QA Engineer | £52–70k | £45–60k | £50–65k |
| QA Lead | £65–85k | £55–72k | £60–78k |

**Where to research:**
- Glassdoor (search company name + QA Engineer)
- LinkedIn Salary Insights
- ITJobsWatch (UK-specific, historical data)
- Levels.fyi (tech companies)
- Ask recruiters directly — they know the market and are happy to share

## The Negotiation Conversation

Most candidates don''t negotiate because they''re afraid of losing the offer. In reality: offers are almost never withdrawn for negotiating professionally.

**When you receive an offer:**
Don''t accept on the call. Say: "Thank you so much — I''m really excited about this opportunity. Can I have 48 hours to review everything and come back to you?"

This gives you time to research, think, and prepare your response.

**If the offer is lower than you need:**
"Thank you for the offer. I''m very interested in joining [Company] and I''m enthusiastic about the role. Based on my research and the skills I bring — particularly [specific skills: Playwright experience, API testing, ISTQB] — I was expecting something closer to [X]. Is there any flexibility on the base salary?"

**Key principles:**
- Be specific (name a number — "I was expecting £36,000" not "a bit more")
- Anchor to market data or your value, not personal need
- Stay warm and positive throughout
- If salary can''t move: ask about start date, signing bonus, training budget, additional holidays

## Evaluating an Offer Holistically

Salary is one number. The full offer includes:

| Factor | Questions to ask |
|---|---|
| Base salary | Is it market rate? |
| Bonus | Target? History of paying out? |
| Remote/hybrid | How many days in office? |
| Learning budget | Is there a dedicated budget for courses, certifications? |
| Career progression | When do people typically get promoted? |
| Team and culture | Who will you work with daily? How does the team approach quality? |
| Tech stack | Will you be using modern tools or legacy systems? |
| Company stability | Is the company growing? Well-funded? |

A £5k higher salary at a company that will stagnate your career is worse than a £5k lower salary at a place that will make you a senior engineer in 2 years.$$,
$$**Negotiation in practice:**

Company offers: £30,000

Research shows: Junior QA roles in this city typically pay £28–36k. Candidate has Playwright and ISTQB — above average for junior level.

Candidate response: "Thank you for the offer — I''m genuinely excited about this role and the team. Based on my research and my Playwright skills, which I understand are in high demand, I was hoping for something closer to £33,000. Is there any flexibility there?"

Company: "We can go to £32,000."

Candidate: "That works for me — I''m happy to accept at £32,000."

Result: £2,000 more per year. Over 3 years: £6,000. The conversation took 2 minutes.

The candidate didn''t demand. They asked politely with a reason. They accepted a counter-offer that was better than the original. This is how most negotiations go.$$,
$$- Accepting the first offer without any conversation — you almost always have room to negotiate
- Giving your current salary when asked — "What are you currently earning?" is a negotiation trap; you can say "I''m looking for X" instead
- Negotiating by saying "I need more to pay my rent" — negotiate on value and market, not personal need
- Not having a number ready — if you negotiate without a specific number, you''ll be pushed into one anyway; come prepared$$,
$$The best negotiation leverage is another offer. If you have two companies interested simultaneously, both offers go up. Always try to manage timelines so offers come in at the same time.$$,
$$Research the market rate for Junior QA Engineer roles in your target location using at least 2 sources. Note: the range, how it varies by company size and industry, and what specific skills (Playwright, ISTQB, API testing) add to base salary. Write a one-page research summary.$$,
$$If a company offered you 10% less than you wanted, what would you say? Write the exact words you''d use.$$,
$$What is the safest way to respond when a recruiter asks "What''s your current salary?"?$$,
$$What is the first thing you should do when you receive a job offer — before accepting or negotiating?$$,
array['I have researched market rates for QA roles in my target location','I can articulate my negotiation position with a specific number and reason','I know how to evaluate a job offer using a holistic framework']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 12
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Module 12 Assignment — Your Final Mock Interview', '90 minutes',
$$The final assignment of the 90-Day programme. You''ll complete a full mock interview experience — answering technical and behavioural questions in writing, then reflecting on your readiness to enter the QA job market.$$,
array['Demonstrate command of QA technical knowledge in interview format','Present STAR behavioural answers clearly and specifically','Identify your strengths and final preparation areas before job searching'],
$$## Your Final Assignment

### Part 1: Technical Questions (written answers)

Answer all 5 of the following questions as if you were in a technical interview. Aim for 150–200 words per answer:

1. Explain the difference between black-box and white-box testing, and give an example of when you''d use each.
2. "How would you test a QR code scanner feature in a mobile banking app?" (walk through your approach systematically)
3. You''re one day before a release. Your regression suite has 3 failing tests. What do you do?
4. A product manager asks you: "How confident are we that this release is safe?" How do you answer?
5. Describe your approach to API testing and the tools you use.

### Part 2: STAR Behavioural Answers

Write full STAR answers (target 300 words each) for 2 of these questions:
- "Tell me about a time you caught a significant bug."
- "Describe a situation where you improved a team''s testing process."
- "Tell me about a time you had to deliver difficult news to a stakeholder."

### Part 3: Portfolio Walkthrough (written)

Imagine you''re in the final interview stage and the interviewer says: "Walk me through your portfolio." Write a 300-word walkthrough of your actual portfolio — what you''ve built, why, and what it demonstrates.

### Part 4: Final Reflection (200 words)

Looking back at 12 modules: What are your 3 strongest areas going into the job market? What are your 2 areas for continued development? What is your 30-day plan from today?

---

## A Final Word

You have now completed the 90-Day Software Testing Career Roadmap. You know more about quality engineering than most people who call themselves testers. You have a portfolio, a CV, a LinkedIn profile, and interview answers ready.

The only thing left is to go get the job. We''re rooting for you.$$,
null, null, null,
$$Submit all four parts as a single document. This is your final assessment — give it your best effort.$$,
$$Reflecting on everything you''ve covered in 90 days: what changed most in how you think about software testing?$$,
$$Before submitting: Is each technical answer over 150 words? Do your STAR answers have a specific, measurable result? Does your portfolio walkthrough mention specific artefacts?$$,
array['I answered all 5 technical questions clearly and in my own words','I wrote full STAR answers for 2 behavioural questions','I wrote a portfolio walkthrough referencing my actual work','I completed the final reflection with a 30-day action plan']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 12
on conflict (module_id, lesson_number) do nothing;
