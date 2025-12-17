export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavigationItem[];
}

export interface NavigationData {
  items: NavigationItem[];
}
