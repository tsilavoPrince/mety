import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "@/components/ProjectCard";
import { getClientProjects } from "@/services/projectsService";
import { Project } from "@/services/api";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsModalProps {
  onClose: () => void;
}

const ProjectsModal: React.FC<ProjectsModalProps> = ({ onClose }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        const clientProjects = await getClientProjects();
        setProjects(clientProjects); // même si 0, on garde la valeur
      } catch {
        console.error("Erreur lors du chargement des projets");
      } finally {
        setIsLoading(false);
      }
    };
    loadProjects();
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        scale: 0.98,
        duration: 0.6,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-lg flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        ref={sectionRef}
        className="relative w-full max-w-6xl max-h-[90vh] bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-300 hover:text-orange-400 transition-all duration-300 hover:scale-110 z-20 text-2xl font-bold"
        >
          ✕
        </button>

        {/* Zone scrollable qui contient TOUS les projets */}
        <div className="h-full max-h-[90vh] overflow-y-auto p-10 pt-20 pb-10">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mb-6" />
              <span className="text-orange-300 text-lg font-medium">
                Chargement des projets...
              </span>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">🚧</div>
              <p className="text-gray-300 text-lg">Aucun projet publié</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {projects.map((project, index) => (
                <div
                  key={`${project.id ?? project.title}-${index}`}
                  className="group bg-gradient-to-br from-gray-800/60 to-slate-900/50 rounded-[40px] p-8 backdrop-blur-lg border border-orange-400/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_25px_80px_rgba(249,115,22,0.3)] shadow-xl overflow-hidden"
                >
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsModal;
