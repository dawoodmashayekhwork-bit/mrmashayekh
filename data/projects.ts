export interface LocalizedText {
  fa: string;
  en: string;
}

export interface SubProject {
  id: string;
  title: LocalizedText;
  videoUrl: string;
  posterUrl: string;
  description: LocalizedText;
}

export interface Project {
  id: string;
  title: LocalizedText;
  category: LocalizedText;
  year: string;
  videoUrl?: string;
  posterUrl?: string;
  description: LocalizedText;
  isGroup?: boolean;
  subProjects?: SubProject[];
}

export const PROJECTS: Project[] = [
  {
    id: "Ramsar-facade",
    title: {
      fa: "مرکز درمانی رامسر",
      en: "Ramsar Medical Center"
    },
    category: {
      fa: "معماری و طراحی درمانی",
      en: "Healthcare Architecture & Design"
    },
    year: "۱۴۰۵",
    videoUrl: "/videos/project-1.mp4",
    posterUrl: "/images/1.png",
    description: {
      fa: "در این موشن گرافی به معرفی طرح اولیه از بیمارستانی واقع در رامسر می‌پردازیم",
      en: "In this motion graphic, we introduce the preliminary design of a hospital located in Ramsar."
    },
  },
    {
    id: "Shariati-space",
    title: {
      fa: "بیمارستان شریعتی نوین",
      en: "Novin Shariati Hospital"
    },
    category: {
      fa: "بیمارستان شریعتی نوین",
      en: "Novin Shariati Hospital"
    },
    year: "1403",
    videoUrl: "/videos/L1.mp4",
    posterUrl: "/images/2.png",
    description: {
      fa: "ویدئو معرفی بیمارستان شریعتی نوین",
      en: "Video introducing Shariati Novin Hospital"
    },
  },
    {
    id: "motion-arch-group",
    title: {
      fa: "مجموعه ویدئوهای اول",
      en: "First Video Collection"
    },
    category: {
      fa: "موشن معماری و انیمیشن سه‌بعدی",
      en: "Architectural Motion & 3D Animation"
    },
    year: "1403",
    description: {
      fa: "ویدئو های رزومه ، برج شهیاد و همکاری با مهندس سبک پا ",
      en: "Resume videos, Shahyad tower, and dimensioning"
    },
    isGroup: true,
    subProjects: [
      {
        id: "cv-motion",
        title: {
          fa: "رزومه ویدئویی (CV) 1403",
          en: "Video Resume (CV)"
        },
        videoUrl: "/videos/project-2-cv.mp4",
        posterUrl: "/images/cv.png",
        description: {
          fa: "موشن گرافیک معرفی مهارت‌ها",
          en: "Motion graphics introducing skills"
        },
      },
      {
        id: "shahyad-tower",
        title: {
          fa: "برج شهیاد",
          en: "Shahyad Tower"
        },
        videoUrl: "/videos/project-2-shahyad.mp4",
        posterUrl: "/images/shahyad.png",
        description: {
          fa: "انیمیشن سه‌بعدی برج آزادی",
          en: "3D animation of Azadi Tower"
        },
      },
      {
        id: "dimensioning",
        title: {
          fa: "همکاری با مهندس سبک پا",
          en: "Collaboration with sabokpa"
        },
        videoUrl: "/videos/project-2-dim.mp4",
        posterUrl: "/images/j.png",
        description: {
          fa: "نگاه متفاوت نسبت به عناصر ساختمانی",
          en: "A different perspective on building elements"
        },
      }
    ]
  },
    {
    id: "BUALI-space",
    title: {
      fa: "بیمارستان بوعلی ",
      en: "BUALI Hospital"
    },
    category: {
      fa: "بیمارستان بوعلی",
      en: " BUALI Hospital"
    },
    year: "1402",
    videoUrl: "/videos/L2.mp4",
    posterUrl: "/images/3.png",
    description: {
      fa: "ویدئو معرفی بیمارستان بوعلی",
      en: "Video introducing BUALI Hospital"
    },
  },
  
    {
    id: "clinical-Hospital",
    title: {
      fa: "بیمارستان بوعلی ",
      en: "BUALI Hospital"
    },
    category: {
      fa: "بیمارستان بوعلی",
      en: " BUALI Hospital"
    },
    year: "1402",
    videoUrl: "/videos/L3.mp4",
    posterUrl: "/images/4.png",
    description: {
      fa: "ویدئو معرفی بیمارستان بوعلی",
      en: "Video introducing BUALI Hospital"
    },
  },
  {
    id: "motion-arch-group-2",
    title: {
      fa: "مجموعه ویدئوهای دوم",
      en: "Second Video Collection"
    },
    category: {
      fa: "موشن معماری و انیمیشن سه‌بعدی",
      en: "Architectural Motion & 3D Animation"
    },
    year: "1403",
    description: {
      fa: "بیمارستان بوعلی، مقطع و بیمارستان رامسر",
      en: "Bu Ali Hospital, Section, and Ramsar Hospital"
    },
    isGroup: true,
    subProjects: [
      {
        id: "bouali2-hospital",
        title: {
          fa: "بیمارستان بوعلی",
          en: "Bu Ali Hospital"
        },
        videoUrl: "/videos/P1.mp4",
        posterUrl: "/images/5.png",
        description: {
          fa: "بیمارستان بوعلی",
          en: "Bu Ali Hospital"
        },
      },
      {
        id: "section-view",
        title: {
          fa: "مقطع",
          en: "Section View"
        },
        videoUrl: "/videos/P2.mp4",
        posterUrl: "/images/6.png",
        description: {
          fa: "انیمیشن روابط بیمارستان",
          en: "Hospital circulation animation"
        },
      },
      {
        id: "ramsar-hospital",
        title: {
          fa: "بیمارستان رامسر",
          en: "Ramsar Hospital"
        },
        videoUrl: "/videos/P3.mp4",
        posterUrl: "/images/7.png",
        description: {
          fa: "بررسی ویژگی‌های بیمارستان رامسر",
          en: "Reviewing features of Ramsar Hospital"
        },
      }
    ]
  },
  {
    id: "General",
    title: {
      fa: "بیمارستان جنرال",
      en: "General Hospital"
    },
    category: {
      fa: "طرح اولیه بیمارستان جنرال",
      en: "General Hospital Concept Design"
    },
    year: "۱۴۰۲",
    videoUrl: "/videos/project-3.mp4",
    posterUrl: "/images/8.png",
    description: {
      fa: "طرح اولیه بیمارستان جنرال",
      en: "Preliminary concept of a general hospital"
    },
  },
];