'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import {
  Star,
  Clock,
  ShieldCheck,
  ChevronRight,
  Heart,
  Globe,
  Award,
  BookOpen,
  ArrowLeft,
  Share2,
  Users,
} from 'lucide-react';
import { cn } from '@repo/domain';
import Link from 'next/link';

const StarIcon = ({ filled = true, className = '' }) => (
  <Star
    className={cn(
      'w-4 h-4',
      filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300',
      className,
    )}
  />
);

const CourseDetailPage: React.FC = () => {
  const params = useParams();
  const courseId = params?.courseId as string;
  const {
    courses,
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
    <div className="bg-gray-50 dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-3xl">
            <Link
              href="/search"
              className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors mb-6"
            >
              <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
              Return to Catalog
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-blue-600" />
              <div className="px-2 py-0.5 rounded-md bg-blue-600/10 border border-blue-600/20">
                <span className="text-[8px] font-black uppercase tracking-widest text-blue-600">
                  Premium Education Tier
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight mb-6">
              {course.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                {course.title.split(' ').slice(-1)}
              </span>
            </h1>

            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                  <StarIcon />
                  <span className="text-[11px] font-black text-yellow-700 dark:text-yellow-500">
                    {course.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  ({course.reviewCount} Reviews)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-gray-100 dark:border-white/5">
                  <Image
                    src={owner.avatarUrl}
                    alt={owner.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                    Architect
                  </p>
                  <p className="text-[11px] font-black text-blue-600 dark:text-blue-400 leading-none">
                    {owner.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-white/5">
                  <Globe className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                    Availability
                  </p>
                  <p className="text-[11px] font-black text-gray-900 dark:text-white leading-none uppercase tracking-tighter">
                    Global Access
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-4 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 text-gray-400 hover:text-blue-600">
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() =>
                isInWishlist(course.id)
                  ? removeFromWishlist(course.id)
                  : addToWishlist(course.id)
              }
              className={cn(
                'p-4 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1',
                isInWishlist(course.id)
                  ? 'text-red-500'
                  : 'text-gray-400 hover:text-red-500',
              )}
            >
              <Heart
                className="w-5 h-5"
                fill={isInWishlist(course.id) ? 'currentColor' : 'none'}
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:h-[600px] mb-20">
          <div className="md:col-span-2 relative rounded-[3rem] overflow-hidden group shadow-2xl">
            <Image
              src={course.images[0]}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60" />
            <div className="absolute bottom-10 left-10">
              <div className="px-4 py-1.5 rounded-full bg-blue-600/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                Primary Visualization
              </div>
            </div>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {course.images.slice(1, 5).map((img, index) => (
              <div
                key={index}
                className="relative rounded-4xl overflow-hidden group shadow-xl"
              >
                <Image
                  src={img}
                  alt={`${course.title} ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#0a0a0a]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3">
            {/* Description */}
            <div className="pb-16 mb-16 border-b border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h2 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">
                  Scope of Intelligence
                </h2>
              </div>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg font-medium">
                {course.description}
              </p>
            </div>

            {/* Core Competencies */}
            <div className="pb-16 mb-16 border-b border-gray-100 dark:border-white/5">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase mb-10">
                Strategic{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                  Objectives
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {course.whatYouWillLearn.map((item, index) => (
                  <div
                    key={index}
                    className="group flex gap-4 p-6 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-3xl hover:border-blue-500/30 transition-all hover:shadow-xl"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-600/5 text-blue-600 flex items-center justify-center font-black text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      0{index + 1}
                    </div>
                    <span className="text-gray-600 dark:text-gray-300 font-bold text-sm leading-snug self-center">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pb-16 mb-16 border-b border-gray-100 dark:border-white/5">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase mb-10">
                Elite{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-600">
                  Curriculum
                </span>
              </h2>
              <div className="space-y-6">
                {course.curriculum.map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between p-8 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-4xl hover:border-blue-500/50 transition-all hover:shadow-2xl overflow-hidden relative"
                  >
                    <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-8 pr-12">
                      <div className="text-4xl font-black text-gray-100 dark:text-white/5 group-hover:text-blue-600/10 transition-colors uppercase tracking-tighter">
                        M{index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors uppercase tracking-tight mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 p-3 rounded-full bg-gray-50 dark:bg-white/5 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:translate-x-2">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor */}
            <div className="py-10 border-b border-gray-100 dark:border-white/5">
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                Global Expert
              </h2>
              <div className="p-8 rounded-3xl bg-linear-to-br from-blue-600/5 to-purple-600/5 border border-blue-500/10 dark:border-white/5">
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-xl">
                    <Image
                      src={owner.avatarUrl}
                      alt={owner.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {owner.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <StarIcon />
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        {course.rating.toFixed(1)} Expert Rating
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                  {owner.bio}
                </p>
              </div>
            </div>

            <div className="pb-16 mb-16 border-b border-gray-100 dark:border-white/5">
              <div className="flex items-end justify-between mb-12">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">
                  Peer{' '}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                    Intelligence
                  </span>
                </h2>
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)] animate-pulse" />
                  <span className="text-[8px] font-black uppercase text-blue-600">
                    Live Feedback
                  </span>
                </div>
              </div>

              <div className="space-y-8">
                {course.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="group p-8 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-4xl hover:shadow-2xl transition-all"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-5">
                        <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-white dark:border-gray-800 shadow-xl group-hover:scale-110 transition-transform">
                          <Image
                            src={review.authorAvatarUrl}
                            alt={review.authorName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">
                            {review.authorName}
                          </p>
                          <p className="text-[10px] font-black text-gray-400 uppercase mt-1">
                            {review.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed italic border-l-4 border-blue-600/20 pl-6">
                      &quot;{review.comment}&quot;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-24 p-10 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-[3.5rem] shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/5 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-blue-600/10 transition-all duration-700" />

              <div className="relative z-10 text-center mb-10">
                <div className="text-6xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">
                  ${course.price}
                </div>
                <div className="px-3 py-1 inline-block bg-blue-600/10 rounded-lg border border-blue-600/20">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
                    Total Investment Access
                  </span>
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                <button className="w-full group/btn relative bg-[#0a0a0a] dark:bg-white text-white dark:text-black font-black py-5 rounded-3xl shadow-2xl hover:scale-[1.02] transition-all active:scale-95 overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  <span className="relative z-10 uppercase tracking-widest text-xs">
                    Authorize Enrollment
                  </span>
                </button>

                <div className="grid grid-cols-2 gap-4 pb-8 border-b border-gray-100 dark:border-white/5">
                  <div className="p-4 rounded-3xl bg-gray-50 dark:bg-white/5 flex flex-col items-center">
                    <Clock className="w-5 h-5 text-blue-600 mb-3" />
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                      Timeframe
                    </p>
                    <p className="text-xs font-black text-gray-900 dark:text-white">
                      {course.duration}
                    </p>
                  </div>
                  <div className="p-4 rounded-3xl bg-gray-50 dark:bg-white/5 flex flex-col items-center">
                    <ShieldCheck className="w-5 h-5 text-purple-600 mb-3" />
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                      Assurance
                    </p>
                    <p className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                      Elite Grade
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { text: 'Institutional Grade Certification', icon: Award },
                    { text: 'Immediate Global Telemetry Access', icon: Globe },
                    { text: 'Private Intelligence Network', icon: Users },
                  ].map((perk, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-600/20" />
                      {perk.text}
                    </div>
                  ))}
                </div>

                <div className="text-center pt-8">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] leading-loose max-w-[200px] mx-auto">
                    Vetted Tier 1 Experience Protocol Validated
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
