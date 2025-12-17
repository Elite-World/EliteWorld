'use client';

import { useThemeStore } from '@/lib/stores/useThemeStore';
import { themes } from '@/lib/themes';

export function ThemeSwitcher() {
  const currentTheme = useThemeStore((state) => state.currentTheme);
  const setTheme = useThemeStore((state) => state.setTheme);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <select
        value={currentTheme}
        onChange={(e) => setTheme(e.target.value as keyof typeof themes)}
        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2"
      >
        {Object.keys(themes).map((theme) => (
          <option key={theme} value={theme}>
            {themes[theme as keyof typeof themes].name}
          </option>
        ))}
      </select>
    </div>
  );
} 