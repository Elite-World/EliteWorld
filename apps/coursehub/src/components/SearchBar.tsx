'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Building2, Plus, Minus, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  onExpandChange?: (isExpanded: boolean) => void;
}

export default function SearchBar({ onExpandChange }: SearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'where' | 'when' | 'who' | null>(
    null,
  );
  const [whenTab, setWhenTab] = useState<'dates' | 'flexible'>('dates');
  
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const closeSearch = () => {
    setIsExpanded(false);
    setActiveTab(null);
    onExpandChange?.(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeSearch();
      }
    }

    function handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeSearch();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  const expandSearch = (tab: 'where' | 'when' | 'who') => {
    setIsExpanded(true);
    setActiveTab(tab);
    onExpandChange?.(true);
  };

  return (
    <div
      className="relative z-50 flex justify-center w-full max-w-[850px] h-[48px]"
      ref={containerRef}
    >
      {/* Background Overlay */}
      <div 
        className={`fixed top-24 inset-x-0 bottom-0 bg-black/25 transition-opacity duration-300 ease-in-out ${
          isExpanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={closeSearch}
      />

      {/* COMPACT PILL */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 ease-in-out origin-center ${
          isExpanded
            ? 'opacity-0 scale-95 pointer-events-none'
            : 'opacity-100 scale-100 pointer-events-auto'
        }`}
        style={{ width: '348px', height: '48px' }}
      >
          <button
            onClick={(e) => {
              e.stopPropagation();
              expandSearch('where');
            }}
            className="flex-1 px-4 text-sm font-semibold text-gray-800 text-center truncate hover:bg-gray-50 rounded-l-full h-full"
          >
            Anywhere
          </button>
          <div className="w-px h-6 bg-gray-300 shrink-0" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              expandSearch('when');
            }}
            className="flex-1 px-4 text-sm font-semibold text-gray-800 text-center truncate hover:bg-gray-50 h-full"
          >
            Any time
          </button>
          <div className="w-px h-6 bg-gray-300 shrink-0" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              expandSearch('who');
            }}
            className="flex-[1.2] pl-4 pr-2 text-sm text-gray-500 flex items-center justify-between gap-2 hover:bg-gray-50 rounded-r-full h-full min-w-0"
          >
            <span className={`font-medium truncate ${adults + children > 0 ? 'text-gray-900 font-bold' : ''}`}>
              {adults + children > 0 ? `${adults + children} guest${adults + children > 1 ? 's' : ''}` : 'Add guests'}
            </span>
            <div className="bg-[#FF385C] p-2 rounded-full text-white shrink-0">
              <Search className="w-3.5 h-3.5 stroke-4" />
            </div>
          </button>
        </div>
      

      {/* EXPANDED BAR */}
      <div
        className={`absolute top-1/2 left-1/2 w-full transition-all duration-300 ease-in-out origin-center ${
          isExpanded
            ? 'opacity-100 scale-100 -translate-x-1/2 -translate-y-1/2 pointer-events-auto'
            : 'opacity-0 scale-95 -translate-x-1/2 -translate-y-1/2 pointer-events-none'
        }`}
      >
        <div
          className={`bg-[#EBEBEB] dark:bg-[#222222] rounded-full flex items-center h-[66px] relative shadow-xl border border-gray-200 dark:border-white/10 ${!activeTab ? 'bg-white' : ''}`}
        >
          {/* Where */}
          <div
            onClick={() => setActiveTab('where')}
            className={`flex-1 flex flex-col justify-center h-full rounded-full cursor-pointer pl-8 pr-4 relative z-10 transition-colors ${
              activeTab === 'where'
                ? 'bg-white dark:bg-[#111111] shadow-[0_6px_20px_rgba(0,0,0,0.2)]'
                : 'hover:bg-gray-200 dark:hover:bg-white/10'
            }`}
          >
            <div className="text-xs font-bold text-gray-800 dark:text-gray-200 tracking-wide">
              Where
            </div>
            <input
              autoFocus={activeTab === 'where'}
              type="text"
              placeholder="Search destinations"
              className="w-full bg-transparent focus:outline-none text-sm text-gray-600 dark:text-gray-400 placeholder-gray-400 truncate mt-0.5"
            />
          </div>

          <div
            className={`w-[1px] h-8 bg-gray-300 dark:bg-white/10 transition-opacity ${activeTab === 'where' || activeTab === 'when' ? 'opacity-0' : 'opacity-100'}`}
          />

          {/* When */}
          <div
            onClick={() => setActiveTab('when')}
            className={`flex-1 flex flex-col justify-center h-full rounded-full cursor-pointer pl-6 pr-4 relative z-10 transition-colors ${
              activeTab === 'when'
                ? 'bg-white dark:bg-[#111111] shadow-[0_6px_20px_rgba(0,0,0,0.2)]'
                : 'hover:bg-gray-200 dark:hover:bg-white/10'
            }`}
          >
            <div className="text-xs font-bold text-gray-800 dark:text-gray-200 tracking-wide">
              When
            </div>
            <input
              autoFocus={activeTab === 'when'}
              type="text"
              placeholder="Add dates"
              className="w-full bg-transparent focus:outline-none text-sm text-gray-600 dark:text-gray-400 placeholder-gray-400 truncate mt-0.5"
            />
          </div>

          <div
            className={`w-[1px] h-8 bg-gray-300 dark:bg-white/10 transition-opacity ${activeTab === 'when' || activeTab === 'who' ? 'opacity-0' : 'opacity-100'}`}
          />

          {/* Who */}
          <div
            onClick={() => setActiveTab('who')}
            className={`flex-[1.2] flex items-center h-full rounded-full cursor-pointer pl-6 pr-2 relative z-10 transition-colors ${
              activeTab === 'who'
                ? 'bg-white dark:bg-[#111111] shadow-[0_6px_20px_rgba(0,0,0,0.2)]'
                : 'hover:bg-gray-200 dark:hover:bg-white/10'
            }`}
          >
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-xs font-bold text-gray-800 dark:text-gray-200 tracking-wide">
                Who
              </div>
              <input
                readOnly
                placeholder="Add guests"
                value={
                  adults + children > 0
                    ? `${adults + children} guest${adults + children > 1 ? 's' : ''}`
                    : ''
                }
                className="w-full bg-transparent focus:outline-none text-sm text-gray-600 dark:text-gray-400 placeholder-gray-400 truncate mt-0.5 cursor-pointer"
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                closeSearch();
                router.push('/s');
              }}
              className={`h-12 rounded-full bg-[#FF385C] hover:bg-[#D70466] text-white flex items-center justify-center font-bold transition-all duration-200 gap-2 shrink-0 ${activeTab ? 'px-6' : 'w-12 px-0'}`}
            >
              <Search className="w-4 h-4 stroke-4" />
              {activeTab && <span>Search</span>}
            </button>
          </div>
        </div>

        {/* DROPDOWNS */}
        <div className="relative w-full z-0 h-0">
          {/* Where Dropdown */}
          {activeTab === 'where' && (
            <div className="absolute top-3 left-0 w-[400px] bg-white dark:bg-[#222222] rounded-3xl shadow-[0_6px_20px_rgba(0,0,0,0.2)] p-6 animate-fade-in border border-gray-200 dark:border-white/10">
              <div className="text-xs font-bold text-gray-800 dark:text-gray-200 mb-4 px-2">
                Suggested destinations
              </div>
              <div className="space-y-1">
                {[
                  { city: 'London, UK', desc: 'World-class tech & business' },
                  {
                    city: 'Silicon Valley, USA',
                    desc: 'The hub of innovation',
                  },
                  { city: 'Singapore', desc: 'Gateway to Asian markets' },
                  { city: 'Berlin, Germany', desc: "Europe's startup capital" },
                ].map((loc) => (
                  <div
                    key={loc.city}
                    className="flex items-center gap-4 p-3 hover:bg-gray-100 dark:hover:bg-white/5 rounded-2xl cursor-pointer transition-colors"
                  >
                    <div className="w-12 h-12 bg-gray-100 dark:bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <Building2 className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-900 dark:text-white">
                        {loc.city}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {loc.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* When Dropdown (Mock Calendar / Flexible) */}
          {activeTab === 'when' && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[850px] bg-white dark:bg-[#222222] rounded-[32px] shadow-[0_6px_20px_rgba(0,0,0,0.2)] p-8 animate-fade-in border border-gray-200 dark:border-white/10">
              {/* Top Toggle */}
              <div className="flex justify-center mb-8">
                <div className="bg-gray-100 dark:bg-white/5 rounded-full p-1 flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setWhenTab('dates');
                    }}
                    className={`px-8 py-2 rounded-full text-sm font-semibold transition-colors ${whenTab === 'dates' ? 'bg-white dark:bg-[#222222] shadow text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                  >
                    Dates
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setWhenTab('flexible');
                    }}
                    className={`px-8 py-2 rounded-full text-sm font-semibold transition-colors ${whenTab === 'flexible' ? 'bg-white dark:bg-[#222222] shadow text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                  >
                    Flexible
                  </button>
                </div>
              </div>

              {whenTab === 'dates' && (
                <div className="w-full">
                  <div className="flex justify-between px-4 mb-4 items-center">
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                      <ChevronLeft className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                    </button>
                    <div className="grid grid-cols-2 gap-12 w-full max-w-[650px] mx-auto text-center font-bold text-gray-900 dark:text-white">
                      <div>June 2026</div>
                      <div>July 2026</div>
                    </div>
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                      <ChevronRight className="w-5 h-5 text-gray-900 dark:text-white" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-12 w-full max-w-[700px] mx-auto px-4 mb-8">
                    {/* June */}
                    <div>
                      <div className="grid grid-cols-7 gap-y-4 text-center text-xs font-semibold text-gray-400 mb-2">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={`june-day-${i}`}>{d}</div>)}
                      </div>
                      <div className="grid grid-cols-7 gap-y-1 text-center text-sm font-semibold text-gray-900 dark:text-white">
                        <div className="py-3 text-gray-300 dark:text-gray-600">31</div>
                        {[...Array(30)].map((_, i) => (
                          <div key={`june-${i}`} className="py-3 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full cursor-pointer transition-colors">
                            {i + 1}
                          </div>
                        ))}
                        {[...Array(4)].map((_, i) => <div key={`june-empty-${i}`} />)}
                      </div>
                    </div>
                    {/* July */}
                    <div>
                      <div className="grid grid-cols-7 gap-y-4 text-center text-xs font-semibold text-gray-400 mb-2">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={`july-day-${i}`}>{d}</div>)}
                      </div>
                      <div className="grid grid-cols-7 gap-y-1 text-center text-sm font-semibold text-gray-900 dark:text-white">
                        {[...Array(3)].map((_, i) => <div key={`july-empty-${i}`} />)}
                        {[...Array(31)].map((_, i) => (
                          <div key={`july-${i}`} className="py-3 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full cursor-pointer transition-colors">
                            {i + 1}
                          </div>
                        ))}
                        <div className="py-3 text-gray-300 dark:text-gray-600">1</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-6">
                    {['Exact dates', '± 1 day', '± 2 days', '± 3 days', '± 7 days', '± 14 days'].map((btn, i) => (
                      <button key={btn} className={`px-4 py-2 rounded-full text-xs font-semibold border ${i === 0 ? 'border-gray-900 text-gray-900 dark:border-white dark:text-white' : 'border-gray-200 text-gray-500 hover:border-gray-900 dark:border-white/10 dark:text-gray-400 dark:hover:border-white transition-colors'}`}>
                        {btn}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {whenTab === 'flexible' && (
                <div className="w-full max-w-[650px] mx-auto text-center pb-4">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Stay for a week</h3>
                  <div className="flex justify-center gap-3 mb-12">
                    <button className="px-6 py-2 rounded-full border border-gray-200 dark:border-white/10 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:border-gray-900 transition-colors">
                      Weekend
                    </button>
                    <button className="px-6 py-2 rounded-full border-2 border-gray-900 dark:border-white text-sm font-semibold text-gray-900 dark:text-white">
                      Week
                    </button>
                    <button className="px-6 py-2 rounded-full border border-gray-200 dark:border-white/10 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:border-gray-900 transition-colors">
                      Month
                    </button>
                  </div>
                  
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Go anytime</h3>
                  <div className="flex gap-4 overflow-hidden relative pr-8">
                    {['June', 'July', 'August', 'September', 'October', 'November'].map((month, i) => (
                      <div key={month} className={`shrink-0 w-[110px] aspect-[4/5] rounded-2xl border ${i === 0 ? 'border-gray-900 dark:border-white' : 'border-gray-200 dark:border-white/10 hover:border-gray-900 dark:hover:border-white cursor-pointer'} flex flex-col items-center justify-center gap-2 transition-colors bg-white dark:bg-[#222222]`}>
                        <Calendar className={`w-8 h-8 stroke-1 ${i === 0 ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`} />
                        <div>
                          <div className={`text-sm font-semibold ${i === 0 ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>{month}</div>
                          <div className={`text-xs ${i === 0 ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>2026</div>
                        </div>
                      </div>
                    ))}
                    <button className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-black rounded-full border border-gray-200 dark:border-white/10 shadow-md flex items-center justify-center hover:scale-105 transition-transform z-10">
                      <ChevronRight className="w-4 h-4 text-gray-900 dark:text-white" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Who Dropdown */}
          {activeTab === 'who' && (
            <div className="absolute top-3 right-0 w-[400px] bg-white dark:bg-[#222222] rounded-3xl shadow-[0_6px_20px_rgba(0,0,0,0.2)] p-6 animate-fade-in border border-gray-200 dark:border-white/10">
              <div className="space-y-6">
                {/* Adults */}
                <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-white/10">
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">Adults</div>
                    <div className="text-sm text-gray-500">Ages 13 or above</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setAdults(Math.max(0, adults - 1));
                      }}
                      disabled={adults === 0}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${adults === 0 ? 'border-gray-200 text-gray-200 cursor-not-allowed dark:border-white/5 dark:text-white/20' : 'border-gray-400 text-gray-600 hover:border-gray-900 hover:text-gray-900 dark:border-white/30 dark:text-white/70 dark:hover:border-white dark:hover:text-white cursor-pointer'}`}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-4 text-center font-normal text-gray-900 dark:text-white">
                      {adults}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setAdults(adults + 1);
                      }}
                      className="w-8 h-8 rounded-full border border-gray-400 text-gray-600 hover:border-gray-900 hover:text-gray-900 dark:border-white/30 dark:text-white/70 dark:hover:border-white dark:hover:text-white cursor-pointer flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">Children</div>
                    <div className="text-sm text-gray-500">Ages 2 – 12</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setChildren(Math.max(0, children - 1));
                      }}
                      disabled={children === 0}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${children === 0 ? 'border-gray-200 text-gray-200 cursor-not-allowed dark:border-white/5 dark:text-white/20' : 'border-gray-400 text-gray-600 hover:border-gray-900 hover:text-gray-900 dark:border-white/30 dark:text-white/70 dark:hover:border-white dark:hover:text-white cursor-pointer'}`}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-4 text-center font-normal text-gray-900 dark:text-white">
                      {children}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setChildren(children + 1);
                      }}
                      className="w-8 h-8 rounded-full border border-gray-400 text-gray-600 hover:border-gray-900 hover:text-gray-900 dark:border-white/30 dark:text-white/70 dark:hover:border-white dark:hover:text-white cursor-pointer flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
