'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppContext } from '../context/AppContext';
import { MOCK_INSTITUTION_MEMBERS } from '../data/mockData';
import { GlobalRole } from '../types';
import SearchBar from './SearchBar';
import MobileSearchModal from './MobileSearchModal';
import { Menu, User, BookOpen, Building2, ShieldCheck, Search, ChevronDown, Sparkles, Monitor, Sun, Moon } from 'lucide-react';
import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs';
import { useThemeStore } from '@repo/domain/stores/useThemeStore';

const LogoIcon = () => (
  <div className="p-2.5 rounded-3xl bg-[#0a0a0a] dark:bg-white shadow-2xl group-hover:scale-110 transition duration-500">
    <BookOpen className="w-5 h-5 text-white dark:text-black" />
  </div>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDomainOpen, setIsDomainOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { currentUser } = useAppContext();
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const mode = useThemeStore((state) => state.mode);
  const setMode = useThemeStore((state) => state.setMode);
  const setIsDark = useThemeStore((state) => state.setIsDark);
  const [mounted, setMounted] = useState(false);

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
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        (!mobileMenuRef.current || !mobileMenuRef.current.contains(event.target as Node))
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMounted(true);
    const handleThemeChange = () => {
      const isSystemDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      const shouldBeDark =
        mode === 'dark' || (mode === 'system' && isSystemDark);

      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
        setIsDark(true);
      } else {
        document.documentElement.classList.remove('dark');
        setIsDark(false);
      }
    };

    handleThemeChange();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => {
      if (mode === 'system') handleThemeChange();
    };
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [mode, setIsDark]);

  const toggleTheme = () => {
    if (mode === 'system') setMode('light');
    else if (mode === 'light') setMode('dark');
    else setMode('system');
  };

  const menuContentJsx = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-5 sm:py-4 border-b border-gray-50 dark:border-white/5 mb-2">
        <div>
          <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
            Authenticated as
          </p>
          <p className="text-[10px] font-black text-gray-900 dark:text-white truncate uppercase tracking-tighter">
            {currentUser?.email || 'Global Guest'}
          </p>
        </div>
        <div className="sm:hidden relative w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center shrink-0 border border-gray-200 dark:border-white/10 overflow-hidden">
          {currentUser?.avatarUrl ? (
            <Image src={currentUser.avatarUrl} alt={currentUser.name} fill className="object-cover" />
          ) : (
            <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          )}
        </div>
      </div>

      <Show when="signed-out">
        <SignInButton mode="modal">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 px-6 py-4 sm:py-3 text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-500 w-full text-left"
          >
            Log in
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 px-6 py-4 sm:py-3 text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-white bg-gray-50 dark:bg-white/5 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500 w-full text-left"
          >
            Apply for Invitation
          </button>
        </SignUpButton>
      </Show>
      
      {/* Theme Toggle in Mobile Menu */}
      <div className="sm:hidden mt-auto px-6 py-6 border-t border-gray-50 dark:border-white/5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
            Appearance
          </span>
          {mounted && (
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300"
            >
              {mode === 'system' ? (
                <><Monitor className="w-4 h-4" /><span className="text-[10px] font-black uppercase tracking-widest">System</span></>
              ) : mode === 'dark' ? (
                <><Moon className="w-4 h-4" /><span className="text-[10px] font-black uppercase tracking-widest">Dark</span></>
              ) : (
                <><Sun className="w-4 h-4" /><span className="text-[10px] font-black uppercase tracking-widest">Light</span></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ease-in-out ${isSearchExpanded ? 'bg-white dark:bg-[#0a0a0a] shadow-md border-b border-gray-200/50 dark:border-white/10' : 'bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 dark:border-white/10'}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-[height] duration-300 ease-in-out ${isSearchExpanded ? 'h-24' : 'h-16'}`}
          >
            <div
              className="relative group/brand flex items-center gap-1"
              onMouseEnter={() => setIsDomainOpen(true)}
              onMouseLeave={() => setIsDomainOpen(false)}
            >
              <Link href="/" className="flex items-center gap-4 group py-2">
                <LogoIcon />
                <span className="font-sans font-black text-xl text-gray-900 dark:text-white hidden sm:block tracking-tighter uppercase transition-colors group-hover:text-gray-600 dark:group-hover:text-gray-300">
                  COURSE<span className="text-blue-600">HUB</span>
                </span>
              </Link>
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDomainOpen(!isDomainOpen);
                }}
                className="hidden md:block p-1 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors focus:outline-hidden"
                aria-label="Toggle Domain Menu"
              >
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                    isDomainOpen ? 'rotate-180' : 'group-hover/brand:rotate-180'
                  }`}
                />
              </button>

              <div
                className={`hidden md:block absolute top-full left-0 pt-2 z-110 ${
                  isDomainOpen ? 'visible' : 'invisible group-hover/brand:visible'
                }`}
              >
                <div
                  className={`p-2 w-64 bg-white/90 dark:bg-[#1A1A1A]/95 backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-3xl shadow-2xl transition duration-300 transform origin-top-left ${
                    isDomainOpen
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-2 group-hover/brand:opacity-100 group-hover/brand:translate-y-0'
                  }`}
                >
                  <div className="px-4 py-3 border-b border-gray-50 dark:border-white/5 mb-2">
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">
                      Top-Level Domains
                    </p>
                  </div>
                  <div className="space-y-1">
                    {[
                      { name: 'ELITE', href: 'http://localhost:3000', active: false },
                      { name: 'ELITE IMMI', href: 'http://localhost:3001', active: false },
                      { name: 'ELITE EDU', href: 'http://localhost:3002', active: false },
                      { name: 'COURSEHUB', href: 'http://localhost:3003', active: true },
                    ].map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition group ${
                          item.active
                            ? 'bg-blue-600/5 dark:bg-blue-600/10'
                            : 'hover:bg-gray-50 dark:hover:bg-white/5'
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${
                            item.active
                              ? 'bg-blue-600 animate-pulse'
                              : 'bg-gray-300 dark:bg-gray-700 group-hover:bg-blue-600'
                          }`}
                        />
                        <span
                          className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                            item.active
                              ? 'text-blue-600'
                              : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600'
                          }`}
                        >
                          {item.name}
                        </span>
                        {item.active && (
                          <Sparkles className="w-3 h-3 text-blue-600 ml-auto" />
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:flex grow justify-center px-8 relative">
              <SearchBar onExpandChange={setIsSearchExpanded} />
            </div>

            {/* Mobile Search Bar */}
            <div className="flex md:hidden grow px-3">
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="flex items-center gap-3 w-full bg-white dark:bg-[#222222] border border-gray-200 dark:border-white/10 rounded-full py-2 px-4 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-500"
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
                className="hidden md:block text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-500"
              >
                Explore
              </Link>
              
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="hidden md:block p-2.5 rounded-xl transition duration-500 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-white/5"
                  aria-label="Toggle Theme"
                >
                  {mode === 'system' ? <Monitor className="w-4 h-4" /> : mode === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </button>
              )}

              <div className="relative flex items-center" ref={menuRef}>
                <Show when="signed-in">
                  <div className="p-1 border border-transparent hover:border-gray-200 dark:hover:border-white/10 rounded-full transition-all duration-500">
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
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="group flex items-center gap-3 sm:border border-transparent sm:border-gray-200 sm:dark:border-white/10 rounded-full p-2 sm:p-1.5 sm:pl-4 bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 sm:hover:border-gray-300 sm:dark:hover:border-white/20 transition-all duration-500 outline-none"
                  >
                    <Menu className="w-6 h-6 sm:w-4 sm:h-4 text-gray-900 dark:text-white sm:text-gray-500 sm:dark:text-gray-400 sm:group-hover:text-gray-900 sm:dark:group-hover:text-white transition-colors duration-500" />
                    <div className="hidden sm:block p-1.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-500">
                      <User className="w-4 h-4" />
                    </div>
                  </button>
                </Show>
                {isMenuOpen && (
                  <div className="hidden sm:block absolute right-0 top-[calc(100%+0.5rem)] w-64 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-4xl shadow-2xl py-3 overflow-hidden animate-in slide-in-from-top-2 duration-300">
                    {menuContentJsx}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu Sidebar */}
      <div className={`sm:hidden fixed inset-0 z-60 flex justify-end ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div 
          className={`fixed inset-0 bg-black/40 transition-opacity duration-500 ease-out ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
        />
        <div 
          ref={mobileMenuRef}
          className={`relative w-[80%] max-w-sm h-full bg-white dark:bg-[#1A1A1A] shadow-2xl flex flex-col pt-6 transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {menuContentJsx}
        </div>
      </div>

      {/* Desktop Background Overlay */}
      <div
        className={`fixed top-24 inset-x-0 bottom-0 bg-black/25 z-40 transition-opacity duration-300 ease-out ${
          isSearchExpanded
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      />
      
      <MobileSearchModal 
        isOpen={isMobileSearchOpen} 
        onClose={() => setIsMobileSearchOpen(false)} 
      />
    </>
  );
};

export default Header;
