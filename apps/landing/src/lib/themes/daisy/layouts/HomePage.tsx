'use client';

import { Article, Category } from '@/lib/types/content';
import { useThemeStore } from '@/lib/stores/useThemeStore';
import { themes } from '@/lib/themes';
import { cn } from '@/lib/utils';

interface HomePageProps {
  articles: Article[];
  categories: Category[];
}

export function HomePage({ articles, categories }: HomePageProps) {
  const isDark = useThemeStore((state) => state.isDark);
  const { Card, ArticleCard } = themes.daisy.components;

  return (
    <div className={cn(
      'min-h-screen transition-colors',
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'
    )}>
      <div className="container mx-auto px-6 py-12">
        {/* Daisy-style Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-[#FFB6C1] to-[#98DDCA] bg-clip-text text-transparent">
            Explore Categories
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {categories.map(category => (
              <Card key={category.id}>
                <h3 className="text-2xl font-bold mb-4">{category.title}</h3>
                <div className="space-y-3">
                  {category.items.map(item => (
                    <a
                      key={item.id}
                      href={`/${category.slug}/${item.slug}`}
                      className="block p-4 rounded-2xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300"
                    >
                      <div className="font-medium">{item.title}</div>
                      {item.description && (
                        <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">
                          {item.description}
                        </p>
                      )}
                    </a>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Daisy-style Articles */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Latest Stories</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 