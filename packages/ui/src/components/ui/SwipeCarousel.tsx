'use client';

import React, { useState, useRef } from 'react';
import NextImage from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils';

export interface SwipeCarouselProps {
  images: string[];
  alt?: string;
  className?: string;
}

export function SwipeCarousel({ images, alt = '', className }: SwipeCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const width = scrollRef.current.clientWidth;
    const newIndex = Math.round(scrollLeft / width);
    if (newIndex !== index) {
      setIndex(newIndex);
    }
  };

  const paginate = (direction: number, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!scrollRef.current) return;
    const width = scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({ left: direction * width, behavior: 'smooth' });
  };

  if (!images || images.length === 0) return null;

  return (
    <div className={cn('relative w-full h-full overflow-hidden group', className)}>
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full h-full overflow-x-auto overscroll-x-contain snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {images.map((img, i) => (
          <div key={i} className="relative w-full h-full shrink-0 snap-center">
            <NextImage
              src={img}
              alt={`${alt} ${i + 1}`}
              fill
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => paginate(-1, e)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 border border-black/5 text-black rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm hover:scale-105 z-10"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={(e) => paginate(1, e)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 border border-black/5 text-black rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm hover:scale-105 z-10"
          >
            <ChevronRight size={16} />
          </button>
          
          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10 pointer-events-none">
            {images.map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-300 shadow-sm", 
                  i === index ? "bg-white scale-110" : "bg-white/60"
                )} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
