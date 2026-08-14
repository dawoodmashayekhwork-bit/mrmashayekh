"use client";

interface HeroSectionProps {
  lang: 'fa' | 'en';
}

export default function HeroSection({ lang }: HeroSectionProps) {
  const isFa = lang === 'fa';

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center px-6 bg-background overflow-hidden">
      {/* ویدیو پس‌زمینه */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover filter brightness-50 z-0"
      >
        {/* مسیر ویدیوی پس‌زمینه خود را در پوشه public وارد کنید */}
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* لایه گرادینت تاریک برای خوانایی بهتر متن‌ها روی ویدیو */}
      <div className="absolute inset-0 bg-background/60 z-10 pointer-events-none" />

      {/* محتوای متنی و دکمه‌ها */}
      <div className="relative z-20 max-w-4xl mx-auto" dir={isFa ? 'rtl' : 'ltr'}>
        <span className="text-accent text-xs md:text-sm tracking-[0.4em] uppercase block mb-4">
          {isFa ? 'داوود مشایخ • موشن دیزاینر و معمار' : 'Dawood Mashayekh • Motion Designer & Architect'}
        </span>
        <h1 className="text-4xl md:text-7xl font-light tracking-tight mb-6 leading-tight">
          {isFa ? 'آفرینش حرکت، فضاسازی و روایت' : 'Crafting Motion, Space & Narrative'}
        </h1>
        <p className="text-sm md:text-base text-foreground/80 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
          {isFa 
            ? 'ترکیبی از هنر معماری و انیمیشن‌های حرکتی برای خلق تجربه‌های بصری مدرن و ماندگار.' 
            : 'A fusion of architectural design and motion graphics to build modern, lasting visual experiences.'}
        </p>

        {/* سه دکمه‌ی اصلی */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <a
            href="/page/Skills.html"
            className="px-6 py-3 rounded-full text-sm font-medium bg-neutral-900/80 text-foreground border border-neutral-800 hover:border-accent hover:text-accent transition-all duration-300"
          >
            {isFa ? 'مهارت‌ها' : 'Skills'}
          </a>

          <a
            href="/page/Experience.html"
            className="px-6 py-3 rounded-full text-sm font-medium bg-neutral-900/80 text-foreground border border-neutral-800 hover:border-accent hover:text-accent transition-all duration-300"
          >
            {isFa ? 'تجربیات' : 'Experience'}
          </a>

          <a
            href="#portfolio"
            className="px-6 py-3 rounded-full text-sm font-medium bg-accent text-background hover:opacity-95 transition-all duration-300 shadow-lg"
          >
            {isFa ? 'پروژه‌ها' : 'Projects'}
          </a>
        </div>
      </div>
    </section>
  );
}