'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

const StarIcon: React.FC<{ filled?: boolean }> = ({ filled = true }) => (
  <svg
    className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);
const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-blue-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a3.001 3.001 0 01-2.702 0M7 16V5m0 11a-3 3 0 01-5.995-1.058M17 16V5m0 11a-3 3 0 00-5.995-1.058"
    />
  </svg>
);
const SparklesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-yellow-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);
const ChartBarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-green-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

const SessionPerformancePage: React.FC = () => {
  const params = useParams();
  const courseId = params?.courseId as string;
  const sessionId = params?.sessionId as string;
  const router = useRouter();
  const {
    courses,
    currentUser,
    getSessionPerformance,
    canManageCourse,
    getAllUsers,
  } = useAppContext();

  const course = courses.find((c) => c.id === courseId);
  const session = course?.sessions.find((s) => s.id === sessionId);
  const performance = sessionId ? getSessionPerformance(sessionId) : undefined;
  const allUsers = getAllUsers();

  useEffect(() => {
    if (!currentUser) router.push('/');
  }, [currentUser, router]);

  if (!currentUser) return null;
  if (!course || !session)
    return (
      <div className="container mx-auto p-8 text-center">
        Session not found.
      </div>
    );
  if (!canManageCourse(course, currentUser)) {
    return (
      <div className="container mx-auto p-8 text-center">
        You do not have permission to view this page.
      </div>
    );
  }

  const attendanceRate = performance
    ? (performance.totalAttendees / performance.expectedAttendees) * 100
    : 0;

  const StatCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    value: string;
  }> = ({ icon, title, value }) => (
    <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
      {icon}
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href={`/course/${courseId}/manage`}
            className="text-teal-600 hover:underline text-sm"
          >
            &larr; Back to Course Management
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">
            Session Performance
          </h1>
          <p className="text-lg text-gray-600">
            {session.title} - {session.date}
          </p>
        </div>

        {!performance ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold">No Performance Data Yet</h2>
            <p className="text-gray-600 mt-2">
              Performance data for this session is not yet available. Please
              check back after the session is completed.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard
                icon={<UsersIcon />}
                title="Attendance Rate"
                value={`${attendanceRate.toFixed(1)}%`}
              />
              <StatCard
                icon={<SparklesIcon />}
                title="Average Rating"
                value={`${performance.averageRating.toFixed(1)} / 5`}
              />
              <StatCard
                icon={<ChartBarIcon />}
                title="Engagement Score"
                value={`${performance.engagementScore} / 100`}
              />
            </div>

            {/* Engagement Chart & Feedback */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4">
                  Engagement Over Time
                </h3>
                <div className="h-64 bg-gray-50 rounded-md flex items-end justify-around p-4">
                  {performance.engagementData.map((value, index) => (
                    <div
                      key={index}
                      className="w-4 bg-teal-300 hover:bg-teal-500 transition-colors rounded-t-sm"
                      style={{ height: `${value}%` }}
                      title={`Minute ${index * 5}: ${value}%`}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4">
                  Attendee Feedback
                </h3>
                <ul className="space-y-4 max-h-96 overflow-y-auto">
                  {performance.feedback.map((fb, index) => {
                    const author = allUsers.find((u) => u.id === fb.authorId);
                    return (
                      <li key={index} className="border-b pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {author?.avatarUrl && (
                              <Image
                                src={author.avatarUrl}
                                alt={author.name || ''}
                                width={32}
                                height={32}
                                className="w-8 h-8 rounded-full"
                              />
                            )}
                            <span className="font-semibold text-sm">
                              {author?.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <StarIcon />
                            <span className="text-sm font-bold">
                              {fb.rating}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 italic">
                          &quot;{fb.comment}&quot;
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionPerformancePage;
