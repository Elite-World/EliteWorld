'use client';

import React from 'react';
import Link from 'next/link';
import { Course } from '../types';
import { useAppContext } from '../context/AppContext';
import { Heart, Star } from 'lucide-react';
import { SwipeCarousel } from '@repo/ui';

interface CourseCardProps {
  course: Course;
  className?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, className }) => {
  const {
    currentUser,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    getCourseOwner,
  } = useAppContext();
  const owner = getCourseOwner(course);

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
        className={`group block cursor-pointer ${className || ''}`}
      >
        <div className="relative aspect-20/19 w-full overflow-hidden rounded-3xl bg-gray-100 dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-sm group-hover:shadow-xl transition-all duration-500">
        <SwipeCarousel images={course.images} alt={course.title} />

        {/* Wishlist Button */}
        {currentUser && (
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 p-0 transition-transform active:scale-90`}
            aria-label="Save to wishlist"
          >
            <Heart
              size={24}
              className={
                inWishlist
                  ? 'fill-[#FF385C] text-[#FF385C]'
                  : 'fill-black/50 text-white'
              }
              strokeWidth={inWishlist ? 0 : 2}
            />
          </button>
        )}
      </div>

      <div className="mt-4 flex justify-between items-start">
        <h3 className="font-black text-sm uppercase tracking-tight text-gray-900 dark:text-white leading-5 line-clamp-1 pr-4 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>
        <div className="flex items-center gap-1 shrink-0 mt-px bg-white dark:bg-white/10 px-1.5 py-0.5 rounded shadow-sm border border-gray-100 dark:border-white/5">
          <Star className="w-3 h-3 text-yellow-500 fill-current" />
          <span className="text-gray-900 dark:text-white text-[10px] font-black uppercase tracking-widest">
            {course.rating.toFixed(2)}
          </span>
        </div>
      </div>

      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 leading-5 truncate mt-1">
        Designed by {owner?.name || 'Grand Architect'}
      </p>

      <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 leading-5 truncate mt-0.5">
        {course.duration.split(' ')[0]} {course.duration.split(' ')[1]}
      </div>

      <div className="mt-2 flex items-center gap-1.5">
        <span className="font-black text-lg text-gray-900 dark:text-white">
          ${course.price}
        </span>
        <span className="text-gray-400 dark:text-gray-500 font-bold text-[10px] uppercase tracking-widest mt-1">total</span>
      </div>
      </Link>
  );
};

export default CourseCard;
