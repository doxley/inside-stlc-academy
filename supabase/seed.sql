-- ============================================================
-- Inside STLC Academy – Seed Data
-- Run AFTER schema.sql and AFTER creating your admin user
-- Replace 'YOUR_ADMIN_USER_ID' with the actual UUID from auth.users
-- ============================================================

-- 1. Insert the course
insert into public.courses (id, title, slug, description, status) values (
  'a1b2c3d4-0001-0001-0001-000000000001',
  '90-Day Software Testing Career Roadmap: Professional Edition',
  '90-day-software-testing-career-roadmap',
  'A structured 12-module training programme designed to help students build practical, job-ready software testing skills over 90 days.',
  'published'
);

-- 2. Insert 12 modules
insert into public.modules (id, course_id, module_number, title, slug, description, learning_objectives, estimated_duration, status, unlock_day) values
(
  'b1000001-0000-0000-0000-000000000001',
  'a1b2c3d4-0001-0001-0001-000000000001',
  1,
  'Introduction to Software Testing',
  'introduction-to-software-testing',
  'This module introduces the foundations of software testing, the role of a tester, the Software Development Lifecycle, Agile vs Waterfall, testing types and common QA career paths.',
  ARRAY[
    'Understand what software testing is and why it matters',
    'Describe the role of a software tester in a development team',
    'Explain the six stages of the SDLC',
    'Distinguish between Agile and Waterfall methodologies',
    'Identify at least three types of software testing',
    'Describe potential QA career paths'
  ],
  '3–4 hours',
  'published',
  0
),
(
  'b1000002-0000-0000-0000-000000000001',
  'a1b2c3d4-0001-0001-0001-000000000001',
  2,
  'Test Design Techniques',
  'test-design-techniques',
  'Learn how to design effective test cases using industry-standard techniques including equivalence partitioning, boundary value analysis, and decision tables.',
  ARRAY[
    'Apply equivalence partitioning to identify test cases',
    'Use boundary value analysis to find edge case defects',
    'Create decision tables for complex logic',
    'Write clear, structured test cases'
  ],
  '3–4 hours',
  'coming_soon',
  7
),
(
  'b1000003-0000-0000-0000-000000000001',
  'a1b2c3d4-0001-0001-0001-000000000001',
  3,
  'Defect Management',
  'defect-management',
  'Understand the defect lifecycle, how to write high-quality bug reports, and how to prioritise and track defects effectively.',
  ARRAY[
    'Write clear and reproducible bug reports',
    'Understand defect severity and priority',
    'Track defects through the full lifecycle',
    'Use defect management tools effectively'
  ],
  '3 hours',
  'coming_soon',
  14
),
(
  'b1000004-0000-0000-0000-000000000001',
  'a1b2c3d4-0001-0001-0001-000000000001',
  4,
  'Agile & Scrum for Testers',
  'agile-and-scrum-for-testers',
  'Explore Agile principles and the Scrum framework from a tester''s perspective, including ceremonies, artefacts, and continuous testing.',
  ARRAY[
    'Explain the Agile manifesto and its values',
    'Describe Scrum roles, ceremonies, and artefacts',
    'Apply continuous testing within sprints',
    'Collaborate effectively in an Agile team'
  ],
  '3 hours',
  'coming_soon',
  21
),
(
  'b1000005-0000-0000-0000-000000000001',
  'a1b2c3d4-0001-0001-0001-000000000001',
  5,
  'Jira & Test Management',
  'jira-and-test-management',
  'Get hands-on with Jira for tracking tasks, managing test cases, and reporting. Learn how to use Zephyr or Xray for test management.',
  ARRAY[
    'Navigate Jira for QA tasks',
    'Create and manage test cases in Jira',
    'Link test cases to user stories',
    'Generate test execution reports'
  ],
  '3–4 hours',
  'coming_soon',
  28
),
(
  'b1000006-0000-0000-0000-000000000001',
  'a1b2c3d4-0001-0001-0001-000000000001',
  6,
  'API Testing with Postman',
  'api-testing-with-postman',
  'Learn to test REST APIs using Postman — creating collections, writing assertions, and building automated API test suites.',
  ARRAY[
    'Understand REST API concepts (methods, status codes, payloads)',
    'Send and validate API requests in Postman',
    'Write test assertions in Postman',
    'Organise tests into collections and run them'
  ],
  '4–5 hours',
  'coming_soon',
  35
),
(
  'b1000007-0000-0000-0000-000000000001',
  'a1b2c3d4-0001-0001-0001-000000000001',
  7,
  'SQL for Testers',
  'sql-for-testers',
  'Learn essential SQL skills for testers — querying databases, validating data, and understanding the backend of applications.',
  ARRAY[
    'Write SELECT queries to retrieve data',
    'Filter and sort results with WHERE and ORDER BY',
    'Join tables to verify data relationships',
    'Use SQL to validate test results against the database'
  ],
  '4 hours',
  'coming_soon',
  42
),
(
  'b1000008-0000-0000-0000-000000000001',
  'a1b2c3d4-0001-0001-0001-000000000001',
  8,
  'Automation Fundamentals',
  'automation-fundamentals',
  'Introduction to test automation concepts, tools, and frameworks. Learn when to automate and how to write your first automated tests.',
  ARRAY[
    'Understand when automation adds value',
    'Describe common automation frameworks (Selenium, Playwright, Cypress)',
    'Write basic automated test scripts',
    'Integrate automation into a CI/CD pipeline'
  ],
  '5 hours',
  'coming_soon',
  49
),
(
  'b1000009-0000-0000-0000-000000000001',
  'a1b2c3d4-0001-0001-0001-000000000001',
  9,
  'AI for Software Testing',
  'ai-for-software-testing',
  'Discover how AI tools are transforming QA. Learn to use AI for test case generation, exploratory testing, and bug prediction.',
  ARRAY[
    'Understand current AI applications in QA',
    'Use AI tools to generate test cases',
    'Apply prompt engineering for testing tasks',
    'Evaluate AI tool output critically'
  ],
  '3–4 hours',
  'coming_soon',
  56
),
(
  'b1000010-0000-0000-0000-000000000001',
  'a1b2c3d4-0001-0001-0001-000000000001',
  10,
  'Portfolio Building',
  'portfolio-building',
  'Learn how to build a professional QA portfolio that showcases your skills to employers. Includes GitHub projects, test reports, and more.',
  ARRAY[
    'Plan and structure a QA portfolio',
    'Create portfolio projects using real tools',
    'Write a professional portfolio README',
    'Host your portfolio on GitHub Pages or similar'
  ],
  '4 hours',
  'coming_soon',
  63
),
(
  'b1000011-0000-0000-0000-000000000001',
  'a1b2c3d4-0001-0001-0001-000000000001',
  11,
  'CV & LinkedIn Mastery',
  'cv-and-linkedin-mastery',
  'Craft a standout QA CV and an optimised LinkedIn profile that gets you noticed by recruiters and hiring managers.',
  ARRAY[
    'Write a QA-specific CV with impact',
    'Optimise LinkedIn for QA job searches',
    'Use keywords and achievements effectively',
    'Tailor applications for specific roles'
  ],
  '3 hours',
  'coming_soon',
  70
),
(
  'b1000012-0000-0000-0000-000000000001',
  'a1b2c3d4-0001-0001-0001-000000000001',
  12,
  'Interview Mastery & Job Search',
  'interview-mastery-and-job-search',
  'Prepare for QA interviews with confidence. Covers common questions, technical assessments, salary negotiation, and job search strategy.',
  ARRAY[
    'Answer common QA interview questions with confidence',
    'Tackle technical interview challenges',
    'Negotiate salary and offers effectively',
    'Build a structured job search strategy'
  ],
  '4 hours',
  'coming_soon',
  77
);

-- 3. Insert Module 1 quiz
insert into public.quizzes (id, module_id, title, pass_mark) values (
  'c1000001-0000-0000-0000-000000000001',
  'b1000001-0000-0000-0000-000000000001',
  'Module 1 Quiz – Introduction to Software Testing',
  70
);

-- 4. Quiz questions and answers for Module 1
-- Q1
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values
('d1000001-0000-0000-0000-000000000001', 'c1000001-0000-0000-0000-000000000001', 'What is the primary purpose of software testing?', 'multiple_choice', 1);
insert into public.quiz_answers (question_id, answer_text, is_correct) values
('d1000001-0000-0000-0000-000000000001', 'To write the code faster', false),
('d1000001-0000-0000-0000-000000000001', 'To find defects and verify the software meets requirements', true),
('d1000001-0000-0000-0000-000000000001', 'To design the user interface', false),
('d1000001-0000-0000-0000-000000000001', 'To deploy the application to production', false);

-- Q2
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values
('d1000002-0000-0000-0000-000000000001', 'c1000001-0000-0000-0000-000000000001', 'What does SDLC stand for?', 'multiple_choice', 2);
insert into public.quiz_answers (question_id, answer_text, is_correct) values
('d1000002-0000-0000-0000-000000000001', 'Software Deployment Lifecycle', false),
('d1000002-0000-0000-0000-000000000001', 'System Design and Lifecycle Criteria', false),
('d1000002-0000-0000-0000-000000000001', 'Software Development Lifecycle', true),
('d1000002-0000-0000-0000-000000000001', 'Software Delivery and Launch Cycle', false);

-- Q3
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values
('d1000003-0000-0000-0000-000000000001', 'c1000001-0000-0000-0000-000000000001', 'Which of the following is NOT a stage of the SDLC?', 'multiple_choice', 3);
insert into public.quiz_answers (question_id, answer_text, is_correct) values
('d1000003-0000-0000-0000-000000000001', 'Requirements', false),
('d1000003-0000-0000-0000-000000000001', 'Design', false),
('d1000003-0000-0000-0000-000000000001', 'Marketing', true),
('d1000003-0000-0000-0000-000000000001', 'Testing', false);

-- Q4
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values
('d1000004-0000-0000-0000-000000000001', 'c1000001-0000-0000-0000-000000000001', 'What is the difference between verification and validation?', 'multiple_choice', 4);
insert into public.quiz_answers (question_id, answer_text, is_correct) values
('d1000004-0000-0000-0000-000000000001', 'They are the same thing', false),
('d1000004-0000-0000-0000-000000000001', 'Verification checks we built the product right; validation checks we built the right product', true),
('d1000004-0000-0000-0000-000000000001', 'Validation checks we built the product right; verification checks we built the right product', false),
('d1000004-0000-0000-0000-000000000001', 'Verification is done by developers; validation is done by users only', false);

-- Q5
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values
('d1000005-0000-0000-0000-000000000001', 'c1000001-0000-0000-0000-000000000001', 'What is exploratory testing?', 'multiple_choice', 5);
insert into public.quiz_answers (question_id, answer_text, is_correct) values
('d1000005-0000-0000-0000-000000000001', 'Testing without any plan or structure whatsoever', false),
('d1000005-0000-0000-0000-000000000001', 'Simultaneous learning, test design, and test execution without scripted test cases', true),
('d1000005-0000-0000-0000-000000000001', 'Automated regression testing', false),
('d1000005-0000-0000-0000-000000000001', 'Testing only the user interface', false);

-- Q6
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values
('d1000006-0000-0000-0000-000000000001', 'c1000001-0000-0000-0000-000000000001', 'In Agile development, testing is:', 'multiple_choice', 6);
insert into public.quiz_answers (question_id, answer_text, is_correct) values
('d1000006-0000-0000-0000-000000000001', 'Done only at the end of the project', false),
('d1000006-0000-0000-0000-000000000001', 'Not necessary because developers test the code', false),
('d1000006-0000-0000-0000-000000000001', 'Continuous and integrated throughout each sprint', true),
('d1000006-0000-0000-0000-000000000001', 'Handled by a separate QA department after development completes', false);

-- Q7
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values
('d1000007-0000-0000-0000-000000000001', 'c1000001-0000-0000-0000-000000000001', 'What is a defect in software testing?', 'multiple_choice', 7);
insert into public.quiz_answers (question_id, answer_text, is_correct) values
('d1000007-0000-0000-0000-000000000001', 'A feature request from a user', false),
('d1000007-0000-0000-0000-000000000001', 'A flaw in the software that causes it to behave incorrectly or produce incorrect results', true),
('d1000007-0000-0000-0000-000000000001', 'A planned limitation in the software', false),
('d1000007-0000-0000-0000-000000000001', 'A successful test result', false);

-- Q8
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values
('d1000008-0000-0000-0000-000000000001', 'c1000001-0000-0000-0000-000000000001', 'True or False: The Waterfall model allows testing to happen at any stage of the SDLC.', 'true_false', 8);
insert into public.quiz_answers (question_id, answer_text, is_correct) values
('d1000008-0000-0000-0000-000000000001', 'True', false),
('d1000008-0000-0000-0000-000000000001', 'False', true);

-- Q9
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values
('d1000009-0000-0000-0000-000000000001', 'c1000001-0000-0000-0000-000000000001', 'Which of the following is a valid QA career path?', 'multiple_choice', 9);
insert into public.quiz_answers (question_id, answer_text, is_correct) values
('d1000009-0000-0000-0000-000000000001', 'QA Engineer → Senior QA → QA Lead → QA Manager', true),
('d1000009-0000-0000-0000-000000000001', 'Designer → Developer → Tester → Architect', false),
('d1000009-0000-0000-0000-000000000001', 'Support → Sales → QA → Marketing', false),
('d1000009-0000-0000-0000-000000000001', 'Intern → CEO → QA Director', false);

-- Q10
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values
('d1000010-0000-0000-0000-000000000001', 'c1000001-0000-0000-0000-000000000001', 'Which of the following best describes functional testing?', 'multiple_choice', 10);
insert into public.quiz_answers (question_id, answer_text, is_correct) values
('d1000010-0000-0000-0000-000000000001', 'Testing how fast the application responds under load', false),
('d1000010-0000-0000-0000-000000000001', 'Testing that the software functions according to specified requirements', true),
('d1000010-0000-0000-0000-000000000001', 'Testing the source code for syntax errors', false),
('d1000010-0000-0000-0000-000000000001', 'Testing only the visual layout of the application', false);

-- 5. Module 1 assignment definition
insert into public.assignments (id, module_id, title, instructions) values (
  'e1000001-0000-0000-0000-000000000001',
  'b1000001-0000-0000-0000-000000000001',
  'Module 1 Assignment – Introduction to Software Testing',
  'Complete the Module 1 Assignment using the provided submission template. Your assignment should demonstrate your understanding of the SDLC, testing types, and the role of a QA tester. Upload your completed assignment as a PDF or DOCX file.'
);
