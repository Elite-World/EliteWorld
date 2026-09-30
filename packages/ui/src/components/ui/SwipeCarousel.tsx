'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import NextImage from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils';

export interface SwipeCarouselProps {
  images: string[];
  alt?: string;
  className?: string;
}

export function SwipeCarousel({ images, alt = '', className }: SwipeCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number, e?: React.MouseEvent | React.TouchEvent | PointerEvent) => {
    if (e && 'preventDefault' in e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setDirection(newDirection);
    setIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const bind = useDrag(({ active, movement: [mx], direction: [xDir], distance: [dx], cancel, event }: any) => {
    // Only capture horizontal swipes to allow vertical scrolling on mobile
    if (active && dx > 40) {
      event.stopPropagation();
      paginate(xDir > 0 ? -1 : 1);
      cancel();
    }
  }, { axis: 'x', filterTaps: true });

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      z: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      z: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  if (!images || images.length === 0) return null;

  return (
    <div 
      className={cn('relative w-full h-full overflow-hidden group touch-pan-y', className)}
      {...(bind() as any)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0 w-full h-full"
        >
          <NextImage
            src={images[index]}
            alt={`${alt} ${index + 1}`}
            fill
            className="object-cover pointer-events-none"
            priority={index === 0}
          />
        </motion.div>
      </AnimatePresence>

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
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
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
