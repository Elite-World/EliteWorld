'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils';

export interface FadeInProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  ...props
}: FadeInProps) {
  const initialY = direction === 'up' ? 20 : direction === 'down' ? -20 : 0;
  const initialX = direction === 'left' ? 20 : direction === 'right' ? -20 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY, x: initialX }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.32, 0.72, 0, 1], // Premium easing curve to match Tailwind
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
