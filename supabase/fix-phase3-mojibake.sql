-- ============================================================
-- Corrective fix for mojibake in live content: the UTF-8 en dash (–) and
-- em dash (—) were stored double-encoded and display as "â€“" / "â€”"
-- (e.g. "3â€“4 hours", "18â€“65"). Seed files are on-conflict-do-nothing,
-- so re-seeding does NOT overwrite the bad rows — this UPDATE does.
--
-- Safe & idempotent: it only ever replaces those two corruption sequences
-- with the correct character, so it cannot alter any already-correct text,
-- and re-running it is a no-op. Covers every text/text[]/jsonb content
-- column across the content tables, so no column needs to be named by hand.
-- ============================================================
do $$
declare
  r record;
begin
  -- All plain text / varchar columns on the content tables.
  for r in
    select table_name, column_name
    from information_schema.columns
    where table_schema = 'public'
      and table_name in ('courses','modules','lessons','assignments',
                         'quizzes','quiz_questions','quiz_answers','resources')
      and data_type in ('text','character varying')
  loop
    execute format(
      'update public.%I set %I = replace(replace(%I, %L, %L), %L, %L)
         where %I like %L or %I like %L',
      r.table_name, r.column_name, r.column_name,
      'â€“', '–', 'â€”', '—',
      r.column_name, '%â€“%', r.column_name, '%â€”%'
    );
  end loop;

  -- Known text[] columns.
  update public.modules
     set learning_objectives = (select array_agg(replace(replace(x,'â€“','–'),'â€”','—')) from unnest(learning_objectives) x)
   where array_to_string(learning_objectives,'|') like '%â€“%'
      or array_to_string(learning_objectives,'|') like '%â€”%';

  update public.lessons
     set learning_objectives = (select array_agg(replace(replace(x,'â€“','–'),'â€”','—')) from unnest(learning_objectives) x)
   where array_to_string(learning_objectives,'|') like '%â€“%'
      or array_to_string(learning_objectives,'|') like '%â€”%';

  update public.lessons
     set completion_checklist = (select array_agg(replace(replace(x,'â€“','–'),'â€”','—')) from unnest(completion_checklist) x)
   where array_to_string(completion_checklist,'|') like '%â€“%'
      or array_to_string(completion_checklist,'|') like '%â€”%';

  -- Lesson enhancements (jsonb).
  update public.lessons
     set enhancements = replace(replace(enhancements::text,'â€“','–'),'â€”','—')::jsonb
   where enhancements::text like '%â€“%' or enhancements::text like '%â€”%';
end $$;

-- Verify: should return 0.
select count(*) as remaining_mojibake
from (
  select question_text t from public.quiz_questions
  union all select answer_text from public.quiz_answers
  union all select estimated_duration from public.modules
  union all select title from public.modules
) x
where t like '%â€“%' or t like '%â€”%';
