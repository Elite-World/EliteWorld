'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '../../utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'link'
    | 'hero'
    | 'hero-outline'
    | 'shine';
  size?: 'default' | 'sm' | 'md' | 'lg' | 'icon';
  href?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  target?: string;
  rel?: string;
}

const buttonVariants = {
  variants: {
    default:
      'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg border border-transparent',
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg border border-transparent',
    secondary:
      'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 border border-transparent',
    outline:
      'border border-gray-200 bg-transparent hover:bg-gray-100 text-gray-900 dark:border-white/10 dark:text-white dark:hover:bg-white/5',
    ghost:
      'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-white/10 dark:hover:text-white text-gray-600 dark:text-gray-400',
    link: 'text-blue-600 underline-offset-4 hover:underline',
    hero: 'bg-gray-900 text-white dark:bg-white dark:text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white transition-all duration-500 shadow-lg',
    'hero-outline':
      'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/30 backdrop-blur-sm text-gray-900 dark:text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-black/10 dark:hover:bg-white/15 hover:border-black/30 dark:hover:border-white/50 transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]',
    shine:
      'relative overflow-hidden group bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl hover:scale-105 transition-all duration-500 hover:text-white',
  },
  sizes: {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3 text-xs',
    md: 'h-10 px-5 py-2.5',
    lg: 'h-12 px-8 text-base',
    icon: 'h-10 w-10',
  },
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      href,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      target,
      rel,
      ...props
    },
    ref,
  ) => {
    const variantClass =
      buttonVariants.variants[variant] || buttonVariants.variants.default;
    const sizeClass =
      buttonVariants.sizes[size] || buttonVariants.sizes.default;

    const compClasses = cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 select-none gap-2',
      variantClass,
      sizeClass,
      className,
    );

    const content = (
      <>
        {variant === 'shine' && (
          <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}
        <span className="relative z-10 flex items-center gap-2">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {!isLoading && leftIcon && <span className="">{leftIcon}</span>}
          {children}
          {!isLoading && rightIcon && <span className="">{rightIcon}</span>}
        </span>
      </>
    );

    if (href) {
      if (href.startsWith('http') || target === '_blank') {
        return (
          <a href={href} className={compClasses} target={target} rel={rel}>
            {content}
          </a>
        );
      }
      return (
        <Link href={href} className={compClasses} target={target} rel={rel}>
          {content}
        </Link>
      );
    }

    return (
      <button
        className={compClasses}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {content}
      </button>
    );
  },
);
Button.displayName = 'Button';
