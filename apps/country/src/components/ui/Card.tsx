'use client';

import { cn } from '@repo/web-shared';
import { useThemeStore } from '@repo/web-shared';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-6 transition-colors',
        'bg-white dark:bg-[#1C1C1E]',
        'border border-gray-100 dark:border-[#2C2C2E]',
        'shadow-sm',
        className
      )}
    >
      {children}
    </div>
  );
}
