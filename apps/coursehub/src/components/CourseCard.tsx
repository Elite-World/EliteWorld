'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { Course } from '../types';
import { useAppContext } from '../context/AppContext';
import { ChevronLeft, ChevronRight, Heart, Star } from 'lucide-react';

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
      className={`group block bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-3xl p-4 transition-all duration-500 hover:shadow-[0_24px_48px_rgba(0,0,0,0.1)] hover:-translate-y-2 ${className}`}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-gray-50 dark:bg-white/2 shadow-inner">
        <NextImage
          src={course.images[currentImageIndex]}
          alt={course.title}
          fill
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
          <h3 className="font-sans font-black text-lg text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
            {course.title}
          </h3>
          <div className="flex items-center gap-1.5 shrink-0 bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-1.5 rounded-xl">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-yellow-700 dark:text-yellow-500 text-[10px] font-black">
              {course.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
            {owner?.name || 'Grand Architect'}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-50 dark:border-white/5">
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">
              Tuition Fee
            </span>
            <p className="font-black text-2xl text-gray-900 dark:text-white tracking-tighter">
              ${course.price}
            </p>
          </div>
          <div className="px-3 py-1.5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl">
            <span className="text-[9px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-widest">
              {course.duration.split(' ')[0]}{' '}
              <span className="text-blue-600">
                {course.duration.split(' ')[1]}
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
