'use client';

import { Article } from '@/lib/types/content';
import { useThemeStore } from '@/lib/stores/useThemeStore';
import { Card } from './Card';
import { cn } from '@/lib/utils';
import { ImageWithFallback } from '@/components/ImageWithFallback';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <Card>
      {article.image && (
        <div className="aspect-video rounded-lg overflow-hidden mb-4">
          <ImageWithFallback
            src={article.image}
            alt={article.title}
            width={400}
            height={300}
            className="w-full h-full"
            fallbackSrc="/images/placeholder-article.png"
          />
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
      {article.excerpt && (
        <p className={cn(
          'text-sm mb-4',
          isDark ? 'text-gray-400' : 'text-gray-600'
        )}>
          {article.excerpt}
        </p>
      )}
      <div className="flex items-center justify-between">
        <div className={cn(
          'text-sm',
          isDark ? 'text-gray-500' : 'text-gray-400'
        )}>
          {article.date}
        </div>
        {article.category && (
          <div className={cn(
            'px-3 py-1 rounded-full text-sm',
            isDark 
              ? 'bg-[#2C2C2E] text-gray-300' 
              : 'bg-gray-100 text-gray-600'
          )}>
            {article.category}
          </div>
        )}
      </div>
    </Card>
  );
} 