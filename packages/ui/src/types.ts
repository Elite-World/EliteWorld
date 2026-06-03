export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
  children?: NavigationItem[];
}

export interface NavigationData {
  items: NavigationItem[];
}
