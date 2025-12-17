'use client';

import { useThemeStore } from '@/lib/stores/useThemeStore';
import { useEffect, useState } from 'react';

export function ModeToggle() {
  const mode = useThemeStore((state) => state.mode);
  const setMode = useThemeStore((state) => state.setMode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cycleMode = () => {
    if (mode === 'system') setMode('light');
    else if (mode === 'light') setMode('dark');
    else setMode('system');
  };

  const getIcon = () => {
    switch (mode) {
      case 'light': return '🌞'; // Sun
      case 'dark': return '🌙'; // Moon
      case 'system': return '🖥️'; // Computer
      default: return '🖥️';
    }
  };

  const getLabel = () => {
    switch (mode) {
      case 'light': return 'Switch to dark mode';
      case 'dark': return 'Switch to system mode';
      case 'system': return 'Switch to light mode';
      default: return 'Switch mode';
    }
  };

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <button
      onClick={cycleMode}
      className="fixed bottom-4 right-36 z-50 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={getLabel()}
      title={`Current mode: ${mode}`}
    >
      {getIcon()}
    </button>
  );
} 