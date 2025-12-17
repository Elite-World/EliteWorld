import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { themes } from '@/lib/themes';
import { THEME_COOKIE_NAME } from '@/lib/services/theme-cookie-constants';

type ThemeName = keyof typeof themes;
export type ColorMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ColorMode;
  currentTheme: ThemeName;
  isDark: boolean; // Resolved state
  setMode: (mode: ColorMode) => void;
  setTheme: (theme: ThemeName) => void;
  setIsDark: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'system',
      currentTheme: 'ios', // Default, will be overridden by hydration
      isDark: false, // Default resolved state
      setMode: (mode) => set({ mode }),
      setTheme: (theme) => {
        // Set cookie
        document.cookie = `${THEME_COOKIE_NAME}=${theme}; path=/; max-age=31536000`; // 1 year
        set({ currentTheme: theme });
      },
      setIsDark: (isDark) => set({ isDark }),
    }),
    {
      name: 'theme-storage',
      // Only persist mode. Theme is managed by cookies.
      partialize: (state) => ({ mode: state.mode }),
      version: 2, // Increment version for migration
      migrate: (persistedState, version) => {
        // Simple migration: if old version (no mode), default to system
        if (version < 2) {
           return {
             ...persistedState as any,
             mode: 'system'
           };
        }
        return persistedState as ThemeState;
      }
    }
  )
); 