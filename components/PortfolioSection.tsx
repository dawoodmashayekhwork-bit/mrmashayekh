"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PortfolioSectionProps {
  lang: 'fa' | 'en';
}

// تعریف ۳ دسته پروژه به همراه لینک‌های مقصد اختصاصی و متن‌های تخصصی
const PROJECTS = [
  {
    id: "professional",
    title: { fa: "پروژه‌های حرفه‌ای", en: "Professional Architecture" },
    description: {
      fa: "طراحی معماری فضاهای درمانی و مراکز سلامت با تکیه بر اصول طراحی مبتنی بر شواهد (EBD)، بهینه‌سازی سیرکولاسیون و تلفیق نور طبیعی با رویکرد ارتقای کیفیت محیطی و روان‌شناختی بیمار.",
      en: "Architectural design of healthcare and wellness spaces grounded in Evidence-Based Design (EBD) principles, optimizing circulation and integrating daylight to enhance patient healing environments."
    },
    posterUrl: "/images/Professional Architecture Projects.png",
    linkUrl: "/Work", // انطباق دقیق با نام پوشه Work در پوشه app
  },
  {
    id: "academic",
    title: { fa: "پروژه‌های آکادمیک", en: "Academic Projects" },
    description: {
      fa: "پژوهش‌های تخصصی در مقیاس کلان و خرد پیرامون استانداردهای فضایی بیمارستان‌ها، تحلیل‌های موردی، توسعه کورس‌های آموزشی پرزانته و بازخوانی نظریه‌های نوین در معماری و سلامت.",
      en: "Specialized academic research on hospital spatial standards, case studies, development of architectural representation courses, and the intersection of architecture and human well-being."
    },
    posterUrl: "/images/Academic Projects.png",
    linkUrl: "/page/Academic.html",
  },
  {
    id: "personal",
    title: { fa: "پروژه‌های شخصی", en: "Personal Projects" },
    description: {
      fa: "تولید محتوای تخصصی در رسانه‌های گوناگون، از جمله پادکست «معماری و راز جاودانگی» با تمرکز بر اندیشه‌های کریستوفر الکساندر و کانال یوتیوب تاریخ معماری برای واکاوی ریشه‌های فضایی.",
      en: "Independent creative and media endeavors, including the podcast 'Architecture and the Secret of Immortality' exploring Christopher Alexander's theories, alongside architectural history video essays."
    },
    posterUrl: "/images/pr.png",
    linkUrl: "/page/Personal.html",
  },
];

export default function PortfolioSection({ lang }: PortfolioSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isFa = lang === 'fa';

  const [mousePos, setMousePos] = useState<{ [key: string]: { x: number; y: number; active: boolean } }>({});

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const cards = el.querySelectorAll(".project-card");
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    ScrollTrigger.refresh();
  }, []);

  const handleMouseMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos((prev) => ({
      ...prev,
      [id]: { x, y, active: true },
    }));
  };

  const handleMouseLeave = (id: string) => {
    setMousePos((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || { x: 0, y: 0 }), active: false },
    }));
  };

  return (
    <section id="portfolio" ref={sectionRef} className="relative w-full py-32 px-6 md:px-16 bg-ink text-paper">
      <div className="max-w-7xl mx-auto">
        {/* لیست پروژه‌ها */}
        <div ref={containerRef} className="flex flex-col gap-28 md:gap-40">
          {PROJECTS.map((project, index) => {
            const isEven = index % 2 === 0;
            const currentMouse = mousePos[project.id] || { x: 0, y: 0, active: false };

            return (
              <div
                key={project.id}
                className={`project-card flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* بخش تصویر (لینک‌دار) با افکت Invert دور ماوس */}
                <div className="w-full lg:w-7/12 relative aspect-[16/10] overflow-hidden bg-ink2 rounded-sm border border-white/10 group cursor-pointer">
                  <a href={project.linkUrl} className="block w-full h-full">
                    <div
                      className="w-full h-full relative"
                      onMouseMove={(e) => handleMouseMove(project.id, e)}
                      onMouseLeave={() => handleMouseLeave(project.id)}
                    >
                      {/* عکس پایه */}
                      <img
                        src={project.posterUrl}
                        alt={project.title[lang]}
                        className="w-full h-full object-cover filter brightness-90 transition-all duration-700"
                      />

                      {/* لایه دوم معکوس شده در محدوده کوچک و دقیق دور ماوس */}
                      {currentMouse.active && (
                        <div
                          className="absolute inset-0 pointer-events-none overflow-hidden"
                          style={{
                            maskImage: `radial-gradient(circle 30px at ${currentMouse.x}px ${currentMouse.y}px, black 0%, transparent 100%)`,
                            WebkitMaskImage: `radial-gradient(circle 30px at ${currentMouse.x}px ${currentMouse.y}px, black 0%, transparent 100%)`,
                          }}
                        >
                          <img
                            src={project.posterUrl}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover filter invert brightness-125"
                          />
                        </div>
                      )}
                    </div>
                  </a>
                </div>

                {/* بخش متن و اطلاعات پروژه */}
                <div className="w-full lg:w-5/12 flex flex-col justify-center" dir={isFa ? 'rtl' : 'ltr'}>
                  {/* عنوان پروژه: فونت سریف و ایتالیک برای انگلیسی، و فونت ضخیم‌تر بدون ایتالیک برای فارسی */}
                  <h3 className={`text-3xl md:text-5xl text-[#F5C542] tracking-wide mb-4 ${isFa ? 'font-medium not-italic' : 'font-serif italic'}`}>
                    {project.title[lang]}
                  </h3>

                  {/* توضیحات تخصصی متناسب با رزومه و تخصص */}
                  <p className="text-sm text-paper/70 font-light leading-relaxed mb-6">
                    {project.description[lang]}
                  </p>

                  {/* لینک هدایت به صفحه اختصاصی پروژه */}
                  <div>
                    <a
                      href={project.linkUrl}
                      className="inline-flex items-center gap-2 text-xs md:text-sm tracking-widest text-paper hover:text-[#F5C542] uppercase transition-colors group/link"
                    >
                      <span>{isFa ? 'مشاهده پروژه' : 'View project'}</span>
                      <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}