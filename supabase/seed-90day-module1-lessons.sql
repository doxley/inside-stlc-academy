-- ============================================================
-- Exemplar lessons — 90-Day Roadmap, Module 1: Introduction to
-- Software Testing. Demonstrates the full Module → Lessons experience.
-- Run AFTER lessons-schema.sql. Safe to re-run.
-- Each insert resolves Module 1 by course slug + module_number.
-- ============================================================

-- Lesson 1
insert into public.lessons (module_id, lesson_number, title, estimated_time, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check)
select m.id, 1, 'What is Software Testing?', '15 minute read',
  array['Define software testing in plain language','Explain the purpose of testing','Distinguish testing from quality assurance'],
  $$## What testing actually is
Software testing is the process of evaluating a system to find out whether it behaves as expected — and to discover where it does not.
Testing is not about "breaking software". It is about providing information so the business can make good decisions about risk and quality.

## Testing vs Quality Assurance
- Testing is an activity: we execute or examine the product to find defects.
- Quality Assurance (QA) is broader: it is about the processes that prevent defects in the first place.
- A good tester does both — finds problems and helps the team avoid them next time.

## Verification vs Validation
- Verification: are we building the product right? (Does it meet the spec?)
- Validation: are we building the right product? (Does it meet the user's real need?)$$,
  $$A login page "works" — you can log in. But a tester also checks: wrong password, locked account, empty fields, very long inputs, and what happens on a slow network. The feature is the same; the testing is what reveals the risk.$$,
  $$- Thinking testing only means "click through the happy path"
- Treating testing as a phase at the end rather than an activity throughout
- Confusing "no tests failed" with "the software is good"$$,
  $$In real teams, the most valuable testers are the ones who ask "what could go wrong here?" before a line of code is written. That mindset is worth more than any tool.$$,
  $$Pick any app you use daily. Write down five things that could go wrong with one feature that a casual user would never think to check.$$,
  $$In your own words, how would you explain the difference between testing and quality assurance to a non-technical manager?$$,
  $$Which of these is validation rather than verification?
- A) Checking the code matches the technical spec
- B) Confirming the feature solves the user's actual problem
- C) Checking spelling on a button
(Answer: B)$$
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 1
on conflict (module_id, lesson_number) do nothing;

-- Lesson 2
insert into public.lessons (module_id, lesson_number, title, estimated_time, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check)
select m.id, 2, 'Why Companies Test Software', '12 minute read',
  array['Explain the business value of testing','Describe the cost of defects over time','Connect testing to risk'],
  $$## Testing is a business decision
Companies test because defects cost money, time, reputation, and sometimes safety. Testing reduces the risk of those costs.

## The cost of a defect grows over time
- A bug found while writing a user story costs almost nothing to fix.
- The same bug found in production can cost hundreds of times more — plus support, refunds, and lost trust.

## What testing protects
- Revenue (a broken checkout stops sales)
- Reputation (public failures damage the brand)
- Compliance (regulated industries must prove quality)
- Team velocity (fewer escaped defects means less firefighting)$$,
  $$An e-commerce site ships a checkout change without regression testing. A tax-calculation bug overcharges customers for two days. The fix takes an hour; the refunds, support load, and bad reviews take weeks.$$,
  $$- Assuming testing is a cost centre rather than risk insurance
- Skipping testing under deadline pressure and paying for it later
- Only measuring testing by bugs found, not risk reduced$$,
  $$When you justify testing to stakeholders, talk in their language: risk, cost, and customer impact — not test cases and tools.$$,
  $$Think of a real software failure you've heard about in the news. Write down what it likely cost the company and which type of testing might have caught it.$$,
  $$Why does the same defect become more expensive the later it is found?$$,
  $$True or false: testing adds the most value when it is left until just before release. (Answer: False)$$
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 1
on conflict (module_id, lesson_number) do nothing;

-- Lesson 3
insert into public.lessons (module_id, lesson_number, title, estimated_time, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check)
select m.id, 3, 'The Software Development Life Cycle (SDLC)', '15 minute read',
  array['Describe the phases of the SDLC','Explain where testing fits in each phase','Compare Waterfall and Agile at a high level'],
  $$## What the SDLC is
The SDLC is the process a team follows to build software, from idea to live product.

## Typical phases
- Requirements: what are we building and why
- Design: how will it work
- Development: building it
- Testing: checking it
- Deployment: releasing it
- Maintenance: supporting and improving it

## Testing belongs in every phase
- Requirements: review for clarity, gaps, testability
- Design: ask "how will we test this?"
- Development: unit and component checks
- Testing: system, integration, regression
- Maintenance: re-test fixes, guard against regressions

## Waterfall vs Agile
- Waterfall runs the phases once, in sequence.
- Agile repeats them in short iterations, testing continuously.$$,
  $$On an Agile team, a tester joins refinement (requirements), pairs on acceptance criteria (design), checks builds each day (development/testing), and helps verify the release — all within one two-week sprint.$$,
  $$- Believing testing is a single phase that happens "after development"
- Ignoring requirements quality, then testing against a vague spec
- Treating Agile as "no documentation and no process"$$,
  $$The earlier a tester is involved, the cheaper quality becomes. "Shift left" simply means start testing thinking at the requirements stage.$$,
  $$Map a feature you know to the six SDLC phases. For each phase, note one testing activity you could perform.$$,
  $$Where in the SDLC do you think testers add the most overlooked value, and why?$$,
  $$Which SDLC approach repeats all phases in short iterations? (Answer: Agile)$$
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 1
on conflict (module_id, lesson_number) do nothing;

-- Lesson 4
insert into public.lessons (module_id, lesson_number, title, estimated_time, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check)
select m.id, 4, 'The Software Testing Life Cycle (STLC)', '15 minute read',
  array['List the STLC phases','Describe the entry and exit criteria concept','Explain key test deliverables'],
  $$## What the STLC is
The STLC is the testing-specific process that runs alongside the SDLC.

## STLC phases
- Requirement analysis: understand what to test
- Test planning: scope, approach, resources, schedule
- Test design: write test cases and prepare data
- Environment setup: get a system to test against
- Test execution: run tests, log defects
- Test closure: report results, capture lessons learned

## Entry and exit criteria
- Entry criteria: what must be ready before a phase starts
- Exit criteria: what must be true before a phase is considered done

## Key deliverables
- Test plan, test cases, test data, defect reports, test summary report$$,
  $$Before execution starts, the team agrees exit criteria: all high-priority test cases run, no open critical defects, and regression passed. This stops "are we done?" arguments later.$$,
  $$- Skipping test planning and jumping straight to execution
- No clear exit criteria, so testing "finishes" when time runs out
- Writing test cases with no test data prepared$$,
  $$Clear entry/exit criteria are a tester's best defence against being blamed for a rushed release. Agree them in writing, early.$$,
  $$Draft three exit criteria you would insist on before signing off a release.$$,
  $$Why are exit criteria important even on a fast-moving Agile team?$$,
  $$Which STLC phase produces the test summary report? (Answer: Test closure)$$
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 1
on conflict (module_id, lesson_number) do nothing;

-- Lesson 5
insert into public.lessons (module_id, lesson_number, title, estimated_time, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check)
select m.id, 5, 'QA Roles Explained', '12 minute read',
  array['Describe common QA roles','Explain how roles collaborate','Identify which role suits your goals'],
  $$## Common roles
- Manual / QA Tester: designs and runs tests, finds and reports defects
- QA Analyst: focuses on requirements, risk, and coverage
- Automation Tester / SDET: builds automated checks and frameworks
- Test Lead / QA Lead: plans, coordinates, and reports on quality
- QA Manager: owns strategy, people, and process

## How they work together
- Analysts and testers shape what "good" looks like.
- Automation engineers make repetitive checks fast and reliable.
- Leads connect quality to delivery and stakeholders.

## Choosing a direction
- Like investigation and product thinking? Lean analyst/manual.
- Like coding and tooling? Lean automation/SDET.
- Like people and planning? Lean lead/management.$$,
  $$On a healthy team, a manual tester finds a tricky edge case, an analyst confirms it's a real risk, and an automation engineer adds a regression check so it never returns.$$,
  $$- Believing manual testing is "lesser" than automation — both are skilled
- Trying to automate everything, including exploratory work
- Picking a path based on salary alone, not on what energises you$$,
  $$Employers hire for mindset first and tools second. Strong fundamentals plus curiosity beat a long list of tools you've only touched once.$$,
  $$Write a two-sentence description of the QA role you most want in 12 months and one skill you need to build for it.$$,
  $$Which role appeals to you most right now, and what draws you to it?$$,
  $$Which role most often owns the overall test strategy? (Answer: QA Manager / QA Lead)$$
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 1
on conflict (module_id, lesson_number) do nothing;

-- Lesson 6
insert into public.lessons (module_id, lesson_number, title, estimated_time, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check)
select m.id, 6, 'Types of Testing', '18 minute read',
  array['Distinguish functional and non-functional testing','Describe key test levels','Explain manual vs automated testing'],
  $$## Functional vs non-functional
- Functional: does the feature do what it should? (login, search, checkout)
- Non-functional: how well does it do it? (performance, security, usability, accessibility)

## Test levels
- Unit: smallest pieces of code, usually by developers
- Integration: do components work together
- System: the whole application end to end
- Acceptance (UAT): does it meet the user's needs

## Common test types
- Smoke: quick check the build is stable enough to test
- Regression: confirm existing features still work after changes
- Exploratory: simultaneous learning, design, and execution
- Re-testing: confirm a specific fixed defect

## Manual vs automated
- Manual: human judgement, exploratory, usability
- Automated: fast, repeatable, ideal for regression$$,
  $$After a code change, the team runs a smoke test (is it up?), then regression (did anything break?), then exploratory testing around the changed area (what did we not anticipate?).$$,
  $$- Confusing regression testing with re-testing
- Automating unstable features and creating flaky tests
- Ignoring non-functional testing until users complain$$,
  $$"What type of testing is this?" is a classic interview question. Knowing the categories cold makes you sound experienced fast.$$,
  $$Take one feature and list which of the test types above you would apply to it, and why.$$,
  $$Which test type is best suited to automation, and which is best kept manual?$$,
  $$Smoke testing is run to: A) replace regression, B) confirm a build is stable enough to test further, C) test performance. (Answer: B)$$
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 1
on conflict (module_id, lesson_number) do nothing;

-- Lesson 7 — Knowledge Check
insert into public.lessons (module_id, lesson_number, title, estimated_time, learning_objectives, lesson_notes, knowledge_check)
select m.id, 7, 'Knowledge Check', '10 minutes',
  array['Consolidate the core concepts from Module 1'],
  $$Use this check to confirm you have absorbed the module. Try to answer before revealing the answers.$$,
  $$## Module 1 Knowledge Check
1. In one sentence, what is software testing?
2. Give two things testing protects for a business.
3. Name the six phases of the SDLC.
4. What is the difference between entry and exit criteria?
5. Name three QA roles and one strength of each.
6. Give one functional and one non-functional test type.
7. What is the difference between regression testing and re-testing?

If you can answer all seven confidently, you're ready for the assignment. If not, revisit the relevant lesson — that's normal and encouraged.$$
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 1
on conflict (module_id, lesson_number) do nothing;

-- Lesson 8 — Assignment
insert into public.lessons (module_id, lesson_number, title, estimated_time, learning_objectives, lesson_notes, exercise, reflection_question)
select m.id, 8, 'Assignment', '45 minutes',
  array['Apply Module 1 concepts to a real product'],
  $$This assignment turns theory into a portfolio-ready artefact. Keep your answer — you'll build on it across the course.$$,
  $$## Assignment: Quality snapshot
Choose a real app or website you use.
1. Write a one-paragraph description of what it does and who it's for.
2. Identify three functional and two non-functional qualities that matter for it.
3. List five risks (things that could go wrong) and rate each High / Medium / Low.
4. For two of those risks, name the test type you'd use to address them.
5. Summarise, in five sentences, why testing matters for this product.

Submit your write-up (PDF or doc) where your tutor can review it, or keep it in your portfolio folder.$$,
  $$Which of your five risks would hurt the business most, and why?$$
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 1
on conflict (module_id, lesson_number) do nothing;

-- Lesson 9 — Module Summary
insert into public.lessons (module_id, lesson_number, title, estimated_time, learning_objectives, lesson_notes, reflection_question)
select m.id, 9, 'Module Summary', '8 minute read',
  array['Recap Module 1','Set up for Module 2'],
  $$## What you've learned
- Testing provides information about quality and risk — it is not just "breaking things".
- Companies test to protect revenue, reputation, compliance, and team velocity.
- The SDLC is how software is built; testing belongs in every phase.
- The STLC is the testing process, with planning, design, execution, and closure.
- There are several QA roles — choose a direction that suits your strengths.
- Testing has many types across functional, non-functional, and different levels.

## What's next
Module 2 moves from "why" to "how": test design techniques that let you create strong test cases efficiently.

## Keep
Hold on to your assignment write-up — your risk thinking will feed directly into test design.$$,
  $$Looking back at Module 1, which single idea most changed how you think about software quality?$$
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 1
on conflict (module_id, lesson_number) do nothing;
