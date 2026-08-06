'use client';

import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <LoadingScreen onLoadingComplete={() => setLoading(false)} />
      )}
      {children}
    </>
  );
}