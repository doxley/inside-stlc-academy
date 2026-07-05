// API Testing Masterclass — Module 7: GraphQL & Contract Testing.
// Full lesson content (base fields + enhancements). Follows the Module 1 template:
// every lesson fills every base field and a rich `enhancements` block.
export default {
  courseSlug: 'api-testing-masterclass',
  moduleNumber: 7,
  lessons: [
    {
      lessonNumber: 1,
      title: 'GraphQL vs REST',
      estimatedTime: '13 minute read',
      lessonOverview: `GraphQL takes a very different shape to REST. Before you test one, you need to understand how a single endpoint and a query language change everything about how you send requests and read responses.`,
      learningObjectives: ['Explain how GraphQL differs from REST', 'Describe the single-endpoint, query-language model', 'Recognise why GraphQL usually returns HTTP 200'],
      lessonNotes: `## One endpoint, not many
REST spreads data across many resource URLs (\`/users\`, \`/users/42/orders\`). GraphQL exposes **one endpoint** — almost always \`POST /graphql\` — and you describe exactly what you want in the request body using a **query language**.

## You ask for the shape you want
With REST the server decides the response shape. With GraphQL the client asks for precise fields, so you avoid over-fetching (too much data) and under-fetching (multiple round trips). One query can pull a user and their orders together.

## The schema is the contract
Every GraphQL API publishes a strongly-typed **schema** listing types, fields, queries and mutations. The schema *is* the contract — it tells you what is queryable before you send a thing.

## The trap for testers
Because everything goes through one endpoint, GraphQL usually replies with **HTTP 200 even when something failed**. Errors live in an \`errors\` array in the JSON body, not in the status code. Asserting on status alone is the single biggest GraphQL testing mistake — we return to it all module.`,
      workedExample: `Against \`countries.trevorblades.com\` (a public GraphQL API), send \`POST /graphql\` with the body:\n\n\`\`\`graphql\nquery {\n  country(code: "GB") {\n    name\n    capital\n    currency\n  }\n}\n\`\`\`\n\nThe response is \`200 OK\` with \`{ "data": { "country": { "name": "United Kingdom", "capital": "London", "currency": "GBP" } } }\`. Note: you asked for three fields, you got exactly three — no more, no less.`,
      commonMistakes: `- Expecting many URLs — GraphQL has one endpoint and a body-driven query
- Assuming a non-200 status signals failure the way REST does
- Thinking GraphQL "replaces" REST rather than being a different trade-off`,
      realWorldTip: `The first thing to learn on any GraphQL API is where its schema and docs live (often an in-browser explorer at the \`/graphql\` URL). The schema tells you every legal query before you write one.`,
      exercise: `Open \`https://countries.trevorblades.com\` in a browser (it serves a GraphQL explorer). Send a query asking for the \`name\` and \`emoji\` of the country with code \`"FR"\`. Note the HTTP status and where the data appears in the body.`,
      reflectionQuestion: `In GraphQL, who decides the shape of the response — the client or the server?`,
      knowledgeCheck: `In GraphQL, how many endpoints does a typical API expose for its queries and mutations? (Answer: one — usually POST /graphql)`,
      completionChecklist: ['I can explain how GraphQL differs from REST', 'I understand the single-endpoint model', 'I know errors can hide behind a 200'],
      enhancements: {
        industryStory: `A team migrated a mobile app from REST to GraphQL to cut round trips. Their old API tests were copied across almost unchanged — still asserting \`status == 200\`. They stayed green for weeks while a broken resolver quietly returned \`data: null\` with an \`errors\` array. Nobody had checked the body. The GraphQL model punished them for testing it like REST.`,
        visualAid: { type: 'comparison', title: 'GraphQL vs REST', headers: ['Dimension', 'REST', 'GraphQL'], rows: [['Endpoints', 'Many (per resource)', 'One (POST /graphql)'], ['Response shape', 'Server decides', 'Client asks for it'], ['Over/under-fetching', 'Common', 'Avoided'], ['Errors signalled by', 'HTTP status', 'errors array (often 200)'], ['Contract', 'Docs / OpenAPI', 'Typed schema']] },
        davidTip: `The hardest habit to unlearn moving from REST to GraphQL is trusting the status code. In REST a 200 means "good". In GraphQL a 200 means "the server received your request" — nothing more. Read the body every single time.`,
        miniChallenge: `Write, on paper, a GraphQL query that fetches the \`name\` and \`capital\` of the country with code \`"JP"\` from \`countries.trevorblades.com\`.`,
        modelAnswer: `## Example\n\`\`\`graphql\nquery {\n  country(code: "JP") {\n    name\n    capital\n  }\n}\n\`\`\`\nSent as \`POST /graphql\`, this returns \`200 OK\` with \`data.country.name\` = "Japan" and \`data.country.capital\` = "Tokyo".`,
        badGood: { label: 'judging a GraphQL response', bad: `The test asserts \`status == 200\` and calls it a pass — even though the body is \`{ "errors": [...], "data": null }\`.`, good: `The test asserts \`status == 200\`, that the \`errors\` field is absent, and that \`data.country.name\` equals the expected value.` },
      },
    },
    {
      lessonNumber: 2,
      title: 'Testing GraphQL Queries',
      estimatedTime: '15 minute read',
      lessonOverview: `Queries are how GraphQL reads data — the equivalent of a REST GET. This lesson shows how to send one, pass arguments, and assert on the response properly.`,
      learningObjectives: ['Send a GraphQL query and read its response', 'Pass arguments and use variables safely', 'Assert on both data and the absence of errors'],
      lessonNotes: `## A query is a read
A query fetches data and never changes it. You send it as \`POST /graphql\` with a JSON body: \`{ "query": "..." }\`. The response comes back as \`{ "data": { ... } }\`, mirroring the shape you asked for.

## Arguments and variables
You can pass **arguments** inline (\`country(code: "GB")\`) but production tests should use **variables** instead — cleaner, reusable, and safer:
\`\`\`graphql
query GetCountry($code: ID!) {
  country(code: $code) { name capital }
}
\`\`\`
with \`{ "code": "GB" }\` sent in a separate \`variables\` object.

## What to assert
- **Status** is \`200\` (necessary, not sufficient)
- **No \`errors\` field** in the body — this is the real success signal
- **\`data\` has the expected shape and values**
- **Only requested fields** are returned — an extra or missing field is a bug

## Partial data
GraphQL can return **both \`data\` and \`errors\`** — some fields resolve, others fail. Never assume the presence of \`data\` means everything worked; always check \`errors\` too.`,
      workedExample: `Send \`POST /graphql\` to \`countries.trevorblades.com\`:\n\n\`\`\`graphql\nquery GetContinent($code: ID!) {\n  continent(code: $code) {\n    name\n    countries { name }\n  }\n}\n\`\`\`\nwith variables \`{ "code": "EU" }\`. Assert: status is \`200\`; \`errors\` is absent; \`data.continent.name\` equals "Europe"; \`data.continent.countries\` is a non-empty array; every entry has a \`name\` and nothing else.`,
      commonMistakes: `- Only asserting \`status == 200\` and ignoring the \`errors\` array
- Hard-coding arguments in the query instead of using \`variables\`
- Assuming \`data\` present means success when \`errors\` may sit alongside it`,
      realWorldTip: `Write a tiny reusable assertion helper: "response is 200 AND \`errors\` is undefined AND \`data\` matches". Call it on every GraphQL query test so nobody forgets the \`errors\` check.`,
      exercise: `On \`countries.trevorblades.com\`, run a query using a variable \`$code\` to fetch the \`name\` and \`languages { name }\` of the country \`"ES"\`. Confirm the status is 200, there is no \`errors\` field, and \`data.country.languages\` contains "Spanish".`,
      reflectionQuestion: `Besides the status code, what single field tells you a GraphQL query actually succeeded?`,
      knowledgeCheck: `Which field in a GraphQL response body must you check to be sure a query truly succeeded? (Answer: the errors field — it must be absent)`,
      completionChecklist: ['I can send a query with variables', 'I assert on data and the absence of errors', 'I understand partial data responses'],
      enhancements: {
        industryStory: `A tester I worked with built a lovely GraphQL query suite that checked \`data\` values precisely — but never checked for \`errors\`. A schema change made one nested field start failing to resolve; the API returned that field as \`null\` inside \`data\` with an explanatory \`errors\` entry. The suite stayed green because it only looked at the fields it expected. One \`errors\`-must-be-absent assertion would have caught it instantly.`,
        visualAid: { type: 'timeline', title: 'Asserting a GraphQL query', steps: [{ label: 'Send', detail: 'POST /graphql with query + variables' }, { label: 'Status', detail: 'expect 200 (necessary, not sufficient)' }, { label: 'Errors', detail: 'assert the errors field is absent' }, { label: 'Data', detail: 'assert shape and values of data' }, { label: 'Fields', detail: 'confirm only requested fields returned' }] },
        davidTip: `Use named queries and variables from day one, even in exploratory testing. \`query GetCountry($code: ID!)\` reads far better in a failing test report than a string with the value baked in — and it lets you reuse the same query across data sets.`,
        miniChallenge: `Write a GraphQL query, using a \`$code\` variable, that fetches the \`name\` and \`currency\` of a country. Show the query and the accompanying \`variables\` JSON.`,
        modelAnswer: `## Example\n\`\`\`graphql\nquery GetCountry($code: ID!) {\n  country(code: $code) {\n    name\n    currency\n  }\n}\n\`\`\`\nVariables: \`{ "code": "GB" }\`. Response: \`data.country.name\` = "United Kingdom", \`data.country.currency\` = "GBP", and no \`errors\` field.`,
        badGood: { label: 'a GraphQL query test', bad: `\`expect(res.status).toBe(200)\` and nothing else — passes even when \`data\` is null and \`errors\` is populated.`, good: `\`expect(res.status).toBe(200); expect(res.body.errors).toBeUndefined(); expect(res.body.data.country.name).toBe('United Kingdom');\`` },
      },
    },
    {
      lessonNumber: 3,
      title: 'Testing GraphQL Mutations',
      estimatedTime: '15 minute read',
      lessonOverview: `Mutations are how GraphQL changes data — create, update, delete. They look similar to queries but demand extra care, because they have side effects and their errors still hide behind a 200.`,
      learningObjectives: ['Write and send a GraphQL mutation', 'Assert on the returned payload after a change', 'Handle validation errors that arrive with a 200 status'],
      lessonNotes: `## A mutation changes state
Where a query reads, a **mutation** writes — the GraphQL equivalent of \`POST\`, \`PUT\`, \`PATCH\` or \`DELETE\` in REST. It is still sent as \`POST /graphql\`. The body uses the \`mutation\` keyword:
\`\`\`graphql
mutation AddReview($stars: Int!, $text: String!) {
  addReview(stars: $stars, text: $text) {
    id
    stars
    text
  }
}
\`\`\`

## Ask for what changed
A well-designed mutation **returns the object it created or changed**. Always request those fields and assert on them — a mutation that returns nothing gives you nothing to verify.

## Errors still hide behind 200
Validation failures (missing field, bad type, business-rule breach) usually come back as \`200 OK\` with an \`errors\` array and \`data: null\`. Test the unhappy paths deliberately: send an invalid mutation and assert that \`errors\` is *present* and describes the problem.

## Mind the side effects
Mutations change real data. In tests, either use a sandbox, clean up afterwards, or follow the mutation with a query to confirm the change actually persisted.`,
      workedExample: `The SpaceX API (\`https://spacex-production.up.railway.app/\`, GraphQL) has historically allowed an \`insert_users\` mutation. A create looks like:\n\n\`\`\`graphql\nmutation AddUser($name: String!) {\n  insert_users(objects: { name: $name }) {\n    returning { id name }\n  }\n}\n\`\`\`\nAssert: status \`200\`; \`errors\` absent; \`data.insert_users.returning[0].name\` equals the name you sent; an \`id\` was assigned. Then run a follow-up query to confirm the user is really there.`,
      commonMistakes: `- Not requesting return fields, so there is nothing to assert against
- Treating a validation failure as a pass because the status is still 200
- Forgetting mutations have side effects — leaving test data behind`,
      realWorldTip: `For every mutation, write two tests: a happy path (change succeeds, payload correct, no \`errors\`) and an unhappy path (invalid input, \`errors\` present, no unintended change). The unhappy path is where the real bugs live.`,
      exercise: `Using a public sandbox GraphQL API that supports writes (e.g. the SpaceX GraphQL API's \`insert_users\` mutation), send a mutation to create a record, then a query to confirm it persisted. Deliberately send an invalid mutation (e.g. wrong field type) and confirm an \`errors\` array comes back with a 200 status.`,
      reflectionQuestion: `Why is it dangerous to judge a mutation solely by its HTTP status code?`,
      knowledgeCheck: `If a GraphQL mutation fails validation, what status code will it usually return? (Answer: 200 — the failure is described in the errors array, not the status)`,
      completionChecklist: ['I can write and send a mutation', 'I assert on the returned payload', 'I test unhappy paths where errors arrive with a 200'],
      enhancements: {
        industryStory: `A checkout team shipped a GraphQL mutation that silently ignored an invalid discount code — it returned \`200\` with a normal-looking payload and an \`errors\` entry nobody read. Orders went through at full price while the "code applied" message showed on screen. Their mutation tests only checked the status and the happy-path fields. The fix was one rule: every mutation test must also assert on the \`errors\` field, both when it should be absent and when it should be present.`,
        visualAid: { type: 'comparison', title: 'GraphQL mutation vs REST write', headers: ['Concern', 'REST', 'GraphQL mutation'], rows: [['Verb', 'POST / PUT / DELETE', 'mutation keyword'], ['Endpoint', 'Per-resource URL', 'POST /graphql'], ['Success signal', 'HTTP status (201, etc.)', 'errors absent + payload'], ['Validation error', 'Usually 4xx', 'Usually 200 + errors'], ['What to assert', 'Status + body', 'errors + returned payload']] },
        davidTip: `I always ask a mutation to return the thing it changed, then I assert on that payload rather than trusting a "success" flag. And I never test a mutation without also confirming the change persisted with a follow-up query — mutations that "succeed" but don't save are a classic silent bug.`,
        miniChallenge: `Write a GraphQL mutation, using variables, that creates a record and returns its \`id\` and one other field. List the two assertions you'd make on the response.`,
        modelAnswer: `## Example\n\`\`\`graphql\nmutation AddUser($name: String!) {\n  insert_users(objects: { name: $name }) {\n    returning { id name }\n  }\n}\n\`\`\`\nAssertions: (1) \`errors\` is absent and status is 200; (2) \`data.insert_users.returning[0].name\` equals the name sent and \`id\` is present.`,
        badGood: { label: 'a mutation test', bad: `Sends the mutation, asserts \`status == 200\`, moves on — an invalid input that returns \`errors\` with \`data: null\` still passes.`, good: `Happy path asserts \`errors\` absent and the returned payload; a second test sends invalid input and asserts \`errors\` is present with a meaningful message and no record was created.` },
      },
    },
    {
      lessonNumber: 4,
      title: 'Contract Testing Fundamentals',
      estimatedTime: '16 minute read',
      lessonOverview: `Contract testing checks that two services still agree on the shape of the data they exchange — without running both together. It catches integration breakages far earlier and cheaper than end-to-end tests.`,
      learningObjectives: ['Explain what a contract test is and why it exists', 'Describe the consumer and provider roles', 'Distinguish contract testing from integration and E2E testing'],
      lessonNotes: `## The problem it solves
When a **consumer** (say, a mobile app) depends on a **provider** (an API), a change to the provider can silently break the consumer. Full end-to-end tests catch this but are slow, flaky and run late. Contract testing catches it in each team's own pipeline, in seconds.

## Consumer and provider
- The **consumer** defines a **contract**: "when I call \`POST /graphql\` for a country, I expect \`data.country.name\` as a string."
- The **provider** is then verified against that contract: "do I still return exactly that?"

Tools like **Pact** work this way. The consumer's tests generate a contract file; the provider replays it against the real service and fails if it no longer matches.

## Not the same as integration testing
- **Contract test**: does each side still honour the agreed shape? Runs in isolation, fast.
- **Integration/E2E test**: do the real systems work together end to end? Runs late, slow, brittle.

## Why it fits APIs and GraphQL
Both REST and GraphQL are contracts between systems. Contract testing turns "we think we still agree" into an automated, per-commit check — and for GraphQL the typed schema makes the contract explicit.`,
      workedExample: `A mobile app (consumer) needs a country's \`name\` and \`emoji\`. Its Pact-style contract states: a request for country \`"GB"\` must return \`data.country.name\` (string) and \`data.country.emoji\` (string). This generates a contract file. The API team (provider) runs their build; Pact replays the expected request against their service and verifies the response still contains both fields with those types. If a developer renames \`emoji\` to \`flag\`, the provider verification fails immediately — long before the app ever calls the live API.`,
      commonMistakes: `- Confusing contract testing with full integration testing
- Writing contracts so strict they break on harmless additions
- Only the consumer participates — the provider never verifies the contract`,
      realWorldTip: `Contract tests belong in *both* pipelines. The consumer publishes the contract; the provider verifies it on every build. A contract nobody verifies on the provider side is just documentation that goes stale.`,
      exercise: `Pick two services you know (or the countries API as provider and a hypothetical app as consumer). Write, in plain English, the contract the consumer depends on: the exact request and the fields and types it expects back. Then list one provider change that would break it.`,
      reflectionQuestion: `Why can a contract test catch a breaking change earlier than an end-to-end test?`,
      knowledgeCheck: `In consumer-driven contract testing, which side defines the expected request/response shape? (Answer: the consumer)`,
      completionChecklist: ['I can explain what contract testing is', 'I can describe the consumer and provider roles', 'I can distinguish it from integration/E2E testing'],
      enhancements: {
        industryStory: `Two teams shared an API: a payments service (provider) and a checkout app (consumer). A provider developer renamed a field from \`total\` to \`amount\`, assuming nobody relied on the old name. It passed every unit test. It broke checkout in production the next morning. After that incident they adopted Pact: the consumer published a contract, the provider verified it on every build, and the same rename was caught in CI in under a minute — before it ever merged.`,
        visualAid: { type: 'comparison', title: 'Contract vs integration vs E2E testing', headers: ['Aspect', 'Contract test', 'Integration / E2E'], rows: [['Scope', 'Agreed shape between two sides', 'Real systems working together'], ['Runs', 'In each pipeline, isolated', 'Late, both systems live'], ['Speed', 'Seconds', 'Minutes+'], ['Flakiness', 'Low', 'Higher'], ['Catches', 'Shape/type breakages early', 'End-to-end behaviour']] },
        davidTip: `I think of a contract test as a promise with a witness. The consumer writes the promise; the provider's pipeline is the witness that checks it's still kept. If only one side runs it, you don't have contract testing — you have wishful thinking.`,
        miniChallenge: `In two or three sentences, describe a consumer-driven contract for the countries API: the request the consumer sends and the exact fields and types it depends on.`,
        modelAnswer: `## Example\nThe consumer sends \`POST /graphql\` with a query for \`country(code: "GB") { name emoji }\`. The contract states the response must contain \`data.country.name\` (string) and \`data.country.emoji\` (string). The provider verifies on each build that both fields are still returned with those types; renaming or removing either breaks verification.`,
        badGood: { label: 'a contract test setup', bad: `The consumer team writes a contract and runs it against a stub. The provider never verifies it, so a field rename ships and breaks the consumer anyway.`, good: `The consumer publishes the contract to a broker; the provider verifies it on every build and cannot merge a change that violates the agreed shape.` },
      },
    },
    {
      lessonNumber: 5,
      title: 'Catching Breaking Changes',
      estimatedTime: '17 minute read',
      lessonOverview: `The whole point of contracts and schemas is to catch breaking changes before they reach users. This lesson shows what counts as breaking, how schema versioning helps, and how to build a safety net that fails fast.`,
      learningObjectives: ['Identify what makes a change breaking vs safe', 'Explain how schema and versioning strategies reduce risk', 'Design a contract check that fails fast in CI'],
      lessonNotes: `## What is a breaking change?
A change is **breaking** if it can break an existing consumer. In an API or GraphQL schema, the usual culprits are:
- **Removing** a field, type, query or mutation
- **Renaming** a field (a remove + add in disguise)
- **Making an optional field required**, or **tightening a type** (\`String\` → \`ID\`)
- **Changing a field's meaning** even if the type is unchanged

**Safe (additive)** changes: adding a new optional field, a new query, or a new type. GraphQL encourages this — you *add* to the schema rather than versioning the whole API.

## How schemas and versioning help
- GraphQL's typed **schema** makes the contract machine-readable, so tools can diff two schema versions and flag breaking changes automatically.
- REST often uses **versioned URLs** (\`/v1\`, \`/v2\`) to introduce breaking changes without disturbing existing consumers.
- GraphQL prefers **deprecation** (\`@deprecated\`) over versioning — mark a field deprecated, watch usage fall, then remove.

## The safety net
Put a **schema/contract diff** in CI. On every provider change it compares the new schema against the published contracts and **fails the build** if a consumer would break. Fast feedback, before merge — not a production incident.`,
      workedExample: `A provider renames \`emoji\` to \`flag\` in the countries schema. In CI, a schema-diff tool compares old and new schemas and reports: "BREAKING: field \`Country.emoji\` was removed." Simultaneously, Pact provider verification replays the consumer's contract — which still expects \`emoji\` — and fails with "expected \`data.country.emoji\`, got undefined." Both checks fail the build in seconds. The safe alternative: **add** \`flag\`, mark \`emoji\` \`@deprecated\`, migrate consumers, then remove \`emoji\` in a later release once usage is zero.`,
      commonMistakes: `- Treating a rename as harmless — it removes the old name and breaks consumers
- Removing a "surely unused" field without checking real usage first
- Relying on manual review to spot breaking changes instead of an automated diff`,
      realWorldTip: `Prefer additive change and deprecation over removal. Add the new field, mark the old one \`@deprecated\`, watch the usage metrics fall to zero, then remove it. Most "breaking" changes can be made non-breaking with a little patience.`,
      exercise: `Take the countries API schema. Write down three changes a developer might make: one clearly safe (additive), one clearly breaking (removal or rename), and one subtle breaker (tightening a type or making a field required). For the breaking ones, state which contract check would catch them and how you'd stage the change safely.`,
      reflectionQuestion: `Why is renaming a field a breaking change even though "nothing was removed" from the consumer's point of view?`,
      knowledgeCheck: `Is adding a new optional field to a GraphQL schema a breaking change? (Answer: no — additive changes are safe; removing or renaming fields is breaking)`,
      completionChecklist: ['I can tell breaking changes from safe ones', 'I understand deprecation and versioning strategies', 'I can design a fail-fast contract check for CI'],
      enhancements: {
        industryStory: `A provider team removed a field they were "certain" no one used. It turned out a legacy reporting job queried it nightly; the job failed silently and finance discovered a fortnight of missing numbers. They introduced a schema-diff gate in CI plus consumer contracts, and adopted a strict rule: never remove, always deprecate first and wait for usage to hit zero. The next attempted removal was blocked in CI within seconds — the exact incident, prevented.`,
        visualAid: { type: 'timeline', title: 'Safely retiring a field', steps: [{ label: 'Add', detail: 'introduce the replacement field (additive, safe)' }, { label: 'Deprecate', detail: 'mark the old field @deprecated' }, { label: 'Migrate', detail: 'move consumers to the new field' }, { label: 'Measure', detail: 'watch old-field usage fall to zero' }, { label: 'Remove', detail: 'delete the old field once unused' }] },
        davidTip: `The best breaking-change strategy is to not break things. Additive plus deprecation gets you almost everywhere. When you genuinely must break, do it behind a version and give consumers a migration window — and let CI, not a human reviewer, be the one that says no.`,
        miniChallenge: `List three schema changes to the countries API — one safe, one breaking, one subtle breaker — and name the check that would catch each breaking one.`,
        modelAnswer: `## Example\nSafe: add \`Country.timezone\` as an optional field. Breaking: rename \`Country.emoji\` to \`Country.flag\` — caught by both schema-diff (field removed) and Pact provider verification (contract expects \`emoji\`). Subtle breaker: change \`country(code: String)\` to \`country(code: ID!)\`, making the argument required and its type stricter — caught by schema-diff flagging a tightened, non-nullable argument; stage it by first accepting both, then deprecating the loose form.`,
        badGood: { label: 'shipping a schema change', bad: `A developer renames a field and merges after a green unit-test run; consumers break in production the next day.`, good: `The rename triggers a CI schema-diff and provider contract verification, both fail before merge; the team instead adds the new field, deprecates the old, and removes it only once usage is zero.` },
        managersReview: { intro: `If I reviewed your GraphQL and contract-testing work as a lead, here is what I'd look for:`, strengths: ['You check the errors field on every query and mutation, never status alone', 'Mutations assert on the returned payload and test unhappy paths', 'You can explain consumer/provider contract testing and its value'], improvements: ['Turn your ad-hoc GraphQL checks into a reusable "200 + no errors + data" assertion helper', 'Add a schema-diff or contract gate to CI rather than relying on review', 'Document which changes are breaking so the whole team shares the rule'], gaps: ['Only testing happy paths and never asserting errors is present when it should be', 'A contract the provider never verifies — documentation, not a test', 'Removing fields without checking real consumer usage first'] },
        portfolioBuilder: `Add a "GraphQL & Contract Testing" section to your portfolio: a small suite against \`countries.trevorblades.com\` (a query test and, if you can, a mutation test on a sandbox API), each asserting status, absence/presence of \`errors\`, and data shape. Include a one-page note describing a consumer-driven contract, a list of breaking vs safe changes, and how you'd gate them in CI.`,
        resourcePreview: { name: 'GraphQL & Contract Testing Checklist', purpose: 'A one-page reference for asserting GraphQL responses (status + errors + data) and classifying breaking vs safe schema changes.', whenToUse: 'Keep it open whenever you test a GraphQL API or review a schema change.', formats: ['PDF', 'Markdown'] },
      },
    },
  ],
};
