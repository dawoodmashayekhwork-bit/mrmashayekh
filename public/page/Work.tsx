"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";

interface WorkPageProps {
  lang: 'fa' | 'en';
  onToggleLang: () => void;
}

const PROFESSIONAL_PROJECTS = [
  {
    id: "shariati",
    title: { fa: "کلینیک تخصصی شریعتی نوین", en: "Modern Shariati Clinic" },
    subtitle: { fa: "طراحی فضاهای درمانی و سیرکولاسیون سرپایی", en: "Healthcare Design & Outpatient Circulation" },
    description: {
      fa: "طراحی معماری کلینیک سرپایی سازمان‌دهی‌شده پیرامون حیاط‌های گیاه‌کاری‌شده؛ به‌نحوی که تمامی فضاهای انتظار و درمان از نور طبیعی مستقیم و منظر سبز بهره‌مند شده‌اند تا استرس محیطی بیمار به حداقل برسد.",
      en: "Architectural design of an outpatient clinic organized around planted courtyards, ensuring all waiting and treatment areas benefit from direct daylight and green views to minimize patient anxiety."
    },
    videoUrl: "/videos/shariati.mp4",
    tags: { fa: ["طراحی بیمارستانی", "معماری مبتنی بر شواهد (EBD)", "نور طبیعی"], en: ["Hospital Design", "Evidence-Based Design", "Daylight Integration"] }
  },
  {
    id: "cancer-institute",
    title: { fa: "انستیتو سرطان ایران", en: "Iran Cancer Institute" },
    subtitle: { fa: "طراحی تخصصی فضاهای تشخیصی و درمانی انکولوژی", en: "Specialized Oncology Diagnostic & Treatment Spaces" },
    description: {
      fa: "پروژه طراحی تخصصی بخش‌های انکولوژی و تشخیص سرطان با تمرکز بر استانداردهای پیشرفته ایمنی، بهینه‌سازی مسیرهای حرکتی پرسنل و مراجعین و ایجاد فضایی آرامش‌بخش برای بیماران خاص.",
      en: "Specialized architectural design for oncology and cancer diagnostic departments focusing on advanced safety standards, optimizing staff and patient pathways, and creating a healing environment."
    },
    videoUrl: "/videos/cancer-institute.mp4",
    tags: { fa: ["انکولوژی", "استانداردهای بیمارستانی", "سیرکولاسیون درمانی"], en: ["Oncology", "Hospital Standards", "Therapeutic Circulation"] }
  },
  {
    id: "ardakan-hospital",
    title: { fa: "بیمارستان اردکان", en: "Ardakan Hospital" },
    subtitle: { fa: "طراحی جامع بیمارستان عمومی و منطقه‌ای", en: "Comprehensive Regional General Hospital" },
    description: {
      fa: "مطالعه و طراحی فازهای معماری بیمارستان عمومی اردکان با در نظر گرفتن اقلیم منطقه، توسعه‌پذیری فضاها در آینده، و انطباق کامل با آخرین راهنمای طراحی فیزیکی وزارت بهداشت.",
      en: "Master planning and architectural design of Ardakan General Hospital, considering regional climate, future spatial adaptability, and full compliance with healthcare facility guidelines."
    },
    videoUrl: "/videos/ardakan.mp4",
    tags: { fa: ["بیمارستان عمومی", "طراحی اقلیمی", "راهنمای فیزیکی"], en: ["General Hospital", "Climate-Responsive Design", "Facility Guidelines"] }
  }
];

export default function WorkPage({ lang, onToggleLang }: WorkPageProps) {
  const isFa = lang === 'fa';

  return (
    <main className="w-full bg-ink text-paper font-sans min-h-screen relative overflow-hidden" dir={isFa ? 'rtl' : 'ltr'}>
      {/* خطوط گرید پس‌زمینه با ساختار استاندارد */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1]" 
        style={{
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }} 
      />

      {/* ناوبری بالای صفحه */}
      <Navbar lang={lang} onToggleLang={onToggleLang} />

      {/* هدر صفحه پروژه‌های حرفه‌ای */}
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

        {/* لیست پروژه‌ها همراه با ویدیو */}
        <div className="flex flex-col gap-32">
          {PROFESSIONAL_PROJECTS.map((project, index) => (
            <div 
              key={project.id}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* بخش ویدیو پروژه */}
              <div className="w-full lg:w-7/12 relative aspect-[16/10] overflow-hidden bg-ink2 rounded-sm border border-white/10 shadow-2xl group">
                <video
                  src={project.videoUrl}
                  controls
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover filter brightness-95 group-hover:brightness-100 transition-all duration-500"
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* بخش توضیحات پروژه */}
              <div className="w-full lg:w-5/12 flex flex-col justify-center">
                <span className="font-mono text-xs text-[#F5C542] tracking-[2px] uppercase mb-2">
                  0{index + 1} // {project.subtitle[lang]}
                </span>
                
                <h2 className={`text-2xl md:text-4xl text-[#F5C542] tracking-wide mb-4 ${isFa ? 'font-medium not-italic' : 'font-serif italic'}`}>
                  {project.title[lang]}
                </h2>

                <p className="text-sm text-paper/75 font-light leading-relaxed mb-6">
                  {project.description[lang]}
                </p>

                {/* تگ‌های ویژگی پروژه */}
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
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* قرارگیری کامپوننت AboutSection در انتهای صفحه */}
      <div className="relative z-10 border-t border-white/10 mt-20">
        <AboutSection lang={lang} />
      </div>
    </main>
  );
}