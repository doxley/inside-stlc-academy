// API Testing Masterclass — Module 2: HTTP Methods & Status Codes.
// Full lesson content (base fields + enhancements). Matches the Module 1 template:
// every lesson fills every base field and a rich `enhancements` block.
export default {
  courseSlug: 'api-testing-masterclass',
  moduleNumber: 2,
  lessons: [
    {
      lessonNumber: 1,
      title: 'GET & Reading Data',
      estimatedTime: '13 minute read',
      lessonOverview: `\`GET\` is the workhorse of every API — it reads data without changing anything. Understanding it well is the foundation for testing everything else.`,
      learningObjectives: ['Explain what a `GET` request does and why it is safe', 'Distinguish a collection from a single resource', 'Read filtering, sorting and pagination on a `GET`'],
      lessonNotes: `## What GET does
\`GET\` **reads** a resource. It should never change server state — that makes it a **safe** method. You can call \`GET /users/1\` a hundred times and nothing on the server changes.

## Collections vs single resources
- \`GET /users\` returns a **collection** (usually a JSON array).
- \`GET /users/1\` returns a **single resource** (a JSON object).
- A missing item returns \`404 Not Found\`, not an empty \`200\`.

## Shaping the response
Most read endpoints accept query parameters:
- **Filter**: \`GET /users?role=admin\`
- **Sort**: \`GET /users?sort=name\`
- **Paginate**: \`GET /users?page=2&limit=20\`

## What testers check
- The **status** is \`200\` for a hit, \`404\` for a miss.
- The **body shape** matches the contract (array vs object, expected fields).
- **Filters actually filter** — a wrong filter that silently returns everything is a classic bug.
- \`GET\` carries **no body**; parameters go in the URL.`,
      workedExample: `\`GET https://reqres.in/api/users?page=2\` returns \`200 OK\` with a \`data\` array and pagination fields (\`page\`, \`total\`, \`total_pages\`). Change to \`GET /api/users?page=99\` and you get \`200 OK\` with an empty \`data\` array — a valid page beyond the data, not a \`404\`. Knowing that distinction is exactly what a tester verifies.`,
      commonMistakes: `- Putting data in a \`GET\` body instead of the URL query string
- Expecting a \`404\` for an empty collection (empty is a valid \`200\`)
- Assuming a filter works without checking the returned items actually match`,
      realWorldTip: `Never trust that a filter works just because you got a \`200\`. Count the results and inspect a few — a broken filter that returns the whole table looks "green" until it leaks someone else's data.`,
      exercise: `In Postman, send \`GET https://jsonplaceholder.typicode.com/posts?userId=1\`. Confirm the status is \`200\` and that every returned post has \`userId\` equal to \`1\`.`,
      reflectionQuestion: `Why is \`GET\` described as a "safe" method, and what would break that promise?`,
      knowledgeCheck: `Which HTTP method is used to read data without changing it? (Answer: GET)`,
      completionChecklist: ['I can explain what `GET` does and why it is safe', 'I can tell a collection response from a single-resource one', 'I can read and verify a filtered `GET`'],
      enhancements: {
        industryStory: `A team shipped a \`GET /accounts?ownerId=\` endpoint where a missing \`ownerId\` was ignored rather than rejected — so the filter silently returned every account. The API tests only checked for \`200 OK\`, so the data-leak sailed through. One assertion that every row matched the requested owner would have caught it.`,
        visualAid: { type: 'comparison', title: 'Collection vs single resource', headers: ['Request', 'Returns', 'Miss behaviour'], rows: [['GET /users', 'JSON array (collection)', 'empty array + 200'], ['GET /users/1', 'JSON object (one item)', '404 Not Found'], ['GET /users?role=admin', 'filtered array', 'empty array + 200'], ['GET /users?page=2', 'a page of the array', 'empty array + 200']] },
        davidTip: `When I test a read endpoint I always ask: what happens at the edges? Page zero, page beyond the data, an unknown filter value, a deleted id. The happy path is easy — the edges are where the real bugs hide.`,
        badGood: { label: 'asserting a filtered GET', bad: `The test only checks \`status == 200\` for \`GET /users?role=admin\`. It passes even when the filter is ignored and every user is returned.`, good: `The test checks \`status == 200\` and asserts that **every** item in the array has \`role == "admin"\`, plus a sensible result count.` },
        miniChallenge: `Send \`GET https://jsonplaceholder.typicode.com/posts?userId=1\` and confirm every post in the response has \`userId\` of \`1\`.`,
        modelAnswer: `## Example\nStatus \`200 OK\`. The body is a JSON array of ~10 posts, and every object has \`"userId": 1\`. I verified by scanning the \`userId\` field on each item rather than trusting the status code alone.`,
      },
    },
    {
      lessonNumber: 2,
      title: 'POST & Creating Resources',
      estimatedTime: '14 minute read',
      lessonOverview: `\`POST\` creates new resources and, unlike \`GET\`, it changes server state. Testing it well means checking what got created, not just that the request returned.`,
      learningObjectives: ['Explain what a `POST` request does and why it is not safe', 'Send a `POST` with a JSON body and correct headers', 'Verify a creation using status `201` and the response body'],
      lessonNotes: `## What POST does
\`POST\` **creates** a new resource in a collection. It is **not safe** (it changes state) and **not idempotent** — send the same \`POST\` twice and you usually get two resources.

## The request body
\`POST\` carries a **body**, almost always JSON. You must declare it:
- Header \`Content-Type: application/json\`
- Body \`{"name":"Ada","role":"engineer"}\`

## The successful response
- Status \`201 Created\` (not just \`200\`).
- A \`Location\` header pointing at the new resource, e.g. \`/users/99\`.
- A body echoing the created resource, now with a server-assigned \`id\`.

## What testers check
- Status is \`201\` and a new \`id\` was assigned.
- The returned fields **match what you sent**.
- Invalid input is rejected with \`400 Bad Request\`, not silently accepted.
- A duplicate create behaves as designed (\`409 Conflict\` if uniqueness is enforced).`,
      workedExample: `Request: \`POST https://reqres.in/api/users\` with \`Content-Type: application/json\` and body \`{"name":"Ada","job":"engineer"}\`. Response: \`201 Created\` with body \`{"name":"Ada","job":"engineer","id":"482","createdAt":"..."}\`. Checks: status is \`201\`, an \`id\` appeared, and the \`name\`/\`job\` echo the input exactly.`,
      commonMistakes: `- Forgetting \`Content-Type: application/json\`, so the body is ignored or rejected
- Accepting \`200\` when the contract specifies \`201 Created\`
- Only checking the status and never confirming the resource was actually created`,
      realWorldTip: `After a \`POST\`, always do a follow-up \`GET\` on the new resource's id. A \`201\` means "I accepted it" — the \`GET\` proves it was actually stored the way you expected.`,
      exercise: `In Postman, \`POST\` to \`https://reqres.in/api/users\` with a JSON body of your choice. Confirm you get \`201\`, note the assigned \`id\`, and check the response echoes your fields.`,
      reflectionQuestion: `Why is \`POST\` not idempotent, and when could that cause a real problem?`,
      knowledgeCheck: `What status code should a successful resource creation return? (Answer: 201 Created)`,
      completionChecklist: ['I can send a `POST` with a JSON body and correct headers', 'I can verify a `201` and the assigned `id`', 'I can confirm the created resource matches my input'],
      enhancements: {
        industryStory: `A checkout bug once double-charged customers because a slow network made the app resend a \`POST /orders\` — and the API happily created two orders. \`POST\` is not idempotent, so the fix was an idempotency key on the request. The tester who reproduced it simply sent the same \`POST\` twice and watched two orders appear.`,
        visualAid: { type: 'timeline', title: 'Creating a resource with POST', steps: [{ label: 'Build', detail: 'method POST, Content-Type: application/json, JSON body' }, { label: 'Send', detail: 'body travels to the collection endpoint' }, { label: 'Create', detail: 'server stores it and assigns an id' }, { label: 'Respond', detail: '201 Created + Location header + echoed body' }, { label: 'Verify', detail: 'GET the new id to confirm it was stored' }] },
        davidTip: `The single most useful habit with \`POST\` is the follow-up \`GET\`. A \`201\` is a promise; the \`GET\` is the proof. I have caught endpoints that returned \`201\` but never actually persisted the record.`,
        badGood: { label: 'verifying a POST', bad: `The test sends the \`POST\` and asserts \`status == 200\`. It never inspects the body or confirms anything was created.`, good: `The test asserts \`status == 201\`, that the response contains a new \`id\`, that the echoed fields match the input, then \`GET\`s that \`id\` and confirms it persisted.` },
        miniChallenge: `\`POST\` a JSON body to \`https://reqres.in/api/users\`, note the returned \`id\`, and confirm the response echoes the fields you sent.`,
        modelAnswer: `## Example\nI sent \`{"name":"Grace","job":"tester"}\` to \`POST /api/users\` with \`Content-Type: application/json\`. Response: \`201 Created\`, body included \`"id":"631"\` and \`"createdAt"\`, and \`name\`/\`job\` matched exactly. I confirmed the \`201\` and the echoed fields rather than trusting a bare \`200\`.`,
      },
    },
    {
      lessonNumber: 3,
      title: 'PUT, PATCH & Updating',
      estimatedTime: '14 minute read',
      lessonOverview: `Updating a resource can mean replacing it wholesale (\`PUT\`) or changing just part of it (\`PATCH\`). Confusing the two is one of the most common sources of data-loss bugs.`,
      learningObjectives: ['Contrast `PUT` (full replace) with `PATCH` (partial update)', 'Predict what happens to omitted fields for each', 'Verify an update by re-reading the resource'],
      lessonNotes: `## PUT replaces the whole resource
\`PUT /users/1\` sends the **complete** representation. Fields you omit are typically **wiped** — \`PUT\` means "make the resource look exactly like this". \`PUT\` is **idempotent**: repeating the same \`PUT\` leaves the same result.

## PATCH updates part of a resource
\`PATCH /users/1\` sends **only the fields you want to change**. Everything else is left alone. It is the safer choice when you only mean to touch one field.

## The key testing risk
Sending a partial body to a \`PUT\` and expecting the other fields to survive. They often won't — this is a classic data-loss bug.

## What testers check
- Status \`200 OK\` (or \`204 No Content\` if no body is returned).
- After a \`PUT\`, omitted fields are cleared/defaulted as designed.
- After a \`PATCH\`, untouched fields are **unchanged**.
- Both are **idempotent**: repeating the request gives the same final state.`,
      workedExample: `Start with \`{"id":1,"name":"Ada","email":"ada@x.com"}\`. Send \`PATCH /users/1\` with \`{"name":"Ada Lovelace"}\` → \`200 OK\`, and a follow-up \`GET\` shows the email is **still there**. Send \`PUT /users/1\` with only \`{"name":"Ada Lovelace"}\` and the email may now be **gone** — because \`PUT\` replaced the whole record.`,
      commonMistakes: `- Using \`PUT\` with a partial body and losing the omitted fields
- Assuming \`PATCH\` and \`PUT\` behave the same way
- Checking only the update response and never re-reading the resource`,
      realWorldTip: `Always re-\`GET\` after an update and diff the whole object against what you expected. The bug is rarely in the field you changed — it is in the field you didn't mean to touch.`,
      exercise: `In Postman, \`GET\` a resource, then \`PATCH\` one field. Re-\`GET\` and confirm your field changed while every other field stayed identical.`,
      reflectionQuestion: `If a client only wants to change a user's email, which method is safer and why?`,
      knowledgeCheck: `Which method replaces an entire resource, wiping fields you omit? (Answer: PUT — PATCH only changes the fields you send)`,
      completionChecklist: ['I can explain the difference between `PUT` and `PATCH`', 'I can predict what happens to omitted fields', 'I verify updates by re-reading the resource'],
      enhancements: {
        industryStory: `A profile-edit form used \`PUT\` but only sent the fields on screen. Users who edited their display name silently lost their saved address, because \`PUT\` replaced the whole record with a partial body. The fix was a one-word change to \`PATCH\` — and a test that re-read the profile and diffed every field.`,
        visualAid: { type: 'comparison', title: 'PUT vs PATCH', headers: ['Aspect', 'PUT', 'PATCH'], rows: [['Intent', 'Replace whole resource', 'Update part of it'], ['Body', 'Full representation', 'Only changed fields'], ['Omitted fields', 'Wiped / defaulted', 'Left unchanged'], ['Idempotent', 'Yes', 'Usually yes'], ['Best for', 'Full overwrite', 'Single-field edits']] },
        davidTip: `My rule: if you only mean to change one field, use \`PATCH\`. And whichever you use, re-\`GET\` the resource and compare the whole object. I have seen more data lost to a careless \`PUT\` than to almost any other single mistake.`,
        badGood: { label: 'editing one field', bad: `Client sends \`PUT /users/1\` with just \`{"name":"New"}\`. The server replaces the record and the user's email and phone are wiped.`, good: `Client sends \`PATCH /users/1\` with \`{"name":"New"}\`. Only the name changes; a re-\`GET\` confirms email and phone are untouched.` },
        miniChallenge: `\`GET\` a resource, \`PATCH\` a single field, then re-\`GET\` and confirm that one field changed and every other field is identical.`,
        modelAnswer: `## Example\nI \`GET\` \`/users/2\` (name "Janet", email present). I \`PATCH\` with \`{"name":"Janet R"}\` → \`200 OK\`. Re-\`GET\` shows \`name\` is now "Janet R" and the \`email\` is byte-for-byte the same. Because it was a \`PATCH\`, the untouched fields survived — a \`PUT\` with the same body could have wiped them.`,
      },
    },
    {
      lessonNumber: 4,
      title: 'DELETE & Idempotency',
      estimatedTime: '13 minute read',
      lessonOverview: `\`DELETE\` removes a resource. The interesting part for testers is idempotency — what happens when you delete the same thing twice.`,
      learningObjectives: ['Explain what `DELETE` does and its typical responses', 'Define idempotency and apply it to `DELETE`', 'Test deleting an already-deleted resource'],
      lessonNotes: `## What DELETE does
\`DELETE /users/1\` removes the resource. A successful delete usually returns:
- \`200 OK\` with a body, or
- \`204 No Content\` with an empty body.

## Idempotency
A method is **idempotent** if making the same call multiple times has the same effect as making it once. \`DELETE\` is idempotent: the resource ends up **gone** whether you call it once or five times.

## The second delete
The tricky question: what does the **second** \`DELETE\` of the same id return?
- Many APIs return \`404 Not Found\` (it's already gone).
- Some return \`204 No Content\` (the end state is the same, so they call it success).
Both are defensible — the point is that the **resource state is unchanged**, which is what idempotency actually guarantees.

## What testers check
- First \`DELETE\` succeeds (\`200\`/\`204\`) and a follow-up \`GET\` returns \`404\`.
- Second \`DELETE\` behaves consistently with the documented contract.
- Deleting a resource you don't own returns \`403\`/\`404\`, not silent success.`,
      workedExample: `\`DELETE https://reqres.in/api/users/2\` returns \`204 No Content\` with an empty body. A follow-up \`GET /api/users/2\` on a real store would then return \`404 Not Found\`. Sending the \`DELETE\` a second time changes nothing further — the resource is still gone. That "nothing further changes" is idempotency in action.`,
      commonMistakes: `- Expecting a body from a \`204 No Content\` delete
- Treating a \`404\` on a second delete as a bug when it is often correct
- Confusing idempotency ("same end state") with "same status code every time"`,
      realWorldTip: `Idempotency is about the resulting state, not the status code. A second \`DELETE\` returning \`404\` is still idempotent — the resource is gone and stays gone. Test the state with a follow-up \`GET\`, not just the status.`,
      exercise: `In Postman, \`DELETE\` a resource and note the status. Send the same \`DELETE\` again and record what the second call returns. Explain whether the behaviour is idempotent.`,
      reflectionQuestion: `If a network glitch caused a \`DELETE\` to be sent twice, why is that safe but a duplicate \`POST\` might not be?`,
      knowledgeCheck: `Is \`DELETE\` idempotent? (Answer: yes — deleting the same resource repeatedly leaves it in the same "gone" state)`,
      completionChecklist: ['I can explain `DELETE` and its `200`/`204` responses', 'I can define idempotency and apply it to `DELETE`', 'I can test deleting an already-deleted resource'],
      enhancements: {
        industryStory: `An engineer flagged a "bug": the second \`DELETE\` of a record returned \`404\`. We talked through idempotency and realised it was correct — the record was gone and stayed gone. The real lesson was that the *contract* hadn't documented the second-delete behaviour, so nobody knew what to expect. We fixed the docs, not the code.`,
        visualAid: { type: 'timeline', title: 'Deleting the same resource twice', steps: [{ label: 'DELETE #1', detail: 'resource removed → 204 No Content' }, { label: 'GET', detail: 'resource is gone → 404 Not Found' }, { label: 'DELETE #2', detail: 'nothing left to remove → 404 (or 204 by design)' }, { label: 'State', detail: 'resource is gone and stays gone — idempotent' }] },
        davidTip: `When I test a \`DELETE\` I write down the expected second-delete behaviour *before* I run it, then compare. If the API and the docs disagree, that mismatch is the bug — not the status code itself.`,
        badGood: { label: 'testing a delete', bad: `The test sends one \`DELETE\`, asserts \`204\`, and stops — never confirming the resource is actually gone.`, good: `The test asserts \`204\`, then \`GET\`s the id and asserts \`404\`, then re-sends the \`DELETE\` and checks it matches the documented idempotent behaviour.` },
        miniChallenge: `\`DELETE\` a resource, record the status, then \`DELETE\` the same id again and note the second response. State whether the overall behaviour is idempotent and why.`,
        modelAnswer: `## Example\nFirst \`DELETE /api/users/2\` → \`204 No Content\`. Second \`DELETE /api/users/2\` → \`404 Not Found\`. The behaviour is idempotent because the resource is gone after the first call and remains gone; the differing status code just reflects "already absent", while the end state never changes.`,
      },
    },
    {
      lessonNumber: 5,
      title: 'Status Codes Decoded (2xx/3xx/4xx/5xx)',
      estimatedTime: '15 minute read',
      lessonOverview: `Status codes are the API's way of telling you what happened in a single number. Reading them fluently lets you triage a failure before you even open the body.`,
      learningObjectives: ['Map each status class (2xx/3xx/4xx/5xx) to its meaning', 'Distinguish a client error (4xx) from a server error (5xx)', 'Choose the correct expected status when writing an assertion'],
      lessonNotes: `## The five families
- **2xx Success** — it worked. \`200 OK\`, \`201 Created\`, \`204 No Content\`.
- **3xx Redirection** — go somewhere else. \`301 Moved Permanently\`, \`304 Not Modified\`.
- **4xx Client error** — *you* got it wrong. \`400 Bad Request\`, \`401 Unauthorized\`, \`403 Forbidden\`, \`404 Not Found\`, \`409 Conflict\`, \`422 Unprocessable Entity\`, \`429 Too Many Requests\`.
- **5xx Server error** — *the server* broke. \`500 Internal Server Error\`, \`502 Bad Gateway\`, \`503 Service Unavailable\`.

## The most important line
**4xx is your fault, 5xx is theirs.** If you send a bad request and get a \`400\`, the API behaved correctly. If you send a bad request and get a \`500\`, the API failed to handle your input gracefully — that is a real bug.

## 401 vs 403
- \`401 Unauthorized\` — you're **not authenticated** (who are you?).
- \`403 Forbidden\` — you're authenticated but **not allowed** (you can't do that).

## What testers check
- The status is the **exact** expected code, not just "2xx-ish".
- Bad input returns \`400\`/\`422\`, never \`500\`.
- Missing/expired auth returns \`401\`; insufficient permission returns \`403\`.`,
      workedExample: `You \`POST\` an order with a missing \`item\` field. A well-built API returns \`400 Bad Request\` with a body like \`{"error":"item is required"}\`. If instead it returns \`500 Internal Server Error\`, that's a genuine defect: the server crashed on input it should have rejected politely. Same bad request — the status code tells you whose bug it is.`,
      commonMistakes: `- Treating any \`2xx\` as "pass" when the contract specifies an exact code (e.g. \`201\`)
- Confusing \`401\` (not logged in) with \`403\` (logged in, not allowed)
- Logging a \`500\` from bad input as "expected" instead of raising it as a bug`,
      realWorldTip: `A \`5xx\` from invalid input is almost always a bug worth logging. It means the server failed to validate and handle input it should have rejected with a clean \`4xx\`. Try to break every endpoint with malformed input and watch for \`500\`s.`,
      exercise: `In Postman, trigger three different status codes on purpose: a \`200\` (valid \`GET\`), a \`404\` (unknown id), and a \`400\`/\`405\` (malformed request or wrong method). Record each code and what caused it.`,
      reflectionQuestion: `Why does it matter to a tester whether a failure is a \`4xx\` or a \`5xx\`?`,
      knowledgeCheck: `A malformed request that returns \`500\` instead of \`400\` — whose bug is it? (Answer: the server's — a 5xx on bad input means it failed to validate gracefully)`,
      completionChecklist: ['I can map each status class to its meaning', 'I can tell a client error from a server error', 'I can pick the exact expected status for an assertion'],
      enhancements: {
        industryStory: `A payments API returned \`500\` whenever an amount was sent as a string instead of a number. It had been dismissed as "just an edge case" for months. When we reframed it — a \`5xx\` on bad input is a server bug, not a test quirk — it was fixed in a day, and it turned out a real client integration had been hitting it in production.`,
        visualAid: { type: 'comparison', title: 'The status code families', headers: ['Class', 'Meaning', 'Whose "fault"', 'Common examples'], rows: [['2xx', 'Success', 'Nobody', '200, 201, 204'], ['3xx', 'Redirection', 'Nobody', '301, 304'], ['4xx', 'Client error', 'The caller', '400, 401, 403, 404, 429'], ['5xx', 'Server error', 'The server', '500, 502, 503']] },
        davidTip: `The first number of a status code tells you where to look before you read a single line of the body. \`4\` means check your request. \`5\` means check their server — and probably raise a bug. That instinct saves hours of triage.`,
        badGood: { label: 'asserting a status code', bad: `The test asserts \`status >= 200 && status < 300\`. It passes on \`200\` even when the contract required \`201 Created\`.`, good: `The test asserts the exact code, e.g. \`status == 201\` for a create and \`status == 404\` for a missing id, so a wrong-but-successful code is caught.` },
        miniChallenge: `Deliberately trigger a \`200\`, a \`404\` and a \`400\` (or \`405\`) against a public API, and note exactly what caused each.`,
        modelAnswer: `## Example\n\`GET /posts/1\` → \`200\` (valid read). \`GET /posts/99999\` → \`404\` (unknown id). \`POST /posts\` with a broken body / wrong method → \`400\` or \`405\`. Each status matched the cause, and none returned \`500\`, which told me the endpoint validated input rather than crashing on it.`,
      },
    },
    {
      lessonNumber: 6,
      title: 'Headers, Content Types & Query Parameters',
      estimatedTime: '25 minutes',
      lessonOverview: `Headers, content types and query parameters are the "fine print" of a request — and where a surprising number of bugs hide. This hands-on lesson gets you inspecting and manipulating all three in Postman.`,
      learningObjectives: ['Read and set key request/response headers', 'Explain what `Content-Type` and `Accept` control', 'Build and verify query parameters on a request'],
      lessonNotes: `## Headers carry the metadata
Headers describe the request and response without being part of the data itself:
- \`Content-Type\` — the format of the **body you are sending** (e.g. \`application/json\`).
- \`Accept\` — the format you **want back**.
- \`Authorization\` — your credentials (e.g. \`Bearer <token>\`).
- Response headers like \`Content-Type\`, \`Location\`, \`Cache-Control\` and \`X-RateLimit-Remaining\` tell you about what came back.

## Content-Type vs Accept
- \`Content-Type\` describes what **you send**.
- \`Accept\` describes what **you want**.
Mismatching them causes \`415 Unsupported Media Type\` (server can't read your body) or \`406 Not Acceptable\` (server can't produce your format).

## Query parameters shape the request
Everything after the \`?\` in the URL: \`GET /users?role=admin&sort=name&page=2\`. They filter, sort and paginate — and, crucially, they belong in the **URL**, not the body of a \`GET\`.

## What testers check
- The right \`Content-Type\` is sent, and the response's \`Content-Type\` is what you expect.
- Auth headers are present and correct (a missing token → \`401\`).
- Query parameters are actually honoured — the returned data reflects them.`,
      workedExample: `In Postman, \`GET https://jsonplaceholder.typicode.com/comments?postId=1\`. Open the **Params** tab and you'll see \`postId = 1\` — Postman builds the query string for you. Check the response's \`Content-Type\` header is \`application/json\`, and confirm every comment in the body has \`"postId": 1\`. You've now verified a header *and* a query parameter in one request.`,
      commonMistakes: `- Sending a JSON body but forgetting \`Content-Type: application/json\` → \`415\` or an ignored body
- Confusing \`Content-Type\` (what you send) with \`Accept\` (what you want back)
- Typing query parameters straight into the URL and mismatching the Params tab, causing duplicates`,
      realWorldTip: `When a request behaves strangely, check the headers first. A wrong or missing \`Content-Type\`, a stale \`Authorization\` token, or an unexpected response \`Content-Type\` explains a huge share of "the body looks empty / weird" mysteries.`,
      exercise: `In Postman: (1) send \`GET /comments?postId=1\` and confirm the response \`Content-Type\`; (2) add an \`Accept: application/json\` header; (3) add a second query parameter and confirm it changes the results. Save all three into your course collection.`,
      reflectionQuestion: `What is the difference between the \`Content-Type\` and \`Accept\` headers, and when does each matter?`,
      knowledgeCheck: `Which header tells the server the format of the body you are sending? (Answer: Content-Type — Accept tells it what format you want back)`,
      completionChecklist: ['I can read and set key request and response headers', 'I can explain `Content-Type` vs `Accept`', 'I can build and verify query parameters in Postman', 'I saved my requests into my course collection'],
      enhancements: {
        industryStory: `A mobile app kept getting empty responses from an endpoint that worked fine in the browser. Hours of debugging later, the cause was one header: the app sent \`Accept: application/xml\` while the API only produced JSON, so it returned \`406 Not Acceptable\` with no body. One glance at the request headers would have solved it in a minute.`,
        visualAid: { type: 'comparison', title: 'Request headers vs query parameters', headers: ['Concern', 'Where it lives', 'Example', 'Controls'], rows: [['Body format sent', 'Content-Type header', 'application/json', 'How the server reads your body'], ['Format wanted back', 'Accept header', 'application/json', 'What the server returns'], ['Credentials', 'Authorization header', 'Bearer <token>', 'Who you are'], ['Filter / sort / page', 'Query string', '?role=admin&page=2', 'Which data comes back']] },
        davidTip: `First person, honest habit: when an API "misbehaves", I open the raw request and read every header before I touch anything else. Nine times out of ten the answer is a wrong \`Content-Type\`, a missing token, or a response format I didn't expect. Headers are the cheapest bug fix in testing.`,
        badGood: { label: 'sending a JSON body', bad: `Body is set to \`{"name":"Ada"}\` but no \`Content-Type\` header is set. The server can't tell it's JSON and returns \`415\` or ignores the body.`, good: `The request sets \`Content-Type: application/json\` alongside the JSON body, and asserts the response \`Content-Type\` is \`application/json\` too.` },
        miniChallenge: `Send \`GET /comments?postId=1\`, confirm the response \`Content-Type\` is \`application/json\`, then add a second query parameter and verify the results change.`,
        modelAnswer: `## Example\n\`GET https://jsonplaceholder.typicode.com/comments?postId=1\` → \`200 OK\`, response header \`Content-Type: application/json\`, body is a JSON array where every item has \`"postId": 1\`. Adding \`&id=1\` narrowed the result to a single comment, confirming the query parameters were honoured — and I saved both requests into my collection.`,
        managersReview: { intro: `If I reviewed your Module 2 work as a lead before signing it off, here's what I'd look at:`, strengths: ['You assert exact status codes, not just "2xx-ish"', 'You re-`GET` after `POST`/`PUT`/`PATCH`/`DELETE` to prove the state', 'You inspect headers and query parameters, not only the body'], improvements: ['Add negative cases: bad input, missing auth, wrong method', 'Document expected second-`DELETE` behaviour before running it', 'Assert response `Content-Type`, not just the status code'], gaps: ['No test that a `5xx` never appears for bad input', 'Filters checked only by status, not by verifying returned items', 'Auth headers not covered (`401` vs `403`)'] },
        portfolioBuilder: `Extend your Postman collection "API Masterclass — <your name>" with one request per method (\`GET\`, \`POST\`, \`PUT\`, \`PATCH\`, \`DELETE\`), each with an exact status-code check and a header assertion. This method-and-status coverage becomes a strong section of your Module 10 portfolio project.`,
        resourcePreview: { name: 'HTTP Status & Method Reference Card', purpose: 'One-page lookup for methods, safe/idempotent properties, and every common status code.', whenToUse: 'Keep it beside Postman whenever you write assertions.', formats: ['PDF'] },
      },
    },
  ],
};
