import React, { useEffect, useRef } from "react";

const HeroBackground = React.memo(({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const particlesRef = useRef<HTMLDivElement>(null);

  // Particules flottantes OPTIMISÉES
  useEffect(() => {
    if (!particlesRef.current) return;
    const container = particlesRef.current;
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
      container.appendChild(particle);
    }

    return () => {
      if (container) container.innerHTML = "";
    };
  }, []);

  return (
    <>
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
    </>
  );
});

HeroBackground.displayName = "HeroBackground";
export default HeroBackground;
