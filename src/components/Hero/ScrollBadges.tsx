// ScrollBadges.tsx - CORRIGÉ
import React from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollBadgesProps {
  badgesRef: React.RefObject<HTMLDivElement>;
}

const ScrollBadges = React.memo(({ badgesRef }: ScrollBadgesProps) => {
  useGSAP(() => {
    if (!badgesRef.current) return;
    
    const badgeItems = gsap.utils.toArray<HTMLElement>(".badge-item");

    // Timeline pour les 3 badges liés au scroll
    const badgesTl = gsap.timeline({
      scrollTrigger: {
        trigger: badgesRef.current,
        start: "top 90%",
        end: "bottom 40%",
        scrub: -2,
        markers: false,
      },
    });

    // Badge 1 (0-33%)
    badgesTl.fromTo(badgeItems[0], 
      { opacity: 0, y: 80, scale: 0.6, rotationX: 45 }, 
      { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 0.8 }
    );

    // Badge 2 (33-66%)
    badgesTl.fromTo(badgeItems[1], 
      { opacity: 0, y: 80, scale: 0.6, rotationX: 45 }, 
      { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 0.8 },
      "-=0.6"
    );

    // Badge 3 (66-100%)
    badgesTl.fromTo(badgeItems[2], 
      { opacity: 0, y: 80, scale: 0.6, rotationX: 45 }, 
      { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 1 },
      "-=0.6"
    );

    return () => {
      badgesTl.kill(); // Cleanup
    };
  }, { scope: badgesRef });

  return (
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
              <span className="text-sm opacity-80 block mt-1">
                clients partout dans le monde
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

ScrollBadges.displayName = "ScrollBadges";
export default ScrollBadges;
