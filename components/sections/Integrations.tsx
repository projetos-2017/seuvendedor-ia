const INTEGRATIONS = ['WhatsApp', 'CRM', 'ERP', 'E-mail', 'Google Calendar', 'APIs', 'Banco de dados', 'Ferramentas internas'];

export function Integrations() {
  return (
    <section className="border-t border-ink-800 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-medium tracking-tight text-ink-50 sm:text-4xl">
          Conectado ao que sua empresa já usa
        </h2>
        <p className="mt-4 max-w-2xl text-ink-300">
          O agente pode ser conectado ao stack tecnológico existente da empresa.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {INTEGRATIONS.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-ink-800 bg-ink-900 px-4 py-6 text-center text-sm text-ink-300"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
