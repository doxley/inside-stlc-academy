import { Resend } from 'resend';

// Best-effort transactional email. Every send no-ops (and never throws) when
// Resend is not configured, so core flows are never blocked by email.

const WRAP_START =
  '<div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;color:#0d1b2a">';
const WRAP_END = '<p style="color:#6b7280;font-size:13px;margin-top:24px">Inside STLC Academy</p></div>';

function button(href: string, label: string) {
  return `<p><a href="${href}" style="display:inline-block;background:#2a9d8f;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600">${label}</a></p>`;
}

/** The address that receives admin/tutor notifications. */
export function adminEmail(): string {
  return process.env.ADMIN_NOTIFICATION_EMAIL || 'david.oxley@insidestlc.com';
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
    html: `${WRAP_START}
      <h2>Payment successful 🎉</h2>
      <p>Thank you for your purchase. Your access to <strong>${opts.courseTitle}</strong> has been unlocked.</p>
      ${button(opts.dashboardUrl, 'Go to your dashboard')}
      ${WRAP_END}`,
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
    html: `${WRAP_START}
      <h2>New enrolment</h2>
      <p>A learner has enrolled in a course.</p>
      <ul>
        <li><strong>Course:</strong> ${opts.courseTitle}</li>
        <li><strong>Learner:</strong> ${opts.studentEmail}</li>
        ${opts.amountLabel ? `<li><strong>Amount:</strong> ${opts.amountLabel}</li>` : ''}
      </ul>
      ${button(opts.adminUrl, 'View purchases')}
      ${WRAP_END}`,
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
    html: `${WRAP_START}
      <h2>New assignment submission</h2>
      <ul>
        <li><strong>Assignment:</strong> ${opts.assignmentTitle}</li>
        <li><strong>Learner:</strong> ${opts.studentName} (${opts.studentEmail})</li>
      </ul>
      <p>It's awaiting your review.</p>
      ${button(opts.reviewUrl, 'Review submission')}
      ${WRAP_END}`,
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
    html: `${WRAP_START}
      <h2>Your submission has been reviewed</h2>
      <ul>
        <li><strong>Assignment:</strong> ${opts.assignmentTitle}</li>
        <li><strong>Status:</strong> ${opts.statusLabel}</li>
      </ul>
      ${opts.feedback ? `<p style="background:#f0faf9;border:1px solid #ccefec;border-radius:8px;padding:12px"><strong>Tutor feedback:</strong><br/>${opts.feedback}</p>` : ''}
      ${button(opts.dashboardUrl, 'View in your dashboard')}
      ${WRAP_END}`,
  });
}
