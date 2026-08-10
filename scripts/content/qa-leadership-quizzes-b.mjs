// QA Leadership Academy — judgement-based knowledge-check quizzes for Modules 7–12.
// Plain data file consumed by scripts/content/build-quizzes.mjs (no imports).
// One quiz per module; each quiz has 6 questions; each question has exactly 4
// answers with exactly one correct. Questions test the judgement of an
// experienced QA leader (trade-offs, nuance) rather than recall of definitions,
// and are grounded in the Northstar Digital case study (docs/NORTHSTAR_DIGITAL.md).
// British English. No invented statistics, companies or quotations.
export default {
  courseSlug: 'qa-leadership-academy',
  outFile: 'seed-qa-leadership-quizzes-7-12.sql',
  passMark: 70,
  quizzes: [
    {
      moduleNumber: 7,
      title: 'Reflection & Knowledge Check',
      questions: [
        {
          text: 'Northstar\'s fortnightly report shows test cases and bugs found at record highs, yet production incidents rose over the same period. The CTO asks whether QA is doing well or badly. What is the strongest response?',
          answers: [
            { text: 'Neither count answers the question — both rise for good and bad reasons; point to the rising escaped-defect trend as the signal that carries a decision and propose replacing the counts', correct: true },
            { text: 'QA is performing well: the team found more defects and wrote more cases than ever, so the incidents reflect development quality, not testing', correct: false },
            { text: 'QA is performing badly: rising incidents alongside high bug counts prove the testing missed too much and coverage must increase', correct: false },
            { text: 'Reserve judgement until the pass rate is available, since that is the metric that best grades whether the release was healthy', correct: false },
          ],
        },
        {
          text: 'A QA manager reports that pipeline feedback time and early QA involvement both improved sharply, and concludes quality has improved. A month later a serious incident occurs. What does this reveal?',
          answers: [
            { text: 'Leading signals only predict outcomes and must be paired with and validated against lagging outcomes — either the improvement was superficial or the assumed causal link does not hold here', correct: true },
            { text: 'The leading indicators were simply measured incorrectly and need a more precise definition before they can be trusted again', correct: false },
            { text: 'The incident was bad luck; the leading signals were green, so the quality conclusion was sound and should stand', correct: false },
            { text: 'Leading indicators are inherently useless for QA and the manager should report only escaped defects and incidents in future', correct: false },
          ],
        },
        {
          text: 'To show quality is improving, a manager proposes a target of driving escaped defects to zero next quarter. Why is this the wrong target?',
          answers: [
            { text: 'A zero target invites reclassifying escapes as non-production or over-testing that destroys delivery speed; track escape rate as an explainable trend by origin and severity, at a consciously accepted level', correct: true },
            { text: 'Zero is unreachable, so a softer numeric target such as halving escapes is the correct scorecard to commit the team to instead', correct: false },
            { text: 'Escaped defects are a lagging metric and should never be tracked; only leading indicators belong on a target', correct: false },
            { text: 'The target is fine in principle but should be owned by development, since they create the defects that escape', correct: false },
          ],
        },
        {
          text: 'The CTO cites Northstar\'s large Selenium suite as evidence of strong coverage and asks for more automated tests. The suite is slow and heavily flaky. What is the strongest reframe?',
          answers: [
            { text: 'Shift the measure from size to trust and fit — track flaky-test rate, pipeline feedback time and risk coverage, and warn that success will likely mean the test count falls', correct: false },
            { text: 'Agree to add the tests but insist on a proportional increase in headcount to maintain the larger suite', correct: false },
            { text: 'Report the suite\'s pass rate to reassure the CTO that the existing tests are protecting the product well', correct: false },
            { text: 'The count hides flakiness, run time and maintenance cost; measure flaky rate, feedback time and risk coverage of top-band risks, and accept the test count may fall as success', correct: true },
          ],
        },
        {
          text: 'After introducing heavier pre-release gates, a manager reports that change failure rate dropped sharply and presents it as a clear quality win. What should a delivery-literate leader want to see first?',
          answers: [
            { text: 'The throughput metrics alongside it — a lower change failure rate bought by slowing releases and shipping less is a trade of speed for stability, not a win', correct: true },
            { text: 'Confirmation that the gates were manual, since automated gates would make the improvement less trustworthy', correct: false },
            { text: 'The absolute number of defects the gates caught, to quantify the return on the extra process', correct: false },
            { text: 'Nothing further — a falling change failure rate is unambiguous and should be accepted as a quality improvement', correct: false },
          ],
        },
        {
          text: 'You are designing separate dashboards for the QA team, engineering leadership and the executive board. What best reflects sound audience-specific design?',
          answers: [
            { text: 'Publish one comprehensive dashboard to everyone so all stakeholders see the same numbers and nobody can accuse QA of hiding data', correct: false },
            { text: 'Give the executive board the internal plumbing — flaky rate and feedback time — so they can judge the health of the suite directly', correct: false },
            { text: 'Give each audience the decision-linked view it acts on — the executive sees outcomes like escaped defects and change failure rate, not the flaky rate and feedback time the QA team needs', correct: true },
            { text: 'Give the executive board test-case and bug counts, since those are the simplest figures for non-technical leaders to follow', correct: false },
          ],
        },
      ],
    },
    {
      moduleNumber: 8,
      title: 'Reflection & Knowledge Check',
      questions: [
        {
          text: 'The CTO asks you to add a thousand more automated tests this year on top of a large, slow, flaky UI suite. Why is agreeing to the number the wrong first move?',
          answers: [
            { text: 'A test-count target is a solution with no stated problem and would multiply the existing maintenance and trust liabilities; surface the outcomes wanted and design a strategy, which almost certainly is not more UI tests', correct: true },
            { text: 'The number is too low to matter; you should counter with a more ambitious coverage target to signal real commitment', correct: false },
            { text: 'The existing suite proves the tool is wrong, so the right first move is to propose migrating to a better framework before adding tests', correct: false },
            { text: 'Adding tests is always correct, but only after the team has been expanded to maintain them', correct: false },
          ],
        },
        {
          text: 'The Payments squad wants the whole checkout journey automated as UI end-to-end tests because "that is what the customer does". What is the sounder approach?',
          answers: [
            { text: 'Automate every journey through the UI as requested, since only end-to-end tests reproduce the real customer experience', correct: false },
            { text: 'Decline checkout automation entirely because UI tests are brittle, and rely on exploratory testing for the whole flow', correct: false },
            { text: 'Decompose the risk — push calculations and rules to dev-owned unit tests and the provider boundary to contract tests, and keep only a couple of end-to-end UI checks to prove it hangs together', correct: true },
            { text: 'Automate the full journey now but at the API layer only, replacing every UI interaction with a direct service call', correct: false },
          ],
        },
        {
          text: 'A senior stakeholder insists you fully automate a new onboarding flow that the growth team redesigns almost every sprint and whose quality is largely about how intuitive it feels. Why is full UI automation the wrong call?',
          answers: [
            { text: 'The flow is unstable, so automation means constant rewrites, and its real quality is experiential — a human judgement; automate only the stable factual guarantees underneath at API level and keep exploratory eyes on the experience', correct: true },
            { text: 'Onboarding is low-risk, so it does not warrant any automated coverage and should be left to manual spot-checks', correct: false },
            { text: 'Full automation is correct; the churn simply requires a dedicated engineer to keep the UI tests updated each sprint', correct: false },
            { text: 'The problem is the tool — a self-healing UI framework would make automating the changing flow entirely worthwhile', correct: false },
          ],
        },
        {
          text: 'Northstar\'s suite is heavily UI-weighted, slow and flaky while unit and API coverage is patchy. A stakeholder suggests fixing it by migrating to a faster UI tool. Why will that not solve the core problem?',
          answers: [
            { text: 'The problem is the distribution — too much testing at the slowest, most brittle level — so a faster UI runner still leaves a fragile suite; shift coverage down to unit, contract and API level incrementally, not as a big-bang rewrite', correct: true },
            { text: 'The tool is genuinely the constraint, so the migration will fix it provided the whole suite is ported in one release', correct: false },
            { text: 'A faster UI tool will halve the run time, which is the real problem, so the migration is the right first step', correct: false },
            { text: 'The suite should simply be deleted in full and rebuilt from scratch at the UI level in the new tool', correct: false },
          ],
        },
        {
          text: 'Dan wants to migrate the flaky, QA-owned UI suite to a newer, more fashionable framework. What single question should you ask before approving?',
          answers: [
            { text: 'Whether the new framework has better community support and documentation than the current one', correct: false },
            { text: 'How long the migration will take and whether it can be squeezed into the current quarter', correct: false },
            { text: '"If we migrate but keep the same distribution, ownership and strategy, what actually gets better?" — if the honest answer is "little", the framework is masking a strategy and ownership problem', correct: true },
            { text: 'Whether Dan has the certification needed to lead adoption of the new tool', correct: false },
          ],
        },
        {
          text: 'Northstar\'s automation is owned entirely by QA; the developers who break the tests feel no responsibility for them. What does this most reveal about the automation strategy?',
          answers: [
            { text: 'A distribution problem is usually an ownership problem in disguise — push coverage to levels developers will co-own and choose tooling in their language, or the suite will keep orphaning', correct: true },
            { text: 'QA ownership is correct and should be reinforced, since a single owner keeps the suite coherent and consistent', correct: false },
            { text: 'The fix is to hire more QA automation engineers so the existing owner is less overloaded', correct: false },
            { text: 'Ownership is a cultural nicety; as long as the tests pass in the pipeline, who maintains them does not affect strategy', correct: false },
          ],
        },
      ],
    },
    {
      moduleNumber: 9,
      title: 'Reflection & Knowledge Check',
      questions: [
        {
          text: 'The CTO asks you to "roll out AI across testing to speed us up", while two testers are already quietly pasting code into a public tool. What is the strongest first move?',
          answers: [
            { text: 'Map concrete use cases by value and risk first, then enable the high-value/low-risk ones, control the risky ones, and stop the unsafe one while offering a safe alternative so it does not go underground', correct: true },
            { text: 'Ban all AI use immediately until a formal policy is written, to remove the data-leak risk at once', correct: false },
            { text: 'Roll AI out broadly this quarter as instructed and report back on the speed gains it delivers', correct: false },
            { text: 'Buy the enterprise licence the CTO wants and let each tester find the use cases that suit their own work', correct: false },
          ],
        },
        {
          text: 'A tester proudly shows you an entire automated suite an AI generated overnight — dozens of passing tests. How should you respond?',
          answers: [
            { text: 'Merge them quickly to capture the productivity gain, since they compile and pass, then review a sample if time later permits', correct: false },
            { text: 'Encourage the initiative but do not trust the green — verify the tests actually fail when the behaviour breaks and check what they truly assert before any enter the suite', correct: true },
            { text: 'Reject AI-generated tests on principle, because automation must be hand-written to be trustworthy', correct: false },
            { text: 'Accept them as coverage and reduce the manual regression accordingly, since the count has risen sharply', correct: false },
          ],
        },
        {
          text: 'An AI tool analyses a cluster of failures and produces a confident, well-written root-cause explanation. A team lead wants to send it straight to the VP of Engineering as the finding. Why should you pause?',
          answers: [
            { text: 'AI infers causation from surface patterns and can be fluently, confidently wrong; hand the hypothesis to an engineer to verify against the real system, and report only the verified cause, owned by a human', correct: true },
            { text: 'The VP should hear the hypothesis first so she can allocate engineers to investigate it before anyone verifies it', correct: false },
            { text: 'AI summaries are always unreliable, so the analysis should be discarded and the investigation restarted manually', correct: false },
            { text: 'The concern is only formatting — the explanation should be rewritten in the team\'s house style before it goes up', correct: false },
          ],
        },
        {
          text: 'You discover testers routinely paste production source code and customer-bearing tickets into a free public AI chatbot, with no policy in place. What is the leadership response?',
          answers: [
            { text: 'Treat it as a live governance and data-protection risk — provide a governed tool and a safe alternative rather than only banning it, so the genuine value is captured under controls that match the risk', correct: true },
            { text: 'Leave it alone, since no one has formally approved it and therefore the organisation carries no responsibility for it', correct: false },
            { text: 'Issue an outright ban and consider the matter closed, since removing the tool removes the risk', correct: false },
            { text: 'Encourage wider use because it is clearly speeding the team up, and revisit governance only if a leak occurs', correct: false },
          ],
        },
        {
          text: 'A severity call driven partly by an AI defect summary later turns out to be wrong and causes real customer impact. How should accountability be understood?',
          answers: [
            { text: 'A human owns the severity and release decisions and their consequences; "the AI classified it as low severity" is never an acceptable account — AI assists the judgement, it does not make it', correct: true },
            { text: 'The tool vendor bears responsibility, since its model produced the classification the team relied upon', correct: false },
            { text: 'No one is accountable, because the decision was informed by an automated system acting in good faith', correct: false },
            { text: 'Accountability sits with whoever configured the AI tool, not with the engineer who acted on its output', correct: false },
          ],
        },
        {
          text: 'A tester presents an AI-generated set of forty test cases as evidence that a feature is "thoroughly covered". Why be cautious?',
          answers: [
            { text: 'A long, fluent list creates false completeness but reflects no knowledge of the system\'s real risks, architecture or incident history; treat it as a divergent starting point and check the context-specific, high-risk scenarios are covered and the expected results verified', correct: true },
            { text: 'Forty cases is too few for thorough coverage; the tester should ask the AI to generate several hundred more before signing off', correct: false },
            { text: 'AI-generated cases are always wrong and should be deleted, with the tester designing every case unaided instead', correct: false },
            { text: 'The concern is efficiency — running forty AI-written cases will slow the suite, so the list should be trimmed to save time', correct: false },
          ],
        },
      ],
    },
    {
      moduleNumber: 10,
      title: 'Reflection & Knowledge Check',
      questions: [
        {
          text: 'Product insists on a Friday release; testing is incomplete on a payments-adjacent path with a real financial risk. Your instinct is to refuse: "We can\'t ship, it\'s not signed off." Why is this the weaker move?',
          answers: [
            { text: 'It claims an authority QA does not hold, conveys no actionable information and no path, and invites being overruled; instead present tested, untested, known defects, residual risk in business terms, mitigations and a recommendation, then let the accountable owner decide', correct: true },
            { text: 'It is the correct move — QA sign-off is a hard gate and the release cannot proceed without it under any circumstances', correct: false },
            { text: 'It is too soft; QA should escalate straight to the CTO to have the deadline formally overruled', correct: false },
            { text: 'It is fine as long as QA also privately agrees to ship, so the relationship with product is preserved', correct: false },
          ],
        },
        {
          text: 'You recommend a phased launch, but the CTO — the accountable owner — overrules you and says "ship it all Friday", accepting the reconciliation risk you flagged. What do you do next?',
          answers: [
            { text: 'Accept the decision without sulking, make the risk acceptance explicit and on the record, add monitoring on the exposed area and ready a fast-follow fix', correct: true },
            { text: 'Refuse to support the release and withhold QA involvement so the risk sits clearly with the CTO', correct: false },
            { text: 'Cave silently, say nothing further, and hope the risk does not materialise', correct: false },
            { text: 'Re-litigate the decision in the release channel so the whole team knows you disagreed', correct: false },
          ],
        },
        {
          text: 'You want funding for a new test-data capability. You send the same detailed technical proposal to your testers, the VP of Engineering and the CFO. Why is this likely to fail?',
          answers: [
            { text: 'Each audience is measured on different things and acts on different information; translate the one case into engineering-health terms for the VP, cost-and-risk terms for the CFO and concrete day-to-day relief for the team, targeting the people who decide the budget', correct: true },
            { text: 'The proposal is too short to be credible to executives and needs far more technical detail across the board', correct: false },
            { text: 'Test-data work is an engineering concern, so only the VP should receive any proposal at all', correct: false },
            { text: 'Sending one message to everyone is efficient and correct; the likely failure is simply that the idea is unfunded this year', correct: false },
          ],
        },
        {
          text: 'The day before a launch, a product owner asks QA: "Is it ready to ship?" Testing is incomplete on two secondary paths. What is the strongest response?',
          answers: [
            { text: 'A crisp residual-risk picture — what is tested and solid, what is not and its realistic worst case, a mitigation and a recommendation — leaving the accountable owner to make the go/no-go call', correct: true },
            { text: 'A plain "no", because incomplete testing means the feature cannot responsibly be called ready', correct: false },
            { text: 'A plain "yes", to protect the relationship and avoid being seen as the blocker on launch day', correct: false },
            { text: 'A summary of testing status — cases run and remaining — so product can judge readiness from the numbers', correct: false },
          ],
        },
        {
          text: 'A developer wants a defect\'s severity downgraded so it does not block release; you believe it is serious. Insisting on the label starts a standoff. What is the more effective approach?',
          answers: [
            { text: 'Stop arguing the label and reframe to real-world impact and likelihood — what happens to a customer if it triggers and how often — so both sides reason about risk, and agree the action from there', correct: true },
            { text: 'Hold firm on the high severity as a matter of principle, since conceding sets a precedent that severities can be negotiated', correct: false },
            { text: 'Concede the downgrade to keep the peace, since a single defect is not worth damaging the relationship over', correct: false },
            { text: 'Escalate the severity dispute to the VP so an authority settles the label definitively', correct: false },
          ],
        },
        {
          text: 'Marcus, the Payments lead, believes good developers do not need a QA team and is unconvinced rather than hostile. How do you best shift him?',
          answers: [
            { text: 'Do not argue the abstract case for QA; demonstrate value on a real risk his unit and contract tests structurally cannot catch, framed as help — and accept that a neutral, respectful working relationship is a good outcome', correct: true },
            { text: 'Build a data-backed presentation proving QA\'s value in general and take him through it until he concedes the point', correct: false },
            { text: 'Escalate to Priya to have QA involvement in Payments mandated over his objection', correct: false },
            { text: 'Leave Payments alone, since a sceptical lead means QA effort there will always be wasted', correct: false },
          ],
        },
      ],
    },
    {
      moduleNumber: 11,
      title: 'Reflection & Knowledge Check',
      questions: [
        {
          text: 'It is a release afternoon and a payment-path defect has just surfaced. Sofia — fully capable — asks "how do you want me to approach this?" Your coaching instinct says to hand it back with a question. What should you actually do?',
          answers: [
            { text: 'Manage now, coach later — give clear direction under the time pressure, and revisit how she would structure her own approach in a calmer 1:1 afterwards', correct: true },
            { text: 'Hand it back with an open question, since coaching capable people builds the judgement you want them to own', correct: false },
            { text: 'Take over and fix it yourself, since a live payment defect is too important to delegate', correct: false },
            { text: 'Tell her to follow whatever process feels right, to avoid undermining her autonomy mid-incident', correct: false },
          ],
        },
        {
          text: 'A senior tester keeps bringing you decisions they are perfectly capable of making, asking you to choose. Deciding is quick and your calls are sound. What is the risk, and what should you do?',
          answers: [
            { text: 'Deciding for them is fast today but trains dependency and caps them at your judgement; shift to coaching — hand the decision back with a question — and reserve directing for genuinely high-risk or non-negotiable matters', correct: true },
            { text: 'Keep deciding, since your judgement is sound and it resolves the questions fastest for the team', correct: false },
            { text: 'Tell them to stop bringing you decisions, so they learn to be more independent', correct: false },
            { text: 'Escalate their over-reliance as a performance concern, since a senior should not need this much input', correct: false },
          ],
        },
        {
          text: 'You need to tell a strong performer that their habit of rewriting colleagues\' work "to fix it" is demoralising the team. You are irritated, having noticed it three times. How should you approach it?',
          answers: [
            { text: 'Do not deliver it while irritated or as a one-off note — three times is a pattern, so plan a performance-style conversation on the observable behaviour and its impact, invite their side, and if it touches how others are treated, check whether it is a conduct matter needing HR', correct: true },
            { text: 'Give immediate situation–behaviour–impact feedback in the moment you next see it happen, exactly as for a single incident', correct: false },
            { text: 'Let it go, since the person is a strong performer and the rewrites do improve the work', correct: false },
            { text: 'Raise it lightly at the next appraisal, batched with your other observations from the period', correct: false },
          ],
        },
        {
          text: 'You inherit a QA team with no skills matrix and no progression ladder, and you are frustrated that a long-serving tester has not grown their skills. Before raising it, what must you do?',
          answers: [
            { text: 'Set the expectation explicitly and forward-looking first — define what "good" and progression mean for the role, name the gap against that standard, and agree it — because you cannot fairly hold someone to a standard that was never defined', correct: true },
            { text: 'Raise the shortfall directly, since a long-serving tester should already know what "senior" requires', correct: false },
            { text: 'Begin a formal performance process straight away, given how long the stagnation has persisted', correct: false },
            { text: 'Reassign the tester to simpler work rather than have an awkward conversation about skills', correct: false },
          ],
        },
        {
          text: 'A feedback conversation with a team member is starting to look as though it could affect their job, pay or formal record. How should a QA leader handle this?',
          answers: [
            { text: 'Involve HR early and follow the organisation\'s process and local employment law — a conversation framework is for fair, everyday feedback, not for running a disciplinary', correct: true },
            { text: 'Keep handling it privately as coaching, since bringing in HR would escalate matters unnecessarily', correct: false },
            { text: 'Apply the situation–behaviour–impact structure more firmly, since a good enough framework removes the need for formal process', correct: false },
            { text: 'Delay any action until the next review cycle so HR involvement can be avoided altogether', correct: false },
          ],
        },
        {
          text: 'A junior tester is stuck on a kind of problem they have never faced and genuinely has no framework for it. Your instinct is to ask "what do you think you should do?" What is the better move?',
          answers: [
            { text: 'Teach the skill first and coach its use second — show them how you would approach it once, then let them drive the next one; coaching someone who lacks the skill is abandonment with better manners', correct: true },
            { text: 'Ask the open coaching question anyway, since discovering the answer themselves builds the strongest learning', correct: false },
            { text: 'Reassign the task to someone experienced so the work is not held up', correct: false },
            { text: 'Give them documentation to read and expect them to work it out independently by the deadline', correct: false },
          ],
        },
      ],
    },
    {
      moduleNumber: 12,
      title: 'Reflection & Knowledge Check',
      questions: [
        {
          text: 'You finish the diagnostic programme with a stack of strong artefacts and prepare to present all of them to the CTO, each arguing its own priority. Why is this a weak position?',
          answers: [
            { text: 'Many competing documents read as activity rather than direction and hide the trade-offs; synthesise them into one narrative built on the few root causes the symptoms trace back to, reconcile the conflicts, and lead with a single statement of strategic intent', correct: true },
            { text: 'The artefacts are too detailed for a CTO; each should be cut to a single page and then all presented together', correct: false },
            { text: 'The position is strong — showing all the analysis demonstrates rigour and builds the CTO\'s confidence in QA', correct: false },
            { text: 'The problem is ordering; present the artefacts in priority sequence and let the CTO choose which to fund', correct: false },
          ],
        },
        {
          text: 'Your prioritisation matrix ranks "rebuild the automation suite" as the single highest-impact improvement, so you plan to start it in month one. What is the risk in this reasoning?',
          answers: [
            { text: 'Highest priority is not the same as first in sequence — the rebuild likely depends on preconditions such as stable environments and the right skills, so map dependencies and sequence enabling, credibility-building work ahead of it', correct: true },
            { text: 'There is no risk; the highest-impact item should always be started first to maximise the transformation\'s return', correct: false },
            { text: 'The risk is only that the rebuild is expensive, so it should wait until a larger budget is secured', correct: false },
            { text: 'Automation should never be the highest-impact item, so the matrix scoring must be discarded', correct: false },
          ],
        },
        {
          text: 'A leader correctly identifies that the real problems are structural and spends the first two quarters entirely on a large automation rebuild with nothing else visible. The sponsor grows sceptical and funding is questioned. What did the leader get wrong?',
          answers: [
            { text: 'They were right about the problems but neglected credibility and momentum — with no visible early wins the sponsor lost faith before the slow payoff arrived; lead with genuine quick wins and ship the rebuild in visible slices', correct: true },
            { text: 'They chose the wrong structural change; the rebuild was never worth doing and should have been dropped', correct: false },
            { text: 'They should have promised the sponsor a firm completion date for the rebuild to hold confidence', correct: false },
            { text: 'Nothing — the sponsor simply lacked patience, and the leader should have pressed on unchanged', correct: false },
          ],
        },
        {
          text: 'A QA manager submits a business case asking for two more testers and a new automation tool "to improve coverage and reduce the bug backlog", citing a precise projected percentage improvement in quality. The board declines. What are the core weaknesses?',
          answers: [
            { text: 'It asks for inputs rather than outcomes in the currencies executives fund, and leans on an invented-looking precise figure that erodes trust; rebuild it around risk, delivery and cost with grounded ranges, honest uncertainty and a priced cost of inaction', correct: true },
            { text: 'The request is too modest; a bolder ask for a larger team and toolset would have signalled the seriousness the board expects', correct: false },
            { text: 'The percentage was too low to impress the board; a higher projected improvement would have won approval', correct: false },
            { text: 'The case failed only because it went to the board rather than to the VP of Engineering, who owns QA budgets', correct: false },
          ],
        },
        {
          text: 'A new Head of QA writes a 90-day plan whose day-90 milestone is "automation suite fully rebuilt and stable, regression under one hour". Why is this risky even though the rebuild is the right structural change?',
          answers: [
            { text: 'A full estate rebuild is a multi-quarter change, so promising it in ninety days over-commits and will fail visibly; front-load quick wins, start the rebuild as foundation work, stand up the metric that will prove it, and end at a checkpoint with early evidence', correct: true },
            { text: 'The milestone is fine; the risk is only that "under one hour" is too specific and should be left open', correct: false },
            { text: 'Ninety days is the wrong horizon entirely; a first plan should never set concrete milestones', correct: false },
            { text: 'The plan is sound as long as the whole team is dedicated to the rebuild and all other work is paused', correct: false },
          ],
        },
        {
          text: 'Your synthesised backlog has fourteen sensible improvements and the team is keen to start them all. What is the senior move?',
          answers: [
            { text: 'Run few things concurrently and finish them, sized to what the team and organisation can absorb, and keep an explicit, reasoned "not now" list — starting everything at once exhausts people and delivers nothing', correct: true },
            { text: 'Start all fourteen, since each is individually justified and delay only postpones the benefits', correct: false },
            { text: 'Start whichever items the team is most enthusiastic about, to sustain morale during the change', correct: false },
            { text: 'Quietly drop the weakest items without comment, so the backlog looks focused without a formal "not now" list', correct: false },
          ],
        },
      ],
    },
  ],
};
