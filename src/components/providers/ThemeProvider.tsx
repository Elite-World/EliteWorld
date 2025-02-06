'use client';

import { useEffect, useCallback } from 'react';
import { useThemeStore } from '@/lib/stores/useThemeStore';

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDark = useThemeStore((state) => state.isDark);
  const setDark = useThemeStore((state) => state.setDark);

  const handleThemeChange = useCallback((e: MediaQueryListEvent) => {
    setDark(e.matches);
  }, [setDark]);

  // Initialize theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const initialTheme = mediaQuery.matches;
    
    if (initialTheme !== isDark) {
      setDark(initialTheme);
    }

    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []); // Run only once on mount

  // Update document class
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return children;
} 