// AI for QA Testers — Module 10: AI in Agile QA Workflows. Lesson enhancements.
export default {
  courseSlug: 'ai-for-qa-testers',
  moduleNumber: 10,
  lessons: [
    {
      lessonNumber: 1,
      enhancements: {
        industryStory: `Before refinement, a tester ran the draft stories through AI to surface ambiguities and missing cases. They walked in with sharp questions and the session was far more productive — AI did the prep, the tester led the conversation.`,
        davidTip: `AI shines in your sprint prep: it helps you arrive at refinement and planning with better questions and a clearer sense of risk. The collaboration in the room is still yours; AI just makes you better prepared.`,
        miniChallenge: `Take an upcoming story and use AI to prepare three refinement questions and one risk to raise in planning.`,
        modelAnswer: `## Example — "save card for later"\nQuestions: "How long is the card stored?" "What happens if the saved card expires?" "How do we handle deletion?" Risk to raise: PCI/data-handling scope for stored cards.`,
      },
    },
    {
      lessonNumber: 2,
      enhancements: {
        industryStory: `A change touched the checkout discount logic. A tester asked AI to brainstorm impacted areas, then pruned the list by real risk into a focused regression set — and justified the scope in one line to the team.`,
        visualAid: {
          type: 'comparison', title: 'AI-assisted regression scoping',
          headers: ['Step', 'Who'],
          rows: [
            ['Brainstorm impacted areas', 'AI (widen)'],
            ['Filter by real risk/usage/history', 'You (narrow)'],
            ['Finalise prioritised set', 'You (own)'],
          ],
        },
        davidTip: `AI widens your thinking on what could break; you narrow it to what matters. Always cover the critical journeys, and keep a one-line justification for what you included and excluded — it protects you later.`,
        miniChallenge: `For a recent change you know, use AI to list impacted areas, then build a prioritised regression set with a one-line scope justification.`,
        modelAnswer: `## Example — discount logic change\nIncluded: checkout totals, promo application, order confirmation, payment. Excluded: account settings (no shared logic). Justification: focus on areas sharing pricing/payment logic with the change.`,
        resourcePreview: {
          name: 'AI Regression Planning Template', purpose: 'Plan a risk-based regression set with AI as a brainstorming partner.',
          whenToUse: 'Use it whenever a change needs a regression scope decision.', formats: ['PDF', 'DOCX'],
        },
      },
    },
    {
      lessonNumber: 3,
      enhancements: {
        industryStory: `End-of-sprint, a tester needed a crisp quality summary for stakeholders. AI drafted it from their notes; they edited it to lead with risk. The stakeholders got a clear go/no-go in seconds instead of a wall of test counts.`,
        davidTip: `AI is great for drafting documentation and summaries — test reports, release notes, status updates — but you shape the message. Lead with risk and impact, not raw counts, and make sure every claim is true.`,
        miniChallenge: `Give AI a few bullet points of test results and ask for a 3-sentence stakeholder summary; then edit it to lead with risk.`,
        modelAnswer: `## Example\n"All critical journeys pass on the release candidate. Two medium-severity defects remain, neither blocks release, both have workarounds. Recommendation: safe to ship with these documented." (Edited from AI's draft to foreground risk.)`,
      },
    },
    {
      lessonNumber: 4,
      enhancements: {
        industryStory: `In a retro, the team struggled to spot themes across the sprint's issues. A tester used AI to cluster the retro notes, which surfaced a recurring "unclear acceptance criteria" theme — leading to a concrete process improvement.`,
        davidTip: `Use AI to find themes in retro notes and defect data — it is good at clustering. Bring the patterns to the team as a starting point for discussion, not a verdict; the improvement actions are a team decision.`,
        miniChallenge: `Take a set of (made-up) retro notes and ask AI to identify the top two recurring themes and suggest one improvement for each.`,
        modelAnswer: `## Example\nThemes: (1) acceptance criteria often unclear at sprint start, (2) testing bunched at sprint end. Improvements: add a "testable criteria" check at refinement; test stories as they complete rather than batching.`,
        portfolioBuilder: `Describing how you would weave AI through an agile sprint — prep, regression, reporting, retros — is a strong, modern interview answer worth rehearsing.`,
      },
    },
    {
      lessonNumber: 5,
      enhancements: {
        davidTip: `For this assignment, show AI supporting collaboration across the sprint without replacing it. The best answers keep the human conversation central and use AI to prepare and summarise.`,
        miniChallenge: `Before submitting, ensure each sprint touchpoint (refinement, regression, reporting, retro) shows AI assisting and you making the call.`,
        managersReview: {
          intro: 'If I reviewed this agile-AI assignment as a QA lead, I would look for:',
          strengths: ['AI used to prepare and summarise', 'Risk-led reporting', 'Human collaboration kept central'],
          gaps: ['AI output presented as decisions', 'Reports led by raw test counts', 'No verification of AI claims'],
          improvements: ['Turn AI prep into questions you lead with', 'Lead reports with risk', 'Verify summaries before sharing'],
        },
      },
    },
  ],
};
