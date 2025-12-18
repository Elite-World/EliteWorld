'use client';

import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (scrolled / scrollable) * 100 : 0;

      setProgress(progress);
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed left-0 top-0 w-full h-0.5 bg-gray-200/20 z-50">
      <div
        className="h-full bg-blue-500 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
