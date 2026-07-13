export default {
  courseSlug: "istqb-foundation-masterclass",
  moduleNumber: 5,
  syllabusTopic: "Managing the Test Process",
  questions: [
    {
      id: "m5-q01",
      kLevel: "K1",
      question: "What is the primary purpose of a test plan?",
      options: [
        {
          text: "To describe the test objectives, resources, and processes for a test project, and to serve as a means of communication with stakeholders.",
          correct: true,
          why: "A test plan documents the objectives, scope, resources, schedule, and approach for testing, and communicates this to stakeholders."
        },
        {
          text: "To record the detailed step-by-step actions and expected results for every individual test case.",
          correct: false,
          why: "That describes test cases or test procedures, not a test plan, which operates at a higher planning level."
        },
        {
          text: "To log every defect found during test execution together with its severity and status.",
          correct: false,
          why: "Defect logging belongs in a defect management tool or report, not in the test plan."
        },
        {
          text: "To provide the final pass or fail verdict for the release after execution is complete.",
          correct: false,
          why: "The final verdict comes from a test completion report and exit criteria evaluation, not from the plan itself."
        }
      ],
      explanation: "A test plan describes the objectives, resources, schedule, scope, and approach of testing, and is a key communication vehicle with stakeholders. It is a planning artifact, distinct from test cases, defect logs, or completion reports.",
      workplaceExample: "Before a payments release, a test manager drafts a test plan naming the in-scope APIs, the two-week window, the three testers assigned, the risk-based approach, and the entry and exit criteria, then circulates it to the product owner and dev lead for sign-off."
    },
    {
      id: "m5-q02",
      kLevel: "K2",
      question: "Which of the following is typically NOT part of the content of a test plan?",
      options: [
        {
          text: "The actual defect reports produced during test execution.",
          correct: true,
          why: "Defect reports are execution outputs generated later; they are not content authored within the test plan."
        },
        {
          text: "The scope, objectives, and test approach.",
          correct: false,
          why: "Scope, objectives, and approach are core elements of any test plan."
        },
        {
          text: "Entry criteria and exit criteria.",
          correct: false,
          why: "Entry and exit criteria are standard planning content that define when testing can start and stop."
        },
        {
          text: "Resources, schedule, and roles.",
          correct: false,
          why: "Resource allocation, scheduling, and role assignment are typical test plan content."
        }
      ],
      explanation: "A test plan contains scope, objectives, approach, entry and exit criteria, schedule, resources, and roles. Actual defect reports are produced during execution and are not authored as part of the plan.",
      workplaceExample: "When reviewing a colleague's test plan, a tester points out that the embedded defect list belongs in Jira, not the plan, and suggests replacing it with the exit criterion 'no open critical or high defects'."
    },
    {
      id: "m5-q03",
      kLevel: "K2",
      question: "How does a tester best contribute to iteration planning in an Agile project?",
      options: [
        {
          text: "By estimating the testing effort for user stories and identifying risks, testability issues, and acceptance criteria.",
          correct: true,
          why: "Testers add value in iteration planning by estimating test effort, flagging risks and testability gaps, and clarifying acceptance criteria."
        },
        {
          text: "By waiting until all development is complete before offering any input on the stories.",
          correct: false,
          why: "Deferring input until after development contradicts the shift-left principle and reduces the tester's influence on planning."
        },
        {
          text: "By approving the sprint backlog on behalf of the product owner.",
          correct: false,
          why: "Prioritising and approving the backlog is the product owner's responsibility, not the tester's."
        },
        {
          text: "By writing the production code for the highest-priority stories.",
          correct: false,
          why: "Writing production code is a developer task; the tester contributes testing expertise, not implementation."
        }
      ],
      explanation: "In iteration planning, testers help estimate test effort, raise risks and testability concerns, and refine acceptance criteria so stories are well understood before development begins.",
      workplaceExample: "During sprint planning, a tester reads a story about bulk file upload, asks how large files should be handled, and adds an acceptance criterion for the 50 MB limit before the team commits to the story."
    },
    {
      id: "m5-q04",
      kLevel: "K2",
      question: "What is a valuable contribution a tester can make during release planning?",
      options: [
        {
          text: "Helping define and refine testable features, estimating test effort across iterations, and highlighting quality risks that affect the release timeline.",
          correct: true,
          why: "Release planning benefits from the tester's input on testability, cross-iteration effort, and quality risks that could affect scope or timing."
        },
        {
          text: "Deciding the commercial price of the product for the market.",
          correct: false,
          why: "Pricing is a business and product management decision, unrelated to a tester's testing role."
        },
        {
          text: "Selecting the cloud hosting provider for production deployment.",
          correct: false,
          why: "Infrastructure selection is an operations or architecture decision, not a testing contribution."
        },
        {
          text: "Refusing to estimate anything until every requirement is frozen.",
          correct: false,
          why: "Agile release planning proceeds with evolving requirements; refusing to estimate blocks the team rather than helping."
        }
      ],
      explanation: "At the release level, testers contribute by refining testable features, estimating effort across the release, and surfacing quality risks that influence release scope and timing.",
      workplaceExample: "In a release planning workshop spanning six sprints, a tester flags that a third-party integration will need a dedicated hardening sprint, prompting the team to reserve capacity for end-to-end testing before go-live."
    },
    {
      id: "m5-q05",
      kLevel: "K1",
      question: "What do entry criteria define?",
      options: [
        {
          text: "The conditions that must be met before a given test activity can start.",
          correct: true,
          why: "Entry criteria (a definition of ready) specify the preconditions that must hold before testing can begin."
        },
        {
          text: "The conditions that must be met before a test activity can be declared complete.",
          correct: false,
          why: "That defines exit criteria (definition of done), not entry criteria."
        },
        {
          text: "The severity levels used to classify defects found during testing.",
          correct: false,
          why: "Severity classification is part of defect management, not entry criteria."
        },
        {
          text: "The order in which test cases are executed during a test run.",
          correct: false,
          why: "Execution order relates to test case prioritisation and scheduling, not entry criteria."
        }
      ],
      explanation: "Entry criteria, sometimes called a definition of ready, define the preconditions that must be satisfied before a test activity can begin, such as a stable test environment and available test data.",
      workplaceExample: "The system test team refuses to start execution until their entry criteria are met: the build is deployed to the QA environment, test data is loaded, and all smoke tests pass."
    },
    {
      id: "m5-q06",
      kLevel: "K1",
      question: "What do exit criteria define?",
      options: [
        {
          text: "The conditions that must be met to declare a test activity or level complete.",
          correct: true,
          why: "Exit criteria (a definition of done) specify what must be true to consider testing finished."
        },
        {
          text: "The preconditions that must exist before test execution can begin.",
          correct: false,
          why: "Those are entry criteria, not exit criteria."
        },
        {
          text: "The tools that must be installed in the test environment.",
          correct: false,
          why: "Tool installation is an environment setup detail, not an exit criterion."
        },
        {
          text: "The names of the testers assigned to each test level.",
          correct: false,
          why: "Role assignment is planning content but does not define completion of a test activity."
        }
      ],
      explanation: "Exit criteria, sometimes called a definition of done, define the conditions that must be met to consider a test activity or level complete, such as coverage targets achieved and no open critical defects.",
      workplaceExample: "A team agrees the exit criteria for their sprint are: all planned tests executed, 90 percent of critical-path tests passing, and zero open blocker defects before the story is marked done."
    },
    {
      id: "m5-q07",
      kLevel: "K2",
      question: "In Agile, how do the concepts of definition of ready and definition of done relate to entry and exit criteria?",
      options: [
        {
          text: "Definition of ready aligns with entry criteria and definition of done aligns with exit criteria.",
          correct: true,
          why: "Definition of ready plays the role of entry criteria, and definition of done plays the role of exit criteria."
        },
        {
          text: "Definition of ready aligns with exit criteria and definition of done aligns with entry criteria.",
          correct: false,
          why: "This reverses the mapping; ready is a precondition and done is a completion condition."
        },
        {
          text: "Both terms refer only to defect severity thresholds.",
          correct: false,
          why: "Neither term is about defect severity; they describe readiness and completion conditions."
        },
        {
          text: "They are unrelated to entry and exit criteria and apply only to documentation.",
          correct: false,
          why: "They are directly analogous to entry and exit criteria in Agile contexts."
        }
      ],
      explanation: "In Agile teams, the definition of ready functions as entry criteria (conditions for starting work on a story) and the definition of done functions as exit criteria (conditions for considering the story complete).",
      workplaceExample: "A Scrum team posts two checklists on the wall: 'Ready' (story estimated, acceptance criteria clear, dependencies resolved) and 'Done' (code reviewed, tests passing, deployed to staging), mirroring classic entry and exit criteria."
    },
    {
      id: "m5-q08",
      kLevel: "K1",
      question: "Which estimation technique bases the estimate of test effort on data from previous or similar projects?",
      options: [
        {
          text: "Metrics-based estimation.",
          correct: true,
          why: "Metrics-based estimation uses historical data and measurements from past or similar projects to project effort."
        },
        {
          text: "Expert-based estimation.",
          correct: false,
          why: "Expert-based estimation relies on the judgement of people who understand the tasks, not primarily on historical metrics."
        },
        {
          text: "Exploratory estimation.",
          correct: false,
          why: "There is no standard technique called exploratory estimation; this is a distractor."
        },
        {
          text: "Boundary-based estimation.",
          correct: false,
          why: "Boundary value analysis is a test technique, not an effort estimation method."
        }
      ],
      explanation: "Metrics-based estimation derives the test effort from measurements and historical data collected on previous or comparable projects, such as defects per module or hours per test case.",
      workplaceExample: "A test lead estimates the next release will need 120 tester-hours because the last three similar releases averaged four hours of testing per completed user story and this release has 30 stories."
    },
    {
      id: "m5-q09",
      kLevel: "K1",
      question: "Which estimation technique relies on the judgement and experience of the task owners or subject matter experts?",
      options: [
        {
          text: "Expert-based estimation.",
          correct: true,
          why: "Expert-based estimation is founded on the experience and judgement of those who own or understand the tasks."
        },
        {
          text: "Metrics-based estimation.",
          correct: false,
          why: "Metrics-based estimation uses historical data, not primarily expert judgement."
        },
        {
          text: "Equivalence partitioning.",
          correct: false,
          why: "Equivalence partitioning is a black-box test design technique, not an estimation method."
        },
        {
          text: "Statement coverage estimation.",
          correct: false,
          why: "Statement coverage is a white-box coverage measure, not an effort estimation technique."
        }
      ],
      explanation: "Expert-based estimation draws on the experience and judgement of the people who will perform the work or who understand it well, such as testers estimating tasks in a planning poker session.",
      workplaceExample: "During planning poker, three testers each reveal a card for a complex story; after discussing why one estimated higher due to hidden integration testing, they converge on an agreed effort estimate."
    },
    {
      id: "m5-q10",
      kLevel: "K2",
      question: "A team wants to estimate test effort but has no historical data from prior projects. Which technique is most appropriate?",
      options: [
        {
          text: "Expert-based estimation, using the judgement of experienced team members.",
          correct: true,
          why: "Without historical metrics, expert judgement is the practical basis for estimation."
        },
        {
          text: "Metrics-based estimation, using data from earlier projects.",
          correct: false,
          why: "Metrics-based estimation requires historical data, which is unavailable in this scenario."
        },
        {
          text: "Skipping estimation entirely and starting execution immediately.",
          correct: false,
          why: "Omitting estimation removes the basis for planning and tracking, which is poor practice."
        },
        {
          text: "Copying the previous team's plan without any adjustment.",
          correct: false,
          why: "There is no previous plan or data in this scenario, and blind copying ignores context."
        }
      ],
      explanation: "When no historical metrics exist, metrics-based estimation is not feasible, so the team relies on expert-based estimation, using the experience of team members to judge the likely effort.",
      workplaceExample: "A startup building its first product has no past data, so the QA lead runs a planning poker session where each tester estimates stories from experience, and the team averages the results."
    },
    {
      id: "m5-q11",
      kLevel: "K2",
      question: "Which of the following best describes risk-based test case prioritisation?",
      options: [
        {
          text: "Ordering test cases so that those addressing the highest product risks are executed first.",
          correct: true,
          why: "Risk-based prioritisation runs tests for the highest-risk areas earliest to reduce residual risk sooner."
        },
        {
          text: "Ordering test cases alphabetically by their identifier.",
          correct: false,
          why: "Alphabetical ordering ignores risk and business value and is not a meaningful prioritisation strategy."
        },
        {
          text: "Running the quickest test cases first regardless of what they cover.",
          correct: false,
          why: "Optimising purely for speed is not risk-based; it ignores the importance of what is tested."
        },
        {
          text: "Executing only test cases that have never failed before.",
          correct: false,
          why: "Selecting by past pass history is neither risk-based nor a sound prioritisation approach."
        }
      ],
      explanation: "Risk-based prioritisation sequences test cases so that the areas with the highest likelihood and impact of failure are tested first, ensuring the most important risks are mitigated early.",
      workplaceExample: "With only two days before release, the team runs the payment and login tests first because a failure there would be catastrophic, deferring the low-risk cosmetic tests to the end."
    },
    {
      id: "m5-q12",
      kLevel: "K2",
      question: "Which of the following best describes coverage-based test case prioritisation?",
      options: [
        {
          text: "Ordering test cases to achieve a target level of coverage as quickly as possible, for example maximising the code or requirements covered by the earliest tests.",
          correct: true,
          why: "Coverage-based prioritisation sequences tests to reach coverage goals rapidly, front-loading tests that cover the most new items."
        },
        {
          text: "Ordering test cases by the seniority of the tester who wrote them.",
          correct: false,
          why: "Author seniority has nothing to do with coverage-based prioritisation."
        },
        {
          text: "Ordering test cases so the highest business-risk items run first.",
          correct: false,
          why: "That describes risk-based prioritisation, not coverage-based."
        },
        {
          text: "Running only the test cases linked to the newest requirements.",
          correct: false,
          why: "Limiting to newest requirements is a selection choice, not coverage-based ordering to maximise coverage quickly."
        }
      ],
      explanation: "Coverage-based prioritisation orders test cases to reach a desired coverage level as fast as possible, for example by choosing tests that add the most previously uncovered items early in the run.",
      workplaceExample: "A tester with limited time picks the test cases that together exercise the most distinct code paths first, so that even a partial run achieves high statement coverage."
    },
    {
      id: "m5-q13",
      kLevel: "K2",
      question: "Which of the following best describes requirements-based test case prioritisation?",
      options: [
        {
          text: "Ordering test cases according to the priority of the requirements they verify.",
          correct: true,
          why: "Requirements-based prioritisation follows the importance assigned to the requirements each test covers."
        },
        {
          text: "Ordering test cases by the length of their test steps.",
          correct: false,
          why: "Test step length is unrelated to requirement priority."
        },
        {
          text: "Ordering test cases to maximise code coverage as fast as possible.",
          correct: false,
          why: "That describes coverage-based prioritisation, not requirements-based."
        },
        {
          text: "Ordering test cases so that automated tests always run before manual tests.",
          correct: false,
          why: "Automation status is not the basis for requirements-based prioritisation."
        }
      ],
      explanation: "Requirements-based prioritisation sequences test cases according to the priority of the requirements they cover, so that tests verifying the most important requirements run first.",
      workplaceExample: "The product owner marks three requirements as must-have and five as nice-to-have; the tester schedules the must-have requirement tests at the start of the cycle."
    },
    {
      id: "m5-q14",
      kLevel: "K3",
      question: "A regulated medical device release has these constraints: an audit requires the mandatory safety requirements to be verified first, and there is a hard deadline. Which prioritisation approach most directly ensures the mandatory safety requirements are tested first?",
      options: [
        {
          text: "Requirements-based prioritisation driven by the mandatory priority assigned to the safety requirements.",
          correct: true,
          why: "Because the mandate is expressed at the requirement level, requirements-based prioritisation directly orders tests by those requirement priorities."
        },
        {
          text: "Coverage-based prioritisation aimed at maximising code coverage quickly.",
          correct: false,
          why: "Maximising code coverage does not guarantee the specific safety requirements are verified first."
        },
        {
          text: "Alphabetical ordering of the test case identifiers.",
          correct: false,
          why: "Alphabetical ordering ignores the requirement mandate entirely."
        },
        {
          text: "Running the fastest test cases first to save time.",
          correct: false,
          why: "Speed-first ordering could leave mandatory safety requirements untested until late."
        }
      ],
      explanation: "When the obligation is stated at the requirement level (mandatory safety requirements must be verified first), requirements-based prioritisation aligns tests directly with those requirement priorities, satisfying the audit constraint.",
      workplaceExample: "For an infusion pump release, the QA lead maps each safety requirement to its test cases and schedules all mandatory-requirement tests at the front of the run so the auditor sees them verified first."
    },
    {
      id: "m5-q15",
      kLevel: "K3",
      question: "A team has a build that fails smoke tests, an empty test data set, and an unstable environment. Applying entry criteria, what is the correct action?",
      options: [
        {
          text: "Do not start the planned test level, because the entry criteria are not met.",
          correct: true,
          why: "Entry criteria act as a gate; when preconditions like a passing smoke test and stable environment are unmet, testing should not begin."
        },
        {
          text: "Start full test execution anyway to avoid falling behind schedule.",
          correct: false,
          why: "Starting when entry criteria fail wastes effort and produces unreliable results due to the unstable environment."
        },
        {
          text: "Declare the test level complete because no tests can run.",
          correct: false,
          why: "Inability to start is not completion; declaring done would misrepresent the status and ignore exit criteria."
        },
        {
          text: "Log all planned tests as passed since the environment is not ready.",
          correct: false,
          why: "Marking untested cases as passed is falsification and violates basic testing integrity."
        }
      ],
      explanation: "Entry criteria gate the start of a test activity. With a failing smoke test, no test data, and an unstable environment, the preconditions are unmet, so the team should hold off starting and get the environment and data ready first.",
      workplaceExample: "The QA lead reports in standup that system testing cannot begin because the nightly build failed smoke tests and staging is down, so the ticket stays in 'Blocked' until the environment is fixed."
    },
    {
      id: "m5-q16",
      kLevel: "K1",
      question: "In the test pyramid, which layer typically contains the largest number of tests?",
      options: [
        {
          text: "The bottom layer of unit or component tests.",
          correct: true,
          why: "The pyramid is widest at the base, indicating many fast, isolated unit tests."
        },
        {
          text: "The top layer of end-to-end or UI tests.",
          correct: false,
          why: "The top of the pyramid is narrow, indicating relatively few slow end-to-end tests."
        },
        {
          text: "The middle layer of integration or service tests only.",
          correct: false,
          why: "The middle layer has more tests than the top but fewer than the base; it is not the largest."
        },
        {
          text: "All layers contain an equal number of tests by definition.",
          correct: false,
          why: "The pyramid shape deliberately shows unequal quantities, with the base being largest."
        }
      ],
      explanation: "The test pyramid places the most tests at the base (fast, isolated unit and component tests), fewer at the integration or service level, and fewest at the top (slow end-to-end tests).",
      workplaceExample: "A team's CI dashboard shows 2,400 unit tests, 300 service tests, and 40 end-to-end UI tests, matching the pyramid shape and keeping the overall suite fast."
    },
    {
      id: "m5-q17",
      kLevel: "K2",
      question: "Why does the test pyramid recommend fewer end-to-end tests at the top than unit tests at the base?",
      options: [
        {
          text: "End-to-end tests are slower, more expensive to maintain, and more brittle than unit tests, so their number is kept small.",
          correct: true,
          why: "Higher-level tests run slower and break more easily, so the pyramid favours many cheap unit tests and few expensive end-to-end tests."
        },
        {
          text: "End-to-end tests find no defects, so only a few are worth writing.",
          correct: false,
          why: "End-to-end tests do find integration and workflow defects; the reason to limit them is cost and speed, not lack of value."
        },
        {
          text: "Unit tests cannot be automated, so more of them are needed.",
          correct: false,
          why: "Unit tests are typically the easiest to automate; this statement is false."
        },
        {
          text: "The pyramid shape is purely decorative and has no basis in test cost.",
          correct: false,
          why: "The pyramid shape reflects real trade-offs in speed, cost, and stability across levels."
        }
      ],
      explanation: "The pyramid favours many fast, cheap, stable unit tests at the base and few slow, costly, brittle end-to-end tests at the top, balancing feedback speed and maintenance cost while still covering integrated behaviour.",
      workplaceExample: "After a flaky UI suite kept blocking deploys, the team pushed most validation logic checks down into unit tests and kept only a handful of critical end-to-end journeys, cutting pipeline time in half."
    },
    {
      id: "m5-q18",
      kLevel: "K2",
      question: "What do the testing quadrants primarily help a team relate?",
      options: [
        {
          text: "Test levels and test types, distinguishing business-facing from technology-facing tests and those that support the team from those that critique the product.",
          correct: true,
          why: "The testing quadrants organise tests along two axes: supporting the team versus critiquing the product, and business-facing versus technology-facing."
        },
        {
          text: "Only the severity and priority of defects found in production.",
          correct: false,
          why: "The quadrants classify test types and purposes, not defect severity and priority."
        },
        {
          text: "The salaries and seniority levels of the test team members.",
          correct: false,
          why: "The model has nothing to do with staffing or salaries."
        },
        {
          text: "The number of test cases required to reach full statement coverage.",
          correct: false,
          why: "Coverage counting is unrelated to the testing quadrants model."
        }
      ],
      explanation: "The testing quadrants (Agile testing quadrants) relate test levels and test types by classifying tests as business-facing or technology-facing and as supporting the team or critiquing the product, giving a balanced view of what to test.",
      workplaceExample: "A team uses the quadrants to check coverage balance and realises they have plenty of technology-facing unit tests but no business-facing exploratory or usability testing, so they add those."
    },
    {
      id: "m5-q19",
      kLevel: "K2",
      question: "In the testing quadrants, which of the following are examples of technology-facing tests that support the team?",
      options: [
        {
          text: "Unit tests and component integration tests.",
          correct: true,
          why: "Unit and component integration tests are technology-facing and guide development, placing them in the team-supporting technology-facing quadrant."
        },
        {
          text: "Exploratory testing and usability testing.",
          correct: false,
          why: "Those are business-facing tests that critique the product, in a different quadrant."
        },
        {
          text: "Functional acceptance tests written from user stories.",
          correct: false,
          why: "Story-based functional tests are business-facing tests that support the team, not technology-facing."
        },
        {
          text: "Performance and security tests that critique the product.",
          correct: false,
          why: "Performance and security tests are technology-facing but sit in the quadrant that critiques the product, not the team-supporting quadrant."
        }
      ],
      explanation: "The testing quadrants place unit and component integration tests in the technology-facing, team-supporting quadrant, since they are written by developers to guide and safeguard the implementation.",
      workplaceExample: "Developers write unit and component integration tests as they build a service, giving them fast feedback that their code behaves as designed before any business-facing testing occurs."
    },
    {
      id: "m5-q20",
      kLevel: "K2",
      question: "In the testing quadrants, functional tests and story-based acceptance tests that confirm the product does what the business wants are best described as:",
      options: [
        {
          text: "Business-facing tests that support the team.",
          correct: true,
          why: "Functional and story acceptance tests express business expectations and guide development, placing them in the business-facing, team-supporting quadrant."
        },
        {
          text: "Technology-facing tests that support the team.",
          correct: false,
          why: "That quadrant holds unit and integration tests, which are technology-facing, not business-facing functional tests."
        },
        {
          text: "Technology-facing tests that critique the product.",
          correct: false,
          why: "That quadrant holds performance, security, and reliability tests, not business functional acceptance tests."
        },
        {
          text: "Business-facing tests that critique the product.",
          correct: false,
          why: "That quadrant holds exploratory and usability testing; automated story acceptance tests instead support the team."
        }
      ],
      explanation: "Functional and story-based acceptance tests are business-facing and support the team by expressing what the business expects, helping guide development toward the right behaviour.",
      workplaceExample: "A team writes Gherkin acceptance tests from each user story so that passing them demonstrates the feature meets the business intent, guiding developers as they build."
    },
    {
      id: "m5-q21",
      kLevel: "K2",
      question: "Which statement about the relationship between the test plan and risk is most accurate?",
      options: [
        {
          text: "The test approach in the plan is often shaped by the product and project risks identified for the effort.",
          correct: true,
          why: "Risk analysis informs the test approach, scope, and prioritisation documented in the plan."
        },
        {
          text: "A test plan must ignore risk to remain objective.",
          correct: false,
          why: "Ignoring risk would undermine effective planning; risk is a key driver of the approach."
        },
        {
          text: "Risk is only relevant after the plan is finalised and testing is complete.",
          correct: false,
          why: "Risk is considered during planning, not only afterwards."
        },
        {
          text: "The plan should allocate equal effort to every feature regardless of risk.",
          correct: false,
          why: "Equal effort ignores risk; higher-risk areas typically warrant more testing."
        }
      ],
      explanation: "The test plan documents an approach that is commonly driven by identified product and project risks, so that testing effort and prioritisation focus on the areas of greatest concern.",
      workplaceExample: "Because the risk assessment flagged the new tax calculation as high risk, the test plan allocates extra effort and detailed test conditions to that module while keeping lighter coverage on stable areas."
    },
    {
      id: "m5-q22",
      kLevel: "K2",
      question: "A team writes an exit criterion as 'all planned tests executed and no open critical defects'. What is the main benefit of stating exit criteria this way?",
      options: [
        {
          text: "It gives an objective, measurable basis for deciding whether the test activity is complete.",
          correct: true,
          why: "Measurable exit criteria let the team decide completion objectively rather than by opinion."
        },
        {
          text: "It guarantees the software contains zero defects.",
          correct: false,
          why: "No exit criterion can guarantee zero defects; testing shows the presence, not absence, of defects."
        },
        {
          text: "It removes the need to write a test plan at all.",
          correct: false,
          why: "Exit criteria are part of the plan; they do not replace it."
        },
        {
          text: "It ensures every possible input combination has been tested.",
          correct: false,
          why: "Exhaustive testing is impossible; the criterion does not claim complete input coverage."
        }
      ],
      explanation: "Clear, measurable exit criteria provide an objective basis for judging whether testing is complete, reducing subjective disputes about when to stop. They do not guarantee a defect-free product.",
      workplaceExample: "At the release gate, the team checks the two exit criteria against the dashboard: 100 percent of planned tests ran and there are no open critical defects, so they approve the release with confidence in the decision."
    },
    {
      id: "m5-q23",
      kLevel: "K3",
      question: "A tester must choose a prioritisation approach when the stakeholder concern is that the most frequently used customer journeys must never break, and usage analytics rank those journeys. Which approach fits best?",
      options: [
        {
          text: "Risk-based prioritisation, treating the most-used journeys as highest impact and testing them first.",
          correct: true,
          why: "High usage means high impact if broken, so risk-based ordering places those journeys first."
        },
        {
          text: "Coverage-based prioritisation to maximise line coverage quickly.",
          correct: false,
          why: "Maximising line coverage does not target the specific high-usage journeys the stakeholder cares about."
        },
        {
          text: "Ordering test cases by their creation date.",
          correct: false,
          why: "Creation date is arbitrary and ignores usage and impact."
        },
        {
          text: "Testing the least-used features first to clear them out.",
          correct: false,
          why: "Starting with least-used features delays the most impactful tests, the opposite of the goal."
        }
      ],
      explanation: "When impact is driven by how heavily a journey is used, risk-based prioritisation captures that impact and schedules the highest-impact, most-used journeys first, aligning testing with the stakeholder concern.",
      workplaceExample: "Analytics show 80 percent of sessions pass through search and checkout, so the tester treats those as highest risk and runs their tests first, ensuring a break there is caught before lower-traffic paths."
    },
    {
      id: "m5-q24",
      kLevel: "K2",
      question: "A test manager combines a rough expert estimate with historical defect and effort data to refine the schedule. Which best characterises this?",
      options: [
        {
          text: "Combining expert-based and metrics-based estimation to produce a more reliable estimate.",
          correct: true,
          why: "Using expert judgement together with historical metrics blends the two techniques for a stronger estimate."
        },
        {
          text: "Using only expert-based estimation and ignoring the historical data.",
          correct: false,
          why: "The scenario explicitly uses historical data as well, so it is not expert-based alone."
        },
        {
          text: "Using only metrics-based estimation and ignoring expert judgement.",
          correct: false,
          why: "Expert judgement is part of the described process, so it is not metrics-based alone."
        },
        {
          text: "Abandoning estimation because two techniques cannot be combined.",
          correct: false,
          why: "The techniques can and often are combined; this statement is false."
        }
      ],
      explanation: "In practice, estimation often blends expert-based judgement with metrics-based historical data, using each to check and refine the other for a more reliable estimate.",
      workplaceExample: "The test manager takes the team's planning-poker estimate, compares it with last quarter's actual hours per story point, and adjusts the schedule upward where history shows the team consistently underestimates."
    },
    {
      id: "m5-q25",
      kLevel: "K1",
      question: "Which of the following is a typical entry criterion for starting a test level?",
      options: [
        {
          text: "The test environment is available and the test items have been delivered and installed.",
          correct: true,
          why: "An available environment and delivered, installed test items are classic preconditions for starting testing."
        },
        {
          text: "All test cases have already passed.",
          correct: false,
          why: "All tests passing is a possible exit condition, not a precondition to start testing."
        },
        {
          text: "The test summary report has been signed off.",
          correct: false,
          why: "A signed-off summary report comes at the end of testing, not before it starts."
        },
        {
          text: "All defects have been closed by the developers.",
          correct: false,
          why: "Having no open defects is generally an exit criterion, not an entry criterion."
        }
      ],
      explanation: "Typical entry criteria include the availability of the test environment, delivery and installation of the test items, availability of test data, and readiness of test tools. These are preconditions that must exist before test execution begins.",
      workplaceExample: "Before starting integration testing, the team confirms the entry criteria: the QA environment is up, the latest build is deployed, and the test data set is loaded, then begins execution."
    }
  ]
};
