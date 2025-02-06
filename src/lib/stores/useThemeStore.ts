import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { themes } from '@/lib/themes';

type ThemeName = keyof typeof themes;

interface ThemeState {
  isDark: boolean;
  currentTheme: ThemeName;
  toggle: () => void;
  setDark: (dark: boolean) => void;
  setTheme: (theme: ThemeName) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      currentTheme: 'ios',
      toggle: () => set((state) => ({ isDark: !state.isDark })),
      setDark: (dark) => set({ isDark: dark }),
      setTheme: (theme) => set({ currentTheme: theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
); 