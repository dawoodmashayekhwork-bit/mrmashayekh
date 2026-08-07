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
            ? ' به‌منظور رعایت تعهدات حرفه‌ای و محرمانگی پروژه‌ها، برخی از موشن‌گرافی‌ها و ویدئوها به‌دلیل عدم دریافت مجوز انتشار از کارفرما یا کارفرمایان، در این پلتفرم قابل نمایش نیستند.' 
            : 'To respect professional obligations and project confidentiality, some motion graphics and videos are not available on this platform, as permission for public release has not been granted by the client(s).'}
        </motion.h2>

        
      </div>
    </section>
  );
}