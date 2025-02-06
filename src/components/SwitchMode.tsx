'use client';

import { useThemeStore } from '@/lib/stores/useThemeStore';

export function ModeToggle() {
  const isDark = useThemeStore((state) => state.isDark);
  const toggle = useThemeStore((state) => state.toggle);

  return (
    <button
      onClick={toggle}
      className="fixed bottom-4 right-36 z-50 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? '🌞' : '🌙'}
    </button>
  );
} 