// ISTQB Foundation Masterclass — Module 5: Managing the Test Process.
// Full lesson content (base fields + enhancements). Follows the API Masterclass
// Gold Standard template: every lesson fills every base field plus a rich
// `enhancements` block. Syllabus-accurate to the ISTQB Foundation Level syllabus
// (Chapter 5: Managing the Test Activities). UK English throughout.
export default {
  courseSlug: 'istqb-foundation-masterclass',
  moduleNumber: 5,
  lessonsPrefix: 'istqb',
  enhPrefix: 'istqb',
  enhSep: '-',
  lessons: [
    {
      lessonNumber: 1,
      title: 'Test Planning',
      estimatedTime: '14 minute read',
      lessonOverview: `A test plan turns intention into a shared, agreed approach. Before you monitor or control anything, you need a plan that says what you'll test, how, by whom, and when — and why it's worth doing.`,
      learningObjectives: ['State the purpose and typical content of a test plan', 'Explain how a test plan supports the objectives and scope of testing', 'Describe how planning is an ongoing, not one-off, activity'],
      lessonNotes: `## What a test plan is for
A **test plan** documents the objectives, scope, approach, resources and schedule for a test activity. It is the reference everyone agrees on — testers, developers, and stakeholders — so that testing is deliberate rather than accidental.

## Typical contents (ISTQB)
- **Context** — what's being tested and why; the test objectives
- **Scope** — what is in and out of scope
- **Approach** — test levels, types, techniques and the test basis
- **Criteria** — entry and exit criteria (Lesson 5)
- **People and environment** — roles, responsibilities, tools, test data
- **Schedule and estimates** — effort, milestones, dependencies
- **Risks** — product and project risks (Lesson 4)

## Planning is continuous
Planning is **not a one-off document** written once and filed away. It is reviewed and updated throughout the project as feedback arrives, risks change, and understanding grows. A plan that never changes is usually a plan nobody is using.

## Why it matters
The plan is the anchor for **monitoring** (are we on track?) and **control** (what do we adjust?). Without it, you cannot say whether testing is succeeding or failing — you have no baseline to compare against.`,
      workedExample: `A team is testing a new payments feature. Their one-page plan states the objective (verify correct charging and refunds), scope (API and checkout UI; excludes the legacy admin panel), approach (risk-based, API-level integration tests plus a thin UI journey), exit criteria (all high-priority risks covered, no open critical defects), and the key risk (incorrect tax rounding). Two weeks later a new regulatory requirement appears — the plan is updated, not rewritten from scratch.`,
      commonMistakes: `- Treating the test plan as a one-off document written once and never revisited
- Padding the plan with boilerplate nobody reads instead of the decisions that matter
- Planning scope and schedule but omitting the risks that justify the approach`,
      realWorldTip: `A test plan is a communication tool, not a compliance artefact. If a new team member can read it and know what to test and why, it's doing its job — length is irrelevant.`,
      exercise: `For a feature you know, write a five-line test plan: objective, in scope, out of scope, approach, and one exit criterion.`,
      reflectionQuestion: `Why is test planning described as a continuous activity rather than a single up-front task?`,
      knowledgeCheck: `Which of the following is NOT typically part of a test plan: scope, approach, schedule, or the source code of the application? (Answer: the source code of the application)`,
      completionChecklist: ['I can state the purpose of a test plan', 'I can list the typical contents of a test plan', 'I understand that planning is continuous'],
      enhancements: {
        industryStory: `On one programme the "test plan" was a 40-page template inherited from a previous project, most of it irrelevant. Nobody read it. We replaced it with a single page of real decisions — scope, approach, risks, exit criteria — that the whole team actually referenced in stand-ups. Shorter and used beats thorough and ignored every time.`,
        visualAid: { type: 'comparison', title: 'What belongs in a test plan', headers: ['Section', 'Question it answers'], rows: [['Objectives', 'Why are we testing this?'], ['Scope', 'What is in and out?'], ['Approach', 'Which levels, types and techniques?'], ['Criteria', 'When do we start and stop?'], ['Resources', 'Who, what tools, what data?'], ['Schedule & risks', 'When, and what could go wrong?']] },
        davidTip: `Write the plan so a new joiner could pick up your testing on day one. If it doesn't survive that test, it's documentation for its own sake, not a plan.`,
        miniChallenge: `Draft a five-line test plan for a login feature: objective, in scope, out of scope, approach, one exit criterion.`,
        modelAnswer: `## Example\nObjective: verify valid users can log in and invalid attempts are rejected. In scope: login API and form. Out of scope: password-reset email delivery. Approach: risk-based, API-level plus one UI journey. Exit criterion: no open high-priority defects and all identified auth risks covered.`,
        resourcePreview: { name: 'One-Page Test Plan Template', purpose: 'A lightweight test plan focused on decisions, not boilerplate.', whenToUse: 'Use it at the start of any new feature or project.', formats: ['PDF', 'DOCX'] },
      },
    },
    {
      lessonNumber: 2,
      title: 'Test Monitoring',
      estimatedTime: '13 minute read',
      lessonOverview: `Monitoring is how you find out whether testing is actually going to plan. It means gathering information — usually through metrics — so you can see progress, coverage and quality as they really are.`,
      learningObjectives: ['Explain the purpose of test monitoring', 'Identify common metrics used to monitor test progress', 'Distinguish monitoring (gathering information) from control (taking action)'],
      lessonNotes: `## What monitoring is
**Test monitoring** is the ongoing gathering and analysis of information about test activities. Its purpose is to give the team and stakeholders **visibility**: are we on schedule, is coverage growing, is quality improving or getting worse?

## Common monitoring metrics (ISTQB)
- **Test-case progress** — planned vs designed vs executed vs passed/failed
- **Coverage** — requirements, risks or code covered so far
- **Defect metrics** — found, fixed, still open; defect density; trends
- **Effort and cost** — actual vs planned
- **Environment availability** — was the test environment up?

## Monitoring vs control
Monitoring only **gathers and reports** information. It does not change anything by itself. Deciding what to *do* about what you see is **control** (Lesson 3). The two work as a loop: monitor, then control, then monitor again.

## Test reports
Monitoring feeds into **test progress reports** (during testing) and **test summary reports** (at the end). A good report communicates status and risk clearly to its audience — a developer and a sponsor need different views of the same data.`,
      workedExample: `Two weeks into a sprint, the burndown of test cases shows 80% designed but only 30% executed, and the defect-open trend is rising, not falling. Monitoring has revealed a problem: execution is behind and defects aren't being closed. Note that monitoring has only *shown* this — no decision has been taken yet. That decision is control.`,
      commonMistakes: `- Confusing monitoring (gathering information) with control (taking action on it)
- Collecting metrics nobody looks at, so problems surface too late
- Reporting the same dashboard to everyone regardless of what they need to decide`,
      realWorldTip: `Report to the audience, not to the tool. A sponsor wants "are we on track and what's the risk?"; a developer wants "which tests are failing and why?". Same data, different cut.`,
      exercise: `List three metrics you would track to monitor whether a two-week test effort is on schedule, and say what each tells you.`,
      reflectionQuestion: `What is the difference between test monitoring and test control?`,
      knowledgeCheck: `Test monitoring is best described as: (a) taking corrective action, (b) gathering and analysing information about test progress, (c) writing test cases, (d) fixing defects. (Answer: b — gathering and analysing information about test progress)`,
      completionChecklist: ['I can explain what test monitoring is', 'I can name common monitoring metrics', 'I can distinguish monitoring from control'],
      enhancements: {
        industryStory: `A project I reviewed had a beautiful metrics dashboard that nobody opened. The numbers were red for a fortnight before anyone acted, because monitoring without a habit of *looking* is just data collection. We added a five-minute daily check of three numbers — execution rate, open critical defects, environment uptime — and problems started surfacing in days, not weeks.`,
        visualAid: { type: 'timeline', title: 'The monitor-and-control loop', steps: [{ label: 'Measure', detail: 'gather metrics on progress, coverage, defects' }, { label: 'Analyse', detail: 'compare against the plan and criteria' }, { label: 'Report', detail: 'communicate status and risk to the audience' }, { label: 'Decide', detail: 'control: choose an action (Lesson 3)' }, { label: 'Repeat', detail: 'monitor again to see if it worked' }] },
        davidTip: `Pick three numbers you will actually look at every day and make them impossible to ignore. A dashboard with forty metrics and no daily habit tells you nothing until it's too late.`,
        badGood: { label: 'a test progress report', bad: `A wall of every metric the tool can produce, identical for the sponsor and the dev team, with no interpretation.`, good: `A short report tailored to the reader: for the sponsor, on-track/at-risk plus the top risk; for the team, which suites are failing and the open-defect trend.` },
        miniChallenge: `Name three metrics that would tell you a two-week test effort is behind schedule, and what each reveals.`,
        modelAnswer: `## Example\nExecution rate (executed vs planned) shows pace; open-defect trend rising shows quality/rework problems; environment uptime shows lost testing time. Together they explain both *whether* you're behind and *why*.`,
      },
    },
    {
      lessonNumber: 3,
      title: 'Test Control',
      estimatedTime: '13 minute read',
      lessonOverview: `Control is what you do about what monitoring shows. When reality diverges from the plan, control is the set of corrective actions — and the guidance to steer testing back on track.`,
      learningObjectives: ['Explain the purpose of test control', 'Give examples of control actions taken in response to monitoring', 'Describe how monitoring and control together keep testing aligned with objectives'],
      lessonNotes: `## What control is
**Test control** takes the information from monitoring and **acts on it** to keep testing aligned with the plan and objectives. Monitoring shows you're off course; control decides how to steer back.

## Typical control actions (ISTQB)
- **Re-prioritise** tests when risk or deadlines change
- **Re-plan** — adjust scope, schedule or effort estimates
- **Reallocate resources** — move people or environments to bottlenecks
- **Tighten or relax entry/exit criteria** in agreement with stakeholders
- **Escalate** risks and blockers that testing alone cannot resolve

## The loop
Monitoring and control form a **continuous feedback loop**. You measure (monitor), decide (control), act, then measure again to check the action worked. Neither is useful without the other: monitoring with no control is passive reporting; control with no monitoring is guesswork.

## Control is a decision, not a document
Control actions are often small and frequent — dropping a low-risk area, swapping test order, asking for a fix to be prioritised. They should always trace back to the **objectives** in the plan, so decisions stay purposeful rather than reactive.`,
      workedExample: `Following on from Lesson 2's monitoring: execution is behind and critical defects are open. The test lead takes control actions: re-prioritise so the highest-risk payment paths are executed first, escalate the two blocking defects to the developers for immediate fix, and agree with the product owner to move a low-risk reporting area out of scope for this release. Next week's monitoring confirms execution has caught up on the paths that matter.`,
      commonMistakes: `- Reporting problems endlessly but never taking a control action
- Making control decisions that aren't traced back to the test objectives
- Silently changing scope or criteria without stakeholder agreement`,
      realWorldTip: `Every control action should answer "does this move us closer to the objective?" If you can't tie a decision back to the plan's goals, you're reacting, not controlling.`,
      exercise: `Monitoring shows testing is a week behind with two critical defects open. Write down three control actions you could take and the trade-off of each.`,
      reflectionQuestion: `Why is control described as the partner of monitoring rather than a separate activity?`,
      knowledgeCheck: `Which of these is a test control action: (a) counting executed test cases, (b) re-prioritising tests when risk changes, (c) plotting a defect trend, (d) recording environment uptime? (Answer: b — re-prioritising tests when risk changes)`,
      completionChecklist: ['I can explain the purpose of test control', 'I can give examples of control actions', 'I understand the monitor-and-control loop'],
      enhancements: {
        industryStory: `A test manager once told me proudly that his weekly report always flagged the same three risks. I asked what he'd *done* about them — and the answer was nothing. He'd mastered monitoring and forgotten control. The moment we turned each flagged risk into a decision (re-prioritise, escalate, or accept), the report went from a status ritual to a steering wheel.`,
        visualAid: { type: 'comparison', title: 'Monitoring vs control', headers: ['Aspect', 'Monitoring', 'Control'], rows: [['Question', 'Are we on track?', 'What should we do?'], ['Output', 'Information & reports', 'Decisions & actions'], ['Nature', 'Passive — observes', 'Active — changes course'], ['Example', 'Defect trend is rising', 'Escalate and re-prioritise fixes'], ['Without the other', 'Reporting nobody acts on', 'Guesswork with no evidence']] },
        davidTip: `A report that never triggers a decision is theatre. Before you send any status update, ask: what am I asking someone to *do* with this?`,
        badGood: { label: 'responding to a slipping schedule', bad: `The lead re-notes "testing is behind" in every stand-up for a week and hopes it recovers on its own.`, good: `The lead re-prioritises to the highest-risk paths, escalates the blocking defects, and agrees to descope a low-risk area — then checks next week's metrics to confirm it worked.` },
        miniChallenge: `Testing is a week behind with two critical defects open. List three control actions and one trade-off for each.`,
        modelAnswer: `## Example\nRe-prioritise to high-risk paths (trade-off: low-risk areas may slip). Escalate the blocking defects (trade-off: interrupts developers). Descope a low-risk feature with stakeholder sign-off (trade-off: that area ships untested and must be flagged).`,
      },
    },
    {
      lessonNumber: 4,
      title: 'Risk in Test Planning',
      estimatedTime: '15 minute read',
      lessonOverview: `Risk is what makes testing purposeful. Risk-based testing focuses your limited effort where failure would hurt most — and it starts by telling product risks apart from project risks.`,
      learningObjectives: ['Distinguish product risk from project risk', 'Explain how risk level combines likelihood and impact', 'Describe how risk is used to prioritise and shape testing'],
      lessonNotes: `## Two kinds of risk (ISTQB)
- **Product risk** (quality risk) — the risk that the *product* fails to meet a need: a defect, wrong behaviour, poor performance or security. Example: the payment calculation is wrong.
- **Project risk** — the risk that the *project* is delayed or disrupted: late delivery, missing skills, unstable environment, scope creep. Example: the test environment isn't ready in time.

Testing primarily addresses **product risk**, but testers must flag **project risks** too, because they threaten the testing itself.

## Measuring risk
**Risk level = likelihood × impact**. How likely is the problem, and how bad if it happens? A high-likelihood, high-impact risk earns the most testing; a low-likelihood, low-impact risk may earn little or none.

## Risk-based testing
Risk-based testing uses risk to **prioritise and shape** the effort:
- *What* to test — cover the highest risks first and most deeply
- *How much* — depth of testing scales with risk level
- *When to stop* — feeds directly into exit criteria (Lesson 5)

Risks are identified early, reviewed continuously, and updated as understanding changes — the same continuous rhythm as planning.`,
      workedExample: `A banking app team lists risks. Product risk: "interest is miscalculated" — high impact (financial and regulatory), medium likelihood → high risk, tested deeply with many edge cases. Product risk: "the About page has a typo" — low impact, low likelihood → low risk, a quick check. Project risk: "the test data won't be ready until week 3" — flagged and escalated, because it threatens the whole schedule even though testing can't fix it directly.`,
      commonMistakes: `- Confusing product risk (a bad product) with project risk (a threatened project)
- Treating every area as equally risky, so effort is spread thin instead of focused
- Identifying risks once at the start and never revisiting them as the project changes`,
      realWorldTip: `Rank risks with the whole team, not alone. Developers, product owners and testers each see different risks — the shared list is always sharper than any one person's.`,
      exercise: `Write down two product risks and two project risks for an online checkout, and rate each as high, medium or low using likelihood and impact.`,
      reflectionQuestion: `Why must testers care about project risks even though testing mainly addresses product risks?`,
      knowledgeCheck: `"The test environment may not be ready on time" is an example of which risk type? (Answer: a project risk)`,
      completionChecklist: ['I can distinguish product from project risk', 'I can explain risk as likelihood × impact', 'I can use risk to prioritise testing'],
      enhancements: {
        industryStory: `Early in my career a release slipped badly — not because of a product bug, but because the test environment was down for a week. Nobody had listed that as a risk, so nobody had a mitigation. Ever since, my risk lists have two columns: what could be wrong with the product, and what could stop us testing it at all. The second column has saved more releases than the first.`,
        visualAid: { type: 'comparison', title: 'Product risk vs project risk', headers: ['Dimension', 'Product risk', 'Project risk'], rows: [['Threatens', 'The quality of the product', 'The delivery of the project'], ['Example', 'Wrong tax calculation', 'Environment not ready'], ['Owned by', 'Testing addresses it directly', 'Flagged/escalated by testers'], ['Measured by', 'Likelihood × impact on quality', 'Likelihood × impact on schedule/cost'], ['Response', 'Test it deeply', 'Mitigate, escalate, plan around it']] },
        davidTip: `When someone asks "have we tested enough?", the honest answer is always "enough for the risk". Tie every testing decision to a risk and that question stops being a guess.`,
        badGood: { label: 'allocating test effort', bad: `Every feature gets the same number of test cases, so the trivial About page is tested as hard as the payment engine.`, good: `Effort scales with risk: the payment engine gets deep, edge-case testing; the About page gets a quick sanity check. Coverage follows impact.` },
        miniChallenge: `List two product risks and two project risks for an online checkout, and rate each high/medium/low.`,
        modelAnswer: `## Example\nProduct: "wrong total charged" (high), "slow page under load" (medium). Project: "payment sandbox unavailable" (high), "new tester joins late" (medium). Effort concentrates on the high risks first.`,
      },
    },
    {
      lessonNumber: 5,
      title: 'Entry & Exit Criteria',
      estimatedTime: '13 minute read',
      lessonOverview: `Entry and exit criteria are the gates of testing: when may we start, and when may we stop? Framed as a definition of ready and a definition of done, they turn "are we finished?" from an opinion into an agreement.`,
      learningObjectives: ['Define entry criteria (definition of ready) and exit criteria (definition of done)', 'Give practical examples of each', 'Explain how criteria link to risk, coverage and the plan'],
      lessonNotes: `## Entry criteria — the definition of ready
**Entry criteria** are the conditions that must be met **before** a test activity can meaningfully start. In Agile terms, a **definition of ready**. Examples:
- The test environment and test data are available
- The build is deployed and smoke-passes
- Testable requirements or user stories exist
- Prerequisite work (e.g. code review) is complete

Starting without them wastes effort — you test on shifting sand.

## Exit criteria — the definition of done
**Exit criteria** are the conditions that must be met **before** a test activity can be declared complete. In Agile terms, part of the **definition of done**. Examples:
- Planned coverage achieved (requirements, risks, code)
- No open critical or high-severity defects
- The agreed risk level has been reduced acceptably
- Time or budget for the activity is exhausted (a real-world criterion)

## Why they matter
Criteria make **start and stop** an agreement, not an argument. They connect directly to **risk** (Lesson 4 — have we covered the high risks?) and to **monitoring** (Lesson 2 — the metrics that show whether a criterion is met). Set them in the plan; revisit them as risk changes.`,
      workedExample: `A team agrees entry criteria before a test cycle: environment up, test data loaded, build smoke-passing. Two of three are met but the smoke test fails — so testing does *not* start; the build is fixed first, saving a wasted day. For exit, they agree: all high-risk paths covered and zero open critical defects. At cycle end one critical defect remains, so the exit criterion is not met — they either fix it or make an explicit, signed-off decision to release with the risk documented.`,
      commonMistakes: `- Starting test execution before entry criteria are met, then blaming the results
- Writing exit criteria so vague ("testing looks good") that nobody can tell if they're met
- Silently releasing when exit criteria aren't met instead of getting an explicit decision`,
      realWorldTip: `Make exit criteria measurable. "No open critical defects and 100% of high risks covered" can be checked; "quality is acceptable" cannot. If you can't measure it, you can't defend the release decision.`,
      exercise: `Write two entry criteria and two exit criteria for testing a new checkout feature, and make each one measurable.`,
      reflectionQuestion: `Why is it risky to begin test execution before the entry criteria are satisfied?`,
      knowledgeCheck: `"No open critical defects and all high-risk areas covered" is an example of: (a) entry criteria, (b) exit criteria, (c) a test case, (d) a project risk. (Answer: b — exit criteria)`,
      completionChecklist: ['I can define entry and exit criteria', 'I can give measurable examples of each', 'I can link criteria to risk and coverage'],
      enhancements: {
        industryStory: `A team I supported kept "finishing" testing and then finding the environment had been half-broken the whole cycle. Their fix was a two-line entry checklist pinned to the board: environment up, smoke test green. It sounds trivial, but it stopped them starting cycles that were doomed before they began — and the argument about "are we done?" disappeared once the exit criteria were written down and measurable.`,
        visualAid: { type: 'comparison', title: 'Entry vs exit criteria', headers: ['Aspect', 'Entry (definition of ready)', 'Exit (definition of done)'], rows: [['Question', 'May we start?', 'May we stop?'], ['Timing', 'Before the activity', 'After the activity'], ['Example', 'Environment & data ready, build smoke-passes', 'High risks covered, no open critical defects'], ['If not met', "Don't start — you'll waste effort", 'Fix, or release with a signed-off, documented risk'], ['Linked to', 'Prerequisites & environment', 'Risk, coverage & the plan']] },
        davidTip: `The most valuable word in an exit criterion is a number. "Acceptable quality" starts arguments; "zero open critical defects, 90% high-risk coverage" ends them.`,
        badGood: { label: 'an exit criterion', bad: `"Testing is complete when the team feels the quality is good enough." Unmeasurable, and impossible to defend if a defect ships.`, good: `"Testing is complete when all high-risk scenarios are covered, there are no open critical or high-severity defects, and any remaining risk is documented and signed off." Measurable and defensible.` },
        miniChallenge: `Write two entry and two exit criteria for a checkout feature — each one measurable.`,
        modelAnswer: `## Example\nEntry: (1) payment sandbox available; (2) build deployed and smoke test green. Exit: (1) 100% of high-risk payment paths executed; (2) zero open critical or high-severity defects.`,
      },
    },
    {
      lessonNumber: 6,
      title: 'Test Metrics',
      estimatedTime: '16 minute read',
      lessonOverview: `Metrics turn testing into evidence. Used well, coverage, defect density and pass rate reveal progress and quality; used badly, they mislead. This final lesson shows both — and how to avoid being fooled by your own numbers.`,
      learningObjectives: ['Describe useful test metrics: coverage, defect density and pass rate', 'Explain what each metric does and does not tell you', 'Recognise how metrics can be misused as targets and gamed'],
      lessonNotes: `## Useful metrics (ISTQB)
- **Coverage** — the proportion of something (requirements, risks, code) exercised by tests. High coverage of the *right* things gives confidence; coverage of trivial things flatters the numbers.
- **Defect density** — defects found per size unit (per module, per KLOC, per feature). Highlights the riskiest areas — where density is high, look harder.
- **Pass/fail rate** — the proportion of executed tests that pass. Shows current stability, but only for the tests you actually wrote.

## What metrics don't tell you
- Coverage measures *what you tested*, never *what you missed*. 100% of weak tests proves little.
- A high pass rate can mean strong quality **or** shallow tests. It says nothing about the gaps.
- Defect counts reflect where you *looked*, not where the bugs *are*.

## The misuse trap
When a metric becomes a **target**, people optimise the number instead of the goal (Goodhart's law). Push "pass rate must be 95%" and testers may write easy tests or stop logging awkward defects. Push "close defects fast" and bugs get closed as "won't fix". Use metrics to **ask questions**, not to grade people — trends and context matter more than any single figure.`,
      workedExample: `A dashboard shows 98% pass rate and 95% requirement coverage — reassuring, until you look closer. Defect density is heavily concentrated in the payments module, yet its coverage is only 60%; the 95% overall figure is propped up by exhaustively tested trivial screens. The metrics, read together, tell the real story: the high-risk area is under-tested and the headline numbers are hiding it. Acting on the trend and the breakdown — not the headline — is what matters.`,
      commonMistakes: `- Reading a single metric in isolation instead of trends and several metrics together
- Turning a metric into a target, which invites gaming (Goodhart's law)
- Trusting high coverage or pass rate without asking what was missed or how shallow the tests are`,
      realWorldTip: `Ask of every metric: "what could make this number look good while quality is actually poor?" If you can answer easily, that metric can be gamed — pair it with another that guards against it.`,
      exercise: `Take one metric — pass rate — and describe two different situations that both produce a high pass rate: one where quality is genuinely good and one where it isn't.`,
      reflectionQuestion: `Why can a very high test pass rate be misleading about product quality?`,
      knowledgeCheck: `Defect density measures: (a) how fast defects are fixed, (b) the number of defects per size unit such as per module or per KLOC, (c) the pass rate, (d) requirement coverage. (Answer: b — the number of defects per size unit)`,
      completionChecklist: ['I can describe coverage, defect density and pass rate', 'I can explain the limits of each metric', 'I can recognise metric misuse and gaming'],
      enhancements: {
        industryStory: `A programme I audited was rightly proud of a 99% pass rate — until we noticed the hardest, most valuable tests had quietly been marked "blocked" and excluded from the denominator. Nobody was cheating deliberately; the target had simply made it rational to keep awkward tests out of the sum. We stopped reporting pass rate as a grade and started reporting it beside coverage of the high-risk areas. The picture changed overnight, and so did the conversations.`,
        visualAid: { type: 'comparison', title: 'Three metrics: use and misuse', headers: ['Metric', 'Tells you', 'How it misleads'], rows: [['Coverage', 'How much was exercised', 'Says nothing about what was missed or test quality'], ['Defect density', 'Where bugs cluster', 'Reflects where you looked, not where bugs are'], ['Pass rate', 'Current stability', 'High rate may just mean shallow or excluded tests']] },
        davidTip: `Never hand a metric to a manager naked. "92% pass rate" means nothing without "…across 100% of the high-risk paths, trend improving". Context is the metric; the number is just the headline.`,
        badGood: { label: 'reporting quality with metrics', bad: `"98% pass rate — we're good to ship." One number, no context, no view of where the risk actually sits.`, good: `"98% pass rate, but the payments module (our top risk) is only 60% covered and holds most of the open defects. Recommend we hold until that area's coverage and defect trend improve."` },
        miniChallenge: `Describe two situations that both give a 95% pass rate — one where quality is genuinely good, one where it is not.`,
        modelAnswer: `## Example\nGenuinely good: a broad, risk-based suite covering the hard paths passes 95%. Misleadingly good: the suite is mostly trivial happy-path checks, awkward tests are marked "blocked", and the risky payment logic is barely tested — the number is high because the hard questions were never asked.`,
        managersReview: { intro: `If I reviewed your grasp of managing the test process as a lead, I'd look for:`, strengths: ['You can build a lean, useful test plan and keep it current', 'You separate monitoring (information) from control (action)', 'You tie effort to product and project risk', 'You set measurable entry and exit criteria', 'You read metrics as trends-in-context, not as grades'], improvements: ['Turn every flagged risk in a report into an explicit control decision', 'Always pair a metric with the context that stops it being gamed', 'Revisit the plan, risks and criteria as the project changes, not just at the start'], gaps: ['Reporting status but never taking a control action', 'Exit criteria written as vague opinions rather than measurable conditions', 'Trusting a single headline metric instead of several read together'] },
        portfolioBuilder: `Create a one-page "test management pack" for a feature of your choice, containing: a lean test plan, a short risk list (product and project) with ratings, measurable entry and exit criteria, and the three metrics you'd monitor. This is a strong portfolio artefact that shows you can manage a test process, not just execute tests.`,
        resourcePreview: { name: 'Test Management Pack Template', purpose: 'A single-page bundle: lean plan, risk list, entry/exit criteria and chosen metrics.', whenToUse: 'Use it to plan and manage any real or practice feature end to end.', formats: ['PDF', 'DOCX'] },
      },
    },
  ],
};
