"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import AboutSection from "@/components/AboutSection";

// لیست پروژه‌ها یا پژوهش‌های آکادمیک شما
const ACADEMIC_PROJECTS = [
  {
    id: "hospital-standards",
    title: { fa: "پژوهش استانداردهای فضایی بیمارستان‌ها", en: "Hospital Spatial Standards Research" },
    subtitle: { fa: "تحلیل مقایسه‌ای ضوابط طراحی و راهنماهای فیزیکی", en: "Comparative Analysis of Design Guidelines" },
    description: {
      fa: "پژوهش تخصصی پیرامون ارزیابی انطباق فضاهای درمانی با آخرین راهمزای‌های فیزیکی وزارت بهداشت و استانداردهای بین‌المللی با تمرکز بر ارتقای عملکرد بالینی.",
      en: "Specialized research on evaluating the compliance of healthcare spaces with the latest physical guidelines and international standards focusing on clinical performance enhancement."
    },
    posterUrl: "/images/Academic Projects.png",
    tags: { 
      fa: ["پژوهش معماری", "استاندارد‌های بیمارستانی", "ضوابط فضایی"], 
      en: ["Architectural Research", "Hospital Standards", "Spatial Regulations"] 
    }
  },
  {
    id: "representation-courses",
    title: { fa: "توسعه کورس‌های آموزشی پرزانته", en: "Architectural Representation Courses" },
    subtitle: { fa: "طراحی و تدوین سرفصل‌های پرزانته و رندرینگ", en: "Curriculum Design for Presentation & Rendering" },
    description: {
      fa: "توسعه دوره‌ها و مطالب آموزشی پیشرفته در زمینه پرزانته معماری، بازنمایی دیجیتال و تبدیل مدل‌های سه‌بعدی به انیمیشن‌های تحلیلی با رویکرد هوش مصنوعی.",
      en: "Development of advanced educational courses in architectural presentation, digital representation, and converting 3D models into analytical AI-driven animations."
    },
    posterUrl: "/images/pr.png",
    tags: { 
      fa: ["آموزش معماری", "پرزانته دیجیتال", "رندرینگ"], 
      en: ["Architectural Education", "Digital Presentation", "Rendering"] 
    }
  }
];

export default function AcademicPage() {
  const [lang, setLang] = useState<'fa' | 'en'>('fa');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

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

  const isFa = lang === 'fa';

  const navigateToSection = (sectionId: string) => {
    router.push(`/#${sectionId}`);
    setIsOpen(false);
  };

  return (
    <main className="w-full bg-ink text-paper font-sans min-h-screen relative overflow-hidden" dir={isFa ? 'rtl' : 'ltr'}>
      {/* خطوط گرید پس‌زمینه */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1]" 
        style={{
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }} 
      />

      {/* ناوبری بالا */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="fixed top-0 left-0 w-full z-40 px-6 md:px-16 py-6 flex justify-between items-center bg-gradient-to-b from-background/90 via-background/50 to-transparent backdrop-blur-md"
      >
        <span 
          className="hidden md:block text-xs tracking-[0.3em] uppercase font-light text-foreground cursor-pointer hover:text-[#F5C542] transition-colors" 
          onClick={() => router.push('/')}
        >
          DAWOOD MASHAYEKH
        </span>

        <div className="md:hidden flex items-center">
          <button
            onClick={handleToggleLang}
            className="px-2.5 py-1 text-[11px] font-mono tracking-wider text-foreground/90 border border-foreground/20 hover:border-[#F5C542] hover:text-[#F5C542] transition-all rounded-sm cursor-pointer"
          >
            {isFa ? 'EN' : 'فا'}
          </button>
        </div>

        <span 
          className="md:hidden text-xs tracking-[0.25em] uppercase font-light text-foreground cursor-pointer text-center absolute left-1/2 -translate-x-1/2" 
          onClick={() => router.push('/')}
        >
          DAWOOD MASHAYEKH
        </span>

        <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] uppercase text-foreground/75 font-light">
          <button onClick={() => navigateToSection("portfolio")} className="hover:text-[#F5C542] transition-colors cursor-pointer">
            {isFa ? 'پروژه‌ها' : 'Projects'}
          </button>
          <button onClick={() => navigateToSection("experience")} className="hover:text-[#F5C542] transition-colors cursor-pointer">
            {isFa ? 'تجربیات' : 'Experience'}
          </button>
          <button onClick={() => router.push('/')} className="hover:text-[#F5C542] transition-colors cursor-pointer">
            {isFa ? 'صفحه اصلی' : 'Home'}
          </button>

          <button
            onClick={handleToggleLang}
            className="px-2.5 py-1 text-[11px] font-mono tracking-wider text-foreground/90 border border-foreground/20 hover:border-[#F5C542] hover:text-[#F5C542] transition-all rounded-sm cursor-pointer"
          >
            {isFa ? 'EN' : 'فا'}
          </button>
        </nav>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground/90 focus:outline-none p-2 cursor-pointer relative w-7 h-7 flex items-center justify-center"
            aria-label="Toggle Menu"
          >
            <div className="relative w-5 h-4 flex flex-col justify-between">
              <span className={`absolute top-0 left-0 w-full h-[2px] bg-foreground transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`absolute top-[7px] left-0 w-full h-[2px] bg-foreground transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-foreground transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </div>
          </button>
        </div>

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
                onClick={() => navigateToSection("portfolio")} 
                className="text-right text-sm tracking-widest uppercase text-foreground/80 hover:text-[#F5C542] transition-colors py-2 border-b border-white/5 cursor-pointer"
              >
                {isFa ? 'پروژه‌ها' : 'Projects'}
              </button>
              <button 
                onClick={() => navigateToSection("experience")} 
                className="text-right text-sm tracking-widest uppercase text-foreground/80 hover:text-[#F5C542] transition-colors py-2 border-b border-white/5 cursor-pointer"
              >
                {isFa ? 'تجربیات' : 'Experience'}
              </button>
              <button 
                onClick={() => router.push('/')} 
                className="text-right text-sm tracking-widest uppercase text-foreground/80 hover:text-[#F5C542] transition-colors py-2 cursor-pointer"
              >
                {isFa ? 'صفحه اصلی' : 'Home'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* هدر صفحه پروژه‌های آکادمیک */}
      <section className="pt-40 pb-20 px-6 md:px-16 max-w-7xl mx-auto relative z-10">
        <div className={`mb-16 ${isFa ? 'text-right' : 'text-left'}`}>
          <span className="text-[#F5C542] text-xs tracking-[0.3em] uppercase block mb-3 font-light">
            {isFa ? 'پژوهش و مطالعات تخصصی' : 'Research & Academic Studies'}
          </span>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-paper mb-6">
            {isFa ? 'پروژه‌های آکادمیک' : 'Academic Projects'}
          </h1>
          <p className="max-w-2xl text-paper/70 text-sm md:text-base font-light leading-relaxed">
            {isFa 
              ? 'پژوهش‌های تخصصی در مقیاس کلان و خرد پیرامون استانداردهای فضایی بیمارستان‌ها، تحلیل‌های موردی، توسعه کورس‌های آموزشی پرزانته و بازخوانی نظریه‌های نوین.'
              : 'Specialized academic research on hospital spatial standards, case studies, development of architectural representation courses, and modern spatial theories.'}
          </p>
        </div>

        {/* لیست پروژه‌ها و مقالات آکادمیک */}
        <div className="flex flex-col gap-32">
          {ACADEMIC_PROJECTS.map((project, index) => (
            <div 
              key={project.id}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* تصویر یا پوستر پروژه آکادمیک */}
              <div className="w-full lg:w-7/12 relative aspect-[16/10] overflow-hidden bg-ink2 rounded-sm border border-white/10 shadow-2xl group flex items-center justify-center">
                <img
                  src={project.posterUrl}
                  alt={project.title[lang]}
                  className="w-full h-full object-cover filter brightness-95 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                />
              </div>

              <div className="w-full lg:w-5/12 flex flex-col justify-center">
                <span className="font-mono text-xs text-[#F5C542] tracking-[2px] uppercase mb-2">
                  {project.subtitle[lang]}
                </span>
                
                <h2 className={`text-2xl md:text-4xl text-[#F5C542] tracking-wide mb-4 ${isFa ? 'font-medium not-italic' : 'font-serif italic'}`}>
                  {project.title[lang]}
                </h2>

                <p className="text-sm text-paper/75 font-light leading-relaxed mb-6">
                  {project.description[lang]}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags?.[lang]?.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs bg-[#F5C542]/10 text-[#F5C542] px-3 py-1 rounded border border-[#F5C542]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* کامپوننت About در انتهای صفحه */}
      <div className="relative z-10 border-t border-white/10 mt-20">
        <AboutSection lang={lang} />
      </div>
    </main>
  );
}