-- ============================================================
-- Assignment templates + assignments for AI and QA-Interview courses.
--
-- 1. Adds assignments.template_slug — references a Resource Vault doc
--    (public/resources/<courseSlug>/<slug>) shown as a downloadable
--    "assignment template" on the module's submission card.
-- 2. Links each existing 90-Day assignment to its matching template.
-- 3. Seeds one practical assignment per module for "AI for QA Testers"
--    and "QA Interview Accelerator" (these had none).
--
-- Idempotent: safe to run more than once.
-- NOTE: the Playwright course has no modules seeded yet, so it gets no
-- assignments here — seed its modules first, then add assignments.
-- ============================================================

alter table public.assignments add column if not exists template_slug text;

-- ---------- 1. 90-Day: link existing assignments to a template ----------
update public.assignments set template_slug = 'sdlc-cheat-sheet'                 where module_id = 'b1000001-0000-0000-0000-000000000001';
update public.assignments set template_slug = 'test-case-template'              where module_id = 'b1000002-0000-0000-0000-000000000001';
update public.assignments set template_slug = 'bug-report-template'             where module_id = 'b1000003-0000-0000-0000-000000000001';
update public.assignments set template_slug = 'agile-testing-cheat-sheet'       where module_id = 'b1000004-0000-0000-0000-000000000001';
update public.assignments set template_slug = 'test-plan-template'              where module_id = 'b1000005-0000-0000-0000-000000000001';
update public.assignments set template_slug = 'test-scenario-template'          where module_id = 'b1000006-0000-0000-0000-000000000001';
update public.assignments set template_slug = 'requirements-traceability-matrix' where module_id = 'b1000007-0000-0000-0000-000000000001';
update public.assignments set template_slug = 'test-strategy-template'          where module_id = 'b1000008-0000-0000-0000-000000000001';
update public.assignments set template_slug = 'test-case-template'              where module_id = 'b1000009-0000-0000-0000-000000000001';
update public.assignments set template_slug = 'final-portfolio-project-workbook' where module_id = 'b1000010-0000-0000-0000-000000000001';
update public.assignments set template_slug = 'qa-career-roadmap-poster'        where module_id = 'b1000011-0000-0000-0000-000000000001';
update public.assignments set template_slug = 'final-portfolio-project-workbook' where module_id = 'b1000012-0000-0000-0000-000000000001';

-- ---------- 2. AI for QA Testers: one assignment per module ----------
insert into public.assignments (module_id, title, instructions, required, submission_type, template_slug)
select m.id, v.title, v.instructions, true, 'file', v.template_slug
from public.modules m
join public.courses c on c.id = m.course_id
cross join (values
  (1,  'Module 1 Assignment — The AI Shift in QA', 'Write a one-page reflection on where AI can and cannot help in testing. List five testing tasks AI can assist with and three decisions that must stay with a human tester, with a short reason for each. Submit as a PDF or DOCX.', 'ai-usage-policy-template'),
  (2,  'Module 2 Assignment — AI Fundamentals for Testers', 'Run three of your own prompts through an AI tool and document, for each: the prompt, the output, and whether you spotted any hallucination or limitation. Conclude with two rules you will follow for responsible AI use. Submit as a PDF or DOCX.', 'ai-prompt-cheat-sheet'),
  (3,  'Module 3 Assignment — Prompt Engineering for QA', 'Using the Prompt Writing Framework, write five well-structured QA prompts (role + context + task + format + constraints) for different testing tasks. Show a before/after for one weak prompt you improved. Submit as a PDF or DOCX.', 'prompt-writing-framework'),
  (4,  'Module 4 Assignment — Requirements Analysis with AI', 'Take a real or sample user story and use AI to find ambiguity, gaps and untestable criteria. Produce five sharp questions you would raise in refinement and mark the two most important. Submit as a PDF or DOCX.', 'ai-requirement-review-workbook'),
  (5,  'Module 5 Assignment — AI-Assisted Test Case Design', 'Generate test cases for a feature using AI, then review them against the AI Test Case Review Checklist. Document at least two issues you found and fixed (e.g. a hallucinated rule, a missing boundary case). Submit as a PDF or DOCX.', 'ai-test-case-review-checklist'),
  (6,  'Module 6 Assignment — Exploratory Testing with AI', 'Use AI to generate 10 exploratory charters for a feature you can access, run two short sessions, and record findings plus three follow-up charters the exploration revealed. Submit as a PDF or DOCX.', 'ai-exploratory-testing-workbook'),
  (7,  'Module 7 Assignment — Defect Reporting with AI', 'Write a bug report yourself, then use AI to review it for clarity and completeness. Submit the before and after versions and list three improvements you accepted and one suggestion you rejected because it was wrong. Submit as a PDF or DOCX.', 'ai-bug-report-review-guide'),
  (8,  'Module 8 Assignment — API Testing with AI', 'Pick a public API and use AI to help you understand its endpoints and generate test ideas. Produce 8 API test ideas (with method, purpose and expected result) and note which AI suggestions you had to correct. Submit as a PDF or DOCX.', 'ai-prompt-library'),
  (9,  'Module 9 Assignment — Automation Support with AI', 'Use AI to support an automation task: generate test data, draft a selector strategy, or explain an error. Document what you asked, what AI produced, and what you verified or changed before trusting it. Submit as a PDF or DOCX.', 'ai-prompt-library'),
  (10, 'Module 10 Assignment — AI in Agile QA Workflows', 'Describe how you would use AI across one sprint (refinement, planning, regression scope, release). For a recent change, use AI to brainstorm impacted areas and produce a prioritised regression set with a one-line scope justification. Submit as a PDF or DOCX.', 'ai-regression-planning-template'),
  (11, 'Module 11 Assignment — AI Risks, Ethics & Governance', 'Write your personal responsible-AI statement (data, verification, accountability) and apply the AI Risk Assessment Checklist to a real task. If any item fails, explain how you would rework the task to pass. Submit as a PDF or DOCX.', 'ai-ethics-governance-guide'),
  (12, 'Module 12 Assignment — Building Your AI QA Workflow', 'Create your personal AI testing toolkit: at least three saved prompts that work for you, your go-to tool per task, and your four personal usage rules. This is your capstone for the course. Submit as a PDF or DOCX.', 'personal-ai-toolkit-planner')
) as v(module_number, title, instructions, template_slug)
where c.slug = 'ai-for-qa-testers'
  and m.module_number = v.module_number
  and not exists (select 1 from public.assignments a where a.module_id = m.id);

-- ---------- 3. QA Interview Accelerator: one assignment per module ----------
insert into public.assignments (module_id, title, instructions, required, submission_type, template_slug)
select m.id, v.title, v.instructions, true, 'file', v.template_slug
from public.modules m
join public.courses c on c.id = m.course_id
cross join (values
  (1, 'Module 1 Assignment — Understanding the QA Interview Process', 'Map a typical QA interview process (stages from application to offer) and, for each stage, note what is assessed and how you will prepare. Use the Interview Day Checklist to build your own pre-interview checklist. Submit as a PDF or DOCX.', 'interview-day-checklist'),
  (2, 'Module 2 Assignment — Your QA Career Story', 'Write your "Tell me about yourself" pitch using the Present–Past–Future formula (60–90 seconds) and record yourself delivering it. Submit the written pitch plus three sentences on what you improved after listening back. Submit as a PDF or DOCX.', 'elevator-pitch-template'),
  (3, 'Module 3 Assignment — Core Software Testing Questions', 'Answer 10 core testing questions from the Question Bank in your own words (e.g. severity vs priority, when to stop testing, test design techniques). Keep each answer tight and add a real example where you can. Submit as a PDF or DOCX.', 'qa-interview-question-bank'),
  (4, 'Module 4 Assignment — Agile, Scrum and Team-Based Questions', 'Prepare answers to five Agile/team questions (e.g. how testing fits in Agile, three amigos, smoke vs regression) and one short STAR story about working in a team. Submit as a PDF or DOCX.', 'technical-qa-interview-cheat-sheet'),
  (5, 'Module 5 Assignment — Scenario-Based QA Questions', 'Prepare STAR answers for four behavioural/scenario questions (a defect you are proud of, a conflict with a developer, working under pressure, a mistake you learned from). Submit as a PDF or DOCX.', 'behavioural-interview-prep-workbook'),
  (6, 'Module 6 Assignment — Test Task Preparation', 'Complete a practice test task: given a simple feature, produce test cases (happy path, negative, boundary) and a short bug report. Then run a mock interview from the practice pack and note your score and one area to improve. Submit as a PDF or DOCX.', 'mock-interview-practice-pack'),
  (7, 'Module 7 Assignment — CV, LinkedIn and Job Applications', 'Update your QA CV using the template and rewrite your LinkedIn headline and About opener. Submit your CV, the LinkedIn text, and a list of 10 target roles you are applying for. Submit as a PDF or DOCX.', 'qa-cv-template'),
  (8, 'Module 8 Assignment — Final Interview Readiness Pack', 'Submit your graduation pack: five STAR answers, your elevator pitch, a 30-60-90 day plan for a target role, and a record of five job applications. This is your final readiness submission. Submit as a PDF or DOCX.', '30-60-90-day-plan-template')
) as v(module_number, title, instructions, template_slug)
where c.slug = 'qa-interview-accelerator'
  and m.module_number = v.module_number
  and not exists (select 1 from public.assignments a where a.module_id = m.id);
