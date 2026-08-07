export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  videoUrl?: string;
  posterUrl?: string;
  description: string;
  // برای حالت ۳ تایی کنار هم:
  isGroup?: boolean;
  subProjects?: {
    id: string;
    title: string;
    videoUrl: string;
    posterUrl: string;
    description: string;
  }[];
}

export const PROJECTS: Project[] = [
  {
    id: "hospital-facade",
    title: "مرکز درمانی رامسر",
    category: "معماری و طراحی درمانی",
    year: "۱۴۰۵",
    videoUrl: "/videos/project-1.mp4",
    posterUrl: "/images/project-1-poster.jpg",
    description: "در این موشن گرافی به معرفی طرح اولیه از بیمارستانی واقع در رامسر می‌پردازیم",
  },
  {
    id: "motion-arch-group",
    title: "مجموعه ویدئوهای",
    category: "موشن معماری و انیمیشن سه‌بعدی",
    year: "1403",
    description: "ویدئو های رزومه ، برج شهیاد و اندازه گذاری",
    isGroup: true, // مشخص می‌کند که این کارت یک کانتینر گروهی است
    subProjects: [
       {
        id: "cv-motion",
        title: "1403 رزومه ویدئویی (CV)",
        videoUrl: "/videos/project-2-cv.mp4",
        posterUrl: "/images/project-2-cv-poster.jpg",
        description: "موشن گرافیک معرفی مهارت‌ها",
      },
      {
        id: "shahyad-tower",
        title: "برج شهیاد",
        videoUrl: "/videos/project-2-shahyad.mp4",
        posterUrl: "/images/project-2-shahyad-poster.jpg",
        description: "انیمیشن سه‌بعدی برج آزادی",
      },
      {
        id: "dimensioning",
        title: "اندازه‌گذاری و دیتیل",
        videoUrl: "/videos/project-2-dim.mp4",
        posterUrl: "/images/project-2-dim-poster.jpg",
        description: "فرآیند اندازه‌گذاری سه‌بعدی",
      }
    ]
  },
   {
    id: "motion-arch-group",
    title: "مجموعه ویدئوهای",
    category: "موشن معماری و انیمیشن سه‌بعدی",
    year: "1403",
    description: "بیمارستان بوعلی، مقطع و بیمارستان رامسر",
    isGroup: true, // مشخص می‌کند که این کارت یک کانتینر گروهی است
    subProjects: [
       {
        id: "cv-motion",
        title: "بیمارستان بوعلی",
        videoUrl: "/videos/P1.mp4",
        posterUrl: "/images/P1.jpg",
        description: "بیمارستان بوعلی ",
      },
      {
        id: "shahyad-tower",
        title: "مقطع",
        videoUrl: "/videos/P2.mp4",
        posterUrl: "/images/project-2-shahyad-poster.jpg",
        description: "انیمیشن روابط بمارستان",
      },
      {
        id: "dimensioning",
        title: "بیمارستان رامسر",
        videoUrl: "/videos/P3.mp4",
        posterUrl: "/images/project-2-dim-poster.jpg",
        description: "بررسی ویژگی های بیمارستان رامسر",
      }
    ]
  },
  {
    id: "clinical-space",
    title: "بیمارستان جنرال",
    category: "طرح اولیه بیمارستان جنرال ",
    year: "۱۴۰2",
    videoUrl: "/videos/project-3.mp4",
    posterUrl: "/images/project-3-poster.jpg",
    description:"طرح اولیه بیمارستان جنرال ",
  },
];