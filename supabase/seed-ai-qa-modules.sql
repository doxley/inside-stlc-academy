-- ============================================================
-- Seed the 12 modules for "AI for QA Testers" (slug ai-for-qa-testers).
-- Run AFTER the course row exists (payment-schema-update.sql) and
-- BEFORE the AI-QA lesson seeds. Safe to re-run.
-- ============================================================

insert into public.modules (course_id, module_number, title, slug, description, estimated_duration, status, unlock_day)
select c.id, v.module_number, v.title, v.slug, v.description, v.estimated_duration, 'published', 0
from public.courses c
cross join (values
  (1,  'The AI Shift in QA', 'the-ai-shift-in-qa', 'How AI is changing testing — what it can do, what it cannot do, and why human judgement still matters.', '~1 hour'),
  (2,  'AI Fundamentals for Testers', 'ai-fundamentals-for-testers', 'Understand LLMs, prompts, context, hallucinations, limitations, and responsible AI usage.', '~1 hour'),
  (3,  'Prompt Engineering for QA', 'prompt-engineering-for-qa', 'Write clear, structured prompts for test analysis, planning, scenarios, risks, and documentation.', '~1 hour'),
  (4,  'Requirements Analysis with AI', 'requirements-analysis-with-ai', 'Use AI to review user stories, acceptance criteria, gaps, ambiguities, edge cases, and risks.', '~1 hour'),
  (5,  'AI-Assisted Test Case Design', 'ai-assisted-test-case-design', 'Generate, improve, prioritise, and review manual test cases using AI.', '~1 hour'),
  (6,  'Exploratory Testing with AI', 'exploratory-testing-with-ai', 'Create charters, personas, scenarios, mind maps, and risk-based exploratory testing ideas.', '~1 hour'),
  (7,  'Defect Reporting and Root Cause Support', 'defect-reporting-and-root-cause-support', 'Use AI to improve bug reports, reproduce issues, analyse patterns, and support defect triage.', '~1 hour'),
  (8,  'API Testing with AI', 'api-testing-with-ai', 'Use AI to understand endpoints, create test ideas, generate examples, and review API risks.', '~1 hour'),
  (9,  'Automation Support with AI', 'automation-support-with-ai', 'Use AI to support automation thinking, test data, selectors, and debugging.', '~1 hour'),
  (10, 'AI in Agile QA Workflows', 'ai-in-agile-qa-workflows', 'Use AI during refinement, sprint planning, regression planning, release testing, and retrospectives.', '~1 hour'),
  (11, 'AI Risks, Ethics and Governance', 'ai-risks-ethics-and-governance', 'Data privacy, confidential information, bias, hallucinations, review controls, and professional responsibility.', '~1 hour'),
  (12, 'Building Your AI QA Workflow', 'building-your-ai-qa-workflow', 'Create a repeatable personal AI testing workflow and toolkit.', '~1 hour')
) as v(module_number, title, slug, description, estimated_duration)
where c.slug = 'ai-for-qa-testers'
on conflict (course_id, module_number) do nothing;
