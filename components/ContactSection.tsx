"use client";

import { motion } from "framer-motion";

interface ContactSectionProps {
  lang: 'fa' | 'en';
}

export default function ContactSection({ lang }: ContactSectionProps) {
  const isFa = lang === 'fa';

  const contactLinks = [
    {
      label: { fa: "وب‌سایت شخصی", en: "Website" },
      href: "http://dawoodmashayekh.ir/",
      text: "Dawoodmashayekh.ir"
    },
    {
      label: { fa: "ایمیل ارتباطی", en: "Email" },
      href: "mailto:contact@mrmashayekh.ir",
      text: "Contact@mrmashayekh.ir"
    },
    {
      label: { fa: "ایمیل کاری", en: "Work" },
      href: "mailto:dawoodmashayekh.work@gmail.com",
      text: "Dawoodmashayekh.work@gmail.com"
    },
  ];

  return (
    <section id="contact" className="relative w-full py-28 px-6 md:px-16 bg-background border-t border-white/10 text-center">
      <div className="max-w-6xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-accent text-sm md:text-base font-medium tracking-[0.3em] uppercase block mb-16"
        >
          {isFa ? 'اطلاعات تماس' : 'Get In Touch'}
        </motion.span>

        {/* گرید لینک‌های تماس با ابعاد بزرگ‌تر */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-28">
          {contactLinks.map((link, index) => (
            <motion.div
              key={link.text}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <a
                href={link.href}
                className="group flex flex-col items-center gap-3 text-base md:text-xl tracking-wide text-foreground/80 hover:text-accent transition-colors duration-300"
              >
                {/* عنوان دو زبانه */}
                <span className="text-xs tracking-[0.2em] uppercase text-accent/80 font-medium">
                  {link.label[lang]}
                </span>
                {/* لینک بزرگ‌تر */}
                <span className="border-b border-white/0 group-hover:border-accent transition-all pb-1 font-light break-all">
                  {link.text}
                </span>
              </a>
            </motion.div>
          ))}
        </div>

        {/* فوتر */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs tracking-widest text-foreground/40 pt-12 border-t border-white/5" dir={isFa ? 'rtl' : 'ltr'}>
          <p className="mb-4 md:mb-0">
            {isFa 
              ? '© ۱۴۰۵ داود مشایخ. تمامی حقوق محفوظ است.' 
              : '© 2026 Dawood Mashayekh. All rights reserved.'}
          </p>
          <div className="flex gap-8">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors uppercase">
              {isFa ? 'اینستاگرام' : 'Instagram'}
            </a>
            <a href="https://www.linkedin.com/in/d-mashayekh" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors uppercase">
              {isFa ? 'لینکدین' : 'LinkedIn'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}