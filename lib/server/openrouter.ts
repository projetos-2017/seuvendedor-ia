export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ToolCall {
  name: string;
  arguments: Record<string, unknown>;
}

export interface OpenRouterResult {
  reply: string;
  toolCall: ToolCall | null;
}

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function callOpenRouter(
  messages: ChatMessage[],
  tools?: unknown[],
): Promise<OpenRouterResult> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || 'anthropic/claude-sonnet-4.5';

  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY não configurada no ambiente do servidor.');
  }

  const response = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.APP_URL || 'http://localhost:3000',
      'X-Title': 'Seu Vendedor IA',
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.6,
      max_tokens: 400,
      ...(tools && tools.length > 0 ? { tools } : {}),
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenRouter respondeu ${response.status}: ${errorBody}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{
      message?: {
        content?: string | null;
        tool_calls?: Array<{
          function?: { name?: string; arguments?: string };
        }>;
      };
    }>;
  };

  const message = data?.choices?.[0]?.message;
  const content = message?.content;
  const rawToolCall = message?.tool_calls?.[0]?.function;

  let toolCall: ToolCall | null = null;
  if (rawToolCall?.name) {
    try {
      toolCall = {
        name: rawToolCall.name,
        arguments: rawToolCall.arguments ? JSON.parse(rawToolCall.arguments) : {},
      };
    } catch {
      toolCall = null;
    }
  }

  if (typeof content !== 'string' && !toolCall) {
    throw new Error('Resposta inesperada da OpenRouter.');
  }

  return { reply: content ?? '', toolCall };
}
