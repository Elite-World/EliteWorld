export interface Article {
  title: string;
  category: string;
  excerpt: string;
  date: string;
  tags: string[];
}

export interface Category {
  title: string;
  items: string[];
}

export const getCategories = async (): Promise<Category[]> => {
  // In the future, this could fetch from an API
  return [
    { 
      title: "出国留学",
      items: ["我适合留学吗？", "留学难度阶梯", "服务范畴"]
    },
    // ... more categories
  ];
};

export const getArticles = async (): Promise<Article[]> => {
  // In the future, this could fetch from an API
  return [
    {
      title: "我适合出国留学吗？",
      category: "出国留学",
      excerpt: "这是示例的文章摘要...",
      date: "2021-11-5",
      tags: ["建站", "文字", "推荐"]
    },
    // ... more articles
  ];
}; 