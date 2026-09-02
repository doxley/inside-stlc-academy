-- Module 7: SQL for Testers (6 lessons)

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 1, 'Why SQL Matters for Testers', '8 minute read',
$$SQL is one of the skills that separates a junior tester from a mid-level one. If you can write a database query, you can verify data that the UI doesn''t show you, find bugs developers can''t reproduce, and validate data migrations with confidence. This lesson explains why — and what you''ll be able to do by the end of this module.$$,
array[
  'Explain why SQL is a valuable skill for testers',
  'Describe the types of testing problems SQL can solve',
  'Identify the database tools testers commonly use'
],
$$## The Testing Problems SQL Solves

**Problem 1: The UI lies (or hides things)**
A banking app shows a balance of £1,200. But has the database actually stored £1,200? Or has a rounding error left it at £1,199.99? The UI might round for display. The database holds the truth.

**Problem 2: Bugs that testers can''t reproduce without the right data**
"The export fails for users who signed up before 2020 and have more than 500 transactions." You can''t test this without creating or finding the right test data. SQL lets you find that data instantly.

**Problem 3: Data migration and ETL testing**
When a company moves data from one system to another, someone needs to verify the data arrived correctly. SQL lets you count records, spot missing values, and compare datasets.

**Problem 4: Performance and load testing analysis**
Slow queries often cause performance issues. Testers who can read query execution plans can explain *why* a feature is slow, not just *that* it''s slow.

**Problem 5: Test data setup and cleanup**
Setting up test data for complex scenarios manually is slow. SQL lets you insert, update, or reset test data in seconds.

## What Testers Need vs What DBAs Need

You don''t need to be a database administrator. You don''t need to design schemas or manage database servers. You need to:
- **Read data:** SELECT queries to verify what''s stored
- **Understand relationships:** JOINs to pull data from multiple tables
- **Validate counts and aggregations:** COUNT, SUM, GROUP BY to check totals
- **Set up test data:** INSERT and UPDATE (with DBA approval in controlled environments)

That''s it. Those four skills cover 90% of what testers need SQL for.

## Tools for Running SQL as a Tester

| Tool | Used for | Free? |
|---|---|---|
| DBeaver | Universal desktop client — connects to any database | Yes |
| pgAdmin | PostgreSQL-specific GUI | Yes |
| MySQL Workbench | MySQL-specific GUI | Yes |
| Azure Data Studio | SQL Server / Azure SQL | Yes |
| Postico | PostgreSQL on Mac | Free basic version |
| The command line | Direct database access | Yes (built-in) |

Ask your team which database technology they use (PostgreSQL, MySQL, SQL Server, Oracle, SQLite) and which tool to use to connect to the test database.$$,
$$**Real scenario:** A tester was checking that a promotional discount was applied correctly. The UI showed the right discounted price. The tester queried the database:

```sql
SELECT order_id, original_total, discount_amount, final_total
FROM orders
WHERE promo_code = 'SUMMER20'
ORDER BY created_at DESC
LIMIT 10;
```

Results showed that `final_total` was consistently £0.01 higher than `original_total - discount_amount` due to a floating-point rounding error. The UI was rounding to display correctly, hiding the bug. Without SQL, this would never have been found.$$,
$$- Thinking SQL is "just for developers" — it''s one of the most portable technical skills in the industry
- Worrying about memorising every SQL command — you''ll look things up constantly; that''s normal
- Running queries on production databases — always use a test/staging database unless explicitly told otherwise by a DBA
- Running DELETE or UPDATE without a WHERE clause — catastrophic in any environment$$,
$$The fastest way to get comfortable with SQL is to practice on a database you already care about. Ask your team for read-only access to the staging database and use it while you''re testing. Real data, real queries, real learning.$$,
$$Think of a feature in an app you use (e.g. an order history, a social media post, a bank transfer). List 3 things you''d want to verify in the database that the UI might not show you directly.$$,
$$Why would a tester need SQL if they can already see the data in the application''s UI?$$,
$$Which type of SQL query does a tester use most often?$$,
array[
  'I can explain 3 testing problems that SQL helps solve',
  'I understand the difference between what testers and DBAs need from SQL',
  'I know which SQL tools are available for testers'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 2, 'SELECT, FROM, WHERE — Your First Queries', '12 minute read',
$$Time to write actual SQL. In this lesson you''ll learn the three fundamental clauses of every query: SELECT (what to get), FROM (which table), and WHERE (which rows to include). These three alone will cover most of your day-to-day testing needs.$$,
array[
  'Write a SELECT query to retrieve specific columns from a table',
  'Use WHERE clauses to filter rows by single and multiple conditions',
  'Apply comparison operators, LIKE, IN, and IS NULL in WHERE conditions'
],
$$## The Basic SELECT Statement

```sql
SELECT column1, column2
FROM table_name
WHERE condition;
```

To get all columns, use `*`:
```sql
SELECT *
FROM users;
```

To get specific columns:
```sql
SELECT id, first_name, last_name, email
FROM users;
```

Always prefer specific columns over `*` — it''s clearer about what you''re checking and faster on large tables.

## The WHERE Clause

Filters which rows to return.

**Comparison operators:**
```sql
WHERE status = 'active'          -- equal to
WHERE age > 18                   -- greater than
WHERE price <= 99.99             -- less than or equal to
WHERE created_at >= '2024-01-01' -- on or after a date
WHERE status != 'deleted'        -- not equal to
```

**Combining conditions:**
```sql
-- Both conditions must be true:
WHERE status = 'active' AND role = 'admin'

-- Either condition can be true:
WHERE status = 'pending' OR status = 'processing'
```

**IN — match any value in a list:**
```sql
WHERE status IN ('pending', 'processing', 'shipped')
-- Much cleaner than: WHERE status = 'pending' OR status = 'processing' OR status = 'shipped'
```

**LIKE — pattern matching:**
```sql
WHERE email LIKE '%@gmail.com'      -- ends with @gmail.com
WHERE first_name LIKE 'Jo%'        -- starts with Jo
WHERE description LIKE '%error%'   -- contains "error" anywhere
```

**IS NULL / IS NOT NULL:**
```sql
WHERE completed_at IS NULL          -- not yet completed
WHERE phone_number IS NOT NULL      -- has a phone number
```

## ORDER BY and LIMIT

```sql
SELECT id, first_name, email, created_at
FROM users
WHERE status = 'active'
ORDER BY created_at DESC   -- newest first
LIMIT 20;                  -- only first 20 rows
```

Always use `LIMIT` when exploring — never run `SELECT * FROM large_table` with no limit in production.

## Practical Testing Queries

**"Show me all users who registered today":**
```sql
SELECT id, first_name, email, created_at
FROM users
WHERE DATE(created_at) = CURRENT_DATE
ORDER BY created_at DESC;
```

**"Show me all open bugs assigned to the developer I''m working with":**
```sql
SELECT id, title, severity, status
FROM bugs
WHERE assigned_to = 'dev.johnson@company.com'
AND status NOT IN ('fixed', 'closed', 'won''t fix')
ORDER BY severity;
```

**"Has this user''s email been verified?":**
```sql
SELECT id, email, email_verified_at
FROM users
WHERE email = 'testuser@example.com';
```
If `email_verified_at IS NULL` → not verified. Simple.$$,
$$**Scenario:** You''re testing an e-commerce site and want to verify that a discount was applied correctly to an order.

```sql
-- Find the order
SELECT
    id,
    user_id,
    promo_code,
    subtotal,
    discount_amount,
    total,
    status,
    created_at
FROM orders
WHERE id = 'ORD-12345';
```

Results:
| id | user_id | promo_code | subtotal | discount_amount | total |
|---|---|---|---|---|---|
| ORD-12345 | 891 | SAVE10 | 89.99 | 9.00 | 80.99 |

Expected: 10% of £89.99 = £9.00. Actual: £9.00 ✓
Total: £89.99 - £9.00 = £80.99 ✓

But wait — the promo "SAVE10" is supposed to give exactly 10%. £89.99 × 10% = £8.999, rounded to £9.00. Is that the right rounding direction? Worth checking with the BA: should it round up or down?$$,
$$- Forgetting single quotes around string values (`WHERE status = active` will fail — needs `''active''`)
- Using `=` to check for NULL instead of `IS NULL` (`WHERE completed_at = NULL` always returns 0 rows)
- Running queries with no WHERE clause on large tables — always add a LIMIT
- Modifying data (UPDATE/DELETE) without first running a SELECT to confirm which rows are affected$$,
$$Make the SELECT + WHERE pattern your first reflex whenever you''re testing anything data-driven. Before clicking through a UI flow, write the query that will verify the outcome in the database. Run it before and after — the diff tells you exactly what changed.$$,
$$Using a free online SQL sandbox (like sqlfiddle.com, db-fiddle.com, or Mode Analytics), write and run these 3 queries: (1) All users with email from a specific domain. (2) All orders placed in the last 7 days, sorted newest first. (3) All products where price is between £10 and £50.$$,
$$You need to find all users who have NOT verified their email. Which SQL clause do you use?$$,
$$What does the LIKE operator with a % wildcard do?$$,
array[
  'I can write a SELECT query with specific columns and a WHERE clause',
  'I can use AND, OR, IN, LIKE, and IS NULL in WHERE conditions',
  'I can add ORDER BY and LIMIT to control the result set'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 3, 'JOINs: Pulling Data from Multiple Tables', '13 minute read',
$$Data in a database is rarely in one table. Users are in one table, orders in another, products in a third. JOINs are how you bring related data together. This is the single most powerful SQL technique for testers — and the most commonly tested in interviews.$$,
array[
  'Write an INNER JOIN to combine data from two tables',
  'Explain the difference between INNER JOIN, LEFT JOIN, and RIGHT JOIN',
  'Use table aliases to write readable multi-table queries'
],
$$## Why Data Sits in Multiple Tables

Databases are "normalised" — data is split across tables to avoid repetition and keep it consistent. For example:

| Table | What it contains |
|---|---|
| users | User account info |
| orders | Each order placed |
| order_items | Each line item within an order |
| products | Product details |

An order doesn''t store the user''s full name — just their `user_id`. An order item doesn''t store the product name — just the `product_id`. JOINs connect these tables on their shared keys.

## INNER JOIN — The Most Common

Returns rows where the condition matches in BOTH tables.

```sql
SELECT
    orders.id AS order_id,
    users.first_name,
    users.email,
    orders.total,
    orders.status
FROM orders
INNER JOIN users ON orders.user_id = users.id
WHERE orders.status = 'pending'
ORDER BY orders.created_at DESC;
```

This shows all pending orders, along with the customer''s name and email.

## Table Aliases — Making Queries Readable

Long table names get verbose. Use aliases:

```sql
SELECT
    o.id AS order_id,
    u.first_name,
    u.email,
    o.total,
    o.status
FROM orders o
INNER JOIN users u ON o.user_id = u.id
WHERE o.status = 'pending';
```

`o` = orders, `u` = users. Much cleaner.

## LEFT JOIN — Include All Rows from the Left Table

Returns ALL rows from the left table, plus matching rows from the right. Unmatched rows from the right show as NULL.

Use case: "Show me all users, whether or not they have placed an order."

```sql
SELECT
    u.id,
    u.email,
    u.created_at,
    o.id AS order_id,
    o.total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
ORDER BY u.created_at DESC;
```

Users with no orders will appear with `order_id = NULL` and `total = NULL`. Useful for spotting orphaned records.

**Finding users who have NEVER ordered:**
```sql
SELECT u.id, u.email, u.created_at
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;
```

The `WHERE o.id IS NULL` trick filters to only the unmatched rows — users with no order.

## Joining Three Tables

Chain JOINs for more complex queries:

```sql
SELECT
    o.id AS order_id,
    u.email,
    p.name AS product_name,
    oi.quantity,
    oi.unit_price
FROM orders o
INNER JOIN users u ON o.user_id = u.id
INNER JOIN order_items oi ON oi.order_id = o.id
INNER JOIN products p ON oi.product_id = p.id
WHERE o.id = 'ORD-12345';
```

This gives you a full breakdown of an order: who placed it, what they ordered, quantities and prices.$$,
$$**Real testing scenario:** You''re testing that when an admin deactivates a user account, their active orders are automatically cancelled.

```sql
-- Step 1: Find the user
SELECT id, status FROM users WHERE email = 'testuser@example.com';
-- Result: id=891, status='inactive' ✓ (admin correctly deactivated)

-- Step 2: Check their orders
SELECT
    o.id,
    o.status,
    o.created_at,
    u.status AS user_status
FROM orders o
INNER JOIN users u ON o.user_id = u.id
WHERE u.email = 'testuser@example.com'
AND o.created_at > NOW() - INTERVAL '30 days';
```

Results: 1 order, status = 'pending'. Bug! The order should be 'cancelled' when the user is deactivated.

Without SQL, this would have required navigating to the admin panel, finding the order, and manually checking — or worse, it would have been missed entirely.$$,
$$- Confusing LEFT JOIN and INNER JOIN — INNER returns only matching rows; LEFT returns ALL rows from the left table
- Forgetting to specify which table a column belongs to when both tables have the same column name (e.g. both have `id`) — always use `table.column` or aliases
- Joining on the wrong column — check the data model carefully; a wrong join silently returns wrong data$$,
$$When you''re testing data relationships (e.g. orders and users, assignments and students), always write the JOIN query first and run it before you start UI testing. You''ll understand the data structure deeply, and you''ll have your verification queries ready when you need them.$$,
$$Write a SQL query that shows all orders from the last 30 days including the customer''s name and email. Then write a second query that finds customers who placed more than 3 orders last month.$$,
$$What is the difference between an INNER JOIN and a LEFT JOIN?$$,
$$In a LEFT JOIN, what value appears in the right table''s columns for unmatched rows?$$,
array[
  'I can write an INNER JOIN query combining two tables',
  'I understand the difference between INNER JOIN and LEFT JOIN',
  'I can join three or more tables and use table aliases for readability'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 4, 'Aggregations: COUNT, SUM, GROUP BY', '10 minute read',
$$One query that counts and groups is worth a hundred manual spot-checks. Aggregation functions let you answer "how many?", "what''s the total?", and "which category has the most?" — the questions that tell you whether the data is right at scale.$$,
array[
  'Use COUNT, SUM, AVG, MIN, and MAX in SQL queries',
  'Group results by category using GROUP BY',
  'Filter grouped results using HAVING'
],
$$## Aggregate Functions

These work on a set of rows and return a single value per group.

| Function | What it does | Example |
|---|---|---|
| COUNT(*) | Count all rows | How many orders today? |
| COUNT(column) | Count non-NULL values | How many users have a phone number? |
| SUM(column) | Total of a numeric column | Total revenue this week |
| AVG(column) | Average value | Average order value |
| MIN(column) | Smallest value | Cheapest product |
| MAX(column) | Largest value | Most expensive order |

## Simple Aggregation

```sql
-- How many users are registered?
SELECT COUNT(*) AS total_users FROM users;

-- How many active users?
SELECT COUNT(*) AS active_users FROM users WHERE status = 'active';

-- Total revenue from completed orders this month?
SELECT SUM(total) AS monthly_revenue
FROM orders
WHERE status = 'completed'
AND DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE);

-- Average order value?
SELECT AVG(total) AS avg_order_value FROM orders WHERE status = 'completed';
```

## GROUP BY — Break Results by Category

Instead of a single total for all orders, GROUP BY gives you a total per category:

```sql
-- Count of orders by status:
SELECT status, COUNT(*) AS order_count
FROM orders
GROUP BY status
ORDER BY order_count DESC;
```

Result:
| status | order_count |
|---|---|
| completed | 4521 |
| pending | 89 |
| cancelled | 312 |
| refunded | 47 |

**Testing use:** Is the number of "completed" orders what you expect? Does the count of "pending" match what the admin dashboard shows?

## Combining GROUP BY with JOINs

```sql
-- Orders per customer (top 10 by order count):
SELECT
    u.email,
    COUNT(o.id) AS order_count,
    SUM(o.total) AS lifetime_value
FROM users u
INNER JOIN orders o ON o.user_id = u.id
WHERE o.status = 'completed'
GROUP BY u.id, u.email
ORDER BY order_count DESC
LIMIT 10;
```

## HAVING — Filtering on Aggregated Results

WHERE filters individual rows. HAVING filters groups.

```sql
-- Find users who have placed more than 5 orders:
SELECT u.email, COUNT(o.id) AS order_count
FROM users u
INNER JOIN orders o ON o.user_id = u.id
GROUP BY u.id, u.email
HAVING COUNT(o.id) > 5
ORDER BY order_count DESC;
```

Use HAVING when your condition involves an aggregate function (COUNT, SUM, AVG) — not individual row values.$$,
$$**Testing a discount system migration:**

The team migrated 50,000 legacy orders to a new database. You need to verify the migration was successful.

```sql
-- Compare counts by status between old and new systems:
-- (Run in both databases and compare results)
SELECT status, COUNT(*) AS order_count, SUM(total) AS total_value
FROM orders
GROUP BY status
ORDER BY status;

-- Verify no orders were dropped (total count should match):
SELECT COUNT(*) AS total_orders FROM orders;

-- Spot-check average order value (should be similar to pre-migration):
SELECT
    DATE_TRUNC(''month'', created_at) AS month,
    COUNT(*) AS orders,
    AVG(total) AS avg_value,
    SUM(total) AS total_revenue
FROM orders
WHERE created_at >= ''2024-01-01''
GROUP BY DATE_TRUNC(''month'', created_at)
ORDER BY month;
```

If any numbers differ from the source system''s report, you''ve found a migration defect.$$,
$$- Using WHERE instead of HAVING to filter on aggregated values — `WHERE COUNT(*) > 5` is invalid; use `HAVING COUNT(*) > 5`
- Not aliasing aggregate columns — `COUNT(*)` in results is hard to read; always use `AS count` or similar
- Forgetting to include all non-aggregated columns in GROUP BY — every column in SELECT that isn''t an aggregate must be in GROUP BY$$,
$$Build a small "data verification dashboard" as a set of SQL queries for any feature you''re testing. Run them before and after each test run. Counts and totals that change unexpectedly are bugs you didn''t have to hunt for — the data told you.$$,
$$Write SQL queries to answer: (1) How many users registered each month this year? (2) Which product category has the most orders? (3) Which customers have spent more than £500 in total?$$,
$$What is the difference between WHERE and HAVING in a SQL query?$$,
$$If you want to count orders per status, which SQL clause groups the results by status?$$,
array[
  'I can use COUNT, SUM, AVG, MIN, and MAX in SQL queries',
  'I can group results using GROUP BY and filter groups with HAVING',
  'I can combine aggregations with JOINs to answer complex testing questions'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 5, 'SQL for Test Data & Validation', '10 minute read',
$$The most practical SQL skills for testers: setting up test data quickly, verifying data integrity, and writing queries that check your application''s data matches business rules. This lesson connects SQL directly to everyday testing work.$$,
array[
  'Use INSERT and UPDATE to set up test data in a test environment',
  'Write validation queries to check data integrity and business rules',
  'Find orphaned and inconsistent records using SQL'
],
$$## Setting Up Test Data with INSERT

```sql
-- Create a test user:
INSERT INTO users (first_name, last_name, email, status, created_at)
VALUES ('Test', 'User', 'testuser_99@example.com', 'active', NOW());
```

**Rules for using INSERT as a tester:**
1. Only in test/staging environments — never production
2. Get DBA or team lead approval before modifying data in shared environments
3. Document what you inserted (so you can clean it up)
4. Use realistic but clearly fake data (names like "Test User", emails like `test_XX@example.com`)

## Cleaning Up After Tests

```sql
-- Remove test data you inserted:
DELETE FROM users WHERE email LIKE 'testuser_%@example.com';

-- Always preview first with SELECT before DELETE:
SELECT * FROM users WHERE email LIKE 'testuser_%@example.com';
-- Confirm the right rows appear, THEN delete
```

**The golden rule:** Run a SELECT first. Confirm what you''re about to delete. Then DELETE.

## Data Integrity Validation Queries

These are the queries you write to verify the application stored data correctly.

**Verify uniqueness (no duplicate emails):**
```sql
SELECT email, COUNT(*) AS occurrences
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```
Result should be empty. Any rows = duplicate emails = bug.

**Verify no orphaned records (orders without a valid user):**
```sql
SELECT o.id, o.user_id, o.total
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
WHERE u.id IS NULL;
```
Result should be empty. Any rows = orders belonging to deleted/non-existent users.

**Verify required fields are not null:**
```sql
SELECT id, email
FROM users
WHERE first_name IS NULL OR last_name IS NULL OR email IS NULL;
```

**Verify price calculations:**
```sql
SELECT
    id,
    subtotal,
    discount_amount,
    tax_amount,
    total,
    -- Expected total:
    (subtotal - discount_amount + tax_amount) AS expected_total,
    -- Difference:
    ABS(total - (subtotal - discount_amount + tax_amount)) AS rounding_diff
FROM orders
WHERE ABS(total - (subtotal - discount_amount + tax_amount)) > 0.01
ORDER BY rounding_diff DESC;
```

Any rows here mean the order total doesn''t match the formula — a calculation bug.

## Business Rule Validation

```sql
-- All refunds should be less than or equal to the original order total:
SELECT
    r.id AS refund_id,
    r.amount AS refund_amount,
    o.total AS order_total
FROM refunds r
INNER JOIN orders o ON r.order_id = o.id
WHERE r.amount > o.total;
-- Should return 0 rows. Any result = business rule violation.
```$$,
$$**Testing a subscription renewal system:**

Business rule: "When a subscription renews, the renewal date must be exactly 1 month after the previous renewal date."

```sql
SELECT
    id,
    user_id,
    plan,
    previous_renewal_date,
    current_renewal_date,
    -- Expected: exactly 1 month later
    (previous_renewal_date + INTERVAL ''1 month'') AS expected_renewal_date,
    -- Flag if dates don''t match:
    CASE
        WHEN current_renewal_date != (previous_renewal_date + INTERVAL ''1 month'')
        THEN ''MISMATCH''
        ELSE ''OK''
    END AS status
FROM subscriptions
WHERE current_renewal_date >= CURRENT_DATE - INTERVAL ''30 days''
ORDER BY status DESC;
```

Any "MISMATCH" rows are bugs. Filtered to recent renewals so you''re not digging through years of history.$$,
$$- Running UPDATE or DELETE without a WHERE clause — affects every row in the table
- Not cleaning up test data — accumulates and pollutes shared test environments
- Trusting aggregates without spot-checking individual rows — `COUNT(*)` matching doesn''t mean the right data is there
- Using production IDs in test environments — can cause FK constraint errors and confusion$$,
$$Build a "test data toolkit" — a file of SQL snippets you use repeatedly: insert a test user, insert a test order, reset a user''s state, clean up test data. Keep it in your notes or a Gist. You''ll reach for it constantly.$$,
$$Write 3 data integrity validation queries for a hospital appointment booking system. What data quality issues would you check for?$$,
$$Before running a DELETE statement, what should you always do first?$$,
$$What does this query detect: `SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1`?$$,
array[
  'I can write INSERT statements to set up test data (in test environments only)',
  'I can write validation queries to detect data integrity issues',
  'I know the "SELECT first, then DELETE" rule and why it matters'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;

insert into public.lessons (
  module_id, lesson_number, title, estimated_time,
  lesson_overview, learning_objectives, lesson_notes,
  worked_example, common_mistakes, real_world_tip,
  exercise, reflection_question, knowledge_check, completion_checklist
)
select m.id, 6, 'Module 7 Assignment & Knowledge Check', '60 minutes',
$$Your SQL assignment. You''ll write a series of queries to test an e-commerce database — the same kind of work you''d do on your first week in a QA role with database access.$$,
array[
  'Write SELECT, JOIN, and aggregate queries to verify application data',
  'Identify data integrity issues using SQL',
  'Document findings as a database testing report'
],
$$## Your Assignment

You are a QA tester at an e-commerce company. You''ve been given read access to the staging database. Use the schema below to write queries answering each question.

### Schema

```
users: id, first_name, last_name, email, status, created_at
orders: id, user_id, status, subtotal, discount_amount, total, promo_code, created_at
order_items: id, order_id, product_id, quantity, unit_price, line_total
products: id, name, category, price, stock_quantity
```

---

### Part 1: Basic Queries (write the SQL for each)

1. Find all users who registered in the last 30 days, sorted by registration date (newest first)
2. Find all orders with status "pending" that are more than 7 days old (potential stuck orders)
3. Find all products where `stock_quantity` is 0 (out of stock)
4. Find the 10 most expensive orders ever placed (with user email and order total)

### Part 2: Integrity Checks

5. Find any orders where `total` does not equal `subtotal - discount_amount` (rounding errors / calculation bugs) — show the difference
6. Find any `order_items` rows where `line_total` does not equal `quantity × unit_price`
7. Find any orders that reference a `user_id` that doesn't exist in the `users` table (orphaned records)

### Part 3: Business Intelligence

8. Count orders by status — show the count and percentage of total for each status
9. Find the top 5 product categories by total revenue (completed orders only)
10. Find users who have placed more than 3 orders but have never used a promo code

### Part 4: Reflection (150 words)

Answer: How would you use these queries as part of a regular sprint testing process? Which query do you think is most valuable and why?

---

## Tips

- Write each query separately and label it clearly (Q1, Q2, etc.)
- You don''t need a real database — write the SQL and explain what result you''d expect
- If you have access to an online SQL sandbox, create a simple schema and test your queries$$,
null, null, null,
$$Submit all 10 queries with expected results and your Part 4 reflection. Label each query clearly.$$,
$$After this module, where do you feel SQL will have the most immediate impact on your testing work?$$,
$$Before submitting — read each query once more: Does it have a WHERE clause where needed? Have you used aliases for readability? Did you answer what the question asked?$$,
array[
  'I wrote all 10 SQL queries with explanations of expected results',
  'My integrity check queries correctly identify the anomaly they''re looking for',
  'I completed the reflection on how SQL fits into my testing workflow'
]
from public.modules m join public.courses c on c.id = m.course_id
where c.slug = '90-day-software-testing-career-roadmap' and m.module_number = 7
on conflict (module_id, lesson_number) do nothing;
