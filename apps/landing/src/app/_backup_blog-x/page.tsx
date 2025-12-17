import { getContentProvider } from '@/lib/services/content';
import { BlogPage } from '@/lib/themes/ios/layouts/BlogPage'; // Direct import avoiding LayoutProvider registry

export const revalidate = 3600;

export default async function BlogXPage() {
  const provider = getContentProvider('notion'); // List view uses standard notion provider (no recordMap needed)
  const [articles, categories] = await Promise.all([
    provider.getArticles(),
    provider.getCategories()
  ]);

  return (
    <BlogPage 
      articles={articles} 
      categories={categories}
      basePath="/blog-x"
    />
  );
}
