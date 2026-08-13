import { callOpenRouter, type ChatMessage } from './openrouter';
import { DRAFT_EMAIL_TOOL, EMAIL_WRITER_SYSTEM_PROMPT } from './emailTool';
import { renderLeadEmail } from './emailTemplate';
import type { LeadData } from './leadTool';

export interface DraftedEmail {
  subject: string;
  html: string;
}

export async function draftLeadEmail(
  lead: LeadData,
  conversation: ChatMessage[],
): Promise<DraftedEmail | null> {
  const transcript = conversation
    .map((m) => `${m.role === 'user' ? 'Visitante' : 'Agente'}: ${m.content}`)
    .join('\n');

  const contextMessage = `Dados do lead capturado:
- Nome: ${lead.nome}
- E-mail: ${lead.email ?? 'não informado'}
- WhatsApp: ${lead.whatsapp ?? 'não informado'}
- Segmento: ${lead.segmento ?? 'não informado'}
- Leads/mês: ${lead.leadsPorMes ?? 'não informado'}
- Diagnóstico resumido: ${lead.diagnostico ?? 'não informado'}

Transcrição completa da conversa:
${transcript}`;

  const messages: ChatMessage[] = [
    { role: 'system', content: EMAIL_WRITER_SYSTEM_PROMPT },
    { role: 'user', content: contextMessage },
  ];

  const result = await callOpenRouter(messages, [DRAFT_EMAIL_TOOL]);

  if (result.toolCall?.name !== 'redigir_email') return null;

  const { assunto, paragrafos } = result.toolCall.arguments as {
    assunto?: string;
    paragrafos?: string[];
  };
  if (!assunto || !Array.isArray(paragrafos) || paragrafos.length === 0) return null;

  const validParagraphs = paragrafos.filter((p): p is string => typeof p === 'string' && p.trim().length > 0);
  if (validParagraphs.length === 0) return null;

  return { subject: assunto, html: renderLeadEmail(validParagraphs) };
}
