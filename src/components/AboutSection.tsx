import React, { Suspense } from 'react';
import AboutHeader from './About/AboutHeader';
import PrinciplesGrid from './About/PrinciplesGrid';
import StatsSection from './About/StatsSection';
import ClientsSection from './About/ClientsSection';
import ProcessSection from './About/ProcessSection';
import AnimatedBackground from './About/AnimatedBackground';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-br from-gray-900 via-gray-850 to-gray-950 relative overflow-hidden">
      {/* ✅ Background animé SEULEMENT sur About */}
      <AnimatedBackground />
      
      {/* Anciens fonds (optionnel, réduit) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 -left-24 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl" />
      </div>

      {/* Lignes décoratives */}
      <div className="pointer-events-none absolute inset-x-0 top-32 bottom-32 flex items-center justify-center opacity-10">
        <div className="relative w-full max-w-6xl h-48">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/10 to-transparent rounded-3xl blur-sm" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <Suspense fallback={null}>
          <AboutHeader />
          <PrinciplesGrid />
          <StatsSection />
          <ClientsSection />
          <ProcessSection />
        </Suspense>
      </div>
    </section>
  );
};

export default AboutSection;
