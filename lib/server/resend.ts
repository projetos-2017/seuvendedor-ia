const RESEND_URL = 'https://api.resend.com/emails';

export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey) {
    throw new Error('RESEND_API_KEY não configurada no ambiente do servidor.');
  }
  if (!from) {
    throw new Error('EMAIL_FROM não configurada no ambiente do servidor.');
  }

  const response = await fetch(RESEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Resend respondeu ${response.status}: ${errorBody}`);
  }
}
