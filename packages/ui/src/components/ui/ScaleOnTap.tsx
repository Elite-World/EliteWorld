'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils';

export interface ScaleOnTapProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  scaleAmount?: number;
}

export function ScaleOnTap({
  children,
  className,
  scaleAmount = 0.97,
  ...props
}: ScaleOnTapProps) {
  return (
    <motion.div
      whileTap={{ scale: scaleAmount }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={cn('cursor-pointer touch-manipulation', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
