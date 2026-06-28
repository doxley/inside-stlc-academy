-- ============================================================
-- AI for QA Testers — first-draft lessons for Module 3 (Prompt
-- Engineering for QA) and Module 4 (Requirements Analysis with AI).
-- Run AFTER lessons-schema.sql and seed-ai-qa-modules.sql.
-- ============================================================

-- ─────────────── MODULE 3: PROMPT ENGINEERING FOR QA ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Why Prompts Matter for QA', '10 minute read',
  $$The prompt is your steering wheel. Small changes in how you ask produce big changes in how useful the answer is.$$,
  array['Explain why prompt quality drives output quality','Compare a weak and strong prompt','Adopt a prompt-first mindset'],
  $$## Garbage in, garbage out
A vague prompt gets a vague, generic answer. A specific, well-structured prompt gets focused, usable output.

## What changes results
- Giving the model a role
- Supplying real context
- Stating the exact task and output format

## Mindset
Treat prompting as a skill you practise and reuse, just like test design.$$,
  $$Weak: "test this login". Strong: "As a QA analyst, here is the login story and its rules; list positive, negative and boundary scenarios as a table." The second is immediately usable.$$,
  $$- Treating the first vague prompt as good enough
- Blaming the tool for under-specified prompts
- Not reusing prompts that worked well$$,
  $$Save every prompt that produces great output. Your prompt library becomes a personal productivity asset.$$,
  $$Take a weak one-line QA prompt and rewrite it into a strong one. Compare the two answers.$$,
  $$Why is "garbage in, garbage out" especially true for AI prompting?$$,
  $$The biggest lever on AI output quality is: A) the tool brand B) the prompt C) the time of day. (Answer: B)$$,
  array['I understand why prompt quality matters','I can turn a weak prompt into a strong one']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 3
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Anatomy of a Strong QA Prompt', '15 minute read',
  $$A reliable prompt structure means you get good output consistently, not by luck.$$,
  array['Apply the role-context-task-format structure','Add constraints and examples','Specify the output you need'],
  $$## The structure
- Role: "Act as an experienced QA analyst"
- Context: the feature, rules, data, constraints
- Task: precisely what you want produced
- Format: table, Gherkin, numbered list, etc.

## Add constraints
"Focus on the payment flow", "include only negative cases", "max 10 scenarios".

## Examples (few-shot)
Show one example of the output you want; the model matches the pattern.$$,
  $$"Act as a senior QA analyst. Context: [story + rules]. Task: list test scenarios. Format: a table with Scenario | Steps | Expected. Constraints: include boundary and negative cases." — consistently strong output.$$,
  $$- Leaving out the output format
- No constraints, so output is broad and shallow
- Burying the actual task in a wall of text$$,
  $$Keep a reusable template: ROLE / CONTEXT / TASK / FORMAT / CONSTRAINTS. Fill the blanks each time and your prompts are instantly professional.$$,
  $$Write a full role-context-task-format prompt for generating test scenarios for a feature you choose.$$,
  $$Which part of the structure do you most often skip, and what does omitting it cost?$$,
  $$Few-shot prompting means: A) asking quickly B) giving an example of the desired output C) using fewer words. (Answer: B)$$,
  array['I can structure a prompt with role/context/task/format','I add constraints and examples']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 3
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Prompt Patterns for Testers', '12 minute read',
  $$A few repeatable patterns cover most QA prompting needs. Learn them and you'll rarely start from scratch.$$,
  array['Use step-by-step and persona patterns','Apply "critique and improve" prompts','Choose the right pattern for the task'],
  $$## Useful patterns
- Step-by-step: "Think through this step by step, then list test cases."
- Persona: "Test this as a first-time user / a malicious user / an accessibility user."
- Critique: "Review my test cases for gaps, duplication and ambiguity."
- Transform: "Convert these scenarios into Gherkin."

## Choosing a pattern
Match the pattern to the goal: generate, critique, transform, or explore from a viewpoint.$$,
  $$Using the persona pattern, you ask AI to test a form "as a malicious user" — it surfaces injection, overlong inputs, and bypass attempts you can then verify.$$,
  $$- Always using one generic "generate" prompt
- Not asking AI to critique your own work
- Forgetting persona prompts for security/accessibility angles$$,
  $$The "critique my work" pattern is a tester's secret weapon — use AI as a second pair of eyes on your own test cases and bug reports.$$,
  $$Apply two different patterns (e.g. persona and critique) to the same feature and compare what each surfaces.$$,
  $$Which pattern would best help you find security-style issues, and why?$$,
  $$Asking AI to review your test cases for gaps uses the ___ pattern. (Answer: critique)$$,
  array['I can use step-by-step, persona and critique patterns','I can pick the right pattern for a task']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 3
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Iterating & Refining Output', '12 minute read',
  $$The first answer is a draft. Skilled testers refine through follow-ups to reach genuinely useful output.$$,
  array['Refine output with follow-up prompts','Narrow, expand and reformat results','Know when to stop'],
  $$## Refinement moves
- Narrow: "focus only on the checkout flow"
- Expand: "add boundary and negative cases"
- Reformat: "put this in a table with priority"
- Challenge: "what did you miss?"

## Conversation, not one-shot
Treat it as a dialogue. Each follow-up sharpens the result.

## When to stop
Stop when the output is useful enough to review and finalise — perfection isn't the goal.$$,
  $$First answer: 8 generic cases. You reply "add negative cases and mark priority". Second answer: 14 prioritised cases including error paths — now worth reviewing and using.$$,
  $$- Accepting the first answer as final
- Endlessly tweaking instead of finalising and reviewing
- Forgetting to ask "what did you miss?"$$,
  $$"What did you miss?" is a brilliant one-line follow-up — it often surfaces the edge cases that matter most.$$,
  $$Take an AI answer and improve it with three follow-up prompts; note what each added.$$,
  $$How do you decide when an AI answer is "good enough" to finalise?$$,
  $$Refining AI output is best treated as: A) one perfect prompt B) a short dialogue C) impossible. (Answer: B)$$,
  array['I can refine output with follow-ups','I know when to stop and finalise']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 3
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Building a QA Prompt Library', '12 minute read',
  $$A personal prompt library makes you consistent and fast. This lesson helps you build one.$$,
  array['Organise reusable prompts','Template prompts with placeholders','Maintain and share the library'],
  $$## What to collect
Prompts for: test scenario generation, requirements review, bug-report improvement, risk analysis, exploratory charters, Gherkin conversion.

## Templating
Use placeholders: "Act as a QA analyst. Context: {requirement}. Task: {goal}. Format: {format}."

## Maintain it
- Keep what works, prune what doesn't
- Note when each prompt is best used
- This is a portfolio asset you can show employers$$,
  $$You keep a "Requirements Review" prompt. For every new story you paste it, swap the {requirement}, and get a consistent gap analysis in seconds.$$,
  $$- Re-writing prompts from scratch each time
- No notes on when to use each prompt
- Letting the library go stale$$,
  $$Your prompt library is genuinely portfolio-worthy. A curated set of QA prompts demonstrates modern, practical skill in interviews.$$,
  $$Create the first five entries of your QA prompt library, each templated with placeholders.$$,
  $$Which prompt will you reuse most, and why?$$,
  $$A templated prompt uses ___ so you can reuse it across tasks. (Answer: placeholders)$$,
  array['I started a templated QA prompt library','I noted when to use each prompt']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 3
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 6, 'Assignment & Knowledge Check', '40 minutes',
  $$Build and test a small set of reusable QA prompts — a portfolio-ready prompt pack.$$,
  array['Apply prompt structure, patterns and iteration end to end'],
  $$Bring the module together by creating and validating reusable prompts.$$,
  $$## Assignment: QA prompt pack
1. Write three templated prompts (e.g. scenario generation, requirements review, bug-report improvement) using role/context/task/format.
2. Run each on a sample feature (dummy data only).
3. Refine each with at least one follow-up; note what improved.
4. Save the final prompts with a one-line "when to use" note.
Save the pack to your portfolio or submit for review.$$,
  $$Which prompt produced the most useful output, and what made it work?$$,
  $$## Module 3 Knowledge Check
1. Name the four core parts of a strong QA prompt.
2. Give one prompt pattern and when you'd use it.
3. Why keep a prompt library?$$,
  array['I built three templated QA prompts','I refined them with follow-ups','I saved the pack to my portfolio']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 3
on conflict (module_id, lesson_number) do nothing;

-- ─────────────── MODULE 4: REQUIREMENTS ANALYSIS WITH AI ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Reviewing User Stories with AI', '12 minute read',
  $$Catching requirement problems early is the cheapest quality win there is. AI makes a thorough first-pass review fast.$$,
  array['Use AI to review a user story','Check clarity and testability','Verify AI findings yourself'],
  $$## What to ask AI
- Is this story clear and unambiguous?
- Is it testable? What's missing to make it testable?
- What questions should I raise with the product owner?

## Your role
AI drafts the critique; you confirm which points are real and relevant to your product, then raise them.

## Why early
A gap found at story stage costs almost nothing; the same gap in production costs a great deal.$$,
  $$You paste a thin story ("user can pay"). AI flags missing details: supported payment methods, failure handling, currency, limits. You raise these in refinement — defects prevented.$$,
  $$- Accepting AI's critique without judging relevance
- Reviewing only wording, not testability
- Not turning findings into actual questions for the team$$,
  $$Bring AI-assisted requirement questions to refinement. Arriving with sharp questions marks you as a high-value tester.$$,
  $$Paste a sample user story and ask AI to assess clarity and testability; list which points you'd actually raise.$$,
  $$Why is reviewing requirements the cheapest place to improve quality?$$,
  $$AI's requirement critique should be treated as: A) final B) a draft you verify and filter C) ignored. (Answer: B)$$,
  array['I can use AI to review a user story','I verify and filter AI findings']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Checking Acceptance Criteria & Gaps', '12 minute read',
  $$Acceptance criteria are your test basis. AI helps you spot what's missing before testing begins.$$,
  array['Assess acceptance criteria with AI','Identify missing criteria','Convert criteria to Given/When/Then'],
  $$## Using AI on AC
- "Are these acceptance criteria complete? What scenarios are missing?"
- "Rewrite these as Given/When/Then."
- "What negative or edge cases are not covered?"

## Watch for
- Missing error/edge handling
- Vague, unmeasurable criteria
- Hidden assumptions

## Then verify
Confirm AI's suggested gaps are genuinely in scope for your product.$$,
  $$AC covers a successful password reset. AI flags missing cases: expired link, already-used link, unknown email. You add them as new criteria — coverage improved before any testing.$$,
  $$- Assuming AC are complete because they exist
- Adding AI-suggested criteria without checking scope
- Leaving criteria unmeasurable$$,
  $$"What's missing?" applied to acceptance criteria is one of the fastest quality wins AI offers a tester.$$,
  $$Take a set of acceptance criteria and use AI to find gaps; list which gaps you'd add and why.$$,
  $$Why are acceptance criteria the right place to focus a requirements review?$$,
  $$Good acceptance criteria must be: A) long B) measurable/testable C) written by AI. (Answer: B)$$,
  array['I can assess acceptance criteria with AI','I can spot missing criteria and verify scope']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Finding Ambiguities & Edge Cases', '12 minute read',
  $$Ambiguity is where defects hide. AI is good at surfacing unclear wording and edge cases for you to evaluate.$$,
  array['Detect ambiguous requirements with AI','Generate edge cases','Prioritise what to clarify'],
  $$## Prompts that help
- "Highlight any ambiguous or vague terms in this requirement."
- "List edge cases this requirement doesn't address."
- "What could be interpreted in more than one way?"

## Evaluate
Not every flagged item matters — prioritise the ambiguities with real risk.

## Outcome
A short, sharp list of clarifications to take to the team.$$,
  $$AI flags "the system should respond quickly" as ambiguous (how quickly?). You turn it into a measurable question for the PO: "what's the acceptable response time?"$$,
  $$- Treating every flagged ambiguity as equally important
- Generating endless edge cases without prioritising
- Not converting ambiguities into concrete questions$$,
  $$Words like "fast", "easy", "appropriate", "handle gracefully" are ambiguity red flags — AI spots them quickly, you turn them into measurable criteria.$$,
  $$Use AI to find ambiguities and edge cases in a requirement; pick the top three worth clarifying.$$,
  $$Why is ambiguity in requirements so closely linked to defects?$$,
  $$"The system should be fast" is a problem because it is: A) too short B) ambiguous/unmeasurable C) negative. (Answer: B)$$,
  array['I can detect ambiguity with AI','I prioritise edge cases by risk']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Risk Identification with AI', '12 minute read',
  $$Risk-based testing focuses effort where it matters. AI helps brainstorm risks; you assess and prioritise them.$$,
  array['Brainstorm risks with AI','Assess likelihood and impact','Turn risks into a test focus'],
  $$## Brainstorming risks
- "What could go wrong with this feature?"
- "List risks across functional, security, performance and data."

## Assessing
Rate each risk by likelihood and impact — a human judgement using product context.

## Applying
Test the highest risks deepest; note lower risks as lighter coverage. This is risk-based testing, accelerated by AI.$$,
  $$For a checkout feature AI lists 15 risks. You rate them, find the top three (payment failure, double-charge, tax error) and plan deep testing there — focused, defensible coverage.$$,
  $$- Treating an AI risk list as a finished risk assessment
- Not rating likelihood and impact yourself
- Spreading effort evenly instead of by risk$$,
  $$A risk list plus your likelihood/impact ratings makes a powerful, professional test plan — and a strong portfolio piece.$$,
  $$Use AI to brainstorm risks for a feature, then rate the top five by likelihood and impact.$$,
  $$Why must the likelihood/impact rating stay a human decision?$$,
  $$Risk-based testing means you test most deeply where: A) it's easiest B) risk is highest C) AI says so. (Answer: B)$$,
  array['I can brainstorm risks with AI','I rate and prioritise risks myself']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Assignment & Knowledge Check', '40 minutes',
  $$Produce an AI-assisted requirements review — a portfolio-ready artefact.$$,
  array['Apply AI to review requirements, find gaps and assess risk'],
  $$Bring the module together by reviewing a real requirement with AI and adding your judgement.$$,
  $$## Assignment: Requirements review pack
For a user story (dummy data only):
1. Use AI to assess clarity and testability; list the questions you'd raise.
2. Use AI to find missing acceptance criteria; add the valid ones as Given/When/Then.
3. Use AI to find ambiguities and edge cases; pick the top three.
4. Use AI to brainstorm risks; rate the top five by likelihood and impact.
Mark clearly what you accepted, changed, or rejected from the AI output. Save to your portfolio or submit for review.$$,
  $$Where did your judgement most change or improve the AI's analysis?$$,
  $$## Module 4 Knowledge Check
1. Why review requirements with AI before testing?
2. What makes acceptance criteria testable?
3. Why must risk rating remain a human decision?$$,
  array['I reviewed a requirement with AI','I found gaps, ambiguities and risks','I documented my judgement and saved the pack']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 4
on conflict (module_id, lesson_number) do nothing;
