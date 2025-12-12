import React, { useState, useEffect, useRef } from 'react';
import ProjectCard from "@/components/ProjectCard";
import { getClientProjects } from "@/services/projectsService";
import { Project } from "@/services/api";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import "@/styles/animations.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectsModal from "@/components/ProjectsModal"; // ← NOUVEAU IMPORT


gsap.registerPlugin(ScrollTrigger);

interface PortfolioItem {
  image: string;
  title: string;
  description: string;
  objective: string;
}

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { elementRef, isVisible } = useScrollAnimation<HTMLDivElement>();
  const sectionRef = useRef<HTMLElement | null>(null);

  const portfolioItems: PortfolioItem[] = [
    {
      image: "/images/approche.avif",
      title: "Refonte du site d'une entreprise de services",
      description: "Site vitrine moderne, prise de contact simplifiée, blog intégré.",
      objective: "améliorer la crédibilité et générer plus de demandes de devis."
    },
    {
      image: "/images/qualite.jpg",
      title: "Création de l'identité visuelle d'une marque locale",
      description: "Logo, charte graphique, supports imprimés et visuels réseaux sociaux.",
      objective: "uniformiser la communication et monter en gamme."
    },
    {
      image: "/images/connect.png",
      title: "Plateforme interne + automatisations",
      description: "Outil web pour gérer les clients, les demandes et les documents.",
      objective: "réduire la charge manuelle et centraliser l'information."
    }
  ];


useEffect(() => {
  if (!sectionRef.current) return;

  const ctx = gsap.context(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".portfolio-item");

    // Position initiale
    gsap.set(cards, { y: 200, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 0.5%", // plus bas pour ne pas bloquer trop tôt
        end: "+=800",
        scrub: true,
        pin: true, // désactive le pin si c'est lui qui casse la page
      },
    });

    cards.forEach((card, index) => {
      tl.to(
        card,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        index * 0.6
      );
    });
  }, sectionRef);

  return () => ctx.revert();
}, []);



  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        const clientProjects = await getClientProjects();
        if (clientProjects.length > 0) {
          setProjects(clientProjects);
        }
      } catch {
        console.error("Erreur lors du chargement des projets");
      } finally {
        setIsLoading(false);
      }
    };
    loadProjects();
  }, []);

  // Animation d'ouverture/fermeture de la modale
  useEffect(() => {
    if (!showModal) return;

    const tl = gsap.timeline();
    tl.fromTo("#projects-modal",
      { scale: 0.7, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
    );

    return () => {
      gsap.to("#projects-modal", {
        scale: 0.7,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      });
    };
  }, [showModal]);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <section
  ref={(el) => {
    sectionRef.current = el;
    if (typeof elementRef === "function") elementRef(el);
  }}
  id="realisations"
  className="relative py-20 overflow-hidden"
>
  {/* Vidéo de fond */}
  <video
    className="absolute inset-0 w-full h-full object-cover"
    autoPlay
    loop
    muted
    playsInline
  >
    <source src="/images/baobab.webm" type="video/webm" />
    {/* Optionnel: fallback image ou autre format */}
  </video>

  {/* Overlay blur + assombrissement */}
  <div className="absolute inset-0 bg-black/60 backdrop-blur" />

  <div className="container mx-auto px-6 max-w-6xl relative z-10">
    {/* TITRE PRINCIPAL */}
    <div className="text-center mb-16">
      <h2 className="section-title text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-200 via-orange-300 to-orange-600 bg-clip-text text-transparent mb-6">
        Nos réalisations
      </h2>
      <p className="section-subtitle text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
        Quelques projets que nous avons accompagnés, de la réflexion à la mise en ligne.
      </p>
    </div>

    {/* GRID 3 PROJETS */}
    <div className="portfolio-grid mb-16">
      {portfolioItems.map((item, index) => (
        <div key={`preview-${index}`} className="portfolio-item">
          <div className="portfolio-image">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="portfolio-content">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><strong>Objectif :</strong> {item.objective}</p>
          </div>
        </div>
      ))}
    </div>

    {/* BOUTON MODALE */}
    <div className="text-center">
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-primary inline-flex items-center gap-2 px-8 py-4 hover:bg-white-300 text-orange-300 font-bold text-lg rounded-xl shadow-xl hover:shadow-orange-500/50 transition-all duration-300 hover:-translate-y-1 border border-orange-400/50"
      >
        Voir toutes nos réalisations
      </button>
    </div>
  </div>
</section>



      {/* NOUVELLE MODALE SÉPARÉE - SANS TITRE, 2 COLONNES MAX */}
      {showModal && (
        <ProjectsModal onClose={closeModal} />
      )}

      <style jsx>{`
  .portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .portfolio-item {
    background: transparent;
    border-radius: 15px;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    cursor: pointer;
    transform: translateY(100px);
    opacity: 0;
    position: relative;
  }

  .portfolio-item:hover {
    box-shadow: 0 20px 50px rgba(251, 146, 60, 0.3);
  }
  
  .portfolio-image {
    height: 200px;
    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: white;
    position: relative;
    z-index: 2;
  }

  .portfolio-content {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    position: relative;
    z-index: 2;
    margin-top: -2rem; /* Plus de chevauchement */
  }

  /* ZONE DE SÉPARATION DÉGRADÉE + FLUE */
  .portfolio-item::before {
    content: '';
    position: absolute;
    top: 170px; /* Position parfaite sous l'image */
    left: 0;
    right: 0;
    height: 60px; /* Zone plus large */
    /* DÉGRADÉ ORANGE VERS TRANSPARENT */
    background: linear-gradient(
      180deg,
      rgba(249, 115, 22, 0.4) 0%,
      rgba(234, 88, 12, 0.6) 30%,
      rgba(12, 12, 12, 0.8) 70%,
      transparent 100%
    );
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    z-index: 1;
    pointer-events: none;
    border-radius: 0 0 15px 15px; /* Coins arrondis en bas */
  }

  .portfolio-content h3 {
    color: #eca740ff;
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.4;
  }
  .portfolio-content p {
    color: #a7a2a2ff;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 0.25rem;
  }
  .portfolio-content p:last-child {
    font-weight: 600;
    color: #eaeaebff;
  }

  @media (max-width: 768px) {
    .portfolio-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    .portfolio-image {
      height: 160px;
      font-size: 2.5rem;
    }
    .portfolio-item::before {
      top: 140px;
      height: 50px;
    }
  }
`}</style>

    </>
  );
};

export default ProjectsSection;
