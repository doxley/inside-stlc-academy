// ISTQB Foundation Masterclass — Module 11: Real World QA.
// This is the programme's practical differentiator: where ISTQB theory meets
// industry reality, in David Oxley's senior-consultant voice. Base fields +
// rich enhancements on every lesson; the final lesson adds the review block.
export default {
  courseSlug: 'istqb-foundation-masterclass',
  moduleNumber: 11,
  lessonsPrefix: 'istqb',
  enhPrefix: 'istqb',
  enhSep: '-',
  lessons: [
    {
      lessonNumber: 1,
      title: 'How ISTQB Concepts Apply in Industry',
      estimatedTime: '14 minute read',
      lessonOverview: `The syllabus gives you a shared language. This lesson shows which of those concepts you will genuinely reach for on a real team, and how they show up once the exam is behind you.`,
      learningObjectives: ['Identify the ISTQB concepts teams use every day', 'Translate syllabus vocabulary into workplace shorthand', 'Explain why a shared language matters more than memorised definitions'],
      lessonNotes: `## The syllabus is a map, not the territory
Passing the exam proves you can recognise the concepts. Industry asks something harder: can you *use* them under time pressure, with an incomplete spec and a release on Friday? The good news is that a surprising amount of the syllabus survives contact with reality — it just changes shape.

## What you will actually reach for
- **The seven testing principles** — especially "testing shows the presence of defects" and "exhaustive testing is impossible". You will quote these to defend a risk-based approach in real meetings.
- **Test techniques** — equivalence partitioning and boundary value analysis are used constantly, often informally, whenever someone asks "what values should we try?".
- **Risk-based testing** — the single most-used idea in the whole syllabus. Every prioritisation call is really a risk conversation.
- **The test levels** (unit, integration, system, acceptance) — used as a shared vocabulary for *who tests what*.

## Why the vocabulary matters
The real value of ISTQB in a job is not the trivia — it is that you and a developer in Kraków and a BA in Leeds all mean the same thing by "regression" or "smoke test". Shared language removes friction. That is what you are actually being paid for.`,
      workedExample: `A team debates whether to retest a fixed login bug. One tester says "we should confirmation-test the fix, then run a targeted regression around auth". Because everyone knows those ISTQB terms, the plan is agreed in two minutes instead of a twenty-minute argument about what the words mean.`,
      commonMistakes: `- Treating the syllabus as a checklist to recite rather than tools to apply
- Assuming every concept is used equally — some dominate, some rarely appear
- Using formal ISTQB terms with stakeholders who don't share the vocabulary`,
      realWorldTip: `The concepts that survive into real work are the ones that help you *make a decision*: what to test, what to skip, and how to justify it. Learn those cold; the rest is context.`,
      exercise: `List three ISTQB concepts you expect to use in your first week on a real team, and one sentence on why each is practical.`,
      reflectionQuestion: `Which ISTQB idea gives a team the most value in day-to-day work — and is it the same as the one most heavily examined?`,
      knowledgeCheck: `Which ISTQB concept is the most used in real day-to-day prioritisation decisions? (Answer: risk-based testing)`,
      completionChecklist: ['I can name the concepts teams use daily', 'I can translate syllabus terms into workplace shorthand', 'I understand why shared language is the real payoff'],
      enhancements: {
        industryStory: `On my first consulting engagement I watched a brilliant tester get ignored in planning because she described her approach in pure syllabus language — "we'll apply decision table testing to the eligibility rules". The room glazed over. A week later she said the same thing as "let's list every combination of the three eligibility flags and test each row". Identical technique, but now the developers leaned in and started spotting missing rows themselves. The concept was never the problem; the translation was.`,
        visualAid: { type: 'comparison', title: 'Syllabus term vs how teams actually say it', headers: ['ISTQB term', 'What a team says on the floor'], rows: [['Confirmation testing', '"Did the fix actually work?"'], ['Regression testing', '"Did we break anything else?"'], ['Equivalence partitioning', '"Which values are worth trying?"'], ['Risk-based testing', '"What do we test first if time runs out?"'], ['Test basis', '"What are we testing against — the ticket? the spec?"']] },
        davidTip: `David's Industry Perspective: In twenty years I have never once been asked in a stand-up to "define equivalence partitioning". I have been asked a hundred times "which values did you try, and why those?" — which is the same thing wearing work clothes. Learn the concept deeply enough that you can explain it without the label.`,
        miniChallenge: `Take one ISTQB term you find dry — say "test basis" — and rewrite its meaning as a single plain question you could ask a developer.`,
        modelAnswer: `## Example\n"Test basis" becomes: "What are we actually checking this against — the acceptance criteria, the design doc, or someone's memory of the meeting?" That question exposes weak requirements instantly, which is exactly what the concept is for.`,
        resourcePreview: { name: 'Concept-to-Workplace Translation Card', purpose: 'Maps the most-used syllabus terms to the plain language teams really use.', whenToUse: 'Keep it beside you for your first month in a QA role.', formats: ['PDF'] },
      },
    },
    {
      lessonNumber: 2,
      title: 'What Companies Actually Do',
      estimatedTime: '15 minute read',
      lessonOverview: `The syllabus describes an idealised, well-documented process. Most companies run something leaner and messier. This lesson is an honest tour of what really happens on delivery teams.`,
      learningObjectives: ['Describe how real teams organise testing in practice', 'Recognise the gap between documented process and daily reality', 'Explain why lean beats thorough on most modern teams'],
      lessonNotes: `## The documented process vs the lived one
ISTQB describes a tidy test process: planning, analysis, design, implementation, execution, completion, each with formal work products. In practice, most Agile teams compress all of that into a ticket, a short test-idea list, and a conversation. The *thinking* still happens — the paperwork mostly doesn't.

## What actually happens on a modern team
- **Testing lives inside the sprint**, not in a separate phase. You test stories as they become ready.
- **Test cases are often lightweight** — a checklist in the ticket, or exploratory notes, rather than a formal test-case repository.
- **Automation carries the regression load** — the repetitive checks live in CI; humans focus on new risk and exploration.
- **"Whole-team quality"** — developers write unit and integration tests; testers focus on system behaviour, edge cases, and user reality.
- **Documentation is minimal by design** — teams document what they'll re-read, not what a standard says they should.

## Why lean usually wins
Heavy documentation ages badly and nobody reads it. Fast feedback and living automated checks are worth more than a beautiful test plan that's out of date by lunchtime. Good teams keep just enough process to stay safe.`,
      workedExample: `A fintech team I advised had no formal test plans at all. Each story carried a three-line "how we'll check this" note, a set of automated API checks in the pipeline, and a fifteen-minute exploratory session before sign-off. It was far lighter than the syllabus model — and their defect-escape rate was among the best I've seen. The rigour was in the thinking, not the templates.`,
      commonMistakes: `- Expecting a formal test-case repository at every company (most don't have one)
- Assuming "no documents" means "no rigour" — often the rigour moved into automation
- Trying to impose heavyweight ISTQB process on a fast Agile team`,
      realWorldTip: `Judge a team's testing by its outcomes and its conversations, not its document count. Some of the best QA I've seen produced almost no paperwork.`,
      exercise: `Describe how a two-week Agile sprint might handle testing without any formal test plan — name three lightweight things that replace it.`,
      reflectionQuestion: `If a team has almost no test documentation, what should you look at to judge whether their testing is actually good?`,
      knowledgeCheck: `On most modern Agile teams, where does the bulk of repetitive regression testing live? (Answer: in automated checks in the CI/CD pipeline)`,
      completionChecklist: ['I can describe real-team testing practice', 'I can spot the gap between documented and lived process', 'I understand why lean often beats thorough'],
      enhancements: {
        industryStory: `A newly-qualified tester joined a team I was consulting for and, on day two, asked where the test plan document was. There wasn't one. He was genuinely alarmed — the syllabus had told him a test plan was mandatory. I sat with him and showed him where the "plan" actually lived: in the sprint board, the definition of done, the CI pipeline, and a shared risk conversation held every Monday. Within a month he'd stopped looking for the missing document and started contributing to the real, distributed one. The plan existed; it just didn't look like the exam's version.`,
        visualAid: { type: 'comparison', title: 'Syllabus process vs what companies actually do', headers: ['ISTQB describes', 'What most teams actually do'], rows: [['Separate test phase', 'Testing inside the sprint, continuously'], ['Formal test plan document', 'Definition of done + risk conversation'], ['Detailed test-case repository', 'Checklist in the ticket + exploratory notes'], ['Test manager assigns work', 'Whole team owns quality'], ['Signed test summary report', 'Dashboard + a message in the team channel']] },
        davidTip: `David's Industry Perspective: When I walk into a new client, I don't ask to see the test plan first — I ask what breaks in production and how they found out. The answer tells me more about their real testing maturity than any document ever could. Process artefacts are easy to fake; production outcomes are not.`,
        miniChallenge: `Imagine you join a team with zero test documentation. Write down the three questions you'd ask to work out whether their testing is actually safe.`,
        modelAnswer: `## Example\n1) "What automated checks run on every commit, and what do they cover?" 2) "How do you decide what to test manually for a new story?" 3) "When something escapes to production, how do you find out and what happens next?" The answers reveal whether the rigour simply moved out of documents and into practice.`,
        badGood: { label: 'reading a team\'s maturity', bad: `"This team has no formal test plan or test-case repository, so their testing must be immature and risky."`, good: `"This team has no formal test plan, but strong CI coverage, a clear definition of done, and a weekly risk review — the rigour lives in practice, not paperwork."` },
      },
    },
    {
      lessonNumber: 3,
      title: 'Where Theory Differs from Reality',
      estimatedTime: '15 minute read',
      lessonOverview: `Some parts of the syllabus map cleanly onto real work. Others quietly get adapted, shrunk, or dropped. Knowing which is which stops you sounding naive in your first job.`,
      learningObjectives: ['Identify syllabus ideas that get adapted or skipped in practice', 'Explain why certain formalities rarely survive delivery pressure', 'Hold theory and reality in tension without dismissing either'],
      lessonNotes: `## Where the gaps show up
The syllabus is deliberately generic — it has to describe waterfall, V-model, and Agile at once. Real teams pick one context and optimise hard for it. That optimisation is where theory and practice part ways.

## What commonly gets adapted or dropped
- **Formal test documents** (test plan, test design spec, test summary report) — usually replaced by tickets, boards and dashboards.
- **Entry and exit criteria** — the *idea* survives (a definition of done), but the formal gate rarely does.
- **Strict test-level separation** — in reality, unit, integration and system testing blur, especially with developers testing their own code.
- **The tester as a separate role** — many teams have no dedicated testers at all; quality is everyone's job.

## What almost never gets skipped
- **Risk-based prioritisation** — because time is always short.
- **Exploratory testing** — because scripts never catch everything.
- **Regression safety** — because breaking live features is expensive.

## Holding both truths
The mistake is to conclude "the syllabus is useless because reality is different". The truth is subtler: the syllabus gives you the *principles*; reality forces you to choose *which to apply and how much*. Judgement is the skill the exam can't test.`,
      workedExample: `A tester fresh from the exam insisted on writing a formal test summary report at the end of every sprint. Nobody read them. We replaced them with a two-line message in the team channel — "shipped X, covered Y, known risk Z" — which everyone actually read and acted on. The syllabus goal (communicate test outcomes) was fully met; the syllabus *format* was quietly retired.`,
      commonMistakes: `- Concluding the syllabus is worthless because reality is messier
- Rigidly insisting on formal artefacts nobody will read
- Skipping the concepts that never get dropped (risk, exploration, regression) because they felt "obvious" in study`,
      realWorldTip: `When theory and reality disagree, ask what *goal* the theory was serving — then meet that goal in a way your team will actually use. The intent survives even when the format doesn't.`,
      exercise: `Pick one formal ISTQB artefact (e.g. the test summary report) and describe how you'd meet its underlying goal on an Agile team without producing the formal document.`,
      reflectionQuestion: `Which syllabus ideas almost never get skipped in industry, and why are those the ones under real time pressure?`,
      knowledgeCheck: `Which syllabus practice almost never gets dropped, because time is always short? (Answer: risk-based prioritisation)`,
      completionChecklist: ['I can name what gets adapted or dropped', 'I can name what almost never gets skipped', 'I can hold theory and reality in tension'],
      enhancements: {
        industryStory: `I once inherited a QA team that had, in good faith, built a 40-page test plan template because the syllabus and their audit process demanded it. Every project dutifully filled it in; not one person read the finished thing. When a critical bug reached production, the post-mortem revealed the risk had been buried on page 31 of a document nobody opened. We scrapped the template and replaced it with a one-page risk-and-coverage summary reviewed live in a meeting. Escaped defects dropped. The lesson: an artefact that isn't read is worse than useless — it manufactures false confidence.`,
        visualAid: { type: 'comparison', title: 'Theory vs reality: what survives delivery', headers: ['Syllabus expects', 'Reality on delivery teams'], rows: [['Formal test plan & summary report', 'Board, dashboard, short channel message'], ['Explicit entry/exit criteria', 'Definition of ready / definition of done'], ['Clean test-level separation', 'Levels blur; devs test their own code'], ['Dedicated tester role', 'Sometimes no testers — whole-team quality'], ['Risk-based testing (theory)', 'Risk-based testing (used constantly, informally)']] },
        davidTip: `David's Industry Perspective: The syllabus teaches you the ideal so you can recognise how far a real team has drifted from it — and, crucially, whether that drift is *sensible* or *dangerous*. A team skipping formal test plans is usually fine. A team skipping regression safety to hit a date is a fire I've been called in to put out more than once. Learn to tell the two apart.`,
        miniChallenge: `Name one syllabus practice you now expect to see adapted in real work, and one you'd worry if a team skipped. Say why for each.`,
        modelAnswer: `## Example\nAdapted: the formal test summary report — fine to replace with a dashboard and a short message. Worrying to skip: regression safety before a release — dropping it to hit a date is how live features break, and it's rarely worth the risk.`,
        badGood: { label: 'responding to a process gap', bad: `"They don't write formal test plans, so I'll insist we adopt the full ISTQB documentation set."`, good: `"They don't write formal test plans — but the underlying goals (agreed scope, communicated risk) are met by the board and the Monday risk review, so I'll strengthen those rather than add paperwork."` },
      },
    },
    {
      lessonNumber: 4,
      title: "David's Practical Guidance",
      estimatedTime: '15 minute read',
      lessonOverview: `Twenty years of consulting distilled into a working philosophy: how to be pragmatic without being sloppy, and professional without being a process zealot.`,
      learningObjectives: ['Apply a pragmatic-yet-professional testing mindset', 'Decide when to add rigour and when to strip it away', 'Communicate testing decisions in language stakeholders trust'],
      lessonNotes: `## The core principle: rigour where it counts
Pragmatism is not laziness. It is spending your rigour where the risk is, and refusing to spend it where the risk isn't. A payment flow deserves decision tables and careful boundary analysis. A cosmetic settings toggle does not. The skill is knowing the difference — and being able to defend it.

## My working rules
- **Start from risk, always.** Before any test design, ask "what's the worst that happens here, and how likely is it?" That single question orders your whole day.
- **Document what will be re-read.** If nobody will open it again, don't write it. If they will, make it findable.
- **Automate the boring, explore the interesting.** Machines are better at repetition; you are better at judgement and curiosity.
- **Make your reasoning visible.** "I didn't test X because the risk was low and time was short" is professional. Silent gaps are not.
- **Be honest about coverage.** Never let a green dashboard imply certainty you don't have.

## Professional, not precious
Being professional means owning your decisions and communicating them clearly — not clinging to process for its own sake. The best testers I know are relaxed about *format* and utterly rigorous about *thinking*.`,
      workedExample: `Under a tight release, I once cut scripted regression on a low-risk reporting module to protect time for the payment path. I wrote one line in the release notes: "Reporting regression descoped this release — low change, low risk; payment path fully covered." That sentence turned a silent gap into a visible, owned, professional decision. The release went out clean, and nobody was surprised.`,
      commonMistakes: `- Confusing pragmatism with cutting corners silently
- Applying the same rigour to everything regardless of risk
- Making testing decisions but never communicating the reasoning`,
      realWorldTip: `A visible, reasoned decision to *not* test something is professional. An invisible gap is a liability. The difference is one honest sentence.`,
      exercise: `Think of a low-risk area you might descope under time pressure. Write the single honest sentence you'd put in the release notes to make that decision visible.`,
      reflectionQuestion: `What is the difference between pragmatically descoping a test and simply cutting a corner?`,
      knowledgeCheck: `What single question should order your testing day, according to David's rules? (Answer: what's the worst that happens here, and how likely is it? — i.e. start from risk)`,
      completionChecklist: ['I can apply rigour proportional to risk', 'I know when to add and when to strip process', 'I can communicate a testing decision honestly'],
      enhancements: {
        industryStory: `Early in my career I worked with a test lead who was feared for his thoroughness — he tested everything to the same exhaustive standard. His suites were beautiful and his releases were always late. Then I worked with a consultant who spent ninety percent of her effort on the ten percent of the system that could actually hurt the business, and cheerfully waved the rest through with a note. Her releases were on time and her escaped-defect rate was lower. That contrast rewired how I work: thoroughness is not a virtue in itself — thoroughness *aimed at risk* is. I've spent twenty years teaching that distinction.`,
        visualAid: { type: 'comparison', title: 'Precious vs pragmatic testing', headers: ['Precious (process for its own sake)', 'Pragmatic (rigour aimed at risk)'], rows: [['Same depth everywhere', 'Depth follows risk'], ['Documents because the standard says so', 'Documents what will be re-read'], ['Silent when a gap is cut', 'States the gap and the reasoning'], ['Green dashboard = "done"', 'Green dashboard = "these checks passed"'], ['Defends the format', 'Defends the outcome']] },
        davidTip: `David's Industry Perspective: The most valuable sentence in my professional vocabulary is "I chose not to test that, and here's why." It signals that a gap is a *decision*, not an oversight. Junior testers hide their gaps hoping nobody notices. Senior testers announce them, own them, and get trusted with bigger decisions as a result. Visibility is what turns a cut corner into a professional judgement call.`,
        miniChallenge: `Pick a feature you know. Split it into "high-risk, test hard" and "low-risk, test light" areas, and justify one item in each bucket in a sentence.`,
        modelAnswer: `## Example\nOnline checkout. High-risk, test hard: the payment and total-calculation logic — a wrong figure loses money and trust, so decision-table and boundary testing are justified. Low-risk, test light: the "remember my basket" preference — worst case a user re-adds an item, so a quick smoke check is enough.`,
        badGood: { label: 'handling a time squeeze', bad: `Quietly skip regression on the payment path to hit the date, and say nothing.`, good: `Protect the payment path, descope the low-risk reporting module, and record one honest line stating what was cut and why.` },
      },
    },
    {
      lessonNumber: 5,
      title: 'Case Studies from the Field',
      estimatedTime: '18 minute read',
      lessonOverview: `Four short, real-shaped stories where ISTQB thinking met industry reality — including how a hiring manager reads these situations in an interview. This is where the whole module comes together.`,
      learningObjectives: ['Analyse real scenarios where theory and practice collided', 'Extract the transferable lesson from each case', 'Present your reasoning the way a hiring manager wants to hear it'],
      lessonNotes: `## Case 1: The regression nobody ran
A retail team dropped regression testing to hit a Black Friday date. A "trivial" pricing change broke basket totals for one currency. Cost: a day of lost sales and an emergency fix. **Lesson:** regression safety is the one corner you almost never cut — and when you must, you say so out loud.

## Case 2: The exhaustive test plan
A regulated client wrote perfect, exhaustive test plans — and shipped slowly while competitors moved faster. **Lesson:** "exhaustive testing is impossible" isn't just an exam line; treating it as one costs real money. Risk-based coverage would have shipped safe *and* fast.

## Case 3: The exploratory save
A scripted suite passed 100%. A tester spent an unscripted hour poking the new feature and found a data-corruption bug the scripts couldn't have caught, because nobody had imagined that path. **Lesson:** scripts confirm what you thought of; exploration finds what you didn't.

## Case 4: The interview answer
Two candidates were asked "how do you decide what to test?". One recited the syllabus definition of risk-based testing. The other described a real feature, named the risks, and explained what they'd cover first and what they'd skip. The second got the job. **Lesson:** hiring managers buy applied judgement, not recited theory.

## The thread through all four
Every case rewards the same thing: risk-led judgement, honestly communicated. That is the whole module in one line.`,
      workedExample: `In an interview I ran, a candidate was asked about a time they cut testing scope. Instead of dodging, she said: "We descoped regression on a low-risk reporting module before a release. I flagged it to the product owner, noted it in the release notes, and we agreed the payment path was fully covered." That answer — a real decision, owned and communicated — is exactly what I hire for. She demonstrated every idea in this module without quoting a single definition.`,
      commonMistakes: `- Telling case studies as "we did everything perfectly" (nobody believes it)
- Recounting what happened without extracting the transferable lesson
- In interviews, reciting definitions instead of describing real judgement`,
      realWorldTip: `In interviews and stand-ups alike, lead with a real decision and its reasoning. "Here's what I chose and why" beats "here's the textbook definition" every single time.`,
      exercise: `Write a three-sentence field story of your own (real or realistic): a situation, the risk-led decision you made, and the lesson. This is interview gold.`,
      reflectionQuestion: `Across all four cases, what single quality is consistently rewarded — and how would you demonstrate it in an interview?`,
      knowledgeCheck: `In the interview case study, what did the successful candidate do that the other didn't? (Answer: described applied, risk-led judgement on a real feature instead of reciting a definition)`,
      completionChecklist: ['I can extract the lesson from a field case', 'I can tell a risk-led story about my own testing', 'I can present my reasoning the way a hiring manager wants'],
      enhancements: {
        industryStory: `The most memorable hire I ever made came down to one answer. I asked a junior candidate what she'd do if she found a serious bug an hour before a release everyone was desperate to ship. She didn't reach for a process. She said: "I'd quantify the risk in one sentence the product owner can act on — what breaks, for how many users, how reversible — and let them make an informed call. My job is to make the risk visible, not to make the decision for them." That was a more mature answer than some test managers I'd worked with gave. She got the offer on the spot. Everything in this module was in that one reply: risk, honesty, communication, and knowing where your responsibility ends.`,
        visualAid: { type: 'comparison', title: 'Case studies: the decision and the lesson', headers: ['Situation', 'What went wrong / right', 'Transferable lesson'], rows: [['Skipped Black Friday regression', 'Pricing change broke basket totals', "Regression is the corner you don't silently cut"], ['Exhaustive test plans', 'Shipped too slowly, lost ground', 'Exhaustive testing is impossible — plan by risk'], ['100% scripts, extra exploration', 'Exploration found a hidden data bug', "Scripts confirm; exploration discovers"], ['Interview: theory vs applied answer', 'Applied-judgement candidate hired', 'Managers buy judgement, not definitions']] },
        davidTip: `David's Industry Perspective: When I interview testers, ISTQB certification tells me you speak the language — it's a tick, not a differentiator. What separates candidates is the story afterwards: a real feature, a real risk call, a real trade-off honestly explained. Certification gets you shortlisted; applied judgement gets you hired. Build a small stock of your own field stories now, and rehearse telling them in the shape of "situation, decision, lesson". That preparation is worth more than a re-read of the syllabus.`,
        miniChallenge: `Draft one interview-ready field story in the "situation, decision, lesson" shape — under 60 words — that you could tell if asked "when did you have to make a testing trade-off?".`,
        modelAnswer: `## Example\nSituation: a release date arrived with a low-risk reporting module unregressed. Decision: I protected the payment path, descoped the reporting checks, and flagged it to the product owner in writing. Lesson: a trade-off you communicate is a professional decision; a trade-off you hide is a liability. That framing works in interviews and stand-ups alike.`,
        badGood: { label: 'answering "how do you decide what to test?"', bad: `"Risk-based testing means prioritising test effort based on the likelihood and impact of failure." (Correct — but it's a definition, not you.)`, good: `"On our checkout, I'd hit payment and total calculation hardest — wrong figures cost money — and lightly smoke-test the cosmetic bits, because that's where the real risk lives." (Same concept, applied to a real feature.)` },
        managersReview: { intro: `If I reviewed your grasp of Real World QA as a hiring manager, here's what I'd look for:`, strengths: ['You lead with risk when deciding what to test', 'You describe real decisions, not recited definitions', 'You communicate gaps honestly and own your trade-offs', 'You know which syllabus practices survive delivery and which get adapted'], improvements: ['Build a small stock of your own field stories', 'Practise the "situation, decision, lesson" shape out loud', 'Always name what you would skip and why, not just what you would test'], gaps: ['Reciting theory instead of applying it to a real feature', 'Hiding cut corners rather than making them visible', 'Treating certification as a differentiator rather than a baseline'] },
        portfolioBuilder: `Add a "Real World QA" page to your portfolio: two or three short field stories in the "situation, decision, lesson" shape, plus a paragraph on your testing philosophy (risk-led, honest, pragmatic). This is the section interviewers remember — it shows judgement, not just certification.`,
        resourcePreview: { name: 'Field Stories & Interview Prep Pack', purpose: 'Templates for turning your testing experiences into interview-ready stories, plus common hiring-manager questions and strong-answer patterns.', whenToUse: 'Work through it before any QA interview and revisit it as you gather new stories.', formats: ['PDF', 'DOCX'] },
      },
    },
  ],
};
