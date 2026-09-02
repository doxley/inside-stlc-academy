-- Module 6: API Testing with Postman (7 lessons)

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 1, 'What is an API? Understanding REST', '10 minute read',
$$Before you can test APIs, you need to understand what they are and how they work. This lesson demystifies APIs, explains REST — the dominant architectural style — and shows you why API testing is one of the highest-value skills a QA engineer can have.$$,
array[
  'Explain what an API is and why it matters for testing',
  'Describe the key principles of REST APIs',
  'Identify the components of an HTTP request and response'
],
$$## What is an API?

API stands for Application Programming Interface. It''s a set of rules that allows two software applications to communicate with each other.

Think of it like a waiter in a restaurant:
- You (the client) make a request: "I''d like the pasta."
- The waiter (API) takes your request to the kitchen (server).
- The kitchen prepares the food.
- The waiter brings back the response: the pasta.

In software, the "client" is an app or browser, the "kitchen" is a backend server, and the "waiter" is the API.

**Why this matters for testers:**
Most modern applications are split into a frontend (what the user sees) and a backend (where the data and logic lives). They talk to each other through APIs. Testing at the API layer means:
- You catch bugs closer to where the logic lives
- You can test things before the UI is built
- You can automate at a level that doesn''t break when the UI changes
- You find data integrity issues the UI often hides

## REST APIs

REST (Representational State Transfer) is the most common style for web APIs. REST APIs use HTTP — the same protocol browsers use — to make requests and return responses.

**The key HTTP methods (verbs):**

| Method | Purpose | Example |
|---|---|---|
| GET | Retrieve data | GET /users/123 — fetch user with ID 123 |
| POST | Create new data | POST /users — create a new user |
| PUT | Replace data | PUT /users/123 — replace user 123''s full record |
| PATCH | Update part of data | PATCH /users/123 — update just the email |
| DELETE | Delete data | DELETE /users/123 — remove user 123 |

## Anatomy of an HTTP Request

```
Method: GET
URL: https://api.example.com/users/123
Headers:
  Authorization: Bearer eyJhbGc...
  Content-Type: application/json
Body: (empty for GET requests)
```

## Anatomy of an HTTP Response

```
Status Code: 200 OK
Headers:
  Content-Type: application/json
Body:
{
  "id": 123,
  "name": "Jane Smith",
  "email": "jane@example.com",
  "role": "admin"
}
```

## HTTP Status Codes — The Essential List

| Code | Meaning | When you''ll see it |
|---|---|---|
| 200 | OK | Successful GET, PUT, PATCH |
| 201 | Created | Successful POST (new resource created) |
| 204 | No Content | Successful DELETE (nothing to return) |
| 400 | Bad Request | Invalid data sent (missing field, wrong type) |
| 401 | Unauthorized | Not authenticated — no or invalid token |
| 403 | Forbidden | Authenticated, but not allowed |
| 404 | Not Found | Resource doesn''t exist |
| 422 | Unprocessable Entity | Valid format, but business rule violation |
| 500 | Internal Server Error | Bug in the backend |

As a tester, you need to verify not just *that* a response comes back, but *which* status code it returns and whether the response body contains what you expect.$$,
$$**API call in a hotel booking system:**

Request:
```
POST https://api.bookingapp.com/reservations
Authorization: Bearer abc123...
Content-Type: application/json

{
  "hotel_id": "H001",
  "room_type": "double",
  "check_in": "2024-12-01",
  "check_out": "2024-12-05",
  "guest_name": "Jane Smith"
}
```

Expected response:
```
Status: 201 Created
{
  "reservation_id": "RES-88412",
  "status": "confirmed",
  "total_price": 480.00,
  "currency": "GBP"
}
```

As a tester: I should verify the 201 status, that reservation_id is returned, that the price calculation is correct (4 nights × £120 = £480), and that the booking appears when I subsequently call GET /reservations/RES-88412.$$,
$$- Confusing APIs with databases — APIs are the interface; databases are the storage
- Thinking API testing requires coding skills — Postman makes it point-and-click
- Only testing happy paths at the API level — error handling and edge cases are especially important here
- Ignoring response headers — content type, rate limit headers, cache headers can all reveal issues$$,
$$Every mobile app and web app you use every day is powered by APIs. Next time you''re in a meeting and someone mentions a feature, try to think: "What API call would trigger that?" This habit trains your mental model faster than any textbook.$$,
$$Look at your phone and think of one app you use daily (banking, food delivery, social media). Without looking anything up, describe what API calls you think it makes when you: open the app, search for something, and make a purchase or action.$$,
$$What HTTP status code indicates that a resource was successfully created?$$,
$$What is the difference between PUT and PATCH HTTP methods?$$,
array[
  'I can explain what an API is in plain language',
  'I understand the five main HTTP methods and when each is used',
  'I can read an HTTP response and identify the status code, headers, and body'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 2, 'Getting Started with Postman', '12 minute read',
$$Postman is the industry-standard tool for API testing. It gives you a visual interface to send API requests, inspect responses, and build collections of tests. In this lesson you''ll get set up and make your first API calls.$$,
array[
  'Download and navigate the Postman interface',
  'Send a GET request and inspect the response',
  'Use path variables and query parameters in requests'
],
$$## Installing Postman

1. Go to postman.com and download the free desktop app (Windows, Mac, or Linux)
2. Create a free account — saves your collections to the cloud
3. Open Postman and explore the main areas:
   - **Collections panel** (left) — where your saved requests live
   - **Request builder** (centre) — where you build and send requests
   - **Response panel** (bottom) — where you see what comes back

## Your First Request — A Public API

Let''s use a real, public API: the JSONPlaceholder API — a fake REST API for testing.

1. Click **New → HTTP Request**
2. Set the method to **GET**
3. Enter the URL: `https://jsonplaceholder.typicode.com/users/1`
4. Click **Send**

You should see a response with status `200 OK` and a JSON body containing user data.

## Understanding the Postman Response Panel

- **Body tab:** The response data (usually JSON)
- **Status:** The HTTP status code (200, 404, etc.)
- **Time:** How long the request took in milliseconds
- **Size:** How large the response is
- **Headers tab:** Response headers

## Path Variables and Query Parameters

**Path variables** — part of the URL itself, identifying a specific resource:
```
GET /users/{id}
GET /users/42
```
In Postman, path variables are defined with `:variable` notation:
`https://api.example.com/users/:userId`
Then set `userId = 42` in the **Path Variables** section.

**Query parameters** — key-value pairs appended to the URL after `?`:
```
GET /products?category=shoes&limit=20&page=2
```
In Postman, use the **Params** tab to add them — Postman builds the URL automatically.

**Headers** — metadata sent with the request. Common ones testers set:
- `Content-Type: application/json` — tells the server the request body is JSON
- `Authorization: Bearer <token>` — authentication
- `Accept: application/json` — tells the server what format you want back

## Saving Requests to a Collection

Rather than recreating requests each time:
1. Click **Save** after building a request
2. Name it (e.g. "Get user by ID") and save it to a Collection (e.g. "User API Tests")
3. Your collection appears in the left panel — click to reopen any saved request

Collections are the foundation of organised API testing.$$,
$$**Practical exercise walkthrough using JSONPlaceholder:**

1. GET `https://jsonplaceholder.typicode.com/posts` — returns 100 posts
2. GET `https://jsonplaceholder.typicode.com/posts/5` — returns post #5 only
3. GET `https://jsonplaceholder.typicode.com/posts?userId=3` — posts by user 3

Observations:
- The list endpoint returns an array `[...]`, the single-item endpoint returns an object `{...}`
- Query params filter the results
- Response time is typically 100–200ms for this free API (production APIs should be faster for local data)

Save all three as a collection called "JSONPlaceholder Practice".$$,
$$- Sending requests with incorrect Content-Type header — APIs often reject requests with the wrong header
- Not reading the full response body — the error message is usually in the body, not just the status code
- Forgetting to save requests — rebuild from scratch every session until you build the save habit
- Testing only against the live/production API — always use a test/staging environment$$,
$$Postman has a built-in "Postman Echo" API (`https://postman-echo.com`) that returns exactly what you send it — perfect for learning. Echo your own custom request headers, body, and query params to see exactly how they''re being sent.$$,
$$Complete the practical exercise: make all three JSONPlaceholder requests. Save them to a collection. Then try: DELETE `https://jsonplaceholder.typicode.com/posts/1` — what status code do you get?$$,
$$In Postman, where do you add authentication headers for API requests?$$,
$$What is the difference between a path variable and a query parameter?$$,
array[
  'I have Postman installed and can navigate its main interface',
  'I can send a GET request and read the response status, body, and headers',
  'I understand the difference between path variables and query parameters'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 3, 'Testing API Responses — What to Verify', '11 minute read',
$$Making an API call in Postman is the easy part. Knowing *what to verify* is the real skill. This lesson gives you a systematic framework for validating API responses — covering status codes, response bodies, headers, and data integrity.$$,
array[
  'Apply a systematic checklist to validate any API response',
  'Identify the key fields to verify in a JSON response body',
  'Test API error handling and edge cases'
],
$$## The API Testing Checklist

For every API endpoint you test, work through these layers:

### 1. Status Code
Does it return the right HTTP status code?
- GET an existing resource → 200
- POST to create something → 201
- DELETE → 204 (no body)
- GET a non-existent resource → 404
- Send invalid data → 400 or 422
- Request without auth → 401
- Request with wrong auth (authenticated but not authorised) → 403

### 2. Response Body — Presence
Are all expected fields present?
- Does the response include all fields documented in the API spec?
- Are optional fields included when they should be, absent when they shouldn''t be?

### 3. Response Body — Values
Are the field values correct?
- Is the ID what you just created?
- Is the name what you sent in the request?
- Are calculated fields correct? (e.g. order total = sum of line items)
- Are dates in the expected format? (ISO 8601: `2024-12-01T14:30:00Z`)
- Are currency values in the correct currency and to the right decimal places?

### 4. Response Body — Types
Are the data types correct?
- Number returned as a number, not a string? (`"price": 14.99` vs `"price": "14.99"`)
- Boolean returned as true/false, not 1/0 or "yes"/"no"?
- Array returned when list expected (even if empty: `[]` not `null`)?

### 5. Response Headers
- `Content-Type: application/json` — is it returning JSON as expected?
- `Cache-Control` — is caching set appropriately?
- Response time — is it within acceptable limits?

### 6. Error Handling
- What happens with missing required fields?
- What happens with invalid field types (sending a string where a number is expected)?
- What happens with an ID that doesn''t exist?
- What happens with SQL injection or special characters in string fields?
- What happens when the same request is sent twice? (Idempotency)

### 7. Authentication & Authorisation
- Can unauthenticated users call this endpoint? (Should get 401)
- Can a user access another user''s data? (Should get 403)
- Do expired tokens get rejected?

## Boundary and Edge Cases for APIs

Apply the same techniques as functional testing:
- Minimum values (empty string, 0, negative numbers)
- Maximum values (very long strings, very large numbers)
- Special characters in text fields (`<script>`, `''`, `&`, unicode emoji)
- Null values for optional fields
- Extremely large payloads$$,
$$**Testing a "Create User" endpoint:**

`POST /api/users`

Test 1 — Happy path:
```json
{"name": "Jane Smith", "email": "jane@example.com", "role": "viewer"}
```
→ Expected: 201, response contains `id`, `name`, `email`, `role`, `created_at`
→ Verify: created_at is a valid timestamp. Role is "viewer". Email matches what was sent.

Test 2 — Missing required field:
```json
{"name": "Jane Smith"}
```
(No email — required field)
→ Expected: 400 or 422
→ Verify: error message mentions "email" specifically, not a generic "invalid request"

Test 3 — Duplicate email:
Send the same request again with the same email
→ Expected: 409 Conflict or 422 Unprocessable Entity
→ Verify: error says "email already registered" (not a 500!)

Test 4 — Invalid email format:
```json
{"name": "Jane Smith", "email": "not-an-email"}
```
→ Expected: 400 or 422
→ Verify: validation error, not a 500

Test 5 — Authorisation:
Send the request without an `Authorization` header
→ Expected: 401 Unauthorized$$,
$$- Only testing the happy path — APIs are most likely to break at boundaries and error cases
- Accepting any 200 response as "passed" — the body could contain incorrect data
- Not testing auth — a major security gap if unauthenticated users can access data
- Ignoring response time — slow APIs cause poor user experience and often indicate backend issues$$,
$$When you find a 500 error from an API, always note it as a bug — backends should never return 500 for predictable bad inputs. 500 means the backend crashed; it should return 400 or 422 for invalid client requests. A 500 for a missing field is always a defect.$$,
$$Using the JSONPlaceholder API or a public API of your choice, test the following scenarios for one endpoint: happy path, resource not found, invalid request method (e.g. DELETE on a list endpoint). Document your results in a table.$$,
$$You receive a 200 OK response from a GET /users/999 endpoint, but the response body is an empty object {}. Is this a bug? Explain your reasoning.$$,
$$What HTTP status code should an API return when a request is made without any authentication token?$$,
array[
  'I can apply a systematic checklist to validate any API response',
  'I know how to test API error handling and edge cases',
  'I understand the difference between testing status codes vs response body values'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 4, 'Collections, Environments & Variables', '10 minute read',
$$As your API testing grows, ad-hoc requests don''t scale. Collections, environments, and variables let you organise your tests, run them across different setups (dev/staging/production), and avoid duplicating values across hundreds of requests.$$,
array[
  'Organise API requests into logical Postman Collections',
  'Create and switch between Environments in Postman',
  'Use variables to make requests reusable and environment-agnostic'
],
$$## Collections

A Collection is a folder of related API requests. It''s your organised test suite for an API.

**Best practices for structuring a collection:**
```
My App API
├── Auth
│   ├── POST Login
│   ├── POST Refresh Token
│   └── POST Logout
├── Users
│   ├── GET All Users
│   ├── GET User by ID
│   ├── POST Create User
│   ├── PATCH Update User
│   └── DELETE User
├── Products
│   └── ...
└── Orders
    └── ...
```

Each folder maps to a resource or feature area. Within each folder, have one request per HTTP method/scenario.

## Environments and Variables

**The problem:** Your API has three environments:
- Development: `http://localhost:3000`
- Staging: `https://staging-api.myapp.com`
- Production: `https://api.myapp.com`

If you hard-code the base URL in every request, switching from staging to production means updating 50 requests. Instead, use **variables**.

**Variable syntax in Postman:** `{{variableName}}`

Example URL using a variable:
```
{{baseUrl}}/users/{{userId}}
```

**Environment** — a named set of variable values:

| Variable | Development | Staging | Production |
|---|---|---|---|
| baseUrl | http://localhost:3000 | https://staging-api.myapp.com | https://api.myapp.com |
| authToken | dev_token_abc | stg_token_xyz | (never store prod tokens!) |

Switch the active environment from the dropdown in the top-right of Postman — all requests instantly use the new values.

## Types of Variables (Scope)

| Scope | Set in | Visible to |
|---|---|---|
| Global | Global settings | All collections |
| Environment | Active environment | Active collection |
| Collection | Collection variables | That collection only |
| Local | Test scripts | Single request |

**Best practice:** Use environment variables for base URLs and auth tokens. Use collection variables for shared IDs (e.g. a user ID created in one test and used in another). Never hardcode credentials.

## Pre-request Scripts

Postman lets you run JavaScript before a request is sent. A common use: generate an auth token and store it as a variable:

```javascript
pm.sendRequest({
    url: pm.environment.get("baseUrl") + "/auth/login",
    method: "POST",
    body: {
        mode: "raw",
        raw: JSON.stringify({ email: "test@example.com", password: "TestPass123!" })
    }
}, function(err, response) {
    pm.environment.set("authToken", response.json().token);
});
```

This runs before your actual request, so you''re always authenticated automatically.$$,
$$**Setting up a reusable collection:**

1. Create environment "Staging" with:
   - `baseUrl` = https://staging.jsonplaceholder.typicode.com
   - `userId` = 1

2. Create request in collection:
   - GET `{{baseUrl}}/users/{{userId}}`

3. Save and run → works against staging

4. Create environment "Local" with `baseUrl` = http://localhost:3000

5. Switch environment → same request now hits your local server

No URL changes. No copy-pasting. One collection, multiple environments.$$,
$$- Storing production API keys or passwords in Postman environments — these sync to Postman cloud; use environment variables set locally and never share the environment file
- Not using variables for repeated values — if you type a user ID in 10 requests, maintaining them when the ID changes is painful
- Chaotic collection structure — testers who can''t find the request they need waste time; structure upfront saves time long-term$$,
$$Export your Postman collections to JSON files and commit them to your Git repository alongside the codebase. This way, API test collections evolve with the code, and new team members get them instantly.$$,
$$Set up a Postman environment with at least 3 variables (baseUrl, userId, authToken). Create a collection with 4 requests that all use the {{baseUrl}} variable. Switch environment and verify the requests update correctly.$$,
$$What is the main advantage of using Postman Environment variables instead of hardcoding URLs in each request?$$,
$$Where should you store API authentication tokens in Postman — and where should you NOT store them?$$,
array[
  'I can organise API requests into a logical Postman Collection structure',
  'I can create and switch between Postman Environments',
  'I can use variables in request URLs, headers, and bodies'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 5, 'Writing Test Scripts in Postman', '12 minute read',
$$Manually checking every API response works for a few requests. But what if you have 50? Test scripts let Postman automatically verify responses — and flag failures — so you can run your entire API test suite in seconds.$$,
array[
  'Write Postman test scripts using the pm.test() API',
  'Assert on status codes, response body values, and response time',
  'Chain requests together using variables set in test scripts'
],
$$## The Tests Tab in Postman

Every Postman request has a **Tests** tab where you can write JavaScript assertions. These run automatically after the response is received.

## pm.test() — the Core Function

```javascript
pm.test("Description of what you''re testing", function() {
    // assertion goes here
});
```

If the assertion passes → green tick in the Test Results panel.
If it fails → red cross with the reason.

## Common Assertions

**Check status code:**
```javascript
pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
});
```

**Check response body contains a field:**
```javascript
const responseData = pm.response.json();

pm.test("Response has user id", function() {
    pm.expect(responseData).to.have.property("id");
});
```

**Check a specific field value:**
```javascript
pm.test("User name is Jane Smith", function() {
    pm.expect(responseData.name).to.eql("Jane Smith");
});
```

**Check a field type:**
```javascript
pm.test("ID is a number", function() {
    pm.expect(responseData.id).to.be.a("number");
});
```

**Check response time:**
```javascript
pm.test("Response time is under 500ms", function() {
    pm.expect(pm.response.responseTime).to.be.below(500);
});
```

**Check array length:**
```javascript
pm.test("Response contains at least 1 result", function() {
    pm.expect(responseData.length).to.be.above(0);
});
```

## Chaining Requests — Setting Variables from Responses

You often need to use data from one response in the next request (e.g. use the ID from a POST Create User in a subsequent GET User By ID).

In the Tests tab of the POST request:
```javascript
const responseData = pm.response.json();
pm.environment.set("createdUserId", responseData.id);
```

Then in the next GET request URL:
```
{{baseUrl}}/users/{{createdUserId}}
```

This creates a test chain: create → get → update → delete, all automatically using the right IDs.

## Running the Whole Collection

Once your requests have test scripts:
1. Click the Collection → **Run Collection**
2. Choose your environment
3. Click **Run** — Postman runs all requests in sequence
4. View results: total tests, passed, failed

This is the beginning of automated API regression testing.$$,
$$**Test scripts for a "Create Post" endpoint:**

```javascript
// 1. Status code
pm.test("Status is 201 Created", function() {
    pm.response.to.have.status(201);
});

// 2. Parse response
const post = pm.response.json();

// 3. Fields present
pm.test("Post has id", function() {
    pm.expect(post).to.have.property("id");
});

pm.test("Post has title", function() {
    pm.expect(post).to.have.property("title");
});

// 4. Values match what was sent
pm.test("Title matches request", function() {
    pm.expect(post.title).to.eql("My Test Post");
});

// 5. ID is a number
pm.test("ID is a number", function() {
    pm.expect(post.id).to.be.a("number");
});

// 6. Performance
pm.test("Response under 300ms", function() {
    pm.expect(pm.response.responseTime).to.be.below(300);
});

// 7. Save ID for next request
pm.environment.set("postId", post.id);
```$$,
$$- Writing tests that always pass (e.g. checking for "not null" when the API always returns data anyway)
- Not testing the data values, only the status code — a 200 with wrong data is still a bug
- Forgetting to parse the response before assertions (`pm.response.json()`)
- Writing test scripts that are brittle — tied to specific IDs or data that changes$$,
$$Add a "Response time under 500ms" test to every request in your collection. Run the collection and screenshot the timing results. This is a portfolio piece that shows you understand performance as part of API quality.$$,
$$Add test scripts to 3 of your JSONPlaceholder requests from earlier lessons. Include: status code check, at least 2 response body assertions, and a response time check. Run the collection and paste your pass/fail results.$$,
$$In Postman test scripts, what does pm.environment.set() do?$$,
$$What happens when a Postman test assertion fails?$$,
array[
  'I can write pm.test() assertions for status codes, body values, and response time',
  'I can chain requests together by storing values from one response in environment variables',
  'I can run a full collection and interpret the pass/fail results'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 6, 'API Testing in Practice — A Complete Workflow', '10 minute read',
$$You''ve learned the theory. Now let''s put it together into the workflow you''d actually follow on the job: from reading API documentation, to building your test collection, to reporting defects at the API level.$$,
array[
  'Read and interpret API documentation (Swagger/OpenAPI)',
  'Design an API test strategy covering positive, negative, and security scenarios',
  'Report API-level defects clearly and with the right information'
],
$$## Reading API Documentation

Most professional APIs are documented using Swagger (OpenAPI). You''ll see it as an interactive page where you can:
- Browse all endpoints grouped by resource
- See required and optional parameters
- See the expected request body schema
- See example responses and status codes
- Try requests directly in the browser

When you start testing a new API:
1. Read the documentation end-to-end before testing anything
2. Note which fields are required vs optional
3. Note the validation rules documented for each field
4. Note any rate limits or authentication requirements
5. Check if there are documented error responses (good APIs list every possible error)

## Designing an API Test Strategy

For each endpoint, systematically plan:

**Positive tests (happy paths):**
- Minimum valid request (required fields only)
- Full request with all optional fields
- Boundary values for numeric fields

**Negative tests (error handling):**
- Missing required fields (one at a time)
- Invalid field types (string instead of integer)
- Invalid field values (negative quantity, past date)
- Non-existent resource IDs
- Duplicate resource creation

**Security tests:**
- Unauthenticated request → 401
- Authenticated but wrong role → 403
- Accessing another user''s data → 403
- SQL injection characters in string fields
- Very long strings (potential buffer overflow)

**Performance:**
- Response time under the documented SLA

## Reporting API Defects

API bugs need more context than UI bugs. Include:

1. **Endpoint:** `POST /api/v2/orders`
2. **Request headers:** (redact auth tokens — show `Bearer [TOKEN]`)
3. **Request body:** The exact JSON you sent
4. **Expected response:** Status code + expected body
5. **Actual response:** Status code + actual body
6. **Environment:** Staging v2.4.1

Example:
```
Bug: POST /api/orders returns 500 when order quantity is 0

Request: POST {{baseUrl}}/api/orders
Body: {"product_id": 42, "quantity": 0, "user_id": 101}

Expected: 400 Bad Request with message "Quantity must be at least 1"
Actual: 500 Internal Server Error
{"message": "Internal server error", "timestamp": "2024-12-01T14:22:00Z"}

Environment: Staging v2.4.1
Reproduced: 3 times consistently
```

This gives developers everything they need to reproduce and fix the issue.$$,
$$**Testing a new "Place Order" endpoint (from API docs):**

Documentation says:
- `POST /orders`
- Required: `product_id` (integer), `quantity` (integer, min 1), `delivery_address` (string)
- Optional: `promo_code` (string), `gift_wrap` (boolean)
- Returns: 201 with order details

My test plan:
1. Valid request, all fields → 201, order ID returned
2. Valid request, required fields only → 201
3. Missing product_id → 400, error mentions product_id
4. Missing quantity → 400
5. Quantity = 0 → 400 (boundary)
6. Quantity = -1 → 400 (negative)
7. product_id = 999999 (non-existent) → 404
8. Invalid promo_code "FAKE50" → 422 or 400
9. No auth token → 401
10. Valid request with another user''s auth token → 403 (if applicable)

Result: 10 test cases designed from the documentation before I''ve written a single line of Postman script.$$,
$$- Skipping the documentation — always read it first; bugs you find by deviating from the docs are the most valuable
- Only testing what the docs describe — also test what happens with undocumented inputs
- Not saving your test scripts — next sprint, the endpoint changes; your collection is your regression suite$$,
$$Build one complete API Postman collection (with test scripts) and publish it to your GitHub as a repo. A labelled screenshot of passing tests from your collection runner is one of the best portfolio pieces a junior QA can show.$$,
$$Build a Postman collection for the JSONPlaceholder /posts endpoint with at least 8 requests (mix of positive, negative, and auth-missing tests) and test scripts on each. Run the collection and capture a screenshot showing your pass/fail results.$$,
$$When reporting an API bug, what must you always include that you wouldn''t need to include in a UI bug report?$$,
$$Why should you read API documentation before writing any test cases?$$,
array[
  'I can read and interpret API documentation (Swagger/OpenAPI format)',
  'I can design a test strategy covering positive, negative, and security scenarios for any endpoint',
  'I can write an API defect report with the right level of technical detail'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 7, 'Module 6 Assignment & Knowledge Check', '60 minutes',
$$Your API testing assignment. You''ll build a real Postman collection against a live public API, write test scripts, and document your findings — the kind of work you''d do in your first week as a QA engineer.$$,
array[
  'Build a complete Postman API test collection with test scripts',
  'Identify and document API defects from your testing',
  'Explain your API testing approach and decisions'
],
$$## Your Assignment

Use the **ReqRes API** (https://reqres.in) — a real, free API designed for testing practice.

### Part 1: Postman Collection (primary deliverable)

Build a Postman collection called "ReqRes API Tests" with the following requests and test scripts. For each request, add at least 3 test assertions.

**Required requests:**
1. GET /api/users?page=2 — list users (verify: 200, has "data" array, data contains at least 1 user)
2. GET /api/users/2 — get single user (verify: 200, user ID is 2, email field present)
3. GET /api/users/999 — user not found (verify: 404)
4. POST /api/users — create user (body: `{"name": "Your Name", "job": "QA Tester"}`) (verify: 201, name matches, ID returned)
5. PUT /api/users/2 — update user (verify: 200, updated fields match)
6. DELETE /api/users/2 — delete user (verify: 204)
7. POST /api/login — successful login (body: `{"email": "eve.holt@reqres.in", "password": "cityslicka"}`) (verify: 200, token returned)
8. POST /api/login — failed login (body: `{"email": "test@test.com"}` — missing password) (verify: 400, error message present)

### Part 2: Bug Report (if applicable)

Run your collection. If any request behaves differently from what the API documentation describes, write a formal bug report for it.

If everything works as expected: write a "no defects found" statement with a summary of what you tested and your confidence level.

### Part 3: Reflection (150 words)

Answer these questions:
1. What did you find hardest about this assignment?
2. Which type of test (positive, negative, auth) produced the most interesting results?
3. How would you extend this collection if given more time?

### Submission

Submit: a screenshot of your Postman collection runner showing all pass/fail results, plus Parts 2 and 3 as a document. Bonus: export and share your collection as a JSON file.$$,
null, null, null,
$$Complete all three parts. The collection runner screenshot is mandatory — it proves your tests ran and shows real results.$$,
$$After doing this assignment, where do you feel most confident in API testing — and what still feels uncertain?$$,
$$Before submitting — have you run the full collection? Do all requests have at least 3 test assertions? Is your screenshot showing the pass/fail summary?$$,
array[
  'I built a Postman collection with all 8 required requests',
  'Every request has at least 3 test assertions',
  'I ran the full collection and captured a screenshot of the results',
  'I completed the reflection'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;
