const BREVO_URL = 'https://api.brevo.com/v3/smtp/email';

export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
}

function parseSender(raw: string): { email: string; name?: string } {
  // Aceita tanto "contato@dominio.com" quanto "Nome <contato@dominio.com>".
  const match = raw.match(/^(.*)<(.+)>$/);
  if (match) {
    return { name: match[1].trim() || undefined, email: match[2].trim() };
  }
  return { email: raw.trim() };
}

export async function sendEmail({ to, subject, html }: SendEmailInput): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey) {
    throw new Error('BREVO_API_KEY não configurada no ambiente do servidor.');
  }
  if (!from) {
    throw new Error('EMAIL_FROM não configurada no ambiente do servidor.');
  }

  const response = await fetch(BREVO_URL, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      sender: parseSender(from),
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Brevo respondeu ${response.status}: ${errorBody}`);
  }
}
