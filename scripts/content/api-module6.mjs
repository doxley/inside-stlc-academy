// API Testing Masterclass — Module 6: REST API Testing.
// Full lesson content (base fields + enhancements). Mirrors the Module 1 template:
// every lesson fills every base field and a rich `enhancements` block.
export default {
  courseSlug: 'api-testing-masterclass',
  moduleNumber: 6,
  lessons: [
    {
      lessonNumber: 1,
      title: 'Designing an API Test Strategy',
      estimatedTime: '14 minute read',
      lessonOverview: `Before you fire a single request, you need a plan. A good API test strategy focuses your effort on where the risk actually lives — not on testing everything equally.`,
      learningObjectives: ['Build a risk-based test strategy for an API', 'Identify the highest-risk endpoints and behaviours', 'Decide what to test, how much, and in what order'],
      lessonNotes: `## Start with risk, not coverage
You can never test everything, so a strategy is about **prioritising**. Ask: which endpoints, if they broke, would hurt the business or the user most? Those get the deepest coverage. A \`POST /orders\` that takes money matters far more than a \`GET /health\` that returns \`ok\`.

## What a strategy answers
- **Scope** — which endpoints and flows are in and out
- **Depth** — positive only, or full negative and boundary coverage
- **Priority** — the order you'll tackle things in
- **Data** — what test data and accounts you need

## Rate each endpoint by risk
Score each endpoint on **likelihood of failure** and **impact if it fails**. Payment, auth and data-mutating endpoints (\`POST\`, \`PUT\`, \`DELETE\`) usually top the list. Read-only \`GET\`s on stable data sit lower.

## Map the critical journeys
Real value lives in **flows**, not single calls: register → log in → create → read. Your strategy should name the two or three journeys that must never break, and guarantee they're covered end to end.`,
      workedExample: `For a shop API you'd rank: \`POST /orders\` (high — takes payment), \`PUT /users/{id}\` (high — changes stored data), \`GET /products\` (medium — customer-facing but read-only), \`GET /health\` (low). You then plan deep positive + negative + boundary tests for the two high-risk endpoints, and lighter smoke checks for the rest.`,
      commonMistakes: `- Testing every endpoint to the same depth regardless of risk
- Writing dozens of happy-path tests and skipping the risky mutations
- Having no plan and just poking endpoints until you get bored`,
      realWorldTip: `A one-page risk-ranked list of endpoints is worth more than a 50-page test plan nobody reads. Rank by impact, test the top of the list hardest.`,
      exercise: `Open \`https://reqres.in\`. List its main endpoints (\`GET /api/users\`, \`POST /api/users\`, \`PUT /api/users/{id}\`, \`DELETE /api/users/{id}\`, \`POST /api/login\`) and rank them high/medium/low by risk, with one line of reasoning each.`,
      reflectionQuestion: `Which two of your ranked endpoints would you test first, and why?`,
      knowledgeCheck: `In a risk-based strategy, what two factors decide how much you test an endpoint? (Answer: likelihood of failure and impact if it fails)`,
      completionChecklist: ['I can rank endpoints by risk', 'I can define scope, depth and priority for an API', 'I can identify the critical journeys that must not break'],
      enhancements: {
        industryStory: `A team I joined had 400 API tests — 380 of them hammered a read-only \`GET /catalogue\` endpoint, and just 20 touched checkout. Their coverage number looked great, yet a payment bug shipped. We re-ranked by risk, cut the catalogue tests, and tripled the checkout coverage. Fewer tests, far more protection.`,
        visualAid: { type: 'comparison', title: 'Risk-ranking endpoints', headers: ['Endpoint', 'Impact if broken', 'Priority'], rows: [['POST /orders', 'Takes money — critical', 'High'], ['PUT /users/{id}', 'Corrupts stored data', 'High'], ['GET /products', 'Customer sees wrong list', 'Medium'], ['GET /health', 'Monitoring only', 'Low']] },
        davidTip: `I always start a new API by writing the endpoints on one page and scoring each out of ten for risk. That page becomes my plan. It takes twenty minutes and it stops me wasting days testing things that barely matter.`,
        miniChallenge: `Pick any public API you know and write its three highest-risk endpoints in priority order, one line of reasoning each.`,
        modelAnswer: `## Example\n1) \`POST /api/login\` — auth failure locks everyone out. 2) \`POST /api/users\` — creates records; bad data spreads downstream. 3) \`GET /api/users\` — read-only, lower blast radius, still customer-facing.`,
        resourcePreview: { name: 'API Risk-Ranking Template', purpose: 'A one-page grid to score endpoints by likelihood and impact.', whenToUse: 'Fill it in before you start testing any new API.', formats: ['PDF', 'XLSX'] },
      },
    },
    {
      lessonNumber: 2,
      title: 'Positive & Negative Testing',
      estimatedTime: '15 minute read',
      lessonOverview: `Positive tests prove the API works when everything is right. Negative tests prove it fails safely when things are wrong. You need both — and the negatives usually find the bugs.`,
      learningObjectives: ['Distinguish positive from negative testing', 'Write valid-input tests that assert correct success responses', 'Write invalid-input tests that assert correct error responses'],
      lessonNotes: `## Positive testing (the happy path)
Send **valid** input and confirm the API does the right thing: correct status (\`200\`/\`201\`), correct body, data actually changed. Example: \`POST /api/users\` with a full valid body should return \`201 Created\` and echo the new record with an \`id\`.

## Negative testing (the unhappy path)
Send **invalid or malicious** input and confirm the API rejects it *cleanly*. A good API returns a \`4xx\` with a helpful message — not a \`500\`, not a silent \`200\`. Examples:
- Missing required field → \`400 Bad Request\`
- Wrong data type (\`"age": "cat"\`) → \`400\`
- No auth token → \`401 Unauthorized\`
- Valid token, forbidden resource → \`403\`

## The rule that catches bugs
For every positive test, ask *"what's the wrong version of this?"* Most defects live in how an API handles bad input, not good input. Teams over-invest in happy paths and get burned by the negatives.

## Assert the failure properly
A negative test isn't done when you see an error — assert the **exact** status code and that the error body explains the problem. A \`500\` where you expected a \`400\` is itself a bug.`,
      workedExample: `Positive: \`POST /api/register\` on reqres.in with \`{"email":"eve.holt@reqres.in","password":"pistol"}\` → \`200 OK\` and a body containing a \`token\`. Negative: the same call with the password removed → \`400 Bad Request\` and body \`{"error":"Missing password"}\`. Two tests, two very different — and both correct — outcomes.`,
      commonMistakes: `- Writing only happy-path tests and calling the endpoint "covered"
- Accepting any error as a pass instead of asserting the exact status code
- Treating a \`500\` on bad input as acceptable — it should be a \`4xx\``,
      realWorldTip: `For every positive test you write, write at least one negative. The negatives are where the real defects hide, and where a strong API earns its trust.`,
      exercise: `On reqres.in, run \`POST /api/register\` twice: once with a valid email and password (expect \`200\` + token), once with the password removed (expect \`400\` + "Missing password"). Note both status codes and bodies.`,
      reflectionQuestion: `Why is a \`500\` response to bad user input usually a bug rather than a correct rejection?`,
      knowledgeCheck: `Which status-code family should an API return when a client sends invalid input? (Answer: 4xx — most commonly 400 Bad Request)`,
      completionChecklist: ['I can write a positive test asserting a correct success response', 'I can write a negative test asserting a correct error response', 'I check the exact status code, not just "an error"'],
      enhancements: {
        industryStory: `A checkout API happily returned \`200 OK\` when the price field was missing — it just stored \`£0.00\`. Every happy-path test passed. The first negative test we wrote — "send it with no price" — turned green when it should have been red, and we'd found a live money-losing bug in ten minutes.`,
        visualAid: { type: 'comparison', title: 'Positive vs negative testing', headers: ['Aspect', 'Positive', 'Negative'], rows: [['Input', 'Valid', 'Invalid / missing / malicious'], ['Expected status', '2xx', '4xx'], ['Proves', 'It works when right', 'It fails safely when wrong'], ['Finds', 'Basic breakage', 'Most real defects']] },
        davidTip: `When I interview testers, I ask them to test a login. The ones who only try correct credentials get a polite nod. The ones who ask "what if the password is empty, or 5000 characters, or contains SQL?" get the job.`,
        badGood: { label: 'a negative test', bad: `Sends a bad payload, sees an error, marks the test passed — never checks whether it was a \`400\` or a \`500\`.`, good: `Sends a bad payload and asserts exactly \`400 Bad Request\` with an error body naming the missing field.` },
        miniChallenge: `Take any \`POST\` endpoint on reqres.in and write three negative cases: a missing field, a wrong data type, and an empty body. Predict each status code before you send it.`,
        modelAnswer: `## Example\nMissing field → \`400\`; wrong type → \`400\`; empty body → \`400\`. On reqres.in the register/login endpoints return \`400\` with a descriptive \`error\` message; a \`500\` on any of these would be a defect worth raising.`,
      },
    },
    {
      lessonNumber: 3,
      title: 'Boundary & Edge Cases',
      estimatedTime: '14 minute read',
      lessonOverview: `Bugs love the edges. Boundary and equivalence testing are how you find the most defects with the fewest tests — by targeting the values where behaviour changes.`,
      learningObjectives: ['Apply equivalence partitioning to API inputs', 'Test the boundaries where behaviour changes', 'Identify high-value edge cases for APIs'],
      lessonNotes: `## Equivalence partitioning
Group inputs that should behave the same into **partitions**, then test one value per partition instead of thousands. If an \`age\` field accepts \`18–65\`, you have three partitions: below 18 (invalid), 18–65 (valid), above 65 (invalid). One representative value from each is usually enough.

## Boundary value analysis
Bugs cluster at the **edges** of a partition — off-by-one errors are everywhere. For an \`18–65\` range, test \`17, 18, 19\` and \`64, 65, 66\`. The boundary and the values either side catch \`>\` vs \`>=\` mistakes that a value like \`40\` never would.

## Edge cases that matter for APIs
- **Empty and null** — \`""\`, \`null\`, missing field
- **Zero and negatives** — \`0\`, \`-1\` on quantities or ids
- **Very large values** — huge numbers, long strings, big page sizes
- **Pagination edges** — \`page=0\`, a page beyond the last, \`per_page=1\`
- **Special characters** — spaces, unicode, emoji, quotes

## Why this is efficient
Boundary and equivalence thinking gives you the **most coverage per test**. Three well-chosen values around a limit beat a hundred random ones in the safe middle.`,
      workedExample: `reqres.in supports pagination: \`GET /api/users?page=2\`. Test the edges — \`page=1\` (first), a page past the end like \`page=99\` (expect an empty \`data\` array, still \`200\`), \`page=0\`, and \`page=-1\`. Also try \`per_page=1\` and a very large \`per_page\`. You're probing where the pagination logic changes behaviour, not testing "page 2" ten times.`,
      commonMistakes: `- Only testing "nice" middle values and never the boundaries
- Testing every possible value instead of one per equivalence partition
- Forgetting empty, null, zero and negative as edge cases`,
      realWorldTip: `When you find a numeric or length limit, always test the value, one below, and one above. Off-by-one errors at boundaries are among the most common bugs in software.`,
      exercise: `On reqres.in, probe pagination edges with \`GET /api/users?page=1\`, \`?page=99\`, \`?page=0\`. Record each status code and whether \`data\` is populated or empty, and note anything that surprises you.`,
      reflectionQuestion: `Why do three values around a boundary find more bugs than one value in the middle of the valid range?`,
      knowledgeCheck: `For an input that accepts 1–100, which values best test the upper boundary? (Answer: 99, 100 and 101)`,
      completionChecklist: ['I can split an input into equivalence partitions', 'I can pick boundary values that expose off-by-one bugs', 'I test empty, null, zero and negative edge cases'],
      enhancements: {
        industryStory: `A booking API let you reserve up to 10 seats. The developer wrote \`if (seats > 10) reject\` — so 10 worked, and 11 failed, but nobody tested the boundary. Turned out a separate rule capped it at 9, and \`10\` silently double-booked. One boundary test at exactly the limit found a bug that had been live for months.`,
        visualAid: { type: 'comparison', title: 'Equivalence partitions for age (valid 18–65)', headers: ['Partition', 'Example value', 'Expected'], rows: [['Below range', '17', 'Reject (400)'], ['In range', '40', 'Accept (2xx)'], ['At lower edge', '18', 'Accept'], ['At upper edge', '65', 'Accept'], ['Above range', '66', 'Reject (400)']] },
        davidTip: `The three questions I ask of any field: what's the smallest legal value, what's the largest, and what happens one step beyond each? Answer those and you've found most of the bugs before you've finished your coffee.`,
        badGood: { label: 'testing a numeric limit', bad: `Tests \`page=2\` and \`page=3\` — both comfortably valid — and declares pagination covered.`, good: `Tests \`page=0\`, \`page=1\`, the last valid page, and one page beyond it, asserting status and whether \`data\` is empty.` },
        miniChallenge: `Pick any field with a limit (a length, a range, a page size) and list the exact values you'd test around its boundary. Aim for five values.`,
        modelAnswer: `## Example\nFor a username limited to 20 characters: test lengths \`0\`, \`1\`, \`19\`, \`20\`, \`21\`. Zero checks empty handling; 19–21 straddle the boundary to expose a \`<\` vs \`<=\` error.`,
      },
    },
    {
      lessonNumber: 4,
      title: 'End-to-End CRUD Flows',
      estimatedTime: '20 minutes',
      lessonOverview: `Real users don't send one request — they create, read, update and delete in sequence. This lesson chains a full CRUD flow, passing ids from one call to the next.`,
      learningObjectives: ['Chain a full Create-Read-Update-Delete flow', 'Pass an id from one request into the next', 'Verify each step actually persisted before the next runs'],
      lessonNotes: `## Why flows, not single calls
A \`POST\` might return \`201 Created\`, but did the record actually persist? The only way to know is to **read it back**. CRUD flows test the API the way it's really used — as a sequence where each step depends on the last.

## The four steps
1. **Create** — \`POST /users\` with a body → expect \`201\` and a new \`id\`
2. **Read** — \`GET /users/{id}\` → expect \`200\` and the data you just sent
3. **Update** — \`PUT /users/{id}\` with changes → expect \`200\` and the changed fields
4. **Delete** — \`DELETE /users/{id}\` → expect \`204 No Content\`, then a follow-up \`GET\` should return \`404\`

## Chaining the id
The magic is passing the \`id\` from Create into the next three calls. In Postman you save it to a variable in a test script — \`pm.collectionVariables.set('userId', pm.response.json().id)\` — then use \`{{userId}}\` in the later request URLs.

## Confirm, don't assume
Each step should **prove** the previous one worked. The strongest CRUD test ends by deleting the record and confirming a \`GET\` now returns \`404\` — that closes the loop and leaves no test data behind.`,
      workedExample: `Against reqres.in (note: it mocks persistence, so it's ideal for learning the flow): \`POST /api/users\` \`{"name":"Ada","job":"tester"}\` → \`201\` + \`{"id":"...","createdAt":"..."}\`. Save the id. \`GET /api/users/2\` → \`200\`. \`PUT /api/users/2\` \`{"name":"Ada","job":"lead"}\` → \`200\` with \`updatedAt\` and the new job. \`DELETE /api/users/2\` → \`204\`. On a real API you'd then \`GET /api/users/2\` and expect \`404\`.`,
      commonMistakes: `- Checking only the \`POST\` response and never reading the record back
- Hard-coding an id instead of chaining the one you just created
- Leaving test data behind — never deleting what you created`,
      realWorldTip: `A create isn't proven until you've read it back and a delete isn't proven until the follow-up read returns \`404\`. Always close the loop.`,
      exercise: `In Postman, build a four-request CRUD flow against reqres.in: \`POST /api/users\`, save the returned id to a collection variable, then \`GET\`, \`PUT\` and \`DELETE\` using \`{{userId}}\`. Assert the status code at each step (\`201\`, \`200\`, \`200\`, \`204\`).`,
      reflectionQuestion: `Why is reading a record back after creating it a stronger test than trusting the \`201\` response alone?`,
      knowledgeCheck: `After a successful \`DELETE /users/{id}\`, what should a follow-up \`GET /users/{id}\` return on a real API? (Answer: 404 Not Found)`,
      completionChecklist: ['I can chain Create → Read → Update → Delete in Postman', 'I can pass an id from one request into the next with a variable', 'I confirm each step persisted before moving on', 'I clean up the data I create'],
      enhancements: {
        industryStory: `A team's \`POST /accounts\` returned a proud \`201 Created\` on every call, and their tests passed for months. A CRUD flow — create then immediately read back — revealed the write was being swallowed by a broken queue: the \`201\` was a lie and nothing persisted. One \`GET\` after the \`POST\` would have caught it on day one.`,
        visualAid: { type: 'timeline', title: 'A full CRUD flow', steps: [{ label: 'Create', detail: 'POST /users → 201 + new id (save it)' }, { label: 'Read', detail: 'GET /users/{id} → 200 + your data' }, { label: 'Update', detail: 'PUT /users/{id} → 200 + changed fields' }, { label: 'Delete', detail: 'DELETE /users/{id} → 204' }, { label: 'Confirm', detail: 'GET /users/{id} → 404 (gone)' }] },
        davidTip: `I chain the created id into a Postman collection variable every single time. It turns four separate requests into one honest story, and it means my tests never rely on data someone else might have deleted.`,
        badGood: { label: 'a CRUD test', bad: `Sends a \`POST\`, sees \`201\`, and stops — the record may never have persisted and the id is thrown away.`, good: `Saves the id, reads it back, updates it, deletes it, then confirms a final \`GET\` returns \`404\` — proving every step.` },
        miniChallenge: `Build the CRUD flow, then add one assertion to the Read step that checks a field you sent in Create actually came back unchanged.`,
        modelAnswer: `## Example\nIn the \`GET\` step's test tab: \`pm.test('name persisted', () => pm.expect(pm.response.json().name).to.eql('Ada'));\`. This proves the Create not only returned \`201\` but stored the value correctly.`,
      },
    },
    {
      lessonNumber: 5,
      title: 'Data Validation & Response Assertions',
      estimatedTime: '16 minute read',
      lessonOverview: `A status code alone never proves an API is correct. This lesson covers the full set of assertions — status, body, schema, headers and response time — that make a test trustworthy.`,
      learningObjectives: ['Assert on status, body, schema, headers and response time', 'Validate a response against an expected structure', 'Write assertions that fail loudly when data is wrong'],
      lessonNotes: `## Five things worth asserting
1. **Status code** — necessary, never sufficient
2. **Body values** — the actual data is correct (\`name\`, \`id\`, totals)
3. **Schema / structure** — the right fields exist, of the right types
4. **Headers** — \`Content-Type: application/json\`, caching, custom headers
5. **Response time** — it responded within an acceptable limit

## Body vs schema
Asserting **values** checks *this* response is right (\`email === "eve@x.com"\`). Asserting **schema** checks *every* response has the right shape (\`email\` is always a string, \`id\` always a number). Schema validation catches whole classes of bugs — a field that vanishes, or a number that arrives as a string.

## In Postman
Assertions live in the **Tests** tab as JavaScript:
- \`pm.response.to.have.status(200)\`
- \`pm.expect(pm.response.json().name).to.eql('Ada')\`
- \`pm.expect(pm.response.responseTime).to.be.below(800)\`
- Schema: \`pm.response.to.have.jsonSchema(schema)\`

## Fail loudly, on purpose
A test that can't fail is worthless. Deliberately break an assertion once and watch it go red — that's how you know it's actually checking something, not just passing by default.`,
      workedExample: `\`GET https://reqres.in/api/users/2\` → assert: status \`200\`; \`Content-Type\` header contains \`application/json\`; \`responseTime\` below \`1000\`ms; body \`data.id\` equals \`2\`; and a schema check that \`data\` has \`id\` (number), \`email\` (string), \`first_name\` (string). Five assertions, five different failure modes covered.`,
      commonMistakes: `- Asserting only the status code and ignoring the body
- Never checking headers — auth and content-type bugs hide there
- Writing tests you've never seen fail, so you don't know they work`,
      realWorldTip: `The strongest tests assert value AND shape: the data is right today, and the structure will still be right tomorrow when the payload changes. Add a response-time check to catch silent performance regressions.`,
      exercise: `In Postman, \`GET https://reqres.in/api/users/2\` and add four tests: status is \`200\`, \`responseTime\` below \`1000\`, \`data.id\` equals \`2\`, and \`Content-Type\` header includes \`application/json\`. Then break one on purpose and confirm it goes red.`,
      reflectionQuestion: `What kind of bug does schema validation catch that a single value assertion would miss?`,
      knowledgeCheck: `Besides the status code, name three things worth asserting on a response. (Answer: body values, schema/structure, headers — and response time)`,
      completionChecklist: ['I can assert on status, body, schema, headers and response time', 'I can validate a response against an expected structure', 'I have watched an assertion fail so I trust it works'],
      enhancements: {
        industryStory: `An API quietly changed \`price\` from a number (\`9.99\`) to a string (\`"9.99"\`). Every value assertion still passed — the value looked right. A downstream service that did maths on it broke in production. After that we added a schema check on every response, and a type change like that could never sneak past again.`,
        visualAid: { type: 'comparison', title: 'What each assertion catches', headers: ['Assertion', 'Catches', 'Example'], rows: [['Status', 'Wrong outcome', 'Expected 200, got 500'], ['Body value', 'Wrong data', 'name is "Bob" not "Ada"'], ['Schema', 'Wrong shape/type', 'price is a string not a number'], ['Header', 'Wrong metadata', 'Content-Type is text/html'], ['Response time', 'Slow regression', 'Took 4s, limit was 1s']] },
        davidTip: `My rule for a "done" API test: it asserts the shape as well as the value, and I have watched it fail at least once. A test I've never seen go red is a test I don't trust.`,
        badGood: { label: 'a response assertion', bad: `\`pm.response.to.have.status(200);\` — and nothing else. Passes on an empty body, a renamed field, or a wrong type.`, good: `Checks status, asserts \`data.email\` equals the expected value, validates the JSON schema, and asserts \`responseTime\` is under 1000ms.` },
        miniChallenge: `Add a JSON schema assertion to a reqres.in \`GET /api/users/2\` request that requires \`data.id\` to be a number and \`data.email\` to be a string. Break the type in the schema and watch it fail.`,
        modelAnswer: `## Example\n\`const schema = { type:'object', properties:{ data:{ type:'object', required:['id','email'], properties:{ id:{type:'number'}, email:{type:'string'} } } } };\`\n\`pm.test('schema', () => pm.response.to.have.jsonSchema(schema));\``,
      },
    },
    {
      lessonNumber: 6,
      title: 'Error Handling & Resilience Testing',
      estimatedTime: '18 minutes',
      lessonOverview: `The final and most senior REST skill: proving the API fails gracefully. You'll test bad payloads, missing fields, and how the API distinguishes client errors (4xx) from server errors (5xx).`,
      learningObjectives: ['Test how an API handles malformed and incomplete requests', 'Distinguish correct 4xx client errors from 5xx server errors', 'Assess whether error responses are safe, clear and consistent'],
      lessonNotes: `## Resilience is about failing well
Any API can succeed on good input. A **resilient** API fails predictably on bad input: the right status code, a clear message, no crash, and no leaked internals. This is where senior testers earn their reputation.

## The two error families
- **\`4xx\` — the client's fault.** Bad request, missing field, no auth, forbidden, not found. The API is working correctly by rejecting you.
- **\`5xx\` — the server's fault.** The API broke trying to handle the request. A \`500\` on *bad user input* is almost always a bug — the API should have returned a \`4xx\` instead.

## What to throw at it
- **Malformed JSON** — a broken body like \`{"name":\` → expect \`400\`, not \`500\`
- **Missing required fields** → \`400\` naming the field
- **Wrong types** — a string where a number is expected → \`400\`
- **Unauthorised access** — no or bad token → \`401\`/\`403\`
- **Non-existent resource** — \`GET /users/999999\` → \`404\`

## Judge the error, not just the code
Read the error **body**. Is it clear enough to act on? Does it leak stack traces, SQL or internal paths (a security risk)? Is it **consistent** across endpoints? A resilient API returns the same shape of error everywhere, tells you what went wrong, and never exposes its guts.`,
      workedExample: `Against reqres.in: \`GET /api/users/23\` (no such user) → \`404\` with an empty body — a clean not-found. \`POST /api/login\` with \`{"email":"peter@klaven"}\` (no password) → \`400\` and \`{"error":"Missing password"}\` — a clear client error. Now imagine sending genuinely broken JSON: a resilient API answers \`400\`; if it answers \`500\` with a stack trace, you've found both a robustness bug and a security leak.`,
      commonMistakes: `- Treating a \`500\` on bad input as acceptable — it should be a \`4xx\`
- Checking the error status but never reading the error message
- Missing that an error response leaks stack traces or internal detail`,
      realWorldTip: `The dividing line is simple: \`4xx\` means "you sent something wrong", \`5xx\` means "the API broke". If bad user input produces a \`5xx\`, the API isn't handling errors — it's crashing politely.`,
      exercise: `On reqres.in, run three error cases: \`GET /api/users/999\` (expect \`404\`), \`POST /api/login\` with email only (expect \`400\` + "Missing password"), and \`POST /api/register\` with an empty body (expect \`400\`). For each, record the status code AND the error body, and note whether the message is clear and safe.`,
      reflectionQuestion: `Why is a \`500\` response to malformed user input a bug, while a \`400\` for the same input is correct behaviour?`,
      knowledgeCheck: `What is the key difference between a 4xx and a 5xx status code? (Answer: 4xx is a client error — the request was wrong; 5xx is a server error — the API failed to handle it)`,
      completionChecklist: ['I can test malformed, incomplete and unauthorised requests', 'I can tell a correct 4xx from a buggy 5xx', 'I judge error messages for clarity, consistency and safety'],
      enhancements: {
        industryStory: `A fintech API I audited returned a \`500\` with a full Java stack trace whenever a field was missing — exposing framework versions, class names and a database table. It was two bugs in one: it should have been a \`400\`, and it should never have leaked internals. We reported it as a security issue, not just a test failure. That's the difference between a tester and a senior tester.`,
        visualAid: { type: 'comparison', title: 'Reading error responses', headers: ['Scenario', 'Correct response', 'Red flag'], rows: [['Missing field', '400 + clear message', '500, or silent 200'], ['No auth token', '401 Unauthorized', '500, or 200 with data'], ['Unknown resource', '404 Not Found', '500, or empty 200'], ['Malformed JSON', '400 Bad Request', '500 + stack trace (leak)']] },
        davidTip: `When I test error handling I always read the body, not just the code. A \`400\` that says "invalid" tells me nothing; a \`400\` that says "email must be a valid address" tells the client exactly how to fix it. And if I ever see a stack trace in a response, I stop testing and raise a security ticket.`,
        badGood: { label: 'error-handling assessment', bad: `Sends a bad payload, sees a \`500\`, records "returns an error — pass". Misses that a \`500\` on client input is a defect and that the body leaks internals.`, good: `Asserts exactly \`400\`, reads the body for a clear actionable message, and flags any leaked stack trace as a security risk.` },
        miniChallenge: `Send genuinely malformed JSON (e.g. \`{"email":\`) to a reqres.in \`POST\` endpoint. Record the status and body, and judge: is it a clean \`4xx\`, and is the message safe to show a user?`,
        modelAnswer: `## Example\nMalformed JSON should return \`400 Bad Request\` with a generic message like "Invalid request body" — no stack trace, no internal paths. A \`500\` here would be a robustness bug; a leaked stack trace would be a security finding. Record both the status and the exact body so the developer can reproduce it.`,
        managersReview: { intro: `If I reviewed your REST testing work as a lead at the end of this module, here's what I'd look for:`, strengths: ['A risk-ranked strategy driving where effort goes', 'Positive AND negative tests, with exact status assertions', 'Full CRUD flows that chain ids and clean up after themselves', 'Assertions on status, body, schema, headers and response time', 'Error tests that distinguish 4xx from 5xx and judge the message'], improvements: ['Add response-time assertions to catch silent performance regressions', 'Standardise your expected-error shapes across the collection', 'Add schema validation to every read to catch type drift'], gaps: ['Only happy-path coverage with no negatives', 'Trusting a 2xx without reading the body back', 'Accepting a 500 on bad input as "an error, so it passes"', 'Never noticing an error response that leaks internal detail'] },
        portfolioBuilder: `Build a "REST API Test Suite" Postman collection against reqres.in for your portfolio: a full CRUD flow with chained ids, a set of positive and negative tests with exact status assertions, boundary tests on pagination, schema validation on reads, and an error-handling folder covering 400/401/404 with judged messages. Export the collection JSON — this is a strong Module 10 artefact.`,
        resourcePreview: { name: 'REST Testing Assertion Library', purpose: 'Copy-paste Postman test snippets for status, body, schema, headers, response time and common error checks.', whenToUse: 'Reach for it whenever you build a new REST test in Postman.', formats: ['JSON', 'PDF'] },
      },
    },
  ],
};
