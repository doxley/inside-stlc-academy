// AI for QA Testers — Module 11: AI Risks, Ethics and Governance. Lesson enhancements.
export default {
  courseSlug: 'ai-for-qa-testers',
  moduleNumber: 11,
  lessons: [
    {
      lessonNumber: 1,
      enhancements: {
        industryStory: `A tester nearly pasted a production database export into a public AI tool to "get help faster". Catching that habit is essential — data privacy is the line that, once crossed, can cause a breach and end careers.`,
        visualAid: {
          type: 'comparison', title: 'Data: safe vs never',
          headers: ['Safe to use', 'Never paste'],
          rows: [
            ['Synthetic / dummy data', 'Customer or production data'],
            ['Public, non-sensitive info', 'Secrets, keys, tokens'],
            ['Sanitised examples', 'Proprietary source code (public tools)'],
          ],
        },
        davidTip: `The simplest guardrail: "would I be comfortable if this prompt were public?" If not, do not send it. Data privacy is non-negotiable — when in doubt, leave it out and use synthetic data.`,
        miniChallenge: `Write two example prompts you would NOT send as-is, and rework each into a safe version using synthetic data.`,
        modelAnswer: `## Example\nUnsafe: "Here's our customer table, find issues." Safe: "Here's a synthetic sample matching our schema, suggest data-validation checks." Unsafe: pasting an API key in a config; Safe: replace it with PLACEHOLDER.`,
        resourcePreview: {
          name: 'AI Usage Policy Template', purpose: 'A simple, adaptable policy for using AI responsibly and securely.',
          whenToUse: 'Adapt it for yourself or propose it to your team.', formats: ['PDF', 'DOCX'],
        },
      },
    },
    {
      lessonNumber: 2,
      enhancements: {
        industryStory: `An AI-generated test set quietly assumed all users were in one country, missing internationalisation cases — a subtle bias in the output. A tester who only ran what AI produced would have shipped that blind spot.`,
        davidTip: `AI output can carry bias and hallucination — it reflects patterns in its training, not your users. Watch for unstated assumptions (one locale, one user type) and verify reliability-critical specifics every time.`,
        miniChallenge: `Generate test ideas for a sign-up form and check the output for an unstated assumption or bias (e.g. names, locales, accessibility). Note what was missing.`,
        modelAnswer: `## Example\nThe generated cases assumed Latin-character names and one date format. I added cases for non-Latin names, different locales, and screen-reader accessibility that the AI overlooked.`,
        resourcePreview: {
          name: 'AI Hallucination Checklist', purpose: 'Catch confident-but-false AI output before it reaches your testing.',
          whenToUse: 'Use it whenever you rely on AI-stated specifics.', formats: ['PDF', 'DOCX'],
        },
      },
    },
    {
      lessonNumber: 3,
      enhancements: {
        industryStory: `A team adopted AI quickly but had no rule about who checked the output. A wrong AI-suggested config slipped through because "the AI said so". Review controls and clear accountability are what make AI use safe at team scale.`,
        davidTip: `"AI drafts, a person reviews and owns it" should be a stated rule, not an assumption. The author is accountable for AI-assisted work exactly as if they wrote it themselves — make that explicit on your team.`,
        miniChallenge: `Write a two-line review control for your team: who reviews AI-assisted work, and what "owning it" means.`,
        modelAnswer: `## Example\n"All AI-assisted output is reviewed and verified by the author before use. The author is accountable for the result as if they produced it unaided — AI assistance never transfers responsibility."`,
        resourcePreview: {
          name: 'AI Validation Checklist', purpose: 'A repeatable way to validate any AI-generated QA output before using it.',
          whenToUse: 'Run AI output through it as your review control.', formats: ['PDF', 'DOCX'],
        },
      },
    },
    {
      lessonNumber: 4,
      enhancements: {
        industryStory: `Asked in an interview "how do you use AI responsibly?", a candidate answered crisply: approved tools, no sensitive data, verify output, stay accountable. It signalled maturity instantly and set them apart.`,
        davidTip: `Being able to articulate AI governance — data, verification, accountability, transparency — is now a genuine professional differentiator. Have a clear, honest answer ready; it shows you can be trusted with AI at work.`,
        miniChallenge: `Draft your personal AI governance statement (4 short points: tools, data, verification, accountability) you could say in an interview.`,
        modelAnswer: `## Example\n"I use approved tools only. I never share customer, production or secret data. I treat output as a draft I verify against the real system. I stay accountable for the result, and I'm transparent about where AI materially helped."`,
        resourcePreview: {
          name: 'AI Ethics & Governance Guide for QA', purpose: 'Principles for responsible AI use: data, bias, accountability, transparency.',
          whenToUse: 'Use it to shape your governance statement and team approach.', formats: ['PDF', 'DOCX'],
        },
      },
    },
    {
      lessonNumber: 5,
      enhancements: {
        davidTip: `For this assignment, demonstrate responsible-AI thinking with concrete rules and examples, not vague intentions. Show the unsafe-to-safe reworking — it proves you understand the line.`,
        miniChallenge: `Before submitting, include one unsafe prompt reworked into a safe one, and your four-point governance statement.`,
        managersReview: {
          intro: 'If I reviewed this governance assignment as a QA lead, I would look for:',
          strengths: ['Clear data-handling rules', 'Awareness of bias and hallucination', 'Explicit review/accountability'],
          gaps: ['Vague "be careful" statements', 'No data rules', 'AI treated as accountable'],
          improvements: ['Give concrete safe/unsafe examples', 'State who reviews and owns output', 'Add a verification step'],
        },
        portfolioBuilder: `Your responsible-AI statement is a reusable interview asset and a sign of professional maturity — keep it with your portfolio.`,
      },
    },
  ],
};
