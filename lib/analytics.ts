export type AnalyticsEvent =
  | 'page_view'
  | 'hero_cta_click'
  | 'agent_open'
  | 'agent_message'
  | 'agent_completed'
  | 'lead_form_started'
  | 'lead_form_completed'
  | 'demo_requested'
  | 'whatsapp_clicked'
  | 'roi_calculator_used';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, payload: Record<string, unknown> = {}): void {
  if (process.env.NODE_ENV === 'development') {
    console.info('[analytics]', event, payload);
  }
  window.gtag?.('event', event, payload);
}
