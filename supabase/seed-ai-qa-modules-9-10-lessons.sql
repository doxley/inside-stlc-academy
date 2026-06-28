-- ============================================================
-- AI for QA Testers — first-draft lessons for Module 9 (Automation
-- Support with AI) and Module 10 (AI in Agile QA Workflows).
-- Run AFTER lessons-schema.sql and seed-ai-qa-modules.sql.
-- ============================================================

-- ─────────────── MODULE 9: AUTOMATION SUPPORT WITH AI ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'How AI Supports Automation', '12 minute read',
  $$AI can accelerate automation work — scaffolding, selectors, data, debugging — while you stay responsible for correctness and design.$$,
  array['List ways AI supports automation','Set realistic expectations','Keep ownership of code quality'],
  $$## Where AI helps
- Drafting test scaffolding and boilerplate
- Suggesting selectors and locators
- Generating test data
- Explaining errors and suggesting fixes
- Refactoring and adding comments

## Where you stay in charge
- Test design and what to automate
- Verifying generated code actually works
- Stable, maintainable structure

## Mindset
AI is a fast pair-programmer; you review and own every line.$$,
  $$You ask AI to scaffold a Playwright test for login. It drafts the structure; you fix the selectors to stable test ids, confirm it runs, and commit — faster, but yours.$$,
  $$- Committing AI-generated code without running it
- Accepting brittle selectors AI suggests
- Letting AI decide what to automate$$,
  $$Treat AI like a junior pair-programmer: great for first drafts and boilerplate, but you review, run, and own the result.$$,
  $$List three automation tasks where AI would save you time and one where your judgement is essential.$$,
  $$Why must you run and review AI-generated automation code before committing it?$$,
  $$AI in automation is best treated as: A) the test designer B) a pair-programmer you review C) a deployment tool. (Answer: B)$$,
  array['I can list ways AI supports automation','I keep ownership of code quality']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 9
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Generating Test Scaffolding & Selectors', '12 minute read',
  $$AI can draft test structure and propose selectors fast — your job is to make them stable and correct.$$,
  array['Scaffold a test with AI','Improve AI-suggested selectors','Apply stable-locator principles'],
  $$## Scaffolding
Ask AI for the skeleton: setup, the action, and assertions (Arrange-Act-Assert). Then fill in real details.

## Selectors
AI often suggests fragile selectors (deep CSS/XPath). Replace them with stable ones (test ids, roles) per your automation fundamentals.

## Verify
Run the test. Generated code that "looks right" frequently needs adjustment to actually pass.$$,
  $$AI scaffolds a checkout test using a brittle nth-child selector. You swap it for data-testid="checkout-submit", run it, and it passes reliably.$$,
  $$- Keeping fragile AI-suggested selectors
- Not running the scaffolded test
- Letting AI skip independence/teardown$$,
  $$The fastest path to a stable suite: let AI scaffold, then apply your locator and structure standards. Speed from AI, stability from you.$$,
  $$Have AI scaffold a simple UI test, then replace its selectors with stable ones and note the changes.$$,
  $$Why do AI-suggested selectors often need replacing?$$,
  $$The most stable locator type is usually: A) deep XPath B) test id / role C) nth-child CSS. (Answer: B)$$,
  array['I can scaffold a test with AI','I replace fragile selectors with stable ones']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 9
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Debugging & Refactoring with AI', '12 minute read',
  $$AI is genuinely useful for explaining errors and suggesting refactors — used as a guide, not gospel.$$,
  array['Use AI to explain errors','Get refactoring suggestions','Validate every fix'],
  $$## Debugging
- Paste an error/stack trace and ask "what does this mean and what could cause it?"
- Treat the explanation as a lead to investigate

## Refactoring
- "Suggest how to make this test more readable/maintainable."
- "Extract repeated steps into a helper."

## Validate
Apply changes, then run the tests. A refactor isn't done until it's green and still tests the right thing.$$,
  $$A test fails with a timeout. AI explains it's likely waiting on an element that never appears; you discover a wrong selector, fix it, and the test passes.$$,
  $$- Applying AI fixes without running the tests
- Refactoring so much the test no longer checks what it should
- Pasting proprietary code into public tools$$,
  $$AI is a brilliant rubber-duck for errors — explaining them clearly. But confirm the cause by testing; explanations can be plausible yet wrong.$$,
  $$Take a failing test (or an error message) and use AI to explain it; identify and verify the real fix.$$,
  $$Why treat an AI debugging explanation as a lead rather than the answer?$$,
  $$A refactor is complete only when: A) AI says so B) tests pass and still check the right thing C) it's shorter. (Answer: B)$$,
  array['I can use AI to explain errors','I validate every AI fix by running tests']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 9
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Test Data & Maintenance Help', '12 minute read',
  $$AI helps generate automation test data and tackle maintenance tasks like flaky tests and coverage gaps.$$,
  array['Generate automation test data with AI','Get help reducing flakiness','Use AI for coverage suggestions'],
  $$## Test data
Ask AI for synthetic, varied data sets (valid, invalid, boundary) for data-driven tests — never real data.

## Flakiness
- "Why might this test be flaky?" (timing, ordering, shared data)
- Apply the fixes you learned: stable locators, proper waits, independence.

## Coverage
- "What scenarios am I not covering in these tests?"
- Use the suggestions as input, prioritised by risk.$$,
  $$Your suite has an intermittent failure. AI suggests it's a shared-data ordering issue; you make the test create its own data and the flakiness disappears.$$,
  $$- Using real data in automated tests
- Treating AI's flakiness guess as confirmed without testing
- Adding every suggested case regardless of value$$,
  $$Flaky tests erode trust in automation. AI can suggest causes, but the cure is the fundamentals — waits, independence, stable locators.$$,
  $$Ask AI why a described test might be flaky and list the concrete fixes you'd apply.$$,
  $$What are two common causes of flaky automated tests?$$,
  $$Automation test data from AI should be: A) production data B) synthetic C) real customer data. (Answer: B)$$,
  array['I can generate synthetic automation data with AI','I can use AI to diagnose flakiness and fix it properly']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 9
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Assignment & Knowledge Check', '40 minutes',
  $$Use AI to support a small automation task end to end — with your review and verification.$$,
  array['Apply AI to scaffold, debug and improve automation'],
  $$Bring the module together by using AI to help with an automation task while keeping ownership.$$,
  $$## Assignment: AI-assisted automation task
For a simple scenario (pseudocode is fine if you don't have a framework set up):
1. Use AI to scaffold a test (Arrange-Act-Assert).
2. Improve the selectors to stable ones and explain why.
3. Introduce or imagine an error; use AI to explain it and propose a fix; validate the fix.
4. Note how you'd avoid flakiness (waits, independence, data).
Mark what you accepted, changed and rejected. Save to your portfolio or submit for review.$$,
  $$Where did your judgement most improve the AI's automation output?$$,
  $$## Module 9 Knowledge Check
1. Name three automation tasks AI can speed up.
2. Why do AI-suggested selectors often need replacing?
3. When is a refactor truly complete?$$,
  array['I scaffolded a test with AI','I improved selectors and validated a fix','I planned for stability and saved the task']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 9
on conflict (module_id, lesson_number) do nothing;

-- ─────────────── MODULE 10: AI IN AGILE QA WORKFLOWS ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'AI in Refinement & Planning', '12 minute read',
  $$AI can sharpen your contribution to refinement and sprint planning — better questions, clearer criteria, faster estimates of test effort.$$,
  array['Use AI to prepare for refinement','Generate clarifying questions','Assess testability quickly'],
  $$## Before refinement
- Paste an upcoming story and ask AI for clarifying questions and testability concerns
- Bring the strongest ones to the session

## In planning
- Use AI to outline the test effort for a story
- Identify risks that affect estimates

## You decide
AI prepares you; your judgement and product knowledge drive the conversation.$$,
  $$Before refinement you ask AI "what's unclear or untestable in this story?". You bring three sharp questions to the meeting and get them answered before coding starts.$$,
  $$- Bringing AI's questions verbatim without judging relevance
- Replacing your own thinking with AI's
- Not preparing at all$$,
  $$Walking into refinement with sharp, prepared questions marks you as a high-value tester — AI helps you prepare them fast.$$,
  $$Use AI to generate clarifying questions for a sample story; choose the three you'd actually raise.$$,
  $$How does preparing with AI change your contribution to refinement?$$,
  $$AI-generated refinement questions should be: A) read out verbatim B) filtered for relevance then raised C) ignored. (Answer: B)$$,
  array['I can prepare for refinement with AI','I filter questions for relevance']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 10
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'AI for Regression & Release Planning', '12 minute read',
  $$AI helps you plan regression and release testing by suggesting impact areas and a risk-based scope.$$,
  array['Plan regression scope with AI','Use change impact to focus testing','Build a release test checklist'],
  $$## Regression planning
- "Given this change, which existing areas could be affected?"
- Use the suggestions to focus regression on impacted, high-risk areas.

## Release planning
- "Draft a release test checklist for these changes."
- Prioritise by risk and business impact.

## Verify
Confirm impact suggestions against your knowledge of the system — AI doesn't know your architecture.$$,
  $$A change touches the discount engine. AI lists potentially affected areas (cart, checkout, totals, tax). You confirm which are real and focus regression there rather than re-testing everything.$$,
  $$- Re-testing everything instead of risk/impact-based scope
- Trusting AI's impact list without system knowledge
- No prioritisation in the release checklist$$,
  $$Risk-based regression beats "run it all". AI helps you argue what to focus on and why — useful in planning and in interviews.$$,
  $$For a described change, use AI to list impact areas and turn the top ones into a focused regression checklist.$$,
  $$Why is risk/impact-based regression better than re-running everything?$$,
  $$AI's change-impact suggestions must be: A) trusted fully B) confirmed against your system knowledge C) ignored. (Answer: B)$$,
  array['I can plan regression scope with AI','I focus testing by change impact and risk']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 10
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'AI for Documentation & Communication', '12 minute read',
  $$AI helps testers write clearer test summaries, status updates and documentation — fast and professional.$$,
  array['Draft test summaries with AI','Tailor communication to the audience','Keep it accurate and concise'],
  $$## Documentation help
- "Summarise these test results for stakeholders."
- "Turn these notes into a clear test summary report."

## Audience-aware
Ask AI to pitch the same update for developers vs business stakeholders — lead with what each cares about.

## Accuracy first
Verify any numbers and claims; clarity must not come at the cost of truth.$$,
  $$You paste raw results; AI drafts a stakeholder summary leading with "all critical paths pass; two medium issues open". You check the facts and send — clear and quick.$$,
  $$- Sending AI summaries without checking the facts
- One-size-fits-all updates that ignore the audience
- Hiding the key risk under detail$$,
  $$Great testers communicate risk clearly. AI helps you phrase it well for each audience — but the judgement of what to say is yours.$$,
  $$Use AI to draft a stakeholder test summary from sample results, then verify and tailor it.$$,
  $$Why tailor the same test update differently for developers vs business stakeholders?$$,
  $$AI-drafted summaries must always be: A) sent as-is B) fact-checked before sending C) longer. (Answer: B)$$,
  array['I can draft test summaries with AI','I tailor and fact-check communication']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 10
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'AI in Retrospectives & Improvement', '10 minute read',
  $$AI can help analyse what's working in your QA process and suggest improvements to discuss in retrospectives.$$,
  array['Use AI to reflect on process','Surface improvement ideas','Keep team ownership of actions'],
  $$## Retro support
- "Given these defect trends and notes, what process improvements might help?"
- "What testing bottlenecks do these patterns suggest?"

## Use as input
Bring AI's suggestions as discussion starters; the team decides actions together.

## Continuous improvement
Track a few QA metrics over time and ask AI to spot trends worth discussing.$$,
  $$You feed sprint defect data to AI; it suggests many bugs cluster late in the sprint. You raise "test earlier in the sprint" as a retro improvement — and the team agrees an action.$$,
  $$- Presenting AI suggestions as decisions, not discussion starters
- Ignoring team ownership of improvements
- Acting on trends from too little data$$,
  $$Retros are about the team. Use AI to surface ideas, but let the team own the actions — that's what makes them stick.$$,
  $$Use AI to suggest two process improvements from sample QA data; note how you'd raise them in a retro.$$,
  $$Why should AI's retro suggestions be discussion starters rather than decisions?$$,
  $$Improvement actions from a retro should be owned by: A) AI B) the team C) no one. (Answer: B)$$,
  array['I can use AI to reflect on QA process','I keep team ownership of improvements']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 10
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Assignment & Knowledge Check', '40 minutes',
  $$Apply AI across an agile sprint workflow — preparation, regression, communication.$$,
  array['Apply AI across refinement, regression and reporting'],
  $$Bring the module together by using AI to support a sprint's worth of QA activities.$$,
  $$## Assignment: AI-assisted sprint pack
For a sample story and change:
1. Use AI to prepare clarifying questions for refinement; pick three to raise.
2. Use AI to list change-impact areas; build a focused regression checklist.
3. Use AI to draft a stakeholder test summary from sample results; verify and tailor it.
Mark what you accepted, changed and rejected. Save to your portfolio or submit for review.$$,
  $$Which agile ceremony do you think AI helps you contribute to most, and why?$$,
  $$## Module 10 Knowledge Check
1. How does AI help you prepare for refinement?
2. Why is risk/impact-based regression preferable?
3. Why must AI-drafted summaries be fact-checked?$$,
  array['I prepared refinement questions with AI','I built a focused regression checklist','I drafted and verified a stakeholder summary']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 10
on conflict (module_id, lesson_number) do nothing;
