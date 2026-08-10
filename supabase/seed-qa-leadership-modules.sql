-- ============================================================
-- Seed the 12 modules for "QA Leadership Academy"
-- (slug qa-leadership-academy). Run AFTER the course row exists
-- and BEFORE the lesson seeds. Safe to re-run.
-- ============================================================

insert into public.modules (course_id, module_number, title, slug, description, estimated_duration, status, unlock_day)
select c.id, v.module_number, v.title, v.slug, v.description, v.estimated_duration, 'published', 0
from public.courses c
cross join (values
  (1,  'From Tester to QA Leader', 'from-tester-to-qa-leader', 'The transition from executing testing to leading quality: leadership mindset, delegation, technical credibility, managing quality risk, and your first 30 days.', '~3 hours'),
  (2,  'Assessing QA Maturity & Capability', 'assessing-qa-maturity-and-capability', 'Diagnose the current state across people, process, technology and culture; map the SDLC, find quality bottlenecks and produce a QA maturity assessment.', '~3 hours'),
  (3,  'Building High-Performing QA Teams', 'building-high-performing-qa-teams', 'Design QA capability around organisational risk: roles vs skills, skills matrices, capability gaps, developing testers and career progression.', '~3 hours'),
  (4,  'Hiring Great Testers', 'hiring-great-testers', 'Define the role you actually need, write better job descriptions, design structured interviews and scorecards, avoid bias, decide and onboard.', '~4 hours'),
  (5,  'QA Strategy', 'qa-strategy', 'What a QA strategy really is: business and product risk, quality objectives, test levels, environments, test data, quality gates and communicating the strategy.', '~4 hours'),
  (6,  'Risk-Based Quality Leadership', 'risk-based-quality-leadership', 'Product risk, probability vs impact, risk workshops, risk-based prioritisation and release decisions, and communicating residual risk to accountable stakeholders.', '~3 hours'),
  (7,  'Metrics That Actually Matter', 'metrics-that-actually-matter', 'Why QA metrics go wrong, leading vs lagging indicators, meaningful defect/automation/delivery signals, executive dashboards and telling the quality story.', '~3 hours'),
  (8,  'Automation Strategy for QA Leaders', 'automation-strategy-for-qa-leaders', 'Not a coding module: why automation programmes fail, what to automate and what not to, distribution, ownership, ROI and building an automation roadmap.', '~3 hours'),
  (9,  'AI Strategy for QA Leaders', 'ai-strategy-for-qa-leaders', 'Where AI actually helps QA, governance, data privacy, human-in-the-loop accountability, measuring value and building a pragmatic AI adoption roadmap.', '~3 hours'),
  (10, 'Stakeholder Management & Influence', 'stakeholder-management-and-influence', 'Communicating with engineering, product, delivery and executives; challenging unrealistic deadlines, handling quality conflict and influencing without authority.', '~3 hours'),
  (11, 'Coaching, Performance & Difficult Conversations', 'coaching-performance-and-difficult-conversations', 'Coaching vs managing, effective feedback, performance conversations, developing high performers, handling underperformance and building accountability.', '~3 hours'),
  (12, 'Building the QA Transformation Roadmap', 'building-the-qa-transformation-roadmap', 'The capstone: bring the strategy together, prioritise quick wins vs structural change, build the business case, and create 30/60/90-day and 12-month roadmaps.', '~3 hours')
) as v(module_number, title, slug, description, estimated_duration)
where c.slug = 'qa-leadership-academy'
on conflict (course_id, module_number) do nothing;
