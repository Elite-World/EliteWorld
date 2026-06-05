'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAppContext } from '../context/AppContext';
import { MOCK_INSTITUTION_MEMBERS } from '../data/mockData';
import { GlobalRole } from '../types';
import SearchBar from './SearchBar';
import MobileSearchModal from './MobileSearchModal';
import { Menu, User, BookOpen, Building2, ShieldCheck, Search } from 'lucide-react';
import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs';

const LogoIcon = () => (
  <div className="p-2.5 rounded-3xl bg-[#0a0a0a] dark:bg-white shadow-2xl group-hover:scale-110 transition-all duration-500">
    <BookOpen className="w-5 h-5 text-white dark:text-black" />
  </div>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { currentUser } = useAppContext();
  const menuRef = useRef<HTMLDivElement>(null);

  const isAverageUser =
    currentUser &&
    !MOCK_INSTITUTION_MEMBERS.some((m) => m.userId === currentUser.id) &&
    currentUser.globalRole !== GlobalRole.WEB_MASTER &&
    currentUser.globalRole !== GlobalRole.PLATFORM_ADMIN;

  const isInstitutionMember =
    currentUser && MOCK_INSTITUTION_MEMBERS.some((m) => m.userId === currentUser.id);

  const isAdmin =
    currentUser &&
    (currentUser.globalRole === GlobalRole.WEB_MASTER ||
      currentUser.globalRole === GlobalRole.PLATFORM_ADMIN);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${isSearchExpanded ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md shadow-sm'}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-[height] duration-300 ease-in-out ${isSearchExpanded ? 'h-24' : 'h-16'}`}
          >
            <Link href="/" className="flex items-center gap-4 group">
              <LogoIcon />
              <span className="font-sans font-black text-xl text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors hidden sm:block tracking-tighter uppercase">
                COURSE<span className="text-blue-600">HUB</span>
              </span>
            </Link>

            <div className="hidden md:flex grow justify-center px-8 relative">
              <SearchBar onExpandChange={setIsSearchExpanded} />
            </div>

            {/* Mobile Search Bar */}
            <div className="flex md:hidden grow px-3">
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="flex items-center gap-3 w-full bg-white dark:bg-[#222222] border border-gray-200 dark:border-white/10 rounded-full py-2 px-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
              >
                <Search className="w-4 h-4 text-gray-900 dark:text-white shrink-0 stroke-[2.5px]" />
                <span className="text-[14px] font-semibold text-gray-900 dark:text-white tracking-tight">
                  Start your search
                </span>
              </button>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <Link
                href="/#search-catalog"
                className="hidden md:block text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
              >
                Explore
              </Link>
              <div className="relative flex items-center" ref={menuRef}>
                <Show when="signed-in">
                  <div className="p-1 border border-transparent hover:border-gray-200 dark:hover:border-white/10 rounded-full transition-all">
                    <UserButton>
                      <UserButton.MenuItems>
                        {isAverageUser && (
                          <UserButton.Link
                            label="Learner Dashboard"
                            labelIcon={<User size={16} />}
                            href="/dashboard"
                          />
                        )}
                        {isAverageUser && (
                          <UserButton.Link
                            label="Become a Partner"
                            labelIcon={<Building2 size={16} />}
                            href="/apply-partner"
                          />
                        )}

                        {isInstitutionMember && (
                          <UserButton.Link
                            label="Create Experience"
                            labelIcon={<BookOpen size={16} />}
                            href="/create-course"
                          />
                        )}
                        {isInstitutionMember && (
                          <UserButton.Link
                            label="Partner Portal"
                            labelIcon={<Building2 size={16} />}
                            href="/partner"
                          />
                        )}

                        {isAdmin && (
                          <UserButton.Link
                            label="Admin Command Center"
                            labelIcon={<ShieldCheck size={16} />}
                            href="/admin"
                          />
                        )}
                      </UserButton.MenuItems>
                    </UserButton>
                  </div>
                </Show>
                
                <Show when="signed-out">
                  <div className="flex items-center gap-2 border border-gray-200 dark:border-white/10 rounded-full p-1 sm:pl-3 sm:pr-1 hover:shadow-lg transition-all bg-white dark:bg-transparent">
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="flex items-center justify-center gap-2 p-1.5 w-full"
                    >
                      <Menu className="w-5 h-5 text-gray-500" />
                      <div className="hidden sm:flex p-1 rounded-full bg-gray-100 dark:bg-white/5">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                    </button>
                  </div>
                </Show>
                {isMenuOpen && (
                  <div className="absolute right-0 top-[calc(100%+0.5rem)] w-64 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-4xl shadow-2xl py-3 overflow-hidden animate-slide-up">
                    <div className="px-4 py-3 border-b border-gray-50 dark:border-white/5 mb-2">
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                        Authenticated as
                      </p>
                      <p className="text-[10px] font-black text-gray-900 dark:text-white truncate uppercase tracking-tighter">
                        {currentUser?.email || 'Global Guest'}
                      </p>
                    </div>

                      <Show when="signed-out">
                        <SignInButton mode="modal">
                          <button
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-white/5 transition-all w-full text-left"
                          >
                            Log in
                          </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                          <button
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50/50 dark:bg-blue-600/10 hover:bg-blue-600 hover:text-white transition-all w-full text-left"
                          >
                            Apply for Invitation
                          </button>
                        </SignUpButton>
                      </Show>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <MobileSearchModal 
        isOpen={isMobileSearchOpen} 
        onClose={() => setIsMobileSearchOpen(false)} 
      />
    </>
  );
};

export default Header;
