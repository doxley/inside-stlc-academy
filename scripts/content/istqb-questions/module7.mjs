export default {
  courseSlug: "istqb-foundation-masterclass",
  moduleNumber: 7,
  syllabusTopic: "Defect Management",
  questions: [
    {
      kLevel: "K1",
      prompt: "In the ISTQB defect management process, what is the FIRST step once a possible defect (anomaly) has been recognised during testing?",
      options: [
        { text: "The anomaly is logged and analysed to confirm whether it is a genuine defect", correct: true, why: "ISTQB describes the process starting with logging/recognising the anomaly and then analysing it to determine if it is a true defect, a duplicate, or a non-defect (for example a test error)." },
        { text: "The defect is immediately assigned to a developer to fix", correct: false, why: "Assignment for fixing happens later, only after the anomaly has been confirmed as a real defect and classified; jumping straight to a fix skips confirmation and analysis." },
        { text: "The defect is closed once the tester agrees it is minor", correct: false, why: "Closing is the final state of the lifecycle, not the first step, and severity does not determine whether a defect is logged at all." },
        { text: "A root cause analysis report is published to all stakeholders", correct: false, why: "Root cause analysis and metrics reporting are downstream activities; the immediate first step is to record and analyse the individual anomaly." }
      ],
      explanation: "The ISTQB defect management process begins when an anomaly is recognised. It is logged, then analysed and classified to confirm it is a genuine defect (rather than a duplicate, environment issue, or test-design error) before any decision on fixing is made.",
      workplaceExample: "A tester on an e-commerce project sees a wrong VAT total at checkout. Before pinging a developer, they raise a defect ticket capturing the steps and expected/actual results, so a triage lead can confirm it is a real defect and not a mis-configured test environment."
    },
    {
      kLevel: "K1",
      prompt: "Which of the following is the BEST description of the purpose of a defect report?",
      options: [
        { text: "To provide those responsible with enough information to manage, prioritise, resolve, and track the anomaly", correct: true, why: "ISTQB states a defect report gives developers and managers the information needed to isolate, correct, and track the defect, and to support monitoring and process improvement." },
        { text: "To create an audit trail that identifies which tester is to blame for missing the defect earlier", correct: false, why: "Defect reports are blame-free records of the anomaly; attributing fault to individuals is contrary to professional, no-blame defect communication." },
        { text: "To replace the need for a test log during test execution", correct: false, why: "A defect report documents a specific anomaly; it does not replace the broader test execution log, which records all test activity including passes." },
        { text: "To calculate the exact cost of the defect to the business", correct: false, why: "Cost impact may inform priority, but the core purpose is to convey enough detail to reproduce, manage, and track the defect, not to compute financials." }
      ],
      explanation: "A defect report exists to communicate a discovered anomaly clearly so it can be reproduced, prioritised, fixed, retested, and tracked, and to feed defect data into process improvement.",
      workplaceExample: "A QA lead reviews an incoming report and can reproduce the crash in two minutes because the report lists the exact build, steps, test data, and expected versus actual behaviour, letting the team schedule the fix into the next sprint."
    },
    {
      kLevel: "K2",
      prompt: "A defect report lacks the steps to reproduce, the build version, and the actual versus expected result. From an ISTQB perspective, why is this a problem?",
      options: [
        { text: "Missing this content prevents the developer from reproducing and isolating the defect, delaying resolution", correct: true, why: "ISTQB lists identification, description of steps, expected/actual results, and build/version among the content that makes a report actionable; without it the defect may be returned as 'cannot reproduce'." },
        { text: "It is not a problem because the developer can infer everything from the test case ID alone", correct: false, why: "A test case ID may point to the scenario but does not capture the observed behaviour, environment, or the precise state that triggered the failure." },
        { text: "It only matters for high-severity defects, not for low-severity ones", correct: false, why: "Reproducibility and clear content are needed regardless of severity; a poorly described minor defect still wastes triage time." },
        { text: "It is acceptable because severity and priority fields are the only mandatory content", correct: false, why: "Severity and priority are important classification fields but do not substitute for the description, steps, and results needed to act on the defect." }
      ],
      explanation: "Good defect reports include enough content (identification, environment/build, steps to reproduce, expected and actual results, severity, priority, status) so the defect can be understood, reproduced, and resolved efficiently.",
      workplaceExample: "A developer marks three tickets 'Cannot Reproduce' and bounces them back. The retrospective shows all three omitted the build number and reproduction steps, so the team adds those as required fields in the defect tool template."
    },
    {
      kLevel: "K1",
      prompt: "Which of the following is a typical field found in a well-formed defect report according to the ISTQB syllabus?",
      options: [
        { text: "A unique identifier for the defect report", correct: true, why: "A unique ID lets the defect be referenced, tracked, and reported on unambiguously across its lifecycle and in metrics." },
        { text: "The tester's annual performance rating", correct: false, why: "Personal performance data has no place in a defect report; the report describes the anomaly, not the person who found it." },
        { text: "The commercial licence cost of the test tool used", correct: false, why: "Tool licensing is procurement information, unrelated to describing or tracking the specific anomaly." },
        { text: "The developer's home address", correct: false, why: "This is irrelevant personal data and not part of any recognised defect report structure." }
      ],
      explanation: "Typical defect report fields include a unique ID, title/summary, date logged and author, status, degree of impact (severity), urgency (priority), steps to reproduce, expected and actual results, and references to the test item and environment.",
      workplaceExample: "When a team migrates from spreadsheets to a defect tracking tool, they map each column: ID, summary, reporter, date, severity, priority, status, steps, and linked requirement, mirroring the ISTQB recommended fields."
    },
    {
      kLevel: "K2",
      prompt: "How does ISTQB distinguish between the severity and the priority of a defect?",
      options: [
        { text: "Severity is the degree of impact the defect has on the system; priority is the urgency with which it should be fixed", correct: true, why: "Severity reflects technical/business impact of the failure, while priority reflects how soon it should be addressed relative to other work, and the two can differ." },
        { text: "Severity is set by the customer and priority is set by the tester, and they always match", correct: false, why: "Roles vary by organisation and the two attributes frequently differ; a high-severity defect can be low priority and vice versa." },
        { text: "Severity and priority are two names for the same attribute and are always identical", correct: false, why: "They are distinct attributes; conflating them is the classic exam trap. A cosmetic issue can be high priority, and a rare crash can be low priority." },
        { text: "Priority measures technical impact and severity measures business urgency", correct: false, why: "This reverses the definitions. Severity is impact; priority is urgency/order of fixing." }
      ],
      explanation: "Severity measures how badly a defect affects the system or its use (impact), whereas priority measures how urgently it should be fixed relative to other work. They are independent, which is why a defect can be high severity but low priority, or low severity but high priority.",
      workplaceExample: "A crash only reachable after a rarely used admin export is high severity but low priority, while a misspelled company name on the homepage banner is low severity but high priority because the CEO wants it fixed before a press launch."
    },
    {
      kLevel: "K3",
      prompt: "Scenario: Once a month, when generating the payroll batch, the system crashes and no salaries are paid until IT restarts the service. Which classification BEST fits this defect?",
      options: [
        { text: "High severity and high priority", correct: true, why: "The failure stops a critical business function (high impact = high severity) and salaries not being paid demands an urgent fix (high urgency = high priority)." },
        { text: "Low severity and low priority", correct: false, why: "A crash that halts payroll is a major business impact, so severity cannot be low, and the business consequence makes it urgent, so priority cannot be low." },
        { text: "High severity but low priority", correct: false, why: "Although the crash is high severity, 'low priority' is wrong because unpaid salaries make the fix time-critical, not something to defer." },
        { text: "Low severity but high priority", correct: false, why: "A system crash blocking payroll is high impact, not low severity, even though the urgency is correctly high." }
      ],
      explanation: "Severity captures impact (a crash halting payroll is severe); priority captures urgency (unpaid salaries must be fixed fast). Here both are high. The scenario tests that you separate impact from urgency and judge each on its merits.",
      workplaceExample: "The payroll team raises the ticket as Severity 1 / Priority 1, and the release manager pulls in an emergency patch rather than waiting for the next scheduled release."
    },
    {
      kLevel: "K3",
      prompt: "Scenario: The company logo on the public login page is slightly blurry. Marketing insists it must be fixed before a televised product launch tomorrow. How should this defect be classified?",
      options: [
        { text: "Low severity, high priority", correct: true, why: "A blurry logo does not impair functionality (low impact = low severity), but the imminent televised launch makes fixing it urgent (high urgency = high priority)." },
        { text: "High severity, high priority", correct: false, why: "The defect is cosmetic and does not affect how the system works, so severity is low even though the urgency is genuinely high." },
        { text: "High severity, low priority", correct: false, why: "This misjudges both attributes: the cosmetic issue is not high severity, and the launch deadline makes it high, not low, priority." },
        { text: "Low severity, low priority", correct: false, why: "Severity is correctly low, but the televised launch deadline makes it high priority, not low." }
      ],
      explanation: "This is the classic case where a low-severity (cosmetic) defect carries high priority due to business timing. Impact and urgency must be judged independently.",
      workplaceExample: "The tester logs it as Severity 4 (cosmetic) but Priority 1, and the team schedules the asset swap for tonight's hotfix so the login page looks sharp on camera."
    },
    {
      kLevel: "K3",
      prompt: "Scenario: A rare data-corruption bug can permanently damage customer records, but it only triggers under an obscure combination that has occurred once in three years and there is a manual workaround. How is this best classified?",
      options: [
        { text: "High severity, lower priority", correct: true, why: "Permanent data corruption is severe impact (high severity), but the rarity and existing workaround mean it can be scheduled rather than fixed immediately (lower priority)." },
        { text: "Low severity, high priority", correct: false, why: "Data corruption is a serious impact, so severity is high, not low; the rarity affects urgency, not the severity rating." },
        { text: "Low severity, low priority", correct: false, why: "Underrating a defect that can permanently corrupt data is dangerous; the impact makes it high severity even if it is rare." },
        { text: "High severity, high priority", correct: false, why: "Severity is high, but with a rare trigger and a workaround the urgency to fix immediately is reduced, so priority is typically lower." }
      ],
      explanation: "Severity is driven by impact (permanent data corruption is high), while priority reflects urgency given frequency and workarounds. A high-severity defect can carry a lower priority when it is rare and mitigated.",
      workplaceExample: "The team logs Severity 1 but Priority 3, documents the manual workaround in the runbook, and schedules the root fix for a later hardening sprint."
    },
    {
      kLevel: "K2",
      prompt: "Two testers rate the same defect differently: one calls it Severity 1, the other Severity 3. What does ISTQB suggest to reduce this inconsistency?",
      options: [
        { text: "Agree and document clear severity classification criteria so ratings are applied consistently", correct: true, why: "Shared, documented classification schemes (for example defined severity levels) help teams apply severity consistently and reduce subjective disagreement." },
        { text: "Always let the more senior tester's rating win regardless of criteria", correct: false, why: "Seniority does not make a rating objective; without agreed criteria the inconsistency simply recurs on the next defect." },
        { text: "Remove the severity field from the defect report entirely", correct: false, why: "Severity is valuable classification data; removing it loses information needed for triage and metrics." },
        { text: "Set severity equal to priority so only one number is needed", correct: false, why: "Severity and priority are distinct attributes; forcing them equal destroys useful information and is conceptually wrong." }
      ],
      explanation: "Consistent defect classification relies on agreed, documented criteria (such as defined severity and priority scales) so different people rate similar defects the same way, improving the reliability of triage and metrics.",
      workplaceExample: "A test manager publishes a one-page severity guide (S1 = data loss/crash, S2 = major function broken, S3 = minor function issue, S4 = cosmetic) and disagreements at triage drop sharply."
    },
    {
      kLevel: "K1",
      prompt: "In a typical defect lifecycle, which state usually indicates that the analysis found the anomaly is not a genuine product defect?",
      options: [
        { text: "Rejected (or Not a Defect)", correct: true, why: "When triage concludes the anomaly is a duplicate, test error, environment issue, or works-as-designed, the report is moved to a rejected/not-a-defect state." },
        { text: "Fixed", correct: false, why: "'Fixed' means a developer has corrected a confirmed defect, which is the opposite of concluding there is no defect." },
        { text: "Reopened", correct: false, why: "'Reopened' occurs when a supposedly fixed defect fails confirmation testing; it presupposes a real defect existed." },
        { text: "Closed after successful retest", correct: false, why: "This state means a genuine defect was fixed and verified, not that the anomaly was found to be a non-defect." }
      ],
      explanation: "Defect lifecycles include states such as New/Open, Assigned, Fixed, Retest, Closed, Reopened, and Rejected/Not-a-Defect. The rejected state captures anomalies that turn out not to be genuine product defects.",
      workplaceExample: "During triage a reported 'bug' turns out to be caused by stale test data; the lead moves it to 'Rejected - test data issue' with a note, and the tester refreshes the environment."
    },
    {
      kLevel: "K2",
      prompt: "A defect was marked Fixed, but when the tester re-runs the test the failure still occurs. Which lifecycle transition is appropriate?",
      options: [
        { text: "Reopen the defect and return it for further work", correct: true, why: "Confirmation (re-)testing that still fails means the fix did not resolve the defect, so it is reopened and sent back rather than closed." },
        { text: "Close the defect because the developer already marked it Fixed", correct: false, why: "'Fixed' is the developer's claim; closure requires the tester to confirm the fix by retesting, which failed here." },
        { text: "Log a brand new unrelated defect and abandon the original", correct: false, why: "The original defect still exists; reopening preserves history and traceability rather than fragmenting it into a new ticket." },
        { text: "Delete the defect report to keep metrics clean", correct: false, why: "Deleting records distorts metrics and destroys the audit trail; the correct action is to reopen." }
      ],
      explanation: "Confirmation testing verifies a fix. If the failure persists, the defect is reopened and returned to development. Only a passing confirmation test justifies moving the defect to Closed.",
      workplaceExample: "The developer patched the wrong branch, so the bug reappears in the test build. The tester reopens the ticket with the new build number and a fresh screenshot, and the developer re-targets the fix."
    },
    {
      kLevel: "K2",
      prompt: "Which of the following is a valid source of a defect report arising from STATIC testing?",
      options: [
        { text: "A reviewer finds an ambiguous, testable-but-contradictory requirement during a requirements review", correct: true, why: "Static testing examines work products without executing code, so defects in requirements, designs, or documents (for example ambiguities or contradictions) are found and reported this way." },
        { text: "A test script throws an exception when executed against the running application", correct: false, why: "An exception during execution is a dynamic testing finding because the software was run to observe the failure." },
        { text: "A load test reveals the server slows down under 5000 concurrent users", correct: false, why: "Measuring behaviour under load requires executing the system, which is dynamic, not static, testing." },
        { text: "A user reports the mobile app crashes on launch in production", correct: false, why: "A crash observed by running the app is a dynamic/operational failure, not a static review finding." }
      ],
      explanation: "Static testing (reviews and static analysis) finds defects in work products without executing code, such as requirement ambiguities, design flaws, or coding standard violations. Dynamic testing finds failures by running the software.",
      workplaceExample: "In a requirements walkthrough a reviewer spots that two acceptance criteria contradict each other and raises a defect against the specification before a single line of code is written."
    },
    {
      kLevel: "K2",
      prompt: "Which statement about defects found by static versus dynamic testing is CORRECT?",
      options: [
        { text: "Static testing finds defects directly in work products, while dynamic testing observes failures and the defect is inferred", correct: true, why: "Static testing locates the defect itself in a document or code without running it; dynamic testing shows a failure at runtime, from which the underlying defect must be identified." },
        { text: "Only dynamic testing can find defects; static testing merely improves readability", correct: false, why: "Static testing genuinely finds defects (ambiguities, missing requirements, code standard breaches), often earlier and more cheaply than dynamic testing." },
        { text: "Static testing always finds the same defects as dynamic testing", correct: false, why: "The two approaches find different, complementary defect types; neither is a subset of the other." },
        { text: "Defects from static testing do not need to be reported or tracked", correct: false, why: "Static testing findings are logged and managed like any defect so they can be resolved and measured." }
      ],
      explanation: "In static testing the defect is found directly in the work product without execution. In dynamic testing a failure is observed and the defect that caused it must be located. Both produce defect reports that are tracked.",
      workplaceExample: "A code review flags an off-by-one loop condition (static, defect seen directly), while a later system test shows the last record is dropped (dynamic, failure observed and traced back to that same code)."
    },
    {
      kLevel: "K1",
      prompt: "According to ISTQB, who typically has responsibility across defect management activities?",
      options: [
        { text: "Multiple roles collaborate: testers report and retest, developers analyse and fix, and test/project management oversee triage and process", correct: true, why: "Defect management is a shared, cross-role activity; ISTQB emphasises collaboration among testers, developers, and management rather than a single owner." },
        { text: "Only the tester who found the defect is responsible for every stage including the code fix", correct: false, why: "Testers report and confirm fixes, but developers correct the code; expecting testers to fix code misassigns responsibility." },
        { text: "Only project management decides everything, including reproducing and coding fixes", correct: false, why: "Management oversees prioritisation and process but does not personally reproduce or code defect fixes; that is a shared technical activity." },
        { text: "Defects are handled entirely automatically with no human roles involved", correct: false, why: "Tooling supports the workflow, but analysis, classification, fixing, and retesting require human roles." }
      ],
      explanation: "Defect management is collaborative. Testers log and later confirm defects, developers analyse and fix them, and test and project management guide triage, prioritisation, and process improvement.",
      workplaceExample: "At the daily triage, the test lead facilitates, developers give effort estimates, the product owner sets priority, and the tester who logged each defect clarifies reproduction steps."
    },
    {
      kLevel: "K2",
      prompt: "During defect triage, whose input is MOST appropriate for deciding the priority (fix order) of a defect?",
      options: [
        { text: "Product owner or business stakeholder input, informed by developer effort and tester impact assessment", correct: true, why: "Priority is a business decision about urgency and order of fixing, best set by product/business stakeholders using technical input; severity is more a technical impact judgement." },
        { text: "The tester alone, without any business or development input", correct: false, why: "A tester can assess severity/impact but priority requires business context on urgency and value that the tester may not hold alone." },
        { text: "A random selection to avoid bias", correct: false, why: "Prioritisation should be a deliberate risk- and value-based decision, not arbitrary." },
        { text: "Whoever shouts loudest in the meeting", correct: false, why: "Priority must be justified by impact, risk, and business value, not by who is most vocal." }
      ],
      explanation: "Priority reflects the business urgency of fixing a defect, so it is best decided with product/business stakeholders using technical impact (severity) and effort information from testers and developers.",
      workplaceExample: "In sprint triage the product owner bumps a checkout bug above a reporting bug because it blocks revenue, after the tester confirms impact and the developer estimates the fix."
    },
    {
      kLevel: "K2",
      prompt: "A tester writes in a defect report: 'The developer clearly did not bother to test this rubbish before check-in.' Why is this problematic under professional defect communication?",
      options: [
        { text: "It assigns blame and is emotive, undermining objective, no-blame collaboration", correct: true, why: "ISTQB stresses reporting defects factually and without blame; personal, emotive attacks damage team relationships and distract from the anomaly itself." },
        { text: "It is fine because strong language makes developers act faster", correct: false, why: "Emotive, accusatory language harms collaboration and morale and does not improve the quality or speed of the fix." },
        { text: "It is problematic only because it is too long, not because of tone", correct: false, why: "The core issue is the accusatory, blaming tone, not the length of the sentence." },
        { text: "It is acceptable if the defect is high severity", correct: false, why: "Severity never justifies unprofessional, blaming language; the report should stay factual regardless of impact." }
      ],
      explanation: "Professional defect reporting is factual, objective, and blame-free. It describes the observed behaviour and its impact, not the presumed failings of a person, so the team can focus on resolving the defect collaboratively.",
      workplaceExample: "The wording is revised to 'Expected the order total to include tax; actual total omitted tax on build 4.2.1 (steps below)', which the developer can act on without feeling attacked."
    },
    {
      kLevel: "K2",
      prompt: "Which rewrite of a defect summary BEST reflects professional, blame-free communication?",
      options: [
        { text: "'On build 5.3, submitting the form with an empty email field saves the record instead of showing the required validation error.'", correct: true, why: "It is factual and specific: build, action, expected versus actual behaviour, with no personal attribution, which is exactly what good defect communication requires." },
        { text: "'Someone broke the form validation again, as usual.'", correct: false, why: "It is vague and accusatory, gives no reproduction detail, and assigns blame rather than describing the anomaly." },
        { text: "'The form is a mess and whoever wrote it should be ashamed.'", correct: false, why: "It is emotive and insulting, contains no actionable technical detail, and violates no-blame principles." },
        { text: "'Validation is broken, figure it out yourselves.'", correct: false, why: "It is dismissive and unhelpful, providing neither reproduction steps nor expected/actual results." }
      ],
      explanation: "A good defect summary states facts (environment, action, expected and actual results) neutrally and specifically, enabling the reader to act without ambiguity or defensiveness.",
      workplaceExample: "A tester adopts a summary template of 'On [build], when [action], expected [X] but got [Y]', and triage discussions become faster and less tense."
    },
    {
      kLevel: "K1",
      prompt: "Which of the following is a common defect metric used in defect management?",
      options: [
        { text: "Number of defects found and fixed over time (defect trend)", correct: true, why: "Defect density, trends of found versus fixed, and status distribution are standard metrics used to monitor product quality and process effectiveness." },
        { text: "The average number of coffees consumed by the test team per sprint", correct: false, why: "This is not a defect metric and has no bearing on product quality or the defect process." },
        { text: "The colour scheme of the defect tracking tool", correct: false, why: "Tool aesthetics are irrelevant to measuring defects." },
        { text: "The number of meetings held company-wide", correct: false, why: "Total meeting count is unrelated to defect discovery, resolution, or quality." }
      ],
      explanation: "Defect metrics such as defect density, defect detection trends, defects by severity/priority, and open-versus-closed status are used to assess product quality and the effectiveness of the test and defect processes.",
      workplaceExample: "The test manager charts 'defects found vs fixed per week'; a widening gap warns that fixing is falling behind discovery and more developer time is needed before release."
    },
    {
      kLevel: "K2",
      prompt: "A team notices most defects cluster in one module. How can defect metrics support the response to this observation?",
      options: [
        { text: "The distribution highlights a defect cluster, guiding extra testing and analysis of that risky module", correct: true, why: "Metrics on defect distribution reveal clusters, supporting risk-based decisions to focus effort where defects concentrate, consistent with the defect clustering principle." },
        { text: "It proves the module's developer should be dismissed", correct: false, why: "Metrics inform process and risk decisions, not punitive HR actions; blame-based use of metrics is inappropriate." },
        { text: "It means the other modules can be left untested entirely", correct: false, why: "A cluster in one area does not guarantee the rest is defect-free; testing coverage decisions still consider risk across the product." },
        { text: "It shows testing should stop because enough defects were found", correct: false, why: "Defect counts alone are not a valid exit criterion; clustering guides where to test more, not to stop." }
      ],
      explanation: "Defect metrics such as distribution by module support risk-based testing: clusters indicate higher-risk areas that may warrant additional testing and root cause analysis, aligning with the defect clustering principle.",
      workplaceExample: "A dashboard shows 60 percent of defects sit in the payments module, so the team adds exploratory sessions and a code review focused there, and later tracks whether the cluster shrinks."
    },
    {
      kLevel: "K2",
      prompt: "Why should defect metrics be used with care rather than as a simple measure of individual performance?",
      options: [
        { text: "Using raw defect counts to judge individuals encourages gaming and undermines the no-blame culture needed for honest reporting", correct: true, why: "If people are judged by defect counts, they may under-report or dispute defects; metrics should drive process improvement, not individual blame." },
        { text: "Defect metrics are always inaccurate and should never be collected", correct: false, why: "Metrics are valuable when used properly; the caution is about misuse for individual judgement, not about abandoning measurement." },
        { text: "Only the total number of defects matters, so context is irrelevant", correct: false, why: "Context (severity, area, phase, trend) is exactly what makes metrics meaningful; raw totals alone can mislead." },
        { text: "Metrics should be hidden from the whole team to avoid confusion", correct: false, why: "Transparency generally helps; the real concern is tying metrics to individual blame, not sharing them." }
      ],
      explanation: "Defect metrics should support process improvement and risk decisions. Using them to rank or blame individuals distorts behaviour, discourages honest reporting, and conflicts with the collaborative, no-blame ethos of defect management.",
      workplaceExample: "A manager stops publishing a 'bugs per developer' leaderboard after discovering developers were quietly fixing issues without logging them, hiding real quality data."
    },
    {
      kLevel: "K1",
      prompt: "What does the STATUS field of a defect report primarily convey?",
      options: [
        { text: "The current position of the defect within its lifecycle (for example New, Assigned, Fixed, Closed)", correct: true, why: "The status field tracks where the defect currently sits in its workflow, enabling monitoring and reporting of progress." },
        { text: "The monetary value of the defect to competitors", correct: false, why: "Status is a workflow-state field, not a financial measure." },
        { text: "The tester's confidence that they will pass the ISTQB exam", correct: false, why: "This is unrelated to the defect and not a report field." },
        { text: "The number of other testers on the project", correct: false, why: "Team size is project data, not the state of an individual defect." }
      ],
      explanation: "The status field shows the defect's current lifecycle state, which supports tracking, triage, and metrics such as open-versus-closed counts over time.",
      workplaceExample: "A burndown of defect statuses shows 12 New, 8 In Progress, and 30 Closed, giving the scrum master a quick read on remaining defect work before the release."
    },
    {
      kLevel: "K2",
      prompt: "Beyond fixing the immediate defect, how does effective defect management contribute to process improvement?",
      options: [
        { text: "Analysing defect data reveals recurring root causes so the process can be changed to prevent similar defects", correct: true, why: "ISTQB notes defect information supports process improvement; aggregated causes point to where the development or test process can be strengthened." },
        { text: "It guarantees zero defects will ever occur again", correct: false, why: "No process eliminates all defects; the goal is reduction and prevention, not an impossible guarantee." },
        { text: "It replaces the need to do any testing in future releases", correct: false, why: "Learning from defects informs testing; it does not remove the ongoing need to test." },
        { text: "It automatically rewrites the code without developer involvement", correct: false, why: "Process improvement guides human decisions and practices; it does not auto-generate fixes." }
      ],
      explanation: "By aggregating and analysing defect data (causes, phases introduced, clusters), teams identify systemic issues and improve their processes to prevent recurrence, one of the broader goals of defect management.",
      workplaceExample: "A root cause review finds many defects trace to unclear acceptance criteria, so the team adds a 'definition of ready' check, and the equivalent defects drop in the next two releases."
    },
    {
      kLevel: "K2",
      prompt: "A defect is logged during a code review before the code is ever executed. Which combination of statements is TRUE?",
      options: [
        { text: "It is a static testing finding, it should still be logged and tracked, and it can be fixed earlier and more cheaply than if found later", correct: true, why: "Reviews are static testing; findings are managed as defects, and early detection typically reduces the cost of correction." },
        { text: "It is a dynamic testing finding and does not need tracking", correct: false, why: "No code was executed, so it is static, not dynamic, and it certainly still needs tracking." },
        { text: "It cannot be a real defect because the code has not run yet", correct: false, why: "Defects exist in work products regardless of execution; a flawed line of code is a defect even before it runs." },
        { text: "It should be ignored until it causes a failure at runtime", correct: false, why: "Waiting for a runtime failure defeats the value of static testing, which is to catch defects early." }
      ],
      explanation: "Defects found in reviews are static testing findings, logged and tracked like any defect. Finding them early, before execution, usually makes them cheaper and easier to fix than defects found in later dynamic testing or production.",
      workplaceExample: "A reviewer catches a null-check omission during the pull request; it is logged and fixed in minutes, avoiding a costly production incident and an emergency patch weeks later."
    },
    {
      kLevel: "K1",
      prompt: "Which of the following BEST describes an anomaly in the context of defect management?",
      options: [
        { text: "Any condition that deviates from expectation, which may or may not turn out to be a genuine defect", correct: true, why: "An anomaly is an observed deviation from expected behaviour or documentation; analysis then determines whether it is a true defect, a duplicate, or a non-issue." },
        { text: "A defect that has already been confirmed and fixed", correct: false, why: "A confirmed, fixed defect is a later lifecycle state; an anomaly is the initial observed deviation before confirmation." },
        { text: "A test case that has been designed but not yet executed", correct: false, why: "An unexecuted test case is not an anomaly; an anomaly relates to observed behaviour deviating from expectation." },
        { text: "The tool used to store defect reports", correct: false, why: "That is a defect management tool, not an anomaly." }
      ],
      explanation: "An anomaly is any observed deviation from expectation. Not every anomaly is a defect; analysis during the defect process determines whether it is a genuine defect, a duplicate, or a non-defect such as a test error.",
      workplaceExample: "A tester notes the app shows a slightly different date format than the spec; on analysis it matches an approved change request, so the anomaly is closed as not-a-defect rather than fixed."
    },
    {
      kLevel: "K2",
      prompt: "A high-severity defect has been open for a long time with status 'Deferred'. What does this most likely indicate about severity versus priority in practice?",
      options: [
        { text: "The defect has high impact but has been given lower priority, so its fix has been postponed", correct: true, why: "Deferral reflects a priority (urgency/order) decision; a defect can be high severity yet deferred if business priority places other work first, showing the two attributes are independent." },
        { text: "The severity rating must be wrong because high-severity defects are always fixed immediately", correct: false, why: "High severity does not force immediate fixing; priority governs the order, so a severe defect can legitimately be deferred." },
        { text: "Severity and priority are the same, so a deferred defect cannot be high severity", correct: false, why: "They are distinct attributes; a high-severity defect being deferred is precisely evidence that they differ." },
        { text: "Deferral means the defect has been fixed and closed", correct: false, why: "'Deferred' means postponed, not fixed; the defect remains open for a future decision." }
      ],
      explanation: "A deferred high-severity defect illustrates that severity (impact) and priority (urgency and order of fixing) are independent. The business may accept a severe defect's risk for now and schedule it later, which is a priority decision.",
      workplaceExample: "A severe but rare reporting error is deferred to the next quarter because the team prioritises a revenue-blocking checkout defect first, and the risk is documented and accepted by the product owner."
    }
  ]
};
