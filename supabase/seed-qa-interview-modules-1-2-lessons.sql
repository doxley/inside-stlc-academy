-- ============================================================
-- QA Interview Accelerator — first-draft lessons for Module 1
-- (Understanding the QA Interview Process) and Module 2 (Your QA
-- Career Story). Run AFTER lessons-schema.sql and
-- seed-qa-interview-modules.sql.
-- ============================================================

-- ─────────────── MODULE 1: UNDERSTANDING THE QA INTERVIEW PROCESS ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'How QA Interviews Are Structured', '12 minute read',
  $$Knowing the typical shape of a QA hiring process removes surprises and lets you prepare for each stage deliberately.$$,
  array['Describe the typical QA interview stages','Explain the purpose of each stage','Prepare differently per stage'],
  $$## Typical stages
- Recruiter / screening call: motivation, basics, logistics
- Technical interview: QA concepts and scenarios
- Practical task: a test exercise or take-home
- Final / culture interview: collaboration and fit

## Why stages exist
Each filters for something different — knowledge, thinking, and team fit. Preparing one generic answer set is a mistake.

## Prepare per stage
Match your prep to the stage you're in next.$$,
  $$Before a screening call you prepare a crisp "why QA / why this company"; before the technical round you revise concepts and scenarios — targeted prep, not cramming everything at once.$$,
  $$- Treating every stage identically
- Over-preparing concepts but neglecting the practical task
- Not researching the company at all$$,
  $$Ask the recruiter what each stage involves. Most will happily tell you — and it lets you prepare precisely.$$,
  $$Write out the likely stages for a QA role you'd target and one prep action for each.$$,
  $$Why does preparation need to differ across interview stages?$$,
  $$Which stage usually assesses QA concepts and scenarios? (Answer: the technical interview)$$,
  array['I understand the QA interview stages','I have a prep action for each stage']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 1
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'What Employers Are Really Assessing', '12 minute read',
  $$Behind every question is something the employer is trying to learn about you. Understanding this lets you answer what they actually care about.$$,
  array['Identify what employers assess','Answer the intent behind questions','Demonstrate mindset, not just knowledge'],
  $$## What they're really checking
- Fundamentals: do you understand testing?
- Thinking: can you reason through real situations?
- Communication: can you explain clearly?
- Mindset: curiosity, care, ownership
- Fit: will you work well with the team?

## Answer the intent
"How would you test X?" isn't about a perfect list — it's about how you think and structure your approach.$$,
  $$Asked "how would you test a login?", a strong candidate calmly structures the answer (valid, invalid, boundary, security, usability), showing mindset and method — exactly what's being assessed.$$,
  $$- Reciting definitions without showing thinking
- Ignoring communication and collaboration signals
- Forgetting that attitude/mindset is being judged too$$,
  $$Employers hire for mindset and communication as much as knowledge. Show curiosity and structure, not just facts.$$,
  $$For three common questions, write what you think the employer is really trying to assess.$$,
  $$Why is how you think often more important than a "correct" answer?$$,
  $$"How would you test X?" mainly assesses your: A) memory B) structured thinking/approach C) typing. (Answer: B)$$,
  array['I understand what employers assess','I answer the intent behind questions']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 1
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'How to Prepare Effectively', '12 minute read',
  $$Good preparation is targeted, not endless. This lesson gives you a practical preparation plan.$$,
  array['Build a focused prep plan','Research the company and role','Prepare questions to ask'],
  $$## A focused plan
- Revise core QA concepts (use this course's other modules)
- Prepare 3–4 STAR stories you can adapt
- Research the company, product and role
- Prepare 2–3 thoughtful questions to ask them

## Practise aloud
Saying answers out loud beats re-reading notes. Mock interviews (even with a friend or mirror) build fluency.

## Logistics
Test your tech for remote interviews; arrive calm and early.$$,
  $$You research the company's product, try it, and prepare a question about their testing approach. In the interview you reference the product directly — instantly memorable.$$,
  $$- Cramming everything instead of focusing
- Only reading, never practising aloud
- Having no questions to ask$$,
  $$Trying the company's product before the interview is a small effort that consistently impresses — few candidates do it.$$,
  $$Build a one-page prep plan for a target role: concepts to revise, stories to prepare, company research, and questions to ask.$$,
  $$Why does practising answers aloud beat re-reading notes?$$,
  $$A strong candidate always prepares: A) nothing B) thoughtful questions to ask the employer C) only salary demands. (Answer: B)$$,
  array['I have a focused prep plan','I prepared questions to ask the employer']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 1
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Assignment & Knowledge Check', '30 minutes',
  $$Create your interview preparation plan and start your question bank.$$,
  array['Build a personal interview prep plan'],
  $$Set yourself up for the rest of the course with a concrete plan.$$,
  $$## Assignment: Interview prep plan
1. Map the likely stages for a real target role and a prep action for each.
2. List five common QA questions you expect and what each really assesses.
3. Research a target company: product, role, and one insight you'd reference.
4. Write three thoughtful questions you'd ask them.
Save it to your portfolio or submit for review — you'll build on it throughout the course.$$,
  $$Which interview stage do you feel least confident about, and how will you prepare for it?$$,
  $$## Module 1 Knowledge Check
1. Name the typical QA interview stages.
2. Give three things employers assess beyond knowledge.
3. Why prepare questions to ask the employer?$$,
  array['I mapped the interview stages and prep','I researched a target company','I prepared questions to ask']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 1
on conflict (module_id, lesson_number) do nothing;

-- ─────────────── MODULE 2: YOUR QA CAREER STORY ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Answering "Tell Me About Yourself"', '12 minute read',
  $$This is usually the first question and it sets the tone. A clear, confident answer earns early momentum.$$,
  array['Structure a strong self-introduction','Keep it relevant and concise','Land on why QA / why now'],
  $$## A simple structure
- Present: who you are professionally now
- Past: relevant experience or your route into QA
- Future: why QA, why this role

## Keep it tight
Aim for 60–90 seconds. It's a headline, not your life story.

## Make it relevant
Emphasise what matters for the role — testing mindset, relevant skills, genuine motivation.$$,
  $$"I'm a detail-focused tester who moved into QA from customer support, where I spent years spotting and documenting product issues. I've since built test cases, bug reports and an API testing project, and I'm looking to grow as a QA analyst — which is why this role appeals to me."$$,
  $$- Rambling through your whole history
- Listing duties with no relevance to QA
- Forgetting to say why you want this role$$,
  $$Write and rehearse this answer until it's natural. A confident opening calms your nerves and sets a strong tone.$$,
  $$Draft your 60–90 second "tell me about yourself" using present-past-future.$$,
  $$What's the one impression you want this answer to leave?$$,
  $$A strong self-intro is roughly: A) 5 minutes B) 60–90 seconds C) one word. (Answer: B)$$,
  array['I have a structured self-introduction','It lands on why QA and why this role']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 2
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Positioning Your Experience', '12 minute read',
  $$However you got here, you can frame your experience as relevant. This lesson helps you position it with confidence.$$,
  array['Frame experience for QA relevance','Lead with strengths','Turn projects into evidence'],
  $$## Lead with relevance
Pick the parts of your background that map to QA: attention to detail, process, investigation, communication, any testing or technical work.

## Use evidence
Reference concrete things: test cases you wrote, a bug you found, a project you completed in this course.

## Confidence, not apology
Don't apologise for your route in. Frame it as a strength: a fresh perspective, transferable skills, proven learning.$$,
  $$A former teacher positions their experience as "explaining complex things clearly, spotting mistakes, and following structured processes" — all directly relevant to QA.$$,
  $$- Apologising for limited QA job history
- Listing irrelevant detail
- No concrete evidence to back claims$$,
  $$Your course portfolio is your evidence. "I can show you the test cases I built" turns a claim into proof.$$,
  $$Write three sentences positioning your background for QA, each backed by concrete evidence.$$,
  $$Which part of your experience is most relevant to QA, and how will you frame it?$$,
  $$The best way to back a claim about your skills is: A) repeat it louder B) show concrete evidence C) avoid it. (Answer: B)$$,
  array['I can position my experience for QA relevance','I back claims with concrete evidence']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 2
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Career Changers & Transferable Skills', '12 minute read',
  $$Changing careers into QA is common and credible. This lesson turns "no QA experience" into a compelling narrative.$$,
  array['Identify transferable skills','Address the career change confidently','Show commitment and learning'],
  $$## Transferable strengths
- Attention to detail and accuracy
- Following and improving processes
- Investigation and problem-solving
- Communication and stakeholder management
- Domain knowledge from your previous field

## Address the change head-on
Briefly explain why QA, then pivot to evidence of your commitment (this course, your portfolio, self-study).

## Show momentum
Demonstrate you're already doing the work, not just intending to.$$,
  $$"I moved into QA because I love finding and preventing problems. I've completed a structured QA course, built a portfolio of test cases and bug reports, and I'm applying these skills daily" — confident and evidence-backed.$$,
  $$- Being defensive or apologetic about the change
- Only stating intent without evidence of action
- Hiding your previous domain expertise instead of using it$$,
  $$Career changers often bring valuable domain knowledge (finance, healthcare, retail). Position it as an asset for testing in that sector.$$,
  $$List five transferable skills from your background and a QA situation each applies to.$$,
  $$How will you turn your career change into a strength rather than a weakness?$$,
  $$For a career changer, the strongest evidence of commitment is: A) saying you're keen B) a portfolio and completed learning C) a long CV. (Answer: B)$$,
  array['I identified my transferable skills','I can address my career change confidently']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 2
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Assignment & Knowledge Check', '30 minutes',
  $$Craft and rehearse your QA career story — a reusable interview asset.$$,
  array['Produce a polished QA career story'],
  $$Bring the module together into a confident, evidence-backed story you can reuse in any interview.$$,
  $$## Assignment: Your QA career story
1. Write your 60–90 second "tell me about yourself" (present-past-future).
2. Write three positioning statements, each backed by concrete evidence.
3. If you're a career changer, write how you'll address the change as a strength.
4. List five transferable skills with a QA application for each.
Rehearse it aloud, then save it to your portfolio or submit for review.$$,
  $$After rehearsing, what part of your story feels strongest, and what still needs work?$$,
  $$## Module 2 Knowledge Check
1. What three parts structure a strong self-introduction?
2. How do you back a claim about your skills?
3. Name three transferable skills relevant to QA.$$,
  array['I wrote and rehearsed my career story','I prepared evidence-backed positioning','I listed my transferable skills']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 2
on conflict (module_id, lesson_number) do nothing;
