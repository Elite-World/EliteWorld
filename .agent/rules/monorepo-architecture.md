---
description: Permanent strict rules for Monorepo Architecture. ALWAYS adhere to "Share Logic, Not Dependencies".
---

# Monorepo Golden Rules

You must strictly adhere to these rules when creating new apps, installing dependencies, or refactoring code.

## 1. Share Logic, Not Dependencies

- **DEPENDENCY ISOLATION**: Apps (e.g., `apps/coursehub`) MUST explicitly declare their own runtime dependencies (`react`, `lucide-react`, `tailwindcss`) in their `package.json`.
- **NO ROOT DEPENDENCIES**: NEVER rely on the root `package.json` to provide runtime libraries for apps. The root is ONLY for dev tools (`turbo`, `prettier`, `husky`).
- **NO PHANTOM DEPENDENCIES**: Do not import a library in an app unless it is in that app's `package.json`, even if it works locally due to hoisting.

## 2. Shared Packages (`packages/*`)

- **DECOUPLING**: Shared packages (`@repo/ui`) must NOT force specific dependency versions on consumers.
- **PEER DEPENDENCIES**: Prefer using `peerDependencies` for libraries like `react` or `lucide-react` in shared packages to allow apps to control the version.
- **NO CIRCULAR IMPORTS**: A shared package MUST NEVER import from an App.

## 3. Implementation Guidelines

- **LOCAL UTILS**: Prefer duplicating tiny utilities (like `cn` in `lib/utils.ts`) into apps rather than coupling them to a heavy shared library just for one function.
- **VERSION ALIGNMENT**: While apps _can_ have different versions, proactively try to align core library versions across the workspace.

## 4. Standardized Tech Stack (Mandatory Versions)

All workspaces must adhere to these exact versions to prevent duplicate instances and conflicts.

- **React**: `19.0.0` (Use this EXACT version to match Root Override)
- **Next.js**: `16.1.x`
- **Tailwind CSS**: `v4.x` (Native, NO Autoprefixer)
- **Lucide React**: `0.563.x`

If you need to upgrade a core library, you MUST upgrade it across the entire Monorepo at once using:
`npm install lib@new --workspaces --save-exact`
