'use client';

import { BlogPage as BlogPageLayout } from '@repo/domain';
import { Article, Category } from '@repo/domain';
import { siteConfig } from '@repo/apps-config/education/site-config';
import { NewsletterForm } from '@/components/marketing/NewsletterForm';

interface BlogPageProps {
  articles: Article[];
  categories: Category[];
  basePath?: string;
  title?: string;
  locale?: string;
}

export function BlogPage(props: BlogPageProps) {
  return (
    <BlogPageLayout
      {...props}
      title={props.title || 'Education Insights'}
      backgroundImage={siteConfig.ogImage}
      NewsletterComponent={NewsletterForm}
      locale={props.locale}
    />
  );
}
