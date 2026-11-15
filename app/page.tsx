"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import PortfolioSection from "../components/PortfolioSection";
import Experience from "../components/Experience";
import VideoSlider from "../components/VideoSlider"; // ایمپورت اسلایدر جدید ویدیوها
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
  const [lang, setLang] = useState<'fa' | 'en'>('fa');

  useEffect(() => {
    const savedLang = localStorage.getItem('site_lang') as 'fa' | 'en';
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const handleToggleLang = () => {
    const newLang = lang === 'fa' ? 'en' : 'fa';
    setLang(newLang);
    localStorage.setItem('site_lang', newLang);
  };

  return (
    <main 
      className="bg-background text-foreground min-h-screen relative selection:bg-accent selection:text-background"
      dir={lang === 'fa' ? 'rtl' : 'ltr'}
    >
      <Navbar lang={lang} onToggleLang={handleToggleLang} />
      
      <HeroSection lang={lang} />

      <PortfolioSection lang={lang} />
      <VideoSlider lang={lang} />
      <Experience lang={lang} />
      <AboutSection lang={lang} />
      <ContactSection lang={lang} />
    </main>
  );
}