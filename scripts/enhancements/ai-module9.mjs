// AI for QA Testers — Module 9: Automation Support with AI. Lesson enhancements.
export default {
  courseSlug: 'ai-for-qa-testers',
  moduleNumber: 9,
  lessons: [
    {
      lessonNumber: 1,
      enhancements: {
        industryStory: `A manual tester moving into automation used AI to explain unfamiliar code and draft a first test. It removed the blank-page fear and accelerated their learning — as long as they ran and understood everything before trusting it.`,
        davidTip: `AI lowers the barrier into automation: it explains code, drafts tests and suggests selectors. But you must run and understand the output — copying code you cannot debug just moves the problem downstream.`,
        miniChallenge: `List three automation tasks AI could help you with as you learn, and one risk of relying on it too heavily.`,
        modelAnswer: `## Example\nHelp with: explaining an error, drafting a first test, suggesting a locator. Risk: copying code I do not understand, so I cannot fix it when it breaks — which is why I run and review everything.`,
        resourcePreview: {
          name: 'AI Prompt Library (100 Prompts)', purpose: 'Includes automation-support prompts for tests, selectors and debugging.',
          whenToUse: 'Use it as a starting point for automation help.', formats: ['PDF', 'DOCX'],
        },
      },
    },
    {
      lessonNumber: 2,
      enhancements: {
        industryStory: `AI suggested a brittle CSS selector (div > div:nth-child(3)) for a button. The tester knew better and swapped it for a role-based locator. AI accelerates scaffolding, but you apply good-practice judgement to what it produces.`,
        badGood: {
          label: 'an AI-suggested locator',
          bad: `page.locator('div.container > div:nth-child(3) > button')`,
          good: `page.getByRole('button', { name: 'Sign in' })`,
        },
        davidTip: `AI is happy to hand you brittle CSS selectors. Ask for user-facing locators (role/label), or fix them yourself — stable locators are where automation reliability lives, and AI does not always default to them.`,
        miniChallenge: `Ask AI to scaffold a test for a simple flow, then review the locators and rewrite any brittle ones as user-facing locators.`,
        modelAnswer: `## Example\nAI scaffolded a login test using nth-child selectors. I replaced them with getByLabel('Email') and getByRole('button', { name: 'Sign in' }) so the test survives markup changes.`,
      },
    },
    {
      lessonNumber: 3,
      enhancements: {
        industryStory: `A flaky test failed randomly. The tester pasted it (sanitised) into AI, which spotted a fixed wait and suggested a web-first assertion. They applied it, re-ran, and the flakiness disappeared — verified, not assumed.`,
        davidTip: `AI is excellent at explaining errors and suggesting refactors — pair it with the actual failure detail (trace/log). Always re-run after applying a fix to confirm the behaviour is unchanged; never trust the explanation alone.`,
        miniChallenge: `Take a flaky or failing test (or describe one), ask AI to explain and fix it, and note how you would verify the fix.`,
        modelAnswer: `## Example\nAI identified a waitForTimeout before an assertion and suggested replacing it with expect(locator).toBeVisible(). I applied it and ran the test 10× with --repeat-each to confirm it is now stable.`,
      },
    },
    {
      lessonNumber: 4,
      enhancements: {
        industryStory: `An automation suite needed fresh, varied test data and the occasional refactor. AI generated synthetic data and suggested where to extract a shared helper — small accelerations that kept the suite healthy without replacing the engineer's decisions.`,
        davidTip: `Use AI for the grind of automation maintenance — synthetic data, boilerplate, refactor suggestions — so you spend your time on design and reliability. Keep it to synthetic data and verify refactors do not change behaviour.`,
        miniChallenge: `Ask AI to generate synthetic test data for a flow and to suggest one refactor to reduce duplication; note what you would verify before applying.`,
        modelAnswer: `## Example\nAI generated 10 synthetic users and suggested extracting a shared login into a fixture. Before applying, I would run the suite to confirm behaviour is unchanged after the refactor.`,
        portfolioBuilder: `An "AI-assisted automation" note — prompts you used, what you accepted/changed — complements any automation samples in your portfolio.`,
      },
    },
    {
      lessonNumber: 5,
      enhancements: {
        davidTip: `For this assignment, show AI accelerating automation work while you keep ownership — good locators, verified fixes, understood code. The judgement is the point, not the volume of generated code.`,
        miniChallenge: `Before submitting, ensure any AI-generated code is reviewed (locators, assertions) and you can explain how each part works.`,
        managersReview: {
          intro: 'If I reviewed this automation-support assignment as a QA lead, I would look for:',
          strengths: ['AI used to accelerate, with code reviewed', 'Robust locators and verified fixes', 'Synthetic data only'],
          gaps: ['Brittle AI locators kept', 'Fixes applied without re-running', 'Code the author cannot explain'],
          improvements: ['Rewrite brittle locators', 'Verify every fix by re-running', 'Make sure you understand the code'],
        },
      },
    },
  ],
};
