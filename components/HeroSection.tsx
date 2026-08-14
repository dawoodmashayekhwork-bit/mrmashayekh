"use client";

interface HeroSectionProps {
  lang: 'fa' | 'en';
}

export default function HeroSection({ lang }: HeroSectionProps) {
  const isFa = lang === 'fa';

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center px-6 bg-background overflow-hidden">
      {/* ویدیو پس‌زمینه با تاریکی ملایم و سینمایی */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] z-0"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* گرادینت تیره ملایم برای خوانایی بهتر */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/40 z-10 pointer-events-none" />

      {/* محتوا بدون کادر و کاملاً هماهنگ با سبک مینیمال */}
      <div className="relative z-20 max-w-5xl mx-auto flex flex-col items-center" dir={isFa ? 'rtl' : 'ltr'}>
        
        {/* ۱. متن زرد بالای صفحه (به روز شده) */}
        <span className="text-accent text-xs md:text-sm tracking-[0.35em] uppercase block mb-6 font-light opacity-90">
          {isFa ? 'وبسایت معرفی' : 'Portfolio Website'}
        </span>

        {/* ۲. نام بزرگ و سفید (بدون دایره زرد) */}
        <div className="relative mb-10">
          <h1 className="text-5xl md:text-8xl font-light tracking-tight text-foreground leading-none drop-shadow-lg">
            {isFa ? 'داود مشایخ' : 'Dawood Mashayekh'}
          </h1>
        </div>

        {/* ۳. گزینه‌ها با خط زیرین (Underline) */}
        <div className="flex items-center justify-center gap-3 md:gap-4 text-foreground/80 text-sm md:text-base font-light tracking-wider">
          <a
            href="/page/Skills.html"
            className="hover:text-accent underline underline-offset-8 decoration-foreground/30 hover:decoration-accent transition-all duration-300"
          >
            {isFa ? 'مهارت‌ها' : 'Skills'}
          </a>

          <span className="text-accent/60">/</span>

          <a
            href="/page/Experience.html"
            className="hover:text-accent underline underline-offset-8 decoration-foreground/30 hover:decoration-accent transition-all duration-300"
          >
            {isFa ? 'تجربیات' : 'Experience'}
          </a>

          <span className="text-accent/60">/</span>

          <a
            href="#portfolio"
            className="hover:text-accent underline underline-offset-8 decoration-foreground/30 hover:decoration-accent transition-all duration-300"
          >
            {isFa ? 'پروژه‌ها' : 'Projects'}
          </a>
        </div>

      </div>
    </section>
  );
}