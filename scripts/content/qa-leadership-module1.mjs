// QA Leadership Academy — Module 1: From Tester to QA Leader.
// Senior-level written content (base fields + enhancements), matching the
// Inside STLC Gold Standard (see scripts/content/istqb-module1.mjs) but written
// for an experienced audience moving into quality leadership. Anchored in the
// Northstar Digital case study (docs/NORTHSTAR_DIGITAL.md).
export default {
  courseSlug: 'qa-leadership-academy',
  moduleNumber: 1,
  lessonsPrefix: 'qa-leadership',
  enhPrefix: 'qa-leadership',
  enhSep: '-',
  lessons: [
    {
      lessonNumber: 1,
      title: 'The Shift from Tester to Leader',
      estimatedTime: '18 minute read',
      lessonOverview: `The hardest part of becoming a QA leader is not learning new skills — it is giving up the ones that made you successful. This lesson is about the mindset shift from being measured by what you personally deliver to being measured by what your team and your quality decisions deliver.`,
      learningObjectives: [
        'Distinguish the individual-contributor mindset from the leadership mindset and recognise which one you default to under pressure',
        'Explain why the strongest tester is often the weakest new lead, and what to do about it',
        'Redefine what "a good day" looks like once your output is the team, not your own test execution',
      ],
      lessonNotes: `## The trap of the strong individual contributor
You were almost certainly promoted because you were an excellent tester. That is exactly what makes the first six months dangerous. The instincts that earned the promotion — find the bug yourself, write the cleanest test, be the person who catches what others miss — are now the instincts most likely to make you a bottleneck. Leadership is not "senior testing." It is a different job that happens to share a domain.

## What actually changes
- **Your unit of output changes.** As a tester, your output was your work: cases run, defects found, automation written. As a leader, your output is *the team's* output plus the quality of the decisions you make about where effort goes. A day where you personally found zero bugs but unblocked three testers and killed a pointless regression cycle is a good day.
- **Your relationship to being right changes.** ICs are rewarded for being right. Leaders are rewarded for the team making good decisions — which sometimes means letting a tester take an approach you would not have chosen, so they learn, so long as the risk is acceptable.
- **Your relationship to control changes.** You can no longer hold all the quality in your own head. You have to make quality *legible* — visible in strategy, standards and metrics — so it survives without you in the room.

## Why "just do it myself" is so seductive — and so costly
Doing it yourself is faster today and slower forever. Every time you take back a task because you can do it better, you (a) remove a development opportunity, (b) signal that you do not trust the person, and (c) add to the pile that only you can clear. The team quietly reorganises around your bottleneck. Within a quarter you are the single point of failure you were hired to remove.

## The shift is gradual and reversible
Nobody flips cleanly from IC to leader. Under stress — a bad release, an angry stakeholder — most new leads snap back to IC behaviour and grab the keyboard. That is normal. The skill is noticing it, and choosing deliberately: *is this a moment where I genuinely must step in, or am I just more comfortable doing the task than doing my actual job?*

## What you keep
You do not throw away your technical judgement — it is the source of your credibility (Lesson 3). You stop *using it to do the work* and start *using it to guide the work*: reviewing an approach, asking the sharp question, spotting the risk nobody named. Your expertise moves from your hands to your questions.`,
      workedExample: `At Northstar Digital you inherit a six-person QA team. In week two, a nasty checkout defect surfaces the day before a release. Your old instinct fires: cancel your afternoon, reproduce it, isolate it, write the fix note yourself — you'd have it nailed in two hours. Instead you pause. You ask Sofia, the strongest exploratory tester, to lead the investigation, sit with her for fifteen minutes to agree an approach, and spend your afternoon on the thing only you can do: talking to Product and Payments about whether the release should slip and what the residual risk is. Sofia takes three hours, not two. But she now owns that class of defect, you have a stakeholder conversation nobody else could have had, and the team saw that you trust them under pressure. That trade — three hours instead of two, in exchange for capability and credibility — is the whole job in miniature.`,
      commonMistakes: `- **Becoming the team's senior tester with a manager's title** — doing the hardest testing yourself and wondering why the team isn't growing
- **Measuring your week by your personal output** — feeling unproductive on days you didn't "do" anything, when unblocking and deciding *is* the work
- **Snapping back to IC mode whenever pressure spikes** and grabbing the keyboard, teaching the team that in a crisis you don't trust them
- **Confusing being needed with being effective** — a leader everyone depends on for everything has built a fragile team, not a strong one`,
      realWorldTip: `For your first month, keep a private note titled "Did I do this because it was my job, or because it was comfortable?" Every time you take a hands-on task, write one line. The pattern you see after four weeks tells you exactly where you're still an IC in a leader's chair.`,
      exercise: `List the five things you were best at as a tester. For each, decide honestly: should you (a) still do it, (b) coach someone else to do it, or (c) build a standard/tool so nobody has to rely on you for it? Most items should land in (b) or (c).`,
      reflectionQuestion: `Think of the last time you took back a task you'd delegated. Was the real reason the risk, or your own discomfort with how someone else was doing it? What did the team learn from you taking it back?`,
      knowledgeCheck: `A new QA lead's team is missing a release deadline because two testers are stuck. The lead has deep expertise and could clear both blockers personally in an evening. What is the strongest leadership move, and why? (Answer: pair briefly to unblock and transfer the approach — or explicitly decide to step in for this one case — rather than silently doing both tasks alone, because doing it alone fixes tonight but entrenches the bottleneck and teaches the team they can't do it without you.)`,
      completionChecklist: [
        'I can articulate how my "unit of output" changes as a leader',
        'I can catch myself switching into IC mode under pressure',
        'I have re-sorted my old strengths into do / coach / systematise',
      ],
      enhancements: {
        industryStory: `It's a common pattern in a first lead role. A newly promoted QA lead keeps doing the thing that earned the promotion — personally reviewing every bug report, writing the trickiest automation, being the last set of eyes before anything ships. For a while it feels like leadership; the bar stays high and nothing slips. Then someone points out the obvious: the team's throughput has quietly flattened to exactly what one person can review in a day, and on the two days the lead is on leave, releases simply stop. The bottleneck wasn't a process gap — it was the lead. The break in the pattern is almost always the same small, uncomfortable move: stop being the mandatory sign-off. Replace personal review of every report with a one-page "definition of a good bug report" and a spot-check of a sample, and hand the trickiest automation to the engineer who'll own it long-term. Output stops being capped at one person's hours, and the lead discovers that the work they were most reluctant to let go of was the work adding the least leadership value.`,
        visualAid: {
          type: 'comparison',
          title: 'Individual contributor vs QA leader',
          headers: ['Dimension', 'As a tester (IC)', 'As a QA leader'],
          rows: [
            ['Measured by', 'What you personally deliver', "The team's output + quality of your decisions"],
            ['Value of being right', 'High — you are rewarded for it', 'Secondary — the team making good calls matters more'],
            ['Where expertise lives', 'In your hands (you do the work)', 'In your questions (you guide the work)'],
            ['A great day', 'Found the critical bug yourself', 'Unblocked three people; killed wasted effort'],
            ['Biggest risk', 'Missing a defect', 'Becoming the single point of failure'],
          ],
        },
        davidTip: `The people who struggle most in their first lead role are, almost without exception, the most brilliant individual testers. Their reflex is "I'll just fix it." The ones who thrive learn a slightly uncomfortable truth early: your job is now to be *dispensable* on the detail and *indispensable* on the direction. If the team can't run a normal week without you touching the tooling, you haven't been promoted — you've just taken on two jobs.`,
        badGood: {
          label: 'handling a mid-release blocker as a new lead',
          bad: `You quietly take both blocked tasks home, fix them overnight, and say nothing. The release ships. You're exhausted, the two testers learned nothing, and next crisis they wait for you again.`,
          good: `You spend twenty minutes with each blocked tester agreeing an approach, hand it back, and use the freed time to renegotiate scope with Product. Slightly slower tonight; a stronger team and a better decision by Friday.`,
        },
        miniChallenge: `You're three weeks into leading Northstar's QA team. You notice you personally reviewed every bug report this week "to keep the bar high." A tester asks, politely, whether they still need you to sign off their reports. In two or three sentences, decide what you say and what you change.`,
        modelAnswer: `## Example
"You don't — and me reviewing every report is the wrong use of both our time." I'd replace personal sign-off with a shared bug-report standard (a short definition of good) and spot-check a sample rather than gate every one. That keeps the bar high without making me a bottleneck, and it signals I trust the team. If report quality is genuinely inconsistent, that's a coaching and standards problem to solve at the team level — not something I fix by inspecting everything myself forever.`,
        resourcePreview: {
          name: 'IC-to-Leader Mindset Audit',
          purpose: 'A one-page self-audit to spot where you are still operating as an individual contributor in a leadership role.',
          whenToUse: 'In your first month, and again at 90 days to see what has shifted.',
          formats: ['PDF'],
        },
      },
    },

    {
      lessonNumber: 2,
      title: 'What Modern QA Leadership Actually Means',
      estimatedTime: '17 minute read',
      lessonOverview: `"QA leadership" gets used to mean everything from running a test team to owning organisational quality. This lesson defines what the role actually is in a modern engineering organisation — and, just as importantly, what it is not.`,
      learningObjectives: [
        'Define the modern QA leadership role in terms of outcomes owned, not activities performed',
        'Separate what QA should own from what engineering and product should own',
        'Explain why "quality is everyone\'s responsibility" is true but useless unless you make ownership concrete',
      ],
      lessonNotes: `## Quality leadership is about owning an outcome, not an activity
A modern QA leader is accountable for a question, not a task list: *does the organisation understand and manage its quality risk well enough to make good release decisions?* That reframes everything. You are not "the person who runs the tests." You are the person who makes sure the right quality work happens, by the right people, at the right time, and that its results reach the people who make decisions.

## What the role actually includes
- **Quality strategy** — the deliberate choices about where quality effort goes (Module 5).
- **Capability** — having the right people, skills and tools for the risk you carry (Modules 3–4).
- **Risk and release judgement** — turning testing results into risk that leaders can act on (Module 6).
- **Signal** — metrics and communication that tell the truth about quality (Modules 7, 10).
- **People** — growing testers and holding a standard (Modules 3, 11).
- **Influence** — shaping how engineering and product work so quality is built in, not bolted on (Module 10).

## What it is not
- It is **not** owning quality on everyone's behalf. If QA "owns quality," developers are quietly told their job is to write code and let QA catch the problems. That is the single most damaging operating assumption in the industry.
- It is **not** being the last gate before release whose job is to say yes or no. Your job is to make the risk visible so the *accountable* stakeholder decides (Module 6).
- It is **not** maximising testing. More testing is not the goal; *appropriate* testing for the risk is.

## "Quality is everyone's responsibility" — the phrase that means nothing until you make it concrete
This is true and, as usually said, useless. A responsibility that belongs to everyone belongs to no one. The QA leader's job is to make it specific: developers own unit and component quality and fixing what they break; QA owns test strategy, risk-based coverage, exploratory depth and the quality signal; product owns accepting risk and prioritising quality work against features. Ownership only means something when you can name who does what and who decides.

## The shape of the role varies — deliberately
There is no single correct QA operating model. In a regulated medical-device company, QA is heavyweight, independent and evidence-driven. In an early-stage SaaS shipping daily, QA may be a small embedded coaching function that makes developers better testers. Both are "right" for their context. A large part of leadership is choosing the model that fits *your* organisation's risk — and being able to defend the choice.`,
      workedExample: `At Northstar, the Payments squad lead, Marcus, says openly that "good developers don't need a QA team." Instead of arguing the abstract point, you reframe ownership concretely. You propose: developers own unit and contract tests for the payment APIs and fix regressions they introduce; QA owns the cross-squad risk view (what happens when payments, web and the legacy billing service interact), the exploratory testing that finds the weird real-world failures, and the release risk summary the business sees. Marcus doesn't need to "believe in QA" — he needs to see that you're not trying to own his team's quality, you're covering the risks his unit tests structurally cannot. That's a conversation about ownership, and it lands where an argument about QA's worth would not.`,
      commonMistakes: `- **Accepting "QA owns quality"** because it feels flattering — it sets QA up to be blamed for everything and lets everyone else off the hook
- **Defining the role as activities** ("we run regression, we log bugs") instead of outcomes ("we make quality risk visible and managed")
- **Assuming one QA model is universally best** and importing the heavyweight process from your last regulated job into a startup, or vice versa
- **Using "quality is everyone's responsibility" as a slogan** without ever writing down who actually owns what`,
      realWorldTip: `When someone says "QA will own quality," gently refuse the gift. Say: "QA will own the quality *strategy and signal* — but code quality lives with the people writing the code, and accepting risk lives with the business. Let me show you what that split looks like." You'll be respected for it, and you'll avoid inheriting an impossible mandate.`,
      exercise: `Write a single sentence that defines your QA function's purpose in terms of an outcome, not activities. Then list five things people currently assume QA owns that should actually sit with engineering or product.`,
      reflectionQuestion: `In your organisation (or one you know), what does "quality is everyone's responsibility" actually mean in practice? Who genuinely owns what — and where is the ownership dangerously vague?`,
      knowledgeCheck: `An executive tells a new QA manager: "Great — now quality is your problem, own it end to end." Why should the manager push back, and what should they propose instead? (Answer: accepting sole ownership makes QA the scapegoat and removes the incentive for developers to build quality in; the manager should propose an explicit split — QA owns strategy, risk-based coverage and the quality signal; engineering owns code quality; product/business owns accepting risk and prioritising quality work.)`,
      completionChecklist: [
        'I can define QA leadership as an owned outcome, not a list of activities',
        'I can articulate a concrete ownership split between QA, engineering and product',
        'I can explain why the right QA model depends on organisational context',
      ],
      enhancements: {
        industryStory: `Consider a QA team that proudly "owns quality" — and gets blamed for every production incident, including ones caused by infrastructure changes it was never told about. The fix isn't more testing; it's renegotiating ownership so that the teams making changes own the quality of those changes, and QA owns the risk view and the signal. Incidents don't drop because QA works harder. They drop because ownership finally sits where the decisions are made.`,
        visualAid: {
          type: 'matrix',
          title: 'Who owns what (an example split — adapt to your context)',
          colLabels: ['QA leadership', 'Engineering', 'Product / Business'],
          rowLabels: ['Quality strategy', 'Code & unit/component quality', 'Risk-based test coverage', 'Accepting release risk', 'The quality signal (metrics)'],
          cells: [
            [{ label: 'Owns', level: 'high' }, { label: 'Input', level: 'low' }, { label: 'Input', level: 'low' }],
            [{ label: 'Advises', level: 'low' }, { label: 'Owns', level: 'high' }, { label: '—' }],
            [{ label: 'Owns', level: 'high' }, { label: 'Contributes', level: 'medium' }, { label: '—' }],
            [{ label: 'Informs', level: 'medium' }, { label: 'Informs', level: 'medium' }, { label: 'Owns', level: 'high' }],
            [{ label: 'Owns', level: 'high' }, { label: 'Input', level: 'low' }, { label: 'Consumes', level: 'medium' }],
          ],
        },
        davidTip: `Beware the flattering mandate. "You own quality" sounds like power; it is usually a trap. The strongest QA leaders are careful to own the *strategy, the risk picture and the signal*, and equally careful to push code quality back onto engineering and risk-acceptance onto the business. When it goes wrong, you want to be the person who made the risk visible — not the person who was quietly holding a responsibility that was never really yours to hold.`,
        badGood: {
          label: 'defining the QA function',
          bad: `"QA is responsible for the quality of our releases." — sounds strong, guarantees QA gets blamed for everything and lets everyone else disengage from quality.`,
          good: `"QA owns the quality strategy, risk-based coverage and the quality signal. Engineering owns code quality. The business owns accepting release risk. Here's the one-page split." — specific, defensible, and it makes quality genuinely shared.`,
        },
        miniChallenge: `Northstar's CTO announces in an all-hands that "from now on, QA signs off every release." Sofia is delighted — it sounds like power for the team. You're less sure. In three sentences, decide whether to accept the mandate as stated and what you'd say to the CTO.`,
        modelAnswer: `## Example
I'd decline the mandate as worded, privately and quickly. "QA signing off every release" makes us the single yes/no gate and the automatic scapegoat — and it lets squads disengage from their own quality. I'd propose instead that QA *presents the residual risk* for each release and the accountable business owner makes the go/no-go call on that evidence. Same rigour, but the decision sits with the person who owns the consequences, and QA stays the trusted source of truth rather than the bottleneck everyone resents.`,
        managersReview: {
          intro: 'In a one-page ownership model from a QA leader, the things worth looking for are:',
          strengths: ['A purpose stated as an outcome, not a task list', 'A concrete, named split between QA, engineering and product', 'Explicit acknowledgement that the model fits this context, not all contexts'],
          gaps: ['Vague phrases like "QA ensures quality" with no owner named', 'No mention of who accepts risk', 'A model copied wholesale from a very different organisation'],
          improvements: ['Name the decision-maker for release risk', 'Add one line on why this model suits this company\'s risk profile'],
        },
      },
    },

    {
      lessonNumber: 3,
      title: 'Technical Leadership vs People Leadership',
      estimatedTime: '17 minute read',
      lessonOverview: `QA leaders lead in two directions at once: they set technical direction for how quality work is done, and they lead people. Most new leaders are strong in one and neglect the other. This lesson is about carrying both — and using technical credibility without becoming the team's technical crutch.`,
      learningObjectives: [
        'Distinguish technical leadership from people leadership and identify which you naturally under-invest in',
        'Use technical credibility to earn trust without doing the team\'s technical work for them',
        'Decide when to weigh in on a technical decision and when to deliberately stay out',
      ],
      lessonNotes: `## Two jobs, one person
- **Technical leadership** is setting direction on *how* quality work is done: the testing approach, what "good" looks like, which risks matter, when automation is worth it, how the team reasons about coverage. It is judgement made visible as standards and decisions.
- **People leadership** is growing the humans: coaching, feedback, career development, motivation, handling conflict and underperformance, protecting the team's focus.

You need both. A brilliant technical lead who can't develop people builds a team that stagnates and leaves. A warm people-leader with no technical credibility gets quietly ignored the moment a hard technical trade-off appears.

## Technical credibility is the entry ticket — not the job
In QA, credibility is earned technically. A team that doesn't believe you understand the work will not follow you into a difficult strategy or a hard conversation. But credibility is a *ticket to lead*, not the leadership itself. The failure mode is spending it on the wrong thing: proving you're still the best tester in the room. You establish credibility by asking the incisive question, spotting the risk others missed, and making a sound call under ambiguity — not by out-testing your team.

## Using credibility well: guide, don't grab
The move is to put your expertise into *questions and standards*, not into hands-on delivery:
- Instead of rewriting a tester's approach, ask "what happens if the payment provider times out mid-request — have we got that covered?"
- Instead of building the automation yourself, set the standard for what belongs in the suite and review against it.
- Instead of being the person who always finds the bug, teach the team how you think about where bugs hide.

## When to weigh in — and when to stay out
Weigh in when the decision carries real risk, sets a precedent, or the team is genuinely stuck. Stay out when it's reversible, low-risk, and a fine learning opportunity — even if you'd do it differently. A useful test: *if this goes the way I wouldn't choose, what's the actual cost?* If the answer is "a bit of rework and a lesson learned," let it run. Your restraint is what grows senior people.

## The credibility trap for career changers and the technically rusty
Some QA leaders arrive without deep hands-on currency — perhaps they've been managing for years, or came from a different route. Credibility can still be earned, but not by faking technical depth (the team will spot it instantly). It's earned by being visibly excellent at the parts you do own — risk, strategy, decisions, developing people — and by being honest about where the team knows more than you and leaning on them for it.`,
      workedExample: `Dan, Northstar's automation engineer, wants to rewrite the flaky Selenium suite in a new framework. Your instinct — you've done three framework migrations — is to specify the whole design yourself. Instead you use your credibility differently. You ask four questions: "What problem are we actually solving — flakiness, speed, or maintainability? Which of the 1,800 tests are even worth migrating? Who owns it after you build it? How will we know in three months whether it worked?" Those questions do more than a design doc: they force Dan to think like an owner, they surface that half the suite should be deleted not migrated, and they leave the decision with him — with the risks now visible. You've led technically without touching the keyboard, and Dan is a stronger engineer for it.`,
      commonMistakes: `- **Leading only technically** — great decisions, no coaching, and a team that plateaus and resents being managed like machines
- **Leading only on people** — warm and supportive, but overruled the moment a hard technical trade-off appears because the team doesn't trust your judgement
- **Spending credibility proving you're the best tester** instead of investing it in the team's decisions
- **Weighing in on every reversible decision**, robbing senior people of the chance to own outcomes and learn`,
      realWorldTip: `Before you jump into a technical decision, ask yourself: "Is this a one-way door or a two-way door?" One-way (hard to reverse, high risk) — engage fully. Two-way (easily reversible) — offer a view if asked, then let the owner decide. New leaders drown two-way decisions in their own opinions.`,
      exercise: `Rate yourself 1–5 on technical leadership and on people leadership. For the lower score, write down two specific things you'll do in the next month to invest in it. Be concrete — "run a coaching 1:1 with each tester" beats "get better with people".`,
      reflectionQuestion: `When was the last time you overruled or redid a team member's technical work? Was the risk high enough to justify it, or did you spend credibility you'd have been better off saving?`,
      knowledgeCheck: `A QA lead with strong hands-on skills finds that whenever a tricky technical question comes up, the team waits and asks them for the answer rather than reasoning it out. What does this indicate, and what should the lead change? (Answer: the lead is using technical credibility as a crutch — being the answer rather than building the team's reasoning; they should start responding to questions with guiding questions and standards so the team learns to reason, stepping in directly only for genuinely high-risk or one-way-door decisions.)`,
      completionChecklist: [
        'I know whether I under-invest in technical or people leadership',
        'I can use technical credibility to guide rather than to do the work',
        'I use a one-way / two-way-door test to decide when to weigh in',
      ],
      enhancements: {
        industryStory: `Picture a superb technical QA lead who loses their best two testers inside a year. Every decision was sound; every review was sharp. But nobody ever grew, because the lead made every meaningful call. The testers were, in effect, senior pairs of hands. The lead couldn't understand it — "I gave them great direction." That was exactly the problem: direction without ownership. People don't stay to execute someone else's judgement forever.`,
        visualAid: {
          type: 'matrix',
          title: 'Technical vs people leadership — the four quadrants',
          colLabels: ['Low people leadership', 'High people leadership'],
          rowLabels: ['High technical leadership', 'Low technical leadership'],
          cells: [
            [{ label: 'Respected but resented; team stagnates', level: 'medium' }, { label: 'The goal: credible and grows people', level: 'high' }],
            [{ label: 'Ignored on hard calls; drifts', level: 'critical' }, { label: 'Liked but overruled on technical trade-offs', level: 'medium' }],
          ],
        },
        davidTip: `In interviews for lead roles, the question behind the question is always "will the team follow this person?" Technical credibility is how QA teams decide that — so you do need it. But technically dazzling candidates who clearly want to remain the smartest tester in the room are the ones who get turned down. The signal worth looking for is someone who describes making their *team* better at the technical thinking, not someone who describes personally solving every hard problem. Credibility gets you in the door; what you spend it on is the job.`,
        badGood: {
          label: 'responding to a tester\'s technical question',
          bad: `"Just do it this way" — hands them the answer, keeps them dependent, and quietly confirms you're the only one who really knows.`,
          good: `"What are the two options you're weighing, and what's the risk of each?" — makes them reason, surfaces their thinking, and lets you coach the judgement rather than dictate the answer.`,
        },
        miniChallenge: `A mid-level tester at Northstar proposes an exploratory approach for the mobile app that you think is 70% right — workable, not how you'd do it, low risk if it's imperfect. They're keen and have thought it through. In two or three sentences, decide how you respond.`,
        modelAnswer: `## Example
I'd let it run, with one guiding question. Something like: "I like it — before you start, what's your plan if you find the session's going down a rabbit hole with no findings?" That respects their ownership, plants one risk-management habit, and keeps me out of a two-way-door decision. If it's 70% right and low-risk, the 30% is a cheap, valuable lesson they'll own — far more useful than me making it 100% my way and teaching them to wait for my design next time.`,
        portfolioBuilder: `Add a short "Leadership self-assessment" to your portfolio: your honest technical-vs-people ratings, the gap you're prioritising, and the specific actions you're taking. Leaders who can assess themselves credibly are the ones organisations trust to assess a function.`,
      },
    },

    {
      lessonNumber: 4,
      title: 'From Finding Defects to Managing Quality Risk',
      estimatedTime: '19 minute read',
      lessonOverview: `As a tester you were rewarded for finding defects. As a leader you are responsible for managing quality risk — a broader, more strategic job in which finding defects is only one tactic. This lesson is the conceptual heart of Module 1: the move from a defect mindset to a risk mindset.`,
      learningObjectives: [
        'Explain the difference between finding defects and managing quality risk, and why the second is the leader\'s job',
        'Reframe testing decisions (what to test, how much, when to stop) as risk decisions',
        'Talk about quality in the language of risk that the business actually understands',
      ],
      lessonNotes: `## Defects are a symptom; risk is the thing you manage
A defect is a single instance of something wrong. Quality risk is the *probability and impact* of the organisation shipping something that harms customers, revenue, reputation or compliance. A tester hunts defects. A leader manages the risk that dangerous defects reach production and that safe-enough software is delayed unnecessarily. Finding defects is one way to reduce risk — but so is preventing them, testing the right things, and knowing when *not* to test more.

## Why the shift matters
When you think in defects, every decision collapses to "test more, find more." When you think in risk, the questions get sharper and more useful:
- **What could go wrong that would actually hurt us?** (Not "what can we test?" but "what matters?")
- **How likely is it, and how bad if it happened?** (Probability × impact — the core of Module 6.)
- **Where is our effort buying the most risk reduction per hour?**
- **What risk are we willing to carry?** (Because zero risk is unaffordable and usually unnecessary.)

## The dashboard-vs-detective reframe
The tester is a detective: dig in, find the hidden problem. The leader runs a risk dashboard: where are our biggest exposures, is the trend getting better or worse, and where should the detectives dig next? You still need detectives — you're just no longer only a detective. Northstar's rising production defects aren't a "test harder" problem; they're a signal that risk is being created faster than it's being managed, probably because QA is involved too late to prevent it.

## "When do we stop testing?" is a risk question, not a testing question
The immature answer is "when we've run all the tests" or "when we run out of time." The leadership answer is "when the *residual* risk is low enough for the business to accept, given the value of shipping now." That reframes the release conversation entirely (Module 6): QA's job is not to declare software "done" or "safe," but to make the remaining risk visible so the accountable owner can decide.

## Preventing risk beats finding defects
The highest-leverage risk work often isn't testing at all. Getting QA into refinement so ambiguous requirements are fixed before code exists prevents whole classes of defects. A defect found in refinement costs a conversation; the same defect found in production costs an incident. This is what "shift left" actually means operationally — not "test earlier for its own sake," but "move risk-reduction to the cheapest point in the lifecycle." At Northstar, QA being pulled in late is not a scheduling annoyance; it's the root cause of the rising defect trend.

## Talking risk to the business
Executives don't buy "we found 47 bugs." They understand "the checkout path has an untested failure mode that, if it triggers, stops customers paying — that's our top risk this release, and here's what it would cost to close it before Friday versus carry it." That's the same information, translated into probability, impact and money. Leaders who can make that translation get listened to; leaders who report bug counts get ignored.`,
      workedExample: `Northstar's board is alarmed that production defects are rising and asks you to "increase test coverage." A defect mindset would add more regression tests and hire another tester. Instead you present it as risk. You show that most escaped defects cluster in two areas — the legacy billing service and cross-squad integration — and that they escape not because testing is too shallow but because QA sees these changes only after they're built. Your recommendation isn't "more tests"; it's "get QA into refinement for billing and integration changes, and add contract tests at the API boundary." You're managing the risk at its source rather than adding detection at the end. That's a leader's answer to a board's question, and it costs less than another headcount.`,
      commonMistakes: `- **Equating more testing with less risk** — past a point, extra tests add cost and maintenance without meaningfully reducing risk
- **Treating "when do we stop" as a testing question** rather than a business risk-acceptance decision
- **Reporting activity (bugs found, tests run) instead of risk** to stakeholders who only understand impact and likelihood
- **Chasing every defect equally** instead of triaging by impact — a cosmetic issue and a data-corruption issue are not the same risk
- **Missing that "shift left" means moving risk reduction to its cheapest point**, not just testing earlier for its own sake`,
      realWorldTip: `Retrain your own vocabulary first. For one week, every time you're about to say "we need to test X," say instead "the risk in X is Y, and testing is how we'd reduce it." It feels clunky, but it rewires how you — and soon your stakeholders — frame every quality decision.`,
      exercise: `Take a recent release you know. List the top three quality risks (not defects — risks: what could go wrong and how badly). For each, note how likely it was, how damaging, and whether the testing effort actually matched the risk. Most teams over-test low risks and under-test high ones.`,
      reflectionQuestion: `Think about how your current team decides "we've tested enough." Is that decision framed as risk the business accepts, or as tests completed / time run out? Who actually makes it?`,
      knowledgeCheck: `Production defects are rising and leadership asks QA to "test more." Investigation shows most escaped defects come from changes QA only sees after they're code-complete. What is the strongest leadership response? (Answer: reframe from detection to prevention — get QA involved earlier for the high-risk change types so the defects are prevented or found at the cheapest point, rather than simply adding more late-stage testing, which treats the symptom and raises cost without addressing why risk is escaping.)`,
      completionChecklist: [
        'I can explain the difference between finding defects and managing quality risk',
        'I can reframe "how much to test" and "when to stop" as risk decisions',
        'I can translate a quality risk into business language (probability, impact, cost)',
      ],
      enhancements: {
        industryStory: `Take a team measured on bugs found: it found thousands — and production incidents kept rising anyway. The bugs they found were mostly low-impact issues in well-trodden features; the incidents came from a risky integration nobody was testing because it was hard and unglamorous. The moment they stopped counting bugs and started ranking risks, the work reorganised itself around the integration, and incidents fell. Nothing about the team's skill changed — only what they pointed it at.`,
        visualAid: {
          type: 'flow',
          title: 'Defect mindset vs risk mindset',
          steps: [
            { label: 'Trigger', detail: 'Leadership: "quality is slipping, test more"' },
            { label: 'Defect mindset', detail: 'Add tests, add a tester, run longer regression' },
            { label: 'Risk mindset', detail: 'Where does risk actually escape, and why?' },
            { label: 'Root cause', detail: 'e.g. QA sees high-risk changes too late to prevent defects' },
            { label: 'Leverage', detail: 'Move risk reduction to its cheapest point (refinement, contract tests)' },
          ],
        },
        davidTip: `The single sentence that changes how leadership sees QA is this: "Our job isn't to find every bug — it's to make sure the risks that would actually hurt us are understood and managed." Say that to a CTO and watch the temperature change. It moves QA from a cost centre that slows releases to a function that protects the business. But you have to mean it operationally — which means being willing to *stop* testing low-risk things to free effort for the risks that matter.`,
        badGood: {
          label: 'reporting quality to an executive',
          bad: `"We executed 1,240 test cases and found 47 defects this release." — activity with no meaning; the exec can't act on it.`,
          good: `"Two risks stand out: a checkout failure mode that would block payments (high impact, medium likelihood) and a reporting discrepancy (low impact). We've closed the first; I recommend we accept the second and fix it next sprint." — risk, ranked, with a recommendation.`,
        },
        miniChallenge: `Northstar's Head of Product, Tom, wants to cut the pre-release regression from five days to one to hit a launch date. A defect-mindset lead says "then we can't guarantee quality." Draft a two-to-three-sentence response that manages the risk instead of refusing.`,
        modelAnswer: `## Example
"We can absolutely cut it — the question is which risks we stop covering. Give me an hour and I'll come back with a one-day plan that covers our top risks (checkout, payments, the changed areas) and a short list of what we'd be choosing *not* to retest, with the risk of each." That turns a standoff into a shared, informed decision: Tom gets his date, the business consciously accepts specific residual risk, and QA is the trusted advisor who made the trade-off visible rather than the blocker who said no.`,
        portfolioBuilder: `Begin your capstone Quality Risk Profile now: for the organisation you'll assess, draft the top five quality risks as probability × impact statements in business language. You'll refine this in Module 6, but starting it here trains the risk mindset early.`,
        resourcePreview: {
          name: 'Quality Risk Language Card',
          purpose: 'A prompt card for translating testing findings into business-facing risk statements (probability, impact, cost, recommendation).',
          whenToUse: 'Before any release conversation or exec update.',
          formats: ['PDF'],
        },
      },
    },

    {
      lessonNumber: 5,
      title: 'Understanding Organisational Context',
      estimatedTime: '18 minute read',
      lessonOverview: `The same QA decision can be right in one organisation and wrong in another. Before you can lead quality well, you have to read the organisation you're actually in — its business objectives, its risk appetite, its delivery model and its politics. This lesson is about becoming fluent in context.`,
      learningObjectives: [
        'Read an organisation\'s business objectives and risk appetite and connect quality decisions to them',
        'Recognise how delivery model, architecture and culture constrain what good QA looks like here',
        'Avoid importing a QA model from a previous context where it doesn\'t fit',
      ],
      lessonNotes: `## Quality serves the business, not the other way around
QA does not exist to produce quality in the abstract; it exists to help the organisation achieve its objectives at an acceptable level of risk. So the first thing a QA leader must understand is not the test suite — it's the business. What is the company actually trying to do this year? Grow fast and capture a market? Win enterprise clients who demand reliability? Cut cost to reach profitability? Each of those implies a very different quality posture.

## Read the risk appetite honestly
Every organisation has a real risk appetite, which is often different from its stated one. A company that says "quality is our top priority" but ships hotfixes nightly and tolerates the occasional outage has a *high* real risk appetite for that domain — and that may be entirely rational for its stage. Your job is to calibrate QA to the real appetite, not the poster on the wall, while being the voice that names when the appetite is genuinely dangerous (e.g. for payments or data protection, where the impact is severe and often regulated).

## The forces that shape what "good QA" looks like here
- **Business stage and objectives** — a Series-B company chasing growth vs a mature enterprise protecting a franchise.
- **Delivery model** — daily continuous deployment vs quarterly regulated releases demand different quality mechanisms.
- **Architecture** — a well-factored microservice estate enables contract testing and fast feedback; a fragile monolith forces heavier integration testing.
- **Regulatory and contractual context** — SLAs, compliance and audit requirements can make heavyweight process mandatory, not optional.
- **Culture** — how the organisation treats failure, whether developers see quality as theirs, how decisions really get made.

## The most common leadership mistake: importing your last playbook
A QA leader who succeeded in a regulated bank arrives at a fast-moving SaaS and imposes heavyweight test plans, sign-off gates and independent QA — and grinds delivery to a halt while the business bleeds speed. The reverse is worse: a leader from a move-fast startup joins a payments company and strips out the "bureaucracy," and the first serious incident is a regulatory one. The model that made you successful was right *for that context*. Leadership is diagnosing the new context and choosing the model that fits it — which is the entire point of Module 2.

## Politics is not a dirty word — it's how decisions actually get made
Understanding context includes understanding power: who really decides, who influences them, where quality has credibility and where it's resented. This isn't cynicism; it's the map you need to get anything done. At Northstar, the CTO wants "faster and safer," Product pushes dates, Payments is sceptical of QA, and the board watches both release frequency and churn. A leader who ignores that map will propose technically perfect strategies that go nowhere.`,
      workedExample: `You've just joined Northstar from a regulated healthcare company where every release had a formal test plan, independent sign-off and a full regression pass. Your instinct is to bring that rigour in — it worked. But you read the context first: Northstar is Series-B, growing 40% a year, releasing per-squad every fortnight, and the board rewards speed as much as stability. Imposing healthcare-grade gates would be correct for the risk of a medical device and catastrophic for Northstar's growth. So you keep the *principle* (make risk visible before release) but change the *mechanism*: lightweight risk-based quality gates per squad, heavier controls only around payments and the legacy billing service where the impact genuinely justifies it. Same values, context-appropriate implementation.`,
      commonMistakes: `- **Optimising quality in the abstract** instead of toward the organisation's actual objectives and risk appetite
- **Believing the stated risk appetite over the revealed one** — watch what the organisation does, not what it says
- **Importing a QA model wholesale** from a previous context with different stage, architecture or regulation
- **Applying uniform rigour everywhere** instead of concentrating controls where impact is highest (payments, data, compliance)
- **Ignoring organisational politics** and then being surprised when a sound strategy dies in a meeting`,
      realWorldTip: `In your first weeks, ask three questions of everyone senior you meet: "What are we trying to achieve this year? What would a bad outcome look like? Who do you go to when you need something decided?" The answers give you objectives, risk appetite and the real power map — the three things you need before proposing anything.`,
      exercise: `For your organisation, write one sentence each on: the primary business objective this year, the real (revealed) risk appetite, the delivery model, and the biggest architectural constraint on testing. Then note one QA practice you do that doesn't actually fit this context.`,
      reflectionQuestion: `Have you ever seen a QA practice fail not because it was bad, but because it didn't fit the organisation? What was the mismatch — stage, model, architecture, culture or politics?`,
      knowledgeCheck: `A QA leader moves from a regulated enterprise to a fast-growing startup and immediately introduces formal test plans and mandatory QA sign-off on every release. Delivery slows sharply and the team pushes back. What did the leader get wrong? (Answer: they imported a model that fit their previous context's risk profile and regulatory needs without diagnosing the new organisation's stage, objectives, delivery model and risk appetite; the right approach keeps the principle of managing risk but adapts the mechanism to the new context, concentrating heavier controls only where impact genuinely justifies them.)`,
      completionChecklist: [
        'I can state my organisation\'s objectives, real risk appetite and delivery model',
        'I can explain how architecture and regulation constrain good QA here',
        'I can spot when a QA practice is a mismatch for the context',
      ],
      enhancements: {
        industryStory: `Consider an organisation whose QA approach is, on paper, beyond reproach — and completely wrong for where it actually operates. Picture a fast-growing SaaS business that deploys many times a day, but whose QA function runs a formal, document-heavy test plan with a manual sign-off gate on every release, because that's the model the QA lead ran successfully at a regulated insurer. Nothing about the practice is technically unsound; it's careful, thorough, evidence-driven. It's simply a mismatch for a per-squad continuous-delivery model, and the symptom shows up as a release queue backing up behind one overloaded gatekeeper while engineers route around the process entirely. Reading the context flips the recommendation. Once you see that the real risk isn't insufficient ceremony but effort spread evenly across everything regardless of impact, the answer isn't "lighten the process" as a slogan — it's to keep the heavyweight, evidence-driven controls only where the impact genuinely justifies them (payments, data, anything regulated) and replace the blanket sign-off gate with lightweight risk-based checks the squads own themselves. The reverse mismatch is just as instructive and more dangerous: a move-fast startup approach transplanted into a payments or health context, where stripping out the "bureaucracy" reads as pragmatism right up until the first incident turns out to be a regulatory one. In both cases the practice wasn't bad — it was answer to the wrong question, and only reading the organisation's real objectives, cadence and risk appetite reveals which question you're actually being asked.`,
        visualAid: {
          type: 'comparison',
          title: 'Same principle, different context, different QA',
          headers: ['Context factor', 'Fast-growth SaaS (e.g. Northstar)', 'Regulated / high-impact'],
          rows: [
            ['Primary objective', 'Speed of growth', 'Reliability, compliance'],
            ['Release cadence', 'Per-squad, fortnightly+', 'Controlled, audited'],
            ['Quality gates', 'Lightweight, risk-based', 'Formal, evidence-driven'],
            ['QA posture', 'Embedded coaching + risk view', 'Independent, heavyweight'],
            ['Where to concentrate rigour', 'Payments, data, integration', 'Broadly, per regulation'],
          ],
        },
        davidTip: `The fastest way to lose credibility in a new QA leadership role is to say "at my last company we did it this way" in week one. Almost every organisation is convinced its context is unique — and to a degree each is right. Spend your first weeks diagnosing before prescribing. The leaders who parachute in with last year's playbook are the ones who are gone in eighteen months, usually described as "a good fit for a different kind of company."`,
        badGood: {
          label: 'introducing a QA change in a new role',
          bad: `"We're introducing formal test plans and QA sign-off on every release, effective next sprint." — imported wholesale, no diagnosis, guaranteed to grind delivery and generate resistance.`,
          good: `"Before I change anything, I want to understand how we ship and where our real risks are. Then I'll propose the lightest set of controls that covers those risks for how *we* work." — diagnosis first, context-fit second.`,
        },
        miniChallenge: `In your first week at Northstar, the CTO says "I brought you in to raise our quality bar — what will you change first?" You've barely met the team. In two or three sentences, respond in a way that shows leadership without prematurely importing a playbook.`,
        modelAnswer: `## Example
"The honest answer is: I don't know yet, and I'd be worried if I did after a week. My first move is to understand where our quality risk actually escapes and how each squad ships, so anything I change fits how we work rather than how my last company worked. Give me thirty days and I'll come back with a prioritised, evidence-based plan — including the two or three quick wins I'm confident about." That signals confidence and rigour without committing to a model before you've read the context, and it sets up the Module 2 assessment.`,
        portfolioBuilder: `Draft a one-page "Organisational Context" summary for your capstone organisation: objectives, real risk appetite, delivery model, architecture constraints and the power map. Every later artefact — strategy, metrics, roadmap — should trace back to this.`,
      },
    },

    {
      lessonNumber: 6,
      title: 'Your First 30 Days as a QA Leader',
      estimatedTime: '20 minute read',
      lessonOverview: `Your first month sets the pattern for everything that follows. This lesson gives you a deliberate first-30-days approach: what to investigate, who to speak to, what evidence to gather, and — crucially — what not to change yet. It sets up the Module 1 assignment and the Module 2 maturity assessment.`,
      learningObjectives: [
        'Run a structured first-30-days assessment instead of reacting to whatever is loudest',
        'Establish credibility early without changing everything at once',
        'Gather the evidence and relationships you need before proposing a plan',
      ],
      lessonNotes: `## The first-30-days principle: diagnose before you prescribe
The strongest new leaders resist the urge to act immediately. There is enormous pressure — from yourself and others — to "show impact" in week one. Resist it, with one exception (quick wins, below). Your real job in the first 30 days is to build an accurate picture and the relationships you'll need, so that when you do act, you act on evidence and with allies. Changing things before you understand them is how new leaders destroy trust and credibility in a single month.

## What to investigate (people, process, technology, risk)
- **People**: who's on the team, their strengths, frustrations, and who the informal leaders are. One-to-ones with every team member, early.
- **Process**: how work actually flows from idea to production — not the documented process, the real one. Where does QA get involved, and how late?
- **Technology**: the state of automation, environments, test data, CI/CD and tooling. What's trusted and what isn't?
- **Risk and history**: what's gone wrong recently? Where do production defects come from? What's everyone quietly worried about?

## Who to speak to — and listen to
Your team first (they know where the bodies are buried and need to know you'll listen before you lead). Then the people QA serves and depends on: engineering leads, product, delivery, and the executive sponsor who hired you. Ask what's working, what isn't, and what they wish QA did differently. You're gathering both facts and perceptions — perceptions *are* facts when it comes to QA's credibility.

## Establish credibility without changing everything
Credibility in month one comes from three things: asking good questions, listening genuinely, and demonstrating you understand the work. It does *not* come from announcing a reorganisation. A new leader who rips up the process in week two — before understanding why it's the way it is — signals arrogance and triggers resistance. There is almost always a reason things are the way they are, even if it's a bad reason; understand it before you change it.

## The exception: earn trust with a genuine quick win
Diagnosing doesn't mean doing nothing visible. Look for one or two genuine quick wins — a small, low-risk improvement that removes a real irritation the team already knows about (a flaky test everyone hates, a pointless status report you can kill, a broken environment you can get fixed). A well-chosen quick win buys enormous credibility and goodwill for the bigger changes later. The skill is choosing wins that are genuinely wanted and genuinely low-risk — not vanity changes that signal you weren't listening.

## What NOT to change yet
- Don't restructure the team.
- Don't tear out the automation, however bad it looks — you don't yet know what depends on it.
- Don't announce a new strategy or tooling standard.
- Don't make promises to executives about outcomes before you understand the constraints.
All of these come later, on evidence. Month one is for understanding, relationships, and one or two carefully chosen wins.

## Turn the 30 days into an assessment
By day 30 you should be able to produce a short, honest assessment: current state across people/process/technology, the biggest risks, the quick wins you've taken, and your emerging priorities — explicitly framed as "initial findings," not a final plan. That document (the Module 1 assignment) becomes the foundation for the full maturity assessment in Module 2.`,
      workedExample: `You take over Northstar's six-person QA team. Regression takes five days, the UI automation is unreliable, developers act as though QA owns quality, bug leakage is rising, and senior management is already saying "we need more automation." The temptation is to agree with management and launch an automation project in week one. Instead you run 30 days deliberately: one-to-ones with all six testers (you learn Dan is burning out alone on the flaky suite and Sofia is wary after a failed automation push last year); conversations with the squad leads and Product (you learn QA is pulled in after code-complete); and you pull the data on where production defects actually originate (billing and integration, not the areas the regression suite hammers). Your one quick win: you get the perpetually broken staging environment prioritised and fixed — a thing the whole team hated. By day 30 you know that "more automation" is the wrong first move, you have the team's trust, and you have the evidence for a very different plan. That's the difference between the leader who reacts and the leader who diagnoses.`,
      commonMistakes: `- **Reacting to the loudest voice** (usually "more automation") instead of investigating what the evidence says
- **Changing structure or tooling in week one** before understanding why things are the way they are
- **Diagnosing invisibly for a month** with no quick win, so the team wonders whether anything will ever change
- **Choosing a vanity quick win** that signals you weren't actually listening
- **Presenting day-30 findings as a finished plan** rather than initial findings open to being wrong`,
      realWorldTip: `Write your 30-day findings *as you go*, not at the end. Keep a running document with sections for people, process, technology, risks, quick wins and open questions. It stops you forgetting early observations, and it becomes 80% of your Module 1 assignment and the seed of your Module 2 assessment.`,
      exercise: `Draft your personal first-30-days plan for a new QA leadership role: the people you'd speak to and the questions you'd ask, the evidence you'd gather, one candidate quick win, and three things you'd deliberately not change yet. This is the direct basis for the Module 1 assignment.`,
      reflectionQuestion: `Think of a leader (in any field) who changed too much too fast on arrival. What did it cost them in credibility — and what might a more patient first 30 days have achieved instead?`,
      knowledgeCheck: `A new QA lead inherits a team where management is loudly demanding "more automation." Within the first week the lead is tempted to launch an automation initiative. Why is this risky, and what should they do first? (Answer: acting on the loudest demand before diagnosing risks solving the wrong problem — the real cause of quality issues may be elsewhere, e.g. QA involved too late, so the lead should first investigate where risk actually escapes, speak to the team and stakeholders, and gather evidence, while taking one genuine low-risk quick win to build credibility, before committing to a direction.)`,
      completionChecklist: [
        'I have a structured first-30-days plan across people, process, technology and risk',
        'I can name what I would deliberately NOT change in month one',
        'I can identify a genuine, low-risk quick win to build early credibility',
      ],
      enhancements: {
        industryStory: `Some of the strongest QA leadership starts involve almost no visible action for three weeks — just relentless listening and one small, popular fix. Colleagues wonder aloud whether the new lead is "doing anything." Then in week four the lead presents a first-30-days assessment so accurate and well-evidenced that even the sceptics get behind the plan. The quiet three weeks *were* the work. The lead has earned the right to be believed.`,
        visualAid: {
          type: 'timeline',
          title: 'A deliberate first 30 days',
          steps: [
            { label: 'Week 1', detail: '1:1s with every team member; listen, don\'t prescribe' },
            { label: 'Week 2', detail: 'Talk to engineering, product, delivery, sponsor; map the real process' },
            { label: 'Week 3', detail: 'Gather evidence: defect origins, automation health, environments; take one quick win' },
            { label: 'Week 4', detail: 'Synthesise initial findings, risks and priorities — as findings, not a final plan' },
          ],
        },
        davidTip: `When you're assessing someone for a senior QA role, "what would your first 30 days look like?" is a revealing question — because it exposes temperament instantly. Weak answers jump to solutions: "I'd roll out a new framework, standardise the process." Strong answers start with listening, evidence and relationships, and treat action as something you earn the right to take. The candidate who says "I'd be careful not to change too much before I understand why it's like this" has usually led before.`,
        badGood: {
          label: 'a new QA leader\'s first month',
          bad: `Week 1: announce a reorg and a new automation tool. Week 2: kill the existing process. Result: the team disengages, hidden dependencies break, and credibility is gone before any evidence is in.`,
          good: `Weeks 1–3: 1:1s, stakeholder conversations, pull the defect data, fix one thing everyone hated. Week 4: present evidence-based initial findings. Result: trust, an accurate picture, and allies for the real changes.`,
        },
        miniChallenge: `You're on day 5 at Northstar. In your 1:1s, three of six testers independently say the 5-day regression is "a waste of time that finds nothing." Your instinct is to cut it immediately — a visible win. In two or three sentences, decide what you actually do.`,
        modelAnswer: `## Example
I'd note it as a strong signal but not act yet. Three people hating the regression tells me *where to look*, not *what to do* — before cutting it I need the evidence: what has it actually caught in the last few releases, and what would we be exposed to without it? I'd pull that data this week. If it genuinely finds nothing of value, trimming it becomes an evidence-backed early win the team already wants; if it's quietly catching the payment regressions, I've just avoided a serious mistake made in the name of looking decisive.`,
        managersReview: {
          intro: 'When reviewing a new leader\'s 30-day assessment, look for:',
          strengths: ['Evidence, not just impressions (defect data, not "people feel")', 'Findings framed as provisional and open to challenge', 'A named quick win that the team actually wanted', 'A clear list of what is deliberately NOT being changed yet'],
          gaps: ['Jumping to solutions before the current state is understood', 'Acting on the loudest voice rather than the evidence', 'No stakeholder perspectives, only the QA team\'s'],
          improvements: ['Add where each finding\'s evidence came from', 'Separate "confident" findings from "needs more investigation"'],
        },
        portfolioBuilder: `This lesson feeds your first portfolio artefact directly. Turn your first-30-days plan and findings into the **First 30-Day QA Leadership Assessment** (the Module 1 assignment) — the opening piece of your QA Transformation Portfolio and the on-ramp to the Module 2 QA Current-State Assessment.`,
        resourcePreview: {
          name: 'QA Leader First 30 Days Checklist',
          purpose: 'A structured checklist covering the people to meet, questions to ask, evidence to gather, quick-win criteria and the "do not change yet" list.',
          whenToUse: 'From day one of a new QA leadership role, and to structure the Module 1 assignment.',
          formats: ['PDF', 'DOCX'],
        },
      },
    },
  ],
};
