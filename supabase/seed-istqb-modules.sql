-- ============================================================
-- Seed the 14 modules for "ISTQB Foundation Masterclass"
-- (slug istqb-foundation-masterclass). Run AFTER the course row
-- exists and BEFORE the lesson seeds. Safe to re-run.
-- ============================================================

insert into public.modules (course_id, module_number, title, slug, description, estimated_duration, status, unlock_day)
select c.id, v.module_number, v.title, v.slug, v.description, v.estimated_duration, 'published', 0
from public.courses c
cross join (values
  (1, 'Fundamentals of Testing', 'fundamentals-of-testing', 'Why testing matters, the objectives and seven principles of testing, the psychology of testing, and testing across the SDLC.', '~3 hours'),
  (2, 'Software Development Lifecycle', 'software-development-lifecycle', 'Waterfall, V-Model, Agile and DevOps — and how testing shifts left and right in each approach.', '~3 hours'),
  (3, 'Static Testing', 'static-testing', 'Reviews, walkthroughs, technical reviews, inspections and static analysis — and how reviews really work at work.', '~2 hours'),
  (4, 'Test Analysis & Design Techniques', 'test-analysis-and-design-techniques', 'Equivalence partitioning, boundary value analysis, decision tables, state transition, pairwise, use case and experience-based testing — and how to choose.', '~4 hours'),
  (5, 'Managing the Test Process', 'managing-the-test-process', 'Test planning, monitoring, control, risk, entry and exit criteria, and the metrics that matter.', '~3 hours'),
  (6, 'Test Management', 'test-management', 'Roles and responsibilities, communication, reporting, estimation and prioritisation.', '~3 hours'),
  (7, 'Defect Management', 'defect-management', 'The defect lifecycle, severity vs priority, root cause analysis, reporting and triage.', '~3 hours'),
  (8, 'Risk-Based Testing', 'risk-based-testing', 'Identifying risk, weighing probability and impact, building a risk matrix, prioritising and mitigating.', '~3 hours'),
  (9, 'Test Tools', 'test-tools', 'Static analysis, test management, automation, performance and AI tools — and how to select the right one.', '~2 hours'),
  (10, 'Agile Testing', 'agile-testing', 'Scrum, ceremonies, user stories, acceptance criteria, definition of done and exploratory testing.', '~3 hours'),
  (11, 'Real World QA', 'real-world-qa', 'How ISTQB concepts are actually applied in industry, where theory differs from reality, and David''s practical guidance.', '~2 hours'),
  (12, 'Exam Preparation', 'exam-preparation', 'Study techniques, revision planning, time management, exam strategy, memory techniques and question analysis.', '~3 hours'),
  (13, 'Mock Exam One', 'mock-exam-one', '40 timed exam-style questions with immediate feedback, full explanations and a weak-area report.', '~1 hour'),
  (14, 'Mock Exam Two', 'mock-exam-two', 'A full timed exam simulation with a performance dashboard, recommended revision path and certificate eligibility.', '~1 hour')
) as v(module_number, title, slug, description, estimated_duration)
where c.slug = 'istqb-foundation-masterclass'
on conflict (course_id, module_number) do nothing;
