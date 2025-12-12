import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

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

interface ServiceModalProps {
  service: Service;
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
        // RESTAURER LE SCROLL DU BODY
        document.body.style.overflow = 'auto';
        // Appeler la fonction originale de fermeture
        onClose();
      }
    });
  };

  const handleContactRedirect = () => {
    // Fermer le modal d'abord
    handleClose();
    
    // Attendre que l'animation de fermeture soit terminée
    setTimeout(() => {
      // Rediriger vers la section contact
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500); // Attendre 500ms pour que l'animation de fermeture soit terminée
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

  // Cleanup quand le composant est démonté
  useEffect(() => {
    return () => {
      // S'assurer que le scroll est restauré si le composant est démonté
      document.body.style.overflow = 'auto';
    };
  }, []);

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
                      Retour aux services
                    </button>
                    <button
                      onClick={handleContactRedirect}
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

export default ServiceModal;