'use client';

import React from 'react';
import { motion } from 'framer-motion';

const RankingHero: React.FC = () => {
  return (
    <div className="relative bg-white dark:bg-zinc-900 overflow-hidden border-b border-gray-100 dark:border-zinc-800">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-20 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 -right-20 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight tight-kerning">
            World University Rankings
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            Discover the world&apos;s most prestigious institutions. A curated,
            interactive guide to top-tier education.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RankingHero;
