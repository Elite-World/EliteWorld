'use client';
import { useThemeStore } from '../../lib/stores/useThemeStore';
import { cn } from '../../lib/utils';
import { useEffect } from 'react';
import { useModalStore } from '../../lib/stores/useModalStore';

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
  const isClosing = useModalStore((state) => state.isClosing);

  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.documentElement.style.setProperty('--scrollbar-compensation', `${scrollbarWidth}px`);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.removeProperty('--scrollbar-compensation');
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.removeProperty('--scrollbar-compensation');
    };
  }, [isOpen, onClose]);

  const wrapperClasses = cn(
    variant === 'popup' && 'fixed inset-0 flex items-center justify-center p-4',
    variant === 'side' && 'fixed inset-0 flex justify-end',
    variant === 'bottom' && 'fixed inset-0 flex items-end',
  );

  const contentClasses = cn(
    'relative w-full shadow-2xl overflow-hidden duration-500',
    isDark ? 'bg-[#1C1C1E]' : 'bg-white',
    // Shape & Size
    variant === 'popup' && 'max-w-lg rounded-2xl',
    variant === 'side' &&
      'w-[85vw] max-w-sm h-full rounded-l-2xl border-l border-gray-100 dark:border-white/10',
    variant === 'bottom' && 'h-[80vh] rounded-t-2xl',
    // Entry Animations
    !isClosing && variant === 'popup' && 'animate-in fade-in zoom-in-95',
    !isClosing && variant === 'side' && 'animate-in slide-in-from-right',
    !isClosing && variant === 'bottom' && 'animate-in slide-in-from-bottom',
    // Exit Animations
    isClosing && variant === 'popup' && 'animate-out fade-out zoom-out-95',
    isClosing && variant === 'side' && 'animate-out slide-out-to-right',
    isClosing && variant === 'bottom' && 'animate-out slide-out-to-bottom',
    className,
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/60 z-9998 cursor-pointer duration-500 fill-mode-forwards",
          isClosing ? "animate-out fade-out" : "animate-in fade-in"
        )}
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
