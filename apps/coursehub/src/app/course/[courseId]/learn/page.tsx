'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  PlayCircle,
  Clock,
  Trophy,
  BookOpen,
  ShieldCheck,
  Star,
  Layout,
} from 'lucide-react';
import { cn } from '@repo/domain';

const CheckCircleIcon: React.FC<{ checked: boolean }> = ({ checked }) =>
  checked ? (
    <div className="p-1 rounded-full bg-blue-600/10 border border-blue-600/20">
      <CheckCircle2 className="w-5 h-5 text-blue-600" />
    </div>
  ) : (
    <div className="p-1 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
      <Circle className="w-5 h-5 text-gray-300" />
    </div>
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
    <div className="bg-gray-50 dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Link
              href="/dashboard"
              className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors mb-4"
            >
              <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
              Return to Command Center
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="text-xs font-black uppercase tracking-widest text-blue-600/60">
                Active Learning Experience
              </span>
            </div>
            <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter max-w-2xl leading-tight">
              {course.title}
            </h1>
            <p className="text-gray-500 font-medium mt-2">
              Guided by{' '}
              <span className="text-gray-900 dark:text-white font-bold underline decoration-blue-600/30 underline-offset-4">
                {owner.name}
              </span>
            </p>
          </div>

          <div className="bg-white dark:bg-[#1A1A1A] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-xl min-w-[280px]">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Trophy className="w-3 h-3 text-yellow-500" />
                Overall Progress
              </span>
              <span className="text-sm font-black text-blue-600">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="w-full bg-gray-50 dark:bg-white/5 rounded-full h-2 overflow-hidden">
              <div
                className="bg-linear-to-r from-blue-600 to-purple-600 h-full rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content - Curriculum */}
          <main className="lg:w-2/3">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-xl bg-blue-600/10 text-blue-600">
                <Layout className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight uppercase">
                Intelligence Modules
              </h2>
            </div>

            <div className="space-y-4">
              {course.curriculum.map((item, index) => {
                const isCompleted = completedItems.includes(item.title);
                return (
                  <div
                    key={item.title}
                    onClick={() => toggleCompletion(item.title)}
                    className={cn(
                      'group flex items-start gap-6 p-6 bg-white dark:bg-[#1A1A1A] border rounded-4xl cursor-pointer transition-all duration-300 relative overflow-hidden',
                      isCompleted
                        ? 'border-blue-600/20 shadow-sm opacity-80'
                        : 'border-gray-100 dark:border-white/5 shadow-xl hover:shadow-2xl hover:border-blue-500/30',
                    )}
                  >
                    {!isCompleted && (
                      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full blur-2xl -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}

                    <div className="relative z-10">
                      <CheckCircleIcon checked={isCompleted} />
                    </div>

                    <div className="relative z-10 grow">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] font-black text-blue-600/40 uppercase">
                          Module 0{index + 1}
                        </span>
                        {isCompleted && (
                          <span className="text-[8px] font-black bg-green-500/10 text-green-600 px-2 py-0.5 rounded uppercase">
                            Mastered
                          </span>
                        )}
                      </div>
                      <h3
                        className={cn(
                          'text-lg font-bold leading-tight transition-colors',
                          isCompleted
                            ? 'text-gray-400 line-through'
                            : 'text-gray-900 dark:text-white group-hover:text-blue-600',
                        )}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={cn(
                          'text-sm mt-2 font-medium max-w-xl transition-colors',
                          isCompleted
                            ? 'text-gray-300'
                            : 'text-gray-500 dark:text-gray-400',
                        )}
                      >
                        {item.description}
                      </p>
                    </div>

                    <div className="relative z-10 self-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      <PlayCircle className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                );
              })}
            </div>
          </main>

          {/* Sidebar - Performance & Info */}
          <aside className="lg:w-1/3">
            <div className="sticky top-10 space-y-8">
              <div className="bg-white dark:bg-[#1A1A1A] p-8 md:p-10 rounded-4xl border border-gray-100 dark:border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full blur-2xl -mr-16 -mt-16" />

                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 tracking-tight uppercase flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Your Intellect
                </h3>

                <div className="space-y-6">
                  <div className="flex justify-between items-center group/item">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover/item:text-blue-600 transition-colors">
                      Mastery
                    </span>
                    <strong className="text-gray-900 dark:text-white font-black text-sm">
                      {completedItems.length}{' '}
                      <span className="text-gray-400 font-bold ml-1">
                        / {course.curriculum.length} units
                      </span>
                    </strong>
                  </div>
                  <div className="flex justify-between items-center group/item">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover/item:text-blue-600 transition-colors flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Duration
                    </span>
                    <strong className="text-gray-900 dark:text-white font-black text-sm">
                      {Math.round(
                        (progressPercentage * courseDurationValue) / 100,
                      )}{' '}
                      <span className="text-gray-400 font-bold ml-1">
                        hours log
                      </span>
                    </strong>
                  </div>
                  <div className="flex justify-between items-center group/item">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover/item:text-blue-600 transition-colors flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Assessment
                    </span>
                    <strong className="text-gray-900 dark:text-white font-black text-sm">
                      84%{' '}
                      <span className="text-gray-400 font-bold ml-1">
                        average
                      </span>
                    </strong>
                  </div>
                </div>

                <button className="w-full mt-10 px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all uppercase tracking-widest text-xs">
                  Continue Operation
                </button>
              </div>

              <div className="bg-white dark:bg-[#1A1A1A] p-8 rounded-4xl border border-gray-100 dark:border-white/5 shadow-xl flex items-center gap-6">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-4 border-gray-50 dark:border-[#2A2A2A] shadow-lg shrink-0 group">
                  <Image
                    src={owner.avatarUrl}
                    alt={owner.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-blue-600" /> Lead
                    Expert
                  </p>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
                    {owner.name}
                  </h3>
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
