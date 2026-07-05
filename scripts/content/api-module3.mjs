// API Testing Masterclass — Module 3: JSON & XML.
// Full lesson content (base fields + enhancements). Matches the Module 1 template:
// every lesson fills every base field and a rich `enhancements` block.
export default {
  courseSlug: 'api-testing-masterclass',
  moduleNumber: 3,
  lessons: [
    {
      lessonNumber: 1,
      title: 'JSON Structure & Data Types',
      estimatedTime: '12 minute read',
      lessonOverview: `JSON is the format almost every modern API speaks. Before you can assert on a response, you need to read its shape and know exactly what data types it uses.`,
      learningObjectives: ['Describe the two JSON container types', 'Name the six JSON value types', 'Tell a string from a number, boolean and null'],
      lessonNotes: `## What JSON is
**JSON** (JavaScript Object Notation) is a lightweight text format for structured data. It is human-readable, language-agnostic, and the default body type for REST APIs.

## Two containers
- **Object** — an unordered set of key/value pairs inside \`{ }\`. Keys are always double-quoted strings: \`{ "name": "Ada" }\`.
- **Array** — an ordered list inside \`[ ]\`: \`[ "a", "b", "c" ]\`.

## Six value types
1. **String** — always double quotes: \`"hello"\`
2. **Number** — no quotes, integer or decimal: \`42\`, \`3.14\`
3. **Boolean** — \`true\` or \`false\` (no quotes)
4. **Null** — \`null\` (means "no value", not the same as \`0\` or \`""\`)
5. **Object** — nested \`{ }\`
6. **Array** — nested \`[ ]\`

## Why type matters
\`"42"\` (string) and \`42\` (number) are different values. A test that expects a number but gets a string will — or should — fail. Reading types correctly is the foundation of every JSON assertion you'll write.`,
      workedExample: `A user response: \`{ "id": 7, "name": "Ada", "active": true, "nickname": null, "roles": ["admin","qa"] }\`. Here \`id\` is a **number**, \`name\` is a **string**, \`active\` is a **boolean**, \`nickname\` is **null**, and \`roles\` is an **array of strings**. Five different types in one small object.`,
      commonMistakes: `- Treating \`"42"\` (string) and \`42\` (number) as the same value
- Thinking \`null\` means \`0\` or an empty string
- Forgetting JSON keys and strings must use double quotes, never single`,
      realWorldTip: `The most common JSON bug in the wild is a field that switches type between builds — an \`id\` that was a number quietly becomes a string. Assert on the type, not just the value.`,
      exercise: `Take the JSON \`{ "price": 9.99, "inStock": false, "tags": ["sale"], "note": null }\` and write down the data type of each of the four values.`,
      reflectionQuestion: `Why is \`"42"\` not the same value as \`42\` in JSON?`,
      knowledgeCheck: `Which two JSON types are containers that hold other values? (Answer: object and array)`,
      completionChecklist: ['I can name the two JSON containers', 'I can name the six JSON value types', 'I can tell a string from a number, boolean and null'],
      enhancements: {
        industryStory: `A payments integration broke on release day because the vendor changed \`amount\` from a number (\`1050\`) to a string (\`"1050"\`). Every downstream calculation silently produced nonsense. The team hadn't been asserting on type — only that the field existed. One type check would have caught it in staging.`,
        visualAid: { type: 'comparison', title: 'JSON value types at a glance', headers: ['Type', 'Example', 'Quoted?'], rows: [['String', '"Ada"', 'Yes'], ['Number', '42 / 3.14', 'No'], ['Boolean', 'true / false', 'No'], ['Null', 'null', 'No'], ['Object', '{ "k": 1 }', 'Keys only'], ['Array', '[ 1, 2, 3 ]', 'No']] },
        davidTip: `Early in my career I lost half a day to a "value mismatch" that was really a type mismatch — the API returned \`"true"\` as a string, not the boolean \`true\`. Now the first thing I check on any new field is its type.`,
        miniChallenge: `Given \`{ "price": 9.99, "inStock": false, "tags": ["sale"], "note": null }\`, write the data type of each value.`,
        modelAnswer: `## Example\n\`price\` → number, \`inStock\` → boolean, \`tags\` → array (of strings), \`note\` → null.`,
        badGood: { label: 'checking a field', bad: `The test only checks that \`amount\` exists and equals 1050 — it passes even when the API returns the string \`"1050"\`.`, good: `The test checks \`amount\` exists, is of type \`number\`, and equals 1050 — so a type change fails the test.` },
        resourcePreview: { name: 'JSON Types Cheat Sheet', purpose: 'One-page reference for the six JSON value types with examples.', whenToUse: 'Keep it open while you work through Module 3.', formats: ['PDF'] },
      },
    },
    {
      lessonNumber: 2,
      title: 'Navigating Nested JSON',
      estimatedTime: '13 minute read',
      lessonOverview: `Real API responses are rarely flat — objects contain objects, and arrays contain more objects. This lesson teaches the path notation you'll use to reach any value.`,
      learningObjectives: ['Use dot notation to reach nested object fields', 'Use bracket notation to reach array elements', 'Combine both to reach deeply nested values'],
      lessonNotes: `## Dot notation for objects
To reach a field inside an object, chain keys with dots. Given \`{ "user": { "address": { "city": "Leeds" } } }\`, the path to the city is \`user.address.city\`.

## Bracket notation for arrays
Arrays are **zero-indexed** — the first element is \`[0]\`. Given \`{ "roles": ["admin","qa"] }\`, \`roles[0]\` is \`"admin"\` and \`roles[1]\` is \`"qa"\`.

## Combining the two
Most paths mix both. Given an \`orders\` array of objects, the first order's total is \`orders[0].total\`; the second item on the first order is \`orders[0].items[1]\`.

## A note on the root
Some responses are an array at the **top level**: \`[ { "id": 1 }, { "id": 2 } ]\`. Then the first id is simply \`[0].id\` — there's no wrapping key.

## Why this matters
Every JSON assertion and every JSON Schema you write starts by naming a path. Get the path wrong and the test fails for the wrong reason — a "missing" field that was really one bracket away.`,
      workedExample: `Response: \`{ "user": { "name": "Ada", "orders": [ { "id": 1, "items": ["mug"] }, { "id": 2, "items": ["pen","pad"] } ] } }\`. Path \`user.name\` → \`"Ada"\`. Path \`user.orders[1].id\` → \`2\`. Path \`user.orders[1].items[0]\` → \`"pen"\`.`,
      commonMistakes: `- Starting arrays at \`[1]\` — JSON arrays are zero-indexed, so the first element is \`[0]\`
- Using dot notation on an array (\`orders.0\`) instead of a bracket (\`orders[0]\`)
- Forgetting the response root can itself be an array, so paths start with \`[0]\``,
      realWorldTip: `When a path fails, paste the response into a JSON viewer that shows the exact path on hover. It turns "why is this null?" into a five-second answer.`,
      exercise: `Given \`{ "data": { "items": [ { "sku": "A1" }, { "sku": "B2" } ] } }\`, write the path that returns \`"B2"\`.`,
      reflectionQuestion: `What is the index of the first element in a JSON array, and why does it matter?`,
      knowledgeCheck: `In the object \`{ "user": { "roles": ["admin","qa"] } }\`, what does the path \`user.roles[1]\` return? (Answer: "qa")`,
      completionChecklist: ['I can reach object fields with dot notation', 'I can reach array elements with bracket notation', 'I can combine both to reach a deeply nested value'],
      enhancements: {
        industryStory: `A regression suite kept reporting a "missing" \`total\`. The field was never missing — the response had changed from a single object to an array of one, so the real path was now \`[0].total\`. The tester had assumed the shape instead of looking at it. Ten minutes lost to an off-by-one-level path.`,
        visualAid: { type: 'timeline', title: 'Building a path step by step', steps: [{ label: 'Root', detail: 'start at the top: user' }, { label: 'Into an object', detail: 'user.orders' }, { label: 'Into an array', detail: 'user.orders[1]' }, { label: 'Into a nested object', detail: 'user.orders[1].id → 2' }] },
        davidTip: `When I'm learning a new API I keep a scratch note of the exact paths I care about — \`data.items[0].sku\`, \`meta.total\`. It saves me re-reading the whole response every time I write an assertion.`,
        miniChallenge: `Given \`{ "data": { "items": [ { "sku": "A1" }, { "sku": "B2" } ] } }\`, write the path that returns \`"B2"\`.`,
        modelAnswer: `## Example\n\`data.items[1].sku\` → \`"B2"\`. \`items\` is an array, so the second element is index \`[1]\`, and \`.sku\` reaches into that object.`,
        badGood: { label: 'reaching an array element', bad: `Path \`user.orders.1.id\` — dot notation on an array. Most tools return undefined and the test fails confusingly.`, good: `Path \`user.orders[1].id\` — bracket notation for the array index, dot for the object field. Returns \`2\` cleanly.` },
      },
    },
    {
      lessonNumber: 3,
      title: 'Asserting on JSON Responses',
      estimatedTime: '25 minutes',
      lessonOverview: `Reading JSON is passive; asserting on it is testing. In this hands-on lesson you write real Postman tests that check status, values and types in a JSON response.`,
      learningObjectives: ['Write a Postman test that asserts a JSON field value', 'Assert on a nested field and its data type', 'Explain why a specific assertion beats a vague one'],
      lessonNotes: `## The three things worth asserting
1. **Status** — did the request succeed? \`pm.response.to.have.status(200)\`
2. **Value** — is a field what you expect? \`expect(body.id).to.eql(7)\`
3. **Type** — is it the right kind of value? \`expect(body.id).to.be.a('number')\`

## Writing tests in Postman
Postman's **Tests** tab runs JavaScript after the response arrives. Parse the body once, then assert:
\`\`\`
const body = pm.response.json();
pm.test('id is 7 and a number', () => {
  pm.expect(body.id).to.eql(7);
  pm.expect(body.id).to.be.a('number');
});
\`\`\`

## Nested and array assertions
Use the paths from Lesson 2: \`body.user.orders[0].id\`. Assert on what actually matters — the values a real user or downstream system depends on.

## Specific beats vague
\`expect(body).to.exist\` passes on almost anything. \`expect(body.status).to.eql('active')\` fails the moment the value is wrong. A good assertion is a **narrow** one.`,
      workedExample: `For \`GET https://jsonplaceholder.typicode.com/users/1\`, the Tests tab: \`const b = pm.response.json();\` then \`pm.test('user 1', () => { pm.expect(pm.response.code).to.eql(200); pm.expect(b.id).to.eql(1); pm.expect(b.name).to.be.a('string'); pm.expect(b.address.city).to.exist; });\`. This checks status, a value, a type and a nested field in one test.`,
      commonMistakes: `- Asserting only \`to.exist\` when you could assert the exact value
- Calling \`pm.response.json()\` many times instead of parsing once into a variable
- Checking the value but never the type, so a \`"7"\` string slips past`,
      realWorldTip: `Write assertions a future teammate can read. \`pm.test('order total includes VAT', ...)\` documents intent far better than \`pm.test('test1', ...)\`.`,
      exercise: `In Postman, send \`GET https://jsonplaceholder.typicode.com/users/1\` and add a test that asserts the status is 200, \`id\` equals 1, and \`name\` is a string. Confirm all assertions pass.`,
      reflectionQuestion: `Why is asserting an exact value more useful than asserting only that a field exists?`,
      knowledgeCheck: `In a Postman test, which method parses the response body into a JSON object? (Answer: pm.response.json())`,
      completionChecklist: ['I wrote a Postman test that asserts a field value', 'I asserted on a nested field and a data type', 'All my assertions passed against a live response'],
      enhancements: {
        industryStory: `A team had 200 API tests and a green pipeline they were proud of. When I looked, nearly every test was \`expect(response).to.exist\`. They were asserting that a response came back at all — not that it was correct. We rewrote them to check real values and immediately found three endpoints returning stale data.`,
        visualAid: { type: 'comparison', title: 'What each assertion actually proves', headers: ['Assertion', 'Proves', 'Misses'], rows: [['to.exist', 'A value is present', 'Wrong value or type'], ['to.eql(7)', 'Exact value matches', 'Type coercion issues'], ["to.be.a('number')", 'Correct data type', 'Wrong number'], ['status(200)', 'Request succeeded', 'Body is empty or wrong']] },
        davidTip: `My rule: every assertion should be able to fail. If I can't imagine a realistic build where a check goes red, it's probably too vague to be worth having.`,
        miniChallenge: `Add one more assertion to your user-1 test that checks the nested field \`address.city\` is a string.`,
        modelAnswer: `## Example\n\`pm.expect(b.address.city).to.be.a('string');\` — reaching the nested object with dot notation and asserting the type, so both a missing city and a non-string city would fail.`,
        badGood: { label: 'a Postman assertion', bad: `\`pm.test('works', () => pm.expect(pm.response.json()).to.exist);\` — passes on any non-empty response, including a wrong one.`, good: `\`pm.test('status is active', () => pm.expect(pm.response.json().status).to.eql('active'));\` — fails the instant the value changes.` },
        portfolioBuilder: `Save this tested request into your "API Masterclass" collection with a clear name and a comment explaining what each assertion protects. It shows reviewers you test values, not just responses.`,
      },
    },
    {
      lessonNumber: 4,
      title: 'JSON Schema Validation',
      estimatedTime: '14 minute read',
      lessonOverview: `Checking fields one by one doesn't scale. JSON Schema lets you validate the whole shape of a response — its fields, types and required keys — in a single assertion.`,
      learningObjectives: ['Explain what a JSON Schema describes', 'Read the key schema keywords (type, properties, required)', 'Validate a response against a schema in Postman'],
      lessonNotes: `## What a schema is
A **JSON Schema** is itself a JSON document that describes the *expected structure* of another JSON document — which fields exist, their types, and which are mandatory. It's a contract you can test against automatically.

## The core keywords
- \`type\` — the expected type (\`"object"\`, \`"array"\`, \`"string"\`, \`"number"\`, \`"boolean"\`, \`"null"\`)
- \`properties\` — the fields of an object and each field's own schema
- \`required\` — an array of keys that **must** be present
- \`items\` — the schema every element of an array must match

## A minimal schema
\`\`\`
{
  "type": "object",
  "properties": {
    "id":   { "type": "number" },
    "name": { "type": "string" }
  },
  "required": ["id", "name"]
}
\`\`\`

## Why schemas beat field-by-field checks
One schema catches a missing field, a wrong type and an unexpected shape all at once. When an API changes its contract, a schema test goes red immediately — which is exactly the early warning you want.`,
      workedExample: `In Postman's Tests tab: define the schema above as \`const schema = {...}\`, then \`pm.test('matches schema', () => { pm.expect(pm.response.json()).to.be.jsonSchema ? null : null; });\`. In practice Postman ships \`tv4\`/\`ajv\`: \`const v = pm.response.to.have.jsonSchema(schema);\` — if \`id\` comes back as \`"7"\` (string), validation fails because the schema demands a \`number\`.`,
      commonMistakes: `- Confusing the schema (the contract) with the data (the response it validates)
- Leaving \`required\` empty, so a schema passes even when key fields are missing
- Writing a schema so loose (\`type: object\` only) that it never catches anything`,
      realWorldTip: `Keep the schema in version control next to the tests. When it changes, the diff tells the whole team the API contract has moved — a conversation you want to have before release, not after.`,
      exercise: `Write a JSON Schema for \`{ "id": 1, "email": "a@b.com" }\` where both fields are required, \`id\` is a number and \`email\` is a string.`,
      reflectionQuestion: `What does adding a key to the \`required\` array change about how a schema validates a response?`,
      knowledgeCheck: `Which JSON Schema keyword lists the fields that must be present? (Answer: required)`,
      completionChecklist: ['I can explain what a JSON Schema describes', 'I can read type, properties and required', 'I validated a response against a schema in Postman'],
      enhancements: {
        industryStory: `A partner API dropped the \`currency\` field in a minor release with no changelog. The team's value-by-value tests still passed because none of them checked \`currency\` directly. A single schema with \`currency\` in \`required\` would have failed the build the moment the field vanished. They added schema validation the same week.`,
        visualAid: { type: 'comparison', title: 'Field checks vs schema validation', headers: ['Aspect', 'Field-by-field', 'JSON Schema'], rows: [['Missing field', 'Only if you checked it', 'Caught by required'], ['Wrong type', 'Only if you checked it', 'Caught by type'], ['New/changed shape', 'Usually missed', 'Flagged at once'], ['Maintenance', 'Many small tests', 'One contract'], ['Best for', 'Key business values', 'Whole-response contract']] },
        davidTip: `I pair the two: a JSON Schema to guard the overall contract, plus a handful of value assertions on the fields that carry real business meaning. Schema for shape, assertions for meaning.`,
        miniChallenge: `Write a JSON Schema for \`{ "id": 1, "email": "a@b.com" }\` with both fields required, \`id\` a number and \`email\` a string.`,
        modelAnswer: `## Example\n\`{ "type": "object", "properties": { "id": { "type": "number" }, "email": { "type": "string" } }, "required": ["id", "email"] }\`.`,
        badGood: { label: 'a JSON Schema', bad: `\`{ "type": "object" }\` — accepts literally any object, including an empty one. It can never fail.`, good: `\`{ "type": "object", "properties": { "id": { "type": "number" } }, "required": ["id"] }\` — fails if \`id\` is missing or not a number.` },
        portfolioBuilder: `Add a schema-validated request to your portfolio collection and note in the description which contract change it would catch. Contract testing is a senior-level skill worth showing off.`,
      },
    },
    {
      lessonNumber: 5,
      title: 'Working with XML',
      estimatedTime: '13 minute read',
      lessonOverview: `JSON dominates modern APIs, but XML is far from dead — SOAP services, banking, government and older enterprise systems still use it. This lesson gives you the essentials to read and assert on XML.`,
      learningObjectives: ['Read the anatomy of an XML document', 'Compare XML and JSON structurally', 'Use a basic XPath expression to select a node'],
      lessonNotes: `## XML anatomy
XML uses nested **elements** with opening and closing tags: \`<user><name>Ada</name></user>\`. Elements can carry **attributes**: \`<user id="7">\`. Unlike JSON, there is a single **root element** wrapping everything, and order is significant.

## XML vs JSON
- JSON has typed values; XML is text by default (\`<id>7</id>\` is a string until something parses it).
- JSON uses \`{ }\` and \`[ ]\`; XML uses tags and nesting.
- XML has attributes *and* elements for data; JSON has only keys/values.
- XML is more verbose but supports namespaces and schemas (XSD).

## Selecting nodes with XPath
**XPath** is to XML what dot/bracket paths are to JSON. Given \`<order><item>mug</item><item>pen</item></order>\`:
- \`/order/item\` selects both \`item\` elements
- \`/order/item[1]\` selects the first (XPath is **one-indexed**, not zero)
- \`//item\` selects every \`item\` anywhere in the document
- \`/user/@id\` selects the \`id\` attribute

## In Postman
Postman parses XML with \`xml2Json(pm.response.text())\`, turning it into a JSON-like object you can then assert on with the same techniques from Lesson 3.`,
      workedExample: `A SOAP-style response: \`<order id="99"><customer>Ada</customer><total>19.99</total></order>\`. XPath \`/order/@id\` returns \`"99"\`; \`/order/total\` returns the element whose text is \`19.99\`. In Postman: \`const x = xml2Json(pm.response.text()); pm.expect(x.order.customer).to.eql('Ada');\`.`,
      commonMistakes: `- Assuming XPath is zero-indexed — it is **one-indexed**, so the first node is \`[1]\`
- Treating XML element text as typed — \`<total>19.99</total>\` is a string until you parse it
- Ignoring namespaces, which can make an otherwise-correct XPath select nothing`,
      realWorldTip: `If you're handed a SOAP service, ask for its WSDL/XSD first. It's the contract — it tells you every element, type and namespace before you send a single request, saving hours of guesswork.`,
      exercise: `In Postman, send a request to any XML endpoint (or paste a sample response into the body), use \`xml2Json\` in the Tests tab, and assert on one element value. If you have no XML API handy, use the sample \`<order id="99"><total>19.99</total></order>\`.`,
      reflectionQuestion: `Name one structural feature XML has that JSON does not, and why it can complicate XPath.`,
      knowledgeCheck: `In XPath, what index is the first element — 0 or 1? (Answer: 1 — XPath is one-indexed)`,
      completionChecklist: ['I can read the anatomy of an XML document', 'I can compare XML and JSON structurally', 'I can write a basic XPath expression'],
      enhancements: {
        industryStory: `A tester joined a bank and dismissed XML as "legacy" — until a SOAP payment service came across her desk. The real trap wasn't the tags; it was namespaces. Her XPath looked perfect but matched nothing because the elements lived under a namespace prefix she'd ignored. Once she accounted for it, the tests worked. XML isn't hard — it's just precise.`,
        visualAid: { type: 'comparison', title: 'XML vs JSON side by side', headers: ['Feature', 'XML', 'JSON'], rows: [['Structure', 'Nested tags', 'Objects & arrays'], ['Typing', 'Text by default', 'Typed values'], ['Attributes', 'Yes (id="7")', 'No (keys only)'], ['Path language', 'XPath', 'Dot/bracket paths'], ['Array index base', 'One-indexed', 'Zero-indexed'], ['Common in', 'SOAP, banking, gov', 'REST, modern web']] },
        davidTip: `Don't fear XML because it looks old-fashioned. Every skill transfers: a root element is a root object, an element is a key, XPath is your path notation. Learn the four XPath forms above and you can test most enterprise SOAP services.`,
        miniChallenge: `For \`<order id="99"><item>mug</item><item>pen</item></order>\`, write the XPath that selects the second \`item\`.`,
        modelAnswer: `## Example\n\`/order/item[2]\` selects the second \`item\` (text \`pen\`). XPath is one-indexed, so \`[2]\` — not \`[1]\` — is the second element.`,
        badGood: { label: 'an XPath expression', bad: `\`/order/item[0]\` — using zero-based indexing from JSON habit. XPath returns nothing because there is no index 0.`, good: `\`/order/item[1]\` — one-indexed, so \`[1]\` correctly selects the first \`item\` element.` },
        managersReview: { intro: `If I reviewed your Module 3 work as a lead, here's what I'd be looking for:`, strengths: ['You read JSON types and paths confidently', 'Your Postman tests assert values and types, not just existence', 'You use JSON Schema to guard the whole contract', 'You can handle an XML/SOAP response without freezing'], improvements: ['Add type checks alongside value checks everywhere', 'Keep schemas in version control beside the tests', 'Name tests so they document business intent'], gaps: ['Asserting only \`to.exist\` and calling it tested', 'Assuming response shape instead of inspecting it', 'Dismissing XML as "not my problem" until it lands on your desk'] },
        portfolioBuilder: `Assemble a small "JSON & XML" section in your portfolio collection: one value-and-type assertion, one JSON Schema validation, and one XML \`xml2Json\` assertion. Three requests that together prove you can test any body format an API throws at you.`,
        resourcePreview: { name: 'JSON & XML Assertion Toolkit', purpose: 'Copy-paste Postman snippets for value, type, schema and XML assertions.', whenToUse: 'Reach for it whenever you start testing a new response body.', formats: ['JSON', 'PDF'] },
      },
    },
  ],
};
