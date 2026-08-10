-- ============================================================
-- QA Leadership Academy — assignments for Modules 1–3 (Batch 1).
-- Each module produces one professional portfolio artefact (Level 3
-- assessment). Run AFTER add-qa-leadership-course.sql and
-- seed-qa-leadership-modules.sql. Idempotent — inserts only if the
-- module has no assignment yet. template_slug/brief_slug are wired to
-- Resource Vault docs in the resources batch.
-- ============================================================

-- Safety: ensure the optional columns exist (added course-agnostically
-- elsewhere; repeated here so this file is self-sufficient).
alter table public.assignments add column if not exists template_slug text;
alter table public.assignments add column if not exists brief_slug text;

insert into public.assignments (module_id, title, instructions, required, submission_type)
select m.id, v.title, v.instructions, true, 'file'
from public.modules m
join public.courses c on c.id = m.course_id
cross join (values
  (1,
   'Module 1 Assignment — First 30-Day QA Leadership Assessment',
   'You have just been appointed to lead a QA function (use Northstar Digital, or a real organisation you know). Produce your First 30-Day QA Leadership Assessment: (1) the people you would meet and the questions you would ask; (2) the evidence you would gather across people, process, technology and risk; (3) your initial findings framed explicitly as provisional; (4) one genuine, low-risk quick win and why you chose it; and (5) three things you would deliberately NOT change yet, with your reasoning. Assess yourself against the rubric in the assignment brief. Submit as a PDF or DOCX.'),
  (2,
   'Module 2 Assignment — QA Current-State Assessment',
   'Assess the current state of a QA function (Northstar Digital or a real organisation). Using a continuous, per-capability approach, score and evidence at least ten capability areas (e.g. requirements, test environments, test data, automation, CI/CD, defect management, metrics, quality ownership, people/skills, leadership and culture). Produce: a current-state assessment, clear strengths and weaknesses, the key quality risks, the capability gaps, and two or three prioritised recommendations — explicitly naming any weak areas where you recommend NOT investing because the risk does not justify it. Submit as a PDF or DOCX.'),
  (3,
   'Module 3 Assignment — QA Capability Development Plan',
   'You are given a product organisation and a fixed budget (see the assignment brief; Northstar Digital is the default). Design the QA capability for it: the roles and skills the organisation actually needs given its risk (not a wish-list of every specialist), a skills matrix with proficiency levels and gap analysis, individual development directions for the existing team, and a simple career-progression outline. Justify every capability choice against organisational risk and the budget. Submit as a PDF or DOCX.'),
  (4,
   'Module 4 Assignment — QA Hiring Pack',
   'Design a complete, end-to-end hiring process for a Senior QA Engineer for a specific organisational need (Northstar Digital is the default — decide what gap the hire must fill). Produce: a role definition tied to a capability gap; a job description; a CV-screening scorecard; an interview plan (which stages, who runs them, what each assesses); technical and behavioural scorecards; a final decision matrix; and an onboarding outline. Include a short rationale for each stage — what it assesses and why. Submit as a PDF or DOCX.'),
  (5,
   'Module 5 Assignment — QA Strategy v1',
   'Create a professional QA Strategy for an organisation (Northstar Digital, or the SaaS scenario in the brief). It must make explicit choices and trade-offs, not list every possible activity: quality objectives tied to business goals, the product/business risks driving the strategy, chosen test levels and where effort goes (and where it deliberately does not), environment and test-data approach, quality gates, and a release approach — plus a one-paragraph version you could actually communicate to executives. Keep it tight and usable, not a 40-page document. Submit as a PDF or DOCX.'),
  (6,
   'Module 6 Assignment — Release Risk Recommendation',
   'Using the release scenario in the brief (deadline tomorrow: 2 critical scenarios untested, 14 medium defects open, 1 intermittent payment issue, 90% of regression passed — or a real situation you know), produce a release risk recommendation aimed at the accountable business stakeholder. Assess and rank the risks by probability and impact (business, customer, technical, compliance, reputational), state the residual risk clearly, give options with mitigations, and make a clear recommendation — while leaving the go/no-go decision with the business. Write it as something you would actually present. Submit as a PDF or DOCX.'),
  (7,
   'Module 7 Assignment — Quality Metrics Framework',
   'Design a quality metrics framework with THREE distinct dashboards — one for the QA team, one for engineering leadership, and one for executive leadership. For each dashboard, choose the metrics that audience actually needs, define each metric (what it measures, how it is calculated, its owner and frequency), and explain WHY that audience gets different information from the others. Avoid vanity metrics (test-case counts, raw bug counts, pass rate without context) and justify the meaningful signals you chose instead. Submit as a PDF or DOCX.'),
  (8,
   'Module 8 Assignment — Automation Transformation Roadmap',
   'Given a failing automation programme (the brief scenario: ~1,800 UI tests, ~6-hour run, ~25% flaky, with management wanting another 1,000 — or Northstar''s suite), create an Automation Transformation Roadmap. Assess the current state, decide what to automate and what to stop automating, propose a healthier test distribution, fix ownership and maintenance, estimate ROI in real terms (maintenance cost vs risk reduction and feedback speed), and lay out a phased roadmap. Make an explicit recommendation on the "add 1,000 more tests" request. Submit as a PDF or DOCX.'),
  (9,
   'Module 9 Assignment — QA AI Strategy',
   'Create an AI adoption strategy for a QA organisation where AI use is already happening informally with no governance (the Northstar situation, or your own). Include: an AI use-case matrix (value vs risk), a risk assessment covering data privacy/IP/hallucination/over-reliance, a lightweight governance model with human-in-the-loop accountability, a pilot with how you would measure real value, and a phased adoption roadmap. Be explicit about approved and prohibited uses and defer to your organisation''s real data-protection and security policies. Submit as a PDF or DOCX.'),
  (10,
   'Module 10 Assignment — Executive Quality Briefing',
   'Prepare and deliver a simulated executive quality briefing (for Northstar''s CTO/board, or your own leadership). In one page or a short slide set: give the current quality position in risk-and-delivery terms (not test-case counts), the two or three risks leadership must know about, what you are doing about them, and one clear ask or recommendation. Then add a short reflection on how you would tailor the same message differently for engineering vs product vs executives. Submit as a PDF, DOCX or slides.'),
  (11,
   'Module 11 Assignment — People Development Framework',
   'Create development plans for THREE different team members (use the module''s archetypes or real people, anonymised): for example a strong tester resisting automation, a high performer who disrupts the team, and a junior struggling with confidence. For each: the situation, the specific behaviours/skills to develop, a coaching or performance approach, concrete next steps and how you will follow up — noting where you would involve HR and follow organisational policy. Submit as a PDF or DOCX.'),
  (12,
   'Module 12 Capstone — QA Leadership Transformation Portfolio',
   'FINAL CAPSTONE. You have been appointed Head of QA for Northstar Digital (see the brief: ~120 staff, 35 devs, 6 QA; web + mobile + API; two-week cycles; large manual regression; unreliable UI automation; no agreed QA strategy; rising production defects; poor environments; inconsistent requirements; QA involved late; limited metrics; no career framework; executives want faster releases; engineering wants more automation; AI adoption starting informally). Assemble a complete QA Leadership Transformation Portfolio bringing together your work from the whole programme: (1) Executive Summary; (2) Current-State QA Assessment; (3) QA Maturity Assessment; (4) Quality Risk Profile; (5) QA Strategy; (6) Team Capability Assessment; (7) Skills Matrix; (8) Hiring / Capability Recommendations; (9) Automation Strategy; (10) AI Adoption Strategy; (11) Metrics Framework; (12) Stakeholder Communication Plan; (13) 30/60/90-Day Plan; (14) 12-Month QA Transformation Roadmap; (15) Executive Presentation. This should be substantial enough to discuss in a QA Lead / Test Manager interview. Submit as a PDF, DOCX or a link to a portfolio pack.')
) as v(module_number, title, instructions)
where c.slug = 'qa-leadership-academy'
  and m.module_number = v.module_number
  and not exists (select 1 from public.assignments a where a.module_id = m.id);
