-- Module 5: Jira & Test Management (6 lessons)

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 1, 'Introduction to Jira for Testers', '10 minute read',
$$Jira is the most widely used project management tool in software teams — and it's almost certain to appear in your next QA role. This lesson gets you oriented: what Jira is, how teams use it, and the core concepts every tester needs to know.$$,
array[
  'Navigate a Jira project and understand its key components',
  'Explain the difference between epics, stories, tasks, and bugs in Jira',
  'Describe how testers use Jira throughout a sprint'
],
$$## What is Jira?

Jira is a project management and issue tracking tool made by Atlassian. It's used by software teams to plan, track, and manage work. For testers, Jira is where you'll find the stories you need to test, log the bugs you find, and track the progress of your testing.

Jira comes in two main flavours:
- **Jira Software** — used by development teams for Agile project management
- **Jira Service Management** — used for IT service desks and customer support

Most QA roles use Jira Software.

## Key Jira Concepts

**Project**
A Jira project is a container for all the work related to one product or team. Your team will have at least one project (e.g. "Mobile App" or "Backend Platform").

**Issue Types**
Work in Jira is tracked as "issues". The most common types are:

| Issue Type | What it is | Tester's use |
|---|---|---|
| Epic | A large body of work (months) | Understand the big picture |
| Story | A user-facing feature (1 sprint) | The main thing testers test |
| Task | A non-feature work item | Used for testing tasks (e.g. "Set up test data") |
| Bug | A defect found during testing | What you create when you find a problem |
| Sub-task | A piece of a story or task | Breakdown of testing activities |

**Board Views**
- **Kanban board:** Shows issues as cards in columns (To Do / In Progress / Done)
- **Scrum board:** Shows the current sprint's issues
- **Backlog:** The full list of issues not yet in a sprint

**Issue Statuses**
A typical workflow: `To Do → In Progress → In Review → Ready to Test → Testing → Done`

Testers watch for stories moving into "Ready to Test" — that's their signal to start.

## How Testers Use Jira Day-to-Day

1. **Sprint planning:** Check the sprint board for stories assigned to this sprint
2. **During testing:** Move stories through workflow statuses as you test them
3. **Logging bugs:** Create Bug issues linked to the story they came from
4. **Checking progress:** Use the sprint board to see what's been delivered vs what's in progress
5. **Sprint review prep:** Use Jira filters to pull a list of all completed stories and open bugs$$,
$$**Starting your day as a tester using Jira:**

1. Open Jira → go to your team's Scrum board
2. Check the "Ready to Test" column — 2 stories waiting
3. Pick up Story SHOP-142: "User can apply a discount code at checkout"
4. Move it to "Testing"
5. Read the story description and acceptance criteria
6. Open the linked design/wireframe (Jira lets you attach files and links)
7. Begin testing
8. Find a bug: discount code accepted but total doesn't update in the basket
9. Create a Bug issue: SHOP-157, linked to parent SHOP-142, with steps to reproduce
10. Assign to developer; move story back to "In Progress"$$,
$$- Not linking bugs to the story they came from — makes it hard to track which stories are clean
- Moving stories to "Done" with open bugs still attached — always resolve or accept bugs first
- Ignoring the backlog — looking at upcoming stories helps you prepare test data and questions early
- Using Jira as your only communication — complex issues still need a conversation$$,
$$Most teams have their own Jira workflow and naming conventions. In your first week in a new role, spend 30 minutes with a senior tester or developer to understand *their* Jira setup — don't assume it matches what you've seen before.$$,
$$Create a free Jira account at atlassian.com/software/jira and set up a sample project. Create 3 stories (using the user story format from Module 4) and 2 bug issues. Practice moving them through statuses.$$,
$$In a typical Agile team, what is the tester's signal that a story is ready to test in Jira?$$,
$$What is the difference between a "Story" and a "Bug" in Jira?$$,
array[
  'I can navigate a Jira project and understand its structure',
  'I can explain the difference between epics, stories, tasks, and bugs',
  'I understand how stories flow through Jira statuses during a sprint'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 2, 'Writing Great Bug Reports', '12 minute read',
$$A bug report is only as useful as the information it contains. A vague bug report wastes everyone''s time. A clear, complete bug report gets the bug fixed faster. This lesson covers exactly what to include — and how to write bug reports that developers actually appreciate.$$,
array[
  'Write a complete, well-structured bug report with all essential fields',
  'Distinguish between a bug and expected behaviour',
  'Prioritise bugs by severity and explain the difference between severity and priority'
],
$$## The Anatomy of a Great Bug Report

Every bug report should answer these questions:

**1. What is it? (Summary)**
One clear sentence. Not "Login broken" — instead: "Login fails with valid credentials when email contains uppercase letters."

**2. Where does it happen? (Environment)**
- Browser/device (Chrome 120 on Windows 11 / iPhone 14 iOS 17.2)
- Application URL or version
- Test data used (username, account type)

**3. How do I reproduce it? (Steps to Reproduce)**
Numbered steps, starting from a known state:
1. Navigate to /login
2. Enter email "TEST@example.com" (uppercase T)
3. Enter correct password
4. Click "Log in"
5. Observe: "Incorrect email or password" error displayed

**4. What happened? (Actual Result)**
What the system did. Be specific: "Error message displayed: 'Incorrect email or password'"

**5. What should have happened? (Expected Result)**
What the system *should* do based on the requirements: "User should be logged in and redirected to the dashboard, regardless of email case"

**6. How bad is it? (Severity)**

| Severity | Description | Example |
|---|---|---|
| Critical | System unusable; no workaround | App crashes on login |
| High | Major feature broken; workaround exists | Can't search for products; use category browse |
| Medium | Feature partially broken | Filter doesn't save; user must re-apply each visit |
| Low | Minor issue; minimal user impact | Tooltip text has a spelling mistake |

**7. How urgent is it? (Priority)**
Priority is a *business* decision, not a technical one. A cosmetic bug on a homepage during a marketing campaign might be Priority 1 (urgent) even if its severity is Low.

**8. Evidence (Screenshots/Videos)**
Always attach a screenshot. A video is even better for intermittent bugs.

## Severity vs Priority — The Key Distinction

| | Severity (impact on the system) | Priority (urgency to fix) |
|---|---|---|
| Decided by | Tester | Product Owner / Business |
| Example | Critical severity: checkout crashes | But low priority: it only crashes for one legacy browser used by 0.1% of users |

## What is NOT a bug?

Before logging a bug, ask: is this a defect, or is it by design?
- Check the acceptance criteria — if the behaviour matches the criteria, it's not a bug
- Check with the developer — sometimes the feature isn't finished yet
- Check with the BA — sometimes the requirements changed and you weren't told

If it's genuinely unexpected behaviour with no documented reason, log it.$$,
$$**Bug report example:**

**Summary:** Discount code field accepts expired codes and shows success message

**Environment:** Chrome 121, staging environment, user account: test_customer@example.com

**Steps to reproduce:**
1. Add any item to the cart
2. Proceed to checkout
3. Enter discount code "SUMMER20" (expired 30 June 2024)
4. Click "Apply"
5. Observe result

**Actual result:** Green success message "Code applied! 20% discount added" appears. Basket total does not change.

**Expected result:** Error message "This code has expired" should display. Discount should not be applied.

**Severity:** High — customers could expect a discount they will not receive

**Priority:** High — marketing campaign ends in 3 days; expired codes being accepted could cause complaints

**Evidence:** Screenshot attached (shows success message with unchanged total)

**Notes:** Reproduced 3 times. Also tested with code "WINTER10" (expired Jan 2024) — same result.$$,
$$- Reporting "it's broken" with no reproduction steps — developers can't fix what they can't reproduce
- Not attaching evidence — a screenshot saves 15 minutes of back-and-forth
- Assigning severity without understanding the business impact
- Logging bugs before checking if the behaviour is actually correct
- Writing the steps from memory instead of doing them step-by-step while writing$$,
$$The best bug report I ever saw included a 30-second screen recording that showed the exact reproduction steps. The developer fixed it within an hour because there was zero ambiguity. If your team allows it, use Loom or a similar tool to record bugs — it's a massive time saver.$$,
$$Pick any app or website you use regularly. Find a real bug (or use one you've encountered before). Write a complete bug report using all the fields from this lesson. Include a screenshot.$$,
$$What is the difference between "severity" and "priority" in bug reporting?$$,
$$What must every bug report include at minimum?$$,
array[
  'I can write a complete bug report with all essential fields',
  'I understand the difference between severity and priority',
  'I can distinguish between a bug and expected behaviour'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 3, 'Test Cases & Test Management in Jira', '11 minute read',
$$Test cases are the backbone of structured testing. In modern teams they live in Jira using plugins like Zephyr Scale or Xray. This lesson covers how to write effective test cases and manage them through a test cycle.$$,
array[
  'Write a clear, reusable test case with all required fields',
  'Organise test cases into test cycles and suites',
  'Execute a test run and record results in Jira'
],
$$## What is a Test Case?

A test case is a documented set of conditions and steps used to verify that a specific piece of functionality works as expected. Unlike exploratory testing (where you roam freely), test cases are scripted and repeatable.

## Test Case Fields

A complete test case includes:

| Field | Description | Example |
|---|---|---|
| ID | Unique identifier | TC-042 |
| Title | Short description of what's being tested | Login with valid credentials redirects to dashboard |
| Preconditions | State the system must be in before starting | User is registered; not currently logged in |
| Test Steps | Numbered actions to perform | 1. Go to /login 2. Enter valid email 3. Enter valid password 4. Click "Log in" |
| Expected Result | What should happen | User is redirected to /dashboard. Username appears in top nav. |
| Test Data | Data used in the test | Email: testuser@example.com, Password: TestPass123! |
| Status | Pass / Fail / Blocked / Not Run | |

## How Detailed Should Steps Be?

It depends on who will run the test:
- **High detail:** Needed for manual testers new to the feature, for compliance/regulatory testing, or for handoff to a client
- **Low detail:** Fine for experienced testers who know the system

A good rule: write enough that someone who hasn't seen the feature can run the test correctly.

## Organising Test Cases

**Test Suite** — a group of related test cases (e.g. "Login Tests", "Checkout Tests")

**Test Cycle** — a planned execution of test cases for a specific sprint or release. In Zephyr/Xray you create a test cycle, add test cases to it, execute them, and record results.

**Test Plan** — a higher-level container linking test cycles to a version or release.

## Executing a Test Run

During a test run in Jira (with Zephyr or Xray):

1. Open the test cycle for the current sprint
2. Pick up an unexecuted test case
3. Follow the steps exactly as written
4. Mark the result: Pass / Fail / Blocked
5. If Fail: log a bug and link it to the test case
6. If Blocked: note why (e.g. "environment down") — don't skip silently

## Writing for Reuse

Good test cases are worth maintaining because they're run sprint after sprint. Write them to be reusable:
- Don't hard-code test data that will expire (e.g. a promotion code with a date)
- Use parameterised values where possible ("a valid registered user")
- Review and update test cases when functionality changes — stale test cases are dangerous$$,
$$**Test Suite: User Registration**

Test Case TC-015:
- **Title:** Successful registration with all valid fields
- **Preconditions:** User is not registered. On /register page.
- **Test Steps:**
  1. Enter valid first name: "Jane"
  2. Enter valid last name: "Smith"
  3. Enter valid email: "jane.smith.test@mailinator.com"
  4. Enter valid password: "TestPassword1!"
  5. Confirm password: "TestPassword1!"
  6. Click "Create account"
- **Expected Result:** Success message displayed. Verification email sent to mailinator. User redirected to /dashboard/onboarding.
- **Test Data:** Use Mailinator inbox for email verification

Test Case TC-016:
- **Title:** Registration fails when email already registered
- **Steps:** Same as TC-015 but use an already-registered email
- **Expected Result:** Error message "This email is already registered. Try logging in."$$,
$$- Writing test cases so vague they could be interpreted multiple ways ("verify the login works")
- Over-specifying test data that will become outdated (hard-coded dated promotion codes, specific user IDs)
- Never reviewing test cases after requirements change — stale tests give false confidence
- Marking tests as "Pass" when you only tested part of the scenario$$,
$$Don't aim for 500 test cases. Aim for 50 high-quality, well-maintained ones. A small suite that you trust and keep up-to-date is worth far more than a massive suite that nobody believes in.$$,
$$Write a complete test suite of 5 test cases for a "Forgot Password" feature. Cover: happy path, email not found, expired link, valid link, and already-used link.$$,
$$What is the difference between a test suite and a test cycle?$$,
$$Why should you link a failed test case execution to a bug report?$$,
array[
  'I can write a complete test case with all required fields',
  'I understand the difference between test suites, test cycles, and test plans',
  'I know how to record test execution results correctly'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 4, 'Dashboards, Filters & Reporting in Jira', '9 minute read',
$$Jira isn''t just a task tracker — it''s a reporting engine. In this lesson you''ll learn how to use Jira''s filters and dashboards to give stakeholders clear visibility on quality, and how to run the reports that matter most to testing.$$,
array[
  'Create a JQL filter to find relevant issues in Jira',
  'Build a basic Jira dashboard to display quality metrics',
  'Explain which Jira reports are most useful for testers'
],
$$## JQL: Jira Query Language

JQL is Jira's query language — like SQL for your issue tracker. You use it to find exactly the issues you need.

**Basic JQL syntax:**
```
field operator value [AND/OR field operator value]
```

**Common examples:**

Find all open bugs in the current sprint:
```
project = SHOP AND issuetype = Bug AND sprint in openSprints() AND status != Done
```

Find all stories I tested this sprint:
```
project = SHOP AND issuetype = Story AND sprint in openSprints() AND "Tested by" = currentUser()
```

Find all high-priority bugs logged in the last 7 days:
```
project = SHOP AND issuetype = Bug AND priority = High AND created >= -7d
```

Find all stories that are "Ready to Test":
```
project = SHOP AND issuetype = Story AND status = "Ready to Test" ORDER BY priority DESC
```

**Saving filters:** Once you've written a JQL query, save it as a filter. You can then subscribe to it (get email alerts) or add it to a dashboard.

## Jira Dashboards

A dashboard is a homepage of gadgets — widgets that display issue data. Testers typically add:

- **Issue Statistics** — bugs by severity/priority (bar or pie chart)
- **Filter Results** — a list of open bugs or untested stories
- **Sprint Health** — burndown chart showing work remaining
- **Two-Dimensional Filter Statistics** — e.g. bugs by component and severity

**Creating a dashboard:**
1. Click the "Dashboards" menu → "Create dashboard"
2. Give it a name (e.g. "QA Sprint Dashboard")
3. Add gadgets from the gadget library
4. Configure each gadget with your saved filter

## Key Reports for Testers

**Burndown Chart** — shows how much work remains in the sprint. Useful for spotting if testing is becoming a bottleneck (work isn't burning down in the last 3 days).

**Bug Trend Report** — number of bugs raised over time. A rising trend needs investigation.

**Test Execution Report** (Zephyr/Xray) — Pass/Fail/Blocked breakdown for a test cycle. Share this in sprint reviews.

**Velocity Chart** — story points completed per sprint. Helps forecast testing capacity.$$,
$$**QA Sprint Dashboard setup:**

Gadget 1: Filter Results — "Open Bugs This Sprint"
Query: `project = SHOP AND issuetype = Bug AND sprint in openSprints() AND status != Done ORDER BY priority DESC`
Shows: A live list of all open bugs the team needs to resolve before sprint end

Gadget 2: Issue Statistics — "Bugs by Severity"
Filter: `project = SHOP AND issuetype = Bug AND sprint in openSprints()`
Grouped by: Priority
Shows: A pie chart — at a glance, are there any Critical/High bugs open?

Gadget 3: Filter Results — "Stories Ready to Test"
Query: `project = SHOP AND status = "Ready to Test" AND sprint in openSprints()`
Shows: My testing queue$$,
$$- Writing JQL with incorrect field names — use the JQL autocomplete to check field names
- Building a dashboard nobody looks at — ask stakeholders what they need to see
- Not saving filters — recreating the same query every day wastes time
- Using dashboards as a substitute for conversation — data should start conversations, not replace them$$,
$$Set up a "testing queue" saved filter as your Jira homepage. Every morning when you open Jira, you see exactly what needs testing. This one habit saves testers 10+ minutes of daily navigation.$$,
$$Write 3 JQL queries you would use regularly as a tester on a sprint team. For each one, explain what it shows and when you'd use it.$$,
$$What does JQL stand for, and what is it used for in Jira?$$,
$$Which report is most useful for spotting if testing has become a bottleneck in a sprint?$$,
array[
  'I can write basic JQL queries to find issues in Jira',
  'I understand how to build a Jira dashboard with relevant gadgets',
  'I know which Jira reports are most useful for testers'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 5, 'Test Management Tools Overview', '9 minute read',
$$Not every team uses Jira. And even teams that do use Jira often pair it with a dedicated test management tool. This lesson gives you a grounded overview of the most common options — so you can adapt quickly wherever you join.$$,
array[
  'Name the most common test management tools and their key features',
  'Explain the difference between Zephyr, Xray, and TestRail',
  'Describe how to adapt your skills across different tools'
],
$$## Why Dedicated Test Management Tools?

Jira alone tracks issues. Test management tools add a layer specifically designed for testers: writing test cases, organising test suites, executing test cycles, and generating test reports — all linked back to Jira stories and bugs.

## The Main Tools

### Zephyr Scale (by SmartBear)
- Natively integrated with Jira (lives inside Jira as an app)
- Organises tests into Folders > Test Cases > Test Cycles > Test Plans
- Generates traceability reports linking test cases to user stories
- Good for: teams already in Jira who want seamless integration

### Xray (by Xpand IT)
- Also a Jira app, but with stronger support for BDD/Gherkin
- Lets you write Gherkin scenarios in Jira and run them with Cucumber
- Popular in teams doing behaviour-driven development
- Good for: teams with automation and BDD focus

### TestRail (by Gurock / Idera)
- Standalone web app (not a Jira plugin)
- Very mature, feature-rich test case management
- Strong reporting: coverage, progress, milestone tracking
- Integrates with Jira via plugins
- Good for: enterprise teams, regulated industries, or teams not using Jira

### Azure Test Plans (Microsoft)
- Part of Azure DevOps
- Used by teams in the Microsoft ecosystem (.NET, Azure, Visual Studio)
- Integrates natively with Azure Boards (Microsoft's version of Jira)
- Good for: teams on the Microsoft stack

### Spreadsheets (Google Sheets / Excel)
- Still used in many small teams or early-stage startups
- No automation, no integration, no dashboards
- But: universally accessible, no licence cost
- Good for: very small teams or projects with simple testing needs

## Core Concepts Are Transferable

Regardless of the tool, the underlying concepts are the same:
- **Test Suite / Folder** — grouping of related test cases
- **Test Case** — documented steps and expected results
- **Test Cycle / Run** — executing a set of tests for a version or sprint
- **Test Plan** — linking test cycles to a release or milestone
- **Traceability** — linking test cases to requirements/stories

When you join a new team, the tool will be different. But if you understand these concepts, you'll adapt within a day.$$,
$$**Interview scenario:** "We use TestRail — do you have experience with it?"

Even if you've only used Zephyr, the right answer is:

"I've primarily used Zephyr Scale with Jira, but I'm familiar with the core test management concepts — organising test suites, executing test cycles, tracking pass/fail rates, and generating traceability reports. The terminology and UI differ across tools, but the underlying approach is the same. I picked up Zephyr quickly and I'd expect to do the same with TestRail — happy to do a bit of reading before I start if that helps."

This is confident, honest, and shows adaptability.$$,
$$- Claiming expertise in a tool when you've only used it briefly — interviewers probe this
- Assuming one tool is "the standard" — every team has different setups
- Treating tools as the most important skill — employers care about your testing thinking, not just your tool knowledge
- Not learning keyboard shortcuts and saved views — these make you measurably faster$$,
$$When starting a new role, the first thing I do on day one is ask a colleague to walk me through how they use the test management tool — not the documentation, their actual workflow. You'll learn more in 20 minutes than in an hour of reading.$$,
$$Research one tool from this lesson that you haven't used before. Find one YouTube walkthrough video (aim for 10–15 minutes). Write 3 things you noticed about how it differs from Jira or from your current tool knowledge.$$,
$$Which test management tool is best suited for teams using BDD and Gherkin scenarios?$$,
$$What core test management concepts are transferable across different tools?$$,
array[
  'I can name and briefly describe at least 4 test management tools',
  'I understand the difference between Zephyr, Xray, and TestRail',
  'I can explain how core concepts transfer across tools in an interview'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 6, 'Module 5 Assignment & Knowledge Check', '45 minutes',
$$This assignment puts your Jira and test management skills into practice. You''ll write bug reports, test cases, and a sprint report — the three artefacts testers produce most often in the real world.$$,
array[
  'Produce professional-quality bug reports with all required fields',
  'Write a reusable test case suite for a specific feature',
  'Create a sprint quality report using test data provided'
],
$$## Your Assignment

You are testing a **ride-sharing app** (similar to Uber or Bolt). Use what you''ve learned in this module to complete the following:

---

### Part 1: Bug Reports (approximately 250 words)

You''ve found these issues during testing. Write a complete bug report for each:

**Bug A:** When a passenger cancels a trip after the driver has already started driving toward them, the driver''s app shows the trip as still active. The driver continues driving to the pickup point with no notification of cancellation.

**Bug B:** The fare estimate shown before booking is £8.40. After the trip completes, the charge is £14.20 with no explanation of the difference visible in the app or in the receipt email.

For each bug include: Summary, Environment, Steps to Reproduce, Actual Result, Expected Result, Severity, Priority, and any notes.

---

### Part 2: Test Case Suite (approximately 350 words)

Write a test suite called "Trip Booking" with 6 test cases covering the journey from "Book a trip" to "Trip completed." Include at least one negative test case (something that should fail).

---

### Part 3: Sprint Report (approximately 150 words)

At the end of Sprint 8, here is your test data:
- 7 stories committed, 6 completed (Story 7: "Split fare between passengers" pushed to Sprint 9)
- 48 test cases executed: 43 passed, 5 failed
- 9 bugs raised: 1 critical (app crash on Android 14 when location permission denied), 2 high, 4 medium, 2 low
- 7 bugs fixed before sprint end; 2 carried to Sprint 9

Write the sprint quality report. Summarise the sprint quality, explain the carry-overs, and give one recommendation for Sprint 9.

---

## Assessment Criteria

Your submission will be reviewed for completeness, clarity, correct use of terminology, and professional presentation.$$,
null, null, null,
$$Submit all three parts as a single document. Use clear headings. For the test cases, use a table format.$$,
$$Reflecting on this module: which skill — bug reporting, test case writing, or sprint reporting — do you feel least confident in? What would help you improve?$$,
$$Before submitting: have you included Steps to Reproduce in both bug reports? Do your test cases include preconditions and expected results? Does your sprint report include a recommendation?$$,
array[
  'I wrote complete bug reports for both scenarios',
  'My test case suite has 6 test cases including at least one negative test',
  'My sprint report includes a clear recommendation for the next sprint'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;
