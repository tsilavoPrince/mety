import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const PrinciplesGrid = () => {
  const cosmicCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const principles = [
    {
      title: "Équipe pluridisciplinaire",
      description: "Développeurs, designers, marketeurs et spécialistes IA travaillent ensemble pour couvrir tous les aspects de votre projet.",
      icon: "👥",
      features: ["Expertise technique", "Créativité design", "Stratégie marketing", "Innovation IA"]
    },
    {
      title: "Approche orientée résultats",
      description: "Chaque livrable est pensé pour atteindre un objectif : plus de visibilité, plus de demandes, meilleure organisation interne.",
      icon: "🎯",
      features: ["Objectifs mesurables", "ROI optimisé", "Performance garantie", "Suivi continu"]
    },
    {
      title: "Process clair, sans jargon",
      description: "Nous vous expliquons chaque étape, avec un interlocuteur dédié et des points réguliers. Pas de surprise, pas de termes techniques incompréhensibles.",
      icon: "💎",
      features: ["Communication transparente", "Pas de jargon technique", "Points réguliers", "Suivi simplifié"]
    },
    {
      title: "Accompagnement sur la durée",
      description: "Après la mise en ligne, nous restons là : maintenance, mises à jour, évolutions, nouveaux besoins.",
      icon: "🤝",
      features: ["Support continu", "Maintenance proactive", "Évolutions régulières", "Partenaire à long terme"]
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      cosmicCardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(card,
          {
            opacity: 0, y: 50, scale: 0.9, rotationX: 15, rotationY: index % 2 === 0 ? -10 : 10,
            filter: "brightness(0.6) blur(12px)"
          },
          {
            opacity: 1, y: 0, scale: 1, rotationX: 0, rotationY: 0, filter: "brightness(1) blur(0px)",
            duration: 1.2, delay: 0.7 + (index * 0.15), ease: "back.out(1.3)",
            scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" }
          }
        );

        // Animation au hover
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -8, scale: 1.03, rotationY: index % 2 === 0 ? -4 : 4, duration: 0.4, ease: "power2.out" });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, scale: 1, rotationY: 0, duration: 0.4, ease: "power2.out" });
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @keyframes subtle-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .animate-subtle-float { animation: subtle-float 5s ease-in-out infinite; }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.2); }
          50% { box-shadow: 0 0 30px rgba(249, 115, 22, 0.4); }
        }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
      `}</style>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-20">
        {principles.map((principle, index) => (
          <div key={index} ref={el => cosmicCardsRef.current[index] = el} className="group relative h-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/10 via-orange-400/5 to-orange-500/10 rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
            
            <div className="relative h-full rounded-2xl bg-gradient-to-br from-gray-800/60 to-slate-900/50 backdrop-blur-xl border border-orange-400/20 hover:border-orange-300/40 transition-all duration-500 group-hover:shadow-[0_15px_40px_rgba(249,115,22,0.2)] shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              
              <div className="relative p-6 lg:p-7 h-full flex flex-col z-10">
                <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-orange-300 mb-3 group-hover:from-orange-100 group-hover:to-orange-200 transition-colors duration-300">
                  {principle.title}
                </h3>

                <p className="text-sm text-gray-300/85 mb-6 flex-grow leading-relaxed">
                  {principle.description}
                </p>

                <div className="mt-auto pt-5 border-t border-orange-400/15">
                  <ul className="space-y-2.5">
                    {principle.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center group/feature">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full mr-2.5 group-hover/feature:scale-110 transition-transform duration-300" />
                        <span className="text-xs text-gray-300/75 group-hover/feature:text-orange-200 transition-colors duration-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="absolute top-3 left-3 w-1 h-1 bg-orange-400/50 rounded-full blur-sm animate-pulse" />
              <div className="absolute bottom-3 right-3 w-1 h-1 bg-orange-400/50 rounded-full blur-sm animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PrinciplesGrid;
