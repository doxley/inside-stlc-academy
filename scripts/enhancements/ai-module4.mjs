// AI for QA Testers — Module 4: Requirements Analysis with AI. Lesson enhancements.
export default {
  courseSlug: 'ai-for-qa-testers',
  moduleNumber: 4,
  lessons: [
    {
      lessonNumber: 1,
      enhancements: {
        industryStory: `A story said "users can search products". It shipped with no handling for no-results, special characters or very long queries — gaps nobody spotted at refinement. A tester now runs stories through AI first to surface exactly these gaps before code is written.`,
        davidTip: `The cheapest defect to fix is one caught in the requirement. Using AI as a second pair of eyes on a story — for ambiguity and missing cases — is some of the highest-leverage testing you can do.`,
        miniChallenge: `Take a short user story and ask AI to list missing scenarios. Turn its output into three questions you would raise at refinement.`,
        modelAnswer: `## Example — "users can search products"\nQuestions raised: "What shows when there are no results?" "How are special characters / very long queries handled?" "Is search case-insensitive and does it handle typos?"`,
        resourcePreview: {
          name: 'AI Requirement Review Workbook', purpose: 'Guides using AI to find gaps, ambiguity and missing acceptance criteria in stories.',
          whenToUse: 'Use it when reviewing a story or preparing for refinement.', formats: ['PDF', 'DOCX'],
        },
      },
    },
    {
      lessonNumber: 2,
      enhancements: {
        industryStory: `Acceptance criteria read "search should work well and be fast". Untestable. A tester used AI to rewrite them into specific, checkable criteria — and refinement became far sharper.`,
        badGood: {
          label: 'acceptance criteria',
          bad: `"Search should work well and be fast."`,
          good: `"Given a catalogue, when a user searches a term, then matching results appear within 2s; an empty term shows a prompt; a no-match search shows a friendly 'no results' message."`,
        },
        davidTip: `Use AI to spot vague, untestable criteria and propose specific versions — but you confirm them with the team. Treat "should work well" as a defect in the requirement, not something to test around.`,
        miniChallenge: `Take a vague acceptance criterion and use AI to help turn it into two or three specific, testable criteria.`,
        modelAnswer: `## Example\nVague: "the form should be user-friendly." Testable: "all fields have labels; errors appear inline next to the field; the form can be completed using keyboard only."`,
      },
    },
    {
      lessonNumber: 3,
      enhancements: {
        industryStory: `A requirement quietly contradicted itself — one line said guests could checkout, another required a saved address. AI flagged the conflict in seconds when asked to look for ambiguities and edge cases. The tester raised it before a single line was built.`,
        visualAid: {
          type: 'comparison', title: 'What to ask AI to find in a requirement',
          headers: ['Issue', 'Example'],
          rows: [
            ['Ambiguity', '"fast", "user-friendly", undefined terms'],
            ['Missing cases', 'no error / empty / unauthorised path'],
            ['Conflicts', 'two rules that contradict'],
            ['Edge cases', 'limits, special characters, timeouts'],
          ],
        },
        davidTip: `Ask AI to "act as a QA analyst and list ambiguities, missing scenarios and conflicts" in a story. Then turn its findings into questions — you are using AI to think wider, not to replace your judgement.`,
        miniChallenge: `Run a real story through that prompt and pick the two most important issues it surfaces.`,
        modelAnswer: `## Example\nFor a "guest checkout" story, AI flagged: no mention of what happens if payment fails, an undefined "high-value order" term, and a conflict with a rule requiring login for orders over £100. Top two: the payment-failure path and the conflict.`,
        resourcePreview: {
          name: 'AI Requirement Review Workbook', purpose: 'A structured way to surface ambiguity, gaps and edge cases with AI.',
          whenToUse: 'Use it to review any story before development starts.', formats: ['PDF', 'DOCX'],
        },
      },
    },
    {
      lessonNumber: 4,
      enhancements: {
        industryStory: `Before building a payments change, a tester asked AI to brainstorm what could go wrong. It surfaced risks — partial payments, currency rounding, duplicate charges — that shaped the test plan and caught a real bug early.`,
        davidTip: `AI is a strong brainstorming partner for risk: it widens the "what could go wrong" list quickly. You then prioritise by real likelihood and impact — the widening is AI's job, the judgement is yours.`,
        miniChallenge: `For a feature you know, ask AI to list potential risks, then pick the top three by likelihood × impact.`,
        modelAnswer: `## Example — discount codes\nAI risks: codes stacking, expired codes still applying, negative totals, codes shared publicly. Top three by impact: expired codes applying, stacking to negative totals, and codes leaking publicly.`,
        portfolioBuilder: `A short "AI-assisted risk analysis" for a feature is a great portfolio artefact — it shows risk-based thinking plus modern tooling.`,
      },
    },
    {
      lessonNumber: 5,
      enhancements: {
        davidTip: `For this assignment, turn AI's findings into team-ready questions, not raw output. The skill is converting "AI found these gaps" into "here is what I would ask in refinement".`,
        miniChallenge: `Before submitting, make sure each AI-found gap is phrased as a clear question you could raise with the team, and the two most important are marked.`,
        managersReview: {
          intro: 'If I received this requirement-review assignment as a QA lead, I would look for:',
          strengths: ['Real ambiguities and gaps identified', 'Findings turned into sharp questions', 'Testable acceptance criteria proposed'],
          gaps: ['Raw AI output pasted unedited', 'Vague criteria left unchallenged', 'No prioritisation of the gaps'],
          improvements: ['Phrase findings as questions', 'Rewrite weak criteria to be testable', 'Mark the highest-risk gaps'],
        },
      },
    },
  ],
};
