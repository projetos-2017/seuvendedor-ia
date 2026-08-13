export const DRAFT_EMAIL_TOOL = {
  type: 'function' as const,
  function: {
    name: 'redigir_email',
    description: 'Redige o conteúdo do e-mail de follow-up comercial a ser enviado ao lead após a conversa.',
    parameters: {
      type: 'object',
      properties: {
        assunto: { type: 'string', description: 'Assunto do e-mail, curto e específico ao contexto do lead.' },
        paragrafos: {
          type: 'array',
          items: { type: 'string' },
          description:
            'Parágrafos do e-mail em texto puro (sem HTML, sem markdown). Cada item do array é um parágrafo. Devem recapitular o diagnóstico da conversa, reforçar o próximo passo (demonstração personalizada) e ter tom consultivo, não robótico.',
        },
      },
      required: ['assunto', 'paragrafos'],
      additionalProperties: false,
    },
  },
};

export const EMAIL_WRITER_SYSTEM_PROMPT = `Você escreve o CONTEÚDO de e-mails de follow-up comercial em nome da "Seu Vendedor IA" para leads que acabaram de conversar com o agente de demonstração no site. O visual do e-mail (cabeçalho, cores, rodapé) já é aplicado automaticamente por um template — você só escreve o texto.

Os parágrafos devem:
- Ser em português do Brasil, tom consultivo e caloroso, mas profissional — nunca robótico ou genérico.
- Recapitular em 1-2 frases o que foi entendido sobre o negócio do lead e o problema identificado na conversa.
- Reforçar a recomendação/diagnóstico já dado durante o chat.
- Indicar o próximo passo: a equipe vai entrar em contato para uma demonstração personalizada usando o processo real da empresa dele.
- Ser curtos (máximo 4 parágrafos no total).
- Nunca prometer resultados numéricos garantidos.
- Texto puro, sem HTML e sem markdown (sem **, #, <p>, etc).
- Não incluir saudação de abertura tipo "Prezado(a)" nem assinatura de fechamento — o template já cuida disso. Comece direto pelo conteúdo, usando o nome do lead de forma natural no primeiro parágrafo.

Você DEVE chamar a ferramenta "redigir_email" com o assunto e o array de parágrafos. Não escreva a resposta como texto solto — sempre use a ferramenta.`;
