-- ============================================================
-- QA Interview Accelerator — first-draft lessons for Module 7 (CV,
-- LinkedIn and Job Applications) and Module 8 (Final Interview
-- Readiness Pack). Completes the course. Run AFTER lessons-schema.sql
-- and seed-qa-interview-modules.sql.
-- ============================================================

-- ─────────────── MODULE 7: CV, LINKEDIN & JOB APPLICATIONS ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Writing a QA CV That Gets Read', '12 minute read',
  $$Recruiters skim CVs in seconds and software filters them first. This lesson makes yours pass both.$$,
  array['Structure a clear QA CV','Pass keyword screening','Lead with relevant strengths'],
  $$## Structure that works
- Name + headline ("QA Tester | Manual & API Testing")
- Short professional summary (3–4 lines)
- Key skills (scannable)
- Experience / projects (impact-focused)
- Education and certificates

## Be findable (ATS)
Mirror the advert's language for skills you genuinely have (test cases, regression, Jira, API).

## Tight and clean
One to two pages, simple formatting, no clutter.$$,
  $$A career changer leads with a strong summary and a "Projects" section featuring this course's portfolio work — turning limited job history into demonstrable skill.$$,
  $$- A generic CV sent to every role
- Burying QA skills below unrelated history
- Fancy layouts that break ATS parsing$$,
  $$Mirror the advert's keywords — only for skills you truly have. Relevance plus honesty wins interviews you can succeed in.$$,
  $$Draft or revise your CV summary and key-skills section for a target QA role.$$,
  $$How can you present course projects to offset limited job history?$$,
  $$Why mirror keywords from the advert? (Answer: to pass ATS/recruiter screening for relevant skills)$$,
  array['I have a clear, scannable CV structure','My CV honestly reflects relevant QA keywords']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Optimising Your LinkedIn Profile', '12 minute read',
  $$Recruiters search LinkedIn for testers. An optimised profile brings opportunities to you.$$,
  array['Write a strong headline and About','Use searchable keywords','Feature your portfolio'],
  $$## Key areas
- Headline: role + specialisms (not just "open to work")
- About: a concise story of your QA focus and value
- Skills: add the QA skills recruiters filter on
- Featured: link your portfolio and best work

## Be findable
Include terms recruiters search ("QA Tester", "test automation", "API testing") where they genuinely apply.

## Consistency
Your LinkedIn and CV should tell the same story.$$,
  $$Changing a headline from "Seeking opportunities" to "QA Tester | Manual, API & Automation" measurably increases recruiter searches that surface the profile.$$,
  $$- A blank or one-line About section
- Headline that only says "open to work"
- No portfolio link in Featured$$,
  $$Add your portfolio to the Featured section. A recruiter clicking straight through to real work is a strong first impression.$$,
  $$Rewrite your LinkedIn headline and draft a four-line About section.$$,
  $$Which keywords will you add to your profile, and why those?$$,
  $$A strong LinkedIn headline includes: A) "open to work" only B) role + specialisms C) hobbies. (Answer: B)$$,
  array['I optimised my headline and About','I added skills and a portfolio link']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Tailoring Applications & Tracking', '12 minute read',
  $$A few tailored applications beat many generic ones. This lesson makes tailoring fast and organised.$$,
  array['Tailor a CV to a role','Write a focused cover note','Track applications'],
  $$## Tailoring fast
- Read the advert; note the top 3–5 requirements
- Make your CV summary and skills reflect them (honestly)
- Reference a relevant portfolio piece

## Cover note
A short, specific note ("I built an API test collection — it's in my portfolio") beats a template.

## Track
Keep a simple tracker: role, company, date, status, follow-up. It prevents missed opportunities.$$,
  $$For an "API testing" role you move your Postman project to the top of your CV and mention it in the cover note — instantly more relevant than a generic submission.$$,
  $$- Mass-applying with identical materials
- Ignoring the advert's stated priorities
- No tracking, so follow-ups slip$$,
  $$Five tailored applications usually beat fifty generic ones for interview rate. Quality over quantity.$$,
  $$Pick a real advert, list its top five requirements, and tailor your CV summary plus a four-line cover note.$$,
  $$Why does tailoring a few applications outperform mass-applying?$$,
  $$The best first step in tailoring is to: A) apply faster B) identify the advert's top requirements C) add pages. (Answer: B)$$,
  array['I can tailor a CV and cover note to a role','I keep an application tracker']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Assignment & Knowledge Check', '40 minutes',
  $$Produce job-ready application materials, tailored to a real role.$$,
  array['Apply CV, LinkedIn and tailoring skills end to end'],
  $$Bring the module together into application-ready materials.$$,
  $$## Assignment: Application pack
1. Write or revise your one-to-two page QA CV (summary, skills, projects with impact bullets).
2. Update your LinkedIn headline and About section.
3. Pick a real advert and tailor your CV summary to it, plus a four-line cover note.
4. Start an application tracker (role, company, date, status).
Save the pack to your portfolio or submit for review.$$,
  $$Which change will make the biggest difference to your interview rate, and why?$$,
  $$## Module 7 Knowledge Check
1. What makes a CV bullet impact-focused?
2. Why mirror advert keywords?
3. Name two elements of a strong LinkedIn profile.$$,
  array['I produced a tailored CV','I optimised LinkedIn','I started an application tracker']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;

-- ─────────────── MODULE 8: FINAL INTERVIEW READINESS PACK ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Building Your Answer & STAR Bank', '12 minute read',
  $$Pull your prepared answers into one rehearsed bank so you walk in calm and ready.$$,
  array['Consolidate your answer bank','Prepare reusable STAR stories','Rehearse for fluency'],
  $$## Your answer bank
Collect the model answers from earlier modules: core concepts, agile/team, scenarios. Keep them concise and example-backed.

## STAR stories
Prepare 3–4 flexible stories (a tough defect, a deadline, a disagreement, a success) you can adapt to many questions.

## Rehearse
Practise aloud until natural — not memorised word-for-word, but fluent and confident.$$,
  $$You keep one document: concept answers, agile answers, scenario answers, and four STAR stories. Before any interview you rehearse the relevant ones — calm and ready.$$,
  $$- Preparing answers but never rehearsing aloud
- Memorising word-for-word so it sounds robotic
- Having no adaptable STAR stories$$,
  $$Four strong STAR stories can answer most behavioural questions. Prepare them once and reuse them everywhere.$$,
  $$Assemble your answer bank and write or refine four STAR stories; rehearse two aloud.$$,
  $$Which STAR story is your strongest, and which questions could it answer?$$,
  $$STAR stands for Situation, Task, Action and: A) Answer B) Result C) Analysis. (Answer: B)$$,
  array['I consolidated my answer bank','I have four rehearsed STAR stories']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Questions to Ask Employers', '10 minute read',
  $$The questions you ask show genuine interest and help you assess them. Always have a few ready.$$,
  array['Prepare thoughtful questions','Assess the role and team','Avoid weak questions'],
  $$## Good questions
- How is the QA team structured and how does testing fit the workflow?
- What does success look like in this role in the first six months?
- What testing tools and processes do you use?
- How does the team handle quality and releases?

## Why it matters
It signals interest and helps you decide if the role suits you.

## Avoid
Questions easily answered on their website, or only about salary/holiday up front.$$,
  $$Asked "any questions for us?", you ask about the team's release process and what success looks like early — showing genuine engagement and helping you assess fit.$$,
  $$- Having no questions ("nope, all good")
- Only asking about pay/perks first
- Asking things already on their website$$,
  $$Prepare more questions than you'll need — some get answered during the interview, and you'll still have one ready.$$,
  $$Write five questions you'd ask an employer, covering team, role success, and quality process.$$,
  $$What does asking thoughtful questions signal to an employer?$$,
  $$A strong candidate at the end of an interview: A) has no questions B) asks thoughtful questions C) asks only about salary. (Answer: B)$$,
  array['I prepared thoughtful questions to ask','They help me assess role and team fit']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Final Checklist & Interview Mindset', '10 minute read',
  $$Walk in prepared and calm. This lesson covers the practical checklist and the mindset that carries you through.$$,
  array['Run a pre-interview checklist','Manage nerves','Finish strong and follow up'],
  $$## Pre-interview checklist
- Research the company and try their product
- Rehearse your story and key answers
- Prepare your questions
- Test your tech (for remote); plan to arrive early

## Mindset
It's a two-way conversation, not an interrogation. Nerves are normal — preparation turns them into focus.

## After
Send a short thank-you note; reflect on what to improve for next time.$$,
  $$The morning of a remote interview you test your camera, re-read your STAR stories, have your questions ready, and join early — calm, prepared, and focused.$$,
  $$- Cramming new material the morning of
- Treating it as an interrogation, not a conversation
- No follow-up afterwards$$,
  $$A short, genuine thank-you note after the interview is rare and memorable — it keeps you front of mind.$$,
  $$Create your personal pre-interview checklist and write a short template thank-you note.$$,
  $$What one habit will most help you stay calm and focused in interviews?$$,
  $$An interview is best approached as: A) an interrogation B) a two-way conversation C) a test to fear. (Answer: B)$$,
  array['I have a pre-interview checklist','I have a thank-you note template and calm mindset']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Final Project: Interview Readiness Pack', '90 minutes',
  $$Complete the course by assembling everything into one interview-ready pack — your flagship preparation asset.$$,
  array['Combine every skill into a complete readiness pack'],
  $$This final project brings the whole course together into a single, reusable Interview Readiness Pack you can take into any QA interview.$$,
  $$## Final Project: QA Interview Readiness Pack
Assemble into one document/folder:
1. Your QA career story (60–90 second intro).
2. Model answers to core testing questions.
3. Agile/team answers.
4. Scenario answers (using the framework).
5. 3–4 STAR stories.
6. A completed mock test task.
7. Your tailored CV and LinkedIn summary.
8. Questions to ask employers.
9. Your pre-interview checklist.
Publish it (doc/folder) and add it to your portfolio, or submit for review. Completing the course activities earns your Inside STLC Academy Certificate of Completion.$$,
  $$Looking at your finished pack, where do you feel strongest, and what's your last area to practise?$$,
  $$## Module 8 Knowledge Check
1. How many STAR stories should you prepare, and why reusable?
2. Why is asking questions important?
3. Name three items on your pre-interview checklist.$$,
  array['I assembled a complete interview readiness pack','It includes answers, STAR stories, a test task, CV and questions','I published it / saved it to my portfolio']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'qa-interview-accelerator' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;
