'use client';

import { cn } from '../utils';
import Image from 'next/image';
import { useState } from 'react';
import React from 'react';
import { useUnsplashImage } from '../hooks/useUnsplashImage';
import { UI_CONFIG } from '@repo/config/ui';

const siteConfig = { ogImage: '/images/placeholder.jpg' };

interface HeroSectionProps {
  mode?: 'main' | 'page';
  title: string;
  subtitle?: string | React.ReactNode;
  backgroundImage?: string;
  className?: string;
  children?: React.ReactNode; // For optional CTA buttons or extra content
}

function HeroBackground({
  mode,
  backgroundImage,
}: {
  mode: 'main' | 'page';
  backgroundImage?: string;
}) {
  const [imageError, setImageError] = useState(false);
  const { imageUrl, isLoading, error } = useUnsplashImage(
    UI_CONFIG.hero.unsplashQuery
  );
  const [imageLoading, setImageLoading] = useState(true);

  // Logic:
  // 1. If backgroundImage provided, use it (highest priority).
  // 2. Try Unsplash image (dynamic).
  // 3. If mode='main', fallback to Config OG image.
  // 4. Fallback to gradient (always rendered below).

  const bgSrc =
    backgroundImage ||
    imageUrl ||
    (mode === 'main' ? siteConfig.ogImage : null);
  const showImage = !!bgSrc && !imageError;

  return (
    <>
      {(isLoading || (showImage && imageLoading)) && (
        <div className="absolute inset-0 animate-pulse bg-gray-200/50 dark:bg-gray-800/50 z-0" />
      )}

      {/* Fallback gradient - always present underneath */}
      <div
        className={cn(
          'absolute inset-0 z-0',
          mode === 'main'
            ? UI_CONFIG.hero.gradients.main
            : UI_CONFIG.hero.gradients.page
        )}
      />

      {showImage && (
        <>
          <Image
            src={bgSrc}
            alt="Background"
            fill
            className={cn(
              'object-cover object-center z-0',
              'transition-opacity duration-1000',
              imageLoading ? 'opacity-0' : 'opacity-100'
            )}
            onError={() => setImageError(true)}
            priority={true}
            onLoad={() => setImageLoading(false)}
          />
          <div className="absolute inset-0 bg-black/40 z-0" />
        </>
      )}
    </>
  );
}

export function HeroSection({
  mode = 'page',
  title,
  subtitle,
  backgroundImage,
  className,
  children,
}: HeroSectionProps) {
  return (
    <section
      id="hero-section"
      className={cn(
        'relative -mt-16 overflow-hidden', // Negative margin for transparent navbar effect
        mode === 'main' ? 'min-h-screen' : 'min-h-[40vh] md:min-h-[50vh]', // Main takes full screen, others take half
        className
      )}
    >
      <HeroBackground mode={mode} backgroundImage={backgroundImage} />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-16 z-10">
        <div className="container mx-auto">
          <h1
            className={cn(
              'font-bold mb-6 text-white drop-shadow-md',
              mode === 'main' ? 'text-5xl md:text-6xl' : 'text-4xl md:text-5xl'
            )}
          >
            {title}
          </h1>

          {subtitle && (
            <div
              className={cn(
                'max-w-2xl mx-auto mb-12 text-white/90 drop-shadow-sm',
                mode === 'main' ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'
              )}
            >
              {typeof subtitle === 'string' ? <p>{subtitle}</p> : subtitle}
            </div>
          )}

          {children && (
            <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-center">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
