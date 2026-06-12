---
description: Specific visual and interaction standards for the "Elite World" brand.
---

# Elite World Design Standard (Premium Aesthetic)

All UI components and pages must adhere to these specific tokens and patterns to ensure a high-end, cohesive experience.

## 1. Color Palette

### Primary & Accents

- **Elite Blue (Primary)**: `#4C5CEC` (Use for accents, icons, and primary buttons).
- **Vibrant Gradient**: `bg-linear-to-r from-blue-500 to-purple-500` (User preferred for Hero and CTA text/elements).
- **Elite Navy (Secondary)**: `#010022` (Use for main headings and dark theme highlights).
- **Luxury Dark**: `#0a0a0a` (The standard background for dark mode sections).

### Surfaces

- **App Light**: `bg-white` / `bg-gray-50`.
- **App Dark**: `bg-[#0a0a0a]` (Primary) / `bg-[#111111]` (Secondary).
- **Glassmorphism**:
  - Light: `bg-white/80 backdrop-blur-xl border border-white/20`.
  - Dark: `bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5`.

## 2. Typography

- **Headings**: `font-black text-white uppercase tracking-tighter leading-[0.9]`.
- **Subheadings**: `text-[10px] mobile:text-[8px] font-black uppercase tracking-[0.2em] or tracking-[0.3em] text-blue-600`.
- **Body**: `text-sm font-medium leading-relaxed text-gray-500 dark:text-gray-400`.
- **Key Numbers**: `font-black tracking-tighter`.

## 3. Shapes & Shadows

- **Border Radius**:
  - Cards: `rounded-[2rem]` or `rounded-[2.5rem]`.
  - Buttons/Badges: `rounded-xl` or `rounded-full`.
- **Shadows**:
  - Hover: `shadow-2xl` combined with glows (e.g. `shadow-[0_0_20px_rgba(37,99,235,0.2)]`).
- **Borders**: Ultra-subtle `border-white/5` or `border-gray-100`.

## 4. Interaction Patterns

- **Transitions**: Slower is more expensive. Use `transition-all duration-500` or `duration-700` for layout elements.
- **Hover Effects**:
  - **The "Lift"**: `hover:-translate-y-1` or `hover:-translate-y-2`.
  - **The "Glow"**: `group-hover:opacity-100` on hidden blur layers.
  - **Icon Scale**: `group-hover:scale-110` inside containers.

## 5. Scroll Reveals & Motion (Framer Motion)

To elevate pages to the "Premium Aesthetic" tier, use subtle staggered scroll reveals for card grids, lists, and headers:

- **Library**: Use `framer-motion` for client-side viewport animations.
- **Scroll reveal configurations**:
  - `initial={{ opacity: 0, y: 30 }}` (or `y: 20` for standalone titles/headers).
  - `whileInView={{ opacity: 1, y: 0 }}`.
  - `viewport={{ once: true, margin: "-100px" }}` (prevents double triggers and gives natural margins).
  - **Grid Staggering**: Use `transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}` on map items, where `[0.16, 1, 0.3, 1]` is the standard premium bezier easing.
  - **Standalone Headers**: Use `transition={{ duration: 0.8, ease: "easeOut" }}`.

## 6. Button System

**Component**: Use `<Button />` from `@repo/ui`. Do not use `<a>` or `<button>` directly for primary actions.

- **Variant: `hero`**:
  - Purpose: Primary calls-to-action on dark/hero backgrounds.
  - Style: Solid White, Black Text, Uppercase, `tracking-[0.2em]`, `rounded-4xl` (or 2xl).
- **Variant: `hero-outline`**:
  - Purpose: Secondary actions on dark/hero backgrounds.
  - Style: Glassmorphism (`bg-white/5`), White Text, `border-white/30`.
- **Variant: `default`**:
  - Purpose: Standard actions in app interfaces (forms, dashboards).
  - Style: `bg-blue-600` (Elite Blue), `text-white`, `rounded-lg`.
- **Variant: `secondary` / `outline`**:
  - Purpose: Alternative actions.
  - Style: follows the general rounded-lg shape but with subtle grays.

## 7. Layout & Spacing

To maintain consistency across all applications:

- **Global Container Width**:
  - Class: `container mx-auto px-4` (or `px-6` on larger breakpoints).
  - Max Width: Controlled by Tailwind config (default usually `1536px` for `2xl`). This ensures content never stretches infinitely on ultra-wide monitors.
- **Article / Content Width**:
  - For long-form text (blogs, documentation, policies):
  - Class: `max-w-3xl mx-auto`.
  - Rationale: Optimal reading line length (65-75 characters) for readability.
  - Context: Use inside the Global Container.

- **Section Spacing**:
  - Standard: `py-24` or `py-32` for landing pages to create premium breathing room.
  - Dense: `py-12` for functional dashboards.
