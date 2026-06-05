'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Building2,
  Plus,
  Minus,
  Calendar,
  X,
  ArrowLeft,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface MobileSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabState = 'where' | 'when' | 'who';

export default function MobileSearchModal({
  isOpen,
  onClose,
}: MobileSearchModalProps) {
  const [activeTab, setActiveTab] = useState<TabState>('where');
  const [whenTab, setWhenTab] = useState<'dates' | 'flexible'>('dates');
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Reset tab to where on open
  useEffect(() => {
    if (isOpen) {
      setActiveTab('where');
      setIsSearchFocused(false);
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearch = () => {
    onClose();
    router.push('/s');
  };

  const handleClearAll = () => {
    setAdults(0);
    setChildren(0);
  };

  return (
    <div className="fixed inset-0 z-100 bg-gray-100/50 dark:bg-[#111111]/80 backdrop-blur-md animate-fade-in flex flex-col">
      {/* Content */}
      <div
        className={`flex-1 overflow-y-auto ${isSearchFocused ? 'bg-white dark:bg-[#222222] px-4 pt-14 pb-6' : 'px-4 pb-24'}`}
      >
        {/* Header Close Button */}
        {!isSearchFocused && (
          <div className="flex justify-end pt-12 pb-4">
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white dark:bg-[#222222] rounded-full border border-gray-200 dark:border-white/10 shadow-sm flex items-center justify-center text-gray-900 dark:text-white hover:scale-105 transition-transform"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="space-y-3">
          {/* WHERE */}
          {activeTab === 'where' ? (
            <div
              className={`${!isSearchFocused ? 'bg-white dark:bg-[#222222] rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-white/5' : ''} animate-fade-in`}
            >
              {!isSearchFocused && (
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Where?
                </h2>
              )}

              <div className="flex items-center gap-3 w-full bg-white dark:bg-[#111111] border border-gray-300 dark:border-white/10 rounded-2xl py-3 px-4 shadow-sm mb-6">
                {isSearchFocused ? (
                  <button
                    onClick={() => {
                      setIsSearchFocused(false);
                      inputRef.current?.blur();
                    }}
                    className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-center shrink-0 -ml-2"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-900 dark:text-white" />
                  </button>
                ) : (
                  <Search className="w-5 h-5 text-gray-900 dark:text-white shrink-0" />
                )}
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search destinations"
                  className="w-full bg-transparent focus:outline-none text-[15px] text-gray-900 dark:text-white placeholder-gray-500"
                  onFocus={() => setIsSearchFocused(true)}
                />
              </div>

              {isSearchFocused && (
                <>
                  <div className="text-[13px] font-bold text-gray-800 dark:text-gray-200 mb-2 px-1">
                    Recent searches
                  </div>
                  <div className="flex items-center gap-4 py-3 mb-6 px-1">
                    <div className="w-12 h-12 bg-white border border-gray-200 dark:border-white/10 dark:bg-white/5 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                      <Building2 className="w-6 h-6 text-green-600 dark:text-green-400 stroke-[1.5px]" />
                    </div>
                    <div>
                      <div className="font-bold text-[15px] text-gray-900 dark:text-white">
                        Tokyo
                      </div>
                      <div className="text-[13px] text-gray-500 dark:text-gray-400">
                        10–12 Jun · 2 guests
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="text-[13px] font-bold text-gray-800 dark:text-gray-200 mb-4 px-1">
                Suggested destinations
              </div>
              <div className="space-y-1">
                {[
                  {
                    city: 'Bangkok, Thailand',
                    desc: 'For sights like Grand Palace',
                  },
                  {
                    city: 'London, United Kingdom',
                    desc: 'For its bustling nightlife',
                  },
                  {
                    city: 'Kyoto, Japan',
                    desc: 'Guests interested in Tokyo also looked here',
                  },
                  { city: 'Chiang Mai, Thailand', desc: 'For nature lovers' },
                  ...(isSearchFocused
                    ? [
                        {
                          city: 'Osaka, Japan',
                          desc: 'Guests interested in Tokyo also looked here',
                        },
                        {
                          city: 'Paris, France',
                          desc: 'For sights like Eiffel Tower',
                        },
                        {
                          city: 'Pattaya City, Thailand',
                          desc: 'Popular beach destination',
                        },
                        {
                          city: 'Kuala Lumpur, Malaysia',
                          desc: 'For its stunning architecture',
                        },
                      ]
                    : []),
                ].map((loc, i) => (
                  <div
                    key={loc.city}
                    className="flex items-center gap-4 py-3 cursor-pointer px-1"
                  >
                    <div
                      className={`w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-gray-100 dark:border-white/5`}
                    >
                      <Building2
                        className={`w-6 h-6 ${i % 3 === 0 ? 'text-green-600' : i % 3 === 1 ? 'text-orange-800' : 'text-blue-500'} stroke-[1.5px]`}
                      />
                    </div>
                    <div>
                      <div className="font-bold text-[15px] text-gray-900 dark:text-white">
                        {loc.city}
                      </div>
                      <div className="text-[13px] text-gray-500 dark:text-gray-400">
                        {loc.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            !isSearchFocused && (
              <button
                onClick={() => setActiveTab('where')}
                className="w-full bg-white dark:bg-[#222222] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-white/5 flex justify-between items-center"
              >
                <span className="text-gray-500 dark:text-gray-400 font-medium">
                  Where
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  I&apos;m flexible
                </span>
              </button>
            )
          )}

          {/* WHEN */}
          {!isSearchFocused && activeTab === 'when' ? (
            <div className="bg-white dark:bg-[#222222] rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-white/5 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                When?
              </h2>

              <div className="bg-gray-100 dark:bg-[#111111] rounded-full p-1 flex items-center mb-6">
                <button
                  onClick={() => setWhenTab('dates')}
                  className={`flex-1 py-2 rounded-full text-[14px] font-semibold transition-colors ${whenTab === 'dates' ? 'bg-white dark:bg-[#333] shadow text-gray-900 dark:text-white' : 'text-gray-500'}`}
                >
                  Dates
                </button>
                <button
                  onClick={() => setWhenTab('flexible')}
                  className={`flex-1 py-2 rounded-full text-[14px] font-semibold transition-colors ${whenTab === 'flexible' ? 'bg-white dark:bg-[#333] shadow text-gray-900 dark:text-white' : 'text-gray-500'}`}
                >
                  Flexible
                </button>
              </div>

              {whenTab === 'dates' ? (
                <div className="w-full">
                  {/* Simplified Mobile Calendar View */}
                  <div className="text-center font-bold text-[15px] text-gray-900 dark:text-white mb-4">
                    June 2026
                  </div>
                  <div className="grid grid-cols-7 gap-y-4 text-center text-xs font-semibold text-gray-400 mb-2">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                      <div key={`m-day-${i}`}>{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-y-2 text-center text-[15px] font-semibold text-gray-900 dark:text-white">
                    <div className="py-2 text-gray-300 dark:text-gray-600 line-through">
                      31
                    </div>
                    {[...Array(30)].map((_, i) => (
                      <div key={`m-june-${i}`} className="py-2 cursor-pointer">
                        {i + 1}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mt-6 pb-2">
                    {['Exact dates', '± 1 day', '± 2 days', '± 3 days'].map(
                      (btn, i) => (
                        <button
                          key={btn}
                          className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold border ${i === 0 ? 'border-gray-900 text-gray-900 dark:border-white dark:text-white' : 'border-gray-200 text-gray-500'}`}
                        >
                          {btn}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-full pb-2">
                  <h3 className="font-bold text-[15px] text-gray-900 dark:text-white mb-4">
                    Go anytime
                  </h3>
                  <div className="flex gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pr-4 pb-2">
                    {[
                      'June',
                      'July',
                      'August',
                      'September',
                      'October',
                      'November',
                    ].map((month, i) => (
                      <div
                        key={month}
                        className={`shrink-0 w-[100px] aspect-4/5 rounded-2xl border ${i === 0 ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-white/5' : 'border-gray-200 dark:border-white/10'} flex flex-col items-center justify-center gap-2 bg-white dark:bg-[#222222]`}
                      >
                        <Calendar
                          className={`w-7 h-7 stroke-1 ${i === 0 ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}
                        />
                        <div>
                          <div
                            className={`text-[13px] font-semibold ${i === 0 ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}
                          >
                            {month}
                          </div>
                          <div
                            className={`text-[11px] ${i === 0 ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}
                          >
                            2026
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100 dark:border-white/10">
                <button className="text-[15px] font-semibold underline text-gray-900 dark:text-white">
                  Reset
                </button>
                <button
                  onClick={() => setActiveTab('who')}
                  className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg font-bold text-[15px]"
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            !isSearchFocused && (
              <button
                onClick={() => setActiveTab('when')}
                className="w-full bg-white dark:bg-[#222222] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-white/5 flex justify-between items-center"
              >
                <span className="text-gray-500 dark:text-gray-400 font-medium">
                  When
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Add dates
                </span>
              </button>
            )
          )}

          {/* WHO */}
          {!isSearchFocused && activeTab === 'who' ? (
            <div className="bg-white dark:bg-[#222222] rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-white/5 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Who?
              </h2>

              <div className="space-y-6">
                {[
                  {
                    label: 'Adults',
                    sub: 'Ages 13 or above',
                    val: adults,
                    setVal: setAdults,
                  },
                  {
                    label: 'Children',
                    sub: 'Ages 2–12',
                    val: children,
                    setVal: setChildren,
                  },
                ].map((row, i) => (
                  <div
                    key={row.label}
                    className={`flex items-center justify-between ${i !== 1 ? 'pb-6 border-b border-gray-100 dark:border-white/5' : ''}`}
                  >
                    <div>
                      <div className="text-[16px] font-semibold text-gray-900 dark:text-white">
                        {row.label}
                      </div>
                      <div className="text-[14px] text-gray-500">{row.sub}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => row.setVal(Math.max(0, row.val - 1))}
                        disabled={row.val === 0}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${row.val === 0 ? 'border-gray-200 text-gray-200 dark:border-white/5 dark:text-white/20' : 'border-gray-400 text-gray-600 dark:border-white/30 dark:text-white/70'}`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-4 text-center font-normal text-[16px] text-gray-900 dark:text-white">
                        {row.val}
                      </span>
                      <button
                        onClick={() => row.setVal(row.val + 1)}
                        className="w-8 h-8 rounded-full border border-gray-400 text-gray-600 dark:border-white/30 dark:text-white/70 flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            !isSearchFocused && (
              <button
                onClick={() => setActiveTab('who')}
                className="w-full bg-white dark:bg-[#222222] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-white/5 flex justify-between items-center"
              >
                <span className="text-gray-500 dark:text-gray-400 font-medium">
                  Who
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {adults + children > 0
                    ? `${adults + children} guests`
                    : 'Add guests'}
                </span>
              </button>
            )
          )}
        </div>
      </div>

      {/* Sticky Bottom Footer */}
      {!isSearchFocused && (
        <div className="bg-white dark:bg-[#222222] border-t border-gray-200 dark:border-white/10 px-6 py-4 flex justify-between items-center absolute bottom-0 left-0 right-0 z-10">
          <button
            onClick={handleClearAll}
            className="font-semibold text-[15px] underline text-gray-900 dark:text-white"
          >
            Clear all
          </button>
          <button
            onClick={handleSearch}
            className="bg-[#FF385C] hover:bg-[#D70466] transition-colors text-white font-bold text-[16px] px-8 py-3.5 rounded-xl flex items-center gap-2 shadow-sm"
          >
            <Search className="w-5 h-5 stroke-[2.5px]" />
            Search
          </button>
        </div>
      )}
    </div>
  );
}
