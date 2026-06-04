'use client';

import { Modal } from '../../components/ui/Modal';
import { useModalStore } from '../../lib/stores/useModalStore';
import {
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
  HiOutlineDocumentText,
} from 'react-icons/hi2';
import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
// import { Article } from '../../lib/types/content';
// import Link from 'next/link';

// Suggestions when empty
const SUGGESTIONS = [
  'Study in UK',
  'Visa Requirements',
  'Top Universities',
  'Scholarships',
];

export function SearchModal() {
  const { activeModal, close } = useModalStore();
  const isOpen = activeModal === 'search';
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]); // setResults<SearchResult[]>
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      // Don't clear query immediately so user can resume?
      // Or clear it? Let's clear it for fresh start.
      setQuery('');
      setResults([]);
      // Slight delay to allow modal animation to start
      const timer = setTimeout(() => {
        const input = document.getElementById('search-input');
        if (input) input.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      startTransition(async () => {
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
          if (res.ok) {
            const found = await res.json();
            setResults(found);
          } else {
            setResults([]);
          }
        } catch (error) {
          console.error('Search fetch error:', error);
          setResults([]);
        }
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (section: string, slug: string) => {
    close();
    router.push(`/${section}/${slug}`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      variant="popup"
      className="max-w-3xl w-full mx-auto p-0 md:p-4 bg-transparent shadow-none"
    >
      <div className="flex flex-col h-full md:h-auto md:max-h-[80vh] bg-white dark:bg-gray-900 md:rounded-2xl w-full shadow-2xl overflow-hidden">
        {/* Search Header */}
        <div className="relative flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 p-4">
          <div className="relative flex-1">
            <HiOutlineMagnifyingGlass className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              id="search-input"
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-gray-100 dark:bg-gray-800/50 rounded-xl text-base outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 bg-gray-100 dark:bg-gray-800/50 rounded-full"
              >
                <HiOutlineXMark className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={close}
            className="md:hidden text-sm font-semibold text-gray-500 dark:text-gray-400 px-2"
          >
            Cancel
          </button>

          {/* Desktop ESC Hint */}
          <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-[10px] uppercase font-bold text-gray-400 select-none">
            ESC
          </div>
        </div>

        {/* Search Content */}
        <div className="flex-1 overflow-y-auto p-2 min-h-[300px] max-h-[500px]">
          {isPending ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-400 animate-pulse">
              <HiOutlineMagnifyingGlass className="w-8 h-8 mb-2 opacity-50" />
              <span className="text-sm">Searching...</span>
            </div>
          ) : query ? (
            results.length > 0 ? (
              <div className="space-y-1">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-2 px-4">
                  Results
                </h3>
                {results.map((article) => (
                  <button
                    key={`${article.section}-${article.id}`}
                    onClick={() => handleSelect(article.section, article.slug)}
                    className="w-full flex items-start p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors group"
                  >
                    <div className="shrink-0 mt-1 mr-4 p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                      <HiOutlineDocumentText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                          {article.sectionTitle}
                        </span>
                        {article.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                        {article.excerpt}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                <p>No results found for "{query}"</p>
              </div>
            )
          ) : (
            <div className="p-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                Suggested
              </h3>
              <div className="space-y-1">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="w-full flex items-center px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group"
                  >
                    <HiOutlineMagnifyingGlass className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 text-xs text-center text-gray-500">
          Press{' '}
          <kbd className="font-sans px-1 rounded bg-gray-200 dark:bg-gray-700">
            ↵
          </kbd>{' '}
          to select
        </div>
      </div>
    </Modal>
  );
}
