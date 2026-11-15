"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  lang: 'fa' | 'en';
  onToggleLang: () => void;
}

export default function Navbar({ lang, onToggleLang }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isFa = lang === 'fa';

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false); // بستن منو پس از کلیک روی لینک در موبایل
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed top-0 left-0 w-full z-40 px-6 md:px-16 py-6 flex justify-between items-center bg-gradient-to-b from-background/90 via-background/50 to-transparent backdrop-blur-md"
    >
      {/* نسخه دسکتاپ: نام در سمت چپ */}
      <span 
        className="hidden md:block text-xs tracking-[0.3em] uppercase font-light text-foreground cursor-pointer hover:text-[#F5C542] transition-colors" 
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        DAWOOD MASHAYEKH
      </span>

      {/* نسخه موبایل: دکمه تغییر زبان در یک سمت */}
      <div className="md:hidden flex items-center">
        <button
          onClick={onToggleLang}
          className="px-2.5 py-1 text-[11px] font-mono tracking-wider text-foreground/90 border border-foreground/20 hover:border-[#F5C542] hover:text-[#F5C542] transition-all rounded-sm cursor-pointer"
        >
          {isFa ? 'EN' : 'فا'}
        </button>
      </div>

      {/* نسخه موبایل: نام دقیقاً در وسط */}
      <span 
        className="md:hidden text-xs tracking-[0.25em] uppercase font-light text-foreground cursor-pointer text-center absolute left-1/2 -translate-x-1/2" 
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        DAWOOD MASHAYEKH
      </span>

      {/* منوی دسکتاپ */}
      <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] uppercase text-foreground/75 font-light">
        <button onClick={() => scrollToSection("portfolio")} className="hover:text-[#F5C542] transition-colors">
          {isFa ? 'پروژه‌ها' : 'Projects'}
        </button>
        <button onClick={() => scrollToSection("experience")} className="hover:text-[#F5C542] transition-colors">
          {isFa ? 'تجربیات' : 'Experience'}
        </button>
        <button onClick={() => scrollToSection("portfolio")} className="hover:text-[#F5C542] transition-colors">
          {isFa ? 'گواهی‌نامه‌ها' : 'Certificates'}
        </button>

        {/* دکمه تغییر زبان دسکتاپ */}
        <button
          onClick={onToggleLang}
          className="px-2.5 py-1 text-[11px] font-mono tracking-wider text-foreground/90 border border-foreground/20 hover:border-[#F5C542] hover:text-[#F5C542] transition-all rounded-sm cursor-pointer"
        >
          {isFa ? 'EN' : 'فا'}
        </button>
      </nav>

      {/* نسخه موبایل: آیکون همبرگری در سمت دیگر */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-foreground/90 focus:outline-none p-1 cursor-pointer flex flex-col justify-between w-6 h-5"
          aria-label="Toggle Menu"
        >
          <span className={`h-[2px] w-full bg-foreground transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`h-[2px] w-full bg-foreground transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`h-[2px] w-full bg-foreground transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* منوی کشویی موبایل */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-[#0a0a0c]/95 backdrop-blur-xl border-b border-white/10 py-6 px-8 flex flex-col gap-6 md:hidden shadow-2xl"
            dir={isFa ? 'rtl' : 'ltr'}
          >
            <button 
              onClick={() => scrollToSection("portfolio")} 
              className="text-right text-sm tracking-widest uppercase text-foreground/80 hover:text-[#F5C542] transition-colors py-2 border-b border-white/5"
            >
              {isFa ? 'پروژه‌ها' : 'Projects'}
            </button>
            <button 
              onClick={() => scrollToSection("experience")} 
              className="text-right text-sm tracking-widest uppercase text-foreground/80 hover:text-[#F5C542] transition-colors py-2 border-b border-white/5"
            >
              {isFa ? 'تجربیات' : 'Experience'}
            </button>
            <button 
              onClick={() => scrollToSection("portfolio")} 
              className="text-right text-sm tracking-widest uppercase text-foreground/80 hover:text-[#F5C542] transition-colors py-2"
            >
              {isFa ? 'گواهی‌نامه‌ها' : 'Certificates'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}