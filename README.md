This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Theme System Architecture

A flexible and extensible theme system for Next.js applications that supports multiple themes, layouts, and server/client component separation.

## Core Concepts

### Theme Structure
- Each theme is a complete set of components, layouts, and styles
- Themes are dynamically loaded based on user preference
- Server-side rendering with client-side interactivity
- Dark/Light mode support using Tailwind CSS

### Key Design Decisions
1. **Server/Client Separation**
   - Server components handle data fetching
   - Client components handle interactivity
   - Clear boundaries for better performance

2. **Dynamic Theme Loading**
   ```typescript
   // Dynamic imports based on theme registry
   const themeLayouts = Object.keys(themes).reduce((acc, themeName) => {
     acc[themeName] = {
       layouts: Object.values(LAYOUT_MAPPINGS).reduce((layouts, layoutName) => {
         layouts[layoutName] = dynamic(() => 
           import(`@/lib/themes/${themeName}/layouts/${layoutName}`)
             .then(mod => mod[layoutName])
         );
         return layouts;
       }, {})
     };
     return acc;
   }, {});
   ```

3. **Route-Layout Mapping**
   ```typescript
   // src/lib/themes/registry.ts
   export const LAYOUT_MAPPINGS = {
     '/': 'HomePage',
     '/about': 'AboutPage',
     '/blog': 'BlogPage',
     '/[slug]': 'ArticlePage',
   } as const;
   ```

## Component Architecture

### Theme Layout System
1. **Server Theme Layout** (`ThemeLayout.tsx`)
   ```typescript
   export function ThemeLayout({ data }: ThemeLayoutProps) {
     return <ClientThemeLayout data={data} />;
   }
   ```

2. **Client Theme Layout** (`ClientThemeLayout.tsx`)
   - Handles dynamic imports
   - Manages theme switching
   - Provides layout selection

3. **Theme-Specific Layouts**
   ```typescript
   // src/lib/themes/ios/layouts/ThemeLayout.tsx
   export function ThemeLayout({ children, navigation }: ThemeLayoutProps) {
     return (
       <div className="min-h-screen transition-colors bg-white dark:bg-black">
         <ScrollProgress />
         <Navbar navigation={navigation} />
         {children}
       </div>
     );
   }
   ```

### State Management

#### Theme Store
```typescript
interface ThemeState {
  isDark: boolean;
  currentTheme: ThemeName;
  toggle: () => void;
  setDark: (dark: boolean) => void;
  setTheme: (theme: ThemeName) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      currentTheme: 'ios',
      toggle: () => set((state) => ({ isDark: !state.isDark })),
      setDark: (dark) => set({ isDark: dark }),
      setTheme: (theme) => set({ currentTheme: theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);
```

## Data Flow Details

### Page Level (SSR/ISR)
```typescript
// src/app/page.tsx
export default async function Home() {
  const [navigation, articles, categories] = await Promise.all([
    getNavigationData(),
    getArticles(),
    getCategories(),
  ]);

  return (
    <ThemeLayout 
      data={{
        articles,
        categories,
        navigation,
      }}
    />
  );
}
```

### Theme Implementation

#### Theme Interface
```typescript
export interface Theme {
  name: string;
  components: Record<string, any>;
  layouts: Record<string, any>;
  config: ThemeConfig;
  styles: ThemeStyles;
  modals: Record<string, any>;
  wrapper: ComponentType<ThemeWrapperProps>;
}
```

#### Theme Configuration
```typescript
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
```

## Advanced Features

### Dynamic Route Handling
```typescript
export function getLayoutFromPath(path: string): LayoutType {
  const cleanPath = path.split('?')[0].split('#')[0];
  
  if (cleanPath in LAYOUT_MAPPINGS) {
    return LAYOUT_MAPPINGS[cleanPath as PathType];
  }

  // Handle dynamic routes
  if (cleanPath.includes('/')) {
    const dynamicPath = Object.keys(LAYOUT_MAPPINGS).find(pattern => {
      const regex = new RegExp(
        '^' + pattern.replace(/\[.*?\]/g, '[^/]+') + '$'
      );
      return regex.test(cleanPath);
    });
    if (dynamicPath) {
      return LAYOUT_MAPPINGS[dynamicPath as PathType];
    }
  }

  return 'HomePage';
}
```

### Performance Optimizations
1. **Code Splitting**
   - Dynamic imports for each theme
   - Lazy loading of layouts
   - Component-level code splitting

2. **State Management**
   - Persistent theme preferences
   - Optimized re-renders
   - Proper state isolation

3. **SSR/ISR Strategy**
   - Server-side data fetching
   - Incremental Static Regeneration
   - Client-side state hydration

## Development Workflow

### Adding a New Theme
1. Create theme directory structure:
   ```
   src/lib/themes/[theme]/
   ├── components/
   ├── layouts/
   ├── modals/
   ├── index.ts
   └── theme.config.ts
   ```

2. Implement required interfaces:
   - Layouts for each route
   - Theme-specific components
   - Modal components
   - Theme configuration

3. Export theme in registry:
   ```typescript
   export const themes = {
     ios: IosTheme,
     daisy: DaisyTheme,
     [newTheme]: NewTheme
   } as const;
   ```

### Adding a New Page
1. Add route mapping
2. Create layouts in each theme
3. Update types
4. Add data fetching if needed

## Testing Considerations
- Component testing with theme context
- Layout testing with different themes
- Dark mode testing
- Route testing
- State management testing

## Future Roadmap
- [ ] Theme transition animations
- [ ] Theme preview system
- [ ] Theme customization UI
- [ ] Error boundaries per theme
- [ ] Theme-specific routing
- [ ] Theme migration tools
- [ ] Theme documentation generator
