"use client";

import { useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import PortfolioSection from "../components/PortfolioSection";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="bg-background text-foreground min-h-screen relative selection:bg-accent selection:text-background">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <Navbar />
      <HeroSection />
      <PortfolioSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}