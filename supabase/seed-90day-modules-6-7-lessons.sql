-- ============================================================
-- 90-Day Roadmap — first-draft lessons for Module 6 (API Testing
-- with Postman) and Module 7 (SQL for Testers).
-- Draft content for review/refinement. Run AFTER lessons-schema.sql.
-- ============================================================

-- ─────────────── MODULE 6: API TESTING WITH POSTMAN ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'What is an API?', '12 minute read',
  $$APIs are how software talks to software. Testing them lets you catch issues below the UI — earlier, faster, and more reliably.$$,
  array['Explain what an API is in plain language','Describe the request/response model','Explain why testers test APIs directly'],
  $$## The idea
An API (Application Programming Interface) lets one system request data or actions from another. The UI you click is usually just calling APIs underneath.

## Request and response
- A client sends a request (method, URL, headers, optional body)
- The server returns a response (status code, headers, body — often JSON)

## Why test the API directly
- Faster and more stable than UI tests
- Catches problems before they reach the screen
- Lets you test rules the UI hides$$,
  $$When you log in, the page sends POST /login with your email and password; the API responds 200 with a token, or 401 if the details are wrong. Testing that API checks the rule directly.$$,
  $$- Assuming "the UI works, so the API is fine" — they fail differently
- Ignoring the response body and only checking it "loaded"
- Testing only success, never error responses$$,
  $$API testing is a fast win in interviews and on the job — you find more, sooner, with less flakiness than UI automation.$$,
  $$Open any web app, open the browser dev tools Network tab, do one action, and note the request method, URL and response status.$$,
  $$Why can testing at the API level catch issues the UI might hide?$$,
  $$An API response always includes a: A) screenshot B) status code C) database. (Answer: B)$$,
  array['I can explain what an API is','I understand the request/response model']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'HTTP Methods & Status Codes', '12 minute read',
  $$Methods say what you want to do; status codes say what happened. Knowing both is the language of API testing.$$,
  array['Describe the main HTTP methods','Interpret common status codes','Match codes to test expectations'],
  $$## Common methods
- GET: read data
- POST: create
- PUT/PATCH: update
- DELETE: remove

## Status code families
- 2xx success (200 OK, 201 Created)
- 3xx redirection
- 4xx client error (400 Bad Request, 401 Unauthorised, 403 Forbidden, 404 Not Found)
- 5xx server error (500)

## Testing angle
For every endpoint, decide which code each scenario should return — success and failures.$$,
  $$Creating a resource should return 201, not 200. Requesting a deleted item should return 404. Testing these exact codes catches sloppy error handling.$$,
  $$- Accepting any 2xx without checking the exact expected code
- Treating 401 (not authenticated) and 403 (not allowed) as the same
- Not testing 4xx/5xx paths at all$$,
  $$Memorise 200, 201, 400, 401, 403, 404, 500 — they cover the vast majority of API tests and interview questions.$$,
  $$For a "create user" endpoint, list the status code you'd expect for: success, missing field, not logged in, and a server crash.$$,
  $$Why is it important to distinguish 401 from 403 when testing?$$,
  $$Which status code means "created successfully"? (Answer: 201)$$,
  array['I can name the main HTTP methods','I can map scenarios to expected status codes']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Making Requests in Postman', '15 minute read',
  $$Postman is the most popular tool for hands-on API testing. This lesson gets you sending real requests.$$,
  array['Send GET and POST requests in Postman','Set headers and a JSON body','Read the response panel'],
  $$## Anatomy of a request
- Method + URL
- Headers (e.g. Content-Type: application/json, Authorization)
- Body (for POST/PUT, usually JSON)

## Sending and reading
- Click Send; read the status, time, and response body
- Pretty-print JSON to inspect fields

## Auth basics
Many APIs need a token in the Authorization header (Bearer <token>).$$,
  $$Use a free public API such as https://reqres.in. GET /api/users/2 returns 200 with a user object; POST /api/users with a JSON body returns 201 with the created record.$$,
  $$- Forgetting the Content-Type header on POST and getting 400/415
- Pasting the token without the "Bearer " prefix
- Not checking the response body, only the status$$,
  $$Build a small Postman collection as you learn — it becomes a portfolio artefact you can show in interviews.$$,
  $$Using a free public API, send one GET and one POST request in Postman and record the status and key response fields.$$,
  $$Why do POST requests usually need a Content-Type header?$$,
  $$Where does an auth token typically go in a request? (Answer: the Authorization header)$$,
  array['I can send GET and POST requests in Postman','I can set headers and a JSON body']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Validating Responses & Assertions', '15 minute read',
  $$Sending a request is half the job; the value is in checking the response is correct. Postman lets you automate those checks.$$,
  array['Validate status, body and fields','Write basic Postman test scripts','Check schema and data correctness'],
  $$## What to validate
- Status code is the expected one
- Key fields exist and have the right values/types
- Error responses return the right message and code

## Postman tests (JavaScript)
- pm.test("status 200", () => pm.response.to.have.status(200));
- pm.expect(pm.response.json().id).to.eql(2);

## Beyond the happy path
Validate missing fields, wrong types, and unauthorised access too.$$,
  $$After GET /api/users/2 you assert: status is 200, body has a data.email field, and the email matches the expected value. Now the test fails automatically if the API changes.$$,
  $$- Only asserting the status and ignoring the body
- Hard-coding values that change between runs
- Not validating the shape (schema) of the response$$,
  $$Automated assertions turn a manual check into a repeatable regression test — this is the bridge to API automation later in the course.$$,
  $$Add two Postman tests to a request: one for the status code and one that checks a specific field in the response body.$$,
  $$Why is asserting the response body more valuable than only checking the status code?$$,
  $$A Postman test that checks the status code helps you: A) design the API B) catch regressions automatically C) deploy. (Answer: B)$$,
  array['I can validate status, fields and errors','I can write a basic Postman assertion']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Collections, Variables & Environments', '12 minute read',
  $$Real API testing means many requests across environments. Collections, variables and environments keep it organised and reusable.$$,
  array['Organise requests into collections','Use variables to avoid repetition','Switch between environments safely'],
  $$## Collections
Group related requests (e.g. all "Users" endpoints) so they can be run together.

## Variables
Store reusable values (base URL, token, IDs) so you change them in one place.

## Environments
Keep separate configs for dev, test and prod — switch with one dropdown instead of editing every request.

## Chaining
Capture a value from one response (e.g. an id) and use it in the next request.$$,
  $$You set {{baseUrl}} and {{token}} as environment variables. The same collection runs against dev and test just by switching environment — no edits.$$,
  $$- Hard-coding URLs/tokens in every request
- Mixing environments and accidentally hitting production
- One giant unsorted list of requests$$,
  $$Never run an untested collection against production. A clearly labelled environment dropdown has saved many testers from a very bad day.$$,
  $$Convert a couple of requests to use a {{baseUrl}} variable and create dev/test environments for them.$$,
  $$How do environments reduce both effort and risk in API testing?$$,
  $$What is the main benefit of variables in Postman? (Answer: reuse/change values in one place)$$,
  array['I can organise requests into a collection','I can use variables and environments']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 6, 'Assignment & Knowledge Check', '45 minutes',
  $$Build a small, portfolio-ready Postman collection with assertions.$$,
  array['Apply Postman requests, assertions and environments end to end'],
  $$Bring the module together by testing a real public API and saving the collection.$$,
  $$## Assignment: API test collection
Using a free public API (e.g. reqres.in):
1. Create a collection with at least four requests (GET, POST, plus one negative case such as a 404).
2. Add assertions to each (status code + at least one body check).
3. Use a {{baseUrl}} variable and one environment.
4. Note the expected status code for each request and whether it passed.
Export the collection and save it to your portfolio, or submit for review.$$,
  $$Which negative test did you find most revealing, and why?$$,
  $$## Module 6 Knowledge Check
1. What does a 201 status code mean?
2. What is the difference between 401 and 403?
3. Why use environments and variables in Postman?$$,
  array['I built a Postman collection with assertions','I included a negative (error) test','I exported it to my portfolio']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 6
on conflict (module_id, lesson_number) do nothing;

-- ─────────────── MODULE 7: SQL FOR TESTERS ───────────────

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 1, 'Why Testers Need SQL', '10 minute read',
  $$SQL lets you check what actually happened in the database — the source of truth behind the UI. It is one of the most useful tester skills.$$,
  array['Explain why testers use SQL','Describe tables, rows and columns','Identify when to verify data directly'],
  $$## Why SQL matters for QA
- Confirm the UI saved the right data
- Set up and clean test data
- Investigate defects at the data level

## Database basics
- A table holds data about one thing (e.g. users)
- A row is one record; a column is one field

## When to use it
After an action, query the database to confirm the stored result matches expectations.$$,
  $$You register a user in the UI, then run SELECT * FROM users WHERE email = 'test@example.com' to confirm the row exists with the correct name and status.$$,
  $$- Trusting the UI without checking the stored data
- Running UPDATE/DELETE on shared data without care
- Not knowing which table holds the data you need$$,
  $$Read-only SQL is safe and hugely valuable. Be very cautious with UPDATE and DELETE — always know your WHERE clause.$$,
  $$List three testing situations where querying the database directly would help you.$$,
  $$Why is the database considered the "source of truth" compared with the UI?$$,
  $$In a database, a single record is a: A) column B) row C) table. (Answer: B)$$,
  array['I can explain why testers use SQL','I know what tables, rows and columns are']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 2, 'SELECT Basics', '12 minute read',
  $$SELECT is how you read data. This lesson covers the core query every tester uses daily.$$,
  array['Write a basic SELECT query','Choose specific columns','Order and limit results'],
  $$## The basics
- SELECT * FROM table; — all columns
- SELECT name, email FROM users; — specific columns
- ORDER BY created_at DESC — sort
- LIMIT 10 — cap the rows returned

## Good habits
- Select only the columns you need
- Always add LIMIT when exploring a large table$$,
  $$SELECT id, email, status FROM users ORDER BY created_at DESC LIMIT 5; shows the five most recently created users — perfect for checking a new sign-up.$$,
  $$- SELECT * on huge tables with no LIMIT
- Forgetting that column names must match exactly
- Assuming row order without ORDER BY$$,
  $$When verifying a recent action, ORDER BY a created/updated timestamp DESC with a small LIMIT finds your record fast.$$,
  $$Write a query to return the 10 most recently created records from a table you choose, showing only three columns.$$,
  $$Why is selecting specific columns better than SELECT * in most cases?$$,
  $$Which clause limits how many rows are returned? (Answer: LIMIT)$$,
  array['I can write a basic SELECT','I can order and limit results']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 3, 'Filtering with WHERE', '12 minute read',
  $$WHERE narrows results to exactly the rows you care about — essential for verifying specific test data.$$,
  array['Filter rows with WHERE','Combine conditions with AND/OR','Use comparison and pattern operators'],
  $$## Filtering
- WHERE status = 'active'
- WHERE age >= 18 AND country = 'UK'
- WHERE email LIKE '%@test.com'
- WHERE id IN (1, 2, 3)
- WHERE deleted_at IS NULL

## Tips
- Strings go in single quotes
- Use IS NULL / IS NOT NULL for empties$$,
  $$To find your test account: SELECT * FROM users WHERE email = 'qa+demo@test.com'; To find all unverified users: WHERE verified = false.$$,
  $$- Using = NULL instead of IS NULL
- Forgetting quotes around text values
- Mixing AND/OR without parentheses, getting wrong results$$,
  $$When AND and OR appear together, use parentheses to make the logic explicit — it prevents subtle, confusing results.$$,
  $$Write a query that returns active users created in the last 30 days (combine two conditions).$$,
  $$Why must you use IS NULL rather than = NULL?$$,
  $$Which operator matches a text pattern? (Answer: LIKE)$$,
  array['I can filter rows with WHERE','I can combine conditions correctly']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 4, 'Joins Across Tables', '15 minute read',
  $$Real data is spread across related tables. Joins let you combine them to verify end-to-end results.$$,
  array['Explain why tables are related','Write a basic INNER JOIN','Understand LEFT JOIN for missing matches'],
  $$## Why joins
Data is normalised across tables (e.g. orders and customers). A join recombines them on a shared key.

## INNER JOIN
Returns rows that match in both tables:
SELECT o.id, c.email FROM orders o JOIN customers c ON c.id = o.customer_id;

## LEFT JOIN
Returns all rows from the left table, with NULLs where there's no match — great for finding orphans (e.g. orders with no customer).$$,
  $$To verify an order belongs to the right customer:
SELECT o.id, o.total, c.email FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.id = 1234;$$,
  $$- Forgetting the ON condition, producing a huge cross join
- Using INNER JOIN when you needed LEFT JOIN to find missing data
- Ambiguous column names without table aliases$$,
  $$LEFT JOIN ... WHERE right_table.id IS NULL is the classic way to find records missing their related row — a powerful data-integrity check.$$,
  $$Write a join that lists each order's id and the customer email it belongs to.$$,
  $$When would a LEFT JOIN reveal a data problem an INNER JOIN would hide?$$,
  $$Which join returns only rows that match in both tables? (Answer: INNER JOIN)$$,
  array['I can write a basic INNER JOIN','I understand when to use a LEFT JOIN']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, worked_example, common_mistakes, real_world_tip, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 5, 'Aggregations & Data Validation', '12 minute read',
  $$Aggregations summarise data — perfect for sanity checks and finding data-quality problems.$$,
  array['Use COUNT, SUM, AVG','Group results with GROUP BY','Apply aggregations to validate data'],
  $$## Aggregate functions
- COUNT(*) — how many rows
- SUM(amount), AVG(amount), MIN, MAX

## Grouping
SELECT status, COUNT(*) FROM orders GROUP BY status; — counts per status.

## Validation uses
- Detect duplicates (GROUP BY email HAVING COUNT(*) > 1)
- Check totals match what the UI reports
- Spot impossible values (negative totals)$$,
  $$Find duplicate emails:
SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1; — any rows returned are data-integrity bugs.$$,
  $$- Using WHERE to filter on an aggregate (use HAVING instead)
- Forgetting GROUP BY when selecting a non-aggregated column
- Assuming counts without checking soft-deleted rows$$,
  $$A quick COUNT(*) before and after an action is a fast, reliable check that the right number of rows changed.$$,
  $$Write a query that finds any duplicate values in a column that should be unique.$$,
  $$Why must you use HAVING rather than WHERE to filter on a COUNT?$$,
  $$Which clause groups rows for aggregation? (Answer: GROUP BY)$$,
  array['I can use COUNT, SUM and AVG','I can use GROUP BY/HAVING to validate data']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (module_id, lesson_number, title, estimated_time, lesson_overview, learning_objectives, lesson_notes, exercise, reflection_question, knowledge_check, completion_checklist)
select m.id, 6, 'Assignment & Knowledge Check', '40 minutes',
  $$Use SQL to verify data and find a data-quality issue — a practical, portfolio-ready exercise.$$,
  array['Apply SELECT, WHERE, JOIN and aggregation to validate data'],
  $$Bring the module together with a small set of validation queries. Use any free sample database (e.g. a SQLite sample, or an online SQL sandbox).$$,
  $$## Assignment: Data validation pack
Using any sample database or online SQL sandbox:
1. Write a SELECT with a WHERE filter to find specific records.
2. Write a JOIN across two related tables.
3. Write an aggregation (COUNT or SUM with GROUP BY).
4. Write one query that could reveal a data-quality problem (e.g. duplicates, orphans, or negative values).
Save your queries and a sentence on what each verifies to your portfolio.$$,
  $$Which of your queries would you add to a regular data health-check, and why?$$,
  $$## Module 7 Knowledge Check
1. What is the difference between WHERE and HAVING?
2. What does a LEFT JOIN return that an INNER JOIN does not?
3. Write (in words) a query to find duplicate emails.$$,
  array['I wrote SELECT, WHERE, JOIN and aggregate queries','I wrote a data-quality check query','I saved the queries to my portfolio']
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;
