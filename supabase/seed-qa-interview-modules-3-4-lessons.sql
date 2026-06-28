-- ============================================================
-- QA Interview Accelerator — first-draft lessons for Module 3 (Core
-- Software Testing Questions) and Module 4 (Agile, Scrum and
-- Team-Based Questions). Run AFTER lessons-schema.sql and
-- seed-qa-interview-modules.sql.
-- ============================================================

-- ─────────────── MODULE 3: CORE SOFTWARE TESTING QUESTIONS ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Test Cases, Scenarios & Coverage', '12 minute read',
  $$Expect to be asked to define and apply the basics. This lesson prepares confident, example-backed answers.$$,
  array['Define test case vs test scenario','Explain coverage simply','Answer with a short example'],
  $$## Definitions
- Test scenario: a high-level thing to test ("verify login")
- Test case: the detailed steps and expected result for one check
- Coverage: how much of the requirements/risk your tests address

## Answer with structure
Define it, give a one-line example, relate it to real testing. Concise and concrete wins.

## Common framing
"How would you test X?" — structure by functional, negative, boundary, and non-functional.$$,
  $$"A scenario is 'test the login'; a test case is 'enter a valid email and wrong password and confirm an error is shown and access is blocked'." Clear distinction, with an example.$$,
  $$- Defining terms with no example
- Confusing scenario and case
- Rambling instead of a tight structure$$,
  $$Reuse the answers you drafted in the 90-Day course knowledge checks — practise them aloud until they're natural.$$,
  $$Write structured answers (definition + example) for "test case", "test scenario" and "coverage".$$,
  $$Which question do you find hardest to answer concisely, and why?$$,
  $$A test case differs from a scenario by being: A) higher level B) the detailed steps + expected result C) a deployment. (Answer: B)$$,
  array['I can define case vs scenario with examples','I can explain coverage simply']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 3
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Defects: Severity, Priority & Lifecycle', '12 minute read',
  $$Defect questions are near-guaranteed. Nail severity vs priority and the lifecycle and you'll sound experienced.$$,
  array['Distinguish severity and priority','Describe the defect lifecycle','Give a mismatch example'],
  $$## Severity vs priority
- Severity: technical impact (does it crash / lose data?)
- Priority: how soon the business wants it fixed
- They're independent — be ready with a mismatch example

## Lifecycle
New → Assigned → Open/In Progress → Fixed → Retest → Closed (with Reopened / Rejected / Duplicate as needed).

## Answer crisply
Define, then give the homepage-typo example (low severity, high priority).$$,
  $$"A misspelled company name on the homepage is low severity — nothing breaks — but high priority because it's customer-facing and embarrassing." Instantly shows real understanding.$$,
  $$- Treating severity and priority as the same
- Listing lifecycle states out of order
- No concrete mismatch example$$,
  $$The severity/priority mismatch example is the single most reliable way to impress on defect questions — memorise one.$$,
  $$Write your severity-vs-priority answer with a mismatch example, plus the lifecycle in order.$$,
  $$Why is a mismatch example so effective in answering this question?$$,
  $$After a developer marks a defect "Fixed", the tester should: A) close it B) retest/verify first C) delete it. (Answer: B)$$,
  array['I can distinguish severity and priority with an example','I can recite the defect lifecycle']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 3
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Test Types: Regression, Retest, Smoke & More', '12 minute read',
  $$"What's the difference between X and Y testing?" is a classic. This lesson sorts the commonly confused types.$$,
  array['Distinguish regression vs retest','Explain smoke and sanity','Describe exploratory and UAT'],
  $$## Commonly confused
- Regression: confirm existing features still work after a change
- Retest: confirm one specific defect is fixed
- Smoke: quick check the build is stable enough to test
- Sanity: focused check on a specific area after a change
- Exploratory: simultaneous learning, design and execution
- UAT: users confirm it meets their needs

## Answer pattern
One-line definition + when you'd use it.$$,
  $$"Retesting checks the exact bug that was fixed; regression checks that the fix (or any change) didn't break anything else." Clear and correct.$$,
  $$- Mixing up regression and retest
- Calling smoke and sanity the same thing
- Vague definitions with no "when to use"$$,
  $$Have crisp one-liners ready for each type. Interviewers often rattle through several quickly.$$,
  $$Write one-line definitions plus a "when to use" for regression, retest, smoke, sanity, exploratory and UAT.$$,
  $$Which pair do you most often see confused, and how do you keep them straight?$$,
  $$Retesting verifies: A) the whole app B) one specific fixed defect C) performance. (Answer: B)$$,
  array['I can distinguish the common test types','I can say when to use each']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 3
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Assignment & Knowledge Check', '40 minutes',
  $$Build your core-concept answer bank — a reusable interview asset.$$,
  array['Produce model answers to core QA questions'],
  $$Turn this module into a personal answer bank you can rehearse before any interview.$$,
  $$## Assignment: Core concepts answer bank
Write model answers (definition + example + when-to-use) for at least eight core questions, including:
- Test case vs test scenario
- Severity vs priority (with a mismatch example)
- The defect lifecycle
- Regression vs retest
- Smoke vs sanity
- Exploratory testing
- UAT
- "How would you test [a login / a search]?"
Rehearse them aloud, then save to your portfolio or submit for review.$$,
  $$Which answer improved most once you added a concrete example?$$,
  $$## Module 3 Knowledge Check
1. Give a low-severity, high-priority example.
2. What's the difference between regression and retesting?
3. What is the purpose of smoke testing?$$,
  array['I wrote model answers to core questions','I added examples and rehearsed aloud','I saved the answer bank']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 3
on conflict (module_id, lesson_number) do nothing;

-- ─────────────── MODULE 4: AGILE, SCRUM & TEAM-BASED QUESTIONS ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Agile & Scrum Questions', '12 minute read',
  $$Most teams are agile, so expect agile questions. This lesson prepares confident, practical answers.$$,
  array['Explain agile and Scrum basics','Describe the tester role in Scrum','Answer with practical examples'],
  $$## Likely questions
- What does agile mean to you?
- Explain Scrum roles, ceremonies and artefacts.
- How does a tester work in a Scrum team?

## Strong answers
Keep them practical: agile means testing continuously and getting involved early; in Scrum the tester is part of the delivery team, contributing across the sprint.

## Reuse
Draw on the 90-Day agile module for definitions; add your own framing.$$,
  $$"To me agile means testing little and often and getting involved at refinement — I'd rather prevent a defect by asking a question early than find it late." Practical and mindset-led.$$,
  $$- Reciting the manifesto with no practical meaning
- Saying agile means "no process/docs"
- Treating the tester as separate from the team$$,
  $$Answer agile questions with how you'd actually work, not just textbook definitions — it shows real experience.$$,
  $$Write practical answers to "what does agile mean to you?" and "how does a tester work in Scrum?".$$,
  $$How would you show, in an answer, that you understand agile in practice not just theory?$$,
  $$In Scrum, the tester is: A) a separate gate B) part of the delivery team C) the Scrum Master. (Answer: B)$$,
  array['I can answer agile and Scrum questions practically','I can describe the tester role in Scrum']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'User Stories & Acceptance Criteria', '12 minute read',
  $$Expect questions about working from stories and acceptance criteria. This lesson prepares clear answers.$$,
  array['Explain user stories and acceptance criteria','Use Given/When/Then','Show how you test from criteria'],
  $$## Likely questions
- What makes a good user story?
- How do you use acceptance criteria?
- What do you do if a story isn't testable?

## Strong answers
Acceptance criteria are your test basis; you'd raise a story that isn't testable in refinement. Mention Given/When/Then.

## Show the mindset
You don't just accept stories — you question gaps early.$$,
  $$"If a story has no clear acceptance criteria, I'd raise it in refinement — I can't confirm 'done' without them, and that's exactly where defects start." Shows ownership.$$,
  $$- Accepting stories with no acceptance criteria
- Not mentioning testability
- Confusing the story (what) with the solution (how)$$,
  $$"If it isn't testable, it isn't ready" is a great line — it shows you protect quality from the start.$$,
  $$Write answers for "what makes a good user story?" and "what do you do with an untestable story?".$$,
  $$Why are acceptance criteria central to a tester's work?$$,
  $$Acceptance criteria primarily serve as your: A) deployment plan B) test basis C) CV. (Answer: B)$$,
  array['I can answer story/criteria questions','I can show I question gaps early']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Collaboration & Communication Questions', '12 minute read',
  $$Teams hire people they can work with. Behavioural questions about collaboration are common — prepare honest, structured answers.$$,
  array['Answer collaboration questions','Show communication skills','Handle "disagreement" questions'],
  $$## Likely questions
- Tell me about working with developers.
- Describe a disagreement and how you handled it.
- How do you communicate bad news (e.g. a release risk)?

## Strong answers
Use STAR. Show respect, clarity, and a focus on the shared goal (quality), not "winning".

## Tone
Calm, collaborative, evidence-based — never blaming.$$,
  $$"A developer disagreed a bug was real. I reproduced it, shared clear steps and the user impact, and we agreed to fix it. Focusing on evidence, not ego, resolved it." Calm and credible.$$,
  $$- Blaming developers or others in your story
- No structure (rambling)
- Making it about being "right" rather than quality$$,
  $$Frame disagreement stories around evidence and shared goals. It signals maturity and teamwork.$$,
  $$Write a STAR answer for "describe a disagreement with a colleague and how you handled it".$$,
  $$How do you keep a disagreement answer collaborative rather than combative?$$,
  $$The best disagreement answers focus on: A) winning B) evidence and the shared goal C) blame. (Answer: B)$$,
  array['I can answer collaboration questions with STAR','I keep disagreement answers evidence-based']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Assignment & Knowledge Check', '35 minutes',
  $$Prepare agile and team-based answers you can reuse with confidence.$$,
  array['Produce agile and collaboration answers'],
  $$Build your agile/team answer set, including at least one STAR story.$$,
  $$## Assignment: Agile & team answers
1. Write practical answers to "what does agile mean to you?" and "how does a tester work in Scrum?".
2. Write an answer for handling an untestable story.
3. Write one full STAR story about collaboration or a disagreement.
Rehearse aloud, then save to your portfolio or submit for review.$$,
  $$Which of these answers will you most rely on, and why?$$,
  $$## Module 4 Knowledge Check
1. How is a tester positioned within a Scrum team?
2. What do you do with an untestable story?
3. What should a "disagreement" answer focus on?$$,
  array['I prepared agile and Scrum answers','I wrote a collaboration STAR story','I rehearsed and saved them']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;
