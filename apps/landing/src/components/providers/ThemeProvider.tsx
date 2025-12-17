// Handle the theme (IOS, etc)

'use client';

import { useEffect, useState, useRef } from 'react';
import { useThemeStore } from '@/lib/stores/useThemeStore';
import { ThemeType } from '@/lib/themes/types';

export function ThemeProvider({
  children,
  initialTheme
}: {
  children: React.ReactNode;
  initialTheme?: ThemeType;
}) {
  const mode = useThemeStore((state) => state.mode);
  const [systemIsDark, setSystemIsDark] = useState(false); // Default to false (light) on server/hydration match
  
  // Hydrate theme from server
  const initialized = useRef(false);
  if (!initialized.current && initialTheme) {
    useThemeStore.setState({ currentTheme: initialTheme });
    initialized.current = true;
  }

  // Initialize system preference listener
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemIsDark(mediaQuery.matches); // Set initial system state

    const handleSystemChange = (e: MediaQueryListEvent) => {
      setSystemIsDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  // Calculate effective theme
  const isDark = mode === 'system' ? systemIsDark : mode === 'dark';

  // Update store resolved state
  const setIsDark = useThemeStore((state) => state.setIsDark);
  useEffect(() => {
    setIsDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark, setIsDark]);

  return children;
} 