"use client";

import { motion } from "framer-motion";
import ScrollIndicator from "./ScrollIndicator";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-75"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/60" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="text-accent text-xs md:text-sm tracking-[0.4em] uppercase mb-4 font-medium"
        >
          وبسایت معرفی آثار موشن گرافی 
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="text-4xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 text-foreground"
        >
          داود مشایخ
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.4 }}
          className="text-sm md:text-lg text-foreground/70 tracking-[0.2em] uppercase font-light"
        >
          معماری <span className="text-accent mx-2">/</span> گرافیک <span className="text-accent mx-2">/</span> موشن گرافی 
        </motion.p>
      </div>

      <ScrollIndicator />
    </section>
  );
}