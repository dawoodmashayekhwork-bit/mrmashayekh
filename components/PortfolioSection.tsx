"use client";

import { useEffect, useRef, useState } from "react";
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

  const [playingVideos, setPlayingVideos] = useState<{ [key: string]: boolean }>({});
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const cards = el.querySelectorAll(".project-card");
    cards.forEach((card) => {
      // انیمیشن ورود اولیه کارت‌ها
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // افکت پارالکس حرکتی روان و عمق‌دار
      gsap.to(card, {
        y: -35,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // به‌روزرسانی اسکرول‌تریگر برای محاسبه دقیق ابعاد در دسکتاپ
    ScrollTrigger.refresh();
  }, []);

  // تابع مدیریت پلی کردن ویدیو (متوقف کردن بقیه ویدیوها و پخش ویدیوی جدید)
  const handlePlay = (id: string) => {
    Object.keys(videoRefs.current).forEach((key) => {
      const vEl = videoRefs.current[key];
      if (vEl && key !== id) {
        vEl.pause();
      }
    });

    setPlayingVideos(() => {
      const newPlayingState: { [key: string]: boolean } = {};
      newPlayingState[id] = true;
      return newPlayingState;
    });

    const videoEl = videoRefs.current[id];
    if (videoEl) {
      videoEl.play();
    }
  };

  const handleFullscreen = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const videoEl = videoRefs.current[id];
    if (!videoEl) return;

    if (videoEl.requestFullscreen) {
      videoEl.requestFullscreen();
    } else if ((videoEl as any).webkitRequestFullscreen) {
      (videoEl as any).webkitRequestFullscreen();
    } else if ((videoEl as any).msRequestFullscreen) {
      (videoEl as any).msRequestFullscreen();
    }
  };

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
                      {project.category[lang]} — {project.year}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-light text-foreground tracking-wide mb-2">
                      {project.title[lang]}
                    </h3>
                    <p className="text-sm text-foreground/70 font-light leading-relaxed">
                      {project.description[lang]}
                    </p>
                  </div>

                  {/* گرید ۳ تایی برای نمایش ویدیوهای عمودی (پورتره) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {project.subProjects?.map((sub) => {
                      const isPlaying = playingVideos[sub.id];
                      return (
                        <div key={sub.id} className="flex flex-col bg-neutral-900/80 rounded-sm overflow-hidden p-3 border border-neutral-800/60 group/sub">
                          <div className="relative w-full aspect-[9/16] bg-neutral-950 rounded-sm overflow-hidden mb-4 flex items-center justify-center">
                            <video
                              ref={(el) => { videoRefs.current[sub.id] = el; }}
                              preload="none"
                              controls={isPlaying}
                              playsInline
                              poster={sub.posterUrl}
                              className="w-full h-full object-cover [&:fullscreen]:object-contain filter brightness-90 group-hover/sub:brightness-100 transition-all duration-500"
                            >
                              <source src={sub.videoUrl} type="video/mp4" />
                            </video>

                            {/* دکمه پلی */}
                            {!isPlaying && (
                              <button
                                onClick={() => handlePlay(sub.id)}
                                className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/40 group-hover/sub:bg-black/25 transition-colors cursor-pointer z-10"
                                aria-label="Play video"
                              >
                                <div className="w-12 h-12 rounded-full bg-accent text-background flex items-center justify-center shadow-lg transform group-hover/sub:scale-110 transition-transform">
                                  <svg className="w-5 h-5 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </button>
                            )}

                            {/* دکمه تمام‌صفحه */}
                            {isPlaying && (
                              <button
                                onClick={(e) => handleFullscreen(sub.id, e)}
                                className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-colors z-20 cursor-pointer"
                                title="Fullscreen"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                </svg>
                              </button>
                            )}
                          </div>

                          <h4 className="font-medium text-foreground text-base mb-1" dir={isFa ? 'rtl' : 'ltr'}>
                            {sub.title[lang]}
                          </h4>
                          <p className="text-xs text-foreground/70 font-light leading-relaxed" dir={isFa ? 'rtl' : 'ltr'}>
                            {sub.description[lang]}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                // --- کارت‌های معمولی پروژه (16:9) ---
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-900 rounded-sm">
                  <video
                    ref={(el) => { videoRefs.current[project.id] = el; }}
                    preload="none"
                    controls={playingVideos[project.id]}
                    playsInline
                    poster={project.posterUrl}
                    className="w-full h-full object-cover [&:fullscreen]:object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-700"
                  >
                    <source src={project.videoUrl} type="video/mp4" />
                  </video>

                  {!playingVideos[project.id] && (
                    <button
                      onClick={() => handlePlay(project.id)}
                      className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/40 group-hover:bg-black/25 transition-colors cursor-pointer z-10"
                      aria-label="Play video"
                    >
                      <div className="w-16 h-16 rounded-full bg-accent text-background flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                        <svg className="w-7 h-7 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </button>
                  )}

                  {playingVideos[project.id] && (
                    <button
                      onClick={(e) => handleFullscreen(project.id, e)}
                      className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full backdrop-blur-sm transition-colors z-20 cursor-pointer"
                      title="Fullscreen"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </button>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent opacity-80 pointer-events-none" />

                  <div 
                    className={`absolute bottom-0 left-0 w-full p-4 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-2 md:gap-4 pointer-events-none ${
                      isFa ? 'text-right' : 'text-left'
                    }`}
                    dir={isFa ? 'rtl' : 'ltr'}
                  >
                    <div>
                      {/* متن زرد رنگ در موبایل مخفی و در دسکتاپ نمایش داده می‌شود */}
                      <span className="text-accent text-xs tracking-[0.2em] uppercase mb-1 hidden md:block font-medium">
                        {project.category[lang]} — {project.year}
                      </span>
                      <h3 className="text-xl md:text-4xl font-light text-foreground tracking-wide">
                        {project.title[lang]}
                      </h3>
                    </div>
                    <div className="max-w-md">
                      <p className="text-xs md:text-sm text-foreground/80 font-light leading-relaxed hidden md:block">
                        {project.description[lang]}
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