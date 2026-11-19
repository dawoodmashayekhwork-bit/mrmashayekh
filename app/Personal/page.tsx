"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import AboutSection from "@/components/AboutSection";

type ProjectBadgeType = "podcast" | "courses" | "youtube" | "episode" | "writings";

type PersonalLinkItem = {
  id: string;
  badgeType: ProjectBadgeType;
  sourceUrl: string;
  domainBadge: string;
  category: { fa: string; en: string };
  title: { fa: string; en: string };
  summary: { fa: string; en: string };
  ctaText: { fa: string; en: string };
  featured?: boolean;
};

const PERSONAL_ITEMS: PersonalLinkItem[] = [
  {
    id: "podbm",
    badgeType: "podcast",
    sourceUrl: "https://PODBM.IR",
    domainBadge: "PODBM.IR",
    category: { fa: "پادکست و کتاب صوتی", en: "Podcast & Audiobook" },
    title: {
      fa: "معماری و راز جاودانگی",
      en: "The Timeless Way of Building",
    },
    summary: {
      fa: "پادکست گروهی و شنیدنی درباره معماری، الگوها و حسِ زنده بودن فضاها؛ تمام اپیزودها و جزئیاتش توی سایت خود پادکست در دسترسه.",
      en: "A collaborative listening project around architecture, patterns, and living spaces—all episodes and updates live directly on the project site.",
    },
    ctaText: {
      fa: "سر زدن به PODBM.IR",
      en: "Open PODBM.IR",
    },
    featured: true,
  },
  {
    id: "faradars",
    badgeType: "courses",
    sourceUrl: "https://faradars.org/instructors/dawood-mashayekh",
    domainBadge: "faradars.org",
    category: { fa: "کلاس و آموزش", en: "Courses" },
    title: {
      fa: "صفحه تدریس در فرادرس",
      en: "Instructor Page on Faradars",
    },
    summary: {
      fa: "دوره‌های آموزشی درباره تاریخ معماری، پرزانته و تبدیل رندرها به انیمیشن با هوش مصنوعی؛ همه دوره‌ها یکجا توی صفحه مدرس جمع شدن.",
      en: "Courses on architectural history, presentation, and turning renders into AI animations—all gathered in one instructor profile.",
    },
    ctaText: {
      fa: "دیدن دوره‌ها در فرادرس",
      en: "Browse Courses",
    },
  },
  {
    id: "youtube",
    badgeType: "youtube",
    sourceUrl: "https://www.youtube.com/@dawoodbm",
    domainBadge: "youtube.com/@dawoodbm",
    category: { fa: "ویدیو های تحلیلی و گپ‌وگفت", en: "Videos" },
    title: {
      fa: "کانال یوتیوب تاریخ معماری",
      en: "Architectural History on YouTube",
    },
    summary: {
      fa: "ویدیوها و روایت‌های خودمونی و تحلیلی درباره تاریخ معماری و ابزارهای طراحی؛ مستقیم از کانال یوتیوب دنبالش کن.",
      en: "Relaxed, analytical videos on architectural history and design workflows straight from the YouTube channel.",
    },
    ctaText: {
      fa: "رفتن به یوتیوب",
      en: "Watch on YouTube",
    },
  },
  {
    id: "fidibo",
    badgeType: "episode",
    sourceUrl:
      "https://fidibo.com/episode/50004512-%D9%85%D9%86%D8%A7%D8%B1-%D9%87%D8%B4%D8%AA%D9%85-%D9%85%D8%B3%D8%A7%D8%A8%D9%82%D8%A7%D8%AA",
    domainBadge: "fidibo.com",
    category: { fa: "هیئت تحریریه  ", en: "Guest Episode" },
    title: {
      fa: "«منارۀ هشتم: مسابقات» در رادیو ظریر",
      en: "“Eighth Minaret: Competitions” on Radio Zarir",
    },
    summary: {
      fa: "این مناره بر مسابقات معماری می‌تابد؛ اهمیت مسابقات برای دانشجویان و معماران و روایتش روی فیدیبو در دسترسه.",
      en: "Shining a light on architectural competitions—why they matter and how they unfold—available to stream on Fidibo.",
    },
    ctaText: {
      fa: "گوش دادن در فیدیبو",
      en: "Listen on Fidibo",
    },
  },
  {
    id: "personal-writings",
    badgeType: "writings",
    sourceUrl: "https://DAWOODMASHAYEKH.IR",
    domainBadge: "DAWOODMASHAYEKH.IR",
    category: { fa: "یادداشت و متن", en: "Personal Writings" },
    title: {
      fa: "نوشته‌های شخصی در سایت شخصی",
      en: "Personal Writings on My Personal Site",
    },
    summary: {
      fa: "یادداشت‌ها، برداشت‌ها و متن‌های شخصی درباره معماری، فناوری و تجربه‌های روزمره که مستقیم توی DAWOODMASHAYEKH.IR منتشر می‌شن.",
      en: "Personal notes, reflections, and essays on architecture, technology, and everyday life published on DAWOODMASHAYEKH.IR.",
    },
    ctaText: {
      fa: "خواندن در DAWOODMASHAYEKH.IR",
      en: "Read on DAWOODMASHAYEKH.IR",
    },
  },
];

function ProjectVisualBadge({ type }: { type: ProjectBadgeType }) {
  return (
    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#F5C542]/20 via-white/[0.06] to-white/[0.02] border border-[#F5C542]/30 flex items-center justify-center shrink-0 text-[#F5C542] shadow-inner">
      {type === "podcast" && (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M12 3a7 7 0 0 0-7 7v4a2 2 0 0 0 2 2h1v-6H7a4 4 0 0 1 8 0h-1v6h1a2 2 0 0 0 2-2v-4a7 7 0 0 0-7-7Z" />
          <path d="M8 20h8" strokeLinecap="round" />
        </svg>
      )}
      {type === "courses" && (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H11v15H6.5A2.5 2.5 0 0 0 4 21V6.5Z" />
          <path d="M20 6.5A2.5 2.5 0 0 0 17.5 4H13v15h4.5A2.5 2.5 0 0 1 20 21V6.5Z" />
        </svg>
      )}
      {type === "youtube" && (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75">
          <rect x="2.5" y="5" width="19" height="14" rx="4" />
          <path d="m10.5 9.2 4.5 2.8-4.5 2.8V9.2Z" fill="currentColor" stroke="none" />
        </svg>
      )}
      {type === "episode" && (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M12 3v3" strokeLinecap="round" />
          <path d="M9 20h6l-1-11h-4L9 20Z" strokeLinejoin="round" />
          <path d="M7 20h10" strokeLinecap="round" />
          <path d="M6.5 7.5a7 7 0 0 1 11 0" strokeLinecap="round" />
        </svg>
      )}
      {type === "writings" && (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M12 20h9" strokeLinecap="round" />
          <path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

export default function PersonalProjectsPage() {
  const [lang, setLang] = useState<"fa" | "en">("fa");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedLang = localStorage.getItem("site_lang") as "fa" | "en";
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const handleToggleLang = () => {
    const newLang = lang === "fa" ? "en" : "fa";
    setLang(newLang);
    localStorage.setItem("site_lang", newLang);
  };

  const isFa = lang === "fa";

  const navigateToSection = (sectionId: string) => {
    router.push(`/#${sectionId}`);
    setIsOpen(false);
  };

  return (
    <main
      className="w-full bg-ink text-paper font-sans min-h-screen relative overflow-hidden"
      dir={isFa ? "rtl" : "ltr"}
    >
      {/* نور ملایم و گرید پس‌زمینه */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[520px] sm:w-[680px] h-[340px] rounded-full bg-[#F5C542]/[0.06] blur-[120px] pointer-events-none z-[1]" />
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ناوبری بالا */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="fixed top-0 left-0 w-full z-40 px-4 sm:px-6 md:px-16 py-4 sm:py-6 flex justify-between items-center bg-gradient-to-b from-background/90 via-background/50 to-transparent backdrop-blur-md"
      >
        <span
          className="hidden md:block text-xs tracking-[0.3em] uppercase font-light text-foreground cursor-pointer hover:text-[#F5C542] transition-colors"
          onClick={() => router.push("/")}
        >
          DAWOOD MASHAYEKH
        </span>

        <div className="md:hidden flex items-center">
          <button
            onClick={handleToggleLang}
            className="px-2.5 py-1 text-[11px] font-mono tracking-wider text-foreground/90 border border-foreground/20 hover:border-[#F5C542] hover:text-[#F5C542] transition-all rounded-sm cursor-pointer"
          >
            {isFa ? "EN" : "فا"}
          </button>
        </div>

        <span
          className="md:hidden text-[11px] tracking-[0.2em] uppercase font-light text-foreground cursor-pointer text-center absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
          onClick={() => router.push("/")}
        >
          DAWOOD MASHAYEKH
        </span>

        <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] uppercase text-foreground/75 font-light">
          <button
            onClick={() => navigateToSection("portfolio")}
            className="hover:text-[#F5C542] transition-colors cursor-pointer"
          >
            {isFa ? "پروژه‌ها" : "Projects"}
          </button>
          <button
            onClick={() => navigateToSection("experience")}
            className="hover:text-[#F5C542] transition-colors cursor-pointer"
          >
            {isFa ? "تجربیات" : "Experience"}
          </button>
          <button
            onClick={() => router.push("/")}
            className="hover:text-[#F5C542] transition-colors cursor-pointer"
          >
            {isFa ? "صفحه اصلی" : "Home"}
          </button>

          <button
            onClick={handleToggleLang}
            className="px-2.5 py-1 text-[11px] font-mono tracking-wider text-foreground/90 border border-foreground/20 hover:border-[#F5C542] hover:text-[#F5C542] transition-all rounded-sm cursor-pointer"
          >
            {isFa ? "EN" : "فا"}
          </button>
        </nav>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground/90 focus:outline-none p-2 cursor-pointer relative w-8 h-8 flex items-center justify-center"
            aria-label="Toggle Menu"
          >
            <div className="relative w-5 h-4 flex flex-col justify-between">
              <span
                className={`absolute top-0 left-0 w-full h-[2px] bg-foreground transition-all duration-300 origin-center ${
                  isOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`absolute top-[7px] left-0 w-full h-[2px] bg-foreground transition-opacity duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 w-full h-[2px] bg-foreground transition-all duration-300 origin-center ${
                  isOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </div>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-[#0a0a0c]/95 backdrop-blur-xl border-b border-white/10 py-6 px-6 flex flex-col gap-4 md:hidden shadow-2xl"
              dir={isFa ? "rtl" : "ltr"}
            >
              <button
                onClick={() => navigateToSection("portfolio")}
                className={`${
                  isFa ? "text-right" : "text-left"
                } text-sm tracking-widest uppercase text-foreground/80 hover:text-[#F5C542] transition-colors py-2.5 border-b border-white/5 cursor-pointer`}
              >
                {isFa ? "پروژه‌ها" : "Projects"}
              </button>
              <button
                onClick={() => navigateToSection("experience")}
                className={`${
                  isFa ? "text-right" : "text-left"
                } text-sm tracking-widest uppercase text-foreground/80 hover:text-[#F5C542] transition-colors py-2.5 border-b border-white/5 cursor-pointer`}
              >
                {isFa ? "تجربیات" : "Experience"}
              </button>
              <button
                onClick={() => router.push("/")}
                className={`${
                  isFa ? "text-right" : "text-left"
                } text-sm tracking-widest uppercase text-foreground/80 hover:text-[#F5C542] transition-colors py-2.5 cursor-pointer`}
              >
                {isFa ? "صفحه اصلی" : "Home"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* محتوای اصلی بهینه‌شده برای موبایل و دسکتاپ */}
      <section className="pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 md:px-16 max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`mb-10 sm:mb-14 ${isFa ? "text-right" : "text-left"}`}
        >
          <span className="inline-block text-[#F5C542] text-[11px] sm:text-xs tracking-[0.22em] uppercase mb-3 sm:mb-4 px-3.5 py-1.5 rounded-full bg-[#F5C542]/10 border border-[#F5C542]/20">
            {isFa ? "گوشه‌کنارهای شخصی" : "Personal Corner"}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-paper mb-4 sm:mb-5">
            {isFa ? "پروژه‌های شخصی" : "Personal Projects"}
          </h1>
          <p className="max-w-2xl text-paper/70 text-sm sm:text-base font-light leading-relaxed">
            {isFa
              ? "اینجا اون چیزایی جمع شدن که خارج از کارهای رسمی و پروژه‌ای با ذوق و حوصله دنبال می‌کنم؛ از پادکست و کلاس گرفته تا ویدیو، اپیزود مهمان و نوشته‌های شخصی."
              : "A laid-back hub for the things I tinker with outside formal client work—podcasts, courses, videos, guest episodes, and personal writings."}
          </p>
        </motion.div>

        {/* شبکه کارت‌ها با نشان اختصاصی و مناسب موبایل */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {PERSONAL_ITEMS.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 * idx }}
              className={`group rounded-2xl p-5 sm:p-7 md:p-8 border transition-all duration-300 flex flex-col justify-between gap-5 sm:gap-6 backdrop-blur-md ${
                item.featured
                  ? "md:col-span-2 bg-gradient-to-br from-white/[0.06] to-white/[0.02] border-[#F5C542]/30 hover:border-[#F5C542]/60"
                  : "bg-ink2/50 border-white/10 hover:border-white/25 hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex flex-col gap-3.5 sm:gap-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <ProjectVisualBadge type={item.badgeType} />
                    <span className="text-xs px-3 py-1 rounded-full bg-white/[0.06] text-paper/80 border border-white/10 truncate">
                      {item.category[lang]}
                    </span>
                  </div>
                  <span
                    dir="ltr"
                    className="hidden sm:inline text-xs font-mono text-[#F5C542]/90 tracking-wide shrink-0"
                  >
                    {item.domainBadge}
                  </span>
                </div>

                <span
                  dir="ltr"
                  className="sm:hidden text-[11px] font-mono text-[#F5C542]/90 tracking-wide"
                >
                  {item.domainBadge}
                </span>

                <h2
                  className={`text-xl sm:text-2xl md:text-3xl font-normal text-paper group-hover:text-[#F5C542] transition-colors leading-snug ${
                    isFa ? "" : "font-serif italic"
                  }`}
                >
                  {item.title[lang]}
                </h2>

                <p className="text-sm sm:text-base text-paper/75 font-light leading-relaxed">
                  {item.summary[lang]}
                </p>
              </div>

              <div className="pt-1">
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3.5 sm:py-3 rounded-xl bg-white/[0.05] border border-white/15 text-xs sm:text-sm text-paper hover:bg-[#F5C542] hover:text-ink hover:border-[#F5C542] transition-all duration-300 cursor-pointer"
                >
                  <span>{item.ctaText[lang]}</span>
                  <span>↗</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* کامپوننت About در انتهای صفحه */}
      <div className="relative z-10 border-t border-white/10 mt-12 sm:mt-16">
        <AboutSection lang={lang} />
      </div>

      {/* دکمه بازگشت به صفحه اصلی */}
      <div className="relative z-10 py-10 sm:py-14 px-4 sm:px-6 flex justify-center border-t border-white/10">
        <a
          href="https://mrmashayekh.ir/"
          className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/15 text-paper font-medium text-xs tracking-[0.2em] uppercase hover:bg-[#F5C542] hover:text-ink hover:border-[#F5C542] transition-all duration-300 inline-flex items-center justify-center gap-3 cursor-pointer shadow-xl"
        >
          <span>{isFa ? "→" : "←"}</span>
          <span>{isFa ? "بازگشت به صفحه اصلی" : "Back to Home"}</span>
        </a>
      </div>
    </main>
  );
}