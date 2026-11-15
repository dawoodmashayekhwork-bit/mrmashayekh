"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import AboutSection from "@/components/AboutSection";

// تعریف ساختار پروژه‌های آکادمیک به همراه ویدئو، تصاویر، نقشه‌ها و لینک‌های اختصاصی
const ACADEMIC_PROJECTS = [
  {
    id: "hospital-standards",
    title: { fa: "انعطاف پذیر نمودن بخش بستری بیمارستان بوعلی", en: "Making the inpatient section of Bu-Ali Hospital flexible" },
    subtitle: { fa: "پایان نامه ارشد در رشته طراحی فضاهای درمانی", en: "Comparative Analysis of Design Guidelines" },
    description: {
      fa: "پژوهش تخصصی پیرامون ارزیابی انطباق فضاهای درمانی با آخرین راهنماهای فیزیکی وزارت بهداشت و استانداردهای بین‌المللی با تمرکز بر ارتقای عملکرد بالینی و کاهش خطاهای انسانی.",
      en: "Specialized research on evaluating the compliance of healthcare spaces with the latest physical guidelines and international standards focusing on clinical performance."
    },
    coverImage: "/images/Academic Projects.png", 
    videoUrl: "", 
    linkUrl: "",
    drawingsAndImages: [
      { title: { fa: "پلان استراتژیک طبقه همکف", en: "Ground Floor Strategic Plan" }, url: "/images/Academic Projects.png" },
      { title: { fa: "دیاگرام سیرکولاسیون و دسترسی‌ها", en: "Circulation & Access Diagram" }, url: "/images/pr.png" }
    ],
    tags: { 
      fa: ["پژوهش معماری", "استاندارد‌های بیمارستانی", "ضوابط فضایی"], 
      en: ["Architectural Research", "Hospital Standards", "Spatial Regulations"] 
    }
  },
  {
    id: "representation-courses",
    title: { fa: "بیمارستانی در رامسر", en: "Ramsar Hospital" },
    subtitle: { fa: "مطالعه‌ای در حوزه درمانی", en: "A Study in the healthcare design" },
    description: {
      fa: "توسعه دوره‌ها و مطالب آموزشی پیشرفته در زمینه پرزانته معماری، بازنمایی دیجیتال و تبدیل مدل‌های سه‌بعدی به انیمیشن‌های تحلیلی با رویکرد هوش مصنوعی.",
      en: "Development of advanced educational courses in architectural presentation, digital representation, and converting 3D models into analytical AI-driven animations."
    },
    coverImage: "/images/pr.png",
    videoUrl: "",
    linkUrl: "",
    drawingsAndImages: [
      { title: { fa: "نمونه شیت‌بندی و پرزانته", en: "Presentation Sheet Sample" }, url: "/images/pr.png" },
      { title: { fa: "روند مدلسازی و هوش مصنوعی", en: "AI & Modeling Workflow" }, url: "/images/Academic Projects.png" }
    ],
    tags: { 
      fa: ["آموزش معماری", "پرزانته دیجیتال", "رندرینگ"], 
      en: ["Architectural Education", "Digital Presentation", "Rendering"] 
    }
  },
  {
    id: "healing-architecture",
    title: { fa: "تدریس تاریخ معماری", en: "Teaching Architectural History" },
    subtitle: { fa: "بررسی سیر تطور تعامل انسان با محیط", en: "An Examination of the Evolution of Human Interaction with the Environment" },
    description: {
      fa: "آموزش تاریخ معماری پیش از اسلام – بررسی تمدن‌ها و بناهای تاریخی",
      en: "Instruction in Pre-Islamic Architectural History – An Examination of Civilizations and Historical Monuments"
    },
    coverImage: "/images/Academic Projects.png",
    videoUrl: "",
    linkUrl: "https://faradars.org/courses/pre-islamic-architecture-history-fvarch401",
    drawingsAndImages: [
      { title: { fa: "عنوان دوره", en: "Course Title" }, url: "/images/f2.PNG" },
      { title: { fa: "کاور دوره", en: "Course Cover" }, url: "/images/History-faradars.PNG" }
    ],
    tags: { 
      fa: ["تاریخ معماری پیش از اسلام", "فرادرس", "بناهای تاریخی"], 
      en: ["Pre-Islamic Architectural History", "Faradars", "Historical Buildings"] 
    }
  }
];

export default function AcademicPage() {
  const [lang, setLang] = useState<'fa' | 'en'>('fa');
  const [isOpen, setIsOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
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

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
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
      <section className="pt-40 pb-16 px-6 md:px-16 max-w-5xl mx-auto relative z-10">
        <div className={`mb-12 ${isFa ? 'text-right' : 'text-left'}`}>
          <span className="text-[#F5C542] text-xs tracking-[0.3em] uppercase block mb-3 font-light">
            {isFa ? 'پژوهش و مطالعات تخصصی' : 'Research & Academic Studies'}
          </span>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-paper mb-6">
            {isFa ? 'پروژه‌های آکادمیک' : 'Academic Projects'}
          </h1>
          <p className="max-w-2xl text-paper/70 text-sm md:text-base font-light leading-relaxed">
            {isFa 
              ? 'برای مشاهده جزئیات کامل، تصاویر، ویدیوها و نقشه‌های هر پژوهش، روی عنوان پروژه کلیک کنید.'
              : 'Click on each project to expand and explore detailed research data, imagery, videos, and architectural drawings.'}
          </p>
        </div>

        {/* لیست کشویی (Accordion) پروژه‌های آکادمیک */}
        <div className="flex flex-col gap-6">
          {ACADEMIC_PROJECTS.map((project, index) => {
            const isExpanded = expandedId === project.id;
            return (
              <div 
                key={project.id}
                className="border border-white/10 bg-ink2/50 backdrop-blur-md rounded-sm transition-all overflow-hidden"
              >
                {/* هدر آیتم کشویی (قابل کلیک) */}
                <button
                  onClick={() => toggleAccordion(project.id)}
                  className={`w-full p-6 md:p-8 flex justify-between items-center cursor-pointer hover:bg-white/[0.02] transition-colors ${isFa ? 'text-right' : 'text-left'}`}
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-xs text-[#F5C542] tracking-[2px] uppercase">
                      0{index + 1} // {project.subtitle[lang]}
                    </span>
                    <h2 className={`text-xl md:text-2xl text-paper font-medium tracking-wide ${isFa ? '' : 'font-serif italic'}`}>
                      {project.title[lang]}
                    </h2>
                  </div>
                  
                  {/* آیکون فلش باز و بسته شدن */}
                  <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[#F5C542] transition-transform duration-300 shrink-0 ${isExpanded ? 'rotate-180 bg-[#F5C542]/10' : ''}`}>
                    ↓
                  </div>
                </button>

                {/* محتوای داخلی کشویی (بازشونده) */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="border-t border-white/10 px-6 md:px-8 py-8 flex flex-col gap-8 bg-background/40"
                    >
                      {/* توضیحات کامل پروژه */}
                      <p className="text-sm md:text-base text-paper/80 font-light leading-relaxed">
                        {project.description[lang]}
                      </p>

                      {/* تگ‌های پروژه */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags[lang].map((tag, idx) => (
                          <span 
                            key={idx} 
                            className="text-xs bg-[#F5C542]/10 text-[#F5C542] px-3 py-1 rounded border border-[#F5C542]/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* بخش ویدیو (در صورت وجود) */}
                      {project.videoUrl && (
                        <div className="w-full aspect-video rounded-sm overflow-hidden border border-white/10 bg-black">
                          <video 
                            src={project.videoUrl} 
                            controls 
                            muted 
                            playsInline
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}

                      {/* بخش مدارک و تصاویر تکمیلی */}
                      <div className="flex flex-col gap-4 mt-4">
                        <h3 className="text-xs font-mono uppercase tracking-[2px] text-[#F5C542]">
                          {isFa ? 'مدارک' : 'Documents'}
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {project.drawingsAndImages.map((img, imgIdx) => (
                            <div key={imgIdx} className="flex flex-col gap-2 group">
                              {project.linkUrl ? (
                                <a
                                  href={project.linkUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="aspect-[16/10] overflow-hidden rounded-sm border border-white/10 bg-ink block relative cursor-pointer"
                                >
                                  <img 
                                    src={img.url} 
                                    alt={img.title[lang]} 
                                    className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-110 transition-all duration-500"
                                  />
                                  <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="bg-ink/90 text-[#F5C542] text-xs px-3 py-1.5 rounded border border-[#F5C542]/40 font-mono">
                                      {isFa ? 'مشاهده  ↗' : 'View  ↗'}
                                    </span>
                                  </div>
                                </a>
                              ) : (
                                <div className="aspect-[16/10] overflow-hidden rounded-sm border border-white/10 bg-ink">
                                  <img 
                                    src={img.url} 
                                    alt={img.title[lang]} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                </div>
                              )}
                              <span className="text-xs text-paper/60 font-light">
                                {img.title[lang]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* دکمه شیشه‌ای تمام‌عرض که با هاور رنگی می‌شود */}
                      {project.linkUrl && (
                        <div className="pt-2 w-full">
                          <a
                            href={project.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 px-6 bg-white/5 backdrop-blur-md border border-white/15 text-paper font-medium text-xs tracking-[0.2em] uppercase rounded-sm hover:bg-[#F5C542] hover:text-ink hover:border-[#F5C542] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-xl"
                          >
                            <span>{isFa ? 'مشاهده   ' : 'View Course on Faradars'}</span>
                            <span>↗</span>
                          </a>
                        </div>
                      )}

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* کامپوننت About در انتهای صفحه */}
      <div className="relative z-10 border-t border-white/10 mt-20">
        <AboutSection lang={lang} />
      </div>
    </main>
  );
}