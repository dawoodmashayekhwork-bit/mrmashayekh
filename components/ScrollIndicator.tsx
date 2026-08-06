"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-70">
      <span className="text-[10px] tracking-[0.25em] uppercase text-foreground/60">اسکرول</span>
      <div className="w-[1px] h-12 bg-foreground/20 relative overflow-hidden">
        <motion.div
          animate={{ y: ["-100%", "100%"] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-accent"
        />
      </div>
    </div>
  );
}