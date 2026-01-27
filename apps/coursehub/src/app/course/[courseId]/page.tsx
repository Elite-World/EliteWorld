'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import Rating from '@/components/Rating';
import Button from '@/components/Button';

const StarIcon = () => (
  <svg
    className="w-5 h-5 text-yellow-400"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const HeartIcon: React.FC<{ isFilled: boolean }> = ({ isFilled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill={isFilled ? 'currentColor' : 'none'}
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={isFilled ? '0' : '2'}
      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
    />
  </svg>
);

const CourseDetailPage: React.FC = () => {
  const params = useParams();
  const courseId = params?.courseId as string;
  const {
    courses,
    currentUser,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    getCourseOwner,
  } = useAppContext();
  const course = courses.find((c) => c.id === courseId);
  const owner = course ? getCourseOwner(course) : undefined;

  if (!course || !owner) {
    return (
      <div className="container mx-auto p-8 text-center">Course not found.</div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">{course.title}</h1>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <StarIcon />
            <span>
              {course.rating.toFixed(1)} ({course.reviewCount} reviews)
            </span>
          </div>
          <span>&middot;</span>
          <span>Created by {owner.name}</span>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-2 rounded-xl overflow-hidden h-96">
        <img
          src={course.images[0]}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="hidden md:grid grid-cols-2 gap-2">
          {course.images.slice(1, 5).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${course.title} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-8 flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          {/* Description */}
          <div className="pb-6 border-b">
            <h2 className="text-2xl font-semibold mb-2">About this course</h2>
            <p className="text-gray-700 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* What you'll learn */}
          <div className="py-6 border-b">
            <h2 className="text-2xl font-semibold mb-4">What you'll learn</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {course.whatYouWillLearn.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-teal-500 shrink-0 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Curriculum */}
          <div className="py-6 border-b">
            <h2 className="text-2xl font-semibold mb-4">Curriculum</h2>
            <div className="space-y-4">
              {course.curriculum.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Instructor */}
          <div className="py-6 border-b">
            <h2 className="text-2xl font-semibold mb-4">
              Meet your instructor
            </h2>
            <div className="flex items-center gap-4">
              <img
                src={owner.avatarUrl}
                alt={owner.name}
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h3 className="text-xl font-semibold">{owner.name}</h3>
                <p className="text-gray-600">
                  Rated {owner.rating?.toFixed(1) || 'N/A'} out of 5
                </p>
              </div>
            </div>
            <p className="mt-4 text-gray-700">{owner.bio}</p>
          </div>

          {/* Reviews */}
          <div className="py-6">
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
            <div className="space-y-6">
              {course.reviews.map((review) => (
                <div key={review.id}>
                  <div className="flex items-center gap-3">
                    <img
                      src={review.authorAvatarUrl}
                      alt={review.authorName}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{review.authorName}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Widget */}
        <div className="lg:w-1/3">
          <div className="sticky top-24 p-6 border rounded-xl shadow-lg">
            <div className="text-2xl font-bold mb-4">
              ${course.price}{' '}
              <span className="font-normal text-base text-gray-600">
                / total
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button className="grow">Enroll now</Button>
              {currentUser && (
                <button
                  onClick={() =>
                    isInWishlist(course.id)
                      ? removeFromWishlist(course.id)
                      : addToWishlist(course.id)
                  }
                  className={`p-3 border rounded-lg transition-colors ${isInWishlist(course.id) ? 'text-red-500 border-red-200 bg-red-50' : 'text-gray-500 border-gray-300 bg-white hover:bg-gray-100'}`}
                  aria-label="Save to wishlist"
                >
                  <HeartIcon isFilled={isInWishlist(course.id)} />
                </button>
              )}
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              30-Day Money-Back Guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
