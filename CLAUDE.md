# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for "rai.bio" built with TanStack Start (TanStack Router + Vite/Nitro). The site features a homepage, MDX-based blog system, projects, and contact pages with modern styling and theming.

## Development Commands

```bash
bun run dev          # Start the TanStack Start dev server
bun run build        # Build for production
bun run preview      # Preview the production build
```

## Package Management

- Uses **bun** as the package manager (specified in package.json)
- When installing packages, use `bun add` instead of `npm install`

## Architecture & Key Technologies

### Tech Stack

- **TanStack Start** with **TanStack Router** (file-based routes)
- **TypeScript** with strict configuration and path aliases (@/*)
- **Tailwind CSS v4** with custom theme using CSS variables and OKLCH color space
- **Shadcn/ui** components with Radix UI primitives
- **Markdown/MDX content** parsed via gray-matter + react-markdown + remark/rehype

### Project Structure

```
src/
├── routes/                 # TanStack Router file-based routes
│   ├── __root.tsx          # Root document + layout
│   ├── index.tsx           # Homepage
│   ├── projects.tsx        # Projects page
│   ├── contact.tsx         # Contact page
│   └── blog/               # Blog listing and post routes
├── components/             # UI components and helpers
├── data/                   # Static data (projects)
├── lib/                    # Utilities + blog data access
└── styles.css              # Global styles + Tailwind directives

content/                    # MDX blog posts with front matter
public/                     # Static assets (favicon, etc)
```

### Key Architectural Patterns

1. **File-based Routing**: Routes live in `src/routes` via TanStack Router.
2. **Server Functions**: Blog data is loaded through `createServerFn` in `src/lib/post.ts`.
3. **MDX Blog System**: Content stored as MDX files in `/content/` with YAML front matter.
4. **Theme System**: Dark/light theme support using CSS variables and next-themes.
5. **Floating Navigation**: Bottom dock-style navigation with glassmorphism design.

## Blog Content Management

### MDX Files Structure

- Located in `/content/` directory
- Front matter format:
  ```yaml
  ---
  title: "Post Title"
  publishedAt: "2024-01-01"
  summary: "Brief description"
  ---
  ```
- Supports mathematical expressions via KaTeX
- GitHub Flavored Markdown via remark-gfm

## Styling System

- Tailwind CSS v4 with `@theme` directive in `src/styles.css`
- Custom color palette using OKLCH color space
- CSS variables for theme switching
- No separate `tailwind.config.js` (inline configuration)

## Performance & SSR

- Vite-powered dev server
- Nitro used for SSR builds
- Server functions fetch content on the server during routing

## Important Notes

- The site uses **bun** as the package manager
- Add new pages under `src/routes`
- Theme switching is handled by `next-themes` with system preference detection
