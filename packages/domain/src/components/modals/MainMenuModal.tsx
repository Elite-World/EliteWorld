'use client';

import { useModalStore } from '../../lib/stores/useModalStore';
import { Modal } from '../../components/ui/Modal';
import { useThemeStore } from '../../lib/stores/useThemeStore';
import { cn } from '../../lib/utils';
import Link from 'next/link';
import { NavbarModeToggle } from '@repo/ui';
import { UserMenu } from '../shared/UserMenu';
import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
  HiOutlineChevronLeft,
} from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';

// Suggestions when empty
const SUGGESTIONS = [
  'Study in UK',
  'Visa Requirements',
  'Top Universities',
  'Scholarships',
];

export interface MainMenuModalProps {
  items: any[];
  siteConfig: {
    features: {
      search: boolean;
      mode: boolean;
      user: boolean;
    };
  };
}

export function MainMenuModal({ items = [], siteConfig }: MainMenuModalProps) {
  const isDark = useThemeStore((state) => state.isDark);
  const mode = useThemeStore((state) => state.mode);
  const setMode = useThemeStore((state) => state.setMode);
  const { close } = useModalStore();

  const [searchMode, setSearchMode] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Focus input on search mode enter
  useEffect(() => {
    if (searchMode) {
      setQuery('');
      setResults([]);
      // Small delay to allow animation to complete/start
      setTimeout(() => {
        document.getElementById('drawer-search-input')?.focus();
      }, 300);
    }
  }, [searchMode]);

  // Debounced search (Mock)
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const timer = setTimeout(() => {
      startTransition(async () => {
        setResults([]); // Mock empty results for now
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const toggleTheme = () => {
    if (mode === 'system') setMode('light');
    else if (mode === 'light') setMode('dark');
    else setMode('system');
  };

  const handleSelect = (section: string, slug: string) => {
    close();
    router.push(`/${section}/${slug}`);
  };

  return (
    <Modal isOpen onClose={close} variant="side" className="w-full">
      <div
        className={cn(
          'h-full w-full overflow-hidden relative', // key: overflow-hidden for sliding
          isDark ? 'bg-[#1C1C1E]' : 'bg-white',
        )}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {searchMode ? (
            <motion.div
              key="search-view"
              className="absolute inset-0 flex flex-col h-full bg-inherit z-20"
              initial={{ x: '100%', opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 1 }} // Slide out to right
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* SEARCH HEADER */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-white/5 min-h-[76px]">
                <div className="flex items-center gap-3 w-full">
                  <button
                    onClick={() => setSearchMode(false)}
                    className={cn(
                      'p-2 -ml-2 rounded-full transition-colors',
                      isDark
                        ? 'hover:bg-white/10 text-gray-400'
                        : 'hover:bg-gray-100 text-gray-500',
                    )}
                  >
                    <HiOutlineChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="relative flex-1">
                    <input
                      id="drawer-search-input"
                      type="text"
                      placeholder="Search..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className={cn(
                        'w-full bg-transparent outline-none text-lg font-medium',
                        isDark
                          ? 'text-white placeholder-gray-600'
                          : 'text-gray-900 placeholder-gray-400',
                      )}
                      autoComplete="off"
                    />
                  </div>
                  {query && (
                    <button onClick={() => setQuery('')}>
                      <HiOutlineXMark className="w-5 h-5 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>

              {/* SEARCH CONTENT */}
              <div className="flex-1 overflow-y-auto px-4 py-2">
                {isPending ? (
                  <div className="flex flex-col items-center justify-center p-8 opacity-50">
                    <HiOutlineMagnifyingGlass className="w-6 h-6 animate-pulse" />
                  </div>
                ) : query ? (
                  results.length > 0 ? (
                    <div className="space-y-2">
                      {results.map((article) => (
                        <button
                          key={article.id}
                          onClick={() =>
                            handleSelect(article.section, article.slug)
                          }
                          className="w-full text-left p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5"
                        >
                          {article.title}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-8 text-sm">
                      No results found.
                    </p>
                  )
                ) : (
                  <div className="space-y-1">
                    <p className="px-2 py-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Suggestions
                    </p>
                    {SUGGESTIONS.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setQuery(suggestion)}
                        className={cn(
                          'w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left text-sm font-medium transition-colors',
                          isDark
                            ? 'text-gray-300 hover:bg-white/5'
                            : 'text-gray-700 hover:bg-gray-50',
                        )}
                      >
                        <HiOutlineMagnifyingGlass className="w-4 h-4 text-gray-400" />
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="menu-view"
              className="absolute inset-0 flex flex-col h-full bg-inherit z-10"
              initial={{ x: '-20%', opacity: 0 }} // Start slightly left
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-20%', opacity: 0 }} // Slide/Fade out to left
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* MENU HEADER */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-white/5 min-h-[76px]">
                <span
                  className={cn(
                    'text-sm font-bold uppercase tracking-widest',
                    isDark ? 'text-gray-400' : 'text-gray-500',
                  )}
                >
                  Navigation
                </span>
                <button
                  onClick={close}
                  className={cn(
                    'p-2 rounded-xl transition-colors',
                    isDark
                      ? 'hover:bg-white/10 text-gray-400 hover:text-white'
                      : 'hover:bg-gray-100 text-gray-500 hover:text-black',
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              {/* MENU CONTENT */}
              <div className="flex-1 overflow-y-auto py-2">
                {/* Search Trigger */}
                {siteConfig?.features?.search && (
                  <div className="border-b border-gray-50 dark:border-white/5">
                    <button
                      onClick={() => setSearchMode(true)}
                      className={cn(
                        'w-full flex items-center justify-between px-6 py-4 transition-colors text-left',
                        isDark
                          ? 'text-gray-200 hover:bg-white/5'
                          : 'text-gray-900 hover:bg-gray-50',
                      )}
                    >
                      <span className="font-bold text-base flex items-center gap-3">
                        <span
                          className={cn(
                            'p-1.5 rounded-lg',
                            isDark
                              ? 'bg-blue-500/10 text-blue-400'
                              : 'bg-blue-50 text-blue-600',
                          )}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                          </svg>
                        </span>
                        Search Registry
                      </span>
                    </button>
                  </div>
                )}

                {/* Items */}
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-gray-50 dark:border-white/5 last:border-0"
                  >
                    <Link
                      href={item.href}
                      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className={cn(
                        'flex items-center justify-between px-6 py-4 transition-colors',
                        isDark
                          ? 'text-gray-200 hover:bg-white/5'
                          : 'text-gray-900 hover:bg-gray-50',
                      )}
                      onClick={close}
                    >
                      <span className="font-semibold text-base">
                        {item.label}
                      </span>
                    </Link>
                    {item.children && (
                      <div
                        className={cn('bg-gray-50/50 dark:bg-black/20 pb-2')}
                      >
                        {item.children.map((child: any) => (
                          <Link
                            key={child.id}
                            href={child.href}
                            className={cn(
                              'flex items-center px-6 py-3 pl-10 transition-colors',
                              isDark
                                ? 'text-gray-400 hover:text-white hover:bg-white/5'
                                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100/50',
                            )}
                            onClick={close}
                          >
                            <span className="text-sm font-medium">
                              {child.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div
                className={cn(
                  'mt-auto px-6 py-6 border-t',
                  isDark
                    ? 'border-white/5 bg-[#171719]'
                    : 'border-gray-100 bg-gray-50/80',
                )}
              >
                <div className="space-y-4">
                  {siteConfig?.features?.mode && (
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          'text-xs font-semibold uppercase tracking-wider',
                          isDark ? 'text-gray-500' : 'text-gray-400',
                        )}
                      >
                        Appearance
                      </span>
                      <NavbarModeToggle
                        isTransparent={false}
                        onClick={toggleTheme}
                        mode={mode}
                      />
                    </div>
                  )}

                  {siteConfig?.features?.user && (
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-white/5">
                      <span
                        className={cn(
                          'text-xs font-semibold uppercase tracking-wider',
                          isDark ? 'text-gray-500' : 'text-gray-400',
                        )}
                      >
                        Account
                      </span>
                      <UserMenu isTransparent={false} />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
}
