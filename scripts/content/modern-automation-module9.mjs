// Modern Test Automation Bootcamp — Module 9: API Automation with Playwright.
// Playwright is not just a browser tool. Its request fixture and APIRequestContext
// make it a capable API testing client, and the real payoff is combining API and
// UI automation in one suite. All code targets modern @playwright/test + TypeScript.
export default {
  courseSlug: 'modern-test-automation-bootcamp',
  moduleNumber: 9,
  lessonsPrefix: 'modern-automation',
  enhPrefix: 'modern-automation',
  enhSep: '-',
  lessons: [
    {
      lessonNumber: 1,
      title: 'Why API Tests',
      estimatedTime: '16 minute read',
      lessonOverview: `The middle of the test pyramid is where automation earns its keep: API tests are faster and steadier than UI tests, yet exercise real integrated behaviour that unit tests cannot. This lesson is about knowing what belongs at the API level and why.`,
      learningObjectives: [
        'Place API tests correctly in the test pyramid relative to unit and UI tests',
        'Explain the speed, stability and coverage advantages of testing at the API level',
        'Decide which behaviours belong at the API level rather than the UI',
      ],
      lessonNotes: `## The middle of the pyramid
The test pyramid has unit tests at the base (many, fast, isolated), UI or end-to-end tests at the top (few, slow, integrated), and **API tests** in the broad middle. That middle layer is where you get most of the confidence of an end-to-end test for a fraction of the cost.

An API test sends an HTTP request to a running service and asserts on the response. There is no browser, no rendering, no waiting for animations — just a request and a structured reply. That difference drives every advantage below.

## Speed
A UI test drives a real browser: it launches a context, loads pages, waits for elements, and re-renders on every interaction. An API test skips all of it. A request that takes a browser several seconds to reach through clicks and navigation is a single call at the API level, often in tens of milliseconds. Suites that would take an hour through the UI finish in minutes at the API.

## Stability
Most flakiness lives in the UI: timing, animation, layout shifts, third-party widgets. An API response is deterministic — the same request yields the same shape every time. There is nothing to auto-wait for beyond the response itself. When a test fails at the API level, it is far more likely to be a genuine defect than a timing artefact.

## Coverage the UI cannot give
The UI can only reach what a user can click. The API can reach everything: error paths, validation rules, edge-case payloads, permission boundaries, pagination limits. You can send a malformed request that no form would ever allow, or exercise an endpoint the UI has not built a screen for yet. This is broader and more precise coverage than the UI can offer.

## What belongs at the API level
Push down to the API anything about *what the system does* rather than *what the user sees*:

- Business rules and validation (rejecting a negative quantity, enforcing a unique email).
- Status codes and error handling for bad input, missing auth, forbidden actions.
- Data contracts: the shape and fields of a response.
- Create/read/update/delete behaviour on resources.

Keep at the UI only what genuinely needs a rendered page: the user journey, that the button is wired to the endpoint, that the result is displayed. One UI test proving the happy path, plus many API tests covering the rules, beats a stack of slow UI tests re-checking logic the API already owns.

## Green is still not enough
An API test that sends a request and only checks the status is green is weak evidence. A \`200\` with the wrong body is still a bug. As with the UI, the value is in a *meaningful* assertion about the response — the right fields, the right values — not merely that the call did not error.

## Key takeaway
API tests sit in the middle of the pyramid because they buy most of the confidence of end-to-end tests at a fraction of the cost: push business rules, validation and data contracts down to the API, and reserve the UI for what truly needs a rendered page.`,
      workedExample: `The same behaviour tested two ways makes the trade-off concrete. First, checking a validation rule through the UI:

~~~ts
import { test, expect } from '@playwright/test';

test('rejects a duplicate email at sign-up (UI)', async ({ page }) => {
  await page.goto('/sign-up');
  await page.getByLabel('Email').fill('taken@example.com');
  await page.getByLabel('Password').fill('hunter2!');
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page.getByRole('alert')).toHaveText('That email is already registered');
});
~~~

Now the same rule at the API level, where it actually lives:

~~~ts
import { test, expect } from '@playwright/test';

test('rejects a duplicate email at sign-up (API)', async ({ request }) => {
  const response = await request.post('/api/users', {
    data: { email: 'taken@example.com', password: 'hunter2!' },
  });

  expect(response.status()).toBe(409);
  const body = await response.json();
  expect(body).toMatchObject({ error: 'email_taken' });
});
~~~

Both assert the rule, but the API test runs in a fraction of the time, cannot be broken by a restyled form, and lets you check the exact status code and error contract. Keep one UI test to prove the message reaches the user, and cover the rest of the validation rules — empty email, weak password, invalid format — at the API level where they are cheap and precise.`,
      commonMistakes: `- Re-testing every business rule through the slow UI when the API owns the logic
- Treating API tests as a replacement for UI tests rather than a complementary layer
- Asserting only the status code and ignoring the response body, so a wrong payload passes
- Pushing so much to the API that no test proves the UI is actually wired to it`,
      realWorldTip: `On a delivery team, when a new feature ships, ask "where does this logic actually live?" Validation, permissions and status codes belong to the API — test them there, in bulk, and keep a thin layer of UI tests for the journeys a user genuinely walks. Teams that get the balance right see their pipeline time drop and their flakiness with it, because the slow, brittle layer stops carrying work the fast, stable layer should own.`,
      exercise: `Take one feature your team tests through the UI that is really a business rule (a validation, a permission, an error case). Write an API test for it and note how much faster it runs and what extra cases it now covers. Deliverable: the API spec plus a short note on which UI tests it lets you retire or thin out.`,
      reflectionQuestion: `Think of a rule your suite currently checks through the browser. What does driving the UI add to that check, and what would you lose — and gain — by moving it to the API level?`,
      knowledgeCheck: `Where in the test pyramid do API tests sit, and what is the main advantage of that position? (Answer: the middle — most of the confidence of end-to-end tests at a fraction of the speed and flakiness cost)`,
      completionChecklist: [
        'I can place API tests correctly relative to unit and UI tests',
        'I can explain the speed, stability and coverage advantages of API testing',
        'I can decide which behaviours belong at the API level versus the UI',
      ],
      enhancements: {
        industryStory: `A team had a two-hour UI suite that re-checked dozens of validation rules by filling and submitting forms. Every rule change meant a slow, flaky test to maintain. When they moved the rules down to API tests — one request each — the suite that covered them ran in under a minute, and the handful of UI tests that remained only proved the journey and that errors reached the screen. The pyramid was right-side-up again, and the pipeline stopped being the bottleneck.`,
        visualAid: {
          type: 'comparison',
          title: 'The same rule: UI test vs API test',
          headers: ['Aspect', 'Through the UI', 'At the API'],
          rows: [
            ['Speed', 'Seconds per case', 'Milliseconds per case'],
            ['Stability', 'Timing, layout, widgets', 'Deterministic response'],
            ['Coverage', 'Only what a user can reach', 'Every path and edge case'],
            ['Best used for', 'The journey is displayed', 'The rule is enforced'],
          ],
        },
        davidTip: `Before writing an end-to-end test, ask whether the thing you want to prove is really about the screen or about the system. If it is about the system, it almost always belongs one layer down — cheaper, steadier and more thorough at the API.`,
      },
    },
    {
      lessonNumber: 2,
      title: `Playwright's request Context`,
      estimatedTime: '18 minute read',
      lessonOverview: `Playwright ships a full HTTP client. The request fixture hands you an APIRequestContext with methods for every verb, plus control over headers and query parameters. This lesson establishes the toolkit you will use for every API test in the module.`,
      learningObjectives: [
        'Use the request fixture to make GET, POST, PUT and DELETE calls',
        'Send headers, JSON bodies and query parameters with a request',
        'Explain what an APIRequestContext is and how it differs from the page',
      ],
      lessonNotes: `## The request fixture
Just as \`page\` gives a test a browser page, \`request\` gives it an **APIRequestContext** — a lightweight HTTP client with no browser attached:

~~~ts
test('...', async ({ request }) => {
  const response = await request.get('/api/health');
});
~~~

There is no rendering and no DOM. You send a request, you get an \`APIResponse\` back. Because there is no browser to launch, these tests are fast and cheap.

## The verbs
The context exposes a method for each HTTP verb, and they mirror what you would expect:

- \`request.get(url, options)\` — read a resource.
- \`request.post(url, options)\` — create one, or perform an action.
- \`request.put(url, options)\` / \`request.patch(url, options)\` — replace or update.
- \`request.delete(url, options)\` — remove a resource.

Each returns a promise of an \`APIResponse\`, so \`await\` every call. Like \`page.goto\`, relative URLs resolve against the \`baseURL\` from \`playwright.config.ts\`, so you write \`/api/orders\` rather than the full host.

## Sending a body
For \`post\`, \`put\` and \`patch\`, pass a body through the options object:

- \`data\` — the request body. Give it a plain object and Playwright serialises it to JSON and sets \`Content-Type: application/json\` for you.
- \`form\` — send \`application/x-www-form-urlencoded\` instead.
- \`multipart\` — send a file upload.

## Headers and query parameters
Two options cover the rest of a typical request:

- \`headers\` — an object of header name to value, for auth tokens, content negotiation, correlation IDs and the like.
- \`params\` — an object Playwright turns into a URL query string, so \`{ status: 'open', page: 2 }\` becomes \`?status=open&page=2\` without manual string-building.

## Two ways to get a context
The \`request\` fixture is the everyday route — a fresh context per test, isolated like everything else in Playwright. When you need a context with its own lifetime or configuration (shared auth across a file, a different base URL), you create one yourself with \`request.newContext()\`. Lesson 6 covers when each is the right choice; for now, reach for the fixture.

## Key takeaway
The \`request\` fixture gives every test an \`APIRequestContext\` with a method per HTTP verb; pass \`data\` for JSON bodies, \`headers\` for auth and content, and \`params\` for query strings, and let \`baseURL\` keep your URLs relative.`,
      workedExample: `A tour of the verbs and options against a resource API:

~~~ts
import { test, expect } from '@playwright/test';

test('exercises the orders API', async ({ request }) => {
  // GET with query parameters -> /api/orders?status=open&page=1
  const list = await request.get('/api/orders', {
    params: { status: 'open', page: 1 },
  });
  expect(list.ok()).toBeTruthy();

  // POST a JSON body; the object is serialised and Content-Type is set for you.
  const created = await request.post('/api/orders', {
    data: { sku: 'KBD-01', quantity: 2 },
    headers: { 'X-Correlation-Id': 'demo-123' },
  });
  expect(created.status()).toBe(201);
  const order = await created.json();

  // PUT to replace the resource we just created.
  const updated = await request.put(\`/api/orders/\${order.id}\`, {
    data: { sku: 'KBD-01', quantity: 5 },
  });
  expect(updated.ok()).toBeTruthy();

  // DELETE to clean up.
  const removed = await request.delete(\`/api/orders/\${order.id}\`);
  expect(removed.status()).toBe(204);
});
~~~

Notice the shape of each call: a relative URL resolved against \`baseURL\`, options for \`params\`, \`data\` and \`headers\`, and an awaited \`APIResponse\` you then assert on. Passing \`data\` a plain object is the idiomatic way to send JSON — you rarely need to stringify anything yourself.`,
      commonMistakes: `- Manually building query strings instead of passing \`params\` and letting Playwright encode them
- Calling \`JSON.stringify\` on the body and setting \`Content-Type\` by hand when \`data\` does both
- Forgetting to \`await\` a request, so you assert on a pending promise
- Hardcoding the full host in every URL instead of relying on \`baseURL\``,
      realWorldTip: `On a delivery team, set \`baseURL\` in \`playwright.config.ts\` so your API tests point at localhost in dev and at a deployed environment in CI without editing a line. Keep request options tidy — \`data\`, \`headers\`, \`params\` — because a reviewer should be able to read a request and know exactly what goes over the wire. When someone reaches for manual string concatenation or hand-set JSON headers, that is usually a sign they have not met \`data\` and \`params\` yet.`,
      exercise: `Against any API you can reach (your app's, or a public sandbox), write one test that performs a GET with query parameters, a POST with a JSON body and a custom header, and a DELETE. Use \`baseURL\` for relative paths. Deliverable: the spec file with a one-line comment on each call describing what it sends.`,
      reflectionQuestion: `The \`request\` fixture and the \`page\` fixture both come from Playwright, yet one never opens a browser. What does that tell you about where the cost of a UI test actually goes?`,
      knowledgeCheck: `Which request option serialises a plain object to a JSON body and sets the Content-Type header automatically? (Answer: data)`,
      completionChecklist: [
        'I can make GET, POST, PUT and DELETE calls through the request fixture',
        'I can send headers, JSON bodies and query parameters correctly',
        'I can explain what an APIRequestContext is and how it differs from the page',
      ],
      enhancements: {
        badGood: {
          label: 'building a request',
          bad: `~~~ts
// Manual query string, hand-stringified body, header set by hand.
const res = await request.post(
  '/api/orders?status=open&page=1',
  {
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ sku: 'KBD-01', quantity: 2 }),
  },
);
~~~`,
          good: `~~~ts
// Let Playwright encode params and serialise the JSON body.
const res = await request.post('/api/orders', {
  params: { status: 'open', page: 1 },
  data: { sku: 'KBD-01', quantity: 2 },
});
~~~`,
        },
        davidTip: `Read the \`APIRequestContext\` methods once, properly, before writing your first suite. Most confused API tests come from not knowing that \`data\`, \`params\` and \`form\` already exist — people reinvent them badly and the tests get harder to read for no reason.`,
        miniChallenge: `Take a request you wrote with a manual query string and rewrite it to use \`params\`. Confirm the response is identical, then try sending the same body as \`form\` instead of \`data\` and observe how the request changes.`,
      },
    },
    {
      lessonNumber: 3,
      title: 'Asserting Responses',
      estimatedTime: '18 minute read',
      lessonOverview: `A request that returns is not a test — the assertion is. This lesson covers how to check status codes, assert on the JSON body, and verify the shape and fields of a response so your API tests give real evidence, not a false green.`,
      learningObjectives: [
        'Assert status with toBeOK and with explicit status codes',
        'Read a JSON body and assert on its fields and values',
        'Check the shape of a response, not just that it returned',
      ],
      lessonNotes: `## Status first
Every meaningful API assertion starts with the status code. Playwright gives you a web-first assertion for the common case:

~~~ts
expect(response).toBeOK();
~~~

\`toBeOK()\` passes when the status is in the \`200\`–\`299\` range. It is the right check for a happy-path call where any success is acceptable, and its failure message helpfully includes the response body, which speeds up debugging.

When the *specific* code matters — and for anything other than a plain success it usually does — assert it explicitly:

~~~ts
expect(response.status()).toBe(201); // created
expect(response.status()).toBe(409); // conflict
expect(response.status()).toBe(404); // not found
~~~

A \`201\` versus a \`200\`, or a \`403\` versus a \`404\`, is often the whole point of the test. \`toBeOK()\` cannot tell them apart, so reach for \`status()\` whenever the exact code carries meaning — especially for error cases, where \`toBeOK()\` would be the wrong assertion entirely.

## Reading the body
\`response.json()\` parses the body into an object you can assert on. \`response.text()\` gives you the raw string when you need it. Both are async, so \`await\` them:

~~~ts
const body = await response.json();
expect(body.status).toBe('open');
~~~

## Asserting fields and values
Once you have the parsed body, assert on what matters:

- \`expect(body.email).toBe('a@b.com')\` — an exact value.
- \`expect(body).toMatchObject({ status: 'open', quantity: 2 })\` — a subset of fields, ignoring the rest. This is ideal for responses that include server-set fields (\`id\`, \`createdAt\`) you do not want to pin down.
- \`expect(body.items).toHaveLength(3)\` — collection size.
- \`expect(Array.isArray(body.items)).toBeTruthy()\` — a coarse shape check.

## Check the shape, not just the pulse
A weak API test asserts only \`toBeOK()\` and stops. That proves the endpoint answered, not that it answered *correctly*. Verify the contract: the fields you promised are present, of the right type, with sensible values. A response missing a field, or returning \`null\` where a number belongs, is a real defect that only a body assertion will catch.

## Green is still not enough
As everywhere in this course, a passing status is not evidence of correct behaviour. \`toBeOK()\` on its own is the API equivalent of a UI test that only checks a button is visible. Make the assertion describe the contract the consumer depends on, so that if the response silently changed shape, your test would go red.

## Key takeaway
Start every API assertion with the status — \`toBeOK()\` for a plain success, an explicit \`status()\` when the exact code matters — then parse the body and assert on its fields and shape, because only a body assertion proves the endpoint answered correctly rather than merely answered.`,
      workedExample: `A test that checks status, values and shape together:

~~~ts
import { test, expect } from '@playwright/test';

test('creating an order returns the expected resource', async ({ request }) => {
  const response = await request.post('/api/orders', {
    data: { sku: 'KBD-01', quantity: 2 },
  });

  // Exact status: creation should be 201, not just any 2xx.
  expect(response.status()).toBe(201);

  const order = await response.json();

  // Values we sent are reflected back.
  expect(order).toMatchObject({ sku: 'KBD-01', quantity: 2, status: 'pending' });

  // Shape of server-set fields, without pinning their exact values.
  expect(typeof order.id).toBe('string');
  expect(typeof order.createdAt).toBe('string');
});

test('fetching a missing order returns 404 with an error body', async ({ request }) => {
  const response = await request.get('/api/orders/does-not-exist');

  expect(response.status()).toBe(404);
  const body = await response.json();
  expect(body).toMatchObject({ error: 'not_found' });
});
~~~

The first test uses \`toMatchObject\` for the fields it controls and a type check for the fields the server sets, so it is strict where it should be and tolerant where it must be. The second asserts an explicit \`404\` — \`toBeOK()\` would be exactly wrong here — and confirms the error contract, not merely that the call failed somehow.`,
      commonMistakes: `- Asserting \`toBeOK()\` and nothing else, so a success with the wrong body passes
- Using \`toBeOK()\` on an error case where you actually need an explicit 4xx status
- Pinning server-set fields like \`id\` or \`createdAt\` to exact values, making the test brittle
- Forgetting to \`await response.json()\` and asserting on a pending promise`,
      realWorldTip: `On a delivery team, treat your API assertions as a living record of the response contract. When a consumer depends on a field, assert it — the test then fails the moment someone renames or drops it, which is exactly the early warning a downstream team needs. \`toMatchObject\` is the workhorse here: it lets you assert the fields that matter to the contract while ignoring the volatile ones, so the test protects the agreement without breaking on every incidental change.`,
      exercise: `Write two tests for one endpoint: a happy path that asserts an explicit status and checks the response shape with \`toMatchObject\` plus at least one type check, and an error path that asserts a specific 4xx status and its error body. Deliverable: the spec file, with a comment on why you chose \`status()\` over \`toBeOK()\` in the error test.`,
      reflectionQuestion: `A test asserts only \`expect(response).toBeOK()\` and passes. What kinds of real defect could ship past it untouched, and what single assertion would have caught the most likely one?`,
      knowledgeCheck: `Which assertion checks that a response status is in the 200–299 range, and when should you use an explicit status() instead? (Answer: toBeOK() for any success; status() when the exact code matters, such as 201, 404 or 409)`,
      completionChecklist: [
        'I can assert status with both toBeOK and explicit status codes',
        'I can parse a JSON body and assert on its fields and values',
        'I check the shape of a response, not just that it returned',
      ],
      enhancements: {
        badGood: {
          label: 'strength of an API assertion',
          bad: `~~~ts
const response = await request.post('/api/orders', {
  data: { sku: 'KBD-01', quantity: 2 },
});
// Proves the endpoint answered — nothing about whether it answered correctly.
expect(response).toBeOK();
~~~`,
          good: `~~~ts
const response = await request.post('/api/orders', {
  data: { sku: 'KBD-01', quantity: 2 },
});
expect(response.status()).toBe(201);
const order = await response.json();
expect(order).toMatchObject({ sku: 'KBD-01', quantity: 2, status: 'pending' });
expect(typeof order.id).toBe('string');
~~~`,
        },
        visualAid: {
          type: 'comparison',
          title: 'Choosing the right status assertion',
          headers: ['Situation', 'Assertion', 'Why'],
          rows: [
            ['Any success is fine', 'expect(response).toBeOK()', 'Accepts any 2xx, prints the body on failure'],
            ['Creation', 'status() === 201', '201 is the contract, not just any 2xx'],
            ['Not found', 'status() === 404', 'toBeOK would be the wrong assertion'],
            ['Forbidden vs missing', 'status() === 403 / 404', 'The exact code is the behaviour under test'],
          ],
        },
        davidTip: `In review, treat any API test whose only assertion is \`toBeOK()\` the way you would treat a UI test whose only assertion is \`toBeVisible()\` on a container: unfinished. Ask "if the response quietly changed shape, would this go red?" If not, the contract is not really being tested.`,
      },
    },
    {
      lessonNumber: 4,
      title: 'Authentication for API Tests',
      estimatedTime: '18 minute read',
      lessonOverview: `Most useful endpoints require auth. This lesson shows how to obtain a token once, reuse it across requests, and build an authenticated APIRequestContext so your tests do not log in over and over.`,
      learningObjectives: [
        'Obtain an auth token by calling a login endpoint',
        'Reuse a token across requests via headers or a pre-configured context',
        'Build an authenticated APIRequestContext with request.newContext',
      ],
      lessonNotes: `## The shape of API auth
Most APIs authenticate a request with a token — commonly a bearer token in the \`Authorization\` header. You obtain it once by calling a login or token endpoint with credentials, then send it on every subsequent request:

~~~ts
Authorization: Bearer <token>
~~~

The two questions for a test suite are: how do you get the token, and how do you avoid fetching it again on every single request?

## Getting a token
Call the auth endpoint and read the token from the response:

~~~ts
const login = await request.post('/api/auth/login', {
  data: { email: 'qa@example.com', password: process.env.QA_PASSWORD },
});
expect(login.ok()).toBeTruthy();
const { token } = await login.json();
~~~

Keep real credentials out of the source. Read them from environment variables, exactly as you would a secret in application code, so nothing sensitive lands in the repository.

## Reusing a token: per request
The simplest reuse is to pass the header on each call:

~~~ts
await request.get('/api/profile', {
  headers: { Authorization: \`Bearer \${token}\` },
});
~~~

Fine for a couple of calls, tedious and error-prone when every request needs it.

## Reusing a token: a pre-configured context
Better, build an \`APIRequestContext\` that already carries the header, so every request through it is authenticated automatically:

~~~ts
const authed = await playwright.request.newContext({
  baseURL: 'https://api.example.com',
  extraHTTPHeaders: { Authorization: \`Bearer \${token}\` },
});
~~~

Now \`authed.get('/api/profile')\` needs no per-call header. Set it up once, use it for the whole test or file, and \`dispose()\` it when done. This is the standard pattern for a suite of authenticated tests.

## Doing it once for the whole suite
Logging in inside every test is wasteful. Playwright's usual answer is to authenticate once in a **setup project** and save the resulting state to a file, which later tests reuse — the same \`storageState\` mechanism you may know from UI tests, and it stores tokens and cookies alike. For API-only suites, a common pattern is a fixture that logs in once and hands every test a ready-authenticated context. Lesson 6 develops the reuse patterns; the principle is: authenticate as few times as correctness allows.

## A note on trust
An authenticated test proves behaviour *for that identity*. Cover the other side too: that a request with no token is rejected with \`401\`, and that a token for the wrong role is refused with \`403\`. Auth tests that only ever check the happy, authorised path miss exactly the failures that matter most for security.

## Key takeaway
Obtain a token once by calling the auth endpoint with credentials from the environment, then reuse it — ideally through an \`APIRequestContext\` pre-loaded with the \`Authorization\` header via \`extraHTTPHeaders\` — and remember to test the unauthenticated and forbidden paths, not just the authorised one.`,
      workedExample: `A fixture that logs in once and hands tests an authenticated context, plus the negative cases:

~~~ts
import { test as base, expect, type APIRequestContext } from '@playwright/test';

// Extend the base test with an 'api' fixture: a context that is already authenticated.
const test = base.extend<{ api: APIRequestContext }>({
  api: async ({ playwright }, use) => {
    const anon = await playwright.request.newContext({ baseURL: process.env.API_URL });
    const login = await anon.post('/api/auth/login', {
      data: { email: 'qa@example.com', password: process.env.QA_PASSWORD },
    });
    expect(login.ok()).toBeTruthy();
    const { token } = await login.json();
    await anon.dispose();

    const authed = await playwright.request.newContext({
      baseURL: process.env.API_URL,
      extraHTTPHeaders: { Authorization: \`Bearer \${token}\` },
    });
    await use(authed);
    await authed.dispose();
  },
});

test('an authenticated request reaches the profile', async ({ api }) => {
  const response = await api.get('/api/profile');
  expect(response).toBeOK();
  expect(await response.json()).toMatchObject({ email: 'qa@example.com' });
});

test('an unauthenticated request is rejected', async ({ request }) => {
  const response = await request.get('/api/profile');
  expect(response.status()).toBe(401);
});
~~~

The \`api\` fixture logs in a single time and every test that asks for it gets a context that is already carrying the token — no repeated logins, no per-call headers. The second test deliberately uses the plain \`request\` fixture with no token to prove the endpoint rejects anonymous access. Credentials come from environment variables, never the source.`,
      commonMistakes: `- Logging in inside every test instead of once, making the suite slow and hammering the auth service
- Hardcoding passwords or tokens in the spec files instead of reading them from the environment
- Only ever testing the authenticated path, never checking that 401 and 403 are returned
- Building an authenticated context but forgetting to \`dispose()\` it, leaking resources`,
      realWorldTip: `On a delivery team, authenticate once and share the result — a saved \`storageState\` in a setup project, or a fixture that logs in a single time — rather than calling the login endpoint in every test. It keeps the suite fast and, just as importantly, stops your tests from load-testing the auth service by accident. Store credentials as CI secrets and inject them as environment variables; a token or password committed to the repository is a security incident, not a convenience.`,
      exercise: `Build a fixture (or a \`beforeAll\` setup) that logs in once and produces an authenticated \`APIRequestContext\`. Write one test that uses it to reach a protected endpoint, and one that confirms the same endpoint returns \`401\` without a token. Deliverable: the spec file, with credentials read from environment variables and a note on where you would store them in CI.`,
      reflectionQuestion: `Your suite logs in inside every test and it works fine today. What two problems will that habit cause as the suite grows, and what would you change first?`,
      knowledgeCheck: `Which newContext option pre-loads a header like Authorization onto every request made through the context? (Answer: extraHTTPHeaders)`,
      completionChecklist: [
        'I can obtain a token by calling a login endpoint',
        'I can build an authenticated APIRequestContext and reuse it across requests',
        'I test the unauthenticated and forbidden paths, not just the authorised one',
      ],
      enhancements: {
        industryStory: `A team's API suite logged in at the start of every test. As the suite grew past a few hundred tests, the auth service started rate-limiting the CI runner, and builds failed for reasons that had nothing to do with the code under test. Moving the login into a single setup step that produced a shared authenticated context cut thousands of redundant calls, and the flakiness that everyone had been blaming on "the network" simply vanished.`,
        davidTip: `Always write the \`401\` and \`403\` tests alongside the happy path. The authorised case tells you the feature works for the right people; the rejected cases tell you it does not work for the wrong ones — and on anything touching data or money, that second guarantee is the one that keeps you out of trouble.`,
        miniChallenge: `Add a test that logs in with valid credentials, then makes a request with a deliberately corrupted token, and assert the API responds with \`401\`. This proves the endpoint actually validates the token rather than merely checking the header is present.`,
      },
    },
    {
      lessonNumber: 5,
      title: 'API + UI Hybrid Automation',
      estimatedTime: '19 minute read',
      lessonOverview: `The killer pattern of this module: use fast API calls to set up and tear down state, then verify the result through the UI. It makes end-to-end tests faster, steadier and sharply focused on the behaviour you actually care about.`,
      learningObjectives: [
        'Use API calls to arrange test state instead of driving the UI to create it',
        'Verify the outcome through the UI while keeping setup and teardown at the API',
        'Explain why hybrid tests are faster and less flaky than pure UI tests',
      ],
      lessonNotes: `## The problem with pure UI setup
A UI test often spends most of its time *arranging* rather than *checking*. To test that an order appears on the account page, a pure UI test might register a user, log in, browse to a product, add it to the basket, and check out — all through the browser — before it can even begin to assert the thing it cares about. Every one of those steps is slow, and every one is a chance to flake on something unrelated to the actual behaviour under test.

## Arrange with the API, assert through the UI
The hybrid pattern splits the work by tool:

- **Arrange** the world with fast, reliable API calls: create the user, create the order, set the feature flag.
- **Act and assert** through the UI, because that is the part a user actually experiences and the part you genuinely want to see rendered.
- **Tear down** with API calls too: delete the records you created so the next run starts clean.

The test now spends its time on the behaviour that matters — does the order show up on screen? — and almost no time on plumbing.

## Why it is faster and steadier
API setup is an order of magnitude faster than clicking the same state into being, so the suite runs quicker. It is also far less flaky: the failure surface shrinks to the one UI interaction you are actually testing, instead of the dozen incidental steps that used to precede it. When such a test fails, it is almost always because the behaviour under test broke — not because a setup screen changed. That is exactly the signal you want from an end-to-end test.

## Seeding auth as well
The same idea applies to logging in. Rather than driving the login form in every UI test, authenticate through the API once and inject the resulting session — via \`storageState\` — so tests start already logged in. The login form still deserves its own dedicated UI test, but every *other* test should skip it.

## A caution
Hybrid tests assume your API setup faithfully mirrors how the real system reaches that state. Usually it does, because the UI calls the same endpoints. But if you seed data in a way the application never would — bypassing a rule the UI enforces — you can create a state that cannot occur in production and test a fiction. Set up through the same endpoints the product uses, and you stay honest.

## Key takeaway
Arrange and tear down state with fast API calls, then act and assert through the UI: the test spends its time on the behaviour a user experiences instead of on plumbing, which makes it faster, less flaky, and pointed straight at what you actually mean to verify.`,
      workedExample: `Seeding an order via the API, then verifying it appears in the UI, and cleaning up afterwards:

~~~ts
import { test, expect, type APIRequestContext } from '@playwright/test';

test.describe('Account order history', () => {
  let api: APIRequestContext;
  let orderId: string;

  test.beforeAll(async ({ playwright }) => {
    api = await playwright.request.newContext({
      baseURL: process.env.API_URL,
      extraHTTPHeaders: { Authorization: \`Bearer \${process.env.QA_TOKEN}\` },
    });
  });

  test.afterAll(async () => {
    await api.dispose();
  });

  test('a placed order appears in the account history', async ({ page }) => {
    // Arrange: create the order through the API in a single fast call.
    const created = await api.post('/api/orders', {
      data: { sku: 'KBD-01', quantity: 1 },
    });
    expect(created.status()).toBe(201);
    orderId = (await created.json()).id;

    // Act + assert: verify through the UI, the part a user actually sees.
    await page.goto('/account/orders');
    const row = page.getByRole('row').filter({ hasText: 'KBD-01' });
    await expect(row).toBeVisible();
    await expect(row).toContainText('1 item');

    // Tear down: remove the order so the next run starts clean.
    const removed = await api.delete(\`/api/orders/\${orderId}\`);
    expect(removed.status()).toBe(204);
  });
});
~~~

The only browser interaction is the part under test — visiting the account page and checking the order is shown. Creating the order, which a pure UI test would have clicked through checkout to achieve, is one API call. The test is faster, and if it fails you know the order-history *display* broke, because nothing else in the test touches the UI.`,
      commonMistakes: `- Driving the UI to create state that an API call could arrange in a fraction of the time
- Seeding data in a way the application never would, testing a state that cannot occur in production
- Skipping teardown, so seeded records accumulate and later runs collide with stale data
- Removing the login UI test entirely after switching to seeded auth — the login form still needs its own test`,
      realWorldTip: `On a delivery team, this hybrid pattern is usually where an end-to-end suite goes from "too slow and flaky to trust" to "fast enough to run on every pull request". Set up through the same endpoints the product uses so your seeded state is honest, and make teardown reliable — an \`afterEach\` or \`afterAll\` that deletes what the test created — so runs never inherit each other's mess. The one UI test you keep for each journey then carries real weight, because everything around it is fast and deterministic.`,
      exercise: `Take an existing pure-UI test that spends most of its time creating state through the browser. Rewrite it so the setup (and teardown) happen through API calls and only the behaviour under test goes through the UI. Deliverable: the before and after specs, plus a note of the runtime difference and which UI steps you removed.`,
      reflectionQuestion: `A hybrid test seeds data through an endpoint the real UI never calls, in a shape the UI could not produce. The test is fast and green. What is it actually proving, and what risk has it introduced?`,
      knowledgeCheck: `In the hybrid pattern, which parts of a test use API calls and which use the UI? (Answer: arrange and tear down state via the API; act and assert on the behaviour under test through the UI)`,
      completionChecklist: [
        'I can arrange test state with API calls instead of driving the UI',
        'I verify the outcome through the UI while keeping setup and teardown at the API',
        'I can explain why hybrid tests are faster and less flaky than pure UI tests',
      ],
      enhancements: {
        industryStory: `A team's checkout end-to-end tests were the slowest and flakiest in the suite, because each one registered a user and walked the full basket-to-payment flow just to reach the screen it wanted to check. Rewriting them to seed the user and the order through the API, and driving only the final verification through the browser, cut their runtime by most of it and stopped the intermittent failures on setup screens that had nothing to do with checkout. The tests that remained failed only when the thing they tested actually broke.`,
        visualAid: {
          type: 'flow',
          title: 'A hybrid end-to-end test',
          steps: [
            { label: 'Arrange (API)', detail: 'Create the user, order or state in one fast call' },
            { label: 'Authenticate (API)', detail: 'Seed the session via storageState — no login form' },
            { label: 'Act (UI)', detail: 'Drive only the interaction under test in the browser' },
            { label: 'Assert (UI)', detail: 'Verify the rendered outcome a user would see' },
            { label: 'Tear down (API)', detail: 'Delete what you created so the next run is clean' },
          ],
        },
        davidTip: `The rule of thumb: drive through the UI only the thing you are actually testing. Everything before and after it — setup, login, cleanup — should go through the API. A good end-to-end test reads like a single sentence of UI surrounded by fast, invisible plumbing.`,
      },
    },
    {
      lessonNumber: 6,
      title: 'Organising API Tests',
      estimatedTime: '18 minute read',
      lessonOverview: `A pile of API tests that each log in, build their own client and repeat setup becomes unmaintainable fast. This lesson is about structuring API tests for reuse, and knowing when to use the request fixture versus a hand-built APIRequestContext.`,
      learningObjectives: [
        'Structure API tests with fixtures and helpers to remove repetition',
        'Choose between the request fixture and a hand-built APIRequestContext',
        'Wrap common calls in helpers or a client without hiding what is asserted',
      ],
      lessonNotes: `## The two ways to get a context, revisited
You have met both routes to an \`APIRequestContext\`. Choosing between them is the central organising decision:

- The **\`request\` fixture** — a fresh, isolated context per test, created and disposed for you, respecting \`baseURL\` and other \`use\` options from the config. This is the default and the right choice for the large majority of tests.
- **\`request.newContext()\`** (via the \`playwright\` fixture) — a context you create and dispose yourself, with its own \`baseURL\`, headers and lifetime. Reach for it when you need something the per-test fixture cannot give: a context shared across a file, one carrying a standing auth header, or one pointing at a different service.

## When to prefer the fixture
Use the \`request\` fixture when a test needs an independent, unauthenticated-or-simply-set-up client and nothing special about its lifetime. Isolation is handled, cleanup is automatic, and there is less code to get wrong. If in doubt, this is the answer.

## When to build your own context
Build a context yourself when:

- Several tests should share one authenticated client, so you log in once rather than per test.
- You need a different \`baseURL\` or standing headers than the config provides.
- You want the context to outlive a single test — created in \`beforeAll\`, disposed in \`afterAll\`.

The cost is that you own its lifetime: create it in a fixture or hook, and always \`dispose()\` it.

## Structuring for reuse
Repetition is the enemy. Common patterns:

- **Fixtures** — extend \`test\` with an \`api\` fixture (as in Lesson 4) so any test can ask for a ready client. This is the idiomatic Playwright way to share setup.
- **Helper functions** — small functions like \`createOrder(api, data)\` that wrap a call and return the parsed body, keeping specs readable.
- **A thin API client** — a class or module grouping related calls (\`orders.create()\`, \`orders.get()\`) when a service has many endpoints.

## Keep the assertion in the test
There is one line not to cross: **helpers may perform requests, but the assertions that define the test belong in the test.** A helper that both calls the endpoint and asserts the result hides the very thing a reader needs to see, and makes failures point at the helper instead of the test. Let helpers do the plumbing — building the request, parsing the body — and let each test state plainly what it expects. A green test whose real assertions are buried in a shared helper is exactly the kind of opaque, untrustworthy green this course keeps warning against.

## Key takeaway
Default to the \`request\` fixture and build your own \`APIRequestContext\` only when you need shared lifetime, standing auth or a different base URL; factor repetition into fixtures, helpers and thin clients, but keep the assertions that define each test visible in the test itself.`,
      workedExample: `A small helper and a shared fixture that remove repetition without hiding the assertions:

~~~ts
import { test as base, expect, type APIRequestContext } from '@playwright/test';

// Shared authenticated client, logged in once per worker.
const test = base.extend<{ api: APIRequestContext }>({
  api: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({
      baseURL: process.env.API_URL,
      extraHTTPHeaders: { Authorization: \`Bearer \${process.env.QA_TOKEN}\` },
    });
    await use(context);
    await context.dispose();
  },
});

// Helper: does the plumbing (request + parse), returns data, asserts nothing about intent.
async function createOrder(api: APIRequestContext, data: { sku: string; quantity: number }) {
  const response = await api.post('/api/orders', { data });
  expect(response.status()).toBe(201); // a precondition, not the test's own assertion
  return response.json();
}

test('an order can be fetched after it is created', async ({ api }) => {
  const created = await createOrder(api, { sku: 'KBD-01', quantity: 2 });

  const response = await api.get(\`/api/orders/\${created.id}\`);

  // The assertions that DEFINE this test stay here, in plain view.
  expect(response).toBeOK();
  expect(await response.json()).toMatchObject({ sku: 'KBD-01', quantity: 2 });
});
~~~

The \`api\` fixture gives every test an authenticated client without repeating the login. \`createOrder\` wraps the setup call and checks its precondition, but the assertions that express *what this test is actually about* — that the order can be fetched and comes back with the right fields — stay in the test body where a reader and a failure message can both find them.`,
      commonMistakes: `- Building a fresh \`APIRequestContext\` in every test when the \`request\` fixture would do
- Sharing a hand-built context across tests but never calling \`dispose()\`, leaking resources
- Burying the test's real assertions inside a shared helper, so failures point at the helper
- Over-engineering a heavyweight client for a service with three endpoints`,
      realWorldTip: `On a delivery team, let the structure grow with the suite rather than ahead of it. A handful of tests need nothing more than the \`request\` fixture and a couple of helper functions; a large suite against a rich service earns a shared auth fixture and a thin client grouping the endpoints. Whatever the size, hold the line that assertions live in tests: the fastest way to make a suite untrustworthy is to hide its checks in helpers, because then no reviewer can tell what a green run actually proved.`,
      exercise: `Refactor a set of API tests that repeat login and setup. Introduce a shared \`api\` fixture and at least one helper for a common call, but keep every test's defining assertion in the test body. Deliverable: the before and after, with a sentence on which tests kept the \`request\` fixture and which needed a hand-built context, and why.`,
      reflectionQuestion: `A colleague moves all the assertions into helper functions so the specs read as a clean list of calls. The suite is green and tidy. What has been lost, and how would you tell whether any test still proves anything?`,
      knowledgeCheck: `When should you build your own APIRequestContext with newContext instead of using the request fixture? (Answer: when you need a shared lifetime across tests, a standing auth header, or a different baseURL than the config provides)`,
      completionChecklist: [
        'I can structure API tests with fixtures and helpers to remove repetition',
        'I can choose between the request fixture and a hand-built APIRequestContext',
        'I keep each test’s defining assertions visible in the test itself',
      ],
      enhancements: {
        industryStory: `A team proudly refactored their API suite so every spec was a short, clean list of helper calls. It read beautifully — until a real bug shipped that the tests should have caught. The assertions had all been pulled into the helpers, and some helpers had quietly stopped asserting anything meaningful during the refactor. Nobody noticed, because the specs no longer showed what was being checked. They moved the defining assertions back into the tests, and readability cost them nothing while trust returned immediately.`,
        badGood: {
          label: 'where the assertion lives',
          bad: `~~~ts
// Helper hides the assertion; the spec proves nothing a reader can see.
async function assertOrderCreated(api, data) {
  const res = await api.post('/api/orders', { data });
  expect(res.status()).toBe(201);
  expect(await res.json()).toMatchObject(data);
}

test('create order', async ({ api }) => {
  await assertOrderCreated(api, { sku: 'KBD-01', quantity: 2 });
});
~~~`,
          good: `~~~ts
// Helper does the plumbing; the test states what it verifies.
async function createOrder(api, data) {
  const res = await api.post('/api/orders', { data });
  expect(res.status()).toBe(201);
  return res.json();
}

test('a created order comes back with the fields we sent', async ({ api }) => {
  const order = await createOrder(api, { sku: 'KBD-01', quantity: 2 });
  expect(order).toMatchObject({ sku: 'KBD-01', quantity: 2 });
});
~~~`,
        },
        visualAid: {
          type: 'comparison',
          title: 'request fixture vs hand-built context',
          headers: ['Need', 'request fixture', 'newContext'],
          rows: [
            ['Fresh, isolated per test', 'Yes, automatic', 'Manual'],
            ['Shared auth across tests', 'No', 'Yes, log in once'],
            ['Different baseURL / headers', 'From config only', 'Set per context'],
            ['You manage disposal', 'No, handled for you', 'Yes, always dispose()'],
          ],
        },
      },
    },
  ],
};
