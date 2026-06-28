-- ============================================================
-- AI for QA Testers — first-draft lessons for Module 7 (Defect
-- Reporting and Root Cause Support) and Module 8 (API Testing with AI).
-- Run AFTER lessons-schema.sql and seed-ai-qa-modules.sql.
-- ============================================================

-- ─────────────── MODULE 7: DEFECT REPORTING & ROOT CAUSE SUPPORT ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Improving Bug Reports with AI', '12 minute read',
  $$AI can turn rough notes into a clear, structured bug report in seconds — as long as you verify every fact.$$,
  array['Use AI to structure a bug report','Keep every fact accurate','Protect sensitive data'],
  $$## A fast workflow
- Paste your rough notes (with dummy data)
- Ask AI to format into: title, environment, steps, expected, actual
- Verify each step and detail before logging

## Keep facts intact
AI improves clarity, not accuracy. If it "tidies" a step into something untrue, fix it.

## Safety
Replace any real identifiers with dummy values first.$$,
  $$You paste "apply coupon does nothing on mobile, build 1.4". AI returns a tidy report; you confirm the steps reproduce it, correct one detail, and log it — minutes saved, accuracy kept.$$,
  $$- Logging an AI-polished report without verifying it
- Letting AI invent steps that read well but are wrong
- Pasting real customer data$$,
  $$Use AI for clarity, never for facts. A clear but inaccurate report wastes more time than a rough accurate one.$$,
  $$Take messy bug notes and use AI to structure them, then verify and correct. Record what you changed.$$,
  $$Why does AI improve clarity but not accuracy in a bug report?$$,
  $$Before pasting a bug into a public AI tool you must: A) nothing B) remove real/sensitive data C) add screenshots. (Answer: B)$$,
  array['I can structure a bug report with AI','I verify every fact and protect data']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Reproducing & Isolating Issues with AI', '12 minute read',
  $$AI can suggest variables to test and minimal repro paths — speeding up isolation while you do the actual investigation.$$,
  array['Use AI to suggest isolation steps','Narrow to minimal reproduction','Treat AI hypotheses as leads'],
  $$## How AI helps
- "What variables could affect this bug?" (browser, data, account, network)
- "Suggest a minimal set of steps to reproduce."
- "What might cause this error message?"

## Your job
Run the suggestions, change one variable at a time, and confirm what actually triggers it.

## Hypotheses, not answers
AI's root-cause guesses are leads to investigate, not conclusions.$$,
  $$AI suggests the bug might be card-type specific. You test Visa (works) and Amex (fails) — isolating it to Amex, exactly the kind of narrowing that gets bugs fixed fast.$$,
  $$- Treating an AI root-cause guess as confirmed
- Changing several variables at once
- Reporting before confirming the minimal repro$$,
  $$AI is a brainstorming partner for "what could be causing this?" — but you confirm the trigger by testing, one variable at a time.$$,
  $$Take a bug and ask AI for variables to test; isolate it to the minimal trigger yourself.$$,
  $$Why should an AI-suggested root cause be treated as a hypothesis?$$,
  $$When isolating a defect you should change: A) everything at once B) one variable at a time C) nothing. (Answer: B)$$,
  array['I can use AI to suggest isolation steps','I confirm the trigger myself, one variable at a time']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Pattern & Trend Analysis', '12 minute read',
  $$AI is strong at summarising and grouping. Use it to find patterns across many defects that point to deeper problems.$$,
  array['Summarise many defects with AI','Group defects to find patterns','Turn patterns into actions'],
  $$## What AI can do
- Summarise a long list of defects into themes
- Group similar issues (e.g. "many failures in checkout on mobile")
- Suggest where a systemic problem might lie

## From pattern to action
A cluster of related defects often signals a root cause or a risky area needing deeper testing.

## Verify
Confirm the grouping makes sense and isn't an artefact of how you phrased the prompt.$$,
  $$You paste 30 defect titles. AI groups them; one cluster is "mobile checkout" with eight issues. That points you to deep-test mobile checkout and flag it as a hotspot to the team.$$,
  $$- Accepting AI groupings without sanity-checking
- Drawing big conclusions from tiny samples
- Not turning patterns into a testing or reporting action$$,
  $$"Where are most of our defects clustering?" is a powerful question for retros and test planning — AI helps you answer it fast.$$,
  $$Take a set of defect titles (real or sample) and use AI to group them; identify one hotspot and an action.$$,
  $$How can defect clustering reveal a systemic problem?$$,
  $$AI defect grouping should be: A) trusted blindly B) sanity-checked then actioned C) ignored. (Answer: B)$$,
  array['I can summarise and group defects with AI','I turn patterns into testing actions']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Supporting Defect Triage', '12 minute read',
  $$AI can help you prepare for triage — drafting impact summaries and severity/priority suggestions you then own.$$,
  array['Draft triage summaries with AI','Get severity/priority suggestions to refine','Communicate impact clearly'],
  $$## Preparing for triage
- "Summarise this defect's impact in two sentences."
- "Suggest a severity and priority with reasoning."
- "Draft a clear recommendation for triage."

## You decide
Use AI's suggestions as a starting point; set the final severity/priority using business context only you have.

## Communicate
Lead with who is affected and the business impact — that's what drives decisions.$$,
  $$Before triage you ask AI to summarise a defect's impact and suggest severity/priority. You adjust priority up because you know the affected flow is revenue-critical, then present it confidently.$$,
  $$- Accepting AI's severity/priority without your context
- Presenting raw technical detail instead of impact
- Going to triage unprepared$$,
  $$Walk into triage with a crisp, AI-assisted impact summary and your own recommendation. Preparation plus judgement makes you influential.$$,
  $$Draft an AI-assisted triage summary for a defect, then adjust the severity/priority using your judgement.$$,
  $$Why must final severity and priority remain your decision?$$,
  $$In triage you should lead with: A) raw logs B) who's affected and business impact C) tool names. (Answer: B)$$,
  array['I can draft triage summaries with AI','I set final severity/priority with my judgement']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Assignment & Knowledge Check', '40 minutes',
  $$Produce an AI-assisted defect pack with a triage summary — portfolio-ready.$$,
  array['Apply AI to bug reporting, isolation, patterns and triage'],
  $$Bring the module together by improving a defect end to end with AI, keeping accuracy and judgement.$$,
  $$## Assignment: AI-assisted defect pack
For a real or sample issue (dummy data only):
1. Use AI to turn rough notes into a structured bug report; verify and correct it.
2. Use AI to suggest variables to isolate it; note the minimal repro.
3. Draft a two-sentence impact summary and a severity/priority recommendation; adjust with your judgement.
Mark what you accepted, changed and rejected. Save to your portfolio or submit for review.$$,
  $$Where did your verification or judgement most improve the AI's output?$$,
  $$## Module 7 Knowledge Check
1. Why does AI improve clarity but not accuracy?
2. How should you treat an AI root-cause suggestion?
3. Why does final severity/priority stay a human call?$$,
  array['I produced an AI-assisted, verified bug report','I isolated and summarised impact','I owned the severity/priority and saved the pack']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;

-- ─────────────── MODULE 8: API TESTING WITH AI ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Understanding Endpoints with AI', '12 minute read',
  $$AI can explain unfamiliar API documentation quickly, helping you understand endpoints before you test them.$$,
  array['Use AI to explain API docs','Identify endpoint inputs and outputs','Verify against the real spec'],
  $$## How AI helps
- "Explain what this endpoint does in plain English."
- "What are the required and optional fields?"
- "What responses and status codes should I expect?"

## Verify
Always confirm AI's explanation against the real documentation or by calling the endpoint — it may hallucinate fields.

## Outcome
A quick, accurate understanding of an endpoint's contract so you can design tests.$$,
  $$You paste an endpoint's docs and ask AI to summarise inputs, outputs and status codes. You then confirm against the spec before writing tests — fast understanding, verified.$$,
  $$- Trusting AI's field list without checking the real spec
- Assuming undocumented behaviour from AI guesses
- Skipping the actual response inspection$$,
  $$AI is great for "explain this to me" on unfamiliar APIs — but always confirm the contract against the real docs or a live call.$$,
  $$Take a public API's docs, ask AI to summarise an endpoint, then verify the fields against the real spec.$$,
  $$Why must you verify AI's description of an API against the real spec?$$,
  $$AI explaining an endpoint is: A) authoritative B) a fast summary you verify C) the test itself. (Answer: B)$$,
  array['I can use AI to explain API docs','I verify the contract against the real spec']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'Generating API Test Ideas', '12 minute read',
  $$AI quickly brainstorms API test ideas across happy paths, errors, and edge cases for you to refine.$$,
  array['Generate API test scenarios with AI','Cover status codes and error paths','Prioritise by risk'],
  $$## Coverage prompts
- "List test scenarios for this endpoint: success, validation errors, auth failures, boundaries."
- "What status code should each scenario return?"
- "What edge cases am I missing?"

## Apply your knowledge
Use your Module-on-APIs understanding (methods, 2xx/4xx/5xx) to judge and prioritise the ideas.

## Outcome
A prioritised list of API tests covering more than the happy path.$$,
  $$For POST /users, AI lists: 201 success, 400 missing field, 401 no token, 409 duplicate email, boundary-length name. You confirm the expected codes and prioritise auth and validation.$$,
  $$- Only testing the success path
- Accepting expected status codes without checking the spec
- Not prioritising by risk$$,
  $$Error and auth paths are where API bugs hide. Use AI to make sure you've listed them, then verify the expected behaviour.$$,
  $$Generate API test scenarios for an endpoint with AI; mark the expected status code and priority for each.$$,
  $$Why are error and auth scenarios especially important in API testing?$$,
  $$A strong API test list covers success and: A) nothing else B) validation/auth/boundary/error paths C) only performance. (Answer: B)$$,
  array['I can generate API test ideas with AI','I cover error/auth paths and prioritise by risk']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Generating Example Requests & Data', '12 minute read',
  $$AI can draft example requests and synthetic payloads, speeding up hands-on API testing — with verification.$$,
  array['Draft example requests with AI','Generate synthetic payloads','Verify before running'],
  $$## What AI can draft
- Example requests (method, URL, headers, JSON body)
- Valid and invalid payloads for each scenario
- Synthetic data for data-driven API tests

## Verify and run
Check the draft against the real contract, then run it in your tool (e.g. Postman) and confirm the actual response.

## Safety
Use synthetic data and non-production endpoints.$$,
  $$You ask AI for a valid and an invalid JSON body for POST /users. You paste them into Postman, send both, and confirm 201 and 400 respectively — quick, verified coverage.$$,
  $$- Running AI-drafted requests without checking the contract
- Using real data or hitting production
- Assuming a draft body matches the schema$$,
  $$AI drafts; your tool verifies. The value is the confirmed response, not the generated request.$$,
  $$Use AI to draft a valid and invalid request body for an endpoint, then run both and record the responses.$$,
  $$Why is the confirmed response more important than the AI-drafted request?$$,
  $$AI-generated API payloads should use: A) production data B) synthetic data on non-prod C) real customer records. (Answer: B)$$,
  array['I can draft requests and payloads with AI','I verify and run them safely']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Reviewing API Risks', '12 minute read',
  $$AI helps surface API-specific risks — security, data, and reliability — that you assess and prioritise.$$,
  array['Brainstorm API risks with AI','Consider security and data risks','Prioritise risk-based API testing'],
  $$## Risk prompts
- "What could go wrong with this endpoint? Consider security, data and reliability."
- "What auth and authorisation issues should I test?"
- "What happens with malformed, oversized, or missing data?"

## Common API risks
- Broken authentication/authorisation
- Missing input validation
- Data leakage in responses
- Poor error handling

## You prioritise
Rate the risks and focus testing on the highest.$$,
  $$AI flags that GET /users/{id} might let one user read another's data. You test access control directly and confirm whether authorisation is enforced — a high-value security check.$$,
  $$- Testing only functionality, ignoring security/data risks
- Accepting AI's risk list without prioritising
- Not checking authorisation between users$$,
  $$Authorisation bugs (seeing other users' data) are common and serious. Always include "can I access what I shouldn't?" in API testing.$$,
  $$Use AI to list risks for an endpoint, then pick the top three (including at least one security risk) to test.$$,
  $$Why is authorisation testing especially important for APIs?$$,
  $$A common serious API risk is: A) slow typing B) broken authentication/authorisation C) too many tests. (Answer: B)$$,
  array['I can brainstorm API risks with AI','I prioritise security and data risks']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Assignment & Knowledge Check', '40 minutes',
  $$Produce an AI-assisted API test pack for a public endpoint — portfolio-ready.$$,
  array['Apply AI to understand, test and risk-assess an API'],
  $$Bring the module together by testing a real public API with AI assistance.$$,
  $$## Assignment: AI-assisted API pack
Using a free public API (e.g. reqres.in):
1. Use AI to explain one endpoint; verify against the docs.
2. Generate test scenarios (success, validation, auth, boundary) with expected status codes.
3. Draft a valid and an invalid request; run both and record the responses.
4. Brainstorm risks with AI; pick the top three (incl. one security risk).
Mark what you verified or corrected. Save to your portfolio or submit for review.$$,
  $$Which AI-suggested scenario or risk proved most valuable when you tested it?$$,
  $$## Module 8 Knowledge Check
1. Why verify AI's endpoint explanation against the spec?
2. Name three non-happy-path API scenarios to test.
3. Why is authorisation testing important?$$,
  array['I understood an endpoint with AI and verified it','I tested success/error/auth scenarios','I assessed API risks and saved the pack']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = 'ai-for-qa-testers' and m.module_number = 8
on conflict (module_id, lesson_number) do nothing;
