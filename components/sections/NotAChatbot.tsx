const CHATBOT = ['Menus fixos', 'Respostas prontas', 'Fluxo rígido', 'Pouco contexto'];

const AGENT = [
  'Entende contexto',
  'Conversa naturalmente',
  'Consulta informações',
  'Pode executar ações',
  'Acompanha oportunidades',
  'Utiliza ferramentas',
  'Encaminha para humanos',
  'Segue processos comerciais',
];

export function NotAChatbot() {
  return (
    <section className="border-t border-ink-800 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-medium tracking-tight text-ink-50 sm:text-4xl">
          Não é mais um chatbot de perguntas e respostas.
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-ink-800 p-8">
            <p className="text-sm font-medium text-ink-500">Chatbot tradicional</p>
            <ul className="mt-5 space-y-3">
              {CHATBOT.map((item) => (
                <li key={item} className="text-sm text-ink-500">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-brand-400/30 bg-brand-500/5 p-8">
            <p className="text-sm font-medium text-brand-300">Agente comercial</p>
            <ul className="mt-5 space-y-3">
              {AGENT.map((item) => (
                <li key={item} className="text-sm text-ink-100">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
