'use client';

import { useThemeStore } from '@/lib/stores/useThemeStore';
import { styles } from '../styles.config';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <div 
      className={cn(
        styles.components.card.base,
        isDark ? styles.components.card.dark : styles.components.card.light,
        className
      )}
    >
      {children}
    </div>
  );
} 