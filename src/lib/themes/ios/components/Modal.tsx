'use client';

import { useThemeStore } from '@/lib/stores/useThemeStore';
import { cn } from '@/lib/utils';
import { useEffect, useCallback } from 'react';
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

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div 
        className={cn(
          'fixed',
          variant === 'popup' && popupClasses,
          variant === 'bottom' && bottomClasses
        )}
      >
        <div 
          className={cn(
            'w-full shadow-lg',
            'transform transition-all',
            isDark ? 'bg-[#1C1C1E]' : 'bg-white',
            variant === 'popup' && 'rounded-2xl',
            variant === 'bottom' && 'h-full rounded-t-2xl',
            className
          )}
        >
          {/* Bottom sheet handle */}
          {variant === 'bottom' && (
            <div className="flex-none py-3">
              <div className="mx-auto w-12 h-1.5 rounded-full bg-gray-300" />
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
} 