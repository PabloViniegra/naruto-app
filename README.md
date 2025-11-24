# Naruto Universe

A modern web application to explore the ninja world of Naruto. Browse over 1400 characters, discover clans, villages, jutsu, and much more from the Naruto and Boruto universe.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white)

## Features

- **Character Database**: Browse and search through 1400+ characters from the Naruto universe
- **Clan Explorer**: Discover legendary clans like Uchiha, Hyuga, Uzumaki, and their unique abilities
- **Village Guide**: Explore hidden villages including Konohagakure, Sunagakure, Kirigakure, and more
- **Character Details**: View detailed information including jutsu, nature types, family, rank, and voice actors
- **Dark/Light Theme**: Full theme support with system preference detection
- **Responsive Design**: Optimized for all device sizes
- **SEO Optimized**: Complete with meta tags, Open Graph, Twitter cards, sitemap, and JSON-LD structured data
- **Accessibility**: WCAG compliant with skip links and reduced motion support

## Tech Stack

### Core Framework
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Styling
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[tw-animate-css](https://github.com/ben-manes/tw-animate)** - Animation utilities

### UI Components
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable components built with Radix UI
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[class-variance-authority](https://cva.style/)** - Variant management for components

### Data and Validation
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Animations
- **[Motion](https://motion.dev/)** - Animation library
- **[OGL](https://github.com/oframe/ogl)** - WebGL library for visual effects

### Theming
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management for Next.js

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.17 or later
- **pnpm** 8.0 or later (recommended package manager)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/naruto-app.git
   cd naruto-app
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Required: API base URL for fetching Naruto data
   NEXT_API_URL=https://your-api-url.com

   # Optional: Site URL for SEO metadata
   NEXT_PUBLIC_SITE_URL=https://your-site-url.com
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Create optimized production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint for code quality checks |

## Project Structure

```
naruto-app/
├── app/                        # Next.js App Router pages and layouts
│   ├── characters/             # Characters route
│   │   ├── [id]/               # Dynamic character detail pages
│   │   ├── page.tsx            # Characters list page
│   │   ├── loading.tsx         # Loading UI
│   │   └── error.tsx           # Error boundary
│   ├── clans/                  # Clans route
│   ├── villages/               # Villages route
│   ├── globals.css             # Tailwind CSS v4 theme configuration
│   ├── layout.tsx              # Root layout with fonts and metadata
│   ├── page.tsx                # Home page
│   ├── sitemap.ts              # Dynamic sitemap generation
│   ├── robots.ts               # Robots.txt configuration
│   └── not-found.tsx           # 404 page
├── components/                 # Reusable UI components
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── pagination.tsx
│   │   ├── select.tsx
│   │   ├── skeleton.tsx
│   │   └── theme-switcher/
│   ├── providers/              # Context providers
│   └── shared/                 # Shared component utilities
├── core/                       # Core application components
│   └── components/
│       ├── main-container.tsx  # Main layout wrapper
│       └── navbar/             # Navigation bar
├── features/                   # Feature-based modules
│   ├── characters/             # Characters feature
│   │   ├── client/             # Client components
│   │   ├── server/             # Server components
│   │   ├── components/         # UI components
│   │   └── utils/              # Feature utilities
│   ├── clans/                  # Clans feature
│   ├── villages/               # Villages feature
│   └── home/                   # Home feature
├── lib/                        # Shared utilities
│   ├── api.ts                  # API fetch helper with error handling
│   └── utils.ts                # cn() utility for className merging
├── types/                      # TypeScript type definitions
│   └── index.ts                # Character and API response types
├── config/                     # Environment configuration
│   └── index.ts                # API_BASE_URL and pagination config
└── public/                     # Static assets
```

## Architecture

### Key Patterns

#### Path Aliases

Use `@/*` to import from the project root, configured in `tsconfig.json`:

```tsx
import { Button } from "@/components/ui";
import { fetchData } from "@/lib";
import { MainContainer } from "@/core";
```

#### Barrel Exports

Each module uses an `index.ts` for clean imports:

```tsx
// Feature imports
import { ServerCharacters, CharacterCard } from "@/features/characters";
import { HeroSection } from "@/features/home";

// Core imports
import { MainContainer } from "@/core";

// UI component imports
import { Button, Card, Dialog } from "@/components/ui";
```

#### Feature Organization

Features follow a consistent structure with `client/`, `server/`, `components/`, and `utils/` subdirectories:

```
features/characters/
├── client/           # Client-side interactive components
├── server/           # Server components for data fetching
├── components/       # Shared UI components for the feature
├── utils/            # Feature-specific utilities
└── index.ts          # Barrel export
```

#### API Calls

Use `fetchData<T>()` from `@/lib/api` with Next.js revalidation, error handling, and optional Zod validation:

```tsx
import { fetchData } from "@/lib/api";
import type { CharactersResponse } from "@/types";

const data = await fetchData<CharactersResponse>("/characters", {
  revalidate: 60,
  tags: ["characters"],
});
```

#### Styling

Tailwind CSS v4 with CSS variables for theming. Theme colors are defined in `app/globals.css` with full dark mode support.

#### UI Components

Built with the shadcn/ui pattern using `class-variance-authority` for variants and Radix UI primitives for accessibility.

### Named Exports

The project prefers named exports over default exports (except for Next.js special files like `page.tsx` and `layout.tsx`).

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_API_URL` | Yes | Base URL for the Naruto API |
| `NEXT_PUBLIC_SITE_URL` | No | Site URL for SEO metadata (defaults to `https://naruto-universe.com`) |

## Browser Support

This application supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Vercel (Recommended)

The easiest way to deploy this Next.js app is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to a Git repository
2. Import your project to Vercel
3. Configure environment variables in the Vercel dashboard
4. Deploy

### Other Platforms

For other deployment options, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## License

This project is for educational and personal use. Naruto and all related characters are trademarks of Masashi Kishimoto and Shueisha Inc.

---

Built with Next.js and React
