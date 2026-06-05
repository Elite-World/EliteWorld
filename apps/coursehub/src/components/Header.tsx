'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { useAppContext } from '../context/AppContext';
import LoginModal from './LoginModal';
import { Menu, User, BookOpen, Building2, ShieldCheck } from 'lucide-react';
import { MOCK_INSTITUTION_MEMBERS } from '../data/mockData';
import { GlobalRole } from '../types';
import SearchBar from './SearchBar';

const LogoIcon = () => (
  <div className="p-2.5 rounded-3xl bg-[#0a0a0a] dark:bg-white shadow-2xl group-hover:scale-110 transition-all duration-500">
    <BookOpen className="w-5 h-5 text-white dark:text-black" />
  </div>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { currentUser, logout } = useAppContext();
  const menuRef = useRef<HTMLDivElement>(null);

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
        className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${isSearchExpanded ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md shadow-sm'}`}
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

            <div className="flex items-center gap-4">
              <Link
                href="/#search-catalog"
                className="hidden md:block text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
              >
                Explore
              </Link>
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 border border-gray-200 dark:border-white/10 rounded-full px-3 py-1.5 hover:shadow-lg transition-all bg-white dark:bg-transparent"
                >
                  <Menu className="w-5 h-5 text-gray-500" />
                  {currentUser ? (
                    <NextImage
                      src={currentUser.avatarUrl}
                      alt={currentUser.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full border border-gray-100"
                    />
                  ) : (
                    <div className="p-1 rounded-full bg-gray-100 dark:bg-white/5">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                  )}
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-4 w-64 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-4xl shadow-2xl py-3 overflow-hidden animate-slide-up">
                    <div className="px-4 py-3 border-b border-gray-50 dark:border-white/5 mb-2">
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                        Authenticated as
                      </p>
                      <p className="text-[10px] font-black text-gray-900 dark:text-white truncate uppercase tracking-tighter">
                        {currentUser?.email || 'Global Guest'}
                      </p>
                    </div>
                    {currentUser ? (
                      <>
                        {!MOCK_INSTITUTION_MEMBERS.some(
                          (m) => m.userId === currentUser?.id,
                        ) &&
                          currentUser?.globalRole !== GlobalRole.WEB_MASTER &&
                          currentUser?.globalRole !==
                            GlobalRole.PLATFORM_ADMIN && (
                            <Link
                              href="/dashboard"
                              className="flex items-center gap-3 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <User className="w-4 h-4" />
                              Learner Dashboard
                            </Link>
                          )}
                        {MOCK_INSTITUTION_MEMBERS.some(
                          (m) => m.userId === currentUser?.id,
                        ) && (
                          <>
                            <Link
                              href="/create-course"
                              className="flex items-center gap-3 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <BookOpen className="w-4 h-4" />
                              Create Experience
                            </Link>
                            <Link
                              href="/partner"
                              className="flex items-center gap-3 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-purple-600 bg-purple-50/50 dark:bg-purple-600/10 hover:bg-purple-600 hover:text-white transition-all"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <Building2 className="w-4 h-4" />
                              Partner Portal
                            </Link>
                          </>
                        )}
                        {(currentUser?.globalRole === GlobalRole.WEB_MASTER ||
                          currentUser?.globalRole ===
                            GlobalRole.PLATFORM_ADMIN) && (
                          <Link
                            href="/admin"
                            className="flex items-center gap-3 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-red-600 bg-red-50/50 dark:bg-red-600/10 hover:bg-red-600 hover:text-white transition-all"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <ShieldCheck className="w-4 h-4" />
                            Admin Command Center
                          </Link>
                        )}
                        <div className="mt-2 pt-2 border-t border-gray-50 dark:border-white/5">
                          <button
                            onClick={() => {
                              logout();
                              setIsMenuOpen(false);
                            }}
                            className="flex items-center gap-3 w-full text-left px-6 py-3 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all"
                          >
                            Terminate Session
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setIsLoginModalOpen(true);
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center gap-3 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-white/5 transition-all w-full text-left"
                        >
                          Log in
                        </button>
                        <button
                          onClick={() => {
                            setIsLoginModalOpen(true);
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center gap-3 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50/50 dark:bg-blue-600/10 hover:bg-blue-600 hover:text-white transition-all w-full text-left"
                        >
                          Apply for Invitation
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Header;
