-- Module 4: Agile & Scrum for Testers (7 lessons)

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 1, 'What is Agile? The Tester''s Perspective', '10 minute read',
$$You've probably heard "Agile" thrown around a lot. But what does it actually mean for you as a tester? In this lesson we strip away the jargon and get practical: what Agile is, why it exists, and how it changes the way testers work day-to-day.$$,
array[
  'Explain the core values of the Agile Manifesto in your own words',
  'Describe how testing fits into an Agile team',
  'Contrast Agile testing with traditional waterfall testing'
],
$$## Why Agile Exists

Traditional "waterfall" projects worked in big sequential phases: gather requirements → design → build → test → release. The problem? By the time testing happened, months of work had been built on assumptions that were often wrong. Bugs found late are expensive to fix. Customers waited a year for software that didn't meet their needs.

Agile was born out of frustration with that model. In 2001, 17 software practitioners wrote the Agile Manifesto — four values and twelve principles that prioritised flexibility, collaboration, and fast feedback over rigid planning.

## The Four Agile Values (and What They Mean for Testers)

**1. Individuals and interactions over processes and tools**
Testers talk directly to developers and product owners — not just through formal bug reports.

**2. Working software over comprehensive documentation**
We aim to have tested, shippable software at the end of every sprint, not just a stack of test plans.

**3. Customer collaboration over contract negotiation**
Testers help refine requirements *before* development starts, reducing rework.

**4. Responding to change over following a plan**
Tests and test plans evolve as the product changes. Adaptability is a core skill.

## How Testing Changes in Agile

| Waterfall Testing | Agile Testing |
|---|---|
| Happens at the end | Happens throughout the sprint |
| Big test plans written upfront | Lightweight, just-in-time test cases |
| Testers separate from developers | Testers sit in the team |
| Bugs found late, expensive to fix | Bugs caught early, cheap to fix |
| Release every 6–18 months | Release every 1–4 weeks |

## The Agile Tester's Mindset

In Agile, you're not a gatekeeper at the end of the line. You're a quality advocate embedded in the team. Your job is to:

- Ask questions early ("What does 'done' look like for this story?")
- Test as development happens, not after
- Automate repetitive checks so you have time for exploratory testing
- Flag risks to the team, not just log bugs in a tool

This is a more collaborative, more interesting role than traditional testing — and it's what most employers now expect.$$,
$$**Scenario:** A new team member asks you "What's the difference between how you tested in waterfall vs here?"

**Waterfall answer:** "We had a 3-week test phase at the end of the project. I worked from a test plan written by the test manager, executed hundreds of test cases, and logged bugs that developers would fix before release."

**Agile answer:** "I'm part of the sprint team. I look at user stories in sprint planning and write acceptance criteria with the BA. During the sprint I test each feature as it's built — usually within a day of the developer finishing it. I run regression checks, do exploratory testing, and flag anything that looks wrong in our daily standup. By the end of the sprint we have working, tested software."$$,
$$- Thinking testing starts when development finishes — in Agile, you test *as* development happens
- Waiting to be handed a test plan — in Agile, you help define what "done" means
- Treating Agile as "no documentation" — lightweight documentation is still needed; it's just fit-for-purpose
- Equating Agile with "no process" — Agile has clear ceremonies and rhythms you need to understand$$,
$$"Agile is not about going fast. It's about getting feedback fast." The biggest value of short sprints isn't speed — it's the cadence of learning. You show working software to a real stakeholder every 2 weeks, get their reaction, and adjust. As a tester, you're central to that feedback loop.$$,
$$Read the original Agile Manifesto at agilemanifesto.org (takes 3 minutes). Then write a paragraph answering: which of the four values resonates most with you as a tester, and why?$$,
$$Think about a time (real or imagined) where something went wrong because testing was left too late. How would an Agile approach have caught the issue earlier?$$,
$$What is the PRIMARY benefit of testing throughout a sprint rather than at the end?$$,
array[
  'I can explain the four Agile values in simple terms',
  'I can describe how testing changes in an Agile environment',
  'I understand what an Agile tester does day-to-day'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 2, 'Scrum Framework for Testers', '12 minute read',
$$Scrum is the most widely used Agile framework — and the one you'll encounter in most QA job descriptions. This lesson covers every ceremony, role, and artefact you need to know, explained from a tester's point of view.$$,
array[
  'Name the three Scrum roles and explain each one',
  'Describe all five Scrum ceremonies and what testers do in each',
  'Explain what a sprint backlog and Definition of Done are'
],
$$## The Three Scrum Roles

**Product Owner (PO)**
Owns the product backlog — the prioritised list of everything the product needs. Testers work closely with the PO to clarify requirements and acceptance criteria before development starts.

**Scrum Master (SM)**
Facilitates the Scrum process and removes impediments. If testers are blocked (e.g. waiting on a test environment), the SM helps unblock them.

**Development Team**
A cross-functional team of developers, testers, designers, and sometimes BAs — typically 5–9 people. Testers are part of this team, not separate from it.

## The Five Scrum Ceremonies

**1. Sprint Planning (start of sprint, 1–4 hours)**
The team reviews the top items on the product backlog and commits to what they'll complete this sprint. Testers should:
- Ask clarifying questions about each story
- Raise testing risks and dependencies
- Estimate testing effort alongside development effort

**2. Daily Standup (every day, 15 minutes)**
Each team member answers three questions:
1. What did I do yesterday?
2. What will I do today?
3. Is anything blocking me?

Testers use this to flag: "I finished testing Story X — it passed. Story Y is blocked because the test data isn't set up."

**3. Sprint Review (end of sprint, 1–2 hours)**
The team demonstrates working software to stakeholders. Testers are often asked to walk through what was tested and the outcomes.

**4. Sprint Retrospective (end of sprint, 1 hour)**
The team reflects on how they worked together: what went well, what to improve. Testers should raise quality issues: "We spent 3 hours debugging an environment issue that we could have prevented with better setup scripts."

**5. Backlog Refinement / Grooming (mid-sprint, ~1 hour)**
The team reviews upcoming backlog items, clarifies requirements, and estimates effort. This is where testers influence quality most — catching ambiguous requirements *before* development.

## Key Scrum Artefacts

**Product Backlog:** The master list of all features, fixes, and work — owned by the PO, ordered by priority.

**Sprint Backlog:** The subset of work the team commits to in the current sprint.

**Increment:** The usable product delivered at the end of each sprint.

**Definition of Done (DoD):** A shared agreement on what "finished" means. A good DoD includes testing criteria: unit tests pass, integration tests pass, manual exploratory testing complete, no known critical bugs.

## Sprint Length

Most teams run 2-week sprints. Some run 1-week (fast-moving startups) or 3–4 weeks (complex enterprise work). As a tester, shorter sprints mean tighter feedback loops but also more pressure to test quickly.$$,
$$**Story in sprint planning:**
"As a user, I want to reset my password so I can access my account if I forget it."

**Tester questions to ask:**
- What email address does the reset link go to? (the registered email, or one they can enter?)
- How long is the reset link valid?
- What happens if I click the link a second time — does it still work?
- What if the email address doesn't exist in the system?
- Is there a rate limit to stop people spamming the reset function?

These questions catch ambiguities *before* development starts, saving everyone time.$$,
$$- Staying silent in sprint planning — this is your best opportunity to prevent bugs
- Not attending standup because "nothing's changed" — always attend; visibility matters
- Treating the retrospective as optional — it's where team quality issues get fixed
- Assuming Definition of Done is someone else's responsibility — testers should actively shape the DoD$$,
$$Keep a "question log" during backlog refinement. Every time you ask a clarifying question that reveals an ambiguity, note it down. After 3 months, count how many bugs you likely prevented. This is powerful evidence for your portfolio and in interviews.$$,
$$Choose a user story (real or invented) and write five clarifying questions you would ask in sprint planning to reduce testing risk.$$,
$$Which Scrum ceremony gives testers the most opportunity to prevent bugs before they're written?$$,
$$What is a "sprint retrospective" used for?$$,
array[
  'I can name and explain all three Scrum roles',
  'I can describe what testers do in each of the five Scrum ceremonies',
  'I can explain what a Definition of Done is and why it matters for quality'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 3, 'Testing in Sprints', '12 minute read',
$$Knowing the theory is one thing. Actually testing within a sprint — when time is tight, requirements change, and developers are committing code daily — is another. This lesson gives you the practical techniques to test effectively inside a 2-week sprint.$$,
array[
  'Plan and execute testing activities within a 2-week sprint',
  'Apply shift-left testing techniques to catch defects earlier',
  'Prioritise test coverage when time is limited'
],
$$## The Sprint Testing Timeline

In a 2-week sprint, testing doesn't start on day 8. Here's a healthy distribution:

**Days 1–2: Sprint Planning & Test Preparation**
- Review stories being built this sprint
- Write test scenarios for each acceptance criterion
- Set up test data and test environments
- Raise any missing information

**Days 3–10: Test as Features Are Built**
- Developers finish a story → tester picks it up within hours, not days
- Run functional tests against acceptance criteria
- Raise defects immediately (same-day is ideal)
- Update test results in Jira/Zephyr

**Day 10–11: Integration & Regression**
- Test how features work together
- Run regression on areas likely affected by this sprint's changes
- Focus on high-risk paths

**Day 12: Sprint Review Prep**
- Confirm all stories meet the Definition of Done
- Any unfinished testing? Flag it — don't silently carry it over

## Shift-Left Testing

"Shift left" means moving testing activities earlier in the development process.

**Traditional (shift right):**
Design → Build → Build → Build → TEST

**Shift left:**
Design → TEST PLANNING → Build → TEST → Build → TEST

Practical shift-left techniques:
- **Three Amigos meetings:** Developer + Tester + BA review each story together before coding starts
- **Acceptance Test-Driven Development (ATDD):** Write acceptance tests before development starts; they act as the specification
- **Early test environment setup:** Don't wait until day 8 to discover the test environment is broken

## Prioritising Test Coverage When Time Is Tight

You won't always have time to test everything. Use risk-based testing:

1. **What's new?** Test all new functionality — highest priority
2. **What changed?** Test anything that was modified — medium priority
3. **What's critical to the business?** Test core happy paths — always
4. **What's rarely changed and well-tested?** Consider skipping or sampling

The key: document your prioritisation decisions. If a bug slips through something you deprioritised, you need to be able to explain why.

## Working with Developers

In Agile, the best testers and developers are constantly talking. Aim to:
- Pick up stories for testing within a day of them being "ready to test"
- Ask the developer to walk you through the change (a 5-minute demo saves an hour of guessing)
- Raise bugs verbally first ("Hey, I found something weird on the checkout page...") before logging formally — sometimes it's a test data issue, not a bug
- Give context in bug reports: environment, steps, actual vs expected, screenshot$$,
$$**Sprint 1 for a booking app — 3 stories:**
- Story A: User can search for available rooms (5 points)
- Story B: User can make a booking (8 points)
- Story C: User receives confirmation email (3 points)

**Test prioritisation:**
- Story B first (core business flow, highest risk — money changes hands)
- Story C second (depends on Story B, but has external dependency on email service)
- Story A third (read-only search, lower risk)

On day 11, Story C's email templates aren't rendering correctly on Outlook. Tester raises it. The team decides: raise a bug, carry the fix to next sprint (it's cosmetic and doesn't block bookings), and document the decision.$$,
$$- Testing in a batch at the end of the sprint — leads to a crunch and missed bugs
- Not setting up test data early — causing delays mid-sprint
- Logging every tiny thing as a defect — some things are worth a quick conversation first
- Carrying untested stories silently into the next sprint without telling anyone$$,
$$The best Agile testers I've seen keep a simple daily testing log: story name, tests run, results, bugs raised. Takes 5 minutes to write and makes standup effortless. It also gives you concrete evidence of your throughput for performance reviews.$$,
$$Draft a one-page test plan for a 2-week sprint containing three user stories of your choice. Include: test approach per story, test data needed, regression areas to check, and your prioritisation logic.$$,
$$You're on day 10 of a 2-week sprint. A developer delivers a complex story. There are only 2 days left. What do you do?$$,
$$What does "shift-left testing" mean in practice?$$,
array[
  'I can describe how to distribute testing activities across a 2-week sprint',
  'I can apply risk-based prioritisation when time is limited',
  'I understand shift-left testing and can give examples'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 4, 'User Stories, Acceptance Criteria & BDD', '11 minute read',
$$User stories are how Agile teams communicate requirements. Acceptance criteria are how testers know when a story is done. BDD connects the two in a language everyone can understand. This lesson covers all three — and shows you how to use them to write better tests.$$,
array[
  'Write a well-formed user story using the standard format',
  'Write clear, testable acceptance criteria for any story',
  'Read and write basic Gherkin BDD scenarios'
],
$$## User Stories

A user story is a short, simple description of a feature from the perspective of the user who wants it.

**Format:**
> As a [type of user], I want [to do something], so that [I get some benefit].

**Examples:**
- As a customer, I want to save items to a wishlist so that I can buy them later.
- As an admin, I want to export user data to CSV so that I can report on activity.
- As a mobile user, I want to stay logged in between sessions so that I don't have to log in every time.

User stories are deliberately brief. The detail lives in the acceptance criteria.

## Acceptance Criteria

Acceptance criteria define the conditions a story must meet to be considered complete. Good acceptance criteria are:
- **Specific** — leave no room for interpretation
- **Testable** — you can write a test case for each one
- **Complete** — cover happy path, error cases, and edge cases

**Bad acceptance criteria:**
"The login should work correctly."

**Good acceptance criteria:**
- Users with valid email and password are logged in and redirected to the dashboard
- Users with an incorrect password see the message "Incorrect email or password"
- Users who have not verified their email see the message "Please verify your email to continue"
- After 5 failed attempts, the account is locked for 15 minutes
- Password field input is masked by default

Notice: each criterion maps directly to a test case.

## BDD: Behaviour-Driven Development

BDD is a technique where acceptance criteria are written as structured scenarios in plain English using **Gherkin** syntax:

```
Feature: User Login

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter my correct email and password
    And I click "Log in"
    Then I should be redirected to my dashboard
    And I should see my name in the top navigation

  Scenario: Login fails with incorrect password
    Given I am on the login page
    When I enter my correct email and a wrong password
    And I click "Log in"
    Then I should see the error "Incorrect email or password"
    And I should remain on the login page
```

**Why BDD matters for testers:**
- Scenarios written in Gherkin can be automated (using tools like Cucumber or Behave)
- They force everyone — developer, tester, BA — to agree on expected behaviour *before* code is written
- They become living documentation: scenarios that pass = working software$$,
$$**Story:** As a user, I want to reset my password so that I can regain access to my account.

**Acceptance criteria:**
1. A "Forgot password?" link is visible on the login page
2. Clicking the link shows a form to enter an email address
3. If the email exists in the system, a reset email is sent within 2 minutes
4. If the email does not exist, the message "If this email is registered, you'll receive a reset link" is shown (security: don't confirm whether an email exists)
5. The reset link expires after 1 hour
6. Clicking an expired link shows an error and a prompt to request a new link
7. After successfully resetting the password, the user is redirected to login

**BDD scenario (one of several):**
```
Scenario: Reset link expires after 1 hour
  Given I have received a password reset email
  And the link is more than 1 hour old
  When I click the reset link
  Then I should see "This link has expired"
  And I should see a "Request a new link" button
```$$,
$$- Writing acceptance criteria that are too vague to test ("the feature should work well")
- Only writing the happy path — acceptance criteria must cover error cases too
- Confusing BDD with test automation — BDD is a collaboration technique first; automation is optional
- Writing Gherkin scenarios that are too long (more than 8–10 steps) — split them up$$,
$$The "Three Amigos" meeting (developer + tester + BA) reviewing a story together before it's built is the most effective quality practice I've seen in Agile teams. One 30-minute conversation prevents 3 hours of rework. Push for these in your team.$$,
$$Take a feature you use every day (e.g. Instagram Stories, Google Maps search, Amazon checkout). Write a user story for it, then write 5 acceptance criteria, then write 2 BDD Gherkin scenarios.$$,
$$What is the main purpose of acceptance criteria in an Agile user story?$$,
$$Which statement best describes BDD (Behaviour-Driven Development)?$$,
array[
  'I can write a user story in the correct format',
  'I can write specific, testable acceptance criteria',
  'I can read and write basic Gherkin BDD scenarios'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 5, 'Agile Test Planning & Regression Strategy', '10 minute read',
$$Agile doesn't mean "no planning". It means planning at the right level at the right time. This lesson covers how to plan testing in an Agile context and how to manage the growing regression burden without drowning in manual testing.$$,
array[
  'Create a lightweight test plan appropriate for an Agile sprint',
  'Explain the difference between regression testing and new feature testing',
  'Describe strategies for managing regression testing in Agile teams'
],
$$## Agile Test Planning vs Traditional Test Plans

Traditional test plans are big documents written weeks before testing starts. Agile test planning is lighter and more iterative:

**What to plan upfront (before the sprint starts):**
- Which stories are being tested this sprint
- Test environment and test data requirements
- Dependencies and risks
- What regression areas are likely affected

**What to plan just-in-time (during the sprint):**
- Test scenarios for each story (written as the story is refined)
- Exploratory testing charters
- Which automated tests need updating

A one-page sprint test summary is usually more useful than a 20-page test plan.

## Regression Testing in Agile

Every sprint, you're building new features on top of existing ones. Regression testing checks that new changes haven't broken existing functionality.

The problem: after 12 sprints, you have 12 sprints' worth of features to regression test — and only 2 weeks to do it.

The solution is a layered strategy:

**Layer 1: Automated regression (the foundation)**
High-value, frequently-run automated tests cover the critical paths. These run on every build, giving fast feedback. Target: happy paths for core business flows.

**Layer 2: Risk-based manual regression**
Manual regression focused on areas most likely to be affected by this sprint's changes. If Sprint 12 touched the payment flow, regression-test the full checkout journey manually.

**Layer 3: Exploratory testing**
Unscripted sessions targeting new features and the areas around them. Catches what scripted tests miss.

## Building a Regression Pack

As you test each sprint, maintain a set of "must-pass" regression test cases. These grow over time and should be candidates for automation.

Signs a test case is a good automation candidate:
- Run every sprint (not just occasionally)
- Has a deterministic expected result
- Doesn't require human judgement to evaluate
- Is time-consuming to run manually

Signs a test case should stay manual:
- Requires visual judgement (UI appearance, readability)
- Tests user experience and flow
- Is exploratory in nature
- Changes frequently (automation cost > benefit)$$,
$$**Sprint 10 of a banking app. This sprint delivers: "View transaction history with filters".**

**Regression strategy:**
- Areas touched: transaction list, account summary, data queries
- Automated regression running: account login, balance display, fund transfer (the 3 highest-risk flows) — these run in CI on every commit
- Manual regression focus: transaction history page (which existed before, but the new filters change the query), export to PDF feature (uses the same transaction data)
- Exploratory charter: "Spend 45 minutes on the transaction history page with unusual data — very old transactions, accounts with 10,000+ rows, special characters in descriptions"

**Documentation:**
In Jira, the test cycle for this sprint lists: 5 automated regression suites + 12 manual regression test cases + 1 exploratory charter.$$,
$$- Running full manual regression every sprint — this isn't scalable; automate the repetitive stuff
- Having no regression strategy — bugs slip through when no one checks existing functionality
- Treating "exploratory testing" as "no testing" — exploratory sessions need charters and notes
- Not tracking what was and wasn't tested — future testers (and you!) need that history$$,
$$The best investment an Agile team can make is building a small, fast, reliable automated regression suite early. It pays dividends from sprint 3 onwards. If you're in a team without one, advocate for it — even 20 well-chosen automated tests give you confidence on every release.$$,
$$Create a sprint test summary for a fictional 2-week sprint. Include: stories under test, test environment setup needed, regression areas to cover, and your exploratory testing focus.$$,
$$Why is a full manual regression run every sprint usually not sustainable in Agile?$$,
$$What does "risk-based regression testing" mean?$$,
array[
  'I can describe the difference between Agile and traditional test planning',
  'I can explain why regression testing is challenging in Agile',
  'I can describe a layered regression strategy using automation + manual + exploratory'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 6, 'Agile Metrics & Reporting for Testers', '9 minute read',
$$Numbers tell a story. The right quality metrics show stakeholders — and your own team — whether testing is working. This lesson covers the key metrics Agile testers track and how to report quality in a sprint context.$$,
array[
  'Identify and explain the most important Agile testing metrics',
  'Produce a simple sprint quality summary',
  'Explain how to use velocity and bug data to predict quality risk'
],
$$## Why Metrics Matter

Without data, quality is an opinion. With data, it's a conversation. Good metrics help you:
- Spot trends ("bug count is rising sprint-on-sprint — something's wrong")
- Make the case for more testing time
- Show the value of your work
- Predict risk before release

## Key Agile Testing Metrics

**1. Defect Count (by severity)**
How many bugs were raised this sprint? Breaking them down by severity (Critical / High / Medium / Low) gives more insight than a raw count.

**2. Defect Escape Rate**
Percentage of bugs that reach production vs bugs caught in testing. A high escape rate means your testing isn't catching things early enough.

**3. Test Coverage (per sprint)**
How many stories were fully tested vs partially tested vs not tested? Gives visibility on gaps.

**4. Test Execution Progress**
During the sprint: how many test cases passed / failed / not yet run? Gives a daily status snapshot.

**5. Stories with Open Defects at Sprint End**
A story with an open defect shouldn't be marked Done. Track these to understand carry-over.

**6. Time to Test (cycle time)**
How long from "ready to test" to "testing complete" for a typical story? If this is long, it's a bottleneck.

## Sprint Quality Summary

At the end of each sprint, produce a brief quality summary. It doesn't need to be a long report — 5–6 bullet points is fine:

```
Sprint 10 Quality Summary
- Stories tested: 6/6 (100%)
- Test cases executed: 43 | Passed: 40 | Failed: 3
- Bugs raised: 8 | Critical: 0 | High: 2 | Medium: 4 | Low: 2
- Bugs resolved before sprint end: 6 | Carried over: 2
- Regression: All P1 automated tests passed. Manual regression of checkout flow: passed.
- Risk: The payment gateway integration has 2 open medium bugs; recommend monitoring closely in Sprint 11.
```

This takes 10 minutes to write and is gold for sprint reviews and retrospectives.

## Using Velocity for Quality Prediction

Velocity is the amount of work a team completes each sprint (in story points). A sudden velocity spike without a corresponding quality improvement is a warning sign — the team may be cutting corners. A velocity drop often precedes a quality issue discovered in testing.

Watch for: sprints where velocity is high but defect count is also high. That's a signal to investigate.$$,
$$**Sprint 7 data:**
- 8 stories committed, 7 completed
- 52 test cases run: 47 passed, 5 failed
- 11 bugs raised: 1 critical (checkout crashes on iOS 17), 3 high, 5 medium, 2 low
- 2 bugs carried to Sprint 8

**Quality summary insight:**
"The critical iOS 17 bug was found on day 12 — late in the sprint. Root cause: no iOS 17 device in our test device matrix. Recommend: add iOS 17 to the regression device list and check for it in sprint planning for future stories with mobile-specific behaviour."

This is a tester adding value beyond just running tests.$$,
$$- Reporting just a bug count without severity context — 10 low bugs ≠ 10 critical bugs
- Only reporting at the end of the sprint — daily visibility helps the team react
- Ignoring escaped defects (bugs found in production) — these are the most important signal
- Making metrics look good by closing bugs prematurely — always be honest$$,
$$Build a simple "quality dashboard" in a spreadsheet — even just tracking stories tested, bugs by severity, and escape rate sprint-over-sprint. After 3 months you'll have data that tells a compelling story about quality trends.$$,
$$Create a sprint quality summary using fictional data for a 2-week sprint with 5 stories. Include at least one quality risk observation and a recommendation.$$,
$$What does "defect escape rate" measure?$$,
$$Why is tracking defects by severity more useful than tracking a raw bug count?$$,
array[
  'I can name and explain at least 5 Agile testing metrics',
  'I can write a sprint quality summary',
  'I understand how to use testing data to communicate quality risk to stakeholders'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 7, 'Module 4 Assignment & Knowledge Check', '45 minutes',
$$Time to put your Agile knowledge into practice. This assignment simulates real sprint activities — you'll write acceptance criteria, plan a testing sprint, and produce a quality summary, just as you would on the job.$$,
array[
  'Apply Agile testing techniques to a realistic scenario',
  'Demonstrate understanding of Scrum ceremonies and the tester''s role',
  'Produce professional testing artefacts for a sprint'
],
$$## Your Assignment

You are the tester on an Agile team building a **job board application**. The team is about to start Sprint 3.

**Sprint 3 backlog:**
- Story 1: As an employer, I want to post a job listing so that candidates can apply (8 points)
- Story 2: As a job seeker, I want to search for jobs by keyword and location (5 points)
- Story 3: As a job seeker, I want to save a job listing to my profile (3 points)

**Complete all three parts:**

---

### Part 1: Acceptance Criteria (approximately 200 words)
Choose ONE of the three stories. Write a complete set of acceptance criteria (aim for 6–8 criteria) covering: the happy path, error states, edge cases, and any relevant security or performance considerations.

---

### Part 2: Sprint Test Plan (approximately 300 words)
Write a one-page sprint test plan covering all three stories. Include:
- Your test priorities and why
- Any test data or environment setup needed
- Which areas of the existing app (from Sprints 1 and 2) you would regression test, and why
- Your exploratory testing focus for this sprint

---

### Part 3: Sprint Quality Summary (approximately 150 words)
At the end of the sprint, your results were:
- All 3 stories delivered
- 38 test cases executed: 34 passed, 4 failed
- 7 bugs raised (0 critical, 2 high, 3 medium, 2 low)
- 5 bugs fixed before sprint end; 2 medium bugs carried to Sprint 4

Write the sprint quality summary you would share in the sprint review. Include at least one quality observation or recommendation for Sprint 4.

---

## How You'll Be Assessed

Your submission will be reviewed for:
- Clarity and specificity of acceptance criteria
- Realistic prioritisation reasoning in the test plan
- Professional quality summary with actionable insights
- Use of correct Agile terminology throughout$$,
null, null, null,
$$Complete all three parts above and submit as a single document (Word, PDF, or Google Doc link). Use headings to separate each part clearly.$$,
$$After completing this assignment, which part of Agile testing felt most natural to you, and which felt hardest? What will you focus on practising?$$,
$$Before submitting — check: Have your acceptance criteria covered at least one error case? Does your test plan mention regression? Does your quality summary include a recommendation?$$,
array[
  'I completed all three parts of the assignment',
  'My acceptance criteria are specific and testable',
  'My test plan includes prioritisation reasoning',
  'My quality summary includes an actionable recommendation'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;
