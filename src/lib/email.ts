import { Resend } from 'resend';

// Best-effort transactional email. No-ops (and never throws) when Resend
// is not configured, so payment fulfilment is never blocked by email.
export async function sendPurchaseConfirmation(opts: {
  to: string;
  courseTitle: string;
  dashboardUrl: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) return;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to: opts.to,
      subject: `Your access to ${opts.courseTitle} is ready`,
      html: `
        <div style="font-family:system-ui,-apple-system,sans-serif;max-width:520px;margin:0 auto;color:#0d1b2a">
          <h2 style="color:#0d1b2a">Payment successful 🎉</h2>
          <p>Thank you for your purchase. Your access to <strong>${opts.courseTitle}</strong> has been unlocked.</p>
          <p>
            <a href="${opts.dashboardUrl}" style="display:inline-block;background:#2a9d8f;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600">
              Go to your dashboard
            </a>
          </p>
          <p style="color:#6b7280;font-size:13px">Inside STLC Academy</p>
        </div>
      `,
    });
  } catch {
    // Swallow — confirmation email is non-critical to fulfilment.
  }
}
