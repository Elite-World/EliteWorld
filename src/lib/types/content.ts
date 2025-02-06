export interface Article {
  id: string;
  title: string;
  excerpt?: string;
  content?: string;
  date: string;
  category?: string;
  image?: string;
  readTime?: number;
  slug: string;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  items: CategoryItem[];
}

export interface CategoryItem {
  id: string;
  title: string;
  slug: string;
  description?: string;
} 