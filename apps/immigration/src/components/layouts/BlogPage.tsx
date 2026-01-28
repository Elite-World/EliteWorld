'use client';

import { Article, Category } from '@repo/domain';
import { useThemeStore } from '@repo/domain';
import { cn } from '@repo/domain';
import { motion } from 'framer-motion';
import { NewsletterForm } from '@/components/marketing/NewsletterForm';

interface BlogPageProps {
  articles: Article[];
  categories: Category[];
  basePath?: string;
  title?: string;
}

import { HeroSection } from '@repo/ui';
import { siteConfig } from '@repo/apps-config/immigration/site-config';

import { useState } from 'react';

import { ArticleCard } from '@repo/domain';

export function BlogPage(props: BlogPageProps) {
  const { articles, categories, basePath } = props;
  const isDark = useThemeStore((state) => state.isDark);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState<number>(6); // Start with 6 grid items (+1 featured)

  const allCategories = [{ id: 'all', title: 'All' }, ...categories];

  const filteredArticles =
    selectedCategory === 'All'
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  const featuredArticle = filteredArticles[0];
  const allRecentArticles = filteredArticles.slice(1);
  const visibleRecentArticles = allRecentArticles.slice(0, visibleCount);

  // Reset pagination when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(6);
  };

  return (
    <div className="min-h-screen">
      <HeroSection
        mode="page"
        title={props.title || 'Insights & Updates'}
        backgroundImage={siteConfig.ogImage}
      />
      <div className="container mx-auto px-4 pt-12">
        <section
          className={cn(
            'sticky top-0 z-50 -mx-4 px-4 py-4 mb-8 transition-all duration-300',
            'bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800'
          )}
        >
          <div className="flex space-x-4 overflow-x-auto no-scrollbar scroll-smooth">
            {allCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.title)}
                className={cn(
                  'px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all shadow-sm',
                  selectedCategory === category.title
                    ? 'bg-blue-600 text-white shadow-blue-200/50 hover:bg-blue-700'
                    : isDark
                    ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 border border-gray-700/50'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                )}
              >
                {category.title}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Article */}
        {featuredArticle && (
          <section className="mb-16">
            <h2
              className={cn(
                'text-2xl font-semibold mb-6',
                isDark ? 'text-gray-200' : 'text-gray-800'
              )}
            >
              {selectedCategory === 'All'
                ? 'Featured'
                : `Latest in ${selectedCategory}`}
            </h2>
            <motion.div
              key={featuredArticle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ArticleCard
                article={featuredArticle}
                variant="featured"
                basePath={basePath}
              />
            </motion.div>
          </section>
        )}

        {/* Recent Articles Grid */}
        <section>
          {visibleRecentArticles.length > 0 && (
            <h2
              className={cn(
                'text-2xl font-semibold mb-6',
                isDark ? 'text-gray-200' : 'text-gray-800'
              )}
            >
              Recent Posts
            </h2>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleRecentArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ArticleCard article={article} basePath={basePath} />
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleRecentArticles.length < allRecentArticles.length && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className={cn(
                  'px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 active:scale-95',
                  isDark
                    ? 'bg-gray-800 text-white hover:bg-gray-700 hover:shadow-lg hover:shadow-purple-900/20'
                    : 'bg-white text-gray-900 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                )}
              >
                Load More Articles
              </button>
            </div>
          )}
          {filteredArticles.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No articles found in this category.
            </div>
          )}
        </section>

        {/* Newsletter CTA */}
        <NewsletterForm />
      </div>
    </div>
  );
}
