'use client';

import { trackEvent } from '@/lib/analytics';

interface FinalCtaProps {
  headline?: string;
}

const DEFAULT_HEADLINE = 'Veja como um vendedor de IA funcionaria na sua empresa.';

export function FinalCta({ headline = DEFAULT_HEADLINE }: FinalCtaProps) {
  return (
    <section id="cta-final" className="scroll-mt-24 border-t border-ink-800 px-6 py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-medium tracking-tight text-ink-50 sm:text-4xl">{headline}</h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#agente"
            onClick={() => trackEvent('hero_cta_click', { source: 'final_cta_primary' })}
            className="rounded-full bg-brand-500 px-6 py-3 text-sm font-medium text-white shadow-soft transition hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
          >
            Converse com o agente
          </a>
          <a
            href="#agente"
            onClick={() => trackEvent('demo_requested', { source: 'final_cta_secondary' })}
            className="rounded-full border border-ink-700 px-6 py-3 text-sm font-medium text-ink-100 transition hover:border-ink-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
          >
            Quero uma demonstração personalizada
          </a>
        </div>
      </div>
    </section>
  );
}
