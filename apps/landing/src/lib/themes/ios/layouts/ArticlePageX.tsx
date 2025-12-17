'use client';

import { useState, useEffect } from 'react';
import { Article } from '@/lib/types/content';
import { HeroSection } from '../components/HeroSection';
import { useThemeStore } from '@/lib/stores/useThemeStore';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
import { themes } from '@/lib/themes';

// react-notion-x imports
import { NotionRenderer } from 'react-notion-x';
import { Code } from 'react-notion-x/build/third-party/code';
import { Collection } from 'react-notion-x/build/third-party/collection';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { Modal } from 'react-notion-x/build/third-party/modal';
import { Pdf } from 'react-notion-x/build/third-party/pdf';

import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';
import './notion-overrides.css';

interface Category {
  id: string;
  title: string;
}

interface BaseLayoutProps {
  article: Article;
  relatedArticles?: Article[];
  prevArticle?: Article | null;
  nextArticle?: Article | null;
  categories?: Category[];
  basePath?: string;
}

export function ArticlePageX({ article, relatedArticles, prevArticle, nextArticle, categories, basePath = '/blog-x' }: BaseLayoutProps) {
  const isDark = useThemeStore((state) => state.isDark);
  const { Article: ArticleCard } = themes.ios.components;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!article) return null;

  const activeCategory = categories?.find(c => c.id === article.category) || { title: article.category };

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <HeroSection 
        mode="page"
        title={article.title}
        subtitle={article.excerpt}
        backgroundImage={article.image}
      />

      <div className="container mx-auto px-4 max-w-4xl -mt-20 relative z-10">
         {/* Article Card Wrapper */}
         <div className={cn(
             "rounded-3xl p-8 md:p-12 shadow-xl",
             isDark ? "bg-[#1C1C1E] border border-gray-800" : "bg-white"
         )}>
             {/* Metadata Header */}
             <div className="flex flex-wrap items-center gap-4 mb-8 text-sm font-medium">
                 <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                     {activeCategory.title}
                 </span>
                 <span className={isDark ? "text-gray-400" : "text-gray-500"}>
                     {new Date(article.date).toLocaleDateString(undefined, { 
                         year: 'numeric', 
                         month: 'long', 
                         day: 'numeric' 
                     })}
                 </span>
             </div>

             {/* Summary / Key Takeaways Section */}
             {article.excerpt && (
                <div className={cn(
                    "mb-10 p-6 rounded-2xl border-l-4",
                    isDark 
                        ? "bg-blue-900/10 border-blue-500 text-gray-200" 
                        : "bg-blue-50 border-blue-500 text-gray-700"
                )}>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                        Summary
                    </h3>
                    <p className="font-medium leading-relaxed">
                        {article.excerpt}
                    </p>
                </div>
             )}

             {/* Content via NotionRenderer */}
             {article.recordMap && isMounted ? (
                 <div className={isDark ? "dark-mode" : ""}>
                    <NotionRenderer
                        recordMap={article.recordMap}
                        fullPage={false}
                        darkMode={isDark}
                        previewImages={!!article.recordMap.preview_images}
                        components={{
                            Code,
                            Collection,
                            Equation,
                            Modal,
                            Pdf,
                            nextImage: Image, // Use Next.js Image
                            nextLink: Link    // Use Next.js Link
                        }}
                    />
                 </div>
             ) : (
                 <div className="text-red-500">RecordMap not found. Fetch failed.</div>
             )}
         </div>

         {/* Navigation: Prev / Next */}
         {(prevArticle || nextArticle) && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                 {prevArticle ? (
                     <Link 
                         href={`${basePath}/${prevArticle.slug}`}
                         className={cn(
                             "group block p-6 rounded-2xl transition-all",
                             isDark 
                                 ? "bg-[#1C1C1E] hover:bg-[#2C2C2E] border border-gray-800" 
                                 : "bg-white hover:bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md"
                         )}
                     >
                         <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                             <HiArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1" />
                             Previous Article
                         </div>
                         <h4 className={cn("font-semibold line-clamp-2", isDark ? "text-gray-200" : "text-gray-900")}>
                             {prevArticle.title}
                         </h4>
                     </Link>
                 ) : <div />}

                 {nextArticle && (
                     <Link 
                         href={`${basePath}/${nextArticle.slug}`}
                         className={cn(
                             "group block p-6 rounded-2xl transition-all text-right",
                             isDark 
                                 ? "bg-[#1C1C1E] hover:bg-[#2C2C2E] border border-gray-800" 
                                 : "bg-white hover:bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md"
                         )}
                     >
                         <div className="flex items-center justify-end text-sm text-gray-500 dark:text-gray-400 mb-2">
                             Next Article
                             <HiArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                         </div>
                         <h4 className={cn("font-semibold line-clamp-2", isDark ? "text-gray-200" : "text-gray-900")}>
                             {nextArticle.title}
                         </h4>
                     </Link>
                 )}
             </div>
         )}

         {/* Related Articles */}
         {relatedArticles && relatedArticles.length > 0 && (
             <div className="mt-20">
                 <h3 className={cn(
                     "text-2xl font-bold mb-8",
                     isDark ? "text-gray-200" : "text-gray-900"
                 )}>
                     You might also like
                 </h3>
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {relatedArticles.map((related) => (
                         <div key={related.id}>
                            <ArticleCard article={related} basePath={basePath} />
                         </div>
                     ))}
                 </div>
             </div>
         )}
      </div>
    </div>
  );
}
