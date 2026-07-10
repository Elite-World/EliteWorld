---
description: Steps to add a new service or data-driven vertical to the monorepo.
---

# Workflow: Add Content Vertical

Use this workflow when adding a new business service (e.g., "Visa Consulting") that requires types, static data, and a layout.

## 1. Define Types in `@repo/domain`

- Add new interfaces to `packages/domain/src/lib/types/content.ts` (or a dedicated file).
- Ensure types are exported from `packages/domain/src/index.ts`.

## 2. Create Static Data in `@repo/apps-config`

- Create a new file in `packages/apps-config/src/content/[app]/[filename].ts`.
- Export the data using the types defined in Step 1.
- _Example_: `export const visaServices: VisaService[] = [...]`.

## 3. Develop the Layout Component

- Create a new layout component in `apps/[app]/src/components/layouts/[Name].tsx`.
- Apply the `Premium Aesthetic` rules (Rule: `design-standard.md`).
- Pass the data as props (the page should fetch data and pass it to the component).

## 4. Configure Path Mapping (If New Folder)

- If you created a new subdirectory in `apps-config`, ensure `tsconfig.json` in the target app handles the path mapping:
  `"@repo/apps-config/content/*": ["../../packages/apps-config/src/content/*"]`

## 5. Implement the Next.js Page

- Create `apps/[app]/src/app/[route]/page.tsx`.
- Import the static data and the Layout component.
- Keep the page as a Server Component if possible, passing data to the "Client Component" Layout.

## 6. Verify Design & Monorepo Build

- Run `/design-critique` on the new component to ensure it meets the Elite standards.
- Run `npm run lint` and `npx turbo build` (or build the specific app using `npx turbo build --filter=[app]`) to verify that TypeScript compilation, imports, exports, and path mappings compile successfully before declaring the task complete.
