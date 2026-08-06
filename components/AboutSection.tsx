"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
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
          فلسفه و دیدگاه
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-5xl font-light tracking-tight leading-relaxed mb-12 text-foreground/90 text-right"
          dir="rtl"
        >
          پل زدن میان مهندسی سازه، معماری درمان‌بخش و موشن‌دیزاین سینمایی. هر فضا داستانی را از طریق نور، هندسه و حرکت روایت می‌کند.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/10 text-sm text-foreground/60 font-light text-right" dir="rtl">
          <div>
            <h3 className="text-foreground uppercase tracking-widest text-xs mb-3 font-medium">معماری</h3>
            <p>طراحی فضاهایی که روان‌شناسی انسانی، سلامت روان و یکپارچگی سازه را در اولویت قرار می‌دهند.</p>
          </div>
          <div>
            <h3 className="text-foreground uppercase tracking-widest text-xs mb-3 font-medium">طراحی درمانی</h3>
            <p>خلق محیط‌های تخصصی که بهبودی، آرامش و کارایی بالینی را تقویت می‌کنند.</p>
          </div>
          <div>
            <h3 className="text-foreground uppercase tracking-widest text-xs mb-3 font-medium">موشن و سه‌بعدی</h3>
            <p>تبدیل فرم‌های ایستاتیک معماری به روایت‌های بصری پویا و غوطه‌ورکننده.</p>
          </div>
        </div>
      </div>
    </section>
  );
}