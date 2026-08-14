const CONTROLS = ['Aprovação humana', 'Regras e permissões', 'Histórico completo', 'Logs', 'Transferência para humano', 'Interrupção de automações'];

export function HumanControl() {
  return (
    <section className="border-t border-ink-800 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-medium tracking-tight text-ink-50 sm:text-4xl">
          IA trabalha. Sua equipe continua no controle.
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {CONTROLS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 rounded-xl border border-ink-800 bg-ink-900 px-5 py-4 text-sm text-ink-200"
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
