import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cosmicCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animation d'entrée de la section
      gsap.fromTo(sectionRef.current,
        { 
          opacity: 0, 
          scale: 0.98,
          filter: "blur(15px)"
        },
        { 
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation du titre
      gsap.fromTo(titleRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
          filter: "blur(8px)"
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.5,
          delay: 0.3,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          }
        }
      );

      // Animation de la description
      gsap.fromTo(descriptionRef.current,
        {
          opacity: 0,
          y: 30,
          filter: "blur(10px)"
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 85%",
          }
        }
      );

      // Animation des cartes
      cosmicCardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
            rotationX: 15,
            rotationY: index % 2 === 0 ? -10 : 10,
            filter: "brightness(0.6) blur(12px)"
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            filter: "brightness(1) blur(0px)",
            duration: 1.2,
            delay: 0.7 + (index * 0.15),
            ease: "back.out(1.3)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );

        // Animation au hover
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -8,
            scale: 1.03,
            rotationY: index % 2 === 0 ? -4 : 4,
            duration: 0.4,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      });

      // Animation des stats
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll('.stat-item');
        gsap.fromTo(statItems,
          {
            opacity: 0,
            scale: 0.8,
            y: 20
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            delay: 1,
            ease: "back.out(1.3)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 90%",
            }
          }
        );
      }

      // Animation des témoignages clients
      if (clientsRef.current) {
        const clientCards = clientsRef.current.querySelectorAll('.client-card');
        gsap.fromTo(clientCards,
          {
            opacity: 0,
            y: 30,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            delay: 1.2,
            ease: "back.out(1.3)",
            scrollTrigger: {
              trigger: clientsRef.current,
              start: "top 85%",
            }
          }
        );
      }

      // Animation du processus
      if (processRef.current) {
        const processSteps = processRef.current.querySelectorAll('.process-step');
        gsap.fromTo(processSteps,
          {
            opacity: 0,
            x: -20,
            filter: "blur(8px)"
          },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.3,
            delay: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: processRef.current,
              start: "top 85%",
            }
          }
        );
      }

      // Animation CTA
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          {
            opacity: 0,
            y: 20,
            filter: "blur(8px)"
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            delay: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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

  const stats = [
    {
      value: "+130%",
      label: "de trafic sur le site",
      description: "Entreprise de services"
    },
    {
      value: "-70%",
      label: "de demandes de contact",
      description: "Refonte & structure digitale"
    },
    {
      value: "-40%",
      label: "de temps sur tâches répétitives",
      description: "PME avec automatisations IA"
    }
  ];

  const clients = [
    {
      quote: "ARIA a complètement modernisé notre image. Notre nouveau site inspire enfin confiance à nos clients. L'équipe est à l'écoute et très réactive.",
      author: " Jean Dupont",
      role: "Directeur",
      company: "Entreprise Services"
    },
    {
      quote: "Nous avions besoin d'un partenaire sérieux pour structurer notre communication digitale. ARIA nous a guidés de A à Z, avec de vraies propositions.",
      author: "Marie Martin",
      role: "Responsable Marketing",
      company: "École Privée"
    },
    {
      quote: "Grâce aux outils et automatisations mis en place, nous avons gagné un temps précieux au quotidien. On regrette de ne pas l'avoir fait plus tôt.",
      author: "Paul Bernard",
      role: "CEO",
      company: "PME Technologie"
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Analyse et stratégie",
      description: "Nous prenons le temps de comprendre vos enjeux pour bâtir une stratégie sur-mesure adaptée à vos objectifs.",
      icon: "🔍"
    },
    {
      step: "2",
      title: "Conception & maquette",
      description: "Nous créons des maquettes interactives qui préfigurent le résultat final avant tout développement.",
      icon: "🎨"
    },
    {
      step: "3",
      title: "Développement & intégration",
      description: "Nous développons des solutions robustes, performantes et sécurisées avec les technologies les plus récentes.",
      icon: "⚡"
    },
    {
      step: "4",
      title: "Lancement & suivi",
      description: "Nous assurons le déploiement et un accompagnement continu pour optimiser vos performances.",
      icon: "🚀"
    }
  ];

  return (
    <>
      <style>{`
        @keyframes subtle-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .animate-subtle-float {
          animation: subtle-float 5s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.2); }
          50% { box-shadow: 0 0 30px rgba(249, 115, 22, 0.4); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="about"
        className="py-24 bg-gradient-to-br from-gray-900 via-gray-850 to-gray-950 relative overflow-hidden"
      >
        {/* Fond lumineux */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-300/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.08),_transparent_60%)] mix-blend-soft-light opacity-40" />
        </div>

        {/* Lignes décoratives */}
        <div className="pointer-events-none absolute inset-x-0 top-32 bottom-32 flex items-center justify-center opacity-10">
          <div className="relative w-full max-w-6xl h-48">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/10 to-transparent rounded-3xl blur-sm" />
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <div ref={titleRef}>
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-orange-200 to-orange-400 mb-6 drop-shadow-[0_0_25px_rgba(249,115,22,0.4)]">
                POURQUOI TRAVAILLER AVEC NOUS ?
              </h2>
            </div>

            <div ref={descriptionRef} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/10 blur-lg rounded-xl" />
              <div className="relative text-lg md:text-xl text-gray-300/90 leading-relaxed bg-gray-800/40 backdrop-blur-md px-8 py-6 rounded-xl border border-orange-400/20">
                Nous ne faisons pas "juste des sites" : nous construisons des solutions pensées pour soutenir votre activité sur le long terme.
              </div>
            </div>
          </div>

          {/* Grid des principes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-20">
            {principles.map((principle, index) => (
              <div
                key={index}
                ref={el => cosmicCardsRef.current[index] = el}
                className="group relative h-full"
              >
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

          {/* Separator */}
          <div className="relative mb-16">
            <div className="h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-orange-400/30 flex items-center justify-center animate-pulse-glow">
              <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Stats Section */}
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

          {/* Separator */}
          <div className="relative mb-16">
            <div className="h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-orange-400/30 flex items-center justify-center animate-pulse-glow">
              <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Clients Section */}
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

          {/* Separator */}
          <div className="relative mb-16">
            <div className="h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-orange-400/30 flex items-center justify-center animate-pulse-glow">
              <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Process Section */}
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

       
        </div>
      </section>
    </>
  );
};

export default AboutSection;