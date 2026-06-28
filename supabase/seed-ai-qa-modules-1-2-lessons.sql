-- ============================================================
-- AI for QA Testers — first-draft lessons for Module 1 (The AI Shift
-- in QA) and Module 2 (AI Fundamentals for Testers).
-- Run AFTER lessons-schema.sql and seed-ai-qa-modules.sql.
-- ============================================================

-- ─────────────── MODULE 1: THE AI SHIFT IN QA ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Why AI Matters in QA', '12 minute read',
  $$AI is changing how testers work — faster drafting, broader idea generation, quicker analysis. This lesson frames the shift realistically.$$,
  array['Explain how AI is changing QA','Separate hype from real value','Set expectations for this course'],
  $$## What is changing
- Drafting test cases, scenarios and data faster
- Analysing requirements and defects for patterns
- Explaining unfamiliar code, errors, or logs

## What is not changing
- The need for testing judgement and risk thinking
- Accountability for quality remains human
- Context about your product and users

## The opportunity
Testers who use AI well do the routine faster and spend more time on high-value thinking.$$,
  $$A tester used to spend an hour drafting test cases for a story. With AI they draft in ten minutes, then spend the rest reviewing, adding edge cases, and assessing risk — better coverage, same hour.$$,
  $$- Believing AI replaces testers (it augments them)
- Believing AI is useless hype (it genuinely speeds real tasks)
- Using AI output without review$$,
  $$Frame AI as a productivity multiplier for testers, not a replacement. That balanced view is exactly what employers want to hear.$$,
  $$List three QA tasks you do that AI could help with, and one where human judgement is essential.$$,
  $$Where do you think AI adds the most value in testing, and where the least?$$,
  $$AI in QA is best described as: A) a replacement for testers B) a productivity multiplier C) irrelevant. (Answer: B)$$,
  array['I understand how AI is changing QA','I can separate hype from real value']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 1
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'What AI Can and Cannot Do', '12 minute read',
  $$Knowing AI's strengths and limits is the foundation of using it well. This lesson draws the line clearly.$$,
  array['List AI strengths for QA','List AI limitations','Decide when to rely on AI vs yourself'],
  $$## Strengths
- Generating lots of ideas quickly
- Restructuring and summarising text
- Spotting patterns across information
- Explaining concepts and code

## Limitations
- It can be confidently wrong (hallucination)
- It lacks your product/user context
- It cannot own a quality decision
- It may reflect bias in its training

## The rule
Use AI for drafts and ideas; rely on yourself for judgement and verification.$$,
  $$Asked to "summarise these 30 bug comments into one report", AI does it well. Asked "is this safe to release?", it can only offer an opinion — the decision stays with the tester.$$,
  $$- Treating AI opinions as facts
- Asking AI to make risk/quality decisions
- Ignoring that it has no access to your real context$$,
  $$When AI gives an answer, ask "how would I verify this?". If you can't, be cautious about using it.$$,
  $$Make a two-column list: tasks you'd confidently let AI draft, and tasks you'd never delegate to it.$$,
  $$Why is "confidently wrong" a particularly dangerous AI trait for testers?$$,
  $$Which should never be delegated to AI? A) drafting ideas B) summarising text C) owning a release decision. (Answer: C)$$,
  array['I can list AI strengths and limits','I know when to rely on AI vs myself']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 1
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Why Human Judgement Still Matters', '10 minute read',
  $$AI raises the floor on speed, but raises the value of judgement. This lesson explains why testers matter more, not less.$$,
  array['Explain the tester''s irreplaceable role','Describe risk-based judgement','Position yourself alongside AI'],
  $$## What only you bring
- Understanding of real users and business risk
- The questions AI doesn't know to ask
- Accountability and professional ethics

## Risk-based judgement
Deciding what matters most, what to test deeply, and what is acceptable risk — these are human calls informed by context.

## Your position
The valuable tester is not "person vs AI" but "person directing AI" — curating, verifying, deciding.$$,
  $$AI lists 20 test ideas. The tester knows the payment flow is the business's lifeline, so prioritises those deeply and de-prioritises a rarely used admin screen — judgement AI can't make alone.$$,
  $$- Outsourcing judgement to AI to save effort
- Losing your own skills by over-relying on tools
- Forgetting you are accountable for the outcome$$,
  $$Say in interviews: "AI handles the routine so I can focus on risk and judgement." It positions you as modern and senior-minded.$$,
  $$Write down three judgement calls in your testing that you would never hand to AI.$$,
  $$Why might AI make a tester's judgement more valuable, not less?$$,
  $$Risk-based judgement is primarily: A) an AI task B) a human task informed by context C) automated. (Answer: B)$$,
  array['I can explain the tester''s irreplaceable role','I understand risk-based judgement']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 1
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Assignment & Knowledge Check', '30 minutes',
  $$Reflect on where AI fits in your testing and set your goals for the course.$$,
  array['Assess where AI fits your QA work'],
  $$Set the foundation for the rest of the course with a personal AI-in-QA assessment.$$,
  $$## Assignment: Your AI-in-QA map
1. List five QA tasks you do regularly.
2. For each, note: could AI draft it, assist it, or should it stay fully human?
3. Write three goals for what you want to be able to do by the end of this course.
4. Note one risk you want to stay mindful of when using AI.
Save it to your portfolio or submit for review.$$,
  $$Which task do you most want AI to speed up, and what would you do with the time saved?$$,
  $$## Module 1 Knowledge Check
1. Give two things AI does well for QA and two it cannot do.
2. What is a hallucination?
3. Why does human judgement matter more in an AI-assisted workflow?$$,
  array['I mapped AI to my QA tasks','I set goals for the course','I noted a key risk to watch']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 1
on conflict (module_id, lesson_number) do nothing;

-- ─────────────── MODULE 2: AI FUNDAMENTALS FOR TESTERS ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'How Large Language Models Work (Simply)', '12 minute read',
  $$You don't need to be a data scientist, but a simple mental model of LLMs makes you far better at using them.$$,
  array['Explain what an LLM is in plain terms','Describe how it predicts text','Understand why output varies'],
  $$## A simple model
An LLM (like ChatGPT or Claude) predicts the most likely next words based on patterns learned from huge amounts of text. It is not looking anything up or "knowing" facts.

## Why output varies
- It's probabilistic — the same prompt can give different answers
- It has no memory of you beyond the current conversation (unless given context)

## Why this matters for QA
Because it predicts plausible text, it can produce confident, well-written, wrong answers — which is exactly why testers must verify.$$,
  $$Ask the same "list test cases" prompt twice and you may get slightly different lists. That variability is normal — it's predicting, not retrieving a fixed answer.$$,
  $$- Believing the model "knows" facts like a database
- Expecting identical output every time
- Trusting fluent text as if fluency means accuracy$$,
  $$"It predicts plausible text" is the single most useful thing to remember — it explains both the power and the risk of these tools.$$,
  $$Ask an AI tool the same QA question twice and note any differences in the answers.$$,
  $$Why does understanding "next-word prediction" make you more cautious and more effective?$$,
  $$An LLM primarily: A) looks up facts in a database B) predicts likely next words C) runs your tests. (Answer: B)$$,
  array['I have a simple mental model of an LLM','I understand why output varies and can mislead']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 2
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Prompts, Context & Tokens', '12 minute read',
  $$The prompt and the context you provide shape everything. This lesson explains the building blocks.$$,
  array['Define prompt and context','Explain the context window','Provide context effectively'],
  $$## Key terms
- Prompt: your instruction/question
- Context: extra information you supply (a story, rules, examples)
- Context window: the limited amount of text the model can consider at once
- Token: a chunk of text (roughly a word-part) — both input and output use tokens

## Why context wins
The same prompt with good context (the actual requirement, rules, format) gives dramatically better output than a vague one-liner.$$,
  $$"Write test cases" gives generic output. "Here is the login story and its 5 rules; write test cases as a table covering valid, invalid and boundary inputs" gives targeted, useful output.$$,
  $$- Giving no context and expecting tailored output
- Pasting so much that key details get lost
- Forgetting the model only sees what's in the conversation$$,
  $$When output is weak, add context before blaming the tool. 80% of "bad AI answers" are really under-specified prompts.$$,
  $$Take a vague prompt and rewrite it with proper context (requirement + rules + desired format).$$,
  $$Why does providing context usually matter more than clever wording?$$,
  $$The "context window" is: A) the screen size B) the limit of text the model can consider C) your browser. (Answer: B)$$,
  array['I can define prompt, context and token','I provide context to improve output']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 2
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Hallucinations & Limitations', '12 minute read',
  $$Hallucinations are the biggest risk for testers using AI. This lesson teaches you to spot and manage them.$$,
  array['Define hallucination','Recognise likely hallucinations','Apply verification habits'],
  $$## What a hallucination is
Confident output that is plausible but false — invented facts, rules, functions, or results.

## Where they show up in QA
- Inventing requirements that don't exist
- Citing non-existent functions or API fields
- Producing test data that looks valid but isn't

## Managing them
- Verify against the real source (spec, app, docs)
- Be sceptical of specifics you can't confirm
- Ask the model to show its reasoning, then check it$$,
  $$AI confidently says an API returns a "discountCode" field. You check the real API — there's no such field. Trusting it would have produced a useless test.$$,
  $$- Treating confident answers as verified
- Skipping verification because the text "looks right"
- Letting hallucinated rules into your test basis$$,
  $$Hallucinations are most dangerous when they're plausible. The more important the detail, the more you verify it.$$,
  $$Ask AI something about a system only you know well and identify any inaccuracies in its answer.$$,
  $$What's your personal rule for deciding when an AI answer must be verified?$$,
  $$A confident but false AI answer is called a: A) bug B) hallucination C) regression. (Answer: B)$$,
  array['I can define and spot hallucinations','I have a verification habit']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 2
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Responsible & Secure AI Use', '12 minute read',
  $$Using AI professionally means protecting data and following policy. This lesson sets the ground rules.$$,
  array['Apply data-protection basics','Follow tool and company policy','Keep accountability with you'],
  $$## Protect data
- Never paste secrets, credentials, or customer/personal data into public tools
- Anonymise examples; use dummy data
- Prefer approved/enterprise tools for work

## Follow policy
- Know your organisation's AI policy before using tools on real work
- Respect confidentiality and IP

## Stay accountable
You own anything you produce with AI — review it as if you wrote it.$$,
  $$Before pasting a real defect into a public chatbot, you replace the customer's email and order id with dummy values — same help, no data exposure.$$,
  $$- Pasting production data or secrets into public AI
- Assuming "it's just a tool" overrides company policy
- Presenting AI output as verified without review$$,
  $$A simple habit — "would I be comfortable if this prompt were public?" — prevents most AI data mistakes.$$,
  $$Write a 5-point personal "responsible AI use" checklist you'll follow on real work.$$,
  $$What is the simplest test for whether something is safe to paste into a public AI tool?$$,
  $$You should never paste into a public AI tool: A) dummy data B) confidential/customer data C) a generic question. (Answer: B)$$,
  array['I follow data-protection basics','I have a responsible-use checklist']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 2
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Assignment & Knowledge Check', '30 minutes',
  $$Demonstrate the fundamentals: context, verification, and safe use.$$,
  array['Apply prompt/context, verification and safe-use fundamentals'],
  $$Put the fundamentals into practice on a small, safe task.$$,
  $$## Assignment: Fundamentals in practice
1. Take a simple requirement (use dummy data only).
2. Write a prompt with proper context and a desired output format.
3. Run it, then verify the output — note anything inaccurate or hallucinated.
4. Write two lines on how you kept the task safe (no sensitive data).
Save the prompt, output and your verification notes to your portfolio.$$,
  $$What surprised you most about the AI's output when you verified it?$$,
  $$## Module 2 Knowledge Check
1. In one sentence, how does an LLM produce text?
2. What is a context window?
3. Give one data-protection rule you'll always follow.$$,
  array['I wrote a context-rich prompt','I verified the output','I followed safe-use rules']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 2
on conflict (module_id, lesson_number) do nothing;
