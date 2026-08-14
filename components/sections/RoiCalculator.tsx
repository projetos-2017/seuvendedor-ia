'use client';

import { useMemo, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

function parseNumber(value: string): number {
  const n = Number(value.replace(',', '.'));
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

export function RoiCalculator() {
  const [leadsPerMonth, setLeadsPerMonth] = useState('150');
  const [followedUpRate, setFollowedUpRate] = useState('40');
  const [averageTicket, setAverageTicket] = useState('2500');
  const [conversionRate, setConversionRate] = useState('12');
  const [used, setUsed] = useState(false);

  const estimate = useMemo(() => {
    const leads = parseNumber(leadsPerMonth);
    const followedUp = parseNumber(followedUpRate) / 100;
    const ticket = parseNumber(averageTicket);
    const conversion = parseNumber(conversionRate) / 100;

    const unfollowedLeads = Math.round(leads * (1 - followedUp));
    const potentialAdditionalSales = unfollowedLeads * conversion;
    const potentialAdditionalRevenue = potentialAdditionalSales * ticket;

    return { unfollowedLeads, potentialAdditionalSales, potentialAdditionalRevenue };
  }, [leadsPerMonth, followedUpRate, averageTicket, conversionRate]);

  function handleChange(setter: (v: string) => void) {
    return (value: string) => {
      setter(value);
      if (!used) {
        setUsed(true);
        trackEvent('roi_calculator_used');
      }
    };
  }

  return (
    <section className="border-t border-ink-800 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-medium tracking-tight text-ink-50 sm:text-4xl">
          Veja quantas oportunidades podem estar sem acompanhamento
        </h2>
        <p className="mt-4 max-w-2xl text-ink-300">
          Um cálculo simples com base nos seus números. Os resultados reais variam conforme o seu
          processo comercial.
        </p>

        <div className="mt-10 grid gap-8 rounded-2xl border border-ink-800 bg-ink-900 p-8 lg:grid-cols-2">
          <div className="space-y-5">
            <Field
              label="Leads por mês"
              value={leadsPerMonth}
              onChange={handleChange(setLeadsPerMonth)}
            />
            <Field
              label="% de leads acompanhados hoje"
              value={followedUpRate}
              onChange={handleChange(setFollowedUpRate)}
            />
            <Field
              label="Ticket médio (R$)"
              value={averageTicket}
              onChange={handleChange(setAverageTicket)}
            />
            <Field
              label="Taxa de conversão atual (%)"
              value={conversionRate}
              onChange={handleChange(setConversionRate)}
            />
          </div>

          <div className="flex flex-col justify-center rounded-xl bg-ink-950 p-8 text-center shadow-soft">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-500">
              Oportunidades sem acompanhamento
            </p>
            <p className="mt-3 text-3xl font-medium text-brand-600">
              ≈ {estimate.unfollowedLeads} leads/mês
            </p>
            <p className="mt-2 text-sm text-ink-400">
              Essas são as oportunidades que seu agente pode ajudar sua equipe a acompanhar.
            </p>

            <div className="mt-6 border-t border-ink-800 pt-6">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-500">
                Estimativa de impacto financeiro
              </p>
              <p className="mt-2 text-lg font-medium text-ink-100">
                +{Math.round(estimate.potentialAdditionalSales)} vendas/mês ·{' '}
                {formatCurrency(estimate.potentialAdditionalRevenue)}
              </p>
            </div>

            <p className="mt-6 text-xs text-ink-600">
              Simulação baseada nos leads não acompanhados hoje. Não é uma garantia de resultado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm text-ink-300">{label}</span>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-ink-700 bg-ink-950 px-3 py-2 text-sm text-ink-100 outline-none focus:border-brand-400"
      />
    </label>
  );
}
