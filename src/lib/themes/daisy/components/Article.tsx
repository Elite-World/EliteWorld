'use client';

import { useThemeStore } from '@/lib/stores/useThemeStore';

interface ArticleProps {
  title?: string;
  content?: string;
}

export function Article({ title = "Sample Article", content = "Sample content" }: ArticleProps) {
  const isDark = useThemeStore((state) => state.isDark);
  
  return (
    <article className="prose dark:prose-invert mx-auto">
      <h1>{title}</h1>
      <p>{content}</p>
    </article>
  );
} 