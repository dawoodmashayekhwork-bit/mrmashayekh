"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
        <div className="mb-20">
          <span className="text-accent text-xs tracking-[0.3em] uppercase block mb-3">آثار برگزیده</span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight">پروژه‌های منتخب</h2>
        </div>

        <div ref={containerRef} className="flex flex-col gap-32">
          {PROJECTS.map((project) => (
            <div key={project.id} className="project-card group relative">
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

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}