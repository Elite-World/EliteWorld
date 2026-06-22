'use client';
import nextDynamic from 'next/dynamic';

export const RankingMap = nextDynamic(() => import('./RankingMap'), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-gray-100 dark:bg-white/5 rounded-3xl animate-pulse" />
});
