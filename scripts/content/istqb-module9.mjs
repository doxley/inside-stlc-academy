// ISTQB Foundation Masterclass — Module 9: Test Tools.
// Full lesson content (base fields + enhancements). Follows the Gold Standard
// template: every lesson fills every base field and a rich `enhancements` block.
// Syllabus-accurate to the ISTQB Foundation Level (CTFL) tool-support chapter,
// grounded in real-world tooling and practice.
export default {
  courseSlug: 'istqb-foundation-masterclass',
  moduleNumber: 9,
  lessonsPrefix: 'istqb',
  enhPrefix: 'istqb',
  enhSep: '-',
  lessons: [
    {
      lessonNumber: 1,
      title: 'Static Analysis Tools',
      estimatedTime: '13 minute read',
      lessonOverview: `Static analysis tools examine code and other artefacts without executing them. They are one of the highest-value, lowest-effort forms of test support a team can adopt.`,
      learningObjectives: ['Explain how static analysis tools support static testing', 'Describe what defects they find before code runs', 'Recognise the benefits and limits of static analysis'],
      lessonNotes: `## What static analysis does
Static analysis tools inspect source code, models or other artefacts **without running them**. They support the *static testing* activities from Module 3, but automate the detection of common problems so people can focus on judgement-based review.

## What they find
- Coding-standard and style violations
- Complex, unreachable or dead code
- Potential defects: null dereferences, uninitialised variables, resource leaks
- **Security weaknesses** (SAST tools)
- Adherence to a defined coding convention

## Where they run
Typically in the developer's IDE and in the **CI pipeline**, so a build can fail when quality gates are breached. This is a practical way to "shift left" — catching issues at the cheapest possible moment.

## Benefits and limits
Static analysis is cheap to run repeatedly and finds defects early, before dynamic testing even begins. But it produces **false positives** and **false negatives**, cannot judge whether the code meets the requirement, and an unconfigured tool can drown a team in noise. Tune the ruleset to the risk that matters.`,
      workedExample: `A team adds **SonarQube** to their pipeline. On the first run it flags 400 issues. Rather than fixing everything, they configure a quality gate: fail the build only on new critical/blocker issues and security hotspots. Legacy debt is tracked separately. New code stays clean, and a real null-pointer bug is caught the day it is written.`,
      commonMistakes: `- Treating every static-analysis warning as a real defect (false positives exist)
- Turning on every rule at once and burying the team in noise
- Assuming a clean static scan means the code is correct — it cannot judge behaviour`,
      realWorldTip: `Static analysis is the cheapest defect detection you will ever run. Wire it into CI, tune the rules to real risk, and let it catch the boring bugs so humans can review the interesting ones.`,
      exercise: `Name two kinds of defect a static analysis tool can find and one kind it cannot.`,
      reflectionQuestion: `Why can a static analysis tool find a coding-standard violation but not tell you whether the code meets the business requirement?`,
      knowledgeCheck: `Do static analysis tools execute the code they examine? (Answer: no — they analyse artefacts such as source code without running them)`,
      completionChecklist: ['I can explain what static analysis tools do', 'I can list defects they find before code runs', 'I understand their false positives and limits'],
      enhancements: {
        industryStory: `A team inherited a legacy service with no quality gate. When we added SonarQube it reported thousands of issues — the developers nearly switched it off in frustration. Instead we set the gate to "clean as you code": only fail on new problems. Within a month the noise was gone and it had already caught two genuine null-reference defects before they reached test.`,
        visualAid: { type: 'comparison', title: 'Static analysis vs dynamic testing', headers: ['Aspect', 'Static analysis', 'Dynamic testing'], rows: [['Code executed?', 'No', 'Yes'], ['Finds', 'Code smells, standards, some security', 'Behaviour & functional defects'], ['When', 'Before running (in IDE / CI)', 'When code runs'], ['Judges requirements?', 'No', 'Yes (via test cases)'], ['Example tool', 'SonarQube', 'Selenium / JMeter']] },
        davidTip: `The teams that get the most from static analysis are the ones who treat it as a *conversation starter*, not a verdict. A warning is a prompt to look, not proof of a bug. Tune ruthlessly — a noisy tool is an ignored tool.`,
        miniChallenge: `List two defect types a static analysis tool would catch in a code review that a human reviewer might miss, and one thing the human catches that the tool never will.`,
        modelAnswer: `## Example\nTool catches: an uninitialised variable on a rare branch; a resource (file handle) never closed. Human catches: that the code, though clean, implements the *wrong* business rule — the tool cannot judge intent against a requirement.`,
        badGood: { label: 'introducing static analysis', bad: `Enable every rule on day one, fail the build on all 400 findings, and let developers start ignoring the tool entirely.`, good: `Enable a focused ruleset, set the gate on *new* code only, track legacy debt separately, and review false positives so the config improves over time.` },
        resourcePreview: { name: 'Test Tool Categories Cheat Sheet', purpose: 'One-page map of ISTQB tool categories with real example tools.', whenToUse: 'Keep it open through Module 9.', formats: ['PDF'] },
      },
    },
    {
      lessonNumber: 2,
      title: 'Test Management Tools',
      estimatedTime: '13 minute read',
      lessonOverview: `Test management tools organise the testing effort — from requirements and test cases to execution results, defects and reporting. They are the backbone of visible, auditable testing.`,
      learningObjectives: ['Describe what test management tools do', 'Link tools for management, requirements and defects', 'Explain the value of traceability and reporting'],
      lessonNotes: `## What management tools provide
Tools in this category support the **management of testing and testware**. They typically offer:
- Storage of test cases, test suites and test plans
- **Scheduling and logging** of test execution and results
- **Traceability** from requirements → tests → defects
- Progress **reporting and metrics** for stakeholders
- Interfaces to other tools (CI, automation, requirements)

## The connected toolchain
Management rarely lives alone. It integrates with:
- **Requirements management** tools (features, user stories)
- **Defect / incident management** tools (bug tracking)
- **Configuration management** and CI pipelines
- **Automation** frameworks that feed results back in

## Real tools
**JIRA** (with **Zephyr**, **Xray** or **TestRail** alongside it) is the common combination in industry: JIRA holds stories and defects, the test add-on holds test cases and execution runs, and the two are linked. **Azure DevOps Test Plans** is another widely used option.

## Why it matters
Traceability answers the questions auditors and managers actually ask: *what have we tested, what passed, what is still at risk, and which requirement does this defect threaten?*`,
      workedExample: `A team uses **JIRA + Zephyr**. Each user story links to a set of test cases in Zephyr. A test run marks three cases failed; each failure raises a linked JIRA bug. The traceability report then shows the story is 80% executed with two open defects — exactly the picture the release manager needs, generated automatically rather than from a spreadsheet.`,
      commonMistakes: `- Running all test management from an unversioned spreadsheet with no traceability
- Recording results but never linking defects back to the failing test
- Buying a heavyweight tool the team never fully adopts`,
      realWorldTip: `The single most valuable thing a test management tool gives you is traceability. When a stakeholder asks "is this requirement tested?", you should be able to answer in seconds, not spend an afternoon reconciling spreadsheets.`,
      exercise: `Sketch the trace links for one feature: requirement → test case(s) → execution result → defect. Which tool holds each part?`,
      reflectionQuestion: `Why is requirement-to-test traceability more valuable than simply counting how many tests passed?`,
      knowledgeCheck: `Which tool category stores test cases and links them to requirements and defects for reporting? (Answer: test management tools)`,
      completionChecklist: ['I can explain what test management tools do', 'I can describe the connected toolchain', 'I understand the value of traceability'],
      enhancements: {
        industryStory: `A team I joined ran everything from a shared spreadsheet. During an audit they were asked which tests covered a critical payment requirement — and could not answer with confidence. We moved to JIRA + Zephyr, linked every test to its story. The next audit took twenty minutes instead of two days, because traceability was a click, not a reconstruction.`,
        visualAid: { type: 'timeline', title: 'The traceability chain', steps: [{ label: 'Requirement', detail: 'user story in JIRA' }, { label: 'Test case', detail: 'authored in Zephyr / Xray' }, { label: 'Execution', detail: 'run logged pass/fail' }, { label: 'Defect', detail: 'failure raises a linked bug' }, { label: 'Report', detail: 'coverage & risk shown automatically' }] },
        davidTip: `A test management tool is only as good as the discipline of linking. If test cases float free of requirements and defects float free of tests, you have an expensive spreadsheet. The links are the product.`,
        miniChallenge: `For a "user login" feature, write the four trace artefacts (requirement, test case, execution result, defect) and name a real tool that could hold each.`,
        modelAnswer: `## Example\nRequirement: "User can log in with valid credentials" (JIRA story). Test case: "Login with valid email/password returns dashboard" (Zephyr). Execution: run marked *Fail*. Defect: "Valid login returns 500" (JIRA bug, linked to the test). One tool (JIRA) can host all four via a test add-on.`,
        badGood: { label: 'managing test results', bad: `Results live in a personal spreadsheet; defects are logged separately with no link back to the failing test, so no one can say what a bug threatens.`, good: `Every test links to its requirement and, on failure, to its defect — so a single report shows coverage, pass rate and open risk per requirement.` },
      },
    },
    {
      lessonNumber: 3,
      title: 'Test Automation Tools',
      estimatedTime: '14 minute read',
      lessonOverview: `Test execution and automation tools run tests for us and log the results. They deliver real benefits — but only when the risks are understood and managed.`,
      learningObjectives: ['Describe test execution and automation tools', 'List the benefits AND risks of test automation', 'Explain what automation is good and bad at'],
      lessonNotes: `## What these tools do
Test execution tools run test scripts, feed in data, and **log** actual versus expected results. In the ISTQB categories they support **test execution and logging**. They are ideal for repetitive, stable, high-volume checks — the classic candidate is **regression testing**.

## Benefits of automation
- Runs many tests **fast** and repeatedly, e.g. on every CI build
- **Consistent** — no human slips or fatigue
- Frees people for exploratory and judgement-based testing
- Objective, repeatable measures and logs

## Risks of automation (syllabus-critical)
- **Unrealistic expectations** — a tool is not a strategy
- Underestimating the **time, cost and effort** to introduce and, crucially, to **maintain** scripts
- Relying on the tool where manual or exploratory testing suits better
- **Trusting the tool** blindly; version-control and treat scripts as real code
- A brittle suite that breaks on every UI change costs more than it saves

## Real tools
**Selenium** and **Playwright** (web UI), **Cypress** (web), **Appium** (mobile), **REST Assured** and **Postman/Newman** (API). Choice depends on the technology under test, not fashion.`,
      workedExample: `A team automates 300 regression checks in **Playwright**, run on every merge. Release regression drops from two days of manual clicking to fifteen minutes in CI. But six months later, half the suite is red because no one budgeted maintenance time. The lesson: automation is software, and software needs upkeep. They ring-fence 20% of each sprint for test maintenance and the suite becomes trustworthy again.`,
      commonMistakes: `- Believing automation replaces testers rather than augmenting them
- Automating unstable or rarely-run features instead of stable regression paths
- Ignoring maintenance cost until the suite rots and gets abandoned`,
      realWorldTip: `Automation gives you speed and consistency, but it is code — it must be designed, reviewed, version-controlled and maintained. The suites that survive are the ones treated as a first-class engineering asset, not a side project.`,
      exercise: `List two clear benefits and two real risks of test automation, and give one type of test you would NOT automate.`,
      reflectionQuestion: `Why is the ongoing maintenance cost of an automation suite often the risk that gets underestimated?`,
      knowledgeCheck: `Name one significant risk of test automation identified by ISTQB. (Answer: underestimating the time/cost/effort to introduce and maintain it — or unrealistic expectations of the tool)`,
      completionChecklist: ['I can describe test execution/automation tools', 'I can list benefits and risks', 'I know what automation is and is not good for'],
      enhancements: {
        industryStory: `A client proudly showed me 2,000 automated tests. Then I asked how many ran green that morning: about 900. The rest had rotted because no one owned maintenance. The tool had been sold as a silver bullet; the effort to keep it alive was never funded. We deleted the dead half, stabilised the rest, and built maintenance into every sprint. A smaller, trusted suite beat a huge, ignored one every time.`,
        visualAid: { type: 'comparison', title: 'Automation: benefits vs risks', headers: ['Benefits', 'Risks'], rows: [['Fast, repeatable regression', 'Underestimated maintenance cost'], ['Consistent, no fatigue', 'Unrealistic expectations of the tool'], ['Runs on every CI build', 'Brittle scripts break on UI change'], ['Frees people for exploration', 'Over-reliance where manual suits better'], ['Objective logs & metrics', 'Treating scripts as throwaway, not code']] },
        davidTip: `The best question to ask before automating anything is "will this still be true next month?" Automate the stable, high-value, oft-repeated paths. Leave the volatile and the one-off to a human. Automation multiplies effort — including wasted effort.`,
        miniChallenge: `Pick a feature you know. Name one check you would automate (and why) and one you would keep manual (and why).`,
        modelAnswer: `## Example\nAutomate: "login with valid credentials succeeds" — stable, run every build, high value as regression. Keep manual: "the new checkout flow feels intuitive" — exploratory, subjective, changing weekly; a script would be brittle and could not judge usability.`,
        badGood: { label: 'adopting automation', bad: `Buy a tool, promise the board it will "replace half the QA team", automate the flakiest new screens, and never budget maintenance.`, good: `Automate stable regression paths, keep exploratory testing human, version-control the scripts, and ring-fence sprint time to maintain them.` },
      },
    },
    {
      lessonNumber: 4,
      title: 'Performance Testing Tools',
      estimatedTime: '13 minute read',
      lessonOverview: `Performance and monitoring tools tell you how a system behaves under load — how fast, how many users, and where it breaks. They answer questions functional testing never can.`,
      learningObjectives: ['Describe performance testing and monitoring tools', 'Explain load, stress and soak testing at a high level', 'Recognise real performance tools and what they measure'],
      lessonNotes: `## What these tools do
Performance testing tools generate **simulated load** against a system and measure how it responds — response time, throughput, error rate and resource usage. They fall under the ISTQB category of **performance and monitoring** tools.

## Common performance test types
- **Load testing** — expected concurrent users; does it cope with normal peak?
- **Stress testing** — beyond normal limits; where and how does it break?
- **Soak / endurance testing** — sustained load over hours; leaks or degradation?
- **Spike testing** — sudden surge; does it recover?

## What they measure
- **Response time** (often percentiles, e.g. 95th) — not just averages
- **Throughput** (requests/second)
- **Error rate** under load
- Server **resource usage** (CPU, memory), captured by **monitoring** tools

## Real tools
**Apache JMeter** (mature, GUI + scriptable), **k6** (modern, code-first, JavaScript), **Gatling**, and cloud services like **BlazeMeter**. Monitoring pairs with tools such as **Grafana**, **Prometheus** and **Dynatrace** to watch the system while load is applied.`,
      workedExample: `A team expects 500 concurrent users at launch. In **k6** they script a ramp to 500 users and watch the 95th-percentile response time. At 400 users it climbs from 200ms to 4 seconds — the database connection pool is exhausted. They find this a week before go-live, not during it. Averages had looked fine; the percentile revealed the pain real users would feel.`,
      commonMistakes: `- Reporting only average response time and hiding the slow tail (use percentiles)
- Running load tests against a tiny non-representative environment and trusting the numbers
- Confusing load testing (normal peak) with stress testing (beyond limits)`,
      realWorldTip: `Averages lie. A 200ms average can hide a 5-second 95th percentile that a third of your users feel every visit. Always report percentiles, and always pair load generation with monitoring so you can see *where* the bottleneck is, not just that one exists.`,
      exercise: `Define load, stress and soak testing in one sentence each, and name a tool you could use for all three.`,
      reflectionQuestion: `Why can an average response time look healthy while real users are experiencing an unacceptably slow application?`,
      knowledgeCheck: `Which tool category simulates load and measures response time and throughput? (Answer: performance testing (and monitoring) tools)`,
      completionChecklist: ['I can describe performance and monitoring tools', 'I can distinguish load, stress and soak testing', 'I can name real tools and what they measure'],
      enhancements: {
        industryStory: `A retailer assured me their site was "load tested and fine". It fell over on the first hour of a sale. Digging in, the load test had run against a scaled-down staging box with a fraction of production traffic, and reported only the average. A proper JMeter run against a production-like environment, watched in Grafana, showed the database pool exhausting at 60% of expected load. The test had existed; it just measured the wrong thing.`,
        visualAid: { type: 'comparison', title: 'Types of performance test', headers: ['Type', 'Question it answers', 'Load pattern'], rows: [['Load', 'Do we cope at normal peak?', 'Expected concurrent users'], ['Stress', 'Where do we break?', 'Beyond normal limits'], ['Soak', 'Do we degrade over time?', 'Sustained for hours'], ['Spike', 'Do we survive a surge?', 'Sudden sharp jump']] },
        davidTip: `Never report a performance result as a single average. The number that matters is what your slowest realistic users experience — the 95th or 99th percentile. And test against something that looks like production, or you are just testing your staging box.`,
        miniChallenge: `Your app must handle 1,000 concurrent users. Describe the performance test you would run and the two metrics you would watch most closely.`,
        modelAnswer: `## Example\nA load test in k6 ramping to 1,000 concurrent users over ten minutes, held for thirty. Watch the **95th-percentile response time** (does the slow tail stay within the SLA?) and the **error rate** (does the system start rejecting requests under load?), alongside server CPU/memory in Grafana.`,
        badGood: { label: 'reporting performance results', bad: `"Average response time was 210ms, so we're fine" — measured on a staging box at a tenth of production load.` , good: `"On a production-like environment at expected peak, the 95th percentile was 480ms and error rate 0.1%; it degraded past 700 users, giving us headroom to plan for."` },
      },
    },
    {
      lessonNumber: 5,
      title: 'AI Tools in Testing',
      estimatedTime: '13 minute read',
      lessonOverview: `AI-assisted testing tools are the fastest-moving area in our field. This lesson separates where they genuinely help from where the hype outruns reality.`,
      learningObjectives: ['Describe where AI tools genuinely help in testing', 'Identify the hype and the real risks', 'Explain why human judgement still governs AI output'],
      lessonNotes: `## Where AI genuinely helps
Used well, AI tools can accelerate real testing work:
- **Generating test ideas and cases** from requirements or user stories
- Drafting **test data** and edge-case suggestions
- **Self-healing** automation — locators that adapt when the UI shifts (e.g. Testim, Mabl, Applitools)
- **Visual testing** — spotting unexpected UI changes across screenshots
- Summarising logs and helping **triage** failures
- Assisting authoring of scripts and documentation

## Where the hype outruns reality
- AI does **not** replace testers or a test strategy
- It can **hallucinate** plausible-but-wrong test cases or data
- It has **no understanding of your business risk** — it cannot decide what matters
- Non-deterministic output makes some results hard to reproduce
- Data privacy: never feed sensitive data into an external model without approval

## The governing principle
Treat AI as a **fast, tireless assistant that must be checked** — never as an oracle. A human decides what to test and whether the AI's output is correct. The tester who reviews and directs AI output well is more valuable than ever; the one who pastes it in unchecked is a liability.`,
      workedExample: `A tester uses an LLM to generate 30 boundary-value cases for an age-verification field. Twenty-five are genuinely useful and save an hour of typing. Three are duplicates, and two assert the wrong expected result because the AI misread the rule (18+, not 21+). The value is real — but only because the tester reviewed every case rather than trusting them wholesale.`,
      commonMistakes: `- Trusting AI-generated test cases without reviewing them (hallucinations)
- Feeding sensitive or production data into a public AI tool
- Believing AI removes the need for a test strategy or skilled testers`,
      realWorldTip: `AI is a force-multiplier for a good tester and a mistake-multiplier for a careless one. Let it draft, brainstorm and heal locators — but you decide what matters and you verify the output. Judgement is exactly the thing it cannot give you.`,
      exercise: `Name two testing tasks where AI genuinely helps today, and two claims about AI testing you would treat with scepticism.`,
      reflectionQuestion: `Why can an AI tool generate a plausible-looking test case that is nonetheless wrong for your system?`,
      knowledgeCheck: `Should AI-generated test cases be trusted without review? (Answer: no — AI can hallucinate wrong cases and has no understanding of business risk, so a human must verify)`,
      completionChecklist: ['I can name where AI genuinely helps in testing', 'I can spot the hype and real risks', 'I understand why human judgement governs AI output'],
      enhancements: {
        industryStory: `A team excitedly let an AI tool "write all our tests". It produced a hundred cases overnight and everyone was thrilled — until we reviewed them. A third asserted the wrong expected results because the model had guessed the business rules, and two hard-coded a real customer's data lifted from a log. We kept the good two-thirds, which genuinely saved time, but only because a human read every line. AI drafted; the tester decided.`,
        visualAid: { type: 'comparison', title: 'AI in testing: real help vs hype', headers: ['Genuinely helps', 'Hype / risk'], rows: [['Generating test ideas & data', 'Replacing testers or strategy'], ['Self-healing locators', 'Trusting output unreviewed'], ['Visual-diff detection', 'Understanding your business risk'], ['Log triage & summarising', 'Reproducible, deterministic results'], ['Draft scripts & docs', 'Safe with sensitive data by default']] },
        davidTip: `The tester's job is shifting from *typing* the tests to *directing and verifying* them. That makes judgement, domain knowledge and critical review more valuable, not less. AI raises the floor for output volume and raises the ceiling for the tester who reviews it well.`,
        miniChallenge: `Ask an AI tool to generate five test cases for a password field (min 8 chars, one number, one symbol). Review them: how many are correct, and what did it miss or get wrong?`,
        modelAnswer: `## Example\nThe AI produced: empty, 7-char, 8-char valid, no-number, no-symbol cases — four genuinely useful. But it missed the boundary at exactly 8 characters with all rules met, and asserted a 100-character password should fail when no max was specified. Useful draft; the tester's review caught the gaps.`,
        badGood: { label: 'using AI to generate tests', bad: `Paste requirements into an AI, accept all 100 generated cases unread, and commit them — including hallucinated expected results and a leaked customer record.`, good: `Use AI to draft candidate cases, then review each for correctness against the real rules, strip any sensitive data, and keep only the cases you have verified.` },
      },
    },
    {
      lessonNumber: 6,
      title: 'Selecting the Right Tool',
      estimatedTime: '15 minute read',
      lessonOverview: `Choosing and introducing a tool is a project in itself. Do it well — with evaluation and a pilot — and the tool sticks. Do it badly and you buy expensive shelfware.`,
      learningObjectives: ['Describe how to evaluate and select a test tool', 'Explain the value of a pilot project before rollout', 'List the success factors for introducing a tool'],
      lessonNotes: `## Selecting a tool (assessment)
Tool selection is a structured decision, not a purchase on a whim. Consider:
- **Fit to the need** — the problem and technology, not the shiniest tool
- Organisational **maturity, strengths and weaknesses**
- Opportunities to **improve processes** with tool support
- The **technology under test** and existing toolchain
- Vendor support, licence cost, and required **skills / training**
- Open-source: assess the community, longevity and support model

## Running a pilot project
Before a full rollout, run a **pilot** to:
- Learn the tool in depth on a real but contained scope
- Evaluate how it fits existing processes and practices
- Decide standards for use, naming, organisation of testware
- Assess whether the **benefits will be realised at reasonable cost**

## Success factors for introducing a tool
- **Roll out incrementally**
- Adapt and improve **processes** to fit the tool
- Provide **training, coaching and mentoring**
- Define **usage guidelines**
- Gather feedback and **monitor benefits and costs**
- Treat the tool as an investment, with a champion who owns it

## The core message
A tool amplifies an existing process. A good process gets better; a broken process breaks faster. Fix the process first, then choose the tool that supports it — and prove it with a pilot before you commit the whole team.`,
      workedExample: `A team wants to automate regression. Instead of buying the market leader outright, they shortlist Selenium, Cypress and Playwright against real criteria (their stack is modern JS, team skills, CI fit, licence £0). They run a two-week **pilot** automating one stable journey in Playwright. It integrates cleanly with their pipeline and the team can maintain it — so they roll out incrementally, with guidelines and a maintenance budget. The pilot cost two weeks and saved them from a year of the wrong tool.`,
      commonMistakes: `- Buying the tool everyone talks about without checking it fits your context
- Skipping the pilot and rolling out to the whole team at once
- Expecting the tool to fix a broken process rather than adapting the process`,
      realWorldTip: `Never choose a tool from a demo alone — vendors demo the happy path. Run a short pilot on your real work, with your real people and pipeline. Two weeks of piloting is far cheaper than a year of shelfware and a team that has lost trust in tooling.`,
      exercise: `You must choose an API testing tool for your team. List four selection criteria you would weigh, and describe the pilot you would run before committing.`,
      reflectionQuestion: `Why does a poor process often get worse, not better, after a powerful tool is introduced?`,
      knowledgeCheck: `What should you run before rolling a new test tool out to the whole organisation? (Answer: a pilot project to evaluate fit, benefits and cost on a contained scope)`,
      completionChecklist: ['I can describe how to evaluate and select a tool', 'I can explain the purpose of a pilot', 'I can list the success factors for introducing a tool'],
      enhancements: {
        industryStory: `A department bought an expensive enterprise test tool because a competitor used it. No pilot, no evaluation against their own stack. Eighteen months later it was shelfware: it did not integrate with their pipeline, the training never landed, and the team had quietly gone back to their old ways — plus a large annual licence. When we later chose a replacement, a two-week pilot with three shortlisted tools made the decision obvious and the rollout stuck, because the team had proved it on their own work first.`,
        visualAid: { type: 'timeline', title: 'Selecting and introducing a tool', steps: [{ label: 'Assess need', detail: 'problem, context, maturity' }, { label: 'Shortlist', detail: 'evaluate against real criteria' }, { label: 'Pilot', detail: 'contained scope, real work' }, { label: 'Decide', detail: 'benefits vs cost proven' }, { label: 'Roll out', detail: 'incrementally, with training' }, { label: 'Monitor', detail: 'track benefits and costs' }] },
        davidTip: `The tool is the easy part; the process and the people are the hard part. A brilliant tool bolted onto a broken process just breaks things faster and more expensively. Fix the process, pilot the tool, roll out with training — in that order.`,
        miniChallenge: `Draft a one-page tool-evaluation scorecard: list five weighted criteria you would score each candidate tool against for your context.`,
        modelAnswer: `## Example\nScorecard criteria (weighted): fit to our tech stack (30%), CI/pipeline integration (20%), team skills & learning curve (20%), total cost incl. licence & maintenance (15%), vendor/community support & longevity (15%). Each candidate scored 1–5; the pilot validates the top scorer on real work before commitment.`,
        badGood: { label: 'introducing a tool', bad: `Buy the market-leading tool after a slick vendor demo, roll it out to 40 people the next sprint, provide no training, and wonder why adoption fails.`, good: `Shortlist against a scorecard, pilot the top two on a real feature, choose on evidence, then roll out incrementally with guidelines, training and a named champion.` },
        managersReview: { intro: `If I reviewed your tool-selection work as a test lead, here is what I would look for:`, strengths: ['Selection driven by real criteria and context, not hype', 'A pilot run on genuine work before rollout', 'Process adapted around the tool, with training planned', 'Benefits and costs monitored after adoption'], improvements: ['Weight the criteria explicitly rather than judging by feel', 'Involve the whole team in the pilot, not just one enthusiast', 'Define usage guidelines and testware standards up front'], gaps: ['No pilot — rolling straight to the whole team', 'Ignoring maintenance and training cost in the business case', 'Expecting the tool to fix a broken process on its own'] },
        portfolioBuilder: `Create a "Tool Evaluation Report" for your portfolio: pick a real testing need, shortlist two or three real tools (e.g. Selenium vs Playwright, JMeter vs k6, Zephyr vs TestRail), score them against weighted criteria, outline the pilot you would run, and give a reasoned recommendation. This demonstrates the exact judgement employers look for.`,
        resourcePreview: { name: 'Tool Selection Scorecard & Pilot Checklist', purpose: 'A ready-to-use weighted scorecard and pilot-project checklist for evaluating and introducing any test tool.', whenToUse: 'Use it whenever your team is choosing or trialling a new testing tool.', formats: ['PDF', 'XLSX'] },
      },
    },
  ],
};
