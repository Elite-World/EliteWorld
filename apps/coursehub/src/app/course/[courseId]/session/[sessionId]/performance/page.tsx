'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import {
  ArrowLeft,
  Users,
  BarChart3,
  Star,
  MessageSquare,
  Trophy,
  Activity,
  Award,
} from 'lucide-react';
import { cn } from '@repo/domain';

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
    icon: React.ElementType;
    title: string;
    value: string;
    trend?: string;
    variant: 'blue' | 'purple' | 'emerald';
  }> = ({ icon: Icon, title, value, trend, variant }) => (
    <div className="bg-white dark:bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl relative overflow-hidden group">
      <div
        className={cn(
          'absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl -mr-12 -mt-12 transition duration-500',
          variant === 'blue'
            ? 'bg-blue-600/5 group-hover:bg-blue-600/10'
            : variant === 'purple'
              ? 'bg-purple-600/5 group-hover:bg-purple-600/10'
              : 'bg-emerald-600/5 group-hover:bg-emerald-600/10',
        )}
      />

      <div className="flex items-center gap-6 relative z-10">
        <div
          className={cn(
            'p-4 rounded-2xl shadow-inner transition-transform group-hover:scale-110 duration-500',
            variant === 'blue'
              ? 'bg-blue-600/10 text-blue-600'
              : variant === 'purple'
                ? 'bg-purple-600/10 text-purple-600'
                : 'bg-emerald-600/10 text-emerald-600',
          )}
        >
          <Icon className="w-8 h-8" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
            {title}
          </p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
              {value}
            </p>
            {trend && (
              <span className="text-[10px] font-bold text-emerald-500 mb-1 leading-none">
                {trend}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <Link
              href={`/course/${courseId}/manage`}
              className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors mb-4"
            >
              <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
              Return to Parameters
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-6 h-6 text-blue-600" />
              <div className="px-2 py-0.5 rounded-md bg-blue-600/10 border border-blue-600/20">
                <span className="text-[8px] font-black uppercase tracking-widest text-blue-600">
                  Operational Intelligence
                </span>
              </div>
            </div>
            <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight">
              Session{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                Insights
              </span>
            </h1>
            <p className="text-gray-500 font-medium mt-1 uppercase tracking-[0.2em] text-[10px]">
              {session.title} &middot; {session.date}
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-4 p-4 bg-white dark:bg-[#1A1A1A] rounded-4xl border border-gray-100 dark:border-white/5 shadow-xl">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-xl border-4 border-white dark:border-[#1A1A1A] bg-gray-200 dark:bg-white/5 overflow-hidden shadow-sm"
                >
                  <div className="w-full h-full bg-linear-to-br from-blue-600/20 to-purple-600/20" />
                </div>
              ))}
            </div>
            <div className="pr-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Active Cohort
              </p>
              <p className="text-sm font-black text-gray-900 dark:text-white">
                {performance?.totalAttendees || 0} Registered
              </p>
            </div>
          </div>
        </div>

        {!performance ? (
          <div className="bg-white dark:bg-[#1A1A1A] p-20 rounded-[3rem] border border-dashed border-gray-200 dark:border-white/10 shadow-xl text-center">
            <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-gray-100 dark:border-white/5">
              <Activity className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight uppercase mb-4">
              Awaiting Signal
            </h2>
            <p className="text-gray-500 font-medium max-w-md mx-auto">
              Performance telemetry for this session is not yet synchronized.
              Operation data will populate upon mission completion.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <StatCard
                icon={Users}
                title="Attendance Rate"
                value={`${attendanceRate.toFixed(1)}%`}
                trend="+12.4% vs prev"
                variant="blue"
              />
              <StatCard
                icon={Trophy}
                title="Prestige Rating"
                value={`${performance.averageRating.toFixed(1)} / 5`}
                trend="Platinum Tier"
                variant="purple"
              />
              <StatCard
                icon={Activity}
                title="Engagement Score"
                value={`${performance.engagementScore} / 100`}
                trend="High Intensity"
                variant="emerald"
              />
            </div>

            {/* Engagement Chart & Feedback */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 bg-white dark:bg-[#1A1A1A] p-10 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">
                      Intensity Mapping
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                    <span className="text-[8px] font-black uppercase text-blue-600">
                      Live Telemetry
                    </span>
                  </div>
                </div>

                <div className="h-80 flex items-end justify-around gap-2 px-4 pb-4 border-b border-gray-100 dark:border-white/5 relative">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-4 opacity-50">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-full border-t border-gray-100 dark:border-white/5"
                      />
                    ))}
                  </div>

                  {performance.engagementData.map((value, index) => (
                    <div key={index} className="grow group/bar relative">
                      <div
                        className="w-full bg-linear-to-t from-blue-600/40 to-blue-600 group-hover/bar:from-blue-600 group-hover/bar:to-purple-600 transition duration-500 rounded-2xl shadow-lg relative z-10"
                        style={{ height: `${value}%` }}
                      >
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-black px-2 py-1 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                          {value}% Intensity
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6 px-4">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Protocol Initiation
                  </span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Mission Complete
                  </span>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1A1A1A] p-10 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-2xl relative overflow-hidden flex flex-col">
                <div className="flex items-center gap-3 mb-10">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">
                    Intel Feed
                  </h3>
                </div>

                <ul className="space-y-6 overflow-y-auto pr-2 custom-scrollbar grow">
                  {performance.feedback.map((fb, index) => {
                    const author = allUsers.find((u) => u.id === fb.authorId);
                    return (
                      <li
                        key={index}
                        className="group p-5 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5 hover:border-blue-500/30 transition"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm group-hover:scale-110 transition-transform">
                              {author?.avatarUrl && (
                                <Image
                                  src={author.avatarUrl}
                                  alt={author.name || ''}
                                  fill
                                  className="object-cover"
                                />
                              )}
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-tight leading-none mb-1">
                                {author?.name}
                              </p>
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <Star
                                    key={s}
                                    className={cn(
                                      'w-2 h-2',
                                      s <= fb.rating
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-gray-300',
                                    )}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 leading-relaxed italic">
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
