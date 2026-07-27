-- ─────────────────────────────────────────────────────────────
-- FIX: infinite recursion in RLS policy for relation "profiles"
--
-- Two policies ON public.profiles checked admin-ness with a subquery
-- against public.profiles itself:
--
--   exists (select 1 from public.profiles p
--           where p.id = auth.uid() and p.role = 'admin')
--
-- Evaluating that subquery re-runs the profiles SELECT policies, which
-- re-run the subquery… → "infinite recursion detected in policy for
-- relation profiles". It surfaced when a student submits an assignment:
-- the browser-side INSERT into assignment_submissions is evaluated under
-- RLS, whose "Admins manage all submissions" policy queries profiles,
-- tripping the recursive profiles policies. (Server-side reads use the
-- service-role client, which bypasses RLS, so they never hit it.)
--
-- Fix: a SECURITY DEFINER helper reads the caller's role WITHOUT invoking
-- RLS (it runs as the function owner), so the check no longer recurses.
-- Idempotent — safe to re-run.
-- ─────────────────────────────────────────────────────────────

-- 1. Helper: is the current user an admin? SECURITY DEFINER => the body's
--    read of profiles bypasses RLS, breaking the recursion.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated, service_role;

-- 2. Rebuild the two self-referential profiles policies to use the helper.
drop policy if exists "Admins can view all profiles" on public.profiles;
create policy "Admins can view all profiles"
  on public.profiles for select using ( public.is_admin() );

drop policy if exists "Admins can insert profiles" on public.profiles;
create policy "Admins can insert profiles"
  on public.profiles for insert with check ( public.is_admin() );
