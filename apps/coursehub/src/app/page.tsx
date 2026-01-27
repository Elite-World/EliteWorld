'use client';

import React from 'react';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import CourseCard from '@/components/CourseCard';
import { CourseCategory } from '@/types';

const categoryIcons: Record<CourseCategory, React.ReactNode> = {
  [CourseCategory.SUMMER_CAMP]: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  ),
  [CourseCategory.LANGUAGE]: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h-3.246a1.025 1.025 0 01-.926-1.544l4.246-7.772a1.025 1.025 0 011.852 0l4.246 7.772A1.025 1.025 0 0118.246 18h-3.246m-2.316 0A2.25 2.25 0 0012 15.75v-1.5"
    />
  ),
  [CourseCategory.CODING]: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  ),
  [CourseCategory.AI]: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6.344A6.344 6.344 0 005.656 12 6.344 6.344 0 0012 17.656 6.344 6.344 0 0018.344 12 6.344 6.344 0 0012 6.344z"
    />
  ),
  [CourseCategory.DRAWING]: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z"
    />
  ),
  [CourseCategory.BUSINESS]: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  ),
};

const CategoryIcon: React.FC<{ category: CourseCategory }> = ({ category }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-gray-600 group-hover:text-teal-500 transition"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    {categoryIcons[category]}
  </svg>
);

export default function HomePage() {
  const { courses } = useAppContext();

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative h-96 md:h-[500px] flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: `url('https://picsum.photos/seed/hero/1600/600')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Unlock Your Potential
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Discover unique learning experiences hosted by experts around the
            world.
          </p>
          <Link href="/search">
            <button className="bg-teal-500 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-600 transition duration-300 pointer-events-none">
              Explore courses
            </button>
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Explore by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {Object.values(CourseCategory).map((category) => (
            <Link
              href={`/search?category=${encodeURIComponent(category)}`}
              key={category}
              className="group flex flex-col items-center justify-center p-4 border rounded-lg hover:shadow-lg transition"
            >
              <CategoryIcon category={category} />
              <span className="mt-2 text-sm font-medium text-gray-700">
                {category}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Courses Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Featured Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {courses.slice(0, 4).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
