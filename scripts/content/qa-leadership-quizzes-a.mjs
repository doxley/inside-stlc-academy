// QA Leadership Academy — judgement-based knowledge-check quizzes, Modules 1–6.
// Plain data consumed by scripts/content/build-quizzes.mjs (default export shape:
// { courseSlug, outFile, passMark, quizzes:[{ moduleNumber, title, questions:[
//   { text, answers:[{ text, correct }] }] }] }).
// Questions test the JUDGEMENT of an experienced QA leader — trade-off-aware
// scenarios, most grounded in Northstar Digital (docs/NORTHSTAR_DIGITAL.md) —
// not recall or definitions. Six quizzes, six questions each, four answers each,
// exactly one correct. British English. No imports; imports cleanly under node.
export default {
  courseSlug: 'qa-leadership-academy',
  outFile: 'seed-qa-leadership-quizzes-1-6.sql',
  passMark: 70,
  quizzes: [
    {
      moduleNumber: 1,
      title: 'Reflection & Knowledge Check',
      questions: [
        {
          text: `Two of your testers are stuck the evening before a Northstar release, and with your expertise you could clear both blockers overnight. What is the strongest leadership move?`,
          answers: [
            { text: `Clear both blockers yourself overnight so the release ships and the team is protected`, correct: false },
            { text: `Pair briefly to unblock each tester and transfer the approach — or explicitly decide to step in just this once — rather than silently doing both alone`, correct: true },
            { text: `Tell the testers to escalate to their squad leads and stay out of it entirely`, correct: false },
            { text: `Push to slip the release, since a lead should never do hands-on work`, correct: false },
          ],
        },
        {
          text: `An executive tells you: "Great — from now on quality is your problem, own it end to end." What is the wisest response?`,
          answers: [
            { text: `Accept it — a clear mandate to own quality is the authority QA has always needed`, correct: false },
            { text: `Refuse any responsibility for quality until more testers are hired`, correct: false },
            { text: `Decline sole ownership and propose an explicit split: QA owns strategy, risk-based coverage and the quality signal; engineering owns code quality; the business owns accepting risk`, correct: true },
            { text: `Accept it quietly and rely on the existing regression suite to catch what developers miss`, correct: false },
          ],
        },
        {
          text: `Production defects are rising and the board asks QA to "increase test coverage". Investigation shows most escaped defects come from billing and integration changes QA only sees after code-complete. What is the strongest response?`,
          answers: [
            { text: `Add regression tests across the whole product and request another tester to run them`, correct: false },
            { text: `Extend the manual regression pass so more of the escaping defects are caught before release`, correct: false },
            { text: `Reframe from detection to prevention — get QA into refinement for the high-risk change types and add contract tests, catching defects at the cheapest point`, correct: true },
            { text: `Report the current bug-find rate to reassure the board that testing is working hard`, correct: false },
          ],
        },
        {
          text: `You inherit Northstar's QA team; management is loudly demanding "more automation". In week one you feel pressure to launch an automation project. What is the best first move?`,
          answers: [
            { text: `Diagnose first — investigate where risk actually escapes, talk to the team and stakeholders, and take one genuine low-risk quick win to build credibility`, correct: true },
            { text: `Launch the automation initiative immediately to show impact and meet expectations`, correct: false },
            { text: `Restructure the team so automation has a dedicated squad from day one`, correct: false },
            { text: `Announce that automation is the wrong answer before you have gathered any evidence`, correct: false },
          ],
        },
        {
          text: `You join fast-growing, Series-B Northstar from a regulated healthcare firm where every release had a formal test plan and independent sign-off. What should shape your approach?`,
          answers: [
            { text: `Introduce the formal test plans and mandatory sign-off that worked well before — rigour travels`, correct: false },
            { text: `Strip out all process, since a Series-B company should simply move fast`, correct: false },
            { text: `Apply uniform heavyweight gates everywhere to be safe until you understand the product`, correct: false },
            { text: `Keep the principle of making risk visible but adapt the mechanism to Northstar's stage and cadence, concentrating heavier controls only where impact justifies it`, correct: true },
          ],
        },
        {
          text: `Whenever a tricky technical question arises, your team waits and asks you for the answer rather than reasoning it out. What does this indicate, and what should change?`,
          answers: [
            { text: `The team lacks skill — you should keep answering to maintain the quality bar`, correct: false },
            { text: `You are being the answer rather than building the team's reasoning — respond with guiding questions and standards, stepping in directly only for high-risk, one-way-door decisions`, correct: true },
            { text: `You should stop answering entirely and let them work it out, whatever the risk`, correct: false },
            { text: `You should document every answer so they can look it up instead of asking`, correct: false },
          ],
        },
      ],
    },
    {
      moduleNumber: 2,
      title: 'Reflection & Knowledge Check',
      questions: [
        {
          text: `The CTO has read about TMMi and says "let's get to Level 3 by year end". You believe a blanket ladder-climb is the wrong move here. What is the strongest response?`,
          answers: [
            { text: `Agree and build a programme to move the whole function up to Level 3`, correct: false },
            { text: `Diagnose each capability against risk and invest in the two or three areas genuinely costing speed and incidents, deliberately staying lean where risk is low`, correct: true },
            { text: `Explain that maturity models are pointless and refuse to assess maturity at all`, correct: false },
            { text: `Aim for Level 5 instead, since higher maturity is always safer`, correct: false },
          ],
        },
        {
          text: `As Northstar's first Head of QA you want an honest picture of where quality risk concentrates so you can prioritise investment. Which assessment frame fits best?`,
          answers: [
            { text: `A staged model that gives a single overall maturity level for the whole function`, correct: false },
            { text: `A defect-count baseline, since bugs found is the clearest measure of quality`, correct: false },
            { text: `A continuous, per-capability diagnostic scoring each area against its risk, so improvement can target specific weak areas`, correct: true },
            { text: `Whichever model your previous employer used, to keep continuity`, correct: false },
          ],
        },
        {
          text: `Northstar's 1,800-test Selenium suite is slow, roughly 25% flaky and distrusted. A tooling-only view concludes "replace the framework". Through the four-lens model, what is the flaw in that diagnosis?`,
          answers: [
            { text: `Nothing — replacing a flaky framework is the direct fix for low trust`, correct: false },
            { text: `The flaw is not migrating fast enough; the framework should be replaced this quarter`, correct: false },
            { text: `The suite simply needs more tests added to improve its coverage`, correct: false },
            { text: `It treats a culture/ownership problem — developers disown the suite so root causes go unfixed — as a technology problem; a new tool will be flaky again unless ownership changes`, correct: true },
          ],
        },
        {
          text: `A value-stream map shows a Northstar change takes 22 elapsed days but only about 4 days of actual work, with a late 5-day regression and repeated waits for a stable environment. What does the gap tell you?`,
          answers: [
            { text: `The system loses time and quality in queues and late, batched feedback — focus on compressing feedback loops and the late inspection, not making people work faster`, correct: true },
            { text: `The testers are too slow; the fix is to speed up the touch-time activities`, correct: false },
            { text: `The map is unreliable, because real processes never have that much waiting`, correct: false },
            { text: `The regression is the sole problem; halving it will roughly halve the lead time`, correct: false },
          ],
        },
        {
          text: `Northstar speeds its 5-day regression down to 3 days, but overall release lead time barely improves because changes now spend the saved time waiting for a stable environment. What does this prove?`,
          answers: [
            { text: `The regression cut was too small; cutting it further will finally move lead time`, correct: false },
            { text: `The regression was not the true constraint — relieving it did not raise throughput; the governing constraint is the environment, and effort should move there`, correct: true },
            { text: `The environment is fine; the team just needs to work through the waits faster`, correct: false },
            { text: `Lead time is not a useful measure of whether an improvement worked`, correct: false },
          ],
        },
        {
          text: `Your matrix shows all of Northstar's CI and automation capability rests on one engineer who is near burnout, and there is no in-house performance testing (a spiky, occasional need). How should you close each gap?`,
          answers: [
            { text: `Hire two automation engineers and one full-time performance tester`, correct: false },
            { text: `Contract out the automation to remove the bus factor, and hire a permanent performance specialist`, correct: false },
            { text: `Accept both gaps for now, since neither is causing an incident today`, correct: false },
            { text: `Build a second person for the automation bus factor (you cannot contract away a retained-skill single point of failure), and borrow performance capability when it spikes`, correct: true },
          ],
        },
      ],
    },
    {
      moduleNumber: 3,
      title: 'Reflection & Knowledge Check',
      questions: [
        {
          text: `A QA leader proposes a full "one embedded tester per squad" model for a six-person team covering Northstar's four squads, citing a famous tech company's structure. What is the strongest objection?`,
          answers: [
            { text: `Embedded testers are always worse than a centralised team, so the model is wrong`, correct: false },
            { text: `The model is copied rather than derived from Northstar's own risk profile and budget — six people spread one-per-squad cannot also cover performance, security and accessibility`, correct: true },
            { text: `The famous company is larger, so Northstar should first hire more testers to match the model`, correct: false },
            { text: `Nothing — matching a proven big-tech model is the safest choice`, correct: false },
          ],
        },
        {
          text: `Northstar's centralised QA is pulled in at code-complete and blamed for the 5-day regression. The CTO returns from a conference wanting a big-tech "squads, chapters and guilds" model rolled out wholesale next quarter. What is the best move?`,
          answers: [
            { text: `Roll out the literal model wholesale to satisfy the CTO`, correct: false },
            { text: `Keep the centralised model unchanged, since reorganising never fixes anything`, correct: false },
            { text: `Adopt the underlying idea — early involvement plus consistent standards — as a hybrid you can actually staff, embedding where risk is highest with a lightweight guild and a review point`, correct: true },
            { text: `Fully embed all six testers into squads and disband any central function`, correct: false },
          ],
        },
        {
          text: `A load-related incident just happened and the CTO says "hire a performance tester". Performance-testing demand at Northstar is occasional, not continuous. What is the strongest response?`,
          answers: [
            { text: `Hire the full-time performance tester as requested, to be safe`, correct: false },
            { text: `Ignore performance testing; the incident was probably a one-off`, correct: false },
            { text: `Train existing testers in load-test basics and contract a specialist for short bursts — spiky demand does not justify a permanent role`, correct: true },
            { text: `Reassign the automation engineer to own performance testing permanently`, correct: false },
          ],
        },
        {
          text: `On Northstar's skills matrix, CI/CD and UI automation score 3 for Dan and 0–1 for everyone else, and Dan owns a distrusted flaky suite while nearing burnout. What is the most urgent finding?`,
          answers: [
            { text: `The team simply needs training across the board to raise every score`, correct: false },
            { text: `Dan should be promoted to reward his sole ownership of automation`, correct: false },
            { text: `The scores are too low, so the proficiency scale must be miscalibrated`, correct: false },
            { text: `A key-person risk (bus factor of one) — the whole automation and CI capability would leave with Dan — which outranks the general thinness elsewhere`, correct: true },
          ],
        },
        {
          text: `Tom (Head of Product) asks you to move Dan onto Mobile to "add automation there". The matrix shows Dan is the only person above level 1 on CI/CD and UI automation. What does the matrix tell you?`,
          answers: [
            { text: `Moving Dan doesn't add automation to Mobile — it removes the org's entire automation and CI capability; develop a second person and stabilise the suite before any such move`, correct: true },
            { text: `It's a simple reallocation — move Dan and let Mobile benefit`, correct: false },
            { text: `Hire a contractor to run the flaky suite while Dan moves to Mobile`, correct: false },
            { text: `Refuse any change to Dan's role permanently`, correct: false },
          ],
        },
        {
          text: `You have budget for exactly one QA hire. Web wants an accessibility specialist (real legal exposure), the API squad wants an SDET for the B2B SLAs, and payments needs deeper domain expertise. What is the best allocation?`,
          answers: [
            { text: `Hire the accessibility specialist, since legal exposure is the most serious risk`, correct: false },
            { text: `Hire the SDET — it reduces the SLA-linked risk and scales the whole team's testing — grow payments domain depth in-house, and buy periodic accessibility audits`, correct: true },
            { text: `Split the one hire's time across all three needs so nothing is left uncovered`, correct: false },
            { text: `Delay hiring until you can afford all three roles`, correct: false },
          ],
        },
      ],
    },
    {
      moduleNumber: 4,
      title: 'Reflection & Knowledge Check',
      questions: [
        {
          text: `Your team is strong on automation but weak on cross-squad exploratory breadth and on representing quality to stakeholders. A brilliant automation specialist interviews superbly. Why should you hesitate?`,
          answers: [
            { text: `Don't hesitate — a superb candidate should always be hired when you find one`, correct: false },
            { text: `The specialist reinforces an existing strength and leaves the real gap open; anchor the decision to the written role definition, not to an off-target candidate's brilliance`, correct: true },
            { text: `Hesitate only because their salary expectations may be high`, correct: false },
            { text: `Redefine the role around the specialist's strengths so you can hire them`, correct: false },
          ],
        },
        {
          text: `Your job description lists eleven "essential" requirements, six of them tools. Applications are plentiful but the shortlist is weak, and a strong four-year candidate never applied. What is the most likely cause and fix?`,
          answers: [
            { text: `The salary is too low; raise it to attract stronger candidates`, correct: false },
            { text: `There aren't enough good testers in the market; wait longer`, correct: false },
            { text: `Add more essential requirements to raise the bar and filter harder`, correct: false },
            { text: `The inflated, tool-heavy essentials attract keyword-matchers while strong, less-confident candidates self-deselect; cut to four to six genuine capabilities and move tools to desirables`, correct: true },
          ],
        },
        {
          text: `Two managers screen the same forty CVs and produce almost entirely different shortlists — one full of familiar tools and employers, the other full of candidates describing outcomes and decisions. What should you introduce?`,
          answers: [
            { text: `A shared, role-derived scorecard that scores each CV capability by capability, so screeners converge on the same evidence-based shortlist`, correct: true },
            { text: `Let the more experienced manager's shortlist stand`, correct: false },
            { text: `Interview everyone on both shortlists to avoid missing anyone`, correct: false },
            { text: `Screen faster next time so gut instinct becomes more consistent`, correct: false },
          ],
        },
        {
          text: `A four-person panel each has a friendly, free-flowing conversation with every candidate, then meets and picks the one "everyone liked best". Why is this unreliable, and what single change helps most?`,
          answers: [
            { text: `It's fine — consensus that everyone liked someone is strong signal`, correct: false },
            { text: `Add more interviewers so more perspectives are gathered`, correct: false },
            { text: `Unstructured chats are dominated by rapport and confirmation bias and aren't comparable; assign defined capabilities to stages with core questions and score independently before discussing`, correct: true },
            { text: `Shorten the interviews so first impressions matter less`, correct: false },
          ],
        },
        {
          text: `For a mostly exploratory, stakeholder-facing senior QA role, how should you assess a candidate's technical capability?`,
          answers: [
            { text: `Run a coding gauntlet and a definitions quiz, to be rigorous`, correct: false },
            { text: `Reject any candidate who hasn't used your exact automation stack`, correct: false },
            { text: `Put a real testing problem in front of them (e.g. "how would you test our payment flow, and where are you most worried?") and assess how they reason, matching depth to the role`, correct: true },
            { text: `Skip technical assessment entirely, since the role is exploratory`, correct: false },
          ],
        },
        {
          text: `Candidate B (four years) doesn't know your legacy billing service's quirks but reasons cleanly to the key risk and communicates superbly; Candidate A (ten years) reasons well but communicates poorly — and communication is the gap the role exists to close. Who fits, and why?`,
          answers: [
            { text: `Candidate A — ten years of experience outweighs a communication weakness`, correct: false },
            { text: `Candidate B — the knowledge gap is coachable while her reasoning and communication match the role's defined gap; hire foundational reasoning and coach the knowledge`, correct: true },
            { text: `Neither — reopen the search for someone with both deep tool knowledge and strong communication`, correct: false },
            { text: `Whichever candidate the most senior interviewer preferred`, correct: false },
          ],
        },
      ],
    },
    {
      moduleNumber: 5,
      title: 'Reflection & Knowledge Check',
      questions: [
        {
          text: `The CTO asks for "a proper test strategy" and clearly expects a long document, but your honest assessment is that a one-page set of choices would change more behaviour. What is the strongest response?`,
          answers: [
            { text: `Write the comprehensive 40-page document to demonstrate rigour`, correct: false },
            { text: `Refuse to write anything until the team is bigger`, correct: false },
            { text: `Deliver the one-page strategy of real choices as the strategy itself, offering a longer document only for audiences that genuinely need the detail`, correct: true },
            { text: `Copy a heavyweight template from a regulated employer and change the dates`, correct: false },
          ],
        },
        {
          text: `Which of the following best indicates that you actually have a QA strategy rather than a wish list?`,
          answers: [
            { text: `Every product area has a documented test approach of equal thoroughness`, correct: false },
            { text: `You can name a few areas you have deliberately chosen not to cover to the same depth this year, and defend why that trade-off is acceptable`, correct: true },
            { text: `The document covers every test level and type comprehensively`, correct: false },
            { text: `The strategy lists all the tools the team will adopt`, correct: false },
          ],
        },
        {
          text: `In the same week Northstar ships a misaligned button on the marketing site and an intermittent defect that occasionally charges a customer without granting access. A defect-count view calls them "two bugs". Why should the strategy treat them completely differently?`,
          answers: [
            { text: `They're equally important; both are defects that should be fixed with equal urgency`, correct: false },
            { text: `The button should be fixed first, because visual defects damage the brand most`, correct: false },
            { text: `They carry vastly different business risk — the payment defect threatens revenue, trust and an SLA — so effort should concentrate where business impact is high and consciously accept low-impact risk elsewhere`, correct: true },
            { text: `Both should be logged and left, since neither blocks the release`, correct: false },
          ],
        },
        {
          text: `A QA lead proposes the objective "increase automated test coverage to 80% this quarter". What is weak about it as a strategic objective, and how would you improve it?`,
          answers: [
            { text: `Nothing — 80% coverage is a clear, measurable and ambitious goal`, correct: false },
            { text: `The target is too low; aim for 100% coverage`, correct: false },
            { text: `Coverage is fine as a goal, but the deadline should be a full year`, correct: false },
            { text: `It's an activity/vanity target — coverage can rise while incidents don't fall; name the business outcome (e.g. reduce escaped defects in high-risk areas) and treat automation as a leading activity`, correct: true },
          ],
        },
        {
          text: `Northstar's main safety net is a large, slow, flaky end-to-end UI suite, and most of what it checks is business logic and input validation. A stakeholder asks QA to "add more end-to-end tests" to cut escaped defects. Why is that the wrong strategic move, and what should the strategy do instead?`,
          answers: [
            { text: `Add the end-to-end tests as asked, to close the escaped-defect gap`, correct: false },
            { text: `Rebalance the levels — push logic checks down to developer-owned unit and contract tests, shrink the E2E suite to high-value journeys, and reserve QA for exploratory work on risky areas`, correct: true },
            { text: `Delete the end-to-end suite entirely and rely on unit tests alone`, correct: false },
            { text: `Keep the suite as-is and add an engineer to maintain it`, correct: false },
          ],
        },
        {
          text: `Leadership is pushing for more automated tests, but Northstar's shared staging is so unstable that failures routinely turn out to be environment problems rather than real defects. What should the strategy prioritise, and why?`,
          answers: [
            { text: `Add the automated tests now; the environment can be fixed later`, correct: false },
            { text: `Abandon automation and rely on manual testing until staging improves`, correct: false },
            { text: `Build a full production replica for every environment, to be safe`, correct: false },
            { text: `Stabilise or isolate the environment first — test results are only as trustworthy as the environment they run in, so it usually has higher return than new tests`, correct: true },
          ],
        },
      ],
    },
    {
      moduleNumber: 6,
      title: 'Reflection & Knowledge Check',
      questions: [
        {
          text: `A tracker shows a "high severity" crash on an internal admin page used by two staff, and a "medium severity" rounding error in the customer billing calculation. A tester argues the crash must be fixed first because it is higher severity. Why challenge that ordering?`,
          answers: [
            { text: `The tester is right — always fix the highest-severity item first`, correct: false },
            { text: `Severity is not risk — read both across the impact dimensions: the admin crash is near-zero on business, customer and compliance impact, while the billing error carries real business, compliance and reputational impact, so it is the higher product risk`, correct: true },
            { text: `Fix both simultaneously, since they are both open defects`, correct: false },
            { text: `The billing error is only "medium", so it can safely wait until next sprint`, correct: false },
          ],
        },
        {
          text: `Two release risks score the same overall on the matrix: one is high-probability/low-impact, the other low-probability/high-impact. A colleague says "they're equal, treat them the same". Why is that the wrong conclusion?`,
          answers: [
            { text: `They are equal, so treating them the same is correct`, correct: false },
            { text: `Always prioritise the high-probability one, as it is more likely to occur`, correct: false },
            { text: `An equal overall score hides that they need different responses — reduce likelihood (or accept) the first; reduce impact via flags, monitoring or a tested rollback for the second`, correct: true },
            { text: `Combine them into a single aggregate score to simplify the decision`, correct: false },
          ],
        },
        {
          text: `A QA lead runs a "risk workshop" but does most of the talking, presents a pre-made risk list, and asks the room to confirm the scores. It's efficient and everyone agrees. Why should the lead be worried rather than pleased?`,
          answers: [
            { text: `There is nothing to worry about — efficiency and consensus are the goal`, correct: false },
            { text: `Easy agreement means the room's distributed knowledge was never pooled and no independent judgement surfaced; switch to silent generation, capture without debating, and score independently before revealing`, correct: true },
            { text: `The only problem is that the meeting ran too long; shorten it next time`, correct: false },
            { text: `The lead should have made all the scoring decisions alone, to save time`, correct: false },
          ],
        },
        {
          text: `Under deadline pressure Northstar's test plan must be cut, and a tester proposes trimming a fixed percentage off every area equally "to be fair". Why is an equal cut the wrong instinct?`,
          answers: [
            { text: `It's the fairest approach, so it is the right one`, correct: false },
            { text: `Cutting anything is negligent; the deadline should always slip instead`, correct: false },
            { text: `Cut the high-risk areas most, since they take the longest to test`, correct: false },
            { text: `An equal cut removes as much coverage from the high-impact areas as from the safe ones; protect or deepen the top-band risks, take the cuts from low-risk areas, and record what is no longer tested`, correct: true },
          ],
        },
        {
          text: `The night before release, Tom asks point-blank: "Just tell me — do we ship or not?" You have a mixed picture: two untested critical scenarios, an intermittent payment bug, 90% of regression green. Why resist a bare yes/no?`,
          answers: [
            { text: `Just say "yes" — 90% passing is good enough to ship`, correct: false },
            { text: `Just say "no" — untested critical scenarios mean it isn't safe`, correct: false },
            { text: `A bare yes/no makes QA own a decision whose business consequences it can't weigh; give a recommendation inside a structured picture — good news, ranked residual risk, costed options including a conditional-go — so the accountable owner decides and owns it`, correct: true },
            { text: `Refuse to comment until every critical scenario has been tested`, correct: false },
          ],
        },
        {
          text: `You deliver a clear conditional-go recommendation and Tom responds, "Great — so QA's signing off that it's safe to ship?", visibly trying to hand you ownership of the decision. What is the best response?`,
          answers: [
            { text: `Agree — if you're confident in the recommendation, signing off is reasonable`, correct: false },
            { text: `Restate that QA's assessment and recommendation stand, but accepting that level of residual risk against the date is Tom's call since he owns the consequences — and you'll record what he accepts`, correct: true },
            { text: `Withdraw the recommendation to avoid any appearance of owning the decision`, correct: false },
            { text: `Say "it's safe" to keep the conversation moving and hit the date`, correct: false },
          ],
        },
      ],
    },
  ],
};
