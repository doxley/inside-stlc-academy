// ISTQB Foundation Masterclass — Module 10: Agile Testing.
// Full lesson content (base fields + enhancements), following the API Masterclass
// Gold Standard template: every lesson fills every base field and a rich
// `enhancements` block. Syllabus-accurate (ISTQB Foundation) + real-world.
export default {
  courseSlug: 'istqb-foundation-masterclass',
  moduleNumber: 10,
  lessonsPrefix: 'istqb',
  enhPrefix: 'istqb',
  enhSep: '-',
  lessons: [
    {
      lessonNumber: 1,
      title: 'Scrum for Testers',
      estimatedTime: '14 minute read',
      lessonOverview: `Agile delivery changes when and how testing happens. Scrum is the most common framework you will meet, so before anything else you need a clear picture of the tester's role inside a Scrum team.`,
      learningObjectives: ['Describe the core Scrum roles, events and artefacts', 'Explain how the tester works within a cross-functional Scrum team', 'Contrast the tester’s role in Agile with a traditional sequential lifecycle'],
      lessonNotes: `## Scrum in one paragraph
Scrum is an Agile framework that delivers software in short, fixed-length **iterations** called sprints (typically one to four weeks). Work is pulled from a prioritised **product backlog**, planned into a **sprint backlog**, and delivered as a potentially releasable **increment** each sprint.

## The three roles
- **Product Owner** — owns and prioritises the backlog; decides *what* is built.
- **Scrum Master** — a servant-leader who removes impediments and protects the process.
- **Development Team** — a cross-functional group that builds the increment. In Scrum there is **no separate "test team"**; testers are members of the development team.

## Where the tester fits
In Agile the tester is **embedded** in the team, not a downstream gate. Testing is a **whole-team responsibility**: the tester brings a quality mindset, builds test automation, pairs with developers, and helps clarify requirements *before* code is written. Testing happens continuously, not in a phase at the end.

## Key mindset shift
Quality is built in, not inspected in. The tester coaches the team on quality, champions early feedback, and treats every backlog item as testable only when it is well understood.`,
      workedExample: `A three-person team pulls the story "customer can reset password" into a two-week sprint. On day one the tester joins the developer to agree what "done" looks like, drafts test ideas from the acceptance criteria, and automates the happy path as the code appears — so by the sprint review the story is already tested, not queued for a later "test phase".`,
      commonMistakes: `- Treating the tester as a separate QA gate at the end of the sprint
- Assuming "Agile means no documentation or no testing"
- Waiting for a finished build before starting any test activity`,
      realWorldTip: `In a healthy Scrum team the tester is involved from the first conversation about a story. If you only see the work when it is "ready for test", you are already too late to influence quality cheaply.`,
      exercise: `In two or three sentences, describe how a tester's day differs in a Scrum team compared with a traditional sequential project.`,
      reflectionQuestion: `In Scrum, is testing the job of a separate test team or of the whole development team?`,
      knowledgeCheck: `In Scrum, whose responsibility is testing? (Answer: the whole cross-functional development team — there is no separate test team)`,
      completionChecklist: ['I can name the three Scrum roles', 'I can explain where the tester fits in a Scrum team', 'I understand testing as a whole-team responsibility'],
      enhancements: {
        industryStory: `A tester I mentored joined her first Scrum team still expecting a "test phase" at the end of each sprint. For two sprints she waited for builds and burned out cramming testing into the last two days. When she started attending planning and pairing with developers from day one, defects dropped and the last-minute panic disappeared. The role hadn't got easier — she'd simply moved her testing to where it mattered.`,
        visualAid: { type: 'comparison', title: 'Tester’s role: traditional vs Agile', headers: ['Aspect', 'Traditional (sequential)', 'Agile (Scrum)'], rows: [['When testing starts', 'After development', 'From the first story conversation'], ['Team structure', 'Separate QA team', 'Embedded in the dev team'], ['Responsibility', 'The QA gate', 'Whole-team quality'], ['Feedback loop', 'Slow (weeks/months)', 'Fast (daily / per story)'], ['Documentation', 'Heavy, up-front', 'Lightweight, just enough']] },
        davidTip: `The biggest adjustment for testers moving to Agile is emotional, not technical: you give up being the final gate and become a continuous quality coach. The teams that thrive are the ones where the tester's first question on a story is "how will we know this works?" — asked before a line of code is written.`,
        miniChallenge: `List three specific activities a tester could do on day one of a sprint, before any feature code exists.`,
        modelAnswer: `## Example\n1) Attend sprint planning and question ambiguous acceptance criteria. 2) Draft test charters and test ideas from the story. 3) Pair with a developer to agree the Definition of Done and set up test data or automation scaffolding.`,
        resourcePreview: { name: 'Agile Tester Role Cheat Sheet', purpose: 'One-page summary of Scrum roles, events and the tester’s contribution to each.', whenToUse: 'Keep it open through Module 10.', formats: ['PDF'] },
      },
    },
    {
      lessonNumber: 2,
      title: 'Agile Ceremonies',
      estimatedTime: '15 minute read',
      lessonOverview: `Scrum is held together by five recurring events. Each one is an opportunity for the tester to shape quality — if you know what to contribute to it.`,
      learningObjectives: ['Name the five Scrum events and their purpose', 'Describe the tester’s contribution to each ceremony', 'Explain why backlog refinement matters for testability'],
      lessonNotes: `## The five events (from a QA view)
1. **Sprint Planning** — the team agrees what it will deliver this sprint. The tester challenges vague stories, estimates test effort, and raises risks and testability concerns early.
2. **Daily Scrum (stand-up)** — a short daily sync on progress and impediments. The tester reports test progress, flags blocked items, and surfaces defects that put the sprint goal at risk.
3. **Sprint Review** — the team demonstrates the increment to stakeholders and gathers feedback. The tester helps show working, tested software and confirms acceptance criteria are met.
4. **Sprint Retrospective** — the team inspects *how* it worked and agrees improvements. The tester raises quality trends, flaky tests, and process friction.
5. **Backlog Refinement** — an ongoing activity to clarify, estimate and split upcoming items. This is the tester’s best chance to make stories **testable** before they enter a sprint.

## Why this matters
Ceremonies are not overhead — they are the feedback loops that let the team inspect and adapt. A tester who shows up prepared turns each event into a chance to catch ambiguity and risk before it becomes a defect.`,
      workedExample: `During backlog refinement the tester reads a story: "user can search products." She asks: search by what fields? What about no results, special characters, or 10,000 matches? The story is split into three smaller, testable stories with clear acceptance criteria — preventing a vague, untestable item from ever reaching sprint planning.`,
      commonMistakes: `- Treating ceremonies as status meetings the tester passively attends
- Skipping backlog refinement, then discovering stories are untestable mid-sprint
- Using the retrospective to blame rather than to improve the process`,
      realWorldTip: `Backlog refinement is the single highest-leverage ceremony for a tester. Fixing an ambiguous requirement there costs a sentence; fixing it after coding costs a defect, a fix and a re-test.`,
      exercise: `Pick one ceremony and write down two concrete things a tester should bring to it.`,
      reflectionQuestion: `Which ceremony gives the tester the best opportunity to influence the testability of a story before it is built?`,
      knowledgeCheck: `Which Scrum event is the tester’s best chance to make upcoming stories testable before a sprint? (Answer: backlog refinement)`,
      completionChecklist: ['I can name the five Scrum events', 'I can describe the tester’s role in each', 'I understand why refinement matters for testability'],
      enhancements: {
        industryStory: `On one team the testers treated stand-up as a status update they endured. Sprints kept ending with a mad rush because untestable stories were only discovered late. We changed one habit: a tester attended every refinement session and asked "how would I test this?" for each story. Within two sprints the mid-sprint surprises stopped — the ambiguity was being caught days earlier, for the price of a question.`,
        visualAid: { type: 'timeline', title: 'A sprint through the tester’s eyes', steps: [{ label: 'Refinement', detail: 'clarify & split stories; make them testable' }, { label: 'Planning', detail: 'estimate test effort; raise risks' }, { label: 'Daily Scrum', detail: 'report progress; flag blockers & defects' }, { label: 'Review', detail: 'demo tested, working software' }, { label: 'Retrospective', detail: 'raise quality trends; agree improvements' }] },
        davidTip: `Judge a team’s testing maturity by how it runs refinement. If the tester is in the room asking "what does done look like and how do we prove it?", quality is being built in. If refinement is skipped, you will pay for it every single sprint.`,
        miniChallenge: `For the sprint retrospective, write two quality-related observations a tester could raise that would genuinely improve the next sprint.`,
        modelAnswer: `## Example\n1) "Three of our automated tests are flaky and we’re ignoring their failures — let’s fix or quarantine them this sprint." 2) "Stories arrived without clear acceptance criteria twice; can we make criteria a refinement exit condition?"`,
        badGood: { label: 'a tester in stand-up', bad: `"Yesterday I tested. Today I’ll test more. No blockers." — vague, no risk visibility.`, good: `"I’ve tested the reset-password happy path; the negative cases are blocked because the error API returns 500 on bad input — that’s a defect and it risks the sprint goal."` },
      },
    },
    {
      lessonNumber: 3,
      title: 'User Stories',
      estimatedTime: '14 minute read',
      lessonOverview: `In Agile, requirements usually arrive as user stories. A well-formed story is testable; a poor one is a trap. The INVEST model tells you which is which.`,
      learningObjectives: ['Explain the standard user story format', 'Apply the INVEST criteria to assess a story', 'Explain the tester’s role in the "three Cs" of a story'],
      lessonNotes: `## The user story format
A user story captures a requirement from a user’s perspective, usually as:

> **As a** [type of user], **I want** [some goal], **so that** [some benefit].

It is a placeholder for a conversation, not a complete specification.

## The three Cs
- **Card** — the short written story.
- **Conversation** — the discussion that fleshes out the detail (testers are essential here).
- **Confirmation** — the acceptance criteria that confirm it is done.

## INVEST — the quality checklist for a story
- **I**ndependent — can be built and tested on its own.
- **N**egotiable — not a rigid contract; details emerge in conversation.
- **V**aluable — delivers value to a user or customer.
- **E**stimable — the team can size it.
- **S**mall — fits comfortably in a single sprint.
- **T**estable — you can define how to prove it is done.

## The tester’s role
Testers are the guardians of the **T** in INVEST. If you cannot describe how you would test a story, it is not ready — push back during refinement.`,
      workedExample: `A story reads: "As a shopper, I want to filter products, so that I find items faster." The tester asks: filter by what? Combined filters? What if nothing matches? These questions expose that the story is not yet **Small** or **Testable**, and it is split into "filter by price" and "filter by category", each with clear confirmation criteria.`,
      commonMistakes: `- Treating the story card as a complete specification and skipping the conversation
- Accepting stories that are too big to finish or too vague to test
- Forgetting the "so that..." — losing the *why* that guides testing`,
      realWorldTip: `The Testable in INVEST is your veto. If you genuinely cannot say how you would confirm a story is done, that is objective evidence it is not ready — and a far stronger argument than "it feels vague".`,
      exercise: `Take a feature you know and write it as a user story in the "As a… I want… so that…" format, then check it against all six INVEST letters.`,
      reflectionQuestion: `Which INVEST letter is most directly the tester’s responsibility, and why?`,
      knowledgeCheck: `In INVEST, which letter means you can define how to confirm the story is done? (Answer: T — Testable)`,
      completionChecklist: ['I can write a story in the standard format', 'I can apply all six INVEST criteria', 'I understand the three Cs and the tester’s role in them'],
      enhancements: {
        industryStory: `A product owner once handed us an epic disguised as a story: "As a user, I want a dashboard." It failed almost every INVEST letter — not small, not estimable, and certainly not testable. Instead of building it, we spent one refinement session splitting it into eight thin, testable stories. That single session saved the team from a fortnight of scope confusion and rework.`,
        visualAid: { type: 'comparison', title: 'The INVEST criteria', headers: ['Letter', 'Meaning', 'Tester’s question'], rows: [['I', 'Independent', 'Can I test this alone?'], ['N', 'Negotiable', 'Is detail still open to discuss?'], ['V', 'Valuable', 'What user value does it deliver?'], ['E', 'Estimable', 'Is it clear enough to size?'], ['S', 'Small', 'Does it fit one sprint?'], ['T', 'Testable', 'How would I prove it’s done?']] },
        davidTip: `When you read a story, silently run it through INVEST before you say a word. Nine times out of ten the letter that fails is T or S — and naming exactly which letter fails turns a wishy-washy "this feels off" into a concrete, respected piece of feedback.`,
        miniChallenge: `Rewrite this weak story so it passes INVEST: "The system should be fast."`,
        modelAnswer: `## Example\n"As a shopper, I want the product search results to appear within 2 seconds for a typical query, so that I don’t abandon the site." It is now Valuable, Small, and — crucially — Testable, because "within 2 seconds" gives a measurable confirmation.`,
        badGood: { label: 'a user story', bad: `"As a user, I want a good login." — not small, not testable, no clear value or confirmation.`, good: `"As a registered user, I want to log in with my email and password, so that I can access my account." — valuable, small, and testable with clear criteria.` },
      },
    },
    {
      lessonNumber: 4,
      title: 'Acceptance Criteria',
      estimatedTime: '15 minute read',
      lessonOverview: `Acceptance criteria turn a user story into something you can objectively confirm. Written well — often in Given/When/Then — they are the tester’s most powerful tool for removing ambiguity.`,
      learningObjectives: ['Define acceptance criteria and their purpose', 'Write acceptance criteria in the Given/When/Then format', 'Use acceptance criteria to derive acceptance tests'],
      lessonNotes: `## What acceptance criteria are
**Acceptance criteria** are the conditions a user story must satisfy to be accepted by the user, customer or Product Owner. They are the **confirmation** part of the three Cs — the objective, agreed definition of "done for this story".

## Two common styles
1. **Scenario-based (Given/When/Then)** — borrowed from Behaviour-Driven Development (BDD):
   - **Given** some initial context,
   - **When** an event occurs,
   - **Then** an expected outcome should result.
2. **Rule-based** — a simple checklist of conditions (e.g. "password must be at least 8 characters").

## Why testers love Given/When/Then
The format maps almost directly onto test cases: the **Given** is your precondition and test data, the **When** is your action, and the **Then** is your expected result. A story with good acceptance criteria is a story that has already sketched its own tests.

## Acceptance test-driven development (ATDD)
When the team agrees acceptance criteria *before* coding, developers know exactly what to build and testers know exactly what to check. This collaborative, up-front approach is the essence of ATDD.`,
      workedExample: `Story: "As a customer, I want to reset my password." One acceptance criterion becomes:
**Given** I am on the reset page and my account exists,
**When** I submit my registered email,
**Then** I receive a reset link within 60 seconds.
That single scenario tells the tester the precondition, the action, and the exact expected result — a ready-made acceptance test.`,
      commonMistakes: `- Writing criteria so vague they can’t be objectively passed or failed
- Only covering the happy path and ignoring negative and edge scenarios
- Writing acceptance criteria *after* the code, so they merely describe what was built`,
      realWorldTip: `Insist that acceptance criteria are agreed before development starts. Criteria written after the code just rubber-stamp whatever was built — they lose their power to catch a misunderstanding early.`,
      exercise: `Write one Given/When/Then acceptance criterion for a "log in with email and password" story, then add one for the wrong-password case.`,
      reflectionQuestion: `In Given/When/Then, which clause maps to the tester’s expected result?`,
      knowledgeCheck: `In a Given/When/Then acceptance criterion, which clause states the expected outcome? (Answer: the Then clause)`,
      completionChecklist: ['I can define acceptance criteria', 'I can write criteria in Given/When/Then', 'I can turn criteria into acceptance tests'],
      enhancements: {
        industryStory: `A team shipped a "forgotten password" feature that technically worked — but the reset email took eleven minutes to arrive because nobody had specified a time limit. The acceptance criteria said only "user receives a reset link". Adding one word — "within 60 seconds" — to the Then clause would have caught it. Now the first thing I check on any criterion is whether every outcome is measurable.`,
        visualAid: { type: 'comparison', title: 'Given/When/Then maps to a test', headers: ['Clause', 'Meaning', 'Test element'], rows: [['Given', 'Initial context', 'Precondition & test data'], ['When', 'The action / event', 'Test step'], ['Then', 'Expected outcome', 'Expected result / assertion']] },
        davidTip: `Read every "Then" clause and ask: could two reasonable people disagree about whether it passed? If yes, it is not done. "The page loads quickly" fails that test; "the page loads within 2 seconds" passes it. Measurable outcomes are the whole game.`,
        miniChallenge: `Write a Given/When/Then acceptance criterion for the failure case of a login story (wrong password).`,
        modelAnswer: `## Example\n**Given** I am a registered user on the login page,\n**When** I enter a valid email but an incorrect password,\n**Then** I see the message "Email or password is incorrect" and I remain on the login page.`,
        badGood: { label: 'acceptance criteria', bad: `"The login should work properly and be secure." — unmeasurable, no scenario, impossible to pass or fail objectively.`, good: `"Given a registered user, When they submit the correct email and password, Then they are taken to their dashboard within 2 seconds." — specific, scenario-based, and objectively testable.` },
      },
    },
    {
      lessonNumber: 5,
      title: 'Definition of Done',
      estimatedTime: '14 minute read',
      lessonOverview: `Acceptance criteria say when *one story* is finished. The Definition of Done says when *any* piece of work meets the team’s quality bar. Confusing the two is one of the most common Agile mistakes.`,
      learningObjectives: ['Define the Definition of Done and its purpose', 'Distinguish the Definition of Done from acceptance criteria', 'Explain how the Definition of Done supports quality and transparency'],
      lessonNotes: `## What the Definition of Done is
The **Definition of Done (DoD)** is a shared, team-wide checklist of the conditions that *every* backlog item (and often the whole increment) must meet before it can be called complete. It is a quality gate the team agrees and applies consistently.

A typical DoD includes: code reviewed, unit tests written and passing, acceptance criteria met, automated regression passing, no known critical defects, and documentation updated.

## DoD vs acceptance criteria — the crucial distinction
- **Acceptance criteria** are **specific to one story** — they describe *what* that story must do.
- **Definition of Done** is **common to all stories** — it describes the *quality bar* every story must clear (testing, review, standards).

A story can meet its acceptance criteria yet still fail the DoD — for example, if it works but has no automated tests or was never code-reviewed.

## Why it matters
The DoD creates a shared, honest understanding of "done" and prevents the classic trap of work being "done" but not really finished. It supports **transparency**: everyone — developers, testers and stakeholders — knows exactly what "done" guarantees.`,
      workedExample: `A developer says a story is "done" because the feature works on their machine. The team’s DoD, however, requires code review, passing unit tests and a green regression run. None of those are complete — so despite meeting the story’s acceptance criteria, it is **not done**. The DoD stops half-finished work being declared complete.`,
      commonMistakes: `- Confusing acceptance criteria (per story) with the Definition of Done (team-wide)
- Declaring work "done" when it only meets acceptance criteria but not the quality bar
- Having a DoD that exists on paper but is never actually enforced`,
      realWorldTip: `A Definition of Done that isn’t enforced is just wishful thinking. The value is in the discipline of refusing to call anything "done" until every item on the list is genuinely ticked.`,
      exercise: `Write down four items you would put in a Definition of Done for a web-application team.`,
      reflectionQuestion: `Which is specific to a single story — acceptance criteria or the Definition of Done?`,
      knowledgeCheck: `Which applies to every backlog item as a shared quality bar rather than to just one story: acceptance criteria or the Definition of Done? (Answer: the Definition of Done)`,
      completionChecklist: ['I can define the Definition of Done', 'I can distinguish it from acceptance criteria', 'I can list realistic DoD items'],
      enhancements: {
        industryStory: `A team I coached kept marking stories "done" that came back broken a sprint later. The problem wasn’t skill — it was that "done" meant "the feature demoed". We wrote an explicit Definition of Done: reviewed, unit-tested, regression green, no critical defects. The velocity number dropped for two sprints because we were finally being honest — and the flow of returning defects dried up completely.`,
        visualAid: { type: 'comparison', title: 'Acceptance criteria vs Definition of Done', headers: ['Aspect', 'Acceptance criteria', 'Definition of Done'], rows: [['Scope', 'One specific story', 'Every backlog item'], ['Question answered', 'What must this story do?', 'What quality bar must all work meet?'], ['Written by', 'PO + team per story', 'The whole team, once'], ['Changes', 'Per story', 'Rarely; applies to all'], ['Example', '"Reset link arrives in 60s"', '"Code reviewed & unit-tested"']] },
        davidTip: `When someone says a story is "done", ask two separate questions: "does it meet the acceptance criteria?" and "does it meet our Definition of Done?" The second question is where the honest conversation happens — and it is the one immature teams quietly skip.`,
        miniChallenge: `Sort these into "acceptance criteria" or "Definition of Done": (a) "reset email arrives within 60 seconds"; (b) "all new code is peer-reviewed"; (c) "automated regression suite is green".`,
        modelAnswer: `## Example\n(a) is an **acceptance criterion** — it’s specific to the password-reset story. (b) and (c) are **Definition of Done** items — they are the quality bar every story must clear, regardless of what the story does.`,
        badGood: { label: 'declaring work “done”', bad: `"It works on my machine and I showed it in the demo, so it’s done." — meets neither review nor testing gates.`, good: `"It meets its acceptance criteria, it’s peer-reviewed, unit and regression tests are green, and there are no critical defects — so it’s done." — the full DoD is satisfied.` },
      },
    },
    {
      lessonNumber: 6,
      title: 'Exploratory Testing in Agile',
      estimatedTime: '18 minute read',
      lessonOverview: `Scripted tests confirm what you expect; exploratory testing discovers what you didn’t. In Agile’s fast cycles, structured exploratory testing — driven by charters and time-boxed sessions — is one of the tester’s most valuable techniques.`,
      learningObjectives: ['Define exploratory testing and where it fits in Agile', 'Explain session-based test management and test charters', 'Contrast exploratory testing with scripted testing'],
      lessonNotes: `## What exploratory testing is
**Exploratory testing** is an approach where test design, test execution and learning happen **simultaneously**. The tester actively explores the software, using the results of each test to guide the next. It is structured and purposeful — not random "clicking about".

## Why it suits Agile
Agile delivers change quickly and often with lightweight documentation. Exploratory testing thrives here because it needs little up-front scripting, adapts instantly to new builds, and is excellent at finding the defects that scripted tests — which only check what you already anticipated — will always miss.

## Session-based test management (SBTM)
To keep exploration accountable, testers use **session-based test management**:
- Work is organised into **time-boxed sessions** (typically 60–90 minutes, uninterrupted).
- Each session is guided by a **test charter** — a short mission statement saying *what* to explore and *why* (for example: "Explore the checkout with invalid discount codes to discover pricing errors").
- The tester records findings, coverage and questions in **session notes**, then **debriefs** with the team.

## Exploratory vs scripted
Both have their place. Scripted testing gives repeatable, auditable coverage of known cases; exploratory testing finds the unknown unknowns. In Agile you typically combine them: automate the scripted regression, and spend human time exploring.`,
      workedExample: `A tester is given a charter: "Explore the new file-upload feature to discover how it handles unusual files, time-box 60 minutes." Within the session she tries a 0-byte file, a 2 GB file, a file with an emoji in the name, and a .exe renamed to .jpg — finding two crashes no acceptance criterion had mentioned. The charter kept her focused; the freedom let her find the surprises.`,
      commonMistakes: `- Confusing exploratory testing with unstructured, undocumented "ad-hoc clicking"
- Running exploratory sessions with no charter, so coverage can’t be reasoned about
- Relying only on scripted tests and never leaving time to explore`,
      realWorldTip: `A charter plus a time-box turns "have a play with it" into a professional, accountable activity. You can report exactly what you explored, what you found, and what you still have questions about — which is what earns exploratory testing its place in the plan.`,
      exercise: `Write a test charter for exploring a login feature: state what you’ll explore, why, and a time-box.`,
      reflectionQuestion: `In exploratory testing, what happens at the same time that is normally separated in scripted testing?`,
      knowledgeCheck: `In exploratory testing, which activities happen at the same time? (Answer: test design, test execution and learning happen simultaneously)`,
      completionChecklist: ['I can define exploratory testing', 'I can write a test charter and run a time-boxed session', 'I can contrast exploratory with scripted testing'],
      enhancements: {
        industryStory: `A team relied entirely on an automated regression suite and was proud it was always green — yet customers kept reporting odd crashes. The scripts only ever checked what the team had already thought of. We introduced two 90-minute charter-driven exploratory sessions per sprint, and in the first session alone found three crashes on malformed input that no script would ever have tried. Exploration finds the bugs your imagination didn’t.`,
        visualAid: { type: 'comparison', title: 'Exploratory vs scripted testing', headers: ['Dimension', 'Exploratory', 'Scripted'], rows: [['Design & execution', 'Simultaneous', 'Separated (design first)'], ['Best at finding', 'Unknown unknowns', 'Known, expected cases'], ['Documentation', 'Charters & session notes', 'Detailed test cases'], ['Repeatability', 'Lower', 'High'], ['Fit with Agile', 'Excellent (fast, adaptive)', 'Good for regression/automation']] },
        davidTip: `The best testers I’ve worked with never treat exploratory and scripted testing as rivals. They automate the boring, repeatable regression so a machine runs it every build, and they spend their scarce human attention exploring with charters. That split — machines for the known, humans for the unknown — is where quality is really won.`,
        miniChallenge: `Write a complete test charter for a "shopping cart" feature: state the mission (what and why) and a sensible time-box.`,
        modelAnswer: `## Example\n**Charter:** Explore the shopping cart with quantity changes and item removal to discover total-price and stock-count errors. **Time-box:** 60 minutes. **Notes to capture:** any incorrect totals, negative quantities accepted, or stock counts going wrong — plus open questions for the team debrief.`,
        badGood: { label: 'an exploratory session', bad: `"I’ll just have a click around the new feature for a bit and see if anything breaks." — no mission, no time-box, no record of coverage.`, good: `"Charter: explore checkout with invalid discount codes to find pricing errors; time-box 60 minutes; capture findings and open questions for debrief." — focused, accountable, reportable.` },
        managersReview: { intro: `If I reviewed your Agile testing work as a lead, here’s what I’d look for:`, strengths: ['You engage from refinement onwards, not just at "test time"', 'Your acceptance criteria are measurable and scenario-based', 'You run charter-driven exploratory sessions, not aimless clicking', 'You can clearly separate acceptance criteria from the Definition of Done'], improvements: ['Bring test ideas and risks into planning, not after coding', 'Make every "Then" clause objectively measurable', 'Time-box exploratory sessions and always debrief the findings'], gaps: ['Waiting for a build before doing any test activity', 'Confusing "meets acceptance criteria" with "done"', 'Running exploratory testing with no charter or notes to show for it'] },
        portfolioBuilder: `Create an "Agile testing pack" for your portfolio: for one sample feature, include (1) the user story checked against INVEST, (2) Given/When/Then acceptance criteria covering happy and negative paths, (3) a team Definition of Done, and (4) an exploratory test charter with session notes. This single artefact demonstrates the whole module in action.`,
        resourcePreview: { name: 'Agile Testing Toolkit', purpose: 'Templates for user stories, Given/When/Then acceptance criteria, a Definition of Done checklist, and a session-based exploratory test charter.', whenToUse: 'Use it whenever you join a Scrum team or refine a backlog item.', formats: ['PDF', 'DOCX'] },
      },
    },
  ],
};
