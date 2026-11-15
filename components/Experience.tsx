"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  id: string;
  sequence: string;
  title: string;
  company: string;
  date: string;
  description: string;
  modalDetails: string;
  image: string;
  tags: string[];
  externalLink?: {
    text: string;
    url: string;
  };
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "miras",
    sequence: "10 // وزارت میراث فرهنگی",
    title: "همکار پژوهشی",
    company: "وزارت میراث فرهنگی، گردشگری و صنایع دستی ایران",
    date: "آبان 1404 — تاکنون",
    description: "مشارکت در پروژه ساماندهی مکانی آثار ثبت‌شده ملی، تحلیل‌های فضایی (GIS) و توسعه آرشیو دیجیتال.",
    modalDetails: "وزارت میراث فرهنگی، گردشگری و صنایع دستی ایران\n\nآبان 1404 — تاکنون | تمام وقت • ترکیبی (تهران)\n\nمشارکت در پروژه ساماندهی مکانی آثار ثبت‌شده ملی. مسئول تحلیل‌های فضایی مبتنی بر سیستم اطلاعات جغرافیایی (GIS)، ساختاردهی متاداده‌ها و توسعه سیستم‌های آرشیو دیجیتال جهت تقویت استراتژی‌های حفاظت داده‌محور و مدیریت میراث.",
    image: "../images/miras.png",
    tags: ["GIS", "میراث دیجیتال", "تحلیل فضایی", "حفاظت داده‌محور"]
  },
  {
    id: "faradars",
    sequence: "09 // فرادرس (FaraDars)",
    title: "مدرس دوره‌های تخصصی",
    company: "فرادرس (FaraDars)",
    date: "اسفند 1403 — تاکنون",
    description: "تالیف و تدریس دوره‌های آموزشی تخصصی نرم‌افزارها و هوش مصنوعی در معماری برای مهندسان و دانشجویان.",
    modalDetails: "فرادرس (FaraDars)\n\nاسفند 1403 — تاکنون | پاره‌وقت • دورکاری\n\nتالیف و تدریس دوره‌های آموزشی تخصصی نرم‌افزارها و هوش مصنوعی در معماری برای مهندسان و دانشجویان.",
    image: "../images/faradars.jpg",
    tags: ["آموزش آنلاین", "هوش مصنوعی در معماری", "افترافکت"],
    externalLink: {
      text: "مشاهده دوره‌ها در فرادرس ↗",
      url: "https://faradars.org/instructors/dawood-mashayekh"
    }
  },
  {
    id: "hoz",
    sequence: "08 // مهندسین مشاور HOZ",
    title: "طراح فضاهای درمانی",
    company: "مهندسین مشاور HOZ",
    date: "مهر 1403 — آبان 1404",
    description: "طراحی معماری مراکز تخصصی درمانی مطابق استانداردهای بیمارستانی و تولید محتوای تخصصی ارائه‌ها.",
    modalDetails: "مهندسین مشاور HOZ (hozco)\n\nمهر 1403 — آبان 1404 | تمام‌وقت\n\nطراحی معماری فضاها و مراکز تخصصی درمانی مطابق با استانداردهای روز طراحی بیمارستان، ضوابط فیزیکی و سیرکولاسیون درمانی؛ همچنین تولید محتوای تخصصی، ویدئوهای معرفی پروژه و ارائه‌های بصری جهت مستندسازی فرایند طراحی.",
    image: "../images/hoz.jpg",
    tags: ["AutoCAD", "مدیریت پروژه", "طراحی بیمارستانی", "ارائه پروژه", "تولید محتوای تخصصی", "Motion Design"]
  },
  {
    id: "youtube",
    sequence: "07 // کانال شخصی یوتیوب",
    title: "تولیدکننده محتوا و مدرس معماری",
    company: "کانال شخصی یوتیوب",
    date: "اردیبهشت 1401 — تاکنون",
    description: "تولید ویدیوهای آموزشی کاربردی پیرامون افزونه‌های تخصصی معماری و تحلیل تاریخ معماری جهان.",
    modalDetails: "کانال شخصی یوتیوب\n\nاردیبهشت 1401 — تاکنون | خوداشتغالی • دورکاری\n\nتولید ویدیوهای آموزشی کاربردی پیرامون افزونه‌های تخصصی معماری و تحلیل تاریخ معماری جهان.",
    image: "../images/youtube.png",
    tags: ["تدریس", "Adobe After Effects", "تولید محتوا"]
  },
  {
    id: "iust-ta",
    sequence: "06 // دانشگاه علم و صنعت ایران",
    title: "کمک استاد کارگاه طراحی بیمارستان ۳",
    company: "دانشگاه علم و صنعت ایران",
    date: "مهر 1403 — تاکنون",
    description: "همکاری با استاد در مدیریت کلاس، بازخورد به دانشجویان و هدایت پروژه‌های پیچیده بیمارستانی.",
    modalDetails: "دانشگاه علم و صنعت ایران\n\nمهر 1403 — تاکنون | دستیار استاد (TA)\n\nهمکاری با استاد در مدیریت کلاس و بازخورد به دانشجویان و هدایت پروژه‌های تخصصی طراحی فضاهای پیچیده بیمارستانی.",
    image: "../images/iust.png",
    tags: ["دستیار استاد", "طراحی بیمارستان", "مدیریت آتلیه"]
  },
  {
    id: "iust-workshop",
    sequence: "05 // دانشکده معماری علم و صنعت",
    title: "مدرس کارگاه‌های آموزش پرزانته",
    company: "دانشگاه علم و صنعت ایران",
    date: "شهریور 1402 — اردیبهشت 1403",
    description: "برگزاری کارگاه‌های تخصصی افترافکت و فتوشاپ جهت ارتقای مهارت‌های ارائه کارکنان.",
    modalDetails: "دانشگاه علم و صنعت ایران\n\nشهریور 1402 — اردیبهشت 1403 | حضوری • دانشکده معماری\n\nبرگزاری دوره‌ها و کارگاه‌های تخصصی آموزش نرم‌افزارهای گرافیکی (افترافکت و فتوشاپ) جهت ارتقای مهارت‌های ارائه و پرزانته برای کارکنان دانشگاه علم وصنعت.",
    image: "../images/iust.png",
    tags: ["پرزانته معماری", "After Effects", "Photoshop"]
  },
  {
    id: "iust-plus",
    sequence: "04 // iust_plus",
    title: "مدرس موشن گرافیک",
    company: "iust_plus",
    date: "خرداد 1403 — مهر 1403",
    description: "طراحی سرفصل و تدریس دوره جامع موشن گرافیک جهت آموزش مهارت‌های گرافیک متحرک.",
    modalDetails: "iust_plus\n\nخرداد 1403 — مهر 1403 | پاره‌وقت • دورکاری\n\nطراحی سرفصل و تدریس «دوره جامع موشن گرافیک» جهت آموزش مهارت‌های گرافیک متحرک به علاقمندان و دانشجویان.",
    image: "../images/iust_plus.png",
    tags: ["موشن گرافیک", "آموزش گام‌به‌گام"]
  },
  {
    id: "masters",
    sequence: "03 // دانشگاه علم و صنعت ایران",
    title: "دانشجوی ارشد طراحی درمانی",
    company: "دانشگاه علم و صنعت ایران",
    date: "شهریور 1401 — مهر 1403",
    description: "تحصیل ارشد معماری با تمرکز بر پژوهش‌های علمی و استانداردهای طراحی محیط‌های درمانی.",
    modalDetails: "دانشگاه علم و صنعت ایران\n\nشهریور 1401 — مهر 1403 | حضوری • تهران\n\nتحصیل در مقطع کارشناسی ارشد معماری با تمرکز بر پژوهش‌های علمی، تحلیل فضایی و استانداردهای طراحی محیط‌های درمانی و سلامت.",
    image: "../images/iust.png",
    tags: ["طراحی درمانی", "معماری و سلامت", "پژوهش علمی"]
  },
  {
    id: "construction",
    sequence: "02 // پروژه ساختمانی نوروزی",
    title: "کارآموز مدیریت پروژه کارگاه ساختمانی",
    company: "پروژه ساختمانی نوروزی",
    date: "خرداد 1400 — خرداد 1401",
    description: "تجربه اجرایی در پروژه‌های واقعی، نظارت بر بتن‌ریزی سقف‌ها، تیرریزی و اجرای اسکلت سازه.",
    modalDetails: "پروژه ساختمانی نوروزی\n\nخرداد 1400 — خرداد 1401 | تمام‌وقت • حضوری (تهران)\n\nکسب تجربه اجرایی در پروژه‌های ساختمانی واقعی، نظارت بر عملیات اجرایی شامل بتن‌ریزی‌سقف‌ها، تیرریزی و اجرای اسکلت سازه.",
    image: "../images/1.png",
    tags: ["مدیریت پروژه", "بتن‌ریزی", "اجرای سازه", "ساختمان بتنی"]
  },
  {
    id: "zarir",
    sequence: "01 // رادیو زریر (Radio Zarir)",
    title: "عضو هیئت تحریریه",
    company: "رادیو زریر",
    date: "خرداد 1399 — خرداد 1400",
    description: "نگارش و تولید محتوای صوتی با محوریت مسابقات معماری و تحلیل آثار برجسته (اپیزود منارۀ هشتم).",
    modalDetails: "رادیو زریر (Radio Zarir)\n\nخرداد 1399 — خرداد 1400 | پاره‌وقت\n\nمشارکت در نگارش و تولید محتوای صوتی با محوریت مسابقات معماری و تحلیل آثار برجسته (از جمله اپیزود منارۀ هشتم).",
    image: "../images/zarir.jpg",
    tags: ["تولید محتوا", "پادکست معماری"]
  }
];

export default function ProfessionalJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeModal, setActiveModal] = useState<{ title: string; text: string } | null>(null);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <section id="experience" className="relative w-full py-32 px-6 md:px-16 bg-[#0a0a0c] text-[#e5e5e5] font-sans overflow-hidden" dir="rtl">
      {/* افکت‌های پس‌زمینه محیطی و شبکه */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: `
          radial-gradient(circle at 50% 20%, rgba(212, 175, 55, 0.06) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(180, 130, 40, 0.03) 0%, transparent 40%),
          #0a0a0c
        `
      }} />
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px"
      }} />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* تیتر بخش */}
        <div className="mb-20 text-right">
          <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase block mb-3 font-light">
            مسیر حرفه‌ای
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white">
            تجربیات و فعالیت‌ها
          </h2>
        </div>

        {/* ساختار خط زمانی (Timeline) عمودی با اسکرول رو به پایین */}
        <div ref={containerRef} className="relative border-r border-[#d4af37]/20 pr-6 md:pr-10 space-y-16">
          {EXPERIENCES.map((item, index) => (
            <div 
              key={item.id} 
              ref={(el) => { cardsRef.current[index] = el; }}
              className="relative group opacity-0"
            >
              {/* نقطه طلایی روی خط زمان */}
              <div className="absolute -right-[31px] md:-right-[47px] top-6 w-3.5 h-3.5 bg-[#0a0a0c] border-2 border-[#d4af37] rounded-full shadow-[0_0_10px_#d4af37] group-hover:bg-[#d4af37] transition-colors" />

              {/* کارت تجربه */}
              <article 
                onClick={() => setActiveModal({ title: item.title, text: item.modalDetails })}
                className="relative bg-[rgba(18,18,22,0.75)] backdrop-blur-[20px] border border-[rgba(212,175,55,0.15)] p-6 md:p-8 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] cursor-pointer transition-all duration-500 hover:border-[rgba(212,175,55,0.5)] hover:-translate-y-1"
              >
                {/* لوگو یا آست‌باکس بالا */}
                <div className="absolute top-6 left-6 w-14 h-14 bg-[#0d0d10] border-[1.5px] border-[#d4af37] flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.7)] rounded-lg overflow-hidden">
                  <img src={item.image} alt={item.company} className="w-full h-full object-cover" />
                </div>

                <div className="mb-3 pl-16 md:pl-20">
                  <span className="font-mono text-xs text-[#d4af37] tracking-[2px] uppercase flex items-center gap-2">
                    {item.sequence}
                  </span>
                </div>

                <h3 className="m-0 mb-1.5 text-xl md:text-2xl font-normal text-white">{item.title}</h3>
                <span className="block text-xs text-white/45 mb-4">{item.date}</span>
                <p className="m-0 text-sm leading-[1.8] text-white/70">{item.description}</p>

                {item.externalLink && (
                  <a 
                    href={item.externalLink.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={(e) => e.stopPropagation()} 
                    className="inline-block mt-4 px-4 py-2 text-xs text-[#d4af37] border border-[#d4af37]/40 bg-[#d4af37]/5 rounded transition-all duration-300 hover:bg-[#d4af37] hover:text-[#0a0a0c]"
                  >
                    {item.externalLink.text}
                  </a>
                )}

                <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-[rgba(212,175,55,0.15)]">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs bg-[rgba(212,175,55,0.08)] text-[#d4af37] px-3 py-1 rounded border border-[rgba(212,175,55,0.2)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* مدال جزئیات */}
      <div className={`fixed inset-0 bg-[rgba(5,5,7,0.9)] backdrop-blur-[20px] flex items-center justify-center z-[100] transition-opacity duration-400 ${activeModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-[#121216] border border-[rgba(212,175,55,0.3)] p-8 md:p-10 w-[min(90%,540px)] shadow-[0_25px_50px_rgba(0,0,0,0.9)] rounded-xl">
          <h3 className="mt-0 text-xl text-white font-normal">{activeModal?.title}</h3>
          <p className="text-white/70 text-sm leading-[1.8] mt-4 whitespace-pre-line">{activeModal?.text}</p>
          <button 
            onClick={() => setActiveModal(null)}
            className="mt-6 bg-transparent border border-[#d4af37] text-[#d4af37] px-6 py-2.5 cursor-pointer text-xs transition-all duration-300 hover:bg-[#d4af37] hover:text-[#0a0a0c] rounded"
          >
            بازگشت
          </button>
        </div>
      </div>
    </section>
  );
}