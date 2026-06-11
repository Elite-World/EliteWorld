'use client';

import React from 'react';
import { SolutionCard, PopulatedSolution } from '@repo/domain';

interface SolutionsGridProps {
  solutions: PopulatedSolution[];
  locale: string;
}

export function SolutionsGrid({ solutions, locale }: SolutionsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {solutions.map((sol) => (
        <SolutionCard 
          key={sol._id?.toString() || Math.random().toString()} 
          solution={sol} 
          mode="explore" 
          locale={locale}
        />
      ))}
    </div>
  );
}
