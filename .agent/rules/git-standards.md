---
description: Permanent strict rules for Git Commits and Version Control styling.
---

# Git Commit & Branching Standards

To maintain a clean and readable version history in the monorepo, follow these git conventions:

## 1. Commit Message Format (Conventional Commits)

All commit messages must follow the Conventional Commits structure:

```
<type>(<scope>): <description>

[optional body]
```

### Allowed Types

- `feat`: A new user-facing feature or vertical.
- `fix`: A bug fix (UI, API, database).
- `docs`: Documentation changes only (e.g., modifying rules, markdown guides).
- `style`: Changes that do not affect the meaning of the code (formatting, white-space, missing semi-colons).
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `perf`: A code change that improves performance.
- `test`: Adding missing tests or correcting existing tests.
- `chore`: Changes to the build process, tool configurations, dependencies, or repository hygiene (e.g., deleting scratchpads).

### Allowed Scopes

Scopes must correspond to the workspace app or package affected:
- `landing` for `apps/landing`
- `coursehub` for `apps/coursehub`
- `immigration` for `apps/immigration`
- `education` for `apps/education`
- `country` for `apps/country`
- `ui` for `packages/ui`
- `domain` for `packages/domain`
- `config` for `packages/apps-config`
- `repo` / `root` for global configuration, dev dependencies, workflows, or rules.

### Examples

- `feat(coursehub): add offline courses details modal`
- `fix(landing): fix layout shift on mobile viewports`
- `docs(repo): add git-standards rules and upgrade skill frontmatter`
- `chore(root): delete unused scratchpad and test scripts`

## 2. Commit Rules

- **Keep Commits Atomic**: Commit small, logical chunks of work. Do not bundle refactoring, features, and lint fixes in a single giant commit.
- **Write Clear Titles**: Use imperative, present tense in the description (e.g., "add features" instead of "added features"). Do not capitalize the first letter, and do not end the title with a period.
