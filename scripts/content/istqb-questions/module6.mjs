export default {
  courseSlug: "istqb-foundation-masterclass",
  moduleNumber: 6,
  syllabusTopic: "Test Management",
  questions: [
    {
      kLevel: "K1",
      question: "What is the primary purpose of test monitoring?",
      options: [
        {
          text: "To gather information and provide feedback and visibility about test activities against the plan",
          correct: true,
          why: "Test monitoring collects data about ongoing test activities so progress and status can be compared against the plan and communicated to stakeholders."
        },
        {
          text: "To design new test cases when defects are found",
          correct: false,
          why: "Designing test cases is a test analysis and design activity, not the purpose of monitoring, which is about gathering status information."
        },
        {
          text: "To decide which programming language the application will use",
          correct: false,
          why: "Technology choices are development decisions and have nothing to do with the purpose of test monitoring."
        },
        {
          text: "To automatically fix defects detected during execution",
          correct: false,
          why: "Monitoring observes and reports; it does not fix defects. Defect correction is a development activity."
        }
      ],
      explanation: "Test monitoring is about collecting information on the ongoing test effort and comparing it against the test plan so that status is visible. Test control then uses that information to take corrective actions.",
      workplaceExample: "A test lead reviews a daily dashboard showing tests run, passed, failed and blocked, giving the project manager visibility into whether testing is on track for the release date."
    },
    {
      kLevel: "K1",
      question: "What is the primary purpose of test control?",
      options: [
        {
          text: "To take guiding or corrective actions based on the information gathered by test monitoring",
          correct: true,
          why: "Test control uses monitoring data to steer the test effort, for example reprioritizing tests or reallocating effort to stay aligned with objectives."
        },
        {
          text: "To gather metrics about test progress for reporting",
          correct: false,
          why: "Gathering metrics is the role of test monitoring; control is about acting on that information."
        },
        {
          text: "To write the initial test plan before the project starts",
          correct: false,
          why: "Producing the test plan is a test planning activity, not test control."
        },
        {
          text: "To approve the final production deployment on behalf of the business",
          correct: false,
          why: "Release approval is a business or governance decision; test control adjusts the test effort itself."
        }
      ],
      explanation: "Monitoring and control work as a pair: monitoring provides the feedback and control acts on it. Typical control actions include reprioritizing tests, changing the test schedule, or adjusting entry and exit criteria.",
      workplaceExample: "After monitoring shows a critical module failing many tests, the test manager reprioritizes the team to focus regression effort there and defers lower-risk areas, a classic control action."
    },
    {
      kLevel: "K2",
      question: "A team reports the percentage of requirements exercised by at least one test. Which category of test metric is this?",
      options: [
        {
          text: "Coverage metrics",
          correct: true,
          why: "Requirements exercised versus total requirements is a coverage measure, describing how much of a defined item has been tested."
        },
        {
          text: "Defect metrics",
          correct: false,
          why: "Defect metrics describe defects found, fixed and their density, not the proportion of items exercised."
        },
        {
          text: "Cost metrics",
          correct: false,
          why: "Cost metrics track budget and effort consumed, not the proportion of requirements covered."
        },
        {
          text: "Confidence metrics",
          correct: false,
          why: "Confidence measures stakeholder perception of quality; requirements exercised is an objective coverage figure, although it can feed confidence."
        }
      ],
      explanation: "Coverage metrics express how much of some defined item, such as requirements, code branches or risks, has been exercised by tests. They are a common input to monitoring and control.",
      workplaceExample: "A traceability report shows 92 of 100 user stories have at least one linked, executed test, so the team knows which eight stories still need coverage before the exit review."
    },
    {
      kLevel: "K2",
      question: "Which of the following is best classified as a defect metric used in test monitoring?",
      options: [
        {
          text: "Number of defects found and fixed, and defect density",
          correct: true,
          why: "Counts of defects found, fixed, outstanding, and defect density are core defect metrics used to judge quality and progress."
        },
        {
          text: "Percentage of test environments that are available",
          correct: false,
          why: "Environment availability is an environmental or blocking status metric, not a measure of defects."
        },
        {
          text: "The number of test cases still to be designed",
          correct: false,
          why: "Outstanding design work relates to test case status and progress, not to defects."
        },
        {
          text: "Stakeholder confidence in the product measured by survey",
          correct: false,
          why: "Confidence is its own metric category based on perception rather than counts of defects."
        }
      ],
      explanation: "Defect metrics include the number of defects found and fixed, defect density, and failure rates. They help assess product quality and the effectiveness of the test process.",
      workplaceExample: "A weekly report shows 40 defects raised, 31 fixed and 9 open, with two blockers, giving management a clear picture of remaining quality risk before go-live."
    },
    {
      kLevel: "K2",
      question: "Which metric most directly reflects test case status during execution?",
      options: [
        {
          text: "The number of test cases passed, failed, blocked and not yet run",
          correct: true,
          why: "Pass, fail, blocked and not-run counts are exactly the test case status information used to track execution progress."
        },
        {
          text: "The total lines of source code in the application",
          correct: false,
          why: "Code size is a product characteristic, not a status of test execution."
        },
        {
          text: "The hourly cost of the test environment",
          correct: false,
          why: "Environment cost is a budget metric and does not describe how many tests have run."
        },
        {
          text: "The number of stakeholders attending the test review",
          correct: false,
          why: "Meeting attendance has no bearing on the execution status of test cases."
        }
      ],
      explanation: "Test case status metrics report how many planned tests have been executed and with what result, typically passed, failed, blocked, or still to run. They are a primary indicator of execution progress.",
      workplaceExample: "The test lead posts a burndown: of 500 planned cases, 420 have run (390 passed, 30 failed) and 15 are blocked awaiting an environment fix, so 65 remain to be executed."
    },
    {
      kLevel: "K2",
      question: "A stakeholder asks how much trust the team has that the product is ready for release. Which type of metric best answers this?",
      options: [
        {
          text: "Confidence metrics",
          correct: true,
          why: "Confidence metrics capture the degree of trust stakeholders have in the product, often informed by coverage and defect trends."
        },
        {
          text: "Coverage metrics only",
          correct: false,
          why: "Coverage contributes to confidence but by itself does not express stakeholder trust in readiness."
        },
        {
          text: "Effort and cost metrics",
          correct: false,
          why: "Cost and effort track resource usage, not the confidence in product quality."
        },
        {
          text: "Environment availability metrics",
          correct: false,
          why: "Environment availability is a logistical status, not a measure of trust in the product."
        }
      ],
      explanation: "Confidence metrics express how much trust stakeholders place in the product or in the testing performed. They are often derived from other metrics such as coverage achieved and defect trends.",
      workplaceExample: "Before a go/no-go meeting the team summarizes high requirement coverage and a declining defect discovery rate to argue that confidence in the release is high."
    },
    {
      kLevel: "K1",
      question: "Which document is produced during a test activity to give an ongoing view of testing?",
      options: [
        {
          text: "Test progress report",
          correct: true,
          why: "A test progress report is prepared during a test activity to communicate current status and any deviations from the plan."
        },
        {
          text: "Test completion report",
          correct: false,
          why: "A test completion report is produced at the end of a test level or project, not during ongoing testing."
        },
        {
          text: "Test case specification",
          correct: false,
          why: "A test case specification defines tests; it is not a status report on progress."
        },
        {
          text: "Requirements specification",
          correct: false,
          why: "A requirements specification defines what to build and is not a testing status report."
        }
      ],
      explanation: "Test progress reports (sometimes called test status reports) are produced during a test activity and support ongoing monitoring and control. Test completion reports are produced at the end.",
      workplaceExample: "Every Friday the QA lead circulates a one-page progress report so stakeholders can see execution status without waiting for the end-of-project summary."
    },
    {
      kLevel: "K1",
      question: "When is a test completion report typically produced?",
      options: [
        {
          text: "At the end of a test level, milestone, or project, summarizing what was done",
          correct: true,
          why: "A test completion report summarizes the testing performed once a milestone, level or project has finished, including whether exit criteria were met."
        },
        {
          text: "Every day throughout the execution phase",
          correct: false,
          why: "Daily updates are the role of test progress reports, not the completion report."
        },
        {
          text: "Before any test planning has started",
          correct: false,
          why: "A completion report can only be produced after testing has occurred, not before planning."
        },
        {
          text: "Only when a critical defect is discovered",
          correct: false,
          why: "A completion report is tied to reaching a milestone, not to individual defect events."
        }
      ],
      explanation: "The test completion report is created when a test level, milestone or project completes. It summarizes the testing done, the results, deviations, and residual risks, and supports the release decision and lessons learned.",
      workplaceExample: "At release, the test manager issues a completion report noting coverage achieved, open defects with severity, and residual risks, which the project board uses to sign off deployment."
    },
    {
      kLevel: "K2",
      question: "Which content is most appropriate for a test progress report rather than a test completion report?",
      options: [
        {
          text: "Status of testing in the current period, including impediments and deviations so far",
          correct: true,
          why: "Progress reports focus on the current status, blocking issues and any deviations during the ongoing period so control actions can be taken."
        },
        {
          text: "A final evaluation of whether exit criteria were met for the whole level",
          correct: false,
          why: "A final evaluation against exit criteria is characteristic of the completion report at the end of the effort."
        },
        {
          text: "The complete lessons learned from the entire project",
          correct: false,
          why: "Full lessons learned belong in the completion report, which reflects on the finished effort."
        },
        {
          text: "The archived residual risks handed over to operations at release",
          correct: false,
          why: "Handover of residual risks at release is part of the completion report content."
        }
      ],
      explanation: "Progress reports cover the current reporting period so stakeholders can steer the effort; completion reports summarize and evaluate the whole test effort at its end. Choosing the right content depends on which report you are writing.",
      workplaceExample: "The mid-sprint progress report flags that a blocked test environment is delaying execution, prompting the manager to escalate, whereas the sprint-end completion report evaluates overall results."
    },
    {
      kLevel: "K2",
      question: "A test report is being written for senior management with limited testing knowledge. How should its content be adapted?",
      options: [
        {
          text: "Summarize status, risks and trends at a high level, avoiding deep technical detail",
          correct: true,
          why: "Reports must be tailored to their audience; senior management needs concise status, risk and trend information rather than technical minutiae."
        },
        {
          text: "Include every individual test case result and defect log verbatim",
          correct: false,
          why: "Raw test case and defect logs overwhelm a management audience and obscure the decisions they need to make."
        },
        {
          text: "Write it only in terms of code branch coverage percentages",
          correct: false,
          why: "Branch coverage detail is meaningful to technical staff, not to senior managers focused on risk and readiness."
        },
        {
          text: "Omit risks so the report stays positive",
          correct: false,
          why: "Hiding risk misleads decision makers; honest reporting of risk is essential regardless of audience."
        }
      ],
      explanation: "The purpose, content, and level of detail of a test report depend on its audience. Technical teams need detail; management audiences need summarized status, key risks and trends to support decisions.",
      workplaceExample: "For the steering committee the QA lead presents a red/amber/green summary with the top three risks, while giving the developers a detailed defect breakdown by module."
    },
    {
      kLevel: "K2",
      question: "Which practice best supports effective communication of test status to stakeholders?",
      options: [
        {
          text: "Reporting objectively and regularly, tailored to each audience, including bad news",
          correct: true,
          why: "Effective status communication is regular, factual, and adapted to the audience, and does not hide unfavorable information."
        },
        {
          text: "Only communicating status once, at the very end of the project",
          correct: false,
          why: "A single end-of-project message denies stakeholders the visibility needed to steer the effort in time."
        },
        {
          text: "Reporting only good news to keep morale high",
          correct: false,
          why: "Suppressing bad news undermines trust and prevents informed decisions."
        },
        {
          text: "Sending the same deeply technical report to everyone regardless of role",
          correct: false,
          why: "One-size-fits-all technical reporting fails audiences who need summarized, role-appropriate information."
        }
      ],
      explanation: "Communicating test status effectively means giving accurate, timely, audience-appropriate information, whether verbally, through dashboards, or written reports, and reporting risks honestly.",
      workplaceExample: "The test lead maintains a live dashboard for the delivery team and a weekly summarized email for executives, keeping both informed at the right level of detail."
    },
    {
      kLevel: "K1",
      question: "What is the main purpose of configuration management in support of testing?",
      options: [
        {
          text: "To establish and maintain the integrity of test work products and identify their versions throughout the test process",
          correct: true,
          why: "Configuration management keeps testware and test items uniquely identified, version controlled, and traceable so results are reproducible and consistent."
        },
        {
          text: "To design test cases from the requirements",
          correct: false,
          why: "Test case design is a test analysis and design task, not a configuration management function."
        },
        {
          text: "To decide the overall test strategy for the organization",
          correct: false,
          why: "Defining strategy is a management activity; configuration management deals with control of work products."
        },
        {
          text: "To estimate the budget required for the test project",
          correct: false,
          why: "Estimation is a planning activity, unrelated to maintaining the integrity of work products."
        }
      ],
      explanation: "Configuration management provides a discipline for identifying, controlling, and tracking the versions of test items and testware. This ensures test results can be reproduced and mapped to the exact versions tested.",
      workplaceExample: "Because every test script, data set and build is version controlled, when a defect is reported the team can recreate the exact configuration under which the failure occurred."
    },
    {
      kLevel: "K2",
      question: "Which situation shows a failure of configuration management during testing?",
      options: [
        {
          text: "Testers cannot tell which build a defect was found on, so it cannot be reliably reproduced",
          correct: true,
          why: "Without version identification of the test item, results cannot be traced to a specific build, which is exactly what configuration management prevents."
        },
        {
          text: "A defect report includes clear steps to reproduce the failure",
          correct: false,
          why: "Clear reproduction steps are good practice and do not indicate a configuration management failure."
        },
        {
          text: "The test plan lists the entry and exit criteria",
          correct: false,
          why: "Documented entry and exit criteria are part of planning and are unrelated to a configuration management breakdown."
        },
        {
          text: "The team uses a shared traceability matrix",
          correct: false,
          why: "A traceability matrix supports good management and is not a sign of failure."
        }
      ],
      explanation: "A hallmark of good configuration management is that every test item and work product is uniquely identified and version controlled. If testers cannot identify the build a defect relates to, configuration management is inadequate.",
      workplaceExample: "A defect could not be reproduced because nobody recorded which of three parallel builds was under test, prompting the team to enforce build tagging in every defect report."
    },
    {
      kLevel: "K2",
      question: "Why does configuration management need to be in place before testing begins in earnest?",
      options: [
        {
          text: "So that all test items and testware are uniquely identified and traceable throughout the test process",
          correct: true,
          why: "Establishing configuration management up front ensures items and testware are version controlled from the start, keeping results traceable and reproducible."
        },
        {
          text: "So that testers do not need to write any test cases",
          correct: false,
          why: "Configuration management does not remove the need to design tests; it controls versions of the work products."
        },
        {
          text: "So that defects are automatically corrected by the tool",
          correct: false,
          why: "Configuration management tracks versions; it does not fix defects automatically."
        },
        {
          text: "So that the project no longer needs a test plan",
          correct: false,
          why: "A test plan is still required; configuration management complements it rather than replacing it."
        }
      ],
      explanation: "The ISTQB syllabus stresses that configuration management should be established before testing begins so that all items and testware are identified and version controlled, supporting traceability of the test basis and results.",
      workplaceExample: "The team sets up version control for scripts, test data and environment definitions in sprint zero, so from the first real test run everything is traceable to a known baseline."
    },
    {
      kLevel: "K2",
      question: "At a management level, what is the relationship between product risk and test management?",
      options: [
        {
          text: "Product risks are used to guide what to test and how much, shaping test planning and prioritization",
          correct: true,
          why: "Test management uses product risk to decide the extent, depth and priority of testing, focusing effort where the impact and likelihood of failure are greatest."
        },
        {
          text: "Product risk is irrelevant once the test plan is written",
          correct: false,
          why: "Risk continually informs monitoring and control; it is not discarded after planning."
        },
        {
          text: "Test management only considers project risks, never product risks",
          correct: false,
          why: "Test management considers both, but product risk in particular drives what and how much to test."
        },
        {
          text: "Product risk determines the programming language used",
          correct: false,
          why: "Technology choices are development decisions, not a function of product risk in test management."
        }
      ],
      explanation: "Product risk concerns the possibility that the product fails to satisfy legitimate needs. Test management uses product risk analysis to allocate test effort, prioritize tests, and set the depth of testing so the highest risks are addressed first.",
      workplaceExample: "Because the payment module carries the highest product risk, the test manager assigns it the deepest test coverage and the most experienced testers, while a rarely used admin screen gets light testing."
    },
    {
      kLevel: "K2",
      question: "Which of these is a project risk rather than a product risk relevant to test management?",
      options: [
        {
          text: "Key testers may leave mid-project, delaying test execution",
          correct: true,
          why: "Staffing loss threatens the ability to deliver the project on schedule, which is a project risk affecting how testing is managed."
        },
        {
          text: "The software may miscalculate interest and give wrong balances",
          correct: false,
          why: "A functional failure in the product is a product risk, concerning the quality of the delivered system."
        },
        {
          text: "The application may crash under peak load",
          correct: false,
          why: "A performance failure of the product is a product risk, not a project management risk."
        },
        {
          text: "Users may find the interface confusing and make errors",
          correct: false,
          why: "Usability failure is a characteristic of the product, making it a product risk."
        }
      ],
      explanation: "Project risks relate to the management and control of the project, such as staffing, schedule, or supplier issues. Product risks relate to the quality characteristics of the product itself. Test management responds to both.",
      workplaceExample: "The test manager maintains a risk register listing both product risks, like incorrect financial calculations, and project risks, like a delayed test environment, and plans mitigations for each."
    },
    {
      kLevel: "K3",
      question: "A banking release has limited time. The login screen is low risk, but the funds-transfer feature is high risk. How should a risk-based approach guide test management?",
      options: [
        {
          text: "Allocate more, deeper testing to funds transfer and lighter testing to login, prioritizing by risk",
          correct: true,
          why: "Risk-based testing concentrates effort where failure impact and likelihood are highest, so the high-risk funds transfer feature gets deeper testing."
        },
        {
          text: "Test both features with identical depth regardless of risk to be fair",
          correct: false,
          why: "Equal effort ignores risk and wastes scarce time on the low-risk feature instead of the critical one."
        },
        {
          text: "Test only the login screen because it is quicker to test",
          correct: false,
          why: "Choosing by convenience rather than risk leaves the highest-risk feature under-tested."
        },
        {
          text: "Skip risk analysis and test whatever the developers finish first",
          correct: false,
          why: "Testing by build order rather than risk fails to protect the most critical functionality."
        }
      ],
      explanation: "Risk-based test management uses product risk to prioritize and allocate effort. Under time pressure, the highest-risk items receive the most thorough testing while lower-risk items receive proportionally less.",
      workplaceExample: "With two days before release, the test manager schedules extensive boundary, security and negative testing on funds transfer and only a short smoke test on the stable login page."
    },
    {
      kLevel: "K2",
      question: "How does monitoring metrics support test control decisions?",
      options: [
        {
          text: "Trends in metrics reveal when to take corrective action, such as reprioritizing or adjusting the schedule",
          correct: true,
          why: "Monitoring produces the data and trends that trigger control actions; without metrics, control would be guesswork."
        },
        {
          text: "Metrics remove the need for any human decision making",
          correct: false,
          why: "Metrics inform decisions but people still decide which control actions to take."
        },
        {
          text: "Metrics are only useful after the project has finished",
          correct: false,
          why: "In-flight metrics are precisely what enables timely control during the project."
        },
        {
          text: "Metrics are used solely to appraise individual testers",
          correct: false,
          why: "Using test metrics to judge individuals is discouraged; their role is to guide the test effort, not to rate people."
        }
      ],
      explanation: "Test monitoring gathers metrics and their trends, and test control acts on them. For example, a rising defect backlog might trigger reprioritization or an extended test window. Metrics should measure the process, not blame individuals.",
      workplaceExample: "When the pass rate stalls and blocked tests climb for three days running, the manager reads the trend and reassigns effort to unblock the environment, a control action driven by monitoring."
    },
    {
      kLevel: "K1",
      question: "Which statement best describes a test strategy?",
      options: [
        {
          text: "A general, often organization-level description of how testing is performed across projects or products",
          correct: true,
          why: "A test strategy gives a generalized, typically organization-wide, description of the test approach that applies across multiple projects or products."
        },
        {
          text: "A detailed schedule of who runs each test case next week",
          correct: false,
          why: "A detailed, time-bound schedule is part of a specific test plan, not the broad strategy."
        },
        {
          text: "The list of defects found in the current sprint",
          correct: false,
          why: "A defect list is an execution artifact, not a strategy."
        },
        {
          text: "The exact test data values used for one boundary test",
          correct: false,
          why: "Specific test data belongs to test design, far below the level of a strategy."
        }
      ],
      explanation: "A test strategy provides a generalized description of the test process, usually at the organizational or product-line level. It is broader and more stable than a test plan, which is specific to a project or release.",
      workplaceExample: "The company test strategy states that all products use risk-based testing with automated regression, and every project team then writes its own plan consistent with that strategy."
    },
    {
      kLevel: "K1",
      question: "Which statement best describes a test plan?",
      options: [
        {
          text: "A document describing the test objectives, resources and schedule for a specific project or release",
          correct: true,
          why: "A test plan is project- or release-specific, detailing objectives, scope, resources, schedule and approach for that particular effort."
        },
        {
          text: "An organization-wide description of testing that rarely changes",
          correct: false,
          why: "An organization-wide, stable description is a test strategy, not a plan for a specific project."
        },
        {
          text: "A record of the actual defects fixed after release",
          correct: false,
          why: "A post-release defect record is a report or log, not a plan."
        },
        {
          text: "The source code of the automated test framework",
          correct: false,
          why: "Framework code is testware, not a test plan document."
        }
      ],
      explanation: "A test plan is specific to a project or release. It describes the test objectives, scope, approach, resources, schedule, and how the strategy is applied to that particular effort, and it is updated as the project evolves.",
      workplaceExample: "For the Q3 release the test lead writes a plan naming the two test environments, the four-week schedule, entry and exit criteria, and the automation scope for that release."
    },
    {
      kLevel: "K2",
      question: "How do a test strategy and a test plan relate to each other?",
      options: [
        {
          text: "The test plan applies and refines the strategy for a specific project, while the strategy remains general across projects",
          correct: true,
          why: "The strategy sets the general approach for the organization or product line, and each project's plan tailors that approach to its own objectives and constraints."
        },
        {
          text: "They are interchangeable terms for the same document",
          correct: false,
          why: "They differ in scope and level: the strategy is general and cross-project, the plan is specific and project-bound."
        },
        {
          text: "A test plan is broader and more stable than a test strategy",
          correct: false,
          why: "It is the other way round: the strategy is broader and more stable; the plan is specific and changes with the project."
        },
        {
          text: "A test strategy replaces the need for any test plan",
          correct: false,
          why: "A strategy does not replace a plan; each project still needs a plan that applies the strategy."
        }
      ],
      explanation: "A test strategy provides the general, often organization-level approach, and a test plan implements that approach for a specific project or release. Multiple test plans can be derived from one strategy.",
      workplaceExample: "The enterprise test strategy mandates risk-based testing and CI-driven automation; the mobile app team writes a project test plan that applies those principles to its two-month release schedule."
    },
    {
      kLevel: "K2",
      question: "During execution, monitoring shows the exit criteria for coverage will not be met by the deadline. Which is a valid test control action?",
      options: [
        {
          text: "Reprioritize remaining tests toward the highest-risk areas and inform stakeholders of the residual risk",
          correct: true,
          why: "When exit criteria are threatened, control actions include re-prioritizing by risk and transparently communicating residual risk so stakeholders can decide."
        },
        {
          text: "Silently mark all remaining tests as passed to meet the criteria",
          correct: false,
          why: "Falsifying results is unethical and hides genuine risk from decision makers."
        },
        {
          text: "Delete the exit criteria from the plan so they can no longer fail",
          correct: false,
          why: "Removing criteria to avoid a red status defeats the purpose of monitoring and misleads stakeholders."
        },
        {
          text: "Stop reporting status so management is not alarmed",
          correct: false,
          why: "Ceasing to report removes visibility and prevents informed control, the opposite of good practice."
        }
      ],
      explanation: "Test control responds to monitoring feedback with legitimate actions such as reprioritizing, adjusting scope or schedule, and communicating residual risk. It never involves hiding or falsifying status.",
      workplaceExample: "Two days from release the manager sees coverage will fall short, so the team concentrates on the highest-risk transactions and presents the untested low-risk areas as documented residual risk at the go/no-go meeting."
    },
    {
      kLevel: "K2",
      question: "Which audience and purpose pairing is most appropriate for a test completion report?",
      options: [
        {
          text: "Project stakeholders and future teams, to summarize results, residual risk and lessons learned",
          correct: true,
          why: "The completion report serves stakeholders making release decisions and future projects seeking lessons learned, summarizing overall results and residual risk."
        },
        {
          text: "Only the individual tester, as a private log of daily activity",
          correct: false,
          why: "A private daily log is not the purpose of a completion report, which is a summary for stakeholders."
        },
        {
          text: "Developers only, to receive the exact keystrokes for each test",
          correct: false,
          why: "Step-level keystrokes belong in test cases, not in a summary completion report."
        },
        {
          text: "No audience, because completion reports are never read",
          correct: false,
          why: "Completion reports are deliberately produced for stakeholders and to inform future work."
        }
      ],
      explanation: "The test completion report summarizes the testing performed for a level or project, aimed at stakeholders who make release decisions and at future teams seeking lessons learned and residual risk information.",
      workplaceExample: "After go-live the completion report is shared with the project board and archived so the next release team can see what was tested, what risks remained, and what to improve."
    },
    {
      kLevel: "K3",
      question: "A daily report shows defect discovery still rising and blocked tests increasing near the planned end date. What should the test manager conclude and do?",
      options: [
        {
          text: "The product may not be ready; escalate, reassess risk, and adjust the schedule or scope through control actions",
          correct: true,
          why: "Rising defect discovery and mounting blockers late in the cycle signal instability, so the manager should escalate and take control actions rather than proceed blindly."
        },
        {
          text: "Everything is fine; keep the deadline unchanged because the plan says so",
          correct: false,
          why: "Ignoring adverse trends to protect a date disregards the very purpose of monitoring and control."
        },
        {
          text: "Stop testing immediately because enough defects have been found",
          correct: false,
          why: "A rising defect curve suggests more defects remain, so stopping now would leave significant risk."
        },
        {
          text: "Reassign the metrics to blame the developers and continue as planned",
          correct: false,
          why: "Blaming individuals is not a control action and does nothing to address the risk revealed by the trend."
        }
      ],
      explanation: "Interpreting metric trends is central to control. A defect discovery rate that is still climbing near the deadline, with growing blockers, indicates the product is not stabilizing, so the manager should escalate, reassess risk, and adjust scope or schedule.",
      workplaceExample: "Seeing defects still climbing three days out, the test manager convenes a risk review, negotiates a one-week slip for the high-risk modules, and communicates the revised plan to stakeholders."
    },
    {
      kLevel: "K2",
      question: "Which set of information is most useful to include when communicating test status to a mixed audience of managers and developers?",
      options: [
        {
          text: "A high-level summary of progress and risk for managers, with a detailed defect and coverage breakdown available for developers",
          correct: true,
          why: "Serving a mixed audience means providing summarized status and risk for managers while making detailed technical data available to developers who need it."
        },
        {
          text: "Only the total number of test cases, with no result breakdown",
          correct: false,
          why: "A bare count without pass, fail or blocked results tells neither audience whether testing is going well."
        },
        {
          text: "Only anecdotes about how hard the testers worked",
          correct: false,
          why: "Effort anecdotes are not objective status information and help no one make decisions."
        },
        {
          text: "Only the environment cost figures",
          correct: false,
          why: "Cost alone omits progress, quality and risk, which are the core of test status communication."
        }
      ],
      explanation: "Good status communication layers information for its audiences: a concise progress and risk summary for management, and detailed coverage and defect data for technical readers. The same underlying metrics are presented at different levels of detail.",
      workplaceExample: "The status page opens with a red/amber/green summary and top risks for executives, then links to detailed defect charts and coverage tables for the engineering team."
    }
  ]
};
