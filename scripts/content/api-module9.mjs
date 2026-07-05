// API Testing Masterclass — Module 9: AI-Assisted API Testing.
// Full lesson content (base fields + enhancements). Follows the Module 1 template:
// every lesson fills every base field and a rich `enhancements` block.
export default {
  courseSlug: 'api-testing-masterclass',
  moduleNumber: 9,
  lessons: [
    {
      lessonNumber: 1,
      title: 'Where AI Helps in API Testing',
      estimatedTime: '13 minute read',
      lessonOverview: `AI tools can genuinely speed up API testing — but only in the right places. This lesson maps where AI adds real value and where it quietly creates risk, so you stay the accountable tester.`,
      learningObjectives: ['Identify tasks where AI reliably accelerates API testing', 'Recognise where AI output must be verified before you trust it', 'Explain why the tester, not the tool, remains accountable'],
      lessonNotes: `## What AI is genuinely good at
AI is fast at the *drafting* and *summarising* parts of API testing:
- Generating first-draft **test ideas** from an endpoint or spec
- Suggesting **edge cases** and boundary values you might miss
- Drafting **assertions** and test data
- Explaining an unfamiliar response or error in plain English

## Where AI needs a tight leash
- **Facts about your specific system** — it will confidently invent endpoints and fields
- **Anything security-sensitive** — never paste real tokens, secrets or live data
- **Final judgement** — whether a test is *correct and worth running* is yours

## The mental model
Treat AI as a **fast, tireless junior tester**: brilliant at first drafts, terrible at knowing what it doesn't know. You review everything it produces before it goes anywhere near your suite.

## Example
A prompt that plays to AI's strengths:

\`\`\`
You are helping a QA engineer. Given this endpoint description,
list 10 test ideas grouped by: happy path, validation, auth,
and edge cases. Do not invent fields I did not provide.
Endpoint: POST /orders — body {item: string, qty: integer}.
\`\`\`

You keep the accountability; AI just gets you to a first draft faster.`,
      workedExample: `You ask an AI to "list test ideas for POST /orders with body {item, qty}". It returns happy-path, missing-field, negative-qty, huge-qty and wrong-type cases — a solid start. To verify: check each idea against the *real* endpoint (does qty actually reject 0?), delete any that reference fields you never mentioned, and add domain cases the AI couldn't know (e.g. your business caps qty at 50). The AI saved ten minutes; your review made it correct.`,
      commonMistakes: `- Treating AI output as fact instead of a first draft to verify
- Asking AI about your specific system, which it cannot know, then trusting invented endpoints
- Handing over judgement — letting AI decide what "passing" means instead of you`,
      realWorldTip: `Use AI for breadth, use your brain for depth. AI is superb at generating twenty test ideas in seconds; deciding which five actually matter for *this* release is still your job.`,
      exercise: `Pick one endpoint you know well. List three testing tasks where AI would genuinely help you, and two where you would not trust it without verification. Write one sentence explaining each.`,
      reflectionQuestion: `If an AI drafts your assertions and one is wrong, who is accountable for the escaped bug?`,
      knowledgeCheck: `When AI generates test ideas for your API, whose responsibility is it to verify they are correct? (Answer: the tester's — AI drafts, you verify and stay accountable)`,
      completionChecklist: ['I can name tasks where AI accelerates API testing', 'I can name tasks where AI output must be verified first', 'I can explain why I stay accountable for AI-assisted work'],
      enhancements: {
        industryStory: `A tester on my team once shipped an assertion an AI wrote checking a \`total_price\` field. The API actually returned \`totalPrice\`. The test passed because the assertion was written against a field that never existed — the AI had hallucinated it and nobody checked. The fix was cultural, not technical: AI drafts, humans verify, every time.`,
        visualAid: { type: 'comparison', title: 'Where AI helps vs where it hurts', headers: ['Task', 'AI helps', 'Verify hard'], rows: [['Draft test ideas', 'Yes — fast breadth', 'Prune irrelevant ones'], ['Explain an error', 'Yes — plain English', 'Confirm against docs'], ['Facts about your API', 'No — it invents', 'Always check the real spec'], ['Handle secrets/tokens', 'Never paste them', 'Use redaction'], ['Decide pass/fail', 'No — your call', 'Owned by you']] },
        davidTip: `I treat every AI response like a pull request from an eager junior: genuinely useful, occasionally brilliant, and never merged without a review. That one habit turns AI from a risk into a genuine accelerator.`,
        miniChallenge: `Write a one-line rule you would pin above your desk about using AI in testing. Make it something you would actually follow under deadline pressure.`,
        modelAnswer: `## Example\nA strong prompt for mapping value:\n\n\`\`\`\nAct as a senior QA reviewer. For the endpoint I describe, split\ntesting work into: (a) tasks you can draft for me now, and (b)\ntasks only I can validate because they depend on my system.\nEndpoint: GET /users/{id} returning {id, name, email, status}.\n\`\`\`\nExpected: the AI lists drafting help (test ideas, assertion shapes) under (a) and system-specific facts (real status values, auth rules) under (b) — exactly the boundary you must police.`,
        badGood: { label: 'framing an AI request', bad: `"Test my API for me."\nNo context, no endpoint, no boundaries — the AI invents everything and you can trust none of it.`, good: `"Here is one endpoint (POST /orders, body {item, qty}). List 8 test ideas grouped by happy path, validation and edge cases. Do not invent fields I did not give you."\nScoped, verifiable, honest about its limits.` },
        resourcePreview: { name: 'AI-in-Testing Do/Don\'t Card', purpose: 'A one-page reference for where AI helps and where to verify.', whenToUse: 'Keep it open throughout Module 9.', formats: ['PDF'] },
      },
    },
    {
      lessonNumber: 2,
      title: 'AI for Endpoint Analysis & Test Ideas',
      estimatedTime: '15 minute read',
      lessonOverview: `Given an endpoint or a spec, AI can generate a broad, structured set of test ideas in seconds. This lesson shows how to prompt for that breadth — and how to turn a raw list into a real test plan.`,
      learningObjectives: ['Write a context-rich prompt that produces structured test ideas', 'Group AI-generated ideas by category (happy path, validation, auth, edge)', 'Filter and prioritise the raw list into a usable plan'],
      lessonNotes: `## Give the AI what it needs
A good test-idea prompt includes the **method**, **path**, **request shape**, **response shape** and any **rules** you know. The more context, the fewer hallucinations.

## Ask for structure, not a wall of text
Request the ideas **grouped** so you can scan and prioritise:
- Happy path
- Validation / negative
- Authentication & authorisation
- Boundaries & edge cases

## Example prompt

\`\`\`
You are a senior API tester. Generate test ideas for this endpoint,
grouped by: happy path, validation, auth, boundaries. Number each
idea and keep them one line. Only use the fields I provide.

POST /transfers
Body: { fromAccount: string, toAccount: string, amount: number }
Rules: amount must be > 0; both accounts must exist; caller must
own fromAccount.
\`\`\`

## Turn the list into a plan
AI gives you breadth; you add depth. Delete duplicates, remove anything referencing invented fields, add domain cases the AI can't know (currency limits, fraud thresholds), then **prioritise by risk**. The list is a starting point, never the finished plan.`,
      workedExample: `You paste the \`POST /transfers\` prompt above. The AI returns ~15 ideas including "transfer to a non-existent account", "negative amount", "amount = 0", "transfer from an account you don't own", and "very large amount". You verify: 0 and negative are real per your rules (keep), the "duplicate transfer idempotency" idea is genuinely valuable (keep, flag as high risk), and one idea references a \`currency\` field you never mentioned — you delete it as a hallucination. Result: a prioritised 10-case plan in five minutes instead of thirty.`,
      commonMistakes: `- Prompting with just an endpoint name and no request/response shape, so the AI guesses
- Accepting the whole list without pruning duplicates or invented fields
- Skipping the prioritisation step — twenty unranked ideas is not a test plan`,
      realWorldTip: `The quality of AI test ideas is almost entirely down to the context you provide. Paste the actual request and response shapes and the AI stops guessing and starts reasoning.`,
      exercise: `Take a real endpoint (or one from jsonplaceholder / reqres). Write a context-rich prompt asking for test ideas grouped by category. Generate them, then mark each idea keep / delete / needs-verification and explain why for three of them.`,
      reflectionQuestion: `Why does giving the AI the response shape, not just the endpoint name, reduce hallucinated test ideas?`,
      knowledgeCheck: `What is the single most effective way to reduce hallucinated test ideas from an AI? (Answer: give it rich context — the real request and response shapes and known rules)`,
      completionChecklist: ['I can write a context-rich prompt for test ideas', 'I can get ideas returned grouped by category', 'I can filter and prioritise the raw list into a plan'],
      enhancements: {
        industryStory: `We had a payments endpoint with about forty edge cases nobody had fully mapped. A tester fed the spec to an AI with clear rules and got a grouped list of thirty-odd ideas in under a minute. Roughly a quarter were duplicates or invented, but among the rest was an idempotency case we'd genuinely missed. The AI didn't find the bug — it surfaced the idea, and the tester's judgement did the rest.`,
        visualAid: { type: 'timeline', title: 'From endpoint to test plan', steps: [{ label: 'Describe', detail: 'give AI method, path, request/response, rules' }, { label: 'Generate', detail: 'ask for ideas grouped by category' }, { label: 'Prune', detail: 'delete duplicates and invented fields' }, { label: 'Enrich', detail: 'add domain cases AI cannot know' }, { label: 'Prioritise', detail: 'rank by risk into a real plan' }] },
        davidTip: `I always ask the AI to keep each idea to one line and number them. It sounds trivial, but a numbered, scannable list is something you can actually triage in minutes — a paragraph of prose is not.`,
        miniChallenge: `Write a prompt for test ideas on \`GET /users/{id}?include=orders\`. Include the response shape and one business rule, and require the output grouped by category.`,
        modelAnswer: `## Example\nA strong, context-rich prompt:\n\n\`\`\`\nSenior API tester. Generate test ideas for GET /users/{id}?include=orders.\nResponse: { id, name, email, status, orders: [{ id, total }] }.\nRule: a suspended user (status="suspended") must not return orders.\nGroup ideas as: happy path, validation, auth, boundaries. One line each,\nnumbered. Do not invent query params or fields beyond those given.\n\`\`\`\nExpected: ideas like "suspended user returns empty orders", "invalid id → 404", "include omitted → no orders array", "unauthorised caller → 403".`,
        badGood: { label: 'test-idea prompt', bad: `"Give me test cases for the users endpoint."\nThe AI has no shape, no rules, and no id — it will guess params and fields that may not exist.`, good: `"Test ideas for GET /users/{id}, response {id,name,email,status}, rule: suspended users are read-only. Group by happy path / validation / auth / edge. Don't invent fields."\nScoped and verifiable.` },
      },
    },
    {
      lessonNumber: 3,
      title: 'Generating Assertions & Test Data with AI',
      estimatedTime: '15 minute read',
      lessonOverview: `AI can draft the fiddly parts of a test — assertions and test data — quickly. This lesson shows how to get usable Postman/JS assertions and realistic data, then verify every line before it enters your suite.`,
      learningObjectives: ['Prompt AI for assertions in a specific framework and style', 'Generate realistic, boundary-aware test data', 'Verify AI-generated assertions and data against the real API'],
      lessonNotes: `## Assertions: be specific about the tool
Tell the AI *which framework* and *which response* you're asserting on. Vague requests produce pseudo-code; specific ones produce runnable snippets.

\`\`\`
Write Postman test assertions (pm.test / pm.expect) for this response.
Assert: status 200, body has id (number), email is a valid string,
status is one of ["active","suspended"], and orders is an array.
Response: { "id": 7, "email": "a@b.com", "status": "active", "orders": [] }
\`\`\`

## Test data: ask for the awkward values
AI is excellent at generating boundary and nasty-input data:
- Valid, minimal, maximal values
- Empty strings, nulls, wrong types
- Injection-style and unicode strings for robustness

## Always verify against reality
- Run the assertions against the **real** endpoint — do the field names and types match?
- Delete any assertion on a field the API doesn't actually return
- Check generated data is **safe** and **synthetic** — never real customer records

## The rule
AI writes the draft; you run it, read it, and confirm it matches the true response before it's trusted.`,
      workedExample: `You give the AI a sample response and ask for Postman assertions. It returns \`pm.expect(pm.response.json().status).to.be.oneOf(["active","suspended"])\` and a check for \`orders\` being an array. You verify by running it against the real endpoint: the status assertion passes, but the AI also added a check for \`lastLogin\` — a field your API never returns, so the test fails. You delete that line (it was hallucinated) and keep the rest. Five assertions drafted, one caught and removed, all confirmed against the live response.`,
      commonMistakes: `- Not naming the framework, so you get pseudo-code you can't run
- Trusting assertions against fields the API doesn't actually return
- Generating "test data" that is really copied production data — a privacy breach`,
      realWorldTip: `Ask the AI for the boundary and malformed data specifically — empty, null, maximum length, wrong type. Those are exactly the values humans forget and where the interesting bugs hide.`,
      exercise: `Take a real JSON response from an endpoint. Ask an AI to write assertions for it in Postman (or your framework). Run them against the live endpoint, then list which passed, which failed, and which asserted on a field that doesn't exist.`,
      reflectionQuestion: `Why must you run AI-generated assertions against the real endpoint before trusting them?`,
      knowledgeCheck: `Before adding AI-generated assertions to your suite, what must you do first? (Answer: run them against the real endpoint and confirm the fields and types actually match)`,
      completionChecklist: ['I can prompt AI for assertions in my chosen framework', 'I can generate boundary and malformed test data', 'I can verify AI assertions and data against the real API'],
      enhancements: {
        industryStory: `A contractor generated a beautiful set of assertions with AI and committed them straight into the suite. They all passed — because they asserted on fields that didn't exist, and the framework treated undefined-vs-undefined as a match. It looked like thorough coverage and tested nothing. We now have a rule: no AI assertion lands until it's been run red-then-green against the real API.`,
        visualAid: { type: 'comparison', title: 'AI-drafted vs verified assertions', headers: ['Stage', 'AI draft', 'After you verify'], rows: [['Field names', 'May be invented', 'Confirmed against response'], ['Types', 'Assumed', 'Checked against real data'], ['Runnable?', 'Sometimes pseudo-code', 'Runs green then red correctly'], ['Test data', 'May resemble real data', 'Synthetic and safe'], ['Trust', 'None yet', 'Earned by running it']] },
        davidTip: `Whenever an AI writes me an assertion, I deliberately break the API's data once to make sure the test actually goes red. An assertion that never fails is not a test — it's decoration. AI produces a lot of decoration if you let it.`,
        miniChallenge: `Ask an AI to generate 8 test-data values for an \`amount\` field (a positive decimal). Then mark which are valid, which are boundaries, and which are invalid inputs you'd expect the API to reject.`,
        modelAnswer: `## Example\nA precise assertion prompt:\n\n\`\`\`\nWrite Postman test assertions (pm.test + pm.expect) for this exact response.\nAssert: HTTP 200; body.id is a number; body.email is a non-empty string;\nbody.status is one of ["active","suspended"]; body.orders is an array.\nDo NOT assert on any field not present below.\nResponse: {"id":7,"email":"a@b.com","status":"active","orders":[]}\n\`\`\`\nExpected: 4–5 runnable pm.test blocks and nothing referencing fields outside the sample.`,
        badGood: { label: 'assertion prompt', bad: `"Write some tests for this API response."\nNo framework, no rule about invented fields — you get pseudo-code that may assert on things that don't exist.`, good: `"Write Postman pm.test assertions for THIS exact response {…}. Assert only on fields present. Don't invent fields."\nRunnable, scoped, and safe to verify.` },
      },
    },
    {
      lessonNumber: 4,
      title: 'AI for API Documentation',
      estimatedTime: '13 minute read',
      lessonOverview: `AI can turn a raw request/response into readable documentation, summarise a sprawling spec, and explain a confusing error. Used well it saves hours; used carelessly it publishes confident nonsense. This lesson keeps you on the useful side.`,
      learningObjectives: ['Use AI to draft and summarise API documentation from real examples', 'Explain an unfamiliar endpoint or error using AI', 'Verify AI-written documentation against the actual API behaviour'],
      lessonNotes: `## Great documentation uses cases
- Draft a **plain-English summary** of what an endpoint does from a real example
- Summarise a **long OpenAPI/Swagger spec** into the parts you care about
- Explain a **cryptic error response** and suggest likely causes
- Draft a **table of fields** with types and meanings

## Feed it real examples
Give the AI an actual request and response — it documents what it *sees*, not what it *guesses*. That single habit removes most documentation hallucinations.

\`\`\`
Turn this request/response into concise API docs: a one-line summary,
a parameter table (name, type, required, description), and one example.
Only document what is shown; flag anything you are unsure about.

GET /invoices?status=unpaid&page=2
Response: { "data": [ { "id": 11, "amount": 40.0, "status": "unpaid" } ],
            "page": 2, "total": 57 }
\`\`\`

## Always verify before publishing
- Cross-check every field and type against the **real** response
- Confirm required-vs-optional is correct — AI often guesses this wrong
- Never document security details (tokens, internal URLs) that shouldn't be public

Documentation you didn't verify is worse than none — people trust it.`,
      workedExample: `You paste a real \`GET /invoices\` request and response and ask for concise docs. The AI produces a clean one-line summary, a parameter table, and an example. You verify: the \`status\` and \`page\` params are correct, but the AI marked \`page\` as *required* when it's actually optional (defaults to 1). You correct that one cell. It also invented a \`currency\` field description — you delete it because the sample never showed one. Ten minutes of drafting saved; two errors caught before anyone relied on the doc.`,
      commonMistakes: `- Publishing AI docs without checking field types and required/optional flags
- Letting the AI describe endpoints from their names alone, so it invents behaviour
- Documenting sensitive details (auth tokens, internal hosts) that should never be public`,
      realWorldTip: `Always give the AI a real request/response pair to document, and explicitly tell it to flag anything it's unsure about. Documentation grounded in a real example is far more trustworthy than documentation grounded in a guess.`,
      exercise: `Take a real endpoint's request and response. Ask an AI to produce a one-line summary plus a field table (name, type, required, description). Verify every field and required flag against the actual response, and note any the AI got wrong.`,
      reflectionQuestion: `Why is unverified AI-written documentation potentially more dangerous than having no documentation at all?`,
      knowledgeCheck: `What is the safest input to give an AI when asking it to document an endpoint? (Answer: a real request/response example, so it documents what it sees rather than guessing)`,
      completionChecklist: ['I can use AI to draft documentation from a real example', 'I can use AI to explain an unfamiliar endpoint or error', 'I can verify AI documentation against the real API before trusting it'],
      enhancements: {
        industryStory: `A team once auto-generated their public API docs with AI from endpoint names alone — no examples. The docs read beautifully and described a \`sort\` parameter that the API had never supported. Integration partners built against it, their calls failed, and support drowned. Once we regenerated the docs from real request/response captures and verified each field, the complaints stopped. Grounding beats fluency.`,
        visualAid: { type: 'timeline', title: 'Documenting an endpoint with AI', steps: [{ label: 'Capture', detail: 'grab a real request + response' }, { label: 'Prompt', detail: 'ask for summary + field table, only what is shown' }, { label: 'Draft', detail: 'AI produces readable docs' }, { label: 'Verify', detail: 'check fields, types, required flags' }, { label: 'Publish', detail: 'only after every claim is confirmed' }] },
        davidTip: `I always tell the AI: "document only what is in the example, and flag anything you're unsure about." That one instruction turns silent hallucinations into visible question marks I can go and check — which is exactly what I want.`,
        miniChallenge: `Give an AI a real error response (e.g. \`{ "error": "invalid_grant" }\` with 400) and ask it to explain likely causes. Then verify its explanation against the API's actual docs and note which causes are plausible.`,
        modelAnswer: `## Example\nA grounded documentation prompt:\n\n\`\`\`\nTurn this real request/response into concise API docs: one-line summary,\na field table (name, type, required, description), and one example call.\nDocument ONLY fields shown below. Mark required/optional only if certain,\notherwise write "unknown — verify". \nGET /invoices?status=unpaid&page=2\nResponse: {"data":[{"id":11,"amount":40.0,"status":"unpaid"}],"page":2,"total":57}\n\`\`\`\nExpected: a table for status, page, id, amount, total — with honest "unknown — verify" where the AI can't be sure.`,
        badGood: { label: 'documentation prompt', bad: `"Write docs for the /invoices endpoint."\nWith only a name, the AI invents parameters and behaviour that read plausibly and mislead everyone who trusts them.`, good: `"Document ONLY what's in this real response {…}; mark required/optional only if certain, else 'verify'."\nGrounded, honest about uncertainty, safe to publish after a check.` },
      },
    },
    {
      lessonNumber: 5,
      title: 'Responsible & Safe AI Use in API Testing',
      estimatedTime: '16 minute read',
      lessonOverview: `AI accelerates API testing, but it can also leak secrets, hallucinate confidently, and lull you into skipping review. This closing lesson sets the professional standard: use AI hard, but safely — and never surrender your accountability.`,
      learningObjectives: ['Apply data-safety rules when using AI (no secrets, tokens or real data)', 'Detect and handle AI hallucinations in a testing context', 'Define a responsible personal policy for AI-assisted API testing'],
      lessonNotes: `## The non-negotiables
- **Never paste secrets** — no real tokens, API keys, passwords or connection strings
- **Never paste confidential or personal data** — redact real customer records; use synthetic values
- **Assume public AI tools may retain input** — treat the prompt box like a public forum unless your org's enterprise tool guarantees otherwise
- **Follow your organisation's AI policy** — if there isn't one, ask

## Spot the hallucinations
AI states invented facts with total confidence. In testing, watch for:
- **Invented endpoints** and query params that don't exist
- **Hallucinated fields** in requests or assertions
- **Wrong status codes** or made-up error meanings
Verify every specific claim against the real API or the spec.

## Redact before you prompt

\`\`\`
Explain what this API error means and likely causes. I have redacted
the token and customer id — do not ask me to paste the real values.
Response: 401 { "error": "invalid_token" } on GET /accounts/{REDACTED}
Authorization: Bearer {REDACTED}
\`\`\`

## Your responsible-use policy
Draft breadth with AI, verify everything, keep secrets out, follow policy, and own the outcome. The tester stays accountable — that never changes.`,
      workedExample: `You hit a confusing \`401 invalid_token\` on a real staging endpoint. Rather than pasting the live bearer token, you redact it to \`{REDACTED}\` and ask the AI to explain likely causes. It suggests an expired token, a wrong scope, or a clock-skew issue — all plausible. You verify against your auth provider's docs, find the token had indeed expired, and refresh it. You got the answer fast *and* no secret ever left your machine. That is responsible AI use in one small loop.`,
      commonMistakes: `- Pasting real tokens, keys or customer data into a public AI tool
- Accepting a confident answer without checking the endpoint or field actually exists
- Assuming "AI wrote it" removes your responsibility for an escaped bug`,
      realWorldTip: `Before you paste anything into an AI tool, ask one question: "Would I be comfortable if this appeared on a public forum?" If not, redact it or don't paste it. That single reflex prevents almost every AI data-safety incident.`,
      exercise: `Choose an endpoint and use an AI tool end-to-end: generate test ideas and assertions for it, then validate them against the real API. As you go, redact anything sensitive, and write down (a) two things you verified and corrected, and (b) one thing you deliberately did not paste and why.`,
      reflectionQuestion: `What is your personal red line for what you will never paste into a public AI tool, and how will you enforce it under deadline pressure?`,
      knowledgeCheck: `Is it acceptable to paste a real production API token into a public AI chat tool to debug an error? (Answer: no — never paste real secrets, tokens or confidential data; redact and use synthetic values)`,
      completionChecklist: ['I can apply data-safety rules when using AI for testing', 'I can spot and verify AI hallucinations against the real API', 'I can state my own responsible-use policy for AI-assisted testing'],
      enhancements: {
        industryStory: `Early in the AI wave, a tester pasted a chunk of a log into a public chatbot to get help parsing an error. The log contained a live production API key. Within the hour, security had to rotate the key across every service that used it — a full afternoon of scramble for a two-minute shortcut. Nobody was fired, but the whole team learned the rule the hard way: redact first, always.`,
        visualAid: { type: 'comparison', title: 'Safe vs unsafe AI use in testing', headers: ['Situation', 'Unsafe', 'Safe'], rows: [['Debugging an auth error', 'Paste the real token', 'Redact token, paste the error only'], ['Sharing a response', 'Real customer data', 'Synthetic sample data'], ['Trusting output', 'Copy assertions blindly', 'Run and verify against real API'], ['Accountability', '"The AI said so"', 'You own the result'], ['Org policy', 'Ignore or unaware', 'Know it and follow it']] },
        davidTip: `My rule is simple and I never bend it: nothing goes into an AI tool that I wouldn't put on a whiteboard in the office lobby. Redact the secret, keep the question, get the help. You lose nothing and you protect everything.`,
        miniChallenge: `Take a realistic \`401\` or \`403\` error scenario, redact anything sensitive, and prompt an AI to explain likely causes. Verify its top suggestion against real documentation and note whether it was right.`,
        modelAnswer: `## Example\nA safe, effective troubleshooting prompt:\n\n\`\`\`\nAct as an API auth expert. Explain likely causes of this error and how I'd\nconfirm each. I have redacted all secrets — do NOT ask me to paste real ones.\nGET /accounts/{REDACTED} → 401 { "error": "invalid_token" }\nHeaders: Authorization: Bearer {REDACTED}\n\`\`\`\nExpected: causes such as expired token, wrong scope/audience, clock skew, or wrong environment — each with a verification step, and no request for the real token.`,
        badGood: { label: 'debugging with AI', bad: `Paste the full request including \`Authorization: Bearer eyJhbGci...\` (a live token) and the real customer id into a public chatbot.\nA secret has now left your control.`, good: `Paste the error and endpoint with \`Authorization: Bearer {REDACTED}\` and \`/accounts/{REDACTED}\`.\nSame help, zero exposure.` },
        managersReview: { intro: `If I reviewed how you use AI in your API testing, here is what I'd assess:`, strengths: ['You use AI to draft ideas, assertions and docs quickly', 'You verify every specific AI claim against the real API', 'You keep secrets and real data out of AI tools'], improvements: ['Redact consistently, every time, not just when you remember', 'Ask the AI to flag its own uncertainty so you know what to check', 'Break AI-written assertions once to prove they actually fail'], gaps: ['Trusting output without running it', 'No awareness of the org AI policy', 'Assuming "AI wrote it" shifts accountability away from you'] },
        portfolioBuilder: `Write a one-page "Responsible AI Use in API Testing" policy in your own words: what you use AI for, what you always verify, what you will never paste, and how you stay accountable. Add it to your portfolio — hiring managers increasingly ask exactly this.`,
        resourcePreview: { name: 'Responsible AI Testing Checklist', purpose: 'A pre-flight checklist for safe, verified AI-assisted testing.', whenToUse: 'Run through it before and after any AI-assisted testing task.', formats: ['PDF'] },
      },
    },
  ],
};
