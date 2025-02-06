export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface NavigationData {
  items: NavigationItem[];
} 