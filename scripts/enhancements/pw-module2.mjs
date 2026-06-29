// Playwright — Module 2: Behaviour Driven Development (BDD). Enhancements.
export default {
  courseSlug: 'practical-test-automation-playwright',
  moduleNumber: 2,
  lessons: [
    {
      lessonNumber: 1,
      enhancements: {
        industryStory: `A vague ticket "add login" led to three different interpretations across the team and a rebuild. Rewritten as "Given a registered user, When they enter valid credentials, Then they see their dashboard", everyone agreed exactly what to build and test. That alignment is the real value of BDD.`,
        davidTip: `BDD's payoff is the conversation it forces before coding — shared understanding between business, dev and test. The feature files are a by-product of getting everyone aligned on behaviour first.`,
        miniChallenge: `Rewrite a vague requirement you've seen as a single Given/When/Then sentence.`,
        modelAnswer: `## Example\nVague: "the cart should update." BDD: "Given an item in the cart, When the user changes its quantity to 3, Then the cart total updates to reflect 3 units."`,
      },
    },
    {
      lessonNumber: 2,
      enhancements: {
        industryStory: `A story said "users can search" and shipped with no handling for no-results or special characters — because the acceptance criteria never mentioned them. Strong, testable criteria are where BDD scenarios (and defects avoided) come from.`,
        badGood: {
          label: 'acceptance criteria',
          bad: `"Search should work well and be fast."`,
          good: `"Given a catalogue, when a user searches a term, then matching results appear within 2s; an empty term shows a prompt; a no-match shows a friendly 'no results' message."`,
        },
        davidTip: `Treat vague acceptance criteria as a defect in the requirement. "Should work well" is untestable — push for specifics. Each clear criterion becomes one or more Gherkin scenarios.`,
        miniChallenge: `Take "As a user I can reset my password" and write three testable acceptance criteria (include one negative).`,
        modelAnswer: `## Example\n- Given a registered email, when I request a reset, then I get a link within 2 minutes.\n- Given an unregistered email, then I see the same confirmation (no account disclosure).\n- Given an expired link, when I use it, then I'm told it expired and offered a new one.`,
      },
    },
    {
      lessonNumber: 3,
      enhancements: {
        industryStory: `A tester wrote feature steps as "click #login-btn" — brittle and unreadable. Switching to behaviour-level steps ("When they sign in") made the feature file readable by the product owner and stable against UI changes. Gherkin done well is living documentation.`,
        visualAid: {
          type: 'comparison', title: 'Core Gherkin keywords',
          headers: ['Keyword', 'Role'],
          rows: [
            ['Feature', 'The capability described'],
            ['Scenario', 'One concrete example of behaviour'],
            ['Given', 'Starting context / pre-conditions'],
            ['When', 'The action / event'],
            ['Then', 'The expected outcome'],
          ],
        },
        davidTip: `Keep steps at the behaviour level ("When they sign in"), not the click level ("click #login-btn"). Behaviour-level steps are reusable, readable, and survive UI changes — the clicks belong in step definitions.`,
        miniChallenge: `Write a feature file with one Feature and two scenarios (a success and a failure) for a sign-up form.`,
        modelAnswer: `## Example\nFeature: Sign up\n  Scenario: Successful sign up\n    Given a visitor on the sign-up page\n    When they submit valid details\n    Then their account is created and they're logged in\n  Scenario: Duplicate email\n    Given an email already registered\n    When they submit it\n    Then they see "email already in use"`,
      },
    },
    {
      lessonNumber: 4,
      enhancements: {
        industryStory: `A feature file had eight near-identical scenarios for different discount codes. Collapsed into one Scenario Outline with an Examples table, it became concise and easy to extend — adding a case is now a one-line data change.`,
        visualAid: {
          type: 'comparison', title: 'Scenario Outline — discount codes',
          headers: ['code', 'result'],
          rows: [
            ['SAVE10', '10% discount applied'],
            ['EXPIRED', 'code has expired'],
            ['INVALID', 'code not recognised'],
          ],
        },
        davidTip: `Reach for a Scenario Outline when the same steps run with different data — it's perfect for boundary and equivalence sets. Keep the table focused; huge tables hide intent.`,
        miniChallenge: `Convert two similar scenarios into a single Scenario Outline with an Examples table.`,
        modelAnswer: `## Example\nScenario Outline: Applying a discount code\n  When the user applies "<code>"\n  Then they see "<result>"\n  Examples: | code | result | (one row per case above)`,
      },
    },
    {
      lessonNumber: 5,
      enhancements: {
        industryStory: `A product owner read the checkout.feature file and confirmed the rules were correct — without seeing a line of code. That is BDD working as living documentation, and it only happens when scenarios are written to be read.`,
        davidTip: `The readability test: could a non-technical colleague read your feature file and confirm the behaviour is right? Consistent vocabulary, one behaviour per scenario, business language — that's the bar.`,
        miniChallenge: `Review a feature file you wrote and improve it: consistent wording, one behaviour per scenario, plain language.`,
        modelAnswer: `## Example\nBefore: a scenario testing login AND redirect AND a welcome message. After: split into focused scenarios, each asserting one behaviour, with consistent "signs in" wording throughout.`,
        portfolioBuilder: `Clean, readable feature files in your capstone repo signal that you understand BDD as collaboration and documentation — not just test syntax.`,
        resourcePreview: {
          name: 'Test Structure & Naming Conventions Guide', purpose: 'Keep tests and scenarios readable and well-organised as the suite grows.',
          whenToUse: 'Apply it to your feature files and spec structure.', formats: ['PDF', 'DOCX'],
        },
      },
    },
  ],
};
