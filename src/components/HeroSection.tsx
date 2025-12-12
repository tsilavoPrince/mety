// HeroSection.tsx - VERSION FINALE (badges GSAP supprimés)
import React, { useState, useRef, useCallback } from "react";
import { useParallax } from "@/hooks/useScrollAnimation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeroBackground from "./Hero/HeroBackground";
import HeroContent from "./Hero/HeroContent";
import AriaLogoRain from "./Hero/AriaLogoRain";
import ImageCarousel from "./Hero/ImageCarousel";
import ScrollBadges from "./Hero/ScrollBadges";
import "@/styles/animations.css";
import "@/styles/HeroSection.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef<HTMLElement | null>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const { offset } = useParallax(0.3);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    }
  }, []);

  // ✅ Props stables pour React.memo
  const handleScrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useGSAP(() => {
    // ✅ UNIQUEMENT animations HeroSection (badges supprimés)
    gsap.from(".hero-title-main", { opacity: 0, y: 40, duration: 1, delay: 0.4, ease: "power3.out" });
    gsap.from(".hero-subtitle-main", { opacity: 0, y: 30, duration: 0.8, delay: 0.6, ease: "power3.out" });
    gsap.set(".hero-cta-button", { opacity: 1, display: "inline-flex" });
    gsap.from(".hero-cta-button", { opacity: 0, y: 25, duration: 0.6, stagger: 0.2, delay: 0.8, ease: "back.out(1.7)" });
    
    if (logosRef.current) {
      gsap.from(logosRef.current, { opacity: 0, x: 50, duration: 1, delay: 1.1, ease: "power3.out" });
    }

    // ✅ CARROUSEL GSAP (était manquant !)
    const images = gsap.utils.toArray<HTMLElement>(".carousel-gsap .carousel-image");
    if (images.length > 1) {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
      images.forEach((img, index) => {
        tl.to(img, { opacity: 1, scale: 1.05, duration: 1.2, ease: "power2.out" }, index === 0 ? 0 : ">")
          .to(img, { opacity: 0, scale: 1, duration: 1.2, ease: "power2.inOut" }, "+=3");
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="accueil"
      className="hero-bg text-white overflow-hidden"
      style={{ transform: `translateY(${offset * 0.4}px)` }}
      onMouseMove={handleMouseMove}
    >
      <HeroBackground mousePosition={mousePosition} />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-8">
          <HeroContent onScrollTo={handleScrollTo} />
          
          <div className="lg:w-1/2 flex flex-col">
            <div className="flex-1 relative perspective-800">
              <img 
                src="/images/aria-logo.png" 
                alt="Logo Aria" 
                className="aria-logo absolute -top-[4rem] left-1/2 transform -translate-x-1/2 z-40 w-44 sm:w-48 md:w-52 h-auto object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.6)] hover:scale-110 transition-transform duration-500" 
              />
              
              <div ref={logosRef} className="relative logo-glass-blur rounded-3xl h-full flex flex-col items-center justify-center overflow-hidden p-8 pt-24 mt-8">
                <div 
                  className="absolute -top-12 left-0 right-0 h-24 z-30"
                  style={{ 
                    background: "linear-gradient(to bottom, rgba(8, 12, 25, 0.8) 0%, rgba(8, 12, 25, 0) 100%)", 
                    maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 70%)", 
                    WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 70%)", 
                    pointerEvents: "none" 
                  }} 
                />
                <AriaLogoRain />
                <ImageCarousel />
              </div>
            </div>
          </div>
        </div>
        <ScrollBadges badgesRef={badgesRef} />
      </div>
    </section>
  );
};

export default HeroSection;
