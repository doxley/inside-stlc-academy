// ISTQB Foundation Masterclass - Module 12: Exam Preparation.
// A MIXED, exam-realistic practice set of 30 questions spread across ALL
// CTFL v4.0 syllabus chapters, mirroring the real exam's topic weighting and
// K-level distribution. Each question: exactly 4 options, exactly one correct,
// per-option "why", plus an "explanation" and a concrete "workplaceExample".
// ASCII quotes/apostrophes only.
export default {
  courseSlug: "istqb-foundation-masterclass",
  moduleNumber: 12,
  syllabusTopic: "Exam Preparation",
  questions: [
    // ---------------------------------------------------------------
    // Chapter 1 - Fundamentals of Testing (~4)
    // ---------------------------------------------------------------
    {
      chapter: "1 - Fundamentals of Testing",
      kLevel: "K2",
      question: "A team ships a feature that passed every planned test, yet a serious defect is found in production three weeks later. Which testing principle best explains why passing all tests did not guarantee a defect-free product?",
      options: [
        { text: "Testing shows the presence of defects, not their absence", correct: true, why: "Correct. Testing can reveal defects but can never prove there are none; passing tests only shows the executed cases found no failures, not that the product is defect-free." },
        { text: "Defects cluster in a small number of modules", correct: false, why: "Defect clustering describes where defects concentrate; it does not explain why passing tests fails to prove correctness." },
        { text: "Tests wear out and lose effectiveness over time (the pesticide paradox)", correct: false, why: "The pesticide paradox is about repeating the same tests finding fewer new defects, not about passing tests proving absence of defects." },
        { text: "Testing is context dependent", correct: false, why: "Context dependency means testing differs by situation; it is unrelated to why passing tests cannot guarantee zero defects." },
      ],
      explanation: "The principle 'testing shows the presence of defects, not their absence' directly states that executing tests without finding failures does not prove the software is defect-free. Exhaustive testing is impossible, so untested paths may still hide defects.",
      workplaceExample: "In a sprint review, a QA lead reminds stakeholders that a green test run means 'no failures were found in what we ran', not 'the release is bug-free', to keep sign-off expectations realistic.",
    },
    {
      chapter: "1 - Fundamentals of Testing",
      kLevel: "K1",
      question: "Which pair correctly distinguishes an error, a defect, and a failure?",
      options: [
        { text: "An error is a human mistake, a defect is the resulting flaw in the work product, and a failure is the incorrect behaviour observed when the defect is executed", correct: true, why: "Correct. This is the exact ISTQB chain: mistake (error) -> defect (fault/bug in code or document) -> failure (deviation observed in execution)." },
        { text: "An error is an incorrect output, a defect is a missed test, and a failure is a crash", correct: false, why: "An error is a human action, not an output; a defect is not a missed test; this reverses and confuses the definitions." },
        { text: "An error is a defect that reaches production, a defect is a warning, and a failure is a root cause", correct: false, why: "None of these match the ISTQB definitions; a defect reaching production is still a defect, not an error." },
        { text: "Error, defect, and failure are synonyms used interchangeably in the syllabus", correct: false, why: "The syllabus deliberately distinguishes the three; they are not synonyms." },
      ],
      explanation: "A person makes an error (mistake), which can introduce a defect (fault/bug) in code or a document. If the defective code is executed, it may cause a failure - a visible deviation from expected behaviour.",
      workplaceExample: "A developer mistypes a comparison operator (error), creating a defect in the discount logic, which produces a wrong total at checkout (failure) when a customer applies a coupon.",
    },
    {
      chapter: "1 - Fundamentals of Testing",
      kLevel: "K2",
      question: "A stakeholder asks why the team cannot simply 'test everything' to be completely sure. What is the most accurate ISTQB-based response?",
      options: [
        { text: "Exhaustive testing is impossible except for trivial cases, so testing must be prioritised using risk and techniques", correct: true, why: "Correct. Exhaustive testing (all input and precondition combinations) is infeasible for realistic systems, so effort is focused via risk and test techniques." },
        { text: "Testing everything is possible but too expensive, so we skip it purely to save money", correct: false, why: "It is not merely expensive; for non-trivial systems it is genuinely impossible due to combinatorial explosion." },
        { text: "Testing everything is unnecessary because early testing removes all defects", correct: false, why: "Early testing reduces cost and finds defects sooner but does not remove all defects, and this ignores the impossibility point." },
        { text: "Automation makes exhaustive testing achievable on modern hardware", correct: false, why: "Automation increases throughput but cannot cover the effectively infinite combinations of inputs and states." },
      ],
      explanation: "The principle 'exhaustive testing is impossible' means testing all input combinations and preconditions is infeasible for anything beyond trivial cases. Instead, risk analysis and test techniques concentrate effort where it matters most.",
      workplaceExample: "When a client demands 100 percent coverage of every field combination on a 20-field form, the test manager shows the combinatorial count and proposes risk-based prioritisation plus pairwise techniques instead.",
    },
    {
      chapter: "1 - Fundamentals of Testing",
      kLevel: "K2",
      question: "Which of the following is a valid reason that independent testing is often more effective than developers testing only their own code?",
      options: [
        { text: "Independent testers are less subject to author bias and can challenge assumptions the author took for granted", correct: true, why: "Correct. Independence reduces the natural bias authors have toward their own work and surfaces assumptions and defects the author cannot easily see." },
        { text: "Independent testers always find every defect that developers miss", correct: false, why: "Independence improves defect-finding but guarantees nothing close to finding every defect." },
        { text: "Developers are not capable of writing any useful tests", correct: false, why: "Developers write valuable unit and integration tests; independence complements rather than replaces this." },
        { text: "Independent testing removes the need for the developer to fix defects", correct: false, why: "Independence affects who finds defects, not who fixes them; developers still perform fixes." },
      ],
      explanation: "Independence brings a different perspective and reduces the author bias (confirmation bias) that makes it hard to see defects in one's own work. It complements developer testing rather than replacing it.",
      workplaceExample: "A separate QA analyst reviews the payment module and questions an assumption the developer never doubted - that currency is always GBP - uncovering a defect for multi-currency orders.",
    },

    // ---------------------------------------------------------------
    // Chapter 2 - Testing Throughout the SDLC (~4)
    // ---------------------------------------------------------------
    {
      chapter: "2 - Testing Throughout the SDLC",
      kLevel: "K2",
      question: "In a sequential (V-model) lifecycle, which test level is most directly verified against the requirements specification?",
      options: [
        { text: "Acceptance testing (against user needs) is the highest, but system testing is verified against the system requirements specification", correct: false, why: "Partly right but muddled; the question asks which single level maps to the system requirements specification." },
        { text: "System testing is verified against the system requirements specification", correct: true, why: "Correct. In the V-model, system testing corresponds to and validates the system requirements specification as a whole." },
        { text: "Component testing is verified against the system requirements specification", correct: false, why: "Component testing corresponds to component/detailed design, not the overall system requirements." },
        { text: "Integration testing is verified against the business case", correct: false, why: "Integration testing corresponds to the architectural/interface design, not the business case." },
      ],
      explanation: "In the V-model each development level pairs with a test level: component testing maps to component design, integration testing to system/architecture design, system testing to the system requirements specification, and acceptance testing to user requirements.",
      workplaceExample: "A defence supplier maps its system test suite line-by-line to the system requirements specification so every requirement has traceable coverage for the audit.",
    },
    {
      chapter: "2 - Testing Throughout the SDLC",
      kLevel: "K2",
      question: "A team performs a quick set of tests immediately after a new build is deployed to confirm the critical functions work before deeper testing begins. Which test type is this?",
      options: [
        { text: "Confirmation testing", correct: false, why: "Confirmation testing re-runs tests that previously failed to verify a specific fix, not a broad build-health check." },
        { text: "Smoke testing", correct: true, why: "Correct. A smoke test is a shallow, broad check of critical functionality to decide whether the build is stable enough for further testing." },
        { text: "Regression testing", correct: false, why: "Regression testing checks that unchanged areas still work after changes; it is broader and deeper than a smoke test." },
        { text: "Acceptance testing", correct: false, why: "Acceptance testing validates readiness for business use, not build stability before deeper testing." },
      ],
      explanation: "A smoke test is a small, wide set of tests exercising the most important functions to confirm a build is worth testing further. It is distinct from regression (unchanged-area protection) and confirmation (re-test of a fix).",
      workplaceExample: "The CI pipeline runs a five-minute smoke suite after each nightly deploy; if login, search, and checkout fail, the build is rejected before QA spends a day on it.",
    },
    {
      chapter: "2 - Testing Throughout the SDLC",
      kLevel: "K2",
      question: "Which statement best describes the relationship between confirmation testing and regression testing after a defect is fixed?",
      options: [
        { text: "Confirmation testing verifies the specific fix works; regression testing checks that the change has not broken previously working functionality", correct: true, why: "Correct. Confirmation re-runs the failed case(s) to confirm the fix; regression checks unchanged areas for unintended side effects." },
        { text: "Both terms mean re-running the entire test suite from scratch", correct: false, why: "Neither re-runs everything by definition; confirmation is targeted at the fix, regression is scoped by change impact." },
        { text: "Confirmation testing checks unchanged areas; regression testing verifies the fix", correct: false, why: "This reverses the two definitions." },
        { text: "Regression testing is only needed in Agile, confirmation only in Waterfall", correct: false, why: "Both apply across lifecycles whenever code changes." },
      ],
      explanation: "After a fix, confirmation testing re-executes the tests that previously failed to confirm the defect is resolved. Regression testing then checks that the change did not introduce new defects in areas that previously worked.",
      workplaceExample: "After a fix to the tax calculation, QA re-runs the failing tax case (confirmation) and a targeted suite around invoicing and reporting (regression) to catch side effects.",
    },
    {
      chapter: "2 - Testing Throughout the SDLC",
      kLevel: "K2",
      question: "Shift-left is recommended as good testing practice. Which activity best demonstrates a shift-left approach?",
      options: [
        { text: "Reviewing requirements and writing acceptance criteria and tests before code is written", correct: true, why: "Correct. Shift-left moves testing activities earlier, including static testing of requirements and defining tests up front (for example test-first approaches)." },
        { text: "Adding more testers to the final system test phase", correct: false, why: "Concentrating effort late in the lifecycle is the opposite of shift-left." },
        { text: "Delaying all testing until a stable build exists to avoid rework", correct: false, why: "Delaying testing pushes it right, not left, and increases the cost of late defect discovery." },
        { text: "Running performance tests only in production after release", correct: false, why: "Testing only after release is the latest possible point, the opposite of shift-left." },
      ],
      explanation: "Shift-left means starting testing activities as early as possible - reviewing requirements, defining acceptance criteria, and applying test-first practices - so defects are found and prevented early when they are cheaper to fix.",
      workplaceExample: "Before a story is coded, the three amigos (BA, developer, tester) refine acceptance criteria together, catching an ambiguous rule that would otherwise have surfaced as a defect in system test.",
    },

    // ---------------------------------------------------------------
    // Chapter 3 - Static Testing (~3)
    // ---------------------------------------------------------------
    {
      chapter: "3 - Static Testing",
      kLevel: "K2",
      question: "Which of the following is a key benefit of static testing that dynamic testing cannot provide as effectively?",
      options: [
        { text: "It can find defects in work products such as requirements and design before any code is executed", correct: true, why: "Correct. Static testing examines work products without execution, so it can detect defects (including in documents) earlier than dynamic testing." },
        { text: "It measures the actual response time of the system under load", correct: false, why: "Measuring runtime behaviour such as response time requires dynamic testing (execution)." },
        { text: "It confirms the software behaves correctly when executed by end users", correct: false, why: "Observing execution behaviour is dynamic testing, not static testing." },
        { text: "It replaces the need for any dynamic testing later", correct: false, why: "Static and dynamic testing are complementary; static testing does not remove the need to execute the software." },
      ],
      explanation: "Static testing (reviews and static analysis) examines work products without executing code, so it can find defects very early - including in requirements and design - where dynamic testing cannot reach because there is nothing to run yet.",
      workplaceExample: "A requirements review catches a contradictory refund rule while the feature is still a document, saving the cost of coding, testing, and re-doing it later.",
    },
    {
      chapter: "3 - Static Testing",
      kLevel: "K1",
      question: "In a formal review, which role is responsible for chairing the review and ensuring it runs effectively?",
      options: [
        { text: "The moderator (also called facilitator)", correct: true, why: "Correct. The moderator/facilitator leads the review, mediates, and ensures the process runs effectively." },
        { text: "The author", correct: false, why: "The author created the work product under review and cannot impartially chair the meeting." },
        { text: "The scribe (recorder)", correct: false, why: "The scribe records defects and decisions but does not chair the review." },
        { text: "The manager", correct: false, why: "The manager may decide to hold the review and allocate resources but does not chair the session; in formal reviews managers may even be excluded." },
      ],
      explanation: "The moderator (facilitator) leads the review, ensuring the process is followed and the meeting is productive. Other roles include author, scribe, reviewers, review leader, and management.",
      workplaceExample: "During a design inspection, the moderator keeps discussion focused on finding defects rather than solving them, and stops the meeting from drifting into a design debate.",
    },
    {
      chapter: "3 - Static Testing",
      kLevel: "K2",
      question: "A team wants the most rigorous, documented review type with defined entry/exit criteria, metrics, and a trained leader for a safety-critical specification. Which review type fits best?",
      options: [
        { text: "Informal review", correct: false, why: "Informal reviews have no formal process, documentation, or metrics - the opposite of what is needed here." },
        { text: "Walkthrough", correct: false, why: "A walkthrough is led by the author and is useful for learning and consensus but is not the most formal, metric-driven type." },
        { text: "Inspection", correct: true, why: "Correct. Inspection is the most formal review type, with defined roles, entry/exit criteria, metrics, and a trained leader - suited to safety-critical work." },
        { text: "Technical review that skips entry criteria to save time", correct: false, why: "Skipping entry criteria reduces formality; and a technical review is generally less formal than an inspection." },
      ],
      explanation: "Inspection is the most formal review type: it follows a defined process with roles, entry and exit criteria, checklists, and metrics, and is led by a trained moderator. It suits high-risk or safety-critical work products.",
      workplaceExample: "A medical-device firm inspects its requirements specification with formal entry criteria and defect metrics to satisfy regulatory audit requirements.",
    },

    // ---------------------------------------------------------------
    // Chapter 4 - Test Analysis and Design Techniques (~8, several K3)
    // ---------------------------------------------------------------
    {
      chapter: "4 - Test Techniques",
      kLevel: "K2",
      question: "Which statement correctly distinguishes black-box from white-box test techniques?",
      options: [
        { text: "Black-box techniques derive tests from specifications and behaviour; white-box techniques derive tests from the internal structure or code", correct: true, why: "Correct. Black-box (specification-based) uses the test basis such as requirements; white-box (structure-based) uses code/structure such as statements and branches." },
        { text: "Black-box techniques require source code; white-box techniques require only requirements", correct: false, why: "This reverses the definitions; white-box needs the internal structure, black-box does not." },
        { text: "Black-box techniques can only be manual; white-box techniques can only be automated", correct: false, why: "Both categories can be manual or automated; the distinction is about the basis for deriving tests." },
        { text: "Black-box and white-box are two names for the same experience-based approach", correct: false, why: "They are distinct categories, and neither is the experience-based category." },
      ],
      explanation: "Black-box (specification-based) techniques derive test cases from the test basis (requirements, specifications, models) without reference to internal structure. White-box (structure-based) techniques derive tests from the internal structure, such as statement and branch coverage.",
      workplaceExample: "A tester designs black-box cases from the acceptance criteria for a login screen, while a developer adds white-box tests to ensure every branch of the password-strength function is exercised.",
    },
    {
      chapter: "4 - Test Techniques",
      kLevel: "K3",
      question: "A field accepts an integer age from 18 to 65 inclusive. Age below 18 is rejected, and age above 65 is rejected. Using two-value boundary value analysis, which set of values tests the boundaries of the valid partition?",
      options: [
        { text: "17, 18, 65, 66", correct: true, why: "Correct. Two-value BVA uses each boundary and its nearest neighbour: 17/18 at the lower boundary and 65/66 at the upper boundary." },
        { text: "0, 18, 65, 100", correct: false, why: "0 and 100 are arbitrary partition members, not boundary neighbours; they do not exercise the exact boundaries." },
        { text: "18, 19, 64, 65", correct: false, why: "These are all inside the valid range; two-value BVA must include the just-outside neighbours 17 and 66." },
        { text: "16, 17, 66, 67", correct: false, why: "These miss the actual valid boundaries 18 and 65 entirely." },
      ],
      explanation: "The valid partition is 18 to 65. In two-value (2-point) boundary value analysis you test each boundary value and its nearest neighbour on the other side: 17 and 18 for the lower boundary, 65 and 66 for the upper boundary.",
      workplaceExample: "For an insurance eligibility field (18-65), the tester runs 17, 18, 65, and 66 to prove the system accepts and rejects exactly at the correct edges.",
    },
    {
      chapter: "4 - Test Techniques",
      kLevel: "K3",
      question: "A discount field accepts percentages: 0-10 gives no discount, 11-50 gives a standard discount, 51-100 gives a premium discount. Values below 0 or above 100 are invalid. Using equivalence partitioning, how many equivalence partitions exist (valid and invalid combined)?",
      options: [
        { text: "5", correct: true, why: "Correct. Three valid partitions (0-10, 11-50, 51-100) plus two invalid partitions (below 0, above 100) equals five." },
        { text: "3", correct: false, why: "This counts only the valid partitions and omits the two invalid partitions." },
        { text: "4", correct: false, why: "This misses one partition; there are three valid and two invalid partitions." },
        { text: "6", correct: false, why: "There is no sixth partition here; the ranges given define exactly five." },
      ],
      explanation: "Equivalence partitioning divides input into groups expected to behave the same. Valid: 0-10, 11-50, 51-100 (three). Invalid: less than 0 and greater than 100 (two). Total = 5 partitions. One representative value from each gives baseline coverage.",
      workplaceExample: "A pricing engine tester picks one value from each of the five partitions (for example -5, 5, 30, 75, 150) to cover all discount behaviours plus both invalid ranges with just five cases.",
    },
    {
      chapter: "4 - Test Techniques",
      kLevel: "K3",
      question: "A decision table has 3 independent boolean conditions (each true or false). Before any rule optimisation, how many rules (columns) does the full table contain?",
      options: [
        { text: "8", correct: true, why: "Correct. With n independent boolean conditions the full table has 2^n columns; 2^3 = 8." },
        { text: "6", correct: false, why: "6 would be 3 conditions times 2, which is not how combinations are counted; it should be 2 to the power of 3." },
        { text: "9", correct: false, why: "9 is 3 squared; the correct formula is 2 to the power of the number of conditions, not conditions squared." },
        { text: "3", correct: false, why: "3 is the number of conditions, not the number of rule combinations." },
      ],
      explanation: "A full decision table enumerates every combination of condition outcomes. For n independent boolean conditions there are 2^n combinations, so 3 conditions produce 2^3 = 8 rules before any collapsing of redundant columns.",
      workplaceExample: "A loan-eligibility feature has three yes/no flags (employed, good credit, has deposit); the analyst builds all 8 decision-table rules to be sure no combination of the three flags is left untested.",
    },
    {
      chapter: "4 - Test Techniques",
      kLevel: "K3",
      question: "A module contains 10 executable statements. A test suite executes 7 of them. What is the statement coverage achieved?",
      options: [
        { text: "70 percent", correct: true, why: "Correct. Statement coverage = (statements exercised / total statements) x 100 = 7/10 x 100 = 70 percent." },
        { text: "7 percent", correct: false, why: "This forgets to multiply the ratio 7/10 by 100." },
        { text: "30 percent", correct: false, why: "30 percent is the proportion NOT covered (3/10), not the coverage achieved." },
        { text: "100 percent", correct: false, why: "100 percent would require all 10 statements to be executed, but only 7 were." },
      ],
      explanation: "Statement coverage = number of statements executed divided by total number of executable statements, times 100. Here 7/10 = 0.7, so 70 percent. To reach 100 percent, the remaining 3 statements must also be exercised.",
      workplaceExample: "A coverage report shows a payment function at 70 percent statement coverage; the developer adds a test for the refund path to exercise the three untouched statements and reach 100 percent.",
    },
    {
      chapter: "4 - Test Techniques",
      kLevel: "K3",
      question: "For a single IF statement with a compound condition, a test suite achieves 100 percent statement coverage but only executes the true branch. Which statement about branch (decision) coverage is correct?",
      options: [
        { text: "Branch coverage is not yet 100 percent because the false outcome of the decision has not been exercised", correct: true, why: "Correct. Branch/decision coverage requires both the true and false outcomes; executing only the true branch leaves the false branch uncovered." },
        { text: "Branch coverage is automatically 100 percent because statement coverage is 100 percent", correct: false, why: "100 percent statement coverage does not guarantee 100 percent branch coverage; an IF with no else can be fully covered by statements while its false branch is never taken." },
        { text: "Branch coverage is irrelevant once statement coverage reaches 100 percent", correct: false, why: "Branch coverage is a stronger criterion; it remains relevant and is not subsumed by statement coverage." },
        { text: "Branch coverage of 50 percent proves statement coverage must be below 100 percent", correct: false, why: "Statement and branch coverage are different metrics; one being below 100 does not force the other below 100." },
      ],
      explanation: "Branch (decision) coverage requires every decision outcome (true and false) to be exercised. 100 percent branch coverage guarantees 100 percent statement coverage, but not the reverse: you can execute every statement while never taking the false path of a decision.",
      workplaceExample: "A developer sees 100 percent statement coverage but a code review flags that the else-less validation check never runs its false path, so a case is added to exercise invalid input and lift branch coverage.",
    },
    {
      chapter: "4 - Test Techniques",
      kLevel: "K2",
      question: "Which description best characterises exploratory testing as an experience-based technique?",
      options: [
        { text: "Simultaneous learning, test design, and test execution, guided by the tester's experience and often organised with charters or session sheets", correct: true, why: "Correct. Exploratory testing interleaves learning, design, and execution, steered by tester skill and commonly structured via charters/session-based test management." },
        { text: "A fully scripted technique where every step is written in advance and followed exactly", correct: false, why: "Pre-scripting every step is scripted testing, not exploratory testing." },
        { text: "A structure-based technique that measures branch coverage of the code", correct: false, why: "Coverage measurement of code structure is a white-box technique, not experience-based exploratory testing." },
        { text: "A technique that requires no tester knowledge or skill to be effective", correct: false, why: "Exploratory testing depends heavily on tester experience and skill; it is not skill-free." },
      ],
      explanation: "Exploratory testing is experience-based: the tester learns the product, designs, and runs tests at the same time, using skill and intuition. It is often organised with test charters and session-based test management to keep it accountable.",
      workplaceExample: "Given a new dashboard and a 90-minute charter, a senior tester explores filter combinations and edge inputs, logging findings as they go, and uncovers a defect no scripted case anticipated.",
    },
    {
      chapter: "4 - Test Techniques",
      kLevel: "K2",
      question: "A tester lists likely problem areas from past projects - null inputs, boundary off-by-ones, and concurrency clashes - and targets them directly. Which experience-based technique is this?",
      options: [
        { text: "Error guessing", correct: true, why: "Correct. Error guessing uses the tester's experience of where defects commonly occur to anticipate and target likely failures." },
        { text: "Equivalence partitioning", correct: false, why: "Equivalence partitioning is a specification-based technique dividing inputs into classes, not experience-based guessing." },
        { text: "Statement coverage", correct: false, why: "Statement coverage is a structure-based (white-box) measure, not an experience-based technique." },
        { text: "State transition testing", correct: false, why: "State transition testing is specification-based, modelling states and transitions, not experience-driven guessing." },
      ],
      explanation: "Error guessing is an experience-based technique in which the tester uses knowledge of typical mistakes, defect history, and product weaknesses to predict and target where failures are likely.",
      workplaceExample: "Having seen many date-handling bugs, a tester deliberately probes 29 February, timezone rollovers, and empty date fields on a new booking form before writing any formal cases.",
    },

    // ---------------------------------------------------------------
    // Chapter 5 - Managing the Test Activities (~8, several K3)
    // ---------------------------------------------------------------
    {
      chapter: "5 - Managing the Test Activities",
      kLevel: "K2",
      question: "Which pairing correctly relates the two components used to calculate the level of a product risk?",
      options: [
        { text: "Likelihood of the risk occurring and the impact (harm) if it does occur", correct: true, why: "Correct. Risk level is a function of the probability of occurrence and the impact/consequences if it materialises." },
        { text: "Number of test cases and the number of testers available", correct: false, why: "Team and test-case counts are capacity factors, not the definition of risk level." },
        { text: "Code coverage percentage and defect density", correct: false, why: "These are quality metrics, not the two components of risk level." },
        { text: "Sprint length and story point total", correct: false, why: "These relate to planning velocity, not to risk level." },
      ],
      explanation: "Risk level combines the likelihood (probability) that a negative event occurs with the impact (severity of harm) if it does. Risk-based testing prioritises effort toward items with the highest combined risk.",
      workplaceExample: "The team rates the payment gateway as high risk (moderate likelihood but severe financial impact) and allocates the most test effort there, while a rarely used admin report gets a lighter touch.",
    },
    {
      chapter: "5 - Managing the Test Activities",
      kLevel: "K2",
      question: "Which of the following is a valid product risk rather than a project risk?",
      options: [
        { text: "The checkout may miscalculate tax and overcharge customers", correct: true, why: "Correct. A product risk relates to a potential quality problem in the delivered product itself, such as a functional defect harming users." },
        { text: "A key tester may leave mid-project, delaying delivery", correct: false, why: "Staffing loss threatens the project's progress; that is a project risk, not a product risk." },
        { text: "The test environment may not be ready on the planned date", correct: false, why: "Environment delivery delay is a project risk affecting the ability to run testing, not a defect in the product." },
        { text: "The vendor may deliver the third-party API late", correct: false, why: "A late supplier is a project risk affecting the schedule, not a quality flaw in the product." },
      ],
      explanation: "Product risks concern the quality of the work product (for example a functional or performance defect that could harm users). Project risks concern managing the project itself (staffing, schedule, environments, suppliers).",
      workplaceExample: "In risk planning, 'tax miscalculation at checkout' goes on the product-risk register and drives extra test design, while 'environment not ready' goes on the project-risk register and drives a mitigation plan with infrastructure.",
    },
    {
      chapter: "5 - Managing the Test Activities",
      kLevel: "K3",
      question: "A test plan estimates 200 test cases. On the last day of week 1, the team has run 120 cases, of which 90 passed and 30 failed. What is the test case execution progress (percentage of planned cases run)?",
      options: [
        { text: "60 percent", correct: true, why: "Correct. Execution progress = cases run / cases planned x 100 = 120/200 x 100 = 60 percent." },
        { text: "45 percent", correct: false, why: "45 percent (90/200) counts only passed cases; execution progress counts all cases run, passed or failed." },
        { text: "75 percent", correct: false, why: "75 percent (90/120) is the pass rate of executed cases, not progress against the plan." },
        { text: "15 percent", correct: false, why: "15 percent (30/200) counts only failed cases, which is not execution progress." },
      ],
      explanation: "Execution progress against the plan = number of test cases executed divided by total planned, times 100. Here 120 of 200 have been run, so 60 percent. Pass rate (90/120 = 75 percent) is a separate metric.",
      workplaceExample: "The test lead's daily dashboard reports 60 percent execution progress and a 75 percent pass rate, letting the manager see both how far testing has got and how healthy the results are.",
    },
    {
      chapter: "5 - Managing the Test Activities",
      kLevel: "K2",
      question: "Which item belongs in the entry criteria (definition of ready) for starting a test execution phase rather than in the exit criteria?",
      options: [
        { text: "A stable, deployed test environment and a testable build are available", correct: true, why: "Correct. Availability of a testable build and a working environment is a precondition to start execution - an entry criterion." },
        { text: "All planned high-priority test cases have been executed", correct: false, why: "Completing planned execution is an exit criterion, assessed at the end, not a precondition to start." },
        { text: "The number of open critical defects is below the agreed threshold", correct: false, why: "A defect threshold is typically an exit/completion criterion for deciding readiness to release." },
        { text: "The test summary report has been signed off", correct: false, why: "A signed test summary report is a completion output, not an entry criterion." },
      ],
      explanation: "Entry criteria (definition of ready) are preconditions that must hold before an activity begins - such as a testable build and a stable environment. Exit criteria (definition of done) are conditions to declare the activity complete - such as execution completeness and defect thresholds.",
      workplaceExample: "The team refuses to start system test until the entry criteria are met - a deployed build in the staging environment - avoiding wasted effort testing a half-built release.",
    },
    {
      chapter: "5 - Managing the Test Activities",
      kLevel: "K3",
      question: "A defect report should enable a developer to reproduce and fix the problem. Which combination is the minimum essential content for a well-formed defect report?",
      options: [
        { text: "A unique identifier, clear steps to reproduce, expected result, actual result, and severity/priority", correct: true, why: "Correct. Reproduction steps plus expected vs actual behaviour, an ID, and severity/priority are core to an actionable defect report." },
        { text: "Only a short title such as 'checkout broken' with no further detail", correct: false, why: "A title alone is not reproducible or actionable and lacks expected/actual results." },
        { text: "The name of the developer to blame and the date", correct: false, why: "Assigning blame is not part of a defect report and does not help reproduction; this omits reproduction steps and results." },
        { text: "A screenshot only, with no steps or expected behaviour", correct: false, why: "A screenshot helps but without steps and expected/actual results the defect may not be reproducible." },
      ],
      explanation: "A good defect report is reproducible and actionable: a unique ID, clear steps to reproduce, the expected result, the actual result, and an assessment of severity/priority (often with environment and evidence). This lets a developer confirm and fix it efficiently.",
      workplaceExample: "A tester logs 'DEF-482: Apply 10 percent coupon at checkout; expected total 90, actual total 100; Severity High' with steps and a screenshot, and the developer reproduces it on the first try.",
    },
    {
      chapter: "5 - Managing the Test Activities",
      kLevel: "K2",
      question: "In risk-based testing, how should the results of a product risk analysis influence the test approach?",
      options: [
        { text: "Higher-risk items receive earlier, deeper, and more thorough testing than lower-risk items", correct: true, why: "Correct. Risk-based testing allocates more and earlier effort and rigour to higher-risk areas, and less to lower-risk ones." },
        { text: "All items are tested to exactly the same depth regardless of risk", correct: false, why: "Uniform depth ignores risk analysis and wastes effort; risk-based testing deliberately varies depth by risk." },
        { text: "Only the lowest-risk items are tested to save time on the hard parts", correct: false, why: "This inverts the principle; the highest-risk items must get the most attention." },
        { text: "Risk analysis is used only for reporting and never changes what is tested", correct: false, why: "Risk analysis should actively shape prioritisation, sequencing, and depth of testing, not just reporting." },
      ],
      explanation: "Risk-based testing uses the product risk analysis to prioritise: high-risk areas are tested earlier, more deeply, and with more rigorous techniques, while low-risk areas receive lighter coverage. This focuses limited effort where failure would hurt most.",
      workplaceExample: "With two weeks left, the lead front-loads testing of the high-risk payments and authentication flows and defers exhaustive testing of a low-traffic settings page.",
    },
    {
      chapter: "5 - Managing the Test Activities",
      kLevel: "K1",
      question: "Which document communicates the scope, approach, resources, and schedule of intended test activities and is a primary planning work product?",
      options: [
        { text: "Test plan", correct: true, why: "Correct. The test plan documents scope, objectives, approach, resources, schedule, and criteria for the test effort." },
        { text: "Test summary report", correct: false, why: "The test summary report communicates results at the end of testing, not the planned approach up front." },
        { text: "Defect report", correct: false, why: "A defect report documents a single anomaly, not the overall test approach and schedule." },
        { text: "Test case specification", correct: false, why: "A test case specification defines specific inputs and expected results, not the overall scope, resources, and schedule." },
      ],
      explanation: "The test plan is the primary planning artefact: it sets out the scope, objectives, approach, resources, schedule, and entry/exit criteria for the testing effort, aligning the team and stakeholders.",
      workplaceExample: "Before a release, the test manager circulates a one-page test plan stating what is in and out of scope, the environments needed, the timeline, and the exit criteria for go-live.",
    },
    {
      chapter: "5 - Managing the Test Activities",
      kLevel: "K3",
      question: "A team ran 500 test cases; 460 passed and 40 failed. Of the 40 failures, 32 have since been fixed and confirmed passing. What is the current pass rate across all 500 planned test cases at this point?",
      options: [
        { text: "98.4 percent", correct: true, why: "Correct. Now passing = 460 + 32 confirmed fixes = 492; 492/500 x 100 = 98.4 percent." },
        { text: "92 percent", correct: false, why: "92 percent (460/500) ignores the 32 defects that were fixed and re-confirmed as passing." },
        { text: "80 percent", correct: false, why: "80 percent (32/40) is the proportion of failures fixed, not the overall pass rate." },
        { text: "100 percent", correct: false, why: "100 percent would require all 500 to pass, but 8 failures (40 - 32) remain unresolved." },
      ],
      explanation: "Pass rate = passing cases / total cases x 100. Originally 460 passed; 32 of the 40 failures were fixed and re-confirmed, so 492 now pass. 492/500 = 98.4 percent, with 8 cases still failing.",
      workplaceExample: "The test lead updates the go/no-go dashboard to show 98.4 percent passing after re-testing fixes, and flags the 8 outstanding failures so the release board can weigh them against the exit criteria.",
    },

    // ---------------------------------------------------------------
    // Chapter 6 - Test Tools (~3)
    // ---------------------------------------------------------------
    {
      chapter: "6 - Test Tools",
      kLevel: "K2",
      question: "A common risk of introducing test automation tools is over-reliance and unrealistic expectations. Which statement best reflects a realistic view of a test execution tool?",
      options: [
        { text: "A tool automates the execution of predefined tests but does not replace the thinking involved in test design and analysis", correct: true, why: "Correct. Tools execute what is scripted; they do not conceive good tests or judge risk - human analysis and design remain essential." },
        { text: "Once automated, tests never need maintenance even as the application changes", correct: false, why: "Automated tests require ongoing maintenance as the application evolves; assuming otherwise is a classic pitfall." },
        { text: "Buying a tool guarantees improved product quality by itself", correct: false, why: "A tool is only as good as how it is used; purchase alone does not improve quality." },
        { text: "Automation makes exploratory and experience-based testing unnecessary", correct: false, why: "Automation excels at repeatable checks but cannot replace human exploration and judgment." },
      ],
      explanation: "Test execution tools run predefined, scripted tests reliably and repeatably, but they do not design tests, assess risk, or exercise judgment. Expecting a tool to replace skilled testing - or to be maintenance-free - leads to disappointment.",
      workplaceExample: "After buying an automation suite, a team is reminded that the tool only runs the scripts testers design; they still invest in test analysis and keep exploratory sessions for new features.",
    },
    {
      chapter: "6 - Test Tools",
      kLevel: "K2",
      question: "Which testing activity is the strongest candidate for automation to gain the most benefit?",
      options: [
        { text: "Frequently repeated, stable regression checks that are run on every build", correct: true, why: "Correct. Repetitive, stable, high-frequency checks (like regression in CI) give the best return on automation investment." },
        { text: "A one-off usability assessment based on subjective human judgment", correct: false, why: "Usability judgments are subjective and infrequent; automation is a poor fit." },
        { text: "Early exploratory testing of a brand-new, rapidly changing feature", correct: false, why: "Rapidly changing, exploratory work is unstable and human-judgment-heavy; automating it early causes high maintenance for little value." },
        { text: "A single ad-hoc check that will never be repeated", correct: false, why: "Automating a one-time check costs more to build than it saves; automation pays off through repetition." },
      ],
      explanation: "Automation delivers the most value for tests that are stable and run repeatedly and frequently - classic regression suites in a CI pipeline. Volatile, subjective, or one-off tests give poor return on the automation investment.",
      workplaceExample: "The team automates its 300-case regression suite so it runs on every merge in minutes, freeing testers to explore new features rather than re-clicking the same checks daily.",
    },
    {
      chapter: "6 - Test Tools",
      kLevel: "K2",
      question: "When integrating a test tool into an organisation, which practice best reduces the risk of a failed rollout?",
      options: [
        { text: "Run a pilot project to evaluate the tool and adapt processes before wider rollout", correct: true, why: "Correct. A pilot lets the team learn the tool, assess fit, and refine processes and coaching before scaling, reducing rollout risk." },
        { text: "Mandate immediate organisation-wide adoption with no evaluation period", correct: false, why: "Big-bang adoption without evaluation is a well-known cause of failed tool initiatives." },
        { text: "Assume the default settings suit every team so no configuration is needed", correct: false, why: "Tools usually need tailoring to the organisation's processes; assuming defaults fit all is risky." },
        { text: "Skip any training because good tools are self-explanatory", correct: false, why: "Lack of training and coaching is a common reason tool adoption fails; skilling up the team is essential." },
      ],
      explanation: "Successful tool introduction typically starts with a pilot to evaluate fit, learn the tool, adapt processes and standards, and estimate costs and benefits, followed by phased rollout with training, mentoring, and defined ways of working.",
      workplaceExample: "Before rolling out a new automation framework firm-wide, one squad pilots it for a quarter, documents conventions and gotchas, and coaches the other squads during a staged rollout.",
    },
  ],
};
