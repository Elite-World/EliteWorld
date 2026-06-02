# EliteWorld - Next.js Monorepo

Welcome to the **EliteWorld** project! This is a modern, high-performance web application built with **Next.js 15**, **React 19**, and **Turborepo**. It features a unique **Hybrid Server-Client Theming System** that ensures optimal performance and SEO while providing rich interactivity.

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **Package Manager**: npm (v9+ recommended) or pnpm
- **Git**

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/bjtiew/EliteWorld.git
    cd EliteWorld
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This command starts the `landing` app (and any other apps in the workspace) in development mode.
    Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📂 Project Structure

Verified project structure for the `apps/landing` application:

```
apps/landing/
├── src/
│   ├── app/                 # Next.js App Router (pages and layouts)
│   ├── components/          # Shared UI components
│   │   ├── providers/       # Context providers (Theme, Modal)
│   │   ├── shared/          # Reusable components across themes
│   │   └── ui/              # Generic UI elements
│   ├── config/              # Configuration files
│   │   ├── site.ts          # Site metadata and global links
│   │   └── mock-data.ts     # Mock data for development
│   ├── lib/
│   │   ├── services/        # Data fetching services
│   │   ├── stores/          # Zustand state stores
│   │   ├── themes/          # Theme definitions (The Core!)
│   │   ├── types/           # TypeScript interfaces
│   │   └── utils/           # Helper functions
│   └── public/              # Static assets (images, fonts)
├── .env.local               # Environment variables
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## ⚙️ Configuration

### Site Metadata

Located in `src/config/site.ts`. This file controls global constants like the site name, description, and social links used across the application.

### Environment Variables

Create a `.env.local` file in `apps/landing/` for local secrets.

- `NEXT_PUBLIC_API_URL`: (Example) API endpoint base URL.

## 💾 Data Management

The application currently uses a service layer pattern to abstract data fetching. This allows for easy swapping between mock data and real APIs.

- **Navigation Data**: Managed in `src/lib/services/navigation.ts`. Returns the structure for menus.
- **Content Data**: Managed in `src/lib/services/content.ts`. Fetches articles, categories, and other dynamic content.
- **Mock Data**: Initial development data is stored in `src/config/mock-data.ts`.

## 🎨 Theme System Architecture

This project implements a sophisticated **Hybrid Server-Client Theming System**.

### Core Concepts

1.  **Server-Side Rendering (SSR)**: The initial theme is determined on the server using cookies (`elitetheme`). This allows for instant compiled HTML with correct styles, preventing "flash of unstyled content" (FOUC).
2.  **Client-Side Hydration**: The `ThemeProvider` hydrates the client-side state store (`zustand`) with the server-initially-rendered theme.
3.  **Dynamic Loading**: Theme components (layouts, modals) are dynamically imported only when needed, keeping bundle sizes small.

### Theme Directory Structure (`src/lib/themes/`)

Each theme (e.g., `ios`, `daisy`) is a self-contained module:

```
src/lib/themes/[theme]/
├── components/          # Theme-specific components (Cards, Navbar, etc.)
├── layouts/             # Page layouts (HomePage, ArticlePage)
├── modals/              # Theme-specific modals
├── styles.config.ts     # CSS/Tailwind configurations
├── theme.config.ts      # Tokens (colors, typography)
└── index.ts             # Export file
```

### Adding a New Theme

1.  Create a new folder in `src/lib/themes/` (e.g., `future-tech`).
2.  Implement the required structure (`components`, `layouts`, `config`).
3.  Register the new theme in `src/lib/themes/registry.ts`.

### Theme Switching

- **User Action**: When a user switches themes (via `SwitchTheme` component), it sets a cookie (`elitetheme`) and updates the global Zustand store.
- **Mode Switching**: Dark/Light mode is handled via `next-themes` logic integrated into our custom `ThemeProvider`.

## 🛠️ Development & Deployment

### Build

To build the application for production:

```bash
npm run build
```

This runs `next build` via Turbo, generating an optimized `.next` build folder.

### Deployment

This project is deployment-ready for **Vercel**.

1.  Push your code to a Git repository.
2.  Import the project into Vercel.
3.  Ensure the "Root Directory" is set to `apps/landing` (or configure Vercel to handle monorepos automatically).
4.  Deploy!

---

_Built with ❤️ by the EliteWorld Team_

## Data Management & Scraping

If you need to update the ranking data or interact with the scraping architecture, please see the dedicated documentation in [scripts/README.md](./scripts/README.md) for full instructions, API endpoints, and cURL examples.

### AI-Generated Profiles
> **Note for Future Maintainers:** The `description` and `details.overall` fields for the top 801 globally ranked universities were procedurally generated using **Google Gemini 2.5 Flash** (via the Google Generative Language API) in June 2026. The data was generated using a strict, fact-only prompt to ensure high-quality historical and academic accuracy without generic marketing fluff. The generation and upload scripts are preserved in the `scripts/` directory (`generate_descriptions.ts` and `upload_descriptions.ts`) should you ever need to resume or regenerate profiles for the remaining universities.
