// Modern Test Automation Bootcamp — Module 10: Network Control & Mocking.
// Playwright + TypeScript module on intercepting, mocking and modifying network
// traffic. Every lesson reinforces that a test passing against a mock only proves
// the app works against YOUR assumptions, not against the real dependency.
export default {
  courseSlug: 'modern-test-automation-bootcamp',
  moduleNumber: 10,
  lessonsPrefix: 'modern-automation',
  enhPrefix: 'modern-automation',
  enhSep: '-',
  lessons: [
    {
      lessonNumber: 1,
      title: 'Intercepting Network Traffic',
      estimatedTime: '16 minute read',
      lessonOverview: `Before you mock anything, you need to see what the application actually asks the network for. This lesson uses \`page.route\` and request/response listeners to observe every call the app makes, so your later mocks match reality rather than guesswork.`,
      learningObjectives: [
        'Register a handler with page.route and inspect the intercepted request',
        'Read request method, URL, headers and post data, and the matching response',
        'Observe an app’s real network calls before deciding what to mock',
      ],
      lessonNotes: `## Why intercept at all
The browser your test drives makes real HTTP calls: to load data, submit forms, fetch a price, talk to an analytics endpoint. Playwright lets you sit in the middle of those calls and see — or change — every one. The entry point is \`page.route\`:

~~~ts
await page.route('**/api/**', async (route) => {
  // decide what to do with this request
  await route.continue();
});
~~~

The first argument is a URL glob (or regex); the second is a handler that receives a \`Route\` object. Until you call one of \`route.continue()\`, \`route.fulfill()\` or \`route.abort()\`, the request is paused. Calling \`continue()\` lets it proceed to the real server unchanged — so the snippet above intercepts everything under \`/api/\` and still behaves normally, which is exactly what you want while you are only observing.

## Observing without changing
You do not always need \`route\` to look at traffic. Event listeners are lighter when you only want to watch:

- \`page.on('request', req => ...)\` fires for every outgoing request.
- \`page.on('response', res => ...)\` fires for every response that comes back.

From a \`Request\` you can read \`request.method()\`, \`request.url()\`, \`request.headers()\` and \`request.postDataJSON()\`. From a \`Response\` you get \`response.status()\` and \`await response.json()\`. This is how you build an accurate picture of what the app calls, in what order, with what payloads.

## Match reality first
The single biggest mistake in mocking is inventing a response shape that the real endpoint never returns. Intercepting first — and logging what actually flies past — is how you avoid it. Record the genuine method, URL pattern and JSON shape, then base every mock on that observed truth.

## A green run proves nothing on its own
Intercepting gives you visibility, not correctness. Watching a request go by tells you the app made a call; it says nothing about whether the call was the right one or whether the app handled the response well. That judgement is still yours to make with a meaningful assertion.

## Key takeaway
\`page.route\` and the \`request\`/\`response\` events let you see exactly what the application asks the network for; observe the real calls first, because every trustworthy mock is built on an accurately observed request and response.`,
      workedExample: `Logging every API call an app makes, then letting each one proceed untouched:

~~~ts
import { test, expect } from '@playwright/test';

test('observe the network calls the dashboard makes', async ({ page }) => {
  const calls: string[] = [];

  // Watch every request without altering it.
  page.on('request', (request) => {
    if (request.url().includes('/api/')) {
      calls.push(\`\${request.method()} \${request.url()}\`);
    }
  });

  // Intercept but continue: useful when you want the Route object too.
  await page.route('**/api/**', async (route) => {
    await route.continue();
  });

  await page.goto('/dashboard');
  await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible();

  // Now you know exactly what to mock later.
  console.log('API calls made:', calls);
  expect(calls.some((c) => c.includes('/api/summary'))).toBeTruthy();
});
~~~

The listener records the method and URL of every \`/api/\` request; the \`page.route\` handler intercepts each one and immediately continues it to the real server. Nothing about the app’s behaviour changes — you have simply made its network activity visible. The final assertion confirms the call you expected to see actually happened, which is the fact you will rely on when you start mocking it.`,
      commonMistakes: `- Intercepting a route and forgetting to call \`continue\`, \`fulfill\` or \`abort\`, so the request hangs until timeout
- Writing mocks from an assumed response shape instead of one you observed the real endpoint return
- Using a glob so broad it catches static assets and analytics you never meant to touch
- Watching a request fly by and treating that alone as proof the feature works`,
      realWorldTip: `On a delivery team, spend the first ten minutes with a new feature simply logging its traffic — method, URL, payload and status — before writing a line of mock. The endpoints an app calls are rarely fully documented, and the real shapes almost never match the tidy version in the design doc. A mock built from observed traffic survives; one built from a wiki page breaks the first time reality diverges from it.`,
      exercise: `Pick a page in your application that loads data from an API. Add \`page.on('request')\` and \`page.on('response')\` listeners that log the method, URL, status and JSON body of each \`/api/\` call, and let every request continue to the real server. Deliverable: the spec plus a short list of the endpoints the page calls and the response shape of the main one.`,
      reflectionQuestion: `You intercepted a request and watched it succeed against the real server. What have you learned that you did not know before, and what have you still not proven about the feature?`,
      knowledgeCheck: `Which Playwright method pauses a matching request and hands you a Route object to decide its fate? (Answer: page.route)`,
      completionChecklist: [
        'I can register a page.route handler and continue the request untouched',
        'I can read a request’s method, URL, headers and post data',
        'I observe an app’s real network calls before deciding what to mock',
      ],
      enhancements: {
        industryStory: `A team wrote a suite of mocked tests against the response shape from an API design document. Every test was green, yet the feature broke in production: the real service wrapped its payload in a \`data\` envelope the document never mentioned. Nobody had watched the actual traffic. After that, the team’s rule became "log it before you mock it" — capture the real request and response first, and build every fixture from what the endpoint genuinely returns.`,
        davidTip: `Keep a throwaway "recorder" test around for each area of the app whose only job is to log network traffic. When an endpoint changes, that test shows you the new shape in seconds — far faster than diffing your fixtures against a moving target by hand.`,
        visualAid: {
          type: 'comparison',
          title: 'Observing versus controlling traffic',
          headers: ['Tool', 'What it does', 'When to reach for it'],
          rows: [
            ['page.on(‘request’/‘response’)', 'Passively watch traffic', 'Discovering what the app calls'],
            ['page.route + route.continue()', 'Intercept, then pass through', 'Watching with a Route in hand'],
            ['page.route + route.fulfill()', 'Intercept and reply yourself', 'Mocking a response (next lesson)'],
          ],
        },
      },
    },
    {
      lessonNumber: 2,
      title: 'Mocking Responses',
      estimatedTime: '18 minute read',
      lessonOverview: `Once you can see a call, you can answer it yourself. \`route.fulfill\` lets you return fixture data instead of hitting the real server, which is how you test edge cases you cannot easily trigger for real: errors, empty states and slow responses. The catch runs through the whole lesson — a mock tests the app against your assumptions, not against the real service.`,
      learningObjectives: [
        'Return fixture data with route.fulfill, setting status, headers and body',
        'Force error, empty and slow states that are hard to trigger against a real backend',
        'Explain what a test passing against a mock does and does not prove',
      ],
      lessonNotes: `## Answering the call yourself
\`route.fulfill\` completes a request without it ever reaching the server. You supply the response:

~~~ts
await page.route('**/api/orders', async (route) => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ orders: [] }),
  });
});
~~~

Now the app receives \`{ orders: [] }\` no matter what the backend would have said. That control is the whole point: you can produce any response on demand.

## The states that are hard to reach for real
The strongest use of mocking is exercising conditions you cannot reliably provoke against a live system:

- **Errors** — return \`status: 500\` to prove the app shows a sensible error message and does not crash.
- **Empty states** — return an empty list to confirm the "nothing here yet" view renders instead of a broken table.
- **Slow responses** — delay the fulfilment to check your loading spinner appears and the UI stays responsive.
- **Edge-case data** — a name with emoji, a huge number, a missing optional field — served instantly and deterministically.

Triggering a real 500 or a genuinely empty account on demand is often impossible in a shared test environment. A mock makes each one a one-line, repeatable test.

## Keep fixtures honest
A fixture is only as good as its fidelity to the real response. If the real endpoint returns \`{ data: { orders: [...] } }\` and your mock returns \`{ orders: [...] }\`, your test passes while the app would fail in production. Base fixtures on responses you actually observed (Lesson 1), store them in files, and review them when the API changes.

## What green means here
This is the heart of the module: a test that passes against a mock proves only that **the app behaves correctly when the server responds exactly the way you told it to**. It does not prove the server ever responds that way. Mocking buys determinism and edge-case coverage; it does not verify the contract with the real service. Keep that distinction sharp, and never let a wall of green mocked tests convince you the integration works.

## Key takeaway
\`route.fulfill\` lets you serve any response — error, empty, slow, exotic — deterministically, which is invaluable for edge cases; but a green mocked test only proves the app works against your assumed response, so keep fixtures faithful and never mistake mocked green for a working integration.`,
      workedExample: `Testing an error state and an empty state that would be painful to trigger for real:

~~~ts
import { test, expect } from '@playwright/test';

test('shows an error banner when the orders API fails', async ({ page }) => {
  await page.route('**/api/orders', async (route) => {
    await route.fulfill({ status: 500, contentType: 'application/json', body: '{}' });
  });

  await page.goto('/orders');

  // The real assertion: the app degrades gracefully, it does not white-screen.
  await expect(page.getByRole('alert')).toHaveText('Sorry, we could not load your orders.');
  await expect(page.getByRole('button', { name: 'Try again' })).toBeVisible();
});

test('shows the empty state when there are no orders', async ({ page }) => {
  await page.route('**/api/orders', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: { orders: [] } }), // shape matches the real endpoint
    });
  });

  await page.goto('/orders');
  await expect(page.getByText('You have no orders yet')).toBeVisible();
});
~~~

Each test forces one condition and asserts a real outcome — an error banner, the empty-state message — not merely that a call was made. Note the empty-state body mirrors the real endpoint’s \`data.orders\` envelope: the fixture is faithful, so the test is meaningful. Both states would be awkward to reproduce against a shared backend, yet here they are two short, deterministic tests.`,
      commonMistakes: `- Returning a fixture whose shape differs from the real response, so the test passes but production would break
- Hardcoding fixtures inline everywhere instead of storing them in files you can review against the API
- Mocking the happy path only, when the whole value of mocking is the error and empty states
- Asserting the mock was hit rather than asserting what the app rendered in response`,
      realWorldTip: `On a delivery team, keep fixtures in versioned files (a \`fixtures/\` folder) and treat a fixture change like an API change — reviewed, dated, and ideally regenerated from a real response rather than hand-edited. When a fixture and the live service drift apart, the mocked suite stays green while users hit errors, so pair your fastest mocked tests with a small set of real integration checks that would notice the drift.`,
      exercise: `Take a data-loading screen and write three tests against a mocked endpoint: one 500 error, one empty list, and one slow response (use a delay before \`fulfill\`). Assert the specific UI each produces — an error banner, an empty-state message, a loading spinner. Deliverable: the three specs, with the fixtures stored in a file and a note of where you got the real response shape from.`,
      reflectionQuestion: `Your mocked error-state test is green. A week later the real API starts returning errors in a different JSON shape and users see a white screen. Why did your green test not catch it, and what would have?`,
      knowledgeCheck: `Which Route method returns fixture data to the browser without contacting the real server? (Answer: route.fulfill)`,
      completionChecklist: [
        'I can serve fixture data with route.fulfill, setting status and body',
        'I can force error, empty and slow states deterministically',
        'I can explain that green against a mock only proves behaviour under my assumed response',
      ],
      enhancements: {
        badGood: {
          label: 'faithful vs invented fixture',
          bad: `~~~ts
// Real endpoint returns { data: { orders: [...] } }, but the fixture invents a flat shape.
await page.route('**/api/orders', async (route) => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ orders: [{ id: 1 }] }), // wrong shape — test passes, prod breaks
  });
});
~~~`,
          good: `~~~ts
// Fixture mirrors an observed real response, envelope and all.
import ordersFixture from './fixtures/orders.json';

await page.route('**/api/orders', async (route) => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(ordersFixture), // { data: { orders: [...] } }
  });
});
~~~`,
        },
        davidTip: `Delay a fulfilment with \`await new Promise(r => setTimeout(r, 2000))\` before \`route.fulfill\` to test loading states — but keep those delays short and few. A suite full of artificial two-second waits is slow for no product reason; you only need enough delay to prove the spinner appears.`,
        miniChallenge: `Add a fourth test that serves deliberately awkward data — a customer name with emoji and a very long product title — and assert the UI does not overflow or crash. This is the edge-case coverage a real backend rarely hands you on demand.`,
      },
    },
    {
      lessonNumber: 3,
      title: 'Stubbing Third Parties',
      estimatedTime: '17 minute read',
      lessonOverview: `Some dependencies are not yours to control: payment gateways, map tiles, analytics, feature-flag services. They are slow, rate-limited, occasionally down, and sometimes cost money per call. Stubbing them at the network boundary keeps your tests fast and reliable — while being honest that you are no longer testing the real integration.`,
      learningObjectives: [
        'Stub external third-party endpoints so tests do not depend on them',
        'Decide which dependencies to stub and which to keep real',
        'Preserve some real integration coverage outside the stubbed suite',
      ],
      lessonNotes: `## Why third parties hurt tests
An external dependency you do not own brings problems your own backend does not:

- **Flakiness** — a third party has its own outages and latency, and a red test caused by their downtime tells you nothing about your code.
- **Cost** — some APIs charge per request or per SMS; a suite that runs hundreds of times a day can run up a real bill.
- **Rate limits** — hit them and your tests fail for reasons unrelated to quality.
- **Non-determinism** — live maps, prices and ads change under you, so assertions cannot be stable.

Stubbing these at the network boundary with \`page.route\` removes all four. The external call never leaves the browser; your fixture answers it instantly.

## Stub the boundary, not your own logic
The point of stubbing a third party is to isolate *their* unreliability, not to skip *your* code. Route only the external hosts — the payment provider, the tile server, the analytics collector — and let your own API run for real where you can. A common pattern is to stub the payment gateway’s tokenisation call so a checkout test can drive your own order-completion logic without a real card transaction.

## The honesty clause
Stubbing a third party means your test no longer proves you can actually talk to them. If the payment provider changes its response format, your stubbed checkout test stays green while real payments fail. So stubs buy reliability at the cost of contract coverage — a trade you should make deliberately, and cover elsewhere.

## Keep a thin real thread
Because stubs hide integration breakage, keep a small, separate set of tests that hit the real third party (often against their sandbox or test mode) and run less often — nightly, or in a dedicated pipeline stage. That thin thread of genuine integration coverage is what notices when the provider changes something. The fast stubbed suite gives you quick feedback; the slow real suite guards the contract.

## Key takeaway
Stub external dependencies at the network boundary to keep your suite fast, cheap and deterministic — but a stubbed integration is not a tested one, so keep a small, less-frequent set of real tests against the third party so someone still notices when their contract changes.`,
      workedExample: `Stubbing a payment gateway and a map service so a checkout test is fast and deterministic:

~~~ts
import { test, expect } from '@playwright/test';

test('completes checkout without calling the real payment gateway', async ({ page }) => {
  // Stub the third-party payment tokenisation — no real card, no real charge.
  await page.route('https://api.paymentprovider.com/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ token: 'tok_test_123', status: 'succeeded' }),
    });
  });

  // Stub map tiles so the test does not depend on an external tile server.
  await page.route('https://tiles.mapservice.com/**', async (route) => {
    await route.fulfill({ status: 200, contentType: 'image/png', body: Buffer.from([]) });
  });

  await page.goto('/checkout');
  await page.getByLabel('Card number').fill('4242 4242 4242 4242');
  await page.getByRole('button', { name: 'Pay now' }).click();

  // Your own order-completion logic still runs for real and is what we assert.
  await expect(page.getByRole('heading', { name: 'Order confirmed' })).toBeVisible();
  await expect(page.getByText(/Order #\\d+/)).toBeVisible();
});
~~~

Only the external hosts are stubbed — the payment provider and the tile server. Your application’s own checkout and order-confirmation code runs normally, and the assertions are about *your* outcome: a confirmed order with a real order number. The test is fast and never fails because of a third party’s outage. What it deliberately no longer proves is that you can genuinely tokenise a card with the provider — that belongs in a separate, less-frequent real test against their sandbox.`,
      commonMistakes: `- Stubbing so broadly that your own backend calls are caught and your logic never actually runs
- Letting real third-party calls stay in the main suite, so an external outage turns the pipeline red for no product reason
- Stubbing the third party and keeping no real integration test anywhere, so a contract change ships unnoticed
- Copying the provider’s example response once and never checking it still matches after they update their API`,
      realWorldTip: `On a delivery team, draw an explicit line: your own services are tested for real wherever practical, third parties are stubbed in the fast suite, and each stubbed provider has at least one real test in a nightly job against its sandbox or test mode. Write down which third parties are stubbed and where their real coverage lives — otherwise "we stub payments" quietly becomes "nobody tests payments" and the gap is only discovered in production.`,
      exercise: `Identify one external dependency in your application (payment, maps, analytics, email, a feature-flag service). Write a test that stubs only that dependency’s host with \`page.route\` while letting your own backend run, and assert your application’s outcome. Then write down where a real integration test for that dependency should live and how often it should run. Deliverable: the stubbed spec plus a one-paragraph note on the real-coverage plan.`,
      reflectionQuestion: `Your checkout suite stubs the payment provider and is reliably green. The provider changes its response format overnight and real payments start failing. Which test should have caught it, and why was it not in your fast suite?`,
      knowledgeCheck: `What is the main risk of stubbing a third-party dependency and keeping no real test of it anywhere? (Answer: a change to their contract ships unnoticed because every stubbed test stays green)`,
      completionChecklist: [
        'I can stub only an external third party’s host and let my own backend run',
        'I can decide which dependencies to stub and which to keep real',
        'I keep a thin thread of real integration coverage for each stubbed provider',
      ],
      enhancements: {
        industryStory: `A team stubbed their SMS provider to avoid paying for a message on every test run — sensible, and their sign-up suite flew. Months later the provider changed the field name in its send-confirmation response. Every stubbed test stayed green because the stub still returned the old shape, but real sign-ups silently stopped sending codes. There was no real test anywhere to catch it. The fix was a single nightly test against the provider’s sandbox that would have gone red the same day the format changed.`,
        visualAid: {
          type: 'comparison',
          title: 'Stub the fast suite, keep a real thread',
          headers: ['Concern', 'Fast stubbed suite', 'Nightly real suite'],
          rows: [
            ['Speed', 'Instant, deterministic', 'Slower, hits the sandbox'],
            ['Cost', 'Free — no real calls', 'Small — test-mode calls'],
            ['Catches app logic bugs', 'Yes', 'Yes'],
            ['Catches provider contract changes', 'No', 'Yes'],
          ],
        },
        davidTip: `When you stub a third party, match on its exact host, not a wildcard that could swallow your own API. \`page.route('https://api.paymentprovider.com/**', ...)\` is safe; \`page.route('**/api/**', ...)\` will quietly intercept your own backend too and hollow out the test.`,
      },
    },
    {
      lessonNumber: 4,
      title: 'Modifying Requests & Responses',
      estimatedTime: '18 minute read',
      lessonOverview: `Between fully passing a request through and fully faking it lies a middle ground: change part of it. \`route.abort\`, \`route.continue\` with overrides, and \`route.fulfill\` built from the real response let you block a call, tweak an outgoing header, or patch one field of the returned data — powerful for testing offline behaviour, auth, and specific data conditions.`,
      learningObjectives: [
        'Block requests with route.abort to simulate offline or blocked resources',
        'Override request method, headers, URL or post data with route.continue',
        'Patch a real response by fetching it and re-serving a modified body',
      ],
      lessonNotes: `## Three ways to intervene
Beyond passing through (\`continue\`) and fully faking (\`fulfill\`), a \`Route\` gives you finer control:

- \`route.abort()\` — kill the request outright. Use it to simulate a failed image load, a blocked analytics call, or a network drop.
- \`route.continue({ ... })\` — let the request proceed but change it first: override the \`method\`, \`headers\`, \`url\` or \`postData\`.
- \`route.fulfill({ response, ... })\` — fetch the real response, then serve a modified version of it, so you patch one field and keep the rest genuine.

## Blocking with abort
\`route.abort()\` is the simplest intervention and a surprisingly useful one:

~~~ts
await page.route('**/*.{png,jpg,jpeg}', (route) => route.abort());
~~~

That blocks all images — handy for testing that your layout survives missing media, or for speeding up tests that do not care about pictures. Aborting an API call lets you test how the app behaves when a specific request simply never completes.

## Overriding an outgoing request
\`continue\` accepts overrides, so you can change what the app sends without touching its code:

~~~ts
await page.route('**/api/**', async (route) => {
  const headers = { ...route.request().headers(), 'x-test-user': 'reviewer' };
  await route.continue({ headers });
});
~~~

This injects a header on every API call — useful for feature flags, test personas or auth tokens — while the request otherwise proceeds normally.

## Patching a real response
Sometimes you want *mostly* the real response with one value changed. Fetch it, edit it, re-serve it:

~~~ts
await page.route('**/api/profile', async (route) => {
  const response = await route.fetch();
  const json = await response.json();
  json.plan = 'enterprise'; // force the condition you want to test
  await route.fulfill({ response, json });
});
~~~

Now the test runs against genuine data with exactly one field bent to the case you care about — closer to reality than a fully invented fixture, while still deterministic on the bit that matters.

## The same warning, sharpened
Every one of these tricks moves the test further from what a real user experiences. An injected header, a patched field, a blocked resource — each is an assumption you have baked in. The test proves the app behaves correctly *given that modification*; it does not prove the modification reflects production. Use the lightest intervention that gets you the condition, and keep sight of how far you have stepped from reality.

## Key takeaway
\`route.abort\`, \`route.continue\` with overrides and response-patching via \`route.fetch\` give you precise control over individual requests and responses; prefer the lightest touch that produces the condition, and remember each modification is one more assumption the green result now depends on.`,
      workedExample: `Simulating an offline image, injecting a test header, and patching one field of a real response:

~~~ts
import { test, expect } from '@playwright/test';

test('layout survives when avatar images fail to load', async ({ page }) => {
  await page.route('**/avatars/**', (route) => route.abort());

  await page.goto('/team');
  // The names must still render even though the images were blocked.
  await expect(page.getByRole('heading', { name: 'Our team' })).toBeVisible();
  await expect(page.getByText('Priya Patel')).toBeVisible();
});

test('enterprise-only banner shows for an enterprise plan', async ({ page }) => {
  // Take the real profile response and bend a single field.
  await page.route('**/api/profile', async (route) => {
    const response = await route.fetch();
    const json = await response.json();
    json.plan = 'enterprise';
    await route.fulfill({ response, json });
  });

  await page.goto('/settings');
  await expect(page.getByText('Enterprise features enabled')).toBeVisible();
});
~~~

The first test aborts avatar requests to prove the page does not fall apart without images. The second fetches the genuine profile response and changes only \`plan\` to \`'enterprise'\`, so every other field stays real — a far more faithful way to test the enterprise banner than hand-writing a whole profile fixture. In both cases the assertion is about the resulting UI, and in both cases the green result is conditional on the modification you introduced.`,
      commonMistakes: `- Using \`route.abort\` to hide a failing request instead of investigating why it fails
- Overriding headers or post data so heavily the request no longer resembles anything the app would really send
- Patching several fields of a response until it is effectively a full fixture, but pretending it is "the real data"
- Forgetting that \`route.fetch\` makes a real network call, so a patched-response test still depends on the backend being up`,
      realWorldTip: `On a delivery team, reach for response-patching (\`route.fetch\` then \`fulfill\`) when you need a rare data condition — an enterprise plan, an expired trial, a specific error code — that is genuinely hard to set up in test data. It keeps the response mostly real, so it drifts from production far less than a hand-built fixture. But document every field you bend: the next engineer needs to know which parts of that "real" response were actually forced, or they will trust a value the test invented.`,
      exercise: `Write three tests using request/response modification: one that \`abort\`s a category of resource and asserts the page still works, one that injects a custom header with \`continue\` and confirms the resulting behaviour, and one that fetches a real response and patches a single field before re-serving it. Deliverable: the three specs, each with a comment naming exactly which part of the request or response you modified and why.`,
      reflectionQuestion: `You patched one field of a real response to test an edge case, and the test is green. In what specific way is this test more trustworthy than a fully invented fixture — and in what way is it still not the real thing?`,
      knowledgeCheck: `Which Route method blocks a request outright, letting you simulate a failed or offline resource? (Answer: route.abort)`,
      completionChecklist: [
        'I can block requests with route.abort to simulate offline or blocked resources',
        'I can override a request’s headers, method or body with route.continue',
        'I can patch a real response by fetching it and re-serving a modified body',
      ],
      enhancements: {
        badGood: {
          label: 'inventing vs patching a response',
          bad: `~~~ts
// Hand-builds a whole profile just to flip one flag — every other field is a guess.
await page.route('**/api/profile', async (route) => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ id: 1, name: 'Test', plan: 'enterprise', /* ...guessed fields */ }),
  });
});
~~~`,
          good: `~~~ts
// Keeps the real response, bends only the field under test.
await page.route('**/api/profile', async (route) => {
  const response = await route.fetch();
  const json = await response.json();
  json.plan = 'enterprise';
  await route.fulfill({ response, json });
});
~~~`,
        },
        davidTip: `Blocking images and fonts with \`route.abort\` can shave real time off a large suite that does not assert on them. Do it in a shared fixture rather than per test, and only where the visuals genuinely do not matter to what you are checking.`,
        miniChallenge: `Take a test that currently uses a full invented fixture and rewrite it to fetch the real response and patch only the one field it actually cares about. Note how many fewer assumptions the test now bakes in.`,
      },
    },
    {
      lessonNumber: 5,
      title: 'When to Mock — and When Not To',
      estimatedTime: '17 minute read',
      lessonOverview: `Mocking is a trade, not a default. It buys control, speed and determinism; it risks testing a fantasy version of a system that behaves differently in production. This closing lesson is about choosing deliberately — what to mock, what to keep real, and how to keep enough genuine end-to-end coverage that your green suite still means something.`,
      learningObjectives: [
        'Weigh the control and speed of mocking against the risk of testing a fantasy',
        'Decide per dependency whether to mock, stub, patch or keep real',
        'Design a layered strategy that keeps meaningful end-to-end coverage',
      ],
      lessonNotes: `## The trade in one sentence
Mocking swaps *fidelity* for *control*. Every mock makes a test faster, more deterministic and able to reach conditions you could not otherwise trigger — and, in the same move, stops the test from proving anything about the real thing it replaced.

## What mocking buys
- **Speed** — no network, no waiting on slow services.
- **Determinism** — the same response every run, so no flakiness from live data.
- **Reach** — errors, empty states and edge cases you cannot easily produce for real.
- **Isolation** — a failure points at your code, not someone else’s outage.

## What mocking costs
- **Contract risk** — the real service can change its shape while your fixture does not, and every test stays green.
- **Fantasy risk** — you can accidentally test behaviour that only exists in your mock, never in production.
- **Maintenance** — fixtures rot; they need regenerating from real responses as APIs evolve.

## A decision, dependency by dependency
There is no blanket rule — decide per dependency:

- **Your own backend, happy path** — prefer real where practical; it is your code and your contract, and a real test catches integration bugs a mock hides.
- **Your own backend, hard-to-trigger states** — mock the specific state (500, empty, slow) with \`fulfill\`, and keep at least one real happy-path test.
- **Third parties (payment, maps, analytics)** — stub in the fast suite for speed and cost, and keep a thin real thread against their sandbox.
- **Rare data conditions** — patch a real response (Lesson 4) rather than invent a whole fixture, to stay close to reality.

## The layered strategy
Think in layers, not either/or. A large, fast base of mocked and stubbed tests gives quick, deterministic feedback on your application’s logic and edge cases. A smaller layer of real end-to-end tests — your own stack, real backend, third parties in test mode — runs less often and guards the contracts the mocks assume. The fast layer tells you your code is internally correct; the real layer tells you it actually works with the world. You need both. A suite that is all mocks is fast and confidently wrong the day a contract changes; a suite that is all real is slow and flaky and gets ignored.

## The line to remember
A test passing against a mock proves the app works against **your assumptions**. That is genuinely valuable — assumptions are worth testing — but it is not the same as proving the app works. Keep the two clearly separated in your head and in your pipeline, and let each kind of test make the claim it is actually entitled to make.

## Key takeaway
Mock deliberately, dependency by dependency, trading fidelity for control only where the control is worth it; build a fast mocked layer over a smaller real end-to-end layer, and never let a green mocked suite stand in for proof that the app works with the real world.`,
      workedExample: `A layered structure that says out loud which claim each test is entitled to make:

~~~ts
import { test, expect } from '@playwright/test';

// FAST LAYER — mocked. Proves the app handles a response shape correctly.
// Claim: "given this response, the UI behaves." Not: "the server sends this."
test.describe('orders @mocked', () => {
  test('renders an empty state', async ({ page }) => {
    await page.route('**/api/orders', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: { orders: [] } }),
      }),
    );
    await page.goto('/orders');
    await expect(page.getByText('You have no orders yet')).toBeVisible();
  });
});

// REAL LAYER — no routing. Proves the app and the real backend actually agree.
// Runs less often (e.g. nightly) and guards the contract the mocks assume.
test.describe('orders @e2e', () => {
  test('loads real orders end to end', async ({ page }) => {
    await page.goto('/orders');
    // Hits the real API; asserts the page renders whatever genuinely came back.
    await expect(page.getByRole('heading', { name: 'Your orders' })).toBeVisible();
    await expect(page.getByRole('listitem')).not.toHaveCount(0);
  });
});
~~~

The two describe blocks are tagged so the pipeline can run \`@mocked\` on every push for fast feedback and \`@e2e\` on a nightly schedule against a real environment. The mocked test makes a modest, honest claim — the UI handles an empty response — while the end-to-end test guards the contract the mock assumes. Filter them with \`npx playwright test --grep @mocked\` or \`--grep @e2e\`. Neither layer pretends to be the other, and that honesty is the whole point.`,
      commonMistakes: `- Treating mocking as the default and reaching for it before asking whether a real test would do
- Mocking your own backend everywhere, so no test ever proves your app and your API actually agree
- Running only the fast mocked layer and quietly dropping the real end-to-end tests because they are slower
- Presenting a wall of green mocked tests to stakeholders as evidence "everything works"`,
      realWorldTip: `On a delivery team, make the mock/real split explicit in the test architecture: tag tests, run the mocked layer on every push and the real end-to-end layer on a schedule, and agree as a team what must have real coverage — usually money, auth and anything a user cannot recover from. When someone proposes mocking a new dependency, the question in review is "what real test still proves this works?" If the answer is "none", you have not saved time, you have moved the risk somewhere you will not see it until production.`,
      exercise: `Take one feature in your application and design its test coverage as two layers. List which calls you would mock or stub and why, which you would keep real, and where the real end-to-end test lives and how often it runs. Then write one representative test from each layer, tagged so they can be run separately. Deliverable: the two tagged specs plus a short table of every dependency in the feature and your mock/real decision for each.`,
      reflectionQuestion: `A colleague says "our suite is a thousand tests and all green, so the app works". Given everything in this module, what is the single most important question you would ask before agreeing?`,
      knowledgeCheck: `A test passing against a mock proves the app works against what? (Answer: your assumptions — the response you told the mock to return, not the real service’s behaviour)`,
      completionChecklist: [
        'I can weigh the control and speed of mocking against the risk of testing a fantasy',
        'I can decide per dependency whether to mock, stub, patch or keep real',
        'I design layered coverage that keeps a meaningful real end-to-end thread',
      ],
      enhancements: {
        industryStory: `A team was proud of a fast, fully mocked suite that stayed green through every release — until a release where it stayed green and the app was broken for every user. An upstream service had changed its response shape; every mock still returned the old one. The suite had quietly become a test of the team’s year-old assumptions rather than of the live system. They kept the fast mocked layer for feedback but added a small nightly end-to-end run against real services, and made the rule explicit: mocked tests prove the code, real tests prove the integration, and only both together prove the product.`,
        visualAid: {
          type: 'flow',
          title: 'Choosing whether to mock a dependency',
          steps: [
            { label: 'Is it your own backend, happy path?', detail: 'Prefer real — it is your contract to verify.' },
            { label: 'Is the state hard to trigger for real?', detail: 'Mock that specific state, keep a real happy-path test.' },
            { label: 'Is it a flaky or costly third party?', detail: 'Stub in the fast suite, keep a nightly real test.' },
            { label: 'Do you need a rare data condition?', detail: 'Patch a real response rather than invent a fixture.' },
            { label: 'Whatever you mocked — where is the real coverage?', detail: 'If the answer is nowhere, you moved risk, not removed it.' },
          ],
        },
        davidTip: `When you present test results, name the layer. "The mocked suite is green" and "the end-to-end suite is green" are different claims, and blurring them is how teams talk themselves into shipping a fantasy. Say which one you mean.`,
      },
    },
  ],
};
