# Email Setup — Inside STLC Academy

Sending domain: **insidestlcacademy.com**
Public help inbox: **info@insidestlc.com**
Private admin alerts: **david.oxley@insidestlc.com** (never shown publicly)

There are **two email systems**. Both should send from your domain via Resend.

| System | Sends | Branded by |
| --- | --- | --- |
| **Supabase Auth** | invite (new buyers), password reset, confirm signup, magic link | Supabase templates (this repo: `supabase/email-templates/`) |
| **Resend (app)** | purchase confirmation, admin enrolment/submission alerts, learner feedback | `src/lib/email.ts` (branded shell + logo) |

---

## 1. Resend — verify the sending domain

1. Create a Resend account → **Domains → Add Domain** → `insidestlcacademy.com`.
2. Add the **DNS records Resend shows** (SPF, DKIM, and the return-path/MX) at your DNS host. Wait for **Verified**.
3. **API Keys → Create** → copy the key.
4. Set in Vercel (and `.env.local`):
   - `RESEND_API_KEY=re_…`
   - `RESEND_FROM_EMAIL=noreply@insidestlcacademy.com`
   - `ADMIN_NOTIFICATION_EMAIL=david.oxley@insidestlc.com`
5. Redeploy. The app emails (confirmation, admin alerts, feedback) now send branded from your domain. Without these vars they simply no-op.

> DKIM/SPF verification is what keeps these out of spam — don't skip it.

## 2. Supabase Auth — send from your domain (custom SMTP)

By default these come from `noreply@mail.app.supabase.io`, are unbranded, and
are rate-limited (~a few/hour). Point Supabase at Resend's SMTP instead:

**Supabase → Authentication → Emails → SMTP Settings → Enable custom SMTP:**
- **Host:** `smtp.resend.com`
- **Port:** `465` (SSL) or `587` (STARTTLS)
- **Username:** `resend`
- **Password:** your **Resend API key** (`re_…`)
- **Sender email:** `noreply@insidestlcacademy.com`
- **Sender name:** `Inside STLC Academy`

Save. Auth emails now send from your domain with Resend deliverability + higher limits.

## 3. Supabase Auth — apply the branded templates

**Supabase → Authentication → Emails → Templates.** For each template, paste the
matching file from `supabase/email-templates/` and set the subject:

| Supabase template | File | Suggested subject |
| --- | --- | --- |
| Invite user | `invite.html` | You've been invited to Inside STLC Academy |
| Reset password | `reset-password.html` | Reset your Inside STLC Academy password |
| Confirm signup | `confirm-signup.html` | Confirm your Inside STLC Academy account |
| Magic Link | `magic-link.html` | Your Inside STLC Academy sign-in link |

The templates use Supabase's `{{ .ConfirmationURL }}` variable and load the logo
from `https://www.insidestlcacademy.com/logo.png` (ensure that resolves; adjust
to the apex domain if you don't use `www`).

> The **Invite** template matters most: new guest buyers are invited via
> Supabase `inviteUserByEmail` after checkout, so that's the first email they see.

## 4. Sender / recipient summary

- **From (all outbound):** `noreply@insidestlcacademy.com`
- **Learner replies / help:** `info@insidestlc.com` (make sure it's monitored)
- **Admin alerts to:** `david.oxley@insidestlc.com`

## 5. Quick test

1. **Auth:** trigger a password reset → confirm it arrives branded, from your domain.
2. **App:** make a test purchase → buyer gets the confirmation, you get the admin
   enrolment alert; submit an assignment → you get the submission alert; leave
   feedback → the learner gets the feedback email.
