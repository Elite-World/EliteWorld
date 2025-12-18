import { ReactNode } from 'react';

export type Subdomain = 'immi' | 'edu' | 'www';

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode;
  children?: NavigationItem[];
  subdomains?: Subdomain[];
}

export interface NavigationData {
  items: NavigationItem[];
} 