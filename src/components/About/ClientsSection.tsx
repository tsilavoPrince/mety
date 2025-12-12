import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const ClientsSection = () => {
  const clientsRef = useRef<HTMLDivElement>(null);

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
    if (!clientsRef.current) return;

    const ctx = gsap.context(() => {
      const clientCards = clientsRef.current!.querySelectorAll('.client-card');
      gsap.fromTo(clientCards,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8, stagger: 0.2, delay: 1.2, ease: "back.out(1.3)",
          scrollTrigger: { trigger: clientsRef.current, start: "top 85%" }
        }
      );
    }, clientsRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={clientsRef} className="mb-20">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-12">
          Ils nous font confiance
        </h3>
        <p className="text-gray-300/80 text-center max-w-2xl mx-auto mb-12">
          Nos meilleurs ambassadeurs sont nos clients. Voici ce qu'ils disent de leur collaboration avec ARIA Communication.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {clients.map((client, index) => (
            <div key={index} className="client-card group">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-orange-400/20 hover:border-orange-300/40 transition-all duration-300 h-full flex flex-col">
                <div className="text-3xl text-orange-400/30 mb-4">"</div>
                <p className="text-gray-300/90 mb-8 flex-grow italic">
                  {client.quote}
                </p>
                <div className="pt-6 border-t border-orange-400/20">
                  <div className="font-semibold text-white">{client.author}</div>
                  <div className="text-sm text-orange-300">{client.role}</div>
                  <div className="text-xs text-gray-300/60 mt-1">{client.company}</div>
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
