"use client";

import { motion } from "framer-motion";

interface ContactSectionProps {
  lang: 'fa' | 'en';
}

export default function ContactSection({ lang }: ContactSectionProps) {
  const isFa = lang === 'fa';

  const contactLinks = [
    {
      label: { fa: "ایمیل ارتباطی", en: "Email" },
      href: "mailto:contact@mrmashayekh.ir",
      text: "Contact@mrmashayekh.ir",
    },
    {
      label: { fa: "شماره تماس", en: "Phone" },
      href: "tel:+989221332639",
      text: "0922 133 2639",
    },
    {
      label: { fa: "وب‌سایت شخصی", en: "Website" },
      href: "http://dawoodmashayekh.ir/",
      text: "Dawoodmashayekh.ir",
    },
    {
      label: { fa: "ایمیل کاری", en: "Work" },
      href: "mailto:dawoodmashayekh.work@gmail.com",
      text: "Dawoodmashayekh.work@gmail.com",
    },
  ];

  return (
    <section
      id="contact"
      className="relative w-full py-28 px-6 md:px-16 bg-background border-t border-white/10 text-center"
    >
      <div className="max-w-5xl mx-auto">

        {/* عنوان */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-accent text-sm md:text-base font-medium tracking-[0.3em] uppercase block mb-16"
        >
          {isFa ? 'اطلاعات تماس' : 'Get In Touch'}
        </motion.span>

        {/* اطلاعات تماس */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-x-24
            gap-y-16
            mb-28
            justify-items-center
          "
        >

          {contactLinks.map((link, index) => (
            <motion.div
              key={link.text}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1
              }}
              className="w-full flex justify-center"
            >
              <a
                href={link.href}
                dir="ltr"
                className="
                  group
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-3
                  text-center
                  text-foreground/80
                  hover:text-accent
                  transition-colors
                  duration-300
                "
              >

                {/* عنوان */}
                <span
                  dir={isFa ? "rtl" : "ltr"}
                  className="
                    text-xs
                    tracking-[0.2em]
                    uppercase
                    text-accent/80
                    font-medium
                  "
                >
                  {link.label[lang]}
                </span>

                {/* اطلاعات */}
                <span
                  dir="ltr"
                  className="
                    border-b
                    border-white/0
                    group-hover:border-accent
                    transition-all
                    pb-1
                    font-light
                    whitespace-nowrap
                    text-base
                    md:text-xl
                    text-center
                  "
                >
                  {link.text}
                </span>

              </a>
            </motion.div>
          ))}

        </div>

        {/* فوتر */}
        <div
          className="
            flex
            flex-col
            md:flex-row
            justify-center
            items-center
            text-xs
            tracking-widest
            text-foreground/40
            pt-12
            border-t
            border-white/5
            text-center
          "
          dir={isFa ? 'rtl' : 'ltr'}
        >

          <p>
            {isFa
              ? '© ۱۴۰۵ داود مشایخ. تمامی حقوق محفوظ است.'
              : '© 2026 Dawood Mashayekh. All rights reserved.'}
          </p>

        </div>

      </div>
    </section>
  );
}