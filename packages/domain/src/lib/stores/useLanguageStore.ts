import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'zh';

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
}

const updateUrlAndCookie = (newLanguage: Language) => {
  if (typeof window === 'undefined') return;
  
  // Set cookie with 1-year expiration
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  document.cookie = `NEXT_LOCALE=${newLanguage};path=/;expires=${expiryDate.toUTCString()}`;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language) => {
        set({ language });
        updateUrlAndCookie(language);
      },
      toggleLanguage: () => set((state) => {
        const newLang = state.language === 'en' ? 'zh' : 'en';
        updateUrlAndCookie(newLang);
        return { language: newLang };
      }),
    }),
    {
      name: 'language-storage',
    }
  )
);

import { useRouter, usePathname } from 'next/navigation';
import { useCallback, useTransition } from 'react';

export function useLanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { language, toggleLanguage, setLanguage } = useLanguageStore();
  const [isPending, startTransition] = useTransition();

  const handleToggle = useCallback(() => {
    const newLang = language === 'en' ? 'zh' : 'en';
    
    startTransition(() => {
      // 1. Update global state and cookie
      toggleLanguage();
      
      // 2. Perform Next.js soft navigation
      const searchParams = window.location.search;
      const segments = pathname.split('/');
      if (segments[1] === 'en' || segments[1] === 'zh') {
        segments[1] = newLang;
        const newPath = segments.join('/') + searchParams;
        router.push(newPath);
      } else {
        router.push(`/${newLang}${pathname}${searchParams}`);
      }
    });
  }, [language, toggleLanguage, pathname, router]);

  return { language, handleToggle, setLanguage, isPending };
}
