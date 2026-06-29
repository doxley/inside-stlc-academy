-- ============================================================
-- Practical Test Automation with Playwright — first-draft lessons for
-- Module 10 (AI Assisted Automation), Module 11 (Framework Maintenance)
-- and Module 12 (Portfolio Project). Run AFTER seed-playwright-modules.sql.
-- Idempotent.
-- ============================================================

-- ─────────────── MODULE 10: AI ASSISTED AUTOMATION ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Using AI as a Pair Programmer', '12 minute read',
  $$AI tools like Claude and ChatGPT can dramatically speed up automation work — when you treat them as a pair programmer you review, not an oracle. This lesson sets the frame.$$,
  array['Use AI as a drafting partner','Keep ownership of the code','Set safe boundaries'],
  $$## Where AI helps in automation
- Drafting tests, page objects and helpers
- Explaining errors and unfamiliar code
- Suggesting refactors and edge cases

## The boundary
You review, run and own everything AI produces. It drafts; you decide.$$,
  $$Asked to add tests for a new form, you have AI draft the spec in seconds, then you review locators, add boundary cases it missed, and run it before committing.$$,
  $$- Committing AI code without running it
- Trusting AI locators without checking the app
- Pasting secrets or proprietary code into public tools$$,
  $$AI accelerates the typing, not the thinking. The engineering judgement — coverage, risk, correctness — stays yours, and that is what employers value.$$,
  $$List three automation tasks you would use AI for, and one you would not trust it to decide.$$,
  $$What is the right mental model for using AI in automation?$$,
  $$AI in automation is best treated as: A) an oracle to trust B) a pair programmer you review C) a replacement for testing skill. (Answer: B)$$,
  array['I use AI as a drafting partner','I keep ownership of the code']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 10
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Prompt Engineering for Automation', '13 minute read',
  $$Good prompts get good code. This lesson covers writing prompts that produce useful Playwright output.$$,
  array['Write effective automation prompts','Give context and constraints','Iterate on output'],
  $$## A strong prompt
- Role: "Act as a senior automation engineer"
- Context: the framework, language, patterns you use
- Task: exactly what to produce
- Constraints: "use getByRole, web-first assertions, no waitForTimeout"

## Iterate
Refine with follow-ups: "add boundary cases", "make this a page object".$$,
  $$"Act as a senior automation engineer. Write a Playwright test in TypeScript for the login flow using getByRole/getByLabel and web-first assertions. Do not use waitForTimeout." returns code that already matches your standards.$$,
  $$- Vague one-line prompts with no context
- No constraints, so you get brittle locators and sleeps
- Accepting the first answer without iterating$$,
  $$Bake your standards into the prompt (locators, assertions, no sleeps). It is far faster to constrain up front than to fix brittle code afterwards.$$,
  $$Write a prompt that would generate a Playwright test matching this course's standards, then refine it once.$$,
  $$Why include explicit constraints in an automation prompt?$$,
  $$A strong automation prompt includes: A) just the task B) role, context, task and constraints C) only the framework name. (Answer: B)$$,
  array['I can write effective prompts','I give context and constraints']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 10
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Generating Tests & Page Objects', '12 minute read',
  $$AI can scaffold tests and page objects fast. This lesson covers generating them well and reviewing the output.$$,
  array['Generate tests and page objects with AI','Review generated code','Fit it to your framework'],
  $$## How to use it
- Give AI a feature description or HTML and ask for a test or page object
- Specify your patterns (POM, fixtures, locator style)
- Review: locators robust? assertions web-first? one behaviour per test?

## Always review
Generated code is a draft. Run it and fit it to your framework before committing.$$,
  $$You paste a page's HTML and ask for a page object; AI drafts it, you swap a brittle CSS locator for getByRole and the page object is ready.$$,
  $$- Committing generated code unread
- Keeping brittle locators it suggests
- Letting structure drift from your framework conventions$$,
  $$Generated code that does not match your conventions creates inconsistency debt. Always conform it to your patterns before it lands.$$,
  $$Generate a page object for a simple page with AI, then review and fix at least one issue.$$,
  $$Why must AI-generated tests be reviewed before committing?$$,
  $$AI-generated automation code should be: A) committed as-is B) reviewed, run and conformed to your patterns C) trusted blindly. (Answer: B)$$,
  array['I can generate tests and page objects','I review generated code']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 10
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Debugging & Refactoring with AI', '12 minute read',
  $$AI is excellent at explaining errors and suggesting refactors. This lesson covers using it to debug and improve code.$$,
  array['Use AI to explain errors','Get refactor suggestions','Verify before applying'],
  $$## Debugging
- Paste an error and the relevant code; ask what it means and how to fix it
- Combine with the trace viewer for the real cause

## Refactoring
- Ask AI to make a test more reliable or a page object cleaner
- Verify the behaviour is unchanged after applying$$,
  $$You paste a flaky test and ask AI to remove timing issues; it suggests replacing a waitForTimeout with a web-first assertion, which you verify fixes the flakiness.$$,
  $$- Applying refactors without re-running tests
- Trusting an explanation without checking the trace
- Letting AI change behaviour while "refactoring"$$,
  $$Pair AI with the trace viewer: the trace shows what happened, AI helps explain why. Together they cut debugging time dramatically — but you confirm the fix.$$,
  $$Take a failing or flaky test, ask AI to explain and fix it, verify with the trace, and confirm the fix.$$,
  $$How do AI and the trace viewer complement each other when debugging?$$,
  $$After an AI-suggested refactor you should: A) commit immediately B) re-run tests to confirm behaviour is unchanged C) delete the tests. (Answer: B)$$,
  array['I can use AI to debug','I verify before applying changes']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 10
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'AI Code Reviews', '11 minute read',
  $$AI can act as a first-pass reviewer of your automation code. This lesson covers using it to raise quality.$$,
  array['Use AI for a first-pass review','Act on useful suggestions','Keep human judgement final'],
  $$## How to use it
- Ask AI to review a test or page object for reliability, readability and brittleness
- Treat suggestions as input, not orders
- Apply what genuinely improves the code

## Still human-owned
AI review supplements, not replaces, team review and your judgement.$$,
  $$You ask AI to review a page object; it flags a duplicated locator and a fragile selector, both of which you fix before opening the pull request.$$,
  $$- Treating every AI suggestion as mandatory
- Skipping human review because "AI checked it"
- Ignoring AI feedback that is actually right$$,
  $$Run your code past AI before the PR for a quick quality pass — it often catches duplication and brittleness early, so reviewers focus on the substance.$$,
  $$Ask AI to review one of your tests; apply one suggestion and explain why you rejected another.$$,
  $$What is the right status of AI code-review suggestions?$$,
  $$AI code review should be: A) the final word B) a first-pass input you judge C) a replacement for running tests. (Answer: B)$$,
  array['I can use AI for a first-pass review','I keep human judgement final']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 10
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 6, 'Risks & Best Practice', '12 minute read',
  $$Using AI well means using it responsibly. This lesson covers the risks and the practices that keep you professional.$$,
  array['Recognise AI risks','Protect data and IP','Apply responsible-AI practice'],
  $$## Risks
- Data exposure (secrets, proprietary code, customer data)
- Hallucinated APIs, fields or behaviour
- Over-reliance eroding your own skill

## Best practice
- Never paste sensitive data or proprietary code into public tools
- Verify every specific against the real app/docs
- You review, run and own the result$$,
  $$Before pasting code for help, you strip credentials and any proprietary detail, and you verify a function AI references actually exists before building a test around it.$$,
  $$- Pasting secrets or company code into public tools
- Building tests around hallucinated behaviour
- Letting AI dependence dull your fundamentals$$,
  $$Being able to articulate responsible AI use — data, verification, accountability — is now a genuine interview differentiator. Practise saying it.$$,
  $$Write your three personal rules for responsible AI use in automation.$$,
  $$What is the most important data rule when using public AI tools?$$,
  $$Responsible AI use means: A) paste anything for speed B) never expose secrets/IP and always verify output C) trust AI over the docs. (Answer: B)$$,
  array['I recognise AI risks','I apply responsible-AI practice']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 10
on conflict (module_id, lesson_number) do nothing;

-- ─────────────── MODULE 11: FRAMEWORK MAINTENANCE ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Diagnosing Flaky Tests', '13 minute read',
  $$Flaky tests destroy trust in a suite. This lesson gives you a systematic way to find and fix the real cause.$$,
  array['Diagnose flaky tests systematically','Find the root cause','Fix without masking'],
  $$## Diagnosis checklist
- Any waitForTimeout or manual sleep? Replace with assertions
- Awaiting every action and assertion?
- Depends on data from another test, or on order?
- Locators stable (role/label) or brittle?
- Animations or async loads interfering?
- Passes alone but fails in parallel? (shared state)

## Reproduce it
Run with --repeat-each to expose flakiness on demand, then open the trace.$$,
  $$A test fails ~1 in 5 runs; --repeat-each=10 reproduces it, the trace shows a click before the element is ready, and replacing a sleep with toBeEnabled() fixes it for good.$$,
  $$- Increasing retries to hide flakiness
- Adding sleeps until it "stops failing"
- Ignoring shared-state coupling$$,
  $$Run a suspect test with --repeat-each=10 to make flakiness reproducible. A test you cannot make fail reliably is one you cannot prove you have fixed.$$,
  $$Take a suspect test, run it with --repeat-each, and use the checklist plus trace to find and fix the cause.$$,
  $$Why is increasing retries a poor fix for flakiness?$$,
  $$The right first step to diagnose a flaky test is: A) add retries B) reproduce it with --repeat-each and open the trace C) delete it. (Answer: B)$$,
  array['I can diagnose flaky tests','I fix the root cause']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 11
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Reducing Technical Debt', '11 minute read',
  $$Test code is real code and accrues debt. This lesson covers spotting and reducing it.$$,
  array['Spot test technical debt','Prioritise what to fix','Keep the suite healthy'],
  $$## Signs of debt
- Duplicated locators and steps
- Brittle selectors and hard waits
- Dead tests and unused helpers
- Giant page objects and spec files

## Approach
Fix highest-impact debt first (the flaky, the duplicated, the slow). Refactor little and often.$$,
  $$Noticing the same login code in ten specs, you extract a fixture and delete the duplication — the suite shrinks and future changes happen in one place.$$,
  $$- Letting debt pile up until the suite is unworkable
- Big-bang rewrites instead of steady refactoring
- Fixing cosmetic issues while flakiness remains$$,
  $$Tackle debt that costs you trust or time first — flaky and duplicated code. Cosmetic tidy-ups can wait; reliability cannot.$$,
  $$Identify two pieces of technical debt in a suite and say which you would fix first and why.$$,
  $$Which technical debt should usually be fixed first?$$,
  $$Test technical debt is best reduced by: A) one big rewrite B) steady, prioritised refactoring C) ignoring it. (Answer: B)$$,
  array['I can spot test debt','I prioritise what to fix']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 11
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Code Reviews for Automation', '11 minute read',
  $$Reviewing automation well keeps the suite healthy and signals senior thinking. This lesson covers how to review (or self-review) test code.$$,
  array['Review automation pull requests','Give constructive feedback','Apply a quality bar'],
  $$## Review checklist
- One clear behaviour per test, descriptive name
- Robust locators (role/label), web-first assertions, no sleeps
- Data created and cleaned up; tests independent
- Shared setup via fixtures, not duplication
- Reads clearly and will run reliably in CI$$,
  $$A review comment: "this uses waitForTimeout(2000) before the assertion — can we switch to expect(locator).toBeVisible()? Faster and removes a likely flake."$$,
  $$- Approving without reading or running
- Nitpicking style while missing flakiness
- Vague comments the author cannot act on$$,
  $$Even as a junior, leaving clear, constructive review comments quickly gets you noticed. Reviewing automation thoughtfully is a senior skill you can show early.$$,
  $$Review a test against the checklist and write two specific, constructive comments.$$,
  $$What should an automation review prioritise above style?$$,
  $$A good automation review focuses on: A) only formatting B) reliability and readability C) the number of tests. (Answer: B)$$,
  array['I can review automation PRs','I give constructive feedback']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 11
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Refactoring Safely', '11 minute read',
  $$Refactoring keeps a framework healthy — but only if behaviour stays unchanged. This lesson covers refactoring test code safely.$$,
  array['Refactor without changing behaviour','Work in small steps','Lean on the suite itself'],
  $$## Safe refactoring
- Make small, behaviour-preserving changes
- Run the affected tests after each step
- Use the suite as its own safety net
- Commit each working step

## Common refactors
Extract a fixture, consolidate duplicate locators, split a giant page object.$$,
  $$You extract a shared login fixture in one commit, run the suite to confirm everything still passes, then commit — behaviour unchanged, duplication gone.$$,
  $$- Large refactors with no test runs in between
- Changing behaviour while "just refactoring"
- Not committing working steps, so mistakes are hard to undo$$,
  $$Refactor in small, verified steps. The suite you built is your safety net — run it after each change and you can refactor with confidence.$$,
  $$Perform a small refactor (e.g. extract a fixture), running tests before and after to confirm behaviour is unchanged.$$,
  $$Why refactor in small, verified steps?$$,
  $$Safe refactoring means: A) big changes at once B) small behaviour-preserving steps verified by tests C) skipping the tests. (Answer: B)$$,
  array['I can refactor safely','I work in small verified steps']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 11
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Performance & Scalability', '11 minute read',
  $$A healthy suite stays fast as it grows. This lesson covers keeping performance and scalability in check.$$,
  array['Keep the suite fast','Use the right layer and parallelism','Monitor suite health'],
  $$## Keeping it fast
- Push checks to the lowest sensible layer (API over UI)
- Use API setup instead of slow UI steps
- Run in parallel with independent tests
- Remove redundant and dead tests

## Monitor
Watch run time and flake rate; act before the suite becomes a bottleneck.$$,
  $$Moving validation checks from UI to API and enabling parallel workers cuts a 20-minute suite to 5, keeping fast feedback as the test count grows.$$,
  $$- Everything in slow UI tests
- Serial execution of an independent suite
- Never pruning redundant tests$$,
  $$Track your suite's run time over months, not just today. A suite that quietly creeps from 5 to 30 minutes silently erodes the fast feedback that made it valuable.$$,
  $$Identify one slow test and describe how you would speed it up (layer, setup, or parallelism).$$,
  $$What is the most effective way to keep a large suite fast?$$,
  $$To keep a suite fast you should: A) add more UI tests B) use the right layer, API setup and parallelism C) run everything serially. (Answer: B)$$,
  array['I can keep the suite fast','I monitor suite health']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 11
on conflict (module_id, lesson_number) do nothing;

-- ─────────────── MODULE 12: PORTFOLIO PROJECT ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Project Brief & Scope', '12 minute read',
  $$Your capstone is a complete automation framework you can show employers. This lesson sets the brief and scope.$$,
  array['Understand the project brief','Scope a realistic framework','Plan your build'],
  $$## What you will build
A complete framework for a public demo app, including:
- BDD feature files and step definitions
- Playwright tests and page objects
- Fixtures, utilities and test data
- GitHub repository with CI and a README

## Scope
8–12 meaningful tests across key journeys — quality over quantity.$$,
  $$You choose a public demo shop and scope the framework around its core journeys: browse, add to basket, checkout and login — enough to demonstrate every skill from the course.$$,
  $$- Scoping too large to finish well
- Trivial tests that prove little
- No plan, so the build sprawls$$,
  $$Pick an app with clear, stable journeys. A focused framework on a sensible app demonstrates more skill than a sprawling one on a flaky target.$$,
  $$Choose your demo app and list the 8–12 journeys/tests your framework will cover.$$,
  $$What matters more in the portfolio project — number of tests or their quality?$$,
  $$The portfolio project should aim for: A) as many tests as possible B) 8–12 meaningful, well-built tests C) a single UI test. (Answer: B)$$,
  array['I understand the brief','I can scope the framework']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 12
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Building the Framework', '14 minute read',
  $$This lesson guides you through assembling the framework using everything from the course.$$,
  array['Assemble the framework','Apply course patterns','Wire up CI'],
  $$## Build steps
- Set up the project (TypeScript, structure)
- Write BDD features and step definitions for key journeys
- Build page objects and components
- Add fixtures, utilities and test data
- Include at least one API test and API-driven setup
- Add a GitHub Actions workflow with report upload

## Quality bar
Robust locators, web-first assertions, independent data, green CI.$$,
  $$Following the course patterns, you build login and checkout features with page objects, seed data via the API, and wire GitHub Actions so the suite runs green on every push.$$,
  $$- Skipping CI or leaving it red
- Brittle locators and hard waits creeping back in
- Tests that depend on order or shared data$$,
  $$Apply the standards you learned, not shortcuts. This project is what an employer will actually open — let it show your best, most professional work.$$,
  $$Build your framework to the quality bar: robust locators, web-first assertions, independent data, and green CI.$$,
  $$Which qualities define a strong portfolio framework?$$,
  $$Your portfolio framework should have: A) brittle locators but many tests B) robust locators, independent data and green CI C) no CI. (Answer: B)$$,
  array['I can assemble the framework','I wire up CI']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 12
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Documentation & README', '11 minute read',
  $$A great framework needs a great README. This lesson covers documenting your project so reviewers understand it fast.$$,
  array['Write a clear README','Explain your test strategy','Make the repo easy to run'],
  $$## README checklist
- One-paragraph overview of the project and app under test
- How to install and run the tests
- What is covered and why (your strategy)
- Tech used (Playwright, TypeScript, CI)
- A note on what it demonstrates about you

## Why
Reviewers decide quickly; a clear README frames your work well.$$,
  $$Your README opens with what the framework tests and how to run it in two commands, so a reviewer can clone, run and understand it in minutes.$$,
  $$- No README, so the work has no context
- Instructions that do not actually work
- Walls of text with no structure$$,
  $$The README is the first thing an employer reads. A clear, well-structured one signals professionalism before they see a single line of test code.$$,
  $$Write a README for your project covering overview, how to run, coverage and tech used.$$,
  $$Why is the README so important for a portfolio repo?$$,
  $$A portfolio README should let a reviewer: A) guess how to run it B) clone, run and understand the project quickly C) read only code. (Answer: B)$$,
  array['I can write a clear README','I can explain my test strategy']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 12
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Publishing & Self-Review', '12 minute read',
  $$The final step is publishing your framework and reviewing it against the model solution. This lesson covers finishing strong.$$,
  array['Publish the project','Self-review against the model','Prepare to present it'],
  $$## Finishing checklist
- Repo is public and CI is green
- README is clear; links work
- Tests are reliable (pass on repeat runs)
- Locators robust; data independent

## Self-review and present
Compare against the model solution, note gaps, and prepare a 60-second walkthrough of what it demonstrates. Submit your repository URL.$$,
  $$You make the repo public, confirm CI is green, run the suite twice to check reliability, then record a 60-second walkthrough explaining your design choices — and submit the URL.$$,
  $$- A private repo or red CI a reviewer cannot use
- Broken links or a stale README
- No ability to talk through your own choices$$,
  $$Be ready to walk through any part of your framework in 60 seconds. Employers value engineers who can explain their design decisions, not just produce code.$$,
  $$Publish your framework, self-review it against the model solution, and submit your GitHub repository URL for review.$$,
  $$What is the final deliverable for this course?$$,
  $$Your capstone submission is: A) a screenshot B) a public GitHub repository URL with a green, documented framework C) a single test file. (Answer: B)$$,
  array['I can publish the project','I can present it confidently']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 12
on conflict (module_id, lesson_number) do nothing;
