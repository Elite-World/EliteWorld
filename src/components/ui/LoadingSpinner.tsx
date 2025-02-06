'use client';

import { useThemeStore } from '@/lib/stores/useThemeStore';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  /** The size of the spinner */
  size?: 'sm' | 'md' | 'lg';
  /** The variant of the spinner */
  variant?: 'page' | 'inline' | 'overlay';
  /** Optional custom classes */
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4 border',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-[3px]'
} as const;

const variantClasses = {
  page: 'fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-black/80',
  inline: 'flex items-center justify-center p-4',
  overlay: 'absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-sm'
} as const;

export function LoadingSpinner({ 
  size = 'md', 
  variant = 'inline',
  className 
}: LoadingSpinnerProps): React.ReactElement {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <div className={cn(variantClasses[variant], className)}>
      <div className="relative">
        <div 
          className={cn(
            sizeClasses[size],
            'rounded-full animate-spin',
            isDark ? 'border-gray-200 border-t-gray-800' : 'border-gray-800 border-t-gray-200'
          )} 
        />
      </div>
    </div>
  );
} 