# Workspace Rules & Guidelines

These instructions define strict cognitive patterns and standards for all AI agents working in this workspace.

## 1. Cognitive Pattern: Macro Lens Before Micro Lens (MANDATORY)

Before making any code changes, creating files, or writing implementation plans:
1.  **Zoom Out (Macro Lens)**:
    *   Inspect root-level configurations: `package.json` overrides, `tsconfig.json`, and `turbo.json`.
    *   Check shared packages in `packages/*` for existing base configs (e.g., typescript configurations in `@repo/tooling`, shared domain types in `@repo/domain`, etc.).
    *   Verify that any new dependency or version aligns with standard monorepo packages.
2.  **Zoom In (Micro Lens)**:
    *   Perform code edits only after confirming they adhere to and inherit from the macro configurations.
    *   Never write duplicate configuration parameters or create standalone configurations that bypass shared packages.

## 2. Monorepo Configuration Standards

-   **TypeScript**: Every app and package must extend the shared base typescript configuration (`extends: "@repo/tooling/typescript/base.json"` or relative `../../packages/tooling/typescript-config/base.json` for apps) instead of redefining compiler settings.
-   **Tailwind CSS**: Do not use `tailwind.config.ts`. Custom design tokens must be declared in the main CSS file using the Tailwind v4 CSS-first `@theme` directive.
-   **Dependency Alignment**: Ensure React, Next.js, and core dependencies match the root overrides.

## 3. Git & Code Hygiene

-   **Scratch Files**: Run developer experiments or tests exclusively inside a `.gitignore`'d `scratch/` folder or root test scripts (e.g., `scratch.js`, `test-*.js`). Never commit playground scripts, mock database datasets, or draft schemas to the git repository.
-   **CLI Scripts**: All runner or seed scripts in the `scripts/` folder that connect to MongoDB must explicitly call `process.exit(0)` or `await mongoose.disconnect()` upon completion to prevent CI/CD hanging.
-   **Commit Formatting**: Use Conventional Commits with logical scopes matching your changes (e.g. `feat(coursehub): ...`, `chore(root): ...`).
