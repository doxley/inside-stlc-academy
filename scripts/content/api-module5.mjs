// API Testing Masterclass — Module 5: Authentication & Security.
// Full lesson content (base fields + enhancements). Follows the Module 1 template:
// every lesson fills every base field and a rich `enhancements` block.
export default {
  courseSlug: 'api-testing-masterclass',
  moduleNumber: 5,
  lessons: [
    {
      lessonNumber: 1,
      title: 'Why APIs Need Authentication',
      estimatedTime: '12 minute read',
      lessonOverview: `Most APIs handle data that shouldn't be public. Before you test any protected endpoint, you need to understand two words people constantly muddle: authentication and authorisation.`,
      learningObjectives: ['Distinguish authentication from authorisation', 'Explain why APIs restrict access', 'Match 401 and 403 to the right concept'],
      lessonNotes: `## Two words, two questions
- **Authentication** asks *"who are you?"* — proving identity.
- **Authorisation** asks *"what are you allowed to do?"* — checking permissions.
You authenticate **once**, then every request is authorised against your permissions.

## Why APIs lock the door
An API often exposes personal data, payments and admin actions. Without a check, anyone who knows the URL could read or change other people's records. Authentication puts a lock on the door; authorisation decides which rooms your key opens.

## The two status codes that matter
- \`401 Unauthorized\` — an **authentication** failure. The API doesn't know who you are (missing or invalid credentials). Confusingly named: 401 really means *unauthenticated*.
- \`403 Forbidden\` — an **authorisation** failure. The API knows who you are, but you're not allowed to do this.

## Why testers care
These two failures are tested completely differently. Send a request with **no** credentials and you should get \`401\`. Send it as a **valid but low-privilege** user hitting an admin endpoint and you should get \`403\`. Confusing them hides real security bugs.`,
      workedExample: `A banking API exposes \`GET /accounts/123/balance\`. With no token you get \`401 Unauthorized\` — the API doesn't know you. Log in as a normal customer and call \`DELETE /admin/users/9\` and you get \`403 Forbidden\` — it knows exactly who you are, you're just not an admin. Same door, two different locks.`,
      commonMistakes: `- Using "authentication" and "authorisation" as if they mean the same thing
- Expecting \`403\` when no credentials were sent (it should be \`401\`)
- Assuming a hidden or unlinked endpoint is safe because "nobody knows the URL"`,
      realWorldTip: `Whenever you meet a protected endpoint, write two negative tests before any happy path: one with no credentials (expect \`401\`) and one as the wrong user (expect \`403\`). Those two catch the majority of access bugs.`,
      exercise: `In Postman, send \`GET https://reqres.in/api/users/2\` with no auth, then think of one endpoint at your workplace that should reject you with a \`401\`. Note both.`,
      reflectionQuestion: `Which question does authorisation answer — "who are you?" or "what can you do?"`,
      knowledgeCheck: `A request arrives with no credentials at all. Which status code should the API return? (Answer: 401 Unauthorized — it's an authentication failure)`,
      completionChecklist: ['I can define authentication and authorisation in one line each', 'I can explain why APIs restrict access', 'I can map 401 and 403 to the correct concept'],
      enhancements: {
        industryStory: `A team once "secured" an admin panel by simply not linking to it in the UI. During API testing we called the admin endpoint directly with an ordinary user's token — it returned \`200 OK\` and let us disable accounts. Security by obscurity is not authorisation; the URL being hard to find protects nobody with a proxy open.`,
        visualAid: { type: 'comparison', title: 'Authentication vs authorisation', headers: ['', 'Authentication', 'Authorisation'], rows: [['Question', 'Who are you?', 'What can you do?'], ['Checks', 'Identity / credentials', 'Permissions / roles'], ['Failure code', '401 Unauthorized', '403 Forbidden'], ['Happens', 'Once, at login', 'On every request'], ['Analogy', 'Showing your passport', 'Which doors your keycard opens']] },
        davidTip: `The naming trips everyone up: \`401\` literally reads "Unauthorized" but means *unauthenticated*. I still say it out loud to myself — 401 is "who?", 403 is "no". It sticks.`,
        miniChallenge: `Write, in your own words, one real example of an authentication failure and one of an authorisation failure from an app you use.`,
        modelAnswer: `## Example\nAuthentication failure: my session expired, so the app returned \`401\` and bounced me to the login screen. Authorisation failure: I'm logged in fine, but clicking "Admin settings" returned \`403\` because my account is a standard user.`,
        resourcePreview: { name: 'Auth Concepts Cheat Sheet', purpose: 'One page separating authentication, authorisation, 401 and 403.', whenToUse: 'Keep it open through Module 5.', formats: ['PDF'] },
      },
    },
    {
      lessonNumber: 2,
      title: 'API Keys & Basic Auth',
      estimatedTime: '14 minute read',
      lessonOverview: `The two simplest ways an API identifies a caller are API keys and Basic auth. Both are easy to use and easy to get wrong — especially the myth that Basic auth "encrypts" anything.`,
      learningObjectives: ['Describe how an API key identifies a caller', 'Explain what Basic auth actually sends', 'Recognise why base64 is encoding, not encryption'],
      lessonNotes: `## API keys
An **API key** is a long secret string the caller sends to identify itself, usually in a header like \`x-api-key: abc123\` or a query parameter. It says *"this is a known caller"* but often carries no user identity and no fine-grained permissions. Keys are simple, which is also their weakness: leak one and anyone can impersonate you.

## Basic auth
**Basic authentication** sends a username and password on every request in a header:
\`Authorization: Basic <credentials>\`
The credentials are \`username:password\` **base64-encoded** — for example \`am9objpwYXNz\`.

## Base64 is NOT encryption
This is the trap. Base64 is **reversible encoding**, not encryption — anyone who sees the header can decode it back to the plain password in one step. Basic auth is only safe over **HTTPS**, which encrypts the whole connection. Over plain HTTP the password travels in effectively clear text.

## Testing angle
Check that keys and Basic credentials are only ever sent over HTTPS, never logged, and never committed to code. A leaked key or a decoded Basic header is a real, common breach.`,
      workedExample: `Encode \`jane:pass\` as base64 and you get \`amFuZTpwYXNz\`. Send \`Authorization: Basic amFuZTpwYXNz\` and the API decodes it straight back to \`jane:pass\`. Paste that base64 into any online decoder and the password appears instantly — proof it's encoding, not protection. That's why HTTPS is mandatory.`,
      commonMistakes: `- Believing base64 hides the password — it's trivially reversible
- Sending API keys or Basic credentials over plain HTTP
- Pasting real keys into shared docs, screenshots, or git commits`,
      realWorldTip: `Treat every API key like a password in plain text. Rotate it if it ever appears in a screenshot, a log, a Slack message, or a committed \`.env\` file. Testers are often the first to spot a key that's leaked into a response body.`,
      exercise: `In Postman, add a header \`x-api-key: demo-key-123\` to any request. Then use the Authorization tab to set Basic auth with username \`jane\` and password \`pass\`, send it, and inspect the generated \`Authorization\` header.`,
      reflectionQuestion: `If Basic auth only base64-encodes the password, what single thing makes it safe to use in practice?`,
      knowledgeCheck: `Basic auth base64-encodes \`username:password\`. Is base64 encryption? (Answer: no — it's reversible encoding, so Basic auth is only safe over HTTPS)`,
      completionChecklist: ['I can explain what an API key is and its main weakness', 'I can describe what the Basic auth header contains', 'I can explain why base64 is not encryption'],
      enhancements: {
        industryStory: `A partner integration failed intermittently, so a developer "helpfully" logged the full request headers to debug it. Weeks later a routine log review found thousands of \`Authorization: Basic\` headers sitting in a searchable log store — every one decodable to a live password. We rotated every credential overnight. Logging auth headers is how quiet breaches happen.`,
        visualAid: { type: 'comparison', title: 'API keys vs Basic auth', headers: ['', 'API Key', 'Basic Auth'], rows: [['Sends', 'A secret string', 'username:password (base64)'], ['Where', 'Header or query param', 'Authorization header'], ['Identity', 'Often just "a caller"', 'A specific user'], ['Protection', 'HTTPS only', 'HTTPS only'], ['Main risk', 'Key leaks = full access', 'Decoded password if not HTTPS']] },
        davidTip: `Any time I see credentials in a query string — \`?api_key=...\` — I flag it. URLs get logged by servers, proxies and browser history far more than headers do. Push secrets into headers, always over HTTPS.`,
        badGood: { label: 'sending an API key', bad: `\`GET /orders?api_key=live_9f8a...\` — the secret sits in the URL, where it ends up in server logs and browser history.`, good: `\`GET /orders\` with header \`x-api-key: live_9f8a...\` over HTTPS — the secret stays out of the URL and out of most logs.` },
        miniChallenge: `Base64-encode the string \`admin:secret\` (any online encoder or Postman will do), then decode it back. Note how many steps it took to reveal the password.`,
        modelAnswer: `## Example\n\`admin:secret\` encodes to \`YWRtaW46c2VjcmV0\`. Decoding takes one step and returns \`admin:secret\` in full — demonstrating that base64 offers no confidentiality on its own; the security comes entirely from HTTPS.`,
      },
    },
    {
      lessonNumber: 3,
      title: 'Bearer Tokens & JWT',
      estimatedTime: '15 minute read',
      lessonOverview: `Most modern APIs authenticate with bearer tokens, and the token is very often a JWT. Understanding its three parts and its expiry unlocks a whole category of tests.`,
      learningObjectives: ['Explain how a bearer token is sent', 'Describe the three parts of a JWT', 'Test token expiry and tampering'],
      lessonNotes: `## The bearer token
After you log in, the API hands you a **token**. You send it on every subsequent request:
\`Authorization: Bearer <token>\`
"Bearer" means *whoever holds this token is granted access* — so the token itself is a credential and must be protected like a password.

## What a JWT looks like
A **JWT** (JSON Web Token) is the most common bearer token. It's three base64url parts joined by dots:
\`header.payload.signature\`
- **Header** — the algorithm, e.g. \`HS256\`.
- **Payload** — the **claims**: user id, roles, and \`exp\` (expiry timestamp). Readable by anyone — never put secrets here.
- **Signature** — proves the token wasn't altered. The server checks it and rejects a tampered token.

## Expiry matters
JWTs carry an \`exp\` claim. After it passes, the token is dead and the API returns \`401\`. Clients then use a **refresh token** to get a fresh one.

## Testing angle
Decode a JWT at jwt.io to read its claims and expiry. Then test: an **expired** token → \`401\`; a **tampered** payload (change one character) → \`401\` because the signature no longer matches; a **missing** token → \`401\`.`,
      workedExample: `You log in and receive \`eyJhbGciOi...\`. You paste it into jwt.io and see the payload \`{ "sub": "42", "role": "user", "exp": 1720200000 }\`. You send \`Authorization: Bearer eyJhbGciOi...\` and get \`200\`. Change one character in the middle (payload) section and resend — the signature check fails and you get \`401\`. That single test proves the API validates the signature.`,
      commonMistakes: `- Thinking a JWT is encrypted — the payload is only encoded and fully readable
- Putting sensitive data (passwords, card numbers) in the payload
- Never testing an expired token, so silent "tokens never expire" bugs slip through`,
      realWorldTip: `Always decode the JWT your app receives and read the \`exp\` and \`role\` claims. I've caught APIs that issued tokens with no expiry at all, and others that put a user's full email and internal permissions in the payload for anyone to read.`,
      exercise: `Log in against a practice API (or use a sample token), copy the \`access_token\`, paste it into jwt.io, and note the algorithm, the claims, and the expiry time. Then send a request with a deliberately altered token and record the status.`,
      reflectionQuestion: `Why can anyone read a JWT's payload, yet not forge a valid token?`,
      knowledgeCheck: `A JWT has three dot-separated parts. What are they, in order? (Answer: header, payload, signature)`,
      completionChecklist: ['I can send a bearer token correctly', 'I can name and describe the three parts of a JWT', 'I can test expired and tampered tokens'],
      enhancements: {
        industryStory: `On one project the login endpoint issued JWTs, but nobody had set an expiry — the \`exp\` claim was simply missing. A token stolen from a laptop would have worked forever. We only found it because a tester decoded the token at jwt.io out of curiosity and asked "where's the expiry?" That one question closed a serious hole.`,
        visualAid: { type: 'comparison', title: 'The three parts of a JWT', headers: ['Part', 'Contains', 'Tester note'], rows: [['Header', 'Algorithm (e.g. HS256)', 'Watch for "alg": "none"'], ['Payload', 'Claims: sub, role, exp', 'Readable — no secrets here'], ['Signature', 'Cryptographic seal', 'Tamper the token → it must fail']] },
        davidTip: `A bearer token is a password in disguise — "bearer" literally means whoever holds it gets in. So I test what happens when it leaks: expired token, tampered token, no token. If any of those returns \`200\`, that's a finding, not a footnote.`,
        badGood: { label: 'JWT payload contents', bad: `The payload includes \`"password": "hunter2"\` and \`"cardNumber": "4111..."\` — both fully readable by anyone who decodes the token.`, good: `The payload includes only \`sub\`, \`role\` and \`exp\` — an identifier and permissions, never secrets, because the payload is not encrypted.` },
        miniChallenge: `Take any JWT (from jwt.io's default example), decode it, and write down its \`exp\` value. Then say what status you'd expect if you sent it after that time had passed.`,
        modelAnswer: `## Example\nThe decoded payload shows \`"exp": 1516239022\`. That timestamp is long past, so a well-behaved API should reject the token with \`401 Unauthorized\` and the client should use a refresh token to obtain a new one.`,
      },
    },
    {
      lessonNumber: 4,
      title: 'OAuth 2.0 Explained',
      estimatedTime: '16 minute read',
      lessonOverview: `OAuth 2.0 is the standard behind "Log in with Google" and most large APIs. You don't need to implement it, but as a tester you must understand its flow, its players, and scopes.`,
      learningObjectives: ['Name the four players in an OAuth 2.0 flow', 'Describe how an access token is obtained', 'Explain what scopes control'],
      lessonNotes: `## The problem OAuth solves
You want an app to access your data in another service **without handing it your password**. OAuth lets you grant limited access via a token instead.

## The four players
- **Resource owner** — you, the user who owns the data.
- **Client** — the app requesting access.
- **Authorisation server** — issues tokens after you log in and consent.
- **Resource server** — the API holding your data, which accepts the token.

## The flow at a tester's level
1. The client sends you to the **authorisation server** to log in.
2. You consent to the requested **scopes**.
3. The auth server returns an **authorisation code** to the client.
4. The client swaps that code (plus its secret) for an **access token**.
5. The client calls the **resource server** with \`Authorization: Bearer <access token>\`.

## Scopes
**Scopes** are the specific permissions the token grants, e.g. \`read:profile\` or \`write:orders\`. A token should only carry the scopes it needs — this is least privilege in action.

## Testing angle
Confirm a token limited to \`read\` scope is rejected (\`403\`) when it attempts a write, and that consent lists only the scopes actually required.`,
      workedExample: `You click "Connect your calendar" in a scheduling app. It redirects you to Google (the authorisation server), where you log in and consent to the scope \`calendar.read\`. Google returns a code; the app exchanges it for an access token and calls Google's Calendar API (the resource server) with \`Authorization: Bearer <token>\`. The app reads your calendar but never saw your Google password — and with a read-only scope it cannot delete an event.`,
      commonMistakes: `- Confusing the authorisation server (issues tokens) with the resource server (holds data)
- Assuming a token can do anything — it's limited by its scopes
- Sharing your actual password instead of granting a scoped token`,
      realWorldTip: `The single most valuable OAuth test is the scope test: take a read-only token and try to write. If the API lets it through, the whole point of scopes has failed — and that's a report-worthy authorisation bug.`,
      exercise: `Pick a service you've used "Log in with Google/GitHub" on. Write out the four OAuth players for that case, then list the scopes it asked you to consent to (check your account's connected-apps page).`,
      reflectionQuestion: `Why is OAuth safer than giving the third-party app your actual password?`,
      knowledgeCheck: `In OAuth 2.0, which player issues the access token — the authorisation server or the resource server? (Answer: the authorisation server; the resource server accepts it)`,
      completionChecklist: ['I can name the four OAuth 2.0 players', 'I can describe how a client obtains an access token', 'I can explain what scopes limit'],
      enhancements: {
        industryStory: `An integration requested the scope \`read:profile\` on the consent screen, but the token it received also worked against \`write:orders\`. A tester spotted it by taking the "read-only" token and firing a \`POST /orders\` at the resource server — it succeeded. The auth server was over-issuing scopes. Reading the consent screen and then actually testing the token's limits is what caught it.`,
        visualAid: { type: 'timeline', title: 'OAuth 2.0 authorisation code flow', steps: [{ label: 'Redirect', detail: 'client sends user to the authorisation server' }, { label: 'Consent', detail: 'user logs in and approves the scopes' }, { label: 'Code', detail: 'auth server returns an authorisation code' }, { label: 'Exchange', detail: 'client swaps code + secret for an access token' }, { label: 'Call', detail: 'client hits the resource server with Bearer token' }] },
        davidTip: `Don't get lost in the diagrams. As a tester you care about three things: does the token only grant the scopes consented to, does it expire, and does the resource server actually enforce those scopes. Everything else is the developers' problem.`,
        miniChallenge: `For a "Log in with GitHub" flow, list the four players by name (resource owner, client, authorisation server, resource server) and say who GitHub is playing.`,
        modelAnswer: `## Example\nResource owner: me. Client: the third-party app I'm signing into. Authorisation server: GitHub's OAuth login and consent screen. Resource server: GitHub's API holding my repos. GitHub plays both the authorisation server and the resource server here.`,
        resourcePreview: { name: 'OAuth 2.0 Flow Diagram', purpose: 'A printable map of the players and the token exchange.', whenToUse: 'Reference it whenever an API says "OAuth" or "Bearer".', formats: ['PDF'] },
      },
    },
    {
      lessonNumber: 5,
      title: 'Testing Authorisation & Access Control',
      estimatedTime: '18 minutes',
      lessonOverview: `This is where authentication knowledge becomes hands-on security testing. You'll test that the right users can do the right things — and, crucially, that the wrong users cannot.`,
      learningObjectives: ['Design negative tests for 401 and 403', 'Test broken object-level authorisation (BOLA)', 'Verify that roles are enforced server-side'],
      lessonNotes: `## The three questions to test
1. **No credentials** → does it return \`401\`?
2. **Valid but wrong role** → does it return \`403\`?
3. **Valid user, someone else's data** → does it return \`403\` or \`404\`, never \`200\`?

## Broken object-level authorisation (BOLA)
The most common API vulnerability. The API authenticates you but forgets to check that the **resource belongs to you**. If you're user 42 and \`GET /users/42/orders\` works, try \`GET /users/43/orders\`. If you can read user 43's orders, that's **BOLA** — a critical bug. Always test by swapping the id to a resource you don't own.

## Enforce it server-side
UIs often just hide the admin button — that is not security. The check must happen on the **server**. Prove it by calling the protected endpoint **directly**, with a low-privilege token, bypassing the UI entirely.

## Building the tests
For each protected endpoint, keep two saved requests: one as a legitimate owner (expect success) and one as an attacker — wrong user or wrong role (expect \`401\`/\`403\`). This pair is your access-control regression suite.`,
      workedExample: `You're logged in as customer 42. \`GET /users/42/profile\` returns \`200\` — correct. You change the id: \`GET /users/43/profile\`. If it returns \`200\` with user 43's details, you've found a BOLA vulnerability — the API checked *who you are* but not *whose data this is*. A correct API returns \`403\` (or \`404\` to avoid confirming the record exists).`,
      commonMistakes: `- Only testing the happy path as the correct, privileged user
- Trusting a hidden UI button as if it were an access control
- Never swapping the resource id to test for broken object-level authorisation`,
      realWorldTip: `The fastest way to find real security bugs as a tester: log in as a low-privilege user and call the endpoints you "shouldn't" be able to reach — directly, in Postman. BOLA and missing role checks fall out almost immediately, and they're exactly what attackers try first.`,
      exercise: `In Postman, create two saved requests to a protected endpoint: one with a valid token for the owning user (expect \`200\`), one with the id changed to a resource you don't own (expect \`403\`/\`404\`). Add a test script asserting the negative case is not \`200\`.`,
      reflectionQuestion: `If \`GET /users/43/orders\` returns \`200\` while you're logged in as user 42, what have you found and why is it serious?`,
      knowledgeCheck: `A logged-in user changes an id in the URL to access another user's record and succeeds. What vulnerability is this? (Answer: Broken Object-Level Authorisation — BOLA)`,
      completionChecklist: ['I can write negative tests for 401 and 403', 'I can test for broken object-level authorisation', 'I can prove a role check is enforced on the server, not just the UI'],
      enhancements: {
        industryStory: `On a healthcare portal, a tester logged in as an ordinary patient and simply incremented the id in \`GET /patients/{id}/records\`. Every record came back — thousands of other patients' data, no \`403\` in sight. The UI only ever showed you your own records, so it had "looked fine" for months. One id swap in Postman turned a green release into a critical incident. That's the power of testing authorisation directly.`,
        visualAid: { type: 'comparison', title: 'Access-control test matrix', headers: ['Who sends it', 'Endpoint', 'Expected'], rows: [['No token', '/orders', '401'], ['Standard user', '/admin/users', '403'], ['User 42', '/users/42/data', '200'], ['User 42', '/users/43/data', '403 or 404'], ['Admin', '/admin/users', '200']] },
        davidTip: `Give me a low-privilege token and ten minutes in Postman, and I'll tell you whether an API is actually secure. Swapping ids and calling admin routes directly finds more real bugs than any amount of clicking around the UI ever will.`,
        badGood: { label: 'authorisation testing', bad: `You test \`GET /users/42/data\` as user 42, see \`200\`, and move on — the whole suite runs as the correct owner.`, good: `You also run \`GET /users/43/data\` as user 42 and assert it is *not* \`200\`, plus an admin route as a standard user asserting \`403\`. The negatives are where the bugs live.` },
        miniChallenge: `List three requests you'd send to check access control on \`GET /orders/{id}\`, and the status you'd expect from each.`,
        modelAnswer: `## Example\n1) No token → expect \`401\`. 2) A valid user requesting their own order id → expect \`200\`. 3) The same user requesting another customer's order id → expect \`403\` or \`404\`, never \`200\` (a \`200\` here is BOLA).`,
        portfolioBuilder: `Add an "Access control" folder to your Postman collection with a happy-path and an attacker request for one endpoint, each with a test script. This demonstrates security-aware testing to any hiring manager.`,
      },
    },
    {
      lessonNumber: 6,
      title: 'Common API Security Risks',
      estimatedTime: '16 minute read',
      lessonOverview: `You'll pull everything together with the industry's shared checklist — the OWASP API Security Top 10 — and turn it into practical tests you can run in Postman today.`,
      learningObjectives: ['Describe what the OWASP API Security Top 10 is', 'Identify the most common API risks a tester can check', 'Turn a risk into a concrete test'],
      lessonNotes: `## What OWASP gives you
The **OWASP API Security Top 10** is a free, industry-agreed list of the most common and dangerous API weaknesses. It's your ready-made checklist — you don't have to invent risks, you can test against a shared standard.

## Risks a tester can check directly
- **Broken object-level authorisation (BOLA)** — swap the id, can you read others' data? (Module 5, Lesson 5.)
- **Broken authentication** — do expired, tampered or missing tokens still work?
- **Excessive data exposure** — does the response return more fields than the UI needs (passwords, internal ids, PII)?
- **Lack of rate limiting** — can you hammer \`POST /login\` endlessly with no lockout?
- **Security misconfiguration** — verbose stack traces, secrets in responses, missing HTTPS.

## From risk to test
Each risk becomes a request. "Excessive data exposure" → send a normal \`GET\` and read *every* field in the body, asking "should the client see this?" A user object returning a \`passwordHash\` is a finding.

## Your role
You aren't a penetration tester, but a tester who runs this checklist catches the majority of everyday API security bugs long before they reach production.`,
      workedExample: `Testing "excessive data exposure": you call \`GET /users/42\` and the body includes \`"passwordHash"\`, \`"internalNotes"\` and \`"ssn"\` — none of which the UI shows. The frontend simply ignores those fields, so it looked fine, but the data crossed the wire to the browser where anyone with dev tools can read it. You raise it against OWASP "Excessive Data Exposure" with the exact response body as evidence.`,
      commonMistakes: `- Treating security as "someone else's job" and never running the checklist
- Only reading the fields the UI uses and ignoring the rest of the response body
- Assuming no rate limiting is fine because "who would try thousands of logins?"`,
      realWorldTip: `Keep the OWASP API Security Top 10 pinned next to your test cases. Turning each item into one saved Postman request gives you a reusable security regression suite — the single highest-leverage thing a functional tester can add to their skill set this year.`,
      exercise: `In Postman, send a \`GET\` to a user or profile endpoint and list every field in the response body. Mark any field the UI doesn't display and ask whether the client should receive it. Save the request in an "OWASP checks" folder.`,
      reflectionQuestion: `Why is a response returning extra hidden fields a security risk even if the UI never shows them?`,
      knowledgeCheck: `What is the name of the free industry checklist of the most common API security risks? (Answer: the OWASP API Security Top 10)`,
      completionChecklist: ['I can explain what the OWASP API Security Top 10 is', 'I can name several API risks a tester can check', 'I can turn a listed risk into a concrete Postman test'],
      enhancements: {
        industryStory: `A fintech client's \`GET /account\` returned a tidy UI but, buried in the JSON, every response also carried the customer's full \`sortCode\`, \`accountNumber\` and an internal \`riskScore\` the business never intended to expose. The frontend used none of it. A tester reading the *whole* body — not just the visible fields — flagged it against OWASP "Excessive Data Exposure", and the API was trimmed before launch. The bug was invisible to anyone who only watched the screen.`,
        visualAid: { type: 'comparison', title: 'OWASP risks → tester actions', headers: ['Risk', 'What to send', 'Red flag'], rows: [['BOLA', "Swap id to another user's", '200 with their data'], ['Broken auth', 'Expired / tampered token', 'Still returns 200'], ['Excessive data', 'Normal GET, read all fields', 'passwordHash / PII present'], ['No rate limiting', 'Repeat POST /login fast', 'No lockout or throttle'], ['Misconfiguration', 'Trigger an error', 'Full stack trace / secrets']] },
        davidTip: `You don't need to be a security specialist to be dangerous with OWASP. I've watched functional testers become the most valued people on the team simply by turning the Top 10 into ten saved requests and running them on every release. Do that and you'll find bugs the developers didn't know existed.`,
        badGood: { label: 'reviewing a response body', bad: `You confirm the three fields the UI needs are present, see \`200\`, and pass the test — the other twelve fields go unread.`, good: `You read every field in the body and challenge each one: the response leaks \`passwordHash\` and \`internalRiskScore\`, so you raise an excessive-data-exposure finding with the payload attached.` },
        miniChallenge: `Choose one OWASP risk from this lesson and write out the single Postman request you'd send to test for it, plus what result would make it a finding.`,
        modelAnswer: `## Example\nRisk: Broken authentication. Request: resend a known-good request but with an expired bearer token. A finding is any \`2xx\` response — the API should reject the dead token with \`401\`. I'd save it as "Broken auth — expired token" in my OWASP folder.`,
        managersReview: { intro: `If I reviewed your Module 5 security work as a lead, here's what I'd assess:`, strengths: ['You separate authentication (401) from authorisation (403) cleanly', 'You write negative tests, not just happy paths', 'You test tokens for expiry and tampering'], improvements: ['Turn each OWASP risk into a saved, repeatable request', 'Add assertions so negatives fail loudly in CI', 'Attach the actual response body as evidence in findings'], gaps: ['Only testing as the correct, privileged user', 'Never swapping ids to check for BOLA', 'Reading only the fields the UI happens to use'] },
        portfolioBuilder: `Build an "OWASP API Security checks" Postman folder: one saved, asserted request per risk from this lesson (BOLA, broken auth, excessive data, rate limiting, misconfiguration). Export it as your Module 5 portfolio artefact — it's concrete proof of security-aware testing.`,
        resourcePreview: { name: 'OWASP API Top 10 Tester Checklist', purpose: 'Each OWASP risk mapped to a concrete request and a red-flag result.', whenToUse: 'Run it against every API you test, on every release.', formats: ['PDF', 'Postman JSON'] },
      },
    },
  ],
};
