import { Resend } from 'resend';

// Best-effort transactional email. Every send no-ops (and never throws) when
// Resend is not configured, so core flows are never blocked by email.

const NAVY = '#0d1b2a';
const TEAL = '#2a9d8f';
const GOLD = '#e9b949';

function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://www.insidestlcacademy.com').replace(/\/$/, '');
}

/** The address that receives admin/tutor notifications. */
export function adminEmail(): string {
  return process.env.ADMIN_NOTIFICATION_EMAIL || 'david.oxley@insidestlc.com';
}

function button(href: string, label: string) {
  return `<p style="margin:24px 0"><a href="${href}" style="display:inline-block;background:${TEAL};color:#fff;text-decoration:none;padding:12px 26px;border-radius:8px;font-weight:600">${label}</a></p>`;
}

// Branded email shell: navy header with logo + gold rule, white body, footer.
function shell(bodyHtml: string): string {
  return `
  <div style="background:#f4f5f7;padding:24px 0;margin:0">
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb">
      <div style="background:${NAVY};padding:22px 24px;text-align:center">
        <img src="${siteUrl()}/logo.png" alt="Inside STLC Academy" height="34" style="height:34px;width:auto" />
      </div>
      <div style="height:3px;background:${GOLD}"></div>
      <div style="padding:28px 24px;color:${NAVY};font-size:15px;line-height:1.6">
        ${bodyHtml}
      </div>
      <div style="padding:16px 24px;border-top:1px solid #eee;color:#6b7280;font-size:12px;text-align:center">
        Inside STLC Academy · <a href="mailto:info@insidestlc.com" style="color:${TEAL};text-decoration:none">info@insidestlc.com</a>
      </div>
    </div>
  </div>`;
}

async function send(opts: { to: string; subject: string; html: string }): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) return;
  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({ from, to: opts.to, subject: opts.subject, html: opts.html });
  } catch {
    // Swallow — notifications are non-critical.
  }
}

export async function sendPurchaseConfirmation(opts: {
  to: string;
  courseTitle: string;
  dashboardUrl: string;
}): Promise<void> {
  await send({
    to: opts.to,
    subject: `Your access to ${opts.courseTitle} is ready`,
    html: shell(`
      <h2 style="margin:0 0 12px">Payment successful 🎉</h2>
      <p>Thank you for your purchase. Your access to <strong>${opts.courseTitle}</strong> has been unlocked.</p>
      ${button(opts.dashboardUrl, 'Go to your dashboard')}
      <p style="color:#6b7280;font-size:13px">If you checked out as a new customer, check your inbox for an email to set your password.</p>
    `),
  });
}

/** Notify the admin that a learner has enrolled / purchased a course. */
export async function sendAdminEnrolmentNotification(opts: {
  studentEmail: string;
  courseTitle: string;
  amountLabel?: string;
  adminUrl: string;
}): Promise<void> {
  await send({
    to: adminEmail(),
    subject: `New enrolment: ${opts.courseTitle}`,
    html: shell(`
      <h2 style="margin:0 0 12px">New enrolment</h2>
      <p>A learner has enrolled in a course.</p>
      <ul>
        <li><strong>Course:</strong> ${opts.courseTitle}</li>
        <li><strong>Learner:</strong> ${opts.studentEmail}</li>
        ${opts.amountLabel ? `<li><strong>Amount:</strong> ${opts.amountLabel}</li>` : ''}
      </ul>
      ${button(opts.adminUrl, 'View purchases')}
    `),
  });
}

/** Notify the admin that a learner has submitted an assignment. */
export async function sendAdminSubmissionNotification(opts: {
  studentName: string;
  studentEmail: string;
  assignmentTitle: string;
  reviewUrl: string;
}): Promise<void> {
  await send({
    to: adminEmail(),
    subject: `New submission: ${opts.assignmentTitle}`,
    html: shell(`
      <h2 style="margin:0 0 12px">New assignment submission</h2>
      <ul>
        <li><strong>Assignment:</strong> ${opts.assignmentTitle}</li>
        <li><strong>Learner:</strong> ${opts.studentName} (${opts.studentEmail})</li>
      </ul>
      <p>It's awaiting your review.</p>
      ${button(opts.reviewUrl, 'Review submission')}
    `),
  });
}

/** Notify a learner that their submission has been reviewed. */
export async function sendStudentFeedbackNotification(opts: {
  to: string;
  assignmentTitle: string;
  statusLabel: string;
  feedback?: string;
  dashboardUrl: string;
}): Promise<void> {
  await send({
    to: opts.to,
    subject: `Feedback on your submission: ${opts.assignmentTitle}`,
    html: shell(`
      <h2 style="margin:0 0 12px">Your submission has been reviewed</h2>
      <ul>
        <li><strong>Assignment:</strong> ${opts.assignmentTitle}</li>
        <li><strong>Status:</strong> ${opts.statusLabel}</li>
      </ul>
      ${opts.feedback ? `<p style="background:#f0faf9;border:1px solid #ccefec;border-radius:8px;padding:12px"><strong>Tutor feedback:</strong><br/>${opts.feedback}</p>` : ''}
      ${button(opts.dashboardUrl, 'View in your dashboard')}
    `),
  });
}
