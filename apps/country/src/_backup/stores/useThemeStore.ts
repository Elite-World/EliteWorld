import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ColorMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ColorMode;
  isDark: boolean; // Resolved state
  setMode: (mode: ColorMode) => void;
  setIsDark: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'system',
      isDark: false,
      setMode: (mode) => set({ mode }),
      setIsDark: (isDark) => set({ isDark }),
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({ mode: state.mode }),
      version: 2,
      migrate: (persistedState, version) => {
        if (version < 2) {
           return {
             // eslint-disable-next-line @typescript-eslint/no-explicit-any
             ...persistedState as any,
             mode: 'system'
           };
        }
        return persistedState as ThemeState;
      }
    }
  )
);