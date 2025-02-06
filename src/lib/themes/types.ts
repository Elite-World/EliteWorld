import { ComponentType, ReactNode } from 'react';
import { Article, Category } from '../types/content';
import { LayoutType } from './registry';
import { NavigationData } from '../types/navigation';

// Generic type for layout props
export interface BaseLayoutProps {
  articles: Article[];
  categories: Category[];
}

export interface ThemeConfig {
  colors: {
    light: Record<string, string>;
    dark: Record<string, string>;
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

export interface ThemeStyles {
  global: Record<string, any>;
  components: Record<string, any>;
}

// Use Record type instead of mapped type
export type ThemeLayouts = Record<LayoutType, ComponentType<BaseLayoutProps>>;

export interface Theme {
  name: string;
  components: Record<string, any>;
  layouts: Record<string, any>;
  config: any;
  styles: any;
  modals: Record<string, any>;
  wrapper: (props: { children: ReactNode }) => Promise<React.ReactElement>;
}

export type ThemeType = 'ios' | 'daisy'; 