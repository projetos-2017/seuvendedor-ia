interface Step {
  number: string;
  title: string;
  example: string;
}

const DEFAULT_STEPS: Step[] = [
  {
    number: '1',
    title: 'Responde',
    example: '"Olá! Como posso ajudar?"',
  },
  {
    number: '2',
    title: 'Entende',
    example: '"Me conta um pouco sobre o que você precisa."',
  },
  {
    number: '3',
    title: 'Qualifica',
    example: '"Quantos pontos/locais/unidades estão envolvidos?"',
  },
  {
    number: '4',
    title: 'Consulta',
    example: 'Busca produtos, serviços e informações da sua empresa.',
  },
  {
    number: '5',
    title: 'Executa',
    example: 'Agenda, registra e atualiza o que for necessário.',
  },
  {
    number: '6',
    title: 'Faz follow-up',
    example: 'Não deixa o orçamento morrer sem resposta.',
  },
  {
    number: '7',
    title: 'Entrega ao vendedor',
    example: 'Com todo o histórico e contexto da conversa.',
  },
];

interface WhatItDoesProps {
  headline?: string;
  steps?: Step[];
}

const DEFAULT_HEADLINE = 'O que exatamente o agente faz quando um lead chega';

export function WhatItDoes({ headline = DEFAULT_HEADLINE, steps = DEFAULT_STEPS }: WhatItDoesProps) {
  return (
    <section className="border-t border-ink-800 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-medium tracking-tight text-ink-50 sm:text-4xl">{headline}</h2>
        <div className="mt-10 space-y-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex items-start gap-4 rounded-xl border border-ink-800 bg-ink-900 p-5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-medium text-white">
                {step.number}
              </span>
              <div>
                <p className="text-sm font-medium text-ink-50">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-400">{step.example}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
