-- ============================================================
-- 90-Day Roadmap — first-draft lessons for Module 4 (Agile & Scrum
-- for Testers) and Module 5 (Jira & Test Management).
-- Draft content for review/refinement. Run AFTER lessons-schema.sql.
-- ============================================================

-- ─────────────── MODULE 4: AGILE & SCRUM FOR TESTERS ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Agile Principles & the Agile Manifesto', '12 minute read',
  $$Most QA roles today are on Agile teams. This lesson explains what Agile actually means for a tester day to day.$$,
  array['Explain the Agile values and principles','Contrast Agile with Waterfall for testing','Describe what "shift left" means'],
  $$## The Agile Manifesto (plain English)
- People and collaboration over rigid process
- Working software over exhaustive documentation
- Customer collaboration over contract negotiation
- Responding to change over following a fixed plan

## What it means for testers
- Testing happens continuously, not in a phase at the end
- Testers get involved early ("shift left") — in refinement and story writing
- Quality is the whole team's responsibility, not just QA's

## Agile vs Waterfall (for QA)
- Waterfall: test after build, big test phase
- Agile: test every sprint, small and continuous$$,
  $$On an Agile team a tester reviews a story in refinement, spots a missing rule ("what happens for an expired card?"), and gets it clarified before any code is written — saving a defect later.$$,
  $$- Thinking "Agile" means no documentation or no testing
- Waiting until the end of the sprint to start testing
- Treating QA as a gate rather than a continuous activity$$,
  $$Saying "I like to get involved at refinement to catch issues early" in an interview signals you understand modern Agile QA.$$,
  $$Write down three ways a tester adds value before any code is written on an Agile team.$$,
  $$How does Agile change when and how testing happens compared with Waterfall?$$,
  $$"Shift left" means: A) test only at the end B) involve testing earlier C) skip testing. (Answer: B)$$,
  array['I can explain the Agile values in plain English','I understand what shift-left means for QA']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'The Scrum Framework', '12 minute read',
  $$Scrum is the most common Agile framework. Know its roles, events and artefacts and you'll fit into most teams quickly.$$,
  array['Name the three Scrum roles','Describe sprints and the product backlog','Explain where QA fits in Scrum'],
  $$## Roles
- Product Owner: owns the backlog and priorities
- Scrum Master: facilitates and removes blockers
- Developers: the delivery team (includes testers)

## Artefacts
- Product backlog: everything that might be built
- Sprint backlog: what the team commits to this sprint
- Increment: the working software produced

## Sprints
Short, fixed time-boxes (often 1–2 weeks) that repeat.$$,
  $$A two-week sprint: the team commits to eight stories. The tester writes acceptance tests on day one, tests stories as they're completed, and helps demo the increment at the end.$$,
  $$- Believing the Scrum Master is the "boss" (they're a facilitator)
- Treating testers as separate from the development team
- Carrying unfinished testing into the next sprint repeatedly$$,
  $$"The testers are part of the Developers role in Scrum" surprises many beginners — knowing it shows you understand the framework properly.$$,
  $$List the three Scrum roles and write one sentence on how a tester interacts with each.$$,
  $$Why is the tester considered part of the delivery team rather than a separate gate?$$,
  $$Who owns and prioritises the product backlog? (Answer: Product Owner)$$,
  array['I can name the Scrum roles, artefacts and events','I know where QA sits in Scrum']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Scrum Ceremonies', '12 minute read',
  $$The Scrum events (ceremonies) are where testers contribute most. This lesson covers each one and what to say in it.$$,
  array['Describe each Scrum ceremony','Explain the tester contribution to each','Avoid common ceremony pitfalls'],
  $$## The ceremonies
- Sprint Planning: agree what to build; testers raise testability and effort
- Daily Stand-up: quick sync; share progress and blockers
- Backlog Refinement: clarify upcoming stories; testers ask the "what if" questions
- Sprint Review: demo the increment to stakeholders
- Retrospective: improve how the team works

## Tester focus
Refinement and planning are your biggest opportunities to prevent defects.$$,
  $$In refinement, the tester asks "what should happen if the discount code is expired?". The PO realises it's unspecified — a defect prevented before coding starts.$$,
  $$- Treating stand-up as a status report to a manager
- Staying silent in refinement, then finding gaps during testing
- Skipping retrospectives or never acting on them$$,
  $$In stand-ups, talk about flow and risk ("I'm blocked on test data for story 3"), not just a task list.$$,
  $$For each ceremony, write one specific thing a tester could contribute.$$,
  $$Which ceremony gives testers the best chance to prevent defects, and why?$$,
  $$Where do testers most influence quality before code is written? (Answer: Refinement/Planning)$$,
  array['I can describe each Scrum ceremony','I know how a tester contributes to each']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'User Stories & Acceptance Criteria', '15 minute read',
  $$User stories describe what to build; acceptance criteria define "done". Testers live and breathe both.$$,
  array['Read and critique a user story','Write clear acceptance criteria','Use Given/When/Then'],
  $$## User story format
"As a [user], I want [goal], so that [benefit]."

## Acceptance criteria
The conditions that must be true for the story to be accepted. They are your test basis.

## Given / When / Then
- Given some context
- When an action happens
- Then an outcome is expected

## INVEST (good stories)
Independent, Negotiable, Valuable, Estimable, Small, Testable. "Testable" is the tester's flag to raise.$$,
  $$Story: "As a customer, I want to reset my password, so that I can regain access."
AC: Given a registered email, When I request a reset, Then I receive a reset link valid for 60 minutes.$$,
  $$- Accepting stories with no acceptance criteria
- Writing AC that can't actually be verified
- Confusing the story (the what) with the solution (the how)$$,
  $$If a story isn't testable, it isn't ready. Raising that early is one of the most valuable things a tester does.$$,
  $$Take a feature and write a user story plus three Given/When/Then acceptance criteria.$$,
  $$Why are acceptance criteria the foundation of your test cases?$$,
  $$In INVEST, which letter is the tester's strongest concern? (Answer: T — Testable)$$,
  array['I can write a user story and acceptance criteria','I can use Given/When/Then']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'The Tester''s Role in Agile', '12 minute read',
  $$This lesson pulls it together: what a great Agile tester actually does across a sprint.$$,
  array['Describe a tester''s sprint workflow','Explain the "three amigos" idea','Balance new testing with regression'],
  $$## Across a sprint
- Day 1: review stories, write test ideas/cases, prepare data
- Mid-sprint: test stories as they''re completed, log defects, retest
- End: support the review/demo, confirm acceptance criteria met

## Three amigos
A short conversation between a business person, a developer, and a tester about a story before it''s built — three perspectives catch more.

## Regression
As the product grows, protect existing features — prioritise regression by risk.$$,
  $$A tester pairs with a developer (three amigos with the PO) on a story, agrees the edge cases up front, then tests it the same day it''s built — feedback in hours, not weeks.$$,
  $$- Batching all testing to the last two days of the sprint
- Only testing new work and letting regression slip
- Working in isolation instead of collaborating early$$,
  $$"Testing little and often" beats a big test phase. Teams that test continuously ship with far fewer surprises.$$,
  $$Map out what you would do as a tester on each day of a one-week sprint.$$,
  $$How do the "three amigos" reduce defects before code is written?$$,
  $$Who takes part in a "three amigos" conversation? (Answer: business/PO, developer, tester)$$,
  array['I can describe a tester''s sprint workflow','I understand three amigos and regression balance']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 6, 'Assignment & Knowledge Check', '40 minutes',
  $$Apply Agile concepts to a real story and produce a portfolio artefact.$$,
  array['Apply user stories, acceptance criteria and a tester''s sprint plan'],
  $$Turn the module into practice: take a feature and work it the way an Agile tester would.$$,
  $$## Assignment: Agile story pack
1. Write a user story (As a… I want… so that…) for a feature of your choice.
2. Add four Given/When/Then acceptance criteria, including at least one negative case.
3. List the "what if" questions you'd raise in refinement.
4. Write a short note on how you'd test this story across a one-week sprint.
Save it to your portfolio or submit for review.$$,
  $$Which refinement question do you think would have the biggest impact on quality, and why?$$,
  $$## Module 4 Knowledge Check
1. Name the three Scrum roles.
2. What is the purpose of a retrospective?
3. What makes a user story "testable"?$$,
  array['I wrote a user story with acceptance criteria','I planned how to test it across a sprint','I saved the pack to my portfolio']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;

-- ─────────────── MODULE 5: JIRA & TEST MANAGEMENT ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Getting Started with Jira', '12 minute read',
  $$Jira is the tool you'll most likely use to track work and defects. This lesson orients you fast.$$,
  array['Describe what Jira is used for','Recognise common issue types','Navigate a Jira board'],
  $$## What Jira is
A work-tracking tool teams use to manage stories, tasks, bugs and sprints.

## Common issue types
- Epic: a large body of work
- Story: a user-facing requirement
- Task: a piece of work
- Bug: a defect
- Sub-task: a breakdown of any of the above

## Boards
- Scrum board: organised by sprint
- Kanban board: continuous flow, columns by status$$,
  $$You open the sprint board, filter to your name, and see your assigned stories in "In Progress" and bugs in "To Do" — your day's work at a glance.$$,
  $$- Logging a bug as a story (or vice versa)
- Ignoring required fields, making issues hard to track
- Not linking related issues$$,
  $$Every team configures Jira differently. In a new role, ask for a five-minute walkthrough of their workflow — it saves days of confusion.$$,
  $$If you have access to a free Jira instance, create one story and one bug. If not, sketch the fields each should contain.$$,
  $$Why does using the correct issue type matter for the whole team?$$,
  $$Which issue type represents a defect in Jira? (Answer: Bug)$$,
  array['I can describe what Jira is for','I can recognise the common issue types']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Issues, Workflows & Boards', '12 minute read',
  $$Work moves through a workflow of statuses. Understanding it keeps your reporting accurate and your team informed.$$,
  array['Explain a Jira workflow','Move issues through statuses correctly','Use filters and quick searches'],
  $$## Workflows
A workflow is the set of statuses an issue moves through, e.g. To Do → In Progress → In Review → Done.

## Keeping status accurate
- Update your issues as you work
- Move bugs to the right status after retest
- Use comments to capture decisions

## Finding things
- Filters and JQL (Jira Query Language) let you build views like "my open bugs this sprint"$$,
  $$You finish retesting a fix and move the bug from "In Review" to "Done", adding a comment "Verified on build 1.5 — passes". Anyone scanning the board now trusts the status.$$,
  $$- Leaving issues in the wrong status, so the board lies
- Never using filters, then losing track of work
- Closing issues without a verifying comment$$,
  $$Learn one JQL query early: assignee = currentUser() AND status != Done. It instantly shows your live work.$$,
  $$Write (in plain English or JQL) a query for "all open bugs assigned to me in the current sprint".$$,
  $$Why does keeping issue status accurate matter for the whole team's trust in the board?$$,
  $$What does a Jira workflow define? (Answer: the statuses an issue moves through)$$,
  array['I can explain a Jira workflow','I can keep issues in the correct status']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Managing Test Cases (Zephyr & Xray)', '12 minute read',
  $$Test management tools add structured test cases, runs and results on top of Jira. This lesson explains the concepts.$$,
  array['Explain why test management tools exist','Describe test cases, cycles and executions','Record and interpret results'],
  $$## Why they exist
Jira tracks work and bugs; test management add-ons (Zephyr, Xray) track test cases, test cycles, and pass/fail results.

## Key concepts
- Test case: the steps and expected result
- Test cycle / plan: a set of tests for a release or sprint
- Execution: a run of a test, with a result (Pass/Fail/Blocked)

## Traceability
Link test cases to the stories they verify and the bugs they raise.$$,
  $$Before a release you create a test cycle of 40 cases, execute them, mark 37 Pass and 3 Fail, and each failure auto-links to a logged bug — a clear release quality picture.$$,
  $$- Keeping test cases in scattered spreadsheets with no traceability
- Not recording execution results, so "what was tested?" is unknown
- Marking tests Pass without actually running them$$,
  $$Even if a team doesn't use Zephyr/Xray, the concepts (case, cycle, execution, result) apply everywhere — learn the ideas, not just one tool.$$,
  $$Outline a test cycle of five cases for a small feature, with a column for result (Pass/Fail/Blocked).$$,
  $$How does linking test cases to stories and bugs help at release time?$$,
  $$A "test execution" records: A) a new requirement B) the result of running a test C) a deployment. (Answer: B)$$,
  array['I understand test cases, cycles and executions','I can record and read test results']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Linking Tests, Bugs & Requirements', '12 minute read',
  $$Traceability connects requirements to tests to defects, so you can answer "is this covered?" and "what broke?".$$,
  array['Define traceability','Explain a requirements traceability matrix (RTM)','Use links to assess coverage and impact'],
  $$## What traceability is
The ability to follow a thread: requirement → test case(s) → execution result → any defects raised.

## The RTM
A requirements traceability matrix maps each requirement to the tests that cover it, exposing gaps.

## Why it matters
- Coverage: which requirements have no tests?
- Impact: if this requirement changes, which tests must we re-run?$$,
  $$A change request touches "checkout tax". The RTM shows the five test cases linked to it, so you know exactly what to re-test — nothing more, nothing less.$$,
  $$- No links, so coverage and impact are guesswork
- Treating the RTM as paperwork instead of a working tool
- Linking tests to stories but never to the bugs they find$$,
  $$An RTM is a brilliant interview talking point — it shows you think about coverage and risk, not just running tests.$$,
  $$Build a tiny RTM: three requirements, the test case(s) that cover each, and a note where coverage is missing.$$,
  $$How does traceability help when a requirement changes late in a release?$$,
  $$What does an RTM primarily reveal? (Answer: coverage gaps between requirements and tests)$$,
  array['I can explain traceability and an RTM','I can use links to judge coverage and impact']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Reporting & Dashboards', '12 minute read',
  $$Good reporting turns your testing into information stakeholders can act on. This lesson covers the essentials.$$,
  array['Describe useful QA metrics','Build a simple quality dashboard','Communicate status without jargon'],
  $$## Useful metrics (use with care)
- Test execution progress (run vs planned)
- Pass/fail rate
- Open defects by severity and age
- Defect trend over time

## Dashboards
Jira dashboards/gadgets can show these live to the team and stakeholders.

## Communicating
Lead with risk and impact, not raw numbers. Metrics inform decisions; they aren't the goal.$$,
  $$Instead of "we ran 120 tests", report "all critical paths pass; two medium defects remain open in reporting, neither blocks release" — stakeholders can decide instantly.$$,
  $$- Vanity metrics (number of test cases) with no context
- Using defect counts to judge individuals
- Burying the key risk under a wall of numbers$$,
  $$Always pair a metric with a "so what". A number without a decision attached is noise.$$,
  $$Design a simple release dashboard: pick four widgets and say what decision each supports.$$,
  $$Why can defect counts be misleading if used as a performance measure?$$,
  $$Good QA reporting leads with: A) raw test counts B) risk and impact C) tool names. (Answer: B)$$,
  array['I can choose meaningful QA metrics','I can report status in terms of risk']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 6, 'Assignment & Knowledge Check', '40 minutes',
  $$Produce a small test-management pack: cases, a cycle, results, and a traceability view.$$,
  array['Apply test management and traceability end to end'],
  $$Pull the module together by managing the testing for a small feature as you would in a real tool.$$,
  $$## Assignment: Test management pack
1. Pick a feature and write five test cases (use your Module 2 skills).
2. Create a "test cycle" table and record a result for each (Pass/Fail/Blocked).
3. For any Fail, write a one-line linked bug summary.
4. Build a mini RTM mapping two requirements to the cases that cover them.
Save it to your portfolio or submit for review.$$,
  $$Looking at your RTM, where is coverage weakest, and what would you add?$$,
  $$## Module 5 Knowledge Check
1. What is the difference between a test case and a test execution?
2. What does an RTM reveal?
3. Name two QA metrics and the decision each supports.$$,
  array['I created test cases, a cycle and results','I built a mini RTM','I saved the pack to my portfolio']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;
