import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/hero/Hero';
import { PainSection } from '@/components/sections/PainSection';
import { BeforeAfter } from '@/components/sections/BeforeAfter';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { NotAChatbot } from '@/components/sections/NotAChatbot';
import { Personalization } from '@/components/sections/Personalization';
import { RoiCalculator } from '@/components/sections/RoiCalculator';
import { Integrations } from '@/components/sections/Integrations';
import { HumanControl } from '@/components/sections/HumanControl';
import { AudienceFit } from '@/components/sections/AudienceFit';
import { Faq } from '@/components/sections/Faq';
import { FinalCta } from '@/components/sections/FinalCta';
import { SEGMENTS, getSegmentBySlug } from '@/lib/segments';

interface SegmentPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SEGMENTS.map((segment) => ({ slug: segment.slug }));
}

export async function generateMetadata({ params }: SegmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const segment = getSegmentBySlug(slug);
  if (!segment) return {};

  return {
    title: segment.metaTitle,
    description: segment.metaDescription,
    alternates: { canonical: `/segmentos/${segment.slug}` },
    openGraph: {
      title: segment.metaTitle,
      description: segment.metaDescription,
    },
    twitter: {
      title: segment.metaTitle,
      description: segment.metaDescription,
    },
  };
}

export default async function SegmentPage({ params }: SegmentPageProps) {
  const { slug } = await params;
  const segment = getSegmentBySlug(slug);
  if (!segment) notFound();

  return (
    <div className="min-h-screen bg-ink-950">
      <Header />
      <main>
        <Hero
          badge={`Agente comercial de IA para ${segment.shortName}`}
          headline={segment.headline}
          subheadline={segment.subheadline}
          segment={segment}
        />
        <PainSection
          headline={`Quantas oportunidades sua empresa de ${segment.shortName.toLowerCase()} perde todos os meses?`}
          items={segment.painPoints}
        />
        <BeforeAfter />
        <HowItWorks />
        <NotAChatbot />
        <Personalization />
        <RoiCalculator />
        <Integrations />
        <HumanControl />
        <AudienceFit />
        <Faq />
        <FinalCta headline={`Veja como um vendedor de IA funcionaria na sua empresa de ${segment.shortName.toLowerCase()}.`} />
      </main>
      <Footer />
    </div>
  );
}
