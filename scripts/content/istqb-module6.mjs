// ISTQB Foundation Masterclass — Module 6: Test Management.
// Full lesson content (base fields + enhancements), authored to the Gold Standard
// template established in scripts/content/api-module1.mjs.
export default {
  courseSlug: 'istqb-foundation-masterclass',
  moduleNumber: 6,
  lessonsPrefix: 'istqb',
  enhPrefix: 'istqb',
  enhSep: '-',
  lessons: [
    {
      lessonNumber: 1,
      title: 'Test Roles & Responsibilities',
      estimatedTime: '14 minute read',
      lessonOverview: `Test management starts with knowing who does what. This lesson separates the test management role from the testing role, and explains why the split matters.`,
      learningObjectives: ['Distinguish test management tasks from testing tasks', 'Describe the responsibilities of the test manager and the tester', 'Explain why roles can be shared or combined depending on context'],
      lessonNotes: `## Two roles, two focuses
The ISTQB syllabus separates the work into two principal roles. The **test manager** owns the overall test process and leadership of the test activities. The **tester** focuses on the technical, hands-on work of analysing, designing, implementing and executing tests.

## Typical test management tasks
- Developing and reviewing the **test policy** and **test strategy**
- Planning the test activities and writing the **test plan**
- Selecting and coordinating the test approach, effort and resources
- Introducing suitable **metrics** for measuring progress and quality
- Deciding what should be automated, and to what degree
- Writing **test summary reports** based on gathered information

## Typical tester (test analyst) tasks
- Reviewing and contributing to test plans
- Analysing the test basis and **designing** test cases
- Setting up the test environment
- Implementing and **executing** tests, logging results and defects
- Reviewing tests written by others

## Why the split matters
The roles depend on context. In a small Agile team one person may do both; in a large regulated programme they are distinct jobs. Understanding the distinction stops managers from disappearing into test execution and stops testers from being blamed for planning decisions that were never theirs.`,
      workedExample: `On a banking programme, the test manager set the risk-based strategy and reported weekly to the steering group, while three test analysts designed and ran the cases. When a release date slipped, the manager renegotiated scope — a management task — rather than asking analysts to simply "test faster", which would only have cut coverage.`,
      commonMistakes: `- Blurring the two roles so the manager ends up executing tests and no one plans
- Assuming the tester decides scope and release readiness — that is a management call informed by testers
- Treating "test manager" and "tester" as fixed job titles rather than sets of responsibilities`,
      realWorldTip: `In Agile teams the "test manager" tasks don't vanish — they get shared across the team or picked up by a coach. Someone must still own strategy, metrics and reporting.`,
      exercise: `List three tasks you would place with the test manager and three with the tester, and note one task that could belong to either depending on context.`,
      reflectionQuestion: `Who owns the test strategy — the test manager or the individual tester?`,
      knowledgeCheck: `Which role is responsible for developing the test strategy and writing test summary reports? (Answer: the test manager)`,
      completionChecklist: ['I can separate test management tasks from testing tasks', 'I can describe the tester and test manager responsibilities', 'I understand why the roles depend on context'],
      enhancements: {
        industryStory: `A team promoted their best tester to "test lead" but never redefined the role. She kept executing cases because that felt productive, and no one owned planning or reporting. Two releases later, quality metrics didn't exist and the steering group flew blind. The fix wasn't more effort — it was clarifying that leading the test process is itself the job.`,
        visualAid: { type: 'comparison', title: 'Test manager vs tester tasks', headers: ['Dimension', 'Test manager', 'Tester'], rows: [['Focus', 'The test process & leadership', 'Designing & running tests'], ['Owns', 'Strategy, plan, metrics', 'Test cases & execution'], ['Key output', 'Test summary report', 'Test results & defect logs'], ['Decides', 'Scope, effort, approach', 'How to design a given test'], ['Reports', 'To stakeholders', 'To the test manager']] },
        davidTip: `The fastest way to spot a struggling test function is to ask "who owns the test strategy here?" If nobody can answer, the management tasks have quietly fallen through the cracks — usually because someone confused being busy with leading.`,
        miniChallenge: `Write down your current (or a past) team. For each of these — strategy, metrics, test design, reporting — name who actually owns it. Circle any that no one owns.`,
        modelAnswer: `## Example\nManager tasks: sets the risk-based strategy, defines the pass/fail exit metrics, writes the summary report. Tester tasks: designs boundary-value cases, sets up the test data, logs defects. Either role: reviewing another person's test cases, depending on team size and seniority.`,
        resourcePreview: { name: 'Test Roles Responsibility Matrix', purpose: 'A RACI-style one-pager mapping management vs testing tasks.', whenToUse: 'Use it when a new project starts and roles are still fuzzy.', formats: ['PDF'] },
      },
    },
    {
      lessonNumber: 2,
      title: 'Communication in Testing',
      estimatedTime: '15 minute read',
      lessonOverview: `Testing is a communication job as much as a technical one. This lesson covers independence of testing and how to raise findings without breaking relationships.`,
      learningObjectives: ['Explain the benefits and risks of independent testing', 'Describe the levels of test independence', 'Communicate defects and risks diplomatically and objectively'],
      lessonNotes: `## Independence of testing
The ISTQB syllabus notes that a degree of **independence** makes testing more effective, because independent testers see different and additional defects than the person who built the software. Independence rises along a scale:
- No independence — authors test their own code
- Some independence — another team member tests
- **Independent testers** within the development team
- An **independent test team** within the organisation
- Independent testers **outside the organisation** (e.g. an outsourced or certification body)

## Benefits and risks
More independence brings **objectivity** and fresh perspective, but too much can cause **isolation** from the development team, communication breakdowns and a "throw it over the wall" mentality. The right level depends on the risk and context.

## Communicating findings well
Testers deliver bad news for a living. The syllabus stresses professional, objective communication:
- Report on **the software, not the person** — describe facts, not blame
- Stay **objective**: reproducible steps, evidence, impact
- Try to **understand how others feel** and why they react as they do
- Confirm the other person understood you, and vice versa

Good communication is what turns a defect report from an accusation into shared problem-solving.`,
      workedExample: `A tester found a serious payment bug the day before release. Instead of emailing "the dev team broke checkout again", she wrote: "Order totals over £1,000 are charged twice — here are the steps and the log line. Impact: double billing. Can we look together this morning?" The bug was fixed calmly and the relationship stayed intact.`,
      commonMistakes: `- Wording defects as personal criticism of the developer
- Assuming maximum independence is always best — it can isolate the tester
- Reporting an opinion ("this feels wrong") instead of reproducible facts`,
      realWorldTip: `Frame every defect around the software and its impact on the user or business, never around who wrote it. You'll get more bugs fixed and keep the team on your side.`,
      exercise: `Rewrite a blunt bug report — "Dev broke the login page, it's totally broken" — into an objective, non-personal, reproducible defect report.`,
      reflectionQuestion: `What is one benefit and one risk of a fully independent, external test team?`,
      knowledgeCheck: `What is the main benefit of independent testing? (Answer: independent testers see different and additional defects due to their objectivity and different background)`,
      completionChecklist: ['I can explain the levels of test independence', 'I can weigh the benefits and risks of independence', 'I can phrase a defect objectively and diplomatically'],
      enhancements: {
        industryStory: `An outsourced test team was so independent it never spoke to the developers — findings arrived as a giant spreadsheet each Friday. Half were duplicates or misunderstandings the devs could have cleared up in a minute. We added a daily 15-minute triage call. Defect volume "dropped", but real quality rose sharply, because independence without communication was just noise.`,
        visualAid: { type: 'timeline', title: 'Levels of test independence', steps: [{ label: 'Author tests', detail: 'no independence — writes and tests own code' }, { label: 'Peer tests', detail: 'another dev in the same team' }, { label: 'Embedded tester', detail: 'independent tester inside the team' }, { label: 'Independent team', detail: 'separate test team in the org' }, { label: 'External', detail: 'outsourced or certification body' }] },
        davidTip: `I coach every tester on one phrase: "the software does X" not "you did X". The moment a developer feels accused, they defend the code instead of fixing it. Objectivity isn't just polite — it's the fastest route to a fix.`,
        badGood: { label: 'a defect report', bad: `"Login is completely broken, the dev clearly didn't test this at all."`, good: `"Login fails for emails containing a '+' character. Steps: enter test+1@x.com, submit → 500 error (log attached). Impact: blocks any user with a plus-address. Repro rate: 5/5."` },
        miniChallenge: `Take the last defect you (or a colleague) reported. Rewrite it in three lines: what the software does, the steps to reproduce, and the impact — with zero reference to any person.`,
        modelAnswer: `## Example\nWhat: the checkout charges twice for orders over £1,000. Steps: add item priced £1,200 → pay → observe two charges in the payment log. Impact: customers double-billed; financial and reputational risk. No mention of who wrote the code — just facts and impact.`,
      },
    },
    {
      lessonNumber: 3,
      title: 'Test Reporting',
      estimatedTime: '16 minute read',
      lessonOverview: `Reports are how testing informs decisions. This lesson covers test progress reports (during testing) and test summary reports (at the end), and who reads each.`,
      learningObjectives: ['Distinguish a test progress report from a test summary report', 'Identify what each report contains and who its audience is', 'Tailor a report to its stakeholders'],
      lessonNotes: `## Two kinds of report
The ISTQB syllabus describes two:
- **Test progress reports** support ongoing control of testing. They are produced regularly (e.g. daily or weekly) *during* a test period.
- **Test summary reports** summarise a specific stage of testing (or a whole project) once it is *complete*.

## What a test progress report contains
- The **status** of the test activities and progress against the plan
- **Impediments** and factors blocking progress
- Tests **planned, run, passed, failed, blocked**
- **Metrics** (e.g. defects found/fixed, coverage, risk burn-down)
- Assessment of **residual risk** and readiness for the next step

## What a test summary report contains
- A summary of **what was tested** and the outcome against objectives
- **Deviations** from the plan (schedule, effort, scope)
- **Blocking issues** and residual risks at the end
- Metrics for **defects, coverage, exit-criteria** status
- **Lessons learned** to improve future projects

## Tailor to the audience
An executive sponsor wants a red/amber/green summary and residual risk; a developer wants defect detail. The syllabus stresses reporting must be **tailored to the project context and the audience**, with the right level of detail and the right metrics.`,
      workedExample: `Two weeks before go-live, the test manager sent a progress report: 340 of 400 tests run, 22 open defects (3 critical), risk burn-down flat because a blocked environment stalled payments testing. That single "flat burn-down" line triggered an environment fix — the report changed a decision, which is exactly its job.`,
      commonMistakes: `- Confusing a progress report (during) with a summary report (at the end)
- Sending executives raw defect lists instead of risk and readiness
- Reporting activity ("we ran 300 tests") without meaning ("so what's the risk?")`,
      realWorldTip: `Every report should answer one question for its reader: "what do I need to decide?" If a metric doesn't help someone decide something, cut it.`,
      exercise: `Draft a three-bullet test progress report for an executive: status, top risk, and the decision you need from them.`,
      reflectionQuestion: `When is a test summary report produced, compared with a test progress report?`,
      knowledgeCheck: `Which report is produced regularly during a test period to support ongoing control? (Answer: the test progress report — the summary report is produced when a stage or project is complete)`,
      completionChecklist: ['I can distinguish progress and summary reports', 'I know the typical contents of each', 'I can tailor a report to its audience'],
      enhancements: {
        industryStory: `A test manager I mentored sent the same 12-page report to everyone — developers, the PM, and the CEO. The CEO stopped reading it. We split it: a one-slide RAG-and-risk summary for the board, and the detailed defect breakdown for the team. Suddenly the board acted on his warnings, because they could actually find the one line that mattered.`,
        visualAid: { type: 'comparison', title: 'Progress report vs summary report', headers: ['Aspect', 'Progress report', 'Summary report'], rows: [['When', 'During testing (regular)', 'When a stage/project ends'], ['Purpose', 'Ongoing control', 'Summarise outcomes'], ['Key content', 'Status, impediments, metrics', 'Deviations, residual risk, lessons'], ['Answers', '"Are we on track?"', '"What happened & what did we learn?"'], ['Audience', 'Project team & manager', 'Stakeholders & future projects']] },
        davidTip: `The best reporting metric I know is "residual risk". Executives don't want to know how many tests you ran — they want to know what could still go wrong if we ship on Friday. Lead with that and your reports get read.`,
        badGood: { label: 'a progress report line', bad: `"We executed 300 test cases this week. Good progress."`, good: `"300 of 400 cases run (75%). Payments still untested due to a blocked environment — this is our top residual risk for Friday's go/no-go. Decision needed: extend by 2 days or descope payments?"` },
        miniChallenge: `Take a piece of testing you did recently and write a single "residual risk" sentence a non-technical manager could act on.`,
        modelAnswer: `## Example\nStatus: 92% of planned tests executed, exit criteria met except performance. Top residual risk: the checkout hasn't been load-tested above 500 concurrent users, so peak-hour behaviour is unknown. Decision requested: approve a one-day performance run before go-live, or accept the risk explicitly.`,
      },
    },
    {
      lessonNumber: 4,
      title: 'Test Estimation',
      estimatedTime: '16 minute read',
      lessonOverview: `How long will testing take? This lesson covers the estimation techniques the ISTQB syllabus expects you to know: metrics-based, expert-based, and consensus techniques.`,
      learningObjectives: ['Explain metrics-based and expert-based estimation', 'Apply three-point estimation to a task', 'Describe how Wideband Delphi / Planning Poker reaches a consensus estimate'],
      lessonNotes: `## Why estimate at all
An estimate turns "it'll take a while" into a defensible number the test manager can plan and negotiate with. The syllabus groups estimation into two families.

## Metrics-based estimation
Estimate the future from **past data** — metrics from previous, similar projects. If similar features historically needed 3 days of testing each, ten features suggest ~30 days. Objective, but only as good as your historical data.

## Expert-based estimation
The people who will do the work — or subject experts — estimate based on **experience and judgement**. Fast and flexible, but subjective and prone to optimism.

## Three-point estimation (a metrics-based refinement)
For a task, give three values:
- **Optimistic (a)** — best case
- **Most likely (m)** — realistic case
- **Pessimistic (b)** — worst case

Then Estimate **E = (a + 4m + b) / 6**, which weights the most-likely value. The spread (b − a) also signals your **uncertainty**.

## Wideband Delphi & Planning Poker (expert consensus)
Several experts estimate **independently**, then discuss the differences and **re-estimate** until they converge. Planning Poker is the Agile form. The discussion of *why* estimates differ is where the real value lies — it surfaces hidden assumptions and risks.`,
      workedExample: `For a test task, three testers used three-point estimation: optimistic 2 days, most likely 5, pessimistic 14. E = (2 + 4×5 + 14) / 6 = 36 / 6 = 6 days. The wide spread (2 to 14) flagged high uncertainty, so the manager added a spike to investigate the unknowns before committing.`,
      commonMistakes: `- Giving a single number with no range, hiding all the uncertainty
- Using expert gut-feel when good historical metrics were available
- In Planning Poker, letting the loudest voice anchor everyone instead of estimating independently first`,
      realWorldTip: `Always estimate a range, not a point. The gap between your optimistic and pessimistic numbers is itself information — a wide gap means "we don't understand this yet".`,
      exercise: `A task is estimated optimistic 3 days, most likely 6, pessimistic 15. Calculate the three-point estimate.`,
      reflectionQuestion: `Why does the three-point formula multiply the most-likely value by four?`,
      knowledgeCheck: `In three-point estimation, what is the estimate for optimistic 3, most likely 6, pessimistic 15? (Answer: (3 + 4×6 + 15) / 6 = 42 / 6 = 7 days)`,
      completionChecklist: ['I can explain metrics-based vs expert-based estimation', 'I can compute a three-point estimate', 'I understand how Wideband Delphi reaches consensus'],
      enhancements: {
        industryStory: `A team committed to "5 days" for a testing effort based on one senior tester's confident guess. It took 16. When we ran Planning Poker on the next release, one junior tester kept estimating high — and when asked why, revealed an undocumented integration nobody else knew about. The consensus method didn't just give a number; it surfaced a risk that would have blown the estimate again.`,
        visualAid: { type: 'comparison', title: 'Estimation techniques', headers: ['Technique', 'Based on', 'Strength', 'Watch out for'], rows: [['Metrics-based', 'Historical data', 'Objective', 'Needs good past data'], ['Expert-based', 'Experience/judgement', 'Fast, flexible', 'Subjective, optimistic'], ['Three-point', 'a, m, b weighted', 'Shows uncertainty', 'Guessing a and b'], ['Wideband Delphi', 'Expert consensus', 'Surfaces assumptions', 'Anchoring / groupthink']] },
        davidTip: `When I sponsor an estimate, I care less about the number and more about the spread. A tester who says "somewhere between 2 and 14 days" is telling me the truth: they don't understand the work yet. That's my cue to fund a spike, not to demand a smaller number.`,
        badGood: { label: 'giving an estimate', bad: `"Testing will take about 5 days." (single number, no basis, no uncertainty shown)`, good: `"Three-point estimate: 6 days (optimistic 2, likely 5, pessimistic 14). The wide spread flags high uncertainty around the payment integration — I'd suggest a half-day spike first."` },
        miniChallenge: `Pick a real task ahead of you. Write down your optimistic, most-likely and pessimistic days, compute E = (a + 4m + b)/6, and note whether the spread worries you.`,
        modelAnswer: `## Example\nTask: regression-test the reporting module. Optimistic 3, most likely 6, pessimistic 15. E = (3 + 24 + 15)/6 = 42/6 = 7 days. The spread (3→15) is wide, so I'd raise the reporting engine's stability as a risk before committing.`,
      },
    },
    {
      lessonNumber: 5,
      title: 'Prioritisation',
      estimatedTime: '14 minute read',
      lessonOverview: `You can never test everything. This lesson covers how to decide what to test first, using risk, business value and test dependencies.`,
      learningObjectives: ['Explain why prioritisation is necessary', 'Prioritise tests by risk and business value', 'Apply risk-based test prioritisation to a backlog'],
      lessonNotes: `## Why prioritise
Exhaustive testing is impossible and time is always short. Prioritisation decides the **order** of testing so that, if you run out of time, the most important tests have already run. The syllabus identifies three common strategies for ordering test execution.

## Risk-based prioritisation
Run the tests covering the **highest-risk** areas first. Risk = **likelihood of failure × impact of failure**. A rarely-used feature that would only cause a cosmetic glitch ranks below a payment path that could lose money. This is the dominant strategy — it aligns testing with what could actually hurt the product.

## Coverage-based prioritisation
Order tests to achieve **coverage** as quickly as possible — e.g. run the set that exercises the most untested code or requirements first, to reduce blind spots fastest.

## Requirements / business-value-based prioritisation
Order by the **business importance** of the requirements — the features the customer or stakeholders value most are tested first, so the highest-value functionality is verified soonest.

## Putting it together
In practice, test managers blend these: risk sets the headline order, business value breaks ties, and **dependencies** constrain it (you can't test checkout before login works). The goal is simple — if testing stops early, you've already covered what matters most.`,
      workedExample: `With two days left and a week of tests remaining, a manager scored each area by likelihood × impact. Payments (high × high) and login (high × high) ran first; the "change avatar colour" tests (low × low) were dropped. When time ran out, every money-touching path had been tested and the release shipped with a known, accepted low risk.`,
      commonMistakes: `- Testing in the order features were built, not the order of risk
- Confusing likelihood and impact — a likely bug with no impact isn't high risk
- Ignoring dependencies, so high-priority tests get blocked by untested prerequisites`,
      realWorldTip: `Sort your test backlog by likelihood × impact before every release. If you have to stop at any point, you'll always have tested the things that matter most first.`,
      exercise: `Take four features (payments, search, a settings toggle, a help page) and rank them by risk, briefly justifying each with likelihood and impact.`,
      reflectionQuestion: `What two factors combine to determine the risk level of a feature?`,
      knowledgeCheck: `In risk-based prioritisation, what two factors determine a feature's risk level? (Answer: likelihood of failure and impact of failure)`,
      completionChecklist: ['I can explain why prioritisation is necessary', 'I can prioritise by risk and business value', 'I can order a test backlog by likelihood × impact'],
      enhancements: {
        industryStory: `A retailer ran its regression suite alphabetically. When a deploy went out late and testing was cut short, they'd tested "Account settings" and "Address book" thoroughly but never reached "Payments" — which broke in production on the busiest sales day of the year. We re-sorted the suite by risk that same week. Same tests, different order, completely different outcome.`,
        visualAid: { type: 'comparison', title: 'Prioritisation strategies', headers: ['Strategy', 'Orders tests by', 'Best when'], rows: [['Risk-based', 'Likelihood × impact', 'Time is tight (most common)'], ['Coverage-based', 'Fastest coverage gain', 'Reducing blind spots quickly'], ['Business-value', 'Stakeholder importance', 'Aligning to customer priorities'], ['Dependency', 'Prerequisite order', 'Features depend on each other']] },
        davidTip: `Every release I've ever run, testing time got squeezed at the end — never expanded. So I prioritise as if I'll lose half my time, because half the time I do. Risk-first ordering means a squeezed release still protects the crown jewels.`,
        badGood: { label: 'ordering a test run', bad: `Run tests in the order the features appear in the app — top of the menu to the bottom, regardless of importance.`, good: `Score each area by likelihood × impact, run highest-risk first (payments, auth), let business value break ties, and respect dependencies (login before checkout).` },
        miniChallenge: `Take your current test backlog (or any feature list) and tag each item high/medium/low for both likelihood and impact. Re-sort by the two together — does the top of your list change?`,
        modelAnswer: `## Example\nPayments: likelihood medium, impact high → top priority (money and trust). Login: likelihood medium, impact high → top (blocks everything). Search: likelihood high, impact medium → next. Settings toggle: low/low → last, droppable. Order: payments/login, then search, then the toggle.`,
      },
    },
    {
      lessonNumber: 6,
      title: 'The Test Manager in Practice',
      estimatedTime: '20 minutes',
      lessonOverview: `Time to put it together. You'll act as a test manager for a sample release — allocating roles, estimating, prioritising and reporting — the way the job actually feels.`,
      learningObjectives: ['Integrate roles, communication, reporting, estimation and prioritisation', 'Produce a realistic mini test plan and progress report', 'Reflect on test management decisions as a manager would'],
      lessonNotes: `## The scenario
You are the test manager for "ShopFast", an e-commerce site releasing a new checkout in three weeks. You have two testers, a flaky test environment, and a hard launch date. Work through the management decisions in order.

## 1. Roles
Decide who owns what. You own the **strategy, metrics and reporting**; your two testers own **design and execution**. Write it down so no task falls through the cracks.

## 2. Estimation
Use **three-point estimation** for each area (checkout, payments, order history). Compute E = (a + 4m + b)/6 per area and total them. Flag any area with a wide spread as a risk needing investigation.

## 3. Prioritisation
Rank the areas by **risk (likelihood × impact)** and **business value**. Payments and checkout outrank order history. Order execution so that if the environment steals days, the money-paths are already tested.

## 4. Communication
When a defect appears, report **the software and its impact**, not blame. Keep the developers close despite testing independently.

## 5. Reporting
Send a weekly **test progress report** (status, top residual risk, decision needed) and, at the end, a **test summary report** (outcomes, deviations, lessons learned).

## Bringing it home
Notice that not one of these steps is about clicking through the application. Test management is judgement, communication and prioritisation under constraint — the tester runs the tests; the manager makes sure the *right* tests run and the *right* people know the risk.`,
      workedExample: `For ShopFast, three-point estimates gave checkout 6 days, payments 8, order history 3 — total 17 days against 15 available. Rather than "test faster", the manager descoped low-risk order-history edge cases, prioritised payments and checkout, and reported the residual risk to the sponsor, who accepted it explicitly. The release shipped on time with eyes open.`,
      commonMistakes: `- Diving into test execution and neglecting the management tasks
- Presenting a plan with no residual-risk statement for the sponsor
- Prioritising by build order instead of risk when the schedule tightens`,
      realWorldTip: `A good test manager makes the risk visible and the decision explicit. You rarely control the deadline — but you always control whether the business ships blind or ships informed.`,
      exercise: `For ShopFast, write a one-paragraph test plan summary: who does what, your estimate total, your top-two priorities, and the single residual risk you'd escalate.`,
      reflectionQuestion: `If your estimate exceeds the available time, what management levers can you pull besides "test faster"?`,
      knowledgeCheck: `If your total test estimate (17 days) exceeds the time available (15 days), what is the appropriate management response? (Answer: negotiate scope/priorities and report residual risk — e.g. descope low-risk tests and escalate the risk — rather than simply asking testers to work faster)`,
      completionChecklist: ['I allocated roles clearly', 'I estimated using three-point estimation', 'I prioritised by risk and value', 'I drafted a progress report with a residual-risk statement'],
      enhancements: {
        industryStory: `On my first release as a test manager, my honest estimate was 20 days against a 14-day window. I panicked and told the team to "just push through". We shipped late anyway, exhausted, with payments barely tested. My mentor's advice reshaped my career: "Your job isn't to make the number fit — it's to make the risk visible so the business can choose." Every release since, I've led with the residual risk, and I've never had a nasty surprise land on the sponsor.`,
        visualAid: { type: 'timeline', title: 'The test manager\'s release loop', steps: [{ label: 'Assign roles', detail: 'manager owns strategy; testers own execution' }, { label: 'Estimate', detail: 'three-point per area, total it' }, { label: 'Prioritise', detail: 'risk × impact, then business value' }, { label: 'Communicate', detail: 'objective defects, close to devs' }, { label: 'Report', detail: 'weekly progress + final summary' }, { label: 'Decide', detail: 'make residual risk explicit for the sponsor' }] },
        davidTip: `The difference between a tester and a test manager isn't seniority — it's altitude. A tester asks "does this feature work?" A manager asks "given our time, people and risk, are we testing the right things, and does the business understand what we're not testing?" Learn to think at that altitude and the title follows.`,
        badGood: { label: 'handling an over-budget estimate', bad: `Estimate is 17 days, you have 15. You tell the two testers to "work smarter and get it done" and say nothing to the sponsor.`, good: `Estimate is 17 days, you have 15. You descope low-risk order-history edge cases, prioritise payments and checkout, and send the sponsor a one-line residual-risk statement to accept or fund the gap.` },
        miniChallenge: `Take the ShopFast scenario. In five lines, write: (1) who owns strategy, (2) your total three-point estimate, (3) your top two priorities, (4) one defect phrased objectively, (5) your single residual-risk sentence for the sponsor.`,
        modelAnswer: `## Example\n1) I own strategy, metrics and reporting; testers A and B own design and execution. 2) Total estimate 17 days (checkout 6, payments 8, order history 3). 3) Priorities: payments then checkout. 4) "Orders over £1,000 are charged twice — steps and log attached; impact: double billing." 5) "Given 15 days, order-history edge cases won't be fully tested — low business impact, and I recommend we accept that risk explicitly."`,
        managersReview: { intro: `If I reviewed your ShopFast release as your test manager, here's what I'd look for:`, strengths: ['Roles written down so nothing is unowned', 'Estimates given as three-point ranges, not single guesses', 'Tests ordered by risk, with money-paths first', 'A residual-risk statement the sponsor can actually act on'], improvements: ['Turn each defect into an objective, impact-led report', 'Add a decision request to every progress report', 'Track the estimate spread, not just the estimate', 'Confirm the sponsor understood and accepted the residual risk'], gaps: ['No summary report or lessons-learned at the end', 'Priorities set by build order rather than risk', 'Management tasks quietly dropped in favour of hands-on execution'] },
        portfolioBuilder: `Create a one-page "Test Management Plan — ShopFast" for your portfolio: a roles table, your three-point estimate totals, a risk-ranked test order, a sample progress report, and a residual-risk statement. This single artefact demonstrates every Module 6 skill to a future employer.`,
        resourcePreview: { name: 'Test Manager\'s Release Toolkit', purpose: 'Templates for a mini test plan, three-point estimator, risk-ranking grid, progress report and summary report.', whenToUse: 'Use it for your ShopFast portfolio piece and adapt it for your first real release.', formats: ['PDF', 'XLSX'] },
      },
    },
  ],
};
