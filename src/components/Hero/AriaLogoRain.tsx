import React, { useMemo } from "react";

const AriaLogoRain = React.memo(() => {
  const logosData = useMemo(() => {
    return [...Array(12)].map((_, i) => {
      const size = 30 + Math.random() * 50;
      const opacity = 0.3 + Math.random() * 0.4;
      const rotationSpeed = 0.5 + Math.random() * 1;
      const startX = Math.random() * 100;
      const endX = startX + (Math.random() * 40 - 20);

      return {
        key: i,
        size,
        opacity,
        rotationSpeed,
        startX,
        endX,
        top: -10 - Math.random() * 20,
        animationDelay: Math.random() * 0.3,
        animationDuration: 15 + Math.random() * 10,
        scale: 0.5 + Math.random() * 0.5,
        blur: Math.random() * 4,
        zIndex: Math.floor(Math.random() * 10),
      };
    });
  }, []);

  return (
    <div className="aria-logo-fall-container absolute inset-0 overflow-hidden rounded-3xl z-0">
      {logosData.map((logo) => (
        <div
          key={logo.key}
          className="absolute aria-logo-drop"
          style={{
            left: `${logo.startX}%`,
            top: `${logo.top}%`,
            animationDelay: `${logo.animationDelay}s`,
            animationDuration: `${logo.animationDuration}s`,
            opacity: logo.opacity,
            "--size": `${logo.size}px`,
            "--rotation-speed": `${logo.rotationSpeed}`,
            "--start-x": `${logo.startX}%`,
            "--end-x": `${logo.endX}%`,
            "--scale": logo.scale,
            "--blur": `${logo.blur}px`,
            zIndex: logo.zIndex,
          } as React.CSSProperties}
        >
          <div
            className="relative"
            style={{
              width: "var(--size)",
              height: "var(--size)",
            }}
          >
            <div
              className="absolute -inset-4 rounded-full opacity-30"
              style={{
                background: `radial-gradient(circle at center, rgba(249, 115, 22, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)`,
                filter: "blur(8px)",
              }}
            />
            <img
              src="/images/aria-logo.png"
              alt="Logo Aria"
              className="w-full h-full object-contain drop-shadow-lg"
              style={{
                filter: `drop-shadow(0 2px 6px rgba(249, 115, 22, 0.4)) drop-shadow(0 2px 6px rgba(59, 130, 246, 0.4)) blur(var(--blur, 0px))`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-full mix-blend-overlay" />
          </div>
        </div>
      ))}
    </div>
  );
});

AriaLogoRain.displayName = "AriaLogoRain";
export default AriaLogoRain;
