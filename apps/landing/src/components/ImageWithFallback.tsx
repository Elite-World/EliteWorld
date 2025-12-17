'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  width?: number;
  height?: number;
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
    <div className={cn('relative', className)}>
      <Image
        {...props}
        src={error ? fallbackSrc : src}
        alt={alt}
        aria-describedby={error ? 'image-error' : undefined}
        onError={() => setError(true)}
        className={cn(
          'object-cover transition-opacity duration-200',
          error ? 'opacity-50' : 'opacity-100'
        )}
      />
      {error && (
        <div id="image-error" className="sr-only">
          Image failed to load
        </div>
      )}
    </div>
  );
} 