'use client';

import { useState } from 'react';


export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      
      {children}
    </>
  );
}