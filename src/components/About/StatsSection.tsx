import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const StatsSection = () => {
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: "+130%", label: "de trafic sur le site", description: "Entreprise de services" },
    { value: "-70%", label: "de demandes de contact", description: "Refonte & structure digitale" },
    { value: "-40%", label: "de temps sur tâches répétitives", description: "PME avec automatisations IA" }
  ];

  useEffect(() => {
    if (!statsRef.current) return;

    const ctx = gsap.context(() => {
      const statItems = statsRef.current!.querySelectorAll('.stat-item');
      gsap.fromTo(statItems,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 0.8, stagger: 0.15, delay: 1, ease: "back.out(1.3)",
          scrollTrigger: { trigger: statsRef.current, start: "top 90%" }
        }
      );
    }, statsRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="relative mb-16">
        <div className="h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-orange-400/30 flex items-center justify-center animate-pulse-glow">
          <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
        </div>
      </div>

      <div ref={statsRef} className="mb-20">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-12">
          Des résultats concrets pour nos clients
        </h3>
        <p className="text-gray-300/80 text-center max-w-2xl mx-auto mb-12">
          Nos projets ne sont pas que beaux visuellement : ils ont un impact réel sur le quotidien et les performances de nos clients.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item group">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-orange-400/20 hover:border-orange-300/40 transition-all duration-300 group-hover:shadow-[0_20px_50px_rgba(249,115,22,0.15)]">
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-400 mb-4">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-white mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-300/70">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StatsSection;
