'use client';

import { useThemeStore } from '@/lib/stores/useThemeStore';
import { cn } from '@/lib/utils';
import { useEffect, useCallback, useState } from 'react';
import type { ClassValue } from 'clsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'popup' | 'bottom';
}

const popupClasses: ClassValue[] = [
  'inset-0 flex items-center justify-center p-4',
  'w-full max-w-lg mx-auto'
];

const bottomClasses: ClassValue[] = [
  'inset-x-0 bottom-0',
  'h-[75vh]'
];

export function Modal({ 
  isOpen, 
  onClose, 
  children, 
  className,
  variant = 'popup'
}: ModalProps): React.ReactElement | null {
  const isDark = useThemeStore((state) => state.isDark);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Handle mount/enter animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Double requestAnimationFrame to ensure DOM paint before transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
      document.body.style.overflow = 'hidden';
    } else {
       // logic handled in handleClose usually, but if props change externally:
       setIsVisible(false);
       const timer = setTimeout(() => {
          setShouldRender(false);
          document.body.style.overflow = 'unset';
       }, 300); // 300ms match duration
       return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Clean up overflow on unmount
  useEffect(() => {
      return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!shouldRender) return null;

  return (
    <div className={cn(
        "fixed inset-0 z-50 transition-all duration-300 ease-out",
        isVisible ? "visible" : "invisible" 
      )}
    >
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div 
        className={cn(
          'fixed transition-all duration-300',
          variant === 'popup' && popupClasses,
          variant === 'bottom' && bottomClasses,
          // Animation States
          isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : variant === 'bottom' 
                ? 'opacity-0 translate-y-full' // Slide down for bottom
                : 'opacity-0 scale-95'         // Fade/scale for popup
        )}
      >
        <div 
          className={cn(
            'w-full shadow-lg',
            isDark ? 'bg-[#1C1C1E]' : 'bg-white',
            variant === 'popup' && 'rounded-2xl',
            variant === 'bottom' && 'h-full rounded-t-2xl',
            className
          )}
        >
          {/* Bottom sheet handle */}
          {variant === 'bottom' && (
            <div className="flex-none py-3" onClick={handleClose}>
              <div className="mx-auto w-12 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
} 