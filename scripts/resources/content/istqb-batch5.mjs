// ISTQB Foundation Masterclass — Resource Vault, batch 5.
const COURSE = 'ISTQB Foundation Masterclass';
const proTip = (text) => ({ t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text });
const bestPractice = (text) => ({ t: 'callout', variant: 'best', title: 'Best Practice', text });
const mistake = (text) => ({ t: 'callout', variant: 'mistake', title: 'Common Mistake', text });
const tip = (text) => ({ t: 'callout', variant: 'tip', title: 'Tip', text });

export default [
  {
    slug: 'interview-questions',
    title: 'ISTQB Interview Questions',
    subtitle: 'Twenty common QA and ISTQB interview questions, grouped by theme, with what a strong answer covers.',
    courseTitle: COURSE, category: 'Career Resources',
    blocks: [
      { t: 'h1', text: 'Introduction' },
      { t: 'p', text: 'Employers often use ISTQB Foundation topics as the backbone of QA interviews. This resource groups twenty of the most common questions by theme and, for each, sets out what a strong answer covers. Use it to rehearse out loud rather than simply reading — being able to explain a concept clearly is what interviewers are assessing.' },
      { t: 'p', text: 'For each question, aim to give a concise definition, a short real-world example, and (where relevant) why it matters. Avoid reciting the syllabus word for word — interviewers value understanding over memorisation.' },
      { t: 'spacer' },

      { t: 'h1', text: 'Theme 1 — Fundamentals of Testing' },
      { t: 'table', headers: ['Question', 'What a strong answer covers'], rows: [
        ['Why is testing necessary?', 'Reduces the risk of failures in operation; builds confidence; verifies requirements are met; testing measures quality, it does not create it.'],
        ['What is the difference between an error, a defect and a failure?', 'Error (human mistake) leads to a defect (fault in code/document), which may cause a failure (observable wrong behaviour when executed).'],
        ['Can testing prove software is defect-free?', 'No — "testing shows the presence, not the absence, of defects". Exhaustive testing is impossible; explain risk-based prioritisation.'],
        ['What is the difference between verification and validation?', 'Verification: are we building the product right (meets spec)? Validation: are we building the right product (meets user needs)?'],
      ] },
      { t: 'spacer' },

      { t: 'h1', text: 'Theme 2 — The Seven Principles' },
      { t: 'table', headers: ['Question', 'What a strong answer covers'], rows: [
        ['Name the seven testing principles.', 'Testing shows presence of defects; exhaustive testing is impossible; early testing; defect clustering; the pesticide paradox; testing is context dependent; absence-of-errors fallacy.'],
        ['What is the pesticide paradox and how do you handle it?', 'Repeating the same tests stops finding new defects; you review and revise tests, add new cases, and vary data.'],
        ['What does defect clustering mean for planning?', 'A small number of modules usually contain most defects; focus effort there (links to risk-based testing and the Pareto principle).'],
        ['Explain the absence-of-errors fallacy.', 'Finding and fixing many defects does not help if the system does not meet user needs — a working but wrong product still fails.'],
      ] },
      { t: 'spacer' },

      { t: 'h1', text: 'Theme 3 — Test Levels and Types' },
      { t: 'table', headers: ['Question', 'What a strong answer covers'], rows: [
        ['What are the four test levels?', 'Component (unit), integration, system, and acceptance testing — each with a different objective and test basis.'],
        ['Difference between functional and non-functional testing?', 'Functional: what the system does (features/behaviour). Non-functional: how well it does it (performance, usability, security, reliability).'],
        ['What is regression testing versus re-testing (confirmation testing)?', 'Re-testing confirms a specific fixed defect is resolved; regression checks unchanged areas still work after a change.'],
        ['When would you use smoke testing?', 'A shallow, broad check that critical functions work before deeper testing — often as a build-acceptance gate.'],
      ] },
      { t: 'spacer' },

      { t: 'h1', text: 'Theme 4 — Test Techniques' },
      { t: 'table', headers: ['Question', 'What a strong answer covers'], rows: [
        ['What is equivalence partitioning?', 'Dividing input data into partitions expected to behave the same, then testing one representative value per partition to reduce test count.'],
        ['Explain boundary value analysis.', 'Defects cluster at partition edges; test values at and just either side of boundaries (e.g. min-1, min, max, max+1).'],
        ['When would you use a decision table?', 'When behaviour depends on combinations of conditions; it ensures each meaningful combination of inputs and outcomes is covered.'],
        ['What is the difference between black-box and white-box testing?', 'Black-box: based on specifications, no code knowledge. White-box: based on internal structure (e.g. statement/branch coverage).'],
        ['What is exploratory testing?', 'Simultaneous learning, test design and execution, often time-boxed with charters; strong for finding defects specs miss.'],
      ] },
      { t: 'spacer' },

      { t: 'h1', text: 'Theme 5 — Management, Tools and Behaviour' },
      { t: 'table', headers: ['Question', 'What a strong answer covers'], rows: [
        ['What goes into a good defect report?', 'Clear title, steps to reproduce, expected vs actual result, severity/priority, environment, and evidence (logs/screenshots).'],
        ['Difference between severity and priority?', 'Severity: impact on the system. Priority: urgency of the fix. Give an example where they differ (e.g. a cosmetic bug on the homepage).'],
        ['How do you decide when to stop testing?', 'Against exit criteria: coverage targets met, defect rates, deadlines/budget, and residual risk being acceptable to stakeholders.'],
        ['How would you test a login page?', 'Structure the answer: valid/invalid inputs (EP/BVA), security, usability, error messages, and non-functional aspects — shows technique, not just guesses.'],
      ] },
      { t: 'spacer' },

      { t: 'h1', text: 'How to Prepare' },
      { t: 'ol', items: [
        'Pick five questions and answer them aloud, timing yourself to around 60–90 seconds each.',
        'Record or write your answers, then compare against the "what a strong answer covers" column.',
        'Add one concrete example from your own experience or study projects to each answer.',
        'Rehearse the definition-example-why-it-matters structure until it feels natural.',
      ] },
      proTip('Interviewers remember candidates who give a crisp definition and then a real example. For every ISTQB concept you revise, prepare a one-sentence definition and a one-sentence example — that pairing works for almost any question.'),
      bestPractice('Always tie your answer back to reducing risk or improving quality. Framing testing decisions around risk shows the maturity employers look for in QA hires.'),
    ],
  },

  {
    slug: 'exam-day-checklist',
    title: 'Exam Day Checklist',
    subtitle: 'Everything to do before, during and after your ISTQB Foundation exam — plus the key logistics.',
    courseTitle: COURSE, category: 'Checklists',
    blocks: [
      { t: 'h1', text: 'Introduction' },
      { t: 'p', text: 'The ISTQB Foundation exam rewards calm, methodical candidates. This checklist covers the logistics and a simple before, during and after routine so nothing catches you out on the day.' },
      { t: 'h1', text: 'Exam Logistics at a Glance' },
      { t: 'table', headers: ['Item', 'Detail'], rows: [
        ['Number of questions', '40 multiple-choice questions'],
        ['Time allowed', '60 minutes (75 minutes if sitting in a non-native language, where permitted)'],
        ['Pass mark', '65% — that is 26 out of 40 marks'],
        ['Marks per question', '1 mark each; no negative marking'],
        ['Format', 'Multiple choice; usually one correct answer unless stated otherwise'],
      ] },
      tip('There is no negative marking, so never leave a question blank. An educated guess can only help your score.'),
      { t: 'spacer' },

      { t: 'h1', text: 'The Week Before' },
      { t: 'ul', items: [
        'Confirm the date, time and format (online-proctored or test centre).',
        'Check the ID you must bring — usually photo ID matching your booking name exactly.',
        'For online exams, run the system/equipment check the provider supplies.',
        'Do at least one full timed mock exam under real conditions.',
        'Review your weakest topics using your revision tracker, not everything at once.',
        'Prepare your test space (online) or plan your journey (test centre) in advance.',
      ] },
      { t: 'spacer' },

      { t: 'h1', text: 'Before the Exam (on the day)' },
      { t: 'ul', items: [
        'Eat something and stay hydrated; avoid last-minute cramming that raises anxiety.',
        'Have your photo ID ready and to hand.',
        'For online exams: close all other applications, clear your desk, and check webcam, microphone and internet.',
        'For test centres: arrive early, leaving time for check-in and security.',
        'Read any exam instructions and rules before the timer starts.',
        'Take a slow breath and remind yourself you only need 26 out of 40.',
      ] },
      { t: 'spacer' },

      { t: 'h1', text: 'During the Exam' },
      { t: 'ol', items: [
        'Budget your time: 40 questions in 60 minutes is about 90 seconds each.',
        'Read every question and all options fully before answering — watch for "NOT", "EXCEPT" and "BEST".',
        'Answer the easy questions first to bank marks and build confidence.',
        'Flag anything uncertain and move on; do not let one question eat your time.',
        'Use elimination — rule out clearly wrong options to improve your odds.',
        'Never leave a blank; make your best choice on flagged questions before time runs out.',
        'Keep an eye on the clock and leave a few minutes to review flagged questions.',
      ] },
      mistake('Misreading negative or superlative wording ("which is NOT a test level", "which is the BEST technique") loses marks that candidates actually knew. Underline or mentally flag these words before choosing.'),
      { t: 'spacer' },

      { t: 'h1', text: 'After the Exam' },
      { t: 'ul', items: [
        'Note your provisional result if shown immediately, and any next steps.',
        'If you passed, save your certificate and add the credential to your CV and LinkedIn.',
        'If you did not pass this time, review the topic breakdown and plan a focused retake.',
        'Jot down which question styles surprised you — useful feedback for others and for a retake.',
      ] },
      proTip('Do a first pass answering only the questions you are confident about, flagging the rest. This banks easy marks early and leaves the harder questions for a calmer second pass — a reliable way to reach the 26-mark threshold.'),
      bestPractice('Simulate the real thing at least once: 40 questions, 60 minutes, no notes, no interruptions. Candidates who have rehearsed under time pressure make far fewer avoidable errors on the day.'),
    ],
  },

  {
    slug: 'revision-workbook',
    title: 'Revision Workbook',
    subtitle: 'Active-recall exercises and self-test prompts for every ISTQB Foundation chapter — with space to answer.',
    courseTitle: COURSE, category: 'Templates',
    blocks: [
      { t: 'h1', text: 'How to Use This Workbook' },
      { t: 'p', text: 'Active recall — retrieving answers from memory rather than re-reading — is one of the most effective revision methods. Work through each chapter below by answering from memory first, then check against the syllabus. Write your answers in the space provided (or on paper) before looking anything up.' },
      { t: 'ol', items: [
        'Cover your notes. Attempt each prompt from memory.',
        'Write your answer in the space provided.',
        'Only then check the syllabus and mark yourself honestly.',
        'Flag anything you got wrong for a second pass tomorrow.',
      ] },
      tip('Struggling to recall an answer is not failure — that effort is exactly what strengthens memory. Do not peek too soon.'),
      { t: 'spacer' },

      { t: 'h1', text: 'Chapter 1 — Fundamentals of Testing' },
      { t: 'ul', items: [
        'List all seven testing principles from memory.',
        'Define error, defect and failure, and explain how one leads to the next.',
        'Explain why exhaustive testing is impossible and what we do instead.',
        'Describe the main activities in the test process.',
      ] },
      { t: 'p', text: 'Your answers: ________________________________________________________________' },
      { t: 'p', text: '________________________________________________________________________________' },
      { t: 'p', text: '________________________________________________________________________________' },
      { t: 'spacer' },

      { t: 'h1', text: 'Chapter 2 — Testing Throughout the Lifecycle' },
      { t: 'ul', items: [
        'Name the four test levels and the objective of each.',
        'Give two examples each of functional, non-functional and white-box test types.',
        'Explain the difference between re-testing and regression testing.',
        'Describe how testing fits into a sequential model versus an iterative/Agile one.',
      ] },
      { t: 'p', text: 'Your answers: ________________________________________________________________' },
      { t: 'p', text: '________________________________________________________________________________' },
      { t: 'p', text: '________________________________________________________________________________' },
      { t: 'spacer' },

      { t: 'h1', text: 'Chapter 3 — Static Testing' },
      { t: 'ul', items: [
        'Explain what static testing is and how it differs from dynamic testing.',
        'List the types of review from informal to formal (inspection).',
        'Describe the key roles in a formal review.',
        'Give two benefits of finding defects early through static testing.',
      ] },
      { t: 'p', text: 'Your answers: ________________________________________________________________' },
      { t: 'p', text: '________________________________________________________________________________' },
      { t: 'p', text: '________________________________________________________________________________' },
      { t: 'spacer' },

      { t: 'h1', text: 'Chapter 4 — Test Techniques' },
      { t: 'ul', items: [
        'Define equivalence partitioning and work a short example.',
        'For an input valid from 1 to 100, list the boundary values you would test.',
        'Draw or describe a decision table for a simple two-condition rule.',
        'Explain the difference between black-box, white-box and experience-based techniques.',
      ] },
      { t: 'p', text: 'Your answers: ________________________________________________________________' },
      { t: 'p', text: '________________________________________________________________________________' },
      { t: 'p', text: '________________________________________________________________________________' },
      { t: 'spacer' },

      { t: 'h1', text: 'Chapter 5 — Test Management' },
      { t: 'ul', items: [
        'List the typical contents of a test plan.',
        'Explain the difference between severity and priority with an example.',
        'Describe risk-based testing and how risk affects test effort.',
        'What are entry and exit criteria, and why do they matter?',
      ] },
      { t: 'p', text: 'Your answers: ________________________________________________________________' },
      { t: 'p', text: '________________________________________________________________________________' },
      { t: 'p', text: '________________________________________________________________________________' },
      { t: 'spacer' },

      { t: 'h1', text: 'Chapter 6 — Tool Support for Testing' },
      { t: 'ul', items: [
        'Give three categories of test tools and an example use for each.',
        'List benefits and risks of test automation.',
        'Explain what to consider before introducing a tool into an organisation.',
        'Why is a pilot project recommended before rolling out a new tool?',
      ] },
      { t: 'p', text: 'Your answers: ________________________________________________________________' },
      { t: 'p', text: '________________________________________________________________________________' },
      { t: 'p', text: '________________________________________________________________________________' },
      { t: 'spacer' },

      { t: 'h1', text: 'Scoring Yourself' },
      { t: 'table', headers: ['Chapter', 'Confident?', 'Revisit before exam?'], rows: [
        ['1 — Fundamentals', '', ''],
        ['2 — Lifecycle', '', ''],
        ['3 — Static Testing', '', ''],
        ['4 — Techniques', '', ''],
        ['5 — Management', '', ''],
        ['6 — Tools', '', ''],
      ] },
      proTip('Revisit anything you got wrong after roughly one day, then again after three days. This spaced repetition moves knowledge into long-term memory far more reliably than repeated cramming.'),
      bestPractice('Answer from memory before checking the syllabus every single time. The temptation to peek early is strong, but the retrieval effort is precisely what makes this workbook effective.'),
    ],
  },

  {
    slug: 'exam-tracker',
    title: 'Exam Readiness Tracker',
    subtitle: 'Track your confidence per topic and your mock-exam scores over time until you are exam-ready.',
    courseTitle: COURSE, category: 'Templates',
    blocks: [
      { t: 'h1', text: 'How to Use the Tracker' },
      { t: 'p', text: 'This tracker gives you an honest, at-a-glance picture of where you stand. Rate your confidence per topic on a 1 to 5 scale, record your latest mock-exam score, and mark whether the topic still needs revisiting. Update it after each study session and each mock exam so you always know where to focus next.' },
      { t: 'table', headers: ['Confidence', 'Meaning'], rows: [
        ['1', 'New or shaky — needs a full read-through'],
        ['2', 'Familiar but unsure — errors likely'],
        ['3', 'Solid basics — some gaps remain'],
        ['4', 'Comfortable — occasional slips'],
        ['5', 'Confident — could explain it to someone else'],
      ] },
      tip('Be honest with your ratings. Over-rating a topic hides exactly the gaps that cost marks on exam day.'),
      { t: 'spacer' },

      { t: 'h1', text: 'Topic Confidence Tracker' },
      { t: 'p', text: 'Fill in your confidence (1–5), your most recent mock score on that topic, and whether it needs another pass.' },
      { t: 'table', headers: ['Topic', 'Confidence (1–5)', 'Last score', 'Revisit?'], rows: [
        ['Fundamentals of testing', '', '', ''],
        ['The seven testing principles', '', '', ''],
        ['Test process and activities', '', '', ''],
        ['Testing throughout the lifecycle', '', '', ''],
        ['Test levels', '', '', ''],
        ['Test types (functional/non-functional)', '', '', ''],
        ['Maintenance testing', '', '', ''],
        ['Static testing and reviews', '', '', ''],
        ['Equivalence partitioning', '', '', ''],
        ['Boundary value analysis', '', '', ''],
        ['Decision table testing', '', '', ''],
        ['State transition testing', '', '', ''],
        ['Experience-based techniques', '', '', ''],
        ['Test management and planning', '', '', ''],
        ['Risk-based testing', '', '', ''],
        ['Defect management', '', '', ''],
        ['Tool support for testing', '', '', ''],
      ] },
      { t: 'spacer' },

      { t: 'h1', text: 'Mock Exam Log' },
      { t: 'p', text: 'Record each full mock exam. Remember the pass mark is 65% — that is 26 out of 40. Aim to consistently clear that before booking the real exam.' },
      { t: 'table', headers: ['Date', 'Mock name/source', 'Score (/40)', 'Percentage', 'Weakest topic'], rows: [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
      ] },
      { t: 'spacer' },

      { t: 'h1', text: 'Readiness Signals' },
      { t: 'p', text: 'You are likely ready to book the exam when the following are true:' },
      { t: 'ul', items: [
        'Every topic is rated 3 or higher, with no 1s or 2s remaining.',
        'You have scored 75% or more on at least two full mock exams under timed conditions.',
        'No topic is still marked "revisit".',
        'You can finish 40 questions comfortably within 60 minutes.',
      ] },
      proTip('Track scores as a trend, not a single number. Two or three mocks comfortably above 65% under real time pressure is a far better readiness signal than one lucky high score.'),
      bestPractice('Update the tracker immediately after each study session while it is fresh. A tracker that is kept current becomes your revision plan; one updated sporadically is just decoration.'),
    ],
  },

  {
    slug: 'istqb-ai-prompt-pack',
    title: 'ISTQB AI Prompt Pack',
    subtitle: 'Ready-to-use AI prompts to quiz yourself, explain tricky topics and build a revision plan.',
    courseTitle: COURSE, category: 'AI Prompt Packs',
    blocks: [
      { t: 'h1', text: 'How to Use This Pack' },
      { t: 'p', text: 'An AI assistant makes an excellent revision partner: patient, available on demand, and happy to explain a topic five different ways. Copy any prompt below into your AI tool, then follow the short guidance on how to get the most from it. Replace anything in [square brackets] with your own topic or answer.' },
      { t: 'p', text: 'Treat the AI as a study aid, not an oracle. Always sanity-check its answers against the official ISTQB syllabus — the next section explains why.' },
      { t: 'callout', variant: 'mistake', title: 'Responsible Use', text: 'AI tools can be confidently wrong. Never rely on AI alone for your final exam preparation. Always verify definitions, principles and answers against the official ISTQB Foundation syllabus and reputable sample papers, and never enter confidential or copyrighted exam content into a public AI tool.' },
      { t: 'spacer' },

      { t: 'h1', text: '1. Act as an ISTQB Examiner' },
      { t: 'p', text: 'Prompt: "Act as an ISTQB Foundation Level examiner. Ask me one multiple-choice question at a time in the official style, wait for my answer, then tell me if I am right and explain why. Keep going until I say stop."' },
      { t: 'ul', items: ['Great for simulating exam conditions in short bursts.', 'Answer before scrolling to the explanation.', 'Ask it to vary the difficulty and cover all chapters.'] },
      { t: 'spacer' },

      { t: 'h1', text: '2. Quiz Me on Boundary Value Analysis' },
      { t: 'p', text: 'Prompt: "Quiz me on boundary value analysis. Give me a valid input range, ask which boundary values I should test, then check my answer and correct any mistakes."' },
      { t: 'ul', items: ['Use it to drill one technique until it is automatic.', 'Try several different ranges, including negative and decimal values.', 'Swap in equivalence partitioning or decision tables to drill other techniques.'] },
      { t: 'spacer' },

      { t: 'h1', text: '3. Explain Decision Tables Simply' },
      { t: 'p', text: 'Prompt: "Explain decision table testing as simply as possible, as if to a complete beginner. Use one small worked example with conditions and actions, then summarise when I would use it."' },
      { t: 'ul', items: ['Ideal when a topic has not clicked yet.', 'Ask for an even simpler explanation if it is still unclear.', 'Follow up with "now give me a slightly harder example".'] },
      { t: 'spacer' },

      { t: 'h1', text: '4. Create Practice Questions on a Topic' },
      { t: 'p', text: 'Prompt: "Create five ISTQB Foundation practice questions on [test levels], in multiple-choice format with four options each. Put the answers and explanations at the end, not next to the questions."' },
      { t: 'ul', items: ['Generate a fresh mini-quiz for any weak topic.', 'Cover the answers while you attempt the questions.', 'Verify the questions against the syllabus, as AI can invent plausible-but-wrong options.'] },
      { t: 'spacer' },

      { t: 'h1', text: '5. Review My Answers' },
      { t: 'p', text: 'Prompt: "Here is a question and my answer: [paste question and your answer]. Tell me whether I am correct, what I got right, and how to improve my reasoning."' },
      { t: 'ul', items: ['Use after attempting questions to deepen understanding.', 'Paste your full reasoning, not just the letter you chose.', 'Ask it to point out any misconceptions in how you got there.'] },
      { t: 'spacer' },

      { t: 'h1', text: '6. Generate Flash Cards for a Chapter' },
      { t: 'p', text: 'Prompt: "Generate 15 question-and-answer flash cards for [Chapter 4 — Test Techniques] of the ISTQB Foundation syllabus. Keep each answer to one or two sentences."' },
      { t: 'ul', items: ['Turn any chapter into a quick self-test set.', 'Ask for the output as a two-column table you can print.', 'Test yourself by covering the answer column.'] },
      { t: 'spacer' },

      { t: 'h1', text: '7. Explain Why This Answer Is Incorrect' },
      { t: 'p', text: 'Prompt: "For this question I chose [option]. The correct answer is [option]. Explain clearly why my choice is wrong and why the correct answer is right."' },
      { t: 'ul', items: ['Turns every wrong answer into a learning point.', 'Especially useful for questions with tempting distractors.', 'Ask what misconception typically leads to your wrong choice.'] },
      { t: 'spacer' },

      { t: 'h1', text: '8. Test My Understanding of the 7 Principles' },
      { t: 'p', text: 'Prompt: "Test my understanding of the seven testing principles. Ask me to explain each one in my own words, one at a time, and give feedback on accuracy and clarity."' },
      { t: 'ul', items: ['Confirms you truly understand a heavily examined topic.', 'Explain in your own words rather than reciting definitions.', 'Ask for a real-world example if you struggle with any principle.'] },
      { t: 'spacer' },

      { t: 'h1', text: '9. Create Memory Techniques for Test Levels' },
      { t: 'p', text: 'Prompt: "Create a memorable mnemonic or memory technique to help me remember the four ISTQB test levels and their order, and explain how to use it."' },
      { t: 'ul', items: ['Helpful for lists and ordered concepts you keep forgetting.', 'Ask for two or three options and pick the one that sticks.', 'Reuse the same prompt for test types, review types or principles.'] },
      { t: 'spacer' },

      { t: 'h1', text: '10. Generate a Revision Schedule' },
      { t: 'p', text: 'Prompt: "Create a two-week ISTQB Foundation revision schedule. I can study one hour on weekdays and two hours at weekends. My weakest areas are [topics]. Include mock exams and spaced review."' },
      { t: 'ul', items: ['Turns your available time into a concrete plan.', 'Give it your real availability and exam date for a tailored schedule.', 'Ask it to build in a full timed mock in the final few days.'] },
      { t: 'spacer' },

      { t: 'h1', text: 'Getting the Best Results' },
      { t: 'ul', items: [
        'Be specific — name the exact topic, chapter or technique.',
        'Ask follow-up questions; the first answer is rarely the final one.',
        'Request examples and mnemonics, not just definitions.',
        'Always cross-check against the official syllabus before trusting an answer.',
      ] },
      proTip('Chain the prompts for a complete study loop: generate practice questions (prompt 4), attempt them, then use "explain why this answer is incorrect" (prompt 7) on anything you get wrong. That test-then-explain cycle is where the real learning happens.'),
      bestPractice('Use AI to practise and explain, but always confirm facts against the official ISTQB Foundation syllabus. The syllabus is the single source of truth for the exam — AI is your rehearsal partner, not your examiner.'),
    ],
  },
];
