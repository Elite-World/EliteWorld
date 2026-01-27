---
description: Create a new UI component (`src/components/[Name].tsx`) following strict Premium Aesthetic guidelines (Glassmorphism, Tailwind, Lucide).
---

1.  **Understand the Request**:
    - Identify the component name (e.g., `LessonPlayer`, `StatCard`).
    - Identify its purpose and props.

2.  **Scaffold the File (`src/components/[Name].tsx`)**:
    - **Imports**:
      - `'use client';` (Default to client components for interaction).
      - `import React from 'react';`
      - `import { cn } from '@/lib/utils';` (or equivalent).
      - `import { IconName } from 'lucide-react';` (Use Lucide for all icons).
    - **Interface**:
      - Define `[Name]Props` including `className`.
    - **Component Structure**:
      - Use semantic HTML (`article`, `section`, `button`).
      - **Defaults**:
        - `rounded-2xl` or `rounded-xl` (No small border-radius).
        - `bg-white` with `shadow-sm` or `shadow-md`.
        - `transition-all duration-300` on interactive elements.
        - `hover:-translate-y-1 hover:shadow-xl` for cards.
        - `backdrop-blur-md bg-white/80` for overlays/sticky headers.
        - `text-gray-900` for headings, `text-gray-500` for body.
        - `text-teal-600` for primary accents.

3.  **Template Code**:

    ```tsx
    'use client';

    import React from 'react';
    import { cn } from '@/lib/utils'; // Or equivalent
    import { Sparkles } from 'lucide-react';

    interface MyComponentProps {
      title: string;
      className?: string;
    }

    const MyComponent: React.FC<MyComponentProps> = ({ title, className }) => {
      return (
        <div
          className={cn(
            'group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-xl border border-gray-100',
            className,
          )}
        >
          <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
            <Sparkles className="text-teal-400" size={24} />
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>

          <div className="h-1 w-12 bg-teal-500 rounded-full mb-4 group-hover:w-20 transition-all" />

          <p className="text-gray-500">Premium component content goes here.</p>
        </div>
      );
    };

    export default MyComponent;
    ```

4.  **Confirm**:
    - Create the file.
    - Ask the user if they want to export it in `src/components/index.ts`.
