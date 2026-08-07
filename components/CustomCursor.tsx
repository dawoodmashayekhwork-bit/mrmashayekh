'use client';

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // بررسی اینکه کاربر روی موبایل نباشد (کورسور در موبایل معنایی ندارد)
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setIsVisible(true);

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // بررسی اینکه آیا کاربر روی المان قابل کلیک قرار گرفته است یا خیر
      const target = e.target as HTMLElement;
      const isClickable = 
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') !== null ||
        target.closest('a') !== null;

      setIsPointer(Boolean(isClickable));
    };

    window.addEventListener('mousemove', updateCursor);
    return () => {
      window.removeEventListener('mousemove', updateCursor);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2 rounded-full ${
        isPointer 
          ? 'w-10 h-10 bg-amber-400/20 border border-amber-400 scale-125' 
          : 'w-4 h-4 bg-amber-400/80'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}