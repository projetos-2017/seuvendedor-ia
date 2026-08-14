'use client';

import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

export function Header() {
  const pathname = usePathname();
  // Só a home e as páginas de segmento têm o Hero com o elemento #agente. Em qualquer outra
  // rota (ex: /blog), a âncora relativa não teria efeito, então volta para a home.
  const hasAgentAnchor = pathname === '/' || pathname.startsWith('/segmentos/');
  const agentHref = hasAgentAnchor ? '#agente' : '/#agente';

  return (
    <header className="sticky top-0 z-40 border-b border-ink-800/80 bg-ink-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="text-sm font-semibold tracking-tight text-ink-50">
          Seu Vendedor<span className="text-brand-600">IA</span>
        </a>
        <nav className="flex items-center gap-6">
          <a href="/blog" className="text-sm font-medium text-ink-300 transition hover:text-ink-50">
            Blog
          </a>
          <a
            href={agentHref}
            onClick={() => trackEvent('hero_cta_click', { source: 'header' })}
            className="rounded-full bg-ink-50 px-4 py-2 text-sm font-medium text-ink-950 transition hover:bg-white"
          >
            Converse com o agente
          </a>
        </nav>
      </div>
    </header>
  );
}
