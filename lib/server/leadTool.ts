export const SAVE_LEAD_TOOL = {
  type: 'function' as const,
  function: {
    name: 'salvar_lead',
    description:
      'Salva os dados de um lead que forneceu voluntariamente nome e contato (e-mail ou WhatsApp) durante a conversa.',
    parameters: {
      type: 'object',
      properties: {
        nome: { type: 'string', description: 'Nome informado pelo visitante.' },
        email: { type: 'string', description: 'E-mail informado pelo visitante, se houver.' },
        whatsapp: { type: 'string', description: 'Telefone/WhatsApp informado pelo visitante, se houver.' },
        segmento: { type: 'string', description: 'Segmento/tipo de negócio identificado na conversa.' },
        leadsPorMes: { type: 'string', description: 'Volume aproximado de leads/mês mencionado, se houver.' },
        diagnostico: {
          type: 'string',
          description: 'Resumo curto (1-2 frases) do diagnóstico e recomendação feitos ao visitante.',
        },
      },
      required: ['nome'],
      additionalProperties: false,
    },
  },
};

export interface LeadData {
  nome: string;
  email?: string;
  whatsapp?: string;
  segmento?: string;
  leadsPorMes?: string;
  diagnostico?: string;
}
