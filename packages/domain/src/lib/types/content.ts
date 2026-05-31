export interface Article {
  id: string;
  title: string;
  excerpt?: string;
  content?: string;
  date: string;
  category?: string;
  tags?: string[];
  image?: string;
  readTime?: number;
  slug: string;
  recordMap?: any; // For react-notion-x
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