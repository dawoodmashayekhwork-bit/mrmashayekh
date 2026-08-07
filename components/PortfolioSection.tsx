"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

interface PortfolioSectionProps {
  lang: 'fa' | 'en';
}

export default function PortfolioSection({ lang }: PortfolioSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isFa = lang === 'fa';

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const cards = el.querySelectorAll(".project-card");
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="relative w-full py-32 px-6 md:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-20 ${isFa ? 'text-right' : 'text-left'}`} dir={isFa ? 'rtl' : 'ltr'}>
          <span className="text-accent text-xs tracking-[0.3em] uppercase block mb-3">
            {isFa ? 'آثار برگزیده' : 'Selected Works'}
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight">
            {isFa ? 'پروژه‌های منتخب' : 'Featured Projects'}
          </h2>
        </div>

        <div ref={containerRef} className="flex flex-col gap-32">
          {PROJECTS.map((project) => (
            <div key={project.id} className="project-card group relative">
              {project.isGroup ? (
                // --- بخش گروهی برای ۳ ویدیوی پورتره کنار هم ---
                <div className="bg-neutral-900/50 p-6 md:p-10 rounded-sm border border-neutral-800">
                  <div className={`mb-8 ${isFa ? 'text-right' : 'text-left'}`} dir={isFa ? 'rtl' : 'ltr'}>
                    <span className="text-accent text-xs tracking-[0.2em] uppercase mb-2 block">
                      {project.category} — {project.year}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-light text-foreground tracking-wide mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-foreground/70 font-light leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* گرید ۳ تایی برای نمایش ویدیوهای عمودی (پورتره) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {project.subProjects?.map((sub) => (
                      <div key={sub.id} className="flex flex-col bg-neutral-900/80 rounded-sm overflow-hidden p-3 border border-neutral-800/60 group/sub">
                        {/* کانتینر با نسبت تصویر پورتره (9:16) */}
                        <div className="relative w-full aspect-[9/16] bg-neutral-950 rounded-sm overflow-hidden mb-4">
                          <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            poster={sub.posterUrl}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/sub:scale-105 filter brightness-90 group-hover/sub:brightness-100"
                          >
                            <source src={sub.videoUrl} type="video/mp4" />
                          </video>
                        </div>
                        <h4 className="font-medium text-foreground text-base mb-1" dir={isFa ? 'rtl' : 'ltr'}>
                          {sub.title}
                        </h4>
                        <p className="text-xs text-foreground/70 font-light leading-relaxed" dir={isFa ? 'rtl' : 'ltr'}>
                          {sub.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // --- کارت‌های معمولی پروژه (مثل قبل) ---
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-900 rounded-sm cursor-pointer">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={project.posterUrl}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                  >
                    <source src={project.videoUrl} type="video/mp4" />
                  </video>

                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  <div 
                    className={`absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 ${
                      isFa ? 'text-right' : 'text-left'
                    }`}
                    dir={isFa ? 'rtl' : 'ltr'}
                  >
                    <div>
                      <span className="text-accent text-xs tracking-[0.2em] uppercase mb-2 block">
                        {project.category} — {project.year}
                      </span>
                      <h3 className="text-2xl md:text-4xl font-light text-foreground tracking-wide">
                        {project.title}
                      </h3>
                    </div>
                    <div className="max-w-md">
                      <p className="text-sm text-foreground/70 font-light leading-relaxed hidden md:block">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}