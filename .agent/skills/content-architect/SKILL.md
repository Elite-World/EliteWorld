# Content Architect Skill

This skill provides a structured method for designing, implementing, and maintaining complex business data (e.g., pricing tables, school hierarchies, service workflows) in the Elite World monorepo.

## Objectives

1.  **Standardization**: Ensure all static content follows a consistent interface.
2.  **Scalability**: Design data structures that can easily support new regions, categories, or currencies.
3.  **Correctness**: Validate that data matches the established types in `@repo/domain`.

## Design Principles

- **ID-First**: Every item must have a unique `id` (slug) for routing and keying in React.
- **Flat over Nested**: Prefer flat arrays with filtering logic in the UI over deeply nested objects.
- **Marketing Focused**: Include fields for visual elements like `tags`, `badges`, `icon`, and `image`.
- **Pricing Logic**: Group pricing data into "Packages" or "Services" with clear `price` strings and `features` arrays.

## Implementation Steps

### 1. Schema Analysis

When given a business requirement (e.g., "Add a new Executive MBA coaching plan"):

- Identify the core entities.
- Check `packages/domain/src/lib/types/content.ts` for existing types.
- If no type exists, propose a new interface that follows the "Elite Style" (e.g., using `features: { label: string, value: string }[]`).

### 2. File Placement

- **Global Config**: `packages/apps-config/src/config/[app]/[type].ts`
- **Hierarchical Data**: `packages/apps-config/src/content/[app]/[category]/[filename].ts`

### 3. Data Entry

- Use semantic names for IDs.
- Use the `Premium Aesthetic` colors in descriptions where applicable (e.g., referencing "Silver" or "Platinum" tiers).

## Examples

### Service Pricing Structure

```typescript
{
  id: 'standard-package',
  title: 'Standard Admission Suite',
  price: '¥19,800',
  features: [
    { label: 'Schools', value: 'Up to 5' },
    { label: 'Edit Rounds', value: 'Unlimited' }
  ],
  description: 'Our most popular entry-level suite...'
}
```
