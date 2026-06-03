# Inside STLC Academy – Setup Guide

## Prerequisites

1. **Node.js** — Install from https://nodejs.org (LTS version, e.g. 20.x)
2. **Supabase account** — Free at https://supabase.com
3. **Vercel account** — Free at https://vercel.com (for deployment)

---

## Step 1 – Install Node.js

Download and install Node.js LTS from https://nodejs.org. After installing, open a new terminal and confirm:

```
node --version
npm --version
```

---

## Step 2 – Install project dependencies

Open a terminal in this project folder and run:

```
npm install
```

---

## Step 3 – Create a Supabase project

1. Go to https://app.supabase.com → New project
2. Name it `inside-stlc-academy`, pick a region close to your users (e.g. EU West)
3. Note your **Project URL** and **anon key** from Settings → API
4. Note your **service_role key** (keep this secret — it's for the admin API)

---

## Step 4 – Run the database schema

1. In Supabase → SQL Editor → New query
2. Paste the entire contents of `supabase/schema.sql` and click **Run**

---

## Step 5 – Create your admin user

1. In Supabase → Authentication → Users → Invite user
2. Enter your email address
3. Check your email and set a password
4. In Supabase → SQL Editor, run:

```sql
update public.profiles set role = 'admin' where email = 'your@email.com';
```

---

## Step 6 – Run the seed data

1. In Supabase → SQL Editor → New query
2. Paste the entire contents of `supabase/seed.sql` and click **Run**

This creates the course, all 12 modules, the Module 1 quiz (10 questions), and the Module 1 assignment.

---

## Step 7 – Create storage buckets

In Supabase → Storage → New bucket, create two buckets:

| Bucket name             | Public? |
|-------------------------|---------|
| `course-resources`      | No      |
| `assignment-submissions`| No      |

Then set up storage policies for each bucket:

**course-resources** — Allow authenticated users to read:
```sql
create policy "Authenticated users can read course resources"
  on storage.objects for select
  using (bucket_id = 'course-resources' and auth.role() = 'authenticated');

create policy "Admins can upload course resources"
  on storage.objects for insert
  with check (bucket_id = 'course-resources' and auth.role() = 'authenticated');
```

**assignment-submissions** — Allow students to upload their own, admins to read all:
```sql
create policy "Students can upload submissions"
  on storage.objects for insert
  with check (bucket_id = 'assignment-submissions' and auth.role() = 'authenticated');

create policy "Users can read own submissions"
  on storage.objects for select
  using (bucket_id = 'assignment-submissions' and auth.role() = 'authenticated');
```

---

## Step 8 – Configure environment variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in your Supabase URL, anon key, and service role key:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Step 9 – Run locally

```
npm run dev
```

Open http://localhost:3000. You should see the landing page.

Log in at http://localhost:3000/login with your admin email → you'll be taken to the Admin panel.

---

## Step 10 – Enrol your first student

1. Log in as admin → Students → Add student
2. Fill in name and email → Click "Create student"
3. The student receives an invitation email to set their password
4. Open the student record → Click "Enrol student" and select the 90-Day course
5. The student can now log in and access Module 1

---

## Step 11 – Upload Module 1 resources

1. Admin → Courses → 90-Day Software Testing Career Roadmap → Upload resource
2. Upload each PDF/DOCX file from your Module 1 materials
3. Set the category (e.g. `templates`, `beginner`) and link to Module 1

---

## Step 12 – Deploy to Vercel

1. Push the project to a GitHub repository
2. Go to https://vercel.com → New project → Import from GitHub
3. Add the same environment variables from `.env.local` in Vercel's project settings
4. Deploy — Vercel will build and host the app automatically

For a custom domain (insidestlcacademy.com):
- In Vercel → Project → Settings → Domains → Add domain
- Update your DNS records as instructed

---

## Folder structure

```
src/
  app/                   – Next.js App Router pages
    (auth)/              – Login, register, reset password
    dashboard/           – Student-facing pages
    admin/               – Admin-facing pages
    api/admin/           – Protected API routes (create student, enrol)
  components/
    ui/                  – Reusable UI (Button, Card, Badge, etc.)
    dashboard/           – Student nav
    admin/               – Admin nav, forms, review panel
    module/              – Quiz, assignment upload, resource downloads
  lib/
    supabase/            – Supabase client (browser + server + middleware)
    utils.ts             – Shared helpers
  types/                 – TypeScript types
supabase/
  schema.sql             – Full database schema
  seed.sql               – Course, modules, quiz data
```

---

## Phase 2 – Stripe payments

When ready to add Stripe checkout:

1. Create a Stripe account at https://stripe.com
2. Add your Stripe keys to `.env.local`
3. Create a product in Stripe for the 90-Day course
4. Build a `/checkout` route that creates a Stripe Checkout Session
5. Add a webhook handler at `/api/stripe/webhook` that listens for `checkout.session.completed` and calls the enrol-student API

---

## Support

Contact: support@insidestlc.com / david.oxley@insidestlc.com
```
