import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const StatsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  const stats = [
    { value: "+130%", label: "de trafic sur le site", description: "Entreprise de services" },
    { value: "-70%", label: "de demandes de contact", description: "Refonte & structure digitale" },
    { value: "-40%", label: "de temps sur tâches répétitives", description: "PME avec automatisations IA" }
  ];

  useEffect(() => {
    if (!containerRef.current || statsRef.current.length !== 3) return;

    const container = containerRef.current;
    const statCards = statsRef.current.filter(Boolean) as HTMLDivElement[];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=900px",
        pin: container,
        scrub: 1.2,
        anticipatePin: 1
      }
    });

    tl.fromTo(statCards[0], 
      {
        opacity: 0,
        scale: 0.5,
        y: 100,
        rotationX: 90,
        rotationY: -30,
        filter: "brightness(0.3) blur(15px)"
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        filter: "brightness(1) blur(0px)",
        duration: 1.2,
        ease: "back.out(1.7)"
      },
      0
    )
    .fromTo(statCards[1],
      {
        opacity: 0,
        scale: 0.6,
        y: 120,
        rotationX: 90,
        rotationY: 15,
        filter: "brightness(0.3) blur(15px)"
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        filter: "brightness(1) blur(0px)",
        duration: 1.3,
        ease: "back.out(1.7)"
      },
      0.4
    )
    .fromTo(statCards[2],
      {
        opacity: 0,
        scale: 0.55,
        y: 140,
        rotationX: 90,
        rotationY: 30,
        filter: "brightness(0.3) blur(15px)"
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        filter: "brightness(1) blur(0px)",
        duration: 1.4,
        ease: "back.out(1.7)"
      },
      0.8
    )
    .to(statCards,
      {
        y: -150,
        scale: 1.1,
        opacity: 0,
        rotationX: -20,
        rotationY: [0, 10, -10, 0],
        filter: "brightness(1.5) blur(10px)",
        stagger: { amount: 0.4, from: "start" },
        duration: 1.5,
        ease: "power3.inOut"
      },
      2.0
    );

    statCards.forEach((card, index) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          y: -10,
          rotationY: index === 0 ? -5 : index === 1 ? 0 : 5,
          duration: 0.4,
          ease: "power2.out"
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          rotationY: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      });
    });

    return () => {
      tl.scrollTrigger?.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.2); }
          50% { box-shadow: 0 0 30px rgba(249, 115, 22, 0.4); }
        }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
      `}</style>

      <div className="relative mb-16">
        <div className="h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-orange-400/30 flex items-center justify-center animate-pulse-glow">
          <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
        </div>
      </div>

      <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center mb-20 px-4">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white mb-8 md:mb-12 max-w-4xl leading-tight">
          Des résultats concrets pour nos clients
        </h3>
        <p className="text-gray-300/80 text-center max-w-2xl mx-auto mb-12 md:mb-16 text-sm md:text-base lg:text-lg leading-relaxed">
          Nos projets ne sont pas que beaux visuellement : ils ont un impact réel sur le quotidien et les performances de nos clients.
        </p>
        
        {/* ✅ 3 COLONNES SUR TOUS LES ÉCRANS */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto w-full px-2 md:px-4">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              ref={el => statsRef.current[index] = el}
              className="group h-[220px] md:h-[260px] lg:h-[300px] flex flex-col justify-center perspective-1000"
              style={{ perspective: '1000px' }}
            >
              <div className="relative h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-4 md:p-6 lg:p-8 border border-orange-400/20 hover:border-orange-300/40 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(249,115,22,0.25)] shadow-xl overflow-hidden flex flex-col justify-center transform-style-3d">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-400/5 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-2xl" />
                
                <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-orange-200 to-orange-400 mb-2 md:mb-4 flex-grow-0 relative z-10 leading-tight text-center">
                  {stat.value}
                </div>
                
                <div className="text-sm md:text-base lg:text-lg font-semibold text-white mb-2 md:mb-3 flex-grow-0 relative z-10 text-center">
                  {stat.label}
                </div>
                
                <div className="text-xs md:text-sm lg:text-base text-gray-300/80 flex-grow-0 leading-relaxed relative z-10 text-center px-1">
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
