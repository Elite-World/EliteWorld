'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '../../lib/utils';
import { QrCode } from 'lucide-react';
import { ErrorBoundary } from 'react-error-boundary';

interface QRCodeProps {
  src: string;
  alt: string;
  title: string;
  description: string;
  isDark?: boolean;
  className?: string; // Add className
}

export function QRCode({
  src,
  alt,
  title,
  description,
  isDark,
  className,
}: QRCodeProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={cn(
        'rounded-2xl p-4 sm:p-6 text-center',
        isDark ? 'bg-gray-800' : 'bg-white shadow-lg',
        className, // Merge custom classes
      )}
    >
      <div
        className="relative mx-auto mb-4 w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px]"
      >
        <div aria-live="polite" aria-atomic="true" className="absolute inset-0 w-full h-full">
          {!imageError ? (
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              onError={() => setImageError(true)}
            />
          ) : (
            // fallback QR image
            (<div
              className={cn(
                'w-full h-full flex flex-col items-center justify-center rounded-lg border-2 border-dashed',
                isDark
                  ? 'border-gray-700 bg-gray-900'
                  : 'border-gray-200 bg-gray-50',
              )}
            >
              <QrCode
                className={cn(
                  'w-8 h-8 sm:w-12 sm:h-12 mb-2',
                  isDark ? 'text-gray-600' : 'text-gray-400',
                )}
              />
              <span
                className={cn(
                  'text-xs sm:text-sm text-center px-2',
                  isDark ? 'text-gray-500' : 'text-gray-400',
                )}
              >
                QR Code not available
              </span>
            </div>)
          )}
        </div>
      </div>
      <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
        {title}
      </h3>
      <p
        className={cn(
          'text-xs sm:text-sm',
          isDark ? 'text-gray-400' : 'text-gray-600',
        )}
      >
        {description}
      </p>
    </div>
  );
}

export function QRCodeWrapper(props: QRCodeProps) {
  return (
    <ErrorBoundary
      fallback={<div className="text-red-500">QR Code failed to load</div>}
    >
      <QRCode {...props} />
    </ErrorBoundary>
  );
}
