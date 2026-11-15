"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import AboutSection from "@/components/AboutSection";

const PROFESSIONAL_PROJECTS = [
  {
    id: "shariati",
    title: { fa: "کلینیک تخصصی شریعتی نوین", en: "Modern Shariati Clinic" },
    description: {
      fa: "طراحی معماری کلینیک سرپایی سازمان‌دهی‌شده پیرامون حیاط‌های گیاه‌کاری‌شده؛ به‌نحوی که تمامی فضاهای انتظار و درمان از نور طبیعی مستقیم و منظر سبز بهره‌مند شده‌اند تا استرس محیطی بیمار به حداقل برسد.",
      en: "Architectural design of an outpatient clinic organized around planted courtyards, ensuring all waiting and treatment areas benefit from direct daylight and green views to minimize patient anxiety."
    },
    videoUrl: "/videos/shariati.mp4",
    posterUrl: "/images/Shariati.png",
    tags: { 
      fa: ["طراحی بیمارستانی", "معماری مبتنی بر شواهد (EBD)", "نور طبیعی"], 
      en: ["Hospital Design", "Evidence-Based Design", "Daylight Integration"] 
    }
  },
  {
    id: "Salam",
    title: { fa: "بیمارستان سلام", en: "Salam Hospital" },
    description: {
      fa: "پروژه طراحی تخصصی بخش‌های انکولوژی و تشخیص سرطان با تمرکز بر استانداردهای پیشرفته ایمنی، بهینه‌سازی مسیرهای حرکتی پرسنل و مراجعین و ایجاد فضایی آرامش‌بخش برای بیماران خاص.",
      en: "Specialized architectural design for oncology and cancer diagnostic departments focusing on advanced safety standards, optimizing staff and patient pathways, and creating a healing environment."
    },
    videoUrl: "/videos/Salam.mp4",
    posterUrl: "/images/Salam.png",
    tags: { 
      fa: ["استانداردهای بیمارستانی", "سیرکولاسیون درمانی"], 
      en: ["Hospital Standards", "Therapeutic Circulation"] 
    }
  },
  {
    id: "ardakan-hospital",
    title: { fa: "بیمارستان اردکان", en: "Ardakan Hospital" },
    description: {
      fa: "مطالعه و طراحی فازهای معماری بیمارستان عمومی اردکان با در نظر گرفتن اقلیم منطقه، توسعه‌پذیری فضاها در آینده، و انطباق کامل با آخرین راهنمای طراحی فیزیکی وزارت بهداشت.",
      en: "Master planning and architectural design of Ardakan General Hospital, considering regional climate, future spatial adaptability, and full compliance with healthcare facility guidelines."
    },
    videoUrl: "/videos/ardakan.mp4",
    posterUrl: "/images/Ardakan.png",
    tags: { 
      fa: ["بیمارستان عمومی", "طراحی اقلیمی", "راهنمای فیزیکی"], 
      en: ["General Hospital", "Climate-Responsive Design", "Facility Guidelines"] 
    }
  },
  {
    id: "cancer-institute",
    title: { fa: "انستیتو کانستر ایران", en: "Iran Cancer Institute" },
    description: {
      fa: "پروژه طراحی تخصصی بخش‌های انکولوژی و تشخیص سرطان با تمرکز بر استانداردهای پیشرفته ایمنی، بهینه‌سازی مسیرهای حرکتی پرسنل و مراجعین و ایجاد فضایی آرامش‌بخش برای بیماران خاص.",
      en: "Specialized architectural design for oncology and cancer diagnostic departments focusing on advanced safety standards, optimizing staff and patient pathways, and creating a healing environment."
    },
    videoUrl: "/videos/cancer.mp4",
    posterUrl: "/images/Cancer.png",
    tags: { 
      fa: ["انکولوژی", "استانداردهای بیمارستانی", "سیرکولاسیون درمانی"], 
      en: ["Oncology", "Hospital Standards", "Therapeutic Circulation"] 
    }
  },
];

export default function WorkPage() {
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

      {/* هدر صفحه پروژه‌ها */}
      <section className="pt-40 pb-20 px-6 md:px-16 max-w-7xl mx-auto relative z-10">
        <div className={`mb-16 ${isFa ? 'text-right' : 'text-left'}`}>
          <span className="text-[#F5C542] text-xs tracking-[0.3em] uppercase block mb-3 font-light">
            {isFa ? 'معماری فضاهای درمانی و سلامت' : 'Healthcare & Wellness Architecture'}
          </span>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-paper mb-6">
            {isFa ? 'پروژه‌های حرفه‌ای' : 'Professional Projects'}
          </h1>
          <p className="max-w-2xl text-paper/70 text-sm md:text-base font-light leading-relaxed">
            {isFa 
              ? 'مجموعه‌ای از طراحی‌های تخصصی بیمارستانی و مراکز درمانی، توسعه‌یافته بر اساس اصول طراحی مبتنی بر شواهد (EBD) و ضوابط استاندارد فضایی.'
              : 'A portfolio of specialized healthcare and hospital architectural designs, developed based on Evidence-Based Design (EBD) principles and rigorous spatial standards.'}
          </p>
        </div>

        {/* لیست پروژه‌ها */}
        <div className="flex flex-col gap-32">
          {PROFESSIONAL_PROJECTS.map((project, index) => (
            <div 
              key={project.id}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* بازگردانی کادر به حالت استاندارد افقی (16/9) برای نمایش کامل ویدیوهای لنداسکیپ */}
              <div className="w-full lg:w-7/12 relative aspect-video overflow-hidden bg-ink2 rounded-sm border border-white/10 shadow-2xl group">
                <video
                  src={project.videoUrl}
                  poster={project.posterUrl}
                  controls
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover filter brightness-95 group-hover:brightness-100 transition-all duration-500"
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="w-full lg:w-5/12 flex flex-col justify-center">
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