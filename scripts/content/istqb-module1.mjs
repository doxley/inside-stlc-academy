// ISTQB Foundation Masterclass — Module 1: Fundamentals of Testing.
// Full lesson content (base fields + enhancements), aligned to the ISTQB CTFL
// (Foundation Level) syllabus. Every lesson fills every base field and a rich
// `enhancements` block, matching the api-module1 Gold Standard template.
export default {
  courseSlug: 'istqb-foundation-masterclass',
  moduleNumber: 1,
  lessonsPrefix: 'istqb',
  enhPrefix: 'istqb',
  enhSep: '-',
  lessons: [
    {
      lessonNumber: 1,
      title: 'Why Testing Matters',
      estimatedTime: '12 minute read',
      lessonOverview: `Before you learn how to test, you need to understand why testing exists at all. Software defects cause real harm and real cost, and testing is how organisations manage that risk.`,
      learningObjectives: ['Explain why software fails and why testing is necessary', 'Distinguish between error, defect and failure', 'Describe how testing contributes to quality and reduces risk'],
      lessonNotes: `## Why software fails
Software is written by people, and people make mistakes — especially under time pressure, with unclear requirements, or in complex systems. Any human **error** (mistake) can introduce a **defect** (a fault or bug) into code or a document. If that defect is executed under the right conditions, it produces a **failure** — the system behaving differently from what is expected.

## Error, defect, failure
- **Error (mistake)**: a human action that produces an incorrect result.
- **Defect (fault, bug)**: the flaw in the work product caused by the error.
- **Failure**: the observable incorrect behaviour when the defect is executed.
Not every defect causes a failure — some sit dormant in code paths that are never exercised.

## What testing gives us
- **Reduced risk** of failures occurring in operation.
- **Information for stakeholders** to make informed release decisions.
- **Confidence** in the quality of the work product when tests pass.
- **Compliance** with contractual, legal or regulatory requirements.

## Testing is not just "finding bugs"
Testing also builds confidence, informs decisions, and prevents defects through early involvement. It is a **quality assurance** contributor, but quality assurance is broader — it is about the whole process, not only test execution.`,
      workedExample: `A developer misreads a spec and writes \`age >= 18\` where the rule was \`age > 18\` (that is the **error**). The wrong comparison sits in the code as a **defect**. Nobody notices until a 17-year-old born on a leap boundary is granted access in production — that is the **failure**. Testing the boundary (17, 18, 19) before release would have caught the defect before it ever became a failure.`,
      commonMistakes: `- Using "error", "defect" and "failure" interchangeably — the exam tests the precise chain (error → defect → failure)
- Believing testing alone guarantees quality — it reduces risk and informs, but cannot prove correctness
- Assuming every defect will eventually cause a failure — dormant defects may never be executed`,
      realWorldTip: `When you log a bug, describe the failure you observed, not your guess at the defect. "On save, the total shows £0.00" is testable and reproducible; "the tax function is broken" is a developer's job to confirm.`,
      exercise: `Think of a piece of software that failed you recently. Write one sentence each identifying the likely error, the defect, and the failure you actually saw.`,
      reflectionQuestion: `Can a defect exist in software without ever causing a failure? Why or why not?`,
      knowledgeCheck: `A programmer's mistake introduces a fault into the code, which later causes the system to behave incorrectly. What is the correct term for the programmer's mistake? (Answer: an error / mistake)`,
      completionChecklist: ['I can explain why software fails', 'I can distinguish error, defect and failure', 'I can describe how testing reduces risk'],
      enhancements: {
        industryStory: `Early in my career a team shipped a "tiny" rounding defect in an invoicing system. It had sat dormant for months because no invoice had ever crossed the threshold that triggered it. When a large client finally did, the failure was a five-figure over-charge and a very awkward phone call. The defect was old; the failure was new. That is the day the error–defect–failure distinction stopped being exam trivia for me.`,
        visualAid: { type: 'timeline', title: 'From mistake to failure', steps: [{ label: 'Error', detail: 'a human makes a mistake (e.g. misreads a rule)' }, { label: 'Defect', detail: 'the mistake becomes a fault in code or a document' }, { label: 'Trigger', detail: 'the defective code path is executed' }, { label: 'Failure', detail: 'the system behaves incorrectly and is observed' }] },
        davidTip: `In industry, "why testing matters" is rarely argued in the abstract — it is argued in money and reputation. Hiring managers love candidates who talk about testing as **risk reduction**, not bug-hunting. When I interview, a red flag is someone who says testing "proves the software works". It never does. A green flag is someone who frames testing as giving stakeholders the information to make a confident release decision.`,
        badGood: { label: 'describing a problem', bad: `"The app is broken." — no failure described, not reproducible, no risk framed.`, good: `"On submitting the form with a 17-year-old's date of birth, access is granted when the rule requires over-18. Observed on staging, build 442." — a clear failure, reproducible, risk-relevant.` },
        miniChallenge: `Take one recent news story about a software outage. In three sentences, separate the likely human error, the defect it created, and the failure the public experienced.`,
        modelAnswer: `## Example\nError: an engineer pushed a configuration change without validating it. Defect: the change contained an invalid routing rule. Failure: users worldwide got timeouts for four hours. The mistake was momentary; the failure was global.`,
        resourcePreview: { name: 'ISTQB Foundation Glossary Card', purpose: 'One-page reference for the precise definitions of error, defect, failure and related terms.', whenToUse: 'Keep it open through Module 1 and revisit before the exam.', formats: ['PDF'] },
      },
    },
    {
      lessonNumber: 2,
      title: 'The Objectives of Testing',
      estimatedTime: '13 minute read',
      lessonOverview: `Testing is not one activity with one goal. The syllabus lists several distinct objectives, and the objective you are pursuing shapes how you test and what "done" means.`,
      learningObjectives: ['List the main objectives of testing from the syllabus', 'Explain how test objectives vary by context and phase', 'Distinguish testing from debugging'],
      lessonNotes: `## The syllabus objectives of testing
Typical objectives include:
- **Evaluating work products** such as requirements, user stories, designs and code.
- **Triggering failures and finding defects** in the test object.
- **Ensuring required coverage** of the test object.
- **Reducing the level of risk** of inadequate software quality.
- **Verifying** the object meets specified requirements.
- **Validating** the object works as users and stakeholders expect.
- **Building confidence** in the quality level of the test object.
- **Providing information** to stakeholders for informed decisions.
- **Complying** with contractual, legal or regulatory requirements or standards.

## Objectives shift with context
The dominant objective changes with the situation. During development, finding as many defects as possible may be the priority. Before a release, building confidence and providing information for a go/no-go decision matters more. In a regulated domain, demonstrating compliance dominates.

## Verification vs validation
- **Verification**: are we building the product *right* — does it meet the specification?
- **Validation**: are we building the *right* product — does it meet users' actual needs?

## Testing vs debugging
- **Testing** finds failures caused by defects.
- **Debugging** is the development activity that locates, analyses and fixes the defect, then confirms the fix.
Confirmation testing after a fix is a testing activity; the fixing itself is debugging.`,
      workedExample: `A team runs the same login tests with two different objectives. In sprint, the objective is *finding defects*: they push weird inputs, expired tokens and locked accounts. Two weeks later, before release, the objective is *building confidence and informing the decision*: they run a stable regression pass and report "142 of 142 passing, no open high-severity defects" so the product owner can decide to ship. Same feature, different objectives, different reports.`,
      commonMistakes: `- Confusing verification and validation — verification checks against the spec, validation checks against real user needs
- Thinking debugging is part of testing — locating and fixing the defect is a development (debugging) activity, not testing
- Assuming "the objective of testing" is always to find bugs — the syllabus lists several equally valid objectives`,
      realWorldTip: `State your test objective before you start. "We're testing to find defects" and "we're testing to build release confidence" produce very different test designs, exit criteria and reports — and stakeholders need to know which one they're getting.`,
      exercise: `Pick a feature you know. Write down two different test objectives you could pursue on it, and how the tests would differ under each.`,
      reflectionQuestion: `Why might the primary objective of testing change between early development and just before a release?`,
      knowledgeCheck: `Which activity is responsible for locating and fixing the defect that caused a failure — testing or debugging? (Answer: debugging)`,
      completionChecklist: ['I can list several objectives of testing', 'I can explain how objectives vary by context', 'I can distinguish testing from debugging'],
      enhancements: {
        industryStory: `On a payments project we were audited by a regulator. The developers were baffled that our test reports emphasised traceability and compliance evidence over raw bug counts. The objective had shifted: for that release, *demonstrating compliance* mattered more than finding one more edge-case bug. The team that understands objectives can flex its testing to the situation; the team that only knows "find bugs" gets caught out.`,
        visualAid: { type: 'comparison', title: 'Verification vs validation', headers: ['Aspect', 'Verification', 'Validation'], rows: [['Question', 'Building the product right?', 'Building the right product?'], ['Checks against', 'Specifications & designs', 'User needs & expectations'], ['Typical example', 'Field matches the data spec', 'Users can actually complete the task'], ['Finds', 'Non-conformance to spec', 'A spec that solved the wrong problem']] },
        davidTip: `In interviews I often ask "what is the objective of testing?" The weak answer is "to find bugs." The strong answer names several — evaluate work products, reduce risk, build confidence, inform stakeholders, meet compliance — and then says "it depends on where we are in the lifecycle." That second half is what separates a tester who follows a script from one who thinks about strategy. Verification-versus-validation is also a favourite trap: memorise "right product vs product right."`,
        badGood: { label: 'stating a test objective', bad: `"We'll test the release." — no objective, so no way to design tests or define done.`, good: `"For this release the objective is confidence and information: a full regression pass plus a risk summary so the PO can make a go/no-go call by Thursday." — clear, measurable, decision-linked.` },
        miniChallenge: `Write a one-line test objective statement for a feature, then rewrite it for a completely different phase (e.g. early development vs pre-release audit).`,
        modelAnswer: `## Example\nEarly development: "Objective — trigger failures in the discount engine by testing edge and invalid inputs to find defects early." Pre-release: "Objective — build confidence and provide a coverage report on the discount engine so stakeholders can approve the release."`,
      },
    },
    {
      lessonNumber: 3,
      title: 'The Seven Testing Principles',
      estimatedTime: '15 minute read',
      lessonOverview: `The seven testing principles are the most heavily examined topic in the whole Foundation syllabus — and they are genuinely useful on the job. Learn them precisely and understand what each one means in practice.`,
      learningObjectives: ['Name all seven testing principles accurately', 'Explain what each principle means in practice', 'Recognise the exam misconceptions around each principle'],
      lessonNotes: `## The seven principles
1. **Testing shows the presence of defects, not their absence.** Testing can reveal defects, but it can never prove there are none. Passing tests reduce risk; they do not guarantee correctness.
2. **Exhaustive testing is impossible.** Testing everything — all inputs and preconditions — is infeasible except for trivial cases. Use risk and priorities to focus effort, not brute force.
3. **Early testing saves time and money.** Test activities should start as early as possible (also called *shift left*). Defects found early are far cheaper to fix.
4. **Defects cluster together.** A small number of modules usually contain most of the defects. Testing effort should follow the clusters (the Pareto-style distribution).
5. **Tests wear out (the pesticide paradox).** Running the same tests repeatedly stops finding new defects. Tests must be reviewed and revised, and new tests written, to find new defects.
6. **Testing is context dependent.** You test a safety-critical medical device differently from a marketing website. Context drives the approach, techniques and rigour.
7. **Absence-of-errors is a fallacy.** Finding and fixing lots of defects does not help if the system is unusable or fails to meet users' needs. A "bug-free" product can still be the wrong product.

## Why these matter in practice
These principles justify almost every strategic decision a tester makes: why we prioritise, why we shift left, why we refresh regression suites, and why we validate against user needs — not just specifications.`,
      workedExample: `A team boasts "all 900 tests pass, so the software is bug-free." Two principles expose the flaw. Principle 1: passing tests show the *presence* of defects when they fail, never their *absence* — 900 green tests do not prove zero defects. Principle 7: even if defect-free, if the product doesn't meet user needs it fails anyway. The correct statement is "our known tests pass; residual risk remains," not "it's bug-free."`,
      commonMistakes: `- Reversing Principle 1 — it states testing shows the *presence* of defects, never proves their *absence*
- Confusing the pesticide paradox (tests stop finding new bugs) with defect clustering (bugs group in a few modules) — these are two different principles
- Thinking "absence of errors" means the same as "few defects" — it is the fallacy that a defect-free product is automatically a good one`,
      realWorldTip: `Keep the seven principles as a mental checklist when planning. If someone claims a test pass "proves it works," reach for Principle 1. If a regression suite has gone quiet, reach for the pesticide paradox and refresh it.`,
      exercise: `Write the seven principles from memory, then check them. For each one you got wrong or fuzzy, write one real-world sentence showing what it means.`,
      reflectionQuestion: `Two of the seven principles are frequently confused: the pesticide paradox and defect clustering. In your own words, how are they different?`,
      knowledgeCheck: `A test suite that has been run unchanged for many releases has stopped finding new defects. Which testing principle explains this? (Answer: tests wear out — the pesticide paradox)`,
      completionChecklist: ['I can name all seven principles accurately', 'I can explain each one in practice', 'I can avoid the common exam misconceptions'],
      enhancements: {
        industryStory: `A stakeholder once told my team, "the regression suite is all green, so we don't need more testing." That is the pesticide paradox in the wild: those tests had been passing untouched for a year and had long since stopped finding anything new. We revised the suite, added tests around a recently changed module — where defects were clustering — and found three genuine defects in an afternoon. Two principles, one afternoon, three bugs saved from production.`,
        visualAid: { type: 'comparison', title: 'The seven testing principles', headers: ['#', 'Principle', 'What it means in practice'], rows: [['1', 'Shows presence, not absence', 'Passing tests reduce risk; they never prove zero defects'], ['2', 'Exhaustive testing is impossible', 'Prioritise by risk instead of trying everything'], ['3', 'Early testing saves time & money', 'Shift left — cheaper to fix early'], ['4', 'Defects cluster', 'A few modules hold most defects; focus effort there'], ['5', 'Pesticide paradox', 'Repeated tests wear out; review and add new ones'], ['6', 'Testing is context dependent', 'A medical device is tested unlike a marketing site'], ['7', 'Absence-of-errors fallacy', 'Defect-free but useless is still a failed product']] },
        davidTip: `This is the single most examined topic on the Foundation paper, and the questions are almost always "which principle explains this scenario?" So don't just memorise the list — practise mapping scenarios to principles. The two that catch everyone are clustering (bugs group in a few places) versus the pesticide paradox (tests stop finding bugs). On the job, I quote Principle 1 and Principle 7 constantly to managers who confuse "green build" with "good product."`,
        badGood: { label: 'reporting test results', bad: `"All tests passed, so the software has no bugs." — violates Principle 1 (presence not absence) and Principle 7 (absence-of-errors fallacy).`, good: `"All known tests passed; residual risk remains, and the suite hasn't found new defects in three releases so we're refreshing it." — respects the principles.` },
        miniChallenge: `Below are three scenarios. Match each to one principle: (a) 80% of defects came from the payments module; (b) leadership wants to "test every possible input"; (c) the same nightly suite hasn't caught a bug in months.`,
        modelAnswer: `## Example\n(a) Defect clustering — effort should follow the payments module. (b) Exhaustive testing is impossible — prioritise by risk instead. (c) The pesticide paradox — the tests have worn out and need revising with new cases.`,
      },
    },
    {
      lessonNumber: 4,
      title: 'The Psychology of Testing',
      estimatedTime: '12 minute read',
      lessonOverview: `Testing is a human activity as much as a technical one. Finding defects can feel like criticism, and how testers communicate results determines whether they are trusted partners or unwelcome messengers.`,
      learningObjectives: ['Explain confirmation bias and its impact on testing', 'Describe how to communicate defects constructively', 'Distinguish the independence levels and their trade-offs'],
      lessonNotes: `## Testing requires a different mindset
Developers naturally seek to make their code work (a *confirmation* mindset). Testing benefits from a *critical*, questioning mindset that asks "how could this fail?" Both are valuable, but they are different, which is one reason independent testing adds value.

## Confirmation bias
People tend to favour information that confirms their existing beliefs. A developer may unconsciously avoid the inputs that would break their own code. Awareness of confirmation bias helps testers design tests that genuinely challenge assumptions.

## Communicating defects well
A defect report can feel like an accusation. To keep collaboration healthy:
- Focus on the **product and the failure**, not the person.
- Report **objectively**: what you did, what you observed, what you expected.
- Stay **neutral and factual** in tone; assume competence and good intent.
- Emphasise the shared goal: better quality for users.

## Independence of testing
Independence ranges across levels, from least to most independent:
- Tests by the **author** of the work product (least independent).
- Tests by **another person in the same team**.
- Tests by someone from a **different team** (independent test team).
- Tests by someone from a **different organisation** (e.g. outsourced or certification).
More independence tends to find more (and different) defects, but can add distance and cost. A balance is usually best.`,
      workedExample: `A tester finds that saving a profile silently drops the phone number. Poorly communicated: "Dev broke the save again." Well communicated: "Steps: edit profile, enter a phone number, save. Expected: number persists. Actual: number is blank on reload. Build 512, staging." The second version is factual, reproducible and blame-free — the developer engages with the problem, not with a perceived insult.`,
      commonMistakes: `- Assuming more independence is always better — it finds more defects but adds cost and distance; a balance is usually right
- Writing defect reports that blame a person rather than describing the product's behaviour
- Forgetting that developers testing their own code face confirmation bias, not incompetence`,
      realWorldTip: `Lead every defect conversation with the observed behaviour and the user impact, never with who caused it. "Users lose their phone number on save" gets fixed fast; "you broke save" starts an argument.`,
      exercise: `Rewrite a blunt, blame-tinged bug report ("the search is broken again") into an objective, reproducible one with steps, expected and actual results.`,
      reflectionQuestion: `Why does an independent tester often find defects that the original author missed?`,
      knowledgeCheck: `Which level of test independence is generally considered the least independent? (Answer: testing performed by the author of the work product)`,
      completionChecklist: ['I can explain confirmation bias in testing', 'I can write a constructive, objective defect report', 'I can describe the levels of test independence'],
      enhancements: {
        industryStory: `I once inherited a team where developers dreaded the testers, because bug reports read like charge sheets — "obvious mistake", "should never have shipped". Defect fixes were slow and relationships were toxic. We changed one thing: every report had to state steps, expected, actual, and impact, with no adjectives about the author. Within a month, fix turnaround halved and stand-ups stopped being defensive. Same defects, different psychology.`,
        visualAid: { type: 'timeline', title: 'Levels of test independence (least to most)', steps: [{ label: 'Author tests', detail: 'the person who built it — least independent' }, { label: 'Same-team peer', detail: 'a colleague on the same team' }, { label: 'Independent team', detail: 'a separate test team in the organisation' }, { label: 'External party', detail: 'a different organisation — most independent' }] },
        davidTip: `The psychology topics look "soft" but they are heavily examined and hugely important on the job. Hiring managers care a lot about this: a technically brilliant tester who alienates the dev team is a net negative. In interviews I probe how a candidate delivers bad news. The best answer describes reporting the failure objectively and framing it as a shared quality goal. On independence, the exam wants the ordered levels — memorise author → same team → different team → different organisation.`,
        badGood: { label: 'raising a defect in stand-up', bad: `"Dev broke save again, classic." — personal, vague, provokes defensiveness.`, good: `"On save, the phone number is dropped on reload — steps in the ticket. It affects any user editing their profile, so I'd rate it high." — factual, reproducible, impact-led.` },
        miniChallenge: `Write down one recent time you gave or received critical feedback poorly. Rewrite the message so it focuses on the observed behaviour and shared goal, not the person.`,
        modelAnswer: `## Example\nOriginal: "You never test your own code." Rewrite: "I noticed the checkout defect slipped through — could we add a shared checklist for edge cases before handoff, so we both catch these earlier?" It targets the process and the shared goal, not the individual.`,
      },
    },
    {
      lessonNumber: 5,
      title: 'Testing Throughout the SDLC',
      estimatedTime: '14 minute read',
      lessonOverview: `Testing is not a phase at the end. Good testing is woven through the whole software development lifecycle, and the way you test depends on the development model your team uses.`,
      learningObjectives: ['Explain how testing fits into different SDLC models', 'Describe shift-left and early test involvement', 'Relate test levels to the phases of development'],
      lessonNotes: `## Testing and the SDLC
Every development lifecycle — sequential (like the V-model) or iterative/incremental (like Agile) — needs testing woven through it. Good models share traits: for every development activity there is a corresponding test activity, each test level has objectives specific to that level, and test analysis and design for a level begin during the matching development activity.

## Shift left
"Shift left" means starting test activities as early as possible — reviewing requirements, questioning user stories, and designing tests before code exists. This aligns with the principle that early testing saves time and money.

## Test levels
- **Component (unit) testing** — individual components in isolation.
- **Integration testing** — interactions between components or systems.
- **System testing** — the behaviour of the whole system.
- **Acceptance testing** — validation against user needs and readiness for release.

## Test types (cutting across levels)
- **Functional** — what the system does.
- **Non-functional** — how well it does it (performance, usability, security, reliability).
- **Structural (white-box)** — coverage of the internal structure.
- **Confirmation and regression testing** — related to changes (re-test a fix; check nothing else broke).

## Model matters
In sequential models, levels map onto distinct phases. In Agile, all levels can happen within each iteration, continuously and in parallel.`,
      workedExample: `A team adopts shift-left on a new feature. A tester joins the refinement session and spots that a user story says "email is optional" while the design assumes it is required — a defect caught in a document, before a line of code, for the price of one conversation. Later, the same feature is tested at component, integration, system and acceptance levels within the sprint. Testing touched every stage, not just the end.`,
      commonMistakes: `- Treating testing as a final phase that starts after development finishes — the syllabus stresses testing throughout the lifecycle
- Confusing test levels (component, integration, system, acceptance) with test types (functional, non-functional, structural)
- Assuming shift-left only means "test earlier" — it also means reviewing requirements and designs, not just running earlier tests`,
      realWorldTip: `Get testers into requirements and refinement sessions. The cheapest defect you will ever fix is the one you catch in a sentence of a user story before anyone writes code for it.`,
      exercise: `List the four test levels in order and give one concrete example of a check you would perform at each level for a login feature.`,
      reflectionQuestion: `Why does catching a defect during requirements review cost so much less than catching the same defect in production?`,
      knowledgeCheck: `Component, integration, system and acceptance are examples of what — test levels or test types? (Answer: test levels)`,
      completionChecklist: ['I can explain testing across the SDLC', 'I can describe shift-left involvement', 'I can name the four test levels and relate them to phases'],
      enhancements: {
        industryStory: `On a waterfall project, testing was scheduled as a two-week block at the very end. Requirements defects — the expensive kind — surfaced during that block, and every fix rippled back through design and code with the clock already run out. On the next project we moved a tester into requirements workshops from day one. We caught contradictory acceptance criteria before development started. Same people, same tools; the difference was *when* testing happened.`,
        visualAid: { type: 'comparison', title: 'Test levels vs test types', headers: ['Concept', 'Examples', 'What it answers'], rows: [['Test levels', 'Component, integration, system, acceptance', 'At what scope are we testing?'], ['Test types', 'Functional, non-functional, structural, change-related', 'What quality attribute are we testing?'], ['Functional', 'Does login accept valid credentials?', 'What the system does'], ['Non-functional', 'Does login respond within 1 second?', 'How well it does it']] },
        davidTip: `Two things trip people up here, in the exam and in real teams. First, levels versus types — the exam loves a question that mixes them, so lock in that component/integration/system/acceptance are *levels*, while functional/non-functional/structural are *types*. Second, in Agile there aren't neat phases — all levels can happen every sprint, and interviewers want to hear that you understand testing as continuous, not a gate at the end. "When do you test?" — "throughout" is the answer that gets you hired.`,
        badGood: { label: 'planning testing for a project', bad: `"We'll test in the last sprint before release." — testing as a phase; requirements defects surface far too late.`, good: `"Testers join refinement to review stories, we test at every level each sprint, and we shift the expensive checks left." — testing throughout the lifecycle.` },
        miniChallenge: `For a "reset password" feature, write one test you'd design at each of the four levels — component, integration, system, and acceptance.`,
        modelAnswer: `## Example\nComponent: the token-generator function returns a unique, time-limited token. Integration: the service correctly calls the email provider with that token. System: the end-to-end reset flow works in the running application. Acceptance: a real user can reset their password and log in, meeting the acceptance criteria.`,
      },
    },
    {
      lessonNumber: 6,
      title: 'Real-World Testing Failures',
      estimatedTime: '15 minute read',
      lessonOverview: `The abstract case for testing becomes concrete when you study what happens without it. Famous software failures show exactly how errors, defects and skipped testing translate into cost, harm and lost trust.`,
      learningObjectives: ['Analyse real software failures through the testing lens', 'Connect each failure to specific testing principles', 'Draw practical lessons that change how you test'],
      lessonNotes: `## Why study failures
Real failures make the fundamentals stick. Each one traces the same chain from Lesson 1 — error to defect to failure — but at a scale that made headlines. They also illustrate the seven principles in the wild.

## Classic examples through the testing lens
- **Ariane 5 (1996)**: reused code from Ariane 4 assumed a smaller value range; an unhandled data conversion caused the rocket to self-destruct seconds after launch. Lessons: *testing is context dependent* (Ariane 4 assumptions didn't hold for Ariane 5) and reused code must be re-tested in its new context.
- **Therac-25 (1980s)**: a radiation therapy machine delivered massive overdoses due to concurrency (race-condition) defects and removed hardware safeguards. Lessons: the terrible cost of inadequate testing in a *safety-critical context*, and that finding "no errors" in normal paths doesn't make a system safe (*absence-of-errors fallacy*).
- **Knight Capital (2012)**: a deployment left old code active on one server; the firm lost around \$440m in under an hour. Lessons: change-related and deployment testing matter; *exhaustive testing is impossible*, so risk-based focus on deployment and rollback is essential.

## The pattern
In almost every case the root causes are familiar: assumptions that weren't re-tested, missing edge cases, skipped regression, and confidence mistaken for correctness. The fundamentals you've learned this module are exactly what these teams needed.`,
      workedExample: `Take Ariane 5 through the module's vocabulary. The **error**: engineers assumed reused Ariane 4 code was safe without re-testing it for Ariane 5's flight profile. The **defect**: an unprotected conversion of a value too large for its data type. The **failure**: the guidance system shut down and the rocket self-destructed. Principle links: *testing is context dependent* and reused code needs fresh testing. One re-test of the reused module in the new context would have exposed the defect on the ground.`,
      commonMistakes: `- Concluding "test everything next time" — Principle 2 says exhaustive testing is impossible; the fix is better risk-based focus, not infinite testing
- Blaming individuals rather than the missing process (skipped regression, no re-test of reused code, poor change control)
- Treating these as ancient history — the same root causes cause outages today`,
      realWorldTip: `When you inherit reused or copied code, treat it as untested until proven otherwise in its new context. "It worked before" is exactly the assumption that destroyed Ariane 5.`,
      exercise: `Choose one failure from this lesson (or another you know). Map it explicitly onto error → defect → failure, then name the one or two testing principles most relevant to it.`,
      reflectionQuestion: `Several of these disasters involved reused code that "worked before." Which testing principle most directly warns against trusting it in a new context?`,
      knowledgeCheck: `Reused Ariane 4 code failed in Ariane 5 because its assumptions no longer held. Which testing principle most directly explains this? (Answer: testing is context dependent)`,
      completionChecklist: ['I can analyse a real failure through the testing lens', 'I can connect a failure to specific testing principles', 'I can state a practical lesson that changes how I test'],
      enhancements: {
        industryStory: `I keep a short list of famous failures pinned above my desk, and I use them in planning meetings. When someone says "we don't need to re-test that module, it hasn't changed," I say "Ariane 5." When someone wants to ship a config change straight to production without a rollback plan, I say "Knight Capital." These stories are not nostalgia; they are the cheapest risk arguments I own, and they win debates that abstract principles never could.`,
        visualAid: { type: 'comparison', title: 'Failures mapped to testing fundamentals', headers: ['Failure', 'Core defect', 'Principle / lesson'], rows: [['Ariane 5 (1996)', 'Untested reused code; unhandled conversion', 'Testing is context dependent; re-test reused code'], ['Therac-25 (1980s)', 'Race condition; removed safeguards', 'Absence-of-errors fallacy; safety-critical context'], ['Knight Capital (2012)', 'Stale code left live on one server', 'Change/deployment testing; risk-based focus'], ['Common thread', 'Assumptions never re-tested', 'The fundamentals of Module 1']] },
        davidTip: `In an interview, being able to discuss a real failure fluently — and connect it to a principle — instantly signals a tester who thinks about risk, not just clicks buttons. I've hired people partly on how they told the Knight Capital story. My advice: pick two failures, learn them well enough to narrate the error–defect–failure chain, and know exactly which principle each one illustrates. That is far more impressive than reciting the seven principles cold.`,
        badGood: { label: 'reacting to a near-miss outage', bad: `"We got lucky, let's move on." — no lesson captured, the same defect class will recur.`, good: `"Root cause was reused code we never re-tested — Ariane 5 all over again. Action: add a re-test gate for any reused or copied module." — a principle-linked, preventive lesson.` },
        miniChallenge: `Research one modern outage (last five years). In four sentences, narrate its error, defect and failure, then name the testing principle it most clearly illustrates.`,
        modelAnswer: `## Example\nA 2021 CDN outage: an engineer's error was pushing a configuration change that a rare customer setting could trigger. The defect was an undiscovered latent bug in the config-handling software. The failure was a large chunk of the internet going dark for an hour. Principle: exhaustive testing is impossible — the fix is risk-based testing of high-blast-radius changes plus safe rollback, not "test every config".`,
        managersReview: { intro: `If I reviewed your Module 1 work as your lead, here's what I'd be looking for and where learners typically fall short:`, strengths: ['You use error, defect and failure precisely and consistently', 'You can recite and, more importantly, *apply* the seven principles to scenarios', 'You frame testing as risk reduction and information, not just bug-hunting'], improvements: ['Practise mapping real scenarios to the right principle, not just listing them', 'Tighten defect-report wording so it is objective and blame-free', 'Be explicit about verification vs validation whenever you describe a test'], gaps: ['Confusing test levels with test types under exam pressure', 'Mixing up defect clustering and the pesticide paradox', 'Forgetting that a defect-free product can still be the wrong product (Principle 7)'] },
        portfolioBuilder: `Start a "Testing Fundamentals" page in your QA portfolio. Write a one-page case study of a famous failure analysed through error → defect → failure, linked to two testing principles, and ending with the concrete lesson you'd apply. This demonstrates to hiring managers that you connect theory to real risk — exactly what Module 1 is about.`,
        resourcePreview: { name: 'Software Failure Case-Study Pack', purpose: 'A curated set of famous failures with their error–defect–failure chains and principle links, ready to adapt for your portfolio.', whenToUse: 'Use it to build your portfolio case study and to prepare interview stories.', formats: ['PDF', 'Markdown'] },
      },
    },
  ],
};
