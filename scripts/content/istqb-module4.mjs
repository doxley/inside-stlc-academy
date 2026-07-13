// ISTQB Foundation Masterclass — Module 4: Test Analysis & Design Techniques.
// The biggest module of the course. Every lesson fills every base field and a rich
// `enhancements` block, accurate to the ISTQB CTFL syllabus and grounded in real work.
export default {
  courseSlug: 'istqb-foundation-masterclass',
  moduleNumber: 4,
  lessonsPrefix: 'istqb',
  enhPrefix: 'istqb',
  enhSep: '-',
  lessons: [
    {
      lessonNumber: 1,
      title: 'Equivalence Partitioning',
      estimatedTime: '16 minute read',
      lessonOverview: `Equivalence Partitioning (EP) is the foundational black-box technique. It lets you reduce a huge number of possible inputs to a small, representative set of tests without losing coverage of the behaviour that matters.`,
      learningObjectives: ['Define equivalence partitioning and identify valid and invalid partitions', 'Derive test cases that give each partition one representative value', 'Explain the coverage measure for EP'],
      lessonNotes: `## What it is
**Equivalence Partitioning** divides the input (or output) data of a component into **partitions** — groups the software should treat the same way. The theory: if one value in a partition reveals a defect, the others probably will too, and if one passes, the others probably pass too. So you test **one representative value per partition** rather than every value.

## Valid and invalid partitions
Every input has **valid** partitions (values the system should accept) and **invalid** partitions (values it should reject). ISTQB requires you to identify **both**. A common exam trap is deriving valid partitions only.

## A worked partition set
For an age field accepting **18–65**:

| Partition | Range | Type |
|---|---|---|
| P1 | below 18 (e.g. 10) | invalid |
| P2 | 18–65 (e.g. 30) | valid |
| P3 | above 65 (e.g. 70) | invalid |

## Coverage
**EP coverage = partitions exercised ÷ total partitions.** 100% coverage means every identified partition (valid and invalid) has at least one test. EP is usually the first pass; you then sharpen it with Boundary Value Analysis.`,
      workedExample: `A cinema ticket price depends on age: child (0–15) £5, adult (16–64) £10, senior (65+) £8. Ages below 0 are invalid. Partitions: P1 invalid (< 0, e.g. -3); P2 valid child (0–15, e.g. 8); P3 valid adult (16–64, e.g. 40); P4 valid senior (65+, e.g. 70). Four partitions → four test cases, each with one representative value. Testing every age 0–120 would be 120+ cases for the same information.`,
      commonMistakes: `- Deriving only valid partitions and forgetting the invalid ones (a classic exam trap)
- Testing several values from the same partition, which adds no coverage but inflates the test count
- Combining multiple invalid inputs in one test so you cannot tell which one caused the failure`,
      realWorldTip: `On real projects EP is how you justify test count to a manager: "these 6 tests cover every distinct behaviour of the field" is far more defensible than "I tried a few numbers". It turns intuition into a coverage argument.`,
      exercise: `A password field accepts 8–20 characters. Identify all input partitions (valid and invalid) for length, then write one test case per partition with a representative value.`,
      reflectionQuestion: `Why does testing two values from the same equivalence partition usually add no extra coverage?`,
      knowledgeCheck: `A field accepts integers 1–100. Using equivalence partitioning on value alone, how many partitions exist and how many are invalid? (Answer: 3 partitions — one valid (1–100) and two invalid (< 1 and > 100))`,
      completionChecklist: ['I can identify valid and invalid partitions for a field', 'I can pick one representative value per partition', 'I can state the EP coverage measure'],
      enhancements: {
        industryStory: `A tester on a payments team wrote 40 test cases for a "transfer amount" field by trying lots of round numbers — £10, £20, £50, £100. In review we mapped them to partitions and found all 40 sat in just two: "valid amount" and "over the daily limit". Every other partition — zero, negative, over the account balance, non-numeric — was untested. EP didn't just cut the redundant tests; it exposed the gaps that mattered.`,
        visualAid: { type: 'comparison', title: 'Age field 18–65: partitions', headers: ['Partition', 'Example value', 'Valid / invalid', 'Expected result'], rows: [['Below range', '10', 'Invalid', 'Rejected'], ['In range', '30', 'Valid', 'Accepted'], ['Above range', '70', 'Invalid', 'Rejected']] },
        davidTip: `Whenever someone hands me a list of "test data", the first thing I do is map each value to a partition. Half the time three of the values are the same partition and a whole invalid class is missing. EP is the cheapest way to see what you have not tested.`,
        miniChallenge: `A discount applies to order totals of £50–£500. Identify the partitions and give one representative value for each.`,
        modelAnswer: `## Example\nPartitions for the £50–£500 discount band: P1 invalid (below £50, e.g. £20 — no discount); P2 valid (£50–£500, e.g. £200 — discount applies); P3 invalid (above £500, e.g. £750 — assuming the band caps at £500). Three partitions, three tests. If negative or zero totals are possible inputs, add a fourth invalid partition (e.g. -£10).`,
        badGood: { label: 'choosing test data', bad: `Tester lists 15 amounts: £51, £60, £75, £100, £150, £200… all inside the valid band. Fifteen tests, one partition, zero invalid coverage.`, good: `Tester picks £20 (below), £200 (valid), £750 (above), and −£10 (negative). Four tests, four partitions, valid and invalid behaviour both exercised.` },
        resourcePreview: { name: 'Test Technique Selector', purpose: 'A reference matching each situation to the right design technique.', whenToUse: 'Keep it open through Module 4 as you learn each technique.', formats: ['PDF'] },
      },
    },
    {
      lessonNumber: 2,
      title: 'Boundary Value Analysis',
      estimatedTime: '17 minute read',
      lessonOverview: `Boundary Value Analysis (BVA) sharpens equivalence partitioning by testing the edges of partitions — where defects cluster most heavily. Getting the exact boundary values right is one of the most-tested skills in the ISTQB exam.`,
      learningObjectives: ['Explain why defects cluster at partition boundaries', 'Apply the 2-value and 3-value boundary approaches', 'Identify the correct boundary values for a given range'],
      lessonNotes: `## Why boundaries
Programmers make off-by-one errors: \`>\` instead of \`>=\`, \`<\` instead of \`<=\`. These defects live exactly at the **edges** of partitions. BVA tests those edges deliberately. It is an extension of EP — you first partition, then test the boundaries between partitions.

## The 2-value approach
Test the boundary value and its nearest neighbour on the **other side** of the boundary. For a range **1–10**, the boundaries are 1 and 10; the 2-value set is **0, 1** and **10, 11**.

## The 3-value approach
Test the boundary and **both** neighbours. For 1–10: **0, 1, 2** and **9, 10, 11**. The 3-value approach is more thorough and is the one the current syllabus emphasises.

## Worked boundaries for 1–10

| Boundary | 2-value set | 3-value set |
|---|---|---|
| Lower (1) | 0, 1 | 0, 1, 2 |
| Upper (10) | 10, 11 | 9, 10, 11 |

## Coverage
**BVA coverage = boundary values tested ÷ total boundary values.** The min and max of the *valid* partition are themselves valid; the values just outside are invalid.`,
      workedExample: `A form field accepts a quantity of **1 to 999**. Valid partition boundaries are 1 (lower) and 999 (upper). Using the **3-value approach**: lower boundary → 0, 1, 2; upper boundary → 998, 999, 1000. So the boundary tests are 0, 1, 2, 998, 999, 1000. Note 0 and 1000 are invalid (just outside), while 1, 2, 998, 999 are valid. A tester who wrote "test 1 and 999" would miss the off-by-one defect where the code used \`> 999\` instead of \`>= 999\`.`,
      commonMistakes: `- Testing only the boundary itself and not the value just outside it — the neighbour is where off-by-one bugs show
- Confusing the 2-value and 3-value approaches under exam pressure
- Getting the wrong boundary: for a range "up to but not including 100", the boundary is 99/100, not 100/101`,
      realWorldTip: `In real code reviews, the fastest way to find a bug is to ask "what happens at exactly the limit?" Free trials that end "after 30 days", discounts "over £100", rate limits "max 5 attempts" — the boundary is where the money and the defects are.`,
      exercise: `A bank allows withdrawals from £10 up to £500 per transaction. Using the 3-value boundary approach, list every boundary value you would test and mark each as valid or invalid.`,
      reflectionQuestion: `Why is testing the value just *outside* a boundary as important as testing the boundary itself?`,
      knowledgeCheck: `A field accepts values 1–100. Using the 2-value boundary approach, how many boundary values are there and what are they? (Answer: 4 values — 0, 1, 100, 101)`,
      completionChecklist: ['I can explain why defects cluster at boundaries', 'I can apply both the 2-value and 3-value approaches', 'I can identify correct boundary values for a stated range'],
      enhancements: {
        industryStory: `A retailer offered free delivery "on orders over £50". The rule was coded as \`total > 50\`, so an order of exactly £50 was charged delivery — but marketing had promised free delivery *at* £50. Nobody tested the exact boundary; the EP test used £75, safely inside the partition. One BVA test at £50 would have caught a defect that generated hundreds of complaints. The edge is never a detail.`,
        visualAid: { type: 'comparison', title: 'Range 1–10: 2-value vs 3-value BVA', headers: ['Boundary', '2-value approach', '3-value approach', 'Which are invalid'], rows: [['Lower (1)', '0, 1', '0, 1, 2', '0'], ['Upper (10)', '10, 11', '9, 10, 11', '11']] },
        davidTip: `When I coach testers, I tell them the boundary is where the specification and the code most often disagree. "Over £50" in a requirement and \`> 50\` versus \`>= 50\` in code are a single character apart — and that character is a bug. Always test exactly on the line.`,
        miniChallenge: `A password must be 8–16 characters. Using the 3-value approach, list the boundary values for the lower and upper limits and mark each valid or invalid.`,
        modelAnswer: `## Example\nLower boundary (8): 7 (invalid), 8 (valid), 9 (valid). Upper boundary (16): 15 (valid), 16 (valid), 17 (invalid). Full 3-value set: 7, 8, 9, 15, 16, 17. Boundaries 8 and 16 are the min/max of the valid partition; 7 and 17 fall in the invalid "too short"/"too long" partitions.`,
        badGood: { label: 'boundary selection for "over £100"', bad: `Tester tests £150 and £200 — both comfortably inside "over £100". The off-by-one at exactly £100 is never exercised.`, good: `Tester tests £99, £100, £101. This pins down whether "over" means \`> 100\` or \`>= 100\` and catches the off-by-one directly.` },
      },
    },
    {
      lessonNumber: 3,
      title: 'Decision Table Testing',
      estimatedTime: '18 minute read',
      lessonOverview: `Decision tables handle the situation EP and BVA cannot: business rules where the outcome depends on a combination of conditions. They give you a systematic way to test complex logic without missing a rule.`,
      learningObjectives: ['Build a decision table from conditions and actions', 'Distinguish full coverage from collapsed/minimised tables', 'Derive one test case per rule (column)'],
      lessonNotes: `## What it is
A **decision table** captures a set of **conditions** and the **actions** the system should take for each combination of those conditions. Each **column is a rule**; each rule becomes at least one test case. It excels where requirements read "if A and B but not C, then…".

## Structure
The table has a **condition** section (the inputs) and an **action** section (the outcomes). Conditions are usually T/F. For **n** binary conditions there are **2ⁿ** possible combinations (rules).

## A worked table
Insurance discount: give a discount if the customer is a **member** AND has **no claims** this year.

| | R1 | R2 | R3 | R4 |
|---|---|---|---|---|
| Member? | T | T | F | F |
| No claims? | T | F | T | F |
| **Action: discount** | Yes | No | No | No |

Two conditions → 2² = 4 rules → 4 test cases.

## Coverage
- **Minimum (full) coverage** = one test case per **rule (column)** = 100% decision table coverage.
- **Collapsed tables** merge columns where a condition is irrelevant using a dash (**—**, "don't care"), reducing the number of tests while keeping coverage of the distinct outcomes.`,
      workedExample: `A login system: access is granted only if the account is **active**, the **password is correct**, and the account is **not locked**. Three binary conditions → 2³ = 8 rules. In a full table, only the rule (Active=T, Password OK=T, Locked=F) grants access; the other seven deny it. Because "locked" alone always denies access regardless of the other two, you can *collapse* the locked=T rules into fewer columns using "—" for the don't-care conditions — turning 8 columns into as few as 4 while still testing every distinct outcome.`,
      commonMistakes: `- Forgetting a condition combination, so a whole business rule goes untested
- Miscounting the rules — n binary conditions give 2ⁿ columns, not 2×n
- Collapsing columns incorrectly and losing a genuinely different outcome`,
      realWorldTip: `Decision tables are the technique that most impresses business analysts and product owners. When a rule set is tangled, drawing the table live in a refinement session often reveals combinations the BA never specified — you find requirement gaps, not just test cases.`,
      exercise: `A loan is approved only if the applicant is employed AND has a credit score above 600 AND is not already in arrears. Build the full decision table (conditions, rules, action) and state how many test cases full coverage requires.`,
      reflectionQuestion: `Why does collapsing a decision table with "don't care" entries reduce test cases without reducing coverage of outcomes?`,
      knowledgeCheck: `A decision table has 4 independent binary conditions. How many rules (columns) does the full, non-collapsed table contain? (Answer: 2⁴ = 16 rules)`,
      completionChecklist: ['I can build a decision table from conditions and actions', 'I can count the rules for n binary conditions', 'I can derive one test case per rule'],
      enhancements: {
        industryStory: `On a telecoms billing project, "eligibility for the loyalty rate" depended on four conditions the BA had described in prose across three paragraphs. When we put them in a decision table, two of the sixteen combinations had no defined outcome — the spec simply didn't say what should happen. The table didn't just generate tests; it sent two genuine requirement questions back to the business before a line of code was written.`,
        visualAid: { type: 'comparison', title: 'Insurance discount decision table', headers: ['Condition / Action', 'R1', 'R2', 'R3', 'R4'], rows: [['Member?', 'T', 'T', 'F', 'F'], ['No claims this year?', 'T', 'F', 'T', 'F'], ['Action: give discount', 'Yes', 'No', 'No', 'No']] },
        davidTip: `I bring a decision table to requirement refinements deliberately. Nothing exposes a vague rule faster than asking "what does the system do in this exact column?" Half the value is testing; the other half is forcing the business to define combinations they had never thought about.`,
        miniChallenge: `A shipping charge is free if the order is over £40 OR the customer is a Prime member. Build the decision table for these two conditions and mark which rules give free shipping.`,
        modelAnswer: `## Example\nTwo conditions → 2² = 4 rules.\n\n| | R1 | R2 | R3 | R4 |\n|---|---|---|---|---|\n| Over £40? | T | T | F | F |\n| Prime member? | T | F | T | F |\n| Free shipping? | Yes | Yes | Yes | No |\n\nOnly R4 (not over £40 AND not Prime) charges shipping. Because R1–R3 all give free shipping, you could collapse them, but with only four rules it is clearer to test all four.`,
        badGood: { label: 'testing combined business rules', bad: `Tester checks "member gets discount" and "no claims gets discount" as two separate cases and assumes the combination works — never testing member=T, claims=T together.`, good: `Tester builds the 4-rule table and tests every combination, catching the case where a member *with* a claim is wrongly given the discount.` },
      },
    },
    {
      lessonNumber: 4,
      title: 'State Transition Testing',
      estimatedTime: '17 minute read',
      lessonOverview: `Some systems behave differently depending on what happened before — the same input produces a different result in a different state. State transition testing models this behaviour and tests the moves between states, including the ones that should be impossible.`,
      learningObjectives: ['Read and build a state transition diagram or table', 'Identify valid transitions and invalid (should-not-happen) transitions', 'Distinguish 0-switch and 1-switch coverage'],
      lessonNotes: `## What it is
A **state transition** model has **states** (the condition the system is in), **events** (inputs that trigger change), **transitions** (moves from one state to another caused by an event), and optional **actions/outputs**. It fits anything with memory: order lifecycles, media players, ATMs, authentication lockouts.

## Diagram vs table
A **state transition diagram** shows it visually; a **state transition table** lists every state–event pair. The table's power is that it forces you to consider events that should do **nothing or be rejected** in a given state — the invalid transitions a diagram often hides.

## A worked model (a door)
States: Closed, Open, Locked. Events: open, close, lock, unlock.

| Current state | Event | Next state |
|---|---|---|
| Closed | open | Open |
| Closed | lock | Locked |
| Open | close | Closed |
| Locked | unlock | Closed |
| Locked | open | (invalid — no transition) |

## Coverage
- **0-switch (all transitions)** = test every single valid transition once.
- **1-switch** = test every valid pair of consecutive transitions — more thorough, catches defects that depend on the previous move.
- Strong testing also fires **invalid** events in each state to confirm the system rejects them.`,
      workedExample: `A phone PIN lock: state **Unlocked**; wrong PIN moves toward lockout. States: Unlocked, Attempt-1-Failed, Attempt-2-Failed, Locked. Event "wrong PIN" transitions Unlocked → Attempt-1-Failed → Attempt-2-Failed → Locked (after 3 failures). Event "correct PIN" from any failed state → Unlocked. From **Locked**, a correct PIN should do nothing (invalid transition) until a timeout. 0-switch coverage tests each arrow once; a strong test also fires "correct PIN" while Locked to confirm it is refused — a rule teams frequently get wrong.`,
      commonMistakes: `- Testing only the "happy path" transitions and never firing invalid events in a state
- Confusing a state (a condition the system rests in) with an event (the trigger)
- Assuming 0-switch coverage is enough when the defect depends on the previous transition (needs 1-switch)`,
      realWorldTip: `The most valuable state-transition tests are the invalid ones — "what happens if I pay for an order that's already cancelled?" Real production incidents are overwhelmingly about a system accepting an event it should have rejected because it was in the wrong state.`,
      exercise: `Model a traffic light with states Red, Green, Amber and the timer event that advances it. Draw the state transition table, then identify one invalid transition and describe how you would test that the system rejects it.`,
      reflectionQuestion: `What kind of defect can 1-switch coverage find that 0-switch coverage cannot?`,
      knowledgeCheck: `In state transition testing, what is the difference between a state and an event? (Answer: a state is the condition the system is currently in; an event is the input/trigger that may cause a transition to another state)`,
      completionChecklist: ['I can build a state transition table from a description', 'I can identify valid and invalid transitions', 'I can explain 0-switch vs 1-switch coverage'],
      enhancements: {
        industryStory: `An e-commerce team shipped an order-status feature that passed every happy-path test: pending → paid → shipped → delivered all worked. In production, a customer clicked "Cancel" on an already-shipped order and the system happily refunded them *and* let the parcel arrive. The bug was a missing invalid transition — "cancel" fired from the "shipped" state. A state transition table would have listed that exact cell and flagged it as needing a defined (rejecting) behaviour.`,
        visualAid: { type: 'comparison', title: 'Door: state transition table', headers: ['Current state', 'Event', 'Next state', 'Valid?'], rows: [['Closed', 'open', 'Open', 'Yes'], ['Closed', 'lock', 'Locked', 'Yes'], ['Open', 'close', 'Closed', 'Yes'], ['Locked', 'unlock', 'Closed', 'Yes'], ['Locked', 'open', '(none)', 'No — should be rejected']] },
        davidTip: `Whenever a feature has the words "status", "stage", "state" or "workflow" in it, I reach for a state transition table immediately. The table's empty and invalid cells are where the incidents live — the transitions nobody thought to define are exactly the ones a real user will eventually trigger.`,
        miniChallenge: `A subscription can be Active, Paused, or Cancelled. Events: pause, resume, cancel. Build the state transition table and mark any invalid transitions (e.g. resuming a Cancelled subscription).`,
        modelAnswer: `## Example\n\n| Current state | Event | Next state | Valid? |\n|---|---|---|---|\n| Active | pause | Paused | Yes |\n| Active | cancel | Cancelled | Yes |\n| Paused | resume | Active | Yes |\n| Paused | cancel | Cancelled | Yes |\n| Cancelled | resume | (none) | No — reject |\n| Cancelled | pause | (none) | No — reject |\n\nThe two invalid rows are the important tests: confirm a Cancelled subscription cannot be resumed or paused. 0-switch coverage tests each valid arrow once.`,
        badGood: { label: 'testing an order workflow', bad: `Tester walks the single happy path pending → paid → shipped → delivered and declares the workflow tested.`, good: `Tester tests every valid transition (0-switch) *and* fires invalid events — cancel-after-shipped, pay-when-cancelled — confirming each is rejected.` },
      },
    },
    {
      lessonNumber: 5,
      title: 'Pairwise Testing',
      estimatedTime: '16 minute read',
      lessonOverview: `When a feature has many parameters, testing every combination explodes into thousands of cases. Pairwise testing (a combinatorial technique) gives you a fraction of the tests while still covering every pair of values — where most combination defects actually live.`,
      learningObjectives: ['Explain why combinatorial explosion makes all-combinations testing impractical', 'Describe how pairwise testing covers all pairs of parameter values', 'Apply pairwise thinking to reduce a large combination space'],
      lessonNotes: `## The problem it solves
Suppose a checkout has: payment (3 options), delivery (3 options), currency (4 options), device (3 options). All combinations = 3 × 3 × 4 × 3 = **108 tests**. Add one more parameter and it balloons further. Testing all combinations is rarely feasible.

## The insight
Research shows most combination defects are triggered by the interaction of just **two** parameters, not four or five at once. **Pairwise (2-wise) testing** selects a small set of tests such that **every pair of values from any two parameters appears together at least once**.

## The payoff
For the 108-combination example above, a pairwise set typically needs around **12 tests** — roughly a 90% reduction — while still covering every value-pair. Tools (PICT, ACTS, online generators) build the set for you; the skill is knowing *when* it is the right technique.

## A tiny worked case
Two parameters, each with 2 values (Browser: Chrome/Firefox; OS: Win/Mac). All combinations = 4, and pairwise also needs 4 here — pairwise only saves you when parameters and values grow. Its power appears with three or more parameters.`,
      workedExample: `A report generator has: format (PDF, CSV, HTML), range (day, week, month), and audience (internal, external). All combinations = 3 × 3 × 2 = 18 tests. A pairwise set covering every pair of values needs about **9 tests** — for example (PDF, day, internal), (PDF, week, external), (PDF, month, internal), (CSV, day, external), (CSV, week, internal), (CSV, month, external), (HTML, day, internal), (HTML, week, external), (HTML, month, external). Check any two columns and every value-pair appears — half the tests, full 2-wise coverage.`,
      commonMistakes: `- Using pairwise when a specific 3-way combination is known to be risky — pairwise guarantees pairs, not triples
- Assuming pairwise finds *all* defects; it targets 2-parameter interactions, not single-value or higher-order faults
- Reaching for pairwise on a feature with only one or two parameters, where it saves nothing`,
      realWorldTip: `Pairwise is the technique that saves a compatibility or configuration test matrix from being impossible. When a QA lead says "we can't test every browser × OS × locale × plan combination", pairwise is the honest, defensible answer that still covers the interactions where bugs hide.`,
      exercise: `A form has three dropdowns: Country (UK, US, DE), Language (EN, DE), and Plan (Free, Pro). List all combinations, count them, then sketch a pairwise set and count how many tests it needs.`,
      reflectionQuestion: `Why does pairwise testing catch most combination defects even though it does not test every possible combination?`,
      knowledgeCheck: `A feature has 4 parameters with 3, 3, 2 and 2 values. How many tests does exhaustive all-combinations testing require? (Answer: 3 × 3 × 2 × 2 = 36 tests — pairwise would need far fewer)`,
      completionChecklist: ['I can explain combinatorial explosion', 'I can describe what "all pairs covered" means', 'I know when pairwise is and is not the right choice'],
      enhancements: {
        industryStory: `A team testing a video-conferencing app faced a matrix of 5 browsers × 4 operating systems × 3 network conditions × 3 camera types = 180 combinations. Running all 180 for every release was impossible, so they were testing an arbitrary handful and missing bugs. We generated a pairwise set of 20 tests with a free tool. It covered every browser–OS, browser–network and OS–camera pair, and in the first run it surfaced a Firefox-on-macOS-with-poor-network defect that the ad-hoc selection had been skipping for months.`,
        visualAid: { type: 'comparison', title: 'All-combinations vs pairwise', headers: ['Scenario', 'Parameters', 'All combinations', 'Pairwise (approx)'], rows: [['Report generator', '3×3×2', '18', '~9'], ['Checkout', '3×3×4×3', '108', '~12'], ['Compatibility matrix', '5×4×3×3', '180', '~20']] },
        davidTip: `Pairwise is where testers earn their reputation as engineers, not clickers. When a manager sees a 180-cell matrix and a deadline, being able to say "we'll cover every interaction in 20 tests with a combinatorial tool" is the difference between a credible plan and heroics that never finish.`,
        miniChallenge: `A phone plan builder has Data (1GB, 10GB, unlimited), Contract (12m, 24m) and Insurance (yes, no). Count all combinations, then estimate how many a pairwise set needs.`,
        modelAnswer: `## Example\nAll combinations = 3 × 2 × 2 = 12 tests. A pairwise set covering every value-pair needs about **6 tests** — e.g. (1GB, 12m, yes), (1GB, 24m, no), (10GB, 12m, no), (10GB, 24m, yes), (unlimited, 12m, yes), (unlimited, 24m, no). Inspect any two columns and every pair of values appears at least once. Half the tests, full 2-wise coverage.`,
        badGood: { label: 'a configuration test matrix', bad: `Tester picks "a representative few" combinations by gut feel, leaving whole browser–OS pairs untested and no way to say what is covered.`, good: `Tester generates a pairwise set with a tool, guaranteeing every 2-parameter interaction is covered and documenting exactly what coverage the smaller suite provides.` },
      },
    },
    {
      lessonNumber: 6,
      title: 'Use Case Testing',
      estimatedTime: '15 minute read',
      lessonOverview: `Use case testing derives tests from how an actor actually interacts with the system to achieve a goal. It is the technique that best captures end-to-end business flows and the alternative paths real users take.`,
      learningObjectives: ['Explain what a use case is and its main/alternative/exception flows', 'Derive test cases from the basic flow and each alternative flow', 'Distinguish use case testing from the lower-level black-box techniques'],
      lessonNotes: `## What it is
A **use case** describes an interaction between an **actor** (a user or another system) and the system to achieve a goal. Use case testing derives test cases from these interactions, and is especially good at finding **integration** and **end-to-end** defects — the ones that only appear when steps are joined up.

## Flows
- **Basic (main) flow** — the "everything goes right" path to the goal.
- **Alternative flows** — valid variations that still reach the goal (e.g. paying by a different method).
- **Exception flows** — error paths where the goal cannot be met (e.g. payment declined).

## Deriving tests
At minimum, one test case for the basic flow and **one per alternative and exception flow**. Each flow through the use case is a test.

## A worked use case
"Withdraw cash from an ATM":

| Flow | Description | Test outcome |
|---|---|---|
| Basic | Valid card, correct PIN, sufficient funds | Cash dispensed |
| Alternative | Correct PIN, chooses receipt | Cash + receipt |
| Exception | Insufficient funds | Declined, no cash |
| Exception | Wrong PIN ×3 | Card retained |`,
      workedExample: `Use case "Place an online order". Basic flow: browse → add to basket → checkout → pay → order confirmed. Alternative flow: apply a valid discount code before paying (still reaches "order confirmed"). Exception flows: card declined (order not placed, user prompted to retry); item goes out of stock during checkout (basket updated, user warned). From this one use case you derive at least four test cases — the basic path plus each alternative and exception — covering the journey the way a real customer travels it, not just isolated fields.`,
      commonMistakes: `- Testing only the basic flow and skipping the alternative and exception flows where most real defects live
- Confusing use case testing (behavioural, end-to-end) with use case *diagrams* (just notation)
- Writing use cases so vague that no concrete test steps can be derived from them`,
      realWorldTip: `Use case testing is your bridge to acceptance testing and to the business. Because each flow maps to something a stakeholder recognises ("what if the card is declined?"), use-case-derived tests are the easiest to review with product owners and the most convincing evidence that the system does what users need.`,
      exercise: `Write a use case for "Reset a forgotten password". Identify the basic flow, at least one alternative flow, and at least one exception flow, then derive a test case for each.`,
      reflectionQuestion: `Why do the alternative and exception flows of a use case tend to reveal more defects than the basic flow?`,
      knowledgeCheck: `In use case testing, what are the three kinds of flow you derive test cases from? (Answer: the basic/main flow, alternative flows, and exception flows)`,
      completionChecklist: ['I can identify basic, alternative and exception flows', 'I can derive a test case from each flow', 'I can explain how use case testing differs from EP/BVA'],
      enhancements: {
        industryStory: `A banking client had thorough field-level tests — every input validated with EP and BVA — yet a transfer feature failed in production. The defect only appeared in an alternative flow: transferring to a newly added payee before the payee's verification completed. No single field was wrong; the *sequence* was. Writing the use case with its alternative flows made that path a first-class test case, and it caught the class of defect that field testing structurally could not see.`,
        visualAid: { type: 'comparison', title: 'ATM withdrawal: use case flows', headers: ['Flow type', 'Scenario', 'Expected outcome'], rows: [['Basic', 'Valid card, PIN, sufficient funds', 'Cash dispensed'], ['Alternative', 'Also requests a receipt', 'Cash + receipt'], ['Exception', 'Insufficient funds', 'Declined, no cash'], ['Exception', 'Wrong PIN three times', 'Card retained']] },
        davidTip: `Use cases are how I get product owners to do my test analysis for me. Walk them through the basic flow and then ask "and what if…?" for each step — they will hand you the alternative and exception flows, which are exactly the test cases that matter and the ones a fields-only tester never writes.`,
        miniChallenge: `Write the flows for the use case "Log in to an app": one basic flow, one alternative flow (e.g. login via a saved biometric), and one exception flow (e.g. account locked).`,
        modelAnswer: `## Example\nUse case "Log in to an app". **Basic flow:** enter correct email + password → dashboard shown. **Alternative flow:** authenticate with fingerprint/Face ID → dashboard shown (same goal, different route). **Exception flow:** correct email but wrong password five times → account temporarily locked, error shown, no access. Three flows → three test cases. The exception flow is the one most likely to reveal a defect and the one a basic-path-only tester would miss.`,
        badGood: { label: 'deriving tests from a use case', bad: `Tester tests only "happy path checkout" and marks the use case done, ignoring declined payments and out-of-stock items.`, good: `Tester derives one case per flow — basic, discount-code alternative, card-declined exception, out-of-stock exception — mirroring how real customers actually travel the journey.` },
      },
    },
    {
      lessonNumber: 7,
      title: 'Experience-Based Testing',
      estimatedTime: '16 minute read',
      lessonOverview: `Not all testing comes from a formal model. Experience-based techniques — error guessing, exploratory testing, and checklist-based testing — draw on a tester's knowledge, intuition and experience to find defects the systematic techniques miss.`,
      learningObjectives: ['Define error guessing, exploratory testing, and checklist-based testing', 'Explain how experience-based techniques complement black-box techniques', 'Recognise when experience-based testing adds the most value'],
      lessonNotes: `## Where they fit
The techniques so far (EP, BVA, decision tables, state transition, use cases) are **black-box** — derived from a specification. **White-box** techniques (statement and branch/decision coverage) instead derive tests from the code's internal structure — mentioned here only for context, as they belong to a separate part of the syllabus. **Experience-based** techniques are the third family: tests come from the **tester's** knowledge, not a model.

## The three techniques
- **Error guessing** — deliberately anticipating likely mistakes (empty inputs, zero, negative numbers, duplicate submits, special characters) based on where defects usually hide. Often formalised as a **fault attack** list.
- **Exploratory testing** — simultaneous learning, test design and execution, usually **time-boxed** into sessions with a **charter** (a mission for the session). Structured exploratory work is often called **session-based test management**.
- **Checklist-based testing** — testing guided by a checklist of items to verify (e.g. accessibility, security, usability heuristics), capturing lessons and standards in reusable form.

## Their role
Experience-based techniques **complement**, not replace, the systematic ones. Their coverage is hard to measure and depends heavily on the tester, but they excel where specifications are weak, missing, or where subtle usability and edge-case defects live.`,
      workedExample: `A team has just applied EP and BVA to a new registration form and everything passes. A tester then runs a 60-minute **exploratory session** with the charter "explore the registration form for input-handling defects". Using **error guessing**, they try: pasting a 5,000-character name, submitting twice rapidly, entering emoji in the name field, and an email with a trailing space. The double-submit creates two accounts — a concurrency defect no partition or boundary described, because it exists in the *behaviour*, not the *input space*. Systematic techniques found the specified defects; experience-based testing found the one nobody specified.`,
      commonMistakes: `- Treating exploratory testing as "random clicking" — real exploratory testing is chartered, focused and documented
- Relying on experience-based testing *instead of* systematic techniques rather than alongside them
- Assuming its coverage can be measured the way EP or BVA coverage can — it cannot, and that is expected`,
      realWorldTip: `The best testers pair a systematic pass with a time-boxed exploratory session on every feature. The systematic pass proves the specified behaviour; the exploratory session — where your experience runs free — finds the defects the specification never imagined. Charters keep it focused enough to be credible to a manager.`,
      exercise: `Pick any app you use. Write a 30-minute exploratory testing charter for one feature (state the mission), then list five error-guessing inputs you would try and why each is likely to expose a defect.`,
      reflectionQuestion: `Why can experience-based testing find defects that equivalence partitioning and boundary value analysis structurally cannot?`,
      knowledgeCheck: `Name the three experience-based test techniques in the ISTQB Foundation syllabus. (Answer: error guessing, exploratory testing, and checklist-based testing)`,
      completionChecklist: ['I can define error guessing, exploratory and checklist-based testing', 'I can explain how they complement black-box techniques', 'I can write a focused exploratory charter'],
      enhancements: {
        industryStory: `A fintech app passed a full suite of specification-based tests before launch. On day one, a support ticket arrived: a user had tapped "Confirm payment" twice on a slow connection and been charged twice. No EP partition, no boundary, no decision-table rule described it — the defect lived in timing and human behaviour. After that, the team added a standing exploratory charter, "hammer every money button on a throttled network", to every payment feature. Experience-based testing became the safety net under the systematic techniques.`,
        visualAid: { type: 'comparison', title: 'Three families of test techniques', headers: ['Family', 'Derived from', 'Examples', 'Coverage measurable?'], rows: [['Black-box', 'The specification', 'EP, BVA, decision tables, state transition, use cases', 'Yes'], ['White-box', "The code's structure", 'Statement, branch/decision coverage', 'Yes'], ['Experience-based', "The tester's knowledge", 'Error guessing, exploratory, checklist-based', 'No (tester-dependent)']] },
        davidTip: `I have never trusted a feature that only passed scripted tests. Scripts prove you handled what you thought of; a time-boxed exploratory session with a sharp charter is where you find what you didn't. The two are not rivals — ship neither alone.`,
        miniChallenge: `Write an error-guessing list of six inputs you would try against a "quantity" field on an e-commerce site, and note the likely defect each targets.`,
        modelAnswer: `## Example\nError-guessing list for a "quantity" field: (1) 0 — should it be rejected or add nothing? (2) −1 — negative quantity / refund exploit; (3) 99999 — stock and total overflow; (4) 1.5 — non-integer handling; (5) "abc" — non-numeric validation; (6) leading zeros "007" — parsing. Each targets a class of defect (validation, overflow, type handling) that a single valid-value test would sail straight past. Pair this list with a chartered exploratory session for best effect.`,
        badGood: { label: 'exploratory testing', bad: `"I clicked around the app for a bit and it seemed fine." No charter, no record, nothing repeatable or reportable.`, good: `"60-min session, charter: probe checkout for input and timing defects. Found: double-submit creates duplicate order (logged BUG-214). Notes and steps attached." Focused, time-boxed, documented.` },
      },
    },
    {
      lessonNumber: 8,
      title: 'Selecting the Right Technique',
      estimatedTime: '18 minute read',
      lessonOverview: `Knowing the techniques is half the skill; choosing the right one for the situation is the other half. This capstone lesson shows how to match technique to context and combine techniques into a coherent test design — the mark of a professional tester.`,
      learningObjectives: ['Match each test design technique to the situations where it is strongest', 'Combine complementary techniques into a layered test design', 'Justify a technique choice in terms of risk, coverage and effort'],
      lessonNotes: `## The core idea
No single technique is "best". Each targets a different kind of defect. Skilled testers **layer** techniques: partition the input space, sharpen the edges, cover the rule combinations, walk the states, tame the parameter explosion, follow the user journey, then explore.

## Quick selection guide

| If the feature is about… | Reach for… |
|---|---|
| A field with ranges/categories | Equivalence Partitioning |
| Limits, edges, off-by-one risk | Boundary Value Analysis |
| Combinations of business rules | Decision Table Testing |
| Behaviour that depends on history/status | State Transition Testing |
| Many independent parameters | Pairwise Testing |
| End-to-end user goals & flows | Use Case Testing |
| Weak/missing specs, subtle bugs | Experience-Based Testing |

## Combining, not choosing
On one checkout form you might use **EP** on the promo-code field, **BVA** on the quantity, a **decision table** for the discount rules, **state transition** for the order lifecycle, **pairwise** for payment × delivery × currency, a **use case** for the full journey, and an **exploratory** session to finish. Selection is really *composition*.

## Factors that drive the choice
Risk level, contractual/regulatory requirements, defect history, the quality of the specification, and the time and skills available all steer which techniques earn their place.`,
      workedExample: `Brief: test a "book a flight" feature. Layered design: **EP/BVA** on passenger count (1–9) and date ranges; **decision table** for the fare rules (member × baggage × flexible ticket → price and change-fee); **state transition** for the booking lifecycle (searching → held → paid → ticketed → cancelled, including invalid moves like paying a cancelled hold); **pairwise** for cabin × meal × seat-type × payment combinations; a **use case** per journey (basic booking, booking with a voucher, payment-declined exception); and a time-boxed **exploratory** session on the seat-map UI. One feature, seven techniques, each covering a defect class the others cannot — and a coverage story you can defend to any manager or auditor.`,
      commonMistakes: `- Believing one technique fits everything, and forcing (say) BVA onto a problem that is really a decision table
- Choosing techniques by habit rather than by the risk and nature of the feature
- Over-testing low-risk areas with heavy techniques while under-testing high-risk logic`,
      realWorldTip: `In interviews and appraisals, the question that separates senior testers is "how would you test this?" The weak answer names one technique; the strong answer *layers* several and *justifies each by the risk it addresses*. That reasoning — technique matched to risk — is the whole point of Module 4.`,
      exercise: `Take a feature you know well (e.g. an online checkout, a booking form, or a settings page). Design a layered test approach naming at least four techniques from this module, and for each write one sentence justifying why it fits that part of the feature.`,
      reflectionQuestion: `Why is combining several techniques on one feature usually stronger than picking a single "best" technique?`,
      knowledgeCheck: `Which technique is most appropriate when a system's response to an event depends on what state it is currently in? (Answer: state transition testing)`,
      completionChecklist: ['I can match a technique to the kind of defect it targets', 'I can combine techniques into a layered design for one feature', 'I can justify each technique choice in terms of risk and coverage'],
      enhancements: {
        industryStory: `I once interviewed two testers for a senior role and gave both the same task: "How would you test a hotel booking form?" The first listed "I'd do boundary value analysis on the dates" and stopped. The second walked through partitioning the guest count, a decision table for the room-rate rules, a state model for the booking lifecycle, pairwise for the room × board × payment matrix, use cases for the booking journeys, and a closing exploratory session — justifying each by its risk. Same techniques available to both; only one understood that selection is composition. She got the job.`,
        visualAid: { type: 'comparison', title: 'Technique selection at a glance', headers: ['Situation', 'Best technique', 'Family'], rows: [['Field with ranges or categories', 'Equivalence Partitioning', 'Black-box'], ['Limits and off-by-one risk', 'Boundary Value Analysis', 'Black-box'], ['Combined business rules', 'Decision Table', 'Black-box'], ['History/status-dependent behaviour', 'State Transition', 'Black-box'], ['Many independent parameters', 'Pairwise', 'Black-box'], ['End-to-end user goal', 'Use Case', 'Black-box'], ['Weak specs / subtle defects', 'Experience-Based', 'Experience-based']] },
        davidTip: `The senior tester's superpower is not knowing more techniques — it is knowing which one earns its place here, and saying why. When you can look at a feature and instantly see "this part is a decision table, that part is a state machine, the rest needs exploration", you have stopped being a test executor and become a test designer.`,
        miniChallenge: `For an online "file upload" feature, name three techniques from this module you would combine and justify each in one sentence.`,
        modelAnswer: `## Example\nFor a file upload feature: (1) **Boundary Value Analysis** on file size around the max limit (e.g. 9.9MB, 10MB, 10.1MB) to catch the off-by-one at the cap; (2) **Decision Table** for the rules combining file type × size × user permission to determine accept/reject; (3) **State Transition** for the upload lifecycle (selecting → uploading → complete → failed, including cancelling mid-upload); and a closing (4) **Experience-based exploratory** session with error guessing — zero-byte files, wrong extensions renamed, uploading during a dropped connection — for the defects no model describes. Each technique covers a defect class the others cannot.`,
        badGood: { label: 'answering "how would you test this?"', bad: `"I'd do some boundary value analysis and click around." One technique, no justification, no coverage of the rule combinations or the workflow.`, good: `"EP/BVA on the numeric fields, a decision table for the pricing rules, a state model for the order lifecycle, pairwise for the config matrix, and a chartered exploratory session — each chosen for the risk it addresses." Layered and justified.` },
        managersReview: { intro: `If I reviewed your Module 4 test design as a lead, here is what I would look for:`, strengths: ['You choose techniques by the nature of the feature, not by habit', 'You layer complementary techniques rather than relying on one', 'You correctly identify valid and invalid partitions and exact boundary values', 'You test invalid transitions and exception flows, not just happy paths'], improvements: ['State the coverage measure you are targeting for each technique', 'Justify each technique explicitly against the feature risk', 'Add a time-boxed exploratory charter to complement the systematic passes'], gaps: ['Only deriving valid partitions and missing invalid ones', 'Testing boundaries without the value just outside them', 'Missing rule combinations in decision tables', 'Ignoring invalid state transitions and use-case exception flows'] },
        portfolioBuilder: `Create a "Test Design Portfolio" document: pick one real or realistic feature and produce a complete layered test design using at least five techniques from this module — partitions and boundaries, a decision table, a state transition table, a pairwise set, and a chartered exploratory session. State the coverage target for each. This single artefact demonstrates the full black-box, and experience-based skill set to any employer and is the strongest evidence of Module 4 mastery.`,
        resourcePreview: { name: 'Test Technique Selector', purpose: 'A one-page decision guide mapping feature characteristics to the right design technique, with coverage measures for each.', whenToUse: 'Use it during test analysis on every feature and when justifying your approach in reviews or interviews.', formats: ['PDF'] },
      },
    },
  ],
};
