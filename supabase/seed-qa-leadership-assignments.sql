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
   'You are given a product organisation and a fixed budget (see the assignment brief; Northstar Digital is the default). Design the QA capability for it: the roles and skills the organisation actually needs given its risk (not a wish-list of every specialist), a skills matrix with proficiency levels and gap analysis, individual development directions for the existing team, and a simple career-progression outline. Justify every capability choice against organisational risk and the budget. Submit as a PDF or DOCX.')
) as v(module_number, title, instructions)
where c.slug = 'qa-leadership-academy'
  and m.module_number = v.module_number
  and not exists (select 1 from public.assignments a where a.module_id = m.id);
