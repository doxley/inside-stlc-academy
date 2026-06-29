// AI for QA Testers — Module 12: Building Your AI QA Workflow. Lesson enhancements.
export default {
  courseSlug: 'ai-for-qa-testers',
  moduleNumber: 12,
  lessons: [
    {
      lessonNumber: 1,
      enhancements: {
        industryStory: `Two testers learned the same AI techniques. One used them ad hoc and forgot half; the other built a repeatable workflow — AI at refinement, test design, data, reporting — and got consistent value every sprint. A workflow turns techniques into habits.`,
        visualAid: {
          type: 'flow', title: 'A repeatable AI-assisted QA workflow',
          steps: [
            { label: 'Refinement', detail: 'AI finds gaps' },
            { label: 'Test design', detail: 'AI drafts, you review' },
            { label: 'Data', detail: 'synthetic data' },
            { label: 'Reporting', detail: 'AI drafts, you shape' },
          ],
          caption: 'Verify and own at every step.',
        },
        davidTip: `Design a workflow you will actually repeat: where AI helps in each sprint stage, and what you always verify. A consistent, safe workflow beats occasional clever prompts.`,
        miniChallenge: `Sketch your personal AI QA workflow across a sprint: where AI helps and what you verify at each point.`,
        modelAnswer: `## Example\nRefinement: AI surfaces story gaps → I raise questions. Test design: AI drafts cases → I review and add boundaries. Data: AI generates synthetic data. Reporting: AI drafts the summary → I lead with risk. I verify specifics throughout.`,
        resourcePreview: {
          name: 'AI-Assisted QA Workflow Poster', purpose: 'Shows where AI helps across the testing lifecycle and where judgement stays in control.',
          whenToUse: 'Pin it as a reminder of your repeatable workflow.', formats: ['PDF', 'DOCX'],
        },
      },
    },
    {
      lessonNumber: 2,
      enhancements: {
        industryStory: `A tester who saved their best prompts, tools and rules in one place walked into a new role productive on day one — they started each task from a proven toolkit instead of a blank box.`,
        davidTip: `Your AI toolkit — saved prompts, go-to tool per task, personal rules — is a genuine career asset. Build it deliberately and keep it current; it is what makes you fast and consistent.`,
        miniChallenge: `Assemble your toolkit: 3 saved prompts (task + prompt + when to use), your tool-per-task list, and your top personal rule.`,
        modelAnswer: `## Example\nPrompts: test design, requirement review, bug-report polish. Tool-per-task: [approved tool] for drafting, docs for verification. Rule: never paste real customer or production data.`,
        resourcePreview: {
          name: 'Personal AI Toolkit Planner', purpose: 'A template to capture your prompts, tools and personal AI rules.',
          whenToUse: 'Fill it in now and refine it monthly.', formats: ['PDF', 'DOCX'],
        },
      },
    },
    {
      lessonNumber: 3,
      enhancements: {
        industryStory: `A manager asked "is AI actually helping us, or just feeling fast?" The tester who could point to concrete gains — faster test drafting, earlier gap-spotting, fewer escaped defects — made the case; vague enthusiasm would not have.`,
        davidTip: `Be able to show the value, not just claim it: time saved on drafting, gaps caught earlier, coverage improved. Measuring AI's impact (even roughly) is what turns "I use AI" into a credible professional story.`,
        miniChallenge: `List three ways you could measure whether AI is genuinely improving your testing, and how you would track each.`,
        modelAnswer: `## Example\n- Time to draft a test set (before vs with AI)\n- Requirement gaps caught at refinement (count per sprint)\n- Escaped defects trend (are we catching more earlier?)\nTrack simply in a note or sheet over a few sprints.`,
      },
    },
    {
      lessonNumber: 4,
      enhancements: {
        davidTip: `For your capstone, present a complete, repeatable, responsible AI QA workflow — prompts, where AI fits, your rules, and how you verify. This is the artefact that shows an employer you use AI like a professional, not a novelty.`,
        miniChallenge: `Assemble your AI QA Pack: your workflow, your toolkit (prompts + rules), one worked example (prompt → output → your review), and your governance statement.`,
        modelAnswer: `## Example contents\n1) Workflow diagram across the sprint. 2) Toolkit: 5 saved prompts + tool-per-task + 4 rules. 3) Worked example: a generated test set with my review notes. 4) Governance statement (data, verification, accountability).`,
        managersReview: {
          intro: 'If I received your AI QA Pack as a hiring manager, I would look for:',
          strengths: ['A repeatable, sensible workflow', 'A real toolkit with safe rules', 'A worked example showing review/judgement', 'Clear governance'],
          gaps: ['Generic claims with no examples', 'No data/safety rules', 'AI output unreviewed'],
          improvements: ['Include a real prompt→output→review example', 'State your governance rules', 'Show where your judgement shaped the result'],
        },
        portfolioBuilder: `This AI QA Pack is the centrepiece artefact for this course — a modern, credible portfolio piece proving you combine testing fundamentals with responsible, effective AI use.`,
      },
    },
  ],
};
