import { buildFaqSchema, type FaqItem } from '@/lib/seo/faqSchema';

const DEFAULT_FAQ: FaqItem[] = [
  {
    question: 'Quanto custa implementar um agente de IA da Seu Vendedor IA?',
    answer:
      'A implementação é personalizada de acordo com o processo comercial de cada empresa — volume de leads, canais utilizados e complexidade de qualificação. O próximo passo natural é uma demonstração com a equipe para entender o escopo e apresentar uma proposta.',
  },
  {
    question: 'Quanto tempo leva para colocar o agente em funcionamento?',
    answer:
      'O prazo depende do escopo definido na demonstração — quantos canais serão conectados, quanta informação sobre produtos e processos precisa ser configurada, e se há integração com sistemas já existentes.',
  },
  {
    question: 'O agente funciona no WhatsApp?',
    answer:
      'Sim, o WhatsApp é um dos canais que o agente pode atender, além de outros pontos de contato como site, e-mail e formulários.',
  },
  {
    question: 'Preciso trocar de CRM ou ERP para usar o agente?',
    answer:
      'Não. O agente foi pensado para trabalhar junto dos sistemas que sua empresa já utiliza, sem necessidade de substituir CRM, ERP ou outras ferramentas internas.',
  },
  {
    question: 'O agente substitui minha equipe de vendas?',
    answer:
      'Não. O agente cuida do atendimento inicial, qualificação e follow-up — quem negocia, decide e fecha continua sendo o seu time. A IA trabalha, mas sua equipe continua no controle, com aprovação humana, histórico e possibilidade de transferência a qualquer momento.',
  },
  {
    question: 'Como funciona a demonstração antes de contratar?',
    answer:
      'Você pode conversar agora mesmo com o agente de demonstração nesta página, sem cadastro. Depois desse primeiro contato, a equipe pode montar uma demonstração personalizada usando o processo real da sua empresa.',
  },
];

interface FaqProps {
  items?: FaqItem[];
}

export function Faq({ items = DEFAULT_FAQ }: FaqProps) {
  const schema = buildFaqSchema(items);

  return (
    <section className="border-t border-ink-800 px-6 py-24">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-medium tracking-tight text-ink-50 sm:text-4xl">
          Perguntas frequentes
        </h2>
        <div className="mt-10 space-y-6">
          {items.map((item) => (
            <div key={item.question} className="rounded-xl border border-ink-800 bg-ink-900 p-6">
              <h3 className="text-base font-medium text-ink-50">{item.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
