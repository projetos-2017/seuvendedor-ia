const DEFAULT_PAIN_POINTS = [
  'Lead chega no WhatsApp e demora para ser atendido.',
  'Vendedor está ocupado com outro atendimento.',
  'Orçamento é enviado e ninguém faz follow-up.',
  'Cliente pergunta algo fora do horário comercial.',
  'Vendedor esquece de retornar.',
  'Leads ficam espalhados em vários canais.',
  'Equipe perde tempo respondendo perguntas repetitivas.',
];

interface PainSectionProps {
  headline?: string;
  items?: string[];
}

const DEFAULT_HEADLINE = 'Quantas oportunidades sua equipe perde todos os meses?';

export function PainSection({ headline = DEFAULT_HEADLINE, items = DEFAULT_PAIN_POINTS }: PainSectionProps) {
  return (
    <section className="border-t border-ink-800 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-medium tracking-tight text-ink-50 sm:text-4xl">{headline}</h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {items.map((point) => (
            <li
              key={point}
              className="rounded-xl border border-ink-800 bg-ink-900 px-5 py-4 text-sm leading-relaxed text-ink-300"
            >
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
