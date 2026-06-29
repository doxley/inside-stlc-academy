// AI for QA Testers — Module 7: Defect Reporting & Root Cause Support. Lesson enhancements.
export default {
  courseSlug: 'ai-for-qa-testers',
  moduleNumber: 7,
  lessons: [
    {
      lessonNumber: 1,
      enhancements: {
        industryStory: `A tester's rough bug note ("checkout weird, discount thing broken") would have bounced back from the developer. They asked AI to restructure it into a clear report — title, steps, expected vs actual — then verified every fact. The fix came same-day.`,
        badGood: {
          label: 'a bug report (AI-polished)',
          bad: `"Checkout weird, discount thing broken, please look."`,
          good: `"Checkout: SAVE10 charges full price on mobile Safari. Steps: add item → apply SAVE10 → pay. Expected: 10% off. Actual: full price, no discount shown. Evidence: recording attached. Severity/Priority: High."`,
        },
        davidTip: `Let AI sharpen the *wording and structure* of a bug report, but you own every technical fact. Never let it invent steps, environments or severity — and never paste real customer data into it.`,
        miniChallenge: `Write a rough bug note, ask AI to restructure it into a full report, then list one wording improvement you kept and one detail you had to correct.`,
        modelAnswer: `## Example\nKept: AI turned my ramble into numbered, minimal repro steps and a scannable title. Corrected: it guessed "Severity: Critical"; I set it to High based on the real impact it could not know.`,
        resourcePreview: {
          name: 'AI Bug Report Review Guide', purpose: 'How to use AI to sharpen bug reports without losing technical accuracy.',
          whenToUse: 'Use it to review and polish reports before logging them.', formats: ['PDF', 'DOCX'],
        },
      },
    },
    {
      lessonNumber: 2,
      enhancements: {
        industryStory: `An "intermittent" bug resisted reproduction. A tester described the symptoms and environment to AI and asked what variables to isolate; its suggestions (timezone, account type) helped pin it down to after-midnight UTC. AI is a useful thinking partner for isolation.`,
        davidTip: `Use AI to brainstorm what variables might be causing an intermittent issue, then change one at a time yourself to confirm. AI widens the hypotheses; reproduction is still your hands-on work.`,
        miniChallenge: `Describe an intermittent bug to AI and ask for variables to isolate. From its list, pick the three you would test first.`,
        modelAnswer: `## Example — intermittent checkout failure\nAI suggested: payment method, browser, account type, timezone, cart size. I would isolate payment method, browser and account type first, holding everything else constant.`,
      },
    },
    {
      lessonNumber: 3,
      enhancements: {
        industryStory: `Drowning in 200 support tickets, a tester pasted (sanitised) summaries into AI and asked for patterns. It clustered them — most were one login issue on one browser — turning noise into a single high-priority defect.`,
        davidTip: `AI is strong at spotting patterns across many items — defects, tickets, logs. Use it to cluster and summarise (with sanitised data), then verify the pattern is real before acting on it.`,
        miniChallenge: `Take a list of 8–10 (made-up or sanitised) issue summaries, ask AI to group them by theme, and identify the most important cluster.`,
        modelAnswer: `## Example\nAI grouped 10 issues into: login failures on Safari (5), slow dashboard (3), cosmetic (2). The Safari login cluster is the priority — likely one root cause affecting the most users.`,
      },
    },
    {
      lessonNumber: 4,
      enhancements: {
        industryStory: `Triage meetings ran long and unfocused. A tester used AI to draft severity/priority suggestions and a triage summary, then the team adjusted with real context. It made triage faster without handing over the decisions.`,
        davidTip: `AI can support triage — drafting summaries and suggesting severity/priority — but the calls stay with the team. Use it to prepare and speed the meeting, not to decide what ships.`,
        miniChallenge: `For three defects, ask AI to suggest severity and priority, then write whether you agree and why for each.`,
        modelAnswer: `## Example\nAI suggested "Critical/High" for a checkout crash — agree (blocks revenue). It suggested "Critical" for a homepage typo — disagree on severity (Low), but Priority High (visible, cheap, reputational).`,
        portfolioBuilder: `An AI-assisted defect workflow — report, isolate, analyse, triage — documented end to end is a modern portfolio piece that shows responsible, effective AI use across the defect lifecycle.`,
      },
    },
    {
      lessonNumber: 5,
      enhancements: {
        davidTip: `For this assignment, show AI assisting the defect process while you stay accountable for the facts and decisions. Pair each AI use with your verification or judgement.`,
        miniChallenge: `Before submitting, check each AI-assisted step has a note on what you verified or decided yourself.`,
        managersReview: {
          intro: 'If I reviewed this defect assignment as a QA lead, I would look for:',
          strengths: ['Clearer reports with verified facts', 'Sensible isolation thinking', 'Triage supported, not delegated, by AI'],
          gaps: ['AI inventing steps/severity unchecked', 'Real data pasted into AI', 'AI making the triage call'],
          improvements: ['Verify every technical detail', 'Sanitise data first', 'Keep severity/priority decisions human'],
        },
      },
    },
  ],
};
