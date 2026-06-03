'use client';

import React, { useEffect, useState } from 'react';
import { useDevStore } from '../../lib/stores/useDevStore';
import { Settings2 } from 'lucide-react';

export function DevToolsToggle() {
  const [mounted, setMounted] = useState(false);
  const showHiddenElements = useDevStore((state) => state.showHiddenElements);
  const setShowHiddenElements = useDevStore((state) => state.setShowHiddenElements);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-[9999] bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-full shadow-lg p-1.5 flex items-center gap-2">
      <div className="px-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
        Dev
      </div>
      <button
        onClick={() => setShowHiddenElements(!showHiddenElements)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
          showHiddenElements 
            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' 
            : 'bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700'
        }`}
      >
        <Settings2 className="w-3.5 h-3.5" />
        {showHiddenElements ? 'Hide Elements' : 'Show Elements'}
      </button>
    </div>
  );
}
