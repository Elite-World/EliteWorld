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
import { useCallback, useTransition, useEffect } from 'react';

export function useLanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { language, setLanguage } = useLanguageStore();
  const [isPending, startTransition] = useTransition();

  const segments = pathname.split('/');
  const urlLang = segments[1] === 'en' || segments[1] === 'zh' ? segments[1] : null;
  const activeLanguage = (urlLang as Language) || language;

  // Sync store with URL so other components using the store are updated
  useEffect(() => {
    if (urlLang && urlLang !== language) {
      setLanguage(urlLang as Language);
    }
  }, [urlLang, language, setLanguage]);

  const handleToggle = useCallback(() => {
    const newLang = activeLanguage === 'en' ? 'zh' : 'en';
    
    startTransition(() => {
      // 1. Update global state and cookie explicitly
      setLanguage(newLang);
      
      // 2. Perform Next.js soft navigation
      const searchParams = window.location.search;
      const currentSegments = pathname.split('/');
      if (currentSegments[1] === 'en' || currentSegments[1] === 'zh') {
        currentSegments[1] = newLang;
        const newPath = currentSegments.join('/') + searchParams;
        router.push(newPath);
      } else {
        router.push(`/${newLang}${pathname}${searchParams}`);
      }
    });
  }, [activeLanguage, setLanguage, pathname, router]);

  return { language: activeLanguage, handleToggle, setLanguage, isPending };
}
