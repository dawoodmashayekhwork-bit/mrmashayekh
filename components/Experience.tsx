"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  id: string;
  sequence: { fa: string; en: string };
  title: { fa: string; en: string };
  company: { fa: string; en: string };
  date: { fa: string; en: string };
  description: { fa: string; en: string };
  modalDetails: { fa: string; en: string };
  image: string;
  tags: { fa: string[]; en: string[] };
  externalLink?: {
    text: { fa: string; en: string };
    url: string;
  };
}

interface ProfessionalJourneyProps {
  lang: 'fa' | 'en';
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "miras",
    sequence: { fa: "10 // وزارت میراث فرهنگی", en: "10 // Ministry of Cultural Heritage" },
    title: { fa: "همکار پژوهشی", en: "Research Collaborator" },
    company: { fa: "وزارت میراث فرهنگی، گردشگری و صنایع دستی ایران", en: "Ministry of Cultural Heritage, Tourism and Handicrafts" },
    date: { fa: "آبان 1404 — تاکنون", en: "Nov 2025 — Present" },
    description: { 
      fa: "مشارکت در پروژه ساماندهی مکانی آثار ثبت‌شده ملی، تحلیل‌های فضایی (GIS) و توسعه آرشیو دیجیتال.", 
      en: "Participation in spatial organization projects for nationally registered artifacts, GIS spatial analysis, and digital archive development." 
    },
    modalDetails: { 
      fa: "وزارت میراث فرهنگی، گردشگری و صنایع دستی ایران\n\nآبان 1404 — تاکنون | تمام وقت • ترکیبی (تهران)\n\nمشارکت در پروژه ساماندهی مکانی آثار ثبت‌شده ملی. مسئول تحلیل‌های فضایی مبتنی بر سیستم اطلاعات جغرافیایی (GIS)، ساختاردهی متاداده‌ها و توسعه سیستم‌های آرشیو دیجیتال جهت تقویت استراتژی‌های حفاظت داده‌محور و مدیریت میراث.", 
      en: "Ministry of Cultural Heritage, Tourism and Handicrafts\n\nNov 2025 — Present | Full-time • Hybrid (Tehran)\n\nContributing to spatial organization of registered national heritage, conducting GIS-based spatial analyses, structuring metadata, and developing digital archive systems." 
    },
    image: "../images/miras.png",
    tags: { fa: ["GIS", "میراث دیجیتال", "تحلیل فضایی", "حفاظت داده‌محور"], en: ["GIS", "Digital Heritage", "Spatial Analysis", "Data-Driven Preservation"] }
  },
  {
    id: "faradars",
    sequence: { fa: "09 // فرادرس (FaraDars)", en: "09 // FaraDars" },
    title: { fa: "مدرس دوره‌های تخصصی", en: "Specialized Course Instructor" },
    company: { fa: "فرادرس (FaraDars)", en: "FaraDars" },
    date: { fa: "اسفند 1403 — تاکنون", en: "Feb 2025 — Present" },
    description: { 
      fa: "تالیف و تدریس دوره‌های آموزشی تخصصی نرم‌افزارها و هوش مصنوعی در معماری برای مهندسان و دانشجویان.", 
      en: "Authoring and teaching specialized educational courses on software and artificial intelligence in architecture." 
    },
    modalDetails: { 
      fa: "فرادرس (FaraDars)\n\nاسفند 1403 — تاکنون | پاره‌وقت • دورکاری\n\nتالیف و تدریس دوره‌های آموزشی تخصصی نرم‌افزارها و هوش مصنوعی در معماری برای مهندسان و دانشجویان.", 
      en: "FaraDars\n\nFeb 2025 — Present | Part-time • Remote\n\nDeveloping and instructing comprehensive courses on architectural software and AI applications." 
    },
    image: "../images/faradars.jpg",
    tags: { fa: ["آموزش آنلاین", "هوش مصنوعی در معماری", "افترافکت"], en: ["Online Education", "AI in Architecture", "After Effects"] },
    externalLink: {
      text: { fa: "مشاهده دوره‌ها در فرادرس ↗", en: "View Courses on FaraDars ↗" },
      url: "https://faradars.org/instructors/dawood-mashayekh"
    }
  },
  {
    id: "hoz",
    sequence: { fa: "08 // مهندسین مشاور HOZ", en: "08 // HOZ Consultants" },
    title: { fa: "طراح فضاهای درمانی", en: "Healthcare Space Designer" },
    company: { fa: "مهندسین مشاور HOZ", en: "HOZ Consulting Engineers" },
    date: { fa: "مهر 1403 — آبان 1404", en: "Oct 2024 — Nov 2025" },
    description: { 
      fa: "طراحی معماری مراکز تخصصی درمانی مطابق استانداردهای بیمارستانی و تولید محتوای تخصصی ارائه‌ها.", 
      en: "Architectural design of specialized healthcare centers complying with hospital standards and presentation content creation." 
    },
    modalDetails: { 
      fa: "مهندسین مشاور HOZ (hozco)\n\nمهر 1403 — آبان 1404 | تمام‌وقت\n\nطراحی معماری فضاها و مراکز تخصصی درمانی مطابق با استانداردهای روز طراحی بیمارستان، ضوابط فیزیکی و سیرکولاسیون درمانی؛ همچنین تولید محتوای تخصصی، ویدئوهای معرفی پروژه و ارائه‌های بصری جهت مستندسازی فرایند طراحی.", 
      en: "HOZ Consulting Engineers\n\nOct 2024 — Nov 2025 | Full-time\n\nDesigning architecture for specialized medical facilities according to hospital design standards, physical regulations, and therapeutic circulation." 
    },
    image: "../images/hoz.jpg",
    tags: { fa: ["AutoCAD", "مدیریت پروژه", "طراحی بیمارستانی", "ارائه پروژه", "تولید محتوای تخصصی", "Motion Design"], en: ["AutoCAD", "Project Management", "Hospital Design", "Presentation", "Specialized Content", "Motion Design"] }
  },
  {
    id: "youtube",
    sequence: { fa: "07 // کانال شخصی یوتیوب", en: "07 // YouTube Channel" },
    title: { fa: "تولیدکننده محتوا و مدرس معماری", en: "Content Creator & Architecture Educator" },
    company: { fa: "کانال شخصی یوتیوب", en: "Personal YouTube Channel" },
    date: { fa: "اردیبهشت 1401 — تاکنون", en: "May 2022 — Present" },
    description: { 
      fa: "تولید ویدیوهای آموزشی کاربردی پیرامون افزونه‌های تخصصی معماری و تحلیل تاریخ معماری جهان.", 
      en: "Producing practical educational videos on specialized architectural plugins and world architectural history analysis." 
    },
    modalDetails: { 
      fa: "کانال شخصی یوتیوب\n\nاردیبهشت 1401 — تاکنون | خوداشتغالی • دورکاری\n\nتولید ویدیوهای آموزشی کاربردی پیرامون افزونه‌های تخصصی معماری و تحلیل تاریخ معماری جهان.", 
      en: "Personal YouTube Channel\n\nMay 2022 — Present | Self-employed • Remote\n\nCreating tutorials on architectural plugins and visual essays on architectural history." 
    },
    image: "../images/youtube.png",
    tags: { fa: ["تدریس", "Adobe After Effects", "تولید محتوا"], en: ["Teaching", "Adobe After Effects", "Content Creation"] }
  },
  {
    id: "iust-ta",
    sequence: { fa: "06 // دانشگاه علم و صنعت ایران", en: "06 // IUST" },
    title: { fa: "کمک استاد کارگاه طراحی بیمارستان ۳", en: "Teaching Assistant - Hospital Design Studio III" },
    company: { fa: "دانشگاه علم و صنعت ایران", en: "Iran University of Science and Technology" },
    date: { fa: "مهر 1403 — تاکنون", en: "Oct 2024 — Present" },
    description: { 
      fa: "همکاری با استاد در مدیریت کلاس، بازخورد به دانشجویان و هدایت پروژه‌های پیچیده بیمارستانی.", 
      en: "Collaborating with professors in class management, student feedback, and guiding complex hospital design projects." 
    },
    modalDetails: { 
      fa: "دانشگاه علم و صنعت ایران\n\nمهر 1403 — تاکنون | دستیار استاد (TA)\n\nهمکاری با استاد در مدیریت کلاس و بازخورد به دانشجویان و هدایت پروژه‌های تخصصی طراحی فضاهای پیچیده بیمارستانی.", 
      en: "Iran University of Science and Technology\n\nOct 2024 — Present | Teaching Assistant (TA)\n\nAssisting in studio management, giving student critiques, and leading complex healthcare design projects." 
    },
    image: "../images/iust.png",
    tags: { fa: ["دستیار استاد", "طراحی بیمارستان", "مدیریت آتلیه"], en: ["Teaching Assistant", "Hospital Design", "Studio Management"] }
  },
  {
    id: "iust-workshop",
    sequence: { fa: "05 // دانشکده معماری علم و صنعت", en: "05 // IUST Faculty of Architecture" },
    title: { fa: "مدرس کارگاه‌های آموزش پرزانته", en: "Presentation Workshop Instructor" },
    company: { fa: "دانشگاه علم و صنعت ایران", en: "Iran University of Science and Technology" },
    date: { fa: "شهریور 1402 — اردیبهشت 1403", en: "Sep 2023 — May 2024" },
    description: { 
      fa: "برگزاری کارگاه‌های تخصصی افترافکت و فتوشاپ جهت ارتقای مهارت‌های ارائه کارکنان.", 
      en: "Holding specialized After Effects and Photoshop workshops to enhance staff presentation skills." 
    },
    modalDetails: { 
      fa: "دانشگاه علم و صنعت ایران\n\nشهریور 1402 — اردیبهشت 1403 | حضوری • دانشکده معماری\n\nبرگزاری دوره‌ها و کارگاه‌های تخصصی آموزش نرم‌افزارهای گرافیکی (افترافکت و فتوشاپ) جهت ارتقای مهارت‌های ارائه و پرزانته برای کارکنان دانشگاه علم وصنعت.", 
      en: "Iran University of Science and Technology\n\nSep 2023 — May 2024 | In-person • Faculty of Architecture\n\nConducting specialized graphic software workshops (After Effects & Photoshop) for university staff." 
    },
    image: "../images/iust.png",
    tags: { fa: ["پرزانته معماری", "After Effects", "Photoshop"], en: ["Architectural Presentation", "After Effects", "Photoshop"] }
  },
  {
    id: "iust-plus",
    sequence: { fa: "04 // iust_plus", en: "04 // iust_plus" },
    title: { fa: "مدرس موشن گرافیک", en: "Motion Graphics Instructor" },
    company: { fa: "iust_plus", en: "iust_plus" },
    date: { fa: "خرداد 1403 — مهر 1403", en: "Jun 2024 — Oct 2024" },
    description: { 
      fa: "طراحی سرفصل و تدریس دوره جامع موشن گرافیک جهت آموزش مهارت‌های گرافیک متحرک.", 
      en: "Curriculum design and teaching comprehensive motion graphics courses for enthusiasts and students." 
    },
    modalDetails: { 
      fa: "iust_plus\n\nخرداد 1403 — مهر 1403 | پاره‌وقت • دورکاری\n\nطراحی سرفصل و تدریس «دوره جامع موشن گرافیک» جهت آموزش مهارت‌های گرافیک متحرک به علاقمندان و دانشجویان.", 
      en: "iust_plus\n\nJun 2024 — Oct 2024 | Part-time • Remote\n\nDesigning syllabus and instructing comprehensive motion graphics courses." 
    },
    image: "../images/iust_plus.png",
    tags: { fa: ["موشن گرافیک", "آموزش گام‌به‌گام"], en: ["Motion Graphics", "Step-by-Step Training"] }
  },
  {
    id: "masters",
    sequence: { fa: "03 // دانشگاه علم و صنعت ایران", en: "03 // IUST Master's Degree" },
    title: { fa: "دانشجوی ارشد طراحی درمانی", en: "Master's Student in Healthcare Design" },
    company: { fa: "دانشگاه علم و صنعت ایران", en: "Iran University of Science and Technology" },
    date: { fa: "شهریور 1401 — مهر 1403", en: "Sep 2022 — Oct 2024" },
    description: { 
      fa: "تحصیل ارشد معماری با تمرکز بر پژوهش‌های علمی و استانداردهای طراحی محیط‌های درمانی.", 
      en: "Master's studies in architecture focusing on scientific research and healthcare environment design standards." 
    },
    modalDetails: { 
      fa: "دانشگاه علم و صنعت ایران\n\nشهریور 1401 — مهر 1403 | حضوری • تهران\n\nتحصیل در مقطع کارشناسی ارشد معماری با تمرکز بر پژوهش‌های علمی، تحلیل فضایی و استانداردهای طراحی محیط‌های درمانی و سلامت.", 
      en: "Iran University of Science and Technology\n\nSep 2022 — Oct 2024 | In-person • Tehran\n\nMaster of Architecture focusing on scientific research, spatial analysis, and healthcare facility standards." 
    },
    image: "../images/iust.png",
    tags: { fa: ["طراحی درمانی", "معماری و سلامت", "پژوهش علمی"], en: ["Healthcare Design", "Architecture & Health", "Scientific Research"] }
  },
  {
    id: "construction",
    sequence: { fa: "02 // پروژه ساختمانی نوروزی", en: "02 // Nowruzi Construction Project" },
    title: { fa: "کارآموز مدیریت پروژه کارگاه ساختمانی", en: "Construction Project Management Intern" },
    company: { fa: "پروژه ساختمانی نوروزی", en: "Nowruzi Construction Project" },
    date: { fa: "خرداد 1400 — خرداد 1401", en: "Jun 2021 — Jun 2022" },
    description: { 
      fa: "تجربه اجرایی در پروژه‌های واقعی، نظارت بر بتن‌ریزی سقف‌ها، تیرریزی و اجرای اسکلت سازه.", 
      en: "Practical site experience in real construction projects, supervising roof concreting, beam framing, and structural skeleton execution." 
    },
    modalDetails: { 
      fa: "پروژه ساختمانی نوروزی\n\nخرداد 1400 — خرداد 1401 | تمام‌وقت • حضوری (تهران)\n\nکسب تجربه اجرایی در پروژه‌های ساختمانی واقعی، نظارت بر عملیات اجرایی شامل بتن‌ریزی‌سقف‌ها، تیرریزی و اجرای اسکلت سازه.", 
      en: "Nowruzi Construction Project\n\nJun 2021 — Jun 2022 | Full-time • In-person (Tehran)\n\nGaining field execution experience, supervising concreting operations, framing, and structural skeletal work." 
    },
    image: "../images/1.png",
    tags: { fa: ["مدیریت پروژه", "بتن‌ریزی", "اجرای سازه", "ساختمان بتنی"], en: ["Project Management", "Concreting", "Structural Execution", "Concrete Building"] }
  },
  {
    id: "zarir",
    sequence: { fa: "01 // رادیو زریر (Radio Zarir)", en: "01 // Radio Zarir" },
    title: { fa: "عضو هیئت تحریریه", en: "Editorial Board Member" },
    company: { fa: "رادیو زریر", en: "Radio Zarir" },
    date: { fa: "خرداد 1399 — خرداد 1400", en: "Jun 2020 — Jun 2021" },
    description: { 
      fa: "نگارش و تولید محتوای صوتی با محوریت مسابقات معماری و تحلیل آثار برجسته (اپیزود منارۀ هشتم).", 
      en: "Writing and producing audio content focused on architectural competitions and analyzing prominent works." 
    },
    modalDetails: { 
      fa: "رادیو زریر (Radio Zarir)\n\nخرداد 1399 — خرداد 1400 | پاره‌وقت\n\nمشارکت در نگارش و تولید محتوای صوتی با محوریت مسابقات معماری و تحلیل آثار برجسته (از جمله اپیزود منارۀ هشتم).", 
      en: "Radio Zarir\n\nJun 2020 — Jun 2021 | Part-time\n\nContributing to scriptwriting and audio production focusing on architectural competitions and critiques." 
    },
    image: "../images/zarir.jpg",
    tags: { fa: ["تولید محتوا", "پادکست معماری"], en: ["Content Creation", "Architecture Podcast"] }
  }
];

export default function ProfessionalJourney({ lang }: ProfessionalJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeModal, setActiveModal] = useState<{ title: string; text: string } | null>(null);
  const isFa = lang === 'fa';

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
  }, [lang]);

  return (
    <section id="experience" className="relative w-full py-32 px-6 md:px-16 bg-[#0a0a0c] text-[#e5e5e5] font-sans overflow-hidden" dir={isFa ? 'rtl' : 'ltr'}>
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
        <div className={`mb-20 ${isFa ? 'text-right' : 'text-left'}`}>
          <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase block mb-3 font-light">
            {isFa ? 'مسیر حرفه‌ای' : 'Professional Journey'}
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white">
            {isFa ? 'تجربیات و فعالیت‌ها' : 'Experience & Activities'}
          </h2>
        </div>

        {/* ساختار خط زمانی (Timeline) عمودی با جابه‌جایی خط سمت راست یا چپ بر اساس زبان */}
        <div 
          ref={containerRef} 
          className={`relative ${
            isFa 
              ? 'border-r border-r-[#d4af37]/20 pr-6 md:pr-10' 
              : 'border-l border-l-[#d4af37]/20 pl-6 md:pl-10'
          } space-y-16`}
        >
          {EXPERIENCES.map((item, index) => (
            <div 
              key={item.id} 
              ref={(el) => { cardsRef.current[index] = el; }}
              className="relative group opacity-0"
            >
              {/* نقطه طلایی روی خط زمان که در حالت انگلیسی به سمت چپ منتقل می‌شود */}
              <div className={`absolute ${
                isFa 
                  ? '-right-[31px] md:-right-[47px]' 
                  : '-left-[31px] md:-left-[47px]'
              } top-6 w-3.5 h-3.5 bg-[#0a0a0c] border-2 border-[#d4af37] rounded-full shadow-[0_0_10px_#d4af37] group-hover:bg-[#d4af37] transition-colors`} />

              {/* کارت تجربه */}
              <article 
                onClick={() => setActiveModal({ title: item.title[lang], text: item.modalDetails[lang] })}
                className="relative bg-[rgba(18,18,22,0.75)] backdrop-blur-[20px] border border-[rgba(212,175,55,0.15)] p-6 md:p-8 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] cursor-pointer transition-all duration-500 hover:border-[rgba(212,175,55,0.5)] hover:-translate-y-1"
              >
                {/* لوگو یا آست‌باکس بالا که در انگلیسی به سمت راست منتقل می‌شود */}
                <div className={`absolute top-6 ${isFa ? 'left-6' : 'right-6'} w-14 h-14 bg-[#0d0d10] border-[1.5px] border-[#d4af37] flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.7)] rounded-lg overflow-hidden`}>
                  <img src={item.image} alt={item.company[lang]} className="w-full h-full object-cover" />
                </div>

                <div className={`mb-3 ${isFa ? 'pl-16 md:pl-20' : 'pr-16 md:pr-20'}`}>
                  <span className="font-mono text-xs text-[#d4af37] tracking-[2px] uppercase flex items-center gap-2">
                    {item.sequence[lang]}
                  </span>
                </div>

                <h3 className="m-0 mb-1.5 text-xl md:text-2xl font-normal text-white">{item.title[lang]}</h3>
                <span className="block text-xs text-white/45 mb-4">{item.date[lang]}</span>
                <p className="m-0 text-sm leading-[1.8] text-white/70">{item.description[lang]}</p>

                {item.externalLink && (
                  <a 
                    href={item.externalLink.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={(e) => e.stopPropagation()} 
                    className="inline-block mt-4 px-4 py-2 text-xs text-[#d4af37] border border-[#d4af37]/40 bg-[#d4af37]/5 rounded transition-all duration-300 hover:bg-[#d4af37] hover:text-[#0a0a0c]"
                  >
                    {item.externalLink.text[lang]}
                  </a>
                )}

                <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-[rgba(212,175,55,0.15)]">
                  {item.tags[lang].map((tag, idx) => (
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
      <div className={`fixed inset-0 bg-[rgba(5,5,7,0.9)] backdrop-blur-[20px] flex items-center justify-center z-[100] transition-opacity duration-400 ${activeModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} dir={isFa ? 'rtl' : 'ltr'}>
        <div className={`bg-[#121216] border border-[rgba(212,175,55,0.3)] p-8 md:p-10 w-[min(90%,540px)] shadow-[0_25px_50px_rgba(0,0,0,0.9)] rounded-xl ${isFa ? 'text-right' : 'text-left'}`}>
          <h3 className="mt-0 text-xl text-white font-normal">{activeModal?.title}</h3>
          <p className="text-white/70 text-sm leading-[1.8] mt-4 whitespace-pre-line">{activeModal?.text}</p>
          <button 
            onClick={() => setActiveModal(null)}
            className="mt-6 bg-transparent border border-[#d4af37] text-[#d4af37] px-6 py-2.5 cursor-pointer text-xs transition-all duration-300 hover:bg-[#d4af37] hover:text-[#0a0a0c] rounded"
          >
            {isFa ? 'بازگشت' : 'Close'}
          </button>
        </div>
      </div>
    </section>
  );
}