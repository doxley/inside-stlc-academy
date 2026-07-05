// API Testing Masterclass — Module 4: Postman Deep Dive.
// Full lesson content (base fields + enhancements). Follows the Module 1 TEMPLATE:
// every lesson fills every base field and a rich `enhancements` block.
export default {
  courseSlug: 'api-testing-masterclass',
  moduleNumber: 4,
  lessons: [
    {
      lessonNumber: 1,
      title: 'Collections & Organising Requests',
      estimatedTime: '14 minute read',
      lessonOverview: `A collection is how you turn a pile of one-off requests into a reusable, shareable test asset. Getting the structure right early pays off for the rest of the course.`,
      learningObjectives: ['Create a collection and add requests to it', 'Organise requests into folders that mirror the API', 'Explain why saved collections beat one-off requests'],
      lessonNotes: `## What a collection is
A **collection** is a saved, ordered group of requests. It lives in the sidebar, can be exported as JSON, shared with your team, run end to end, and put into CI. It is the unit of work in Postman — everything else hangs off it.

## Folders give structure
Inside a collection you create **folders** to group related requests. Mirror the API: a folder per resource (\`Users\`, \`Orders\`, \`Auth\`). A newcomer should read the sidebar and understand the API without asking.

## Collection-level settings
A collection carries shared **auth**, **variables**, and **pre-request/test scripts** that every request inherits. Set auth once at the collection level rather than pasting a token into twenty requests.

## Why it matters
- Requests you can find are requests you'll re-run.
- A tidy collection becomes documentation, a regression suite, and your Module 10 portfolio piece.
- Naming matters: \`Create user — happy path\` beats \`New Request (3)\`.`,
      workedExample: `Create a collection \`Reqres API\`. Add folders \`Users\` and \`Auth\`. In \`Users\`, save three requests: \`GET List users\` (\`GET https://reqres.in/api/users\`), \`GET Single user\` (\`GET https://reqres.in/api/users/2\`), and \`POST Create user\`. In \`Auth\`, save \`POST Login\`. The sidebar now reads like a map of the API, and you can run the whole collection with one click.`,
      commonMistakes: `- Leaving requests unsaved so they vanish when the tab closes
- Naming everything \`New Request\` instead of describing the intent
- One flat list of 40 requests with no folders to navigate`,
      realWorldTip: `Treat your collection like source code: name things clearly, group logically, and export the JSON into version control so the team shares one source of truth.`,
      exercise: `In Postman, create a collection called \`API Masterclass — <your name>\`, add a \`Users\` folder, and save two GET requests into it with descriptive names.`,
      reflectionQuestion: `Why is a saved, well-named collection worth more than a scratch request you send once?`,
      knowledgeCheck: `What is the top-level container that groups related Postman requests? (Answer: a collection)`,
      completionChecklist: ['I can create a collection and add requests', 'I can organise requests into meaningful folders', 'I save and name requests clearly'],
      enhancements: {
        industryStory: `I inherited a project with 60 loose requests dumped into one collection, half named "Copy of Login". Nobody could find anything, so people rebuilt requests from scratch daily. We spent an afternoon folder-ing it by resource and renaming everything — the team's API work got visibly faster the next week.`,
        visualAid: { type: 'comparison', title: 'Messy vs organised collection', headers: ['Aspect', 'Messy', 'Organised'], rows: [['Structure', 'One flat list', 'Folders per resource'], ['Names', 'New Request (3)', 'GET Single user'], ['Auth', 'Pasted per request', 'Set once at collection level'], ['Reusable', 'Rarely re-run', 'Run whole collection in one click']] },
        davidTip: `I name requests in the format \`METHOD what-it-does\` — \`POST Create order — happy path\`. When you can read a collection top to bottom and understand the API, you've built something a team will actually use.`,
        miniChallenge: `Take five loose requests and reorganise them into at least two named folders that mirror the API's resources.`,
        modelAnswer: `## Example\nCollection \`Shop API\` → folder \`Products\` (\`GET List products\`, \`GET Single product\`, \`POST Create product\`) and folder \`Orders\` (\`POST Create order\`, \`GET Order status\`). Auth set once at the collection level.`,
        badGood: { label: 'request naming', bad: `Sidebar shows \`New Request\`, \`New Request (2)\`, \`Copy of New Request\` — nobody can tell them apart.`, good: `Sidebar shows \`GET List users\`, \`GET Single user\`, \`POST Create user\` — the intent is obvious at a glance.` },
        resourcePreview: { name: 'Collection Structure Template', purpose: 'A ready-made folder layout for a typical REST API.', whenToUse: 'Import it when you start a new collection.', formats: ['JSON'] },
      },
    },
    {
      lessonNumber: 2,
      title: 'Environments & Variables',
      estimatedTime: '16 minute read',
      lessonOverview: `Variables let one collection run against dev, staging and production without editing a single request. This is the difference between a demo and a real, reusable test suite.`,
      learningObjectives: ['Create environments and switch between them', 'Use variables to remove hardcoded values', 'Explain variable scopes and their precedence'],
      lessonNotes: `## Why variables
Hardcoding \`https://staging.api.com\` into 30 requests means 30 edits when the URL changes. Instead, define \`{{baseUrl}}\` once and reuse it. Reference any variable in a URL, header or body with double curly braces: \`{{baseUrl}}/users/{{userId}}\`.

## Environments
An **environment** is a named set of variables — \`Dev\`, \`Staging\`, \`Prod\`. Each defines its own \`baseUrl\`, \`apiKey\`, and so on. Switch the environment dropdown and the same collection now hits a different server. No request edits.

## Scopes and precedence
Postman resolves a variable from the narrowest scope outwards:
- **Local** (data/temporary) → **Environment** → **Collection** → **Global**

Set shared defaults at the **collection** scope; put per-environment values (URLs, keys) in the **environment**.

## Reading and writing in scripts
In scripts you read with \`pm.environment.get('baseUrl')\` and write with \`pm.environment.set('token', value)\`. Use \`pm.collectionVariables\` for collection scope. **Secrets** should be set as *secret* variable types so they aren't stored in plain text.`,
      workedExample: `Create a \`Dev\` environment with \`baseUrl = https://reqres.in/api\`. Change a request URL from \`https://reqres.in/api/users/2\` to \`{{baseUrl}}/users/{{userId}}\`, and set \`userId = 2\` in the environment. Now duplicate the environment as \`Staging\` with a different \`baseUrl\`. Switching the dropdown re-points every request instantly — you edited nothing in the request itself.`,
      commonMistakes: `- Hardcoding URLs and tokens directly into requests
- Forgetting to select an environment, so \`{{baseUrl}}\` resolves to nothing
- Confusing scopes — setting a value at collection scope but expecting it per environment`,
      realWorldTip: `Never paste a real API key or token as a plain variable you might export. Use Postman's *secret* variable type, and keep production credentials out of shared collections entirely.`,
      exercise: `Create a \`Dev\` environment with a \`baseUrl\` variable, then rewrite one of your saved requests to use \`{{baseUrl}}\` instead of the full URL. Confirm it still returns 200.`,
      reflectionQuestion: `If a variable exists at both environment and collection scope, which value wins, and why is that useful?`,
      knowledgeCheck: `What syntax references a variable inside a request URL or body? (Answer: double curly braces, e.g. {{baseUrl}})`,
      completionChecklist: ['I can create and switch environments', 'I can replace hardcoded values with variables', 'I understand variable scope and precedence'],
      enhancements: {
        industryStory: `A tester once ran a "cleanup" collection against production because the requests had prod URLs hardcoded and she forgot which tab was which. It deleted real records. After that we mandated \`{{baseUrl}}\` everywhere and made the environment dropdown the single thing you check before hitting Send.`,
        visualAid: { type: 'timeline', title: 'Variable resolution order', steps: [{ label: 'Local / data', detail: 'narrowest — from a data file or script' }, { label: 'Environment', detail: 'Dev / Staging / Prod values' }, { label: 'Collection', detail: 'shared defaults' }, { label: 'Global', detail: 'widest — across all collections' }] },
        davidTip: `The first thing I do on any new collection is create \`{{baseUrl}}\` and \`Dev\`/\`Staging\` environments. It takes two minutes and it's the single change that turns a toy into a reusable suite.`,
        miniChallenge: `Create a second environment (\`Staging\`) by duplicating \`Dev\`, give it a different \`baseUrl\`, and switch between them without editing any request.`,
        modelAnswer: `## Example\n\`Dev\`: \`baseUrl = https://reqres.in/api\`. \`Staging\`: \`baseUrl = https://staging.reqres.in/api\`. Request URL: \`{{baseUrl}}/users/{{userId}}\`. Flipping the dropdown re-points all requests with zero edits.`,
        badGood: { label: 'hardcoded vs variables', bad: `\`GET https://staging.api.com/users/2\` — the host and id are baked in; changing environment means editing every request.`, good: `\`GET {{baseUrl}}/users/{{userId}}\` — switch the environment dropdown and everything re-points automatically.` },
      },
    },
    {
      lessonNumber: 3,
      title: 'Writing Tests with pm.test',
      estimatedTime: '18 minute read',
      lessonOverview: `A request that isn't asserted is just a click. This lesson turns your requests into automated checks using Postman's built-in test API.`,
      learningObjectives: ['Write assertions with pm.test and pm.expect', 'Assert status codes, response bodies and headers', 'Read the Test Results tab to interpret pass/fail'],
      lessonNotes: `## Where tests live
Every request has a **Scripts → Post-response** (formerly "Tests") tab. Code there runs in JavaScript *after* the response arrives. Results show in the **Test Results** tab.

## The core pattern
Wrap each assertion in \`pm.test('name', () => { ... })\`. The name is what shows in results, so make it descriptive:

- \`pm.test('status is 200', () => { pm.response.to.have.status(200); });\`
- Parse the body once: \`const body = pm.response.json();\`
- Assert with \`pm.expect(body.id).to.eql(2);\`

## Common assertions
- Status: \`pm.response.to.have.status(201)\`
- Body value: \`pm.expect(body.email).to.eql('eve@reqres.in')\`
- Existence: \`pm.expect(body).to.have.property('token')\`
- Type: \`pm.expect(body.data).to.be.an('array')\`
- Header: \`pm.expect(pm.response.headers.get('Content-Type')).to.include('json')\`
- Response time: \`pm.expect(pm.response.responseTime).to.be.below(800)\`

## Why it matters
Assertions are what make the Collection Runner and Newman (Module 8) meaningful — green means the contract held, red means a real problem.`,
      workedExample: `On \`GET {{baseUrl}}/users/2\`, add to the Post-response script:\n\`\`\`\nconst body = pm.response.json();\npm.test('status is 200', () => {\n  pm.response.to.have.status(200);\n});\npm.test('returns the requested user', () => {\n  pm.expect(body.data.id).to.eql(2);\n  pm.expect(body.data).to.have.property('email');\n});\n\`\`\`\nSend it and open Test Results: two green ticks. Break the expected id to \`99\` and watch one turn red — that's the safety net working.`,
      commonMistakes: `- Only asserting the status code and never the body contents
- Calling \`pm.response.json()\` on a non-JSON response, which throws
- Writing one giant test instead of small, individually named checks`,
      realWorldTip: `Give each \`pm.test\` a name that reads like a sentence about the requirement. When a run goes red in CI, the test name alone should tell you what broke without opening the request.`,
      exercise: `Add three tests to one request: status is 200, the body has a specific property, and the response time is below 1000ms. Confirm all three pass.`,
      reflectionQuestion: `Why is asserting only the status code rarely enough to trust an API response?`,
      knowledgeCheck: `Which Postman function wraps a single named assertion? (Answer: pm.test)`,
      completionChecklist: ['I can write assertions with pm.test and pm.expect', 'I can assert status, body and headers', 'I can read the Test Results tab'],
      enhancements: {
        industryStory: `A regression suite of 200 requests was "all green" for months — then we noticed every single test only checked \`status 200\`. The API had been returning 200 with an empty body for one endpoint the whole time. We added body assertions and immediately found three more silent failures.`,
        visualAid: { type: 'comparison', title: 'Common pm assertions', headers: ['Check', 'Assertion'], rows: [['Status code', 'pm.response.to.have.status(201)'], ['Body value', "pm.expect(body.email).to.eql('eve@reqres.in')"], ['Property exists', "pm.expect(body).to.have.property('token')"], ['Is an array', "pm.expect(body.data).to.be.an('array')"], ['Response time', 'pm.expect(pm.response.responseTime).to.be.below(800)']] },
        davidTip: `I parse the body once into a \`const body\` at the top of the script, then write lots of tiny named tests against it. Small assertions fail loudly and precisely — big ones just tell you "something's wrong".`,
        miniChallenge: `Write a test that asserts the response is a JSON array and that it contains at least one item.`,
        modelAnswer: `## Example\n\`\`\`\nconst body = pm.response.json();\npm.test('data is a non-empty array', () => {\n  pm.expect(body.data).to.be.an('array');\n  pm.expect(body.data.length).to.be.above(0);\n});\n\`\`\``,
        badGood: { label: 'test coverage', bad: `\`pm.test('works', () => pm.response.to.have.status(200));\` — vague name, only checks status.`, good: `Separate named tests for status, each key body field and response time, so a failure points straight at the cause.` },
      },
    },
    {
      lessonNumber: 4,
      title: 'Pre-request Scripts & Chaining Requests',
      estimatedTime: '18 minute read',
      lessonOverview: `Real workflows need one request to feed the next — log in, capture the token, then use it. Pre-request scripts and variable-passing make Postman behave like a real client.`,
      learningObjectives: ['Use a pre-request script to prepare data before sending', 'Capture a value from one response and reuse it in the next', 'Explain the request execution order in Postman'],
      lessonNotes: `## Two script slots
Each request has a **Pre-request** script (runs *before* the request) and a **Post-response** script (runs *after*). Pre-request is for setup — building a timestamp, generating a random email, computing a signature. Post-response is for assertions and for capturing values.

## Chaining: the login → use-token pattern
1. \`POST /login\` returns a token.
2. In its **Post-response** script, save it:
   \`\`\`
   const body = pm.response.json();
   pm.environment.set('token', body.token);
   \`\`\`
3. The next request sends header \`Authorization: Bearer {{token}}\`.

Postman substitutes \`{{token}}\` at send time, so the second request uses the freshly captured value.

## Generating data in pre-request
\`\`\`
pm.environment.set('email', \`user_\${Date.now()}@test.com\`);
\`\`\`
Now the request body can use \`{{email}}\` for a guaranteed-unique value.

## Execution order
Pre-request script → request sent → response received → Post-response script. Inside the Collection Runner this repeats per request, top to bottom.`,
      workedExample: `Chain a login into a protected call. On \`POST {{baseUrl}}/login\` (body \`{"email":"eve.holt@reqres.in","password":"pistol"}\`), add a Post-response script:\n\`\`\`\nconst body = pm.response.json();\npm.test('token returned', () => pm.expect(body).to.have.property('token'));\npm.environment.set('token', body.token);\n\`\`\`\nThen create \`GET {{baseUrl}}/users/2\` with header \`Authorization: Bearer {{token}}\`. Run them in order — the second request automatically uses the captured token.`,
      commonMistakes: `- Capturing a value but referencing the wrong variable name later
- Putting capture logic in the pre-request script instead of post-response
- Running the second request alone and wondering why \`{{token}}\` is empty`,
      realWorldTip: `Generate unique data in a pre-request script (e.g. a timestamped email) so re-running a "create" request never fails on a duplicate. Repeatable tests are reliable tests.`,
      exercise: `Set up a two-request chain: a login that captures a token into an environment variable, and a follow-up request that sends that token in an Authorization header. Run them in order and confirm the second gets 200.`,
      reflectionQuestion: `Why must the value be captured in the post-response script rather than the pre-request script?`,
      knowledgeCheck: `In which script slot do you capture a value from the response for the next request? (Answer: the post-response script)`,
      completionChecklist: ['I can write a pre-request script to prepare data', 'I can capture a response value and reuse it', 'I understand the Postman request execution order'],
      enhancements: {
        industryStory: `A contractor hardcoded a bearer token into 40 requests. It expired every hour, so every morning the whole suite went red and someone re-pasted the token 40 times. We replaced it with a login request that captured the token into \`{{token}}\` once — the daily ritual disappeared overnight.`,
        visualAid: { type: 'timeline', title: 'Login → use-token chain', steps: [{ label: 'Pre-request', detail: 'prepare any setup data' }, { label: 'POST /login', detail: 'send credentials' }, { label: 'Capture', detail: "pm.environment.set('token', body.token)" }, { label: 'GET (protected)', detail: 'header uses {{token}}' }, { label: 'Assert', detail: 'confirm 200 + expected body' }] },
        davidTip: `Capturing the token once and referencing \`{{token}}\` everywhere is the single most useful Postman trick I teach. It turns a brittle demo into a suite that survives token expiry and re-runs cleanly.`,
        miniChallenge: `Add a pre-request script that generates a unique email with \`Date.now()\` and use \`{{email}}\` in a create-user request body.`,
        modelAnswer: `## Example\nPre-request: \`pm.environment.set('email', \\\`user_\${Date.now()}@test.com\\\`);\` Body: \`{"name":"Sam","email":"{{email}}"}\`. Each run sends a fresh, unique email, so the create never collides.`,
        badGood: { label: 'auth handling', bad: `A bearer token pasted into every request's header — expires hourly and must be replaced by hand everywhere.`, good: `A \`POST /login\` captures the token into \`{{token}}\`; every other request sends \`Authorization: Bearer {{token}}\`.` },
      },
    },
    {
      lessonNumber: 5,
      title: 'Data-Driven Testing with the Collection Runner',
      estimatedTime: '17 minute read',
      lessonOverview: `Run one request against many rows of data — dozens of inputs, one click. The Collection Runner plus a data file is how you test breadth without writing dozens of requests.`,
      learningObjectives: ['Run a collection or folder with the Collection Runner', 'Drive a request with a CSV or JSON data file', 'Read iteration results and spot failing rows'],
      lessonNotes: `## The Collection Runner
Open a collection and click **Run**. The Runner executes every request top to bottom, running each request's tests and showing a pass/fail summary. You choose the environment, iteration count, and delay.

## Data-driven testing
Attach a **data file** (CSV or JSON) and the Runner iterates once per row. Each row's columns become variables you reference with \`{{columnName}}\`. Access the same value in scripts with \`pm.iterationData.get('email')\`.

A CSV like:
\`\`\`
email,password,expectedStatus
eve.holt@reqres.in,pistol,200
missing@reqres.in,,400
\`\`\`
runs the login twice — once expecting 200, once expecting 400.

## Dynamic assertions per row
Read the expected value from the data and assert against it:
\`\`\`
pm.test('status matches data', () => {
  pm.response.to.have.status(Number(pm.iterationData.get('expectedStatus')));
});
\`\`\`

## Why it matters
This is boundary and equivalence-class testing at speed: valid, invalid, empty and edge inputs in one run, with a clear per-iteration report.`,
      workedExample: `Create \`data.csv\`:\n\`\`\`\nemail,password,expectedStatus\neve.holt@reqres.in,pistol,200\npeter@klaven,,400\n\`\`\`\nPoint \`POST {{baseUrl}}/login\` body at \`{"email":"{{email}}","password":"{{password}}"}\` and add:\n\`\`\`\npm.test('status matches expected', () => {\n  pm.response.to.have.status(Number(pm.iterationData.get('expectedStatus')));\n});\n\`\`\`\nRun the collection with the CSV attached. The Runner shows 2 iterations; each row's expected status is asserted independently.`,
      commonMistakes: `- CSV column names not matching the \`{{variable}}\` names in the request
- Forgetting that data-file values arrive as strings (cast with \`Number()\`)
- Selecting the wrong environment so \`{{baseUrl}}\` is empty during the run`,
      realWorldTip: `Keep your data file in the repo next to the collection. When a row fails, the Runner tells you exactly which iteration — so your test data doubles as living documentation of the cases you cover.`,
      exercise: `Build a small CSV of three login rows (valid, wrong password, missing password) with an \`expectedStatus\` column, then run the collection with the Runner and confirm each row asserts its own expected status.`,
      reflectionQuestion: `How does a data file let you test many input cases without duplicating the request?`,
      knowledgeCheck: `What Postman feature runs a request once per row of a data file? (Answer: the Collection Runner)`,
      completionChecklist: ['I can run a collection with the Collection Runner', 'I can drive a request from a CSV or JSON data file', 'I can read iteration results and find failing rows'],
      enhancements: {
        industryStory: `We needed to prove a validation endpoint rejected 30 malformed postcodes. Someone was about to build 30 requests by hand. Instead we made a 30-row CSV and one request — the whole matrix ran in seconds, and the failing-row report found two postcodes the dev had wrongly accepted.`,
        visualAid: { type: 'timeline', title: 'A data-driven run', steps: [{ label: 'Data file', detail: 'CSV/JSON, one row per case' }, { label: 'Open Runner', detail: 'select collection + environment' }, { label: 'Attach data', detail: 'columns become {{variables}}' }, { label: 'Run', detail: 'one iteration per row' }, { label: 'Read results', detail: 'per-iteration pass/fail' }] },
        davidTip: `Add an \`expectedStatus\` (or \`expectedError\`) column to your data file and assert against \`pm.iterationData.get(...)\`. One request then covers happy path, boundaries and invalid input in a single run.`,
        miniChallenge: `Add a fourth row to your CSV for an empty email, give it \`expectedStatus 400\`, and confirm the Runner asserts it correctly.`,
        modelAnswer: `## Example\nCSV rows: valid (200), wrong password (400), missing password (400), empty email (400). The request asserts \`pm.iterationData.get('expectedStatus')\`, so all four cases pass or fail on their own terms in one run.`,
        badGood: { label: 'testing many inputs', bad: `Thirty near-identical requests, each with a different email pasted in — impossible to maintain.`, good: `One request plus a thirty-row CSV; the Runner iterates and reports pass/fail per row.` },
        resourcePreview: { name: 'Data-Driven Test CSV Pack', purpose: 'Sample CSVs for valid, boundary and invalid cases.', whenToUse: 'Attach one when practising the Collection Runner.', formats: ['CSV', 'JSON'] },
      },
    },
    {
      lessonNumber: 6,
      title: 'Mock Servers & Documentation',
      estimatedTime: '20 minutes',
      lessonOverview: `Postman can fake an API before it exists and generate live docs from your collection. Both let testers add value early and keep the whole team in sync.`,
      learningObjectives: ['Create a mock server that returns example responses', 'Test against a mock before the real API is built', 'Generate and publish documentation from a collection'],
      lessonNotes: `## Mock servers
A **mock server** is a Postman-hosted endpoint that returns **saved example responses** instead of calling a real backend. You attach examples to a request (status, headers, body), create a mock from the collection, and Postman gives you a mock URL. Point \`{{baseUrl}}\` at that URL and your requests get realistic responses — before any backend exists.

## Why testers love mocks
- **Shift left**: write and validate tests against the agreed contract while devs are still building.
- **Stability**: mocks return the same response every time — perfect for developing assertions.
- **Isolation**: test your client logic without a flaky or rate-limited real service.

Postman can match examples by request path, method and query params, so one mock can serve several scenarios.

## Documentation
Every collection can auto-generate **documentation** from its requests, descriptions and saved examples. Add a description to each request and folder, then **Publish** the docs to get a shareable web page that stays in step with the collection.

## Why it matters
Mocks let you test early; auto-docs mean your collection is the single source of truth — the tests, the contract and the reference are one artefact.`,
      workedExample: `Take \`GET {{baseUrl}}/users/2\`. Send it once, then **Save Response → Save as example** so you have a \`200\` example with a JSON user body. Right-click the collection → **Mock collection**; Postman returns a mock URL like \`https://<id>.mock.pstmn.io\`. Set your \`Dev\` environment's \`baseUrl\` to that URL and re-send — you get the example back with no real backend involved. Then click **View documentation** to see the auto-generated page, add a request description, and **Publish**.`,
      commonMistakes: `- Creating a mock but saving no examples, so it returns 404 or empty
- Expecting a mock to contain real logic — it only replays saved examples
- Publishing docs once and letting them drift because requests lack descriptions`,
      realWorldTip: `When a backend team is a sprint behind, agree the contract, build a mock from example responses, and write your tests against it. When the real API lands, just repoint \`{{baseUrl}}\` — your test suite is already done.`,
      exercise: `Save an example response on one of your requests, create a mock server from the collection, repoint \`{{baseUrl}}\` at the mock URL, and confirm the request returns your example. Then add a description to the request and open the auto-generated documentation.`,
      reflectionQuestion: `How does a mock server let you write and validate tests before the real API exists?`,
      knowledgeCheck: `What does a Postman mock server return instead of calling a real backend? (Answer: saved example responses)`,
      completionChecklist: ['I can create a mock server from saved examples', 'I can point my collection at a mock and test against it', 'I can generate and publish documentation from a collection'],
      enhancements: {
        industryStory: `On one project the API was three weeks behind the UI. We took the agreed OpenAPI contract, saved example responses in Postman, and stood up a mock. The frontend and our test suite both built against it. When the real API shipped, we changed one variable — \`baseUrl\` — and 90% of the tests passed on the first run.`,
        visualAid: { type: 'timeline', title: 'Mock-first workflow', steps: [{ label: 'Agree contract', detail: 'endpoints, status, body shape' }, { label: 'Save examples', detail: 'attach example responses to requests' }, { label: 'Create mock', detail: 'Postman hosts a mock URL' }, { label: 'Point baseUrl', detail: 'run tests against the mock' }, { label: 'Swap to real API', detail: 'repoint baseUrl when backend lands' }] },
        davidTip: `Mock-first is my favourite way to shift left. You turn "we can't test yet, the API isn't ready" into "our tests are done and waiting". When the backend arrives you're validating, not starting.`,
        miniChallenge: `Save a second example on the same request with a \`404\` status and body, then work out how Postman decides which example the mock returns.`,
        modelAnswer: `## Example\nRequest \`GET /users/2\` has two examples: a \`200\` with a user body and a \`404\` with \`{"error":"Not found"}\`. Postman matches on method, path and query/response-code hints; you can also force one with the \`x-mock-response-code\` header. The mock replays whichever example matches.`,
        badGood: { label: 'testing before the API exists', bad: `"We can't test yet — the backend isn't built." Testing starts late and gets squeezed at the end.`, good: `Build a mock from the agreed contract, write tests against it, then repoint \`{{baseUrl}}\` when the real API lands.` },
        managersReview: { intro: `If I reviewed your Module 4 Postman work as a lead, I'd look for:`, strengths: ['A tidy collection with folders and clear names', 'Environments and \`{{variables}}\` instead of hardcoded values', 'Named \`pm.test\` assertions on status and body', 'A working request chain and a data-driven run'], improvements: ['Cover invalid and boundary cases, not just happy paths', 'Add descriptions so the docs are genuinely useful', 'Use secret variable types for any credentials'], gaps: ['No assertions beyond status codes', 'Everything in one flat, unnamed collection', 'Tokens or URLs hardcoded across many requests'] },
        portfolioBuilder: `Polish your \`API Masterclass — <your name>\` collection: folders per resource, \`{{baseUrl}}\` with Dev/Staging environments, \`pm.test\` assertions on each request, one login→token chain, one data-driven run, and published documentation. Export the JSON — this is a strong Module 10 portfolio artefact and something you can show in an interview.`,
        resourcePreview: { name: 'Postman Mock & Docs Guide', purpose: 'Step-by-step for creating mocks and publishing collection docs.', whenToUse: 'Follow it when a backend is behind and you need to test early.', formats: ['PDF'] },
      },
    },
  ],
};
