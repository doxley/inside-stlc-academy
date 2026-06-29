// AI for QA Testers — Module 5: AI-Assisted Test Case Design. Lesson enhancements.
export default {
  courseSlug: 'ai-for-qa-testers',
  moduleNumber: 5,
  lessons: [
    {
      lessonNumber: 1,
      enhancements: {
        industryStory: `Facing 20 stories before a release, a tester used AI to draft test cases for each in minutes, then reviewed and hardened them. They covered far more ground than hand-writing every case — without lowering the bar, because they still owned the review.`,
        davidTip: `Let AI do the first draft of test cases, then bring your techniques — equivalence partitioning, boundary analysis — to judge and complete them. Speed from AI, coverage from you.`,
        miniChallenge: `Pick a feature and prompt AI for test cases (happy path, negative, boundary). Note one good case it produced and one it missed.`,
        modelAnswer: `## Example — login\nAI produced solid happy-path and "wrong password" cases. It missed the account-lockout boundary (5th attempt) and a very long email — both of which I added from my own analysis.`,
        resourcePreview: {
          name: 'AI Prompt Library (100 Prompts)', purpose: 'Ready-made prompts for generating and refining test cases.',
          whenToUse: 'Use a test-design prompt as your starting point.', formats: ['PDF', 'DOCX'],
        },
      },
    },
    {
      lessonNumber: 2,
      enhancements: {
        industryStory: `AI generated 40 test cases — but they were unprioritised and some overlapped. A tester pruned duplicates and ranked the rest by risk, turning a noisy list into a focused, runnable set. Generation is easy; prioritisation is the skill.`,
        davidTip: `More cases is not better testing. Use AI to generate broadly, then cut duplicates and prioritise by risk so the most important checks run first. A tidy, risk-ranked set beats a long unranked one.`,
        miniChallenge: `Take an AI-generated set of cases and reduce it: merge duplicates and tag each remaining case high/medium/low risk.`,
        modelAnswer: `## Example\nFrom 18 generated cases I merged 4 near-duplicates, dropped 2 irrelevant ones, and tagged the payment and lockout cases High, validation messages Medium, and cosmetic checks Low — a focused set of 12.`,
      },
    },
    {
      lessonNumber: 3,
      enhancements: {
        industryStory: `A generated case asserted a "loyalty points" message the feature never showed — a hallucination. Another set missed every boundary case. The value was entirely in the tester's review, which caught both.`,
        badGood: {
          label: 'AI-generated test cases',
          bad: `Accept all 20 generated cases as-is and run them.`,
          good: `Review them: remove the hallucinated "loyalty points" case, add the missing 8–20 char password boundaries, tighten vague expected results — then run.`,
        },
        davidTip: `Review AI-generated tests like work from a junior: check expected results are specific and correct, remove anything invented, and add the boundary/negative cases it missed. Your review is the value-add.`,
        miniChallenge: `Generate test cases for a feature, then list two issues you found and fixed in review (one missing case, one incorrect/invented).`,
        modelAnswer: `## Example\nIssue 1: a case referenced an "SMS code" step the product does not have — removed. Issue 2: no boundary case for the max comment length — added 500 and 501 characters.`,
        resourcePreview: {
          name: 'AI Test Case Review Checklist', purpose: 'A checklist for turning an AI draft into a strong, trustworthy test set.',
          whenToUse: 'Run every AI-generated set through it before use.', formats: ['PDF', 'DOCX'],
        },
      },
    },
    {
      lessonNumber: 4,
      enhancements: {
        industryStory: `A tester needed realistic-but-fake data for 50 test users and was hand-typing names and emails. AI generated valid, varied synthetic data in seconds — no real customer data involved — and testing sped up dramatically.`,
        davidTip: `AI is excellent for synthetic test data — varied names, emails, edge-case values — but never ask it to use real customer data, and check generated data is actually valid for your field rules.`,
        miniChallenge: `Prompt AI for 10 rows of synthetic test data for a sign-up form (including a couple of edge cases), and check each row is valid for the rules.`,
        modelAnswer: `## Example\nAI produced 10 users with valid emails and 8–20 char passwords, plus edge cases: a name with an apostrophe, a very long email, and a minimum-length password — all synthetic, all valid to test with.`,
      },
    },
    {
      lessonNumber: 5,
      enhancements: {
        davidTip: `For this assignment, the review is what proves QA skill — show what you accepted, changed and rejected from the AI output, not just the generated cases.`,
        miniChallenge: `Before submitting, attach a short review note to your generated set: what you kept, what you fixed, and why.`,
        managersReview: {
          intro: 'If I reviewed this AI test-design assignment as a QA lead, I would look for:',
          strengths: ['Generated cases hardened by review', 'Boundary/negative coverage added', 'Hallucinations removed; risk-prioritised'],
          gaps: ['Generated cases shipped unreviewed', 'Happy-path only', 'Vague expected results'],
          improvements: ['Add a review note (kept/changed/rejected)', 'Apply boundary/equivalence techniques', 'Tighten expected results'],
        },
        portfolioBuilder: `A "generated vs reviewed" test set — with your review notes — is a standout portfolio piece showing both AI use and testing judgement.`,
      },
    },
  ],
};
