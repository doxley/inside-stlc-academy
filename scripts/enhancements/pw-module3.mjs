// Playwright — Module 3: Step Definitions. Enhancements.
export default {
  courseSlug: 'practical-test-automation-playwright',
  moduleNumber: 3,
  lessons: [
    {
      lessonNumber: 1,
      enhancements: {
        industryStory: `A new engineer put locators straight into step definitions; when the UI changed, fixes were scattered everywhere. Keeping feature (what), step definition (glue) and page object (how/locators) as distinct layers is what makes a BDD framework maintainable.`,
        visualAid: {
          type: 'flow', title: 'Three layers of a BDD framework',
          steps: [
            { label: 'Feature file', detail: 'what (behaviour)' },
            { label: 'Step definition', detail: 'glue' },
            { label: 'Page object', detail: 'how (locators)' },
          ],
        },
        davidTip: `Keep the layers separate: features describe behaviour, step definitions translate it to actions, page objects hold the locators. When the UI changes, you fix one place — that separation is the whole point.`,
        miniChallenge: `Take one scenario and list the step definitions it needs, with a one-line note on what each will do.`,
        modelAnswer: `## Example — "successful login"\nGiven a registered user → seed/ensure a user exists. When they sign in with valid credentials → loginPage.login(user, pass). Then they see the dashboard → assert dashboard heading visible.`,
      },
    },
    {
      lessonNumber: 2,
      enhancements: {
        industryStory: `A Then step quietly performed a click before asserting — so when it failed, nobody could tell if the action or the check broke. Keeping Given/When/Then honest (setup / one action / assertion only) makes failures instantly diagnosable.`,
        badGood: {
          label: 'a Then step',
          bad: `Then('dashboard shows', async () => { await page.click('text=Refresh'); await expect(heading).toBeVisible(); })`,
          good: `Then('dashboard shows', async () => { await expect(heading).toBeVisible(); }) // assertion only`,
        },
        davidTip: `Given sets up state, When performs the single action under test, Then only asserts. If a Then needs to click something first, the scenario is probably testing two behaviours — split it.`,
        miniChallenge: `Write the Given/When/Then step implementations (pseudocode is fine) for a login scenario, each doing only its job.`,
        modelAnswer: `## Example\nGiven → await loginPage.goto(); (and ensure user exists)\nWhen → await loginPage.login(user, pass);\nThen → await expect(dashboard.heading()).toBeVisible();`,
      },
    },
    {
      lessonNumber: 3,
      enhancements: {
        industryStory: `A team wrote a separate step definition for every discount code — dozens of near-identical functions. Parameterising one step to capture the code collapsed them into a single, reusable definition that pairs perfectly with Scenario Outlines.`,
        davidTip: `Parameterise steps to capture values from the Gherkin text, so one definition serves many scenarios. Combined with Scenario Outlines, your feature files stay tiny while coverage grows.`,
        miniChallenge: `Turn a hard-coded step ("When the user applies SAVE10") into a parameterised step that accepts any code.`,
        modelAnswer: `## Example\nWhen('the user applies {string}', async (code) => { await basket.applyCode(code); }); — one definition now handles SAVE10, EXPIRED, INVALID and any future code.`,
      },
    },
    {
      lessonNumber: 4,
      enhancements: {
        industryStory: `Two engineers wrote "Given a logged-in user" with slightly different wording, creating two near-duplicate steps. A shared step vocabulary and a common login step removed the duplication across checkout, account and dashboard features.`,
        davidTip: `Write steps at the behaviour level so they're reusable, and agree a shared step vocabulary with your team. Most duplication comes from two people phrasing the same action differently — a glossary prevents it.`,
        miniChallenge: `Find (or imagine) two near-duplicate steps and merge them into one reusable, well-worded step.`,
        modelAnswer: `## Example\n"Given the user is signed in" and "Given a logged-in user" → standardise on one: "Given a logged-in user", reused everywhere, implemented once.`,
        resourcePreview: {
          name: 'Code Review Checklist for Test Automation', purpose: 'Catch duplication and brittleness in step definitions and tests.',
          whenToUse: 'Use it when reviewing step definitions for reuse.', formats: ['PDF', 'DOCX'],
        },
      },
    },
    {
      lessonNumber: 5,
      enhancements: {
        industryStory: `A "fat" step definition packed with locators and waits was impossible to read or reuse. Slimmed to a single line delegating to a page object, it became clear glue — and the framework's real strength moved into well-tested page objects.`,
        badGood: {
          label: 'a step definition',
          bad: `When('place order', async () => { await page.waitForTimeout(2000); await page.click('.checkout > button.pay'); /* + more logic */ })`,
          good: `When('place order', async () => { await checkoutPage.placeOrder(); }) // thin glue`,
        },
        davidTip: `Keep step definitions thin — one responsibility, delegating to page objects, no hard waits. The thinner the glue, the more your framework's strength lives in tested page objects and utilities.`,
        miniChallenge: `Refactor a "fat" step definition to be thin — move locators and logic into a page object.`,
        modelAnswer: `## Example\nMoved the selector and waiting logic into checkoutPage.placeOrder(); the step becomes one readable line, and the page object can be reused and tested independently.`,
        portfolioBuilder: `Thin, well-organised step definitions in your capstone repo demonstrate the maintainable layering that senior reviewers look for.`,
      },
    },
  ],
};
