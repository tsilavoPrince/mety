import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const ProcessSection = () => {
  const processRef = useRef<HTMLDivElement>(null);

  const processSteps = [
    { step: "1", title: "Analyse et stratégie", description: "Nous prenons le temps de comprendre vos enjeux pour bâtir une stratégie sur-mesure adaptée à vos objectifs.", icon: "🔍" },
    { step: "2", title: "Conception & maquette", description: "Nous créons des maquettes interactives qui préfigurent le résultat final avant tout développement.", icon: "🎨" },
    { step: "3", title: "Développement & intégration", description: "Nous développons des solutions robustes, performantes et sécurisées avec les technologies les plus récentes.", icon: "⚡" },
    { step: "4", title: "Lancement & suivi", description: "Nous assurons le déploiement et un accompagnement continu pour optimiser vos performances.", icon: "🚀" }
  ];

  useEffect(() => {
    if (!processRef.current) return;

    const ctx = gsap.context(() => {
      const processStepsElements = processRef.current!.querySelectorAll('.process-step');
      gsap.fromTo(processStepsElements,
        { opacity: 0, x: -20, filter: "blur(8px)" },
        {
          opacity: 1, x: 0, filter: "blur(0px)",
          duration: 0.8, stagger: 0.3, delay: 1, ease: "power3.out",
          scrollTrigger: { trigger: processRef.current, start: "top 85%" }
        }
      );
    }, processRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={processRef} className="mb-20">
      <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-12">
        Un process simple et transparent
      </h3>
      <p className="text-gray-300/80 text-center max-w-2xl mx-auto mb-12">
        Pour que votre projet avance sereinement et efficacement, nous suivons un processus clair en 4 étapes.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {processSteps.map((step, index) => (
          <div key={index} className="process-step group">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-orange-400/20 hover:border-orange-300/40 transition-all duration-300 h-full flex flex-col">
              <div className="flex items-center mb-6">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-400">
                  {step.step}
                </div>
              </div>
              
              <h4 className="text-lg font-semibold text-white mb-4">
                {step.title}
              </h4>
              
              <p className="text-gray-300/80 text-sm leading-relaxed flex-grow">
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
