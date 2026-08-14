const BEFORE = [
  'WhatsApp desorganizado',
  'Leads esquecidos',
  'Follow-up manual',
  'Planilhas',
  'Vendedores sobrecarregados',
  'Atendimento limitado ao horário comercial',
];

const AFTER = [
  'Atendimento imediato',
  'Qualificação automática',
  'Follow-up contínuo',
  'Histórico centralizado',
  'Priorização comercial',
  'Encaminhamento direto para o vendedor',
];

export function BeforeAfter() {
  return (
    <section className="border-t border-ink-800 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-medium tracking-tight text-ink-50 sm:text-4xl">
          Antes e depois
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-ink-800 bg-ink-900 p-8">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Antes</p>
            <ul className="mt-5 space-y-3">
              {BEFORE.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-ink-400">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ink-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-brand-400/30 bg-brand-500/5 p-8">
            <p className="text-xs font-medium uppercase tracking-wide text-brand-600">Depois</p>
            <ul className="mt-5 space-y-3">
              {AFTER.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-ink-100">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-400" />
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
