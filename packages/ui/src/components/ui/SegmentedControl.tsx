'use client';

import React from 'react';
import { cn } from '../../utils';

export interface SegmentedControlOption<T extends string> {
  id: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
  activeClassName = 'bg-[#4C5CEC] text-white shadow-xs',
  inactiveClassName = 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'
}: SegmentedControlProps<T>) {
  return (
    <div
      className={cn(
        'rounded-full p-1 flex items-center gap-1 shadow-xs w-fit mx-auto select-none border border-gray-200 dark:border-white/5 bg-white dark:bg-zinc-900/50',
        className
      )}
    >
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={cn(
            'px-4 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-bold transition cursor-pointer text-center whitespace-nowrap',
            value === opt.id ? activeClassName : inactiveClassName
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
