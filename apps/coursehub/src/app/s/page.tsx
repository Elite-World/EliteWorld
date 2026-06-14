'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import CourseCard from '@/components/CourseCard';
import SearchMap from '@/components/SearchMap';
import { CourseCategory } from '@/types';
import { geocodeLocation, getDistance } from '@/utils/geo';
import { Filter, Trophy, X, ChevronLeft, ChevronRight, Map, Code, Brush, Briefcase, Languages, Tent, LayoutGrid } from 'lucide-react';
import { MapBounds } from '@/components/SearchMapInner';
import { Drawer } from 'vaul';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const categoryIcons: Record<string, React.ElementType> = {
  'All': LayoutGrid,
  [CourseCategory.SUMMER_CAMP]: Tent,
  [CourseCategory.LANGUAGE]: Languages,
  [CourseCategory.CODING]: Code,
  [CourseCategory.AI]: Map, // Or Brain/Bot if imported, using Map as placeholder
  [CourseCategory.DRAWING]: Brush,
  [CourseCategory.BUSINESS]: Briefcase,
};

function SearchResultsContent() {
  const { courses } = useAppContext();
  const searchParams = useSearchParams();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [snap, setSnap] = useState<number | string | null>(0.5);

  const [filters, setFilters] = useState({
    category: searchParams?.get('category') || 'All',
    price: 500,
    level: 'All',
  });

  const [mapBounds, setMapBounds] = useState<MapBounds | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage, setCoursesPerPage] = useState(10); // Default to 2 cols * 5 rows for SSR

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredCourses = useMemo(() => {
    const result = courses.filter((course) => {
      const categoryMatch =
        filters.category === 'All' || course.category === filters.category;
      const priceMatch = course.price <= Number(filters.price);
      const levelMatch =
        filters.level === 'All' || course.level === filters.level;
      return categoryMatch && priceMatch && levelMatch;
    });

    const whereQuery = searchParams?.get('where');
    let center = { lat: 37.7749, lng: -122.4194 }; // Default to SF

    if (whereQuery) {
      const geocoded = geocodeLocation(whereQuery);
      if (geocoded) {
        center = geocoded;
      }
    }

    // Sort by distance to center
    result.sort((a, b) => {
      const distA = getDistance(
        center.lat,
        center.lng,
        a.coordinates.lat,
        a.coordinates.lng,
      );
      const distB = getDistance(
        center.lat,
        center.lng,
        b.coordinates.lat,
        b.coordinates.lng,
      );
      return distA - distB;
    });

    return result;
  }, [courses, filters, searchParams]);

  const mapFilteredCourses = useMemo(() => {
    if (!mapBounds) return filteredCourses;
    return filteredCourses.filter((course) => {
      // If coordinates are exactly 0,0 they might be Online courses. We skip bounding box check for them or exclude them.
      if (course.coordinates.lat === 0 && course.coordinates.lng === 0)
        return false;
      const { lat, lng } = course.coordinates;
      return (
        lat <= mapBounds.north &&
        lat >= mapBounds.south &&
        lng <= mapBounds.east &&
        lng >= mapBounds.west
      );
    });
  }, [filteredCourses, mapBounds]);

  // Reset to first page when filters or map bounds change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters, mapBounds]);

  // Dynamically calculate courses per page based on window width to strictly maintain 5 rows
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let columns = 2; // Default to 2 columns on mobile
      if (width >= 1280)
        columns = 3; // xl breakpoint

      setCoursesPerPage(columns * 5); // 5 rows max
    };

    // Initial calculation
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * coursesPerPage;
    return mapFilteredCourses.slice(start, start + coursesPerPage);
  }, [mapFilteredCourses, currentPage, coursesPerPage]);

  const totalPages = Math.max(
    1,
    Math.ceil(mapFilteredCourses.length / coursesPerPage),
  );

  // Ensure current page doesn't go out of bounds if resizing changes totalPages
  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const mapCenter = useMemo(() => {
    const whereQuery = searchParams?.get('where');
    if (whereQuery) {
      const geocoded = geocodeLocation(whereQuery);
      if (geocoded) return geocoded;
    }
    // If no geocode match but we have courses, center on the first course's coords
    if (
      filteredCourses.length > 0 &&
      filteredCourses[0].coordinates.lat !== 0
    ) {
      return filteredCourses[0].coordinates;
    }
    return { lat: 37.7749, lng: -122.4194 };
  }, [searchParams, filteredCourses]);

  const isDesktop = useMediaQuery('(min-width: 1024px)'); // lg breakpoint

  // Lock body scroll on mobile so the background page doesn't scroll behind the map
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!isDesktop) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    return () => {
      if (typeof window !== 'undefined') document.body.style.overflow = '';
    };
  }, [isDesktop]);

  const renderCardsContent = () => (
    <>
      <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
        {mapFilteredCourses.length} experiences within map area
      </h1>

      <main className="w-full grow">
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-10">
          {paginatedCourses.length > 0 ? (
            paginatedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <div className="col-span-full py-32 text-center border-2 border-dashed border-gray-200 dark:border-white/10 rounded-4xl bg-white/50 dark:bg-white/2">
              <Trophy className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
              <p className="text-gray-500 font-bold uppercase tracking-widest">
                No experiences match your criteria.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12 mb-8">
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
            disabled={currentPage === 1}
            className="p-2 rounded-full border border-gray-200 dark:border-white/10 text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full text-sm font-bold transition ${currentPage === page ? 'bg-gray-900 text-white dark:bg-white dark:text-black shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'}`}
              >
                {page}
              </button>
            ),
          )}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 rounded-full border border-gray-200 dark:border-white/10 text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  );

  return (
    <div className="bg-gray-50 dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300">
      {/* Filters Bar: Visually acts as an extension of the Navbar */}
      <div className="bg-white dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-white/5 shadow-sm sticky top-16 z-40 pt-4 pb-3">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row justify-between items-center gap-4">
            <div className="flex-1 min-w-0 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-3 w-max pr-4">
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, category: 'All' }))}
                  className={`px-4 py-2.5 sm:px-6 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition flex items-center justify-center ${filters.category === 'All' ? 'bg-gray-900 text-white dark:bg-white dark:text-black shadow-md' : 'bg-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10'}`}
                >
                  <span className="sm:hidden block"><LayoutGrid className="w-5 h-5" /></span>
                  <span className="hidden sm:block">All</span>
                </button>
                {Object.values(CourseCategory).map((cat) => {
                  const Icon = categoryIcons[cat];
                  return (
                    <button
                      key={cat}
                      onClick={() => setFilters((prev) => ({ ...prev, category: cat }))}
                      className={`px-4 py-2.5 sm:px-6 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition whitespace-nowrap flex items-center justify-center ${filters.category === cat ? 'bg-gray-900 text-white dark:bg-white dark:text-black shadow-md' : 'bg-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10'}`}
                    >
                      <span className="sm:hidden block">{Icon && <Icon className="w-5 h-5" />}</span>
                      <span className="hidden sm:block">{cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="shrink-0 flex items-center bg-white dark:bg-[#1A1A1A] sticky right-0">
              <button
                onClick={() => setIsFilterModalOpen(true)}
                className="flex items-center justify-center p-2.5 sm:px-6 sm:py-2.5 bg-white dark:bg-[#1A1A1A] rounded-full border border-gray-200 dark:border-white/10 shadow-sm hover:border-blue-500/50 transition"
              >
                <Filter className="w-5 h-5 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-300" />
                <span className="hidden sm:inline-block ml-2 text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-300">
                  Filters
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`container mx-auto py-6 relative ${!isDesktop ? 'px-0 h-[calc(100vh-129px)] overflow-hidden' : 'px-4 sm:px-6 lg:px-8'}`}>
        <div className="flex gap-8 h-full">
          {isDesktop ? (
            <>
              {/* DESKTOP LAYOUT */}
              {/* Left Pane: Cards */}
              <div className="flex-1 min-w-0 flex flex-col">
                {renderCardsContent()}
              </div>

              {/* Right Pane: Sticky Map */}
              <div className="w-[45%] shrink-0 pb-8">
                <div className="sticky top-[155px] h-[calc(100vh-185px)]">
                  <SearchMap
                    courses={filteredCourses}
                    center={mapCenter}
                    onBoundsChange={setMapBounds}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* MOBILE LAYOUT */}
              {/* Map as fixed full background below filter bar */}
              <div className="fixed inset-0 top-[129px] z-0">
                <SearchMap
                  courses={filteredCourses}
                  center={mapCenter}
                  onBoundsChange={setMapBounds}
                  isMobileMode={true}
                />
              </div>

              {/* Vaul Bottom Sheet Drawer for Cards */}
              <Drawer.Root
                snapPoints={[0.15, 0.5, 1]}
                activeSnapPoint={snap}
                setActiveSnapPoint={setSnap}
                open={true}
                dismissible={false}
                modal={false}
              >
                <Drawer.Portal>
                  <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-[32px] bg-white dark:bg-[#1A1A1A] outline-none shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.7)] border border-gray-200 dark:border-white/10 h-full max-h-[calc(100vh-129px)] pointer-events-auto">
                    <Drawer.Title className="sr-only">Experiences in map area</Drawer.Title>
                    {/* Drawer Handle fixed at top */}
                    <div 
                      className="pt-4 pb-2 bg-white dark:bg-[#1A1A1A] rounded-t-[32px] shrink-0 cursor-grab active:cursor-grabbing"
                      onClick={() => {
                        if (snap === 0.15) setSnap(0.5);
                        else if (snap === 0.5) setSnap(1);
                        else setSnap(0.15);
                      }}
                    >
                      <div className="mx-auto w-12 h-1.5 rounded-full bg-gray-300 dark:bg-white/20 hover:bg-gray-400 transition-colors" />
                    </div>
                    {/* Scrollable content below handle */}
                    <div className="flex-1 px-6 pb-6 flex flex-col overflow-y-auto">
                      {renderCardsContent()}
                    </div>
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer.Root>
            </>
          )}
        </div>
      </div>

      {/* Slide-out / Modal for Filters */}
      <div
        className={`fixed inset-0 z-50 flex justify-end transition duration-500 ${isFilterModalOpen ? 'visible' : 'invisible pointer-events-none'}`}
      >
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${isFilterModalOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsFilterModalOpen(false)}
        />
        <div
          className={`relative w-full max-w-md bg-white dark:bg-[#1A1A1A] h-full shadow-2xl p-8 overflow-y-auto border-l border-white/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isFilterModalOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
              Advanced <span className="text-blue-600">Filters</span>
            </h2>
            <button
              onClick={() => setIsFilterModalOpen(false)}
              className="p-2 bg-gray-100 dark:bg-white/5 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-10">
            <div>
              <div className="flex justify-between items-center mb-6">
                <label
                  htmlFor="price"
                  className="block text-xs font-bold text-gray-400 uppercase tracking-widest"
                >
                  Max Investment
                </label>
                <span className="text-blue-600 font-black text-lg bg-blue-600/10 px-4 py-1 rounded-full">
                  ${filters.price}
                </span>
              </div>
              <input
                type="range"
                id="price"
                name="price"
                min="0"
                max="500"
                value={filters.price}
                onChange={handleFilterChange}
                className="w-full h-2 bg-gray-100 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400">
                <span>$0</span>
                <span>$500+</span>
              </div>
            </div>

            <div>
              <label
                htmlFor="level"
                className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4"
              >
                Difficulty Level
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['All', 'Beginner', 'Intermediate', 'Advanced'].map(
                  (level) => (
                    <button
                      key={level}
                      onClick={() => setFilters((prev) => ({ ...prev, level }))}
                      className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-widest transition border ${filters.level === level ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-transparent border-gray-200 dark:border-white/10 text-gray-500 hover:border-blue-500/50'}`}
                    >
                      {level}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-white dark:from-[#1A1A1A] to-transparent">
            <button
              onClick={() => setIsFilterModalOpen(false)}
              className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest rounded-2xl shadow-xl hover:scale-[1.02] transition-transform"
            >
              Show {filteredCourses.length} Experiences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]" />}
    >
      <SearchResultsContent />
    </Suspense>
  );
}
