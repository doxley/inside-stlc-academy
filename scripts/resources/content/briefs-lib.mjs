// Helper to build a branded "Assignment Brief" resource from a compact spec.
// Produces the standard block structure used by the resource pipeline.

export const briefProTip = (text) => ({ t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text });

/**
 * makeBrief({
 *   courseSlug, courseTitle, moduleNumber, moduleTitle,
 *   slug,            // e.g. '90day-m1-assignment-brief'
 *   scenario,        // 1–3 sentences of real-world context
 *   objectives: [],  // what the learner demonstrates
 *   deliverables: [],// what to submit
 *   steps: [],       // ordered step-by-step
 *   format,          // submission format sentence
 *   assessment: [],  // how it's assessed (manager's-review style)
 *   resources: [],   // templates/resources to use (names)
 *   proTip,          // closing coaching note
 * })
 */
export function makeBrief(spec) {
  const {
    courseTitle, moduleNumber, moduleTitle, slug,
    scenario, objectives = [], deliverables = [], steps = [],
    format, assessment = [], resources = [], proTip,
  } = spec;

  return {
    slug,
    title: `Module ${moduleNumber} Assignment — ${moduleTitle}`,
    subtitle: `Assignment brief: scenario, deliverables, steps and how your work is assessed.`,
    courseTitle,
    category: 'Assignment Briefs',
    blocks: [
      { t: 'h1', text: 'About this assignment' },
      { t: 'p', text: scenario },
      { t: 'h1', text: "What you'll demonstrate" },
      { t: 'ul', items: objectives },
      { t: 'h1', text: 'What to submit' },
      { t: 'ul', items: deliverables },
      { t: 'h1', text: 'Step-by-step' },
      { t: 'ol', items: steps },
      { t: 'h1', text: 'Submission format' },
      { t: 'p', text: format },
      { t: 'h1', text: 'How your work is assessed' },
      { t: 'p', text: 'If a QA lead reviewed this, they would look for:' },
      { t: 'ul', items: assessment },
      { t: 'h1', text: 'Templates & resources to use' },
      { t: 'ul', items: resources.map((r) => `${r} — find it in the Resource Vault.`) },
      briefProTip(proTip),
    ],
  };
}
