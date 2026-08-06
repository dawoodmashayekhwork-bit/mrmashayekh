"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section id="contact" className="relative w-full py-32 px-6 md:px-16 bg-background border-t border-white/5 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-accent text-xs tracking-[0.3em] uppercase block mb-4"
        >
          ارتباط با من
        </motion.span>
        
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          href="mailto:contact@mrmashayekh.ir"
          className="text-lg md:text-xl text-accent border-b border-accent pb-1 hover:text-foreground hover:border-foreground transition-all duration-300 tracking-wider mb-20 inline-block"
        >
          contact@mrmashayekh.ir
        </motion.a>

        <div className="w-full flex flex-col md:flex-row justify-between items-center text-xs tracking-widest text-foreground/40 pt-12 border-t border-white/10">
          <p>© ۱۴۰۵ داود مشایخ. تمامی حقوق محفوظ است.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">گیت‌هاب</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">اینستاگرام</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">لینکدین</a>
          </div>
        </div>
      </div>
    </section>
  );
}