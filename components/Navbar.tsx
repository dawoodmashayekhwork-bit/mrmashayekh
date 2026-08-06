"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2 }}
      className="fixed top-0 left-0 w-full z-40 px-6 md:px-16 py-6 flex justify-between items-center bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm"
    >
      <span className="text-xs tracking-[0.3em] uppercase font-light text-foreground cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        Dawood Mashayekh
      </span>
      <nav className="flex gap-8 text-xs tracking-[0.2em] uppercase text-foreground/70">
        <button onClick={() => scrollToSection("portfolio")} className="hover:text-accent transition-colors">
          پروژه‌ها
        </button>
        <button onClick={() => scrollToSection("about")} className="hover:text-accent transition-colors">
          درباره من
        </button>
        <button onClick={() => scrollToSection("contact")} className="hover:text-accent transition-colors">
          تماس
        </button>
      </nav>
    </motion.header>
  );
}