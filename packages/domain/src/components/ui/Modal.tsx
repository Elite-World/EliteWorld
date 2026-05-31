'use client';

import { useThemeStore } from '../../lib/stores/useThemeStore';
import { cn } from '../../lib/utils';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'popup' | 'bottom' | 'side';
}

// Animation Variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  popup: {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', duration: 0.3 },
    },
    exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } },
  },
  bottom: {
    hidden: { y: '100%' },
    visible: {
      y: 0,
      transition: { type: 'spring', damping: 25, stiffness: 300 },
    },
    exit: { y: '100%', transition: { duration: 0.2 } },
  },
  side: {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: { type: 'spring', damping: 30, stiffness: 300 },
    },
    exit: { x: '100%', transition: { duration: 0.3, ease: 'easeInOut' } },
  },
} as const;

export function Modal({
  isOpen,
  onClose,
  children,
  className,
  variant = 'popup',
}: ModalProps) {
  const isDark = useThemeStore((state) => state.isDark);

  // Lock body scroll and Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const wrapperClasses = cn(
    variant === 'popup' &&
      'fixed inset-0 z-50 flex items-center justify-center p-4',
    variant === 'side' && 'fixed inset-0 z-50 flex justify-end',
    variant === 'bottom' && 'fixed inset-0 z-50 flex items-end',
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
    <div className="relative z-50">
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={backdropVariants}
        onClick={onClose}
      />

      {/* Container to position the modal */}
      <div className={wrapperClasses}>
        <motion.div
          className={contentClasses}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants[variant]}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
        >
          {/* Bottom Sheet Handle */}
          {variant === 'bottom' && (
            <div className="flex-none py-3" onClick={onClose}>
              <div className="mx-auto w-12 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
            </div>
          )}
          {children}
        </motion.div>
      </div>
    </div>
  );
}
