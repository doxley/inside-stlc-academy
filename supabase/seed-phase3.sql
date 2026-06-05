-- ============================================================
-- Phase 3 Seed Data â€” Modules 2â€“12 with Quizzes & Assignments
-- Run AFTER phase3-schema-update.sql
-- ============================================================

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
-- MODULE 2 â€” Test Design Techniques
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
update public.modules set
  status = 'published',
  description = 'Learn how to design effective test cases and scenarios using structured test design techniques including equivalence partitioning, boundary value analysis, and decision tables.',
  learning_objectives = ARRAY[
    'Understand the difference between test scenarios and test cases',
    'Create clear, structured test cases with expected results',
    'Apply equivalence partitioning to identify test input groups',
    'Use boundary value analysis to find edge case defects',
    'Construct decision tables for complex business logic',
    'Plan and execute exploratory testing sessions'
  ],
  estimated_duration = '3â€“4 hours'
where id = 'b1000002-0000-0000-0000-000000000001';

insert into public.assignments (id, module_id, title, instructions, required) values (
  'e1000002-0000-0000-0000-000000000001',
  'b1000002-0000-0000-0000-000000000001',
  'Module 2 Assignment â€“ Test Design Techniques',
  'Create a test pack for a chosen website or application (e.g. a login page, checkout flow, or search function). Your pack must include:
- 10 test scenarios
- 20 test cases (with steps, expected results, pass/fail)
- 5 boundary value analysis examples
- 3 exploratory testing charters

Use the provided templates. Submit as a PDF or DOCX.'
  , true
);

insert into public.quizzes (id, module_id, title, pass_mark) values (
  'c1000002-0000-0000-0000-000000000001',
  'b1000002-0000-0000-0000-000000000001',
  'Module 2 Quiz â€“ Test Design Techniques',
  70
);

-- Q1
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d2000001-0000-0000-0000-000000000001', 'c1000002-0000-0000-0000-000000000001', 'What is the difference between a test scenario and a test case?', 'multiple_choice', 1);
insert into public.quiz_answers (question_id, answer_text, is_correct) values
('d2000001-0000-0000-0000-000000000001', 'They are the same thing', false),
('d2000001-0000-0000-0000-000000000001', 'A test scenario describes what to test; a test case describes exactly how to test it', true),
('d2000001-0000-0000-0000-000000000001', 'A test case is higher level than a test scenario', false),
('d2000001-0000-0000-0000-000000000001', 'Test scenarios are only used in automation', false);

-- Q2
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d2000002-0000-0000-0000-000000000001', 'c1000002-0000-0000-0000-000000000001', 'What does equivalence partitioning do?', 'multiple_choice', 2);
insert into public.quiz_answers (question_id, answer_text, is_correct) values
('d2000002-0000-0000-0000-000000000001', 'Divides input data into groups where all values in a group are expected to behave the same', true),
('d2000002-0000-0000-0000-000000000001', 'Tests every possible input value', false),
('d2000002-0000-0000-0000-000000000001', 'Only tests the boundaries of input ranges', false),
('d2000002-0000-0000-0000-000000000001', 'Creates a decision table', false);

-- Q3
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d2000003-0000-0000-0000-000000000001', 'c1000002-0000-0000-0000-000000000001', 'For an age field that accepts 18â€“65, which values would you test using Boundary Value Analysis?', 'multiple_choice', 3);
insert into public.quiz_answers (question_id, answer_text, is_correct) values
('d2000003-0000-0000-0000-000000000001', '18, 19, 64, 65 and values just outside: 17 and 66', true),
('d2000003-0000-0000-0000-000000000001', 'Only 18 and 65', false),
('d2000003-0000-0000-0000-000000000001', 'Any random values between 18 and 65', false),
('d2000003-0000-0000-0000-000000000001', 'Only invalid values like 0 and 100', false);

-- Q4
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d2000004-0000-0000-0000-000000000001', 'c1000002-0000-0000-0000-000000000001', 'What is exploratory testing?', 'multiple_choice', 4);
insert into public.quiz_answers (question_id, answer_text, is_correct) values
('d2000004-0000-0000-0000-000000000001', 'Testing without any documentation or plan', false),
('d2000004-0000-0000-0000-000000000001', 'Simultaneous learning, test design, and execution â€” structured but not scripted', true),
('d2000004-0000-0000-0000-000000000001', 'Automated regression testing', false),
('d2000004-0000-0000-0000-000000000001', 'Testing only the happy path', false);

-- Q5
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d2000005-0000-0000-0000-000000000001', 'c1000002-0000-0000-0000-000000000001', 'What is a decision table used for?', 'multiple_choice', 5);
insert into public.quiz_answers (question_id, answer_text, is_correct) values
('d2000005-0000-0000-0000-000000000001', 'Storing test results', false),
('d2000005-0000-0000-0000-000000000001', 'Mapping combinations of inputs and conditions to expected outcomes', true),
('d2000005-0000-0000-0000-000000000001', 'Tracking defects', false),
('d2000005-0000-0000-0000-000000000001', 'Planning sprint work', false);

-- Q6
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d2000006-0000-0000-0000-000000000001', 'c1000002-0000-0000-0000-000000000001', 'True or False: A test case must always include expected results.', 'true_false', 6);
insert into public.quiz_answers (question_id, answer_text, is_correct) values
('d2000006-0000-0000-0000-000000000001', 'True', true),
('d2000006-0000-0000-0000-000000000001', 'False', false);

-- Q7
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d2000007-0000-0000-0000-000000000001', 'c1000002-0000-0000-0000-000000000001', 'What is negative testing?', 'multiple_choice', 7);
insert into public.quiz_answers (question_id, answer_text, is_correct) values
('d2000007-0000-0000-0000-000000000001', 'Testing that the system fails on purpose', false),
('d2000007-0000-0000-0000-000000000001', 'Testing with invalid or unexpected inputs to verify the system handles them correctly', true),
('d2000007-0000-0000-0000-000000000001', 'Writing test cases that always fail', false),
('d2000007-0000-0000-0000-000000000001', 'Testing after release only', false);

-- Q8
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d2000008-0000-0000-0000-000000000001', 'c1000002-0000-0000-0000-000000000001', 'Which test design technique is most useful when you want to test all combinations of conditions?', 'multiple_choice', 8);
insert into public.quiz_answers (question_id, answer_text, is_correct) values
('d2000008-0000-0000-0000-000000000001', 'Boundary value analysis', false),
('d2000008-0000-0000-0000-000000000001', 'Decision tables', true),
('d2000008-0000-0000-0000-000000000001', 'Exploratory testing', false),
('d2000008-0000-0000-0000-000000000001', 'Regression testing', false);

-- Q9
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d2000009-0000-0000-0000-000000000001', 'c1000002-0000-0000-0000-000000000001', 'What should a test case step include?', 'multiple_choice', 9);
insert into public.quiz_answers (question_id, answer_text, is_correct) values
('d2000009-0000-0000-0000-000000000001', 'Only the action to perform', false),
('d2000009-0000-0000-0000-000000000001', 'The action to perform and the expected result', true),
('d2000009-0000-0000-0000-000000000001', 'Only the expected result', false),
('d2000009-0000-0000-0000-000000000001', 'The defect ID', false);

-- Q10
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d2000010-0000-0000-0000-000000000001', 'c1000002-0000-0000-0000-000000000001', 'True or False: Equivalence partitioning reduces the total number of test cases needed.', 'true_false', 10);
insert into public.quiz_answers (question_id, answer_text, is_correct) values
('d2000010-0000-0000-0000-000000000001', 'True', true),
('d2000010-0000-0000-0000-000000000001', 'False', false);

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
-- MODULE 3 â€” Defect Management
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
update public.modules set status = 'published', description = 'Learn how to identify, document, prioritise and communicate defects professionally. Understand the defect lifecycle and how to write bug reports that developers actually want to read.', learning_objectives = ARRAY['Understand what a defect is and how it differs from an enhancement','Distinguish between defect severity and priority','Write clear, reproducible bug reports with strong evidence','Understand the defect lifecycle from discovery to closure','Add useful screenshots and logs as evidence','Communicate defects effectively to developers and stakeholders'], estimated_duration = '3 hours' where id = 'b1000003-0000-0000-0000-000000000001';

insert into public.assignments (id, module_id, title, instructions, required) values ('e1000003-0000-0000-0000-000000000001', 'b1000003-0000-0000-0000-000000000001', 'Module 3 Assignment â€“ Defect Management', 'Find and document 10 potential defects from any website or application using the Defect Report Template. For each defect include: title, steps to reproduce, expected result, actual result, severity, priority, and at least one screenshot or evidence attachment. Submit as a PDF or DOCX.', true);

insert into public.quizzes (id, module_id, title, pass_mark) values ('c1000003-0000-0000-0000-000000000001', 'b1000003-0000-0000-0000-000000000001', 'Module 3 Quiz â€“ Defect Management', 70);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d3000001-0000-0000-0000-000000000001', 'c1000003-0000-0000-0000-000000000001', 'What is defect severity?', 'multiple_choice', 1);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d3000001-0000-0000-0000-000000000001', 'How urgent the fix is to the business', false), ('d3000001-0000-0000-0000-000000000001', 'The impact of the defect on the functionality of the system', true), ('d3000001-0000-0000-0000-000000000001', 'How long the defect has been open', false), ('d3000001-0000-0000-0000-000000000001', 'The number of users affected', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d3000002-0000-0000-0000-000000000001', 'c1000003-0000-0000-0000-000000000001', 'What is defect priority?', 'multiple_choice', 2);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d3000002-0000-0000-0000-000000000001', 'The impact on system functionality', false), ('d3000002-0000-0000-0000-000000000001', 'How quickly the defect needs to be fixed from a business perspective', true), ('d3000002-0000-0000-0000-000000000001', 'The number of steps to reproduce the bug', false), ('d3000002-0000-0000-0000-000000000001', 'The severity level assigned by the developer', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d3000003-0000-0000-0000-000000000001', 'c1000003-0000-0000-0000-000000000001', 'A bug on the homepage shows a spelling mistake in the footer. The site still works perfectly. Which classification is most likely correct?', 'multiple_choice', 3);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d3000003-0000-0000-0000-000000000001', 'High severity, high priority', false), ('d3000003-0000-0000-0000-000000000001', 'Low severity, high priority', false), ('d3000003-0000-0000-0000-000000000001', 'Low severity, low priority', true), ('d3000003-0000-0000-0000-000000000001', 'High severity, low priority', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d3000004-0000-0000-0000-000000000001', 'c1000003-0000-0000-0000-000000000001', 'What is the first status in the defect lifecycle?', 'multiple_choice', 4);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d3000004-0000-0000-0000-000000000001', 'In Progress', false), ('d3000004-0000-0000-0000-000000000001', 'New / Open', true), ('d3000004-0000-0000-0000-000000000001', 'Resolved', false), ('d3000004-0000-0000-0000-000000000001', 'Rejected', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d3000005-0000-0000-0000-000000000001', 'c1000003-0000-0000-0000-000000000001', 'Why are steps to reproduce important in a bug report?', 'multiple_choice', 5);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d3000005-0000-0000-0000-000000000001', 'They tell the developer which code file to fix', false), ('d3000005-0000-0000-0000-000000000001', 'They allow the developer to reliably recreate and investigate the defect', true), ('d3000005-0000-0000-0000-000000000001', 'They are only needed for critical defects', false), ('d3000005-0000-0000-0000-000000000001', 'They replace the need for screenshots', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d3000006-0000-0000-0000-000000000001', 'c1000003-0000-0000-0000-000000000001', 'True or False: A defect should include both expected and actual results.', 'true_false', 6);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d3000006-0000-0000-0000-000000000001', 'True', true), ('d3000006-0000-0000-0000-000000000001', 'False', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d3000007-0000-0000-0000-000000000001', 'c1000003-0000-0000-0000-000000000001', 'What does "retesting" mean?', 'multiple_choice', 7);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d3000007-0000-0000-0000-000000000001', 'Running all tests again from scratch', false), ('d3000007-0000-0000-0000-000000000001', 'Verifying that a specific defect has been fixed', true), ('d3000007-0000-0000-0000-000000000001', 'Testing a new feature', false), ('d3000007-0000-0000-0000-000000000001', 'Running regression tests', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d3000008-0000-0000-0000-000000000001', 'c1000003-0000-0000-0000-000000000001', 'Which of the following is NOT useful evidence to attach to a bug report?', 'multiple_choice', 8);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d3000008-0000-0000-0000-000000000001', 'Screenshot of the error', false), ('d3000008-0000-0000-0000-000000000001', 'Console logs', false), ('d3000008-0000-0000-0000-000000000001', 'Your personal opinion of the developer', true), ('d3000008-0000-0000-0000-000000000001', 'Network request/response', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d3000009-0000-0000-0000-000000000001', 'c1000003-0000-0000-0000-000000000001', 'When would a defect be marked as "Won''t Fix"?', 'multiple_choice', 9);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d3000009-0000-0000-0000-000000000001', 'When the tester cannot reproduce it', false), ('d3000009-0000-0000-0000-000000000001', 'When the business decides the cost of fixing outweighs the impact', true), ('d3000009-0000-0000-0000-000000000001', 'When the defect is very severe', false), ('d3000009-0000-0000-0000-000000000001', 'When it is a duplicate', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d3000010-0000-0000-0000-000000000001', 'c1000003-0000-0000-0000-000000000001', 'True or False: High severity always means high priority.', 'true_false', 10);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d3000010-0000-0000-0000-000000000001', 'True', false), ('d3000010-0000-0000-0000-000000000001', 'False', true);

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
-- MODULE 4 â€” Agile & Scrum for Testers
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
update public.modules set status = 'published', description = 'Understand how QA fits into Agile teams, Scrum ceremonies and sprint-based delivery. Learn how testers contribute at every stage of the sprint.', learning_objectives = ARRAY['Understand the Agile manifesto and its four values','Know the three Scrum roles: Product Owner, Scrum Master, Development Team','Understand sprint ceremonies: planning, daily standup, review, retrospective','Review user stories and identify acceptance criteria','Understand the tester''s responsibilities in an Agile sprint','Apply continuous testing throughout the sprint'], estimated_duration = '3 hours' where id = 'b1000004-0000-0000-0000-000000000001';

insert into public.assignments (id, module_id, title, instructions, required) values ('e1000004-0000-0000-0000-000000000001', 'b1000004-0000-0000-0000-000000000001', 'Module 4 Assignment â€“ Agile & Scrum for Testers', 'Review 5 user stories (provided in the workbook or self-selected) and for each one: identify missing or unclear acceptance criteria, suggest additional criteria that should be included, and note what testing you would perform in the sprint. Submit using the provided template.', true);

insert into public.quizzes (id, module_id, title, pass_mark) values ('c1000004-0000-0000-0000-000000000001', 'b1000004-0000-0000-0000-000000000001', 'Module 4 Quiz â€“ Agile & Scrum for Testers', 70);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d4000001-0000-0000-0000-000000000001', 'c1000004-0000-0000-0000-000000000001', 'How long is a typical Scrum sprint?', 'multiple_choice', 1);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d4000001-0000-0000-0000-000000000001', '1 day', false), ('d4000001-0000-0000-0000-000000000001', '1â€“4 weeks, commonly 2 weeks', true), ('d4000001-0000-0000-0000-000000000001', '3 months', false), ('d4000001-0000-0000-0000-000000000001', '6 months', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d4000002-0000-0000-0000-000000000001', 'c1000004-0000-0000-0000-000000000001', 'What is the purpose of a sprint retrospective?', 'multiple_choice', 2);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d4000002-0000-0000-0000-000000000001', 'To demo the product to stakeholders', false), ('d4000002-0000-0000-0000-000000000001', 'To review and improve the team''s working practices', true), ('d4000002-0000-0000-0000-000000000001', 'To plan the next sprint', false), ('d4000002-0000-0000-0000-000000000001', 'To assign tasks to developers', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d4000003-0000-0000-0000-000000000001', 'c1000004-0000-0000-0000-000000000001', 'Who owns the product backlog in Scrum?', 'multiple_choice', 3);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d4000003-0000-0000-0000-000000000001', 'The Scrum Master', false), ('d4000003-0000-0000-0000-000000000001', 'The Product Owner', true), ('d4000003-0000-0000-0000-000000000001', 'The Lead Developer', false), ('d4000003-0000-0000-0000-000000000001', 'The QA Lead', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d4000004-0000-0000-0000-000000000001', 'c1000004-0000-0000-0000-000000000001', 'True or False: In Agile, testing only happens at the end of the sprint.', 'true_false', 4);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d4000004-0000-0000-0000-000000000001', 'True', false), ('d4000004-0000-0000-0000-000000000001', 'False', true);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d4000005-0000-0000-0000-000000000001', 'c1000004-0000-0000-0000-000000000001', 'What is a user story?', 'multiple_choice', 5);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d4000005-0000-0000-0000-000000000001', 'A technical specification written by developers', false), ('d4000005-0000-0000-0000-000000000001', 'A short description of a feature from the perspective of the end user', true), ('d4000005-0000-0000-0000-000000000001', 'A bug report', false), ('d4000005-0000-0000-0000-000000000001', 'A sprint plan', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d4000006-0000-0000-0000-000000000001', 'c1000004-0000-0000-0000-000000000001', 'What does "Definition of Done" mean in Scrum?', 'multiple_choice', 6);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d4000006-0000-0000-0000-000000000001', 'When the developer says they are finished', false), ('d4000006-0000-0000-0000-000000000001', 'A shared agreement on what criteria must be met for work to be considered complete', true), ('d4000006-0000-0000-0000-000000000001', 'When the sprint ends', false), ('d4000006-0000-0000-0000-000000000001', 'When the product owner approves the feature', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d4000007-0000-0000-0000-000000000001', 'c1000004-0000-0000-0000-000000000001', 'What happens in sprint planning?', 'multiple_choice', 7);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d4000007-0000-0000-0000-000000000001', 'The team reviews what they completed last sprint', false), ('d4000007-0000-0000-0000-000000000001', 'The team selects backlog items to work on and plans how to deliver them', true), ('d4000007-0000-0000-0000-000000000001', 'The team demos the product to stakeholders', false), ('d4000007-0000-0000-0000-000000000001', 'The team retrospects on the previous sprint', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d4000008-0000-0000-0000-000000000001', 'c1000004-0000-0000-0000-000000000001', 'What is the Scrum Master''s role?', 'multiple_choice', 8);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d4000008-0000-0000-0000-000000000001', 'To manage the team and assign tasks', false), ('d4000008-0000-0000-0000-000000000001', 'To facilitate the Scrum process and remove impediments for the team', true), ('d4000008-0000-0000-0000-000000000001', 'To own the product backlog', false), ('d4000008-0000-0000-0000-000000000001', 'To write user stories', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d4000009-0000-0000-0000-000000000001', 'c1000004-0000-0000-0000-000000000001', 'True or False: Acceptance criteria define the conditions a user story must meet to be accepted by the product owner.', 'true_false', 9);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d4000009-0000-0000-0000-000000000001', 'True', true), ('d4000009-0000-0000-0000-000000000001', 'False', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d4000010-0000-0000-0000-000000000001', 'c1000004-0000-0000-0000-000000000001', 'During refinement, what should testers focus on?', 'multiple_choice', 10);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d4000010-0000-0000-0000-000000000001', 'Writing code for automated tests', false), ('d4000010-0000-0000-0000-000000000001', 'Identifying unclear requirements, edge cases, and defining acceptance criteria', true), ('d4000010-0000-0000-0000-000000000001', 'Assigning story points', false), ('d4000010-0000-0000-0000-000000000001', 'Running regression tests', false);

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
-- MODULE 5 â€” Jira & Test Management
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
update public.modules set status = 'published', description = 'Learn how Jira is used by delivery teams to manage work, track defects and support testing activities. Understand test management concepts and tools.', learning_objectives = ARRAY['Navigate a Jira project board confidently','Create and manage epics, stories, tasks and bugs in Jira','Understand Jira workflows and ticket statuses','Log defects with all required information','Track testing progress in a sprint','Understand test management tools like Zephyr and Xray'], estimated_duration = '3â€“4 hours' where id = 'b1000005-0000-0000-0000-000000000001';

insert into public.assignments (id, module_id, title, instructions, required) values ('e1000005-0000-0000-0000-000000000001', 'b1000005-0000-0000-0000-000000000001', 'Module 5 Assignment â€“ Jira & Test Management', 'Create a mock sprint board (using the free Jira trial or screenshots from the provided template) and document: 3 user stories with acceptance criteria, 5 tasks linked to those stories, 5 defects with full details, and a simple testing status update showing which stories are tested and which are not. Submit as PDF or screenshots.', true);

insert into public.quizzes (id, module_id, title, pass_mark) values ('c1000005-0000-0000-0000-000000000001', 'b1000005-0000-0000-0000-000000000001', 'Module 5 Quiz â€“ Jira & Test Management', 70);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d5000001-0000-0000-0000-000000000001', 'c1000005-0000-0000-0000-000000000001', 'What is a Jira Epic?', 'multiple_choice', 1);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d5000001-0000-0000-0000-000000000001', 'A large body of work that can be broken down into smaller stories', true), ('d5000001-0000-0000-0000-000000000001', 'A type of bug report', false), ('d5000001-0000-0000-0000-000000000001', 'A sprint goal', false), ('d5000001-0000-0000-0000-000000000001', 'A type of test case', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d5000002-0000-0000-0000-000000000001', 'c1000005-0000-0000-0000-000000000001', 'In Jira, what does the "To Do â†’ In Progress â†’ Done" flow represent?', 'multiple_choice', 2);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d5000002-0000-0000-0000-000000000001', 'The defect lifecycle', false), ('d5000002-0000-0000-0000-000000000001', 'The workflow a ticket moves through', true), ('d5000002-0000-0000-0000-000000000001', 'The sprint timeline', false), ('d5000002-0000-0000-0000-000000000001', 'The test execution process', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d5000003-0000-0000-0000-000000000001', 'c1000005-0000-0000-0000-000000000001', 'True or False: A Bug in Jira is a type of issue.', 'true_false', 3);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d5000003-0000-0000-0000-000000000001', 'True', true), ('d5000003-0000-0000-0000-000000000001', 'False', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d5000004-0000-0000-0000-000000000001', 'c1000005-0000-0000-0000-000000000001', 'What is a Kanban board used for?', 'multiple_choice', 4);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d5000004-0000-0000-0000-000000000001', 'Tracking defects only', false), ('d5000004-0000-0000-0000-000000000001', 'Visualising the flow of work with no fixed sprints', true), ('d5000004-0000-0000-0000-000000000001', 'Planning a release', false), ('d5000004-0000-0000-0000-000000000001', 'Creating test plans', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d5000005-0000-0000-0000-000000000001', 'c1000005-0000-0000-0000-000000000001', 'What information should always be included when logging a defect in Jira?', 'multiple_choice', 5);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d5000005-0000-0000-0000-000000000001', 'Only the defect title', false), ('d5000005-0000-0000-0000-000000000001', 'Title, steps to reproduce, expected result, actual result, severity, and environment', true), ('d5000005-0000-0000-0000-000000000001', 'The developer''s name', false), ('d5000005-0000-0000-0000-000000000001', 'Only a screenshot', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d5000006-0000-0000-0000-000000000001', 'c1000005-0000-0000-0000-000000000001', 'What is Zephyr or Xray in relation to Jira?', 'multiple_choice', 6);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d5000006-0000-0000-0000-000000000001', 'Alternative project management tools', false), ('d5000006-0000-0000-0000-000000000001', 'Test management plugins for Jira', true), ('d5000006-0000-0000-0000-000000000001', 'Automation frameworks', false), ('d5000006-0000-0000-0000-000000000001', 'Jira pricing plans', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d5000007-0000-0000-0000-000000000001', 'c1000005-0000-0000-0000-000000000001', 'What does "story points" measure?', 'multiple_choice', 7);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d5000007-0000-0000-0000-000000000001', 'The number of hours to complete a task', false), ('d5000007-0000-0000-0000-000000000001', 'The relative effort and complexity of a user story', true), ('d5000007-0000-0000-0000-000000000001', 'The priority of the ticket', false), ('d5000007-0000-0000-0000-000000000001', 'The number of test cases needed', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d5000008-0000-0000-0000-000000000001', 'c1000005-0000-0000-0000-000000000001', 'True or False: Testers can link a defect to the user story it relates to in Jira.', 'true_false', 8);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d5000008-0000-0000-0000-000000000001', 'True', true), ('d5000008-0000-0000-0000-000000000001', 'False', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d5000009-0000-0000-0000-000000000001', 'c1000005-0000-0000-0000-000000000001', 'What is a sprint backlog?', 'multiple_choice', 9);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d5000009-0000-0000-0000-000000000001', 'All items that have ever been in the project', false), ('d5000009-0000-0000-0000-000000000001', 'The set of items selected from the product backlog to be completed in a sprint', true), ('d5000009-0000-0000-0000-000000000001', 'A list of all bugs found', false), ('d5000009-0000-0000-0000-000000000001', 'The product owner''s wish list', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d5000010-0000-0000-0000-000000000001', 'c1000005-0000-0000-0000-000000000001', 'Why should testers update ticket statuses in Jira throughout testing?', 'multiple_choice', 10);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d5000010-0000-0000-0000-000000000001', 'It is not necessary â€” only developers update statuses', false), ('d5000010-0000-0000-0000-000000000001', 'To give the team visibility of testing progress and block items', true), ('d5000010-0000-0000-0000-000000000001', 'To impress the project manager', false), ('d5000010-0000-0000-0000-000000000001', 'To automatically run tests', false);

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
-- MODULES 6â€“12 â€” Assignments, Quizzes, Updates (condensed)
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

-- MODULE 6 â€” API Testing with Postman
update public.modules set status = 'published', description = 'Learn the foundations of API testing using Postman. Understand REST APIs, HTTP methods, status codes and how to create and run API test collections.', learning_objectives = ARRAY['Understand what an API is and why they are tested','Know the key REST concepts: resources, methods, status codes','Use Postman to send GET, POST, PUT and DELETE requests','Validate API responses: status codes, headers, body','Write test assertions in Postman','Organise tests into collections and run them'], estimated_duration = '4â€“5 hours' where id = 'b1000006-0000-0000-0000-000000000001';

insert into public.assignments (id, module_id, title, instructions, required) values ('e1000006-0000-0000-0000-000000000001', 'b1000006-0000-0000-0000-000000000001', 'Module 6 Assignment â€“ API Testing with Postman', 'Using a public REST API (e.g. reqres.in, jsonplaceholder.typicode.com, or petstore.swagger.io), create: 10 API test cases covering GET, POST, PUT and DELETE requests, a Postman collection with all requests saved, evidence of at least 3 successful responses and 2 error/invalid responses. Submit your Postman collection export (JSON) and test case documentation as PDF or DOCX.', true);

insert into public.quizzes (id, module_id, title, pass_mark) values ('c1000006-0000-0000-0000-000000000001', 'b1000006-0000-0000-0000-000000000001', 'Module 6 Quiz â€“ API Testing with Postman', 70);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d6000001-0000-0000-0000-000000000001', 'c1000006-0000-0000-0000-000000000001', 'What does API stand for?', 'multiple_choice', 1);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d6000001-0000-0000-0000-000000000001', 'Automated Programming Interface', false), ('d6000001-0000-0000-0000-000000000001', 'Application Programming Interface', true), ('d6000001-0000-0000-0000-000000000001', 'Application Process Integration', false), ('d6000001-0000-0000-0000-000000000001', 'Automated Process Integration', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d6000002-0000-0000-0000-000000000001', 'c1000006-0000-0000-0000-000000000001', 'Which HTTP method is used to retrieve data from an API?', 'multiple_choice', 2);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d6000002-0000-0000-0000-000000000001', 'POST', false), ('d6000002-0000-0000-0000-000000000001', 'GET', true), ('d6000002-0000-0000-0000-000000000001', 'DELETE', false), ('d6000002-0000-0000-0000-000000000001', 'PUT', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d6000003-0000-0000-0000-000000000001', 'c1000006-0000-0000-0000-000000000001', 'What does HTTP status code 404 mean?', 'multiple_choice', 3);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d6000003-0000-0000-0000-000000000001', 'Server error', false), ('d6000003-0000-0000-0000-000000000001', 'Not found â€” the requested resource does not exist', true), ('d6000003-0000-0000-0000-000000000001', 'Unauthorised', false), ('d6000003-0000-0000-0000-000000000001', 'Request successful', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d6000004-0000-0000-0000-000000000001', 'c1000006-0000-0000-0000-000000000001', 'What does HTTP status code 201 mean?', 'multiple_choice', 4);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d6000004-0000-0000-0000-000000000001', 'Resource updated', false), ('d6000004-0000-0000-0000-000000000001', 'Resource successfully created', true), ('d6000004-0000-0000-0000-000000000001', 'Forbidden', false), ('d6000004-0000-0000-0000-000000000001', 'Resource deleted', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d6000005-0000-0000-0000-000000000001', 'c1000006-0000-0000-0000-000000000001', 'True or False: In Postman you can write test assertions to automatically validate API responses.', 'true_false', 5);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d6000005-0000-0000-0000-000000000001', 'True', true), ('d6000005-0000-0000-0000-000000000001', 'False', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d6000006-0000-0000-0000-000000000001', 'c1000006-0000-0000-0000-000000000001', 'Which HTTP method is used to update an existing resource?', 'multiple_choice', 6);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d6000006-0000-0000-0000-000000000001', 'GET', false), ('d6000006-0000-0000-0000-000000000001', 'PUT or PATCH', true), ('d6000006-0000-0000-0000-000000000001', 'POST', false), ('d6000006-0000-0000-0000-000000000001', 'DELETE', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d6000007-0000-0000-0000-000000000001', 'c1000006-0000-0000-0000-000000000001', 'What is a Postman collection?', 'multiple_choice', 7);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d6000007-0000-0000-0000-000000000001', 'A folder of saved API requests that can be run together', true), ('d6000007-0000-0000-0000-000000000001', 'A type of API authentication', false), ('d6000007-0000-0000-0000-000000000001', 'A list of HTTP status codes', false), ('d6000007-0000-0000-0000-000000000001', 'An API documentation format', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d6000008-0000-0000-0000-000000000001', 'c1000006-0000-0000-0000-000000000001', 'What does a 500 status code indicate?', 'multiple_choice', 8);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d6000008-0000-0000-0000-000000000001', 'The request was successful', false), ('d6000008-0000-0000-0000-000000000001', 'An internal server error', true), ('d6000008-0000-0000-0000-000000000001', 'The resource was not found', false), ('d6000008-0000-0000-0000-000000000001', 'The request was unauthorised', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d6000009-0000-0000-0000-000000000001', 'c1000006-0000-0000-0000-000000000001', 'What is the most common data format used in REST API responses?', 'multiple_choice', 9);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d6000009-0000-0000-0000-000000000001', 'XML', false), ('d6000009-0000-0000-0000-000000000001', 'JSON', true), ('d6000009-0000-0000-0000-000000000001', 'CSV', false), ('d6000009-0000-0000-0000-000000000001', 'HTML', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d6000010-0000-0000-0000-000000000001', 'c1000006-0000-0000-0000-000000000001', 'True or False: An API can return different status codes depending on whether the request was valid or not.', 'true_false', 10);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d6000010-0000-0000-0000-000000000001', 'True', true), ('d6000010-0000-0000-0000-000000000001', 'False', false);

-- MODULE 7 â€” SQL for Testers
update public.modules set status = 'published', description = 'Learn the SQL fundamentals that testers need to validate data, investigate defects, and understand the backend of applications under test.', learning_objectives = ARRAY['Understand what a relational database is','Write SELECT queries to retrieve data','Filter results using WHERE conditions','Sort and group data with ORDER BY and GROUP BY','Use COUNT, SUM, and other aggregate functions','Join tables to verify data relationships','Use SQL to validate test results against the database'], estimated_duration = '4 hours' where id = 'b1000007-0000-0000-0000-000000000001';

insert into public.assignments (id, module_id, title, instructions, required) values ('e1000007-0000-0000-0000-000000000001', 'b1000007-0000-0000-0000-000000000001', 'Module 7 Assignment â€“ SQL for Testers', 'Complete the SQL practice pack (provided in the workbook): write 20 SQL queries covering SELECT, WHERE, ORDER BY, GROUP BY, and JOIN, provide 5 data validation examples showing how you would use SQL to verify test data, and write 3 short explanations of how SQL has helped or would help you as a tester. Submit as a PDF or DOCX.', true);

insert into public.quizzes (id, module_id, title, pass_mark) values ('c1000007-0000-0000-0000-000000000001', 'b1000007-0000-0000-0000-000000000001', 'Module 7 Quiz â€“ SQL for Testers', 70);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d7000001-0000-0000-0000-000000000001', 'c1000007-0000-0000-0000-000000000001', 'What does SELECT * FROM users do?', 'multiple_choice', 1);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d7000001-0000-0000-0000-000000000001', 'Deletes all users', false), ('d7000001-0000-0000-0000-000000000001', 'Returns all columns and rows from the users table', true), ('d7000001-0000-0000-0000-000000000001', 'Creates a users table', false), ('d7000001-0000-0000-0000-000000000001', 'Updates all users', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d7000002-0000-0000-0000-000000000001', 'c1000007-0000-0000-0000-000000000001', 'Which SQL clause filters rows based on a condition?', 'multiple_choice', 2);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d7000002-0000-0000-0000-000000000001', 'ORDER BY', false), ('d7000002-0000-0000-0000-000000000001', 'WHERE', true), ('d7000002-0000-0000-0000-000000000001', 'GROUP BY', false), ('d7000002-0000-0000-0000-000000000001', 'HAVING', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d7000003-0000-0000-0000-000000000001', 'c1000007-0000-0000-0000-000000000001', 'What does COUNT(*) return?', 'multiple_choice', 3);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d7000003-0000-0000-0000-000000000001', 'The sum of all values in a column', false), ('d7000003-0000-0000-0000-000000000001', 'The number of rows in the result set', true), ('d7000003-0000-0000-0000-000000000001', 'The first row of the table', false), ('d7000003-0000-0000-0000-000000000001', 'The column names', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d7000004-0000-0000-0000-000000000001', 'c1000007-0000-0000-0000-000000000001', 'True or False: An INNER JOIN returns only rows where there is a match in both tables.', 'true_false', 4);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d7000004-0000-0000-0000-000000000001', 'True', true), ('d7000004-0000-0000-0000-000000000001', 'False', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d7000005-0000-0000-0000-000000000001', 'c1000007-0000-0000-0000-000000000001', 'Which clause would you use to sort results alphabetically by last_name?', 'multiple_choice', 5);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d7000005-0000-0000-0000-000000000001', 'WHERE last_name', false), ('d7000005-0000-0000-0000-000000000001', 'ORDER BY last_name ASC', true), ('d7000005-0000-0000-0000-000000000001', 'GROUP BY last_name', false), ('d7000005-0000-0000-0000-000000000001', 'SORT BY last_name', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d7000006-0000-0000-0000-000000000001', 'c1000007-0000-0000-0000-000000000001', 'How would a tester use SQL to validate an order was saved correctly?', 'multiple_choice', 6);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d7000006-0000-0000-0000-000000000001', 'Run the application again', false), ('d7000006-0000-0000-0000-000000000001', 'Query the orders table to confirm the record exists with correct values', true), ('d7000006-0000-0000-0000-000000000001', 'Ask the developer', false), ('d7000006-0000-0000-0000-000000000001', 'Check the UI only', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d7000007-0000-0000-0000-000000000001', 'c1000007-0000-0000-0000-000000000001', 'What is a primary key?', 'multiple_choice', 7);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d7000007-0000-0000-0000-000000000001', 'The most important column in the table', false), ('d7000007-0000-0000-0000-000000000001', 'A unique identifier for each row in a table', true), ('d7000007-0000-0000-0000-000000000001', 'The first column in a table', false), ('d7000007-0000-0000-0000-000000000001', 'A password for the database', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d7000008-0000-0000-0000-000000000001', 'c1000007-0000-0000-0000-000000000001', 'True or False: Testers need to be expert SQL developers to use SQL effectively.', 'true_false', 8);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d7000008-0000-0000-0000-000000000001', 'True', false), ('d7000008-0000-0000-0000-000000000001', 'False', true);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d7000009-0000-0000-0000-000000000001', 'c1000007-0000-0000-0000-000000000001', 'What does GROUP BY do?', 'multiple_choice', 9);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d7000009-0000-0000-0000-000000000001', 'Sorts results', false), ('d7000009-0000-0000-0000-000000000001', 'Groups rows with the same value in a column for aggregation', true), ('d7000009-0000-0000-0000-000000000001', 'Filters rows', false), ('d7000009-0000-0000-0000-000000000001', 'Joins two tables', false);

insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d7000010-0000-0000-0000-000000000001', 'c1000007-0000-0000-0000-000000000001', 'Which SQL statement modifies existing data in a table?', 'multiple_choice', 10);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d7000010-0000-0000-0000-000000000001', 'SELECT', false), ('d7000010-0000-0000-0000-000000000001', 'UPDATE', true), ('d7000010-0000-0000-0000-000000000001', 'INSERT', false), ('d7000010-0000-0000-0000-000000000001', 'DROP', false);

-- MODULES 8â€“12: Update descriptions + add assignments + quizzes (condensed)
update public.modules set status = 'published', description = 'Understand test automation, where it adds value and how automation fits into a QA career. Learn about frameworks, tools and the tester''s role in an automation-first world.', learning_objectives = ARRAY['Understand the difference between manual and automated testing','Know when automation adds value and when it does not','Understand the test automation pyramid','Identify common automation frameworks: Selenium, Playwright, Cypress','Understand selectors and how automation finds elements','Understand AI-assisted automation tools'], estimated_duration = '5 hours' where id = 'b1000008-0000-0000-0000-000000000001';

update public.modules set status = 'published', description = 'Learn how to use AI tools like ChatGPT and Claude to support your testing work. Understand how to generate test cases, explore applications and validate AI output critically.', learning_objectives = ARRAY['Understand current AI applications in software testing','Use ChatGPT and Claude for testing tasks','Write effective prompts for test case generation','Generate exploratory testing ideas with AI','Use AI to support API testing and automation','Validate AI-generated output and understand its limitations'], estimated_duration = '3â€“4 hours' where id = 'b1000009-0000-0000-0000-000000000001';

update public.modules set status = 'published', description = 'Build a professional QA portfolio that demonstrates your practical testing skills to employers. Learn how to showcase test cases, bug reports, API work and more.', learning_objectives = ARRAY['Understand why a portfolio is essential for QA job seekers','Create portfolio-ready test cases, bug reports and test plans','Include API testing and SQL evidence','Organise evidence on GitHub or Google Drive','Present your work professionally with clear structure','Tailor your portfolio for specific QA roles'], estimated_duration = '4 hours' where id = 'b1000010-0000-0000-0000-000000000001';

update public.modules set status = 'published', description = 'Create a QA-focused CV and LinkedIn profile designed to get you noticed by recruiters and hiring managers for entry-level and career-change testing roles.', learning_objectives = ARRAY['Structure a professional QA-focused CV','Write a compelling personal profile and career summary','Highlight transferable skills and portfolio evidence','Optimise your LinkedIn profile for QA job searches','Understand how recruiters search for and assess candidates','Tailor your CV for specific job descriptions'], estimated_duration = '3 hours' where id = 'b1000011-0000-0000-0000-000000000001';

update public.modules set status = 'published', description = 'Prepare for QA interviews and build a structured job search strategy. Learn how to answer technical and scenario questions confidently and negotiate your first QA offer.', learning_objectives = ARRAY['Understand the typical stages of a QA interview process','Answer common QA interview questions using the STAR method','Explain your projects and portfolio confidently','Handle technical and scenario-based questions','Build a structured 30-day job search plan','Prepare for your first 90 days in a QA role'], estimated_duration = '4 hours' where id = 'b1000012-0000-0000-0000-000000000001';

-- Assignments for modules 8-12
insert into public.assignments (id, module_id, title, instructions, required) values
('e1000008-0000-0000-0000-000000000001', 'b1000008-0000-0000-0000-000000000001', 'Module 8 Assignment â€“ Automation Fundamentals', 'Review your test cases from previous modules and identify 10 tests. For each one, decide whether it should be automated or kept as manual testing, and write a clear explanation of your reasoning. Consider factors like: frequency of execution, stability, business value, maintenance cost. Submit as a PDF or DOCX using the provided template.', true),
('e1000009-0000-0000-0000-000000000001', 'b1000009-0000-0000-0000-000000000001', 'Module 9 Assignment â€“ AI for Software Testing', 'Create an AI-supported testing workflow: write 20 prompts you used with ChatGPT or Claude for testing tasks, produce 10 AI-generated test cases, and write a validation review explaining which outputs were accurate, which needed improvement, and why. Submit as a PDF or DOCX.', true),
('e1000010-0000-0000-0000-000000000001', 'b1000010-0000-0000-0000-000000000001', 'Module 10 Assignment â€“ Portfolio Building', 'Build your QA portfolio and submit a link or document containing: a test case pack (minimum 10 test cases), a defect report pack (minimum 5 bug reports), evidence of API testing (Postman collection or screenshots), at least one SQL example, an AI testing workflow, and a career summary/about section. Submit a PDF summary with links to your portfolio.', true),
('e1000011-0000-0000-0000-000000000001', 'b1000011-0000-0000-0000-000000000001', 'Module 11 Assignment â€“ CV & LinkedIn Mastery', 'Submit: your updated QA CV (using the provided template), your LinkedIn profile summary (copy the text into the submission document), a list of 10 target job titles you are applying for, and your portfolio link. Submit as a PDF or DOCX.', true),
('e1000012-0000-0000-0000-000000000001', 'b1000012-0000-0000-0000-000000000001', 'Module 12 Assignment â€“ Interview Mastery & Job Search', 'Submit your final career pack: 5 STAR method interview answers for common QA questions, a record of 10 job applications you have submitted (company, role, date, outcome), a mock interview reflection (what went well, what to improve), and your final QA career action plan. This is your graduation submission. Submit as a PDF or DOCX.', true);

-- Quizzes for modules 8-12 (5 questions each â€” admin can add more later)
insert into public.quizzes (id, module_id, title, pass_mark) values
('c1000008-0000-0000-0000-000000000001', 'b1000008-0000-0000-0000-000000000001', 'Module 8 Quiz â€“ Automation Fundamentals', 70),
('c1000009-0000-0000-0000-000000000001', 'b1000009-0000-0000-0000-000000000001', 'Module 9 Quiz â€“ AI for Software Testing', 70),
('c1000010-0000-0000-0000-000000000001', 'b1000010-0000-0000-0000-000000000001', 'Module 10 Quiz â€“ Portfolio Building', 70),
('c1000011-0000-0000-0000-000000000001', 'b1000011-0000-0000-0000-000000000001', 'Module 11 Quiz â€“ CV & LinkedIn Mastery', 70),
('c1000012-0000-0000-0000-000000000001', 'b1000012-0000-0000-0000-000000000001', 'Module 12 Quiz â€“ Interview Mastery & Job Search', 70);

-- Module 8 questions
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d8000001-0000-0000-0000-000000000001', 'c1000008-0000-0000-0000-000000000001', 'What is the test automation pyramid?', 'multiple_choice', 1);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d8000001-0000-0000-0000-000000000001', 'A model suggesting more unit tests, fewer UI tests, and integration tests in between', true), ('d8000001-0000-0000-0000-000000000001', 'A model where UI tests are the most important', false), ('d8000001-0000-0000-0000-000000000001', 'A model showing how many testers to hire', false), ('d8000001-0000-0000-0000-000000000001', 'A model for organising test folders', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d8000002-0000-0000-0000-000000000001', 'c1000008-0000-0000-0000-000000000001', 'Which of the following is a good candidate for test automation?', 'multiple_choice', 2);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d8000002-0000-0000-0000-000000000001', 'A test that runs once and rarely changes', false), ('d8000002-0000-0000-0000-000000000001', 'A regression test that runs every release with stable, predictable steps', true), ('d8000002-0000-0000-0000-000000000001', 'Exploratory testing', false), ('d8000002-0000-0000-0000-000000000001', 'Usability testing', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d8000003-0000-0000-0000-000000000001', 'c1000008-0000-0000-0000-000000000001', 'True or False: Automation removes the need for manual testing entirely.', 'true_false', 3);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d8000003-0000-0000-0000-000000000001', 'True', false), ('d8000003-0000-0000-0000-000000000001', 'False', true);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d8000004-0000-0000-0000-000000000001', 'c1000008-0000-0000-0000-000000000001', 'What is Playwright?', 'multiple_choice', 4);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d8000004-0000-0000-0000-000000000001', 'A defect tracking tool', false), ('d8000004-0000-0000-0000-000000000001', 'An open-source browser automation and testing framework by Microsoft', true), ('d8000004-0000-0000-0000-000000000001', 'A project management tool', false), ('d8000004-0000-0000-0000-000000000001', 'A type of API', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d8000005-0000-0000-0000-000000000001', 'c1000008-0000-0000-0000-000000000001', 'What is a locator in test automation?', 'multiple_choice', 5);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d8000005-0000-0000-0000-000000000001', 'A type of bug', false), ('d8000005-0000-0000-0000-000000000001', 'A way to identify and interact with an element on a web page', true), ('d8000005-0000-0000-0000-000000000001', 'A test report format', false), ('d8000005-0000-0000-0000-000000000001', 'A database query', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d8000006-0000-0000-0000-000000000001', 'c1000008-0000-0000-0000-000000000001', 'What is a key risk of over-automating?', 'multiple_choice', 6);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d8000006-0000-0000-0000-000000000001', 'Tests run too quickly', false), ('d8000006-0000-0000-0000-000000000001', 'High maintenance burden and false confidence in test coverage', true), ('d8000006-0000-0000-0000-000000000001', 'Tests are too accurate', false), ('d8000006-0000-0000-0000-000000000001', 'It makes manual testers redundant immediately', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d8000007-0000-0000-0000-000000000001', 'c1000008-0000-0000-0000-000000000001', 'True or False: Cypress is primarily used for testing mobile native apps.', 'true_false', 7);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d8000007-0000-0000-0000-000000000001', 'True', false), ('d8000007-0000-0000-0000-000000000001', 'False', true);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d8000008-0000-0000-0000-000000000001', 'c1000008-0000-0000-0000-000000000001', 'What does CI/CD stand for?', 'multiple_choice', 8);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d8000008-0000-0000-0000-000000000001', 'Continuous Integration / Continuous Delivery', true), ('d8000008-0000-0000-0000-000000000001', 'Code Integration / Code Deployment', false), ('d8000008-0000-0000-0000-000000000001', 'Continuous Inspection / Continuous Design', false), ('d8000008-0000-0000-0000-000000000001', 'Code Interface / Code Documentation', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d8000009-0000-0000-0000-000000000001', 'c1000008-0000-0000-0000-000000000001', 'Why should exploratory testing remain manual?', 'multiple_choice', 9);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d8000009-0000-0000-0000-000000000001', 'It is too slow to automate', false), ('d8000009-0000-0000-0000-000000000001', 'It requires human judgment, creativity and learning â€” things automation cannot replicate', true), ('d8000009-0000-0000-0000-000000000001', 'There are no tools for it', false), ('d8000009-0000-0000-0000-000000000001', 'Automation is not reliable enough', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d8000010-0000-0000-0000-000000000001', 'c1000008-0000-0000-0000-000000000001', 'What is the purpose of a Page Object Model in automation?', 'multiple_choice', 10);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d8000010-0000-0000-0000-000000000001', 'To generate test data automatically', false), ('d8000010-0000-0000-0000-000000000001', 'To separate page structure from test logic, making tests easier to maintain', true), ('d8000010-0000-0000-0000-000000000001', 'To run tests in parallel', false), ('d8000010-0000-0000-0000-000000000001', 'To create performance tests', false);

-- Module 9 questions
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d9000001-0000-0000-0000-000000000001', 'c1000009-0000-0000-0000-000000000001', 'What is a prompt in the context of AI tools?', 'multiple_choice', 1);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d9000001-0000-0000-0000-000000000001', 'A system error message', false), ('d9000001-0000-0000-0000-000000000001', 'The instruction or question you give to an AI model to get a useful response', true), ('d9000001-0000-0000-0000-000000000001', 'A type of automated test', false), ('d9000001-0000-0000-0000-000000000001', 'A database command', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d9000002-0000-0000-0000-000000000001', 'c1000009-0000-0000-0000-000000000001', 'True or False: AI-generated test cases should always be used without review.', 'true_false', 2);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d9000002-0000-0000-0000-000000000001', 'True', false), ('d9000002-0000-0000-0000-000000000001', 'False', true);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d9000003-0000-0000-0000-000000000001', 'c1000009-0000-0000-0000-000000000001', 'Which of the following is a good use of AI in testing?', 'multiple_choice', 3);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d9000003-0000-0000-0000-000000000001', 'Replacing all manual testers', false), ('d9000003-0000-0000-0000-000000000001', 'Generating test case ideas, summarising requirements, and drafting bug reports', true), ('d9000003-0000-0000-0000-000000000001', 'Making release decisions automatically', false), ('d9000003-0000-0000-0000-000000000001', 'Approving code merges', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d9000004-0000-0000-0000-000000000001', 'c1000009-0000-0000-0000-000000000001', 'What is "hallucination" in the context of AI models?', 'multiple_choice', 4);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d9000004-0000-0000-0000-000000000001', 'When the AI generates images', false), ('d9000004-0000-0000-0000-000000000001', 'When an AI generates confident but factually incorrect information', true), ('d9000004-0000-0000-0000-000000000001', 'When the AI runs out of memory', false), ('d9000004-0000-0000-0000-000000000001', 'When the AI refuses to answer', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d9000005-0000-0000-0000-000000000001', 'c1000009-0000-0000-0000-000000000001', 'True or False: The quality of your prompt directly affects the quality of the AI output.', 'true_false', 5);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d9000005-0000-0000-0000-000000000001', 'True', true), ('d9000005-0000-0000-0000-000000000001', 'False', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d9000006-0000-0000-0000-000000000001', 'c1000009-0000-0000-0000-000000000001', 'What should you always do when using AI-generated test cases?', 'multiple_choice', 6);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d9000006-0000-0000-0000-000000000001', 'Use them exactly as generated', false), ('d9000006-0000-0000-0000-000000000001', 'Review, validate and adapt them to your actual application and requirements', true), ('d9000006-0000-0000-0000-000000000001', 'Delete them and start manually', false), ('d9000006-0000-0000-0000-000000000001', 'Share them publicly', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d9000007-0000-0000-0000-000000000001', 'c1000009-0000-0000-0000-000000000001', 'Which skill becomes MORE important when using AI tools?', 'multiple_choice', 7);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d9000007-0000-0000-0000-000000000001', 'Speed typing', false), ('d9000007-0000-0000-0000-000000000001', 'Critical thinking and the ability to evaluate and validate AI output', true), ('d9000007-0000-0000-0000-000000000001', 'Memorising test cases', false), ('d9000007-0000-0000-0000-000000000001', 'Writing code', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d9000008-0000-0000-0000-000000000001', 'c1000009-0000-0000-0000-000000000001', 'True or False: You should share confidential client data with public AI tools to get better test cases.', 'true_false', 8);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d9000008-0000-0000-0000-000000000001', 'True', false), ('d9000008-0000-0000-0000-000000000001', 'False', true);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d9000009-0000-0000-0000-000000000001', 'c1000009-0000-0000-0000-000000000001', 'What is one way AI can assist with exploratory testing?', 'multiple_choice', 9);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d9000009-0000-0000-0000-000000000001', 'By running tests automatically for you', false), ('d9000009-0000-0000-0000-000000000001', 'By suggesting areas to explore, edge cases, and test ideas based on your prompts', true), ('d9000009-0000-0000-0000-000000000001', 'By writing your bug reports automatically', false), ('d9000009-0000-0000-0000-000000000001', 'By replacing the need for a test plan', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d9000010-0000-0000-0000-000000000001', 'c1000009-0000-0000-0000-000000000001', 'Which statement best describes the role of AI in modern QA?', 'multiple_choice', 10);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d9000010-0000-0000-0000-000000000001', 'AI will replace all manual testers within 2 years', false), ('d9000010-0000-0000-0000-000000000001', 'AI is a productivity tool that augments testers â€” human judgment remains essential', true), ('d9000010-0000-0000-0000-000000000001', 'AI has no useful role in testing yet', false), ('d9000010-0000-0000-0000-000000000001', 'AI only helps with automation, not manual testing', false);

-- Module 10 questions (Portfolio)
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1000001a-0000-0000-0000-000000000001', 'c1000010-0000-0000-0000-000000000001', 'Why is a QA portfolio important for job seekers?', 'multiple_choice', 1);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1000001a-0000-0000-0000-000000000001', 'It is required by law', false), ('d1000001a-0000-0000-0000-000000000001', 'It provides tangible evidence of your testing skills to employers', true), ('d1000001a-0000-0000-0000-000000000001', 'It replaces the need for a CV', false), ('d1000001a-0000-0000-0000-000000000001', 'It is only useful for automation engineers', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1000002a-0000-0000-0000-000000000001', 'c1000010-0000-0000-0000-000000000001', 'True or False: A QA portfolio should only contain automation code.', 'true_false', 2);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1000002a-0000-0000-0000-000000000001', 'True', false), ('d1000002a-0000-0000-0000-000000000001', 'False', true);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1000003a-0000-0000-0000-000000000001', 'c1000010-0000-0000-0000-000000000001', 'Which platform is commonly used to host a QA portfolio?', 'multiple_choice', 3);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1000003a-0000-0000-0000-000000000001', 'Instagram', false), ('d1000003a-0000-0000-0000-000000000001', 'GitHub', true), ('d1000003a-0000-0000-0000-000000000001', 'TikTok', false), ('d1000003a-0000-0000-0000-000000000001', 'Reddit', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1000004a-0000-0000-0000-000000000001', 'c1000010-0000-0000-0000-000000000001', 'What should a portfolio README include?', 'multiple_choice', 4);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1000004a-0000-0000-0000-000000000001', 'Personal diary entries', false), ('d1000004a-0000-0000-0000-000000000001', 'About you, projects covered, tools used, and links to evidence', true), ('d1000004a-0000-0000-0000-000000000001', 'Your salary expectations', false), ('d1000004a-0000-0000-0000-000000000001', 'Your manager''s contact details', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1000005a-0000-0000-0000-000000000001', 'c1000010-0000-0000-0000-000000000001', 'True or False: Using a real application (with permission) to create portfolio evidence is better than using made-up data.', 'true_false', 5);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1000005a-0000-0000-0000-000000000001', 'True', true), ('d1000005a-0000-0000-0000-000000000001', 'False', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1000006a-0000-0000-0000-000000000001', 'c1000010-0000-0000-0000-000000000001', 'Which of these would make the strongest portfolio evidence?', 'multiple_choice', 6);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1000006a-0000-0000-0000-000000000001', 'A blank test case template', false), ('d1000006a-0000-0000-0000-000000000001', 'A complete test pack for a real application with executed test cases and a defect report', true), ('d1000006a-0000-0000-0000-000000000001', 'A screenshot of your desktop', false), ('d1000006a-0000-0000-0000-000000000001', 'A list of tools you have heard of', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1000007a-0000-0000-0000-000000000001', 'c1000010-0000-0000-0000-000000000001', 'What is a README file?', 'multiple_choice', 7);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1000007a-0000-0000-0000-000000000001', 'A type of test case', false), ('d1000007a-0000-0000-0000-000000000001', 'A document that explains a project â€” what it is, how to use it, and what is inside', true), ('d1000007a-0000-0000-0000-000000000001', 'A legal disclaimer', false), ('d1000007a-0000-0000-0000-000000000001', 'A configuration file', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1000008a-0000-0000-0000-000000000001', 'c1000010-0000-0000-0000-000000000001', 'True or False: You should only include work you are 100% proud of in your portfolio.', 'true_false', 8);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1000008a-0000-0000-0000-000000000001', 'True', false), ('d1000008a-0000-0000-0000-000000000001', 'False', true);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1000009a-0000-0000-0000-000000000001', 'c1000010-0000-0000-0000-000000000001', 'Why is it important to include a variety of artefact types in your portfolio?', 'multiple_choice', 9);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1000009a-0000-0000-0000-000000000001', 'To make it look longer', false), ('d1000009a-0000-0000-0000-000000000001', 'To demonstrate breadth of testing skills across different areas', true), ('d1000009a-0000-0000-0000-000000000001', 'To confuse the recruiter', false), ('d1000009a-0000-0000-0000-000000000001', 'It is not important', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d100000aa-0000-0000-0000-000000000001', 'c1000010-0000-0000-0000-000000000001', 'Where should you include your portfolio link?', 'multiple_choice', 10);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d100000aa-0000-0000-0000-000000000001', 'Only in job applications when specifically asked', false), ('d100000aa-0000-0000-0000-000000000001', 'On your CV, LinkedIn profile, and in job applications', true), ('d100000aa-0000-0000-0000-000000000001', 'Nowhere â€” let employers find it themselves', false), ('d100000aa-0000-0000-0000-000000000001', 'Only on LinkedIn', false);

-- Module 11 questions (CV & LinkedIn)
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1100001a-0000-0000-0000-000000000001', 'c1000011-0000-0000-0000-000000000001', 'What should the personal profile at the top of a QA CV include?', 'multiple_choice', 1);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1100001a-0000-0000-0000-000000000001', 'Your hobbies and weekend activities', false), ('d1100001a-0000-0000-0000-000000000001', 'A concise summary of your skills, background, and what you are looking for', true), ('d1100001a-0000-0000-0000-000000000001', 'Your previous salary', false), ('d1100001a-0000-0000-0000-000000000001', 'Your school grades', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1100002a-0000-0000-0000-000000000001', 'c1000011-0000-0000-0000-000000000001', 'True or False: You should tailor your CV for each job you apply to.', 'true_false', 2);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1100002a-0000-0000-0000-000000000001', 'True', true), ('d1100002a-0000-0000-0000-000000000001', 'False', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1100003a-0000-0000-0000-000000000001', 'c1000011-0000-0000-0000-000000000001', 'What does a recruiter typically spend looking at a CV first?', 'multiple_choice', 3);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1100003a-0000-0000-0000-000000000001', '30 minutes', false), ('d1100003a-0000-0000-0000-000000000001', '6â€“10 seconds on initial scan', true), ('d1100003a-0000-0000-0000-000000000001', '1 hour', false), ('d1100003a-0000-0000-0000-000000000001', '5 minutes reading every word', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1100004a-0000-0000-0000-000000000001', 'c1000011-0000-0000-0000-000000000001', 'What is the LinkedIn "Open to Work" feature?', 'multiple_choice', 4);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1100004a-0000-0000-0000-000000000001', 'A way to view other people''s CVs', false), ('d1100004a-0000-0000-0000-000000000001', 'A signal to recruiters that you are actively looking for work', true), ('d1100004a-0000-0000-0000-000000000001', 'A job board within LinkedIn', false), ('d1100004a-0000-0000-0000-000000000001', 'A way to block recruiters', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1100005a-0000-0000-0000-000000000001', 'c1000011-0000-0000-0000-000000000001', 'True or False: You should include every job you have ever had on your QA CV.', 'true_false', 5);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1100005a-0000-0000-0000-000000000001', 'True', false), ('d1100005a-0000-0000-0000-000000000001', 'False', true);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1100006a-0000-0000-0000-000000000001', 'c1000011-0000-0000-0000-000000000001', 'Which keywords are most important to include on a QA CV?', 'multiple_choice', 6);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1100006a-0000-0000-0000-000000000001', 'Generic words like "hardworking" and "team player"', false), ('d1100006a-0000-0000-0000-000000000001', 'Role-specific terms: SDLC, Agile, Jira, defect management, test cases, API testing', true), ('d1100006a-0000-0000-0000-000000000001', 'Your favourite programming language', false), ('d1100006a-0000-0000-0000-000000000001', 'The names of your previous managers', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1100007a-0000-0000-0000-000000000001', 'c1000011-0000-0000-0000-000000000001', 'What is the ideal length for a QA CV?', 'multiple_choice', 7);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1100007a-0000-0000-0000-000000000001', '5â€“6 pages with full detail', false), ('d1100007a-0000-0000-0000-000000000001', '1â€“2 pages, concise and relevant', true), ('d1100007a-0000-0000-0000-000000000001', 'As long as needed', false), ('d1100007a-0000-0000-0000-000000000001', 'Exactly 1 page only', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1100008a-0000-0000-0000-000000000001', 'c1000011-0000-0000-0000-000000000001', 'True or False: Adding your portfolio link to your LinkedIn profile increases your chances of being contacted by recruiters.', 'true_false', 8);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1100008a-0000-0000-0000-000000000001', 'True', true), ('d1100008a-0000-0000-0000-000000000001', 'False', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1100009a-0000-0000-0000-000000000001', 'c1000011-0000-0000-0000-000000000001', 'What are transferable skills for a career changer moving into QA?', 'multiple_choice', 9);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1100009a-0000-0000-0000-000000000001', 'Skills irrelevant to any role', false), ('d1100009a-0000-0000-0000-000000000001', 'Skills from previous roles that apply to QA: attention to detail, communication, analysis, process following', true), ('d1100009a-0000-0000-0000-000000000001', 'Technical certifications only', false), ('d1100009a-0000-0000-0000-000000000001', 'Management experience only', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d110000aa-0000-0000-0000-000000000001', 'c1000011-0000-0000-0000-000000000001', 'How often should you update your LinkedIn profile?', 'multiple_choice', 10);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d110000aa-0000-0000-0000-000000000001', 'Only when you get a new job', false), ('d110000aa-0000-0000-0000-000000000001', 'Regularly â€” add new skills, projects and achievements as you gain them', true), ('d110000aa-0000-0000-0000-000000000001', 'Once a decade', false), ('d110000aa-0000-0000-0000-000000000001', 'Never â€” leave it as it is', false);

-- Module 12 questions (Interview & Job Search)
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1200001a-0000-0000-0000-000000000001', 'c1000012-0000-0000-0000-000000000001', 'What does STAR stand for in interview technique?', 'multiple_choice', 1);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1200001a-0000-0000-0000-000000000001', 'Skills, Tasks, Actions, Results', false), ('d1200001a-0000-0000-0000-000000000001', 'Situation, Task, Action, Result', true), ('d1200001a-0000-0000-0000-000000000001', 'Strengths, Targets, Achievements, Review', false), ('d1200001a-0000-0000-0000-000000000001', 'Scenario, Testing, Analysis, Report', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1200002a-0000-0000-0000-000000000001', 'c1000012-0000-0000-0000-000000000001', 'True or False: It is acceptable to say "I don''t know" in a QA interview if you genuinely don''t know the answer.', 'true_false', 2);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1200002a-0000-0000-0000-000000000001', 'True', true), ('d1200002a-0000-0000-0000-000000000001', 'False', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1200003a-0000-0000-0000-000000000001', 'c1000012-0000-0000-0000-000000000001', 'What is the most common first interview stage for a QA role?', 'multiple_choice', 3);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1200003a-0000-0000-0000-000000000001', 'A coding challenge', false), ('d1200003a-0000-0000-0000-000000000001', 'A telephone or video screening with HR or a recruiter', true), ('d1200003a-0000-0000-0000-000000000001', 'A full day assessment centre', false), ('d1200003a-0000-0000-0000-000000000001', 'A written exam', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1200004a-0000-0000-0000-000000000001', 'c1000012-0000-0000-0000-000000000001', 'When should you research a company before an interview?', 'multiple_choice', 4);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1200004a-0000-0000-0000-000000000001', 'Only if they ask you to', false), ('d1200004a-0000-0000-0000-000000000001', 'Always â€” before every interview, understand the company, product, and culture', true), ('d1200004a-0000-0000-0000-000000000001', 'Only for senior roles', false), ('d1200004a-0000-0000-0000-000000000001', 'After the interview', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1200005a-0000-0000-0000-000000000001', 'c1000012-0000-0000-0000-000000000001', 'True or False: You should always ask questions at the end of a QA interview.', 'true_false', 5);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1200005a-0000-0000-0000-000000000001', 'True', true), ('d1200005a-0000-0000-0000-000000000001', 'False', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1200006a-0000-0000-0000-000000000001', 'c1000012-0000-0000-0000-000000000001', 'What is a "scenario question" in a QA interview?', 'multiple_choice', 6);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1200006a-0000-0000-0000-000000000001', 'A question about your salary expectations', false), ('d1200006a-0000-0000-0000-000000000001', 'A question describing a situation and asking how you would handle it as a tester', true), ('d1200006a-0000-0000-0000-000000000001', 'A question about your previous company''s processes', false), ('d1200006a-0000-0000-0000-000000000001', 'A question about your personal life', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1200007a-0000-0000-0000-000000000001', 'c1000012-0000-0000-0000-000000000001', 'What is a realistic job search timeline for a career changer into QA?', 'multiple_choice', 7);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1200007a-0000-0000-0000-000000000001', '1â€“2 days', false), ('d1200007a-0000-0000-0000-000000000001', '1â€“6 months of active, structured job searching', true), ('d1200007a-0000-0000-0000-000000000001', 'It should happen immediately after completing training', false), ('d1200007a-0000-0000-0000-000000000001', 'At least 2 years', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1200008a-0000-0000-0000-000000000001', 'c1000012-0000-0000-0000-000000000001', 'True or False: Networking on LinkedIn can lead to job opportunities that are not advertised publicly.', 'true_false', 8);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1200008a-0000-0000-0000-000000000001', 'True', true), ('d1200008a-0000-0000-0000-000000000001', 'False', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d1200009a-0000-0000-0000-000000000001', 'c1000012-0000-0000-0000-000000000001', 'What should you focus on in your first 90 days in a QA role?', 'multiple_choice', 9);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d1200009a-0000-0000-0000-000000000001', 'Immediately proposing process changes', false), ('d1200009a-0000-0000-0000-000000000001', 'Learning the product, team, processes and tools â€” asking questions and building relationships', true), ('d1200009a-0000-0000-0000-000000000001', 'Finding everything that is wrong', false), ('d1200009a-0000-0000-0000-000000000001', 'Working independently without asking for help', false);
insert into public.quiz_questions (id, quiz_id, question_text, question_type, sort_order) values ('d120000aa-0000-0000-0000-000000000001', 'c1000012-0000-0000-0000-000000000001', 'What should you do after a job rejection?', 'multiple_choice', 10);
insert into public.quiz_answers (question_id, answer_text, is_correct) values ('d120000aa-0000-0000-0000-000000000001', 'Stop applying immediately', false), ('d120000aa-0000-0000-0000-000000000001', 'Ask for feedback, reflect on the interview, and continue your job search', true), ('d120000aa-0000-0000-0000-000000000001', 'Contact the hiring manager repeatedly', false), ('d120000aa-0000-0000-0000-000000000001', 'Give up on QA', false);

-- Update course to enable drip release
update public.courses set drip_enabled = true, drip_type = 'days_after_enrolment', default_module_gap_days = 7
where id = 'a1b2c3d4-0001-0001-0001-000000000001';
