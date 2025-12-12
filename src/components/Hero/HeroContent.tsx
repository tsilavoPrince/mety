import React from "react";
import { Button } from "@/components/ui/button";
import { Rocket, CheckCircle, ArrowRight, Sparkles } from "lucide-react";

interface HeroContentProps {
  onScrollTo: (id: string) => void;
}

const HeroContent = React.memo(({ onScrollTo }: HeroContentProps) => (
  <div className="lg:w-1/2 flex flex-col">
    <div className="text-center lg:text-left space-y-10 flex-1">
      <div className="space-y-6">
        <h1 className="hero-title-main text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
          <span className="title-gradient">
            L'agence digitale qui transforme vos idées en résultats
          </span>
        </h1>
        <p className="hero-subtitle-main text-xl text-slate-300 leading-relaxed">
          Nous concevons des sites web, applications, identités visuelles et solutions IA 
          qui font vraiment grandir votre business.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 pt-8">
        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white hero-cta-button text-lg px-10 py-6 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-orange-500/25"
          onClick={() => onScrollTo("contact")}
        >
          <span className="flex items-center justify-center gap-3">
            <CheckCircle className="w-5 h-5" />
            <span>Obtenir un devis</span>
            <ArrowRight className="w-4 h-4" />
          </span>
        </Button>

        <Button
          className="bg-white/5 backdrop-blur-sm text-white border border-white/10 hover:bg-white/10 hover:border-orange-400/50 hero-cta-button text-lg px-10 py-6 rounded-full font-bold transition-all duration-300"
          onClick={() => onScrollTo("realisations")}
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
));

HeroContent.displayName = "HeroContent";
export default HeroContent;
