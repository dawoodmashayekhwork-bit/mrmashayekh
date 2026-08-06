'use client';

import React, { useEffect, useState } from 'react';

export default function LoadingScreen({ onLoadingComplete }: { onLoadingComplete?: () => void }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // تنظیم تایمر روی ۱.۵ ثانیه (1500ms) برای هماهنگی با انیمیشن‌های سایت
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onLoadingComplete) onLoadingComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1a1d24] overflow-hidden select-none">
      {/* پس‌زمینه کاغذ کالک (با یک گرادینت خیلی ملایم) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1d24] to-[#121419] opacity-80" />

      {/* کانتینر اصلی اسکیس */}
      <div className="relative z-10 flex flex-col items-center justify-center p-10 border border-dashed border-amber-500/20 rounded-full">
        
        {/* اِلمان گرافیکی اسکیس (SVG) */}
        <svg 
          width="120" 
          height="120" 
          viewBox="0 0 120 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-amber-300/80 drop-shadow-[0_0_10px_rgba(252,211,77,0.3)]"
        >
          {/* تعریف انیمیشن رسم خطوط (در CSS داخلی) */}
          <style>{`
            @keyframes drawLine {
              to { stroke-dashoffset: 0; }
            }
            .sketch-line {
              stroke-dasharray: 300;
              stroke-dashoffset: 300;
              animation: drawLine 1.2s ease-out forwards;
              animation-delay: 0.1s;
            }
          `}</style>

          {/* ترسیم هندسی پلان */}
          {/* خطوط محیطی */}
          <path d="M10 10H110V110H10V10Z" strokeWidth="1.5" className="sketch-line" />
          {/* دیوارهای داخلی */}
          <path d="M10 50H70" strokeWidth="1" className="sketch-line" style={{animationDelay: '0.3s'}} />
          <path d="M70 10V50M70 70V110" strokeWidth="1" className="sketch-line" style={{animationDelay: '0.5s'}} />
          <path d="M70 50H110" strokeWidth="1" className="sketch-line" style={{animationDelay: '0.7s'}} />
          {/* خطوط راهنما/مبلمان */}
          <circle cx="35" cy="80" r="15" strokeWidth="0.8" strokeDasharray="4 4" className="sketch-line" style={{animationDelay: '0.9s'}} />
          <path d="M90 70V90" strokeWidth="0.8" className="sketch-line" style={{animationDelay: '1.1s'}} />
        </svg>

        {/* نام برند/شخص با استایل مونوآسپرین */}
        <div className="mt-8 text-center tracking-widest">
          <span className="block text-[10px] font-mono text-amber-500 uppercase mb-1">
           WEB PAGE
          </span>
          <h1 className="text-base font-light font-mono text-amber-200">
            DAWOOD MASHAYEKH
          </h1>
          {/* یک خط لودینگ مینی‌مال زیر متن */}
          <div className="w-16 h-[1px] bg-amber-900 mx-auto mt-3 overflow-hidden">
             <div className="h-full bg-amber-400 animate-[loadingBar_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>

      {/* استایل انیمیشن نوار لودینگ (اگر قبلاً در globals.css اضافه نکردید) */}
      <style jsx global>{`
        @keyframes loadingBar {
          0% { width: 0%; margin-right: auto; }
          50% { width: 70%; }
          100% { width: 0%; margin-left: auto; }
        }
      `}</style>
    </div>
  );
}