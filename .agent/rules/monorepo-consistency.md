---
description: Permanent strict rules for Monorepo Consistency and Dependency Management.
---

# Monorepo Consistency Standard

To maintain a healthy monorepo, we must ensure all apps and packages remain in sync regarding core dependencies and configurations.

## 1. Version Alignment (The "Big Three")

All `package.json` files MUST use matching versions for core libraries to prevent duplicate bundling and runtime conflicts:

- **React**: `19.x` (Prefer `19.2.x` currently)
- **Next.js**: `16.1.x`
- **Tailwind CSS**: `4.1.x`

**Action**: If you see an app using `react: 18` and another using `react: 19`, you must proactively suggest an upgrade.

## 2. Port Allocation Registry

To prevent conflicts during `turbo run dev`, follow this allocation:

- **3000**: `apps/landing`
- **3001**: `apps/immigration`
- **3002**: `apps/education`
- **3003**: `apps/coursehub`
- **3004**: `apps/country`

If a new app is added, use the next available port (**3005+**).

## 3. Configuration Syncing

- **Tailwind**: All apps must use `postcss.config.mjs` with `@tailwindcss/postcss`. No `tailwind.config.ts` unless specific custom plugins are needed (Legacy support).
- **TypeScript**: Apps MUST extend the base config. Always prefer path mappings via `@repo/*`.

## 4. Content Sources

- **Static Assets**: Prefer placing standard icons/logos in `@repo/ui/src/assets` if they are used by >1 app.
- **Environment Variables**: Use `NEXT_PUBLIC_` prefix for any variable needed on the client. Keep `.env.local` strictly for secrets.
