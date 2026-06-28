-- ============================================================
-- QA Interview Accelerator — first-draft lessons for Module 5
-- (Scenario-Based QA Questions) and Module 6 (Test Task Preparation).
-- Run AFTER lessons-schema.sql and seed-qa-interview-modules.sql.
-- ============================================================

-- ─────────────── MODULE 5: SCENARIO-BASED QA QUESTIONS ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'How to Approach Scenario Questions', '12 minute read',
  $$Scenario questions test your thinking, not a memorised answer. A simple framework keeps you calm and structured.$$,
  array['Apply a structure to scenario questions','Ask clarifying questions','Think aloud clearly'],
  $$## A simple framework
- Clarify: ask a question or state assumptions
- Prioritise: what's the biggest risk here?
- Approach: outline how you'd tackle it step by step
- Communicate: who would you involve and how?

## Think aloud
Interviewers want to hear your reasoning. Narrate your thought process calmly.

## There's rarely one right answer
They're assessing judgement and structure, not a single correct response.$$,
  $$Asked "what would you do if you found a critical bug right before release?", you clarify severity, assess impact, recommend options (delay, hotfix, accept risk) and say who you'd inform — structured judgement.$$,
  $$- Blurting one action with no structure
- Not clarifying or stating assumptions
- Going silent instead of thinking aloud$$,
  $$Start scenario answers with "First I'd clarify…" or "My assumptions are…". It buys thinking time and shows maturity.$$,
  $$Write the four-step framework and apply it to one scenario question of your choice.$$,
  $$Why do interviewers value your reasoning over a single "correct" answer here?$$,
  $$A good first move in a scenario answer is to: A) guess fast B) clarify or state assumptions C) stay silent. (Answer: B)$$,
  array['I have a structure for scenario questions','I clarify and think aloud']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Production Defects & Missed Bugs', '12 minute read',
  $$How you handle "a bug reached production" or "you missed a defect" reveals your professionalism and ownership.$$,
  array['Answer production-incident scenarios','Show ownership without blame','Focus on learning and prevention'],
  $$## Production defect
- Contain: assess impact, communicate, support a fix
- Diagnose: reproduce and find the cause
- Prevent: add a regression test, learn from it

## Missed a bug
- Own it calmly (no blame, no defensiveness)
- Explain how you'd find out why it slipped (coverage gap?)
- Add a check so it can't recur

## Tone
Calm, accountable, improvement-focused — never blaming others.$$,
  $$"If I missed a defect, I'd own it, work out which coverage gap let it through, add a regression test, and share the learning with the team — so it can't happen the same way again." Mature and constructive.$$,
  $$- Blaming developers, deadlines or others
- Being defensive about a miss
- No prevention/learning step$$,
  $$"Own it, fix it, prevent it" is the formula. Showing you learn from misses is more impressive than claiming you never make them.$$,
  $$Write STAR-style answers for "a bug reached production" and "you missed a defect".$$,
  $$Why does owning a miss impress more than claiming perfection?$$,
  $$The best response to missing a defect includes: A) blame B) ownership + prevention C) silence. (Answer: B)$$,
  array['I can answer production-incident scenarios','I show ownership and prevention']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Unclear Requirements & Tight Deadlines', '12 minute read',
  $$These scenarios test how you cope with real pressure and ambiguity — common in every QA role.$$,
  array['Handle unclear-requirements scenarios','Prioritise under deadline pressure','Communicate trade-offs'],
  $$## Unclear requirements
- Ask questions; state assumptions in writing
- Use risk to decide what to test without full clarity
- Raise the ambiguity rather than guessing silently

## Tight deadlines
- Prioritise by risk: test the most critical paths first
- Be transparent about what you can and can't cover in the time
- Offer options, not just problems

## Communicate trade-offs
"With this time I can confidently cover X; Y would need more" — honest and useful.$$,
  $$"With one day to test a big release, I'd focus on the highest-risk flows (payment, login), be clear about what I didn't cover, and flag the residual risk so the business can decide." Calm prioritisation.$$,
  $$- Pretending you can test everything in no time
- Guessing on requirements instead of asking
- Hiding what wasn't covered$$,
  $$Risk-based prioritisation plus honest communication is the answer to almost every "not enough time" scenario.$$,
  $$Write answers for "the requirements are unclear" and "you have far too little time to test a release".$$,
  $$How does risk help you act when you can't test everything?$$,
  $$Under a tight deadline you should first: A) test randomly B) prioritise by risk and communicate C) refuse to test. (Answer: B)$$,
  array['I can handle ambiguity and deadline scenarios','I communicate trade-offs honestly']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Assignment & Knowledge Check', '40 minutes',
  $$Prepare structured answers to the most common scenario questions.$$,
  array['Produce scenario answers using a clear framework'],
  $$Build a bank of scenario answers using the clarify-prioritise-approach-communicate framework.$$,
  $$## Assignment: Scenario answer bank
Write structured answers to at least five scenario questions, including:
- A critical bug found right before release
- You missed a defect that reached production
- The requirements are unclear
- Far too little time to test
- A disagreement with a developer about a bug
Use the four-step framework and STAR where relevant. Rehearse aloud, then save to your portfolio or submit for review.$$,
  $$Which scenario felt hardest, and how did structuring it help?$$,
  $$## Module 5 Knowledge Check
1. What are the four steps for approaching a scenario question?
2. What's the formula for answering "you missed a defect"?
3. How does risk help under a tight deadline?$$,
  array['I prepared structured scenario answers','I used the framework and STAR','I rehearsed and saved them']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;

-- ─────────────── MODULE 6: TEST TASK PREPARATION ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'What to Expect in a Test Task', '10 minute read',
  $$Many QA interviews include a practical task. Knowing the formats removes anxiety and lets you shine.$$,
  array['Recognise common test-task formats','Understand what is assessed','Plan your time'],
  $$## Common formats
- Test a given feature/page and report findings
- Write test cases from a requirement
- Find and report bugs in a sample app
- A take-home exercise with a write-up

## What's assessed
Your thinking, structure, coverage, and communication — not just how many bugs you find.

## Time
Clarify the time limit and scope; plan to leave time to write up clearly.$$,
  $$Given a sample sign-up page for 30 minutes, you spend five minutes clarifying scope and planning, twenty testing, and five writing a clear summary — structured and complete.$$,
  $$- Diving in with no plan
- Running out of time before writing anything up
- Chasing bug count over clear reasoning$$,
  $$A clear write-up of fewer issues beats a messy list of many. Leave time to communicate what you found and how.$$,
  $$For a sample feature, outline how you'd spend a 30-minute test task (plan, test, write-up).$$,
  $$Why is your write-up as important as the bugs you find?$$,
  $$A test task mainly assesses: A) bug count only B) thinking, structure and communication C) typing speed. (Answer: B)$$,
  array['I know common test-task formats','I can plan my time for one']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Writing Test Cases Under Time Pressure', '12 minute read',
  $$Test tasks often ask for test cases fast. This lesson helps you produce clear, prioritised cases quickly.$$,
  array['Write clear test cases quickly','Prioritise by risk','Cover positive, negative and edge'],
  $$## Be fast and clear
- State assumptions up front
- Cover positive, negative and boundary cases
- Use your techniques (EP, BVA) to get coverage efficiently

## Prioritise
Lead with the highest-risk cases; note lower-priority ones briefly.

## Format
A simple table (Title | Steps | Expected | Priority) reads well and shows structure.$$,
  $$For a login in 15 minutes you write: valid login, wrong password, empty fields, locked account, very long input, SQL-ish input — prioritised, with clear expected results.$$,
  $$- Only writing happy-path cases
- Vague expected results
- No prioritisation$$,
  $$Open with "My assumptions are…" then a prioritised table. It signals professionalism even under time pressure.$$,
  $$In 15 minutes, write prioritised test cases for a simple feature using EP and BVA.$$,
  $$How do test-design techniques help you get coverage quickly?$$,
  $$Under time pressure you should lead with: A) edge cases only B) the highest-risk cases C) random cases. (Answer: B)$$,
  array['I can write clear test cases quickly','I prioritise and cover negative/edge cases']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Raising Defects & Explaining Assumptions', '12 minute read',
  $$In a test task, how you report a bug and state assumptions shows your real-world readiness.$$,
  array['Raise a clear defect in a task','State assumptions explicitly','Show your reasoning'],
  $$## Reporting bugs in a task
Use a mini bug-report format: title, steps, expected, actual. Even brief, keep it reproducible.

## Assumptions
State them clearly ("I assumed UK postcodes only"). It shows judgement and prevents misunderstanding.

## Reasoning
Briefly explain why you prioritised what you did — interviewers value the "why".$$,
  $$"Bug: Apply Coupon does nothing on mobile. Steps… Expected discount; Actual nothing. Assumption: coupon SAVE10 is valid." Clear, reproducible, with context.$$,
  $$- Reporting bugs with no steps or expected/actual
- Hiding assumptions
- Listing findings with no reasoning$$,
  $$Stating assumptions is a senior habit. It turns ambiguity into a documented decision rather than a guess.$$,
  $$Write a mini bug report plus two assumptions you'd state for a sample feature.$$,
  $$Why does stating assumptions strengthen your test-task submission?$$,
  $$A good in-task bug report still includes: A) just a title B) steps + expected + actual C) only a screenshot. (Answer: B)$$,
  array['I can raise a clear defect in a task','I state assumptions and reasoning']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Assignment & Knowledge Check', '45 minutes',
  $$Complete a full mock test task — a strong portfolio artefact.$$,
  array['Complete a mock test task end to end'],
  $$Bring the module together by completing a realistic mock test task and write-up.$$,
  $$## Assignment: Mock test task
Pick any public website/app feature and, in a time-box (e.g. 45 minutes):
1. State your assumptions and scope.
2. Write prioritised test cases (positive, negative, boundary).
3. Find and report at least three bugs (or potential issues) in mini bug-report format.
4. Write a short summary: what you tested, what you'd do with more time, key risks.
Save the whole task to your portfolio or submit for review.$$,
  $$What would you improve about your approach if you did the task again?$$,
  $$## Module 6 Knowledge Check
1. Besides bug count, what does a test task assess?
2. Why state assumptions in a test task?
3. What belongs in a clear in-task bug report?$$,
  array['I completed a timed mock test task','I wrote prioritised cases and clear bug reports','I saved the task to my portfolio']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;
