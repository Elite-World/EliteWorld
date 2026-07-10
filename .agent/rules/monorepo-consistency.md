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

- **Tailwind**: All apps must use `postcss.config.mjs` with `@tailwindcss/postcss`. Do NOT use `tailwind.config.ts` or `tailwind.config.js`. Under Tailwind CSS v4, all theme configurations (custom colors, fonts, shadows, transitions, etc.) must be declared in the main CSS file using the `@theme` directive.
- **TypeScript**: Apps MUST extend the base config. Always prefer path mappings via `@repo/*`.

## 4. Content Sources

- **Static Assets**: Prefer placing standard icons/logos in `@repo/ui/src/assets` if they are used by >1 app.
- **Environment Variables**: Use `NEXT_PUBLIC_` prefix for any variable needed on the client. Keep `.env.local` strictly for secrets.

## 5. Repository Hygiene (Scratchpads & Test Files)

- **Scratch Files**: Always run temporary/test scripts (like one-off DB query tests, third-party API probes, or playground scripts) inside a dedicated `scratch/` folder.
- **Git Hygiene**: Add all temporary playground files and scratch folders to your local `.gitignore`. NEVER commit scratchpads, mock datasets, or conceptual draft schemas to git unless explicitly documented as a production seed script under `scripts/`.
- **CLI Script Hygiene**: All runner or seed scripts in the `scripts/` folder that connect to MongoDB must explicitly call `process.exit(0)` or `await mongoose.disconnect()` upon completion to prevent CI/CD jobs and terminals from hanging.
