import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceModal from './ServiceModal';

gsap.registerPlugin(ScrollTrigger);

interface Step {
  title: string;
  description: string;
}

interface Example {
  icon?: string;
  title: string;
  description: string;
}

interface Service {
  title: string;
  description: string;
  features: string[];
  cta: string;
  detailedDescription: string;
  process: Step[];
  technologies: string[];
  benefits: string[];
  examples: Example[];
}

const ServiceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animation d'entrée de la section
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 80,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none reverse" // Inversion au scroll vers le haut
        }
      });

      // Animation des cartes avec entrée différente selon la position
      cardsRef.current.forEach((card, index) => {
  if (!card) return;
  
  // Déterminer si la carte est à gauche ou à droite
  const isLeftCard = index % 2 === 0; // Carte 0 et 2 (première et troisième) sont à gauche
  const isFirstRow = index < 2; // Cartes 0 et 1 sont en première ligne
  
  // Réduire les délais pour une apparition plus rapide
  const delay = isFirstRow ? index * 0.05 : (index - 2) * 0.05 + 0.1;
  
  // Animation d'entrée RAPIDE
  gsap.fromTo(card,
    {
      opacity: 0,
      x: isLeftCard ? -80 : 80,
      y: 30,
      scale: 0.95,
      rotationX: 10,
      rotationY: isLeftCard ? -10 : 10,
      filter: "brightness(0.7) blur(8px)"
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotationX: 0,
      rotationY: 0,
      filter: "brightness(1) blur(0px)",
      duration: 0.6, // Durée réduite de 1.2 à 0.6 secondes
      delay: delay, // Délais réduits
      ease: "power2.out", // Animation plus directe
      scrollTrigger: {
        trigger: card,
        start: "top 80%", // Déclenchement plus tôt dans la vue
        toggleActions: "play none none reverse",
        onEnter: () => {
          // Animation d'impact rapide
          gsap.to(card, {
            scale: 1.03,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
          });
        }
      }
    }
  );

  // Animation au hover (gardée identique ou légèrement ajustée)
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      y: -8, // Réduction de l'effet de levage
      scale: 1.03, // Effet de zoom réduit
      rotationY: isLeftCard ? -2 : 2,
      duration: 0.3, // Animation hover plus rapide
      ease: "power2.out"
    });
    
    const glowElement = card.querySelector('.card-glow');
    if (glowElement) {
      gsap.to(glowElement, {
        opacity: 0.4,
        duration: 0.2
      });
    }
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      y: 0,
      scale: 1,
      rotationY: 0,
      duration: 0.3, // Retour plus rapide
      ease: "power2.out"
    });
    
    const glowElement = card.querySelector('.card-glow');
    if (glowElement) {
      gsap.to(glowElement, {
        opacity: 0,
        duration: 0.2
      });
    }
  });
});
      
      // Animation supplémentaire pour l'entrée des lignes
      const firstRowCards = cardsRef.current.slice(0, 2);
      const secondRowCards = cardsRef.current.slice(2, 4);
      
      // Animation de la première ligne
      if (firstRowCards.every(card => card)) {
        gsap.fromTo(firstRowCards,
          {
            y: 50,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 50%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
      
      // Animation de la deuxième ligne
      if (secondRowCards.every(card => card)) {
        gsap.fromTo(secondRowCards,
          {
            y: 50,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            delay: 0.3,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 50%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const services: Service[] = [
    {
      title: "Développement Web & Mobile",
      description: "Des sites et applications modernes, rapides et pensées pour convertir.",
      features: ["Site vitrine professionnel", "Site e-commerce", "Application web sur-mesure", "Imagination de vos outils métier"],
      cta: "Découvrir nos solutions",
      detailedDescription: "Nous créons des solutions digitales performantes qui allient esthétique, fonctionnalité et expérience utilisateur. Chaque projet est conçu pour répondre spécifiquement à vos besoins métier tout en garantissant une performance optimale sur tous les appareils.",
      process: [
        { title: "Analyse & Stratégie", description: "Compréhension approfondie de vos besoins et objectifs" },
        { title: "Design UX/UI", description: "Création d'interfaces intuitives et engageantes" },
        { title: "Développement", description: "Codage avec les technologies les plus récentes" },
        { title: "Tests & Optimisation", description: "Assurance qualité et performances" },
        { title: "Déploiement", description: "Mise en ligne et configuration" },
        { title: "Maintenance", description: "Support continu et évolutions" }
      ],
      technologies: ["React", "Next.js", "Node.js", "TypeScript", "React Native", "MongoDB", "AWS", "Docker"],
      benefits: [
        "Temps de chargement ultra-rapide",
        "Design responsive optimisé",
        "SEO intégré dès la conception",
        "Sécurité renforcée",
        "Évolutivité garantie",
        "Support technique 24/7"
      ],
      examples: [
        { icon: "", title: "Portail Entreprise", description: "Solution complète avec gestion des employés" },
        { icon: "", title: "E-commerce Premium", description: "Plateforme avec paiement sécurisé" },
        { icon: "", title: "Application Mobile", description: "App iOS & Android synchronisée" }
      ]
    },
    {
      title: "Branding & Design Graphique",
      description: "Une identité visuelle forte pour une marque mémorable.",
      features: ["Création ou refonte de logo", "Charte graphique complète", "Cartes de visite, plaquettes, affiches", "Visuels pour réseaux sociaux"],
      cta: "Voir nos réalisations",
      detailedDescription: "Nous donnons vie à votre identité de marque à travers des designs distinctifs et cohérents. Notre approche créative combine stratégie marketing et design pour créer une identité visuelle qui parle à votre audience et renforce votre positionnement.",
      process: [
        { title: "Audit de Marque", description: "Analyse de votre positionnement actuel" },
        { title: "Direction Artistique", description: "Définition de l'univers visuel" },
        { title: "Création Logo", description: "Design d'un symbole mémorable" },
        { title: "Charte Graphique", description: "Développement de l'identité complète" },
        { title: "Applications", description: "Adaptation sur tous supports" },
        { title: "Guide d'Utilisation", description: "Manuel pour une utilisation cohérente" }
      ],
      technologies: ["Adobe Creative Suite", "Figma", "Blender 3D", "After Effects", "Procreate", "Sketch"],
      benefits: [
        "Identité unique et mémorable",
        "Cohérence sur tous supports",
        "Adaptation à tous formats",
        "Évolution dans le temps",
        "Impact visuel immédiat",
        "Renforcement de la notoriété"
      ],
      examples: [
        { title: "Rebranding", description: "Rafraîchissement complet d'identité" },
        { title: "Identité Startup", description: "Création de A à Z pour lancement" },
        { title: "Packaging", description: "Design de produits physiques" }
      ]
    },
    {
      title: "Marketing Digital & Réseaux Sociaux",
      description: "Plus de visibilité, plus de clients, moins de perte de temps.",
      features: ["Gestion de réseaux sociaux", "Création de contenu", "Campagnes publicitaires", "Stratégie digitale sur mesure"],
      cta: "Booster ma visibilité",
      detailedDescription: "Nous développons et exécutons des stratégies digitales qui génèrent des résultats mesurables. De la création de contenu engageant à l'optimisation des campagnes publicitaires, nous maximisons votre ROI digital.",
      process: [
        { title: "Audit Digital", description: "Analyse complète de votre présence en ligne" },
        { title: "Stratégie Contenu", description: "Planification éditoriale adaptée" },
        { title: "Création de Contenu", description: "Production de contenus engageants" },
        { title: "Gestion Réseaux", description: "Animation et communauté" },
        { title: "Campagnes Pub", description: "Publicités ciblées et optimisées" },
        { title: "Analyse & Reporting", description: "Suivi des performances et ajustements" }
      ],
      technologies: ["Google Ads", "Meta Business", "LinkedIn Ads", "SEMrush", "HubSpot", "Mailchimp", "Hootsuite"],
      benefits: [
        "Visibilité accrue",
        "Lead generation qualifiée",
        "ROI mesurable",
        "Communauté engagée",
        "Contenu viral optimisé",
        "Croissance organique"
      ],
      examples: [
        { title: "Campagne LinkedIn", description: "Génération de leads B2B qualifiés" },
        { title: "Stratégie Instagram", description: "Développement de communauté" },
        { title: "Email Marketing", description: "Automation et personnalisation" }
      ]
    },
    {
      title: "Solutions Entreprises (IA & Automatisation)",
      description: "Gagnez en efficacité grâce à des outils intelligents.",
      features: ["Chatbots et call centers IA", "Automatisation des processus", "Outils internes & dashboards", "Intégration d'API et systèmes"],
      cta: "Découvrir nos solutions IA",
      detailedDescription: "Nous concevons et implémentons des solutions d'intelligence artificielle et d'automatisation qui transforment vos processus métier. De la simple automatisation à l'IA générative avancée, nous optimisons votre productivité.",
      process: [
        { title: "Diagnostic Processus", description: "Identification des points d'optimisation" },
        { title: "Conception Solution", description: "Architecture technique de la solution" },
        { title: "Développement IA", description: "Intégration des modèles d'IA" },
        { title: "Automatisation", description: "Création des workflows automatisés" },
        { title: "Formation Équipe", description: "Accompagnement à l'adoption" },
        { title: "Optimisation Continue", description: "Amélioration basée sur les données" }
      ],
      technologies: ["Python", "TensorFlow", "OpenAI API", "RPA", "Power Automate", "Zapier", "Azure AI", "Custom APIs"],
      benefits: [
        "Réduction des coûts opérationnels",
        "Élimination des erreurs humaines",
        "Gains de productivité 24/7",
        "Décisions data-driven",
        "Scalabilité automatique",
        "Innovation continue"
      ],
      examples: [
        { title: "Chatbot Support", description: "Assistance client automatisée 24/7" },
        { title: "Automatisation RH", description: "Gestion des processus recrutement" },
        { title: "Dashboard IA", description: "Tableaux de bord prédictifs" }
      ]
    }
  ];

  const handleOpenModal = (index: number) => {
    setSelectedService(index);
  };

  return (
    <>
      <style>{`
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .card-glow {
          position: absolute;
          inset: 0;
          border-radius: 1.5rem;
          background: radial-gradient(circle at center, rgba(249, 115, 22, 0.2), transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: -1;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="services"
        className="py-24 bg-gradient-to-br from-gray-900 via-gray-850 to-gray-950 relative overflow-hidden"
      >
        {/* Fond lumineux subtil */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[28rem] h-[28rem] bg-orange-400/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-300/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.07),transparent_70%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.9),_#0f172a)] mix-blend-soft-light opacity-50" />
        </div>

        {/* Lignes décoratives */}
        <div className="pointer-events-none absolute inset-x-0 top-40 bottom-24 flex items-center justify-center opacity-10">
          <div className="relative w-full max-w-6xl h-32">
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full">
              <div className="w-full h-full bg-[repeating-linear-gradient(90deg,_rgba(255,255,255,0.03)_0px,_rgba(255,255,255,0.03)_1px,_rgba(249,115,22,0.05)_1px,_rgba(249,115,22,0.05)_2px)] rounded-3xl" />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <span className="inline-flex items-center px-4 py-1 mb-6 rounded-full border border-orange-400/40 bg-orange-500/10 text-xs font-medium uppercase tracking-[0.2em] text-orange-200 animate-pulse">
              Nos Expertises
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-orange-200 to-orange-400 mb-6 drop-shadow-[0_0_30px_rgba(249,115,22,0.3)]">
              AU SERVICE DE VOTRE CROISSANCE
            </h2>

            <p className="text-lg md:text-xl text-gray-300/90 leading-relaxed bg-gray-800/50 backdrop-blur-md px-8 py-4 rounded-2xl border border-orange-400/20 shadow-lg">
              Nous vous accompagnons à chaque étape de votre présence digitale : de l'idée à la mise en ligne, puis à l'optimisation de vos résultats.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                ref={el => cardsRef.current[index] = el}
                className="group relative h-full"
              >
                {/* Effet de glow */}
                <div className="card-glow" />
                
                {/* Effet de glow au hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/0 via-orange-400/20 to-orange-500/0 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                
                {/* Carte */}
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-gray-800/70 to-slate-900/50 backdrop-blur-xl border border-orange-400/20 hover:border-orange-300/40 transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(249,115,22,0.25)] shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden transform-gpu">
                  {/* Ligne décorative top */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent" />
                  
                  {/* Contenu */}
                  <div className="p-6 lg:p-8 h-full flex flex-col">
                    {/* Titre */}
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-200 transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300/90 mb-6 flex-grow">
                      {service.description}
                    </p>

                    {/* Liste des features */}
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-400/30 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <span className="text-orange-400 text-sm">✓</span>
                          </div>
                          <span className="text-gray-300/80 text-sm leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Bouton CTA */}
                    <div className="mt-auto pt-4">
                      <button
                        onClick={() => handleOpenModal(index)}
                        className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500/10 via-orange-500/20 to-orange-500/10 border border-orange-400/30 text-orange-300 font-medium hover:from-orange-500/20 hover:via-orange-500/30 hover:to-orange-500/20 hover:border-orange-300/50 hover:text-orange-200 transition-all duration-300 group/btn hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="relative">
                          {service.cta}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-300 group-hover/btn:w-full transition-all duration-300" />
                        </span>
                        <svg className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Effet de coin */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-orange-400/50 rounded-full blur-sm" />
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-orange-400/50 rounded-full blur-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedService !== null && (
        <ServiceModal
          service={services[selectedService]}
          isOpen={selectedService !== null}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ServiceSection;