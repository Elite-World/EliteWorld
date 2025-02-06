'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/hooks/useTheme';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function BottomSheet({ 
  isOpen, 
  onClose, 
  children, 
  className 
}: BottomSheetProps) {
  const [isShowing, setIsShowing] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    if (isOpen) {
      setIsShowing(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setTimeout(() => setIsShowing(false), 300);
    }
  }, [isOpen]);

  if (!isShowing) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          'fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div 
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50',
          'h-[75vh] flex flex-col',
          'transition-transform duration-300 ease-out',
          isDark ? 'bg-black' : 'bg-white',
          isOpen ? 'translate-y-0' : 'translate-y-full',
          'rounded-t-xl shadow-lg',
          className
        )}
      >
        {/* Handle */}
        <div className="flex-none py-3">
          <div className="mx-auto w-12 h-1.5 rounded-full bg-gray-300" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4">
          {children}
        </div>

        {/* Safe area spacing for iOS */}
        <div className="flex-none h-safe-area-inset-bottom" />
      </div>
    </>
  );
} 