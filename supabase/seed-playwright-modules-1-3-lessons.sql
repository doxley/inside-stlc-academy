-- ============================================================
-- Practical Test Automation with Playwright — first-draft lessons for
-- Module 1 (Automation Fundamentals), Module 2 (BDD) and Module 3
-- (Step Definitions). Run AFTER lessons-schema.sql and
-- seed-playwright-modules.sql. Idempotent.
-- ============================================================

-- ─────────────── MODULE 1: AUTOMATION FUNDAMENTALS ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Why We Automate', '12 minute read',
  $$Automation is not about replacing testers — it is about doing the repetitive, predictable checks fast and reliably so humans can focus on judgement. This lesson sets the foundation.$$,
  array['Explain the real purpose of automation','Describe what automation gives a team','Set realistic expectations'],
  $$## What automation is for
- Running repetitive checks quickly and consistently
- Catching regressions early, on every change
- Freeing testers for exploratory and risk-based work

## What automation is NOT
- A replacement for thinking testers
- A guarantee of quality on its own
- "Record and forget" — it needs maintenance

## The honest trade-off
Automation costs effort up front and ongoing maintenance. It pays back when tests are run often and are stable.$$,
  $$A team runs a 200-check regression suite manually before each release — two days of effort. Automated, it runs in 15 minutes on every pull request, catching breakages the same day they are introduced.$$,
  $$- Expecting automation to find new bugs (it confirms known behaviour)
- Automating everything regardless of value
- Ignoring the ongoing maintenance cost$$,
  $$In interviews, say "automation handles the repetitive regression checks so I can spend my time on exploratory testing and risk." That framing signals maturity.$$,
  $$List three checks in any app you know that are run repeatedly and would be good automation candidates, and one that would not.$$,
  $$What is the single biggest benefit automation gives a delivery team, in your own words?$$,
  $$Automation is best described as: A) a replacement for testers B) fast, reliable repetition of known checks C) a way to find new bugs. (Answer: B)$$,
  array['I can explain why teams automate','I understand automation''s trade-offs']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 1
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'What to Automate & the Test Pyramid', '14 minute read',
  $$Not every test should be automated, and not at the UI level. The test automation pyramid helps you put the right tests at the right layer.$$,
  array['Apply the test automation pyramid','Choose the right layer for a test','Decide what is worth automating'],
  $$## The pyramid
- **Unit (most):** fast, cheap, run constantly
- **Integration/API (middle):** verify components together, still fast and stable
- **UI/E2E (fewest):** slow and brittle — reserve for critical journeys

## Good automation candidates
- Repetitive, stable, high-value, run often (regression, smoke)

## Poor candidates
- One-off checks, rapidly changing features, pure exploratory work$$,
  $$Instead of 50 UI tests for every form-validation rule, the team writes a handful of API/unit checks for the rules and just two UI tests for the critical "happy path" submission — faster and far less brittle.$$,
  $$- Pushing everything to slow, brittle UI tests
- Automating unstable features that change weekly
- Equating "more UI tests" with "better coverage"$$,
  $$When a test can be written at a lower layer (API/unit), do it there. UI tests are the most expensive to write and maintain — spend them only on what truly needs the browser.$$,
  $$Take a feature you know and assign five checks to pyramid layers (unit, API, UI). Justify each placement in one line.$$,
  $$Why are UI/end-to-end tests kept to the fewest in the pyramid?$$,
  $$The test pyramid suggests you should have: A) mostly UI tests B) mostly unit tests, fewest UI C) an equal split. (Answer: B)$$,
  array['I can apply the test pyramid','I can pick the right layer for a test']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 1
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'The ROI of Automation', '12 minute read',
  $$Automation is an investment. Understanding return on investment helps you choose what to automate and justify it to stakeholders.$$,
  array['Reason about automation ROI','Identify high-ROI candidates','Justify automation to stakeholders'],
  $$## The ROI equation (informally)
Value = (time saved per run × number of runs) − (build cost + maintenance cost)

## High ROI
- Tests run often (every PR, nightly)
- Stable areas that rarely change
- Critical paths where failure is costly

## Low / negative ROI
- Rarely run tests
- Volatile features (high maintenance)
- Flaky tests (cost trust and time)$$,
  $$A login smoke test runs 30 times a week and takes 5 minutes manually. Automated once (a few hours) it saves ~2.5 hours every week — it pays for itself within the first fortnight.$$,
  $$- Counting only build cost, ignoring maintenance
- Automating volatile features that need constant fixing
- Measuring success by test count, not value$$,
  $$Frame automation decisions as ROI to stakeholders: "this suite saves X hours per release and protects our critical payment flow." It turns automation from a cost into an investment.$$,
  $$Pick one test and estimate its ROI: how often it runs, time saved per run, and rough maintenance cost. Is it worth automating?$$,
  $$Which factor most increases a test's automation ROI?$$,
  $$A test has high automation ROI when it is: A) run rarely B) run often and stable C) on a feature that changes weekly. (Answer: B)$$,
  array['I can reason about automation ROI','I can spot high-ROI candidates']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 1
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Common Automation Failures', '12 minute read',
  $$Most automation efforts fail for predictable reasons. Knowing them up front lets you avoid the traps that sink suites.$$,
  array['Recognise why automation efforts fail','Avoid the common traps','Protect trust in the suite'],
  $$## Why suites fail
- **Flakiness:** tests pass/fail randomly, so people stop trusting them
- **Brittleness:** tied to fragile locators/timing, break on every change
- **No maintenance:** suite rots until it is abandoned
- **Wrong layer:** everything in slow UI tests
- **No ownership:** nobody fixes failures

## The cost of a flaky suite
A suite people do not trust is worse than no suite — failures get ignored, including the real ones.$$,
  $$A team automated 300 UI tests with brittle CSS selectors and fixed sleeps. Within months half were flaky, the team ignored red builds, and a real bug shipped because "the tests always fail anyway."$$,
  $$- Using fixed sleeps instead of web-first assertions
- Brittle locators tied to layout/markup
- Leaving flaky tests unfixed in the suite$$,
  $$Guard trust ruthlessly: a small, reliable suite people act on beats a large flaky one they ignore. Fix or quarantine flaky tests immediately.$$,
  $$Write down two reasons an automation suite loses trust, and one thing you would do to prevent each.$$,
  $$Why is a flaky test suite sometimes worse than having no automation at all?$$,
  $$The biggest killer of automation suites is usually: A) too few tests B) flakiness and lost trust C) using TypeScript. (Answer: B)$$,
  array['I can name common automation failures','I know how to protect suite trust']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 1
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Building an Automation Mindset', '10 minute read',
  $$Good automation is a way of thinking before it is code: small, reliable, maintainable, valuable. This lesson sets the mindset you will apply throughout the course.$$,
  array['Adopt an automation mindset','Prioritise reliability and value','Think like an automation engineer'],
  $$## Principles to carry forward
- Reliability over quantity
- The right layer for each test
- Readable, maintainable code
- Independent, repeatable tests
- Value-driven: automate what matters

## How professionals think
They ask "should this be automated, and at what layer?" before "how do I automate it?"$$,
  $$Before automating a new feature, an engineer asks: is it stable? how often will this run? what is the risk if it breaks? Only then do they decide what to automate and where.$$,
  $$- Automating first, thinking later
- Chasing test count over reliability
- Writing clever code instead of clear code$$,
  $$The best automation engineers delete and consolidate tests as readily as they add them. A lean, trusted suite is the goal — not the biggest one.$$,
  $$Write your personal three-rule automation manifesto (e.g. "reliable over many"). You will revisit it at the end of the course.$$,
  $$Which mindset best reflects professional automation?$$,
  $$A professional automation mindset prioritises: A) the most tests possible B) reliability, value and maintainability C) the cleverest code. (Answer: B)$$,
  array['I have an automation mindset','I prioritise reliability and value']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 1
on conflict (module_id, lesson_number) do nothing;

-- ─────────────── MODULE 2: BEHAVIOUR DRIVEN DEVELOPMENT (BDD) ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Introduction to BDD', '12 minute read',
  $$Behaviour Driven Development describes software behaviour in plain language everyone understands, then ties it to tests. This lesson explains what BDD is and why teams use it.$$,
  array['Explain what BDD is','Describe the benefits of BDD','Know where Gherkin fits'],
  $$## What BDD is
- Describing behaviour from the user's perspective in plain language
- A shared language between business, dev and test (the "three amigos")
- Living documentation that doubles as automated tests

## Why teams use it
- Fewer misunderstandings about requirements
- Tests that read like specifications
- Collaboration before code is written$$,
  $$Instead of a vague ticket "add login", the team writes: "Given a registered user, When they enter valid credentials, Then they see their dashboard." Everyone now agrees exactly what to build and test.$$,
  $$- Treating BDD as just a testing tool, not collaboration
- Writing Gherkin after development instead of before
- Technical jargon in scenarios meant for everyone$$,
  $$BDD's real value is the conversation it forces before coding. The feature files are a by-product of getting everyone aligned on behaviour first.$$,
  $$Rewrite a vague requirement you have seen as a single Given/When/Then sentence.$$,
  $$What problem does BDD solve that writing tests alone does not?$$,
  $$BDD is primarily about: A) a testing tool B) shared understanding of behaviour in plain language C) faster code. (Answer: B)$$,
  array['I can explain BDD','I understand why teams use it']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 2
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Writing Good User Stories', '12 minute read',
  $$BDD scenarios flow from clear user stories. This lesson covers the story format and the acceptance criteria that become your scenarios.$$,
  array['Write user stories in the standard format','Add testable acceptance criteria','Connect stories to scenarios'],
  $$## The story format
"As a [role], I want [capability], so that [benefit]."

## Good acceptance criteria
- Specific and testable
- Cover happy path, negative and edge cases
- Free of ambiguity ("fast", "user-friendly")

## From story to scenarios
Each acceptance criterion typically becomes one or more Given/When/Then scenarios.$$,
  $$Story: "As a shopper, I want to apply a discount code, so that I pay less." Criteria → scenarios: valid code reduces total; expired code shows an error; empty code does nothing.$$,
  $$- Stories with no acceptance criteria
- Vague, untestable criteria
- Jumping to solutions instead of behaviour$$,
  $$Strong acceptance criteria are the bridge from a story to your scenarios. If a criterion is not testable, it is not done — push back in refinement.$$,
  $$Write a user story with three acceptance criteria (one happy, one negative, one edge) for a feature you choose.$$,
  $$Why must acceptance criteria be testable?$$,
  $$A good user story format is: A) "build login" B) "As a [role], I want [capability], so that [benefit]" C) a list of code tasks. (Answer: B)$$,
  array['I can write a clear user story','I can write testable acceptance criteria']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 2
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Gherkin Syntax & Feature Files', '14 minute read',
  $$Gherkin is the plain-language syntax BDD uses. This lesson covers feature files and the core keywords.$$,
  array['Use the core Gherkin keywords','Structure a feature file','Write clear steps'],
  $$## Core keywords
- **Feature:** the capability being described
- **Scenario:** one concrete example of behaviour
- **Given:** the starting context / pre-conditions
- **When:** the action / event
- **Then:** the expected outcome
- **And / But:** chain additional steps

## Feature file structure
A .feature file has one Feature and one or more Scenarios. Keep steps declarative (what), not imperative (every click).$$,
  $$Feature: Login
  Scenario: Successful login
    Given a registered user
    When they sign in with valid credentials
    Then they see their dashboard$$,
  $$- Imperative steps ("click the 3rd button") instead of behaviour
- Several behaviours crammed into one scenario
- Inconsistent wording for the same action$$,
  $$Keep steps at the behaviour level, not the click level. "When they sign in" is reusable and readable; "When they click #login-btn" is brittle and belongs in step definitions.$$,
  $$Write a feature file with one Feature and two scenarios (a success and a failure) for a sign-up form.$$,
  $$What is the difference between a declarative and an imperative scenario step?$$,
  $$In Gherkin, the expected outcome is expressed with: A) Given B) When C) Then. (Answer: C)$$,
  array['I know the core Gherkin keywords','I can structure a feature file']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 2
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Scenarios & Scenario Outlines', '13 minute read',
  $$When the same behaviour should be tested with many data sets, scenario outlines keep your feature files concise. This lesson covers scenarios, outlines and examples tables.$$,
  array['Write scenario outlines','Use examples tables','Avoid duplicate scenarios'],
  $$## Scenario Outline
A template scenario with placeholders, run once per row of an Examples table.

## When to use it
- The same steps with different inputs/outcomes
- Boundary and equivalence data sets

## Keep it readable
Use outlines for genuine data variation — not to cram unrelated behaviours together.$$,
  $$Scenario Outline: Discount codes
  When the user applies "<code>"
  Then they see "<result>"
  Examples:
    | code    | result            |
    | SAVE10  | 10% discount      |
    | EXPIRED | code has expired  |$$,
  $$- Copy-pasting near-identical scenarios instead of an outline
- Outlines with huge tables that hide intent
- Mixing unrelated cases in one outline$$,
  $$Scenario outlines are perfect for boundary value analysis — one outline, a row per boundary. It keeps data-driven behaviour clear and maintainable.$$,
  $$Convert two similar scenarios into a single scenario outline with an examples table.$$,
  $$When is a scenario outline the right choice over separate scenarios?$$,
  $$A scenario outline is best used when: A) testing unrelated features B) the same steps run with different data C) you have only one case. (Answer: B)$$,
  array['I can write a scenario outline','I can use examples tables']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 2
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Writing Readable Tests', '11 minute read',
  $$Readable feature files are living documentation. This lesson covers the habits that keep scenarios clear and valuable.$$,
  array['Write readable, consistent scenarios','Keep features focused','Treat features as documentation'],
  $$## Habits of readable features
- Consistent vocabulary for the same actions
- One behaviour per scenario
- Business language, not technical detail
- Declarative steps that read like a spec

## Why it matters
A non-technical stakeholder should be able to read and confirm a feature file.$$,
  $$A product owner reads the checkout.feature file and confirms the rules are correct — without seeing any code. That is BDD working as living documentation.$$,
  $$- Technical jargon a stakeholder cannot follow
- Inconsistent phrasing for identical actions
- Scenarios that test three things at once$$,
  $$The readability test: could a non-technical colleague read your feature file and confirm the behaviour is right? If not, simplify the language.$$,
  $$Review a feature file you wrote and improve it for readability — consistent wording, one behaviour per scenario.$$,
  $$What is the readability bar for a good feature file?$$,
  $$Readable Gherkin should be understandable by: A) only developers B) a non-technical stakeholder C) only the test tool. (Answer: B)$$,
  array['I can write readable scenarios','I treat features as documentation']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 2
on conflict (module_id, lesson_number) do nothing;

-- ─────────────── MODULE 3: STEP DEFINITIONS ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Mapping Features to Code', '12 minute read',
  $$Step definitions connect plain-language Gherkin steps to executable code. This lesson explains the mapping and how it runs.$$,
  array['Explain how steps map to code','Describe the execution flow','Set up a step definitions file'],
  $$## How it works
- Each Gherkin step matches a step definition by its text/pattern
- The step definition contains the Playwright code that performs it
- The runner executes steps in order, scenario by scenario

## The separation
Feature files describe behaviour; step definitions implement it; page objects (later) hold the locators. Keep these layers distinct.$$,
  $$The step "When they sign in with valid credentials" matches a step definition that calls loginPage.login(user, pass) — the Gherkin stays readable while the code does the work.$$,
  $$- Putting locators directly in step definitions (use page objects)
- One giant step definition file for everything
- Steps whose text does not match the feature wording$$,
  $$Think in three layers: feature (what), step definition (glue), page object (how/locators). Keeping them separate is what makes a BDD framework maintainable.$$,
  $$Take one scenario and list the step definitions it will need, with a one-line note on what each will do.$$,
  $$What is the role of a step definition between a feature file and the page objects?$$,
  $$A step definition's job is to: A) store locators B) connect a Gherkin step to executable code C) describe behaviour in plain language. (Answer: B)$$,
  array['I understand feature-to-code mapping','I can plan step definitions for a scenario']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 3
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Given, When, Then in Code', '13 minute read',
  $$Each Gherkin keyword has a job. Mapping that intent into code keeps step definitions clean. This lesson covers implementing Given/When/Then.$$,
  array['Implement Given/When/Then steps','Keep each step focused','Use page objects from steps'],
  $$## Intent of each
- **Given** sets up state (navigate, seed data, log in)
- **When** performs the single action under test
- **Then** asserts the outcome with web-first assertions

## Keep them honest
A Given should not assert; a Then should not perform new actions. Each step does its one job.$$,
  $$Given → await loginPage.goto(); When → await loginPage.login(user, pass); Then → await expect(dashboard.heading()).toBeVisible();$$,
  $$- Performing actions inside Then steps
- Assertions hidden inside Given steps
- Multiple actions stuffed into one When$$,
  $$If a Then step needs to click something before asserting, your scenario is probably testing two behaviours — split it. Clean Given/When/Then keeps tests easy to diagnose.$$,
  $$Implement (in pseudocode or real code) the Given/When/Then steps for a login scenario, using page object calls.$$,
  $$Why should a Then step contain only assertions?$$,
  $$The When step should contain: A) setup B) the single action under test C) the assertions. (Answer: B)$$,
  array['I can implement Given/When/Then','I keep each step focused']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 3
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Parameterisation', '12 minute read',
  $$Parameterised steps capture values from the Gherkin text so one step definition serves many scenarios. This lesson covers capturing and using parameters.$$,
  array['Capture parameters from step text','Reuse one step for many inputs','Keep parameterised steps readable'],
  $$## How it works
- Placeholders in the step text (e.g. quoted strings or typed patterns) are passed as arguments to the step function
- One definition then handles every value

## Pairs with outlines
Scenario outlines feed different rows; parameterised steps receive those values. Together they remove duplication.$$,
  $$Step text: When the user applies "<code>" → step definition receives code and calls await basket.applyCode(code); one definition handles SAVE10, EXPIRED and more.$$,
  $$- Writing a separate step definition per value
- Over-complex patterns that are hard to read
- Capturing values but hard-coding them anyway$$,
  $$Parameterisation plus scenario outlines is the backbone of data-driven BDD. Learn the pair together and your feature files stay tiny while coverage grows.$$,
  $$Turn a hard-coded step ("When the user applies SAVE10") into a parameterised step that accepts any code.$$,
  $$How do parameterised steps reduce duplication?$$,
  $$Parameterised steps let you: A) write one step definition for many values B) avoid page objects C) skip assertions. (Answer: A)$$,
  array['I can parameterise a step','I can pair steps with outlines']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 3
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Reusable Steps & Avoiding Duplication', '12 minute read',
  $$Duplicated steps make a suite hard to maintain. This lesson covers writing reusable steps and keeping the step library clean.$$,
  array['Write reusable steps','Spot and remove duplication','Organise the step library'],
  $$## Reuse principles
- Write steps at the behaviour level so they apply across features
- Share common steps (login, navigation) in one place
- Watch for near-duplicates with slightly different wording

## Organising steps
Group step definitions logically (by domain/page). A consistent vocabulary prevents accidental duplicates.$$,
  $$"Given a logged-in user" is written once and reused across checkout, account and dashboard features — instead of three slightly different login steps.$$,
  $$- Two steps doing the same thing with different wording
- Copy-pasting steps between files
- No shared/common steps, so login is re-implemented everywhere$$,
  $$Agree a shared step vocabulary with your team. Most duplication comes from two people phrasing the same action differently — a glossary prevents it.$$,
  $$Find two near-duplicate steps (or imagine them) and merge them into one reusable, well-worded step.$$,
  $$What is the main cause of duplicate step definitions, and how do you prevent it?$$,
  $$Reusable steps are written at the level of: A) individual clicks B) behaviour C) CSS selectors. (Answer: B)$$,
  array['I can write reusable steps','I can remove step duplication']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 3
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Step Definition Best Practices', '11 minute read',
  $$A short set of habits keeps step definitions clean, reliable and easy to maintain. This lesson pulls them together.$$,
  array['Apply step definition best practices','Keep glue code thin','Delegate to page objects'],
  $$## Best practices
- Keep step definitions thin — delegate to page objects
- One responsibility per step
- Consistent naming and wording
- No hard waits; rely on web-first assertions
- Independent steps (no hidden order dependencies)

## The goal
Step definitions should read as a thin, honest translation of the Gherkin into actions.$$,
  $$A clean When step is one line: await checkoutPage.placeOrder(); all the locator and waiting logic lives in the page object, so the step stays readable and stable.$$,
  $$- Fat step definitions full of locators and logic
- Hidden dependencies between steps
- Hard-coded waits inside steps$$,
  $$Treat step definitions as glue, not logic. The thinner they are, the more your framework's real strength lives in well-tested page objects and utilities.$$,
  $$Review a step definition and refactor it to be thin — move locators/logic into a page object.$$,
  $$Why should step definitions stay thin?$$,
  $$Good step definitions are: A) thick with logic and locators B) thin glue that delegates to page objects C) full of hard waits. (Answer: B)$$,
  array['I follow step definition best practices','I keep glue code thin']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'practical-test-automation-playwright' and m.module_number = 3
on conflict (module_id, lesson_number) do nothing;
