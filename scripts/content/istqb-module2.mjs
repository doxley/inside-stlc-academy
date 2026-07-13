// ISTQB Foundation Masterclass — Module 2: Software Development Lifecycle.
// Full lesson content (base fields + enhancements). Follows the API Masterclass
// template: every lesson fills every base field and a rich `enhancements` block.
// Syllabus-accurate to the ISTQB CTFL (Foundation) v4.0 SDLC material.
export default {
  courseSlug: 'istqb-foundation-masterclass',
  moduleNumber: 2,
  lessonsPrefix: 'istqb',
  enhPrefix: 'istqb',
  enhSep: '-',
  lessons: [
    {
      lessonNumber: 1,
      title: 'The Waterfall Model',
      estimatedTime: '13 minute read',
      lessonOverview: `Waterfall is the classic sequential lifecycle. Understanding it — and where testing sits within it — is the foundation for everything the ISTQB syllabus says about how testing fits the way software is built.`,
      learningObjectives: ['Describe the sequential phases of the Waterfall model', 'Explain where and when testing happens in Waterfall', 'Recognise the risks Waterfall creates for testers'],
      lessonNotes: `## What Waterfall is
The **Waterfall model** is a *sequential* software development lifecycle (SDLC). Each phase must be completed before the next begins, and work "flows down" like a waterfall: **requirements → design → implementation → testing → deployment → maintenance**.

## Where testing sits
In classic Waterfall, testing is a **single phase near the end**, after the code is built. Testers often receive the software late, with little time before release. This is the opposite of *early testing*, one of the seven testing principles.

## Why the ISTQB cares
The syllabus stresses that in *any* lifecycle, good testing has certain characteristics: for every development activity there is a corresponding test activity, each test level has objectives specific to that level, and test analysis and design begin during the matching development phase. Waterfall makes these hard because verification is deferred.

## Strengths and weaknesses
- **Strengths:** simple, well-documented, easy to manage when requirements are stable.
- **Weaknesses:** defects are found late (expensive to fix per the *cost of defects* idea), no working software until late, and it copes poorly with change.

## The tester's role
Testers should still start work early — reviewing requirements and designs as they are produced — even though execution comes late. Static testing of documents is a tester's best lever in a Waterfall project.`,
      workedExample: `A bank builds a payments system in strict Waterfall. Requirements are signed off in month 1, design in month 3, coding runs months 4–8, and the test team finally gets a build in month 9 with two weeks before go-live. They find a currency-rounding defect rooted in a requirement that was ambiguous back in month 1 — cheap to fix then, very expensive now. The lesson: had a tester reviewed that requirement in month 1, the defect never reaches code.`,
      commonMistakes: `- Believing testing only happens in the "testing phase" — test analysis and design should start much earlier, even in Waterfall
- Thinking Waterfall means testers do nothing until coding ends (they should be reviewing requirements and designs)
- Exam trap: assuming Waterfall has no early testing possible — early *static* testing is both possible and recommended`,
      realWorldTip: `In a Waterfall project your most valuable contribution is often a requirements review, not a test run. Catching an ambiguous requirement on paper is dramatically cheaper than catching the resulting defect in month nine.`,
      exercise: `List the six phases of the Waterfall model in order, and mark the phase where test *execution* traditionally happens.`,
      reflectionQuestion: `In classic Waterfall, why are defects typically more expensive to fix than in a lifecycle that tests earlier?`,
      knowledgeCheck: `In the Waterfall model, at what point does dynamic test execution traditionally take place? (Answer: in a single dedicated test phase near the end, after implementation is complete)`,
      completionChecklist: ['I can list the Waterfall phases in order', 'I can explain where testing sits in Waterfall', 'I can describe the risks late testing creates'],
      enhancements: {
        industryStory: `On a government project run in strict Waterfall, the test team received the first build with 11 working days before a fixed launch date. A defect they found traced back to a single ambiguous sentence in a requirements document signed off eight months earlier. Fixing it meant reopening design, code and test — days of rework that a fifteen-minute requirements review would have prevented. That project taught every tester on it to fight for a seat at the requirements table.`,
        visualAid: { type: 'timeline', title: 'The Waterfall phases', steps: [{ label: 'Requirements', detail: 'capture and sign off what to build' }, { label: 'Design', detail: 'architecture and detailed design' }, { label: 'Implementation', detail: 'developers write the code' }, { label: 'Testing', detail: 'dynamic test execution — near the end' }, { label: 'Deployment', detail: 'release to production' }, { label: 'Maintenance', detail: 'fixes and changes after go-live' }] },
        davidTip: `David's Industry Perspective: I still see "Waterfall" projects everywhere, especially in banking, insurance and the public sector — often rebadged as "structured delivery". The misconception I correct most in interviews is that testers sit idle until the test phase. When I hire, I want a tester who says "I'd review the requirements and design documents from day one." That answer alone tells me they understand early testing and won't be a bottleneck squeezed into two weeks at the end. In my own career, the single highest-value hour I ever spent was reviewing a spec before a line of code existed.`,
        badGood: { label: 'the tester in a Waterfall project', bad: `The tester waits for the "testing phase", receives the build with days to spare, and races to execute cases — finding defects that are now hugely expensive to fix.`, good: `The tester reviews requirements and design documents as they are produced, raises ambiguities early, and prepares test cases in parallel — so execution is fast and the worst defects were caught on paper.` },
        miniChallenge: `Your project is strict Waterfall and you have been added at the requirements stage. Name two testing activities you can usefully do now, months before any code exists.`,
        modelAnswer: `## Example\n1) **Review the requirements** for ambiguity, gaps and testability — a form of static testing that finds defects before they reach code. 2) **Start test analysis and design**: derive high-level test conditions and draft test cases from the requirements, so execution is ready the moment a build arrives.`,
      },
    },
    {
      lessonNumber: 2,
      title: 'The V-Model',
      estimatedTime: '15 minute read',
      lessonOverview: `The V-model fixes Waterfall's biggest flaw by pairing every development phase with a test level. It is the model the ISTQB uses to explain how test levels map to development, so it is worth knowing cold.`,
      learningObjectives: ['Describe the V-model and its two sides', 'Map each test level to its corresponding development phase', 'Explain how the V-model embeds early testing and verification'],
      lessonNotes: `## What the V-model is
The **V-model** is a sequential lifecycle (a refinement of Waterfall) where the development phases going *down* the left side are each matched by a testing level going *up* the right side. It is shaped like a **V**.

## The mapping (left → right)
- **Requirements / business analysis** ↔ **Acceptance testing**
- **System / functional specification** ↔ **System testing**
- **Architectural design** ↔ **Integration testing**
- **Component / detailed design** ↔ **Component (unit) testing**
- At the bottom point of the V sits **coding**.

## Verification and validation
Each development phase produces a work product that can be **verified** (reviewed) immediately, and the matching right-side level later **validates** the built software against it. This is why the V-model embeds *early testing*: test planning, analysis and design for each level begin as its matching left-side document is written — not at the end.

## Where testing happens
Testing is not one late phase; it is distributed across **four levels**, each with objectives specific to that level. Component testing checks individual units; integration testing checks interfaces between them; system testing checks the whole system's behaviour; acceptance testing checks fitness for use against user needs.

## Strengths and limits
- **Strengths:** clear traceability, early test design, defined levels.
- **Limits:** still sequential, so it copes poorly with changing requirements — the same rigidity as Waterfall.`,
      workedExample: `A team building an insurance quote engine writes the system specification. On the V-model, that document immediately drives two things: developers move down toward design and code, and testers begin **designing the system tests** that will later validate the software against that same specification. When the build is ready, component tests run first (each calculation unit), then integration tests (units talking), then system tests (an end-to-end quote), then user acceptance tests (a broker confirms it meets their needs). Each level traces straight back to the document that spawned it.`,
      commonMistakes: `- Mixing up the levels: acceptance pairs with requirements, not with detailed design
- Thinking the right-side test levels only start after coding — their *design* starts as the matching left-side document is written
- Exam trap: assuming the V-model removes Waterfall's rigidity — it still struggles with changing requirements`,
      realWorldTip: `Learn the four level-to-phase pairings by heart. In real projects and in the exam, being able to say "this defect should have been caught at integration testing, which maps to architectural design" instantly shows you understand where risk lives.`,
      exercise: `Draw the V-model and label each of the four test levels against its corresponding development phase.`,
      reflectionQuestion: `Which development phase does acceptance testing correspond to in the V-model, and why does that pairing make sense?`,
      knowledgeCheck: `In the V-model, which test level corresponds to the architectural (high-level) design phase? (Answer: integration testing)`,
      completionChecklist: ['I can describe the two sides of the V-model', 'I can map each test level to its development phase', 'I can explain how the V-model embeds early testing'],
      enhancements: {
        industryStory: `A medical-devices supplier I worked with lived by the V-model because regulators demanded full traceability. Every system test case carried the ID of the requirement it validated, and every requirement had to have at least one test. During an audit, an inspector picked a random requirement and asked to see the test that proved it worked — the team pulled it up in seconds. That is the V-model's real-world superpower: when someone asks "how do you know this works?", you can point straight from the requirement to the test that validates it.`,
        visualAid: { type: 'comparison', title: 'V-model: development phase ↔ test level', headers: ['Development phase (left)', 'Test level (right)', 'Validates against'], rows: [['Requirements / business needs', 'Acceptance testing', 'User needs and business requirements'], ['System / functional spec', 'System testing', 'The full system specification'], ['Architectural design', 'Integration testing', 'How components interface'], ['Component / detailed design', 'Component (unit) testing', 'Individual units against their design']] },
        davidTip: `David's Industry Perspective: The V-model is my favourite whiteboard question in interviews because it separates people who memorised a diagram from people who understand *why* the pairings exist. I ask candidates to place a defect on the V and tell me which level should have caught it. A strong candidate says "a broken interface between two modules is an integration-testing miss, which maps to architectural design." In regulated industries — medical, aerospace, finance — the V-model isn't optional; the traceability it gives you is exactly what auditors demand.`,
        badGood: { label: 'explaining the V-model in an interview', bad: `"The V-model is just Waterfall drawn as a V" — technically true but misses the point and won't impress anyone.`, good: `"The V-model pairs each development phase with a test level, so verification of each work product starts early and every test level traces back to the document it validates — giving you early testing and full traceability."` },
        miniChallenge: `A defect slips through: two modules were each correct alone but corrupted shared data when combined. On the V-model, which test level should have caught it, and which development phase does that level map to?`,
        modelAnswer: `## Example\nThe defect is a broken **interface** between components, so it should have been caught at **integration testing**. Integration testing maps to the **architectural (high-level) design** phase, where the interfaces between modules are defined — which is exactly what integration testing validates.`,
      },
    },
    {
      lessonNumber: 3,
      title: 'Agile Development',
      estimatedTime: '15 minute read',
      lessonOverview: `Agile turns the sequential models on their head: build in short iterations, get working software early, and test continuously. The ISTQB expects you to know how the tester's role changes when the lifecycle becomes iterative and incremental.`,
      learningObjectives: ['Distinguish iterative and incremental development from sequential models', 'Describe how testing works within an Agile iteration', 'Explain how the tester\'s role changes in an Agile team'],
      lessonNotes: `## Iterative and incremental
**Agile** is an umbrella for lifecycles that are **iterative** (repeating cycles that refine the product) and **incremental** (delivering the product in small, working slices). Instead of one long pass, the team builds in short **iterations** (often called sprints), each producing a potentially shippable increment.

## Testing is continuous, not a phase
Testing happens **inside every iteration**, not at the end. As soon as a small piece of functionality exists, it is tested. Testers, developers and business roles collaborate throughout. Frequent change is expected, so **regression testing** grows in importance and **test automation** becomes essential to keep pace.

## How the tester's role changes
The tester is embedded in a **cross-functional team** and involved from the start of each iteration. They help clarify user stories, define **acceptance criteria**, and often contribute to **acceptance test-driven development (ATDD)**, where tests are agreed *before* code is written. Testing is a whole-team responsibility, not a separate gate.

## Test levels in Agile
The levels (component, integration, system, acceptance) still exist, but they run **concurrently and repeatedly** within iterations rather than in a fixed sequence. Continuous integration runs component and integration tests on every commit.

## Trade-offs
- **Strengths:** early and frequent feedback, adapts to change, working software fast.
- **Challenges:** heavy regression load, requires strong automation, less up-front documentation to test against.`,
      workedExample: `A team runs two-week sprints on a booking app. On day one of the sprint, the tester joins the developer and product owner to turn the user story "a guest can cancel a booking" into concrete **acceptance criteria** and example tests — *before* any code is written (ATDD). During the sprint, each commit triggers automated component and integration tests. By day eight the feature is done, exploratory tested, and its automated checks join the regression suite that runs on every future commit. Testing was continuous, not a phase bolted on at the end.`,
      commonMistakes: `- Thinking Agile means "no testing" or "no documentation" — it means continuous testing and just-enough documentation
- Assuming the test levels disappear in Agile — they still exist, but run concurrently and repeatedly
- Exam trap: confusing *iterative* (refining through repeated cycles) with *incremental* (delivering in slices) — Agile is both`,
      realWorldTip: `In Agile, your influence is greatest at the *start* of the iteration, not the end. Get into the story-refinement conversation and turn vague stories into testable acceptance criteria — that prevents defects rather than just finding them.`,
      exercise: `Take the user story "a registered user can reset their password" and write three acceptance criteria a tester could turn into checks.`,
      reflectionQuestion: `Why does test automation become essential in Agile, whereas a slow Waterfall project might survive with mostly manual testing?`,
      knowledgeCheck: `In Agile development, when does testing take place relative to development? (Answer: continuously, within every iteration — not as a separate phase at the end)`,
      completionChecklist: ['I can distinguish iterative and incremental development', 'I can describe how testing runs within an iteration', 'I can explain how the tester\'s role shifts in Agile'],
      enhancements: {
        industryStory: `When I moved a team from quarterly Waterfall releases to two-week Agile sprints, the biggest shock for the testers wasn't the pace — it was being invited to the planning conversation. One tester, used to receiving finished builds, suddenly sat with the developer and product owner shaping the story before code existed. Within a month she was catching contradictions in acceptance criteria that would once have become production defects. Her comment stuck with me: "I've stopped hunting bugs and started preventing them."`,
        visualAid: { type: 'timeline', title: 'Testing inside one Agile iteration', steps: [{ label: 'Refine', detail: 'clarify story, agree acceptance criteria (ATDD)' }, { label: 'Build & test', detail: 'code and automated tests grow together each commit' }, { label: 'Explore', detail: 'exploratory testing of the new increment' }, { label: 'Regress', detail: 'automated checks join the regression suite' }, { label: 'Review', detail: 'demo a working, tested increment' }] },
        davidTip: `David's Industry Perspective: The number-one Agile misconception I hear in interviews is "Agile means less testing" — the opposite is true; it means *continuous* testing backed by automation. When I hire for an Agile team, I care less about how many test cases someone can write and more about whether they'll speak up in refinement to make a story testable. The testers who thrive in Agile are the ones who see themselves as part of the whole team's quality effort, not a downstream gate. That mindset is what I probe for.`,
        badGood: { label: 'a tester joining an Agile sprint', bad: `Waits for developers to "finish", then tests the increment at the end of the sprint — recreating a mini-Waterfall inside the iteration and becoming a bottleneck.`, good: `Joins refinement on day one, shapes testable acceptance criteria before coding, tests continuously as features land, and keeps the automated regression suite green.` },
        miniChallenge: `In refinement, a developer says "the story is done, just test it at the end of the sprint." Explain, in Agile terms, why that recreates a problem Agile is meant to solve.`,
        modelAnswer: `## Example\nTesting only at the sprint's end recreates a **mini-Waterfall**: it defers testing to a phase, makes the tester a late bottleneck, and delays feedback until defects are more expensive to fix. Agile's value is **continuous testing** within the iteration — testing as each piece lands — so problems surface early and quality is a whole-team responsibility, not a final gate.`,
      },
    },
    {
      lessonNumber: 4,
      title: 'DevOps & Continuous Delivery',
      estimatedTime: '15 minute read',
      lessonOverview: `DevOps and continuous delivery extend Agile's fast feedback all the way to production. For a tester this means automated pipelines, continuous testing, and quality gates that decide whether code ships — the modern context the ISTQB expects you to understand.`,
      learningObjectives: ['Explain DevOps, continuous integration and continuous delivery', 'Describe where automated testing sits in a CI/CD pipeline', 'Identify the benefits and risks DevOps creates for testing'],
      lessonNotes: `## What DevOps is
**DevOps** is a way of working that unites development and operations to deliver software faster and more reliably, with shared responsibility for quality. It relies on **automation**: **continuous integration (CI)** merges and tests every code change, and **continuous delivery/deployment (CD)** automatically prepares (and often releases) each change to production.

## The pipeline
A **CI/CD pipeline** is an automated sequence triggered by each commit: build → automated tests → package → deploy. Tests are staged — fast **component** and **integration** tests run first, then broader **system** and acceptance checks. A failing test stops the pipeline, so broken code never reaches production.

## Continuous testing and quality gates
DevOps depends on **continuous testing**: automated tests run at every stage as a **quality gate**. Only changes that pass the gates progress. This gives very fast feedback and lets defects be caught within minutes of being written.

## Benefits for testing
- Faster, more frequent feedback on every change.
- A stable, repeatable environment reduces "works on my machine" defects.
- Rapid, low-risk releases — small changes are easier to test and roll back.

## Risks and the tester's role
- Heavy reliance on **automation** — gaps in automated coverage let defects through.
- Speed can outrun exploratory and non-functional testing if the team isn't careful.
- The tester designs the automated checks that form the gates, guards against false confidence, and still performs exploratory testing that automation can't replace.`,
      workedExample: `A developer commits a change to a pricing service. The CI/CD pipeline immediately kicks off: it builds the code, runs fast unit tests, then integration tests against the checkout service, then a set of automated system tests. All green, so the change is automatically deployed to a staging environment where smoke and acceptance checks run as a **quality gate**. Only then can it be promoted to production. The whole cycle takes fifteen minutes — and because a broken pricing calculation would have failed the integration stage, it could never have reached customers.`,
      commonMistakes: `- Believing DevOps automation removes the need for testers — it changes the role, it doesn't remove it
- Assuming a green pipeline means the change is fully tested — it only means the *automated* checks passed; exploratory and non-functional gaps can remain
- Exam trap: thinking continuous delivery always auto-releases to production — continuous *delivery* keeps a release-ready build; continuous *deployment* is the step that auto-releases`,
      realWorldTip: `Treat the pipeline as a product you own. A tester who can add a meaningful automated check to a quality gate — and knows which risks the gate does *not* cover — is worth their weight in gold on a DevOps team.`,
      exercise: `List, in order, the stages you would expect a basic CI/CD pipeline to run after a commit, and mark where automated tests act as a quality gate.`,
      reflectionQuestion: `Why is a fully green CI/CD pipeline not the same as "this change has been fully tested"?`,
      knowledgeCheck: `In a CI/CD pipeline, what is the purpose of a quality gate? (Answer: to automatically stop a change from progressing unless it passes the required tests/checks)`,
      completionChecklist: ['I can explain DevOps, CI and CD', 'I can describe where automated tests sit in a pipeline', 'I can identify the benefits and risks DevOps creates for testing'],
      enhancements: {
        industryStory: `A DevOps team I advised was proud that every release passed a fully green pipeline — until a payment defect reached production and cost them a day of failed transactions. The pipeline had done its job perfectly; the problem was that *no automated test covered that scenario*, so the gate had nothing to catch it. We didn't blame the automation — we added the missing check and a short exploratory session before major releases. The team learned that a green pipeline proves the automated checks passed, not that the change is safe.`,
        visualAid: { type: 'timeline', title: 'A CI/CD pipeline after a commit', steps: [{ label: 'Commit', detail: 'developer pushes a change' }, { label: 'Build', detail: 'pipeline compiles/packages the code' }, { label: 'Unit & integration tests', detail: 'fast automated checks — first quality gate' }, { label: 'System & acceptance tests', detail: 'broader automated checks in staging' }, { label: 'Deploy', detail: 'promote to production if all gates pass' }] },
        davidTip: `David's Industry Perspective: DevOps is where I see the tester's role change the most, and where the best interview conversations happen. The candidates I want can talk about a pipeline as something they help build — "I'd add integration checks as a gate before staging" — not just something that happens to them. The dangerous mindset is treating a green pipeline as proof of quality. In hiring, I probe for the tester who understands that automation tells you what *was* checked and says nothing about what wasn't. That judgement is exactly what a fast-moving DevOps team needs.`,
        badGood: { label: 'a tester on a DevOps team', bad: `Treats the pipeline as someone else's tool, trusts a green build as "fully tested", and does no exploratory or non-functional testing.`, good: `Owns part of the pipeline, adds meaningful automated checks as quality gates, and complements them with exploratory and non-functional testing that automation can't cover.` },
        miniChallenge: `Your team's pipeline is always green, yet a defect reached production last month. Give two distinct reasons this can happen even with a fully passing pipeline.`,
        modelAnswer: `## Example\n1) **Coverage gap:** no automated test existed for the failing scenario, so the gate had nothing to catch — a green pipeline only proves the *existing* checks passed. 2) **Untested quality attribute:** the defect was non-functional or exploratory in nature (e.g. a performance, usability or edge-case issue) that the automated functional checks were never designed to detect.`,
      },
    },
    {
      lessonNumber: 5,
      title: 'Shift-Left Testing',
      estimatedTime: '13 minute read',
      lessonOverview: `"Shift left" is the practical expression of the early-testing principle: move testing activities earlier in the lifecycle to catch defects when they are cheapest to fix. The ISTQB names shift-left explicitly, so know what it means and how to do it.`,
      learningObjectives: ['Define shift-left testing and link it to the early-testing principle', 'Describe concrete practices that shift testing left', 'Explain the benefits and the pre-conditions for shift-left to work'],
      lessonNotes: `## What shift-left means
**Shift-left testing** means performing testing activities **earlier** in the software development lifecycle — moving them "left" on a timeline that runs left (early) to right (late). It is the direct application of the testing principle *early testing saves time and money*.

## Why earlier is cheaper
The **cost of fixing defects** rises the later they are found. A defect caught in a requirements review costs a fraction of the same defect found in system testing or, worse, in production. Shift-left targets exactly this: find defects close to where they were introduced.

## Concrete shift-left practices
- **Static testing early:** reviews of requirements, designs and user stories, plus static analysis of code — catching defects before code even runs.
- **Test-first approaches:** test-driven development (TDD), acceptance test-driven development (ATDD) and behaviour-driven development (BDD), where tests are written *before* the code.
- **Involving testers early:** testers help define acceptance criteria and review work products from the very start.
- **Running unit and integration tests continuously** in the pipeline.

## Benefits and pre-conditions
- **Benefits:** cheaper defects, faster feedback, better-quality requirements, fewer late surprises.
- **Pre-conditions:** it requires effort and buy-in — teams may need coaching, and management must accept some extra up-front cost for large downstream savings. Shift-left does not remove later testing; it *adds* earlier activity.`,
      workedExample: `A team adopts shift-left on a new feature. Before any code is written, testers review the user stories and spot that two acceptance criteria contradict each other — a defect removed on paper for the cost of a fifteen-minute conversation. During development, TDD means each unit has a failing test written first, and static analysis flags a null-handling bug on commit. By the time the feature reaches system testing, the classes of defect that usually swamp that phase have already been prevented — so system testing is calmer and focuses on genuine end-to-end risk.`,
      commonMistakes: `- Thinking shift-left just means "test earlier" and skipping the specific practices (reviews, static analysis, test-first)
- Believing shift-left removes the need for later test levels — it complements them, it doesn't replace them
- Exam trap: not linking shift-left to the *early testing* principle and the *cost of defects* — that link is the whole point`,
      realWorldTip: `The cheapest defect you will ever fix is the one you find in a requirements review. If you want to demonstrate shift-left value quickly, start reviewing requirements and user stories — it needs no tooling and pays back immediately.`,
      exercise: `List three specific practices that "shift testing left", and for each say which defects it helps catch earlier.`,
      reflectionQuestion: `Which of the seven testing principles does shift-left most directly put into practice, and how?`,
      knowledgeCheck: `What is the primary goal of shift-left testing? (Answer: to move testing activities earlier in the lifecycle so defects are found — and fixed — sooner and more cheaply)`,
      completionChecklist: ['I can define shift-left and link it to early testing', 'I can name concrete shift-left practices', 'I can explain the benefits and pre-conditions of shift-left'],
      enhancements: {
        industryStory: `I once persuaded a sceptical delivery manager to let testers join requirements workshops "just to listen". In the first session a tester questioned a single word — "immediately" — in an acceptance criterion, exposing a disagreement between two stakeholders about what the feature should actually do. Resolving it took ten minutes. Left unresolved, it would have become conflicting code, a failed system test, and weeks of rework. That one word paid for the whole experiment, and shift-left stopped being a hard sell on that programme.`,
        visualAid: { type: 'comparison', title: 'Cost of a defect by where it is found', headers: ['Where the defect is found', 'Relative cost to fix', 'Shift-left lever'], rows: [['Requirements review', 'Lowest', 'Static testing of requirements'], ['Design review', 'Low', 'Design reviews, static analysis'], ['Component / integration testing', 'Moderate', 'TDD, unit tests in the pipeline'], ['System testing', 'High', 'Earlier levels should have caught it'], ['Production', 'Highest', 'Prevention via all of the above']] },
        davidTip: `David's Industry Perspective: Shift-left is the idea I most want a Foundation-level candidate to *understand rather than recite*. Anyone can say "test earlier"; the ones I hire can name the practices — reviews, static analysis, TDD/ATDD/BDD — and tie them to the cost-of-defects curve. In real programmes, the biggest wins I've delivered came not from clever automation but from getting testers into requirements and design reviews. The interview tell is simple: ask "how would you save the project money?" and a strong tester talks about catching defects on paper, not just running more tests.`,
        badGood: { label: 'applying shift-left', bad: `The team says it "does shift-left" but only means running the same tests a bit earlier — no reviews, no static analysis, testers still absent from requirements.`, good: `Testers review requirements and designs, static analysis runs on every commit, tests are written before code (TDD/ATDD), and later levels focus on genuine end-to-end risk.` },
        miniChallenge: `A manager says "shift-left just means we start testing a week earlier." Give a fuller, more accurate description of what shift-left actually involves and why it matters.`,
        modelAnswer: `## Example\nShift-left is more than starting execution earlier: it means adding *earlier activities* — reviewing requirements and designs (static testing), running static analysis, writing tests before code (TDD/ATDD/BDD) and involving testers from the start. It matters because the **cost of fixing a defect rises the later it is found**, so catching defects near where they were introduced saves significant time and money. It complements later testing rather than replacing it.`,
      },
    },
    {
      lessonNumber: 6,
      title: 'Shift-Right Testing & How Testing Changes',
      estimatedTime: '16 minute read',
      lessonOverview: `Shift-right complements shift-left by testing in production, and this final lesson pulls the module together: how the tester's role and the test levels adapt across every model you have studied. This is the synthesis the ISTQB expects you to carry into practice.`,
      learningObjectives: ['Define shift-right testing and its main techniques', 'Explain how testing and the tester\'s role change across Waterfall, V-model, Agile and DevOps', 'Summarise how test levels map to each lifecycle model'],
      lessonNotes: `## What shift-right means
**Shift-right testing** means continuing testing activities **after** release, in the live production environment. Where shift-left moves testing earlier, shift-right extends it *rightward* into operation. It relies on real users and real data to reveal what pre-release testing cannot.

## Shift-right techniques
- **Monitoring and observability:** watching logs, metrics and alerts to detect issues in production.
- **A/B testing and canary releases:** exposing a change to a small slice of users first.
- **Feature toggles:** switching functionality on or off in production to control and test exposure.
- **Chaos and resilience testing:** deliberately injecting failures to test robustness.

## Shift-left and shift-right together
They are complementary, not rival: shift-left prevents defects early; shift-right catches what only appears under real load and real usage. Together they give feedback across the *whole* lifecycle — the ideal for DevOps and continuous delivery.

## How testing changes across the models
- **Waterfall:** testing is a late phase; the tester's early value is reviewing documents.
- **V-model:** testing is distributed across four levels, each mapped to a development phase, with early test design and traceability.
- **Agile:** testing is continuous within iterations; the tester is embedded and helps define acceptance criteria.
- **DevOps:** testing is automated and continuous through the pipeline, extended into production by shift-right.

## The constant
Across every model the **test levels** — component, integration, system, acceptance — still exist. What changes is *when* and *how often* they run, and how early the tester is involved. Earlier and more continuous involvement is the direction of travel.`,
      workedExample: `A streaming service releases a new recommendations algorithm. Shift-left has already done its work: reviews, unit tests and automated pipeline checks all passed. Now shift-right takes over — the change goes out as a **canary release** to 5% of users behind a **feature toggle**, while **monitoring** watches error rates and engagement. Real traffic surfaces a slowdown for users with very large watch histories, a case no pre-release test had data for. The team toggles the feature off instantly, fixes it, and re-releases. Shift-left prevented the predictable defects; shift-right caught the one only production could reveal.`,
      commonMistakes: `- Treating shift-right as "testing in production instead of before release" — it complements pre-release testing, it doesn't replace it
- Assuming shift-right means letting users find bugs unmonitored — it depends on deliberate monitoring, canaries and toggles
- Exam trap: thinking the test levels disappear in modern models — component, integration, system and acceptance persist across all lifecycles`,
      realWorldTip: `Shift-left and shift-right are two ends of the same idea: feedback everywhere. In a DevOps interview, being able to say "I'd prevent defects early with reviews and automation, and catch the rest in production with canary releases and monitoring" shows a complete, modern mental model.`,
      exercise: `Create a one-line summary for each of the four models (Waterfall, V-model, Agile, DevOps) stating where testing happens and how involved the tester is.`,
      reflectionQuestion: `Why are shift-left and shift-right described as complementary rather than alternatives?`,
      knowledgeCheck: `What does shift-right testing add that shift-left cannot provide? (Answer: feedback from real users and real production conditions after release — behaviour under genuine load and usage that pre-release testing cannot reproduce)`,
      completionChecklist: ['I can define shift-right and its main techniques', 'I can explain how testing changes across the four models', 'I can summarise how test levels map to each lifecycle'],
      enhancements: {
        industryStory: `The best-run release I ever witnessed combined both directions. The team had shifted left hard — reviews, TDD, a green pipeline — and were rightly confident. But they still rolled the change out as a canary to a tiny fraction of users with monitoring dashboards up on the wall. Within minutes a graph twitched: a rare account type hit an error nobody had data to predict. They toggled it off before 95% of users ever saw it, fixed it overnight, and re-released. No firefighting, no incident. That is what shift-left and shift-right look like working together.`,
        visualAid: { type: 'comparison', title: 'How testing and the tester change across models', headers: ['Model', 'Where testing happens', 'Tester involvement', 'Test levels'], rows: [['Waterfall', 'Late, single phase', 'Late execution; early value = reviews', 'Run once, near the end'], ['V-model', 'Distributed across four levels', 'Designs tests early; traceability', 'Four levels, each mapped to a phase'], ['Agile', 'Continuously within iterations', 'Embedded; defines acceptance criteria', 'Concurrent and repeated each iteration'], ['DevOps', 'Automated through the pipeline + production', 'Owns gates; adds shift-right in prod', 'Automated at every stage, plus in production']] },
        davidTip: `David's Industry Perspective: When I interview for senior test roles, my closing question is often "walk me through how the tester's job changes from Waterfall to DevOps." It's the perfect synthesis question — a strong answer covers late-phase testing giving way to distributed levels, then continuous in-iteration testing, then automated pipelines extended into production with shift-right. The candidates who nail it show they understand that the *test levels never disappear* — what changes is when and how often they run, and how early the tester gets involved. That single insight is what separates someone who memorised four diagrams from someone who genuinely understands modern delivery.`,
        badGood: { label: 'describing shift-right', bad: `"Shift-right means we stop testing before release and just let real users find the bugs in production."`, good: `"Shift-right adds monitored testing in production — canary releases, feature toggles, observability — to catch issues only real usage reveals, complementing the defect prevention we do with shift-left."` },
        miniChallenge: `Summarise, in one sentence each, how the tester's role differs between the V-model and DevOps — making clear what stays the same and what changes.`,
        modelAnswer: `## Example\n**V-model:** the tester designs and runs distinct test levels early against matching development documents, giving strong traceability but within a sequential, one-pass lifecycle. **DevOps:** the tester builds and owns automated checks that run continuously as pipeline quality gates and extend into production via shift-right — *the same four test levels persist*, but they run automatically, repeatedly, and far earlier and later than in the V-model.`,
        managersReview: { intro: `If I reviewed your grasp of this module as a hiring manager, here is what I'd look for:`, strengths: ['You can map each test level to its development phase in the V-model', 'You explain how testing becomes continuous in Agile and DevOps', 'You link shift-left to the early-testing principle and the cost of defects', 'You can describe shift-right techniques and why they complement shift-left'], improvements: ['Practise stating each model in one crisp sentence for interviews', 'Be ready to place a given defect at the correct test level', 'Rehearse the "how does the tester\'s role change across models" synthesis'], gaps: ['Confusing continuous delivery with continuous deployment', 'Assuming test levels disappear in Agile/DevOps — they persist', 'Treating shift-right as a replacement for pre-release testing rather than a complement'] },
        portfolioBuilder: `Create a one-page "SDLC and testing" reference for your portfolio: a table of the four models (Waterfall, V-model, Agile, DevOps) with, for each, where testing happens, how the tester is involved, and how the four test levels run. Add a short paragraph on how shift-left and shift-right work together. This artefact demonstrates modern lifecycle understanding to any interviewer.`,
        resourcePreview: { name: 'SDLC & Test Levels Map', purpose: 'A one-page comparison of Waterfall, V-model, Agile and DevOps showing where testing happens, the tester\'s role, and how the four test levels map to each.', whenToUse: 'Revise from it before the exam and keep it for interview prep on lifecycle questions.', formats: ['PDF'] },
      },
    },
  ],
};
