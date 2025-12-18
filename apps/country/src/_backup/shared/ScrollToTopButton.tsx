'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUp } from 'lucide-react';
import { useThemeStore } from '@/lib/stores/useThemeStore';

export function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);
  const isDark = useThemeStore((state) => state.isDark);

  const checkScroll = useCallback(() => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, [checkScroll]);

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-8 right-8 p-4 rounded-full shadow-lg transition-all duration-300',
        'transform hover:scale-105 active:scale-95',
        'flex items-center justify-center',
        showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20',
        isDark 
          ? 'bg-[#2C2C2E] text-gray-200 hover:bg-[#3C3C3E]'
          : 'bg-white text-gray-800 hover:bg-gray-100'
      )}
      style={{
        boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)'
      }}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
} 