import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { PageViewTracker } from '@/components/analytics/PageViewTracker';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const SITE_URL = 'https://seuvendedorai.com.br';
const DEFAULT_DESCRIPTION =
  'Um agente de IA que atende seus leads, entende o que eles precisam, responde dúvidas, qualifica oportunidades e faz follow-up automaticamente.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Seu Vendedor IA',
    default: 'Seu Vendedor IA — Seu próximo vendedor pode começar agora',
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    siteName: 'Seu Vendedor IA',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Seu Vendedor IA',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: DEFAULT_DESCRIPTION,
  url: SITE_URL,
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
  },
  provider: {
    '@type': 'Organization',
    name: 'Seu Vendedor IA',
    url: SITE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}', { send_page_view: false });
              `}
            </Script>
          </>
        )}
        <PageViewTracker />
        {children}
      </body>
    </html>
  );
}
