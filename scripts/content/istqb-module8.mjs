// ISTQB Foundation Masterclass — Module 8: Risk-Based Testing.
// Full lesson content (base fields + enhancements). Follows the Gold Standard
// template: every lesson fills every base field plus a rich `enhancements` block.
// Syllabus-accurate: risk = likelihood × impact; product vs project risk;
// risk level guides test effort, priority and order; risk-based testing runs
// throughout the lifecycle.
export default {
  courseSlug: 'istqb-foundation-masterclass',
  moduleNumber: 8,
  lessonsPrefix: 'istqb',
  enhPrefix: 'istqb',
  enhSep: '-',
  lessons: [
    {
      lessonNumber: 1,
      title: 'Risk Identification',
      estimatedTime: '13 minute read',
      lessonOverview: `Risk-based testing starts by finding the risks. Before you can prioritise or mitigate anything, you need a clear list of what could go wrong and why it matters to testing.`,
      learningObjectives: ['Define risk and distinguish product risk from project risk', 'Explain why testing is inherently risk-based', 'Run a simple risk identification activity with stakeholders'],
      lessonNotes: `## What "risk" means in testing
In ISTQB terms a **risk** is a potential event, hazard, threat or situation whose occurrence causes an undesirable outcome. It is characterised by two factors: the **likelihood** of the event and its **impact** (harm) if it happens.

## Two categories of risk
- A **product risk** (quality risk) relates to the test object — the software could fail to meet a need. Examples: incorrect calculations, poor performance, security holes, data loss.
- A **project risk** relates to the management and control of the project — late delivery, unclear requirements, staff shortages, unstable environments.

Testers care most about **product risks**, because these directly shape what and how we test. Project risks are managed alongside them.

## Why testing is risk-based
Exhaustive testing is impossible, so we cannot test everything equally. Risk gives us a rational basis for **focusing effort where failure would hurt most**. Identifying risks early — during planning and analysis — means test effort is aligned to risk from the start.

## How to identify risks
Use techniques such as risk workshops, brainstorming, checklists, expert interviews and reviewing past defect data. Involve a **range of stakeholders** (developers, business analysts, product owners, support) — no single person sees every risk. Record each risk clearly so it can later be assessed and tracked.`,
      workedExample: `A team building an online payments feature runs a 45-minute risk workshop. They list product risks: "card charged twice", "refund calculated wrongly", "payment page slow at peak". They also note a project risk: "test environment not ready until week 4". Each risk is written on a card so it can be scored later — identification first, assessment next.`,
      commonMistakes: `- Confusing product risk (the software fails) with project risk (the project slips)
- Jumping straight to test design without listing risks first
- Letting one person identify all the risks and missing whole areas
- Treating risk identification as a one-off instead of revisiting it`,
      realWorldTip: `The best risk lists come from a room, not a spreadsheet. Get a developer, a business analyst and a support person together for even thirty minutes — each sees failures the others never would.`,
      exercise: `For a hotel-booking app, write three product risks and one project risk. Label each clearly.`,
      reflectionQuestion: `What are the two factors that characterise a risk?`,
      knowledgeCheck: `A risk is characterised by two factors. What are they? (Answer: likelihood and impact)`,
      completionChecklist: ['I can define risk in ISTQB terms', 'I can distinguish product risk from project risk', 'I can run a basic risk identification activity'],
      enhancements: {
        industryStory: `On a banking project the team spent hours refining test cases before anyone had listed the risks. When we finally ran a risk workshop, a support engineer mentioned that duplicate charges were the number-one customer complaint — a risk nobody on the test team had written down. That single conversation reshaped the whole test plan. Identify risks with the right people in the room, or you test the wrong things beautifully.`,
        visualAid: { type: 'comparison', title: 'Product risk vs project risk', headers: ['Aspect', 'Product risk', 'Project risk'], rows: [['Relates to', 'The test object (software quality)', 'Managing & controlling the project'], ['Example', 'Refund calculated incorrectly', 'Environment not ready on time'], ['Owned mainly by', 'Testers & product', 'Project / test manager'], ['Drives', 'What & how we test', 'Schedule & resourcing decisions']] },
        davidTip: `Never let risk identification become a solo desk exercise. The richest risks surface when a developer, an analyst and someone from support disagree in the same room about what is most likely to break.`,
        miniChallenge: `For a hotel-booking app, list three product risks and one project risk, labelling each.`,
        modelAnswer: `## Example\nProduct risks: (1) a room is double-booked, (2) the total price omits taxes, (3) confirmation emails are not sent. Project risk: the payment gateway sandbox is unavailable until late in the schedule, delaying testing.`,
        resourcePreview: { name: 'Risk-Based Testing Toolkit', purpose: 'Templates for identifying, assessing and tracking test risks.', whenToUse: 'Keep it open throughout Module 8.', formats: ['PDF'] },
      },
    },
    {
      lessonNumber: 2,
      title: 'Risk Probability',
      estimatedTime: '12 minute read',
      lessonOverview: `The first half of a risk score is likelihood — how probable is it that this thing actually goes wrong? This lesson shows how to reason about probability without pretending to be exact.`,
      learningObjectives: ['Define likelihood (probability) as a factor of risk', 'List factors that raise or lower the probability of failure', 'Assign a relative likelihood rating on a simple scale'],
      lessonNotes: `## Likelihood is one of the two risk factors
Risk level is derived from the **likelihood** of an event and its **impact**. Likelihood — also called **probability** — answers: *how likely is this failure to occur?* It reflects technical risk: the chance a fault exists and is triggered.

## What drives likelihood up
- **Complexity** of the code or feature
- **New or unfamiliar technology** and inexperienced staff
- Areas with a **history of defects**
- **Frequent or last-minute changes** to a component
- **Time pressure** and rushed implementation
- **Interfaces and integrations** with other systems

## What drives it down
- Simple, stable, well-understood code
- Mature components that have run reliably for a long time
- Strong prior test coverage and few past defects

## Rating likelihood
You do not need a precise percentage. Use a **relative scale** — for example Low / Medium / High, or 1–3 or 1–5. Consistency matters more than false precision: the goal is to compare risks against each other so testing can be prioritised. Base your rating on evidence — defect history, complexity, change frequency — not gut feel alone.`,
      workedExample: `A team scores likelihood 1–3 for three areas. The legacy login (stable, ten years old, no recent changes) scores 1. A reworked pricing engine (complex, changed last sprint) scores 3. A settings page (moderate, occasionally touched) scores 2. Notice: change and complexity pushed pricing to the top of the likelihood scale.`,
      commonMistakes: `- Treating likelihood as the whole risk and ignoring impact
- Chasing a precise percentage instead of a consistent relative rating
- Ignoring defect history — past failures predict future ones
- Rating from gut feel with no supporting evidence`,
      realWorldTip: `Defect history is the single best predictor of likelihood. If a component has broken three times before, bet it breaks again — and test it as if it will.`,
      exercise: `List two technical factors that increase the likelihood of failure, and two that decrease it.`,
      reflectionQuestion: `Which risk factor does "likelihood" represent, and what kinds of things raise it?`,
      knowledgeCheck: `In risk analysis, likelihood is also commonly known by what other term? (Answer: probability)`,
      completionChecklist: ['I can define likelihood as a risk factor', 'I can list factors that raise or lower it', 'I can assign a relative likelihood rating'],
      enhancements: {
        industryStory: `A tester I coached rated a "simple" reporting module as low likelihood because the UI looked trivial. But the report pulled from four integrated systems that changed constantly. It failed in the first week of release. Likelihood is about what is underneath — complexity and change — not how simple the screen looks.`,
        visualAid: { type: 'comparison', title: 'Factors affecting likelihood of failure', headers: ['Raises likelihood', 'Lowers likelihood'], rows: [['High complexity', 'Simple, well-understood code'], ['New / unfamiliar technology', 'Mature, proven technology'], ['Frequent recent changes', 'Stable, unchanged component'], ['History of past defects', 'Clean defect history'], ['Time pressure on the team', 'Adequate time and review']] },
        davidTip: `When you rate likelihood, ask three questions: how complex is it, how recently has it changed, and how often has it broken before? Answer those honestly and your ratings will be defensible in any review.`,
        miniChallenge: `List two technical factors that increase likelihood of failure and two that decrease it.`,
        modelAnswer: `## Example\nIncrease: high complexity of the algorithm; frequent last-minute code changes. Decrease: the component is mature and unchanged for a year; it has a clean history with no past defects.`,
        badGood: { label: 'rating likelihood', bad: `"This feels risky, so I'll call it High." No evidence, no basis, impossible to defend or compare.`, good: `"Complex pricing logic, changed twice last sprint, two prior defects — High likelihood on our 1–3 scale, consistent with how we rate everything else."` },
      },
    },
    {
      lessonNumber: 3,
      title: 'Risk Impact',
      estimatedTime: '12 minute read',
      lessonOverview: `The second half of a risk score is impact — if this failure happens, how bad is it? A rare failure with catastrophic impact can outrank a frequent but trivial one.`,
      learningObjectives: ['Define impact (harm) as a factor of risk', 'Identify what makes a failure high-impact', 'Assign a relative impact rating on a simple scale'],
      lessonNotes: `## Impact is the second risk factor
Alongside likelihood, **impact** (the harm or consequence if the risk occurs) determines the risk level. Impact reflects **business risk**: how much damage results if this feature actually fails in use.

## What makes impact high
- **Financial loss** — wrong charges, lost sales, fraud
- **Safety** — harm to people (critical in medical, automotive, aviation)
- **Legal or regulatory** breaches and fines
- **Reputation and trust** — a public, embarrassing failure
- **Frequency and visibility of use** — a failure on the checkout page hits everyone; a failure on a rarely used admin screen hits few
- **Number of users affected** and whether there is a workaround

## Rating impact
As with likelihood, use a **relative scale** (Low / Medium / High or 1–3 / 1–5). Ask the **business**, not just the technical team — impact is fundamentally a business judgement. A tester can estimate likelihood from the code; only the business can say how much a given failure would truly cost.

## Why impact alone is not enough
A high-impact failure that is extremely unlikely may still rank below a moderate failure that is almost certain. Impact must be combined with likelihood — which is exactly what the risk matrix does next.`,
      workedExample: `A retail team rates impact 1–3. A failure in the checkout total scores 3 — every customer, real money, legal exposure. A broken "share to social" button scores 1 — cosmetic, rarely used, easy workaround. A wrong sort order on search results scores 2 — annoying and visible, but no money lost. The business, not the testers, set these scores.`,
      commonMistakes: `- Letting testers alone decide impact — it is a business judgement
- Rating impact by how hard the code is, not by the consequences of failure
- Forgetting that a rare failure can still be catastrophic
- Ignoring how many users and how often a feature is used`,
      realWorldTip: `Impact is the business's call, not yours. When a product owner says "if that number is wrong we get fined", that risk goes to the top regardless of how unlikely engineering thinks it is.`,
      exercise: `Rate the impact (Low/Medium/High) of these failures and justify each: a broken help-page link; an incorrect tax total on an invoice; a slow-loading logo image.`,
      reflectionQuestion: `Who is best placed to judge the impact of a failure, and why?`,
      knowledgeCheck: `Impact reflects which type of risk — technical or business? (Answer: business risk)`,
      completionChecklist: ['I can define impact as a risk factor', 'I can identify what makes a failure high-impact', 'I can assign a relative impact rating with the business'],
      enhancements: {
        industryStory: `An engineering team once rated a currency-rounding bug as low priority — "it's only a penny". The product owner reframed it: across millions of transactions that penny became a six-figure discrepancy and a regulatory reporting failure. Same defect, completely different impact once the business spoke. Always let the business set impact.`,
        visualAid: { type: 'comparison', title: 'Impact rating — worked scoring', headers: ['Failure', 'Impact', 'Why'], rows: [['Wrong checkout total', 'High (3)', 'Real money, all users, legal risk'], ['Wrong search sort order', 'Medium (2)', 'Visible and annoying, no money lost'], ['Broken social-share button', 'Low (1)', 'Cosmetic, rarely used, easy workaround'], ['Incorrect tax on invoice', 'High (3)', 'Legal exposure and fines']] },
        davidTip: `Impact is where testers most often defer to gut feel — and get it wrong. Book fifteen minutes with the product owner and ask, for each risk, "what does it cost us if this fails in front of a customer?" Their answers, not yours, set the impact score.`,
        miniChallenge: `Rate the impact of three failures — a broken help-page link, an incorrect invoice tax total, a slow-loading logo — and justify each rating.`,
        modelAnswer: `## Example\nBroken help link: Low — cosmetic, easy workaround. Incorrect invoice tax: High — financial and legal consequences, affects every customer. Slow logo image: Low — mild annoyance, no functional or financial harm.`,
        badGood: { label: 'judging impact', bad: `The test lead alone marks a failure "Low impact" because it is easy to fix.` , good: `The team asks the business what the failure would cost; the product owner flags legal exposure, so it is rated High regardless of fix effort.` },
      },
    },
    {
      lessonNumber: 4,
      title: 'The Risk Matrix',
      estimatedTime: '15 minute read',
      lessonOverview: `Combine likelihood and impact and you get a risk level. The risk matrix is the simple, visual tool that does this — turning two ratings into one number that guides testing.`,
      learningObjectives: ['Explain how risk level combines likelihood and impact', 'Plot risks on a likelihood × impact matrix', 'Read a risk level and describe what it implies for testing'],
      lessonNotes: `## Risk level = likelihood × impact
The **level of risk** is derived by combining its two factors: **likelihood** and **impact**. A common way to express this is:

**Risk level = likelihood × impact**

Multiply (or otherwise combine) the two ratings and you get a single value you can compare across all risks.

## The risk matrix
A **risk matrix** is a grid with likelihood on one axis and impact on the other. Each risk is plotted in a cell; its position shows its risk level.
- **High likelihood + High impact** → top-priority risk (red)
- **Low likelihood + Low impact** → low-priority risk (green)
- The remaining cells fall in between (amber)

Colour-coding (red/amber/green) makes priorities visible at a glance and easy to communicate to stakeholders.

## What the level tells you
The risk level is not the end — it is an input. A **high** risk level signals: test this more, test it earlier, and test it with more rigorous techniques. A **low** level signals: lighter testing may be acceptable. The matrix converts two subjective judgements into one comparable, defensible number.

## Keep it consistent
Use the same scale for every risk. The matrix only works if a "3" for impact means the same thing everywhere — that is what makes risks genuinely comparable.`,
      workedExample: `On a 1–3 scale, a team scores the payment engine likelihood 3, impact 3 → risk level 9 (red, top priority). The help page scores likelihood 1, impact 1 → 1 (green). The search feature scores likelihood 2, impact 2 → 4 (amber). Plotted on the matrix, payment sits top-right, help bottom-left, search in the middle — and the test plan follows that order.`,
      commonMistakes: `- Treating the risk level as a final verdict instead of an input to planning
- Using different scales for different risks so numbers can't be compared
- Ignoring the axes — plotting by feel rather than by likelihood and impact
- Forgetting that a mid-cell risk can still deserve serious testing`,
      realWorldTip: `A colour-coded risk matrix is the most persuasive one-pager you can bring to a planning meeting. Managers who glaze over at a test plan instantly understand a red cell in the top-right corner.`,
      exercise: `Using a 1–3 scale, calculate the risk level for: (a) likelihood 3, impact 2; (b) likelihood 1, impact 3; (c) likelihood 2, impact 2. Which is highest?`,
      reflectionQuestion: `How is a risk's overall level derived from its two factors?`,
      knowledgeCheck: `Risk level is derived by combining which two factors? (Answer: likelihood and impact)`,
      completionChecklist: ['I can explain risk level as likelihood combined with impact', 'I can plot risks on a likelihood × impact matrix', 'I can read a risk level and say what it implies for testing'],
      enhancements: {
        industryStory: `I once replaced a twelve-page risk register with a single colour-coded matrix on one slide. In the next planning meeting the head of delivery pointed straight at the red top-right cell and said "that's what we protect the release date for". The maths was identical to the twelve pages — but the matrix made the decision obvious in five seconds.`,
        visualAid: { type: 'comparison', title: 'Risk matrix (likelihood × impact, 1–3 scale)', headers: ['Likelihood \\ Impact', 'Low (1)', 'Medium (2)', 'High (3)'], rows: [['High (3)', 'Amber (3)', 'Red (6)', 'Red (9)'], ['Medium (2)', 'Green (2)', 'Amber (4)', 'Red (6)'], ['Low (1)', 'Green (1)', 'Green (2)', 'Amber (3)']] },
        davidTip: `Build your matrix once, then reuse the same grid and the same scale on every project. Stakeholders learn to read it instantly, and you stop re-arguing what "High" means every single time.`,
        miniChallenge: `On a 1–3 scale, calculate the risk level for (a) likelihood 3 × impact 2, (b) likelihood 1 × impact 3, (c) likelihood 2 × impact 2, and say which is highest.`,
        modelAnswer: `## Example\n(a) 3 × 2 = 6. (b) 1 × 3 = 3. (c) 2 × 2 = 4. The highest is (a) at 6 — high likelihood combined with medium impact outranks the others and would be tested first.`,
        badGood: { label: 'using the matrix', bad: `Each feature is dropped onto the grid "by feel", and different features are scored on different scales — so the numbers can't be compared.`, good: `Every feature is scored on the same 1–3 likelihood and impact scale, multiplied to a level, and plotted — producing a consistent, comparable, colour-coded picture.` },
      },
    },
    {
      lessonNumber: 5,
      title: 'Risk-Based Prioritisation',
      estimatedTime: '14 minute read',
      lessonOverview: `Once risks are scored, the payoff arrives: risk level drives how much you test, how early, in what order, and with which techniques. This is risk-based testing in action.`,
      learningObjectives: ['Explain how risk level guides test effort, priority and order', 'Allocate testing depth in proportion to risk', 'Sequence testing so the highest risks are addressed first'],
      lessonNotes: `## Risk level guides four decisions
Risk-based testing uses the assessed risk levels to steer testing. Specifically, risk guides:
1. **How much to test** — depth and breadth of coverage (test effort)
2. **The priority** — which risks get attention first
3. **The order** — sequence tests so the most important risks are tackled earliest
4. **Which techniques** — apply more rigorous techniques to higher risks

## Effort in proportion to risk
Allocate the most effort, the most thorough techniques and the most experienced testers to the **highest-risk areas**. Low-risk areas may get lighter, faster checks. This is how a team gets the best possible coverage from limited time.

## Order matters
Sequencing tests by risk means that if time runs out — and it usually does — the important things are already tested. Testing the highest risks **early** also surfaces the scariest defects when there is still time to fix them.

## Risk-based testing runs throughout the lifecycle
This is not a one-off planning step. Risks are identified and assessed during planning, used to design and prioritise tests during analysis and design, tracked during execution, and **re-evaluated continuously** as new information appears. Test results feed back: if high-risk areas pass, residual risk falls; new risks may emerge and reshape the plan.`,
      workedExample: `A team has one week and three areas: payment (risk 9), search (risk 4), help page (risk 1). They test payment first, deep and with rigorous techniques, using their most experienced tester. Search gets solid but lighter coverage. The help page gets a quick smoke check. When time runs out on Friday, the riskiest area was tested most and earliest — exactly as intended.`,
      commonMistakes: `- Spreading effort evenly instead of concentrating it on high risks
- Testing in feature order rather than risk order
- Applying the same shallow technique to high- and low-risk areas alike
- Treating risk assessment as done at planning and never revisiting it`,
      realWorldTip: `Time always runs out before testing is "finished". Sequencing by risk is your insurance: when the plug is pulled, the things that mattered most are already the things you tested first.`,
      exercise: `You have three features scored 9, 5 and 2 and only enough time to test two thoroughly. Which do you prioritise, in what order, and what do you do about the third?`,
      reflectionQuestion: `Name the decisions that risk level helps a tester make.`,
      knowledgeCheck: `Risk level guides test effort, priority and what other aspect of testing? (Answer: the order / sequence in which tests are run)`,
      completionChecklist: ['I can explain how risk guides effort, priority and order', 'I can allocate testing depth in proportion to risk', 'I can sequence testing so the highest risks come first'],
      enhancements: {
        industryStory: `A release was cut a full day short when an environment failed. Because we had sequenced strictly by risk, every high-risk area — payments, data migration, security — was already tested and green. The untested remainder was low-risk cosmetic work. We shipped with confidence on a shortened timeline, purely because risk had set the order.`,
        visualAid: { type: 'timeline', title: 'Risk-based testing through the lifecycle', steps: [{ label: 'Identify', detail: 'find product & project risks in planning' }, { label: 'Assess', detail: 'score likelihood × impact → risk level' }, { label: 'Prioritise', detail: 'set effort, techniques and test order' }, { label: 'Execute', detail: 'test highest risks first, deepest' }, { label: 'Re-evaluate', detail: 'update risks as results arrive' }] },
        davidTip: `Order is the most under-used lever in risk-based testing. Teams argue for hours about coverage percentages, then run tests in whatever order the backlog happens to be in. Sort by risk first — it costs nothing and protects you the day the schedule collapses.`,
        miniChallenge: `Three features are scored 9, 5 and 2 and you can only thoroughly test two. State which you prioritise, in what order, and what you do about the third.`,
        modelAnswer: `## Example\nTest the risk-9 feature first and deepest, then the risk-5 feature. For the risk-2 feature, run a quick smoke check and explicitly record it as accepted residual risk, flagging it to stakeholders so the decision is visible.`,
        badGood: { label: 'prioritising test effort', bad: `The team tests features in the order they appear in the backlog and gives each the same amount of time, so a trivial page gets as much attention as the payment engine.`, good: `The team ranks features by risk level, tests the payment engine first with rigorous techniques and the most experienced tester, and lightly smoke-tests the low-risk page.` },
      },
    },
    {
      lessonNumber: 6,
      title: 'Risk Mitigation',
      estimatedTime: '15 minute read',
      lessonOverview: `Testing does not remove risk on its own — it measures and helps reduce it. This final lesson covers how testing mitigates risk, what residual risk means, and how to report it honestly.`,
      learningObjectives: ['Explain how testing mitigates product risk', 'Define residual risk and how test results affect it', 'Report risk status to stakeholders and support release decisions'],
      lessonNotes: `## How testing mitigates risk
Testing is a **risk-mitigation activity**. It does not eliminate risk directly, but it reduces it in two ways: by **finding defects** so they can be fixed before release, and by **providing information** about the actual state of quality so informed decisions can be made. Running tests against high-risk areas either confirms they work (risk reduced) or exposes defects (risk to be addressed).

## Responses to a risk
Testing is one response among several. A team may also **mitigate** a risk (add reviews, redesign, extra testing), **transfer** it (insurance, third party), draw up a **contingency** plan, or **accept** it. Testers mainly contribute to mitigation and to informing acceptance decisions.

## Residual risk
**Residual risk** is the risk that **remains after** mitigation actions have been taken. No amount of testing reduces risk to zero — some always remains. When high-risk tests pass, residual risk falls; when they fail and defects are fixed and re-tested, it falls further. The key is to make residual risk **visible** so the business can decide whether it is acceptable to release.

## Reporting and re-evaluation
Report risk status clearly: which risks are covered, which remain, and how much residual risk is left. This feeds the **release decision** — an informed go/no-go. Throughout, risks are **continuously re-evaluated**: new risks appear, some are closed, priorities shift. Risk-based testing is a loop, not a line.`,
      workedExample: `Before a release, a tester summarises: payment (risk 9) fully tested, all defects fixed and re-tested — residual risk now low. Search (risk 4) tested, one minor open defect — residual risk medium. Help page (risk 1) smoke-tested only — residual risk low but accepted. The business reads this one page and gives an informed go/no-go, aware of exactly what remains.`,
      commonMistakes: `- Claiming testing "removes" risk rather than reducing and measuring it
- Reporting only what passed and hiding the residual risk that remains
- Forgetting that residual risk is never zero
- Making the go/no-go call yourself instead of informing the business decision`,
      realWorldTip: `Your job at release time is not to promise zero bugs — it is to make the remaining risk visible so the business chooses go or no-go with its eyes open. Honest residual-risk reporting is what earns a tester lasting trust.`,
      exercise: `Write a two-line residual-risk summary for a feature that was fully tested with two low-severity defects still open.`,
      reflectionQuestion: `What is residual risk, and why can testing never reduce it to zero?`,
      knowledgeCheck: `What name is given to the risk that remains after mitigation actions have been taken? (Answer: residual risk)`,
      completionChecklist: ['I can explain how testing mitigates product risk', 'I can define residual risk and how results change it', 'I can report risk status to support a release decision'],
      enhancements: {
        industryStory: `A test manager I worked with never said "we're done testing". At every release she presented a residual-risk sheet: covered, open, remaining. One release, she flagged a medium residual risk on a payment edge case. The business chose to ship with a monitoring alert rather than delay — an informed, documented decision. When that edge case did fire in production, nobody blamed testing, because the risk had been made visible in advance. That honesty made her the most trusted person in the room.`,
        visualAid: { type: 'comparison', title: 'Testing and residual risk across a release', headers: ['Feature', 'Risk level', 'Test outcome', 'Residual risk'], rows: [['Payment engine', 'High (9)', 'Fully tested, defects fixed & re-tested', 'Low'], ['Search', 'Medium (4)', 'Tested, one minor defect open', 'Medium'], ['Help page', 'Low (1)', 'Smoke-tested only', 'Low (accepted)']] },
        davidTip: `The word "done" is a trap. Replace it with a residual-risk statement: what you covered, what remains, and how much risk is left. Say that instead of "testing is complete" and you turn a vague reassurance into a decision the business can actually own.`,
        miniChallenge: `Write a two-line residual-risk summary for a feature that was fully tested but still has two low-severity defects open.`,
        modelAnswer: `## Example\n"Checkout fully tested across all payment paths; two low-severity display defects remain open (misaligned label, delayed spinner). Functional and financial risk is low; residual risk is low and acceptable for release, with the two defects logged for the next sprint."`,
        badGood: { label: 'reporting at release', bad: `"Testing is complete and everything passed." No mention of open defects or remaining risk — an over-promise that hides real exposure.`, good: `"High-risk areas fully tested and passing; two low-severity defects remain open; residual risk is low and documented. Recommend go, with the open items scheduled next sprint."` },
        managersReview: { intro: `If I reviewed your risk-based testing work as a manager, here is what I would look for:`, strengths: ['Product and project risks clearly identified with the right stakeholders', 'Likelihood and impact scored consistently on one scale', 'A clear risk matrix that drives effort, priority and order', 'Honest residual-risk reporting that supports the release decision'], improvements: ['Tie every high-risk item to a specific test with visible coverage', 're-evaluate risks as execution results arrive rather than fixing them at planning', 'Quantify residual risk per feature, not just overall'], gaps: ['Scoring impact without asking the business', 'Treating risk assessment as a one-off planning step', 'Reporting only passes and hiding the residual risk that remains'] },
        portfolioBuilder: `Produce a one-page risk-based test plan for a feature of your choice: a labelled risk list (product vs project), a likelihood × impact matrix with scores, the resulting test priority and order, and a residual-risk summary. This artefact demonstrates the full risk-based testing loop and is strong evidence for interviews.`,
        resourcePreview: { name: 'Risk-Based Testing Toolkit', purpose: 'Templates for a risk register, a likelihood × impact matrix, and a residual-risk report.', whenToUse: 'Use it to build your portfolio risk-based test plan and reuse it on real projects.', formats: ['PDF', 'XLSX'] },
      },
    },
  ],
};
