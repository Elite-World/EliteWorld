'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Course } from '../types';
// import Rating from './Rating';
import { useAppContext } from '../context/AppContext';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
// import { cn } from '@/lib/utils'; // Assuming you have a utils file, if not I will just use template literals or install clsx/tailwind-merge

interface CourseCardProps {
  course: Course;
  className?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, className }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {
    currentUser,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    getCourseOwner,
  } = useAppContext();
  const owner = getCourseOwner(course);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % course.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + course.images.length) % course.images.length,
    );
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) return;

    if (isInWishlist(course.id)) {
      removeFromWishlist(course.id);
    } else {
      addToWishlist(course.id);
    }
  };

  const inWishlist = isInWishlist(course.id);

  return (
    <Link
      href={`/course/${course.id}`}
      className={`group block bg-white rounded-2xl p-3 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${className}`}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={course.images[currentImageIndex]}
          alt={course.title}
          fill
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Navigation Arrows (Glassmorphism) */}
        {course.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* Wishlist Button (Glassmorphism) */}
        {currentUser && (
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all duration-300 ${
              inWishlist
                ? 'bg-red-500/10 border-red-500/20 text-red-500'
                : 'bg-black/20 border-white/20 text-white hover:bg-white hover:text-red-500'
            }`}
            aria-label="Save to wishlist"
          >
            <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>

      <div className="mt-4 px-1">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-bold text-lg text-gray-900 leading-snug line-clamp-2 group-hover:text-teal-600 transition-colors">
            {course.title}
          </h3>
          <div className="flex items-center gap-1 shrink-0 bg-yellow-400/10 px-2 py-1 rounded-md">
            <span className="text-yellow-500 text-xs text-nowrap">
              ★ {course.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-2 font-medium">
          {owner?.name || 'Unknown Owner'}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-teal-600 font-bold text-lg">${course.price}</p>
          <span className="text-xs text-gray-400 font-medium px-2 py-1 bg-gray-100 rounded-full">
            {course.duration}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
