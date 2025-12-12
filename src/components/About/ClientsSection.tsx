import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const ClientsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const clients = [
    {
      quote: "ARIA a complètement modernisé notre image. Notre nouveau site inspire enfin confiance à nos clients. L'équipe est à l'écoute et très réactive.",
      author: "Jean Dupont", role: "Directeur", company: "Entreprise Services"
    },
    {
      quote: "Nous avions besoin d'un partenaire sérieux pour structurer notre communication digitale. ARIA nous a guidés de A à Z, avec de vraies propositions.",
      author: "Marie Martin", role: "Responsable Marketing", company: "École Privée"
    },
    {
      quote: "Grâce aux outils et automatisations mis en place, nous avons gagné un temps précieux au quotidien. On regrette de ne pas l'avoir fait plus tôt.",
      author: "Paul Bernard", role: "CEO", company: "PME Technologie"
    }
  ];

  useEffect(() => {
    if (!containerRef.current || cardsRef.current.length !== 3) return;

    const container = containerRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=1400px",
        pin: container,
        scrub: 1.5,
        anticipatePin: 1
      }
    });

    tl.fromTo(cards[0],
      {
        opacity: 0,
        scale: 0.2,
        rotation: 720,
        y: 300,
        z: -200,
        filter: "hue-rotate(180deg) saturate(0)"
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        y: 0,
        z: 0,
        filter: "hue-rotate(0deg) saturate(1)",
        duration: 1.5,
        ease: "elastic.out(1, 0.5)"
      },
      0
    )
    .fromTo(cards[1],
      {
        opacity: 0,
        scale: 0.15,
        rotation: -540,
        y: 350,
        z: -150,
        filter: "hue-rotate(180deg) saturate(0)"
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        y: 0,
        z: 0,
        filter: "hue-rotate(0deg) saturate(1)",
        duration: 1.6,
        ease: "elastic.out(1, 0.5)"
      },
      0.3
    )
    .fromTo(cards[2],
      {
        opacity: 0,
        scale: 0.25,
        rotation: 900,
        y: 400,
        z: -250,
        filter: "hue-rotate(180deg) saturate(0)"
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        y: 0,
        z: 0,
        filter: "hue-rotate(0deg) saturate(1)",
        duration: 1.7,
        ease: "elastic.out(1, 0.5)"
      },
      0.6
    )
    .to({}, { duration: 1.5 }, 2.0)
    .to(cards,
      {
        y: (i) => i === 0 ? -200 : i === 1 ? -150 : -250,
        x: (i) => i === 0 ? -80 : i === 2 ? 80 : 0,
        scale: 0.8,
        opacity: 0,
        rotation: (i) => i * 360,
        filter: "brightness(2) blur(8px)",
        stagger: {
          amount: 0.6,
          from: "center"
        },
        duration: 2,
        ease: "power3.in"
      },
      3.5
    );

    gsap.to(cards, {
      y: "-=15",
      rotationY: "+=5",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: container,
        start: "25% top",
        end: "45% top",
        scrub: true
      }
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

      <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center mb-20 px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-8 sm:mb-12 sm:mb-16 leading-tight tracking-wide max-w-4xl mx-auto px-2">
          Ils nous font confiance
        </h3>
        <p className="text-gray-300/80 text-center max-w-2xl mx-auto mb-12 sm:mb-16 text-sm sm:text-base md:text-lg leading-relaxed px-4">
          Nos meilleurs ambassadeurs sont nos clients. Voici ce qu'ils disent de leur collaboration avec ARIA Communication.
        </p>
        
        {/* ✅ 3 COLONNES SUR TOUS LES ÉCRANS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto w-full px-2 sm:px-4">
          {clients.map((client, index) => (
            <div 
              key={index} 
              ref={el => cardsRef.current[index] = el}
              className="group h-[300px] sm:h-[340px] md:h-[360px] lg:h-[400px] perspective-1000"
              style={{ perspective: '1000px' }}
            >
              <div className="relative h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-5 sm:p-6 md:p-8 border border-orange-400/20 hover:border-orange-300/40 transition-all duration-500 group-hover:shadow-[0_25px_60px_rgba(249,115,22,0.25)] shadow-2xl overflow-hidden flex flex-col transform-style-3d">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-2xl sm:text-3xl md:text-4xl text-orange-400/20 mb-3 sm:mb-4 md:mb-6 relative z-10">"</div>
                <p className="text-gray-300/95 mb-5 sm:mb-6 md:mb-10 flex-grow italic leading-relaxed relative z-10 text-sm sm:text-base md:text-lg overflow-hidden">
                  {client.quote}
                </p>
                <div className="pt-5 sm:pt-6 md:pt-8 border-t border-orange-400/30 relative z-10">
                  <div className="font-bold text-base sm:text-lg md:text-xl text-white mb-1">{client.author}</div>
                  <div className="text-orange-300 font-semibold text-xs sm:text-sm md:text-base mb-1">{client.role}</div>
                  <div className="text-xs sm:text-sm text-gray-300/70">{client.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mb-16">
        <div className="h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-orange-400/30 flex items-center justify-center animate-pulse-glow">
          <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
        </div>
      </div>
    </>
  );
};

export default ClientsSection;
