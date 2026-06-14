'use client';
import { Article, Category } from '../../lib/types/content';
import { useThemeStore } from '../../lib/stores/useThemeStore';
import { cn } from '../../lib/utils';
// @ts-ignore - Newsletter form might be app specific, but we can try to find a common one or pass it as prop
// For now, we'll accept it as a prop or optional content
import { HeroSection } from '@repo/ui';
import { useState, useEffect } from 'react';
import { ArticleCard } from '../shared/ArticleCard';
import { NewsletterSection } from '../shared/NewsletterSection';
import { subscribeToNewsletter } from '@repo/cms/actions/newsletter';
import { HiFunnel, HiXMark } from 'react-icons/hi2';
import { useRibbonStore } from '../../lib/stores/useRibbonStore';

interface BlogPageProps {
  articles: Article[];
  categories: Category[];
  basePath?: string;
  title?: string;
  backgroundImage?: string;
  NewsletterComponent?: React.ComponentType;
  locale?: string;
}

export function BlogPage({
  articles,
  categories,
  basePath,
  title = 'Insights & Updates',
  backgroundImage = '/images/blog-hero.jpg', // Default fallback
  locale,
  // NewsletterComponent,
}: BlogPageProps) {
  const isDarkStore = useThemeStore((state) => state.isDark);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDark = isMounted ? isDarkStore : false;

  const [selectedCategory, setSelectedCategory] = useState<string>(locale === 'zh' ? '全部' : 'All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState<number>(6); // Start with 6 grid items (+1 featured)

  const allCategories = [
    { id: 'all', title: locale === 'zh' ? '全部' : 'All', slug: 'all', items: [] },
    ...categories,
  ];

  const filteredArticles =
    selectedCategory === (locale === 'zh' ? '全部' : 'All')
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  const featuredArticle = filteredArticles[0];
  const allRecentArticles = filteredArticles.slice(1);
  const visibleRecentArticles = allRecentArticles.slice(0, visibleCount);

  // Reset pagination when category changes
  // Register Filter Button in Global Ribbon
  const registerButton = useRibbonStore((state) => state.registerButton);
  const unregisterButton = useRibbonStore((state) => state.unregisterButton);

  useEffect(() => {
    const filterButtonId = 'blog-filter-trigger';

    const updateVisibility = () => {
      const isScrolled = window.scrollY > 300;
      
      useRibbonStore.getState().updateButton(filterButtonId, { 
         visible: isScrolled 
      });
    };

    registerButton({
      id: filterButtonId,
      icon: HiFunnel,
      label: locale === 'zh' ? '筛选' : 'Filter',
      onClick: () => setIsFilterOpen(true),
      priority: 10, // Higher than ScrollToTop (-100)
      visible: typeof window !== 'undefined' ? window.scrollY > 300 : false
    });

    window.addEventListener('scroll', updateVisibility);
    window.addEventListener('resize', updateVisibility);

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
      unregisterButton(filterButtonId);
    };
  }, [registerButton, unregisterButton]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(6);
  };

  return (
    <div className="min-h-screen">
      <HeroSection
        mode="page"
        title={title}
        backgroundImage={backgroundImage}
      />
      <div className="container mx-auto px-4 pt-8 md:pt-12 mb-16">
        {/* Inline Category Tags Bar Removed - Using Ribbon Filter Instead */}
        <>
          {isFilterOpen && (
            <div
              className="fixed inset-0 z-60 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-500"
              onClick={() => setIsFilterOpen(false)}>
              <div
                className={cn(
                  'w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-4xl p-8 shadow-2xl border relative',
                  isDark
                    ? 'bg-[#121212] border-white/10'
                    : 'bg-white border-white',
                )}
                onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-8">
                  <h3
                    className={cn(
                      'text-2xl font-black uppercase tracking-tighter',
                      isDark ? 'text-white' : 'text-gray-900',
                    )}
                  >
                    {locale === 'zh' ? '按主题筛选' : 'Filter by Topic'}
                  </h3>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                  >
                    <HiXMark className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {allCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        handleCategoryChange(category.title);
                        setIsFilterOpen(false);
                      }}
                      className={cn(
                        'px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition duration-200',
                        selectedCategory === category.title
                          ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-105'
                          : isDark
                            ? 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5 hover:border-white/20 hover:text-white'
                            : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200 hover:text-gray-900',
                      )}
                    >
                      {category.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>

        {/* Featured Article */}
        {featuredArticle && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-px bg-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                {selectedCategory === (locale === 'zh' ? '全部' : 'All')
                  ? (locale === 'zh' ? '编辑推荐' : 'Editor Pick')
                  : (locale === 'zh' ? `${selectedCategory} 热门` : `Top in ${selectedCategory}`)}
              </span>
            </div>
            <h2
              className={cn(
                'text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-8',
                isDark ? 'text-white' : 'text-gray-900',
              )}
            >
              {selectedCategory === (locale === 'zh' ? '全部' : 'All')
                ? (locale === 'zh' ? '精选文章' : 'Featured')
                : (locale === 'zh' ? `${selectedCategory} 最新文章` : `Latest in ${selectedCategory}`)}
            </h2>
            <div key={featuredArticle.id} className="animate-in fade-in duration-500">
              <ArticleCard
                article={featuredArticle}
                variant="featured"
                basePath={basePath}
              />
            </div>
          </section>
        )}

        {/* Recent Articles Grid */}
        <section>
          {visibleRecentArticles.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-px bg-purple-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-600">
                  {locale === 'zh' ? '每日简报' : 'Daily Brief'}
                </span>
              </div>
              <h2
                className={cn(
                  'text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none',
                  isDark ? 'text-white' : 'text-gray-900',
                )}
              >
                {locale === 'zh' ? '最近发布' : 'Recent Posts'}
              </h2>
            </div>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleRecentArticles.map((article) => (
              <div key={article.id} className="animate-in fade-in duration-500">
                <ArticleCard article={article} basePath={basePath} />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleRecentArticles.length < allRecentArticles.length && (
            <div className="mt-20 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className={cn(
                  'px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition transform hover:scale-105 active:scale-95 border',
                  isDark
                    ? 'bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/40 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]'
                    : 'bg-white text-gray-900 border-gray-200 hover:border-gray-900 shadow-md hover:shadow-xl',
                )}
              >
                {locale === 'zh' ? '加载更多文章' : 'Load More Articles'}
              </button>
            </div>
          )}
          {filteredArticles.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              {locale === 'zh' ? '该分类下没有文章。' : 'No articles found in this category.'}
            </div>
          )}
        </section>

        {/* Newsletter CTA */}
        <div className="mt-16">
          <NewsletterSection onSubmit={async (email, categories) => { await subscribeToNewsletter(email, categories); }} />
        </div>
      </div>
    </div>
  );
}
