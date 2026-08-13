import { NextResponse } from 'next/server';
import { callOpenRouter, type ChatMessage } from '@/lib/server/openrouter';
import { buildAgentSystemPrompt } from '@/lib/server/agentPrompt';
import { getSegmentBySlug } from '@/lib/segments';
import { looksLikeInjectionAttempt } from '@/lib/server/inputGuard';
import { SAVE_LEAD_TOOL, type LeadData } from '@/lib/server/leadTool';
import { saveLead, markLeadEmailSent } from '@/lib/server/firestore';
import { draftLeadEmail } from '@/lib/server/draftLeadEmail';
import { sendEmail } from '@/lib/server/brevo';
import { isRateLimited } from '@/lib/server/rateLimit';

const MAX_HISTORY_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

function getClientIp(req: Request): string {
  // Na Vercel, x-real-ip e x-vercel-forwarded-for são preenchidos pelo proxy da própria
  // plataforma e NÃO podem ser forjados pelo cliente (o proxy sobrescreve qualquer valor
  // enviado na requisição original). x-forwarded-for genérico, por outro lado, pode conter
  // qualquer coisa que o cliente mandar — não é usado para identificar o IP real.
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  const vercelForwardedFor = req.headers.get('x-vercel-forwarded-for');
  if (vercelForwardedFor) return vercelForwardedFor.split(',')[0].trim();

  return 'unknown';
}

async function handleLeadCapture(
  lead: LeadData,
  conversation: ChatMessage[],
  ip: string,
): Promise<void> {
  const leadId = await saveLead(lead, { ip, conversation });

  if (!lead.email || !EMAIL_REGEX.test(lead.email)) {
    console.warn(`[lead ${leadId}] sem e-mail válido informado, follow-up automático não enviado.`);
    return;
  }

  const drafted = await draftLeadEmail(lead, conversation);
  if (!drafted) {
    console.error(`[lead ${leadId}] não foi possível gerar o e-mail de follow-up.`);
    return;
  }

  await sendEmail({ to: lead.email, subject: drafted.subject, html: drafted.html });
  await markLeadEmailSent(leadId, drafted.subject, drafted.html);
}

export async function POST(req: Request) {
  try {
    const origin = req.headers.get('origin');
    if (origin && allowedOrigins.length > 0 && !allowedOrigins.includes(origin)) {
      return NextResponse.json({ error: 'Não foi possível processar sua requisição.' }, { status: 403 });
    }

    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Muitas mensagens em pouco tempo. Aguarde um instante e tente novamente.' },
        { status: 429 },
      );
    }

    const body = (await req.json().catch(() => null)) as
      | { messages?: ChatMessage[]; segmentSlug?: string }
      | null;
    const messages = body?.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'É necessário enviar um array "messages" não vazio.' }, { status: 400 });
    }

    const isValid = messages.every(
      (m) =>
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.length > 0 &&
        m.content.length <= MAX_MESSAGE_LENGTH,
    );

    if (!isValid) {
      return NextResponse.json({ error: 'Formato de mensagem inválido.' }, { status: 400 });
    }

    const trimmedHistory = messages.slice(-MAX_HISTORY_MESSAGES);

    const lastUserMessage = [...trimmedHistory].reverse().find((m) => m.role === 'user');
    if (lastUserMessage && looksLikeInjectionAttempt(lastUserMessage.content)) {
      console.warn('[inputGuard] possível tentativa de injection detectada, ip:', ip);
    }

    const segment = body?.segmentSlug ? getSegmentBySlug(body.segmentSlug) : undefined;

    const fullConversation: ChatMessage[] = [
      { role: 'system', content: buildAgentSystemPrompt(segment?.chatContext) },
      ...trimmedHistory,
    ];

    const result = await callOpenRouter(fullConversation, [SAVE_LEAD_TOOL]);

    if (result.toolCall?.name === 'salvar_lead') {
      const lead = result.toolCall.arguments as unknown as LeadData;
      if (lead?.nome && typeof lead.nome === 'string') {
        handleLeadCapture(lead, trimmedHistory, ip).catch((captureError) => {
          console.error('Erro no pós-processamento do lead:', captureError);
        });
      }
    }

    const reply =
      result.reply ||
      'Perfeito, obrigado! Anotei seus dados — nossa equipe vai entrar em contato para montar uma demonstração personalizada.';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Erro no /api/chat:', error);
    return NextResponse.json({ error: 'Não foi possível obter resposta do agente agora.' }, { status: 500 });
  }
}
