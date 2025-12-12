import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const AnimatedBackground: React.FC = () => {
  const bgContainerRef = useRef<HTMLDivElement>(null);
  const logoTrack1Ref = useRef<HTMLDivElement>(null);
  const logoTrack2Ref = useRef<HTMLDivElement>(null); // ✅ FIXED: nouveau ref

  useEffect(() => {
    if (
      !bgContainerRef.current ||
      !logoTrack1Ref.current ||
      !logoTrack2Ref.current
    )
      return;

    const container = bgContainerRef.current;

    // Animation logos - vitesse variable
    const tl1 = gsap.to(logoTrack1Ref.current!, {
      x: "-50%",
      duration: 45,
      repeat: -1,
      ease: "none",
    });

    const tl2 = gsap.to(logoTrack2Ref.current!, { // ✅ FIXED: utilise logoTrack2Ref
      x: "50%",
      duration: 38,
      repeat: -1,
      ease: "none",
    });

    // Particules ORANGE (30)
    const orangeParticles = container.querySelectorAll(".bg-particle-orange");
    gsap.to(orangeParticles, {
      y: "-120vh",
      rotation: "+=720",
      scale: "+=0.5",
      opacity: 0,
      stagger: { amount: 4, from: "random", repeat: -1 },
      duration: { min: 15, max: 30 },
      ease: "power2.inOut",
    });

    // Particules BLEUES (30)
    const blueParticles = container.querySelectorAll(".bg-particle-blue");
    gsap.to(blueParticles, {
      y: "-100vh",
      rotation: "-=360",
      scale: 1.3,
      opacity: 0,
      stagger: { amount: 3, from: "end", repeat: -1 },
      duration: { min: 20, max: 35 },
      ease: "power1.inOut",
    });

    // Particules VIOLETTES (30)
    const purpleParticles = container.querySelectorAll(".bg-particle-purple");
    gsap.to(purpleParticles, {
      y: "-140vh",
      x: "+=30",
      rotation: "+=540",
      scale: 0.8,
      opacity: 0,
      stagger: { amount: 5, from: "start", repeat: -1 },
      duration: { min: 12, max: 25 },
      ease: "power3.inOut",
    });

    // NOUVELLES Particules VERTES (20)
    const greenParticles = container.querySelectorAll(".bg-particle-green");
    gsap.to(greenParticles, {
      y: "-80vh",
      x: "-=20",
      rotation: "-=480",
      scale: 1.5,
      opacity: 0,
      stagger: { amount: 2.5, from: "center", repeat: -1 },
      duration: { min: 18, max: 32 },
      ease: "power2.out",
    });

    // Formes géométriques
    gsap.to(".bg-shape", {
      y: "-=60",
      rotation: "+=180",
      scale: 1.2,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Flottement logos
    gsap.to([logoTrack1Ref.current!, logoTrack2Ref.current!], {
      y: "+=8",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      tl1.kill();
      tl2.kill();
      gsap.killTweensOf([orangeParticles, blueParticles, purpleParticles, greenParticles]);
    };
  }, []);

  return (
    <div
      ref={bgContainerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* Rangée 1 - logos grands (GAUCHE → DROITE) */}
      <div className="absolute top-[15%] left-0 w-[200%] h-24 flex items-center whitespace-nowrap">
        <div
          ref={logoTrack1Ref}
          className="w-full flex items-center space-x-20 sm:space-x-24"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={`track1-${i}`}
              className="flex-shrink-0 w-36 sm:w-40 h-20 sm:h-24 bg-gradient-to-br from-orange-400/15 to-orange-500/10 backdrop-blur-2xl rounded-2xl shadow-xl flex items-center justify-center hover:scale-105 transition-all duration-300"
            >
              <img
                src="/images/aria-logo.png"
                alt="ARIA"
                className="w-28 sm:w-32 h-14 sm:h-16 object-contain opacity-90 drop-shadow-2xl filter brightness-110"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Rangée 2 - IDENTIQUE (DROITE → GAUCHE) */}
      <div className="absolute top-[55%] left-0 w-[200%] h-24 flex items-center whitespace-nowrap">
        <div
          ref={logoTrack2Ref} // ✅ FIXED: bon ref
          className="w-full flex items-center space-x-20 sm:space-x-24"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={`track2-${i}`}
              className="flex-shrink-0 w-36 sm:w-40 h-20 sm:h-24 bg-gradient-to-br from-orange-400/15 to-orange-500/10 backdrop-blur-2xl rounded-2xl shadow-xl flex items-center justify-center hover:scale-105 transition-all duration-300"
            >
              <img
                src="/images/aria-logo.png"
                alt="ARIA"
                className="w-28 sm:w-32 h-14 sm:h-16 object-contain opacity-90 drop-shadow-2xl filter brightness-110"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 110 PARTICULES au total */}

      {/* Particules ORANGE (30) */}
      {Array.from({ length: 30 }, (_, i) => (
        <div
          key={`orange-${i}`}
          className="bg-particle-orange absolute bg-gradient-to-r from-orange-400/70 via-orange-500/60 to-orange-600/50 rounded-full blur-sm shadow-lg"
          style={{
            left: `${Math.random() * 100}%` as any,
            top: `${Math.random() * 120}%` as any,
            width: `${1.5 + Math.random() * 3}px` as any,
            height: `${1.5 + Math.random() * 3}px` as any,
          }}
        />
      ))}

      {/* Particules BLEUES (30) */}
      {Array.from({ length: 30 }, (_, i) => (
        <div
          key={`blue-${i}`}
          className="bg-particle-blue absolute bg-gradient-to-r from-blue-400/60 via-blue-500/50 to-indigo-500/40 rounded-full blur-sm shadow-md"
          style={{
            left: `${Math.random() * 100}%` as any,
            top: `${Math.random() * 120}%` as any,
            width: `${1 + Math.random() * 2.5}px` as any,
            height: `${1 + Math.random() * 2.5}px` as any,
          }}
        />
      ))}

      {/* Particules VIOLETTES (30) */}
      {Array.from({ length: 30 }, (_, i) => (
        <div
          key={`purple-${i}`}
          className="bg-particle-purple absolute bg-gradient-to-r from-purple-400/50 via-pink-500/40 to-orange-400/30 rounded-full blur-sm shadow-lg"
          style={{
            left: `${Math.random() * 100}%` as any,
            top: `${Math.random() * 120}%` as any,
            width: `${2 + Math.random() * 4}px` as any,
            height: `${2 + Math.random() * 4}px` as any,
          }}
        />
      ))}

      {/* NOUVELLES Particules VERTES (20) */}
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={`green-${i}`}
          className="bg-particle-green absolute bg-gradient-to-r from-emerald-400/60 via-green-500/50 to-teal-500/40 rounded-full blur-sm shadow-md"
          style={{
            left: `${Math.random() * 100}%` as any,
            top: `${Math.random() * 120}%` as any,
            width: `${1.8 + Math.random() * 3.5}px` as any,
            height: `${1.8 + Math.random() * 3.5}px` as any,
          }}
        />
      ))}

      {/* Formes géométriques */}
      <div className="bg-shape absolute top-10 left-10 w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 bg-gradient-to-br from-orange-500/8 to-orange-400/4 rounded-full blur-2xl opacity-50 animate-pulse" />
      <div className="bg-shape absolute bottom-20 right-20 w-32 h-32 sm:w-44 sm:h-44 lg:w-56 lg:h-56 bg-gradient-to-r from-orange-400/6 to-orange-300/6 rounded-3xl blur-xl opacity-40 rotate-[-12deg]" />

      {/* Lignes diagonales */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-32 sm:h-48 lg:h-64 bg-gradient-to-b from-orange-400/30 via-orange-500/20 to-transparent rounded-sm rotate-[-12deg] animate-pulse"
            style={{
              left: `${5 + i * 5}%` as any,
              top: `${10 + i * 3}%` as any,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .bg-particle-orange,
        .bg-particle-blue,
        .bg-particle-purple,
        .bg-particle-green {
          animation: float-up linear infinite;
        }

        @keyframes float-up {
          0% {
            transform: translateY(120vh) translateX(0) rotate(0deg) scale(0.5);
            opacity: 0;
          }
          15% {
            opacity: 0.8;
          }
          85% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-120vh)
              translateX(${Math.random() * 100 - 50}px) rotate(720deg)
              scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
