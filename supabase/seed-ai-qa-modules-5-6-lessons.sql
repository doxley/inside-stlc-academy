-- ============================================================
-- AI for QA Testers — first-draft lessons for Module 5 (AI-Assisted
-- Test Case Design) and Module 6 (Exploratory Testing with AI).
-- Run AFTER lessons-schema.sql and seed-ai-qa-modules.sql.
-- ============================================================

-- ─────────────── MODULE 5: AI-ASSISTED TEST CASE DESIGN ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Generating Test Cases with AI', '15 minute read',
  $$AI can produce a first draft of test cases in seconds. Your skill is in directing it and judging the result.$$,
  array['Generate test cases from a requirement','Specify format and coverage','Combine AI with test-design techniques'],
  $$## A reliable approach
- Provide the requirement and rules as context
- Ask for cases in a clear format (table: Title | Steps | Expected | Priority)
- Request coverage: valid, invalid, boundary, edge

## Pair with techniques
Direct the AI using equivalence partitioning and boundary value analysis — "include boundary cases for the 8–20 character password".

## You stay in charge
AI drafts; you verify correctness and add what it misses.$$,
  $$For a registration form you prompt: "Generate test cases as a table covering valid, invalid and boundary inputs for email, password (8–20) and age (18+)." AI returns a solid first draft you then refine.$$,
  $$- Accepting generated cases without checking expected results
- Not specifying coverage, so only happy paths appear
- Dropping your own techniques because "AI did it"$$,
  $$AI + your Module-2 techniques is the winning combo. The techniques tell you what good coverage looks like so you can judge the AI's output.$$,
  $$Generate test cases for a feature with AI, then check them against equivalence partitioning and boundary analysis — note any gaps.$$,
  $$How do test-design techniques help you direct and judge AI-generated cases?$$,
  $$To get strong coverage from AI you should: A) ask vaguely B) specify valid/invalid/boundary coverage C) accept the first list. (Answer: B)$$,
  array['I can generate test cases with AI','I direct and judge them with test-design techniques']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Improving & Prioritising Test Cases', '12 minute read',
  $$Generation is the start. AI also helps you tighten, deduplicate and prioritise a test set.$$,
  array['Refine and deduplicate test cases','Prioritise by risk','Tighten steps and expected results'],
  $$## Refinement prompts
- "Remove duplicates and merge overlapping cases."
- "Prioritise these by risk (High/Medium/Low) and explain why."
- "Make each expected result specific and verifiable."

## Prioritisation
Use AI's suggested priorities as input, then adjust with your product knowledge.

## Outcome
A lean, prioritised, well-written set — better than a long, redundant one.$$,
  $$AI returns 25 cases with overlaps. You prompt "deduplicate and prioritise by risk"; it returns 16 prioritised cases. You bump the payment cases to High based on business impact.$$,
  $$- Keeping every generated case regardless of value
- Accepting AI's priorities without your context
- Leaving vague expected results in place$$,
  $$A smaller, prioritised, sharp set beats a huge unfocused one. Use AI to trim, not just to add.$$,
  $$Take a generated set and use AI to deduplicate and prioritise it; adjust two priorities using your own judgement.$$,
  $$Why is trimming and prioritising as valuable as generating?$$,
  $$AI-suggested priorities should be: A) final B) input you adjust with context C) ignored. (Answer: B)$$,
  array['I can refine and deduplicate test cases','I prioritise by risk with my own judgement']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Reviewing AI-Generated Tests', '12 minute read',
  $$The review step is where your professionalism shows. This lesson gives you a checklist to catch AI errors.$$,
  array['Apply a review checklist to AI output','Spot hallucinated rules','Confirm expected results are correct'],
  $$## Review checklist
- Are the expected results correct and specific?
- Did it invent rules that don't exist? (hallucination)
- Are edge/negative cases actually covered?
- Any duplicates or irrelevant cases?
- Is the data realistic and valid?

## Mindset
Review AI output as if a junior tester wrote it — helpful, but needs checking.$$,
  $$A generated case asserts the app shows a "loyalty points" message — but no such feature exists. You catch the hallucination during review and remove it.$$,
  $$- Trusting fluent output as accurate
- Skipping the "did it invent anything?" check
- Not validating the test data$$,
  $$Your review is the value-add. Anyone can generate cases; a professional catches the wrong and missing ones.$$,
  $$Review an AI-generated set against the checklist and record at least two issues you found and fixed.$$,
  $$Which checklist item do you think catches the most dangerous AI errors, and why?$$,
  $$Reviewing AI tests as if written by a junior means you: A) trust them B) verify them helpfully C) discard them. (Answer: B)$$,
  array['I apply a review checklist to AI output','I can spot hallucinated rules and bad data']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Test Data Generation with AI', '12 minute read',
  $$Good test data makes or breaks testing. AI quickly generates varied, realistic (dummy) data — with care over privacy.$$,
  array['Generate varied test data with AI','Cover valid, invalid and edge data','Keep data safe and synthetic'],
  $$## What AI is good at
- Lists of names, emails, addresses (synthetic)
- Boundary and invalid values
- Varied combinations for data-driven tests

## Keep it synthetic
Never use real customer data. Ask for clearly fake data ("use example.com emails, no real people").

## Coverage
Prompt for valid, invalid, boundary and unusual data (unicode, very long strings, empty).$$,
  $$"Generate 10 rows of synthetic users: name, email (@example.com), age including boundary values 17/18/65/66, and two invalid emails." — instant data-driven test inputs.$$,
  $$- Using real or production-like personal data
- Only generating valid data, never invalid/edge
- Not checking the data actually fits the field rules$$,
  $$Ask explicitly for synthetic, example.com data. It keeps you safe and the data obviously fake.$$,
  $$Generate a small synthetic data set including valid, invalid and boundary values for a feature.$$,
  $$Why must test data generated by AI be synthetic, and how do you ensure it?$$,
  $$For safe AI test data you should request: A) real customer records B) synthetic example.com data C) production exports. (Answer: B)$$,
  array['I can generate varied synthetic test data','I cover valid, invalid and edge data safely']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Assignment & Knowledge Check', '40 minutes',
  $$Produce an AI-assisted test case pack with data — portfolio-ready.$$,
  array['Apply AI generation, refinement, review and data end to end'],
  $$Bring the module together by building a reviewed, prioritised test pack with AI.$$,
  $$## Assignment: AI-assisted test pack
For a feature (dummy data only):
1. Generate test cases with AI in a clear table format.
2. Refine: deduplicate and prioritise by risk.
3. Review against the checklist; fix issues and note them.
4. Generate a small synthetic data set (valid/invalid/boundary).
Mark what you kept, changed and rejected. Save to your portfolio or submit for review.$$,
  $$Where did your review add the most value to the AI's output?$$,
  $$## Module 5 Knowledge Check
1. How do test-design techniques help you direct AI?
2. Name three items on your AI test-review checklist.
3. Why must AI-generated test data be synthetic?$$,
  array['I generated and refined test cases with AI','I reviewed them against a checklist','I produced safe synthetic data and saved the pack']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 5
on conflict (module_id, lesson_number) do nothing;

-- ─────────────── MODULE 6: EXPLORATORY TESTING WITH AI ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Exploratory Testing Refresher', '10 minute read',
  $$Exploratory testing is simultaneous learning, design and execution. AI can fuel your ideas without replacing the human curiosity at its heart.$$,
  array['Define exploratory testing','Explain when it shines','See where AI fits'],
  $$## What it is
Exploratory testing combines learning the product, designing tests, and running them at the same time — guided by curiosity and risk.

## When it shines
- New or poorly documented features
- Finding the unexpected that scripted tests miss
- Quick risk assessment under time pressure

## Where AI helps
AI brainstorms charters, personas and scenario ideas; you do the actual exploring and thinking.$$,
  $$Faced with a new feature and little documentation, you ask AI for exploration ideas and personas, then spend your session investigating the riskiest areas hands-on.$$,
  $$- Thinking exploratory testing is "random clicking"
- Letting AI replace your curiosity and observation
- Not time-boxing or focusing the session$$,
  $$Exploratory testing is structured curiosity. AI gives you starting points; your observation and follow-up questions find the bugs.$$,
  $$Describe a feature you'd explore and three areas your curiosity would push you to investigate.$$,
  $$Why can't AI replace the human core of exploratory testing?$$,
  $$Exploratory testing combines learning, design and: A) documentation B) execution C) deployment. (Answer: B)$$,
  array['I can define exploratory testing','I understand where AI assists it']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'AI-Generated Charters & Personas', '12 minute read',
  $$A charter focuses an exploratory session; personas give you different viewpoints. AI drafts both quickly.$$,
  array['Write an exploratory charter','Use AI to generate personas','Focus a session with a charter'],
  $$## Charters
A charter is a short mission: "Explore [area] to discover [information] using [approach]." It keeps a session focused.

## Personas
Different users behave differently. AI can generate personas (new user, power user, careless user, malicious user, accessibility user) to test from varied angles.

## Using them
Pick a charter, choose a persona, time-box the session, and take notes.$$,
  $$Charter: "Explore the checkout to discover failure-handling issues, using invalid and interrupted payments." Persona: "impatient mobile user on poor signal." Together they shape a sharp, productive session.$$,
  $$- Vague charters that don't focus the session
- Using only the "normal user" persona
- Not time-boxing the exploration$$,
  $$A charter plus a persona transforms "have a look around" into a targeted, repeatable session — and the notes become a portfolio artefact.$$,
  $$Use AI to draft three charters and three personas for a feature; pick one pairing to run.$$,
  $$How does pairing a charter with a persona improve an exploratory session?$$,
  $$A charter mainly provides: A) a full test script B) a focused mission for the session C) a deployment plan. (Answer: B)$$,
  array['I can write an exploratory charter','I can generate and use personas with AI']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Scenario & Mind-Map Brainstorming', '12 minute read',
  $$AI is excellent at divergent brainstorming — generating many scenario ideas you can then explore and prune.$$,
  array['Brainstorm scenarios with AI','Organise ideas into a mind map','Select what to explore'],
  $$## Divergent then convergent
- Divergent: ask AI for many "what if" scenarios and angles
- Convergent: you select the most valuable, risk-relevant ones

## Mind-mapping
Group AI's ideas into themes (inputs, states, errors, environments, users). A simple outline works as a text mind map.

## Output
A focused shortlist of scenarios to explore in your session.$$,
  $$You ask AI for 20 "what could go wrong" scenarios for a file upload. You group them (file types, sizes, interruptions, permissions) and pick the riskiest five to explore.$$,
  $$- Exploring every AI idea instead of selecting
- No structure, so ideas overwhelm rather than guide
- Skipping the convergent (prune) step$$,
  $$Use AI to go wide, then use your judgement to go deep. Breadth from AI, depth from you.$$,
  $$Brainstorm scenarios for a feature with AI, group them into themes, and choose five to explore.$$,
  $$Why is the "convergent" pruning step as important as the brainstorm?$$,
  $$AI is most useful for the ___ part of brainstorming. (Answer: divergent / idea generation)$$,
  array['I can brainstorm scenarios with AI','I can organise and select ideas to explore']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Risk-Based Exploratory Ideas', '12 minute read',
  $$Focusing exploration on the riskiest areas finds the bugs that matter. AI helps surface risks; you direct the session.$$,
  array['Tie exploration to risk','Prioritise high-risk areas','Capture findings usefully'],
  $$## Risk-led exploration
- Ask AI: "What are the riskiest areas of this feature to explore?"
- Rate them yourself by likelihood and impact
- Spend most of your session on the top risks

## Capturing findings
Note: what you tried, what you observed, any bugs, and new questions. Good notes make sessions reportable and repeatable.

## Balance
Cover the highest risks deeply; sample the rest lightly.$$,
  $$AI flags payment interruption as high risk. You spend most of your session simulating dropped connections mid-payment and find a double-charge bug — exactly where the risk pointed.$$,
  $$- Exploring low-risk areas because they're easy
- Not recording what you tried and found
- Ignoring new questions the session raises$$,
  $$Session notes tied to risk are gold in a stand-up or report: "I focused on the highest-risk area and here's what I found."$$,
  $$Use AI to list risks for a feature, rate them, and outline a risk-focused exploratory session with note headings.$$,
  $$Why does tying exploration to risk make it more valuable?$$,
  $$In risk-based exploration you spend most time on: A) the easiest areas B) the highest-risk areas C) documentation. (Answer: B)$$,
  array['I can tie exploration to risk','I capture findings in useful notes']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Assignment & Knowledge Check', '40 minutes',
  $$Plan and document an AI-assisted exploratory session — portfolio-ready.$$,
  array['Apply charters, personas, brainstorming and risk to exploration'],
  $$Bring the module together by planning, running (or simulating) and documenting an exploratory session.$$,
  $$## Assignment: Exploratory session pack
For a feature of your choice:
1. Use AI to draft a charter and pick a persona.
2. Brainstorm scenarios with AI and group them; select five to explore.
3. Rate the risks and choose where to focus.
4. Run (or simulate) the session and write session notes: what you tried, observed, bugs found, and new questions.
Save the charter, scenarios and notes to your portfolio or submit for review.$$,
  $$What did exploring (or planning to explore) reveal that scripted test cases might have missed?$$,
  $$## Module 6 Knowledge Check
1. What three activities happen at once in exploratory testing?
2. What is a charter and why use one?
3. Why focus exploration on risk?$$,
  array['I planned an AI-assisted exploratory session','I focused it on risk','I documented findings and saved the pack']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;
