'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils';

interface Tab {
  id: string;
  label: string;
  count?: number;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export function Tabs({ tabs, defaultTab, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  return (
    <div className={cn('w-full', className)}>
      {/* Tab Headers */}
      <div className="flex overflow-x-auto border-b border-gray-100 dark:border-white/5 scrollbar-hide mb-8">
        <div className="flex gap-8 min-w-full px-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'relative pb-4 transition-all duration-300 outline-none group',
                activeTab === tab.id
                  ? 'text-blue-600'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200',
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  {tab.label}
                </span>
                {tab.count !== undefined && (
                  <span
                    className={cn(
                      'px-2 py-0.5 text-[8px] font-black rounded-full transition-colors',
                      activeTab === tab.id
                        ? 'bg-blue-600/10 text-blue-600 border border-blue-600/20'
                        : 'bg-gray-50 text-gray-400 border border-gray-100 dark:bg-white/5 dark:border-white/10',
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </div>

              {/* Active Indicator Line */}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {tabs.map(
            (tab) =>
              tab.id === activeTab && (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="w-full"
                >
                  {tab.content}
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
