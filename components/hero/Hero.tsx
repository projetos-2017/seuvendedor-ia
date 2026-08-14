'use client';

import { ChatWidget } from '../chat/ChatWidget';
import { trackEvent } from '@/lib/analytics';
import type { Segment } from '@/lib/segments';

interface HeroProps {
  badge?: string;
  headline?: string;
  subheadline?: string;
  reassurance?: string;
  segment?: Segment;
}

const DEFAULT_BADGE = 'Agente comercial de IA para empresas B2B';
const DEFAULT_HEADLINE = 'Seu próximo vendedor pode começar agora.';
const DEFAULT_SUBHEADLINE =
  'Ele atende seus leads, qualifica oportunidades e faz follow-up automaticamente — sem substituir sua equipe comercial.';
const DEFAULT_REASSURANCE = 'Veja funcionando antes de contratar.';

export function Hero({
  badge = DEFAULT_BADGE,
  headline = DEFAULT_HEADLINE,
  subheadline = DEFAULT_SUBHEADLINE,
  reassurance = DEFAULT_REASSURANCE,
  segment,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--color-brand-600)_0%,_transparent_60%)] opacity-20"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-900 px-3 py-1 text-xs font-medium text-ink-300">
            {badge}
          </span>
          <h1 className="mt-6 text-4xl font-medium tracking-tight text-ink-50 sm:text-5xl lg:text-6xl">
            {headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300">{subheadline}</p>
          <p className="mt-3 text-base font-medium text-brand-600">{reassurance}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#agente"
              onClick={() => trackEvent('hero_cta_click', { source: 'hero_primary' })}
              className="rounded-full bg-brand-500 px-6 py-3 text-sm font-medium text-white shadow-soft transition hover:bg-brand-600"
            >
              Converse com o agente
            </a>
            <a
              href="#cta-final"
              onClick={() => trackEvent('hero_cta_click', { source: 'hero_secondary' })}
              className="rounded-full border border-ink-700 px-6 py-3 text-sm font-medium text-ink-100 transition hover:border-ink-500"
            >
              Quero um agente para minha empresa
            </a>
          </div>
          <p className="mt-4 text-sm text-ink-500">Teste agora. Sem cadastro.</p>
        </div>

        <div id="agente" className="flex justify-center scroll-mt-24 lg:justify-end">
          <ChatWidget segment={segment} />
        </div>
      </div>
    </section>
  );
}
