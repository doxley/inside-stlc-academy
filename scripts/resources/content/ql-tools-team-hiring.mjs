// QA Leadership Academy — Team & Hiring toolkit.
// Genuinely-usable, professional QA-leadership instruments, grounded in the
// Northstar Digital case study. Every tool is a working instrument with a
// completed worked example, a blank reusable version and interpretation guidance.
//
// Case-study roster (the inherited six QA engineers at Northstar Digital):
//   - Sofia Alvarez  — senior exploratory tester, informal team lead (case study)
//   - Dan Whitmore   — automation engineer, owns the flaky UI suite (case study)
//   - Ravi Kapoor    — exploratory tester, strong payments/domain knowledge
//   - Grace Okonkwo  — exploratory tester, web squad
//   - Hassan Malik   — exploratory tester, mobile squad
//   - Emma Clarke    — recent hire, still ramping
// Sofia and Dan are named in the case study; the remaining four complete the
// six-person team the doc describes (4 manual/exploratory, 1 automation, 1 new hire).

const COURSE = 'QA Leadership Academy';

// Reusable reminder for every hiring instrument.
const HR_LEGAL = {
  t: 'callout',
  variant: 'best',
  title: 'HR and legal note',
  text: 'This is a decision-support tool, not legal advice. Always run your process through your own HR/People team and follow local employment law on data handling, right-to-work, records retention, reasonable adjustments and non-discrimination. Ask every candidate for a role the same questions against the same criteria, record the evidence rather than the impression, and keep your notes factual — they may be disclosable.',
};

export default [
  // ─────────────────────────────────────────────────────────────
  // 1. QA Skills Matrix
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'qa-skills-matrix',
    title: 'QA Skills Matrix',
    subtitle: 'Map your team’s real capability across twelve competencies, expose gaps and spot key-person risk before it bites.',
    courseTitle: COURSE,
    category: 'Templates',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'A skills matrix turns vague impressions ("Dan does the automation, Sofia is our strongest tester") into an evidence base you can act on. It plots each engineer against a defined set of competencies using a shared proficiency scale, so you can see where the team is deep, where it is thin, and where a single person is carrying a capability on their own.' },
      { t: 'p', text: 'Used well, it drives three decisions: what to hire for, what to develop, and where to reduce key-person risk.' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'In your first 90 days leading a team, to replace hearsay with a baseline.',
        'Before writing a job description — so you hire for the gap, not for a clone of who you already have.',
        'At planning time, to decide which work only one person can currently do.',
        'Ahead of development conversations, to ground each person’s growth plan in evidence.',
        'Twice a year as a living document — not a one-off audit that rots in a drawer.',
      ] },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'Agree the competencies that matter for your context. Twelve is a sensible ceiling; more becomes noise.',
        'Adopt the behaviourally-anchored 0–4 scale below so a "3" means the same thing for everyone.',
        'Rate on observed behaviour, not job titles or how long someone has been testing.',
        'Have each engineer self-assess first, then calibrate together. The conversation about the gap between the two scores is often more useful than either number.',
        'Roll the ratings up into a gap analysis and a key-person-risk check.',
        'Share it openly with the team. A secret matrix breeds suspicion; a shared one drives development.',
      ] },
      { t: 'h2', text: 'Proficiency scale (behaviourally anchored, 0–4)' },
      { t: 'table', headers: ['Level', 'Label', 'What it looks like in practice'], rows: [
        ['0', 'None', 'No exposure. Cannot yet contribute in this area.'],
        ['1', 'Awareness', 'Can describe the concept and why it matters; needs close guidance to do it. Follows a runbook someone else wrote.'],
        ['2', 'Working', 'Handles routine cases independently; asks for help on the harder ones. Reliable on the day-to-day.'],
        ['3', 'Proficient', 'Handles complex, ambiguous cases independently. Sets the local standard and reviews others’ work in this area.'],
        ['4', 'Expert', 'Defines the approach for the whole org, is the person others are sent to, and actively grows this capability in others.'],
      ] },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'Northstar Digital’s inherited team of six, rated across twelve competencies. Ratings are the lead’s calibrated assessment, not the engineers’ self-scores.' },
      { t: 'table', headers: ['Competency', 'Sofia', 'Dan', 'Ravi', 'Grace', 'Hassan', 'Emma', 'Team high'], rows: [
        ['Exploratory testing', '4', '2', '3', '3', '3', '1', '4'],
        ['Test design techniques', '3', '2', '3', '2', '2', '1', '3'],
        ['UI automation', '1', '3', '1', '2', '1', '1', '3'],
        ['API / contract testing', '2', '2', '2', '1', '2', '1', '2'],
        ['Performance testing', '1', '1', '0', '1', '1', '0', '1'],
        ['Security awareness', '2', '1', '2', '1', '1', '1', '2'],
        ['Accessibility', '1', '0', '1', '2', '1', '1', '2'],
        ['Domain knowledge (payments/finance)', '3', '2', '4', '2', '2', '1', '4'],
        ['Defect analysis & reporting', '3', '2', '3', '2', '2', '1', '3'],
        ['CI/CD & pipelines', '1', '3', '1', '1', '1', '0', '3'],
        ['Stakeholder communication', '3', '1', '2', '2', '2', '1', '3'],
        ['Mentoring & coaching', '3', '1', '2', '1', '1', '0', '3'],
      ] },
      { t: 'h2', text: 'Gap analysis' },
      { t: 'table', headers: ['Competency', 'Team high', 'Read', 'Priority'], rows: [
        ['Performance testing', '1', 'Nobody past Awareness. A genuine capability hole, and the B2B API is being sold against SLAs.', 'High'],
        ['Accessibility', '2', 'Only Grace at Working; no depth. Legal and reputational exposure.', 'Medium'],
        ['CI/CD & pipelines', '3', 'One person (Dan) only. The team cannot maintain or improve the pipeline without him.', 'High'],
        ['UI automation', '3', 'One person (Dan) at Proficient; everyone else at Awareness/Working. The flaky suite has a single owner.', 'High'],
        ['API / contract testing', '2', 'Broad but shallow — nobody at Proficient, despite a public API sold to partners.', 'Medium'],
        ['Mentoring & coaching', '3', 'Concentrated in Sofia. Limits how fast the team can grow itself.', 'Medium'],
      ] },
      { t: 'h2', text: 'Key-person risk' },
      { t: 'ul', items: [
        'Dan is the single point of failure for both UI automation and CI/CD (the only "3" in each). If he leaves — and he is quietly burning out — two capabilities collapse to Awareness overnight. This is the sharpest risk on the board.',
        'Ravi is the only deep source of payments/finance domain knowledge (the only "4"). For a company whose legacy billing monolith is fragile, that is concentrated risk.',
        'Sofia carries mentoring, stakeholder communication and exploratory leadership. She is also the informal lead — a lot of the team’s resilience runs through one person.',
      ] },

      { t: 'h1', text: 'How to interpret the results' },
      { t: 'ul', items: [
        'Read down the columns for people (who is stretched, who is one-dimensional) and across the rows for capability (where the team is deep or exposed).',
        'A row where the team high is 0–1 is a hiring or training decision, not a rota decision — no amount of reshuffling creates a skill nobody has.',
        'A capability held by exactly one person at level 3–4 is key-person risk, regardless of how good that person is. Treat "we’re fine, Dan handles it" as a warning, not reassurance.',
        'Do not chase a matrix of all 4s. A healthy team is deliberately shaped — deep where risk is high, adequate elsewhere. Aim for at least two people at Working-or-above on every business-critical capability (the "bus factor of two" rule).',
      ] },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'table', headers: ['Competency', 'Person 1', 'Person 2', 'Person 3', 'Person 4', 'Team high', 'Gap? (Y/N)'], rows: [
        ['Exploratory testing', '', '', '', '', '', ''],
        ['Test design techniques', '', '', '', '', '', ''],
        ['UI automation', '', '', '', '', '', ''],
        ['API / contract testing', '', '', '', '', '', ''],
        ['Performance testing', '', '', '', '', '', ''],
        ['Security awareness', '', '', '', '', '', ''],
        ['Accessibility', '', '', '', '', '', ''],
        ['Domain knowledge', '', '', '', '', '', ''],
        ['Defect analysis & reporting', '', '', '', '', '', ''],
        ['CI/CD & pipelines', '', '', '', '', '', ''],
        ['Stakeholder communication', '', '', '', '', '', ''],
        ['Mentoring & coaching', '', '', '', '', '', ''],
      ] },
      { t: 'p', text: 'Scoring key: 0 None · 1 Awareness · 2 Working · 3 Proficient · 4 Expert. Add a "Key-person risk" note for any capability held by a single person at level 3–4.' },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Rating on job title or tenure instead of observed behaviour. Scoring everyone generously to avoid awkward conversations, which hides the very gaps the tool exists to find. Treating the matrix as a performance ranking rather than a capability map — it is about the team’s shape, not who is "best". Building it once and never revisiting it. And celebrating a single brilliant specialist while ignoring that they are a single point of failure.' },

      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'The most valuable cell in the matrix is rarely the lowest score — it is the capability held by exactly one person. Fix your key-person risks before you chase your skill gaps: a gap slows you down, but a bus factor of one can stop you dead.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 2. Individual Development Plan
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'individual-development-plan',
    title: 'Individual Development Plan',
    subtitle: 'Turn a skills gap into a specific, time-bound growth plan that the engineer actually owns.',
    courseTitle: COURSE,
    category: 'Templates',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'An Individual Development Plan (IDP) converts "you should grow" into a concrete, agreed set of objectives, actions and success measures for one person over a defined period. It exists to make development deliberate rather than accidental, and to make it the engineer’s plan — co-authored with you, not handed down.' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'After a skills-matrix calibration, to act on what it revealed.',
        'Following a promotion conversation, to define the gap to the next level.',
        'When someone is stalled, bored or at risk of leaving — an IDP is a retention tool as much as a growth tool.',
        'For a new hire, to structure their first six months beyond onboarding.',
        'Reviewed at least quarterly. An IDP set once a year is a formality; one revisited every quarter is a habit.',
      ] },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'Start from evidence (the skills matrix, recent work, the person’s own ambitions), not a template of generic goals.',
        'Pick two to three development areas. More than three and nothing moves.',
        'Write each objective so it is specific and measurable — "reach Working level on API contract testing, evidenced by owning the contract tests for one service" beats "get better at APIs".',
        'For each objective, agree concrete actions, the support you will provide, and how you will both know it is done.',
        'Balance stretch with wellbeing. Development that piles onto an already-overloaded person is a plan to burn them out.',
        'Set review dates and actually keep them.',
      ] },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'An IDP for Dan Whitmore, Northstar’s automation engineer. Context from the skills matrix: he is the sole owner of UI automation and CI/CD (key-person risk), is isolated, is quietly burning out on the flaky Selenium suite, and is weak on stakeholder communication and mentoring. The plan deliberately spreads his load rather than adding to it.' },
      { t: 'table', headers: ['Field', 'Detail'], rows: [
        ['Engineer', 'Dan Whitmore'],
        ['Current role / level', 'Automation Engineer (mid–senior)'],
        ['Period', 'Q3–Q4 (6 months), reviewed monthly'],
        ['Strengths to build on', 'Strong UI automation and CI/CD; genuine enthusiasm for tooling.'],
        ['Career direction', 'Towards a technical leadership / test-architecture path, not people management.'],
      ] },
      { t: 'h2', text: 'Development objective 1 — reduce key-person risk (and his own load)' },
      { t: 'table', headers: ['Element', 'Detail'], rows: [
        ['Objective', 'Move from sole owner to lead-and-teacher of UI automation: at least two other engineers able to run, debug and extend the suite independently.'],
        ['Why', 'Removes the single point of failure the skills matrix flagged, and relieves the workload driving his burnout.'],
        ['Actions', 'Run a fortnightly automation clinic for the team; pair with Grace and Hassan on real failures; document the top-10 flaky tests and the fix pattern for each.'],
        ['Support from lead', 'Protected time (half a day a week ring-fenced); back him publicly so squads treat automation as shared, not "Dan’s job".'],
        ['Success measure', 'Two named engineers merge automation fixes unaided; suite flakiness trend reviewed monthly and moving down.'],
      ] },
      { t: 'h2', text: 'Development objective 2 — stakeholder communication (matrix score 1 → target 2)' },
      { t: 'table', headers: ['Element', 'Detail'], rows: [
        ['Objective', 'Present the automation health picture to the squads in plain, risk-focused language once a fortnight.'],
        ['Actions', 'Co-prepare the first two updates with Sofia; use a simple red/amber/green format; focus on what the flakiness costs the team, not test counts.'],
        ['Support from lead', 'Coaching before each session; introduce him to Priya (VP Eng) so his work is visible upwards.'],
        ['Success measure', 'Delivers two updates solo; a squad lead references the automation health picture in planning without prompting.'],
      ] },
      { t: 'h2', text: 'Wellbeing check (explicit, not an afterthought)' },
      { t: 'ul', items: [
        'Current on-call/maintenance load reviewed and capped while objective 1 spreads ownership.',
        'Monthly one-to-one includes an explicit "how sustainable is your week?" question.',
        'This plan must reduce his total load over six months, not add a third full-time job.',
      ] },

      { t: 'h1', text: 'How to interpret the results' },
      { t: 'ul', items: [
        'Progress is evidenced by changed behaviour and outcomes, not activity. "Ran three clinics" is input; "two engineers now fix automation unaided" is the result.',
        'If an objective has not moved in two consecutive reviews, the blocker is usually time, not will — fix the time.',
        'A completed IDP should visibly reduce a risk on your skills matrix or move someone toward the next rung of your progression framework. If it does neither, it was busywork.',
      ] },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'table', headers: ['Field', 'Detail'], rows: [
        ['Engineer', ''],
        ['Current role / level', ''],
        ['Period / review cadence', ''],
        ['Strengths to build on', ''],
        ['Career direction', ''],
      ] },
      { t: 'p', text: 'Repeat the block below for each of your two or three objectives:' },
      { t: 'table', headers: ['Element', 'Detail'], rows: [
        ['Objective (specific + measurable)', ''],
        ['Why it matters', ''],
        ['Actions', ''],
        ['Support from manager', ''],
        ['Success measure / evidence', ''],
        ['Target date', ''],
      ] },
      { t: 'p', text: 'Always finish with an explicit wellbeing/load check.' },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Setting five objectives so that none of them move. Writing goals so vague ("improve communication") that nobody can tell when they are met. Making it the manager’s plan for the person rather than the person’s plan for themselves. Loading development on top of an already-saturated week and calling the resulting burnout a "motivation problem". Filing it after the meeting and never opening it until the next annual review.' },

      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'The best development plans quietly de-risk the team at the same time as growing the person. Dan’s plan does not just make Dan happier — it dismantles the single point of failure his skills represent. Look for those double wins first.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 3. Team Capability Heatmap
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'team-capability-heatmap',
    title: 'Team Capability Heatmap',
    subtitle: 'Roll a detailed skills matrix up into a one-page red/amber/green view your leadership will actually read.',
    courseTitle: COURSE,
    category: 'Templates',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'A heatmap summarises the team’s capability at the level a busy stakeholder can absorb in thirty seconds: for each capability area, how much coverage there is, how deep it goes, and whether it depends on one person. Where the skills matrix is your working document, the heatmap is your communication and investment-case document.' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'To make the case for a hire or for training budget to a time-poor executive.',
        'In a quarterly business review, to show how the team’s shape is changing.',
        'When a risk (an unstaffed capability, a key-person dependency) needs to be visible to people above you.',
        'As the cover page for a detailed skills matrix — summary first, detail behind it.',
      ] },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'Group your competencies into capability areas that mean something to the business.',
        'For each area, capture three things: Coverage (how many people are at Working or above), Depth (the highest level reached), and Key-person risk (is it held by one person?).',
        'Assign a RAG rating from those three, using the rule below — do not rate on gut feel.',
        'Add a single recommended action per area so the map drives a decision, not just a discussion.',
      ] },
      { t: 'h2', text: 'RAG rule (so ratings are consistent)' },
      { t: 'table', headers: ['Rating', 'Meaning', 'Trigger'], rows: [
        ['Green', 'Healthy', 'Two or more people at Working+, at least one Proficient, no single-person dependency.'],
        ['Amber', 'At risk', 'Adequate today but fragile — either shallow (nobody Proficient) or dependent on one person.'],
        ['Red', 'Exposed', 'Nobody past Awareness, or a business-critical capability with no cover at all.'],
      ] },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'Northstar’s team of six, rolled up from the skills matrix. Coverage counts engineers at Working (2) or above.' },
      { t: 'table', headers: ['Capability area', 'Coverage', 'Depth (high)', 'Key-person risk', 'RAG', 'Recommended action'], rows: [
        ['Exploratory & test design', '5 of 6', 'Expert (Sofia)', 'No', 'Green', 'Protect it; use it to mentor the rest.'],
        ['Functional / defect analysis', '4 of 6', 'Proficient', 'No', 'Green', 'Maintain.'],
        ['UI automation', '2 of 6', 'Proficient (Dan)', 'Yes — Dan only', 'Amber', 'Spread ownership; see Dan’s IDP.'],
        ['CI/CD & pipelines', '1 of 6', 'Proficient (Dan)', 'Yes — Dan only', 'Amber', 'Cross-train urgently; single point of failure.'],
        ['API / contract testing', '4 of 6', 'Working', 'No', 'Amber', 'Grow one person to Proficient; public API sold to partners.'],
        ['Payments / finance domain', '5 of 6', 'Expert (Ravi)', 'Depth on Ravi only', 'Amber', 'Document domain knowledge; reduce reliance on Ravi.'],
        ['Performance testing', '0 of 6', 'Awareness', 'N/A — nobody', 'Red', 'Hire or buy in; needed for the SLA-backed B2B API.'],
        ['Security awareness', '2 of 6', 'Working', 'No', 'Amber', 'Baseline training for all; identify a lead.'],
        ['Accessibility', '1 of 6', 'Working (Grace)', 'Yes — Grace only', 'Red', 'Legal/reputational exposure; build cover.'],
        ['Mentoring & coaching', '2 of 6', 'Proficient (Sofia)', 'Concentrated on Sofia', 'Amber', 'Develop a second coach.'],
      ] },
      { t: 'p', text: 'The one-page story this tells leadership: the team is excellent at manual/exploratory testing and reasonable on domain, but has two Red holes (performance, accessibility) and its automation and pipeline capability hangs entirely off one person who is burning out. That is a clear, evidenced case for a specific kind of hire — not a vague plea for "more testers".' },

      { t: 'h1', text: 'How to interpret the results' },
      { t: 'ul', items: [
        'Red is a decision, not a status. Every Red should have an owner and a date, or it is not being managed.',
        'Amber driven by key-person risk is often more dangerous than Amber driven by shallowness — shallowness degrades gracefully, a single owner leaving does not.',
        'A wall of Green is a signal to check your standards, not to celebrate — either you are genuinely elite or you are grading yourself too kindly.',
        'Use the heatmap to frame investment as risk reduction. "This Red costs us the B2B SLA deal" moves budget; "we’d like more headcount" does not.',
      ] },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'table', headers: ['Capability area', 'Coverage (n at Working+)', 'Depth (high)', 'Key-person risk?', 'RAG', 'Recommended action'], rows: [
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
      ] },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Rating by feel instead of the coverage/depth/key-person rule, so nobody can challenge or reproduce it. Colouring everything amber to look safe, which tells the reader nothing. Presenting the heatmap with no recommended actions, turning a decision tool into decoration. Hiding key-person risk behind a healthy-looking coverage number — "5 of 6" still hides that only one of them has any depth.' },

      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'Executives fund coloured squares they understand far faster than spreadsheets they don’t. Lead with the heatmap, keep the full matrix as your evidence, and always translate a Red into the business outcome it threatens — that is the sentence that unlocks budget.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 4. QA Career Progression Framework
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'career-progression-framework',
    title: 'QA Career Progression Framework',
    subtitle: 'A clear ladder describing what growth looks like at each level — so promotion is earned against evidence, not politics.',
    courseTitle: COURSE,
    category: 'Templates',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'A progression framework describes, level by level, what is expected of a QA engineer — in scope, autonomy, technical depth and influence. It answers the two questions every good engineer eventually asks: "what does the next level actually require of me?" and "how is that judged fairly?" Without one, promotion becomes a matter of who shouts loudest or who happens to be visible to the right manager.' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'When a team has no ladder at all — as at Northstar, where there is no QA career framework.',
        'To anchor development plans (this framework defines the "next level" an IDP aims at).',
        'In promotion cases, to argue from evidence against a shared bar rather than sentiment.',
        'In hiring, to pitch the level of a role accurately and set fair expectations.',
      ] },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'Adopt the levels below or adapt the labels to match your organisation’s existing bands.',
        'For each level, describe behaviour — what the person does — not years of experience.',
        'Make each level a superset of the one below: higher levels widen scope and influence, they do not just "do more testing".',
        'Separate the individual-contributor track (towards test architecture) from the management track (towards leading people). Neither is superior.',
        'Calibrate real people against it as a group, so the bar means the same across the team.',
      ] },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'A four-rung ladder, calibrated against Northstar’s team.' },
      { t: 'table', headers: ['Level', 'Scope', 'Autonomy', 'Technical', 'Influence'], rows: [
        ['QA Engineer (Junior)', 'Own tasks within a story', 'Works with guidance; asks early', 'Executes tests; learning design techniques and tooling', 'Learns from the team'],
        ['QA Engineer', 'Owns testing for a feature', 'Independent on routine work', 'Solid test design; contributes to automation; competent in one specialism', 'Trusted within the squad'],
        ['Senior QA Engineer', 'Owns quality for a squad or a cross-cutting capability', 'Fully autonomous; handles ambiguity', 'Deep in at least one area (e.g. automation, performance); sets local standards', 'Shapes how the squad works; mentors others'],
        ['Lead / Principal QA', 'Owns strategy across squads or a discipline', 'Sets direction; trusted with the hardest problems', 'Architect-level in a discipline; defines org-wide approach', 'Influences engineering leadership; grows other seniors'],
      ] },
      { t: 'h2', text: 'The team, calibrated against the ladder' },
      { t: 'table', headers: ['Engineer', 'Current level', 'Evidence', 'Next-level focus'], rows: [
        ['Emma Clarke', 'QA Engineer (Junior)', 'Still ramping; works with guidance across the board.', 'Reach Working level on core competencies; own a feature end-to-end.'],
        ['Grace Okonkwo', 'QA Engineer', 'Independent on web testing; growing accessibility depth.', 'Deepen one specialism to Proficient to progress toward Senior.'],
        ['Hassan Malik', 'QA Engineer', 'Reliable on mobile; solid exploratory work.', 'Broaden from execution into test design leadership on the squad.'],
        ['Dan Whitmore', 'Senior QA Engineer (technical track)', 'Deep, autonomous on automation and CI/CD.', 'Move from doing to enabling — raise the whole team’s automation; toward Principal.'],
        ['Ravi Kapoor', 'Senior QA Engineer', 'Autonomous; Expert-level payments domain; sets local standards.', 'Convert domain depth into cross-squad influence and documentation.'],
        ['Sofia Alvarez', 'Senior QA Engineer, on the Lead track', 'Owns quality thinking beyond her squad; already the informal lead and mentor.', 'Formalise strategy and stakeholder influence to step up to Lead.'],
      ] },
      { t: 'p', text: 'Note that the ladder holds two distinct senior shapes — Dan on a technical/architecture path and Sofia on a leadership path — at the same level. That is deliberate: not everyone grows by managing people.' },

      { t: 'h1', text: 'How to interpret the results' },
      { t: 'ul', items: [
        'Level is defined by the scope of problem someone owns, not by how many tests they write. A brilliant executor who never widens their scope is a strong QA Engineer, not a Senior one.',
        'People can sit between rungs; the framework names the direction, not a precise coordinate. Use it to describe the gap, then let the IDP close it.',
        'If most of the team clusters at one level, either your bar is wrong or your hiring is one-note — both worth investigating.',
        'Promotion should follow demonstrated behaviour at the next level, not a promise to start behaving that way once promoted.',
      ] },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'table', headers: ['Level', 'Scope', 'Autonomy', 'Technical', 'Influence'], rows: [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
      ] },
      { t: 'p', text: 'Calibration grid — one row per engineer:' },
      { t: 'table', headers: ['Engineer', 'Current level', 'Evidence', 'Next-level focus'], rows: [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
      ] },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Defining levels by years of experience rather than behaviour. Forcing every senior person onto a management track, which pushes strong technical people out the door. Promoting on potential ("they’ll grow into it") and then wondering why the person is struggling. Writing a framework so abstract that two managers reading it would rate the same person differently. Treating the ladder as a one-way ratchet where nobody is ever allowed to be happy and excellent at their current level.' },

      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'The clearest sign your framework works is that an engineer can read it and self-diagnose their own gap to the next level without you in the room. If they need you to interpret it, it is too vague — and vagueness is where bias and favouritism live.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 5. QA Job Description Template
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'qa-job-description-template',
    title: 'QA Job Description Template',
    subtitle: 'Write a job description that attracts the right people, filters honestly, and is grounded in the gap you actually have.',
    courseTitle: COURSE,
    category: 'Templates',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'A job description does three jobs at once: it attracts suitable candidates, it deters unsuitable ones, and it sets the shared criteria the whole panel will hire against. A good one is honest about the role and the challenge; a poor one lists twenty "essential" skills nobody possesses and screens out exactly the people you want.' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'Immediately after a skills-matrix and heatmap review has told you what gap to hire for.',
        'Before any sourcing begins — the JD is the contract the rest of the process is measured against.',
        'When refreshing a stale, generic template that no longer reflects the real role.',
      ] },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'Derive the role from your gap analysis, not from a generic "QA Engineer" boilerplate.',
        'Separate essential from desirable ruthlessly. If a candidate could succeed without it, it is desirable.',
        'Describe success at 3, 6 and 12 months so candidates can picture the actual job.',
        'Be honest about the challenge — the flaky suite, the late involvement — rather than pretending everything is perfect. The right candidate is attracted by a real problem to solve.',
        'Write inclusively: plain language, no unnecessary jargon, a genuine equal-opportunities statement, and encouragement to apply even if not every desirable box is ticked.',
        'Have your HR/People team review it for compliance before it goes out.',
      ] },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'A JD for the hire Northstar’s heatmap actually justifies: a senior engineer who can lift the team’s automation and pipeline capability, reduce the flaky-suite key-person risk on Dan, and strengthen API/contract testing for the SLA-backed public API.' },
      { t: 'table', headers: ['Section', 'Content'], rows: [
        ['Job title', 'Senior QA Engineer (Automation & Continuous Delivery)'],
        ['Reports to', 'QA Lead'],
        ['Role summary', 'You will lead the modernisation of our test automation and help the whole engineering org release faster with less risk. You will inherit a large, flaky UI suite and a semi-automated pipeline, and your mission is to make automation trustworthy and shared — not owned by one person.'],
        ['Key responsibilities', 'Stabilise and re-architect the UI automation suite; build API/contract test coverage for the public API; embed automation ownership across squads through pairing and coaching; improve the CI pipeline and quality gates; work with squads early, not just at code-complete.'],
        ['Essential skills', 'Strong hands-on test automation; solid API/contract testing; comfortable in a CI/CD pipeline; can debug and reduce flaky tests methodically; can teach and pair, not just build alone; clear communicator with engineers and non-engineers.'],
        ['Desirable skills', 'Performance testing exposure; fintech/payments domain; experience taming a legacy suite; React/React Native context.'],
        ['Success at 3 months', 'The top sources of flakiness are identified and a re-architecture plan is agreed; you have paired with at least two engineers on the suite.'],
        ['Success at 6 months', 'Suite flakiness is trending down and at least two other engineers can extend it unaided; contract tests exist for one public-API service.'],
        ['Success at 12 months', 'Automation is a shared team capability, the pre-release regression window is measurably shorter, and quality gates are consistent across squads.'],
        ['How we work', 'Four stream-aligned squads, two-week iterations, hybrid. Real technical debt and real ambition in equal measure — we are honest about both.'],
        ['Inclusive hiring', 'We welcome applicants from all backgrounds and are happy to make reasonable adjustments at any stage. If you meet most of the essentials, please apply even if you do not tick every desirable.'],
      ] },
      HR_LEGAL,

      { t: 'h1', text: 'How to interpret the results' },
      { t: 'ul', items: [
        'If almost nobody applies, your essentials are probably a wish-list. Move most of them to desirable and re-post.',
        'If everyone applies and nobody fits, the role is under-specified — the JD is not doing its filtering job.',
        'A JD that reads like every other QA advert will attract candidates who look like every other application. Specificity is what draws the person who is right for this particular problem.',
      ] },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'table', headers: ['Section', 'Content'], rows: [
        ['Job title', ''],
        ['Reports to', ''],
        ['Role summary', ''],
        ['Key responsibilities', ''],
        ['Essential skills', ''],
        ['Desirable skills', ''],
        ['Success at 3 months', ''],
        ['Success at 6 months', ''],
        ['Success at 12 months', ''],
        ['How we work', ''],
        ['Inclusive hiring statement', ''],
      ] },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Twenty "essential" requirements that no real person satisfies, which disproportionately deters candidates from under-represented groups who tend not to apply unless they match everything. Copying last year’s generic template instead of hiring for this gap. Hiding the real challenge to look attractive, then losing the new hire when reality bites. Gendered or exclusionary language ("rockstar", "ninja", "aggressive"). Skipping the HR/compliance review.' },

      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'Write the "success at 3/6/12 months" section first, then work backwards to the skills. If you cannot describe what good looks like in the role by month three, you do not yet understand the role well enough to hire for it — and no amount of skills bullets will rescue that.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 6. CV Screening Scorecard
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'cv-screening-scorecard',
    title: 'CV Screening Scorecard',
    subtitle: 'Screen applications consistently and bias-aware against the role, so the same evidence gets the same score every time.',
    courseTitle: COURSE,
    category: 'Templates',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'A CV screening scorecard replaces "this one feels strong" with a repeatable rating against the criteria in your job description. It exists to make shortlisting consistent, defensible and fairer — the same CV should score the same regardless of who reads it or which day they read it.' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'At the sift stage, before any interview, to decide who progresses.',
        'Whenever more than one person is screening — the scorecard is what keeps them calibrated.',
        'For any role where you want a defensible, evidence-based shortlist.',
      ] },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'Take your criteria straight from the JD’s essential and desirable lists — do not invent new ones at the sift.',
        'Weight the criteria by how much they matter for this role.',
        'Score each on evidence in the CV using the 0–3 anchors below; write the evidence, not just the number.',
        'Where your process allows, screen with name, photo, age, university and other bias-triggers redacted or ignored — focus on demonstrated skills.',
        'Set a progression threshold before you start reading, so the bar is not moved to fit a favourite.',
        'Keep your notes factual and retain them per your data-retention policy.',
      ] },
      { t: 'h2', text: 'Scoring anchors (0–3)' },
      { t: 'table', headers: ['Score', 'Meaning'], rows: [
        ['0', 'No evidence in the CV.'],
        ['1', 'Weak/indirect evidence — mentioned but not demonstrated.'],
        ['2', 'Clear evidence of doing it.'],
        ['3', 'Strong evidence of leading/owning it, with outcomes.'],
      ] },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'The three candidates for Northstar’s Senior QA Engineer (Automation & CD) role, screened against the JD. Candidate A is a deep automation/SDET specialist; Candidate B is a strong all-round senior tester with fintech domain and leadership but limited automation; Candidate C is a mid-level generalist with good API and CI exposure and strong learning signals.' },
      { t: 'table', headers: ['Criterion (weight)', 'Cand A', 'Cand B', 'Cand C', 'Evidence note'], rows: [
        ['Test automation — essential (x3)', '3', '1', '2', 'A: re-architected a large flaky suite. B: automation only mentioned. C: built UI/API tests on a smaller product.'],
        ['API / contract testing (x2)', '2', '2', '3', 'C: contract testing named explicitly with outcomes.'],
        ['CI/CD pipeline (x2)', '3', '1', '2', 'A: owned pipeline and gates. B: little evidence. C: worked within one.'],
        ['Coaching / spreading ownership (x2)', '1', '3', '2', 'B: led and mentored a team. A: strong solo, thin on teaching. C: some pairing.'],
        ['Communication with non-engineers (x1)', '1', '3', '2', 'B: stakeholder-facing roles. A: little evidence.'],
        ['Domain (fintech/payments) — desirable (x1)', '1', '3', '1', 'B: years in payments.'],
        ['Weighted total (max 33)', '25', '21', '25', 'A and C tie; B trails on the essentials but leads on people/domain.'],
      ] },
      { t: 'p', text: 'Screening read: A and C both clear the bar on the essentials and are worth interviewing; B is strong but weakest on the automation the role is built around — progress B only if you are prepared to reconsider what the role is really for. The scorecard has done its job: it has produced a defensible shortlist, not a winner. The winner is decided later, with more evidence.' },
      HR_LEGAL,

      { t: 'h1', text: 'How to interpret the results' },
      { t: 'ul', items: [
        'The score ranks, it does not decide. Use it to choose who to interview, then gather better evidence live.',
        'A low score on an essential criterion is a harder stop than a high total — a strong average can hide a fatal gap in the one thing the role needs.',
        'A CV screens for what someone has written down, which favours confident self-promoters. Treat a modest CV with the right skills as worth a call, not an automatic reject.',
        'If two screeners disagree by more than one point on a criterion, recalibrate the anchors before continuing.',
      ] },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'table', headers: ['Criterion (weight)', 'Cand 1', 'Cand 2', 'Cand 3', 'Evidence note'], rows: [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['Weighted total', '', '', '', ''],
      ] },
      { t: 'p', text: 'Anchors: 0 none · 1 weak/indirect · 2 clear evidence · 3 strong, with outcomes. Set your progression threshold before reading.' },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Scoring on a vibe and back-filling the numbers. Inventing criteria at the sift that were never in the JD. Letting name, university, career gaps or a non-native writing style sway the score — all classic bias traps. Moving the threshold to admit someone you liked. Rewarding CV-writing skill over actual capability. Screening solo on a contentious role when a second calibrated reader would have caught your blind spot.' },

      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'Decide your progression threshold and weightings before you open a single CV. The moment you set the bar after seeing the applicants, you are no longer screening candidates — you are rationalising the ones you already fancied.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 7. QA Interview Question Bank
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'interview-question-bank',
    title: 'QA Interview Question Bank',
    subtitle: 'Questions grouped by what they reveal — with what a strong versus weak answer sounds like — not trivia to be memorised.',
    courseTitle: COURSE,
    category: 'Templates',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'This bank gives you interview questions organised by the quality they assess — critical thinking, communication, technical depth and learning potential — each paired with what a strong and a weak answer actually sound like. The aim is to probe how someone thinks, not whether they have memorised definitions. Anyone can recite "severity is technical impact, priority is business urgency"; far fewer can reason well about a messy, ambiguous situation.' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'To build a structured interview where every candidate is asked the same core questions.',
        'To prepare a panel so interviewers know what a good answer looks like before they hear one.',
        'To replace trivia rounds ("name the phases of the STLC") with questions that discriminate between capable and less-capable testers.',
      ] },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'Choose two to three questions per area based on what your role most needs.',
        'Ask the same core set of every candidate for the role — that is what makes the comparison fair.',
        'Listen for the reasoning behind the answer and follow up with "why?" and "what would change your mind?".',
        'Score against the strong/weak indicators, not against how confidently the person spoke.',
        'Leave room for the candidate to ask questions — the questions a good tester asks are themselves a signal.',
      ] },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'A selection from the bank, with indicators, as used for Northstar’s automation-focused senior role.' },
      { t: 'h2', text: 'Critical thinking' },
      { t: 'table', headers: ['Question', 'Strong answer', 'Weak answer'], rows: [
        ['We have 1,800 UI automated tests, they take six hours and a quarter of them are flaky. Where do you start?', 'Diagnoses before acting: asks what the flakiness costs, categorises failures by cause, questions whether all 1,800 are worth keeping, and proposes stabilising the highest-value tests first rather than "rewrite it all".', 'Jumps straight to a tool or a rewrite; assumes more tests are always better; no sense of prioritising by value or root cause.'],
        ['A developer says "good developers don’t need a QA team." How do you respond?', 'Engages with the point rather than defending territory; distinguishes testing (an activity everyone shares) from a QA function; argues in terms of risk and outcomes; open to a model where quality is shared.', 'Defensive or dismissive; asserts QA is essential without evidence; treats it as a personal attack.'],
      ] },
      { t: 'h2', text: 'Communication' },
      { t: 'table', headers: ['Question', 'Strong answer', 'Weak answer'], rows: [
        ['A release is at risk on quality but Product wants to ship on the date. How do you have that conversation?', 'Frames residual risk clearly and in business terms; offers options and their trade-offs rather than a flat "no"; makes the risk owner’s decision explicit; stays collaborative.', 'Either caves immediately or blocks flatly; talks in test-case counts rather than risk; makes it a standoff.'],
        ['Explain a flaky test to a non-technical stakeholder.', 'Uses a plain analogy, avoids jargon, focuses on the consequence (wasted time, lost trust) rather than the mechanism.', 'Drowns the listener in technical detail; cannot translate out of engineer-speak.'],
      ] },
      { t: 'h2', text: 'Technical depth' },
      { t: 'table', headers: ['Question', 'Strong answer', 'Weak answer'], rows: [
        ['How do you decide what to automate and what to keep as manual/exploratory?', 'Reasons about value, stability, frequency and cost of the check; knows automation is not free and has a maintenance cost; keeps exploratory testing for the things automation cannot judge.', '"Automate everything" or "automate the regression pack" with no reasoning about cost or value.'],
        ['What makes an automated test suite trustworthy?', 'Talks about reliability (low flakiness), speed, clear failures, shared ownership and being run on every change — not just coverage numbers.', 'Equates trust with a high coverage percentage; no mention of flakiness or ownership.'],
      ] },
      { t: 'h2', text: 'Learning potential' },
      { t: 'table', headers: ['Question', 'Strong answer', 'Weak answer'], rows: [
        ['Tell me about a time you were wrong about a technical decision.', 'Gives a specific example, owns it without defensiveness, and describes what they changed as a result.', 'Cannot think of one, or reframes a strength as a weakness ("I care too much").'],
        ['How did you learn the most recent new tool or technique you picked up?', 'Concrete, recent, self-directed; shows genuine curiosity and a method for learning.', 'Vague, out of date, or entirely dependent on being sent on a course.'],
      ] },
      HR_LEGAL,

      { t: 'h1', text: 'How to interpret the results' },
      { t: 'ul', items: [
        'Reward the quality of reasoning over the neatness of the conclusion. A candidate who reasons well from wrong assumptions is more coachable than one who recites a right answer with no understanding.',
        'A strong answer to the "developer doesn’t need QA" question matters especially at Northstar, where a real squad lead holds exactly that view — map answers back to the actual environment.',
        'Consistent weak answers on learning potential outweigh a strong technical score for a fast-changing role — skills date, the ability to learn does not.',
        'Judge answers against the indicators, not against the most articulate candidate. Fluency is not the same as insight.',
      ] },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'table', headers: ['Area', 'Question', 'Strong answer', 'Weak answer'], rows: [
        ['Critical thinking', '', '', ''],
        ['Communication', '', '', ''],
        ['Technical depth', '', '', ''],
        ['Learning potential', '', '', ''],
      ] },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Trivia questions that reward memorisation over thinking. Asking each candidate a different set, so no fair comparison is possible. Leading the witness ("so you’d automate that, right?"). Scoring confidence and fluency instead of reasoning, which favours the well-rehearsed over the genuinely capable. Gotcha puzzles that test nothing relevant to the job. Never leaving time for the candidate’s own questions.' },

      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'The best follow-up in any QA interview is "what would make you change your mind?" Testers earn their keep by seeking disconfirming evidence — a candidate who can name what would falsify their own answer is showing you exactly the instinct the job needs.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 8. Technical Assessment Rubric
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'technical-assessment-rubric',
    title: 'Technical Assessment Rubric',
    subtitle: 'Score practical exercises against explicit anchors — and know when a take-home is fair and when it is an imposition.',
    courseTitle: COURSE,
    category: 'Templates',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'A technical assessment shows you how a candidate actually works, not just how they talk about working. This rubric gives you explicit scoring criteria and anchors so a practical exercise is marked consistently by anyone on the panel — and it sets out when a take-home task is a reasonable ask and when it disrespects a candidate’s time.' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'For any role where hands-on ability is central and you want evidence beyond conversation.',
        'When more than one assessor marks the same exercise and you need them calibrated.',
        'To make a practical stage defensible and fair rather than a matter of taste.',
      ] },
      { t: 'h2', text: 'Is a take-home reasonable here? (decide before you set one)' },
      { t: 'table', headers: ['Reasonable', 'Unreasonable'], rows: [
        ['Timeboxed to roughly 1–2 hours, and you say so honestly.', 'Open-ended "spend as long as you like" tasks that reward whoever has the most free time.'],
        ['Directly relevant to the job (e.g. review a small test suite, design tests for a spec).', 'Building real product features you could ship — that is unpaid work, never acceptable.'],
        ['Assessed against a shared rubric, feedback offered.', 'Marked on a marker’s whim with no criteria.'],
        ['Flexible timing and a live-exercise alternative for those with caring duties or a day job.', 'A rigid weekend deadline that quietly excludes carers and the already-employed.'],
        ['Offered with a paid option for anything substantial.', 'Hours of unpaid effort with no reciprocity or feedback.'],
      ] },
      { t: 'p', text: 'When in doubt, prefer a short live exercise or a pairing session over a large take-home. A 45-minute paired problem often reveals more than a polished solo submission, and it respects everyone’s time equally.' },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'Choose an exercise that mirrors the real job — for an automation role, reviewing and improving a flaky test beats writing an algorithm.',
        'Give every candidate the same brief, the same time and the same rubric.',
        'Score each criterion 0–4 against the anchors; write a one-line justification per criterion.',
        'Assess reasoning and approach, not just whether the output "works" — how they got there is the point.',
        'Offer brief feedback to every candidate; it is common courtesy and protects your employer brand.',
      ] },
      { t: 'h2', text: 'Scoring anchors (0–4)' },
      { t: 'table', headers: ['Score', 'Meaning'], rows: [
        ['0', 'Absent or fundamentally flawed.'],
        ['1', 'Attempted but weak; misses the point of the exercise.'],
        ['2', 'Competent; does the obvious thing correctly.'],
        ['3', 'Strong; thoughtful, handles edge cases, explains trade-offs.'],
        ['4', 'Exceptional; the approach teaches the panel something.'],
      ] },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'Candidate A’s assessment. The exercise: a 90-minute paired session reviewing a small extract of Northstar’s flaky Selenium suite and proposing how to stabilise it.' },
      { t: 'table', headers: ['Criterion', 'Score', 'Justification'], rows: [
        ['Problem diagnosis', '4', 'Immediately separated flakiness causes (timing, shared test data, environment) rather than treating them as one problem.'],
        ['Test design & coverage judgement', '3', 'Questioned whether all the tests earned their place; proposed deleting low-value ones — unusual and welcome.'],
        ['Code / automation quality', '3', 'Clean, readable fixes; sensible use of explicit waits over sleeps.'],
        ['Trade-off reasoning', '3', 'Weighed stabilise-versus-rewrite and justified stabilising first.'],
        ['Communication during the exercise', '2', 'Solid but occasionally lost the non-specialist observer in detail.'],
        ['Total (max 20)', '15', 'Strong technical showing; communication is the development edge.'],
      ] },
      { t: 'p', text: 'Read: exactly the diagnostic, value-driven automation thinking the role needs, with a known and coachable gap on communicating to a mixed audience.' },
      HR_LEGAL,

      { t: 'h1', text: 'How to interpret the results' },
      { t: 'ul', items: [
        'A high total with a 0 or 1 on a make-or-break criterion is not a pass — read the criteria, not just the sum.',
        'Reward good process on an incomplete solution over a complete solution reached by luck. In testing, how you reason is the skill.',
        'Compare each candidate against the rubric, never against the strongest submission — otherwise your bar drifts with the field.',
        'Use the technical score alongside the behavioural scorecard; a brilliant technician who cannot collaborate may still be the wrong hire for a team that needs shared ownership.',
      ] },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'table', headers: ['Criterion', 'Score (0–4)', 'Justification'], rows: [
        ['Problem diagnosis', '', ''],
        ['Test design & coverage judgement', '', ''],
        ['Code / automation quality', '', ''],
        ['Trade-off reasoning', '', ''],
        ['Communication', '', ''],
        ['Total', '', ''],
      ] },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Take-homes disguised as free labour — building something you could actually ship. Open-ended tasks that reward free time over talent and quietly exclude carers and the employed. Marking on personal taste with no anchors. Judging only whether the output works, ignoring the reasoning that is the real signal. Setting a puzzle unrelated to the job. Never giving feedback, which damages your reputation with every candidate who talks to peers.' },

      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'A 45-minute paired exercise usually out-predicts a polished take-home and treats every candidate’s time as equally valuable. If you find yourself designing a task that would take you a whole evening, you are no longer assessing a tester — you are asking for a favour.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 9. Behavioural Interview Scorecard
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'behavioural-interview-scorecard',
    title: 'Behavioural Interview Scorecard',
    subtitle: 'Assess how someone works with others against anchored criteria — with a filled example, using real evidence not gut feel.',
    courseTitle: COURSE,
    category: 'Templates',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'Most testers are not lost over technical skill — they are lost over how they collaborate, handle conflict, deal with ambiguity and respond to being wrong. This scorecard assesses those behaviours against anchored criteria, using evidence from the candidate’s own examples rather than a general impression of whether they seemed "nice".' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'In a structured behavioural round, asking for real past examples (the STAR shape: situation, task, action, result).',
        'Whenever a role depends on collaboration — which, in a centralised QA team pulled into squads, is every role.',
        'To give the panel a shared language for "culture fit" that is about behaviour, not similarity to themselves.',
      ] },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'Pick the four to six behaviours the role actually needs and ask every candidate for a real example of each.',
        'Probe for the candidate’s specific actions — "what did you personally do?" — not what "the team" did.',
        'Score each behaviour 1–4 against the anchors; capture the evidence, not just the number.',
        'Distinguish culture add from culture fit: look for people who strengthen the team, not merely people who resemble it. "Fit" used loosely is where bias hides.',
        'Calibrate as a panel afterwards, comparing evidence rather than gut feelings.',
      ] },
      { t: 'h2', text: 'Scoring anchors (1–4)' },
      { t: 'table', headers: ['Score', 'Meaning'], rows: [
        ['1', 'Concerning — example reveals a red flag (blame, rigidity, no self-awareness).'],
        ['2', 'Adequate — handled it acceptably but without much insight.'],
        ['3', 'Strong — clear, self-aware, constructive; a good example.'],
        ['4', 'Exceptional — handled a genuinely hard situation with maturity others could learn from.'],
      ] },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'A filled scorecard for Candidate B (the experienced, people-strong senior tester) for Northstar’s role. Northstar’s environment is politically real — a sceptical payments lead, a burnt-out automation engineer, a wary informal lead — so collaboration under tension matters a great deal.' },
      { t: 'table', headers: ['Behaviour', 'Score', 'Evidence from their example'], rows: [
        ['Collaboration across teams', '4', 'Described winning over a resistant dev team by embedding with them and shipping a shared quality gate — directly relevant to Marcus’s scepticism at Northstar.'],
        ['Handling conflict / disagreement', '3', 'Gave a concrete example of disagreeing with a product manager on a release, framed as risk, reached a joint decision.'],
        ['Dealing with ambiguity', '3', 'Comfortable describing how they proceeded with unclear requirements by making assumptions explicit and checking them.'],
        ['Ownership & accountability', '3', 'Owned a released defect openly and drove the process fix, no blame-shifting.'],
        ['Growth mindset / coachability', '2', 'Answered the "time you were wrong" question but stayed a little defensive; example was fairly minor.'],
        ['Mentoring / growing others', '4', 'Rich, specific examples of levelling up junior testers — addresses the mentoring concentration risk on Sofia.'],
        ['Total (max 24)', '19', 'Exceptional on collaboration and mentoring; the softest note is coachability, worth probing at final stage.'],
      ] },
      { t: 'p', text: 'Read: B would strengthen the team’s culture and directly ease two of its people risks (dev scepticism, mentoring concentration) — which is precisely why the final decision is not a simple one, given B’s weaker automation. Behavioural strength and technical fit pull in different directions here.' },
      HR_LEGAL,

      { t: 'h1', text: 'How to interpret the results' },
      { t: 'ul', items: [
        'A single 1 on a critical behaviour (say, blame under pressure) can outweigh a high total — behavioural red flags scale badly once someone is in the team.',
        'Reward candidates who can describe being wrong and what they changed; inability to do so is itself a low coachability signal.',
        'Beware scoring "like me" as "strong". If every high scorer resembles the existing team, you are measuring similarity, not capability.',
        'Read behavioural scores together with the technical rubric — the two together, weighted against your real gap, feed the final decision matrix; neither decides alone.',
      ] },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'table', headers: ['Behaviour', 'Score (1–4)', 'Evidence'], rows: [
        ['Collaboration across teams', '', ''],
        ['Handling conflict / disagreement', '', ''],
        ['Dealing with ambiguity', '', ''],
        ['Ownership & accountability', '', ''],
        ['Growth mindset / coachability', '', ''],
        ['Mentoring / growing others', '', ''],
        ['Total', '', ''],
      ] },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Scoring likeability instead of behaviour. Accepting hypothetical answers ("I would...") instead of pressing for real past examples. Using "culture fit" as cover for hiring people who look and sound like the panel. Letting one glowing story halo the whole score. Failing to probe how someone handled being wrong. Skipping panel calibration, so each interviewer quietly applies a different bar.' },

      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'Hire for culture add, not culture fit. The question is not "would they blend in?" but "what does this person make the team capable of that it is not capable of today?" A team of six people who all think alike has a bus factor problem of a different kind.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 10. Final Candidate Decision Matrix
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'final-candidate-decision-matrix',
    title: 'Final Candidate Decision Matrix',
    subtitle: 'Bring every stage together and weight it against the gap you actually have — revealing that there is rarely one right answer.',
    courseTitle: COURSE,
    category: 'Templates',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'The decision matrix consolidates every stage — screening, technical, behavioural, references — into one weighted comparison, with the weights driven by the gap on your skills matrix and heatmap. Its real value is not that it picks a winner, but that it makes the trade-offs explicit, so the panel argues about weightings (a strategy question) rather than about people (a preference question).' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'At the final decision, once all candidates have completed the same stages.',
        'When a panel is split and needs to surface why they disagree.',
        'Whenever you want a defensible, evidence-based hiring decision on record.',
      ] },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'List the criteria that matter for this hire, drawn from the JD and your capability gaps.',
        'Set weights from the team’s real need — and be explicit that changing the weights can change the winner. That is a feature, not a flaw.',
        'Bring in each candidate’s scores from the earlier stages rather than re-judging from memory.',
        'Compute weighted totals, then run a second weighting that reflects a different but legitimate strategy, and see whether the answer moves.',
        'Discuss the trade-offs the numbers expose; let the panel decide with eyes open. The matrix informs judgement, it does not replace it.',
        'Record the decision and the reasoning, in line with your data-retention policy.',
      ] },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'Northstar’s three finalists, scored 1–5 per criterion. Candidate A: deep automation/SDET specialist. Candidate B: strong all-round senior with fintech domain, leadership and mentoring, weaker automation. Candidate C: mid-level generalist, good API/CI, strong learning potential and communication, less senior.' },
      { t: 'h2', text: 'Weighting 1 — "fix the burning platform" (weight the immediate risk: flaky suite, Dan’s key-person risk)' },
      { t: 'table', headers: ['Criterion (weight)', 'Cand A', 'Cand B', 'Cand C'], rows: [
        ['Automation depth (x3)', '5', '2', '3'],
        ['CI/CD & pipeline (x3)', '5', '2', '3'],
        ['API / contract testing (x2)', '3', '3', '4'],
        ['Coaching / spreading ownership (x2)', '2', '5', '3'],
        ['Communication (x1)', '2', '5', '4'],
        ['Domain (fintech) (x1)', '2', '5', '2'],
        ['Weighted total (max 60)', '46', '39', '43'],
      ] },
      { t: 'p', text: 'Under this weighting, Candidate A wins — the specialist who can most quickly stabilise the suite and pipeline.' },
      { t: 'h2', text: 'Weighting 2 — "build a resilient team" (weight long-term resilience: reduce key-person risk, grow the team, ease the dev/QA rift)' },
      { t: 'table', headers: ['Criterion (weight)', 'Cand A', 'Cand B', 'Cand C'], rows: [
        ['Automation depth (x2)', '5', '2', '3'],
        ['CI/CD & pipeline (x2)', '5', '2', '3'],
        ['API / contract testing (x2)', '3', '3', '4'],
        ['Coaching / spreading ownership (x3)', '2', '5', '3'],
        ['Communication (x2)', '2', '5', '4'],
        ['Domain (fintech) (x2)', '2', '5', '2'],
        ['Weighted total (max 65)', '40', '48', '43'],
      ] },
      { t: 'p', text: 'Under this weighting, Candidate B wins — the collaborator and mentor who reduces the team’s people risks, even though they would not personally rebuild the suite fastest. And Candidate C sits second in both scenarios: never the top pick, but the lowest-regret choice if the panel cannot agree on strategy.' },
      { t: 'h2', text: 'The point' },
      { t: 'p', text: 'There is no universal right answer. A is right if the priority is stopping the bleeding now; B is right if the priority is a resilient, well-mentored team that fixes the culture that produced the flaky suite; C is the safe compromise. The matrix does not tell Northstar who to hire — it forces the panel to decide what problem they are hiring to solve, which is the decision that actually matters. Choose the weighting deliberately, then let it choose the candidate.' },
      HR_LEGAL,

      { t: 'h1', text: 'How to interpret the results' },
      { t: 'ul', items: [
        'If the winner flips when you change legitimate weightings, the honest conclusion is "we must decide our strategy first", not "the tool is broken".',
        'A candidate who is second under every reasonable weighting is often the lowest-risk hire, even if never anyone’s first choice.',
        'Never let the arithmetic overrule a serious, evidenced concern (a behavioural red flag, a failed reference). The matrix ranks, humans decide.',
        'Beware tuning the weights until your favourite wins — set them from the gap analysis before you compute, and change them only for a stated strategic reason.',
      ] },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'table', headers: ['Criterion (weight)', 'Cand 1', 'Cand 2', 'Cand 3'], rows: [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['Weighted total', '', '', ''],
      ] },
      { t: 'p', text: 'Run it twice under two legitimate weightings and compare. If the answer is stable, decide with confidence; if it flips, decide your strategy first.' },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Reverse-engineering the weights until the preferred candidate wins. Treating the total as a verdict and switching off your judgement. Re-scoring from memory at the final stage instead of carrying evidence forward. Weighting for a generic "great tester" rather than your actual gap. Ignoring that a flipping winner is telling you the panel has not agreed what the role is for. Overruling a red flag because the number was high.' },

      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'When the matrix keeps changing its mind, stop tuning the numbers and ask the panel one question: "what is the single most important problem this hire must solve in the next six months?" Agree that, and the weights — and the candidate — usually settle themselves.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 11. QA Onboarding Checklist
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'onboarding-checklist',
    title: 'QA Onboarding Checklist',
    subtitle: 'Get a new QA engineer productive, connected and confident across their first 90 days — without overwhelming them on day one.',
    courseTitle: COURSE,
    category: 'Checklists',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'Onboarding is where a good hiring decision is either realised or wasted. This checklist structures a new QA engineer’s first 90 days so they gain access, context and relationships in a sensible order — and so their manager, not the new starter, owns the plan. A strong first three months turns a promising hire into a contributing team member; a chaotic one turns them into a flight risk.' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'From the moment an offer is accepted — pre-arrival preparation is part of onboarding.',
        'For every new QA hire, adapted to their level and specialism.',
        'As a shared document between the new starter, their manager and their buddy, reviewed at 30, 60 and 90 days.',
      ] },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'Assign a named buddy before day one — someone other than the manager for day-to-day questions.',
        'Sequence learning: context and relationships first, meaningful contribution second. Do not drop the hardest problem on them in week one.',
        'Give an early, safe, real win — something shippable and low-risk — to build confidence and momentum.',
        'Check in deliberately at 30/60/90 days against the checklist, not just when something goes wrong.',
        'Treat completion as the new starter’s success being visible to the team, not as a box-ticking exercise for HR.',
      ] },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'An onboarding plan for Northstar’s new Senior QA Engineer (Automation & CD). Buddy: Sofia Alvarez. Deliberately, the flaky Selenium suite — the reason they were hired — is studied in month one but not owned until they have context, so they change it from understanding rather than on day three.' },
      { t: 'h2', text: 'Pre-arrival' },
      { t: 'ul', items: [
        'Laptop, accounts and tooling requested (Jira, repo, CI, staging) so nothing is blocked on day one.',
        'Buddy (Sofia) and manager 1:1s booked in the calendar in advance.',
        'A written first-week plan shared before they start, so the unknown feels smaller.',
        'Team told who is joining, when, and why — so they are welcomed, not a surprise.',
      ] },
      { t: 'h2', text: 'Week 1 — context and belonging' },
      { t: 'ul', items: [
        'Access confirmed working end to end (can run the app, view the pipeline, open a ticket).',
        'Met the QA team (Sofia, Dan, Ravi, Grace, Hassan, Emma) and understands who does what.',
        'Walked the products (web SPA, mobile app, public API) and the payments/legacy-billing landscape at a high level.',
        'Shadowed a release and seen the 5-day regression pass first-hand — the problem they are here to help with.',
        'One small, safe first contribution merged (e.g. fixing a single flaky test with Dan pairing).',
      ] },
      { t: 'h2', text: 'Days 30 — orientation complete' },
      { t: 'ul', items: [
        'Understands the current automation suite, its structure and its main pain points.',
        'Has paired with Dan on the suite and with an exploratory tester on a squad.',
        'Understands each squad’s "definition of done" and where they differ.',
        'Has met key stakeholders beyond QA (Priya, VP Eng; a squad lead — including the QA-sceptical Marcus).',
        '30-day check-in held: what is clear, what is confusing, what is blocked.',
      ] },
      { t: 'h2', text: 'Days 60 — contributing' },
      { t: 'ul', items: [
        'Owns a defined slice of the automation work with a clear first improvement in flight.',
        'Running the fortnightly automation clinic jointly with Dan, beginning to spread ownership.',
        'Trusted to test independently within at least one squad.',
        '60-day check-in held against the role’s 3-month success measures.',
      ] },
      { t: 'h2', text: 'Days 90 — established' },
      { t: 'ul', items: [
        'Delivered a visible improvement (e.g. the worst flaky tests stabilised or removed).',
        'At least one other engineer now more confident in the suite thanks to their coaching.',
        'Working relationship established even with the sceptics; seen as a help, not an overhead.',
        '90-day review: confirm the hire is on track, set the first IDP, agree the next quarter’s focus.',
      ] },

      { t: 'h1', text: 'How to interpret the results' },
      { t: 'ul', items: [
        'Onboarding is going well when the new starter is asking sharper questions over time and needing the buddy less — not when every box is ticked on schedule.',
        'A confident early contribution matters more than speed. Someone shipped a real fix in week one and understands why beats someone who has read every document and touched nothing.',
        'If they are still blocked on access or unclear on their remit at 30 days, that is a management failure, not a slow hire — fix it before it becomes a retention problem.',
        'A weak first 90 days predicts a short tenure. Treat this checklist as protecting the hiring investment you just made, not as paperwork.',
      ] },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'ul', items: [
        'Pre-arrival: equipment and access requested · buddy assigned · 1:1s booked · first-week plan shared · team informed.',
        'Week 1: access verified · met the team · product & architecture walkthrough · shadowed a release · first safe contribution.',
        'Day 30: understands the systems · paired across roles · knows each team’s definition of done · met key stakeholders · 30-day check-in.',
        'Day 60: owns a defined slice of work · contributing to team improvement · testing independently · 60-day check-in.',
        'Day 90: delivered a visible win · helping others grow · relationships established · 90-day review and first IDP set.',
      ] },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Access and tooling not ready on day one, so the first week is wasted waiting. Dropping the hardest problem (the flaky suite) on someone before they have any context. No buddy, so every trivial question has to go to the manager. Death by documentation with no real contribution for weeks. Skipping the 30/60/90 check-ins until something is already wrong. Treating onboarding as HR’s job rather than the manager’s.' },

      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'Engineer one genuine, shippable win in the first week — even a single flaky test fixed with a colleague pairing. Nothing builds a new hire’s confidence, or the team’s confidence in them, faster than an early contribution they can point to and say "I did that".' },
    ],
  },
];
