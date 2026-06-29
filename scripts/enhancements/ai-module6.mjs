// AI for QA Testers — Module 6: Exploratory Testing with AI. Lesson enhancements.
export default {
  courseSlug: 'ai-for-qa-testers',
  moduleNumber: 6,
  lessons: [
    {
      lessonNumber: 1,
      enhancements: {
        industryStory: `Scripted tests all passed, yet a tester exploring freely found a broken flow when they refreshed mid-checkout. Exploratory testing — structured, curious investigation — finds what scripts miss. AI can supercharge the idea-generation, but the exploring is human.`,
        visualAid: {
          type: 'comparison', title: 'Scripted vs exploratory testing',
          headers: ['', 'Scripted', 'Exploratory'],
          rows: [
            ['Approach', 'Follow predefined steps', 'Investigate and adapt'],
            ['Finds', 'Known expected behaviour', 'Surprises and edge cases'],
            ['AI helps with', 'Drafting the scripts', 'Generating charters and ideas'],
          ],
        },
        davidTip: `Exploratory testing is structured curiosity, not random clicking. Time-box it, take notes, and let what you find drive where you look next. AI helps you start with more and better ideas.`,
        miniChallenge: `Pick a feature and write a 45-minute exploratory session plan: a mission and three areas/risks to investigate.`,
        modelAnswer: `## Example — password reset\nMission: probe the reset flow for security and error handling. Areas: expired/used links, requesting resets for unknown emails, and interrupting the flow (refresh, back button).`,
      },
    },
    {
      lessonNumber: 2,
      enhancements: {
        industryStory: `Staring at a blank charter template, a tester asked AI for 10 exploratory charters for a password-reset feature. It produced sharp missions across security, usability and edge cases — a running start that turned a slow setup into immediate testing.`,
        davidTip: `Use AI to brainstorm charters and personas, then explore against the real product yourself. A "careless first-time user" or "hostile user" persona from AI can reveal angles you would not have scripted.`,
        miniChallenge: `Ask AI for 5 exploratory charters and 2 user personas for a feature you can access, then pick the two charters you would run first.`,
        modelAnswer: `## Example — checkout\nCharters: stress the discount field, interrupt payment mid-flow, test with an empty basket. Personas: a rushed mobile user, a user with a flaky connection. First two to run: interrupt payment, and the flaky-connection persona.`,
        resourcePreview: {
          name: 'AI Exploratory Testing Workbook', purpose: 'Generate charters, personas and "what if" ideas, then explore like a pro.',
          whenToUse: 'Use it to plan and record exploratory sessions.', formats: ['PDF', 'DOCX'],
        },
      },
    },
    {
      lessonNumber: 3,
      enhancements: {
        industryStory: `A tester used AI to mind-map "ways a file upload could fail" and got a branching set of ideas — file type, size, name, interruption, permissions — that became a thorough exploratory session. AI is a fast brainstorming partner for scenarios.`,
        davidTip: `Prompt AI with heuristics — boundaries, interruptions, unusual data, hostile users — to widen your scenario ideas. You still decide which doors are worth opening, but you start with far more of them.`,
        miniChallenge: `Ask AI to brainstorm "ways [a feature] could fail" using at least three heuristics, then choose the three scenarios most worth exploring.`,
        modelAnswer: `## Example — file upload\nIdeas: huge file, wrong type renamed to .jpg, upload then lose connection, special characters in filename, upload while logged out. Top three: renamed wrong-type file, connection loss mid-upload, logged-out upload.`,
      },
    },
    {
      lessonNumber: 4,
      enhancements: {
        industryStory: `With limited time, a tester asked AI to rank exploratory ideas by risk for a payments feature. It helped surface the high-impact areas — duplicate charges, currency rounding — so the session focused where failure would hurt most.`,
        davidTip: `Risk-based exploration is about spending your limited time where failure is most likely and most costly. AI can help rank ideas, but anchor the final priorities in what matters to your users and business.`,
        miniChallenge: `For a feature, list six exploratory ideas and use likelihood × impact to pick the top three to explore first.`,
        modelAnswer: `## Example — payments\nHigh: duplicate charge on double-submit, currency rounding errors. Medium: declined-card messaging. Low: cosmetic receipt formatting. I explore the two High items first.`,
        portfolioBuilder: `An exploratory charter set with session notes and findings is a great portfolio artefact — it shows creative, risk-based testing, not just scripted cases.`,
      },
    },
    {
      lessonNumber: 5,
      enhancements: {
        davidTip: `For this assignment, show the loop: AI-generated charters, your actual session notes, and the follow-up charters your findings revealed. The real exploring and note-taking is the evidence of skill.`,
        miniChallenge: `Before submitting, ensure each charter has session notes and at least one follow-up charter prompted by what you found.`,
        managersReview: {
          intro: 'If I reviewed this exploratory assignment as a QA lead, I would look for:',
          strengths: ['Charters used as a start, then real exploration', 'Clear session notes and findings', 'Follow-up charters from surprises'],
          gaps: ['AI charters treated as a script to click through', 'No note-taking', 'Happy-path only'],
          improvements: ['Record observations as you go', 'Let findings drive new charters', 'Cover security/usability/edge angles'],
        },
      },
    },
  ],
};
