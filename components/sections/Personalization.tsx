const ITEMS = [
  'Produtos',
  'Serviços',
  'Preços',
  'Catálogo',
  'Diferenciais',
  'Perguntas frequentes',
  'Regras comerciais',
  'Objeções',
  'Critérios de qualificação',
  'Processo de vendas',
  'Documentos técnicos',
  'Informações operacionais',
];

export function Personalization() {
  return (
    <section className="border-t border-ink-800 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-medium tracking-tight text-ink-50 sm:text-4xl">
          Seu agente aprende o seu processo comercial.
        </h2>
        <p className="mt-4 max-w-2xl text-ink-300">
          Não é uma IA genérica. O agente é configurado para trabalhar dentro da realidade da sua
          empresa.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          {ITEMS.map((item) => (
            <span
              key={item}
              className="rounded-full border border-ink-700 bg-ink-900 px-4 py-2 text-sm text-ink-200"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
