'use client';

import React, { useState } from 'react';

export default function LanguageToggle({ onToggle }: { onToggle: (lang: 'fa' | 'en') => void }) {
  const [lang, setLang] = useState<'fa' | 'en'>('fa');

  const handleClick = () => {
    const next = lang === 'fa' ? 'en' : 'fa';
    setLang(next);
    onToggle(next);
  };

  return (
    <button
      onClick={handleClick}
      className="px-2.5 py-1 text-xs font-mono text-slate-300 border border-slate-700 hover:border-sky-400 hover:text-sky-400 transition rounded-sm cursor-pointer"
    >
      {lang === 'fa' ? 'EN' : 'فا'}
    </button>
  );
}