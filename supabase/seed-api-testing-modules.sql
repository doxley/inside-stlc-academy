-- ============================================================
-- Seed the 10 modules for "API Testing Masterclass"
-- (slug api-testing-masterclass). Run AFTER the course row exists
-- and BEFORE the lesson seeds. Safe to re-run.
-- ============================================================

insert into public.modules (course_id, module_number, title, slug, description, estimated_duration, status, unlock_day)
select c.id, v.module_number, v.title, v.slug, v.description, v.estimated_duration, 'published', 0
from public.courses c
cross join (values
  (1, 'API Fundamentals', 'api-fundamentals', 'What an API is, the client–server model, REST principles, and where API testing fits in the delivery lifecycle.', '~2 hours'),
  (2, 'HTTP Methods & Status Codes', 'http-methods-and-status-codes', 'GET, POST, PUT, PATCH, DELETE, idempotency, headers, and reading status codes like a tester.', '~2 hours'),
  (3, 'JSON & XML', 'json-and-xml', 'Read, validate and assert on JSON and XML payloads, schemas, and nested data structures.', '~2 hours'),
  (4, 'Postman Deep Dive', 'postman-deep-dive', 'Collections, environments, variables, scripts, tests, data-driven runs and the Collection Runner.', '~3 hours'),
  (5, 'Authentication & Security', 'authentication-and-security', 'API keys, Basic auth, Bearer tokens, OAuth 2.0, and testing common API security risks.', '~3 hours'),
  (6, 'REST API Testing', 'rest-api-testing', 'Designing a full REST test strategy: positive, negative, boundary, CRUD flows and end-to-end journeys.', '~3 hours'),
  (7, 'GraphQL & Contract Testing', 'graphql-and-contract-testing', 'Testing GraphQL queries and mutations, and using contract testing to catch breaking changes early.', '~2 hours'),
  (8, 'Newman & Automation', 'newman-and-automation', 'Run Postman collections from the CLI with Newman, integrate into CI/CD, and produce reports.', '~2 hours'),
  (9, 'AI-Assisted API Testing', 'ai-assisted-api-testing', 'Use AI to accelerate endpoint analysis, test idea generation, assertions and documentation — responsibly.', '~2 hours'),
  (10, 'Final API Portfolio Project', 'final-api-portfolio-project', 'Build a complete API test suite for a sample application: collections, automated execution, reporting and documentation.', '~4 hours')
) as v(module_number, title, slug, description, estimated_duration)
where c.slug = 'api-testing-masterclass'
on conflict (course_id, module_number) do nothing;
