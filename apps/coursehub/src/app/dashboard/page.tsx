'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { Course } from '@/types';

// --- Reusable Dashboard Course Card ---
interface DashboardCourseCardProps {
  course: Course;
  cardType: 'learning' | 'owned' | 'managed' | 'wishlist';
  onRemoveFromWishlist?: (courseId: string) => void;
}

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const DashboardCourseCard: React.FC<DashboardCourseCardProps> = ({
  course,
  cardType,
  onRemoveFromWishlist,
}) => {
  const { getCourseOwner } = useAppContext();
  const owner = getCourseOwner(course);

  let linkDestination: string;
  if (cardType === 'learning') {
    linkDestination = `/course/${course.id}/learn`;
  } else if (cardType === 'owned') {
    linkDestination = `/course/${course.id}/manage`;
  } else {
    linkDestination = `/course/${course.id}`;
  }

  return (
    <Link
      href={linkDestination}
      className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg bg-white relative transition hover:shadow-md group"
    >
      <div className="relative w-full sm:w-40 h-32 shrink-0">
        <Image
          src={course.images[0]}
          alt={course.title}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="grow self-start sm:self-center w-full">
        <p className="text-sm text-gray-500">{course.category}</p>
        <h3 className="font-semibold text-lg text-gray-800 group-hover:underline">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1">by {owner?.name}</p>
        {cardType === 'learning' && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
            <div
              className="bg-teal-500 h-2.5 rounded-full"
              style={{ width: `${Math.random() * 80 + 10}%` }}
            ></div>
          </div>
        )}
      </div>
      {cardType === 'wishlist' && onRemoveFromWishlist && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemoveFromWishlist(course.id);
          }}
          className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 z-10"
          aria-label="Remove from wishlist"
        >
          <TrashIcon />
        </button>
      )}
    </Link>
  );
};

// --- Main Dashboard Page ---
const DashboardPage: React.FC = () => {
  const { currentUser, courses, removeFromWishlist, getAllUsers } =
    useAppContext();
  const [activeTab, setActiveTab] = useState('myLearning');
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/');
    }
  }, [currentUser, router]);

  if (!currentUser) return null;

  const enrolledCourses = courses.filter((c) =>
    currentUser.enrolledCourses.includes(c.id),
  );
  const myCourses = courses.filter((c) => c.ownerId === currentUser.id);
  const managedCourses = courses.filter((c) =>
    c.admins.some((admin) => admin.userId === currentUser.id),
  );
  const wishlistedCourses = courses.filter((c) =>
    currentUser.wishlist.includes(c.id),
  );

  const TabButton: React.FC<{ tabName: string; label: string }> = ({
    tabName,
    label,
  }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition ${activeTab === tabName ? 'bg-teal-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
    >
      {label}
    </button>
  );

  const renderContent = () => {
    if (activeTab === 'myCollaborators') {
      const myOwnedCourses = courses.filter(
        (c) => c.ownerId === currentUser.id,
      );
      const allUsers = getAllUsers();

      const collaboratorsMap = new Map();
      myOwnedCourses.forEach((course) => {
        course.admins.forEach((admin) => {
          if (!collaboratorsMap.has(admin.userId)) {
            const user = allUsers.find((u) => u.id === admin.userId);
            if (user) {
              collaboratorsMap.set(admin.userId, {
                user: user,
                managedCourses: [],
              });
            }
          }
          if (collaboratorsMap.has(admin.userId)) {
            collaboratorsMap.get(admin.userId).managedCourses.push({
              id: course.id,
              title: course.title,
              role: admin.role,
            });
          }
        });
      });
      const collaborators = Array.from(collaboratorsMap.values());

      return (
        <div>
          <h2 className="text-2xl font-semibold mb-4">My Collaborators</h2>
          <div className="space-y-4">
            {collaborators.length > 0 ? (
              collaborators.map(({ user, managedCourses }: any) => (
                <div
                  key={user.id}
                  className="bg-white p-4 rounded-lg shadow border flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 text-2xl font-bold shrink-0">
                    <div className="relative w-12 h-12 rounded-full mr-4 overflow-hidden shrink-0">
                      <Image
                        src={user.avatarUrl}
                        alt={user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="border-t sm:border-t-0 sm:border-l border-gray-200 pl-0 sm:pl-4 pt-4 sm:pt-0 w-full">
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      Manages:
                    </p>
                    <ul className="space-y-1">
                      {managedCourses.map((c: any) => (
                        <li key={c.id} className="text-sm text-gray-500">
                          <Link
                            href={`/course/${c.id}`}
                            className="hover:underline text-teal-600"
                          >
                            {c.title}
                          </Link>{' '}
                          as{' '}
                          <span className="font-semibold text-gray-700">
                            {c.role}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <p>
                You haven&apos;t assigned any collaborators to your courses yet.
              </p>
            )}
          </div>
        </div>
      );
    }

    let list: Course[] = [];
    let type: DashboardCourseCardProps['cardType'] = 'learning';
    let title = '';
    let emptyText = '';

    switch (activeTab) {
      case 'myLearning':
        list = enrolledCourses;
        type = 'learning';
        title = 'Courses you&apos;re learning';
        emptyText = 'You haven&apos;t enrolled in any courses yet.';
        break;
      case 'myCourses':
        list = myCourses;
        type = 'owned';
        title = 'Courses I Own';
        emptyText = 'You haven&apos;t created any courses yet.';
        break;
      case 'managedCourses':
        list = managedCourses;
        type = 'managed';
        title = 'Courses you manage';
        emptyText = 'You are not an admin for any courses.';
        break;
      case 'myWishlist':
        list = wishlistedCourses;
        type = 'wishlist';
        title = 'Your Wishlist';
        emptyText = 'Your wishlist is empty.';
        break;
    }

    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {list.length > 0 ? (
            list.map((course) => (
              <DashboardCourseCard
                key={course.id}
                course={course}
                cardType={type}
                onRemoveFromWishlist={removeFromWishlist}
              />
            ))
          ) : (
            <p>
              {emptyText}{' '}
              <Link href="/search" className="text-teal-500 hover:underline">
                Explore courses
              </Link>
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {currentUser.name}!
            </h1>
            <p className="text-gray-600 mt-1">
              Here&apos;s your member dashboard.
            </p>
          </div>
          <div className="relative w-16 h-16 mt-4 md:mt-0 rounded-full overflow-hidden shrink-0">
            <Image
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex items-center border-b border-gray-200 mb-6 flex-wrap">
          <div className="flex space-x-2 py-2">
            <TabButton tabName="myLearning" label="My Learning" />
            <TabButton tabName="myCourses" label="Courses I Own" />
            <TabButton tabName="myCollaborators" label="My Collaborators" />
            <TabButton tabName="managedCourses" label="Courses I Manage" />
            <TabButton tabName="myWishlist" label="My Wishlist" />
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardPage;
