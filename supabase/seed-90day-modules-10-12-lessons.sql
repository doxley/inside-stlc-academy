-- ============================================================
-- 90-Day Roadmap — first-draft lessons for Module 10 (Portfolio
-- Building), Module 11 (CV & LinkedIn Mastery) and Module 12
-- (Interview Mastery & Job Search). Run AFTER lessons-schema.sql.
-- ============================================================

-- ─────────────── MODULE 10: PORTFOLIO BUILDING ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Why a QA Portfolio Matters', '10 minute read',
  $$A portfolio proves you can do the job, not just talk about it. For career changers especially, it is your strongest evidence.$$,
  array['Explain what a QA portfolio is','Describe why it beats a CV alone','Identify what employers look for'],
  $$## What it is
A collection of real artefacts that show how you work: test cases, bug reports, test plans, an automation project, an AI-assisted pack.

## Why it matters
- A CV claims skills; a portfolio demonstrates them
- It gives interviewers something concrete to discuss
- For career changers, it offsets a lack of job history

## What employers look for
Clarity, structure, and judgement — not volume.$$,
  $$Two candidates apply. One lists "test case writing" on a CV; the other links a clean folder of real test cases, a bug report, and a small Postman collection. The second gets the interview.$$,
  $$- Waiting until you "have experience" to start a portfolio
- Quantity over quality — lots of messy artefacts
- No context explaining what each piece shows$$,
  $$Every assignment in this course is portfolio material. You've been building one already — this module organises it.$$,
  $$List the artefacts you've already produced in this course that could go into your portfolio.$$,
  $$Why is a portfolio especially valuable for someone changing careers into QA?$$,
  $$A portfolio's main advantage over a CV is that it: A) is longer B) demonstrates skills with real work C) lists more tools. (Answer: B)$$,
  array['I understand why a QA portfolio matters','I have started listing my artefacts']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 10
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'What to Include', '12 minute read',
  $$A strong portfolio shows range across the QA skillset. This lesson lists the pieces that impress.$$,
  array['Choose high-impact portfolio pieces','Show range across the QA lifecycle','Add context to each artefact'],
  $$## Core pieces
- A test plan or strategy snapshot
- A set of well-written test cases (using your techniques)
- A professional bug report
- A test management/RTM example
- An API testing collection (Postman)
- An AI-assisted QA artefact (with your review notes)
- An automation plan or small project

## Add context
For each, write 2–3 lines: what it is, what it demonstrates, what you'd improve.$$,
  $$Next to your test-case file you add: "Demonstrates equivalence partitioning and boundary value analysis on a registration form; includes negative cases." Now its value is obvious at a glance.$$,
  $$- Dumping artefacts with no explanation
- Only including "happy path" work
- Hiding your reasoning — context is what shows judgement$$,
  $$Curate, don't hoard. Six strong, well-explained pieces beat twenty unexplained ones.$$,
  $$Choose six artefacts for your portfolio and write a one-line "what this demonstrates" for each.$$,
  $$Why does adding context to each artefact matter more than adding more artefacts?$$,
  $$The best portfolio shows: A) only automation B) range across the QA lifecycle C) as many files as possible. (Answer: B)$$,
  array['I selected high-impact pieces','I added context to each artefact']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 10
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Structuring Your Portfolio', '12 minute read',
  $$How you organise a portfolio shapes the first impression. Make it easy to scan and navigate.$$,
  array['Organise a portfolio logically','Write a clear introduction','Make it easy to navigate'],
  $$## A simple structure
- Intro: who you are and your QA focus
- Skills overview
- Projects/artefacts, each with context
- Links (GitHub, LinkedIn) and contact

## Where to host
- A GitHub repo with a clear README
- A simple personal site or PDF
- A shared, well-named folder

## Navigation
Use headings and a short index so a busy hiring manager finds value in seconds.$$,
  $$A GitHub README opens with a two-line intro, a skills list, then linked folders: /test-cases, /bug-reports, /api-tests, /automation — each with its own short README. Clean and scannable.$$,
  $$- No introduction, so context is missing
- Disorganised files with cryptic names
- Broken or private links a reviewer can't open$$,
  $$A clear README is the single highest-return thing in a technical portfolio — it frames everything else.$$,
  $$Draft the outline (sections + a 2-line intro) for your portfolio's front page or README.$$,
  $$What would make a hiring manager give your portfolio 30 more seconds rather than closing it?$$,
  $$The fastest win for a technical portfolio's first impression is: A) more projects B) a clear README/intro C) a logo. (Answer: B)$$,
  array['I have a clear portfolio structure','I drafted an intro/README']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 10
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Showcasing Your Work', '12 minute read',
  $$Where and how you publish your portfolio affects who sees it. This lesson covers GitHub, documents and sharing.$$,
  array['Publish work on GitHub','Present documents professionally','Share your portfolio effectively'],
  $$## GitHub basics for QA
- A public repo with a README
- Folders per artefact type
- Clear commit messages

## Documents
Export polished PDFs for test plans, bug reports and packs. Consistent formatting signals professionalism.

## Sharing
- Put the link on your CV and LinkedIn
- Reference specific pieces in interviews
- Keep it updated as you grow$$,
  $$In an interview you say "I can show you — here's the bug report in my portfolio" and walk through your reasoning. Concrete evidence beats generic claims every time.$$,
  $$- A private repo nobody can view
- Inconsistent, messy formatting across documents
- Never mentioning the portfolio in applications or interviews$$,
  $$Practise a 60-second walkthrough of one portfolio piece. Being able to talk through your work confidently is half its value.$$,
  $$Publish (or organise) one artefact in a public GitHub repo or polished PDF and write its short description.$$,
  $$How would you reference a portfolio piece to strengthen an interview answer?$$,
  $$For a technical QA portfolio, a common professional home is: A) a private file B) a public GitHub repo with a README C) a screenshot only. (Answer: B)$$,
  array['I published or organised an artefact','I can walk through a piece in 60 seconds']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 10
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Assignment & Knowledge Check', '45 minutes',
  $$Assemble your portfolio from the work you've done across the course.$$,
  array['Assemble and publish a structured QA portfolio'],
  $$Turn your course work into a published, navigable portfolio.$$,
  $$## Assignment: Build your portfolio
1. Gather at least five artefacts from earlier modules.
2. Organise them into a clear structure (GitHub repo, site, or folder) with an intro/README.
3. Add a one-line context note to each piece.
4. Add links to your (draft) CV and LinkedIn placeholders.
Share the link or save it to submit for review.$$,
  $$Which portfolio piece are you proudest of, and what does it prove about you?$$,
  $$## Module 10 Knowledge Check
1. Name four artefacts worth including in a QA portfolio.
2. Why does context matter more than quantity?
3. What is the highest-return element for a portfolio's first impression?$$,
  array['I assembled at least five artefacts','I structured and published the portfolio','I added context and links']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 10
on conflict (module_id, lesson_number) do nothing;

-- ─────────────── MODULE 11: CV & LINKEDIN MASTERY ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Writing a QA CV That Gets Read', '12 minute read',
  $$Recruiters skim CVs in seconds. This lesson helps yours pass that scan and the automated filters.$$,
  array['Structure a clear QA CV','Pass ATS keyword screening','Lead with relevant strengths'],
  $$## Structure that works
- Name + headline (e.g. "QA Tester | Manual & API Testing")
- Short professional summary (3–4 lines)
- Key skills (scannable list)
- Experience / projects (impact-focused)
- Education and certificates

## ATS-friendly
Many CVs are filtered by software first. Mirror the language in the job advert (test cases, regression, Jira, API) where it's genuinely true.

## Keep it tight
One to two pages, clean formatting, no clutter.$$,
  $$A career changer leads with a strong summary and a "Projects" section featuring course portfolio work — turning "no experience" into demonstrable skill.$$,
  $$- A generic CV sent to every role
- Burying QA skills below unrelated history
- Fancy formatting that breaks ATS parsing$$,
  $$Mirror the job advert's keywords — but only for skills you genuinely have. Honesty plus relevance gets interviews you can succeed in.$$,
  $$Draft (or revise) your CV summary and key-skills section for a QA role you'd target.$$,
  $$How can a career changer present course projects to offset limited job history?$$,
  $$Why mirror keywords from the job advert? (Answer: to pass ATS/recruiter screening for relevant skills)$$,
  array['I have a clear, scannable CV structure','My CV reflects relevant QA keywords honestly']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 11
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Describing Experience with Impact', '12 minute read',
  $$How you phrase experience decides whether it lands. Show outcomes, not just duties.$$,
  array['Write impact-focused bullet points','Quantify results where possible','Translate non-QA experience into QA value'],
  $$## Duty vs impact
- Duty: "Wrote test cases."
- Impact: "Designed test cases using boundary analysis, cutting escaped defects on the checkout flow."

## A simple formula
Action + how + result. Quantify when you can (%, time saved, defects found).

## Transferable experience
Map past roles to QA strengths: attention to detail, process, communication, investigation.$$,
  $$A former customer-service worker writes: "Investigated and documented recurring product issues, reducing repeat complaints" — clearly transferable to defect analysis.$$,
  $$- Listing duties with no outcome
- Vague claims with no evidence
- Dismissing non-tech experience instead of translating it$$,
  $$Numbers grab attention. Even rough, honest figures ("reduced rework", "covered 90% of acceptance criteria") lift a bullet point.$$,
  $$Rewrite three CV bullet points from "duty" into "impact" form.$$,
  $$How would you translate one part of your previous experience into QA value?$$,
  $$A strong CV bullet follows: A) duty only B) action + how + result C) job title only. (Answer: B)$$,
  array['I can write impact-focused bullets','I translated past experience into QA value']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 11
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Optimising Your LinkedIn Profile', '12 minute read',
  $$LinkedIn is where recruiters search for testers. An optimised profile brings opportunities to you.$$,
  array['Write a strong headline and About section','Use keywords recruiters search for','Show your portfolio and activity'],
  $$## Key areas
- Headline: role + specialisms (not just "looking for work")
- About: a concise story of your QA focus and value
- Skills: add the QA skills recruiters filter on
- Featured: link your portfolio and best work

## Be findable
Recruiters search by terms like "QA Tester", "test automation", "Playwright". Include the ones that genuinely apply.

## Stay visible
Posting or commenting on QA topics keeps you in feeds and shows genuine interest.$$,
  $$Changing a headline from "Seeking opportunities" to "QA Tester | Manual, API & Automation | Playwright" measurably increases recruiter searches that surface the profile.$$,
  $$- A blank or one-line About section
- Headline that says only "open to work"
- No portfolio link in Featured$$,
  $$Your LinkedIn and CV should tell the same story. Consistency between them builds credibility with recruiters.$$,
  $$Rewrite your LinkedIn headline and draft a 4-line About section.$$,
  $$Which keywords should you add to your profile, and why those?$$,
  $$A strong LinkedIn headline includes: A) "open to work" only B) role + specialisms C) your hobbies. (Answer: B)$$,
  array['I optimised my headline and About','I added relevant skills and a portfolio link']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 11
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Tailoring Applications', '12 minute read',
  $$A tailored application beats ten generic ones. This lesson makes tailoring fast and effective.$$,
  array['Tailor a CV to a specific role','Write a focused cover note','Track your applications'],
  $$## Tailoring fast
- Read the advert; note the top 3–5 requirements
- Make sure your CV summary and skills reflect them (honestly)
- Reference a relevant portfolio piece

## Cover note
A short, specific note ("I built an API test collection and a small automation plan — both in my portfolio") beats a generic template.

## Track applications
Keep a simple tracker: role, company, date, status, follow-up. It prevents missed opportunities.$$,
  $$For an "API testing" role, you move your Postman project to the top of your CV and mention it in the cover note — instantly more relevant than a generic submission.$$,
  $$- Sending identical applications everywhere
- Ignoring the advert's stated priorities
- No tracking, so follow-ups are missed$$,
  $$Quality over quantity: five tailored applications usually beat fifty generic ones for interview rate.$$,
  $$Pick a real job advert and list the top five requirements you'd tailor your CV to.$$,
  $$Why does tailoring a small number of applications often outperform mass-applying?$$,
  $$The best first step in tailoring is to: A) apply faster B) identify the advert's top requirements C) add more pages. (Answer: B)$$,
  array['I can tailor a CV to a role','I keep an application tracker']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 11
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Assignment & Knowledge Check', '45 minutes',
  $$Produce a job-ready CV and LinkedIn profile, tailored to a real role.$$,
  array['Apply CV, LinkedIn and tailoring skills end to end'],
  $$Bring the module together into application-ready materials.$$,
  $$## Assignment: Application pack
1. Write or revise your one-to-two page QA CV (summary, skills, projects/experience with impact bullets).
2. Update your LinkedIn headline and About section.
3. Pick a real job advert and tailor your CV summary to it, plus a 4-line cover note.
4. Start an application tracker (role, company, date, status).
Save the pack to your portfolio or submit for review.$$,
  $$Which change to your CV or LinkedIn do you think will make the biggest difference, and why?$$,
  $$## Module 11 Knowledge Check
1. What makes a CV bullet "impact-focused"?
2. Why mirror keywords from the job advert?
3. Name two elements of a strong LinkedIn profile.$$,
  array['I produced a tailored QA CV','I updated my LinkedIn headline and About','I started an application tracker']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 11
on conflict (module_id, lesson_number) do nothing;

-- ─────────────── MODULE 12: INTERVIEW MASTERY & JOB SEARCH ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'The QA Interview Process', '12 minute read',
  $$Knowing the shape of a QA interview removes surprises and lets you prepare deliberately.$$,
  array['Describe typical QA interview stages','Explain what each stage assesses','Prepare for each stage'],
  $$## Typical stages
- Screening call (recruiter): motivation and basics
- Technical interview: QA concepts and scenarios
- Practical task: a test exercise or take-home
- Final/culture interview: collaboration and fit

## What they assess
- Do you understand testing fundamentals?
- Can you think through real situations?
- Do you communicate clearly and collaborate?

## Prepare per stage
Match your prep to the stage, not one generic script.$$,
  $$Before a technical round you review test design, defect concepts, and agile basics; before the final round you prepare collaboration stories. Targeted prep beats cramming everything.$$,
  $$- Treating every stage the same
- Preparing answers but not questions to ask them
- Neglecting the practical task until the last minute$$,
  $$Always prepare two or three thoughtful questions to ask — it signals genuine interest and helps you assess them too.$$,
  $$Map out the likely stages for a QA role you'd target and one prep action for each.$$,
  $$Why should preparation differ across interview stages?$$,
  $$Which stage usually assesses QA fundamentals and scenarios? (Answer: the technical interview)$$,
  array['I understand the QA interview stages','I have a prep action for each stage']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 12
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Answering Common QA Questions', '15 minute read',
  $$Most QA interviews reuse a core set of questions. Prepare clear, structured answers and you'll stand out.$$,
  array['Answer core QA concept questions','Structure answers clearly','Use examples to support answers'],
  $$## Frequent questions
- What is the difference between severity and priority?
- Explain the STLC / defect lifecycle.
- How would you test [a login / a search / a lift]?
- What's the difference between verification and validation?
- How do you decide what to automate?

## Structure an answer
Define the concept, give a short example, relate it to real testing. Concise beats rambling.$$,
  $$"How would you test a search box?" — you cover functional (results, no results), boundary (very long query), non-functional (speed), and edge cases (special characters) in a calm, structured way.$$,
  $$- One-word answers with no example
- Rambling without structure
- Memorising definitions but unable to apply them$$,
  $$You drafted answers to many of these in earlier modules' knowledge checks — reuse them. Practise aloud until they're natural, not memorised.$$,
  $$Write structured answers to three common QA questions, each with a short example.$$,
  $$Which common question do you find hardest, and how will you prepare for it?$$,
  $$A strong concept answer is: definition + example + ____. (Answer: relate it to real testing)$$,
  array['I prepared structured answers to common questions','I can support answers with examples']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 12
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'STAR for Scenario Questions', '12 minute read',
  $$Scenario and behavioural questions are best answered with the STAR method — structured, concrete, and credible.$$,
  array['Apply the STAR structure','Prepare reusable STAR stories','Keep answers concise and concrete'],
  $$## STAR
- Situation: the context
- Task: what you needed to do
- Action: what you actually did
- Result: the outcome (ideally measurable)

## Reusable stories
Prepare three or four flexible stories (a tough defect, a deadline, a disagreement, a success). Adapt them to many questions.

## Keep it tight
Aim for around two minutes — enough detail, no rambling.$$,
  $$"Tell me about a time you found a critical bug." S: pre-release checkout change. T: verify it was safe. A: ran targeted regression, found a tax bug, raised it with impact data. R: fix shipped before release, no customer impact.$$,
  $$- Giving only the situation and never the result
- Vague stories with no concrete action
- A different unprepared story for every question$$,
  $$Even career changers have STAR stories — use examples from previous jobs that show investigation, care, and communication.$$,
  $$Write one full STAR story you could adapt to several behavioural questions.$$,
  $$Why is the "Result" step the part candidates most often forget — and why does it matter?$$,
  $$In STAR, the "A" stands for: A) Answer B) Action C) Analysis. (Answer: B)$$,
  array['I can structure answers with STAR','I prepared reusable STAR stories']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 12
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Handling Test Tasks', '12 minute read',
  $$Many QA interviews include a practical task. How you approach it matters as much as the result.$$,
  array['Approach a practical test task','Communicate your thinking','Present your work clearly'],
  $$## A reliable approach
- Clarify the requirements and assumptions first
- Decide scope and prioritise by risk
- Apply your test design techniques
- Write clear, runnable test cases / bug reports
- Explain trade-offs and what you'd do with more time

## Show your thinking
Interviewers want to see how you reason, not just a perfect answer. Narrate assumptions and priorities.$$,
  $$Given a sign-up form to test, you state your assumptions, prioritise the high-risk areas, apply EP/BVA, write a few strong cases, and note what you'd add with more time — demonstrating real judgement.$$,
  $$- Diving in without clarifying requirements
- Trying to test everything and finishing nothing
- Presenting results with no explanation of choices$$,
  $$"Here are my assumptions…" is a powerful opening for a test task — it shows maturity and prevents wasted effort.$$,
  $$Take a sample feature and outline how you'd approach it as a 30-minute test task.$$,
  $$Why do interviewers value your reasoning as much as your output on a test task?$$,
  $$The best first step in a test task is to: A) start writing tests immediately B) clarify requirements and assumptions C) automate everything. (Answer: B)$$,
  array['I have a clear approach to test tasks','I can communicate my reasoning and trade-offs']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 12
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Job Search Strategy & Final Project', '60 minutes',
  $$Finish the roadmap by pulling everything into a complete, interview-ready package and a clear job-search plan.$$,
  array['Build a job-search plan','Complete the course portfolio project','Prepare an interview-ready pack'],
  $$## Job-search strategy
- Define target roles and realistic level
- Use multiple channels: boards, LinkedIn, referrals, direct applications
- Set a weekly rhythm (applications, follow-ups, learning)
- Track everything and review what's working

## Course portfolio project
Combine your best artefacts from all modules into one polished portfolio, with a CV and LinkedIn that match.

## Certificate
Completing the course activities earns your Inside STLC Academy Certificate of Completion — a recognition of the work you've done, not a formal external qualification.$$,
  $$## Final Project: Career-ready QA pack
1. A polished portfolio (test cases, bug report, API collection, AI-assisted artefact, automation plan).
2. A tailored CV and an optimised LinkedIn profile.
3. Prepared answers to common QA questions and 3–4 STAR stories.
4. A one-page job-search plan (targets, channels, weekly routine, tracker).
Submit the pack (or your portfolio link) for review against the model checklist.$$,
  $$Looking back over the whole roadmap, what are you now able to do that you couldn't at the start?$$,
  $$## Module 12 Knowledge Check
1. Name the typical QA interview stages.
2. What does STAR stand for?
3. What is the best first step when given a practical test task?$$,
  array['I built a job-search plan','I completed the portfolio project','I prepared interview answers and STAR stories']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 12
on conflict (module_id, lesson_number) do nothing;
