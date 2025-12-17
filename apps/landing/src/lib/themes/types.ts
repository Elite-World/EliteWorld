import { ComponentType, ReactNode } from 'react';
import { Article, Category } from '../types/content';
import { LayoutType } from './registry';
import { NavigationData } from '../types/navigation';

// Generic type for layout props
export interface BaseLayoutProps {
  articles?: Article[];
  article?: Article;
  relatedArticles?: Article[];
  prevArticle?: Article | null;
  nextArticle?: Article | null;
  categories?: Category[];
  content?: string;
  basePath?: string;
}

export interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  muted: {
    background: string;
    foreground: string;
    border: string;
  };
  accent?: Record<string, string>;
}

export interface ThemeConfig {
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
  typography: {
    fontFamily: string;
    fontSize: Record<string, string>;
    fontWeight: Record<string, string>;
  };
  layout: {
    maxWidth: string;
    containerPadding: string;
    borderRadius: Record<string, string>;
  };
}

export interface ComponentStyles {
  base: string;
  [key: string]: string; // For variants like light, dark, primary, secondary
}

export interface ThemeStyles {
  global: {
    body: {
      bg: string;
      color: string;
      WebkitFontSmoothing: string;
      MozOsxFontSmoothing: string;
    };
    [key: string]: any;
  };
  components: {
    card: ComponentStyles;
    button: ComponentStyles;
    input: ComponentStyles;
    [key: string]: ComponentStyles;
  };
}

// Use Record type instead of mapped type
export type Layouts = Record<LayoutType, ComponentType<BaseLayoutProps>>;

export interface ThemeComponentProps {
  className?: string;
  children?: React.ReactNode;
  isDark?: boolean;
}

export interface Theme {
  /**
   * Theme name (e.g., 'ios', 'daisy')
   */
  name: string;
  /**
   * Theme components (e.g., Card, Article)
   */
  components: Record<string, ComponentType<any>>;
  layouts: Record<string, any>;
  config: ThemeConfig;
  styles: ThemeStyles;
  modals: Record<string, any>;
  wrapper: ComponentType<{ children: ReactNode; navigation: NavigationData }>;
}

export type ThemeType = 'ios' | 'daisy'; 