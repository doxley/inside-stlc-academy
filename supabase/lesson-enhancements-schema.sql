-- ============================================================
-- Adds a structured `enhancements` JSONB column to lessons. This holds the
-- premium practical-training content (industry story, visual learning aid,
-- bad/good example, David's tip, mini challenge, model answer, manager's
-- review, portfolio builder, resource preview) without new columns per field.
--
-- Existing fields (lesson_overview, lesson_notes, worked_example,
-- common_mistakes, real_world_tip, exercise, reflection_question,
-- knowledge_check, completion_checklist) are unchanged. Idempotent.
-- ============================================================

alter table public.lessons add column if not exists enhancements jsonb;
