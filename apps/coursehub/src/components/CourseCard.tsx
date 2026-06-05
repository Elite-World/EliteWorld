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
      className={`group block cursor-pointer ${className}`}
    >
      <div className="relative aspect-20/19 w-full overflow-hidden rounded-xl bg-gray-200 dark:bg-[#222222]">
        <NextImage
          src={course.images[currentImageIndex]}
          alt={course.title}
          fill
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Navigation Arrows */}
        {course.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 border border-black/5 text-black rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm hover:scale-105"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 border border-black/5 text-black rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm hover:scale-105"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

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

      <div className="mt-3 flex justify-between items-start">
        <h3 className="font-semibold text-[14px] text-[#222222] dark:text-white leading-5 line-clamp-1 pr-4">
          {course.title}
        </h3>
        <div className="flex items-center gap-1 shrink-0 mt-px">
          <Star className="w-3 h-3 text-[#222222] dark:text-white fill-current" />
          <span className="text-[#222222] dark:text-white text-[13px] font-light">
            {course.rating.toFixed(2)}
          </span>
        </div>
      </div>

      <p className="text-[13px] text-[#717171] leading-5 truncate mt-0.5">
        Designed by {owner?.name || 'Grand Architect'}
      </p>

      <div className="flex items-center gap-1 text-[13px] text-[#717171] leading-5 truncate">
        {course.duration.split(' ')[0]} {course.duration.split(' ')[1]}
      </div>

      <div className="mt-1.5 flex items-center gap-1 text-[14px]">
        <span className="font-semibold text-[#222222] dark:text-white">
          ${course.price}
        </span>
        <span className="text-[#222222] dark:text-white font-light text-[13px]">total</span>
      </div>
    </Link>
  );
};

export default CourseCard;
