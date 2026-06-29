// QA Interview Accelerator — Career Toolkit, batch 2 (question bank + interview prep core).
const COURSE = 'QA Interview Accelerator';
const proTip = (text) => ({ t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text });

// ---- Interview Question Bank content (grouped Q&A) ----
const QA_BANK = [
  { group: 'Testing Fundamentals', qas: [
    ['What is the difference between verification and validation?', 'Verification asks "are we building it right?" (reviews, static checks against spec). Validation asks "are we building the right thing?" (executing the product against user needs).'],
    ['What is the difference between QA, QC and testing?', 'QA is process-focused (preventing defects); QC is product-focused (finding defects in the product); testing is the activity of executing/examining the product to find defects and provide information.'],
    ['What is the difference between severity and priority?', 'Severity is the technical impact of a defect; priority is how urgently it should be fixed from a business view. A typo on the homepage can be low severity but high priority.'],
    ['What is the difference between a test case and a test scenario?', 'A scenario is a high-level "what to test"; a test case is the detailed steps, data and expected result for verifying it.'],
    ['What is the STLC?', 'The Software Testing Life Cycle: requirement analysis, test planning, test case design, environment setup, test execution, and test closure.'],
    ['When do you stop testing?', 'When exit criteria are met: planned coverage achieved, critical defects resolved, risk acceptable to stakeholders, and time/budget constraints reached — it is a risk-based decision, not "no bugs left".'],
  ] },
  { group: 'Test Design Techniques', qas: [
    ['What is equivalence partitioning?', 'Dividing inputs into groups that should behave the same, then testing one value per group to reduce cases while keeping coverage.'],
    ['What is boundary value analysis?', 'Testing at the edges of input ranges (min, max, just inside/outside) because defects cluster at boundaries.'],
    ['When would you use a decision table?', 'When behaviour depends on combinations of conditions/rules — it ensures every combination is considered.'],
    ['What is state transition testing?', 'Testing how a system moves between states and whether valid/invalid transitions behave correctly (e.g. login attempts → locked account).'],
    ['What is the difference between positive and negative testing?', 'Positive testing checks the system works with valid input; negative testing checks it handles invalid input gracefully.'],
  ] },
  { group: 'Defects & Reporting', qas: [
    ['What makes a good bug report?', 'A clear specific title, environment, minimal numbered steps to reproduce, expected vs actual results, evidence, and a justified severity/priority.'],
    ['A developer says "cannot reproduce" — what do you do?', 'Re-verify on a clean environment, confirm exact build/data/steps, add evidence (video/logs), and pair with them — focus on the issue, not blame.'],
    ['What is the defect life cycle?', 'New → Assigned → Open/In progress → Fixed → Retest → Closed (or Reopened/Deferred/Rejected as applicable).'],
  ] },
  { group: 'Agile & Process', qas: [
    ['How does testing fit into Agile?', 'Testing is continuous and collaborative: testers get involved at refinement, test stories as they are built, and contribute across ceremonies rather than acting as an end gate.'],
    ['What are the three amigos?', 'Business (PO), development and testing discussing a story together before build to clarify requirements and acceptance criteria early.'],
    ['What is the difference between smoke and regression testing?', 'Smoke testing is a quick check that core functions work (build is testable); regression confirms existing functionality still works after changes.'],
  ] },
  { group: 'Technical (API, SQL, Automation, AI)', qas: [
    ['What is API testing and why is it valuable?', 'Testing the application layer directly (requests/responses) — it is faster, more stable and can catch issues before the UI exists.'],
    ['What does a status code like 200, 400, 401, 404 or 500 mean?', '200 success; 400 bad request; 401 unauthorised; 404 not found; 500 server error.'],
    ['Why do testers need SQL?', 'To verify data is stored/updated correctly, set up test data, and investigate issues at the database level.'],
    ['When should a test be automated?', 'When it is repetitive, stable, high-value and run often (e.g. regression, smoke) — not for one-off or rapidly changing exploratory checks.'],
    ['How do you use AI responsibly in testing?', 'As a drafting/assisting tool: never paste sensitive data, always verify output against reality, and stay personally accountable for the result.'],
  ] },
];

const bankBlocks = () => {
  const blocks = [
    { t: 'h1', text: 'Introduction' },
    { t: 'p', text: 'This question bank collects the questions QA candidates are most commonly asked, with concise model answers. Use it to revise, not to memorise — understand each answer so you can say it in your own words.' },
    { t: 'h1', text: 'How to Use This Bank' },
    { t: 'ul', items: [
      'Read each question and try to answer before reading the model.',
      'Rephrase model answers in your own words.',
      'Back theory answers with a real example where you can.',
      'Revisit weak areas until they feel natural.',
    ] },
  ];
  for (const section of QA_BANK) {
    blocks.push({ t: 'h1', text: section.group });
    for (const [q, a] of section.qas) {
      blocks.push({ t: 'h2', text: q });
      blocks.push({ t: 'p', text: a });
    }
  }
  blocks.push({ t: 'h1', text: 'Common Mistakes' });
  blocks.push({ t: 'ul', items: ['Memorising wording instead of understanding.', 'Giving theory with no example.', 'Rambling — keep answers tight and structured.'] });
  blocks.push(proTip('For any "what is the difference between..." question, define both terms in one line each, then give a quick example. That structure instantly sounds confident and clear.'));
  return blocks;
};

export default [
  {
    slug: 'qa-interview-question-bank',
    title: 'QA Interview Question Bank',
    subtitle: 'The most common QA interview questions with concise model answers.',
    courseTitle: COURSE, category: 'Career Resources',
    blocks: bankBlocks(),
  },

  {
    slug: 'technical-qa-interview-cheat-sheet',
    title: 'Technical QA Interview Cheat Sheet',
    subtitle: 'Quick-reference definitions and answers for the technical round.',
    courseTitle: COURSE, category: 'Cheat Sheets',
    blocks: [
      { t: 'h1', text: 'Introduction' },
      { t: 'p', text: 'A one-page technical refresher to skim before an interview. It covers the definitions and concepts most likely to come up in a QA technical round.' },
      { t: 'h1', text: 'Core Definitions' },
      { t: 'table', headers: ['Term', 'One-line answer'], rows: [
        ['Verification vs validation', 'Building it right vs building the right thing'],
        ['Severity vs priority', 'Technical impact vs business urgency'],
        ['Smoke vs regression', 'Core build check vs "nothing old broke"'],
        ['Positive vs negative testing', 'Valid input works vs invalid input handled'],
        ['Functional vs non-functional', 'What it does vs how well (performance, security, usability)'],
      ] },
      { t: 'h1', text: 'Test Design Techniques' },
      { t: 'ul', items: [
        'Equivalence partitioning — one value per group of same-behaviour inputs.',
        'Boundary value analysis — test the edges.',
        'Decision tables — combinations of conditions.',
        'State transition — valid/invalid moves between states.',
      ] },
      { t: 'h1', text: 'API & HTTP' },
      { t: 'table', headers: ['Code', 'Meaning'], rows: [
        ['200', 'OK / success'], ['201', 'Created'], ['400', 'Bad request'],
        ['401', 'Unauthorised'], ['403', 'Forbidden'], ['404', 'Not found'], ['500', 'Server error'],
      ] },
      { t: 'h1', text: 'SQL Essentials' },
      { t: 'ul', items: ['SELECT … FROM … WHERE …', 'JOIN to combine tables', 'COUNT/SUM/AVG aggregates', 'Use to verify data and create test data'] },
      { t: 'h1', text: 'Automation & AI' },
      { t: 'ul', items: [
        'Automate stable, repetitive, high-value checks (regression/smoke).',
        'Test pyramid: many unit, fewer integration, fewest UI tests.',
        'AI: draft and assist, never paste sensitive data, always verify and own output.',
      ] },
      { t: 'h1', text: 'Common Mistakes' },
      { t: 'ul', items: ['Guessing instead of saying "I would check/confirm".', 'Mixing up severity and priority.', 'Claiming tool depth you do not have.'] },
      proTip('If you do not know an answer, say how you would find out. "I have not used that, but I would approach it by..." beats bluffing every time.'),
    ],
  },

  {
    slug: 'behavioural-interview-prep-workbook',
    title: 'Behavioural Interview Prep Workbook',
    subtitle: 'Prepare confident, structured answers to the "soft" questions that decide offers.',
    courseTitle: COURSE, category: 'Career Resources',
    blocks: [
      { t: 'h1', text: 'Introduction' },
      { t: 'p', text: 'Technical skill gets you shortlisted; behavioural answers often decide the offer. This workbook helps you prepare for the questions about teamwork, conflict, pressure and growth.' },
      { t: 'h1', text: 'Instructions' },
      { t: 'ul', items: [
        'Draft a STAR answer for each question below.',
        'Use real examples; keep each to ~2 minutes.',
        'Practise out loud and refine.',
      ] },
      { t: 'h1', text: 'Question Bank with Tips' },
      { t: 'table', headers: ['Question', 'What they are really assessing'], rows: [
        ['Tell me about a defect you are proud of', 'Impact, thoroughness, communication'],
        ['Describe a conflict with a developer', 'Collaboration, professionalism'],
        ['A time you worked under pressure', 'Composure, prioritisation'],
        ['A mistake you made', 'Honesty, learning mindset'],
        ['How do you handle ambiguous requirements?', 'Initiative, communication'],
        ['Why testing / why this role?', 'Motivation, fit'],
      ] },
      { t: 'h1', text: 'Worked Example (conflict question)' },
      { t: 'p', text: '"A developer pushed back on a bug I raised (S). I needed to resolve it without friction (T). I calmly re-walked the steps with evidence and framed it around user impact rather than blame (A). We agreed it was valid and fixed it; we worked well together afterwards (R)."' },
      { t: 'h1', text: 'Blank Reusable Template' },
      { t: 'ul', items: ['Question:', 'S / T / A / R:', 'Key point to land:'] },
      { t: 'h1', text: 'Best Practices' },
      { t: 'ul', items: ['Stay positive even about conflicts and mistakes.', 'Show what you learned.', 'Focus on collaboration and user impact.'] },
      { t: 'h1', text: 'Common Mistakes' },
      { t: 'ul', items: ['Speaking negatively about past colleagues.', 'No structure, so answers ramble.', 'Claiming you have never made a mistake.'] },
      proTip('When asked about conflict or mistakes, the interviewer wants maturity, not a perfect record. Show that you handle hard moments calmly and learn from them.'),
    ],
  },

  {
    slug: 'interview-day-checklist',
    title: 'Interview Day Checklist',
    subtitle: 'Everything to prepare before, during and after the interview.',
    courseTitle: COURSE, category: 'Checklists',
    blocks: [
      { t: 'h1', text: 'Introduction' },
      { t: 'p', text: 'Preparation turns nerves into confidence. This checklist makes sure nothing is left to chance on interview day, whether it is in person or remote.' },
      { t: 'h1', text: 'The Day Before' },
      { t: 'ul', items: [
        'Re-read the job description and your CV',
        'Review your STAR stories and elevator pitch',
        'Research the company and prepare 2–3 questions to ask',
        'Test your tech (camera, mic, link) if remote',
        'Lay out clothes / check the route',
      ] },
      { t: 'h1', text: 'Just Before' },
      { t: 'ul', items: [
        'Quiet, tidy, well-lit space (remote) or arrive 10 mins early (in person)',
        'Water, notepad, copy of CV and portfolio link to hand',
        'Phone on silent; close distracting apps',
      ] },
      { t: 'h1', text: 'During' },
      { t: 'ul', items: [
        'Smile, breathe, and take a moment before answering',
        'Use STAR for behavioural questions',
        'Ask to clarify if a question is unclear',
        'Show enthusiasm and ask your prepared questions',
      ] },
      { t: 'h1', text: 'After' },
      { t: 'ul', items: [
        'Send a short thank-you / follow-up email',
        'Note questions asked and how you answered',
        'Capture anything to improve for next time',
      ] },
      { t: 'h1', text: 'Common Mistakes' },
      { t: 'ul', items: ['No questions prepared for them.', 'Untested tech causing a stressful start.', 'No follow-up afterwards.'] },
      proTip('Always prepare two thoughtful questions to ask them. Candidates who ask good questions seem genuinely interested — and it is often what interviewers remember.'),
    ],
  },
];
