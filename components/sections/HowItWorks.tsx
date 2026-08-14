const STEPS = [
  'Lead chega',
  'Agente entende',
  'Qualifica',
  'Consulta informações',
  'Responde',
  'Faz follow-up',
  'Identifica oportunidade',
  'Entrega ao vendedor',
];

export function HowItWorks() {
  return (
    <section className="border-t border-ink-800 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-medium tracking-tight text-ink-50 sm:text-4xl">
          Como funciona
        </h2>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          {STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <span className="rounded-full border border-ink-700 bg-ink-900 px-4 py-2 text-sm text-ink-200">
                {step}
              </span>
              {i < STEPS.length - 1 && (
                <span aria-hidden="true" className="text-ink-600">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-ink-300">
          O agente trabalha junto dos sistemas que sua empresa já utiliza — sem necessidade de
          substituir seu CRM ou ERP.
        </p>
      </div>
    </section>
  );
}
