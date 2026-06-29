-- ============================================================
-- Enrol a test user into ALL courses.
-- Run in the Supabase SQL editor. Idempotent — re-running is safe and
-- will (re)activate every enrolment for the user.
-- ============================================================

insert into public.enrolments (user_id, course_id, status)
select u.id, c.id, 'active'
from auth.users u
cross join public.courses c
where u.email = 'doxley9@gmail.com'
on conflict (user_id, course_id) do update set status = 'active';

-- Confirm what the user is now enrolled in:
select c.title, e.status, e.enrolled_at
from public.enrolments e
join public.courses c on c.id = e.course_id
join auth.users u on u.id = e.user_id
where u.email = 'doxley9@gmail.com'
order by c.title;
