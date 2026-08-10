// QA Leadership Academy — Resource Vault.
// Stakeholder, communication and people-leadership tools.
// Each entry is a complete, usable instrument grounded in the Northstar
// Digital case study (see docs/NORTHSTAR_DIGITAL.md).
const COURSE = 'QA Leadership Academy';

export default [
  // ────────────────────────────────────────────────────────────
  // 1. Stakeholder Map
  // ────────────────────────────────────────────────────────────
  {
    slug: 'stakeholder-map',
    title: 'Stakeholder Map',
    subtitle: 'Plot the people who shape your quality mandate by influence and interest, then choose a deliberate approach for each.',
    courseTitle: COURSE,
    category: 'Templates',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'A stakeholder map tells you where to spend your limited political capital. As a QA leader you rarely control the levers you need — budget, engineering time, release decisions — so you influence them through other people. This tool forces you to be honest about who holds power, who cares about quality, and how each relationship currently stands, so your engagement is planned rather than reactive.' },
      { t: 'p', text: 'The core mechanism is an influence-by-interest grid. "Influence" is how much a person can help or block your agenda. "Interest" is how much they currently care about quality outcomes. The combination tells you the right posture: whom to actively manage, whom to keep satisfied, whom to keep informed, and whom to simply monitor.' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'In your first weeks in a role, to map the terrain before you commit to a plan.',
        'Before launching any change that needs cross-team buy-in — a shared quality gate, a testing strategy, a headcount request.',
        'When an initiative is stalling and you suspect the blocker is a person, not a technical problem.',
        'Ahead of a reorganisation, a new exec sponsor, or a major release where accountability will be contested.',
        'Quarterly, as a lightweight review — relationships and priorities drift, and a map more than a quarter old is usually stale.',
      ] },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'List every person who can materially help or block your quality agenda. Include sceptics, not just allies — the people who can block you matter most.',
        'Rate each on influence (High / Low) over the outcomes you care about, and on interest (High / Low) in quality itself. Be honest, not aspirational.',
        'Place each name in one of the four quadrants below.',
        'For each person, capture what they want, what they fear, and how the relationship stands today (supportive / neutral / sceptical).',
        'Choose one deliberate approach and a single next action per person. Vague intentions such as "build rapport" do not count — name the meeting, the message, or the data you will bring.',
        'Note who influences whom. Often the fastest route to a sceptic is through a peer they already trust.',
        'Revisit as relationships move. The goal is to shift key people towards higher interest and stronger support over time.',
      ] },
      { t: 'p', text: 'The four quadrants and the posture each calls for:' },
      { t: 'table', headers: ['Quadrant', 'Influence / Interest', 'Approach'], rows: [
        ['Manage closely', 'High influence, high interest', 'Engage often, involve in decisions, co-own outcomes. These are your true partners and sponsors.'],
        ['Keep satisfied', 'High influence, low interest', 'Do not overload with detail; give them the headline, the risk and the decision they must make. Lose these and your agenda dies.'],
        ['Keep informed', 'Low influence, high interest', 'Useful allies and information sources. Keep them close; they often become advocates.'],
        ['Monitor', 'Low influence, low interest', 'Light touch. Do not spend scarce capital here until their position changes.'],
      ] },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'Newly appointed QA lead at Northstar Digital, mapping the stakeholders around a proposed shared quality gate and a shift towards earlier QA involvement.' },
      { t: 'table', headers: ['Stakeholder', 'Quadrant', 'What they want', 'What they fear', 'Stance today'], rows: [
        ['Priya Nadar — VP Engineering', 'Manage closely', 'Faster delivery without more production incidents; decisions framed in risk and outcomes.', 'A QA leader who reports test-case counts and cannot connect quality to delivery.', 'Supportive but time-poor'],
        ['The CTO — exec sponsor', 'Keep satisfied', '"Faster, safer releases" and "more automation" — currently undefined.', 'Being surprised by an incident the board hears about first.', 'Neutral, high altitude'],
        ['Tom Fielding — Head of Product', 'Manage closely', 'To hit growth dates and ship features.', 'QA becoming a late, opaque blocker that threatens his roadmap.', 'Neutral, reasonable when shown residual risk'],
        ['Marcus Lee — Payments squad lead', 'Keep satisfied', 'Autonomy for his engineers; no process he sees as overhead.', 'QA slowing his squad or implying his developers cannot self-test.', 'Sceptical — unconvinced, not hostile'],
        ['Sofia Alvarez — senior QA', 'Manage closely', 'Recognition, a real say, stability after last year’s failed automation push.', 'Another top-down change that ignores the team’s hard-won knowledge.', 'Wary ally'],
        ['Dan Whitmore — automation engineer', 'Keep informed', 'His flaky Selenium suite to stop consuming his life; to do work that is valued.', 'Being left to maintain a suite nobody trusts, alone, indefinitely.', 'Supportive, quietly burning out'],
      ] },
      { t: 'p', text: 'The tailored approach that follows from the map:' },
      { t: 'table', headers: ['Stakeholder', 'Deliberate approach', 'Next action'], rows: [
        ['Priya', 'Treat as primary sponsor. Bring risk-and-outcome framing, never activity metrics. Co-author the quality-gate proposal so it is hers as much as mine.', 'Fortnightly 30-minute standing slot; first one to agree the two metrics we will move.'],
        ['CTO', 'Keep satisfied with a short, quarterly risk-and-trend view. Translate "faster, safer" into a measurable definition and get it acknowledged.', 'One-page proposal defining "safer release" as change failure rate and escaped defects, routed via Priya.'],
        ['Tom', 'Convert from neutral to partner by making QA the thing that protects his dates, not threatens them. Show residual risk plainly so he can decide.', 'Offer a release risk summary for his next launch; let him experience QA as an informer, not a blocker.'],
        ['Marcus', 'Do not push process. Win one concrete result in a domain he cares about (payments risk), then let evidence do the persuading.', 'Ask to pair on the payments critical-path risks; bring findings, not a mandate.'],
        ['Sofia', 'Make her a co-owner of the strategy, explicitly crediting the team’s exploratory strength. Address the automation scar directly.', 'Ask her to co-lead the quality-gate design; name last year’s failure and what we will do differently.'],
        ['Dan', 'Relieve the burnout signal quickly to build trust, and reframe his role from lone suite-owner to enabler of shared ownership.', 'Agree a triage plan for the flaky suite; make suite health a shared, visible metric, not his private burden.'],
      ] },
      { t: 'p', text: 'What the map reveals: the initiative lives or dies on Priya (sponsor) and Tom (delivery), so they are managed closely. Marcus is high-influence-low-interest — the classic "keep satisfied" who must not be over-managed or lectured. The route to Marcus runs through a payments result and, indirectly, through Priya’s backing, not through direct persuasion.' },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'table', headers: ['Stakeholder', 'Influence (H/L)', 'Interest (H/L)', 'Quadrant', 'What they want', 'What they fear', 'Stance (supportive/neutral/sceptical)'], rows: [
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
      ] },
      { t: 'table', headers: ['Stakeholder', 'Deliberate approach', 'Who influences them', 'Next action', 'By when'], rows: [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
      ] },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Mapping only your allies and ignoring the sceptics who can actually block you. Confusing seniority with influence over your specific agenda. Rating interest as you wish it were rather than as it is. Treating a "keep satisfied" senior stakeholder to a deluge of detail and losing them. Building the map once and never revisiting it. And the cardinal error: using the map to manipulate rather than to serve people better — colleagues can tell the difference, and trust, once spent, does not come back.' },

      { t: 'h1', text: 'How to interpret / use it well' },
      { t: 'ul', items: [
        'The quadrant sets the communication dose, not the person’s worth. "Keep satisfied" means concise and decision-focused, not neglected.',
        'Movement is the point. A good map this quarter shows sceptics edging towards support and low-interest stakeholders warming up — because of specific actions you took.',
        'Route through trust. When a direct approach to a sceptic is unlikely to land, reach them through a peer they already believe.',
        'Pair this with the Difficult Conversation Planner for high-stakes individuals and the Executive Quality Update for your "keep satisfied" seniors.',
        'Keep it private and keep it kind. This is a planning aid for serving stakeholders better, not a scorecard to share.',
      ] },
      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'Influence is earned in the currency each stakeholder values. Priya values risk and delivery outcomes; Marcus values a result in his own domain; Tom values his dates being protected. Learn each person’s currency and pay in it — the same message dressed in test-case counts would bankrupt you with all three.' },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 2. Difficult Conversation Planner
  // ────────────────────────────────────────────────────────────
  {
    slug: 'difficult-conversation-planner',
    title: 'Difficult Conversation Planner',
    subtitle: 'Prepare for the conversation you have been avoiding so you enter it calm, specific and focused on a shared outcome.',
    courseTitle: COURSE,
    category: 'Templates',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'Difficult conversations go badly when we improvise them under stress. The disagreement over a deadline, the pushback from a sceptical peer, the feedback nobody wants to give — these are the moments a QA leader is really judged on. This planner slows you down beforehand so you separate the facts from your story about them, understand the other person’s world, and walk in with a clear ask and a genuine willingness to be moved.' },
      { t: 'p', text: 'It is built to keep the conversation on the problem rather than the person, and to protect the working relationship even when you disagree. Preparation is not scripting — it is knowing your facts, your intent and your desired outcome well enough to stay flexible in the room.' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'Challenging a decision from someone more senior or more powerful than you.',
        'Raising a quality or risk concern you know will be unwelcome.',
        'Addressing a peer whose behaviour is undermining the team or the work.',
        'Any conversation you have caught yourself rehearsing in the shower or putting off for days — that avoidance is the signal.',
      ] },
      { t: 'p', text: 'Note: for performance concerns about someone who reports to you, use the Performance Conversation Planner instead, which is built for that specific duty of care.' },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'Name the real issue in one sentence. If you cannot, you are not ready to have the conversation.',
        'Separate fact from story. Write what actually happened (observable, agreed) apart from the meaning you have attached to it. Most heat lives in the story.',
        'Step into their shoes. What pressure are they under? What do they want and fear? What might they know that you do not?',
        'Decide your outcome: what does a good result look like for the relationship and for the problem, not just "winning"?',
        'Plan your opening — factual, non-accusatory, and honest about your intent. Open with the shared goal, not the grievance.',
        'Anticipate two or three likely reactions and how you will respond without escalating.',
        'Know your ask and your flex: the specific thing you are requesting, and where you can genuinely give ground.',
        'Choose the right setting: private, unhurried, and with enough time.',
      ] },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'Situation: Tom Fielding (Head of Product) has committed to a Friday release for a payments-adjacent feature. The QA lead believes the residual risk is too high because the payments critical paths have not been adequately tested and staging has been unstable all week. This is a challenge upward, to a reasonable but date-driven stakeholder.' },
      { t: 'table', headers: ['Planner section', 'Worked entry'], rows: [
        ['The real issue (one sentence)', 'We are on track to ship a payments change on Friday with untested critical paths, and I need Tom to make that go/no-go decision with the real risk in front of him.'],
        ['Facts (observable)', 'Two of the four payments critical paths have no test coverage this cycle. Staging has been down or holding stale data on three of the last five days. The legacy billing service is in the blast radius of this change.'],
        ['My story (to hold lightly)', '"Product always rams dates through and treats QA as an obstacle." — a story, not a fact. Tom has been reasonable before when shown clear risk.'],
        ['Their world', 'Tom has a growth commitment tied to this date and has likely told his own stakeholders it ships Friday. He fears QA becoming a late, opaque blocker. He is not reckless; he is uninformed about this specific risk.'],
        ['My outcome', 'Tom owns an informed go/no-go. Ideally we agree either a short slip to cover the two critical paths, or a reduced scope that ships safely on Friday. Relationship stays strong: QA is his risk radar, not his roadblock.'],
        ['My opening', '"Tom, I want Friday to work as much as you do, and I want you to make the call with the full picture. Can I walk you through where the real risk sits on this one and the options I see?"'],
        ['Likely reactions', '(1) "We committed to Friday." (2) "Can’t you just test it faster?" (3) "How bad is the risk, really?"'],
        ['My responses', '(1) "Understood — I’m not saying no to Friday; I’m saying here is what shipping Friday as-is carries." (2) "We can, on the parts that matter — that’s the reduced-scope option." (3) Show the two uncovered critical paths and the legacy billing blast radius in plain terms.'],
        ['My ask', 'Either a two-day slip to cover the two critical payments paths, or ship Friday with the untested paths feature-flagged off.'],
        ['My flex', 'I do not need the whole feature delayed. Any option that keeps untested payments paths out of customers’ hands on Friday meets my concern.'],
        ['Setting', 'A 20-minute private call today, well before the Friday crunch — not in tomorrow’s crowded release stand-up.'],
      ] },
      { t: 'p', text: 'Why this works: it hands Tom the decision rather than fighting him for it, presents facts he cannot easily dispute, offers him a way to keep his date (reduced scope) so he is not cornered, and reinforces the relationship the QA lead wants — informer, not blocker.' },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'table', headers: ['Planner section', 'Your entry'], rows: [
        ['The real issue (one sentence)', ''],
        ['Facts (observable, agreed)', ''],
        ['My story (to hold lightly)', ''],
        ['Their world (pressures, wants, fears)', ''],
        ['My outcome (problem + relationship)', ''],
        ['My opening line', ''],
        ['Likely reactions', ''],
        ['My responses (without escalating)', ''],
        ['My specific ask', ''],
        ['My flex (where I can give ground)', ''],
        ['Setting (where / when)', ''],
      ] },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Rehearsing a script and then clinging to it when the real conversation goes elsewhere. Leading with your grievance instead of the shared goal. Presenting your story ("you always...") as if it were fact. Arriving to win rather than to solve. Ambushing someone in public or at a bad moment. Doing all the talking — if you have not planned questions and left room to be persuaded, it is a lecture, not a conversation. And avoiding it altogether until resentment has hardened the position on both sides.' },

      { t: 'h1', text: 'How to interpret / use it well' },
      { t: 'ul', items: [
        'The facts-versus-story split is the highest-value step. Most of the charge in a difficult conversation lives in the story; strip it out and the facts are usually manageable.',
        'Genuine flex is not weakness — it is what makes the other person willing to move too. Decide it in advance so you are not improvising concessions under pressure.',
        'Hand over the decision where it rightly belongs. With a stakeholder like Tom, your job is to inform the choice, not to make it for him.',
        'Prepare, then let the plan go. The plan is to steady your nerves and sharpen your thinking, not to control the other person.',
        'Debrief afterwards: what landed, what you misjudged about their world, what to do differently next time.',
      ] },
      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'The line that defuses almost any upward challenge is "I want the same outcome you do, and I want you to decide with the full picture." It reframes you from opponent to ally in a single sentence, and it is only credible if it is true — so make it true before you walk in.' },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 3. Executive Quality Update
  // ────────────────────────────────────────────────────────────
  {
    slug: 'executive-quality-update',
    title: 'Executive Quality Update',
    subtitle: 'A concise, decision-oriented quality update that speaks to executives in the language of risk, trend and money.',
    courseTitle: COURSE,
    category: 'Templates',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'Executives do not want to know how many test cases you ran. They want to know whether the product is safe to ship, whether quality is getting better or worse, what it is costing or saving, and what they need to decide. This template turns QA activity into an executive-grade update built on four pillars: risk, trend, decision and recommendation.' },
      { t: 'p', text: 'The discipline it enforces is translation. Every line answers the executive’s unspoken question — "so what, and what do you need from me?" Activity metrics measure how busy QA is; executives are accountable for outcomes and risk, so that is the language you must speak.' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'A regular (monthly or quarterly) quality update to an exec sponsor, VP or the board.',
        'Ahead of a major release or a period of elevated risk, to set expectations.',
        'When you need an executive decision — investment, a policy, a trade-off — and must frame the case.',
        'To keep a "keep satisfied" senior stakeholder informed without drowning them in detail.',
      ] },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'Open with the headline: one sentence on whether quality is healthy, improving or at risk. The busy reader may read nothing else.',
        'Give a short risk picture: the top two or three risks in business terms (customer impact, revenue, reputation, SLA), each with a status.',
        'Show trend, not a snapshot: is each measure moving in the right direction? A number without a direction is noise to an executive.',
        'State any decisions needed clearly, with the option you recommend and the trade-off of each.',
        'Keep the whole thing to a single page or screen. If it needs an appendix, put the detail there and keep the summary clean.',
        'Choose outcome metrics an executive already cares about — escaped defects, change failure rate, customer impact, cost — not internal activity counts.',
      ] },
      { t: 'p', text: 'The framing that separates a good update from a poor one:' },
      { t: 'table', headers: ['Weak framing (activity)', 'Strong framing (outcome)'], rows: [
        ['"We ran 1,240 test cases this month."', '"Escaped defects reaching customers fell for the third month running; the two remaining hotspots are payments and billing."'],
        ['"We found 87 bugs."', '"We are catching more issues before release and fewer after — change failure rate is down from roughly one in four releases to one in six."'],
        ['"Regression took 5 days."', '"The 5-day manual regression is now our single biggest release delay; automating the core paths would recover an estimated 3 days per major release."'],
        ['"Automation coverage is 40%."', '"Low automated coverage on payments is our top residual risk into the SLA sales push; this is the decision I need from you."'],
      ] },
      { t: 'p', text: 'Note on numbers: only ever use figures you can actually measure. Where you cannot yet measure something, say so plainly — "we do not currently track escaped defects; establishing that is my first priority" is itself a credible executive message.' },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'A monthly quality update from the QA lead to the CTO at Northstar Digital, written entirely in risk, trend, decision and recommendation. Figures shown are illustrative placeholders the author would replace with their own measured data.' },
      { t: 'h2', text: 'Headline' },
      { t: 'p', text: 'Quality is trending in the right direction overall, but payments remains our top residual risk and it now sits directly in the path of the B2B/SLA sales push. I need one decision from you this month (see Decisions).' },
      { t: 'h2', text: 'Risk picture' },
      { t: 'table', headers: ['Risk', 'Business impact', 'Status', 'Direction'], rows: [
        ['Payments critical paths under-tested', 'Customer-facing billing errors; blocks selling against SLAs', 'Amber', 'Holding'],
        ['Flaky UI regression suite (~25% flaky)', 'Slows releases; low trust hides real failures', 'Amber', 'Improving'],
        ['Unstable shared staging / test data', 'Delays testing; late defect discovery', 'Red', 'Worsening'],
      ] },
      { t: 'h2', text: 'Trend' },
      { t: 'ul', items: [
        'Escaped defects (issues first found by customers): improving for the third consecutive month.',
        'Change failure rate: improving — fewer releases now require a hotfix or rollback.',
        'Release lead time: flat — the 5-day manual regression remains the dominant bottleneck.',
        'Staging stability: worsening — increasingly the cause of lost testing days this month.',
      ] },
      { t: 'h2', text: 'Decisions needed' },
      { t: 'table', headers: ['Decision', 'Options', 'Recommendation', 'Trade-off'], rows: [
        ['How to reduce payments residual risk before the SLA push', 'A) Redirect current QA effort to payments now; B) Fund a focused automation effort on payments critical paths; C) Accept the risk and proceed', 'Option B — targeted automation on the payments critical paths', 'B costs focused engineering time now but converts our highest business risk into a repeatable safety net before we sell against SLAs; C leaves us exposed at exactly the wrong moment'],
      ] },
      { t: 'h2', text: 'Recommendation summary' },
      { t: 'p', text: 'Approve a focused, time-boxed effort to automate the payments critical paths. This is the smallest investment that removes our largest business risk ahead of the SLA commitment, and it directly serves your goal of faster, safer releases.' },
      { t: 'p', text: 'Why this lands with the CTO: it translates the vague brief of "faster, safer releases" into a measurable risk and a single, costed decision. There is not a test-case count in sight — every line answers "so what, and what do you need from me?"' },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'h2', text: 'Headline (one sentence: healthy / improving / at risk)' },
      { t: 'p', text: '________________________________________________' },
      { t: 'h2', text: 'Risk picture' },
      { t: 'table', headers: ['Risk', 'Business impact', 'Status (R/A/G)', 'Direction'], rows: [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
      ] },
      { t: 'h2', text: 'Trend (direction of each key outcome measure)' },
      { t: 'ul', items: [
        'Escaped defects: ____',
        'Change failure rate: ____',
        'Release lead time: ____',
        'Other outcome measure: ____',
      ] },
      { t: 'h2', text: 'Decisions needed' },
      { t: 'table', headers: ['Decision', 'Options', 'Recommendation', 'Trade-off'], rows: [
        ['', '', '', ''],
      ] },
      { t: 'h2', text: 'Recommendation summary' },
      { t: 'p', text: '________________________________________________' },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Reporting activity — test cases run, bugs found, coverage percentages — instead of outcomes and risk. Presenting snapshots with no direction, so nobody can tell if things are getting better or worse. Burying the decision, or presenting risks with no recommendation and forcing the executive to do your thinking. Writing three pages when one would do. Using colour-coded dashboards nobody agreed the meaning of. And inventing precision — quoting figures you cannot actually measure destroys your credibility the moment someone asks how you got them.' },

      { t: 'h1', text: 'How to interpret / use it well' },
      { t: 'ul', items: [
        'If a line does not answer "so what, and what do you need from me?", cut it.',
        'Always pair a risk with a recommendation. Executives pay you for judgement, not just for raised hands.',
        'Trend beats snapshot every time — three data points showing direction are worth more than one impressive-looking number.',
        'Translate into their world: revenue at risk, customers affected, SLA exposure, cost saved or spent. That is the only vocabulary that reliably moves budget.',
        'Keep a detailed appendix for anyone who wants to dig, but never let it invade the one-page summary.',
      ] },
      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'The fastest way to earn a seat at the executive table is to bring a decision, a recommendation and the trade-off — every single time. Executives are relentlessly short of people who turn a messy situation into a clear choice. Be that person, and "more QA headcount" stops sounding like a cost and starts sounding like risk reduction with a return.' },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 4. Release Risk Communication Template
  // ────────────────────────────────────────────────────────────
  {
    slug: 'release-risk-communication-template',
    title: 'Release Risk Communication Template',
    subtitle: 'Present residual release risk so the accountable business owner can make an informed go/no-go — QA informs, the business owns the call.',
    courseTitle: COURSE,
    category: 'Templates',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'Whether to ship is a business decision, not a QA decision. QA’s job is to make the residual risk visible, honest and understandable so that the person accountable for the outcome can decide with their eyes open. This template gives you a repeatable way to communicate that risk at a release gate, and — just as importantly — to make explicit who owns the go/no-go.' },
      { t: 'p', text: 'The distinction is the whole point. "Residual risk" is what remains untested, unresolved or uncertain at the moment of decision. QA reports it; the accountable business owner accepts it or not. When QA quietly makes the call, QA absorbs blame that was never theirs to carry, and the business is denied a decision that is rightfully its own.' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'At every release go/no-go gate, especially where risk is non-trivial.',
        'When testing is incomplete at the decision point and someone must decide whether to proceed anyway.',
        'When you are under pressure to "sign off" on a release you have concerns about.',
        'For any release touching high-blast-radius areas — payments, billing, authentication, data.',
      ] },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'State the release, the date and — explicitly — who owns the go/no-go decision. Name the person, not a team.',
        'Summarise what was tested and, crucially, what was not. Coverage gaps are the heart of residual risk.',
        'For each residual risk, describe the possible impact in business terms and your best sense of likelihood.',
        'Give your QA recommendation, then stop. Recommending is your job; deciding is the owner’s.',
        'List any mitigations available — feature flags, phased rollout, extra monitoring, a rollback plan — so the owner has options beyond a binary yes/no.',
        'Record the decision, who made it, and the risk they explicitly accepted. This protects everyone and creates an honest audit trail.',
      ] },
      { t: 'p', text: 'The line QA must hold, stated plainly:' },
      { t: 'callout', variant: 'best', title: 'QA informs, the business owns the decision', text: 'QA does not "approve" or "sign off" a release in the sense of owning the consequences. QA makes the risk transparent and recommends. The accountable business owner accepts the residual risk and decides to ship or not. Keep these roles distinct in every communication — it protects the integrity of the decision and the fairness of the accountability.' },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'Release risk summary for a payments-adjacent release at Northstar Digital, prepared by the QA lead for the go/no-go. Tom Fielding (Head of Product) is the accountable owner for this feature’s release.' },
      { t: 'table', headers: ['Field', 'Entry'], rows: [
        ['Release', 'Payments — "save card for later" feature, build 2.7.0'],
        ['Target date', 'Friday this week'],
        ['Go/no-go owner', 'Tom Fielding, Head of Product (accountable). QA advises; Tom decides.'],
        ['Tested and passing', 'Happy-path save-and-reuse on web; card validation; existing checkout regression (core paths).'],
        ['NOT tested / gaps', 'Two of four payments critical paths (refund-after-save; save during a failed first charge). Interaction with the legacy billing service. Mobile save-card flow only smoke-tested — staging instability blocked full coverage this cycle.'],
      ] },
      { t: 'table', headers: ['Residual risk', 'Possible business impact', 'Likelihood', 'QA view'], rows: [
        ['Refund-after-save path untested', 'Customer charged or refunded incorrectly; support load; trust damage', 'Medium', 'Would not ship this path as-is'],
        ['Legacy billing interaction untested', 'Billing discrepancies in the monolith; hard to detect quickly', 'Medium', 'High blast radius — recommend covering or flagging off'],
        ['Mobile flow only smoke-tested', 'Broken save-card on a growing mobile user base', 'Low-Medium', 'Acceptable if monitored closely post-release'],
      ] },
      { t: 'h2', text: 'QA recommendation' },
      { t: 'p', text: 'Do not ship the refund-after-save and failed-first-charge paths on Friday. Two options let the date hold: (A) feature-flag those paths off and ship the rest Friday; or (B) a two-day slip to cover both critical paths and the legacy billing interaction. QA recommends Option A as the best balance of date and safety.' },
      { t: 'h2', text: 'Mitigations available' },
      { t: 'ul', items: [
        'Feature-flag the untested payments paths off at launch.',
        'Phased rollout: enable for a small percentage of users first.',
        'Heightened monitoring and alerting on billing discrepancies for 72 hours.',
        'Tested, rehearsed rollback plan for build 2.7.0.',
      ] },
      { t: 'h2', text: 'Decision record' },
      { t: 'table', headers: ['Field', 'Entry'], rows: [
        ['Decision', '(to be completed by the owner at the gate)'],
        ['Decided by', 'Tom Fielding'],
        ['Risk explicitly accepted', '(e.g. "Ship Friday with refund-after-save flagged off; accept the smoke-tested mobile flow under 72-hour monitoring")'],
        ['Date / attendees', ''],
      ] },
      { t: 'p', text: 'Why this is the right shape: QA has made the gaps and their business impact undeniable, offered options so the decision is not a naked yes/no, recommended clearly — and then handed the decision, and the accepted risk, to the person accountable for the outcome. If the accepted risk later bites, the record shows it was an informed business decision, not a QA failure.' },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'table', headers: ['Field', 'Entry'], rows: [
        ['Release', ''],
        ['Target date', ''],
        ['Go/no-go owner (named, accountable)', ''],
        ['Tested and passing', ''],
        ['NOT tested / coverage gaps', ''],
      ] },
      { t: 'table', headers: ['Residual risk', 'Possible business impact', 'Likelihood (H/M/L)', 'QA view'], rows: [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
      ] },
      { t: 'table', headers: ['Field', 'Entry'], rows: [
        ['QA recommendation', ''],
        ['Mitigations available', ''],
        ['Decision', ''],
        ['Decided by (name)', ''],
        ['Risk explicitly accepted', ''],
        ['Date / attendees', ''],
      ] },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Letting QA "sign off" the release and thereby quietly own a business decision — and the blame when it goes wrong. Reporting only what was tested and staying silent on the gaps, which is where the real risk lives. Presenting a binary go/no-go with no mitigations, so the owner feels cornered into overruling you. Describing risk in technical terms the business owner cannot weigh. Softening the risk to keep the peace under deadline pressure. And failing to record who decided and what risk they accepted, leaving accountability to be argued about after an incident.' },

      { t: 'h1', text: 'How to interpret / use it well' },
      { t: 'ul', items: [
        'Name the owner every time. If no one will own the decision, that vacuum is itself the biggest risk — surface it.',
        'Lead with the gaps. What you did not test is more decision-relevant than what you did.',
        'Offer mitigations so the choice is rarely a naked binary. Feature flags and phased rollout often let the date and the safety both survive.',
        'Recommend without deciding. Your credibility comes from clear advice, not from taking a call that is not yours.',
        'Keep the decision record. It is not bureaucracy — it is what makes the QA-informs / business-owns split real and fair.',
        'Pair with the Difficult Conversation Planner when you expect the owner to push back on an uncomfortable recommendation.',
      ] },
      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'Never say "QA signs off the release." Say "QA has surfaced the residual risk; the business owner decides to accept it or not." That single change of language protects your team from carrying decisions that were never theirs — and, paradoxically, it makes executives trust QA more, because you are visibly not gaming the outcome.' },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 5. 1:1 Template
  // ────────────────────────────────────────────────────────────
  {
    slug: 'one-to-one-template',
    title: '1:1 Template',
    subtitle: 'A repeatable structure for regular one-to-ones that build trust, unblock work and grow the people on your team.',
    courseTitle: COURSE,
    category: 'Templates',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'The regular one-to-one is the single highest-leverage habit of a good manager, and the first thing that gets dropped when a QA leader is busy. This template gives every 1:1 a light structure so it does not decay into a status update, while keeping it firmly the report’s meeting rather than yours. Its purpose is trust, growth and unblocking — not project tracking.' },
      { t: 'p', text: 'The guiding principle: this is their time. You are there mostly to listen, to remove obstacles, and to help them grow. Status can be gathered elsewhere; the 1:1 is for the things that only surface when someone feels safe and unhurried.' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'A recurring 1:1 with each direct report — weekly or fortnightly, protected and rarely cancelled.',
        'Especially in the first weeks with an inherited team, when you are still earning trust.',
        'When someone seems disengaged, stuck or overloaded and you need to understand why.',
        'As the steady backbone that makes occasional harder conversations (feedback, performance, career) far easier to have.',
      ] },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'Keep a shared, running document per person so both of you can add agenda items between meetings and see actions carried over.',
        'Let them set the agenda first. Their topics come before yours.',
        'Open with how they actually are, not with a task list. Mean it.',
        'Listen far more than you talk. Silence is fine; resist filling it.',
        'Surface blockers and note what you will personally take away to remove.',
        'Touch on growth and career regularly, not only at review time.',
        'Give and invite feedback in both directions — including feedback on you.',
        'Close by agreeing clear actions and owners, and carry them to next time so nothing is dropped.',
      ] },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'A fortnightly 1:1 between the QA lead and Dan Whitmore, the automation engineer who is quietly burning out maintaining the flaky, low-trust Selenium suite alone.' },
      { t: 'table', headers: ['Section', 'Notes from the conversation'], rows: [
        ['How are you, really?', 'Dan admits he is running on empty. Every release he firefights suite flakiness late into the evening, and nobody notices unless it breaks. He feels invisible.'],
        ['Their agenda', 'Wants to know whether automation is even valued here after last year’s failed "automate everything" push, and whether he should be looking to move on.'],
        ['Wins since last time', 'Quietly stabilised the login and checkout smoke tests — they have not falsely failed in two weeks. Nobody had thanked him; I did, specifically.'],
        ['Blockers', 'He owns the suite alone; developers will not touch it, so flakiness never gets fixed at source. Unstable staging causes a chunk of the false failures.'],
        ['Growth / career', 'He is keen to move from lone suite-maintainer towards helping the whole team own automation — a genuine step up in scope and influence.'],
        ['Feedback both ways', 'I fed back that his stabilisation work is exactly the judgement we need more of. He fed back that he needs me to make suite health visible to engineering leadership, not leave it buried.'],
        ['Actions & owners', '(1) Me: raise shared ownership of the suite with Priya and propose developers fixing flakiness at source. (2) Me: add suite health as a visible team metric. (3) Dan: draft a short "which tests are worth keeping" triage. Carry all three to next 1:1.'],
      ] },
      { t: 'p', text: 'What this 1:1 achieved: it caught a burnout and retention risk before it became a resignation, converted an isolated engineer into a partner on a strategy change, and gave the QA lead a concrete, credible action (shared suite ownership) to take upward. None of it would have surfaced in a status meeting.' },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'table', headers: ['Section', 'Notes'], rows: [
        ['How are you, really?', ''],
        ['Their agenda (their topics first)', ''],
        ['Wins since last time', ''],
        ['Blockers (what can I remove?)', ''],
        ['Growth / career', ''],
        ['Feedback both ways', ''],
        ['Actions & owners (carry forward)', ''],
      ] },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Turning the 1:1 into a status update you could have got from the board. Cancelling it whenever you are busy — which signals the person is low priority exactly when they need you. Doing most of the talking. Only discussing career at appraisal time. Taking away actions and then never doing them, which teaches the person that raising blockers is pointless. Never inviting feedback on yourself. And keeping no running notes, so the same problem is "raised for the first time" every fortnight.' },

      { t: 'h1', text: 'How to interpret / use it well' },
      { t: 'ul', items: [
        'Protect the slot fiercely. A 1:1 you rarely cancel is worth more than a longer one you frequently do.',
        'Read the pattern over time, not just the single meeting. Three quiet "I’m fine"s in a row from someone usually talkative is data.',
        'Your follow-through is the trust-builder. Removing even one small blocker they raised proves the meeting is real.',
        'Adjust the depth to the person and the moment — some weeks are logistics, some weeks are the conversation that changes everything.',
        'Feed what you learn into the Coaching Plan for growth and, where needed, the Performance Conversation Planner — the 1:1 is where you notice, those are where you act.',
      ] },
      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'Ask "what is the most frustrating part of your work right now?" and then say nothing until they answer properly. The best blockers, the early burnout signals and the retention risks almost always live in the pause after that question — the one most managers rush to fill.' },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 6. Coaching Plan
  // ────────────────────────────────────────────────────────────
  {
    slug: 'coaching-plan',
    title: 'Coaching Plan',
    subtitle: 'A structured plan to help a team member grow a specific capability through goals, practice and honest feedback.',
    courseTitle: COURSE,
    category: 'Templates',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'Coaching is how you deliberately grow the capability of your team rather than hoping people develop by osmosis. This plan turns a vague intention ("Dan should get better at leading") into a concrete development path: a clear goal, the specific skills behind it, real opportunities to practise, and a feedback loop that keeps it honest. It is a growth-and-development tool — distinct from managing under-performance, which is covered by the Performance Conversation Planner.' },
      { t: 'p', text: 'Good coaching is mostly asking, not telling. Your role is to create the conditions — stretch opportunities, safety to try and fail, and specific feedback — in which the person does the growing.' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'Developing a capable team member towards their next role or a broader remit.',
        'Building a specific skill the team needs — leadership, automation strategy, stakeholder communication.',
        'Supporting a new or ramping hire to reach full effectiveness.',
        'As the constructive, forward-looking counterpart to a 1:1, where growth conversations often begin.',
      ] },

      { t: 'callout', variant: 'best', title: 'Scope note — coaching vs formal performance process', text: 'This is a development tool for helping willing people grow. It is not a mechanism for managing serious under-performance or conduct. Where a situation is one of genuine under-performance, any formal action must follow your organisation’s HR policy and local employment law. This template is a planning aid, not legal or HR advice, and never a substitute for proper process.' },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'Agree the development goal with the person — coaching is done with someone, never to them. It must be a goal they actually want.',
        'Break the goal into the specific, observable skills or behaviours that make it up.',
        'For each skill, identify a real opportunity to practise inside the actual work — a stretch task, leading a session, owning a decision.',
        'Define what "good" looks like so both of you can recognise progress.',
        'Set a cadence of feedback and reflection, most naturally inside the existing 1:1.',
        'Agree the support you will provide — cover, introductions, air-cover to try and occasionally fail.',
        'Review and adjust as they grow; retire skills that are met and add new stretch.',
      ] },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'A coaching plan co-created with Sofia Alvarez, the senior QA engineer and informal team lead, to grow her from respected exploratory tester into a credible technical-leadership role — building on her strengths and mindful of her wariness after last year’s failed change.' },
      { t: 'table', headers: ['Element', 'Detail'], rows: [
        ['Development goal (hers)', 'To be ready and confident to take on a formal QA lead / test-lead role within the next few months.'],
        ['Why it matters', 'Sofia already leads informally and is trusted by the team; formalising it grows her and gives the team stable leadership. She wants it, but wants it done properly this time.'],
      ] },
      { t: 'table', headers: ['Skill to build', 'How she will practise it (real work)', 'What good looks like'], rows: [
        ['Setting test strategy, not just executing', 'Co-lead the design of the new shared quality gate with me.', 'She can articulate and defend a risk-based approach to Priya without me in the room.'],
        ['Influencing sceptical stakeholders', 'Lead the conversation with Marcus about payments testing, with me coaching beforehand and debriefing after.', 'Marcus engages with a QA idea because Sofia framed it in his terms, not because I mandated it.'],
        ['Delegating and developing others', 'Mentor the recent QA hire through their ramp-up.', 'The new hire is productive and points to Sofia as the reason.'],
        ['Communicating quality upward', 'Draft the monthly executive quality update; I review before it goes.', 'Her draft leads with risk and trend, not activity, with minimal edits from me.'],
      ] },
      { t: 'table', headers: ['Element', 'Detail'], rows: [
        ['Feedback cadence', 'A standing 15 minutes in each fortnightly 1:1 for coaching reflection, plus a debrief after each stretch opportunity.'],
        ['Support I will provide', 'Air-cover to make calls (and occasionally get them wrong), an introduction to Priya as a leader in her own right, and explicit, public credit for the team’s exploratory strength she built.'],
        ['Addressing the automation scar', 'Name last year’s failed "automate everything" push openly, agree what we will do differently (incremental, team-owned), so she trusts this change is not a repeat.'],
        ['Review point', 'Six weeks: assess readiness, adjust the stretch, and decide next steps together.'],
      ] },
      { t: 'p', text: 'Why this works: the goal is genuinely Sofia’s, the practice happens inside real, visible work rather than a training course, and it explicitly confronts the trust barrier (the previous failed change) that would otherwise quietly sink the effort.' },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'table', headers: ['Element', 'Detail'], rows: [
        ['Development goal (theirs)', ''],
        ['Why it matters (to them and the team)', ''],
      ] },
      { t: 'table', headers: ['Skill to build', 'How they will practise it (real work)', 'What good looks like'], rows: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ] },
      { t: 'table', headers: ['Element', 'Detail'], rows: [
        ['Feedback cadence', ''],
        ['Support I will provide', ''],
        ['Review point', ''],
      ] },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Setting a goal you want for them rather than one they want for themselves — motivation collapses fast. Coaching by telling: doing their thinking instead of drawing it out. Sending someone on a course instead of giving them real work to grow in. Defining fluffy goals ("be more strategic") with no observable "good looks like". Offering no air-cover, so the stretch feels like a trap where any mistake counts against them. Never reviewing, so the plan quietly dies. And the serious one: dressing up a performance or conduct problem as "coaching" to avoid a proper process — that is unfair to the person and outside what this tool is for.' },

      { t: 'h1', text: 'How to interpret / use it well' },
      { t: 'ul', items: [
        'Real work beats training courses. People grow fastest with genuine responsibility and a safety net, not slides.',
        'Ask more than you tell. If you are doing most of the talking, you are mentoring or instructing, not coaching.',
        'Make "good looks like" observable, so progress is a shared fact rather than your opinion.',
        'Confront the invisible barriers — a past failure, a confidence gap, a trust issue — or they will silently defeat a technically sound plan.',
        'Feed it from your 1:1s and hand credible growth stories to the executive level; a QA leader who visibly grows people earns disproportionate trust.',
      ] },
      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'The best coaching opportunities are the pieces of your own job you are afraid to let go of. Handing Sofia the quality-gate design or the executive update feels risky precisely because it matters — which is exactly why it grows her. Delegate the things that stretch, keep only what genuinely needs you, and you build a leader instead of a dependant.' },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 7. Performance Conversation Planner
  // ────────────────────────────────────────────────────────────
  {
    slug: 'performance-conversation-planner',
    title: 'Performance Conversation Planner',
    subtitle: 'Prepare a fair, specific, forward-looking conversation about a performance concern — within proper HR process, never instead of it.',
    courseTitle: COURSE,
    category: 'Templates',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'When a team member is not meeting expectations, the kindest and most professional thing you can do is address it early, clearly and fairly — long before it becomes a formal process. This planner helps you prepare that conversation so it stays specific, evidence-based and focused on a way forward, rather than becoming vague, emotional or unfair. Its aim is that the person leaves knowing exactly what the concern is, what "good" looks like, and that you are invested in helping them get there.' },
      { t: 'p', text: 'Handled well and early, most performance concerns are resolved by a clear conversation and support — they never need to become formal at all. That early clarity is the whole point of this tool.' },

      { t: 'callout', variant: 'best', title: 'Important — this is a planning aid, not HR or legal advice', text: 'Serious or persistent performance and conduct matters must follow your organisation’s HR policy and local employment law. Involve HR early. Do not use this planner to run a formal capability, disciplinary or dismissal process — it is a preparation aid for an early, informal, good-faith management conversation, and never a substitute for proper process, professional HR guidance or legal advice.' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'An early, informal conversation about a specific performance concern with someone who reports to you.',
        'When a pattern (not a one-off) has emerged and it is time to name it clearly and fairly.',
        'To prepare thoroughly so the conversation is calm, specific and kind rather than reactive.',
        'Before it escalates — early, honest conversations are what usually stop things reaching a formal stage.',
      ] },
      { t: 'p', text: 'Use the Coaching Plan instead when the person is meeting expectations and you are developing them further; use this when there is a genuine gap against expectations.' },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'Check yourself first: is this a genuine, evidenced pattern, or a one-off, a personality difference, or a gap you never actually made clear? If expectations were never set, that is on the manager, not the person.',
        'Consider whether HR should be involved now. For anything serious or potentially formal, speak to HR before the conversation, not after.',
        'Gather specific, factual examples — dates, situations, observable impact. Avoid characterisations and hearsay.',
        'Clarify the expectation the person is not meeting, and be sure it was actually communicated.',
        'Consider causes with an open mind: unclear expectations, a skills gap, a blocker, workload, or something personal you are unaware of.',
        'Plan an opening that is direct, respectful and non-humiliating, and always in private.',
        'Prepare to listen — there may be a cause you do not know. Come to understand, not only to deliver a verdict.',
        'Define what good looks like, a realistic timeframe, and the support you will provide.',
        'Plan to document the conversation and agreed actions factually, in line with your HR policy.',
      ] },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'Preparing an early, informal conversation with a QA engineer (an inherited team member, described here only in general terms) whose bug reports have repeatedly been too vague for developers to reproduce, causing rework and friction. This is a first, good-faith conversation, not a formal step.' },
      { t: 'table', headers: ['Planner section', 'Worked entry'], rows: [
        ['The concern (specific pattern)', 'Over the last several sprints, several defects were returned by developers as "cannot reproduce" because the reports lacked environment, steps and expected-vs-actual detail.'],
        ['Evidence (factual, dated)', 'Three specific tickets in the last month reopened for missing reproduction steps; note the ticket references and what was missing in each.'],
        ['Was the expectation clear?', 'Honestly, partly. There is a bug-report standard, but I never explicitly walked this person through it or checked their understanding. I will own that in the conversation.'],
        ['Possible causes (open mind)', 'Skills/standard gap; unstable staging making reproduction genuinely hard; workload pressure causing rushed write-ups; unclear expectations from previous management.'],
        ['My opening', '"I’d like to talk about bug-report quality, because I think a bit of clarity here will make your work land better and reduce the back-and-forth. Can we look at a couple of recent examples together?"'],
        ['What good looks like', 'Every defect reproducible from the report alone: environment, numbered steps, expected vs actual, evidence attached — to the team standard.'],
        ['Support I will provide', 'Walk through the bug-report template together; pair on the next few reports; flag the staging instability separately as a real, shared blocker so it is not put on them unfairly.'],
        ['Timeframe & review', 'Check in over the next two sprints in our 1:1s; review whether the pattern has shifted.'],
        ['HR / documentation', 'Informal at this stage; note the conversation and agreed actions factually. If the pattern persists despite clear expectations and support, consult HR on next steps under policy.'],
      ] },
      { t: 'p', text: 'Why this is fair: it leads with specific evidence rather than a character judgement, the manager openly owns the part where the expectation was not made clear, it stays genuinely open to causes (including an environment problem that is not the person’s fault), and it pairs the concern with real support and a reasonable timeframe.' },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'table', headers: ['Planner section', 'Your entry'], rows: [
        ['The concern (specific pattern, not a one-off)', ''],
        ['Evidence (factual, dated examples)', ''],
        ['Was the expectation clearly set and communicated?', ''],
        ['Possible causes (held with an open mind)', ''],
        ['My opening (direct, respectful, private)', ''],
        ['What good looks like', ''],
        ['Support I will provide', ''],
        ['Timeframe & review point', ''],
        ['HR involvement / documentation (per policy)', ''],
      ] },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Avoiding the conversation until frustration boils over and the feedback lands as an ambush. Using vague characterisations ("your attitude", "you’re careless") instead of specific, dated facts. Assuming bad intent when the real cause is an unclear expectation, a blocker or a skills gap. Delivering a verdict without listening. Skipping HR on a matter that is already serious, or — the opposite error — reaching for formal process on a first, fixable issue. Failing to define what good looks like or to offer support. And never documenting, so there is no fair record of what was said and agreed.' },

      { t: 'h1', text: 'How to interpret / use it well' },
      { t: 'ul', items: [
        'Separate the person from the behaviour throughout. You are addressing a specific gap, not passing judgement on their worth.',
        'Own your share honestly. If the expectation was never made explicit, say so — it builds trust and it is simply fair.',
        'Come curious. A genuine question about causes often surfaces a blocker or a personal situation that changes everything.',
        'Pair every concern with a clear standard, real support and a fair timeframe. Feedback without a path forward is just criticism.',
        'Know the line: the moment a matter is serious, persistent or potentially formal, it belongs in your HR policy and, where relevant, with legal guidance — not in a planner. This tool prepares the early conversation; it does not run the process.',
      ] },
      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'Ask yourself before every performance conversation: "Did I make this expectation genuinely, explicitly clear — and did I check they understood it?" Surprisingly often the honest answer is no. Fixing that first is both the fairest thing to do and the fastest way to resolve the concern without anything ever needing to become formal.' },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 8. Team Retrospective Guide
  // ────────────────────────────────────────────────────────────
  {
    slug: 'team-retrospective-guide',
    title: 'Team Retrospective Guide',
    subtitle: 'Run retrospectives that are psychologically safe, honest and action-producing — so the team actually improves instead of just venting.',
    courseTitle: COURSE,
    category: 'Templates',
    blocks: [
      { t: 'h1', text: 'Purpose' },
      { t: 'p', text: 'A retrospective is where a team turns experience into improvement. Done well, it is the engine of continuous improvement and one of the strongest signals of a healthy team. Done badly, it becomes a ritual moan with no follow-through, and people quietly stop bringing anything real. This guide helps you facilitate retros that are safe enough for honesty, structured enough to stay focused, and disciplined enough to produce a small number of changes that actually get done.' },
      { t: 'p', text: 'The two things that make or break a retro are psychological safety and follow-through. Without safety you get silence or blame; without follow-through you get cynicism. Protect both and the format barely matters.' },

      { t: 'h1', text: 'When to use it' },
      { t: 'ul', items: [
        'At the end of each iteration or delivery cycle, as a regular team habit.',
        'After a significant event — a rough release, a production incident, a major milestone.',
        'When you inherit a team and want to understand how they really work and what frustrates them.',
        'When morale or delivery is slipping and you need the team’s own read on why.',
      ] },

      { t: 'h1', text: 'Instructions' },
      { t: 'ol', items: [
        'Set the tone first. State the prime directive: everyone did the best they could with what they knew at the time. This is about the system, not blame.',
        'Make it safe for everyone to speak — go round the room, use written input first, and as the leader speak last so you do not anchor the discussion.',
        'Gather the data: what happened, what went well, what was frustrating. Get it visible before jumping to solutions.',
        'Find the themes and, for the important ones, dig for the real cause rather than the first symptom.',
        'Prioritise ruthlessly. Pick one to three improvements, not fifteen. A short list that gets done beats a long list that does not.',
        'Turn each into a concrete action with a named owner and a date. "The team should..." is not an action.',
        'Start the next retro by reviewing last time’s actions. This single habit is what makes the team believe retros are real.',
        'Vary the format occasionally so it does not go stale, but never at the expense of safety or follow-through.',
      ] },

      { t: 'h1', text: 'Worked example' },
      { t: 'p', text: 'A retrospective facilitated by the QA lead with a Northstar squad after a painful major release — the one preceded by the usual 5-day manual regression and an unstable staging environment. The tension: QA is blamed for slow releases yet is pulled in too late to prevent the defects that make the long regression necessary.' },
      { t: 'table', headers: ['Stage', 'What happened in the retro'], rows: [
        ['Setting the tone', 'Opened with the prime directive and named the risk directly: "This is not about who slowed the release. It is about what in how we work made it hard." Written input first, so quieter voices and the developers were heard, not just the loudest.'],
        ['What went well', 'The core critical-path checks held. The team pulled together under pressure. The new smoke tests caught two issues early.'],
        ['What was frustrating', 'QA got the build code-complete with two days left before the date. Staging was down for a chunk of the regression window. Defects surfaced late that could have been caught at story level. QA felt blamed for a delay it was set up to hit.'],
        ['Digging for the cause', 'The theme was not "regression is too slow"; it was "QA is involved too late." The 5-day regression is a symptom of defects escaping earlier stages because QA sees the work only at the end. Staging instability compounded it.'],
        ['Prioritised improvements', 'Chose two, not ten: (1) QA joins story kick-offs / refinement so testing shapes work from the start; (2) a small, owned effort to stabilise staging test data.'],
        ['Actions with owners', '(1) QA lead + squad lead: QA attends refinement from next sprint — owner: QA lead, starts next Monday. (2) Platform engineer + Dan: agree a reliable test-data reset for staging — owner: named platform engineer, review in two sprints.'],
        ['Follow-through commitment', 'Both actions go to the top of the next retro for review. If "QA in refinement" is working, the regression burden should visibly start to shrink over the coming cycles.'],
      ] },
      { t: 'p', text: 'Why this retro worked: the facilitator made it safe enough for the "QA involved too late" truth to surface without blame, pushed past the obvious symptom (slow regression) to the real cause (late involvement), and left the room with just two owned, dated actions that attack that cause — not a wish-list that would be forgotten by Tuesday.' },

      { t: 'h1', text: 'Blank reusable version' },
      { t: 'table', headers: ['Stage', 'Notes'], rows: [
        ['Prime directive / tone set?', 'Yes / No — how'],
        ['What went well', ''],
        ['What was frustrating / could improve', ''],
        ['Themes & real causes (dig past symptoms)', ''],
        ['Prioritised improvements (max 3)', ''],
      ] },
      { t: 'table', headers: ['Improvement action', 'Owner', 'By when', 'Review at next retro?'], rows: [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
      ] },
      { t: 'p', text: 'Review of last retro’s actions (fill in at the start of each session): ________________________________________________' },

      { t: 'h1', text: 'Common mistakes' },
      { t: 'callout', variant: 'mistake', title: 'Common mistakes', text: 'Letting it become a blame session, which teaches people to stay quiet. The leader speaking first and anchoring everyone to their view. Producing a huge list of improvements and completing none of them. Actions with no owner or no date — "the team should" is not an action. Never reviewing last time’s actions, so nobody believes anything changes. Only the loudest voices being heard. Solving symptoms (“speed up regression”) instead of causes (“involve QA earlier”). And skipping the retro whenever things are busy — which is exactly when the team most needs it.' },

      { t: 'h1', text: 'How to interpret / use it well' },
      { t: 'ul', items: [
        'Safety is the precondition for everything else. If people are not saying anything real, fix the safety before you touch the format.',
        'Facilitate, do not dominate. Your job is to draw out the team’s thinking, then speak last.',
        'Chase causes, not symptoms. The presenting complaint is rarely the thing worth fixing.',
        'Fewer actions, actually done. One improvement that sticks each cycle compounds into a transformed team over a year.',
        'Reviewing last time’s actions at the start of each retro is the single habit that proves the exercise is real — never skip it.',
        'Patterns across retros are strategic gold: the recurring frustrations tell you exactly where to spend your leadership energy, and make a credible, evidenced case upward.',
      ] },
      { t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text: 'The recurring themes across several retros are your improvement roadmap handed to you by the people closest to the work. When "QA involved too late" surfaces retro after retro, that is not a grumble — it is the evidence base for the strategy change you take to Priya. Track the patterns; they turn a team ritual into a leadership case.' },
    ],
  },
];
