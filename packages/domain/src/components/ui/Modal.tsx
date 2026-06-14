'use client';
import { useThemeStore } from '../../lib/stores/useThemeStore';
import { cn } from '../../lib/utils';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'popup' | 'bottom' | 'side';
}

export function Modal({
  isOpen,
  onClose,
  children,
  className,
  variant = 'popup',
}: ModalProps) {
  const isDark = useThemeStore((state) => state.isDark);

  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const wrapperClasses = cn(
    variant === 'popup' && 'fixed inset-0 flex items-center justify-center p-4',
    variant === 'side' && 'fixed inset-0 h-[100dvh] flex justify-end',
    variant === 'bottom' && 'fixed inset-0 h-[100dvh] flex items-end',
  );

  const contentClasses = cn(
    'relative w-full shadow-2xl overflow-hidden',
    isDark ? 'bg-[#1C1C1E]' : 'bg-white',
    // Shape & Size
    variant === 'popup' && 'max-w-lg rounded-2xl',
    variant === 'side' &&
      'w-[85vw] max-w-sm h-full rounded-l-2xl border-l border-gray-100 dark:border-white/10',
    variant === 'bottom' && 'h-[80vh] rounded-t-2xl',
    className,
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 animate-in fade-in duration-500 z-9998 cursor-pointer"
        onClick={onClose}
        style={{ touchAction: 'none', WebkitTapHighlightColor: 'transparent' }}
      />
      {/* Container to position the modal */}
      <div
        className={cn(wrapperClasses, 'z-9999')}
        onClick={onClose}
        style={{ touchAction: 'none' }}
      >
        <div
          className={contentClasses}
          // Prevent closing when clicking content
          onClick={(e) => e.stopPropagation()}
          style={{ touchAction: 'auto' }}
        >
          {/* Bottom Sheet Handle */}
          {variant === 'bottom' && (
            <div className="flex-none py-3" onClick={onClose}>
              <div className="mx-auto w-12 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
            </div>
          )}
          {children}
        </div>
      </div>
    </>
  );
}
