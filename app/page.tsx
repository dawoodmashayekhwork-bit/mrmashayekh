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
  const [lang, setLang] = useState<'fa' | 'en'>('fa');

  return (
    <main 
      className="bg-background text-foreground min-h-screen relative selection:bg-accent selection:text-background"
      dir={lang === 'fa' ? 'rtl' : 'ltr'}
    >
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      
      {/* ارسال وضعیت زبان و تابع تغییر آن به Navbar */}
      <Navbar lang={lang} onToggleLang={() => setLang(prev => prev === 'fa' ? 'en' : 'fa')} />
      
      <HeroSection lang={lang} />
      <PortfolioSection lang={lang} />
      <AboutSection lang={lang} />
      <ContactSection lang={lang} />
    </main>
  );
}