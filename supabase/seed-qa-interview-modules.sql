-- ============================================================
-- Seed the 8 modules for "QA Interview Accelerator"
-- (slug qa-interview-accelerator). Run AFTER the course row exists
-- and BEFORE the lesson seeds. Safe to re-run.
-- ============================================================

insert into public.modules (course_id, module_number, title, slug, description, estimated_duration, status, unlock_day)
select c.id, v.module_number, v.title, v.slug, v.description, v.estimated_duration, 'published', 0
from public.courses c
cross join (values
  (1, 'Understanding the QA Interview Process', 'understanding-the-qa-interview-process', 'What employers assess, how QA interviews are structured, and how to prepare properly.', '~45 min'),
  (2, 'Your QA Career Story', 'your-qa-career-story', 'Build a clear, confident answer to "Tell me about yourself" and position your experience.', '~45 min'),
  (3, 'Core Software Testing Questions', 'core-software-testing-questions', 'Prepare for questions on test cases, defects, regression, retesting, smoke, exploratory and UAT.', '~1 hour'),
  (4, 'Agile, Scrum and Team-Based Questions', 'agile-scrum-and-team-based-questions', 'Answer questions about agile teams, ceremonies, user stories, acceptance criteria, and collaboration.', '~45 min'),
  (5, 'Scenario-Based QA Questions', 'scenario-based-qa-questions', 'Handle real-world questions: unclear requirements, production defects, missed bugs, tight deadlines, conflict.', '~1 hour'),
  (6, 'Test Task Preparation', 'test-task-preparation', 'Approach practical test tasks: write test cases, raise defects, explain assumptions, present your thinking.', '~1 hour'),
  (7, 'CV, LinkedIn and Job Applications', 'cv-linkedin-and-job-applications', 'Improve your CV, LinkedIn, personal summary, project descriptions, and application approach.', '~45 min'),
  (8, 'Final Interview Readiness Pack', 'final-interview-readiness-pack', 'Create your own interview preparation pack: answers, examples, STAR stories, questions to ask, final checklist.', '~1 hour')
) as v(module_number, title, slug, description, estimated_duration)
where c.slug = 'qa-interview-accelerator'
on conflict (course_id, module_number) do nothing;
