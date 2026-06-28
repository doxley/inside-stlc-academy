-- ============================================================
-- 90-Day Roadmap — first-draft lessons for Module 8 (Automation
-- Fundamentals) and Module 9 (AI for Software Testing).
-- Draft content for review/refinement. Run AFTER lessons-schema.sql.
-- ============================================================

-- ─────────────── MODULE 8: AUTOMATION FUNDAMENTALS ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'What to Automate (and What Not To)', '12 minute read',
  $$Automation is powerful but not free. This lesson teaches you to choose the right candidates so your effort pays off.$$,
  array['Identify good automation candidates','Recognise tests better left manual','Explain the cost of maintaining automation'],
  $$## Good candidates
- Repetitive, stable, high-value paths (login, checkout)
- Regression tests run every release
- Data-driven checks with many input combinations

## Poor candidates
- One-off or rarely run tests
- Highly visual/UX judgement
- Features still changing rapidly

## The hidden cost
Automated tests are code — they must be maintained. Automating the wrong things creates flaky, costly suites.$$,
  $$A team automates the login and checkout regression (run every release) but keeps exploratory and visual checks manual — high return, low maintenance.$$,
  $$- Trying to automate 100% of tests
- Automating an unstable feature and fighting flakiness
- Ignoring maintenance cost when justifying automation$$,
  $$"What would you automate first?" is a common interview question. Answer with stable, high-value, frequently-run paths — and explain why.$$,
  $$Take ten test cases from an app you know and label each Automate / Keep Manual, with a one-line reason.$$,
  $$Why can automating the wrong tests cost more than manual testing?$$,
  $$Which is the best automation candidate? A) a one-off check B) the checkout regression run every release C) a visual design review. (Answer: B)$$,
  array['I can identify good automation candidates','I understand automation has a maintenance cost']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'The Automation Pyramid', '12 minute read',
  $$The test automation pyramid guides where to invest so suites stay fast and reliable.$$,
  array['Describe the layers of the pyramid','Explain why more tests live at the bottom','Spot an "ice-cream cone" anti-pattern'],
  $$## The layers
- Unit (base): many, fast, cheap — by developers
- Integration/API (middle): fewer, check components together
- UI/E2E (top): few, slow, brittle — only key journeys

## Why this shape
Lower layers are faster and more stable. Pushing checks down makes the whole suite quicker and less flaky.

## The anti-pattern
An "ice-cream cone" (mostly UI tests) is slow and flaky — the opposite of what you want.$$,
  $$Instead of testing every validation rule through the UI, the team tests them at the API layer (fast) and keeps just a few UI tests for the critical end-to-end journey.$$,
  $$- Putting most tests at the UI layer
- Ignoring API tests, the most cost-effective layer for QA
- Believing more UI tests means better quality$$,
  $$As a tester, the API layer is often your highest-leverage place to automate — fast, stable, and within reach without deep front-end code.$$,
  $$Sketch the pyramid and place five example tests from an app at the right layer.$$,
  $$Why are UI end-to-end tests kept few even though they feel the most "real"?$$,
  $$The pyramid says most tests should be at the: A) UI layer B) unit layer C) manual layer. (Answer: B)$$,
  array['I can describe the automation pyramid','I can spot the ice-cream-cone anti-pattern']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Anatomy of an Automated Test', '15 minute read',
  $$Most automated tests share the same shape. Learn it once and you can read tests in any framework.$$,
  array['Describe the Arrange-Act-Assert pattern','Explain setup and teardown','Read a simple automated test'],
  $$## Arrange, Act, Assert
- Arrange: set up the state and data
- Act: perform the action under test
- Assert: check the outcome matches expectations

## Setup and teardown
- Setup runs before tests (e.g. open browser, seed data)
- Teardown cleans up after (e.g. delete test data)

## Independence
Each test should stand alone — never depend on another test running first.$$,
  $$A login test: Arrange (a registered user), Act (submit valid credentials), Assert (dashboard is shown). Teardown logs out. Clear and repeatable.$$,
  $$- Tests that depend on the order they run in
- No cleanup, leaving data that breaks the next run
- One test asserting ten unrelated things$$,
  $$Even if you don't write automation yet, recognising Arrange-Act-Assert lets you read and review automated tests confidently — a real interview edge.$$,
  $$Write the Arrange / Act / Assert steps (in plain English) for an automated "add item to basket" test.$$,
  $$Why must automated tests be independent of each other?$$,
  $$In AAA, where do you check the result? (Answer: Assert)$$,
  array['I understand Arrange-Act-Assert','I know why tests must be independent']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Selectors & Locators', '15 minute read',
  $$Automated UI tests must find elements reliably. Good locators are the difference between a stable suite and a flaky one.$$,
  array['Describe common locator strategies','Choose stable selectors','Avoid brittle locators'],
  $$## Common strategies
- By test id (e.g. data-testid) — most stable
- By role/label/text — accessible and readable
- By CSS selector — flexible
- By XPath — powerful but often brittle

## Priorities
- Prefer stable, intention-revealing locators (test ids, roles)
- Avoid long, position-based XPaths that break on any layout change

## Collaboration
Ask developers to add data-testid attributes — it makes automation far more reliable.$$,
  $$A button found by data-testid="checkout-submit" keeps working after a redesign; the same button found by /div[3]/div/button[2] breaks the moment the layout shifts.$$,
  $$- Relying on auto-generated class names or deep XPaths
- Locators tied to text that changes with translation
- Not asking developers for test ids$$,
  $$"How do you make UI tests less flaky?" — answer: stable locators (test ids/roles) and proper waits. It signals real automation maturity.$$,
  $$For three elements on a page, write the most stable locator you can for each and note why.$$,
  $$Why is a data-testid usually more reliable than a positional XPath?$$,
  $$Which locator is typically the most brittle? (Answer: a long positional XPath)$$,
  array['I can choose stable locators','I can explain why brittle locators cause flakiness']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Assertions & Waits', '12 minute read',
  $$Assertions decide pass/fail; waits keep tests stable on real, asynchronous apps. Get both right and flakiness drops dramatically.$$,
  array['Write meaningful assertions','Use waits correctly','Avoid fixed sleeps'],
  $$## Assertions
Check the specific, observable outcome — not just "no error". Assert the value, text, or state you expect.

## Waits
Modern apps are asynchronous. Wait for a condition (element visible, response received), not a fixed time.

## Avoid sleeps
Hard sleeps (wait 5 seconds) make tests slow and still flaky. Prefer explicit/auto waits for a condition.$$,
  $$Instead of "sleep 3s then click", wait for the button to be visible and enabled, then click — the test is both faster and more reliable.$$,
  $$- Using fixed sleeps to "fix" timing issues
- Asserting only that the page loaded, not the actual result
- Over-asserting unrelated details that change often$$,
  $$Flaky tests destroy trust in automation. Stable locators + condition-based waits + precise assertions are the cure — say this in interviews.$$,
  $$Rewrite a flaky step "sleep 5s, then check text" as a condition-based wait plus a precise assertion (in plain English).$$,
  $$Why are condition-based waits better than fixed sleeps?$$,
  $$A good assertion checks: A) that no error appeared B) the specific expected value/state C) the page title only. (Answer: B)$$,
  array['I can write a meaningful assertion','I use condition-based waits, not sleeps']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 6, 'Assignment & Knowledge Check', '40 minutes',
  $$Plan a small automation suite — a practical artefact even before you write framework code.$$,
  array['Apply automation selection, structure and stability principles'],
  $$Bring the module together by planning what and how you'd automate for a feature.$$,
  $$## Assignment: Automation plan
For a feature of your choice:
1. List five candidate tests and mark which you'd automate and at which layer (unit/API/UI).
2. For two UI tests, write the Arrange-Act-Assert steps in plain English.
3. Note the stable locators you'd request from developers.
4. Describe how you'd avoid flakiness (waits, independence, data setup).
Save it to your portfolio or submit for review.$$,
  $$Which single decision in your plan most reduces future maintenance, and why?$$,
  $$## Module 8 Knowledge Check
1. Name two good and two poor automation candidates.
2. Why should most tests sit at the lower layers of the pyramid?
3. Why are fixed sleeps a bad way to handle timing?$$,
  array['I chose automation candidates by layer','I planned for stable, non-flaky tests','I saved the plan to my portfolio']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;

-- ─────────────── MODULE 9: AI FOR SOFTWARE TESTING ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'How AI Helps Testers', '12 minute read',
  $$AI tools can speed up many QA tasks — when used with judgement. This lesson sets realistic expectations.$$,
  array['List QA tasks AI can accelerate','Explain where human judgement is essential','Set realistic expectations for AI'],
  $$## Where AI helps
- Drafting test cases and scenarios
- Improving bug reports and summaries
- Analysing requirements for gaps and risks
- Explaining unfamiliar code or errors

## Where humans stay in charge
- Deciding what matters and what risk is acceptable
- Verifying AI output (it can be confidently wrong)
- Context only you know about the product and users

## Mindset
AI is an assistant that drafts; you remain the reviewer and decision-maker.$$,
  $$You paste a user story and ask AI for edge cases. It suggests 12; you recognise 9 as genuinely useful, discard 3 as irrelevant, and add 2 it missed from product knowledge.$$,
  $$- Trusting AI output without verifying it
- Pasting confidential or production data into public tools
- Expecting AI to replace testing judgement$$,
  $$The best testers use AI to go faster on the first draft, then apply their own expertise — that combination is what employers now want.$$,
  $$Pick a QA task you do regularly and write how AI could speed up the first draft — and what you'd still check yourself.$$,
  $$Which parts of testing should always remain a human decision, and why?$$,
  $$AI output should always be: A) trusted as-is B) verified by the tester C) ignored. (Answer: B)$$,
  array['I can list QA tasks AI accelerates','I know where human judgement is essential']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 9
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Writing Effective QA Prompts', '15 minute read',
  $$The quality of AI output depends on the prompt. This lesson gives you a reliable structure.$$,
  array['Structure a clear QA prompt','Provide role, context and format','Iterate to improve output'],
  $$## A reliable prompt structure
- Role: "Act as an experienced QA analyst"
- Context: the feature, rules, and constraints
- Task: exactly what you want (e.g. "list edge cases")
- Format: how to return it (table, Gherkin, list)

## Iterate
Treat the first answer as a draft. Refine: "add negative cases", "focus on payments", "make it a table".

## Be specific
Vague prompts give vague output. Specific context gives useful output.$$,
  $$"Act as a senior QA analyst. Here is a login story and its rules. List functional and negative test scenarios as a table with columns Scenario, Steps, Expected." — far better than "test this login".$$,
  $$- One-line vague prompts with no context
- Accepting the first answer without refining
- Not specifying the output format you need$$,
  $$Keep a personal prompt library of your best QA prompts. Reusable prompts make you consistent and fast — and are a portfolio asset.$$,
  $$Write a structured prompt (role, context, task, format) to generate test scenarios for a feature you choose.$$,
  $$Why does giving the AI a role and output format improve results?$$,
  $$A good QA prompt includes role, context, task and: A) nothing else B) the desired output format C) your password. (Answer: B)$$,
  array['I can structure a clear QA prompt','I iterate to improve AI output']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 9
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Generating & Improving Test Cases', '15 minute read',
  $$AI can draft test cases quickly. Your job is to direct it, review critically, and add what it misses.$$,
  array['Generate test cases from requirements','Critically review AI-generated tests','Improve coverage with follow-up prompts'],
  $$## A workflow
- Give the AI the requirement and ask for test cases in your format
- Review: are they correct, relevant, and non-duplicated?
- Prompt for gaps: "add boundary and negative cases", "cover mobile"
- Finalise with your own judgement

## Review checklist
- Do the expected results make sense?
- Are edge cases and error paths covered?
- Did it invent rules that don't exist? (hallucination)$$,
  $$You ask for test cases for a password reset. The AI omits the "expired link" case; you spot the gap from your boundary-value knowledge and add it.$$,
  $$- Shipping AI test cases without reviewing expected results
- Accepting hallucinated rules as real requirements
- Losing your own coverage techniques because "AI did it"$$,
  $$AI plus your Module 2 techniques (EP, BVA, decision tables) is a powerful combination — use the techniques to judge what the AI produced.$$,
  $$Generate test cases for a feature with AI, then list two things you corrected or added from your own knowledge.$$,
  $$How do your manual test-design techniques help you review AI-generated tests?$$,
  $$When AI invents a requirement that doesn't exist, that's called a: A) feature B) hallucination C) regression. (Answer: B)$$,
  array['I can generate test cases with AI','I can critically review and improve them']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 9
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'AI for Bug Reports & Analysis', '12 minute read',
  $$AI can sharpen your defect reports and help analyse patterns — useful, with care over sensitive data.$$,
  array['Use AI to improve a bug report','Summarise and group defects','Protect sensitive information'],
  $$## Improving bug reports
Paste rough notes and ask AI to structure them into a clear report (title, steps, expected/actual). Then verify accuracy.

## Analysis
- Summarise a long thread into a crisp defect
- Group similar defects to spot patterns
- Draft a root-cause hypothesis to investigate (then confirm)

## Caution
Never paste secrets, customer data, or proprietary code into public AI tools.$$,
  $$You paste messy reproduction notes; the AI returns a tidy report. You check every step is accurate, fix one detail, and log it — minutes saved, quality kept.$$,
  $$- Pasting real customer data or credentials into public tools
- Logging an AI-tidied report without verifying the facts
- Treating an AI root-cause guess as confirmed$$,
  $$Use AI to improve clarity, never to invent facts. A polished but inaccurate bug report wastes more time than a rough accurate one.$$,
  $$Take a messy bug note, improve it with AI, then verify and correct it. Record what you changed.$$,
  $$What must you never paste into a public AI tool, and why?$$,
  $$An AI-suggested root cause should be treated as: A) confirmed B) a hypothesis to verify C) irrelevant. (Answer: B)$$,
  array['I can use AI to improve a bug report','I protect sensitive data from public tools']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 9
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Using AI Safely & Responsibly', '12 minute read',
  $$AI in QA brings real risks — data privacy, hallucinations, and over-reliance. This lesson keeps you professional and safe.$$,
  array['Identify AI risks in QA','Apply data-protection good practice','Keep accountability with the human'],
  $$## Key risks
- Confidentiality: data you paste may be stored or used
- Hallucination: confident but wrong answers
- Bias and gaps: AI reflects its training, not your context
- Over-reliance: skills atrophy if you stop thinking

## Good practice
- Use approved tools and follow your company policy
- Anonymise or avoid sensitive data
- Always review and own the output — you are accountable

## Professionalism
AI assists; the tester remains responsible for quality.$$,
  $$Before using a new AI tool at work, you check the company policy and confirm it's approved for the data you'll use — avoiding a serious data-handling mistake.$$,
  $$- Assuming "it's just a tool" and ignoring data policy
- Presenting AI output as verified fact
- Letting AI replace, rather than support, your judgement$$,
  $$"How do you use AI responsibly in testing?" is increasingly an interview question. Mention data privacy, verification, and human accountability.$$,
  $$Write a short personal "AI usage checklist" you would follow before using AI on real work.$$,
  $$Who is accountable for the quality of work produced with AI assistance?$$,
  $$Pasting confidential data into a public AI tool primarily risks: A) slower replies B) a data/confidentiality breach C) better answers. (Answer: B)$$,
  array['I can identify the main AI risks in QA','I have a responsible-use checklist']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 9
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 6, 'Assignment & Knowledge Check', '40 minutes',
  $$Produce an AI-assisted QA artefact and reflect on what you kept, changed, and rejected.$$,
  array['Apply AI to a real QA task with proper review'],
  $$Bring the module together by using AI on a real task and documenting your judgement.$$,
  $$## Assignment: AI-assisted QA task
1. Choose a requirement or feature.
2. Use AI (with a structured prompt) to draft test scenarios OR improve a bug report.
3. Review the output: mark what you kept, what you corrected, and what you rejected and why.
4. Write three lines on how you kept the work safe and accurate.
Save your prompt, the output, and your review notes to your portfolio.$$,
  $$Where did your own QA judgement add the most value on top of the AI draft?$$,
  $$## Module 9 Knowledge Check
1. Name two QA tasks AI can speed up.
2. What are the four parts of a strong QA prompt?
3. Give two risks of using AI in testing and how you mitigate each.$$,
  array['I used AI on a real QA task with a structured prompt','I reviewed and corrected the output','I documented safe, accurate use']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 9
on conflict (module_id, lesson_number) do nothing;
