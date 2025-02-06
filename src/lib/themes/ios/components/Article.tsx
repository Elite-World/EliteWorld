'use client';

import { useThemeStore } from '@/lib/stores/useThemeStore';

interface ArticleProps {
  title?: string;
  content?: string;
}

export function Article({ title = "Sample Article", content = "Sample content" }: ArticleProps) {
  const isDark = useThemeStore((state) => state.isDark);
  
  return (
    <article className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <p className={`${isDark ? 'text-[#98989d]' : 'text-[#86868b]'} leading-relaxed`}>
        {content}
      </p>
    </article>
  );
} 