export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  videoUrl: string;
  posterUrl: string;
  description: string;
}

export const PROJECTS: Project[] = [
  {
    id: "hospital-facade",
    title: "مرکز درمانی اورا",
    category: "معماری و طراحی درمانی",
    year: "۱۴۰۵",
    videoUrl: "/videos/project-1.mp4",
    posterUrl: "/images/project-1-poster.jpg",
    description: "طراحی پیشرفته نمای پارامتریک با تمرکز بر بهبود روانی بیماران و بهینه‌سازی نور طبیعی.",
  },
  {
    id: "motion-arch",
    title: "مورفوژنز",
    category: "موشن معماری و انیمیشن سه‌بعدی",
    year: "۱۴۰۴",
    videoUrl: "/videos/project-2.mp4",
    posterUrl: "/images/project-2-poster.jpg",
    description: "یک سفر بصری سینمایی در کاوش سیالیت سازه‌ای و دگرگونی فضایی.",
  },
  {
    id: "clinical-space",
    title: "هاب تشخیصی سرنیتی",
    category: "طراحی داخلی درمانی و فضا",
    year: "۱۴۰۴",
    videoUrl: "/videos/project-3.mp4",
    posterUrl: "/images/project-3-poster.jpg",
    description: "بازتعریف محیط‌های استریل بالینی از طریق اصول طراحی بیوفیلیک و متریال آرامش‌بخش.",
  },
];