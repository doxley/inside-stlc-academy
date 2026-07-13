// ISTQB Foundation Masterclass — Module 3: Static Testing.
// Full lesson content (base fields + enhancements), following the API Testing
// Masterclass template. Syllabus-accurate to ISTQB CTFL Foundation.
export default {
  courseSlug: 'istqb-foundation-masterclass',
  moduleNumber: 3,
  lessonsPrefix: 'istqb',
  enhPrefix: 'istqb',
  enhSep: '-',
  lessons: [
    {
      lessonNumber: 1,
      title: 'Static Testing & Its Value',
      estimatedTime: '13 minute read',
      lessonOverview: `Static testing examines work products without running any code. This lesson explains how it differs from dynamic testing and why finding defects on paper is so valuable.`,
      learningObjectives: ['Distinguish static testing from dynamic testing', 'Identify work products that can be reviewed', 'Explain the value and benefits of static testing'],
      lessonNotes: `## Static vs dynamic testing
In **dynamic testing** you execute the software and observe its behaviour. In **static testing** you examine work products **without executing code** — you read, review and analyse them instead. Both aim to find defects, but static testing catches them earlier and often finds different kinds.

## What can be reviewed
Almost any readable work product, including:
- Requirements and specifications
- User stories and acceptance criteria
- Design documents and architecture
- Source code
- Test plans, test cases and test charters
- Contracts, models and configuration
- User guides and web pages

Anything with a defined structure that people can read can be statically tested.

## Why it is valuable
- **Detecting defects early**, before they are coded — cheaper to fix
- Finding defects that dynamic testing may miss (e.g. unreachable requirements, ambiguities)
- Preventing defects in design or coding by spotting inconsistencies early
- Increasing development productivity and shared understanding
- Improving **communication** between team members involved in the review

Static testing and dynamic testing complement each other — neither replaces the other.`,
      workedExample: `A business analyst writes: "The system shall respond quickly to all requests." A reviewer reads it statically and asks, "How quickly? Which requests?" The word "quickly" is untestable. The requirement is fixed to "respond within 2 seconds for search requests" — a defect removed before a single line of code was written.`,
      commonMistakes: `- Believing static testing means "running tests without assertions" — no code is executed at all
- Thinking only code can be statically tested — requirements and designs count too
- Treating static and dynamic testing as alternatives rather than complements`,
      realWorldTip: `The cheapest defect to fix is the one caught in a requirement review. Every ambiguity you remove on paper is a bug that never reaches code, test or production.`,
      exercise: `List three work products from your own team that could be statically reviewed before any code is written.`,
      reflectionQuestion: `What is the key difference between static and dynamic testing?`,
      knowledgeCheck: `Which activity is an example of static testing? (Answer: reviewing a requirements document without executing any code)`,
      completionChecklist: ['I can distinguish static from dynamic testing', 'I can name work products that can be reviewed', 'I can explain why static testing adds value'],
      enhancements: {
        industryStory: `On one project the requirements review flagged that "user" was used to mean three different roles across the spec. Untangling it took an afternoon. Left undiscovered, it would have driven weeks of rework once developers built the wrong permission model. That single static review paid for itself many times over.`,
        visualAid: { type: 'comparison', title: 'Static vs dynamic testing', headers: ['Aspect', 'Static testing', 'Dynamic testing'], rows: [['Code executed?', 'No', 'Yes'], ['When', 'Very early', 'After code exists'], ['Finds', 'Defects in work products', 'Failures in behaviour'], ['Examples', 'Reviews, static analysis', 'Functional, non-functional tests'], ['Cost to fix', 'Lowest', 'Higher']] },
        davidTip: `The teams I have coached who take reviews seriously ship measurably fewer late defects. Static testing feels slow in the moment, but it is the highest-leverage hour a tester can spend all week.`,
        miniChallenge: `Take one requirement or user story you have to hand and read it statically. Find one ambiguity, contradiction or gap.`,
        modelAnswer: `## Example\nStory: "As a user I want to reset my password." Gap found: no mention of what happens after too many failed attempts, and no acceptance criteria for the reset link expiry. Both are defects caught before coding.`,
        resourcePreview: { name: 'Static Testing Cheat Sheet', purpose: 'One-page reference for static testing terms and benefits.', whenToUse: 'Keep it open throughout Module 3.', formats: ['PDF'] },
      },
    },
    {
      lessonNumber: 2,
      title: 'The Review Process',
      estimatedTime: '15 minute read',
      lessonOverview: `Reviews are more effective when they follow a defined process. This lesson walks through the formal review activities and the roles people play.`,
      learningObjectives: ['List the activities of a formal review process', 'Describe the roles and responsibilities in a review', 'Explain why a defined process improves review effectiveness'],
      lessonNotes: `## The activities of a formal review
The ISTQB syllabus describes a review as a set of activities:
1. **Planning** — define scope, purpose, work products, effort, exit criteria and roles
2. **Initiation** (review initiation) — distribute the work product, explain objectives, ensure everyone has what they need
3. **Individual review** — reviewers examine the work product on their own and note potential defects, questions and comments
4. **Communication and analysis** — findings are gathered, discussed and analysed; each is given a status and severity, and it is decided what action is needed
5. **Fixing and reporting** — defects are fixed by the author, results are reported, and exit criteria are checked

## The roles
- **Manager** — decides reviews will happen, allocates time and staff, evaluates outcomes against objectives
- **Author** — creates and fixes the work product under review
- **Moderator** (facilitator) — leads the review, mediates, keeps it productive
- **Scribe** (recorder) — records findings, decisions and defects
- **Reviewer** — examines the work product and raises findings (may be subject-matter experts or peers)
- The **review leader** takes overall responsibility for the review

One person can hold more than one role. Clear roles keep a review focused on the work product, not the author.`,
      workedExample: `A team reviews a test plan. The moderator schedules the session and sets the exit criterion "all critical comments resolved". Reviewers study the plan individually and log 14 comments. In the meeting the scribe records each decision; 3 comments are rejected, 11 accepted. The author fixes them, the moderator confirms exit criteria are met, and the plan is signed off.`,
      commonMistakes: `- Skipping planning and jumping straight into a meeting with no scope or exit criteria
- Letting reviewers comment on the author rather than the work product
- Having no scribe, so decisions and defects are forgotten after the meeting`,
      realWorldTip: `Individual preparation is where most defects are actually found. A review meeting with no individual review beforehand tends to drift into vague discussion and finds little.`,
      exercise: `For a review you could run this week, name who would take each role: author, moderator, scribe and reviewer.`,
      reflectionQuestion: `Which role is responsible for recording the findings and decisions during a review?`,
      knowledgeCheck: `Who records the defects and decisions identified during a formal review? (Answer: the scribe, also called the recorder)`,
      completionChecklist: ['I can list the formal review activities', 'I can describe each review role', 'I understand why individual review matters'],
      enhancements: {
        industryStory: `Early in my career I sat in a "review" that was really just the author reading their document aloud while everyone nodded. Nothing was written down and nothing was found. When we introduced individual preparation and a named scribe, the very next review surfaced eleven genuine defects. The process was the difference.`,
        visualAid: { type: 'timeline', title: 'The formal review process', steps: [{ label: 'Planning', detail: 'scope, roles, exit criteria' }, { label: 'Initiation', detail: 'distribute work product, explain objectives' }, { label: 'Individual review', detail: 'reviewers examine and note findings' }, { label: 'Communication & analysis', detail: 'discuss, assess, decide actions' }, { label: 'Fixing & reporting', detail: 'author fixes, results reported, exit criteria checked' }] },
        davidTip: `Protect the individual-review time fiercely. In my experience the meeting is where you agree on findings, but the quiet preparation beforehand is where they are actually discovered.`,
        badGood: { label: 'running a review', bad: `The author reads the document aloud, people react in the room, nobody prepared and nothing is recorded.`, good: `Everyone reviews individually first, brings written findings, a scribe records each decision, and exit criteria decide when it is done.` },
        miniChallenge: `Sketch the five review activities in order and write one sentence on what happens in each.`,
        modelAnswer: `## Example\n1) Planning — set scope and exit criteria. 2) Initiation — share the document and objectives. 3) Individual review — reviewers find defects alone. 4) Communication & analysis — discuss and decide actions. 5) Fixing & reporting — author fixes, results reported, exit criteria checked.`,
      },
    },
    {
      lessonNumber: 3,
      title: 'Review Types: Walkthrough, Technical Review & Inspection',
      estimatedTime: '15 minute read',
      lessonOverview: `Not all reviews are equally formal. This lesson maps the review types along a formality spectrum, from the quick informal review to the rigorous inspection.`,
      learningObjectives: ['Describe the main review types and their objectives', 'Place review types on a formality spectrum', 'Choose an appropriate review type for a situation'],
      lessonNotes: `## The formality spectrum
Reviews range from **informal** (little structure) to **formal** (defined process, roles and metrics). The syllabus describes four main types:

## Informal review
- No formal process; may be pair review or a quick look
- Main objective: **detect potential defects** cheaply and quickly
- Results are usually not documented

## Walkthrough
- Led by the **author**, who guides participants through the work product
- Objectives: find defects, improve quality, evaluate alternatives, exchange ideas, train and gain consensus
- May be informal or fairly structured; individual preparation is optional

## Technical review
- Performed by **technically qualified reviewers**, often led by a trained facilitator (not the author)
- Objectives: gain consensus, detect defects, evaluate quality, generate ideas, make technical decisions
- Individual preparation is expected; may be documented

## Inspection
- The **most formal** type; follows a defined process with roles and metrics
- Led by a trained **moderator** (not the author), uses rules and checklists, entry and exit criteria
- Main objectives: **find the maximum number of defects**, evaluate quality, prevent future defects through learning, and improve the process itself

Choosing the type is a trade-off between rigour and cost.`,
      workedExample: `A safety-critical control algorithm needs a formal **inspection**: trained moderator, checklists, entry/exit criteria and defect metrics. A quick draft of internal release notes needs only an **informal review** — a colleague reads it over. Matching the type to the risk keeps effort proportionate.`,
      commonMistakes: `- Assuming every review must be a full inspection — overkill for low-risk documents
- Thinking a walkthrough is led by the moderator; it is led by the author
- Believing "informal" means low value — it still finds real defects cheaply`,
      realWorldTip: `Match the formality to the risk. High-risk, high-cost-of-failure work products earn an inspection; a quick draft rarely does. Spending inspection effort on trivia is as wrong as under-reviewing critical code.`,
      exercise: `For each of these, pick a review type and justify it: (a) a safety-critical requirement, (b) a teammate's draft email template, (c) a shared API design.`,
      reflectionQuestion: `Who leads a walkthrough, and who leads an inspection?`,
      knowledgeCheck: `Which review type is the most formal and aims to find the maximum number of defects? (Answer: inspection)`,
      completionChecklist: ['I can describe the four review types', 'I can order them by formality', 'I can choose an appropriate type for a situation'],
      enhancements: {
        industryStory: `A payments team ran full inspections on every document, including trivial internal notes. Morale dropped and reviews became a bottleneck. We reserved inspections for the payment-calculation code and used lightweight walkthroughs elsewhere. Defect detection on the critical code actually improved once effort was focused where risk lived.`,
        visualAid: { type: 'comparison', title: 'Review types by formality', headers: ['Type', 'Led by', 'Formality', 'Main objective'], rows: [['Informal review', 'Anyone / peer', 'Lowest', 'Detect defects cheaply'], ['Walkthrough', 'Author', 'Low–medium', 'Find defects, share understanding'], ['Technical review', 'Facilitator / experts', 'Medium–high', 'Consensus & technical decisions'], ['Inspection', 'Trained moderator', 'Highest', 'Maximum defects, process improvement']] },
        davidTip: `When people say "we do reviews", always ask which type. A rubber-stamp walkthrough and a rigorous inspection are worlds apart in what they catch. Naming the type sets the right expectation.`,
        badGood: { label: 'choosing a review type', bad: `Every artefact gets a full inspection regardless of risk, so reviews become a bottleneck and people rush them.`, good: `Inspections are reserved for high-risk work products; low-risk drafts get quick informal reviews. Effort matches risk.` },
        miniChallenge: `Order the four review types from least to most formal, and give one situation where each is the right choice.`,
        modelAnswer: `## Example\nInformal (draft notes) → walkthrough (a new feature spec with the author) → technical review (an architecture decision needing expert consensus) → inspection (safety-critical algorithm needing maximum defect detection).`,
      },
    },
    {
      lessonNumber: 4,
      title: 'Static Analysis',
      estimatedTime: '13 minute read',
      lessonOverview: `Static analysis lets tools examine code and other artefacts without executing them. This lesson explains what static analysis tools find and how they complement reviews.`,
      learningObjectives: ['Explain what static analysis is and how it differs from reviews', 'Identify the kinds of defects static analysis tools detect', 'Describe the benefits and limitations of static analysis'],
      lessonNotes: `## What static analysis is
**Static analysis** is static testing performed by **tools** rather than people. The tool examines source code (or models, or other structured artefacts) **without executing it**, applying rules to flag potential problems. It scales to large codebases in ways manual review cannot.

## What it can find
- **Coding standard** violations (style and convention breaches)
- Programming **defects**: uninitialised variables, unreachable (dead) code, undefined variables
- **Control-flow and data-flow** anomalies
- **Security vulnerabilities** (e.g. injection risks, unsafe functions)
- Overly complex code (high cyclomatic complexity)
- Inconsistencies in models or dependencies

## Benefits
- Detects defects **early**, before dynamic testing
- Finds defects that are hard to spot in dynamic testing (e.g. unreachable code)
- Identifies dependencies and inconsistencies, e.g. broken links in models
- Improves maintainability and enforces standards consistently

## Limitations
- Can produce **false positives** (warnings that are not real defects) and false negatives
- Does not prove the code does the right thing — only flags suspicious patterns
- Still needs human judgement to triage results

Static analysis is often built into IDEs and CI pipelines so it runs automatically.`,
      workedExample: `A linter runs on a pull request and flags a variable assigned but never used, plus a function with a cyclomatic complexity of 27. Neither would fail a functional test, but both signal defects and maintenance risk. The developer fixes them before the code is ever executed.`,
      commonMistakes: `- Treating every tool warning as a real defect — false positives must be triaged
- Assuming static analysis proves correctness; it only flags suspicious patterns
- Ignoring the tool output entirely because "the tests pass"`,
      realWorldTip: `Wire static analysis into your CI pipeline so it runs on every commit. A defect a tool catches automatically is a review comment a human never has to write.`,
      exercise: `Name two defect types a static analysis tool can find that a functional test would probably miss.`,
      reflectionQuestion: `Does static analysis execute the code, and what does that mean for the kinds of defects it can find?`,
      knowledgeCheck: `Which of these is typically found by static analysis rather than dynamic testing? (Answer: unreachable/dead code)`,
      completionChecklist: ['I can explain what static analysis is', 'I can list defects it detects', 'I understand its benefits and limitations'],
      enhancements: {
        industryStory: `A team I supported switched on a static analysis gate in their pipeline and, on day one, it surfaced a null-pointer path that had survived years of dynamic testing because that branch was rarely exercised. No human review had spotted it either. The tool read every path at once, which people simply cannot do at scale.`,
        visualAid: { type: 'comparison', title: 'Static analysis vs manual review', headers: ['Aspect', 'Static analysis (tool)', 'Review (people)'], rows: [['Executes code?', 'No', 'No'], ['Scale', 'Whole codebase, fast', 'Limited by human time'], ['Best at', 'Standards, flow, security patterns', 'Intent, logic, ambiguity'], ['Weakness', 'False positives', 'Slow, subjective'], ['Judgement', 'None — needs triage', 'Human judgement applied']] },
        davidTip: `Static analysis and reviews are partners, not rivals. Let the tool handle the mechanical checks so your human reviewers can spend their attention on intent, logic and the ambiguities only a person can catch.`,
        badGood: { label: 'using static analysis', bad: `The pipeline reports 400 warnings, everyone ignores them, and real defects hide in the noise.`, good: `The team tunes the ruleset, triages false positives, and fails the build only on high-severity findings so the signal stays meaningful.` },
        miniChallenge: `List two defect types static analysis catches that a functional test would likely miss, and one limitation of relying on the tool alone.`,
        modelAnswer: `## Example\nCatches: dead/unreachable code and an uninitialised variable on a rarely used path. Limitation: it produces false positives, so a human must triage each warning and decide if it is a real defect.`,
      },
    },
    {
      lessonNumber: 5,
      title: 'Reviews in the Real Workplace',
      estimatedTime: '16 minute read',
      lessonOverview: `Knowing the theory is one thing; making reviews work with real people and deadlines is another. This lesson shows how static testing plays out day to day.`,
      learningObjectives: ['Apply review principles in a realistic team setting', 'Recognise the human factors that make reviews succeed or fail', 'Contribute constructively as an author and a reviewer'],
      lessonNotes: `## Reviews in modern delivery
In practice, static testing rarely looks like a formal meeting in a booked room. It shows up as:
- **Pull request reviews** on every code change (a form of technical review)
- **Refinement sessions** where the team reviews user stories and acceptance criteria before committing
- **Design reviews** and **three amigos** sessions (BA, developer, tester) discussing a story together
- **Automated static analysis** running silently in the pipeline

The ISTQB roles still apply: someone leads, someone authors, findings are recorded (often in the tool), and there are exit criteria (e.g. "two approvals required").

## Human factors that decide success
Reviews are as much about people as process:
- **Review the work product, not the person** — comments target the artefact, never the author
- Keep feedback **objective and specific** — "this is unclear" is weaker than "line 12 does not say what happens on timeout"
- Authors should treat findings as free help, not criticism
- Managers must give reviews **real time** — a review squeezed into ten rushed minutes finds little
- Explaining objectives up front keeps everyone aligned

## Making them stick
The best teams keep reviews **small, frequent and blameless**. A steady habit of small reviews beats an occasional heavyweight one, and it builds the shared understanding that prevents defects in the first place.`,
      workedExample: `A tester opens a pull request. Instead of "this code is bad", they comment: "Line 40 — if the API times out, this path returns null and the caller will crash. Suggest returning a handled error." It is specific, targets the code not the coder, and the author fixes it gladly. That is a technical review working as intended.`,
      commonMistakes: `- Making review comments personal ("you always forget error handling") instead of about the work
- Rubber-stamping pull requests with "LGTM" without actually reviewing
- Managers scheduling zero time for reviews and then wondering why defects slip through`,
      realWorldTip: `The single biggest predictor of whether a team's reviews find defects is whether they feel safe. Blameless, specific, work-product-focused feedback is what keeps people honest and engaged.`,
      exercise: `Rewrite this hostile review comment into a constructive one: "This is wrong, did you even test it?"`,
      reflectionQuestion: `Why is it important to review the work product rather than the author?`,
      knowledgeCheck: `A good review comment focuses on what? (Answer: the work product, stated objectively and specifically — not the author personally)`,
      completionChecklist: ['I can apply review ideas to real team settings', 'I can give constructive, work-product-focused feedback', 'I understand the human factors behind effective reviews', 'I can identify reviews hiding in everyday delivery'],
      enhancements: {
        industryStory: `I once watched a talented developer quietly stop contributing after a reviewer publicly picked apart his code in personal terms. The defects were real; the delivery was toxic. We reset the team norm to "comment on the code, never the coder", and within a month reviews were both kinder and sharper — people stopped being defensive and started actually reading each other's work.`,
        visualAid: { type: 'comparison', title: 'Textbook review vs real workplace', headers: ['Textbook', 'Real workplace'], rows: [['Booked review meeting', 'Pull request review'], ['Formal roles named', 'Roles implied by the tool'], ['Paper defect log', 'Comments in the PR / ticket'], ['Scheduled inspection', 'Refinement & three amigos'], ['Manual only', 'Automated static analysis in CI']] },
        davidTip: `David's Industry Perspective: In twenty years I have never seen a great team with poor reviews. The teams that ship well treat reviews as a shared craft, not a gate to pass. Learn to give a specific, kind, work-product-focused comment and you will be welcome on any team I have ever led.`,
        badGood: { label: 'a review comment', bad: `"This is wrong, did you even test it?" — personal, vague and hostile; the author gets defensive and learns nothing.`, good: `"On line 40 the timeout path returns null and the caller will crash — could we return a handled error instead?" — specific, objective, about the code.` },
        miniChallenge: `Take a real pull request or document and write two review comments that are specific, objective and focused on the work product rather than the person.`,
        modelAnswer: `## Example\n1) "Section 2 lists two different timeout values (5s and 10s) — which is correct?" 2) "The acceptance criteria do not cover the empty-cart case; should we add one?" Both are specific, testable and about the artefact.`,
        managersReview: {
          intro: `If I reviewed how you contribute to static testing as your lead, here is what I would look for:`,
          strengths: ['You prepare individually before the meeting and bring written findings', 'Your comments target the work product, specifically and objectively', 'You treat review feedback on your own work as free help, not criticism'],
          improvements: ['Add severity/priority to findings so the author knows what to fix first', 'Reference exact lines or sections rather than "somewhere in here"', 'Follow up to confirm agreed fixes actually landed'],
          gaps: ['Rubber-stamping pull requests without real review', 'Personal or vague comments that make authors defensive', 'Never using static analysis to catch the mechanical issues for you'],
        },
        portfolioBuilder: `Add a "review sample" to your portfolio: take a short document or code snippet, write three constructive review comments (each specific, objective and work-product-focused), and note which review type the situation calls for and why.`,
        resourcePreview: { name: 'Review Checklist & Feedback Guide', purpose: 'A practical checklist for running reviews and phrasing constructive, work-product-focused comments.', whenToUse: 'Use it before your next pull request or document review.', formats: ['PDF'] },
      },
    },
  ],
};
