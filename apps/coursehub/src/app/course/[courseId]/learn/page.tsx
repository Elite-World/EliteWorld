'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import Button from '@/components/Button';

const CheckCircleIcon: React.FC<{ checked: boolean }> = ({ checked }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 shrink-0 ${checked ? 'text-teal-500' : 'text-gray-300'}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const StudentCoursePage: React.FC = () => {
  const params = useParams();
  const courseId = params?.courseId as string;
  const router = useRouter();
  const { courses, currentUser, getCourseOwner } = useAppContext();

  const course = courses.find((c) => c.id === courseId);
  const owner = course ? getCourseOwner(course) : undefined;

  // Mock progress state
  const [completedItems, setCompletedItems] = useState<string[]>(() => {
    if (!course) return [];
    const itemsToComplete = Math.floor(course.curriculum.length / 2);
    return course.curriculum
      .slice(0, itemsToComplete)
      .map((item) => item.title);
  });

  useEffect(() => {
    if (!currentUser) {
      router.push('/');
    }
  }, [currentUser, router]);

  const toggleCompletion = (itemTitle: string) => {
    setCompletedItems((prev) =>
      prev.includes(itemTitle)
        ? prev.filter((t) => t !== itemTitle)
        : [...prev, itemTitle],
    );
  };

  const progressPercentage = useMemo(() => {
    if (!course || course.curriculum.length === 0) return 0;
    return (completedItems.length / course.curriculum.length) * 100;
  }, [completedItems, course]);

  if (!currentUser) return null;

  if (!course || !owner) {
    return (
      <div className="container mx-auto p-8 text-center">Course not found.</div>
    );
  }

  const courseDurationValue = parseInt(course.duration.split(' ')[0], 10) || 0;

  return (
    <div className="bg-gray-100 min-h-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="text-teal-600 hover:underline text-sm"
          >
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mt-2">
            {course.title}
          </h1>
          <p className="text-gray-600">Created by {owner.name}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">
              Overall Progress
            </span>
            <span className="text-sm font-medium text-teal-600">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-teal-500 h-2.5 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content - Curriculum */}
          <main className="lg:w-2/3 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Course Content</h2>
            <div className="space-y-4">
              {course.curriculum.map((item) => {
                const isCompleted = completedItems.includes(item.title);
                return (
                  <div
                    key={item.title}
                    onClick={() => toggleCompletion(item.title)}
                    className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition ${isCompleted ? 'bg-teal-50 border-teal-200' : 'bg-white hover:bg-gray-50'}`}
                  >
                    <CheckCircleIcon checked={isCompleted} />
                    <div>
                      <h3
                        className={`font-semibold ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-800'}`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`text-sm ${isCompleted ? 'text-gray-400' : 'text-gray-600'} mt-1`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>

          {/* Sidebar - Performance & Info */}
          <aside className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Your Performance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Lessons Completed</span>{' '}
                    <strong>
                      {completedItems.length} / {course.curriculum.length}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Spent</span>{' '}
                    <strong>
                      {Math.round(
                        (progressPercentage * courseDurationValue) / 100,
                      )}{' '}
                      hours
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Quizzes Passed</span> <strong>3 / 5</strong>
                  </div>
                </div>
                <Button fullWidth className="mt-6">
                  Continue Learning
                </Button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={owner.avatarUrl}
                    alt={owner.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Your Instructor</p>
                  <h3 className="text-lg font-semibold">{owner.name}</h3>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default StudentCoursePage;
