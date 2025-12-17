'use client';

import { Article } from '@/lib/types/content';
import { useThemeStore } from '@/lib/stores/useThemeStore';
import { Card } from './Card';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <Card>
      {article.image && (
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{article.title}</h3>
        {article.excerpt && (
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {article.excerpt}
          </p>
        )}
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <span>{article.date}</span>
          {article.category && (
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
              {article.category}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
} 