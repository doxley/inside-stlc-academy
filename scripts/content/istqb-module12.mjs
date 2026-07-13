// ISTQB Foundation Masterclass — Module 12: Exam Preparation.
// Full lesson content (base fields + enhancements). Follows the Gold Standard
// template: every lesson fills every base field and a rich `enhancements` block.
export default {
  courseSlug: 'istqb-foundation-masterclass',
  moduleNumber: 12,
  lessonsPrefix: 'istqb',
  enhPrefix: 'istqb',
  enhSep: '-',
  lessons: [
    {
      lessonNumber: 1,
      title: 'Study Techniques',
      estimatedTime: '14 minute read',
      lessonOverview: `How you study matters more than how long you study. This lesson shows you the two techniques that reliably beat re-reading for the ISTQB Foundation (CTFL) exam: active recall and spaced repetition.`,
      learningObjectives: ['Explain why active recall beats passive re-reading', 'Apply spaced repetition to the CTFL syllabus', 'Build a simple study routine that fits around a job'],
      lessonNotes: `## Passive reading is the trap
Highlighting the syllabus and re-reading it *feels* productive, but recognition is not recall. In the exam you must **retrieve** definitions and apply them under time pressure — so practise retrieval, not recognition.

## Active recall
Close the book and ask yourself the question first. "What are the seven testing principles?" "What is the difference between verification and validation?" Struggling to remember is the moment the memory actually forms. Flashcards, self-quizzing and blank-page brain-dumps all force recall.

## Spaced repetition
Review material at increasing intervals — day 1, day 3, day 7, day 16 — rather than cramming it once. Each successful recall pushes the next review further out. Tools like Anki automate the schedule; a paper Leitner box of index cards works just as well.

## A realistic weekly routine
- **Learn** a new chapter (K1/K2 definitions).
- **Recall** yesterday's chapter from a blank page.
- **Practise** exam questions on older chapters.
Rotate these three so every topic gets revisited before you forget it.`,
      workedExample: `Take the seven testing principles. Day 1: read them, then close the syllabus and write them from memory — you get four. Day 3: try again — six. Day 7: all seven, in order. That climb from 4→6→7 is spaced active recall doing its job; re-reading the list ten times in one sitting would not have produced it.`,
      commonMistakes: `- Re-reading and highlighting instead of self-testing
- Cramming a topic once and never revisiting it
- Studying for hours with the syllabus open, never closing it to recall`,
      realWorldTip: `The single highest-value study habit is the blank-page brain-dump: after each chapter, write everything you remember with the book shut, then check. It exposes exactly what you don't know.`,
      exercise: `Pick one chapter you've already read. Close the syllabus and write everything you remember on a blank page. Then open it and mark what you missed.`,
      reflectionQuestion: `Why does trying to recall something before checking the answer build stronger memory than re-reading it?`,
      knowledgeCheck: `Which study technique builds stronger memory — passively re-reading notes, or actively recalling answers before checking? (Answer: active recall)`,
      completionChecklist: ['I understand why active recall beats re-reading', 'I can apply spaced repetition to my study plan', 'I have a weekly routine that rotates learn / recall / practise'],
      enhancements: {
        industryStory: `A tester on my team failed the Foundation exam first time despite "studying for weeks". When I asked how, she'd re-read the syllabus cover to cover three times. Second attempt she switched to Anki flashcards and blank-page recall, studying half as many hours — and passed comfortably. Same material, completely different method.`,
        visualAid: { type: 'timeline', title: 'A spaced-repetition schedule for one topic', steps: [{ label: 'Day 1', detail: 'learn it, then recall from blank page' }, { label: 'Day 3', detail: 'recall again — check gaps' }, { label: 'Day 7', detail: 'recall + a few exam questions' }, { label: 'Day 16', detail: 'final recall — should be automatic' }] },
        davidTip: `In fifteen years of hiring and coaching testers, the ones who pass first time almost never "read more". They test themselves relentlessly. Treat every study session as a mini-exam, not a reading session.`,
        miniChallenge: `Turn one syllabus definition into a flashcard: question on the front, precise answer on the back. Test yourself on it today and again in three days.`,
        modelAnswer: `## Example\nFront: "What are the four test levels?" Back: "Component (unit), Integration, System, Acceptance." Tested day 1 (missed acceptance), day 3 (all four). Two short recalls beat twenty minutes of re-reading.`,
        badGood: { label: 'a study session', bad: `Syllabus open, highlighter in hand, re-reading Chapter 1 for the third time. It feels familiar, so you assume you know it.`, good: `Syllabus shut. You write the seven principles from memory, check, and re-drill only the two you missed.` },
        resourcePreview: { name: 'CTFL Active-Recall Flashcard Deck', purpose: 'Ready-made question/answer cards covering every syllabus keyword.', whenToUse: 'Import into Anki and review daily from your first study session.', formats: ['CSV', 'PDF'] },
      },
    },
    {
      lessonNumber: 2,
      title: 'Revision Planning',
      estimatedTime: '15 minute read',
      lessonOverview: `A vague intention to "revise" is how people run out of time. This lesson turns the CTFL syllabus into a realistic, dated revision plan you can actually follow around a full-time job.`,
      learningObjectives: ['Break the CTFL syllabus into a weekly plan', 'Weight revision time towards higher-value chapters', 'Build in mock exams and a taper before exam day'],
      lessonNotes: `## Start from the exam, work backwards
The CTFL exam is **40 multiple-choice questions in 60 minutes** (75 minutes if English is not your first language), pass mark **65% — that's 26 out of 40**. Every chapter is worth a known number of marks in the syllabus; spend your time in proportion to those marks, not to how interesting a topic is.

## Weight your time
Chapters 1 (Fundamentals) and 4 (Test Techniques) carry the most marks and the most K3 "apply" questions — give them the most revision. Chapters 3 (Static Testing) and 5 (Test Management) are mid-weight. Don't over-invest in the smallest chapters.

## A realistic 12-week shape
- **Weeks 1–8:** learn one chapter a week using active recall.
- **Weeks 9–10:** full mock exams under timed conditions.
- **Week 11:** re-drill your weakest topics from mock results.
- **Week 12:** light revision and taper — no cramming the night before.

## Plan for slippage
Life happens. Leave one empty "catch-up" slot each week so a missed evening doesn't derail the whole schedule.`,
      workedExample: `A tester with eight weeks and evenings only maps it out: Mon = learn new chapter, Wed = recall last chapter, Fri = 10 practice questions on older chapters, Sun = catch-up. Weeks 7–8 become back-to-back timed mocks. Because Sundays are deliberately empty, a missed Wednesday never snowballs.`,
      commonMistakes: `- No dated plan — just "I'll revise this week"
- Spending equal time on every chapter regardless of its mark weighting
- Leaving all the mock exams to the final two days`,
      realWorldTip: `Book your exam date first, then build the plan backwards from it. A booked, paid-for date is the deadline that makes a revision plan real.`,
      exercise: `Count the weeks between today and your target exam date. Sketch a plan that ends with at least two full timed mock exams.`,
      reflectionQuestion: `Why should revision time be weighted towards Chapters 1 and 4 rather than spread evenly?`,
      knowledgeCheck: `What is the pass mark for the ISTQB Foundation (CTFL) exam, as a fraction of the 40 questions? (Answer: 65% — 26 out of 40)`,
      completionChecklist: ['I have a dated revision plan ending on my exam date', 'My plan weights time towards high-mark chapters', 'My plan includes at least two timed mock exams and a taper'],
      enhancements: {
        industryStory: `Two colleagues booked the same exam. One built a six-week dated plan on a whiteboard with a mock exam each Sunday; the other "planned to revise when work calmed down". Work never calmed down. The first passed with 33/40; the second postponed twice and lost momentum. The plan was the difference, not the ability.`,
        visualAid: { type: 'timeline', title: 'A 12-week CTFL revision plan', steps: [{ label: 'Weeks 1–2', detail: 'Ch.1 Fundamentals + Ch.2 SDLC' }, { label: 'Weeks 3–4', detail: 'Ch.3 Static + Ch.4 Techniques (start)' }, { label: 'Weeks 5–6', detail: 'Ch.4 Techniques (finish) — highest weight' }, { label: 'Weeks 7–8', detail: 'Ch.5 Management + Ch.6 Tools' }, { label: 'Weeks 9–10', detail: 'full timed mock exams' }, { label: 'Week 11', detail: 're-drill weakest topics' }, { label: 'Week 12', detail: 'light revision + taper' }] },
        davidTip: `The taper in the final week is not laziness — it's strategy. Cramming the night before raises anxiety and lowers recall. Every strong candidate I've mentored walked in rested, not exhausted.`,
        miniChallenge: `Write out your own week-by-week plan on one page. Mark which weeks are "learn", which are "mock", and where your catch-up slots sit.`,
        modelAnswer: `## Example\nWeeks 1–4: learn Ch.1–4 (extra time on Ch.4). Weeks 5–6: learn Ch.5–6. Week 7: full mock + review. Week 8: second mock, re-drill weak topics, taper. Catch-up slot every Sunday.`,
        badGood: { label: 'a revision plan', bad: `"I'll revise for a few weeks before the exam, doing a bit of each chapter." No dates, no mocks, no weighting.`, good: `A dated 8-week plan on one page: chapters weighted by marks, two timed mocks in weeks 7–8, a catch-up slot each week, and a taper before exam day.` },
        resourcePreview: { name: 'CTFL Revision Planner Template', purpose: 'A fill-in weekly grid that maps chapters and mocks onto your dates.', whenToUse: 'Complete it the day you book your exam.', formats: ['PDF', 'XLSX'] },
      },
    },
    {
      lessonNumber: 3,
      title: 'Time Management in the Exam',
      estimatedTime: '13 minute read',
      lessonOverview: `40 questions in 60 minutes leaves roughly 90 seconds each — and some questions eat far more. This lesson gives you a pacing plan so you never run out of time with questions unanswered.`,
      learningObjectives: ['Calculate your per-question time budget', 'Pace yourself with checkpoints during the exam', 'Handle time-hungry calculation questions without stalling'],
      lessonNotes: `## The maths of the clock
**40 questions, 60 minutes** = **90 seconds per question** on average (75 minutes, or ~112 seconds each, if English is not your first language). Most K1/K2 recall questions take far less than 90 seconds; that banked time is what you spend on the K3 "apply" questions.

## Pace with checkpoints
Don't watch every question — watch milestones. By the **20-minute mark** you should be around question 13–14; by **40 minutes**, around question 27. If you're behind at a checkpoint, speed up on the easy ones.

## The two-pass strategy
1. **First pass:** answer every question you find easy, flag anything slow or uncertain, and move on. Never let one hard question burn five minutes.
2. **Second pass:** return to flagged questions with your remaining time and a calmer head.

## Answer everything
There is no negative marking. A blank answer scores zero; a guess has a one-in-four chance. In your final minute, make sure no question is left blank.`,
      workedExample: `A candidate hits a decision-table question at question 9 and spends four minutes on it. Instead of finishing it there, they take their best answer, flag it, and move on. By the 40-minute checkpoint they're on question 28 — on pace — with ten minutes spare to revisit the two flagged questions properly.`,
      commonMistakes: `- Spending five minutes on one hard question and running out of time
- Leaving questions blank when there's no negative marking
- Not knowing whether you're ahead or behind until it's too late`,
      realWorldTip: `Practise your mocks with a visible timer from day one. Pacing is a skill you build, not something that switches on automatically on exam day.`,
      exercise: `In your next mock, note your question number at 20 and 40 minutes. Are you ahead of or behind the 13-then-27 checkpoints?`,
      reflectionQuestion: `Roughly how many seconds do you have per question, and why is the average misleading for the hardest ones?`,
      knowledgeCheck: `With 40 questions in 60 minutes, roughly how long is the average time per question? (Answer: about 90 seconds)`,
      completionChecklist: ['I know my per-question time budget', 'I use checkpoints to stay on pace', 'I flag-and-move rather than stalling on hard questions'],
      enhancements: {
        industryStory: `A very capable tester failed by two marks — not from lack of knowledge but from time. He'd wrestled a single boundary-value question for six minutes early on, panicked when he saw the clock, and rushed the last eight questions. He knew that material cold. Pacing, not knowledge, cost him the pass.`,
        visualAid: { type: 'comparison', title: 'Pacing checkpoints (standard 60-minute exam)', headers: ['Time elapsed', 'Should be near Q', 'If behind'], rows: [['20 min', 'Q13–14', 'Speed up on easy Qs'], ['40 min', 'Q27', 'Flag slow ones, move on'], ['50 min', 'Q34+', 'Start second pass'], ['59 min', 'All answered', 'Fill every blank']] },
        davidTip: `The candidates who run out of time are almost never the ones who didn't know the material. They're the ones who let a single stubborn question steal five minutes. Discipline beats brilliance under the clock.`,
        miniChallenge: `Do a 40-question mock strictly to 60 minutes. Record where you were at the 20- and 40-minute marks and note any question that ate more than three minutes.`,
        modelAnswer: `## Example\nAt 20 min I was on Q11 (slightly behind), at 40 min on Q26 (back on pace). One BVA question took 4 minutes — I should have flagged it at 90 seconds and returned later.`,
        badGood: { label: 'handling a hard question', bad: `You refuse to move on until you've cracked question 9, burning five minutes and starting to panic about the clock.`, good: `You give question 9 your best answer within 90 seconds, flag it, move on, and revisit it calmly in your second pass.` },
        resourcePreview: { name: 'Exam Pacing Checkpoint Card', purpose: 'A pocket card of time-to-question checkpoints for both 60- and 75-minute sittings.', whenToUse: 'Memorise it before your first timed mock.', formats: ['PDF'] },
      },
    },
    {
      lessonNumber: 4,
      title: 'Exam Strategy',
      estimatedTime: '14 minute read',
      lessonOverview: `Knowing the material is half the battle; extracting marks from tricky questions is the other half. This lesson covers elimination, keyword spotting and the discipline that turns knowledge into a score above 26/40.`,
      learningObjectives: ['Eliminate wrong options to improve your odds', 'Spot the keywords that change what a question is asking', 'Apply a repeatable per-question process'],
      lessonNotes: `## Eliminate before you choose
Every question has one correct answer and three distractors. If you can rule out even two options as clearly wrong, a guess jumps from 25% to 50%. Cross out options that are false, out of scope, or contradict the syllabus definition — then choose between what's left.

## Read the whole question
Distractors are written to catch people who read only the first line. Read the full stem and all four options before deciding. The "obviously right" first option is often the trap.

## Keyword spotting
Certain words change everything:
- **NOT / EXCEPT** — you're looking for the odd one out; the three "correct-sounding" options are wrong here.
- **BEST / MOST** — several options may be true; you want the strongest, not merely a true one.
- **ALWAYS / NEVER** — usually a warning sign that an absolute statement is false.

## A per-question process
Read the stem → underline the keyword → read all four options → eliminate the clearly wrong → choose the best of the rest → answer (never leave blank).`,
      workedExample: `"Which of the following is NOT a test design technique?" Three options are real techniques (equivalence partitioning, boundary value analysis, decision tables); the fourth is "regression testing" — a test *type*, not a design technique. Miss the word "NOT" and you'd pick a real technique and score zero. Spot it, and the answer is obvious.`,
      commonMistakes: `- Missing the word NOT or EXCEPT and answering the opposite question
- Picking the first true-sounding option on a BEST/MOST question
- Choosing an option with ALWAYS or NEVER without questioning the absolute`,
      realWorldTip: `On every question, underline the keyword before you look at the options. That one habit prevents the most common — and most avoidable — exam mistakes.`,
      exercise: `Look back at any mock question you got wrong. Was there a keyword (NOT, BEST, MOST) you missed? Note how the keyword changed the answer.`,
      reflectionQuestion: `On a "which is BEST" question where two options are both technically true, how do you decide?`,
      knowledgeCheck: `When a question contains the word "NOT" (e.g. "which is NOT a test technique"), which option are you looking for? (Answer: the one that is false / does not belong)`,
      completionChecklist: ['I eliminate wrong options before choosing', 'I underline keywords like NOT, BEST and MOST', 'I read all four options before committing'],
      enhancements: {
        industryStory: `Reviewing a mock with a mentee, we found she'd lost five marks entirely to missed keywords — three "NOT" questions answered as if they said the opposite. Her testing knowledge was fine; her reading under pressure wasn't. We drilled keyword-underlining for a week and those five marks came straight back.`,
        visualAid: { type: 'comparison', title: 'Keyword spotting — what each word signals', headers: ['Keyword', 'What it means', 'Your move'], rows: [['NOT / EXCEPT', 'Find the odd one out', 'The 3 "true" options are wrong here'], ['BEST / MOST', 'Several may be true', 'Pick the strongest, not just a true one'], ['ALWAYS / NEVER', 'Absolute claim', 'Suspect it — absolutes are often false'], ['PRIMARY', 'Main purpose asked', 'Ignore secondary but true options']] },
        davidTip: `Treat every exam question like a defect report: read it precisely, don't assume, and check the wording against the facts. The same care that makes you a good tester makes you a good exam candidate.`,
        miniChallenge: `Take five mock questions and, before answering, underline the keyword in each stem. Notice how often it's a NOT, BEST or MOST.`,
        modelAnswer: `## Example\nStem: "Which is the BEST reason to prioritise a test?" Two options are valid reasons, but "highest risk to the business" is the strongest — so it's the BEST answer, even though a weaker true option is tempting.`,
        badGood: { label: 'answering a "NOT" question', bad: `You skim "Which is a test technique?" — miss the NOT — and confidently pick equivalence partitioning, scoring zero.`, good: `You underline NOT, realise you want the odd one out, and pick "regression testing" — the type, not the technique.` },
        resourcePreview: { name: 'Keyword & Elimination Strategy Sheet', purpose: 'A one-pager of exam keywords and a step-by-step elimination process.', whenToUse: 'Keep it beside you through every practice mock.', formats: ['PDF'] },
      },
    },
    {
      lessonNumber: 5,
      title: 'Memory Techniques & Mnemonics',
      estimatedTime: '13 minute read',
      lessonOverview: `Some CTFL content is pure recall — the seven principles, the seven review types, the fundamental test process. Mnemonics turn hard-to-remember lists into things you can retrieve instantly under pressure.`,
      learningObjectives: ['Use mnemonics to memorise CTFL lists', 'Distinguish what to memorise from what to understand', 'Build your own memory aids for stubborn topics'],
      lessonNotes: `## Memorise the lists, understand the rest
K1 "remember" questions test lists and definitions — memorise those. K2 "understand" and K3 "apply" questions test reasoning — you can't mnemonic your way through those, so understand them instead. Know which is which.

## Mnemonics for the classic lists
- **Fundamental test process (the activities):** Planning, Monitoring & control, Analysis, Design, Implementation, Execution, Completion. A first-letter phrase makes the order stick.
- **Seven testing principles:** turn each into a vivid one-word hook — "Absence", "Exhaustive", "Early", "Clustering", "Pesticide", "Context", "Absence-of-errors" — and rehearse the hooks.

## Make them personal and vivid
Memory loves the strange and the personal. A silly image or a phrase built from your own name sticks far better than a dry acronym someone handed you. Build your own — the act of building it *is* the memorising.

## Rehearse under recall
A mnemonic only helps if you can produce it from nothing. Drill it with the book shut, not by re-reading it — same active-recall rule as Lesson 1.`,
      workedExample: `To recall the seven principles in order, a candidate builds the sentence "Testing Elephants Can't Prove Perfect Absence" — Testing shows presence, Exhaustive is impossible, Early testing, Clustering, Pesticide paradox, testing is context-dependent, Absence-of-errors fallacy. Ridiculous, personal, and impossible to forget after two rehearsals.`,
      commonMistakes: `- Trying to memorise concepts that need understanding (K3 apply questions)
- Using someone else's mnemonic you don't find memorable
- Building a mnemonic but never rehearsing it from a blank page`,
      realWorldTip: `The best mnemonic is one you invented, because building it forced you to process the material. Don't collect other people's — make your own.`,
      exercise: `Pick one CTFL list you keep forgetting and invent a mnemonic for it. Say it out loud, then write it from memory an hour later.`,
      reflectionQuestion: `Why are mnemonics right for the seven principles but wrong for applying boundary value analysis?`,
      knowledgeCheck: `Are mnemonics best suited to K1 "remember" questions or K3 "apply" questions? (Answer: K1 remember questions — lists and definitions)`,
      completionChecklist: ['I can use mnemonics for the classic CTFL lists', 'I know which topics to memorise vs understand', 'I have built at least one mnemonic of my own'],
      enhancements: {
        industryStory: `A candidate who kept blanking on the seven principles under pressure built one daft sentence about elephants. In the real exam a principles question came up, she recalled the sentence in two seconds, and got a mark she'd have lost every previous mock. She still remembers it years later — that's how well a personal mnemonic sticks.`,
        visualAid: { type: 'comparison', title: 'Memorise vs understand', headers: ['K-level', 'Type of question', 'Best approach'], rows: [['K1', 'Remember lists & definitions', 'Mnemonics + flashcards'], ['K2', 'Understand & explain', 'Analogies + examples'], ['K3', 'Apply a technique', 'Practise problems (EP, BVA, decision tables)']] },
        davidTip: `Don't waste a mnemonic on something you should understand. If you truly grasp why boundary defects cluster at edges, you never need to memorise BVA — you can derive it. Save the memory tricks for the pure-recall lists.`,
        miniChallenge: `Build a first-letter mnemonic for the seven fundamental test activities (Planning, Monitoring & control, Analysis, Design, Implementation, Execution, Completion). Test it from memory tomorrow.`,
        modelAnswer: `## Example\n"Please Make A Delicious Ice-cream Every Christmas" → Planning, Monitoring & control, Analysis, Design, Implementation, Execution, Completion. Silly, ordered, and it sticks after one rehearsal.`,
        badGood: { label: 'using a mnemonic', bad: `You memorise a slick acronym for boundary value analysis and still can't answer a BVA calculation, because it needed applying, not reciting.`, good: `You reserve mnemonics for the seven principles and test process, and drill actual EP/BVA problems for the apply questions.` },
        resourcePreview: { name: 'CTFL Mnemonics Pack', purpose: 'Memory hooks for every list examiners love to test, with blanks to build your own.', whenToUse: 'Use it for the pure-recall chapters in your final fortnight.', formats: ['PDF'] },
      },
    },
    {
      lessonNumber: 6,
      title: 'Question Analysis',
      estimatedTime: '18 minute read',
      lessonOverview: `The apply (K3) questions are where exams are won or lost — especially the calculation questions on equivalence partitioning, boundary value analysis and decision tables. This lesson gives you a repeatable method to dissect any exam question and get the calculations right under pressure.`,
      learningObjectives: ['Dissect a question stem into what is actually being asked', 'Work calculation questions (EP, BVA, decision tables) methodically', 'Avoid the classic traps in apply-level questions'],
      lessonNotes: `## Read the stem like a spec
An exam question is a tiny specification. Identify: what is given (the inputs, ranges, rules), what is asked (a count? an identification? a best choice?), and the K-level. K3 questions ask you to *do* something — calculate partitions, find boundaries, complete a decision table.

## Calculation questions, step by step
- **Equivalence Partitioning (EP):** split the input range into valid and invalid partitions; one value from each partition is one test. Count the partitions the question defines — no more, no fewer.
- **Boundary Value Analysis (BVA):** for a range like 1–100, test the boundaries and their neighbours (0, 1, 100, 101 in two-value BVA). Know which convention the question uses.
- **Decision tables:** count conditions to get the number of rules (n conditions → 2ⁿ columns), then read the required action for the given combination.

## Show your working mentally
Don't do it all in your head. Jot the range, mark the boundaries, count. A ten-second sketch prevents the off-by-one error that turns a known answer into a wrong one.

## Then apply your strategy
Once you've worked it out, still use Lesson 4's process: check the keyword, eliminate wrong options, pick the best — and never leave it blank.`,
      workedExample: `Question: "A field accepts 18–65. Using two-value boundary value analysis, how many boundary values should be tested?" Sketch the range: boundaries are 18 and 65. Two-value BVA tests each boundary and its outer neighbour: 17, 18, 65, 66 — plus commonly the inner neighbours depending on convention. Read the stem to see which convention it wants, count carefully, and you avoid the classic off-by-one trap.`,
      commonMistakes: `- Doing calculations entirely in your head and making an off-by-one error
- Confusing equivalence partitioning (one value per partition) with BVA (values at edges)
- Miscounting decision-table rules (forgetting it's 2ⁿ for n conditions)`,
      realWorldTip: `For any calculation question, spend the first ten seconds writing down the range and marking the boundaries. That tiny sketch is the difference between a known answer and a careless miss.`,
      exercise: `Take one EP, one BVA and one decision-table question from a mock. For each, write down the given inputs, what's asked, and your working before choosing an option.`,
      reflectionQuestion: `For a decision table with three conditions, how many rules (columns) are there, and why?`,
      knowledgeCheck: `In a decision table with 3 conditions, how many rules (columns) are there? (Answer: 2³ = 8)`,
      completionChecklist: ['I can dissect a stem into given / asked / K-level', 'I can work EP, BVA and decision-table questions methodically', 'I sketch my working before choosing an option'],
      enhancements: {
        industryStory: `In a mock review, a strong tester had missed three calculation questions — all off-by-one errors from doing BVA in his head at speed. We introduced a rule: sketch the range and mark the boundaries on the scrap paper before answering. In his next mock he got all the calculation questions right. The knowledge was always there; the method unlocked it.`,
        visualAid: { type: 'comparison', title: 'The three calculation techniques at a glance', headers: ['Technique', 'What you count', 'Classic trap'], rows: [['Equivalence Partitioning', 'One value per valid/invalid partition', 'Testing extra values per partition'], ['Boundary Value Analysis', 'Values at and around each boundary', 'Off-by-one / wrong convention'], ['Decision Tables', '2ⁿ rules for n conditions', 'Miscounting the number of rules']] },
        davidTip: `The apply questions separate a pass from a fail. Two candidates can know every definition, but the one who calmly sketches a boundary range and counts is the one who clears 26/40. Method under pressure is a skill — build it in your mocks, not on exam day.`,
        miniChallenge: `Work this in writing: "A discount applies for orders of £50–£200. Using boundary value analysis, list the boundary values you'd test." Show your sketch, then your answer.`,
        modelAnswer: `## Example\nRange £50–£200. Boundaries: 50 and 200. Two-value BVA tests each boundary and its outer neighbour: £49, £50, £200, £201 (add £51 and £199 if the convention includes inner neighbours). Sketching the range first makes the count obvious and the off-by-one error disappears.`,
        badGood: { label: 'a BVA calculation question', bad: `You read "range 1–10", picture it vaguely, and answer "10 values" in your head — an off-by-one guess.`, good: `You jot "1—10", mark boundaries 1 and 10, list 0,1,10,11, count deliberately, and match the count to the convention the stem specifies.` },
        managersReview: { intro: `If I sat down to review your exam-readiness as your manager before you book the test, here's what I'd assess:`, strengths: ['You self-test with active recall, not re-reading', 'You have a dated revision plan with timed mocks', 'You pace with checkpoints and flag-and-move', 'You spot keywords and eliminate wrong options', 'You sketch working on calculation questions'], improvements: ['Do at least three full timed mocks before booking', 'Drill your two weakest chapters to consistency', 'Rehearse your mnemonics from a blank page', 'Time-box every calculation question in practice'], gaps: ['Never sitting a full 40-question mock under the clock', 'Ignoring the K3 calculation questions in favour of easier recall', 'No plan for questions left blank in the final minute'] },
        portfolioBuilder: `Assemble an "Exam Readiness" one-pager for your portfolio: your dated revision plan, your best three mock scores (aim consistently above 26/40), your personal mnemonics, and a note of the two topics you drilled hardest. It shows employers you approach certification the way you'd approach a test project — planned, measured and evidence-based.`,
        resourcePreview: { name: 'CTFL Mock Exam & Question-Analysis Pack', purpose: 'Full 40-question timed mocks plus worked solutions for every EP, BVA and decision-table question.', whenToUse: 'Sit them under exam conditions in the final three weeks and review every wrong answer.', formats: ['PDF'] },
      },
    },
  ],
};
