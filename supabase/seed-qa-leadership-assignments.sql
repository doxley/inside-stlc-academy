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
   'Using the release scenario in the brief (deadline tomorrow: 2 critical scenarios untested, 14 medium defects open, 1 intermittent payment issue, 90% of regression passed — or a real situation you know), produce a release risk recommendation aimed at the accountable business stakeholder. Assess and rank the risks by probability and impact (business, customer, technical, compliance, reputational), state the residual risk clearly, give options with mitigations, and make a clear recommendation — while leaving the go/no-go decision with the business. Write it as something you would actually present. Submit as a PDF or DOCX.')
) as v(module_number, title, instructions)
where c.slug = 'qa-leadership-academy'
  and m.module_number = v.module_number
  and not exists (select 1 from public.assignments a where a.module_id = m.id);
