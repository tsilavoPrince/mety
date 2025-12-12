import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const ProcessSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const processSteps = [
    { step: "1", title: "Analyse et stratégie", description: "Nous prenons le temps de comprendre vos enjeux pour bâtir une stratégie sur-mesure adaptée à vos objectifs." },
    { step: "2", title: "Conception & maquette", description: "Nous créons des maquettes interactives qui préfigurent le résultat final avant tout développement." },
    { step: "3", title: "Développement & intégration", description: "Nous développons des solutions robustes, performantes et sécurisées avec les technologies les plus récentes." },
    { step: "4", title: "Lancement & suivi", description: "Nous assurons le déploiement et un accompagnement continu pour optimiser vos performances." }
  ];

  useEffect(() => {
    if (!containerRef.current || stepRefs.current.length !== 4) return;

    const steps = stepRefs.current.filter(Boolean) as HTMLDivElement[];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1200px",
        pin: containerRef.current,
        scrub: 1.5,
        anticipatePin: 1
      }
    });

    tl.fromTo(steps[0], 
      { opacity: 0, scale: 0.7, y: 60, rotationY: -90, filter: "brightness(0.4) blur(10px)" },
      { opacity: 1, scale: 1, y: 0, rotationY: 0, filter: "brightness(1) blur(0px)", duration: 1.2, ease: "elastic.out(1, 0.4)" },
      0
    )
    .fromTo(steps[1], 
      { opacity: 0, scale: 0.75, y: 70, rotationY: 90, filter: "brightness(0.4) blur(10px)" },
      { opacity: 1, scale: 1, y: 0, rotationY: 0, filter: "brightness(1) blur(0px)", duration: 1.3, ease: "elastic.out(1, 0.4)" },
      0.4
    )
    .fromTo(steps[2], 
      { opacity: 0, scale: 0.8, y: 80, rotationX: 45, filter: "brightness(0.4) blur(10px)" },
      { opacity: 1, scale: 1, y: 0, rotationX: 0, filter: "brightness(1) blur(0px)", duration: 1.4, ease: "back.out(1.7)" },
      0.8
    )
    .fromTo(steps[3], 
      { opacity: 0, scale: 0.65, y: 90, rotationX: -45, rotationY: 180, filter: "brightness(0.4) blur(10px)" },
      { opacity: 1, scale: 1, y: 0, rotationX: 0, rotationY: 0, filter: "brightness(1) blur(0px)", duration: 1.5, ease: "elastic.out(1.3)" },
      1.2
    )
    .to({}, { duration: 2 }, 3.0)
    .to(steps, {
      y: "-=12",
      rotationY: "+=8",
      scale: 1.02,
      stagger: 0.1,
      duration: 1.5,
      ease: "sine.inOut"
    }, 5.0)
    .to(steps, {
      y: -80,
      scale: 1.1,
      opacity: 0,
      rotationX: -20,
      filter: "brightness(1.5) blur(8px)",
      stagger: { amount: 0.5, from: "end" },
      duration: 1.8,
      ease: "power3.in"
    }, 6.0);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center mb-20 py-20 px-4">
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white mb-8 md:mb-16 max-w-4xl leading-tight">
        Un process simple et transparent
      </h3>
      <p className="text-gray-300/80 text-center max-w-2xl mx-auto mb-12 md:mb-20 text-sm md:text-lg leading-relaxed">
        Pour que votre projet avance sereinement et efficacement, nous suivons un processus clair en 4 étapes.
      </p>
      
      {/* ✅ 4 COLONNES SUR TOUS LES ÉCRANS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto w-full px-2 md:px-4">
        {processSteps.map((step, index) => (
          <div 
            key={index} 
            ref={el => stepRefs.current[index] = el}
            className="process-step group h-[280px] md:h-[320px] lg:h-[360px] perspective-1000"
            style={{ perspective: '1000px' }}
          >
            <div className="relative h-full bg-gradient-to-br from-gray-800/60 to-gray-900/50 backdrop-blur-xl rounded-2xl p-5 md:p-7 border border-orange-400/20 hover:border-orange-300/40 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(249,115,22,0.25)] shadow-xl overflow-hidden flex flex-col justify-center transform-style-3d">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-400/5 opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-2xl" />
              
              <div className="flex items-center justify-center mb-4 md:mb-6 relative z-10">
                <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-orange-500/10">
                  {step.step}
                </div>
              </div>
              
              <h4 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 relative z-10 leading-tight text-center px-2">
                {step.title}
              </h4>
              
              <p className="text-gray-300/85 text-xs md:text-sm leading-relaxed flex-grow relative z-10 px-2 text-center">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessSection;
