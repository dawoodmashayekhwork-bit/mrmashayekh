"use client";

import { useState } from 'react';

interface HeroSectionProps {
  lang: 'fa' | 'en';
}

export default function HeroSection({ lang }: HeroSectionProps) {
  const isFa = lang === 'fa';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative w-full h-screen flex flex-col justify-between text-left px-6 md:px-16 py-8 bg-ink text-paper overflow-hidden">
      {/* عکس پس‌زمینه با تاریکی ملایم و سینمایی */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.jpg"
          alt="Dawood Mashayekh — Hero Background"
          className="w-full h-full object-cover filter brightness-[0.4]"
        />
        {/* گرادینت تاریک برای خوانایی بهتر متن‌ها */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-black/50" />
      </div>

      {/* ۱. بخش بالای صفحه: برند و منوی همبرگری موبایل */}
      <div className="relative z-30 flex justify-between items-center w-full max-w-7xl mx-auto">
        {/* نام برند در بالای صفحه برای موبایل */}
        <a href="/" className="text-paper text-sm font-light tracking-widest hover:text-[#F5C542] transition-colors">
          DAWOOD MASHAYEKH
        </a>

        {/* دکمه منوی همبرگری (فقط در موبایل و تبلت) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-paper focus:outline-none p-2 z-40"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      {/* منوی کشویی موبایل */}
      {mobileMenuOpen && (
        <div className="absolute inset-0 z-35 bg-ink/95 backdrop-blur-md flex flex-col justify-center items-center gap-6 text-lg md:hidden animate-fadeIn" dir={isFa ? 'rtl' : 'ltr'}>
          <a
            href="/page/Skills.html"
            onClick={() => setMobileMenuOpen(false)}
            className="text-paper hover:text-[#F5C542] tracking-wider transition-colors"
          >
            {isFa ? 'مهارت‌ها' : 'Skills'}
          </a>
          <a
            href="/page/Experience.html"
            onClick={() => setMobileMenuOpen(false)}
            className="text-paper hover:text-[#F5C542] tracking-wider transition-colors"
          >
            {isFa ? 'تجربیات' : 'Experience'}
          </a>
          <a
            href="/page/c.html"
            onClick={() => setMobileMenuOpen(false)}
            className="text-paper hover:text-[#F5C542] tracking-wider transition-colors"
          >
            {isFa ? 'گواهی‌نامه‌ها' : 'Certificates'}
          </a>
          <a
            href="#portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="text-paper hover:text-[#F5C542] tracking-wider transition-colors"
          >
            {isFa ? 'پروژه‌ها' : 'Projects'}
          </a>
        </div>
      )}

      {/* ۲. بخش مرکزی: نام فارسی و تایپوگرافی بزرگ (MASHAYEKH کوچک‌شده برای موبایل) */}
      <div className="relative z-25 max-w-7xl mx-auto w-full my-auto" dir="ltr">
        <div className="flex flex-col items-start">
          
          {/* نام فارسی با رنگ طلایی */}
          <div className="mb-2">
            <span
              className="text-[#F5C542] text-lg sm:text-2xl md:text-3xl tracking-normal font-normal block"
              dir="rtl"
            >
              داود مشایخ
            </span>
          </div>

          {/* نام انگلیسی (DAWOOD و MASHAYEKH با اندازه ریسپانسیو شده) */}
          <h1 className="flex flex-col leading-[0.85] tracking-tighter select-none font-light w-full">
            <span className="text-5xl sm:text-7xl md:text-9xl text-paper font-normal">
              DAWOOD
            </span>
            <span className="text-4xl sm:text-6xl md:text-9xl text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.7)] hover:text-paper transition-colors duration-500 break-all sm:break-normal">
              MASHAYEKH
            </span>
          </h1>

        </div>
      </div>

      {/* ۳. بخش پایین صفحه: لینک‌ها برای دسکتاپ و متن تخصص */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-t border-white/10 pt-6">
        
        {/* لینک‌های منو (فقط در دسکتاپ نمایش داده می‌شوند) */}
        <div className="hidden md:flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm tracking-wider uppercase font-light">
          <a
            href="/page/Skills.html"
            className="text-foreground/80 hover:text-[#F5C542] underline underline-offset-8 decoration-foreground/30 hover:decoration-[#F5C542] transition-all duration-300"
          >
            {isFa ? 'مهارت‌ها' : 'Skills'}
          </a>

          <span className="text-[#F5C542]/70">•</span>

          <a
            href="/page/Experience.html"
            className="text-foreground/80 hover:text-[#F5C542] underline underline-offset-8 decoration-foreground/30 hover:decoration-[#F5C542] transition-all duration-300"
          >
            {isFa ? 'تجربیات' : 'Experience'}
          </a>

          <span className="text-[#F5C542]/70">•</span>

          <a
            href="/page/c.html"
            className="text-foreground/80 hover:text-[#F5C542] underline underline-offset-8 decoration-foreground/30 hover:decoration-[#F5C542] transition-all duration-300"
          >
            {isFa ? 'گواهی‌نامه‌ها' : 'Certificates'}
          </a>

          <span className="text-[#F5C542]/70">•</span>

          <a
            href="#portfolio"
            className="text-foreground/80 hover:text-[#F5C542] underline underline-offset-8 decoration-foreground/30 hover:decoration-[#F5C542] transition-all duration-300"
          >
            {isFa ? 'پروژه‌ها' : 'Projects'}
          </a>
        </div>

        {/* توضیح کوتاه درباره تخصص */}
        <div className="max-w-md text-xs md:text-sm text-paper/80 font-light leading-relaxed" dir={isFa ? 'rtl' : 'ltr'}>
          {isFa 
            ? 'معمار و طراح ارتباطات بصری، کاوشگر نحوه شکل‌گیری فضا، نور و اطلاعات در بهبود زیست، یادگیری و درمان — با تمرکز ویژه بر فضاهای درمانی.'
            : 'Architect and visual communication designer exploring how space, light and information shape the way people heal, learn and live — with a particular focus on healthcare environments.'}
        </div>

      </div>
    </section>
  );
}