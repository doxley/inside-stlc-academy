// Playwright — Module 11: Framework Maintenance. Enhancements.
export default {
  courseSlug: 'practical-test-automation-playwright',
  moduleNumber: 11,
  lessons: [
    {
      lessonNumber: 1,
      enhancements: {
        industryStory: `A test failed about 1 in 5 runs and the team just hit "re-run" until it passed — until a real bug hid behind that noise. Running it with --repeat-each made the flakiness reproducible, the trace showed a click before the element was ready, and a web-first assertion fixed it for good.`,
        davidTip: `Run a suspect test with --repeat-each=10 to make flakiness reproducible — a test you can't make fail reliably is one you can't prove you've fixed. Then open the trace and fix the root cause; never paper over it with retries.`,
        miniChallenge: `Take a suspect test, run it with --repeat-each, and use the checklist (sleeps? awaits? shared state? brittle locators?) plus the trace to find the cause.`,
        modelAnswer: `## Example\n--repeat-each=10 reproduced the failure ~twice; the trace showed a click before the button was enabled. Replacing a waitForTimeout with expect(button).toBeEnabled() then click() made it pass 10/10.`,
        resourcePreview: {
          name: 'Flaky Test Troubleshooting Checklist', purpose: 'Systematically diagnose and fix tests that pass and fail randomly.',
          whenToUse: 'Work through it whenever a test is flaky.', formats: ['PDF', 'DOCX'],
        },
      },
    },
    {
      lessonNumber: 2,
      enhancements: {
        industryStory: `The same login code appeared in ten specs; brittle selectors and dead tests piled up until changes took forever. Tackling the highest-impact debt first — flaky and duplicated code — restored momentum. Test code is real code and accrues debt.`,
        davidTip: `Fix the debt that costs you trust or time first — flaky and duplicated code — before cosmetic tidy-ups. Refactor little and often rather than waiting for a big-bang rewrite.`,
        miniChallenge: `Identify two pieces of technical debt in a suite and say which you'd fix first and why.`,
        modelAnswer: `## Example\nDebt: (1) login duplicated across 10 specs, (2) inconsistent test naming. Fix (1) first — extract a fixture — because it costs time on every change and risks inconsistency; naming is cosmetic and can follow.`,
      },
    },
    {
      lessonNumber: 3,
      enhancements: {
        industryStory: `A reviewer approved a PR without reading it, and a waitForTimeout-laden flaky test slipped into the suite. A structured review — reliability, locators, independence — would have caught it. Reviewing automation well keeps the suite healthy.`,
        davidTip: `Even as a junior, leaving clear, constructive review comments gets you noticed. Focus reviews on reliability and readability over style — and be specific: "switch this waitForTimeout to expect(locator).toBeVisible()".`,
        miniChallenge: `Review a test against the checklist and write two specific, constructive comments.`,
        modelAnswer: `## Example\nComment 1: "This uses waitForTimeout(2000) before the assertion — can we use expect(locator).toBeVisible()? Faster and removes a likely flake." Comment 2: "These two tests share data — can each create its own so they can run in parallel?"`,
        resourcePreview: {
          name: 'Code Review Checklist for Test Automation', purpose: 'A structured way to review (or self-review) test pull requests.',
          whenToUse: 'Use it on every automation PR.', formats: ['PDF', 'DOCX'],
        },
      },
    },
    {
      lessonNumber: 4,
      enhancements: {
        industryStory: `A big refactor changed behaviour by accident and broke two flows, because nobody ran the tests between steps. Refactoring in small, verified steps — using the suite as a safety net — keeps behaviour intact while the code improves.`,
        davidTip: `Refactor in small, behaviour-preserving steps and run the affected tests after each one. The suite you built is your safety net — commit each working step so a mistake is easy to undo.`,
        miniChallenge: `Perform a small refactor (e.g. extract a fixture), running tests before and after to confirm behaviour is unchanged.`,
        modelAnswer: `## Example\nExtracted a shared login fixture in one commit, ran the suite (all green), then committed. Behaviour unchanged, duplication gone — and if it had failed, one small revert undoes it.`,
      },
    },
    {
      lessonNumber: 5,
      enhancements: {
        industryStory: `A suite quietly crept from 5 to 30 minutes over months as everything went into slow UI tests, eroding the fast feedback that made it valuable. Pushing checks to the right layer and running in parallel brought it back under control.`,
        davidTip: `Track your suite's run time and flake rate over months, not just today. Keep it fast by using the right layer (API over UI), API-driven setup, parallelism, and pruning redundant tests before it becomes a bottleneck.`,
        miniChallenge: `Identify one slow test and describe how you'd speed it up — layer, setup, or parallelism.`,
        modelAnswer: `## Example\nA slow UI test that set up data via clicks: move the setup to an API call and keep only the behaviour under test in the UI. Combined with parallel workers, the suite's overall time drops sharply.`,
        portfolioBuilder: `Demonstrating maintenance thinking — flaky-test fixes, refactors, performance — in your capstone README signals you can keep a real suite healthy, not just write one.`,
      },
    },
  ],
};
