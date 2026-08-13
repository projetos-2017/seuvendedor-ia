const FIT = ['Recebem leads', 'Vendem por orçamento', 'Possuem equipe comercial', 'Usam WhatsApp', 'Têm atendimento repetitivo', 'Precisam acompanhar oportunidades'];

const NOT_FIT = ['Recebem poucos leads', 'Não possuem processo comercial', 'Não têm demanda de atendimento', 'Procuram apenas um FAQ automatizado'];

export function AudienceFit() {
  return (
    <section className="border-t border-ink-800 px-6 py-24">
      <div className="mx-auto max-w-5xl grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-brand-400/30 bg-brand-500/5 p-8">
          <h3 className="text-lg font-medium text-ink-50">Para quem é</h3>
          <ul className="mt-5 space-y-3">
            {FIT.map((item) => (
              <li key={item} className="text-sm text-ink-100">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-ink-800 p-8">
          <h3 className="text-lg font-medium text-ink-400">Para quem não é</h3>
          <ul className="mt-5 space-y-3">
            {NOT_FIT.map((item) => (
              <li key={item} className="text-sm text-ink-500">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
