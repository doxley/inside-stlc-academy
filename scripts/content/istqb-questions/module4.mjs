// ISTQB Foundation Masterclass (CTFL v4.0) — Practice question set.
// Module 4: Test Analysis & Design Techniques.
// 30 questions, application-heavy (many K3 "work it out" items).
// Straight ASCII quotes/apostrophes only; single default export; no imports.
export default {
  courseSlug: "istqb-foundation-masterclass",
  moduleNumber: 4,
  syllabusTopic: "Test Analysis & Design Techniques",
  questions: [
    // 1 — K1 categories
    {
      kLevel: "K1",
      questionText: "Which statement correctly describes the three categories of test techniques in the ISTQB syllabus?",
      options: [
        { text: "Black-box, white-box, and experience-based techniques.", correct: true, why: "These are exactly the three categories: black-box (specification-based), white-box (structure-based), and experience-based." },
        { text: "Functional, non-functional, and regression techniques.", correct: false, why: "These are types of testing, not the syllabus categories of test design techniques." },
        { text: "Static, dynamic, and confirmation techniques.", correct: false, why: "Static and dynamic describe testing kinds, and confirmation is a re-test purpose, not a technique category." },
        { text: "Manual, automated, and exploratory techniques.", correct: false, why: "Manual and automated describe execution method; only experience-based (which includes exploratory) is a real category." },
      ],
      explanation: "The syllabus groups test techniques into black-box (based on a specification or model of the test object without reference to internal structure), white-box (based on the internal structure or implementation), and experience-based (drawing on the tester's knowledge and experience).",
      workplaceExample: "When planning a sprint, a QA lead maps each technique to a category on the test plan: EP and boundary analysis under black-box, statement coverage under white-box, and an exploratory session under experience-based, so reviewers can see the coverage is balanced.",
    },
    // 2 — K2 black-box characteristic
    {
      kLevel: "K2",
      questionText: "What is the defining characteristic of black-box test techniques?",
      options: [
        { text: "Test cases are derived from the specification or a model of the test object, without reference to its internal code structure.", correct: true, why: "Black-box (specification-based) techniques work from requirements, models, and behaviour, not from the source code." },
        { text: "Test cases are derived from the control flow of the source code.", correct: false, why: "That describes white-box (structure-based) techniques." },
        { text: "Test cases rely mainly on the tester's intuition and past defect experience.", correct: false, why: "That describes experience-based techniques such as error guessing." },
        { text: "Test cases are always automated at the unit level.", correct: false, why: "Automation and test level are unrelated to whether a technique is black-box." },
      ],
      explanation: "Black-box techniques treat the test object as a closed box: coverage is measured against the specification (partitions, boundaries, decision rules, states), so they can be applied at any test level and need no access to code.",
      workplaceExample: "A tester with no access to a payment gateway's source still writes thorough tests by partitioning the amount field and building a decision table from the business rules in the requirements document.",
    },
    // 3 — K2 white-box value
    {
      kLevel: "K2",
      questionText: "Which is a genuine benefit of white-box testing that black-box testing cannot provide?",
      options: [
        { text: "It can reveal code that is never executed by the black-box tests, such as unreachable or untested branches.", correct: true, why: "Structural coverage measurement exposes code the specification-based tests never reach." },
        { text: "It guarantees the software meets all user requirements.", correct: false, why: "Full structural coverage says nothing about whether requirements are correct or complete." },
        { text: "It removes the need for any specification-based tests.", correct: false, why: "White-box and black-box are complementary; structural coverage does not check specified behaviour." },
        { text: "It always finds more defects than any black-box technique.", correct: false, why: "There is no such guarantee; the techniques find different classes of defect." },
      ],
      explanation: "White-box testing measures how much of the code structure has been exercised, so it can find gaps (untested statements or branches) that black-box tests, which only follow the specification, may leave unexecuted.",
      workplaceExample: "After a suite of requirement-based tests passes, a developer runs coverage tooling and finds an error-handling branch at 0% coverage, revealing a path the specification-based tests never triggered.",
    },
    // 4 — K3 EP partition count
    {
      kLevel: "K3",
      questionText: "A field accepts integers in the range 1 to 100 inclusive. Using equivalence partitioning on the value alone, how many partitions exist and how many are invalid?",
      options: [
        { text: "3 partitions, 2 of which are invalid.", correct: true, why: "One valid partition (1-100) and two invalid partitions (less than 1, and greater than 100)." },
        { text: "2 partitions, 1 of which is invalid.", correct: false, why: "This ignores that there are two separate invalid ranges: below 1 and above 100." },
        { text: "4 partitions, 2 of which are invalid.", correct: false, why: "There is only one valid partition here, so the total is 3, not 4." },
        { text: "100 partitions, 0 of which are invalid.", correct: false, why: "EP replaces the 100 individual values with a single valid partition; it does not create one partition per value." },
      ],
      explanation: "Equivalence partitioning gives one valid partition (1-100) and two invalid partitions (below the minimum and above the maximum). Three partitions total, two invalid.",
      workplaceExample: "A tester documents three test cases for a quantity field (values 50, 0, and 150) and tells the reviewer that this covers every distinct value-based behaviour, which is far more defensible than trying many arbitrary numbers.",
    },
    // 5 — K3 EP pick representative
    {
      kLevel: "K3",
      questionText: "An age field grants a discount for ages 60 to 74 inclusive. Which single set of values gives one representative from each value-based partition (below, valid, above)?",
      options: [
        { text: "45, 67, 80.", correct: true, why: "45 is in the below partition, 67 is inside 60-74, and 80 is in the above partition: one value per partition." },
        { text: "60, 67, 74.", correct: false, why: "All three fall inside the valid partition, so two invalid partitions are untested." },
        { text: "59, 60, 61.", correct: false, why: "These are boundary-focused values, not one representative per equivalence partition." },
        { text: "45, 50, 55.", correct: false, why: "All three are in the below partition; the valid and above partitions are untested." },
      ],
      explanation: "Equivalence partitioning requires one representative value per partition. The three partitions are below 60, 60-74 (valid), and above 74; values such as 45, 67, and 80 cover them.",
      workplaceExample: "Building test data for a seniors' discount, a tester picks 45, 67, and 80 so each partition is exercised once, avoiding a dozen redundant values that all sit inside the valid band.",
    },
    // 6 — K3 BVA 2-value
    {
      kLevel: "K3",
      questionText: "A field accepts values from 1 to 100 inclusive. Using the 2-value boundary approach, which values should be tested?",
      options: [
        { text: "0, 1, 100, 101.", correct: true, why: "The 2-value approach tests each boundary and its nearest neighbour on the other side: 0 and 1 at the lower edge, 100 and 101 at the upper edge." },
        { text: "1, 2, 99, 100.", correct: false, why: "These are the boundary and its inner neighbour; the 2-value approach uses the boundary and the outer neighbour (0 and 101)." },
        { text: "0, 1, 2, 99, 100, 101.", correct: false, why: "That is the 3-value approach, which adds the second inner neighbour at each boundary." },
        { text: "1, 100.", correct: false, why: "This tests only the boundaries themselves, missing the neighbouring values that catch off-by-one defects." },
      ],
      explanation: "In the 2-value boundary approach you test the boundary value and its nearest neighbour just outside the partition. For 1-100 the boundaries are 1 and 100, giving the set 0, 1, 100, 101.",
      workplaceExample: "A tester validating a 1-100 percentage field enters 0, 1, 100, and 101 to catch a classic off-by-one where the developer coded a > check instead of >=.",
    },
    // 7 — K3 BVA 3-value
    {
      kLevel: "K3",
      questionText: "A valid range is 1 to 100 inclusive. Which values are the correct 3-value boundaries for the LOWER boundary only?",
      options: [
        { text: "0, 1, 2.", correct: true, why: "The 3-value approach tests the boundary (1) plus both neighbours (0 just below, 2 just above)." },
        { text: "0, 1.", correct: false, why: "That is the 2-value set; the 3-value approach adds the inner neighbour 2." },
        { text: "1, 2, 3.", correct: false, why: "This omits 0, the value just outside the partition, which is essential to the 3-value set." },
        { text: "99, 100, 101.", correct: false, why: "That is the upper boundary's 3-value set, not the lower boundary." },
      ],
      explanation: "The 3-value boundary approach tests the boundary value and both of its neighbours. For the lower boundary of 1, that is 0, 1, and 2.",
      workplaceExample: "For a login lockout that triggers after the first failed attempt (boundary 1), a tester exercises 0, 1, and 2 failed attempts to prove the counter fires on exactly the right attempt.",
    },
    // 8 — K3 BVA both boundaries 3-value full set
    {
      kLevel: "K3",
      questionText: "A withdrawal amount must be between 10 and 500 inclusive. Using the 3-value boundary approach, how many distinct boundary test values are there in total?",
      options: [
        { text: "6.", correct: true, why: "Lower boundary gives 9, 10, 11 and upper gives 499, 500, 501: six distinct values." },
        { text: "4.", correct: false, why: "Four would be the 2-value approach (9, 10, 499, 500... actually 9, 10, 500, 501)." },
        { text: "3.", correct: false, why: "Three values cover only one boundary, not both." },
        { text: "8.", correct: false, why: "There are only two boundaries, each contributing three values, giving six, not eight." },
      ],
      explanation: "The 3-value approach tests each boundary and both neighbours. Lower boundary 10 gives 9, 10, 11; upper boundary 500 gives 499, 500, 501. Six distinct values because the two boundaries do not overlap.",
      workplaceExample: "An ATM tester lists exactly six amounts (9, 10, 11, 499, 500, 501) as the boundary cases for the withdrawal limit, giving a tidy, defensible boundary matrix in the test design.",
    },
    // 9 — K2 BVA 2 vs 3 confusion
    {
      kLevel: "K2",
      questionText: "How does the 3-value boundary approach differ from the 2-value boundary approach?",
      options: [
        { text: "The 3-value approach tests the boundary plus both neighbours, whereas the 2-value approach tests the boundary plus only its nearest neighbour on the other side.", correct: true, why: "This is the precise distinction: three points per boundary versus two." },
        { text: "The 3-value approach tests three partitions while the 2-value approach tests two partitions.", correct: false, why: "The number refers to values tested per boundary, not the number of partitions." },
        { text: "The 3-value approach is only used for output boundaries and the 2-value only for input boundaries.", correct: false, why: "Both approaches apply to input or output boundaries; the difference is how many values per boundary." },
        { text: "The 2-value approach always subsumes the 3-value approach.", correct: false, why: "It is the reverse: the 3-value set includes the 2-value points and adds one more per boundary." },
      ],
      explanation: "For a single boundary, the 2-value approach tests the boundary and its nearest neighbour just outside; the 3-value approach additionally tests the neighbour just inside, making three values per boundary.",
      workplaceExample: "A test lead chooses the 3-value approach for a safety-critical dosage limit because the extra inner-neighbour value gives stronger evidence that the exact edge behaves correctly.",
    },
    // 10 — K3 Decision table rule count
    {
      kLevel: "K3",
      questionText: "A decision table has 3 independent Boolean conditions, each of which can be true or false. How many rules (columns) does the full decision table contain before any collapsing?",
      options: [
        { text: "8.", correct: true, why: "With n Boolean conditions the full table has 2^n rules; 2^3 = 8." },
        { text: "6.", correct: false, why: "6 is 3 conditions times 2, a common miscount; the correct formula is 2^n, giving 8." },
        { text: "3.", correct: false, why: "3 is the number of conditions, not the number of rule combinations." },
        { text: "9.", correct: false, why: "9 is 3 squared; the correct formula is 2 to the power of the number of conditions, which is 8." },
      ],
      explanation: "A full decision table with n binary conditions has 2^n rules, one per unique combination. For 3 conditions that is 2 x 2 x 2 = 8 rules.",
      workplaceExample: "Modelling a loan approval with three yes/no checks (credit ok, income ok, no defaults), an analyst draws all eight rule columns first, then collapses the impossible or redundant ones for the final test set.",
    },
    // 11 — K3 Decision table 4 conditions
    {
      kLevel: "K3",
      questionText: "A pricing rule depends on 4 independent Boolean conditions. What is the maximum number of rules in the full (uncollapsed) decision table?",
      options: [
        { text: "16.", correct: true, why: "2^4 = 16 unique combinations of four true/false conditions." },
        { text: "8.", correct: false, why: "8 is 2^3, correct for three conditions, not four." },
        { text: "4.", correct: false, why: "4 is the number of conditions, not the combinations." },
        { text: "32.", correct: false, why: "32 is 2^5; four conditions give 2^4 = 16." },
      ],
      explanation: "The maximum number of rules for n binary conditions is 2^n. For 4 conditions the full table has 2^4 = 16 columns.",
      workplaceExample: "Before testing a promotional engine with four boolean flags, a tester notes that a complete table needs 16 columns, then applies business logic to remove combinations that cannot occur in practice.",
    },
    // 12 — K3 Decision table identify a test
    {
      kLevel: "K3",
      questionText: "A shipping rule says: free shipping applies only if the customer is a member AND the order total is over 50. For a non-member with an order total of 70, what result should the corresponding decision-table rule produce?",
      options: [
        { text: "No free shipping, because the member condition is false even though the total condition is true.", correct: true, why: "The rule uses AND, so both conditions must be true; a false member condition means the action does not fire." },
        { text: "Free shipping, because the order total is over 50.", correct: false, why: "The total condition alone is not enough; the AND requires membership too." },
        { text: "Free shipping, because at least one condition is true.", correct: false, why: "AND requires all conditions true, not at least one; that would be OR." },
        { text: "The rule is invalid and cannot be evaluated.", correct: false, why: "The combination member=false, total>50=true is a perfectly valid rule that yields no free shipping." },
      ],
      explanation: "With an AND condition, both member and total-over-50 must be true for the free-shipping action to fire. A non-member (member=false) fails the AND regardless of the total, so the action is not taken.",
      workplaceExample: "Testing a checkout, a QA engineer confirms that a guest (non-member) with an 80 basket is still charged shipping, matching the decision-table rule where the membership condition is false.",
    },
    // 13 — K2 decision table purpose
    {
      kLevel: "K2",
      questionText: "What is the primary purpose of decision table testing?",
      options: [
        { text: "To systematically test combinations of conditions and the actions they produce.", correct: true, why: "Decision tables capture how combinations of conditions map to actions, ensuring each relevant combination is covered." },
        { text: "To measure how many statements in the code have been executed.", correct: false, why: "That is statement coverage, a white-box measure, not decision table testing." },
        { text: "To model the valid and invalid transitions between system states.", correct: false, why: "That is state transition testing, a different black-box technique." },
        { text: "To test the boundaries of an input range.", correct: false, why: "That is boundary value analysis, not decision table testing." },
      ],
      explanation: "Decision table testing is a black-box technique for combinations of conditions. Each column (rule) is a unique combination of condition outcomes with its resulting actions, making it ideal for complex business logic.",
      workplaceExample: "For an insurance quote engine with interacting eligibility rules, a tester builds a decision table so every combination of age band, region, and claim history is deliberately covered rather than guessed at.",
    },
    // 14 — K3 State transition valid/invalid
    {
      kLevel: "K3",
      questionText: "A media player has states Stopped, Playing, and Paused. Valid events: Play (Stopped to Playing), Pause (Playing to Paused), Resume (Paused to Playing), Stop (Playing or Paused to Stopped). Which of the following is an INVALID transition?",
      options: [
        { text: "Pause event while in the Stopped state.", correct: true, why: "Pause is only defined from Playing; issuing Pause while Stopped is an invalid (undefined) transition." },
        { text: "Play event while in the Stopped state.", correct: false, why: "Play from Stopped to Playing is a defined valid transition." },
        { text: "Resume event while in the Paused state.", correct: false, why: "Resume from Paused to Playing is a defined valid transition." },
        { text: "Stop event while in the Paused state.", correct: false, why: "Stop from Paused to Stopped is a defined valid transition." },
      ],
      explanation: "A transition is valid only if the state table defines the event for the current state. Pause is defined only from Playing, so a Pause event received while Stopped is an invalid transition to test for robustness.",
      workplaceExample: "A tester deliberately presses Pause on a stopped player to confirm it is ignored gracefully rather than crashing, covering an invalid transition the happy-path tests would miss.",
    },
    // 15 — K3 State transition count valid transitions
    {
      kLevel: "K3",
      questionText: "A simple lock has two states: Locked and Unlocked. Events: Unlock (Locked to Unlocked) and Lock (Unlocked to Locked). Unlock while already Unlocked and Lock while already Locked have no defined effect. How many VALID transitions does this machine have?",
      options: [
        { text: "2.", correct: true, why: "Only Unlock-from-Locked and Lock-from-Unlocked are defined valid transitions; the other two event/state pairs are undefined." },
        { text: "4.", correct: false, why: "4 counts every event-state combination, but two of them are undefined (no effect), so they are not valid transitions." },
        { text: "1.", correct: false, why: "There are two defined transitions, not one." },
        { text: "3.", correct: false, why: "Only two transitions are defined; three would require a third defined event-state pair." },
      ],
      explanation: "Valid transitions are those explicitly defined in the state machine. With two states and two events, there are four event-state combinations, but only two are defined (Unlock from Locked, Lock from Unlocked), so there are two valid transitions.",
      workplaceExample: "Documenting a door-lock feature, a tester lists exactly two valid transitions and then separately lists the two undefined combinations as invalid-transition tests, giving complete state coverage.",
    },
    // 16 — K2 state transition concept
    {
      kLevel: "K2",
      questionText: "In state transition testing, what does a transition represent?",
      options: [
        { text: "A change from one state to another, triggered by an event and possibly guarded by a condition.", correct: true, why: "A transition is the move between states caused by an event, optionally with a guard condition and an action." },
        { text: "A single input value chosen from an equivalence partition.", correct: false, why: "That describes equivalence partitioning, not a state transition." },
        { text: "A row in a decision table mapping conditions to actions.", correct: false, why: "That is a decision table rule, not a state transition." },
        { text: "The percentage of code branches executed by a test.", correct: false, why: "That is branch coverage, a white-box measure." },
      ],
      explanation: "In a state machine, a transition is the movement from a source state to a target state in response to an event, optionally subject to a guard condition and producing an action. State transition testing derives tests from valid and invalid transitions.",
      workplaceExample: "Reviewing an order-status feature, a tester draws the state diagram and lists each transition (event plus source and target state) so the test set covers the full lifecycle from Placed to Delivered.",
    },
    // 17 — K3 Statement coverage percentage
    {
      kLevel: "K3",
      questionText: "A function has 10 executable statements. A single test executes 7 of them. What statement coverage does that test achieve?",
      options: [
        { text: "70%.", correct: true, why: "Statement coverage = statements executed / total statements = 7/10 = 70%." },
        { text: "7%.", correct: false, why: "The ratio is 7 out of 10, which is 70%, not 7%." },
        { text: "30%.", correct: false, why: "30% is the proportion NOT covered; coverage is the proportion executed, 70%." },
        { text: "100%.", correct: false, why: "Only 7 of 10 statements ran, so coverage cannot be 100%." },
      ],
      explanation: "Statement coverage is the number of executable statements exercised divided by the total number of executable statements. 7 of 10 gives 7/10 = 70%.",
      workplaceExample: "A developer sees a coverage report show 70% for a utility function and adds tests for the three unexecuted statements to reach 100% statement coverage before merging.",
    },
    // 18 — K3 Statement coverage from snippet
    {
      kLevel: "K3",
      questionText: "Consider: read x; if (x > 0) { print A; } print B. What is the minimum number of test cases needed for 100% statement coverage?",
      options: [
        { text: "1 (a single test with x greater than 0).", correct: true, why: "With x > 0, all statements run: the read, print A inside the if, and print B after it. One test covers every statement." },
        { text: "2 (one with x greater than 0 and one with x not greater than 0).", correct: false, why: "Two tests are needed for full branch coverage, but a single x>0 test already executes every statement." },
        { text: "3 (one for each print plus the read).", correct: false, why: "A single x>0 test executes read, print A, and print B together; three tests are unnecessary for statements." },
        { text: "0 (no test can cover all statements).", correct: false, why: "One well-chosen test does cover every statement here." },
      ],
      explanation: "For 100% statement coverage every executable statement must run at least once. A single test with x > 0 executes the read, the print A inside the if, and the print B after it, so one test suffices. (Branch coverage would need two.)",
      workplaceExample: "A developer proves 100% statement coverage of a small validation routine with one positive-input test but notes in the review that a second, negative-input test is still needed for branch coverage.",
    },
    // 19 — K3 Branch coverage from snippet
    {
      kLevel: "K3",
      questionText: "Consider: read x; if (x > 0) { print A; } print B. What is the minimum number of test cases needed for 100% branch coverage?",
      options: [
        { text: "2 (one with x greater than 0 and one with x not greater than 0).", correct: true, why: "Branch coverage requires both the true and false outcomes of the if to be exercised, which needs two tests." },
        { text: "1 (a single test with x greater than 0).", correct: false, why: "One test only takes the true branch; the false outcome of the if is never exercised." },
        { text: "3 (one per print plus the read).", correct: false, why: "Only two branch outcomes exist for a single if; three tests are unnecessary." },
        { text: "4 (all input combinations).", correct: false, why: "There is a single decision with two outcomes, so two tests suffice for branch coverage." },
      ],
      explanation: "Branch coverage requires every decision outcome to be taken. The single if has a true and a false outcome, so you need one test with x > 0 and one with x not greater than 0: two tests.",
      workplaceExample: "A tester adds a negative-input case to an existing positive-only suite so the else path of a discount check is exercised, taking branch coverage from 50% to 100%.",
    },
    // 20 — K2 subsumption
    {
      kLevel: "K2",
      questionText: "Which statement about the relationship between branch coverage and statement coverage is correct?",
      options: [
        { text: "Achieving 100% branch coverage guarantees 100% statement coverage, but not the reverse.", correct: true, why: "Branch coverage subsumes statement coverage: exercising every branch outcome necessarily executes every statement, but full statement coverage can leave a branch outcome untaken." },
        { text: "Achieving 100% statement coverage guarantees 100% branch coverage.", correct: false, why: "It is the reverse; statement coverage can miss the false outcome of a branch with no body." },
        { text: "The two measures are always equal for any program.", correct: false, why: "They differ whenever a decision has an outcome that executes no additional statements." },
        { text: "Statement coverage is a stronger criterion than branch coverage.", correct: false, why: "Branch coverage is the stronger (subsuming) criterion, not statement coverage." },
      ],
      explanation: "Branch coverage subsumes statement coverage: if every branch outcome is exercised, every statement is necessarily executed. The converse does not hold, because an if with no else can reach 100% statement coverage while its false outcome is never taken.",
      workplaceExample: "A team sets a branch-coverage target instead of a statement-coverage target, knowing that meeting the stronger branch goal automatically satisfies statement coverage too.",
    },
    // 21 — K3 Statement coverage with loop/sequence
    {
      kLevel: "K3",
      questionText: "A method has 12 executable statements. Tests currently execute 9 of them. What percentage of statements remains uncovered?",
      options: [
        { text: "25%.", correct: true, why: "Uncovered = (12 - 9)/12 = 3/12 = 25%." },
        { text: "75%.", correct: false, why: "75% is the covered proportion (9/12); the question asks for uncovered." },
        { text: "3%.", correct: false, why: "Three statements out of twelve is 25%, not 3%." },
        { text: "9%.", correct: false, why: "9 statements out of 12 is 75% covered; the uncovered figure is 25%." },
      ],
      explanation: "Coverage is measured as a proportion of total statements. 9 of 12 executed means 3 of 12 remain uncovered, which is 3/12 = 25%.",
      workplaceExample: "A developer reads a coverage report showing 75% statement coverage and writes tests for the remaining 25% (three statements) to close the gap before release.",
    },
    // 22 — K3 branch coverage percentage
    {
      kLevel: "K3",
      questionText: "A component contains 8 branch outcomes (4 decisions, each with a true and false outcome). A test suite exercises 6 of these outcomes. What branch coverage has been achieved?",
      options: [
        { text: "75%.", correct: true, why: "Branch coverage = outcomes exercised / total outcomes = 6/8 = 75%." },
        { text: "50%.", correct: false, why: "6 of 8 is 75%; 50% would be 4 of 8." },
        { text: "60%.", correct: false, why: "6/8 is 75%, not 60%; 60% would be 6 of 10." },
        { text: "100%.", correct: false, why: "Two of the eight outcomes are unexercised, so coverage is below 100%." },
      ],
      explanation: "Branch coverage counts decision outcomes, not decisions. With 4 decisions there are 8 outcomes; exercising 6 gives 6/8 = 75%.",
      workplaceExample: "A CI gate reports 75% branch coverage for a module; the tester identifies which two outcomes (both false branches of the last two if statements) are missing and adds cases to reach 100%.",
    },
    // 23 — K2 error guessing
    {
      kLevel: "K2",
      questionText: "Which best describes error guessing?",
      options: [
        { text: "An experience-based technique where the tester anticipates likely errors, defects, and failures based on knowledge of past issues and common mistakes.", correct: true, why: "Error guessing draws on the tester's experience of where defects tend to occur, such as empty inputs, zero, and boundary edge cases." },
        { text: "A structured black-box technique that derives tests from a formal specification.", correct: false, why: "Error guessing is experience-based and informal, not derived from a formal specification like EP or decision tables." },
        { text: "A white-box technique that measures decision coverage.", correct: false, why: "Error guessing has nothing to do with structural coverage measurement." },
        { text: "A technique that randomly generates inputs with no tester judgement.", correct: false, why: "Error guessing relies specifically on tester judgement and experience, not random generation." },
      ],
      explanation: "Error guessing is an experience-based technique. The tester uses knowledge of past failures, developer tendencies, and common weak spots (null, zero, blank, very long inputs) to design tests that target likely defects. A fault-attack list can make it more systematic.",
      workplaceExample: "A veteran tester, knowing date fields often break, immediately tries 29 February on a leap-year edge and a blank date, catching two defects the scripted tests missed.",
    },
    // 24 — K2 exploratory testing
    {
      kLevel: "K2",
      questionText: "Which statement about exploratory testing is correct?",
      options: [
        { text: "Test design, execution, and learning happen concurrently, often structured within time-boxed sessions using test charters.", correct: true, why: "Exploratory testing interleaves learning, designing, and executing tests, frequently organised into session-based charters." },
        { text: "All test cases are fully specified and reviewed before any execution begins.", correct: false, why: "That describes scripted testing; exploratory testing designs tests during execution." },
        { text: "It can only be performed by developers with access to source code.", correct: false, why: "Exploratory testing is a black-box, experience-based approach and needs no source access." },
        { text: "It guarantees a fixed, repeatable coverage percentage.", correct: false, why: "Exploratory coverage depends on the tester and session; it is not a fixed measurable percentage." },
      ],
      explanation: "Exploratory testing is an experience-based approach in which the tester simultaneously learns about the product, designs tests, and executes them. Session-based test management with charters and time-boxing makes it more structured and traceable.",
      workplaceExample: "Given a new feature two days before release, a tester runs three 60-minute charter-based exploratory sessions and logs findings, providing fast feedback where no scripted tests exist yet.",
    },
    // 25 — K2 checklist-based
    {
      kLevel: "K2",
      questionText: "What characterises checklist-based testing?",
      options: [
        { text: "Testers design and execute tests to cover the items on a checklist derived from experience, standards, or past defects.", correct: true, why: "A checklist captures conditions or rules to verify; testers cover each item, using judgement for the specifics." },
        { text: "Each checklist item is an automated assertion generated from the code.", correct: false, why: "Checklists are experience-based reminders, not code-generated assertions." },
        { text: "The checklist replaces the need for any tester judgement.", correct: false, why: "Checklist items are typically high-level, so testers still use judgement to design concrete tests." },
        { text: "It measures the percentage of source-code statements executed.", correct: false, why: "That is statement coverage, a white-box measure, unrelated to checklists." },
      ],
      explanation: "Checklist-based testing is experience-based: testers work through a list of items (from experience, heuristics, standards, or past defects) and design tests to cover each. Items are usually high-level, so testers apply judgement to the details.",
      workplaceExample: "Before shipping any web form, a QA team runs a reusable checklist covering required-field validation, max length, special characters, and accessibility, ensuring consistent baseline coverage across projects.",
    },
    // 26 — K2 collaborative user story writing
    {
      kLevel: "K2",
      questionText: "In collaborative user story writing, which principle is captured by the 'three friends' or 'three amigos' idea?",
      options: [
        { text: "A business representative, a developer, and a tester collaborate to write and refine the story, bringing three perspectives.", correct: true, why: "The three amigos are business/product, development, and testing, whose different viewpoints produce better stories and acceptance criteria." },
        { text: "Three separate testers independently review each story to reach consensus.", correct: false, why: "The three amigos are three different roles, not three testers." },
        { text: "Every story must be written by exactly three developers.", correct: false, why: "The point is cross-role collaboration, not three developers." },
        { text: "Stories are written only by the product owner and reviewed later.", correct: false, why: "Collaborative writing explicitly involves the tester and developer up front, not review-only." },
      ],
      explanation: "Collaborative user story writing brings together three perspectives, often called the three amigos: business/product, development, and testing. The tester's early involvement surfaces edge cases and testability concerns before code is written.",
      workplaceExample: "At backlog refinement, a product owner, a developer, and a tester discuss a new checkout story together; the tester's question about failed payments adds an acceptance criterion no one else had considered.",
    },
    // 27 — K2 acceptance criteria
    {
      kLevel: "K2",
      questionText: "What is the primary purpose of acceptance criteria for a user story?",
      options: [
        { text: "To define the conditions a story must satisfy to be accepted, giving a shared, testable definition of done.", correct: true, why: "Acceptance criteria set out the specific, testable conditions that determine whether the story is complete and correct." },
        { text: "To specify the internal code structure the developer must implement.", correct: false, why: "Acceptance criteria describe behaviour and outcomes, not implementation details." },
        { text: "To measure the percentage of branches executed by unit tests.", correct: false, why: "That is branch coverage; acceptance criteria are about story completeness, not structural coverage." },
        { text: "To replace the need for any test design techniques.", correct: false, why: "Acceptance criteria guide testing but techniques like EP and BVA are still applied to derive detailed cases." },
      ],
      explanation: "Acceptance criteria define the conditions a user story must meet to be accepted by stakeholders. They provide a shared, testable definition of done and are a basis for acceptance tests, often written in the given/when/then form.",
      workplaceExample: "A story for a password reset includes acceptance criteria such as 'given a valid email, when the user requests a reset, then a reset link is sent within 60 seconds', which the tester turns directly into test cases.",
    },
    // 28 — K2 ATDD
    {
      kLevel: "K2",
      questionText: "Which best describes Acceptance Test-Driven Development (ATDD)?",
      options: [
        { text: "Acceptance tests are created collaboratively from acceptance criteria BEFORE development, and guide the implementation.", correct: true, why: "In ATDD the team defines acceptance tests up front from the criteria, and those tests drive and confirm the development." },
        { text: "Acceptance tests are written only after the feature is fully coded and deployed.", correct: false, why: "ATDD writes acceptance tests before development, not after; writing them after is traditional post-hoc testing." },
        { text: "It is a white-box technique focused on statement coverage.", correct: false, why: "ATDD is a collaboration-based, specification-driven approach, not a structural coverage technique." },
        { text: "It replaces user stories with detailed technical design documents.", correct: false, why: "ATDD works from user stories and their acceptance criteria; it does not replace them with design docs." },
      ],
      explanation: "ATDD is a collaboration-based approach where the team derives acceptance tests from the acceptance criteria before coding. The tests are agreed up front by business, development, and testing, then drive implementation and serve as executable confirmation of done.",
      workplaceExample: "For a new discount rule, the three amigos agree the acceptance tests during refinement; developers code until those tests pass, so the tests double as the specification and the regression check.",
    },
    // 29 — K3 combined EP + BVA scenario
    {
      kLevel: "K3",
      questionText: "A quantity field accepts 1 to 20 inclusive. You pick one value per equivalence partition (below range 0; valid 10; above range 21) AND the 2-value boundary values (0, 1, 20, 21). After removing duplicates, how many distinct test values result?",
      options: [
        { text: "5.", correct: true, why: "EP values are 0, 10, 21; BVA values are 0, 1, 20, 21. The union is 0, 1, 10, 20, 21, which is five distinct values (0 and 21 appear in both sets)." },
        { text: "7.", correct: false, why: "Seven adds the three EP values to the four BVA values without removing the duplicate 0 and 21." },
        { text: "4.", correct: false, why: "Four would drop the valid representative (10); the boundary set alone is not the full answer." },
        { text: "9.", correct: false, why: "Nine over-counts by treating every listed value as unique, ignoring that 0 and 21 are shared." },
      ],
      explanation: "Combining techniques means taking the union of their values and removing duplicates. EP contributes 0, 10, 21; 2-value BVA contributes 0, 1, 20, 21. The union is {0, 1, 10, 20, 21}, five distinct values, because 0 and 21 are common to both.",
      workplaceExample: "A tester merges the EP and BVA value lists for a quantity field, deduplicates, and reports five test cases, showing the reviewer exactly why the count is not simply the sum of both lists.",
    },
    // 30 — K1 selecting a technique
    {
      kLevel: "K2",
      questionText: "A feature is described by complex interacting business rules, where the output depends on several yes/no conditions in combination. Which black-box technique is the most appropriate primary choice?",
      options: [
        { text: "Decision table testing.", correct: true, why: "Decision tables are designed for combinations of conditions producing actions, exactly this situation." },
        { text: "Boundary value analysis.", correct: false, why: "BVA targets numeric range edges, not combinations of independent yes/no conditions." },
        { text: "State transition testing.", correct: false, why: "State transition suits event-driven behaviour where the system moves between states, not combinational rules." },
        { text: "Statement coverage.", correct: false, why: "Statement coverage is a white-box measure, not a black-box technique for business rules." },
      ],
      explanation: "When behaviour depends on combinations of conditions, decision table testing is the natural fit: each rule column is a unique combination of conditions with its resulting actions, ensuring the interacting rules are systematically covered.",
      workplaceExample: "Faced with an eligibility feature driven by four boolean checks, a tester chooses a decision table over BVA, because the risk lies in the combinations of conditions rather than in numeric edges.",
    },
  ],
};
