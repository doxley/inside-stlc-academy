-- ============================================================
-- AI for QA Testers — first-draft lessons for Module 11 (AI Risks,
-- Ethics and Governance) and Module 12 (Building Your AI QA Workflow).
-- Completes the AI for QA course. Run AFTER lessons-schema.sql and
-- seed-ai-qa-modules.sql.
-- ============================================================

-- ─────────────── MODULE 11: AI RISKS, ETHICS & GOVERNANCE ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Data Privacy & Confidentiality', '12 minute read',
  $$The biggest practical risk of AI in QA is leaking data. This lesson keeps you and your employer safe.$$,
  array['Identify sensitive data','Avoid leaking data to AI tools','Apply anonymisation'],
  $$## What counts as sensitive
- Personal data (names, emails, addresses)
- Credentials and secrets/keys
- Proprietary code and internal documents
- Customer or production data

## Safe habits
- Never paste sensitive data into public AI tools
- Anonymise or use synthetic/dummy data
- Prefer approved/enterprise tools for real work

## The simple test
"Would I be comfortable if this prompt were made public?" If not, don't send it.$$,
  $$Before asking AI to analyse a defect, you replace the real customer email and order id with dummy values — same help, zero data exposure.$$,
  $$- Pasting production data "just this once"
- Sharing internal code with public tools
- Assuming AI inputs are private$$,
  $$Treat anything you paste into a public AI tool as potentially public. That single mindset prevents most AI data incidents.$$,
  $$Write your personal rules for what you will and won't paste into an AI tool, with examples of each.$$,
  $$What is the simplest test for whether data is safe to send to a public AI tool?$$,
  $$Which is safe to paste into a public AI tool? A) a customer's email B) synthetic dummy data C) an API secret. (Answer: B)$$,
  array['I can identify sensitive data','I anonymise or avoid sending it to AI tools']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 11
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Hallucinations, Bias & Reliability', '12 minute read',
  $$AI output can be wrong, biased, or inconsistent. Knowing this keeps your testing trustworthy.$$,
  array['Explain hallucination and bias','Recognise unreliable output','Build verification habits'],
  $$## The risks
- Hallucination: confident but false output
- Bias: AI reflects patterns (and biases) in its training data
- Inconsistency: same prompt, different answers

## Why it matters for QA
Acting on wrong AI output can create false confidence — the opposite of good testing.

## Verification habits
- Check specifics against the real source
- Be sceptical of confident claims you can't confirm
- Don't let AI output become unchecked "truth"$$,
  $$AI confidently states an API field exists; you verify against the spec and find it doesn't. Trusting it would have produced a useless, misleading test.$$,
  $$- Treating fluent output as accurate
- Ignoring possible bias in AI-suggested scenarios
- Assuming consistency across runs$$,
  $$The more important the decision, the more you verify. AI raises speed; your verification preserves trust.$$,
  $$Find one AI answer you can fact-check and verify it; note any inaccuracy or bias you spot.$$,
  $$Why can acting on unverified AI output be worse than not using AI at all?$$,
  $$Confident but false AI output is a: A) bias B) hallucination C) feature. (Answer: B)$$,
  array['I can explain hallucination and bias','I verify AI output before relying on it']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 11
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Review Controls & Accountability', '12 minute read',
  $$AI assists; humans remain accountable. This lesson covers the controls that keep AI-assisted QA professional.$$,
  array['Apply human-in-the-loop review','Define accountability','Use AI output as draft, not decision'],
  $$## Human-in-the-loop
Every AI output that affects testing should be reviewed by a person before it's used or shared.

## Accountability
You own the work you produce with AI. "The AI said so" is never an acceptable explanation for a missed defect.

## Controls
- Review and verify before use
- Keep a record of what was AI-assisted where it matters
- Treat AI as a draft tool, not a decision-maker$$,
  $$A tester uses AI to draft test cases but reviews and signs off each one. When a defect is found later, the process is defensible: a human reviewed and owned the tests.$$,
  $$- Shipping AI output without human review
- Blaming AI for quality misses
- No record of where AI was relied upon$$,
  $$"Human-in-the-loop" is the phrase that signals maturity. Say it in interviews: AI drafts, humans review and own.$$,
  $$Describe the review control you would put around AI-generated test cases before they're used.$$,
  $$Why is "the AI said so" never an acceptable explanation for a QA miss?$$,
  $$Human-in-the-loop means: A) AI decides B) a person reviews/owns AI output C) no AI is used. (Answer: B)$$,
  array['I apply human-in-the-loop review','I accept accountability for AI-assisted work']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 11
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Policy, Governance & Professional Responsibility', '12 minute read',
  $$Using AI at work means following policy and acting professionally. This lesson sets the governance basics.$$,
  array['Follow organisational AI policy','Understand basic governance','Act as a responsible professional'],
  $$## Policy first
- Know your organisation's AI policy before using tools on real work
- Use approved tools for sensitive tasks
- Respect confidentiality, IP and licensing

## Governance basics
Organisations increasingly define where AI may be used, what data is allowed, and what review is required. Work within those rules.

## Professional responsibility
- Be transparent about AI assistance where it matters
- Keep developing your own skills
- Use AI to raise quality, not cut corners$$,
  $$Before adopting a new AI tool for testing, you check the company policy, confirm it's approved for your data, and document its use — professional and safe.$$,
  $$- Using unapproved tools on real/sensitive work
- Ignoring IP/licensing of AI-generated content
- Treating policy as optional$$,
  $$Knowing and following AI policy is now a professional expectation. Demonstrating it sets you apart as trustworthy.$$,
  $$Draft a short personal "responsible AI in QA" policy you could follow in any workplace.$$,
  $$Why should you check organisational policy before using an AI tool on real work?$$,
  $$Before using a new AI tool at work you should first: A) just start B) check the AI policy/approval C) tell no one. (Answer: B)$$,
  array['I follow organisational AI policy','I act with professional responsibility']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 11
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Assignment & Knowledge Check', '35 minutes',
  $$Produce a responsible-AI policy and risk checklist for your own QA practice.$$,
  array['Apply privacy, verification, accountability and governance'],
  $$Bring the module together into a practical responsible-use artefact.$$,
  $$## Assignment: Responsible AI in QA pack
1. Write a one-page "responsible AI use" policy for your QA work (data rules, verification, accountability, approved tools).
2. Create a short risk checklist you'll run before using AI on a task.
3. Give two examples of prompts you would NOT send, and how you'd rework them safely.
Save it to your portfolio or submit for review.$$,
  $$Which AI risk do you think is most often underestimated by testers, and why?$$,
  $$## Module 11 Knowledge Check
1. What is the simple test for whether data is safe to send to AI?
2. What does human-in-the-loop mean?
3. Why check organisational AI policy first?$$,
  array['I wrote a responsible-AI policy','I created a pre-use risk checklist','I saved the pack to my portfolio']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 11
on conflict (module_id, lesson_number) do nothing;

-- ─────────────── MODULE 12: BUILDING YOUR AI QA WORKFLOW ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Designing Your AI QA Workflow', '12 minute read',
  $$Pull everything together into a repeatable personal workflow for using AI across your testing.$$,
  array['Map AI into your QA process','Decide where AI adds most value','Keep verification built in'],
  $$## Map the lifecycle
For each stage, decide where AI helps and where you stay hands-on:
- Requirements review
- Test design and data
- Exploratory ideas
- Defect reporting
- Regression and reporting

## Build verification in
For every AI step, define how you verify the output. The workflow is "AI drafts, you verify" repeated.

## Make it yours
A good workflow fits how you actually work and the tools you're allowed to use.$$,
  $$You decide: AI drafts requirement questions and test cases (you verify), you explore hands-on, AI tidies bug reports (you confirm facts), AI drafts the stakeholder summary (you fact-check). A clear, repeatable loop.$$,
  $$- A workflow with no verification steps
- Forcing AI into stages where it adds little
- Copying someone else's workflow without adapting it$$,
  $$A documented personal AI QA workflow is a standout portfolio piece — it shows you use AI deliberately and responsibly.$$,
  $$Sketch your AI QA workflow across the lifecycle, noting where AI helps and how you verify each step.$$,
  $$Which stage of your workflow will AI change the most, and how will you keep it safe?$$,
  $$A good AI QA workflow always includes: A) only AI steps B) a verification step for each AI output C) no humans. (Answer: B)$$,
  array['I mapped AI across my QA process','I built verification into each step']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 12
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Your AI QA Toolkit', '12 minute read',
  $$Assemble the prompts, templates and habits that make your workflow fast and consistent.$$,
  array['Assemble a reusable prompt library','Collect templates and checklists','Keep the toolkit maintained'],
  $$## What goes in the toolkit
- Your prompt library (from Module 3)
- Templates: test cases, bug reports, charters, summaries
- Checklists: AI review, responsible-use, pre-use risk
- A note of approved tools and their best uses

## Keep it living
Prune what doesn't work; add what does. Review it every few weeks.

## Portability
A good toolkit travels with you between projects and jobs.$$,
  $$You keep a single document: templated prompts, a test-case template, a bug-report template, and your review checklist. New task? You reach for the toolkit and move fast.$$,
  $$- Re-creating the same prompts/templates each time
- Letting the toolkit go stale
- No checklist to keep AI use safe$$,
  $$Your toolkit is portable career capital. It makes you faster on day one of any new role — and demonstrates how you work.$$,
  $$Assemble the first version of your AI QA toolkit (prompts, templates, checklists) in one place.$$,
  $$What's the first item you'd add to your toolkit, and why?$$,
  $$A useful AI QA toolkit should be: A) memorised B) a living, maintained collection C) one prompt. (Answer: B)$$,
  array['I assembled a reusable AI QA toolkit','I will maintain and prune it over time']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 12
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Measuring the Value of AI in Your QA', '10 minute read',
  $$Know whether AI is actually helping. This lesson covers simple, honest ways to judge its value.$$,
  array['Judge whether AI is helping','Avoid false productivity','Adjust your workflow over time'],
  $$## Honest measures
- Time saved on drafting (without losing quality)
- Coverage or ideas you might have missed
- Quality of your reports and communication

## Beware false productivity
Faster output that needs heavy rework, or that you can't verify, isn't real value.

## Iterate
Keep what genuinely helps; drop what slows you down or adds risk.$$,
  $$You notice AI-drafted test cases save real time on simple features but add little on complex, context-heavy ones. You adjust: use AI for the routine, go manual for the nuanced.$$,
  $$- Assuming "faster" always means "better"
- Counting output volume instead of value
- Never reviewing whether a tool earns its place$$,
  $$Value, not novelty, is the test. If an AI step doesn't save time or improve quality after a fair trial, drop it.$$,
  $$Pick one AI step in your workflow and define how you'll judge whether it's truly adding value.$$,
  $$How would you tell the difference between real and false AI productivity?$$,
  $$Real AI value means: A) more output B) time saved or quality gained without heavy rework C) using more tools. (Answer: B)$$,
  array['I can judge whether AI is genuinely helping','I will iterate my workflow based on value']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 12
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Final Project: Your AI QA Pack', '90 minutes',
  $$Complete the course by producing a full AI-assisted QA pack for a sample product — your flagship portfolio piece.$$,
  array['Combine every skill from the course into one portfolio pack'],
  $$This final project brings the whole course together. Choose a sample product or feature (dummy data only) and produce a complete, AI-assisted QA pack — reviewing and owning every AI output.$$,
  $$## Final Project: AI QA Portfolio Pack
Produce, for a sample product/feature:
1. Requirement review (gaps, ambiguities, risks) — AI-assisted, your judgement.
2. Risk analysis with likelihood/impact ratings.
3. Test scenarios and a reviewed test-case set.
4. An exploratory charter.
5. An improved defect report example.
6. A focused regression plan.
7. Your personal AI QA workflow and toolkit (prompts, templates, checklists).
For each artefact, note where AI helped and how you verified it. Publish it (GitHub/doc) and add it to your portfolio, or submit for review. Completing the course activities earns your Inside STLC Academy Certificate of Completion.$$,
  $$Looking at the whole pack, where did AI add the most value — and where did your judgement matter most?$$,
  $$## Module 12 Knowledge Check
1. What does every step of a safe AI QA workflow include?
2. Name three items in your AI QA toolkit.
3. How do you tell real AI value from false productivity?$$,
  array['I produced a complete AI QA portfolio pack','I documented AI use and verification for each artefact','I published it / saved it to my portfolio']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 12
on conflict (module_id, lesson_number) do nothing;
