import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import "@/styles/animations.css";
import ServicesSection from "@/components/ServiceSection";
import ChatbotButton from "@/components/ChatbotButton"

const Index = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ServicesSection />
        <ContactSection />

         <ChatbotButton position="bottom-right" />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
