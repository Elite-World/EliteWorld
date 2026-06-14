'use client';

import { cn } from '../utils';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import React from 'react';
// Removed framer-motion for performance
import { useUnsplashImage } from '../hooks/useUnsplashImage';
import { UI_CONFIG } from '@repo/tooling/ui';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  mode?: 'main' | 'page';
  title: string;
  subtitle?: string | React.ReactNode;
  backgroundImage?: string;
  className?: string;
  children?: React.ReactNode;
}

function HeroBackground({
  mode,
  backgroundImage,
}: {
  mode: 'main' | 'page';
  backgroundImage?: string;
}) {
  const [imageError, setImageError] = useState(false);
  const { imageUrl, isLoading } = useUnsplashImage(
    UI_CONFIG.hero.unsplashQuery,
  );

  const bgSrc = backgroundImage || imageUrl;
  const showImage = !!bgSrc && !imageError;

const heroImageLoader = ({ src, width }: { src: string; width: number }) => {
  if (typeof src !== 'string') return src;
  
  if (src.includes('res.cloudinary.com')) {
    // Cloudinary URLs typically look like: https://res.cloudinary.com/cloudname/image/upload/v1234/filename
    const parts = src.split('/upload/');
    if (parts.length === 2) {
      // Clean up any existing transformations if present
      let path = parts[1];
      if (path.startsWith('f_auto') || path.startsWith('q_auto')) {
        const slashIndex = path.indexOf('/');
        if (slashIndex !== -1) {
          path = path.substring(slashIndex + 1);
        }
      }
      return `${parts[0]}/upload/f_auto,q_auto,w_${width}/${path}`;
    }
  }

  if (src.includes('images.unsplash.com')) {
    try {
      const url = new URL(src);
      url.searchParams.set('w', width.toString());
      url.searchParams.set('fit', 'crop');
      url.searchParams.set('auto', 'format,compress');
      url.searchParams.set('q', '70'); // Aggressive compression for mobile hero
      return url.toString();
    } catch (e) {
      return src;
    }
  }

  return src;
};

  // Removed parallax for initial load performance

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-900/10 z-0" />
      )}

      {/* Fallback gradient */}
      <div
        className={cn(
          'absolute inset-0 z-0 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-[#0a0a0a] dark:via-[#1A1A1A] dark:to-[#0a0a0a]',
        )}
      />

      {showImage && (
        <div
          key={bgSrc}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <div className="w-full h-full relative bg-gray-900">
            <Image
              loader={heroImageLoader}
              src={bgSrc}
              alt="Background"
              fill
              sizes="100vw"
              className="object-cover object-center grayscale-[0.2]"
              onError={() => setImageError(true)}
              priority={true}
              fetchPriority="high"
            />
          </div>
        </div>
      )}

      {/* Always render dark overlay so the white Navbar is visible */}
      <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/40 to-gray-50 dark:to-[#0a0a0a] z-0" />
    </>
  );
}

// Internal Reveal component for cinematic elements
function RevealElement({
  children,
  delay = 0,
  className,
  as: Component = 'span',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Component
      className={cn(
        'animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both',
        className,
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Component>
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
        'relative bg-gray-50 dark:bg-[#0a0a0a] overflow-hidden flex flex-col',
        mode === 'main'
          ? 'min-h-[80vh] md:min-h-[calc(100vh-5.5rem)]'
          : 'min-h-[40vh] md:min-h-[calc(60vh-5.5rem)]',
        className,
      )}
    >
      <HeroBackground mode={mode} backgroundImage={backgroundImage} />

      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-4 py-20 z-10 w-full mt-16 md:mt-0">
        <div className="container mx-auto max-w-5xl">
          <div className="animate-slide-up">
            {mode === 'main' && (
              <div className="flex items-center justify-center gap-2 mb-8 mx-auto">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 backdrop-blur-md">
                  <ShieldCheck className="w-3 h-3 text-blue-600" />
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-blue-600">
                    Certified Admissions Network
                  </span>
                </div>
              </div>
            )}

            {mode === 'main' ? (
              <h1 className="font-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.9] uppercase transition duration-700 select-none pb-4 flex flex-wrap justify-center gap-2 md:gap-4 text-balance">
                {title.split(' ').map((word, i) => {
                  const isLast = i === title.split(' ').length - 1;
                  return (
                    <RevealElement
                      key={i}
                      as="span"
                      delay={i * 150 + 300} // Fast stagger for title
                      className={cn(
                        'inline-block',
                        isLast
                          ? 'text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-blue-400 bg-size-[200%_auto] animate-gradient drop-shadow-sm'
                          : 'text-white drop-shadow-md',
                      )}
                    >
                      {word}
                    </RevealElement>
                  );
                })}
              </h1>
            ) : (
              <h1 className="font-black text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.1] md:leading-[0.9] uppercase transition duration-700 select-none pb-4 drop-shadow-xl text-balance">
                {title}
              </h1>
            )}

            {subtitle && (
              <RevealElement
                as="div"
                delay={1000} // 1s delay for subtitle
                className={cn(
                  'max-w-2xl mx-auto mt-8 mb-12 text-gray-200 font-medium tracking-tight leading-relaxed drop-shadow-md',
                  mode === 'main'
                    ? 'text-lg md:text-xl'
                    : 'text-base md:text-lg',
                )}
              >
                {typeof subtitle === 'string' ? <p>{subtitle}</p> : subtitle}
              </RevealElement>
            )}

            {children && (
              <RevealElement
                as="div"
                delay={1300} // 1.3s delay for buttons
                className="flex flex-col md:flex-row flex-wrap gap-4 justify-center items-center"
              >
                {children}
              </RevealElement>
            )}
          </div>
        </div>
      </div>

      {/* Visual Accents */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-600/50 to-transparent" />
      <div className="hidden md:block absolute top-1/4 -left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none transform-gpu will-change-transform" />
      <div className="hidden md:block absolute bottom-1/4 -right-20 w-64 h-64 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none transform-gpu will-change-transform" />
    </section>
  );
}
