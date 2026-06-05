'use client';

import React from 'react';
import CourseCard from './CourseCard';
import { Course } from '@/types';

interface CourseCarouselProps {
  courses: Course[];
  gapYClass?: string;
}

export default function CourseCarousel({
  courses,
  gapYClass = 'gap-y-6',
}: CourseCarouselProps) {
  return (
    <div
      className={`flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 ${gapYClass} overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory pb-4 sm:pb-0 -mx-8 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
    >
      {/* Explicit spacer guarantees left scroll padding on all mobile browsers */}
      <div className="w-4 shrink-0 sm:hidden" aria-hidden="true" />

      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          className="w-[45vw] min-w-[45vw] sm:w-auto sm:min-w-0 shrink-0 snap-center sm:snap-align-none"
        />
      ))}

      {/* Explicit spacer guarantees right scroll padding on all mobile browsers */}
      <div className="w-4 shrink-0 sm:hidden" aria-hidden="true" />
    </div>
  );
}
