// AI for QA Testers — Resource Vault, batch 1 (Prompt Library + Framework).
const COURSE = 'AI for QA Testers';
const proTip = (text) => ({ t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text });

// 100 QA prompts across 16 categories.
const CATEGORIES = [
  ['Requirements Analysis', [
    'Act as a senior QA analyst. Review this requirement for clarity, gaps and testability, and list the questions I should raise: [paste].',
    'Identify any ambiguous or vague terms in this requirement and suggest measurable alternatives: [paste].',
    'List assumptions a developer might make from this requirement that should be confirmed: [paste].',
    'Highlight missing error-handling and edge conditions in this requirement: [paste].',
    'Summarise this requirement in one sentence and list what is explicitly out of scope: [paste].',
    'What non-functional requirements (performance, security, accessibility) are implied but not stated here? [paste].',
  ]],
  ['Acceptance Criteria', [
    'Review these acceptance criteria for completeness and list missing scenarios: [paste].',
    'Rewrite these acceptance criteria as clear Given/When/Then statements: [paste].',
    'What negative and boundary cases are not covered by these acceptance criteria? [paste].',
    'Are these acceptance criteria measurable and testable? Flag any that are not and suggest fixes: [paste].',
    'Generate acceptance criteria for this user story, including at least one negative case: [paste].',
    'Identify hidden assumptions in these acceptance criteria: [paste].',
  ]],
  ['Test Cases', [
    'Generate test cases for this feature as a table (Title, Steps, Expected, Priority), covering valid, invalid and boundary inputs: [paste].',
    'Using boundary value analysis, list the exact boundary inputs to test for this field: [paste].',
    'Apply equivalence partitioning to this input and give one representative value per partition: [paste].',
    'Review these test cases for duplication, gaps and unclear expected results: [paste].',
    'Prioritise these test cases by risk and explain your reasoning: [paste].',
    'Generate negative and edge-case test cases I likely missed for this feature: [paste].',
  ]],
  ['Exploratory Testing', [
    'Draft three exploratory testing charters for this feature (explore X to discover Y using Z): [paste].',
    'Generate user personas (new, power, careless, malicious, accessibility) to test this feature from different angles: [paste].',
    'Brainstorm 20 "what could go wrong" scenarios for this feature, grouped by theme: [paste].',
    'Suggest the highest-risk areas of this feature to explore first and why: [paste].',
    'Turn these exploratory findings into clear, reproducible notes: [paste].',
    'Suggest creative edge cases a scripted test plan would likely miss for this feature: [paste].',
  ]],
  ['Regression Testing', [
    'Given this change, list existing areas that could be impacted and should be regression tested: [paste].',
    'Draft a risk-based regression checklist for this release of changes: [paste].',
    'Which critical user journeys should always be in our core regression suite? [context].',
    'Suggest which of these tests are good automation candidates for regression and why: [paste].',
    'Help me scope a regression pass when I only have limited time for this change: [paste].',
    'Identify previously fixed defects that should be re-verified after this change: [paste].',
  ]],
  ['API Testing', [
    'Explain what this API endpoint does, its inputs, outputs and status codes: [paste docs].',
    'List API test scenarios for this endpoint: success, validation errors, auth failures, boundaries: [paste].',
    'For each scenario, what status code and response should I expect? [paste].',
    'Draft a valid and an invalid JSON request body for this endpoint: [paste].',
    'What security and authorisation risks should I test for this endpoint? [paste].',
    'Generate synthetic test data for this endpoint (use example.com, no real data): [paste].',
  ]],
  ['Automation Support', [
    'Scaffold a Playwright test (Arrange-Act-Assert) for this scenario: [paste].',
    'Suggest stable locators (test ids/roles) instead of these fragile selectors: [paste].',
    'Explain this test failure / stack trace and suggest likely causes: [paste].',
    'Refactor this test for readability and maintainability without changing what it verifies: [paste].',
    'Why might this test be flaky, and how do I fix it properly? [paste].',
    'Generate synthetic, data-driven test data for this automated test: [paste].',
  ]],
  ['Bug Reports', [
    'Turn these rough notes into a structured bug report (title, env, steps, expected, actual): [paste].',
    'Improve the clarity of this bug report without changing any facts: [paste].',
    'Suggest a concise, descriptive title for this defect: [paste].',
    'What information is missing from this bug report for a developer to reproduce it? [paste].',
    'Suggest a severity and priority for this defect with reasoning (I will confirm): [paste].',
    'Reduce these reproduction steps to the minimum that still triggers the bug: [paste].',
  ]],
  ['Root Cause Analysis', [
    'Suggest possible root causes for this defect as hypotheses to investigate: [paste].',
    'What variables should I change to isolate this bug (browser, data, account, network)? [paste].',
    'Group these related defects and suggest a possible systemic cause: [paste].',
    'Summarise this long defect thread into a clear problem statement: [paste].',
    'What questions should I ask to get to the root cause of this issue? [paste].',
    'Given this error pattern, what areas of the system are most likely involved? [paste].',
  ]],
  ['Risk Assessment', [
    'Brainstorm risks for this feature across functional, security, performance and data: [paste].',
    'Help me rate these risks by likelihood and impact (I will set the final ratings): [paste].',
    'Which of these risks warrant the deepest testing, and why? [paste].',
    'What could go wrong with this feature that the team may not have considered? [paste].',
    'Translate these risks into a focused test plan outline: [paste].',
    'Identify data-integrity risks in this feature: [paste].',
  ]],
  ['Test Planning', [
    'Draft a concise test plan outline (scope, approach, entry/exit, risks) for this release: [paste].',
    'Suggest entry and exit criteria for testing this feature: [paste].',
    'Outline the test levels and types appropriate for this change: [paste].',
    'Help me define what is in and explicitly out of scope for this release: [paste].',
    'Draft a stakeholder-friendly test summary from these results: [paste].',
    'Suggest meaningful QA metrics for this project and the decision each supports: [context].',
  ]],
  ['User Stories', [
    'Rewrite this requirement as a clear user story (As a… I want… so that…): [paste].',
    'Critique this user story against INVEST and suggest improvements: [paste].',
    'Split this large user story into smaller, testable stories: [paste].',
    'Generate acceptance criteria and test scenarios for this user story: [paste].',
    'What clarifying questions should I raise about this user story in refinement? [paste].',
    'Identify the testability concerns in this user story: [paste].',
  ]],
  ['Documentation', [
    'Summarise these test results for stakeholders, leading with risk and impact: [paste].',
    'Turn these notes into a clear test summary report: [paste].',
    'Draft a concise README for this test project / portfolio piece: [paste].',
    'Rewrite this technical update for a non-technical audience: [paste].',
    'Create a short how-to for running these tests: [paste].',
    'Summarise this module of work into three bullet points for a status update: [paste].',
  ]],
  ['Leadership', [
    'Suggest process improvements from these defect trends to discuss in a retro: [paste].',
    'Help me prepare talking points to advocate for more testing time using risk: [context].',
    'Draft a coaching plan to help a junior tester improve bug-report quality: [context].',
    'Suggest how to introduce risk-based testing to a team new to it: [context].',
    'Identify testing bottlenecks these patterns suggest: [paste].',
    'Draft a short quality update for leadership focused on outcomes: [paste].',
  ]],
  ['Interview Preparation', [
    'Ask me five common QA interview questions and critique my answers one at a time.',
    'Give a model answer to "what is the difference between severity and priority?" with an example.',
    'Pose a scenario interview question and evaluate my structured response.',
    'Help me turn this experience into a STAR-format interview story: [paste].',
    'Generate likely interview questions for this QA job description: [paste].',
    'Review my answer to "how would you test X?" for structure and coverage: [paste].',
  ]],
  ['Prompt Engineering', [
    'Improve this prompt for clarity, context and a specific output format: [paste].',
    'Turn this task into a reusable prompt template with placeholders: [paste].',
    'Suggest the best role and output format for this QA prompt: [paste].',
    'Critique this prompt and explain why its output was weak: [paste].',
    'Add constraints to this prompt so the output is focused and concise: [paste].',
    'Convert this one-line request into a structured role/context/task/format prompt: [paste].',
  ]],
];

function libraryBlocks() {
  const blocks = [
    { t: 'h1', text: 'Introduction' },
    { t: 'p', text: 'This library gives you 100 ready-to-use QA prompts across 16 categories. Each is a starting point: add your real context, run it, and always review and verify the output. Treat AI as a fast drafting assistant — you remain the reviewer and decision-maker.' },
    { t: 'h1', text: 'How to Use It' },
    { t: 'ul', items: [
      'Replace the [paste]/[context] placeholders with your real (non-sensitive) information.',
      'Refine with follow-ups ("add negative cases", "make it a table", "what did you miss?").',
      'Always verify the output against the real source before relying on it.',
      'Never paste confidential, customer or production data into public AI tools.',
    ] },
  ];
  let n = 1;
  for (const [cat, prompts] of CATEGORIES) {
    blocks.push({ t: 'h2', text: cat });
    blocks.push({ t: 'ol', items: prompts });
    n += prompts.length;
  }
  blocks.push({ t: 'h1', text: 'Best Practices' });
  blocks.push({ t: 'ul', items: [
    'Give the AI a role, context, task and output format.',
    'Iterate — the first answer is a draft.',
    'Pair prompts with your own QA techniques to judge the output.',
  ] });
  blocks.push({ t: 'h1', text: 'Common Mistakes' });
  blocks.push({ t: 'ul', items: [
    'Using vague one-line prompts with no context.',
    'Accepting output without verification (hallucinations).',
    'Pasting sensitive data into public tools.',
  ] });
  blocks.push(proTip(`That is ${n - 1}+ prompts to start from. Save the ones that work into your own toolkit and template them — a curated prompt library is genuine career capital.`));
  return blocks;
}

export default [
  {
    slug: 'ai-prompt-library',
    title: 'AI Prompt Library (100 Prompts)',
    subtitle: '100 practical QA prompts across 16 categories — your everyday AI-assisted testing toolkit.',
    courseTitle: COURSE, category: 'AI Prompt Packs',
    blocks: libraryBlocks(),
  },

  {
    slug: 'prompt-writing-framework',
    title: 'Prompt Writing Framework',
    subtitle: 'A reliable structure for getting strong, consistent output from AI.',
    courseTitle: COURSE, category: 'AI Prompt Packs',
    blocks: [
      { t: 'h1', text: 'Introduction' },
      { t: 'p', text: 'Good output depends on good prompts. This framework gives you a repeatable structure so you get useful results by design, not by luck.' },
      { t: 'h1', text: 'The Framework: Role · Context · Task · Format · Constraints' },
      { t: 'table', headers: ['Element', 'What it does', 'Example'], rows: [
        ['Role', 'Sets the perspective', 'Act as an experienced QA analyst'],
        ['Context', 'Gives the AI what it needs', 'Here is the login story and its rules…'],
        ['Task', 'States exactly what you want', 'List positive, negative and boundary scenarios'],
        ['Format', 'Shapes the output', 'As a table: Scenario | Steps | Expected'],
        ['Constraints', 'Focuses and bounds it', 'Max 12 scenarios; focus on payments'],
      ] },
      { t: 'h1', text: 'Worked Example' },
      { t: 'p', text: '"Act as a senior QA analyst. Context: [login story + 5 rules]. Task: generate test scenarios. Format: a table with Scenario, Steps, Expected. Constraints: include boundary and negative cases." — consistently strong, usable output.' },
      { t: 'h1', text: 'Practical Exercise' },
      { t: 'ul', items: [
        'Take a vague prompt you have used and rewrite it with all five elements.',
        'Run both and compare the quality of the output.',
        'Save the improved version as a reusable template with placeholders.',
      ] },
      { t: 'h1', text: 'Best Practices' },
      { t: 'ul', items: [
        'Always specify the output format you want.',
        'Add constraints to avoid broad, shallow answers.',
        'Iterate with follow-ups; treat it as a dialogue.',
      ] },
      { t: 'h1', text: 'Common Mistakes' },
      { t: 'ul', items: [
        'Leaving out context and expecting tailored output.',
        'No output format, so results are hard to use.',
        'Accepting the first answer without refining.',
      ] },
      proTip('80% of "bad AI answers" are really under-specified prompts. Add context and a format before blaming the tool.'),
    ],
  },
];
