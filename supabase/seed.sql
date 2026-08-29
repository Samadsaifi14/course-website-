-- ============================================================
-- ALIG MINDS — SAMPLE SEED DATA (optional)
-- Run AFTER schema.sql, once, via Supabase SQL Editor.
-- This fills the site with example courses, mock tests,
-- questions, and study material so you can test everything.
-- Delete/replace rows later from Table Editor.
-- ============================================================

-- ------------------------------------------------------------------
-- COURSES
-- ------------------------------------------------------------------
insert into public.courses (title, description, class, subject, price, is_free, is_published) values
  ('Class 10 Mathematics — Full Course', 'Board-exam-focused maths course with concept videos, practice sets aur PYQs.', 'Class 10', 'Mathematics', 999, false, true),
  ('Class 10 Science — Full Course', 'Physics, Chemistry aur Biology — sab topics step by step.', 'Class 10', 'Science', 999, false, true),
  ('Class 9 English Grammar Bootcamp', 'Grammar rules, writing skills aur reading comprehension.', 'Class 9', 'English', 499, false, true),
  ('Free Sample: Class 6 Maths Basics', 'Try our teaching style for free — number systems aur basics.', 'Class 6', 'Mathematics', 0, true, true)
on conflict do nothing;

-- ------------------------------------------------------------------
-- MOCK TESTS
-- ------------------------------------------------------------------
insert into public.mock_tests (title, class, subject, duration_minutes, is_published) values
  ('Class 10 Maths — Mock Test 1', 'Class 10', 'Mathematics', 30, true),
  ('Class 10 Science — Mock Test 1', 'Class 10', 'Science', 30, true)
on conflict do nothing;

-- ------------------------------------------------------------------
-- MOCK TEST QUESTIONS (MCQ, negative marking preview)
-- ------------------------------------------------------------------
-- Test 1: Class 10 Maths
insert into public.mock_test_questions
  (test_id, question, option_a, option_b, option_c, option_d, correct_option, marks, negative_marks)
select t.id, q.question, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_option, q.marks, q.negative_marks
from public.mock_tests t
cross join (values
  ('What is the value of x if 2x + 6 = 18?', '4', '6', '8', '10', 'B', 1, 0),
  ('The value of pi rounded to 2 decimal places is:', '3.14', '3.15', '3.16', '3.10', 'A', 1, 0),
  ('If a + b = 10 and a - b = 4, then a is:', '6', '7', '8', '9', 'B', 2, 0.5),
  ('A triangle with no equal sides is called:', 'Isosceles', 'Scalene', 'Equilateral', 'Right', 'B', 1, 0),
  ('The square root of 144 is:', '10', '11', '12', '14', 'C', 1, 0)
) as q(question, option_a, option_b, option_c, option_d, correct_option, marks, negative_marks)
where t.subject = 'Mathematics'
on conflict do nothing;

-- Test 2: Class 10 Science
insert into public.mock_test_questions
  (test_id, question, option_a, option_b, option_c, option_d, correct_option, marks, negative_marks)
select t.id, q.question, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_option, q.marks, q.negative_marks
from public.mock_tests t
cross join (values
  ('Chemical formula of water is:', 'H2O2', 'H2O', 'OH', 'HO2', 'B', 1, 0),
  ('The SI unit of force is:', 'Joule', 'Watt', 'Newton', 'Pascal', 'C', 1, 0),
  ('The process by which plants make food is called:', 'Respiration', 'Photosynthesis', 'Transpiration', 'Digestion', 'B', 2, 0.5),
  ('Which gas do plants absorb from the air?', 'Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen', 'C', 1, 0),
  ('The part of the eye that controls the amount of light is:', 'Retina', 'Pupil', 'Lens', 'Cornea', 'B', 1, 0)
) as q(question, option_a, option_b, option_c, option_d, correct_option, marks, negative_marks)
where t.subject = 'Science'
on conflict do nothing;

-- ------------------------------------------------------------------
-- STUDY MATERIAL (free PYQs + notes preview)
-- ------------------------------------------------------------------
insert into public.study_material (title, class, subject, year, is_free, price, is_published) values
  ('CBSE Class 10 Maths — PYQ 2024', 'Class 10', 'Mathematics', '2024', true, 0, true),
  ('CBSE Class 10 Science — PYQ 2023', 'Class 10', 'Science', '2023', true, 0, true),
  ('Class 10 Maths — Formula Sheet', 'Class 10', 'Mathematics', null, true, 0, true)
on conflict do nothing;
