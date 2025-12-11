import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Rocket, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { useParallax } from "@/hooks/useScrollAnimation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "@/styles/animations.css";
import "@/styles/HeroSection.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef<HTMLElement | null>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const { offset } = useParallax(0.3);

  // Particules flottantes
  useEffect(() => {
    if (!particlesRef.current) return;
    const particlesContainer = particlesRef.current;
    const particlesCount = 15;

    for (let i = 0; i < particlesCount; i++) {
      const particle = document.createElement("div");
      particle.className = "floating-particle";

      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const size = 2 + Math.random() * 3;
      const duration = 3 + Math.random() * 4;
      const delay = Math.random() * 2;

      particle.style.cssText = `
        position: absolute;
        left: ${left}%;
        top: ${top}%;
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(135deg, rgba(249,115,22,0.3), rgba(59,130,246,0.3));
        border-radius: 50%;
        opacity: ${0.3 + Math.random() * 0.4};
        animation: float-particle ${duration}s ease-in-out ${delay}s infinite;
      `;

      particlesContainer.appendChild(particle);
    }

    return () => {
      particlesContainer.innerHTML = "";
    };
  }, []);

  // Animations GSAP
  useGSAP(
    () => {
      // Titre, sous-titre, CTA (on load)
      gsap.from(".hero-title-main", {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".hero-subtitle-main", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out",
      });

      gsap.set(".hero-cta-button", { opacity: 1, display: "inline-flex" });
      gsap.from(".hero-cta-button", {
        opacity: 0,
        y: 25,
        duration: 0.6,
        stagger: 0.2,
        delay: 0.8,
        ease: "back.out(1.7)",
      });

      // Bloc de droite
      if (logosRef.current) {
        gsap.from(logosRef.current, {
          opacity: 0,
          x: 50,
          duration: 1,
          delay: 1.1,
          ease: "power3.out",
        });
      }

      // Carrousel GSAP (loop)
      const images = gsap.utils.toArray<HTMLElement>(".carousel-gsap .carousel-image");
      if (images.length > 1) {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
        images.forEach((img, index) => {
          tl.to(img, {
            opacity: 1,
            scale: 1.05,
            duration: 1.2,
            ease: "power2.out",
          }, index === 0 ? 0 : ">")
            .to(img, {
              opacity: 0,
              scale: 1,
              duration: 1.2,
              ease: "power2.inOut",
            }, "+=3");
        });
      }

      // 🔥 BADGES - ANIMATION PROGRESSIVE AVEC SCROLL (SCRUB)
      if (badgesRef.current) {
        const badgeItems = gsap.utils.toArray<HTMLElement>(".badge-item");

        // Timeline pour les 3 badges liés au scroll
        const badgesTl = gsap.timeline({
          scrollTrigger: {
            trigger: badgesRef.current,
            start: "top 90%",
            end: "bottom 20%",
            scrub: 1, // 🎯 ANIMATION LIÉE AU SCROLL
            markers: false,
          }
        });

        // Badge 1 (0-33% du scroll)
        badgesTl.fromTo(badgeItems[0], 
          { opacity: 0, y: 80, scale: 0.6, rotationX: 45 },
          { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 0.8 }
        );

        // Badge 2 (33-66% du scroll)
        badgesTl.fromTo(badgeItems[1], 
          { opacity: 0, y: 80, scale: 0.6, rotationX: 45 },
          { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 0.8 },
          "-=0.6"
        );

        // Badge 3 (66-100% du scroll)
        badgesTl.fromTo(badgeItems[2], 
          { opacity: 0, y: 80, scale: 0.6, rotationX: 45 },
          { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 1 },
          "-=0.6"
        );
      }
    },
    { scope: sectionRef }
  );

  // Halo souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    const section = sectionRef.current;
    section?.addEventListener("mousemove", handleMouseMove);
    return () => section?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="accueil"
      className="hero-bg text-white overflow-hidden"
      style={{ transform: `translateY(${offset * 0.4}px)` }}
    >
      {/* Fond */}
      <div className="baobab-bg" />
      <div className="baobab-overlay" />

      {/* Halo souris */}
      <div
        className="pointer-events-none cursor-glow opacity-50 sm:opacity-70 md:opacity-90 absolute -translate-x-1/2 -translate-y-1/2 blur-3xl sm:blur-4xl hidden md:block"
        style={{
          left: `${mousePosition.x * 100}%`,
          top: `${mousePosition.y * 100}%`,
          width: "300px",
          height: "300px",
        }}
      />

      {/* Orbes */}
      <div className="pointer-events-none absolute -right-20 -top-20 w-48 h-48 rounded-full bg-gradient-to-r from-orange-500/10 via-blue-500/10 to-purple-500/10 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 w-40 h-40 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-orange-500/10 blur-3xl animate-float-slow" />

      {/* Particules */}
      <div ref={particlesRef} className="floating-particles" />

      {/* Contenu */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-8">
          {/* Gauche */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="text-center lg:text-left space-y-10 flex-1">
              <div className="space-y-6">
                <h1 className="hero-title-main text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                  <span className="title-gradient">
                    L'agence digitale qui transforme vos idées en résultats
                  </span>
                </h1>
                <p className="hero-subtitle-main text-xl text-slate-300 leading-relaxed">
                  Nous concevons des sites web, applications, identités visuelles
                  et solutions IA qui font vraiment grandir votre business.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <Button
                  className="btn-primary-orange hero-cta-button text-lg px-10 py-6 rounded-full font-bold transition-all duration-300"
                  onClick={() => handleScrollTo("contact")}
                >
                  <span className="flex items-center justify-center gap-3">
                    <CheckCircle className="w-5 h-5" />
                    <span>Obtenir un devis</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>

                <Button
                  className="btn-outline-orange hero-cta-button text-lg px-10 py-6 rounded-full font-bold transition-all duration-300"
                  onClick={() => handleScrollTo("realisations")}
                >
                  <span className="flex items-center justify-center gap-3">
                    <Rocket className="w-5 h-5" />
                    <span>Voir nos réalisations</span>
                    <Sparkles className="w-4 h-4" />
                  </span>
                </Button>
              </div>
            </div>
          </div>

          {/* Droite */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="flex-1 relative perspective-800">
              <div className="absolute -top-[3rem] left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center">
                <img
                  src="/images/aria-logo.png"
                  alt="Logo Aria"
                  className="aria-logo w-40 sm:w-44 md:w-48 h-auto object-contain 
                         drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] 
                         hover:scale-105 transition-transform duration-500"
                />
                <div className="aria-line"></div>
              </div>

              <div
                ref={logosRef}
                className="relative logo-glass-blur rounded-3xl h-full flex flex-col 
                       items-center justify-center overflow-hidden p-8 pt-20"
              >
                <div className="carousel-gsap relative w-full h-64 rounded-2xl overflow-hidden">
                  <img
                    src="/images/bureau.jpg"
                    alt="Bureau Aria"
                    className="carousel-image absolute inset-0 w-full h-full object-cover opacity-1"
                  />
                  <img
                    src="/images/teamwork.jpg"
                    alt="Travail d'équipe"
                    className="carousel-image absolute inset-0 w-full h-full object-cover opacity-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Badges - SCRUB SCROLL */}
        <div ref={badgesRef} className="mt-12 lg:mt-16 pt-8 border-t border-white/10">
          <div className="badges-container">
            <div className="badge-item">
              <div className="badge-content">
                <span className="badge-text">+50 projets livrés</span>
              </div>
            </div>
            <div className="badge-item">
              <div className="badge-content">
                <span className="badge-text">Accompagnement de A à Z</span>
              </div>
            </div>
            <div className="badge-item">
              <div className="badge-content">
                <span className="badge-text">
                  Basé à Madagascar
                  <br />
                  <span className="text-sm opacity-80">clients partout dans le monde</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
