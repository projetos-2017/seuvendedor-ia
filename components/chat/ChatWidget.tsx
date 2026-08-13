'use client';

import { useEffect, useRef, useState } from 'react';
import { useChat } from './useChat';
import { trackEvent } from '@/lib/analytics';
import type { Segment } from '@/lib/segments';

interface ChatWidgetProps {
  segment?: Segment;
}

export function ChatWidget({ segment }: ChatWidgetProps) {
  const { messages, isLoading, error, sendMessage } = useChat(segment);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasOpened = useRef(false);

  useEffect(() => {
    if (!hasOpened.current) {
      hasOpened.current = true;
      trackEvent('agent_open', { segment: segment?.slug });
    }
  }, [segment]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  }

  return (
    <div className="flex w-full max-w-md flex-col overflow-hidden rounded-2xl border border-ink-700 bg-ink-900 shadow-lifted">
      <div className="flex items-center gap-3 border-b border-ink-700 bg-ink-800 px-4 py-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-500 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal-500" />
        </span>
        <div>
          <p className="text-sm font-medium text-ink-50">Vendedor IA</p>
          <p className="text-xs text-ink-400">Online agora · responde em segundos</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex h-96 flex-col gap-3 overflow-y-auto px-4 py-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
              message.role === 'user'
                ? 'ml-auto bg-brand-500 text-white'
                : 'mr-auto bg-ink-800 text-ink-100'
            }`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="mr-auto flex items-center gap-1 rounded-xl bg-ink-800 px-3.5 py-2.5">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-400 [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-400 [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-400" />
          </div>
        )}
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-ink-700 bg-ink-800 p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua resposta..."
          className="flex-1 rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-sm text-ink-50 placeholder:text-ink-400 outline-none focus:border-brand-400"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
