'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import {
  ShieldCheck,
  Globe,
  Users,
  Star,
  MessageSquare,
  Calendar,
  MapPin,
  Grid,
  X,
} from 'lucide-react';
import Link from 'next/link';

export default function InstituteProfilePage() {
  const params = useParams();
  const rawName = params?.name as string;
  const decodedName = rawName ? decodeURIComponent(rawName) : '';

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Lock body scroll when gallery is open
  useEffect(() => {
    if (isGalleryOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [isGalleryOpen]);

  const { institutions, courses, getInstitutionMembers } = useAppContext();

  // Case-insensitive match for the name
  const institution = institutions.find(
    (inst) => inst.name.toLowerCase() === decodedName.toLowerCase(),
  );

  if (!institution) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Institution not found
          </h1>
        </div>
      </div>
    );
  }

  const institutionCourses = courses.filter(
    (c) => c.institutionId === institution.id,
  );
  const members = getInstitutionMembers(institution.id);

  // Calculate some impressive stats
  const totalReviews = institutionCourses.reduce(
    (sum, course) => sum + course.reviewCount,
    0,
  );
  const avgRating =
    institutionCourses.length > 0
      ? (
          institutionCourses.reduce((sum, course) => sum + course.rating, 0) /
          institutionCourses.length
        ).toFixed(1)
      : 'N/A';

  const establishedYear = new Date(institution.createdAt).getFullYear();

  // Get unique categories for the filter pills
  const categories = Array.from(
    new Set(institutionCourses.map((c) => c.category)),
  );
  const currentCategory = activeCategory || categories[0] || '';

  // Filter courses by current category
  const filteredCourses = institutionCourses.filter(
    (c) => c.category === currentCategory,
  );

  return (
    <div className="bg-gray-50 dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] bg-gray-900 flex items-end">
        {/* Placeholder Cover background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-blue-900 via-purple-900 to-black opacity-80 z-10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40 mix-blend-overlay" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pb-12 pt-12">
          <div className="flex flex-col md:flex-row md:items-end gap-8">
            <div className="w-32 h-32 rounded-3xl overflow-hidden bg-white shadow-2xl border-4 border-white/10 shrink-0 relative p-2 flex items-center justify-center">
              <Image
                src={institution.logoUrl}
                alt={institution.name}
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                  {institution.name}
                </h1>
                {institution.isVerified && (
                  <div
                    className="p-2 bg-blue-500 rounded-full mt-2"
                    title="Verified Partner"
                  >
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Content Area */}
          <div className="lg:w-2/3 space-y-16">
            {/* About the Institution */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase mb-6">
                About the{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-600">
                  Institution
                </span>
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                <p>{institution.description}</p>
                {/* For mock purposes, adding some extra dummy text so it feels like a real intro */}
                <p className="mt-4">
                  Welcome to our global learning community. We pride ourselves
                  on creating transformative educational experiences that bridge
                  the gap between theoretical knowledge and practical mastery.
                  Our elite faculty is dedicated to pushing the boundaries of
                  what is possible, ensuring every participant achieves their
                  highest potential.
                </p>
              </div>
            </div>

            {/* Campus & Facilities */}
            {institution.images && institution.images.length > 0 && (
              <div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase mb-6">
                  Campus &{' '}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                    Facilities
                  </span>
                </h2>
                <div className="relative rounded-4xl overflow-hidden shadow-2xl border border-gray-100 dark:border-white/5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[300px] md:h-[400px]">
                    <div className="relative w-full h-full">
                      <Image
                        src={institution.images[0]}
                        alt="Campus Main"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                        onClick={() => setIsGalleryOpen(true)}
                      />
                    </div>
                    {institution.images.length > 1 && (
                      <div className="hidden md:grid grid-cols-2 gap-2 h-full">
                        {institution.images.slice(1, 5).map((img, i) => (
                          <div
                            key={i}
                            className="relative w-full h-full overflow-hidden"
                          >
                            <Image
                              src={img}
                              alt={`Campus Detail ${i + 1}`}
                              fill
                              className="object-cover hover:scale-110 transition-transform duration-700 cursor-pointer"
                              onClick={() => setIsGalleryOpen(true)}
                            />
                            {/* Overlay button on the last image if there are more than 5 photos */}
                            {i === 3 && institution.images!.length > 5 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsGalleryOpen(true);
                                }}
                                className="absolute inset-0 bg-black/40 flex items-center justify-center hover:bg-black/50 transition-colors group"
                              >
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white font-bold text-sm border border-white/20 group-hover:scale-105 transition">
                                  <Grid className="w-4 h-4" />
                                  Show all {institution.images!.length} photos
                                </div>
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Mobile "Show all photos" button */}
                  <button
                    onClick={() => setIsGalleryOpen(true)}
                    className="md:hidden absolute bottom-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur-md text-gray-900 dark:text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border border-gray-200 dark:border-white/10 shadow-lg flex items-center gap-2"
                  >
                    <Grid className="w-4 h-4" />
                    Show all
                  </button>
                </div>
              </div>
            )}

            {/* Facilities & Amenities */}
            {institution.amenities && institution.amenities.length > 0 && (
              <div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase mb-6">
                  Facilities &{' '}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                    Amenities
                  </span>
                </h2>
                <div className="flex flex-wrap gap-3">
                  {institution.amenities.map((amenity, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-2xl shadow-sm"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Faculty & Team */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase mb-8">
                Faculty &{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-600">
                  Team
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {members.map((member) => (
                  <div
                    key={member.userId}
                    className="flex items-center gap-4 p-6 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-3xl shadow-lg hover:shadow-xl transition"
                  >
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 shadow-md">
                      <Image
                        src={member.user.avatarUrl}
                        alt={member.user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                        {member.user.name}
                      </h3>
                      <p className="text-sm text-blue-600 font-bold mb-1">
                        {member.title}
                      </p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exclusive Catalog */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase mb-4">
                Exclusive{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                  Catalog
                </span>
              </h2>
              <p className="text-gray-500 font-medium mb-8 max-w-2xl">
                Explore our carefully curated selection of premium experiences.
                Each program is meticulously designed and delivered by our elite
                faculty to ensure unparalleled quality and real-world impact.
              </p>

              {institutionCourses.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition ${
                        currentCategory === category
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                          : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:border-blue-600 hover:text-blue-600'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}

              {filteredCourses.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {filteredCourses.map((course) => (
                    <Link
                      key={course.id}
                      href={`/course/${course.id}`}
                      className="group flex flex-col sm:flex-row items-center gap-6 p-4 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-4xl hover:shadow-xl transition hover:-translate-y-1"
                    >
                      <div className="relative w-full sm:w-48 h-40 sm:h-32 rounded-2xl overflow-hidden shrink-0">
                        <Image
                          src={course.images[0]}
                          alt={course.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="flex-1 w-full py-2">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-600/10 px-2 py-1 rounded-md">
                            {course.category}
                          </span>
                          <span className="text-[10px] font-bold text-gray-500">
                            {course.level}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {course.tagline}
                        </p>
                      </div>
                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-2 sm:mt-0 gap-2 shrink-0 sm:pr-4">
                        <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-lg">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="font-bold text-yellow-700 dark:text-yellow-500 text-xs">
                            {course.rating.toFixed(1)}
                          </span>
                        </div>
                        <div className="text-lg font-black text-gray-900 dark:text-white mt-1">
                          ${course.price}{' '}
                          <span className="text-[10px] text-gray-400 font-medium">
                            {course.priceUnit === 'Total'
                              ? ''
                              : course.priceUnit}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 font-medium">
                  No courses available currently.
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 p-8 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-[2.5rem] shadow-xl">
              <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-widest mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
                Institution Details
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl shrink-0 text-gray-500">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Status
                    </p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {institution.isVerified ? 'Verified Partner' : 'Standard'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl shrink-0 text-gray-500">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Established
                    </p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      Since {establishedYear}
                    </p>
                  </div>
                </div>

                {institution.location && (
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl shrink-0 text-gray-500">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                        Headquarters
                      </p>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {institution.location}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl shrink-0 text-gray-500">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Faculty Size
                    </p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {members.length} Members
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl shrink-0 text-gray-500">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Global Reach
                    </p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {institutionCourses.length} Active Courses
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl shrink-0 text-gray-500">
                    <Star className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Average Rating
                    </p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {avgRating} Elite Rating
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl shrink-0 text-gray-500">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Global Alumni
                    </p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {(totalReviews * 4).toLocaleString()}+ Graduates
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Image Gallery Modal */}
      {isGalleryOpen && institution.images && (
        <div className="fixed inset-0 z-100 bg-white dark:bg-[#0a0a0a] animate-fade-in flex flex-col">
          <div className="p-6 flex justify-between items-center border-b border-gray-100 dark:border-white/5">
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>
            <div className="font-bold text-gray-900 dark:text-white">
              {institution.images.length} Photos
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 sm:p-10">
            <div className="max-w-4xl mx-auto space-y-8">
              {institution.images.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-white/5"
                >
                  <Image
                    src={img}
                    alt={`Campus Image ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
