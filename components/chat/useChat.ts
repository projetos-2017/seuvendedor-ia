'use client';

import { useCallback, useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import type { Segment } from '@/lib/segments';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const DEFAULT_INITIAL_MESSAGE =
  'Antes de te mostrar como eu funciono, me diga: qual é o segmento da sua empresa?';

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useChat(segment?: Segment) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'initial',
      role: 'assistant',
      content: segment?.chatInitialMessage ?? DEFAULT_INITIAL_MESSAGE,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messageCount, setMessageCount] = useState(0);

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || isLoading) return;

      setError(null);
      const userMessage: ChatMessage = { id: createId(), role: 'user', content: trimmed };
      const nextMessages = [...messages, userMessage];
      setMessages(nextMessages);
      setIsLoading(true);

      const newCount = messageCount + 1;
      setMessageCount(newCount);
      trackEvent('agent_message', { count: newCount, segment: segment?.slug });

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
            segmentSlug: segment?.slug,
          }),
        });

        if (!response.ok) {
          throw new Error(`Falha na resposta (${response.status})`);
        }

        const data = (await response.json()) as { reply: string };
        setMessages((prev) => [...prev, { id: createId(), role: 'assistant', content: data.reply }]);

        if (newCount >= 5) {
          trackEvent('agent_completed', { count: newCount, segment: segment?.slug });
        }
      } catch (err) {
        console.error(err);
        setError('Não foi possível falar com o agente agora. Tente novamente em instantes.');
      } finally {
        setIsLoading(false);
      }
    },
    [messages, messageCount, isLoading, segment],
  );

  return { messages, isLoading, error, sendMessage };
}
