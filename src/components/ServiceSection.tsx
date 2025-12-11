import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceModalProps {
  service: typeof services[0];
  isOpen: boolean;
  onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!modalRef.current || !contentRef.current) return;

    if (isOpen) {
      // Empêcher le scroll du body
      document.body.style.overflow = 'hidden';
      
      const ctx = gsap.context(() => {
        // Animation d'entrée du modal
        gsap.fromTo(modalRef.current,
          { opacity: 0 },
          { 
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
          }
        );

        // Animation d'entrée du contenu
        gsap.fromTo(contentRef.current,
          {
            opacity: 0,
            y: 80,
            scale: 0.95,
            rotationX: 10,
            filter: "blur(10px)"
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            filter: "blur(0px)",
            duration: 0.8,
            delay: 0.1,
            ease: "back.out(1.2)"
          }
        );

        // Animation spéciale pour le bouton fermeture
        gsap.fromTo(closeBtnRef.current,
          {
            opacity: 0,
            scale: 0.5,
            rotation: -180
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            delay: 0.3,
            ease: "back.out(1.5)"
          }
        );

        // Animation des éléments enfants
        gsap.from(contentRef.current?.querySelectorAll('.modal-child'), {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.6,
          delay: 0.4,
          ease: "power2.out"
        });

        // Focus sur le bouton de fermeture pour accessibilité
        if (closeBtnRef.current) {
          closeBtnRef.current.focus();
        }
      });

      return () => ctx.revert();
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleClose = () => {
    if (!modalRef.current || !contentRef.current) return;

    // Animation de sortie du bouton fermeture
    gsap.to(closeBtnRef.current, {
      opacity: 0,
      scale: 0.5,
      rotation: 180,
      duration: 0.3,
      ease: "power2.in"
    });

    // Animation de sortie du contenu
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 80,
      scale: 0.95,
      duration: 0.5,
      ease: "power2.in"
    });

    // Animation de sortie du modal
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: 0.2,
      ease: "power2.in",
      onComplete: () => {
        // Appeler la fonction originale de fermeture
        onClose();
        // Redirection vers l'index
        window.location.href = "/";
      }
    });
  };

  // Fermer avec la touche ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-border {
          0%, 100% { border-color: rgba(249, 115, 22, 0.3); }
          50% { border-color: rgba(249, 115, 22, 0.6); }
        }
      `}</style>
      
      {/* Overlay avec blur */}
      <div
        ref={modalRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        {/* Backdrop avec effet glass */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-lg" />
        
        {/* Contenu du modal */}
        <div
          ref={contentRef}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* BOUTON FERMETURE GRAND ET VISIBLE */}
          <button
            ref={closeBtnRef}
            onClick={handleClose}
            className="fixed top-8 right-8 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-orange-400/50 flex items-center justify-center text-orange-300 hover:from-orange-500 hover:to-orange-600 hover:border-orange-300 hover:text-white transition-all duration-300 shadow-2xl shadow-black/50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-900 animate-pulse-border"
            style={{ animation: 'pulse-border 2s infinite' }}
            aria-label="Fermer le modal"
          >
            <svg 
              className="w-7 h-7" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2.5} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
            {/* Effet de glow */}
            <div className="absolute -inset-1 rounded-full bg-orange-500/20 blur-md opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </button>

          <div className="bg-gradient-to-br from-gray-800/90 via-slate-900/90 to-gray-900/95 backdrop-blur-2xl border border-orange-400/30 rounded-3xl shadow-2xl shadow-orange-500/10 overflow-hidden">
            {/* Header du modal */}
            <div className="relative p-8 border-b border-orange-400/20 bg-gradient-to-r from-orange-500/5 via-orange-500/10 to-orange-500/5">
              {/* Effets décoratifs */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-400/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
              
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex items-center space-x-4">

                  <div>
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-200">
                      {service.title}
                    </h2>
                    <p className="text-orange-300/70 text-sm font-medium mt-1 modal-child">
                      Service Premium
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenu détaillé */}
            <div className="p-8 space-y-8">
              {/* Description détaillée */}
              <div className="modal-child">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 animate-pulse" />
                  Description Complète
                </h3>
                <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                  <p className="text-gray-300/90 leading-relaxed text-lg">
                    {service.detailedDescription}
                  </p>
                </div>
              </div>

              {/* Processus */}
              <div className="modal-child">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 animate-pulse" />
                  Notre Processus
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.process.map((step, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-xl p-5 border border-orange-400/20 hover:border-orange-300/40 transition-all duration-300 group"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-400/30 flex items-center justify-center text-orange-300 font-bold text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-white mb-1 group-hover:text-orange-200 transition-colors">
                            {step.title}
                          </h4>
                          <p className="text-gray-300/80 text-sm">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies & Outils */}
              {service.technologies && (
                <div className="modal-child">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 animate-pulse" />
                    Technologies & Outils
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {service.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-orange-400/20 text-orange-300 text-sm hover:from-orange-500/20 hover:to-orange-600/20 hover:border-orange-300/40 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Avantages Clés */}
              <div className="modal-child">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 animate-pulse" />
                  Avantages Clés
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-4 rounded-xl bg-gray-800/20 border border-gray-700/30 hover:border-orange-400/30 transition-all duration-300"
                    >
                      <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exemples de Projets */}
              {service.examples && (
                <div className="modal-child">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 animate-pulse" />
                    Exemples de Réalisations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {service.examples.map((example, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-xl p-5 border border-gray-700/30 hover:border-orange-400/30 transition-all duration-300 group"
                      >
                        <div className="text-orange-400 text-lg mb-2 group-hover:text-orange-300">
                          {example.icon}
                        </div>
                        <h4 className="font-bold text-white mb-2 group-hover:text-orange-200">
                          {example.title}
                        </h4>
                        <p className="text-gray-300/80 text-sm">
                          {example.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Final */}
              <div className="modal-child pt-8 border-t border-orange-400/20">
                <div className="text-center">
                  <p className="text-gray-300/80 mb-6 text-lg">
                    Prêt à transformer votre vision en réalité ?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handleClose}
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-600 text-gray-300 font-medium hover:from-gray-700 hover:to-gray-800 hover:border-gray-500 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                      Retour à l'accueil
                    </button>
                    <button
                      onClick={handleClose}
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold hover:from-orange-600 hover:to-orange-700 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                      Discuter de mon projet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ServicesSection = () => {
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
          start: "top 85%",
        }
      });

      // Animation des cartes en séquence
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 60,
            scale: 0.92,
            rotationX: 15,
            rotationY: index % 2 === 0 ? -8 : 8,
            filter: "brightness(0.6) blur(8px)"
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            filter: "brightness(1) blur(0px)",
            duration: 1.2,
            delay: index * 0.15,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          }
        );

        // Animation au hover
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -8,
            scale: 1.02,
            rotationY: index % 2 === 0 ? -2 : 2,
            duration: 0.5,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.5,
            ease: "power2.out"
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const services = [
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
        { icon: "🏢", title: "Portail Entreprise", description: "Solution complète avec gestion des employés" },
        { icon: "🛒", title: "E-commerce Premium", description: "Plateforme avec paiement sécurisé" },
        { icon: "📱", title: "Application Mobile", description: "App iOS & Android synchronisée" }
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
        {  title: "Automatisation RH", description: "Gestion des processus recrutement" },
        {  title: "Dashboard IA", description: "Tableaux de bord prédictifs" }
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
                {/* Effet de glow au hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/0 via-orange-400/20 to-orange-500/0 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                
                {/* Carte */}
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-gray-800/70 to-slate-900/50 backdrop-blur-xl border border-orange-400/20 hover:border-orange-300/40 transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(249,115,22,0.25)] shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden">
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

export default ServicesSection;