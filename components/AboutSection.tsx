"use client";

import { motion } from "framer-motion";

interface AboutSectionProps {
  lang: 'fa' | 'en';
}

export default function AboutSection({ lang }: AboutSectionProps) {
  const isFa = lang === 'fa';

  return (
    <section id="about" className="relative w-full py-32 px-6 md:px-16 bg-background border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-accent text-xs tracking-[0.3em] uppercase block mb-4"
        >
          {isFa ? 'فلسفه و دیدگاه' : 'Philosophy & Vision'}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-2xl md:text-5xl font-light tracking-tight leading-relaxed mb-12 text-foreground/95 ${
            isFa ? 'text-right' : 'text-left'
          }`}
          dir={isFa ? 'rtl' : 'ltr'}
        >
          {isFa 
            ? 'پل زدن میان مهندسی سازه، معماری درمان‌بخش و موشن‌دیزاین سینمایی. هر فضا داستانی را از طریق نور، هندسه و حرکت روایت می‌کند.' 
            : 'Bridging structural engineering, healing architecture, and cinematic motion design. Every space tells a story through light, geometry, and motion.'}
        </motion.h2>

        <div 
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/10 text-sm text-foreground/70 font-light ${
            isFa ? 'text-right' : 'text-left'
          }`} 
          dir={isFa ? 'rtl' : 'ltr'}
        >
          <div>
            <h3 className="text-foreground uppercase tracking-widest text-xs mb-3 font-medium">
              {isFa ? 'معماری' : 'Architecture'}
            </h3>
            <p>
              {isFa 
                ? 'طراحی فضاهایی که روان‌شناسی انسانی، سلامت روان و یکپارچگی سازه را در اولویت قرار می‌دهند.' 
                : 'Designing spaces that prioritize human psychology, mental wellness, and structural integrity.'}
            </p>
          </div>
          <div>
            <h3 className="text-foreground uppercase tracking-widest text-xs mb-3 font-medium">
              {isFa ? 'طراحی درمانی' : 'Healing Design'}
            </h3>
            <p>
              {isFa 
                ? 'خلق محیط‌های تخصصی که بهبودی، آرامش و کارایی بالینی را تقویت می‌کنند.' 
                : 'Creating specialized environments that enhance healing, tranquility, and clinical efficiency.'}
            </p>
          </div>
          <div>
            <h3 className="text-foreground uppercase tracking-widest text-xs mb-3 font-medium">
              {isFa ? 'موشن گرافی' : 'Motion Graphics'}
            </h3>
            <p>
              {isFa 
                ? 'تبدیل فرم‌های ایستاتیک معماری به روایت‌های بصری پویا و غوطه‌ورکننده.' 
                : 'Transforming static architectural forms into dynamic, immersive visual narratives.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}