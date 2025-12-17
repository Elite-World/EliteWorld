import { Article, Category } from '@/lib/types/content';

export const mockCategories: Category[] = [
  {
    id: 'cat-1',
    title: '出国留学',
    slug: 'study-abroad',
    items: [
      {
        id: 'item-1',
        title: '我适合留学吗？',
        slug: 'is-study-abroad-right-for-me',
        description: '了解留学是否适合您的情况'
      },
      {
        id: 'item-2',
        title: '留学难度阶梯',
        slug: 'study-abroad-difficulty',
        description: '各国留学难度对比'
      },
      {
        id: 'item-3',
        title: '服务范畴',
        slug: 'services',
        description: '我们提供的留学服务'
      }
    ]
  },
  {
    id: 'cat-2',
    title: '永居移民',
    slug: 'immigration',
    items: [
      {
        id: 'item-4',
        title: '我适合永居移民吗？',
        slug: 'is-immigration-right-for-me',
        description: '评估您的移民可能性'
      },
      {
        id: 'item-5',
        title: '永居vs移民',
        slug: 'permanent-residence-vs-immigration',
        description: '永居和移民的区别'
      }
    ]
  }
];

export const mockArticles: Article[] = [
  {
    id: 'article-1',
    title: '2024年留学新趋势',
    category: '出国留学',
    excerpt: '随着全球教育格局的变化，2024年留学趋势也在发生显著改变...',
    content: '完整的文章内容...',
    date: '2024-01-15',
    tags: ['留学', '趋势', '2024'],
    author: '张教授',
    readTime: 5
  },
  {
    id: 'article-2',
    title: '如何准备留学申请',
    category: '出国留学',
    excerpt: '成功的留学申请需要充分的准备和规划...',
    content: '完整的文章内容...',
    date: '2024-01-10',
    tags: ['申请', '规划', '建议'],
    author: '李顾问',
    readTime: 8
  }
]; 