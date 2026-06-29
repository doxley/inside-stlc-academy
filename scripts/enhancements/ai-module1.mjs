// AI for QA Testers — Module 1: The AI Shift in QA. Lesson enhancements.
export default {
  courseSlug: 'ai-for-qa-testers',
  moduleNumber: 1,
  lessons: [
    {
      lessonNumber: 1,
      enhancements: {
        industryStory: `A tester used to spend an hour drafting test cases for each story. After learning to use AI well, they draft in ten minutes and spend the rest reviewing, adding edge cases and assessing risk — better coverage in the same hour. The job did not shrink; the routine part did.`,
        visualAid: {
          type: 'comparison', title: 'Where AI changes QA',
          headers: ['Task', 'Before AI', 'With AI (reviewed)'],
          rows: [
            ['Drafting test cases', 'Slow, manual', 'Fast draft, you refine'],
            ['Analysing requirements', 'Easy to miss gaps', 'AI flags gaps to check'],
            ['Understanding errors/logs', 'Time-consuming', 'Quick explanation'],
          ],
        },
        davidTip: `Frame AI as a productivity multiplier, not a replacement. In real QA teams, the testers who use AI well do the routine faster and spend the saved time on high-value risk thinking — and they always review what AI produces.`,
        miniChallenge: `List three QA tasks AI could speed up for you and one decision that must stay with you as the tester.`,
        modelAnswer: `## Example\nSpeeds up: drafting test cases, generating test data, explaining an unfamiliar error. Stays with me: deciding what to test based on risk — AI can suggest, but I own the coverage and the quality call.`,
        portfolioBuilder: `Start an "AI-assisted testing" note. By the end of this course it becomes a portfolio piece showing you use AI effectively and responsibly — a modern differentiator.`,
      },
    },
    {
      lessonNumber: 2,
      enhancements: {
        industryStory: `A team asked AI to "confirm the app is bug-free". It cannot — AI has no access to your running system and no real testing judgement. Knowing AI's boundaries is what stops you from trusting it where it should not be trusted.`,
        visualAid: {
          type: 'comparison', title: 'What AI can and cannot do',
          headers: ['AI is good at', 'AI cannot do'],
          rows: [
            ['Drafting cases, data, ideas', 'Decide risk for your product'],
            ['Explaining concepts and errors', 'Know your real system state'],
            ['Spotting gaps to investigate', 'Be accountable for quality'],
          ],
        },
        davidTip: `Treat AI like a fast, knowledgeable junior who has never seen your product. Brilliant for drafts and ideas; never the final word on whether something is safe to ship.`,
        miniChallenge: `Write two questions you would NOT rely on AI to answer about your product, and why.`,
        modelAnswer: `## Example\n"Is this release safe to ship?" — AI cannot see my system, data or risk context. "Did this fix actually work?" — that needs verification against the real app, which only I can do.`,
      },
    },
    {
      lessonNumber: 3,
      enhancements: {
        industryStory: `AI generated a confident, polished test plan that referenced a feature the product did not have. A tester who relied on it blindly would have wasted a day. Human judgement — knowing the product, the users and the risk — is exactly what AI lacks.`,
        davidTip: `Your value in an AI world is judgement, not typing. Knowing what matters, what is risky, and what "good" looks like for your users is the part AI cannot replace — lean into it.`,
        miniChallenge: `Think of a recent testing decision you made on judgement (what to prioritise, what risk to flag). Write why AI could not have made it for you.`,
        modelAnswer: `## Example\nI deprioritised testing an admin-only report to focus on the checkout flow before a sale. AI could list tests, but weighing business risk and timing — that was judgement about our users and context, which AI does not have.`,
        portfolioBuilder: `A short reflection on "where human judgement matters in AI-assisted testing" is a strong interview talking point — capture your view now.`,
      },
    },
    {
      lessonNumber: 4,
      enhancements: {
        davidTip: `For this assignment, show a balanced view: where AI genuinely helps and where it must not be trusted. That maturity is exactly what employers want to hear about AI.`,
        miniChallenge: `Before the full assignment, draft a one-line position: "AI in QA is best used to ___, but the tester must always ___."`,
        managersReview: {
          intro: 'If I received this assignment as a QA lead, I would look for:',
          strengths: ['A balanced, realistic view of AI', 'Clear examples of where it helps', 'Awareness of its limits and the tester’s accountability'],
          gaps: ['Treating AI as a replacement for testers', 'Dismissing AI as useless hype', 'No mention of verifying output'],
          improvements: ['Give a concrete "AI helps here" example', 'State what stays human', 'Mention reviewing/owning AI output'],
        },
      },
    },
  ],
};
