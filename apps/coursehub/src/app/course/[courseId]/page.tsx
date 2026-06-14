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
  Share2,
  Users,
  X,
  MapPin,
  MonitorPlay,
  MessageCircle,
  Infinity,
  FileBadge,
  Calendar as CalendarIcon,
} from 'lucide-react';
import { cn } from '@repo/domain';
import Link from 'next/link';
import SearchMap from '@/components/SearchMap';

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
    getInstitution,
  } = useAppContext();
  const course = courses.find((c) => c.id === courseId);
  const institution = course ? getInstitution(course.institutionId) : undefined;

  const [isGalleryOpen, setIsGalleryOpen] = React.useState(false);
  const [showStickyNav, setShowStickyNav] = React.useState(false);
  const [expandedModule, setExpandedModule] = React.useState<number | null>(null);
  const [selectedSession, setSelectedSession] = React.useState<string>(
    course?.sessions && course.sessions.length > 0 ? course.sessions[0].id : ''
  );

  React.useEffect(() => {
    const handleScroll = () => {
      setShowStickyNav(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ensure body scroll is locked when gallery is open
  React.useEffect(() => {
    if (isGalleryOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [isGalleryOpen]);

  if (!course || !institution) {
    return (
      <div className="container mx-auto p-8 text-center">Course or Institution not found.</div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300 relative">
      {/* Secondary Sticky Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 shadow-sm transition-transform duration-300 ${showStickyNav ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="hidden sm:block">
            <h2 className="text-lg font-black text-gray-900 dark:text-white truncate max-w-xl">
              {course.title}
            </h2>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1">
                <StarIcon className="w-3 h-3" />
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                  {course.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                ({course.reviewCount} reviews)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6 ml-auto">
            <div className="text-right hidden md:block">
              <div className="text-sm text-gray-500 font-bold uppercase tracking-widest">
                Investment
              </div>
              <div className="text-xl font-black text-gray-900 dark:text-white leading-none">
                ${course.price}
              </div>
            </div>
            <button className="px-6 py-3 bg-[#FF385C] hover:bg-[#D70466] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 text-sm uppercase tracking-wider">
              Authorize
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-3xl">
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
                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-gray-100 dark:border-white/5 bg-white">
                  <Image
                    src={institution.logoUrl}
                    alt={institution.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">
                  {institution.name}
                </span>
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:h-[600px] mb-20 relative">
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
            {course.images.length > 1 ? (
              course.images.slice(1, 5).map((img, index) => (
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
              ))
            ) : (
              // Fallbacks if only 1 image exists to keep grid layout intact
              ([...Array(4)].map((_, index) => (
                <div
                  key={`fallback-${index}`}
                  className="relative rounded-4xl overflow-hidden group shadow-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center border border-gray-200 dark:border-white/10"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse" />
                </div>
              )))
            )}
          </div>
          <button
            onClick={() => setIsGalleryOpen(true)}
            className="absolute bottom-6 right-6 px-6 py-3 bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl font-bold text-gray-900 dark:text-white hover:scale-105 active:scale-95 transition-all z-10 flex items-center gap-2 text-sm"
          >
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-white" />
              <div className="w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-white" />
              <div className="w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-white" />
            </div>
            Show all photos
          </button>
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

            {/* Premium Amenities */}
            <div className="pb-16 mb-16 border-b border-gray-100 dark:border-white/5">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase mb-8">
                Premium{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-600">
                  Amenities
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: 'Verified Certification', icon: FileBadge, desc: 'Institutional grade credentials' },
                  { title: 'On-Demand Video', icon: MonitorPlay, desc: 'Access high-quality lectures anytime' },
                  { title: 'Private Community Access', icon: MessageCircle, desc: 'Network with global peers' },
                  { title: 'Lifetime Access', icon: Infinity, desc: 'Continuous updates to curriculum' },
                ].map((amenity, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl shrink-0 text-blue-600">
                      <amenity.icon className="w-6 h-6 stroke-[1.5px]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{amenity.title}</h4>
                      <p className="text-xs text-gray-500 font-medium">{amenity.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
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
                    className="group border border-gray-100 dark:border-white/5 rounded-4xl bg-white dark:bg-[#1A1A1A] overflow-hidden transition-all hover:border-blue-500/50 hover:shadow-xl"
                  >
                    <button
                      onClick={() => setExpandedModule(expandedModule === index ? null : index)}
                      className="w-full flex items-center justify-between p-8 text-left relative"
                    >
                      <div className={`absolute top-0 left-0 w-2 h-full transition-colors ${expandedModule === index ? 'bg-blue-600' : 'bg-transparent group-hover:bg-blue-600/50'}`} />
                      <div className="flex items-center gap-8 pr-12">
                        <div className={`text-4xl font-black transition-colors uppercase tracking-tighter ${expandedModule === index ? 'text-blue-600' : 'text-gray-100 dark:text-white/5 group-hover:text-blue-600/10'}`}>
                          M{index + 1}
                        </div>
                        <h3 className={`text-lg font-black uppercase tracking-tight transition-colors ${expandedModule === index ? 'text-blue-600' : 'text-gray-900 dark:text-white group-hover:text-blue-600'}`}>
                          {item.title}
                        </h3>
                      </div>
                      <div className={`shrink-0 p-3 rounded-full transition-all transform ${expandedModule === index ? 'bg-blue-600 text-white rotate-90' : 'bg-gray-50 dark:bg-white/5 group-hover:bg-blue-600/10'}`}>
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedModule === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="p-8 pt-0 pl-[104px]">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl">
                          {item.description}
                        </p>
                        <div className="mt-6 flex items-center gap-4">
                          <div className="flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-lg">
                            <MonitorPlay className="w-3.5 h-3.5 text-blue-600" />
                            Video Lecture
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-lg">
                            <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                            Reading Material
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Institute Profile */}
            <div className="py-10 border-b border-gray-100 dark:border-white/5">
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                Elite Institution
              </h2>
              <div className="p-8 rounded-3xl bg-linear-to-br from-blue-600/5 to-purple-600/5 border border-blue-500/10 dark:border-white/5">
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-xl bg-white border border-gray-100 dark:border-white/10 flex items-center justify-center p-2">
                    <Image
                      src={institution.logoUrl}
                      alt={institution.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {institution.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                          {institution.isVerified ? 'Verified Partner' : 'Partner'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                  {institution.description}
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <Link href={`/institute/${encodeURIComponent(institution.name)}`} className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-2">
                    View Institution Profile <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Location / Venue */}
            <div className="py-10 border-b border-gray-100 dark:border-white/5">
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                Where you&apos;ll be
              </h2>
              <div className="h-[300px] w-full rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-inner mb-6 relative">
                <SearchMap 
                  courses={[course]} 
                  center={course.coordinates}
                />
                <div className="absolute inset-0 pointer-events-none rounded-3xl shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] z-10" />
              </div>
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white shrink-0 mt-1">
                  <MapPin className="w-6 h-6 stroke-[1.5px]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{course.location}</h3>
                  <p className="text-sm text-gray-500 mt-1 max-w-lg leading-relaxed">
                    Exact location details and entry protocols will be securely transmitted upon successful authorization of your enrollment.
                  </p>
                </div>
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
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Select Availability</span>
                  </div>
                  {course.sessions && course.sessions.length > 0 ? (
                    <select
                      value={selectedSession}
                      onChange={(e) => setSelectedSession(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-3 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      {course.sessions.map((session) => (
                        <option key={session.id} value={session.id} className="dark:bg-[#1A1A1A]">
                          {session.date} • {session.time}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-3 text-sm font-bold text-gray-900 dark:text-white flex items-center justify-between">
                      <span>Ongoing Enrollment</span>
                      <span className="text-[10px] bg-green-500/10 text-green-600 px-2 py-1 rounded-md uppercase tracking-wider">Available</span>
                    </div>
                  )}
                </div>

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
      {/* Full Screen Image Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-100 bg-white dark:bg-[#0a0a0a] animate-fade-in flex flex-col">
          <div className="p-6 flex justify-between items-center border-b border-gray-100 dark:border-white/5">
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>
            <div className="font-bold text-gray-900 dark:text-white">
              {course.images.length} Photos
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 sm:p-10">
            <div className="max-w-4xl mx-auto space-y-8">
              {course.images.map((img, i) => (
                <div key={i} className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-white/5">
                  <Image src={img} alt={`Gallery Image ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;
