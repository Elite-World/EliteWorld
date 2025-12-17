import { Card } from './Card';
import { Article } from './Article';
import { ArticleCard } from './ArticleCard';
import { Navbar } from './Navbar';
import { ScrollProgress } from './ScrollProgress';
import { IconButton } from './ui/IconButton';

export const components = {
  Article,
  ArticleCard,
  Card,
  Navbar,
  ScrollProgress,
  IconButton,
} as const;

// Type for components
export type ThemeComponents = typeof components; 