'use client';

import { trackEvent } from '@/lib/analytics';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-800/80 bg-ink-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="text-sm font-semibold tracking-tight text-ink-50">
          Seu Vendedor<span className="text-brand-400">IA</span>
        </a>
        <a
          href="#agente"
          onClick={() => trackEvent('hero_cta_click', { source: 'header' })}
          className="rounded-full bg-ink-50 px-4 py-2 text-sm font-medium text-ink-950 transition hover:bg-white"
        >
          Converse com o agente
        </a>
      </div>
    </header>
  );
}
