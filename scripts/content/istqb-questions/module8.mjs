export default {
  courseSlug: "istqb-foundation-masterclass",
  moduleNumber: 8,
  syllabusTopic: "Risk-Based Testing",
  questions: [
    {
      kLevel: "K1",
      question: "In risk-based testing, how is the level of a risk determined?",
      options: [
        { text: "By the likelihood of an adverse event occurring combined with its impact", correct: true, why: "The ISTQB definition states risk level is a function of the likelihood of an adverse event and its impact (harm) if it occurs." },
        { text: "By the number of test cases that have already been executed against the item", correct: false, why: "Test execution count measures progress, not risk. Risk exists independently of how many tests have run." },
        { text: "By the total cost of the development project divided by the schedule", correct: false, why: "That describes a budget or burn-rate metric, not the two factors (likelihood and impact) that define a risk level." },
        { text: "By the number of defects found in the previous release only", correct: false, why: "Historical defect counts can inform likelihood, but on their own they are not the definition of risk level, which also requires impact." }
      ],
      explanation: "A risk is the possibility of an event that has negative consequences. Its level is derived from two dimensions: likelihood (probability the adverse event happens) and impact (the harm or damage if it does). Both must be considered together.",
      workplaceExample: "A payments team rates a checkout defect as high risk because a failure is fairly likely under load (likelihood) and would stop all revenue (impact), so its risk level is high on both axes."
    },
    {
      kLevel: "K1",
      question: "Which two factors combine to express the level of a risk?",
      options: [
        { text: "Likelihood of occurrence and impact if it occurs", correct: true, why: "These are the two defining factors of risk level in the ISTQB syllabus." },
        { text: "Severity of a defect and its priority for fixing", correct: false, why: "Severity and priority classify defects that already exist; risk concerns potential future events." },
        { text: "Number of testers available and the length of the test window", correct: false, why: "These are resource and schedule constraints, not the factors that define a risk level." },
        { text: "Code coverage achieved and the tool used to measure it", correct: false, why: "Coverage is a measure of test thoroughness, unrelated to the definition of risk level." }
      ],
      explanation: "Risk level = likelihood x impact. Likelihood is how probable the adverse event is; impact is how much harm results if it happens. Neither factor alone gives the risk level.",
      workplaceExample: "A team logs each risk in a register with a likelihood score (1-5) and an impact score (1-5); multiplying them yields the risk level used to rank items."
    },
    {
      kLevel: "K2",
      question: "A team worries that a key developer may leave mid-project, delaying delivery. How is this risk best classified?",
      options: [
        { text: "A project risk, because it relates to management and control of the project", correct: true, why: "Staffing, resources, schedule, and organisational issues are project risks affecting the ability to deliver, not the quality of the product itself." },
        { text: "A product risk, because it will make the software defective", correct: false, why: "Losing staff threatens the project's delivery, not directly a quality characteristic of the product; it is a project risk." },
        { text: "A quality risk, because it concerns the reliability of the software", correct: false, why: "Product (quality) risks concern the product's characteristics; a departing developer is a resourcing issue, i.e. a project risk." },
        { text: "Not a risk at all, since it has not happened yet", correct: false, why: "A risk is precisely a potential future event; the fact it has not happened is what makes it a risk rather than an issue." }
      ],
      explanation: "Project risks relate to the management and control of the project: people (staffing, skills), organisational factors, technical issues (unstable environments), and supplier issues. A departing developer is a staffing project risk.",
      workplaceExample: "A test manager records key-person dependency in the project risk log and mitigates it by pairing juniors with the senior developer to spread knowledge."
    },
    {
      kLevel: "K2",
      question: "Which of the following is an example of a product (quality) risk?",
      options: [
        { text: "The application may calculate tax incorrectly for certain regions", correct: true, why: "This is a possible failure in the delivered product affecting a quality characteristic (functional correctness), so it is a product risk." },
        { text: "The test environment might not be ready in time for system testing", correct: false, why: "Environment readiness is a project/technical risk about the ability to run the project, not a quality of the product." },
        { text: "The vendor supplying a component may miss its delivery date", correct: false, why: "Supplier delivery is a project risk relating to management and control of the project." },
        { text: "Two teams may disagree on who owns the integration work", correct: false, why: "Organisational and ownership disputes are project risks, not product quality risks." }
      ],
      explanation: "Product (quality) risks are potential problems with the quality of the product: failures, missing functionality, poor reliability, security holes, usability issues. Incorrect tax calculation is a functional-correctness failure, a classic product risk.",
      workplaceExample: "A tester flags incorrect regional tax rounding as a product risk and designs boundary tests around each tax band to reduce the likelihood of the failure reaching production."
    },
    {
      kLevel: "K1",
      question: "What is a project risk?",
      options: [
        { text: "A risk related to the management and control of the project", correct: true, why: "Project risks concern the project's ability to deliver its objectives, e.g. staffing, schedule, supplier and organisational issues." },
        { text: "A risk that the delivered product will contain a defect", correct: false, why: "That describes a product (quality) risk, which concerns the quality of the product itself." },
        { text: "A risk that only appears during production monitoring", correct: false, why: "Project risks are identified and managed throughout the project, not only in production." },
        { text: "A risk with no impact on cost or schedule", correct: false, why: "Project risks frequently affect cost and schedule; the definition centres on management and control of the project." }
      ],
      explanation: "A project risk affects the project's capability to achieve its objectives. Categories include organisational issues, people/staffing, technical/environment problems, and supplier factors.",
      workplaceExample: "A late hardware delivery threatens the test schedule; the test lead records it as a project risk and prepares an emulator as a fallback."
    },
    {
      kLevel: "K1",
      question: "What is a product risk (also called a quality risk)?",
      options: [
        { text: "A risk that the product may fail to satisfy some reasonable expectation of quality", correct: true, why: "Product risks are potential problems with the quality of the product, e.g. failures, missing features, poor performance or security." },
        { text: "A risk that the project will run out of budget before release", correct: false, why: "Budget overrun is a project risk about managing the project, not a quality attribute of the product." },
        { text: "A risk that a stakeholder will not attend the review meeting", correct: false, why: "Attendance is an organisational project risk, not a product quality risk." },
        { text: "A risk that the test tool licence will expire", correct: false, why: "Tooling and licensing are project/technical risks, not risks about the product's quality." }
      ],
      explanation: "Product (quality) risks are directly related to the test object. They are the possibility that the software fails to meet expectations for functionality, reliability, performance, security, usability and other quality characteristics.",
      workplaceExample: "A slow search response under peak load is logged as a performance product risk, prompting the team to plan load tests before go-live."
    },
    {
      kLevel: "K2",
      question: "Classify the following: 'The requirements are ambiguous, so the team may build the wrong feature.' Which category fits best?",
      options: [
        { text: "Project risk, because it stems from process and communication issues in managing the project", correct: true, why: "Ambiguous requirements are an organisational/process problem affecting the project's ability to deliver correctly, so it is a project risk." },
        { text: "Product risk, because the delivered feature would be defective", correct: false, why: "While it could lead to product problems, the risk source here is a project process weakness (requirements management), making it a project risk." },
        { text: "Neither, because ambiguity cannot be measured", correct: false, why: "Ambiguity is a recognised project risk and is regularly assessed; measurability does not determine whether something is a risk." },
        { text: "A defect, because the wrong feature is already built", correct: false, why: "Nothing defective exists yet; this is a potential future problem, i.e. a risk, not a defect." }
      ],
      explanation: "Ambiguous or unstable requirements are classic project risks under organisational/process factors. They threaten the project's ability to deliver the correct product, even though the consequence may later surface as product issues.",
      workplaceExample: "A business analyst records ambiguous acceptance criteria as a project risk and schedules a clarification workshop before development starts."
    },
    {
      kLevel: "K2",
      question: "How does product risk analysis typically influence the thoroughness of testing?",
      options: [
        { text: "Higher-risk areas receive more thorough testing; lower-risk areas receive less", correct: true, why: "Risk-based testing allocates effort in proportion to risk, so thoroughness increases with risk level." },
        { text: "All areas are tested with identical thoroughness regardless of risk", correct: false, why: "Uniform testing ignores risk and wastes effort; risk-based testing deliberately varies thoroughness." },
        { text: "Thoroughness depends only on the size of the code, not on risk", correct: false, why: "Code size may correlate with effort, but risk-based testing drives thoroughness by risk level, not size alone." },
        { text: "Only low-risk areas are tested, to save time on the hard parts", correct: false, why: "That inverts the principle; the highest-risk areas warrant the most thorough testing." }
      ],
      explanation: "Product risk analysis guides how much testing to do. Where the risk level is high, tests are more extensive and use more rigorous techniques; where it is low, lighter testing is justified. This concentrates effort where potential harm is greatest.",
      workplaceExample: "The team applies decision-table and boundary testing to the high-risk pricing engine, but only smoke tests to a rarely used admin report screen."
    },
    {
      kLevel: "K2",
      question: "Product risk analysis can influence the ORDER in which tests are run. What is the main benefit of this ordering?",
      options: [
        { text: "The most important risks are addressed earliest, so serious problems are found sooner", correct: true, why: "Ordering by risk means high-risk defects surface early, giving more time to fix them and reducing the chance they reach release." },
        { text: "The test suite always finishes faster overall", correct: false, why: "Ordering does not reduce total execution time; its value is finding the most serious problems earliest." },
        { text: "It guarantees that no defects will remain at release", correct: false, why: "No ordering can guarantee zero defects; risk ordering reduces residual risk but cannot eliminate it." },
        { text: "It removes the need to write test cases for low-risk areas", correct: false, why: "Ordering concerns sequence, not whether low-risk tests exist; those may still be written and run later." }
      ],
      explanation: "Beyond thoroughness and prioritisation, risk analysis shapes sequencing. Running high-risk tests first exposes the most damaging defects early, when there is still time and budget to correct them.",
      workplaceExample: "With one week left, the lead runs the high-risk payment and login tests on day one, deferring cosmetic UI checks to later in the week."
    },
    {
      kLevel: "K2",
      question: "In risk-based testing, prioritisation of test activities is primarily driven by what?",
      options: [
        { text: "The level of risk associated with each area of the product", correct: true, why: "Prioritisation follows risk level so the highest-risk areas are tested first and most carefully." },
        { text: "The alphabetical order of the feature names", correct: false, why: "Alphabetical order is arbitrary and unrelated to where the greatest potential harm lies." },
        { text: "The personal preference of the individual tester", correct: false, why: "Prioritisation should be objective and risk-driven, not based on individual preference." },
        { text: "The order in which features were coded", correct: false, why: "Coding order does not reflect risk; a late-coded feature may be low risk and vice versa." }
      ],
      explanation: "Risk-based testing uses risk levels to prioritise. Areas with the highest risk are tested first and most thoroughly, ensuring limited resources target the most significant potential problems.",
      workplaceExample: "A test plan lists features ranked by risk score, and the schedule tackles the top-scoring items before moving down the list."
    },
    {
      kLevel: "K1",
      question: "Which activity is concerned with identifying risks and assessing their likelihood and impact?",
      options: [
        { text: "Risk analysis (comprising risk identification and risk assessment)", correct: true, why: "Risk analysis identifies risks and then assesses each one's likelihood and impact to determine its level." },
        { text: "Risk monitoring", correct: false, why: "Monitoring tracks known risks over time and checks whether mitigations are effective; it does not perform the initial assessment." },
        { text: "Risk mitigation", correct: false, why: "Mitigation takes action to reduce risk; it follows analysis rather than performing the identification and assessment." },
        { text: "Risk acceptance", correct: false, why: "Acceptance is a response choosing to tolerate a risk; it is not the identification-and-assessment activity." }
      ],
      explanation: "Risk management includes risk analysis (identification plus assessment), risk control (mitigation, monitoring, and response), and ongoing review. Risk analysis is where likelihood and impact are evaluated to set risk levels.",
      workplaceExample: "At sprint planning the team brainstorms possible failure points (identification) then scores each for likelihood and impact (assessment), producing a ranked risk list."
    },
    {
      kLevel: "K1",
      question: "What is the purpose of risk monitoring and control in risk-based testing?",
      options: [
        { text: "To track identified risks, check whether responses are effective, and detect new risks over time", correct: true, why: "Risk control includes monitoring known risks, reviewing mitigation effectiveness, and identifying new or changing risks as the project evolves." },
        { text: "To assign severity levels to defects that have already been found", correct: false, why: "That is defect management, not risk monitoring, which concerns potential future problems." },
        { text: "To write the final test summary report only", correct: false, why: "The summary report communicates results; risk monitoring is an ongoing control activity throughout the project." },
        { text: "To remove all risks from the project permanently", correct: false, why: "Risks cannot all be removed; monitoring keeps them visible and under control rather than eliminating them." }
      ],
      explanation: "Risk is dynamic. Monitoring and control revisit the risk assessment regularly: are mitigations working, have risk levels changed, have new risks emerged? Testing plans adjust accordingly.",
      workplaceExample: "Each sprint review the team re-scores open risks; when integration testing reduces the likelihood of an interface failure, that risk's level is lowered in the register."
    },
    {
      kLevel: "K2",
      question: "A tester notes: 'The server room might flood, destroying the test hardware.' How is this classified in risk-based testing?",
      options: [
        { text: "A project risk, because it threatens the resources and environment needed to run the project", correct: true, why: "Environmental/technical hazards that jeopardise the project's resources are project risks, not risks about product quality." },
        { text: "A product risk, because the software could be damaged", correct: false, why: "Software quality is not the concern here; the threat is to project infrastructure, making it a project risk." },
        { text: "A usability risk, because testers cannot use the room", correct: false, why: "Usability is a product quality characteristic of the software, unrelated to a physical facility hazard." },
        { text: "Not a testing concern at all", correct: false, why: "It is a legitimate project risk that a test manager should record and mitigate, e.g. with backups or an alternative site." }
      ],
      explanation: "Project risks include technical and environmental factors affecting the ability to deliver, such as facilities, hardware, and infrastructure. A flood threatening test hardware is such a project risk.",
      workplaceExample: "The test manager mitigates the flood project risk by mirroring the environment to a cloud instance so testing can continue if the on-premise room is lost."
    },
    {
      kLevel: "K3",
      question: "Given four items scored (likelihood, impact) on a 1-5 scale, which should be tested FIRST under risk-based testing? Login: (2,5); Report export: (1,2); Payment: (4,5); Help page: (1,1).",
      options: [
        { text: "Payment, because its risk level (4 x 5 = 20) is the highest", correct: true, why: "Multiplying likelihood by impact, Payment scores 20, higher than Login 10, Report export 2, and Help page 1, so it is tested first." },
        { text: "Login, because it has the highest impact score", correct: false, why: "Impact alone is not risk level; Login's overall risk (2 x 5 = 10) is lower than Payment's 20." },
        { text: "Help page, because it is quickest to test", correct: false, why: "Test-first order follows risk level, not ease of testing; Help page has the lowest risk (1)." },
        { text: "Report export, because exports are always critical", correct: false, why: "Its computed risk (1 x 2 = 2) is low; an unfounded assumption does not override the calculated risk level." }
      ],
      explanation: "Risk level combines likelihood and impact. Computing likelihood x impact gives Payment 20, Login 10, Report export 2, Help page 1. Risk-based testing tackles the highest risk (Payment) first.",
      workplaceExample: "The lead sorts the risk register by likelihood x impact descending and schedules the top item, Payment, at the very start of the test window."
    },
    {
      kLevel: "K2",
      question: "Which statement best describes the relationship between risk-based testing and product quality?",
      options: [
        { text: "By focusing test effort on the highest product risks, risk-based testing aims to reduce the risk of quality problems to an acceptable level", correct: true, why: "Risk-based testing targets the areas whose failure would most harm quality, thereby reducing residual quality risk efficiently." },
        { text: "Risk-based testing guarantees a defect-free product", correct: false, why: "No approach guarantees zero defects; risk-based testing manages and reduces risk, not eliminates it." },
        { text: "Risk-based testing ignores quality and focuses only on schedule", correct: false, why: "It is explicitly concerned with product quality risks; schedule is a separate (project) concern." },
        { text: "Risk-based testing tests every area equally to protect quality", correct: false, why: "Equal testing contradicts the approach, which deliberately concentrates effort on higher-risk areas." }
      ],
      explanation: "Risk-based testing connects testing to product quality by prioritising the areas whose failure poses the greatest threat to quality. It reduces the likelihood and impact of quality problems remaining at release to a level stakeholders accept.",
      workplaceExample: "Management accepts the residual risk on low-risk cosmetic screens because the team concentrated testing on the high-risk transaction paths that most affect quality."
    },
    {
      kLevel: "K2",
      question: "Risk-based testing helps decide what to test first. On what basis does it make that decision?",
      options: [
        { text: "The relative risk levels of the items, testing higher-risk items earlier", correct: true, why: "The whole point of risk-based prioritisation is to test the highest-risk items first so serious defects are found early." },
        { text: "The item that is easiest to automate", correct: false, why: "Automation ease is a practical convenience, not the risk-based criterion for what to test first." },
        { text: "The item most recently changed in version control", correct: false, why: "Recency of change may raise likelihood, but the decision is driven by overall risk level, not commit history alone." },
        { text: "The item that the newest team member is most comfortable with", correct: false, why: "Team comfort is irrelevant to determining which items carry the greatest risk." }
      ],
      explanation: "Risk-based testing sequences work by risk. Items with higher risk levels are tested earlier so that if serious problems exist, they are discovered while there is time to respond.",
      workplaceExample: "A regression cycle starts with the high-risk billing module and only later covers low-risk static content pages."
    },
    {
      kLevel: "K2",
      question: "Which of the following pairs a risk with the CORRECT category?",
      options: [
        { text: "Poor system response time under load - product (quality) risk", correct: true, why: "Response time is a performance-efficiency quality characteristic of the product, so slow response is a product risk." },
        { text: "Test environment delivered late - product (quality) risk", correct: false, why: "A late environment is a project/technical risk about running the project, not a quality attribute of the product." },
        { text: "Contract dispute with a supplier - product (quality) risk", correct: false, why: "Supplier disputes are project risks concerning management and control of the project." },
        { text: "Team members lack required skills - product (quality) risk", correct: false, why: "Skills gaps are people/organisational project risks, not product quality risks." }
      ],
      explanation: "Distinguishing categories: product risks concern the product's quality characteristics (functionality, performance, reliability, security, usability), while project risks concern staffing, suppliers, environment, and organisation. Slow response is a performance product risk.",
      workplaceExample: "The team lists slow response as a product risk (mitigated by performance testing) and a late environment as a project risk (mitigated by an escalation to infrastructure)."
    },
    {
      kLevel: "K1",
      question: "Which set of activities together make up risk management as applied in risk-based testing?",
      options: [
        { text: "Risk analysis (identification and assessment) and risk control (mitigation, monitoring and response)", correct: true, why: "Risk management spans analysing risks and then controlling them through mitigation, ongoing monitoring, and response." },
        { text: "Only writing test cases and executing them", correct: false, why: "Test design and execution are testing activities; risk management is the broader identification, assessment and control of risks." },
        { text: "Only counting defects after release", correct: false, why: "Defect counting is a metric, not the identification-assessment-control cycle of risk management." },
        { text: "Only approving the test plan", correct: false, why: "Approval is a governance step; it is not the full set of analysis and control activities." }
      ],
      explanation: "Risk management comprises risk analysis (identify risks, then assess likelihood and impact to set levels) and risk control (take mitigating actions, monitor risks over time, and respond as they change).",
      workplaceExample: "The QA lead runs a risk workshop (analysis), assigns owners and mitigations (control), and reviews the register each iteration (monitoring)."
    },
    {
      kLevel: "K2",
      question: "During a project, a previously low-risk module is heavily refactored close to release. What is the correct risk-based response?",
      options: [
        { text: "Reassess its risk; the change likely raises likelihood, so increase its test thoroughness and priority", correct: true, why: "Risk levels are not fixed; a late large change increases the chance of defects, so monitoring should raise the module's risk and testing effort." },
        { text: "Leave its testing unchanged because it was low risk at the start", correct: false, why: "Ignoring the change contradicts risk monitoring; risk levels must be revisited when circumstances change." },
        { text: "Stop testing it entirely to save time before release", correct: false, why: "Reducing testing on a freshly refactored module raises residual risk exactly when it should be reduced." },
        { text: "Move it to the project risk register instead", correct: false, why: "Its potential to fail is a product quality risk; re-categorising it does not address the raised likelihood." }
      ],
      explanation: "Risk monitoring means re-evaluating risks as the project changes. A large late refactor increases the likelihood of new defects, so the module's product risk rises and it warrants more thorough, higher-priority testing.",
      workplaceExample: "After a last-minute rewrite of the discount logic, the lead upgrades it from low to high risk and adds full regression and boundary tests before sign-off."
    },
    {
      kLevel: "K2",
      question: "Why can two items with the same impact still have different risk levels?",
      options: [
        { text: "Because they may differ in likelihood, and risk level depends on both likelihood and impact", correct: true, why: "Risk level combines both factors; equal impact but different likelihood yields different risk levels." },
        { text: "Because impact is the only factor that matters for risk", correct: false, why: "Impact alone does not set risk level; likelihood is equally part of the definition." },
        { text: "Because risk level is decided randomly", correct: false, why: "Risk level is assessed systematically from likelihood and impact, not at random." },
        { text: "Because they were written by different testers", correct: false, why: "Authorship does not affect a risk's level; likelihood and impact do." }
      ],
      explanation: "Since risk level is a function of likelihood and impact, two items sharing an impact score can still differ in risk if one is far more likely to fail than the other.",
      workplaceExample: "Two features would both halt sales if they failed (equal impact), but the newer, complex one is far more likely to fail, so it is rated higher risk and tested first."
    },
    {
      kLevel: "K3",
      question: "A test manager has effort for only 60 percent of planned tests. Register scores (likelihood x impact): A=25, B=6, C=20, D=4, E=15, F=3. Under risk-based testing, which items are covered?",
      options: [
        { text: "A, C and E, because they carry the highest risk levels", correct: true, why: "Sorting by risk descending gives A(25), C(20), E(15), B(6), D(4), F(3); the top three highest-risk items are covered when effort is limited." },
        { text: "B, D and F, to clear the quick low-risk items first", correct: false, why: "Risk-based testing covers the highest risks first, not the lowest; B, D, F are the least risky." },
        { text: "A, B and C, taking them in alphabetical order", correct: false, why: "Selection follows risk level, not the alphabet; E(15) outranks B(6)." },
        { text: "All six equally at reduced depth", correct: false, why: "Spreading thinly across all items dilutes coverage of the highest risks, which is what risk-based testing protects." }
      ],
      explanation: "With constrained effort, risk-based testing covers the highest-risk items first. Ranked by likelihood x impact: A 25, C 20, E 15, B 6, D 4, F 3. The top three (A, C, E) receive the available effort.",
      workplaceExample: "Facing a cut test window, the manager guarantees the top three risk-scored features are fully tested and documents the remaining items as accepted residual risk."
    },
    {
      kLevel: "K2",
      question: "Which of the following is the clearest example of a project risk affecting the test process itself?",
      options: [
        { text: "The test data cannot be prepared in time because the source system access is delayed", correct: true, why: "Delayed access to prepare test data is a project/technical risk that impedes the ability to carry out testing." },
        { text: "The login screen may reject valid credentials", correct: false, why: "A login failure is a product (quality) risk about the software's functional correctness." },
        { text: "The search results may be returned in the wrong order", correct: false, why: "Incorrect ordering is a functional product risk, not a project risk." },
        { text: "The report may show outdated figures to users", correct: false, why: "Showing stale data is a product quality risk affecting accuracy, not a project risk." }
      ],
      explanation: "Project risks can directly threaten the test process, for example unavailable test data, unstable environments, or delayed access. These jeopardise the ability to test, distinct from product risks about the software's quality.",
      workplaceExample: "The lead escalates delayed database access as a project risk because without it the team cannot build the test data needed to start execution."
    },
    {
      kLevel: "K2",
      question: "How does risk-based testing typically use the results of risk analysis when planning?",
      options: [
        { text: "To select techniques, allocate effort, and sequence testing according to each area's risk level", correct: true, why: "Risk analysis informs which techniques to apply, how much effort to spend, and the order of testing, all scaled to risk." },
        { text: "To decide the colour scheme of the test report", correct: false, why: "Presentation styling is unrelated to how risk analysis drives test planning." },
        { text: "To set the office seating plan for the test team", correct: false, why: "Logistics of seating have nothing to do with using risk analysis to plan testing." },
        { text: "To fix the number of testers permanently regardless of findings", correct: false, why: "Risk analysis informs flexible allocation; it does not lock staffing irrespective of the risk picture." }
      ],
      explanation: "The output of risk analysis feeds test planning in several ways: choosing more rigorous techniques for high-risk areas, allocating more effort there, and ordering tests so high-risk items run first. This makes testing efficient and focused.",
      workplaceExample: "The plan assigns experienced testers and exploratory plus scripted techniques to high-risk modules, while low-risk areas get a brief checklist review."
    },
    {
      kLevel: "K1",
      question: "Which statement about risk in testing is TRUE?",
      options: [
        { text: "A risk is a potential event with negative consequences that has not yet occurred", correct: true, why: "Risk concerns possible future adverse events; once one occurs it becomes an issue or a defect, not a risk." },
        { text: "A risk and a defect are the same thing", correct: false, why: "A defect is a realised flaw already present; a risk is a possibility of a future problem." },
        { text: "A risk is any test case that has passed", correct: false, why: "A passed test case is a result, not a potential adverse future event." },
        { text: "A risk only exists after software is released", correct: false, why: "Risks are identified and managed throughout the lifecycle, well before release." }
      ],
      explanation: "A risk is the possibility of an adverse event with negative consequences that has not yet happened. It is characterised by likelihood and impact and is distinct from a defect, which is an existing flaw.",
      workplaceExample: "In sprint planning the team lists what might go wrong (risks) before any code exists, so testing can be aimed at preventing those problems."
    },
    {
      kLevel: "K2",
      question: "A stakeholder asks why the team spent little time testing the printable terms-and-conditions page. What is the best risk-based justification?",
      options: [
        { text: "Its risk level is low: failure is unlikely and the impact would be minor, so light testing is proportionate", correct: true, why: "Risk-based testing allocates effort by risk; a low likelihood and low impact justify minimal testing of that page." },
        { text: "Static pages never need any testing under any circumstances", correct: false, why: "The justification is proportionality to risk, not a blanket rule; a high-risk static page could still need testing." },
        { text: "The team simply ran out of time and skipped it", correct: false, why: "Running out of time is not a risk-based justification; the point is that its low risk made light testing appropriate." },
        { text: "It was the least interesting page to test", correct: false, why: "Interest level is not a risk criterion; risk level (likelihood and impact) is what justifies the effort spent." }
      ],
      explanation: "Risk-based testing defends effort allocation by risk level. A rarely changing, low-impact page has low risk, so spending little effort there is proportionate and lets resources focus on high-risk areas.",
      workplaceExample: "The lead shows stakeholders the risk register, pointing to the terms page's low likelihood-and-impact score to explain the minimal testing it received."
    }
  ]
};
