export interface Segment {
  slug: string;
  name: string;
  shortName: string;
  headline: string;
  subheadline: string;
  metaTitle: string;
  metaDescription: string;
  chatContext: string;
  chatInitialMessage: string;
  painPoints: string[];
}

export const SEGMENTS: Segment[] = [
  {
    slug: 'seguranca-eletronica',
    name: 'Segurança Eletrônica',
    shortName: 'Segurança Eletrônica',
    headline: 'Seu próximo vendedor de segurança eletrônica pode começar agora.',
    subheadline:
      'Um agente de IA que atende leads de CFTV, alarmes e monitoramento, qualifica oportunidades e faz follow-up automaticamente.',
    metaTitle: 'Agente de IA para Segurança Eletrônica',
    metaDescription:
      'Automatize o atendimento comercial da sua empresa de segurança eletrônica: CFTV, alarmes, monitoramento e instalação. Agente de IA que qualifica leads e faz follow-up.',
    chatContext: 'segurança eletrônica (CFTV, alarmes, monitoramento, instalação, manutenção de contratos)',
    chatInitialMessage:
      'Vi que vocês trabalham com segurança eletrônica. Aproximadamente quantos leads ou contatos comerciais vocês recebem por mês?',
    painPoints: [
      'Pedido de orçamento de CFTV chega e demora para ser respondido.',
      'Cliente pergunta sobre monitoramento fora do horário comercial.',
      'Vendedor esquece de fazer follow-up depois da visita técnica.',
      'Leads de diferentes canais (site, WhatsApp, indicação) ficam espalhados.',
      'Renovação de contrato de monitoramento não é acompanhada de perto.',
      'Equipe perde tempo explicando os mesmos planos repetidamente.',
    ],
  },
  {
    slug: 'tratamento-de-agua',
    name: 'Tratamento de Água',
    shortName: 'Tratamento de Água',
    headline: 'Seu próximo vendedor de tratamento de água pode começar agora.',
    subheadline:
      'Um agente de IA que atende leads de projetos e equipamentos, qualifica oportunidades e faz follow-up automaticamente.',
    metaTitle: 'Agente de IA para Tratamento de Água',
    metaDescription:
      'Automatize o atendimento comercial da sua empresa de tratamento de água: projetos, equipamentos, manutenção e contratos. Agente de IA que qualifica leads e faz follow-up.',
    chatContext: 'tratamento de água (projetos, equipamentos, manutenção, renovação de contratos)',
    chatInitialMessage:
      'Vi que vocês trabalham com tratamento de água. Aproximadamente quantos leads ou contatos comerciais vocês recebem por mês?',
    painPoints: [
      'Orçamento de projeto é enviado e ninguém faz follow-up.',
      'Cliente pergunta sobre manutenção fora do horário comercial.',
      'Renovação de contrato não é acompanhada de perto.',
      'Leads técnicos ficam sem resposta enquanto a equipe está em campo.',
      'Vendedor esquece de retornar depois da visita técnica.',
      'Equipe perde tempo respondendo as mesmas dúvidas técnicas.',
    ],
  },
  {
    slug: 'pmoc-climatizacao',
    name: 'PMOC e Climatização',
    shortName: 'PMOC / Climatização',
    headline: 'Seu próximo vendedor de PMOC e climatização pode começar agora.',
    subheadline:
      'Um agente de IA que atende leads de manutenção preventiva e contratos recorrentes, qualifica oportunidades e faz follow-up automaticamente.',
    metaTitle: 'Agente de IA para PMOC e Climatização',
    metaDescription:
      'Automatize o atendimento comercial da sua empresa de PMOC e climatização: manutenção preventiva, contratos recorrentes e documentação. Agente de IA que qualifica leads.',
    chatContext: 'PMOC e climatização (manutenção preventiva, contratos recorrentes, técnicos em campo, documentação obrigatória)',
    chatInitialMessage:
      'Vi que vocês trabalham com PMOC e climatização. Aproximadamente quantos leads ou contatos comerciais vocês recebem por mês?',
    painPoints: [
      'Contrato de manutenção preventiva vence e ninguém entra em contato para renovar.',
      'Pedido de orçamento chega e demora para ser respondido.',
      'Técnicos em campo não têm tempo de acompanhar novos leads.',
      'Documentação obrigatória gera dúvidas repetitivas dos clientes.',
      'Vendedor esquece de fazer follow-up depois da visita técnica.',
      'Leads ficam espalhados entre WhatsApp, e-mail e planilhas.',
    ],
  },
  {
    slug: 'impermeabilizacao',
    name: 'Impermeabilização e Serviços Técnicos',
    shortName: 'Impermeabilização',
    headline: 'Seu próximo vendedor de impermeabilização pode começar agora.',
    subheadline:
      'Um agente de IA que atende leads de visita técnica e orçamento, qualifica oportunidades e faz follow-up automaticamente.',
    metaTitle: 'Agente de IA para Impermeabilização e Serviços Técnicos',
    metaDescription:
      'Automatize o atendimento comercial da sua empresa de impermeabilização e serviços técnicos: visita técnica, orçamento e prazo de execução. Agente de IA que qualifica leads.',
    chatContext: 'impermeabilização e serviços técnicos (visita técnica, orçamento, prazo de execução)',
    chatInitialMessage:
      'Vi que vocês trabalham com impermeabilização e serviços técnicos. Aproximadamente quantos leads ou contatos comerciais vocês recebem por mês?',
    painPoints: [
      'Pedido de orçamento chega e demora para ser respondido.',
      'Cliente pergunta sobre prazo de execução fora do horário comercial.',
      'Vendedor esquece de fazer follow-up depois da visita técnica.',
      'Leads de diferentes canais ficam espalhados e sem prioridade clara.',
      'Equipe perde tempo respondendo as mesmas perguntas sobre o serviço.',
      'Orçamentos parados não são retomados no momento certo.',
    ],
  },
  {
    slug: 'industria-distribuidores',
    name: 'Indústria e Distribuidores',
    shortName: 'Indústria e Distribuidores',
    headline: 'Seu próximo vendedor para indústria e distribuidores pode começar agora.',
    subheadline:
      'Um agente de IA que atende pedidos recorrentes e relacionamento com compradores, qualifica oportunidades e faz follow-up automaticamente.',
    metaTitle: 'Agente de IA para Indústria e Distribuidores',
    metaDescription:
      'Automatize o atendimento comercial da sua indústria ou distribuidora: pedidos recorrentes, relacionamento com compradores e prazos. Agente de IA que qualifica leads.',
    chatContext: 'indústria e distribuidores (pedidos recorrentes, relacionamento com compradores, prazos)',
    chatInitialMessage:
      'Vi que vocês atuam na indústria/distribuição. Aproximadamente quantos leads ou contatos comerciais vocês recebem por mês?',
    painPoints: [
      'Pedido recorrente demora para ser confirmado.',
      'Comprador pergunta sobre prazo fora do horário comercial.',
      'Vendedor esquece de fazer follow-up com compradores recorrentes.',
      'Leads de novos compradores ficam sem resposta imediata.',
      'Equipe perde tempo respondendo as mesmas dúvidas sobre catálogo e prazos.',
      'Relacionamento com compradores recorrentes não é acompanhado de perto.',
    ],
  },
];

export function getSegmentBySlug(slug: string): Segment | undefined {
  return SEGMENTS.find((s) => s.slug === slug);
}
