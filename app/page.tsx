import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/hero/Hero';
import { PainSection } from '@/components/sections/PainSection';
import { BeforeAfter } from '@/components/sections/BeforeAfter';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { WhatItDoes } from '@/components/sections/WhatItDoes';
import { NotAChatbot } from '@/components/sections/NotAChatbot';
import { Personalization } from '@/components/sections/Personalization';
import { RoiCalculator } from '@/components/sections/RoiCalculator';
import { Integrations } from '@/components/sections/Integrations';
import { HumanControl } from '@/components/sections/HumanControl';
import { AudienceFit } from '@/components/sections/AudienceFit';
import { Faq } from '@/components/sections/Faq';
import { FinalCta } from '@/components/sections/FinalCta';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-ink-950">
      <Header />
      <main>
        <Hero />
        <PainSection />
        <BeforeAfter />
        <HowItWorks />
        <WhatItDoes />
        <NotAChatbot />
        <Personalization />
        <RoiCalculator />
        <Integrations />
        <HumanControl />
        <AudienceFit />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
