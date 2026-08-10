// QA Leadership Academy — Risk & Metrics tools.
// Genuinely usable leadership instruments: risk assessment, go/no-go
// decisions, metrics catalogue, executive reporting and quality scorecards.
// Worked examples are grounded in the Northstar Digital case study.
const COURSE = 'QA Leadership Academy';

export default [
  // ────────────────────────────────────────────────────────────
  // 1. Product Risk Matrix
  // ────────────────────────────────────────────────────────────
  {
    slug: 'product-risk-matrix',
    title: 'Product Risk Matrix',
    subtitle: 'Rank what could go wrong by probability and impact, then aim your testing effort where it earns its keep.',
    courseTitle: COURSE,
    category: 'Templates',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'A product risk matrix turns "we should test everything" into a defensible plan. You score each risk on two axes — how likely it is to occur (probability) and how badly it hurts if it does (impact) — and let the combined score decide how much test effort it deserves. It is the single most useful artefact for justifying where your team spends its time, and for saying no to low-value work without sounding defensive.' },
      { t: 'p', text: 'The matrix is a communication tool as much as a planning tool. A VP Engineering does not want a list of 400 test cases; she wants to know which handful of risks could genuinely hurt the business, and that you are covering them.' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'At the start of a release or programme, to shape the test approach before writing a single case.',
        'When you are time-boxed and cannot test everything — the matrix decides what gets cut safely.',
        'When you need to justify test effort (or extra time) to product and engineering leaders.',
        'During a go/no-go conversation, to show residual risk in plain terms.',
        'Whenever a new area of the product changes and you must re-scope coverage.',
      ] },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'Identify risks as concrete "what could go wrong" statements, not vague areas. "Payment is captured but no order is created" is a risk; "payments" is not.',
        'Score probability on a 1-5 scale: 1 Rare, 2 Unlikely, 3 Possible, 4 Likely, 5 Almost certain. Base it on evidence — change size, code age, past defects, complexity, team familiarity.',
        'Score impact on a 1-5 scale: 1 Negligible, 2 Minor, 3 Moderate, 4 Major, 5 Severe. Weigh customer harm, revenue, data integrity, legal/compliance and reputation.',
        'Multiply the two scores to get a risk rating from 1 to 25, and band it: 1-4 Low, 5-9 Medium, 10-15 High, 16-25 Critical.',
        'Map the band to a test-effort response so the plan is automatic and consistent across the team.',
        'Review the matrix with product and engineering, and record who agreed. Shared ownership of risk is the whole point.',
      ] },
      { t: 'h2', text: 'The probability × impact grid' },
      { t: 'table', headers: ['Probability \\ Impact', 'Negligible (1)', 'Minor (2)', 'Moderate (3)', 'Major (4)', 'Severe (5)'], rows: [
        ['Almost certain (5)', '5 · Med', '10 · High', '15 · High', '20 · Critical', '25 · Critical'],
        ['Likely (4)', '4 · Low', '8 · Med', '12 · High', '16 · Critical', '20 · Critical'],
        ['Possible (3)', '3 · Low', '6 · Med', '9 · Med', '12 · High', '15 · High'],
        ['Unlikely (2)', '2 · Low', '4 · Low', '6 · Med', '8 · Med', '10 · High'],
        ['Rare (1)', '1 · Low', '2 · Low', '3 · Low', '4 · Low', '5 · Med'],
      ] },
      { t: 'table', headers: ['Band', 'Rating', 'Test-effort response'], rows: [
        ['Critical', '16-25', 'Deep, planned testing. Multiple techniques, negative and boundary cases, dedicated review, automated regression. Blocks release if unresolved.'],
        ['High', '10-15', 'Thorough scripted and exploratory testing of the risk. Regression coverage. Explicit sign-off on residual risk.'],
        ['Medium', '5-9', 'Targeted testing, mostly happy path plus the obvious failure modes. Time-box it.'],
        ['Low', '1-4', 'Light touch or sanity check only. Acceptable to defer or skip under time pressure — record the decision.'],
      ] },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'Northstar Digital is releasing a change to the Payments squad\'s checkout flow that also touches the legacy in-house billing service. The QA lead scores five candidate risks. Probability reasoning draws on the known context: the billing monolith is old and fragile, shared staging is unstable, and payments span a third-party provider plus legacy code.' },
      { t: 'table', headers: ['Risk (what could go wrong)', 'Prob.', 'Impact', 'Rating', 'Band', 'Why scored this way'], rows: [
        ['Payment is captured by the provider but no order is created (customer charged, nothing delivered)', '3 Possible', '5 Severe', '15', 'High', 'Split responsibility between provider and legacy billing makes a mismatch plausible; customer harm and refunds are severe.'],
        ['Billing data corruption — a wrong amount written to the legacy billing records', '2 Unlikely', '5 Severe', '10', 'High', 'The change is well isolated, but corrupted financial records are catastrophic and hard to unwind, so it still lands High.'],
        ['Intermittent checkout failure under load or on flaky staging', '3 Possible', '4 Major', '12', 'High', 'Shared staging is unstable and the symptom is intermittent; lost sales and lost trust make the impact Major.'],
        ['Analytics event for "purchase" does not fire, so the funnel report is wrong', '3 Possible', '2 Minor', '6', 'Medium', 'Reasonably likely with a checkout change, but it degrades a report rather than harming a customer.'],
        ['Minor visual defect — the discount label is slightly misaligned on mobile', '4 Likely', '1 Negligible', '4', 'Low', 'Cosmetic churn is common with UI changes, but the consequence is trivial.'],
      ] },
      { t: 'p', text: 'What the plan then becomes: the two High payment/billing risks and the intermittent-failure risk absorb the bulk of the effort — deep exploratory testing of the capture-to-order path, deliberate negative and reconciliation checks against billing, and a repeated run to expose intermittence. The analytics gap gets a single targeted check. The visual defect is logged for later and would not block the release. The QA lead can now stand in front of Tom Fielding, the Head of Product, and say precisely where the time is going and why the cosmetic issue is not getting any.' },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'table', headers: ['Risk (what could go wrong)', 'Prob. (1-5)', 'Impact (1-5)', 'Rating', 'Band', 'Test response / owner'], rows: [
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
      ] },
      { t: 'p', text: 'Reuse the probability, impact and band definitions above unchanged so scores stay comparable across releases and squads.' },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Scoring everything High so nothing is prioritised; treating the numbers as science rather than a shared conversation; scoring probability on gut feel with no reference to change size or defect history; forgetting that a rare event with severe impact (data corruption) still deserves real effort; and building the matrix alone, so product and engineering never own the risk with you.' },
      { t: 'ul', items: [
        'Vague risks ("the API") that cannot be tested for — always phrase risks as a specific failure.',
        'Never revisiting the matrix, so it reflects the plan you imagined, not the product you shipped.',
        'Confusing severity of a defect with impact of a risk — impact is about business consequence, not how loud the crash is.',
      ] },

      { t: 'h1', text: 'How to interpret the results' },
      { t: 'ul', items: [
        'Critical and High risks are your test plan. If you can only test some things, test these — the matrix is your written justification for the rest.',
        'A cluster of Critical risks in one area is a signal to raise scope or timeline before the release, not after.',
        'Low risks are candidates to defer, automate later, or accept explicitly. "We chose not to test X because it scored 3" is a professional statement; silence is not.',
        'A matrix where nearly everything is High usually means the scoring is uncalibrated — recheck probability against real evidence.',
        'Residual risk is what remains High after testing. That, not a pass rate, is what you report at go/no-go.',
      ] },
      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'Score probability from evidence, not instinct. Before you write a number, ask: how large is the change, how old and fragile is the code, and how many defects has this area produced before? A matrix built on evidence survives challenge in the room; one built on feelings collapses the moment an engineer disagrees.' },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 2. Release Risk Assessment
  // ────────────────────────────────────────────────────────────
  {
    slug: 'release-risk-assessment',
    title: 'Release Risk Assessment',
    subtitle: 'A structured read on whether a specific release is safe to ship, and what the residual risk actually is.',
    courseTitle: COURSE,
    category: 'Templates',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'A release risk assessment answers one question for one release: "If we ship this now, what could go wrong, how likely is it, and what have we done about it?" It differs from the product risk matrix, which shapes testing up front. This is the pre-flight check — completed close to release, reflecting what you actually found, so leaders can make an informed decision rather than a hopeful one.' },
      { t: 'p', text: 'Its real value shows under pressure. When someone wants to ship tomorrow, this document replaces the argument "QA says no" with evidence: here is the risk, here is the confidence, here is what mitigates it, here is the call.' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'Immediately before any significant release, as the input to a go/no-go decision.',
        'When a release is being accelerated and you must state residual risk honestly and fast.',
        'When a hotfix must go out and there is no time for a full regression pass.',
        'After a change to a high-blast-radius area (payments, auth, billing, data migrations).',
      ] },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'State what is actually in the release — the changes, not the epic name. Ambiguity here poisons everything downstream.',
        'For each area of change, record what was tested, what was not, and why.',
        'Assess residual risk per area using probability × impact (see the Product Risk Matrix), reflecting testing already done.',
        'Record mitigations that reduce likelihood or impact: feature flags, staged rollout, monitoring, a rehearsed rollback.',
        'Set a confidence level and state your recommendation plainly: Go, Go with conditions, or No-Go.',
        'Name the decision owner. QA advises on risk; the accountable owner decides.',
      ] },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'The scenario: it is late afternoon and Tom Fielding wants the Payments checkout change live tomorrow morning to hit a partner commitment. Shared staging was unstable for most of the day, so testing was compressed. The QA lead fills in the assessment rather than simply resisting.' },
      { t: 'table', headers: ['Field', 'Entry'], rows: [
        ['Release', 'Payments checkout v2.3 — new capture-to-order flow, touches legacy billing write path'],
        ['Requested date', 'Tomorrow 09:00, ahead of a B2B partner commitment'],
        ['In scope', 'Card checkout, order creation, billing record write, purchase analytics event'],
        ['Out of scope (unchanged)', 'Refunds, subscription renewals, admin reporting'],
        ['Tested and passing', 'Happy-path card checkout; order creation; discount application on web and mobile'],
        ['Tested with concerns', 'Billing write path — passed twice, but staging reset mid-test, so the sample is thin'],
        ['Not tested', 'Behaviour under concurrent load; failure/reconciliation when the provider succeeds but billing write fails'],
        ['Blocked by', 'Shared staging instability for ~half the test window; no reliable load environment'],
      ] },
      { t: 'table', headers: ['Area', 'Residual risk', 'Rating', 'Mitigation available'], rows: [
        ['Capture-to-order mismatch (charged, no order)', 'Possible × Severe', 'High', 'Ship behind a feature flag to 5% of traffic; alert on capture-without-order; rehearsed rollback'],
        ['Billing write correctness under load', 'Possible × Major', 'High', 'Staged rollout; reconciliation report run at 1 hour and 24 hours; on-call payments engineer briefed'],
        ['Analytics purchase event', 'Possible × Minor', 'Medium', 'Accept; verify in production within the first hour'],
        ['Discount / visual issues', 'Unlikely × Negligible', 'Low', 'Accept'],
      ] },
      { t: 'table', headers: ['Summary', 'Value'], rows: [
        ['Overall residual risk', 'High, concentrated in the money path'],
        ['Confidence in the assessment', 'Medium — reduced by compressed, staging-limited testing'],
        ['Recommendation', 'Go with conditions'],
        ['Conditions', '1) Flagged 5% rollout, not 100%. 2) Capture-without-order alert live before release. 3) Reconciliation report at +1h and +24h. 4) Named on-call owner. 5) Rollback rehearsed and under 15 minutes.'],
        ['Decision owner', 'VP Engineering (Priya Nadar), with Head of Product'],
      ] },
      { t: 'p', text: 'The outcome is not "no". It is a shippable path that protects the money while honouring the date — and it makes the conditions, not QA, the thing the business signs up to. If leadership declines the conditions, the recommendation reverts to No-Go, and that too is now on the record.' },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'table', headers: ['Field', 'Entry'], rows: [
        ['Release', ''], ['Requested date', ''], ['In scope', ''], ['Out of scope', ''],
        ['Tested and passing', ''], ['Tested with concerns', ''], ['Not tested', ''], ['Blocked by', ''],
      ] },
      { t: 'table', headers: ['Area', 'Residual risk (prob × impact)', 'Rating', 'Mitigation available'], rows: [
        ['', '', '', ''], ['', '', '', ''], ['', '', '', ''],
      ] },
      { t: 'table', headers: ['Summary', 'Value'], rows: [
        ['Overall residual risk', ''], ['Confidence in the assessment', 'High / Medium / Low'],
        ['Recommendation', 'Go / Go with conditions / No-Go'], ['Conditions', ''], ['Decision owner', ''],
      ] },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Reporting a green pass rate while hiding that half the plan was blocked by staging; conflating "we did not test it" with "it works"; giving a binary Go/No-Go with no conditional middle path, which forces a needless fight; owning the decision yourself instead of advising the accountable owner; and omitting confidence, so a thin, rushed assessment reads as authoritative as a thorough one.' },
      { t: 'ul', items: [
        'Listing mitigations that do not actually exist yet ("we can roll back" when rollback has never been tested).',
        'Assessing risk against the plan rather than against what was really executed.',
      ] },

      { t: 'h1', text: 'How to interpret the results' },
      { t: 'ul', items: [
        'Read residual risk and confidence together. High residual risk with low confidence is the most dangerous combination and rarely a clean Go.',
        'Concentrated risk (one High area) is often shippable with a targeted mitigation; scattered High risk across many areas usually is not.',
        '"Go with conditions" is the professional default when a date matters and the risk is containable — it moves the decision from opinion to a checklist.',
        'If the mitigations are what make it a Go, the mitigations are mandatory, not optional. Track them as release blockers.',
        'A No-Go should always state what would change it to a Go, so the path forward is obvious.',
      ] },
      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'Never let "we ran out of time to test it" be silently read as "it is fine". The most valuable line in any release assessment is the honest "Not tested" row. Leaders forgive known, stated risk; they do not forgive discovering after an incident that you knew the gap and stayed quiet.' },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 3. Go / No-Go Decision Template
  // ────────────────────────────────────────────────────────────
  {
    slug: 'go-no-go-decision-template',
    title: 'Go / No-Go Decision Template',
    subtitle: 'Run a fast, fair release decision meeting where the risk is clear and the accountability is explicit.',
    courseTitle: COURSE,
    category: 'Templates',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'A go/no-go template turns the release decision from a hallway conversation into a short, structured meeting with a clear record. It gathers the people who own the risk, checks a small set of criteria, surfaces residual risk honestly, and produces a decision with a named owner. The point is not to slow releases down — it is to make the decision defensible and to stop QA from being the accidental scapegoat when a release goes wrong.' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'Before any release significant enough that a bad outcome would matter to customers or the business.',
        'When multiple squads or stakeholders must align — as at Northstar, where each squad releases on its own cadence with no shared quality gate.',
        'Whenever a release is contested (product wants speed, engineering wants more automation, QA sees residual risk).',
        'As a lightweight recurring ritual so the decision is a habit, not a crisis.',
      ] },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'Circulate the release risk assessment before the meeting, not during it. The meeting is for the decision, not the reading.',
        'Confirm the decision owner (the accountable person) and the advisers (QA on risk, engineering on technical readiness, product on business need).',
        'Walk the criteria checklist and mark each Red, Amber or Green with evidence, not opinion.',
        'State residual risk and confidence in one or two sentences each.',
        'Take the decision: Go, Go with conditions, or No-Go. If conditions, list them as blockers with owners.',
        'Record it: who decided, what was known, what was accepted, and who owns each follow-up. Distribute it.',
      ] },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'The Payments checkout v2.3 decision from the release risk assessment, run as a go/no-go with Priya Nadar (VP Engineering, decision owner), the QA lead, Marcus Lee (Payments squad lead) and Tom Fielding (Head of Product).' },
      { t: 'table', headers: ['Criterion', 'Status', 'Evidence'], rows: [
        ['All Critical and High risks tested or mitigated', 'Amber', 'Two High risks remain, both with concrete mitigations agreed'],
        ['No open critical defects', 'Green', 'None open against this release'],
        ['Regression of impacted areas complete', 'Amber', 'Impacted areas covered; load and reconciliation paths not exercised'],
        ['Rollback tested and fast', 'Green', 'Feature flag rollback rehearsed, under 15 minutes'],
        ['Monitoring and alerting in place', 'Amber', 'Capture-without-order alert to be enabled before release — a condition'],
        ['Environment / test-data confidence', 'Red', 'Shared staging unstable through half the window; confidence reduced'],
        ['Stakeholders informed of residual risk', 'Green', 'This meeting; on-call owner briefed'],
      ] },
      { t: 'table', headers: ['Decision record', 'Value'], rows: [
        ['Residual risk', 'High, concentrated in the capture-to-order and billing-write paths'],
        ['Confidence', 'Medium, limited by staging instability'],
        ['Decision', 'Go with conditions'],
        ['Conditions (blockers)', 'Flagged 5% rollout; capture-without-order alert live; reconciliation report at +1h and +24h; named on-call owner; rehearsed rollback'],
        ['Decision owner', 'Priya Nadar (VP Engineering)'],
        ['What was explicitly accepted', 'Untested behaviour under concurrent load, mitigated by staged rollout and monitoring'],
        ['Review point', 'Reconciliation report reviewed at +24h before widening the rollout'],
      ] },
      { t: 'p', text: 'Everyone leaves knowing the same thing: it is shipping, but narrowly and watched, and the accepted risk is on the record with the person who accepted it. Marcus, sceptical of QA, sees QA enabling the release rather than blocking it — which does more for QA\'s credibility than any test-case count.' },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'table', headers: ['Criterion', 'Status (R/A/G)', 'Evidence'], rows: [
        ['All Critical and High risks tested or mitigated', '', ''],
        ['No open critical defects', '', ''],
        ['Regression of impacted areas complete', '', ''],
        ['Rollback tested and fast', '', ''],
        ['Monitoring and alerting in place', '', ''],
        ['Environment / test-data confidence', '', ''],
        ['Stakeholders informed of residual risk', '', ''],
      ] },
      { t: 'table', headers: ['Decision record', 'Value'], rows: [
        ['Residual risk', ''], ['Confidence', 'High / Medium / Low'],
        ['Decision', 'Go / Go with conditions / No-Go'], ['Conditions (blockers)', ''],
        ['Decision owner', ''], ['What was explicitly accepted', ''], ['Review point', ''],
      ] },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Letting QA "make the call" — QA advises on risk, the accountable owner decides; running the meeting as a rubber stamp where Red items are talked away without action; marking criteria on opinion rather than evidence; producing no written record, so nobody can reconstruct what was known; and treating every release as needing the full ceremony, which trains people to skip it.' },
      { t: 'ul', items: [
        'Inviting people who cannot decide and excluding the one who can.',
        'Accepting risk verbally without recording who accepted it and what exactly they accepted.',
      ] },

      { t: 'h1', text: 'How to interpret the results' },
      { t: 'ul', items: [
        'Any Red on a Critical/High-risk criterion should force either a No-Go or a specific, owned mitigation — never a shrug.',
        'A row of Ambers with real mitigations is a healthy "Go with conditions"; a row of Ambers with no mitigations is a No-Go wearing optimism.',
        'The value is in the record. Six months later, the decision log is what protects the team and improves the next decision.',
        'If the same criterion is Red release after release (for Northstar, environment stability), that is a systemic problem to escalate, not a per-release nuisance.',
        'Right-size the ceremony: a small, low-risk change needs a two-minute async check; a payments change needs the full meeting.',
      ] },
      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'The decision owner is never QA. Your job is to make the risk impossible to misunderstand and then hand the decision to the person accountable for the outcome. Do this consistently and you convert QA from "the team that blocks releases" into "the team that lets us ship with our eyes open" — a reputation worth far more than a veto.' },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 4. QA Metrics Catalogue
  // ────────────────────────────────────────────────────────────
  {
    slug: 'qa-metrics-catalogue',
    title: 'QA Metrics Catalogue',
    subtitle: 'The metrics worth reporting, what each one actually tells you, and the vanity metrics to stop reporting today.',
    courseTitle: COURSE,
    category: 'Templates',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'A metrics catalogue is a curated menu of measures a QA leader can choose from, each defined once so it means the same thing to everyone. Its purpose is to move the conversation away from activity ("we wrote 400 tests") and towards outcomes ("fewer defects reach customers, and we recover faster when they do"). The catalogue also serves a second, quieter purpose: to give you the language to retire the vanity metrics that make QA look busy but say nothing about quality.' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'When you inherit a team reporting the wrong things — as at Northstar, where test-case count and bugs-found are reported and escaped defects are not.',
        'When setting up quality reporting for the first time and deciding what to measure.',
        'When an executive asks "how do we know quality is improving?" and you need a defensible answer.',
        'As the source list from which you build a Quality Health Scorecard or an Executive Quality Dashboard.',
      ] },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'Pick a small set — five to eight metrics — that map to outcomes leaders care about, not everything you can count.',
        'For each metric, agree a single definition, an owner, and a cadence before you report it once.',
        'Always pair a metric with context: a trend over time and a "what would make this better or worse" note. A number alone invites the wrong conclusion.',
        'Read the caution column for every metric — each one can be gamed or misread, and knowing how is part of using it responsibly.',
        'Retire the vanity metrics deliberately and explain why, so their disappearance is a decision, not an omission.',
      ] },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'A catalogue of meaningful QA and delivery metrics. The values are deliberately left out — this is the reference definition; you supply your own measured data over time.' },
      { t: 'table', headers: ['Metric', 'Definition', 'What it tells you', 'Caution'], rows: [
        ['Escaped defects', 'Defects found in production that testing should reasonably have caught, per release or per period.', 'The single clearest signal of testing effectiveness where it matters — after release.', 'Needs a fair "should reasonably have caught" rule, or it becomes a blame stick.'],
        ['Production incidents', 'Count and severity of customer-affecting incidents attributable to a change.', 'Whether releases are getting safer or riskier over time.', 'Driven by many factors beyond QA; read as a system signal, not a QA scorecard.'],
        ['Change failure rate', 'Proportion of releases that cause a failure needing a fix, rollback or hotfix.', 'How reliably the delivery system ships safe change — a core delivery-health measure.', 'Requires an agreed definition of "failure"; easy to under-count by relabelling incidents.'],
        ['Rework', 'Effort spent redoing work due to defects, reopened tickets or failed acceptance.', 'The hidden cost of poor quality upstream; a strong ROI argument for earlier QA involvement.', 'Hard to measure precisely; use trend and proportion, not false precision.'],
        ['Defect ageing', 'How long open defects have been open, banded by age and severity.', 'Whether defects are being resolved or quietly accumulating as debt.', 'Old low-severity defects can be fine; always band by severity before drawing conclusions.'],
        ['Flaky-test rate', 'Proportion of automated tests that pass and fail without a code change.', 'How much you can trust your automation — and how much time it wastes.', 'A falling rate can mean flaky tests were deleted, not fixed; check alongside coverage.'],
        ['Pipeline feedback time', 'Time from a commit to a trustworthy pass/fail result from the pipeline.', 'How fast the team learns it broke something; long feedback slows everything.', 'Fast but flaky feedback is worse than slow and reliable; pair with flaky-test rate.'],
        ['Customer-reported defects', 'Defects raised by customers or support rather than found internally.', 'What your testing and monitoring are missing entirely, from the user\'s side.', 'Under-reported by users; a low count may mean low reporting, not high quality.'],
        ['Risk coverage', 'Proportion of identified Critical/High product risks with adequate test coverage.', 'Whether effort is aimed at what matters, rather than at what is easy to test.', 'Only as honest as the risk assessment behind it; garbage risks give garbage coverage.'],
        ['MTTD (mean time to detect)', 'Average time from a defect being introduced or an incident starting to it being detected.', 'How good your monitoring and alerting are at catching problems early.', 'An average hides outliers; the worst case often matters more than the mean.'],
        ['MTTR (mean time to recover)', 'Average time from detection to service being restored.', 'Resilience — how quickly you limit the damage when something does go wrong.', 'Improving MTTR must not become an excuse to tolerate more incidents.'],
      ] },
      { t: 'h2', text: 'Vanity metrics to avoid — and why' },
      { t: 'table', headers: ['Vanity metric', 'Why it misleads', 'Report this instead'], rows: [
        ['Number of test cases', 'Measures volume of documentation, not coverage of risk. A thousand shallow cases beat by ten sharp ones.', 'Risk coverage of Critical/High risks.'],
        ['Raw bug count (bugs found)', 'Rewards finding many trivial bugs and punishes a clean, well-built feature. More bugs is not more value.', 'Escaped defects and severity mix.'],
        ['Pass rate without context', 'A 98% pass rate is meaningless if the 2% is the payment path, or if half the suite is flaky, or the plan was never finished.', 'Residual risk and what was not tested.'],
        ['Automation count (tests automated)', 'Counts activity, not trust or value. Northstar has ~1,800 UI tests that are ~25% flaky and distrusted — a high number hiding a low signal.', 'Flaky-test rate and pipeline feedback time.'],
        ['Tests executed', 'Rewards running tests, including low-value and duplicate ones, regardless of what they protect.', 'Change failure rate and escaped defects.'],
      ] },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'table', headers: ['Metric', 'Definition', 'What it tells you', 'Caution', 'Owner', 'Cadence'], rows: [
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
      ] },
      { t: 'p', text: 'Use the Metric Definition Template to specify each chosen metric in full before it enters regular reporting.' },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Reporting activity metrics (test-case count, bugs found, tests executed) because they are easy to count and make QA look busy; tracking a dozen metrics nobody acts on; reporting a single number with no trend and no context; setting targets on a metric before understanding how it can be gamed; and using escaped defects or bug counts to blame individuals, which teaches people to hide problems rather than surface them.' },
      { t: 'ul', items: [
        'Comparing metrics across teams with different definitions, so the comparison is meaningless.',
        'Optimising one metric in isolation — driving down flaky-test rate by deleting tests, for instance.',
      ] },

      { t: 'h1', text: 'How to interpret the results' },
      { t: 'ul', items: [
        'Read metrics in balanced pairs, never alone: escaped defects with risk coverage, MTTR with incident count, flaky-test rate with pipeline feedback time. A pair resists gaming; a single number invites it.',
        'Trend beats snapshot. "Escaped defects are falling three periods running" tells you more than any single figure.',
        'A metric that no decision depends on should be dropped. If nothing changes whether it is red or green, it is decoration.',
        'When a metric looks great in isolation, ask what it might be hiding — a superb pass rate over a distrusted, flaky suite is a warning, not a comfort.',
        'Use metrics to ask better questions, not to hand out verdicts. Their job is to point you at where to look.',
      ] },
      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'The fastest way to earn a data-driven leader\'s respect is to walk in and retire your own vanity metrics before anyone asks. Telling a VP Engineering "I have stopped reporting test-case count because it measures typing, not quality — here is escaped-defect trend instead" signals judgement that no dashboard ever will.' },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 5. Executive Quality Dashboard
  // ────────────────────────────────────────────────────────────
  {
    slug: 'executive-quality-dashboard',
    title: 'Executive Quality Dashboard',
    subtitle: 'Frame the same quality data for executives — as risk, trend and decisions — without drowning them in QA detail.',
    courseTitle: COURSE,
    category: 'Templates',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'An executive quality dashboard presents quality as a business concern — risk, trend and the decisions that follow — rather than as QA activity. Its central idea is that different audiences need different information from the same underlying data. An executive needs to know whether quality is helping or hurting the business objectives and what decision is being asked of them. A squad needs the granular signals that tell them what to fix this week. Show an executive the team view and they disengage; show a team the executive view and they cannot act. This template makes the translation deliberate.' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'For a recurring leadership or board update on quality, alongside delivery and growth.',
        'When an executive sponsor wants "faster, safer releases" but has no shared definition of either — the dashboard supplies one.',
        'When you are arguing for investment (headcount, tooling, time) and must frame quality as risk and ROI, not as QA workload.',
        'Whenever you catch yourself pasting a team burndown into an exec deck — that is the signal you need this.',
      ] },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'Start from the business objectives, not the metrics. At Northstar: ship faster without more incidents; make the public API dependable enough to sell against SLAs; control cost.',
        'For each objective, choose one or two outcome metrics from the QA Metrics Catalogue that speak directly to it.',
        'Show status as direction and risk (improving/steady/worsening, and a RAG), not raw numbers an executive cannot calibrate.',
        'For every red or worsening item, state the decision or support you are asking for. An executive dashboard without asks is just noise.',
        'Keep it to one screen. If it needs scrolling, it is a team view wearing an executive badge.',
        'Maintain the detailed team view separately, and be ready to drill into it if asked — but do not lead with it.',
      ] },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'The same reporting period at Northstar, shown two ways. First the executive view: outcomes, trend, and asks, tied to business objectives. The trend words describe direction only — no invented figures.' },
      { t: 'table', headers: ['Business objective', 'Quality signal', 'Status', 'Trend', 'Decision / ask'], rows: [
        ['Ship faster without more incidents', 'Escaped defects & production incidents', 'Amber', 'Improving', 'Continue earlier QA involvement; no ask this period'],
        ['Ship faster without more incidents', 'Change failure rate', 'Red', 'Steady', 'Approve a shared release quality gate across squads'],
        ['Dependable public API for SLAs', 'Risk coverage of API critical paths', 'Amber', 'Improving', 'Endorse API contract-test investment over more UI tests'],
        ['Control cost', 'Regression cost (5-day manual pass) & automation trust', 'Red', 'Worsening', 'Fund targeted automation of critical journeys; retire flaky UI tests'],
        ['Overall', 'Confidence in shipping safely', 'Amber', 'Improving', 'On track if the two asks above are supported'],
      ] },
      { t: 'p', text: 'Now the team view of the very same underlying data — granular, actionable, and exactly what would lose an executive\'s attention.' },
      { t: 'table', headers: ['Metric', 'This period', 'Owner', 'Action this sprint'], rows: [
        ['Escaped defects by squad', 'Payments highest; Web lowest', 'Squad QA leads', 'Root-cause the Payments escapes at retro'],
        ['Flaky-test rate (UI suite)', '~25% of ~1,800 tests', 'Dan Whitmore', 'Quarantine top 50 flaky tests; stop them blocking merges'],
        ['Pipeline feedback time', '~6-hour UI run', 'Platform + QA', 'Split suite; run critical subset on PR'],
        ['Defect ageing', 'Backlog of ageing low-severity defects', 'Squad leads', 'Triage and close or accept stale defects'],
        ['Regression pass duration', '~5 days manual before major releases', 'QA team', 'Identify top 20 journeys to automate first'],
        ['Environment stability', 'Shared staging unstable', 'Platform team', 'Escalate isolated test-data environment'],
      ] },
      { t: 'p', text: 'The two tables are drawn from one data set. The executive table answers "is quality helping the business, and what do you need from me?". The team table answers "what do I fix on Tuesday?". Neither could stand in for the other, and that is the entire point.' },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'p', text: 'Executive view:' },
      { t: 'table', headers: ['Business objective', 'Quality signal', 'Status (R/A/G)', 'Trend', 'Decision / ask'], rows: [
        ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''],
        ['Overall', '', '', '', ''],
      ] },
      { t: 'p', text: 'Team view:' },
      { t: 'table', headers: ['Metric', 'This period', 'Owner', 'Action this sprint'], rows: [
        ['', '', '', ''], ['', '', '', ''], ['', '', '', ''],
      ] },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Showing executives the team\'s operational metrics and losing the room; presenting numbers with no direction and no ask, so leaders cannot tell good from bad or what to do; using QA jargon (test cases, flaky, coverage percentages) an executive cannot calibrate; a dashboard so dense it needs scrolling; and reporting status with no link to the business objectives leaders are actually measured on.' },
      { t: 'ul', items: [
        'Colouring things green to look good, then having no credibility when something goes red.',
        'Never asking for anything, so quality reads as a status update rather than a lever the business can pull.',
      ] },

      { t: 'h1', text: 'How to interpret the results' },
      { t: 'ul', items: [
        'Read the executive view as "objective at risk?" and "decision required?". If nothing is asked for, either everything is genuinely fine or the dashboard is hiding something.',
        'Trend direction matters more to an executive than the absolute value — "worsening" on a green metric deserves attention before "steady" on a red one.',
        'Red plus a clear ask is a healthy dashboard; red with no ask means you have not finished thinking.',
        'If an executive keeps drilling into detail, your outcome framing is not yet convincing — tighten the link to their objectives.',
        'Consistency period to period lets leaders track your quality story like any other business trend, which is exactly the credibility you want.',
      ] },
      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'Rehearse the one-sentence headline before you build the dashboard: "Quality is improving and on track, and I need two decisions from you to keep it that way." If you cannot say that sentence, you are not ready to present — and no amount of well-formatted tables will rescue a report that has no point of view.' },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 6. Metric Definition Template
  // ────────────────────────────────────────────────────────────
  {
    slug: 'metric-definition-template',
    title: 'Metric Definition Template',
    subtitle: 'Define a metric precisely — once — so it means the same thing to everyone who reports or reads it.',
    courseTitle: COURSE,
    category: 'Templates',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'A metric definition template pins down exactly what a metric means before anyone reports it. Most metric disputes are not about the number — they are about the definition: what counts as an "escaped defect", when the clock starts for "time to recover", which releases count as "failures". This template captures name, meaning, formula, owner, cadence, audience, target and — crucially — caveats, so a figure cannot be quietly redefined to tell a more flattering story later.' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'Before any metric enters regular reporting — define it once, agree it, then measure it.',
        'When two people or squads report "the same" metric and get different numbers.',
        'When adopting metrics from the QA Metrics Catalogue into your own scorecard or dashboard.',
        'When a metric is about to have a target attached, so everyone understands what the target is really rewarding.',
      ] },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'Name the metric plainly and state in one sentence what it measures — the outcome, not the mechanism.',
        'Write the formula or calculation explicitly, including the boundary rules (what is in, what is out, when the clock starts and stops).',
        'Name a single owner accountable for the number and its integrity.',
        'Set the cadence (how often it is measured and reported) and the audience (who reads it and why).',
        'Set a target or threshold only if you can defend it, and record whether it is a goal, a limit or a watch-line.',
        'List the caveats honestly: how the metric can mislead, how it can be gamed, and what it must be read alongside.',
      ] },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'A completed definition for one of the most valuable QA metrics — escaped defects — specified for Northstar.' },
      { t: 'table', headers: ['Field', 'Definition'], rows: [
        ['Metric name', 'Escaped defect rate'],
        ['What it measures', 'How often defects that testing should reasonably have caught reach production and affect customers.'],
        ['Formula / how calculated', 'Escaped defects in the period ÷ total defects found in the period (internal + escaped), expressed as a percentage. "Escaped" = raised after release by customers, support or monitoring, and judged catchable pre-release by the triage rule.'],
        ['Boundary rules', 'Counts customer-affecting defects only. Excludes defects in areas explicitly out of scope and accepted as known risk. Attributed to the release that introduced them, not the one that found them.'],
        ['Owner', 'QA lead (integrity of the number); squad QA leads supply their squad data.'],
        ['Frequency', 'Measured per release; reported monthly as a trend.'],
        ['Audience', 'Team view: squad QA leads and engineers (to drive root-cause). Executive view: VP Engineering (as a safety-of-releases trend).'],
        ['Target / threshold', 'Watch-line, not a hard target: a sustained downward trend is the goal. A rising trend over two periods triggers a root-cause review. No individual-level target — this is a system metric.'],
        ['Caveats', 'Depends on a fair "catchable" triage rule, or it becomes blame. A low count can reflect low customer reporting, not high quality — read alongside customer-reported defects. Do not compare across squads with different scope definitions.'],
      ] },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'table', headers: ['Field', 'Definition'], rows: [
        ['Metric name', ''],
        ['What it measures', ''],
        ['Formula / how calculated', ''],
        ['Boundary rules', ''],
        ['Owner', ''],
        ['Frequency', ''],
        ['Audience', ''],
        ['Target / threshold', ''],
        ['Caveats', ''],
      ] },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Reporting a metric before its definition is agreed, so the number is argued over forever; leaving out boundary rules (the clock-start, the in/out list) that are the real source of disagreement; omitting caveats, which makes a fragile metric look authoritative; attaching a target before understanding how the metric can be gamed; and having no single owner, so no one is accountable when the number drifts.' },
      { t: 'ul', items: [
        'Defining the mechanism ("count of Jira tickets in state X") instead of the outcome it stands for.',
        'Silently changing the definition between periods, breaking the trend and the trust.',
      ] },

      { t: 'h1', text: 'How to interpret the results' },
      { t: 'ul', items: [
        'A metric whose definition you cannot state in one clear sentence is not ready to report — refine it first.',
        'The caveats field is not boilerplate; it tells the reader exactly how to avoid drawing the wrong conclusion.',
        'Whether a threshold is a goal, a limit or a watch-line changes behaviour — an ambiguous target invites gaming.',
        'If two teams produce different numbers for the same metric, the fix is almost always in the boundary rules, not the data.',
        'A stable, well-owned definition is what lets a trend mean something over time; a shifting definition makes every comparison suspect.',
      ] },
      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'Write the caveats before the formula. Forcing yourself to state how a metric can mislead — before you fall in love with the number — is the discipline that separates a leader who reports data from one who is quietly misled by it. If you cannot articulate how a metric could lie, you do not yet understand it well enough to publish it.' },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 7. Quality Health Scorecard
  // ────────────────────────────────────────────────────────────
  {
    slug: 'quality-health-scorecard',
    title: 'Quality Health Scorecard',
    subtitle: 'A one-page, RAG-rated read on the overall health of quality across dimensions — and where to invest next.',
    courseTitle: COURSE,
    category: 'Templates',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'A quality health scorecard gives a single, honest, at-a-glance view of how healthy quality is across the dimensions that matter — not just testing, but the whole system that produces quality: requirements, coverage, automation, environments, defect discipline and outcomes. It exists to answer two questions a leader asks constantly: "Where do we stand?" and "Where should the next unit of effort go?". Unlike a dashboard aimed at executives, the scorecard is a working diagnostic for the QA leader and the engineering leaders they partner with.' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'In the first weeks of a new QA leadership role, to establish an honest baseline of what you have inherited.',
        'Quarterly, to track whether quality health is genuinely improving and to re-target investment.',
        'When deciding between competing improvement bets (more automation vs better environments vs earlier involvement).',
        'When you need to show progress over time to a sponsor who wants "faster, safer releases".',
      ] },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'Choose the dimensions that describe your quality system end to end — not just test execution.',
        'For each, write a plain-language "what good looks like" so the RAG rating is judged against a standard, not a mood.',
        'Rate each dimension Red, Amber or Green with a one-line evidence note. Be honest; a scorecard that is all green on day one is not credible.',
        'Add a trend arrow (improving / steady / worsening) so the reader sees direction, not just position.',
        'Name the single highest-value action for each Red or worsening dimension, with an owner.',
        'Re-run it on a fixed cadence with the same dimensions, so the comparison over time is meaningful.',
      ] },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'An honest baseline scorecard for Northstar as a QA leader would find it on arrival, drawn from the known current state — centralised QA pulled in late, a 5-day manual regression, a large and flaky UI suite, unstable shared staging, inconsistent requirements, and metrics that measure activity rather than outcomes.' },
      { t: 'table', headers: ['Dimension', 'What good looks like', 'RAG', 'Trend', 'Evidence / note'], rows: [
        ['Requirements quality', 'Clear, testable acceptance criteria on every story', 'Red', 'Steady', 'Inconsistent across squads; some hand over a design link and a sentence'],
        ['QA involvement timing', 'QA engaged from refinement, not after code-complete', 'Red', 'Steady', 'Centralised QA pulled in late, once stories are code-complete'],
        ['Risk-based coverage', 'Critical/High risks explicitly covered and tracked', 'Amber', 'Improving', 'Being introduced; not yet consistent across all squads'],
        ['Automation health', 'Trusted, fast, low-flake automation owned by the whole team', 'Red', 'Worsening', 'Large UI suite (~1,800 tests), ~6-hour run, ~25% flaky, owned by QA alone, low trust'],
        ['Regression efficiency', 'Fast, largely automated regression of critical journeys', 'Red', 'Steady', '~5-day manual regression before major releases'],
        ['Environment & test data', 'Stable environments with a reliable test-data strategy', 'Red', 'Steady', 'Shared staging unstable; frequently "someone else\'s data"'],
        ['Defect management discipline', 'Consistent severity/priority; defects resolved not hoarded', 'Amber', 'Steady', 'Jira workflow exists but severity/priority used loosely'],
        ['Escaped defects / outcomes', 'Low and falling customer-affecting escapes', 'Red', 'Worsening', 'Production defects trending up; escaped defects not yet even measured'],
        ['Metrics & reporting maturity', 'Outcome metrics with context, not activity counts', 'Red', 'Improving', 'Currently reports test-case and bug counts; catalogue being introduced'],
        ['Team capability & career path', 'Skills matrix and a progression ladder', 'Amber', 'Steady', 'Strong exploratory testers; no QA career framework yet'],
      ] },
      { t: 'p', text: 'The scorecard immediately tells the investment story. Automation is Red and worsening, but pouring effort straight into more tests would repeat last year\'s failed "automate everything" push. The upstream Reds — requirements quality and late QA involvement — are cheaper to move and reduce the defects that make regression painful in the first place. So the first bet is earlier involvement and clearer acceptance criteria, the second is stabilising environments, and only then targeted automation of critical journeys. The scorecard turns a vague "improve quality" into a defensible sequence.' },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'table', headers: ['Dimension', 'What good looks like', 'RAG', 'Trend', 'Highest-value next action / owner'], rows: [
        ['Requirements quality', '', '', '', ''],
        ['QA involvement timing', '', '', '', ''],
        ['Risk-based coverage', '', '', '', ''],
        ['Automation health', '', '', '', ''],
        ['Regression efficiency', '', '', '', ''],
        ['Environment & test data', '', '', '', ''],
        ['Defect management discipline', '', '', '', ''],
        ['Escaped defects / outcomes', '', '', '', ''],
        ['Metrics & reporting maturity', '', '', '', ''],
        ['Team capability & career path', '', '', '', ''],
      ] },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Rating everything green to look competent, which destroys the scorecard\'s credibility the first time reality disagrees; scoring dimensions on mood rather than against a written "what good looks like"; measuring only test execution and ignoring the upstream dimensions (requirements, involvement timing) that cause most defects; changing the dimensions every quarter so no trend is possible; and producing the scorecard without naming the next action, leaving a diagnosis with no prescription.' },
      { t: 'ul', items: [
        'Treating the RAG as a grade on the QA team rather than a health check on the whole quality system.',
        'Investing in the loudest Red (automation) before the cheapest, highest-leverage one (requirements and early involvement).',
      ] },

      { t: 'h1', text: 'How to interpret the results' },
      { t: 'ul', items: [
        'Look for upstream Reds first. Poor requirements and late involvement cause downstream pain, so fixing them often turns several other dimensions Amber for less effort.',
        'A Red that is improving needs patience; a Green that is worsening needs attention now — trend can matter more than position.',
        'Do not chase all Reds at once. The scorecard\'s job is to sequence a small number of high-leverage bets, not to justify doing everything.',
        'Beware the tempting Red (a big flaky automation suite) that would repeat a past failure — check that the root cause is addressed before re-investing.',
        'Run the same dimensions on the same cadence; the value compounds as a trend that shows a sponsor real, sequenced progress rather than a one-off snapshot.',
      ] },
      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'Present your first scorecard with several honest Reds and a clear plan, not a reassuring wall of green. A new leader who says "here is exactly where we are weak, and here is the order I will fix it in" earns far more trust than one who claims everything is fine — and the honest baseline is what lets you prove, quarter on quarter, that you moved the needle.' },
    ],
  },
];
