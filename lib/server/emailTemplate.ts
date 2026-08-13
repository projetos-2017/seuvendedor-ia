const BRAND_COLOR = '#6360f2';
const INK_950 = '#0a0a0f';
const INK_500 = '#52525f';
const INK_200 = '#d0d0d8';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function renderLeadEmail(paragraphs: string[]): string {
  const bodyHtml = paragraphs
    .map(
      (p) =>
        `<p style="margin:0 0 16px; font-size:15px; line-height:1.6; color:${INK_950};">${escapeHtml(p)}</p>`,
    )
    .join('\n');

  return `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0; padding:0; background:#f5f5f8; font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f8; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid ${INK_200};">
            <tr>
              <td style="background:${INK_950}; padding:24px 32px;">
                <span style="font-size:16px; font-weight:600; color:#ffffff;">Seu Vendedor<span style="color:${BRAND_COLOR};">IA</span></span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                ${bodyHtml}
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:8px;">
                  <tr>
                    <td style="border-radius:8px; background:${BRAND_COLOR};">
                      <a href="https://seuvendedorai.com.br" style="display:inline-block; padding:12px 24px; font-size:14px; font-weight:600; color:#ffffff; text-decoration:none;">
                        Conhecer a Seu Vendedor IA
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px; border-top:1px solid ${INK_200};">
                <p style="margin:0; font-size:12px; color:${INK_500};">
                  Seu Vendedor IA · seuvendedorai.com.br<br />
                  Você recebeu este e-mail porque conversou com nosso agente de demonstração no site.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
