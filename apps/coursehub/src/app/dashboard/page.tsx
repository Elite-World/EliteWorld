'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { Course } from '@/types';
import {
  Trash2,
  PlayCircle,
  Heart,
  Users,
  GraduationCap,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@repo/domain';

// --- Reusable Dashboard Course Card ---
interface DashboardCourseCardProps {
  course: Course;
  cardType: 'learning' | 'owned' | 'managed' | 'wishlist';
  onRemoveFromWishlist?: (courseId: string) => void;
}

const TrashIcon = () => <Trash2 className="w-5 h-5" />;

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
      className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-3xl relative transition-all duration-300 hover:shadow-2xl hover:border-blue-500/30 group"
    >
      <div className="relative w-full sm:w-48 h-32 shrink-0 overflow-hidden rounded-2xl shadow-lg">
        <Image
          src={course.images[0]}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
          <span className="text-[10px] font-bold text-white uppercase tracking-widest">
            View Module
          </span>
        </div>
      </div>
      <div className="grow self-start sm:self-center w-full">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 rounded-md bg-blue-600/10 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
            {course.category}
          </span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {course.level}
          </span>
        </div>
        <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors leading-snug">
          {course.title}
        </h3>
        <p className="text-xs font-medium text-gray-500 mt-1 flex items-center gap-1">
          <Users className="w-3 h-3" />
          Expert:{' '}
          <span className="text-gray-700 dark:text-gray-300">
            {owner?.name}
          </span>
        </p>

        {cardType === 'learning' && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Course Progress
              </span>
              <span className="text-[10px] font-bold text-blue-600">65%</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-white/5 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-linear-to-r from-blue-600 to-purple-600 h-full rounded-full transition-all duration-1000"
                style={{ width: `65%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
        <ChevronRight className="w-6 h-6 text-blue-600" />
      </div>

      {cardType === 'wishlist' && onRemoveFromWishlist && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemoveFromWishlist(course.id);
          }}
          className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 hover:bg-red-500/5 rounded-full transition-colors z-10"
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
      className={cn(
        'px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300',
        activeTab === tabName
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 translate-y--0.5'
          : 'text-gray-500 hover:bg-gray-200/50 dark:hover:bg-white/5',
      )}
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
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-xl bg-purple-600/10">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Active Collaborators
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collaborators.length > 0 ? (
              collaborators.map(({ user, managedCourses }: any) => (
                <div
                  key={user.id}
                  className="bg-white dark:bg-[#1A1A1A] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-xl flex flex-col gap-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-white dark:border-[#2A2A2A] shadow-lg">
                      <Image
                        src={user.avatarUrl}
                        alt={user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-lg">
                        {user.name}
                      </p>
                      <p className="text-xs font-medium text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 dark:border-white/5 pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <GraduationCap className="w-4 h-4 text-blue-600" />
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Assigned Responsibilities
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {managedCourses.map((c: any) => (
                        <Link
                          key={c.id}
                          href={`/course/${c.id}`}
                          className="px-3 py-1.5 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10 text-[10px] font-bold text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:border-blue-500/30 transition-all flex items-center gap-2 group"
                        >
                          {c.title}
                          <span className="px-1.5 py-0.5 bg-blue-600/10 text-blue-600 rounded text-[8px]">
                            {c.role}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 p-12 text-center bg-gray-50 dark:bg-white/5 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-white/10">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">
                  No external collaborators assigned yet.
                </p>
              </div>
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
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-600/10">
            {activeTab === 'myLearning' ? (
              <PlayCircle className="w-5 h-5 text-blue-600" />
            ) : activeTab === 'wishlist' ? (
              <Heart className="w-5 h-5 text-red-600" />
            ) : (
              <GraduationCap className="w-5 h-5 text-blue-600" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tighter">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
            <div className="col-span-2 p-16 text-center bg-white dark:bg-[#1A1A1A] rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl">
              <p className="text-gray-500 font-bold mb-6 italic">{emptyText}</p>
              <Link
                href="/search"
                className="px-8 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-blue-500/25 transition-all inline-block"
              >
                Discover Elite Content
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span className="text-xs font-black uppercase tracking-widest text-blue-600/60">
                Elite Member Access
              </span>
            </div>
            <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
              Greetings,{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                {currentUser.name.split(' ')[0]}
              </span>
              .
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium max-w-md">
              Welcome to your exclusive academic command center. Track your
              progress across global experiences.
            </p>
          </div>
          <div className="flex items-center gap-6 p-6 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-3xl shadow-xl">
            <div className="text-right">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Global Ranking
              </p>
              <p className="text-2xl font-black text-gray-900 dark:text-white">
                Top 2%
              </p>
            </div>
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-4 border-gray-50 dark:border-[#2A2A2A] shadow-2xl shrink-0 group">
              <Image
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-12 bg-white dark:bg-[#1A1A1A] p-2 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            <TabButton tabName="myLearning" label="My Learning" />
            <TabButton tabName="myCourses" label="Catalog" />
            <TabButton tabName="myCollaborators" label="Team" />
            <TabButton tabName="managedCourses" label="Management" />
            <TabButton tabName="myWishlist" label="Aspirations" />
          </div>
          <div className="px-6 hidden lg:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <TrendingUp className="w-3 h-3 text-green-500" />
            Active Session
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardPage;
