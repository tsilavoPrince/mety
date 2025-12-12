import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const AboutHeader = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animation d'entrée de la section
      gsap.fromTo(sectionRef.current, 
        { opacity: 0, scale: 0.98, filter: "blur(15px)" },
        { 
          opacity: 1, scale: 1, filter: "blur(0px)", 
          duration: 2, ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" }
        }
      );

      // Animation du titre
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40, scale: 0.95, filter: "blur(8px)" },
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.5, delay: 0.3, ease: "back.out(1.5)",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" }
        }
      );

      // Animation de la description
      gsap.fromTo(descriptionRef.current,
        { opacity: 0, y: 30, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, delay: 0.5, ease: "power3.out",
          scrollTrigger: { trigger: descriptionRef.current, start: "top 85%" }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="text-center mb-16 max-w-4xl mx-auto">
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
  );
};

export default AboutHeader;
