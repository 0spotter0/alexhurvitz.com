# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Use `pnpm` as the package manager.

```bash
pnpm dev       # Start dev server
pnpm build     # Production build
pnpm lint      # Run ESLint
```

## Architecture

Photography portfolio built with Next.js (App Router), React 19, TypeScript, Tailwind CSS 4, and Framer Motion.

### Data Layer

All gallery data lives in `app/data.ts`. Each image is an `ImageMetadata` object with `filename`, `title`, `monthYear`, `description`, and `orientation`. Gallery arrays (e.g. `homepageGallery`, `landscapesGallery`) are imported directly into pages. The `collectionsPageMap` object maps URL slugs to gallery arrays, powering the dynamic route `app/collections/[collection]/page.tsx`.

### Image URLs

Images are served from Bunny CDN via the `NEXT_PUBLIC_BUNNY_URL` env var. For local development this is set to `/temp-local-images` in `.env.local`.

### Component Model

- `ImageGallery` (client component) — owns `selectedImage` state, renders a CSS `columns-*` masonry grid of `Image` cards
- `Image` (server component) — individual image card, clickable
- `ImageOverlay` (client component) — fullscreen modal with Framer Motion enter/exit animation; locks body scroll; closes on ESC
- `Navbar` (client component) — sidebar on desktop, animated burger menu on mobile; also locks body scroll and closes on ESC

New pages should follow the pattern: export a default server component, import `Navbar` from `components/navbar.tsx`, and pull data from `app/data.ts`.
