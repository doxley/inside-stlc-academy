// ISTQB Foundation Masterclass — Module 7: Defect Management.
// Full lesson content (base fields + enhancements). Syllabus-accurate + real-world.
export default {
  courseSlug: 'istqb-foundation-masterclass',
  moduleNumber: 7,
  lessonsPrefix: 'istqb',
  enhPrefix: 'istqb',
  enhSep: '-',
  lessons: [
    {
      lessonNumber: 1,
      title: 'The Defect Lifecycle',
      estimatedTime: '14 minute read',
      lessonOverview: `Every defect you log travels through a series of states from the moment it's found to the moment it's closed. Knowing that lifecycle is how you keep bugs from getting lost.`,
      learningObjectives: ['Name the states a defect passes through', 'Explain who owns a defect at each state', 'Describe how a defect is closed or rejected'],
      lessonNotes: `## Why a defect needs a lifecycle
A defect (also called a **bug** or **fault**) is a flaw in a component or system that can cause it to fail. Once you report one, it must be tracked to resolution — not left to drift. A **defect management** process gives every defect a defined state so nothing is lost.

## The typical states
Most tools follow a similar flow:
1. **New / Open** — logged by the tester, not yet reviewed.
2. **Assigned** — accepted and given to a developer.
3. **In Progress** — the developer is fixing it.
4. **Fixed / Resolved** — the developer believes it's done.
5. **Retest / Verify** — the tester re-tests the fix.
6. **Closed** — the fix is confirmed; the defect is done.
7. **Reopened** — retesting failed, so it goes back.
8. **Rejected / Deferred** — not a defect, a duplicate, or postponed.

## Ownership moves
The defect's **owner** changes as its state changes: the tester owns it when reporting and retesting; the developer owns it while fixing. A defect is only truly finished when a tester has **confirmed** the fix, not when a developer says it's done.

## Why testers care
Clear states give traceability and reliable metrics — how many defects are open, fixed but unverified, or reopened. That data drives release decisions.`,
      workedExample: `A tester logs a login bug (**New**). A triage meeting accepts it and assigns it to a developer (**Assigned → In Progress**). The developer pushes a fix and marks it **Fixed**. The tester retests, login now works, and marks it **Closed**. Had login still failed, the tester would mark it **Reopened** and it would return to the developer.`,
      commonMistakes: `- Treating "Fixed" as the end — only a confirmed retest closes a defect
- Letting defects sit in "New" with no triage or owner
- Reopening endlessly instead of logging a fresh, well-scoped defect`,
      realWorldTip: `The state that quietly kills projects is "Fixed but not retested". Watch that column — a pile of unverified fixes is risk hiding in plain sight.`,
      exercise: `List the states a defect passes through from first report to closed, in order.`,
      reflectionQuestion: `Who confirms a defect is truly resolved — the developer or the tester?`,
      knowledgeCheck: `In the defect lifecycle, who confirms a defect is truly resolved before it is closed? (Answer: the tester, by retesting the fix)`,
      completionChecklist: ['I can name the defect lifecycle states in order', 'I know how ownership changes across states', 'I understand why only a confirmed retest closes a defect'],
      enhancements: {
        industryStory: `On one project the developers were proud of "zero open defects" — until we looked closer. Forty bugs sat in "Fixed", none retested. When we finally verified them, a third failed and reopened. The board looked green; the product wasn't. A lifecycle only protects you if every state is honoured.`,
        visualAid: { type: 'timeline', title: 'A defect from find to close', steps: [{ label: 'New', detail: 'tester logs the defect' }, { label: 'Assigned', detail: 'triage accepts, gives to a developer' }, { label: 'In Progress', detail: 'developer fixes it' }, { label: 'Fixed', detail: 'developer marks it resolved' }, { label: 'Retest', detail: 'tester verifies the fix' }, { label: 'Closed', detail: 'confirmed — or Reopened if it fails' }] },
        davidTip: `I tell every new tester: a defect is not "done" when a developer closes it, it's done when *you* have retested it and watched the failure not happen. Guard the Closed state jealously — it's your signature on the quality of the release.`,
        miniChallenge: `Sketch the defect lifecycle for a bug that gets fixed, but fails retest the first time and passes the second. Name every state it touches.`,
        modelAnswer: `## Example\nNew → Assigned → In Progress → Fixed → Retest (fails) → Reopened → Assigned → In Progress → Fixed → Retest (passes) → Closed. The Reopened loop is where honest lifecycles differ from optimistic ones.`,
        resourcePreview: { name: 'Defect Lifecycle Reference Card', purpose: 'One-page map of every defect state and who owns it.', whenToUse: 'Keep it open through Module 7.', formats: ['PDF'] },
      },
    },
    {
      lessonNumber: 2,
      title: 'Defect Severity',
      estimatedTime: '13 minute read',
      lessonOverview: `Severity measures how badly a defect hurts the system. It's one half of the pair testers use to describe a defect — and it's easy to confuse with priority.`,
      learningObjectives: ['Define severity as impact on the system', 'Apply a severity scale to real defects', 'Distinguish severity from priority'],
      lessonNotes: `## What severity means
**Severity** describes the **impact of a defect on the system** — how serious the failure is from a technical or functional point of view. It answers: *how much damage does this do when it occurs?* It is an objective, technical judgement made largely by the tester.

## A typical severity scale
- **Critical** — the system crashes, data is lost or corrupted, a core function is completely unusable.
- **Major / High** — a key feature is broken with no easy workaround.
- **Moderate / Medium** — a feature misbehaves but a workaround exists.
- **Minor / Low** — a small issue, e.g. layout, that doesn't block use.
- **Cosmetic / Trivial** — spelling, alignment, colour.

## Severity is independent of priority
Severity is about **impact**; priority (next lesson) is about **urgency to fix**. They are set separately and can differ. A crash on a screen no one uses may be high severity but low priority. A misspelled company name on the homepage may be low severity but high priority.

## Why testers assign it
Severity is usually the tester's call because you saw the failure and understand its technical impact. An accurate severity helps triage rank work and helps managers judge release risk.`,
      workedExample: `An e-commerce checkout throws a 500 error and no order can be placed — that's **Critical**: a core function is completely unusable and revenue stops. Compare a slightly misaligned footer icon: **Cosmetic**. Same product, wildly different severity, because severity is purely about impact on the system.`,
      commonMistakes: `- Confusing severity (impact) with priority (urgency) — they are separate
- Marking everything "Critical" so nothing stands out
- Basing severity on how annoyed you are rather than actual system impact`,
      realWorldTip: `Severity is your objective, technical read on the damage. Keep it honest even when you're frustrated — inflating severity erodes your credibility fast.`,
      exercise: `Assign a severity to each: (a) app crashes on login, (b) typo in a tooltip, (c) discount applies but the total isn't recalculated.`,
      reflectionQuestion: `Does severity describe the impact on the system, or the urgency to fix it?`,
      knowledgeCheck: `What does the severity of a defect describe? (Answer: the impact of the defect on the system)`,
      completionChecklist: ['I can define severity as impact on the system', 'I can apply a severity scale', 'I can keep severity distinct from priority'],
      enhancements: {
        industryStory: `A junior tester logged every visual glitch as "Critical" because each one annoyed him. Within a week the developers stopped trusting his severity ratings and triaged his defects last — including a genuine data-loss bug buried in the noise. Calibrated severity is a form of professional credibility.`,
        visualAid: { type: 'comparison', title: 'A severity scale', headers: ['Severity', 'Meaning', 'Example'], rows: [['Critical', 'Crash / data loss / core function dead', 'Checkout returns 500'], ['Major', 'Key feature broken, no workaround', 'Search returns no results'], ['Moderate', 'Feature faulty, workaround exists', 'Filter works only via URL'], ['Minor', "Small issue, doesn't block use", 'Date shows US format'], ['Cosmetic', 'Visual / text only', 'Misaligned icon']] },
        davidTip: `Severity is the one field where I want testers to be almost coldly objective. It's not "how much this bothers me" — it's "how much this hurts the system". Rate it the same way whether you found it on a good day or a bad one.`,
        miniChallenge: `Assign a severity to each: (a) the app crashes on login, (b) a typo in a tooltip, (c) a discount applies but the order total isn't recalculated.`,
        modelAnswer: `## Example\n(a) **Critical** — no one can log in; core function dead. (b) **Cosmetic** — text only, no functional impact. (c) **Major** — customers are charged the wrong amount, a serious functional fault with no clean workaround.`,
      },
    },
    {
      lessonNumber: 3,
      title: 'Defect Priority',
      estimatedTime: '13 minute read',
      lessonOverview: `Priority answers a different question from severity: not how bad the defect is, but how soon it must be fixed. Getting this pair right is core ISTQB knowledge.`,
      learningObjectives: ['Define priority as urgency to fix', 'Explain why severity and priority are independent', 'Give examples of each severity/priority combination'],
      lessonNotes: `## What priority means
**Priority** describes the **urgency to fix a defect** — the order in which defects should be addressed. It answers: *how soon does this need attention?* Priority is a **business decision** as much as a technical one, usually set or confirmed in triage by a product owner or test lead, informed by the tester's input.

## A typical priority scale
- **P1 / Urgent** — fix immediately, often blocks release.
- **P2 / High** — fix soon, in this release.
- **P3 / Medium** — fix when convenient.
- **P4 / Low** — fix if time allows; may be deferred.

## Severity and priority are independent
This is the classic exam point: **severity is impact on the system; priority is urgency to fix; they are set independently and can differ.** All four combinations are real:
- **High severity, high priority** — checkout crash on launch day.
- **High severity, low priority** — crash in an admin tool used once a year.
- **Low severity, high priority** — company name misspelt on the homepage.
- **Low severity, low priority** — minor typo on a rarely-visited page.

## Why the split matters
Separating impact from urgency lets a business schedule fixes rationally. A cosmetic bug can outrank a crash if it's on the front page during a big launch.`,
      workedExample: `The CEO's name is misspelt in the homepage banner the morning of a product launch. Technically it's just text — **low severity**. But it's embarrassing, public, and time-sensitive — **high priority (P1)**. Meanwhile a rare crash in an internal report used once a quarter might be **high severity, low priority**. Same team, opposite rankings.`,
      commonMistakes: `- Assuming high severity always means high priority — it doesn't
- Letting the tester set priority alone; it's a business call made in triage
- Treating priority as fixed forever rather than something triage can re-rank`,
      realWorldTip: `Suggest a priority based on business impact, but expect it to be adjusted in triage. Priority belongs to the business; severity belongs to you.`,
      exercise: `Give a real example of each: high severity/low priority, and low severity/high priority.`,
      reflectionQuestion: `Can a low-severity defect ever have a high priority? Give a reason.`,
      knowledgeCheck: `What does the priority of a defect describe, and is it the same as severity? (Answer: priority is the urgency to fix; it is independent of severity, which is impact on the system)`,
      completionChecklist: ['I can define priority as urgency to fix', 'I can explain why severity and priority are independent', 'I can give an example of each combination'],
      enhancements: {
        industryStory: `Launch morning, a partner's brand name was misspelt on our landing page. Severity? Trivial — one wrong letter. Priority? The highest of the day. We stopped a "critical" back-end refactor to fix a typo, and it was absolutely the right call. That's the day the severity-versus-priority distinction finally clicked for the whole team.`,
        visualAid: { type: 'comparison', title: 'Severity vs Priority — the four combinations', headers: ['', 'Low priority', 'High priority'], rows: [['High severity', 'Crash in a yearly admin tool', 'Checkout crash on launch day'], ['Low severity', 'Typo on a rarely-seen page', 'CEO name misspelt on homepage']] },
        davidTip: `I coach testers to state severity confidently and *propose* priority humbly. You own the technical impact assessment; the business owns the schedule. Bring the evidence, then let triage make the urgency call.`,
        miniChallenge: `Invent one realistic defect for each of the four severity/priority combinations. One line each.`,
        modelAnswer: `## Example\nHigh sev / high pri: payment fails for all users on release day. High sev / low pri: crash in a legacy export nobody uses. Low sev / high pri: wrong price shown in a launch-day advert banner. Low sev / low pri: extra space in a footer link.`,
      },
    },
    {
      lessonNumber: 4,
      title: 'Root Cause Analysis',
      estimatedTime: '14 minute read',
      lessonOverview: `Fixing a defect stops one failure. Understanding why it happened stops a whole class of them. Root cause analysis is how testing feeds back into process improvement.`,
      learningObjectives: ['Distinguish error, defect and failure', 'Explain the purpose of root cause analysis', 'Apply a simple technique such as the Five Whys'],
      lessonNotes: `## Error, defect, failure
ISTQB is precise here:
- An **error (mistake)** is a human action that produces an incorrect result — a developer misreads a requirement.
- That mistake introduces a **defect (fault/bug)** in the code or document.
- When executed, the defect may cause a **failure** — the system behaving incorrectly.
Root cause analysis works *backwards* from the failure to the underlying cause.

## What root cause analysis is
**Root cause analysis (RCA)** looks beyond the immediate defect to the deeper reason it existed — the process gap, missing requirement, or misunderstanding. The goal isn't blame; it's **prevention**: fixing the cause so similar defects don't recur.

## A simple technique: Five Whys
Ask "why?" repeatedly until you reach a process cause:
1. Why did checkout fail? A null price was returned.
2. Why? The discount service returned nothing for expired codes.
3. Why? That case was never specified.
4. Why? The requirement didn't cover expiry.
5. Why? Requirements weren't reviewed for edge cases.
Root cause: **no review step for requirement edge cases** — a process fix, not just a code fix.

## Why it matters
RCA turns individual bugs into lessons. Patterns across many defects reveal weak points — a shaky module, an unclear spec, a missing review — and drive real quality improvement.`,
      workedExample: `A payment bug is traced with Five Whys to an unreviewed requirement that omitted the "expired card" case. The immediate fix is a code change; the root-cause fix is adding an edge-case review to requirements sign-off. Six similar defects vanish because the process, not just the code, was corrected.`,
      commonMistakes: `- Stopping at the code fix and never asking why the defect existed
- Using RCA to assign blame instead of improving the process
- Confusing the failure (symptom) with the error (the human mistake behind it)`,
      realWorldTip: `Run lightweight RCA on your worst defects, not every one. A pattern across five bugs teaches you more than a deep dive into one.`,
      exercise: `Take a bug you know and run the Five Whys until you reach a process-level cause.`,
      reflectionQuestion: `In ISTQB terms, what is the difference between an error, a defect and a failure?`,
      knowledgeCheck: `In ISTQB terms, an error (human mistake) introduces a defect, which when executed may cause what? (Answer: a failure)`,
      completionChecklist: ['I can distinguish error, defect and failure', 'I can explain the purpose of root cause analysis', 'I can run a simple Five Whys'],
      enhancements: {
        industryStory: `We kept getting null-pointer crashes across totally different features. Fixing each one took minutes; they never stopped. One afternoon of Five Whys on three of them pointed to the same root cause — a shared utility that returned null instead of an empty list, and a spec that never said which. One fix to the utility and one line in the coding standard ended a month of whack-a-mole.`,
        visualAid: { type: 'timeline', title: 'From mistake to prevention', steps: [{ label: 'Error', detail: 'a human makes a mistake' }, { label: 'Defect', detail: 'the mistake becomes a fault in code/docs' }, { label: 'Failure', detail: 'the defect causes wrong behaviour' }, { label: 'RCA', detail: 'ask why until you reach the cause' }, { label: 'Prevent', detail: 'fix the process, not just the code' }] },
        davidTip: `RCA is where testers stop being bug-finders and start being quality engineers. When you can walk a failure back to a missing review step, you're improving the whole system, not just patching one hole.`,
        miniChallenge: `Take a defect you know well and run the Five Whys on it. Write each "why" and answer until you reach a process-level cause, not just a code-level one.`,
        modelAnswer: `## Example\nWhy did the report show wrong totals? Rounding was applied twice. Why? Two functions both rounded. Why? No one owned rounding. Why? The design didn't define it. Why? No design review for calculations. Root cause: **missing design review for financial logic** — a process fix.`,
      },
    },
    {
      lessonNumber: 5,
      title: 'Writing Professional Defect Reports',
      estimatedTime: '16 minute read',
      lessonOverview: `A defect report is your product. If a developer can't reproduce the bug from your report, the bug doesn't get fixed. This lesson covers exactly what a report must contain.`,
      learningObjectives: ['List the essential contents of a defect report', 'Write clear reproduction steps with expected vs actual', 'Explain why a good report speeds up the fix'],
      lessonNotes: `## The purpose of a defect report
The ISTQB purpose of a defect report is to give developers and stakeholders the information they need to **understand, reproduce, prioritise and fix** the defect — and to support tracking and metrics. A vague report wastes everyone's time; a precise one gets the bug fixed fast.

## Essential contents
A professional defect report includes:
- **ID** — a unique identifier for tracking.
- **Summary / title** — a concise, specific one-line description.
- **Steps to reproduce** — numbered, exact, minimal.
- **Expected result** — what should happen.
- **Actual result** — what actually happened.
- **Severity** — impact on the system.
- **Priority** — urgency to fix (proposed).
- **Environment** — build/version, OS, browser, device, data/config.
- **Evidence** — screenshots, logs, videos, error messages.
Many teams also add reporter, date, status and references to the requirement or test case.

## Why each part earns its place
**Steps + expected + actual** together let a developer reproduce and confirm the bug. **Environment** explains why it happens in one place and not another. **Evidence** removes doubt. **Severity and priority** feed triage. Omit any of these and the report bounces back with "can't reproduce".

## The golden rule
Write so a stranger could reproduce the defect without asking you a single question.`,
      workedExample: `**ID:** BUG-412. **Summary:** Checkout returns 500 when applying an expired discount code. **Steps:** 1) Add any item to basket. 2) Go to checkout. 3) Enter code EXPIRED10. 4) Click Apply. **Expected:** message "This code has expired". **Actual:** 500 error, basket cleared. **Severity:** Major. **Priority:** High. **Environment:** Build 4.2.1, Chrome 120, Windows 11, staging. **Evidence:** screenshot + server log excerpt attached. A developer can reproduce this in under a minute.`,
      commonMistakes: `- A vague summary like "checkout broken" with no steps
- Missing expected vs actual, so severity can't be judged
- Leaving out the environment — the number-one cause of "can't reproduce"`,
      realWorldTip: `The summary is the most-read line you'll write. Make it specific enough that triage can rank the bug without opening it: what broke, where, under what condition.`,
      exercise: `Rewrite a weak report ("login doesn't work") into a full report with all the essential fields.`,
      reflectionQuestion: `Which three fields, together, let a developer reproduce and confirm a defect?`,
      knowledgeCheck: `Which parts of a defect report together allow a developer to reproduce and confirm the bug? (Answer: steps to reproduce, expected result and actual result)`,
      completionChecklist: ['I can list the essential contents of a defect report', 'I can write clear steps with expected vs actual', 'I can explain why each field earns its place'],
      enhancements: {
        industryStory: `A developer once told me my defect reports were the only ones he never had to ask questions about — he'd just read, reproduce, fix. Meanwhile a colleague's "it's broken" reports bounced back three times each. Same team, same bugs; the difference was entirely in the writing. Report quality is a career skill, not a formality.`,
        visualAid: { type: 'comparison', title: 'Anatomy of a defect report', headers: ['Field', 'Answers', 'Example'], rows: [['ID', 'How do we track it?', 'BUG-412'], ['Summary', 'What broke, where?', 'Checkout 500 on expired code'], ['Steps', 'How to reproduce?', '1) add item 2) apply EXPIRED10'], ['Expected/Actual', 'What should vs did happen?', 'Message vs 500 error'], ['Severity/Priority', 'How bad / how urgent?', 'Major / High'], ['Environment', 'Where does it occur?', 'Build 4.2.1, Chrome, staging'], ['Evidence', 'Can you prove it?', 'Screenshot + log']] },
        davidTip: `Before you submit a defect, read your steps as if you'd never seen the app. Could a stranger reproduce it with zero help? If not, it's not finished. That two-minute self-check has saved me thousands of "can't reproduce" round-trips.`,
        badGood: { label: 'a defect report', bad: `**Summary:** Login doesn't work.\n**Details:** I tried to log in and it broke. Please fix.\n(No steps, no expected/actual, no environment, no evidence.)`, good: `**ID:** BUG-207. **Summary:** Login fails with "Invalid token" for valid credentials on Safari. **Steps:** 1) Go to /login on Safari 17. 2) Enter valid email + password. 3) Click Sign in. **Expected:** redirect to dashboard. **Actual:** "Invalid token" error; stays on login. **Severity:** Critical. **Priority:** High. **Environment:** Build 5.1.0, Safari 17, macOS 14. **Evidence:** screenshot + console log attached.` },
        miniChallenge: `Take the weak report "the page is slow" and rewrite it as a full professional defect report with every essential field filled in.`,
        modelAnswer: `## Example\n**ID:** BUG-330. **Summary:** Dashboard takes 22s to load with 500+ orders. **Steps:** 1) Log in as a user with 500+ orders. 2) Open /dashboard. 3) Time the load. **Expected:** loads within 3s. **Actual:** 22s consistently over 5 runs. **Severity:** Major. **Priority:** High. **Environment:** Build 6.0.2, Chrome 120, staging, seeded account "load-test-1". **Evidence:** network waterfall screenshot attached.`,
      },
    },
    {
      lessonNumber: 6,
      title: 'Defect Triage',
      estimatedTime: '15 minute read',
      lessonOverview: `Triage is the meeting where defects are reviewed, ranked and assigned. It's where severity and priority meet business reality — and where your reports either shine or crumble.`,
      learningObjectives: ['Explain the purpose of defect triage', 'Describe who attends and what each defect gets', 'Connect triage to severity, priority and the lifecycle'],
      lessonNotes: `## What triage is
**Defect triage** is a regular meeting (borrowing the medical term for sorting patients by urgency) where open defects are reviewed and decided on. Its purpose is to make sure the **right defects are fixed in the right order** given limited time and people.

## Who attends
Typically a **test lead**, one or more **developers**, a **product owner / business analyst**, and sometimes a project manager. Each brings a view: testers explain impact and reproduction, developers estimate effort, the business judges urgency.

## What each defect gets
For every defect, triage confirms or adjusts:
- **Severity** — validated technical impact (tester-led).
- **Priority** — the agreed urgency to fix (business-led).
- **Assignment** — who will fix it, moving it to *Assigned* in the lifecycle.
- **Decision** — fix now, defer, reject, or mark as duplicate.

## Why your reports matter here
Triage moves fast. A defect with a clear summary, steps, expected/actual, environment and evidence is ranked in seconds. A vague one is parked ("need more info") and delayed — sometimes past the release. Good reporting is what makes triage efficient.

## Triage and the lifecycle
Triage is the engine that moves defects from **New** to **Assigned** with an agreed priority. It's the human decision point that keeps the whole defect management process flowing rather than stalling in an unmanaged backlog.`,
      workedExample: `In a 30-minute triage, twelve new defects are reviewed. Two are duplicates (rejected), one is deferred to the next release (low priority), and nine are assigned with agreed priorities. The tester's crisp reports let the group rank most in under a minute each; one vague report is parked for more detail — a visible cost of poor reporting.`,
      commonMistakes: `- Arguing severity vs priority instead of setting both deliberately
- Assigning defects with no owner or agreed priority — they stall
- Bringing vague reports that force "need more info" and waste the meeting`,
      realWorldTip: `Come to triage having already proposed a severity and priority for each of your defects. A prepared tester speeds the whole meeting and earns real influence over the release.`,
      exercise: `Draft a five-line triage agenda: what gets decided for each defect reviewed.`,
      reflectionQuestion: `What is the core purpose of defect triage?`,
      knowledgeCheck: `What is the main purpose of a defect triage meeting? (Answer: to review open defects and decide which to fix and in what order — agreeing priority and assignment)`,
      completionChecklist: ['I can explain the purpose of triage', 'I know who attends and what each defect gets decided', 'I can connect triage to severity, priority and the lifecycle'],
      enhancements: {
        industryStory: `My first triage meeting, I turned up with a list of "it's broken" bugs and no proposed severities. The lead spent ten painful minutes dragging details out of me while the room waited. The next week I came prepared — every defect with a summary, severity and proposed priority — and got through my whole list in five minutes. Preparation is respect, and in triage it's also influence.`,
        visualAid: { type: 'comparison', title: 'What triage decides per defect', headers: ['Question', 'Who leads', 'Outcome'], rows: [['How bad is it?', 'Tester', 'Confirmed severity'], ['How urgent?', 'Business', 'Agreed priority'], ['Who fixes it?', 'Dev lead', 'Assignment'], ['Fix, defer or reject?', 'Whole group', 'Decision + lifecycle state']] },
        davidTip: `Triage is where testers quietly become influential. Walk in with clear reports and considered severity/priority proposals, and the room starts deferring to your judgement. That reputation, built one tidy defect at a time, is what turns a tester into a trusted quality voice.`,
        badGood: { label: 'arriving at triage', bad: `Twelve defects titled "broken", "error", "doesn't work" — no steps, no proposed severity or priority. The lead has to open and interrogate each one; half get parked for "more info".`, good: `Twelve defects, each with a specific summary, reproduction steps, a proposed severity and priority, and evidence attached. The group ranks and assigns nearly all of them in seconds.` },
        miniChallenge: `Write a short triage agenda: for each defect, list the four things the meeting should decide before moving on.`,
        modelAnswer: `## Example\nFor each defect: 1) Confirm severity (impact). 2) Agree priority (urgency). 3) Assign an owner. 4) Decide the action — fix now, defer, reject or duplicate — and set the lifecycle state accordingly.`,
        managersReview: { intro: `If I reviewed your defect management as a test lead, here's what I'd look for:`, strengths: ['Reports are reproducible with no follow-up questions', 'Severity is objective; priority is proposed sensibly', 'You arrive at triage prepared and add to decisions'], improvements: ['Tighten summaries so triage can rank without opening the report', 'Always include environment and evidence', 'Propose a priority rather than leaving it blank'], gaps: ['Defects left in "Fixed" but never retested', 'No root cause reflection on recurring bug patterns', 'Vague reports that stall triage and delay fixes'] },
        portfolioBuilder: `Add a "Defect Management" section to your portfolio: two exemplary defect reports (all fields), a Five Whys root-cause write-up, and a short note explaining how you distinguish severity from priority with your own examples.`,
        resourcePreview: { name: 'Defect Report Template & Triage Checklist', purpose: 'A ready-to-use defect report template plus a triage-prep checklist.', whenToUse: 'Use the template for every defect you log; run the checklist before each triage.', formats: ['PDF', 'DOCX'] },
      },
    },
  ],
};
