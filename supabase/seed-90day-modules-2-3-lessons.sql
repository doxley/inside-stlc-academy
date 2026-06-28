-- ============================================================
-- 90-Day Roadmap — first-draft lessons for Module 2 (Test Design
-- Techniques) and Module 3 (Defect Management).
-- Draft content for review/refinement inside the platform.
-- Run AFTER lessons-schema.sql. Safe to re-run.
-- ============================================================

-- ─────────────── MODULE 2: TEST DESIGN TECHNIQUES ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Why Test Design Matters', '12 minute read',
  $$Test design is how you turn "test the feature" into a focused set of tests that find real problems without wasting time. This lesson sets up the techniques you'll use for the rest of the module.$$,
  array['Explain why structured test design beats ad-hoc testing','Describe coverage vs effort trade-offs','Name the techniques covered in this module'],
  $$## The problem with ad-hoc testing
Testing everything is impossible. Test design techniques help you choose a small, high-value set of tests that cover the important risks.

## What good test design gives you
- Better coverage with fewer tests
- Tests you can explain and justify
- Repeatable, reviewable thinking — not guesswork

## Techniques in this module
- Equivalence Partitioning
- Boundary Value Analysis
- Decision Tables
- State Transition Testing
- Plus how to turn them into clear test cases$$,
  $$A field accepts ages 18–65. Ad-hoc testing might try 25, 30, 40. Structured design tests one value per range plus the edges (17, 18, 65, 66) — far fewer tests, far better at finding bugs.$$,
  $$- Writing dozens of near-identical tests that all exercise the same logic
- Choosing inputs at random with no rationale
- Confusing "many tests" with "good coverage"$$,
  $$Interviewers love "how would you test this field?". Naming a technique (EP, BVA) instantly signals you think like a professional, not a button-masher.$$,
  $$Take a simple input (e.g. a quantity field 1–10). Without formal technique yet, list every test you'd run, then count how many are truly different.$$,
  $$Why is "test everything" an impossible goal, and what should we aim for instead?$$,
  $$True or false: more test cases always means better coverage. (Answer: False)$$,
  array['I can explain why structured test design matters','I can name the four techniques in this module']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 2
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Equivalence Partitioning', '15 minute read',
  $$Equivalence Partitioning (EP) groups inputs that should be treated the same way, so you test one value per group instead of all of them.$$,
  array['Define equivalence partitioning','Identify valid and invalid partitions','Select representative test values'],
  $$## The idea
Divide inputs into partitions where every value is expected to behave the same. Test one value from each partition.

## Valid and invalid partitions
- Valid partitions: inputs the system should accept
- Invalid partitions: inputs it should reject

## Steps
- Identify the input and its rules
- Split into valid and invalid groups
- Pick one representative value per group$$,
  $$Age field accepts 18–65.
- Invalid (too low): any value < 18 → test 10
- Valid: 18–65 → test 30
- Invalid (too high): > 65 → test 80
Three tests cover three behaviours.$$,
  $$- Only testing valid partitions and ignoring invalid ones
- Treating one partition as several tests
- Forgetting non-numeric or empty inputs as their own partition$$,
  $$EP and Boundary Value Analysis are almost always used together — EP picks the groups, BVA picks the edges. Mention both in interviews.$$,
  $$A password field requires 8–20 characters. List the partitions (valid and invalid) and one representative value for each.$$,
  $$How does equivalence partitioning reduce the number of tests without losing coverage?$$,
  $$For a field accepting 1–100, which set best reflects EP? A) 1,2,3,4 B) -5, 50, 150 C) 50, 51, 52. (Answer: B)$$,
  array['I can split an input into valid/invalid partitions','I can pick a representative value per partition']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 2
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Boundary Value Analysis', '15 minute read',
  $$Most defects hide at the edges of ranges. Boundary Value Analysis (BVA) targets those edges deliberately.$$,
  array['Explain why boundaries are defect-prone','Identify boundary values for a range','Combine BVA with equivalence partitioning'],
  $$## Why boundaries
Off-by-one errors, wrong comparison operators (< vs <=), and rounding bugs cluster at the edges of valid ranges.

## What to test
For a range min–max, test:
- min - 1, min, min + 1
- max - 1, max, max + 1

## Pair it with EP
EP finds the ranges; BVA tests the edges of each range.$$,
  $$Discount applies for orders of 50–100 items.
Test: 49 (no discount), 50 (discount), 51, 99, 100 (discount), 101 (no discount). The 49/50 and 100/101 pairs catch the common "should it be <= or <?" bug.$$,
  $$- Testing only the boundary value but not the values just outside it
- Ignoring the lower boundary and only checking the upper
- Forgetting boundaries on lengths, dates, and quantities — not just numbers$$,
  $$When you find one off-by-one bug, immediately check the matching boundary elsewhere — the same mistake is usually copied across the codebase.$$,
  $$For a username length of 5–15 characters, write the exact boundary values you would test.$$,
  $$Why are the values just outside a boundary as important to test as the boundary itself?$$,
  $$For a range 1–10, the key BVA values include: A) 5 only B) 0,1,2 and 9,10,11 C) 3,6,9. (Answer: B)$$,
  array['I can list boundary values for any range','I understand why off-by-one bugs cluster at edges']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 2
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Decision Table Testing', '15 minute read',
  $$Decision tables make complex business rules testable by mapping every combination of conditions to its expected outcome.$$,
  array['Build a decision table from rules','Identify combinations that need testing','Spot missing or contradictory rules'],
  $$## When to use
Use decision tables when an outcome depends on several conditions combined (e.g. eligibility, pricing, permissions).

## How to build one
- List the conditions (inputs)
- List the actions (outcomes)
- Create a column for each meaningful combination
- Fill in the expected action per combination

## Bonus
Building the table often reveals rules nobody specified.$$,
  $$Free shipping if (order > £50) AND (member = yes).
| Order > £50 | Member | Free shipping |
| Y | Y | Yes |
| Y | N | No |
| N | Y | No |
| N | N | No |
Four clear test cases, no guesswork.$$,
  $$- Testing only the "happy" combination
- Missing combinations, leaving rules untested
- Not using the table to question ambiguous requirements$$,
  $$Decision tables are a brilliant requirements-review tool: half the value is the questions they force the business to answer.$$,
  $$Write a decision table for: "Apply a 10% discount if the customer is a member OR the order is over £100."$$,
  $$How can building a decision table improve the requirements, not just the tests?$$,
  $$A decision table is most useful when: A) one simple input B) outcomes depend on combined conditions C) testing performance. (Answer: B)$$,
  array['I can build a decision table from business rules','I can use it to find missing rules']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 2
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'State Transition Testing', '15 minute read',
  $$Many systems behave differently depending on their current state. State transition testing checks the moves between states and the rules that govern them.$$,
  array['Describe states, events and transitions','Draw a simple state diagram','Identify invalid transitions to test'],
  $$## Core ideas
- State: the condition the system is in (e.g. Logged out, Logged in, Locked)
- Event: something that triggers a change (e.g. enter wrong password)
- Transition: the move from one state to another

## What to test
- Valid transitions (do they work?)
- Invalid transitions (are they blocked?)
- Guards/conditions (e.g. lock after 3 failed attempts)$$,
  $$Login lockout: Logged out → (3 wrong passwords) → Locked → (wait / reset) → Logged out. Test each transition, and confirm a 4th attempt while Locked is rejected.$$,
  $$- Only testing the "forward" path and never the invalid moves
- Ignoring guard conditions (counts, timers)
- Forgetting what should NOT be possible from a given state$$,
  $$Account lockout, order status, and payment flows are classic state-machine interview questions — practise drawing them quickly.$$,
  $$Draw the states and transitions for an order: Placed → Paid → Shipped → Delivered (and Cancelled). List one invalid transition to test.$$,
  $$Why is testing invalid transitions just as important as valid ones?$$,
  $$In state transition testing, an "event": A) is the system condition B) triggers a change of state C) is the final output. (Answer: B)$$,
  array['I can identify states, events and transitions','I can list invalid transitions worth testing']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 2
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 6, 'Writing Effective Test Cases', '15 minute read',
  $$A great test case is clear enough that anyone can run it and get the same result. This lesson turns your design techniques into well-written test cases.$$,
  array['Structure a clear test case','Write precise steps and expected results','Keep test cases maintainable'],
  $$## Anatomy of a test case
- ID and title (what it checks)
- Preconditions (state/data needed)
- Steps (numbered, unambiguous)
- Test data (specific values)
- Expected result (what should happen)

## Qualities of good test cases
- Independent (don't rely on another test's outcome)
- Specific (exact data and expected result)
- Maintainable (easy to update when the app changes)$$,
  $$Title: Login fails with incorrect password.
Preconditions: Registered user exists.
Steps: 1) Go to /login 2) Enter valid email 3) Enter wrong password 4) Click Log in.
Expected: Error "Incorrect email or password"; user stays logged out.$$,
  $$- Vague expected results ("it works")
- Steps that assume knowledge ("log in as usual")
- One giant test that checks ten things at once$$,
  $$Your test cases are a portfolio artefact. Clear, professional test cases shared in an interview say more than any certificate.$$,
  $$Write a full test case (title, preconditions, steps, data, expected) for "user resets their password".$$,
  $$What makes a test case easy for a new team member to run correctly?$$,
  $$A strong expected result is: A) "should work" B) "Error message 'Incorrect password' is shown and login is blocked" C) "no errors". (Answer: B)$$,
  array['I can write a clear, runnable test case','My expected results are specific and verifiable']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 2
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 7, 'Assignment & Knowledge Check', '45 minutes',
  $$Apply every technique from this module to one feature and produce a portfolio-ready test design.$$,
  array['Apply EP, BVA, decision tables and test-case writing together'],
  $$Bring the module together: choose a feature and design tests for it using the right techniques. Keep your output — it's a strong portfolio piece.$$,
  $$## Assignment: Design tests for a registration form
The form has: email (required, valid format), password (8–20 chars), age (18+), and a "subscribe to newsletter" checkbox.
1. Apply equivalence partitioning to email, password and age.
2. Apply boundary value analysis to password length and age.
3. Build a small decision table for "account can be created" based on valid email AND valid password AND age >= 18.
4. Write three full test cases (title, preconditions, steps, data, expected).
Submit your document for review or save it to your portfolio.$$,
  $$Which technique gave you the most confidence in your coverage, and why?$$,
  $$## Module 2 Knowledge Check
1. When would you choose a decision table over boundary value analysis?
2. Give the boundary values for a range of 1–30.
3. What are the five parts of a well-written test case?$$,
  array['I designed tests using EP, BVA and a decision table','I wrote three clear test cases','I saved the output to my portfolio']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 2
on conflict (module_id, lesson_number) do nothing;

-- ─────────────── MODULE 3: DEFECT MANAGEMENT ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'The Defect Lifecycle', '12 minute read',
  $$A defect moves through clear states from discovery to closure. Knowing the lifecycle helps you communicate status and avoid confusion.$$,
  array['Describe the stages of the defect lifecycle','Explain who owns a defect at each stage','Use consistent status language'],
  $$## Typical states
- New: just reported
- Assigned: a developer owns it
- Open / In Progress: being fixed
- Fixed: developer believes it's resolved
- Retest: tester verifies the fix
- Closed: verified fixed
- Reopened: fix didn't work
- Rejected / Won't Fix / Duplicate: not actioned (with a reason)

## Why it matters
Everyone needs a shared language for "where is this bug?" — vague status causes rework and missed fixes.$$,
  $$A tester logs a bug (New). The lead assigns it (Assigned). The dev fixes it (Fixed). The tester retests — it still fails — and reopens it (Reopened), not "closes with a comment".$$,
  $$- Closing a defect before retesting the fix
- Marking duplicates as new, inflating the backlog
- Reopening without saying what still fails$$,
  $$"Walk me through your defect lifecycle" is a near-guaranteed interview question. Be able to say the states in order, confidently.$$,
  $$Write out the defect lifecycle states in order and note who owns the defect at each stage.$$,
  $$Why is a shared, consistent status vocabulary important across a team?$$,
  $$After a developer marks a bug "Fixed", what is the tester's next action? (Answer: Retest/verify before closing)$$,
  array['I can list the defect lifecycle states in order','I know who owns a defect at each stage']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 3
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Writing High-Quality Bug Reports', '15 minute read',
  $$A great bug report gets fixed fast because the developer can reproduce it without asking you questions. This is one of the highest-value skills a tester has.$$,
  array['Structure a clear, reproducible bug report','Write precise reproduction steps','Include the right evidence'],
  $$## What every bug report needs
- Title: concise summary (what + where)
- Environment: browser/device/build/URL
- Preconditions: required state/data
- Steps to reproduce: numbered, exact
- Expected result
- Actual result
- Evidence: screenshot, video, logs
- Severity and priority

## The golden rule
If a developer can't reproduce it from your report alone, it's not finished.$$,
  $$Title: "Checkout — Apply Coupon button does nothing on mobile (build 1.4.2)".
Steps: 1) Add item 2) Go to cart on iPhone Safari 3) Enter SAVE10 4) Tap Apply.
Expected: 10% discount applied. Actual: nothing happens; no error. Evidence: screen recording attached.$$,
  $$- Titles like "it's broken" or "checkout bug"
- Missing environment or build number
- No expected vs actual; leaving the dev to guess intent$$,
  $$Keep a personal bug-report template. Consistent, complete reports build your reputation faster than the number of bugs you find.$$,
  $$Find a real issue in any app and write a complete bug report using the structure above.$$,
  $$Why does separating "expected" from "actual" result matter so much to a developer?$$,
  $$Which is the best bug title? A) "Broken" B) "Error" C) "Search returns no results for valid product name (build 2.1)". (Answer: C)$$,
  array['My bug report can be reproduced from the steps alone','I included environment, expected, actual and evidence']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 3
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Severity vs Priority', '12 minute read',
  $$Severity and priority are different things, and confusing them causes the wrong bugs to be fixed first. This lesson makes the distinction crystal clear.$$,
  array['Define severity and priority','Explain how they can differ','Assign both to a defect with justification'],
  $$## Definitions
- Severity: how bad the impact is technically (does it crash, lose data?)
- Priority: how soon the business wants it fixed

## They are independent
- High severity / low priority: rare crash on an unused admin screen
- Low severity / high priority: company logo misspelled on the homepage

## Why it matters
Developers fix by priority; testers describe severity. Both are needed.$$,
  $$A typo in the marketing headline is low severity (nothing breaks) but high priority (it's customer-facing and embarrassing) — so it's fixed today.$$,
  $$- Treating severity and priority as the same field
- Marking everything "critical"
- Setting priority without business input$$,
  $$When asked "what's the difference between severity and priority?", give a one-line example of each mismatch — it instantly shows real understanding.$$,
  $$For three different bugs, assign a severity and a priority and justify each in one sentence.$$,
  $$Can a defect be low severity but high priority? Give an example.$$,
  $$A homepage logo typo is best described as: A) high severity B) low severity, high priority C) low priority. (Answer: B)$$,
  array['I can define severity and priority separately','I can justify both for a given defect']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 3
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Reproducing and Isolating Defects', '15 minute read',
  $$Before reporting, a strong tester narrows a bug down to the smallest reliable set of steps. This makes fixes faster and reports credible.$$,
  array['Reproduce a defect reliably','Isolate the conditions that trigger it','Distinguish consistent from intermittent bugs'],
  $$## Reproduce first
Confirm you can make it happen again. A bug you can't reproduce is hard to fix and easy to dismiss.

## Isolate the trigger
- Remove unnecessary steps
- Change one variable at a time (browser, data, account, network)
- Note what does and does not trigger it

## Intermittent bugs
If it's not consistent, capture frequency, timing, environment and logs — patterns matter.$$,
  $$"Payment fails" becomes "Payment fails only with Amex cards on the mobile site when the billing postcode has a space" — now the developer knows exactly where to look.$$,
  $$- Reporting before confirming you can reproduce it
- Leaving in irrelevant steps that mislead the developer
- Calling a bug "random" without capturing any pattern$$,
  $$The phrase "I isolated it to…" in a bug report or interview signals senior-level testing instinct.$$,
  $$Take a bug (real or hypothetical) and reduce it to the minimum steps and conditions that still trigger it.$$,
  $$Why does isolating a defect to one variable make it cheaper to fix?$$,
  $$What should you do before logging a defect? (Answer: Confirm you can reproduce it reliably)$$,
  array['I can reproduce a defect reliably','I can isolate the triggering conditions']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 3
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Defect Triage and Tracking', '12 minute read',
  $$Triage is how a team decides which defects to fix, when, and by whom. Testers play a key role by providing clear information.$$,
  array['Explain the purpose of a triage meeting','Describe how defects are tracked','Communicate defect status to stakeholders'],
  $$## What triage is
A regular review where the team looks at open defects and decides priority, ownership and timing.

## The tester's role
- Present clear, complete reports
- Explain impact and risk
- Challenge "won't fix" decisions when the risk is real

## Tracking
- Use a tool (e.g. Jira) consistently
- Keep status current
- Report trends: open vs closed, ageing, by severity$$,
  $$In triage, a tester shows that a "minor" bug actually blocks 15% of mobile checkouts. With that data, the team re-prioritises it to be fixed this sprint.$$,
  $$- Going to triage without the impact/data to argue priority
- Letting defect status go stale
- Reporting raw counts with no trend or context$$,
  $$Bring numbers to triage. "This affects ~1 in 6 mobile users" beats "I think it's important" every time.$$,
  $$Draft how you'd present one defect in triage: impact, who's affected, severity, priority, and your recommendation.$$,
  $$How can a tester influence which defects get fixed first?$$,
  $$The main purpose of triage is to: A) write bugs B) decide what to fix, when and by whom C) close bugs automatically. (Answer: B)$$,
  array['I understand the purpose of triage','I can present a defect with impact and a recommendation']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 3
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 6, 'Assignment & Knowledge Check', '45 minutes',
  $$Produce a professional defect report and a short triage summary — both portfolio-ready.$$,
  array['Apply the full defect-management workflow end to end'],
  $$Bring the module together by finding, documenting, and triaging a real defect.$$,
  $$## Assignment: Defect pack
1. Find a real issue in any website or app.
2. Write a complete bug report (title, environment, preconditions, steps, expected, actual, evidence, severity, priority).
3. Reduce it to the minimum reproduction steps.
4. Write a 3–4 sentence triage summary: who's affected, impact, and your recommended priority with justification.
Submit the document for review or save it to your portfolio.$$,
  $$Looking at your report, what single detail would help a developer fix it fastest?$$,
  $$## Module 3 Knowledge Check
1. List the defect lifecycle states in order.
2. Give an example of low severity but high priority.
3. What must be true before you log a defect?$$,
  array['I wrote a complete, reproducible bug report','I assigned and justified severity and priority','I saved the defect pack to my portfolio']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 3
on conflict (module_id, lesson_number) do nothing;
