# Next.js Performance Mandate

1. **Default to strictly Static Site Generation (SSG)** for all marketing and landing pages.
2. **Zero unnecessary client-side hydration**; use React Server Components (RSC) by default.
3. **Maximum allowed First Load JS per page is 100 kB**.
4. **All images must utilize the next/image component** with explicitly defined `width`, `height`, and `priority` tags for above-the-fold content.
5. **Never use heavy third-party animation libraries** (e.g., Framer Motion, GSAP) for simple UI transitions; use native CSS instead.
