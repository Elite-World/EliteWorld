'use client';

import { cn } from '../utils';
import Image from 'next/image';
import { useState } from 'react';
import React from 'react';
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

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-900/10 z-0" />
      )}

      {/* Fallback gradient */}
      <div
        className={cn(
          'absolute inset-0 z-0 bg-linear-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-[#0a0a0a] dark:via-[#1A1A1A] dark:to-[#0a0a0a]',
        )}
      />

      {showImage && (
        <>
          <Image
            src={bgSrc}
            alt="Background"
            fill
            className={cn(
              'object-cover object-center z-0 transition-all duration-1000 scale-105 opacity-80 grayscale-[0.2]',
            )}
            onError={() => setImageError(true)}
            priority={true}
          />
          <div className="absolute inset-0 bg-linear-to-b from-white/50 via-white/10 to-gray-50 dark:from-black/80 dark:via-black/40 dark:to-[#0a0a0a] backdrop-blur-[2px] z-0" />
        </>
      )}
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
        'relative bg-gray-50 dark:bg-[#0a0a0a] overflow-hidden',
        mode === 'main'
          ? 'min-h-[80vh] md:min-h-[calc(100vh-5.5rem)]'
          : 'min-h-[40vh] md:min-h-[calc(60vh-5.5rem)]',
        className,
      )}
    >
      <HeroBackground mode={mode} backgroundImage={backgroundImage} />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pb-20 z-10">
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
              <h1 className="font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.9] uppercase transition-all duration-700 select-none pb-4 flex flex-wrap justify-center gap-4">
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
                          ? 'text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-purple-500 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-size-[200%_auto] animate-gradient drop-shadow-sm'
                          : 'text-gray-900 dark:text-white drop-shadow-md dark:drop-shadow-none',
                      )}
                    >
                      {word}
                    </RevealElement>
                  );
                })}
              </h1>
            ) : (
              <h1 className="font-black text-gray-900 dark:text-white text-5xl md:text-7xl tracking-tighter leading-[0.9] uppercase transition-all duration-700 select-none pb-4 drop-shadow-md dark:drop-shadow-none">
                {title}
              </h1>
            )}

            {subtitle && (
              <RevealElement
                as="div"
                delay={1000} // 1s delay for subtitle
                className={cn(
                  'max-w-2xl mx-auto mt-8 mb-12 text-gray-700 dark:text-gray-300 font-medium tracking-tight leading-relaxed drop-shadow-xs dark:drop-shadow-none',
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
                {/* <div className="mt-8 flex items-center gap-6 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-[#1A1A1A] bg-gray-800 overflow-hidden"
                      >
                        <img
                          src={`https://i.pravatar.cc/100?u=${i}`}
                          alt="Consultant"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none">
                      Accredited Consultants
                    </p>
                    <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-1">
                      Global Partners & Vetted Institutions
                    </p>
                  </div>
                </div> */}
              </RevealElement>
            )}
          </div>
        </div>
      </div>

      {/* Visual Accents */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-600/50 to-transparent" />
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
