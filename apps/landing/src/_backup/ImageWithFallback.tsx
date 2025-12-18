'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

import { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

/**
 * Image component with fallback support
 *
 * @component
 * @example
 * <ImageWithFallback
 *   src="/image.jpg"
 *   alt="Description"
 *   fallbackSrc="/fallback.jpg"
 * />
 */
export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = '/images/placeholder.png',
  className,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        props.fill && 'h-full w-full',
        className
      )}
    >
      <Image
        {...props}
        src={error ? fallbackSrc : src}
        alt={alt}
        className={cn(
          'object-cover transition-opacity duration-200',
          error ? 'opacity-50' : 'opacity-100'
        )}
        aria-describedby={error ? 'image-error' : undefined}
        onError={() => setError(true)}
      />
      {error && (
        <div id="image-error" className="sr-only">
          Image failed to load
        </div>
      )}
    </div>
  );
}
