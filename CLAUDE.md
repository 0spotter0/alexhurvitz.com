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

All gallery data lives in `app/data.ts`. Each image is an `ImageMetadata` object:

```ts
{
  filename: string;           // required — base filename (no extension) in the CDN bucket
  orientation: "portrait" | "landscape" | "square";  // required
  date?: string;              // e.g. "March 18th 2025"
  shutter?: string;           // e.g. "1/640"
  aperture?: string;          // e.g. "f/2.0"
  iso?: string;               // e.g. "200"
}
```

Gallery arrays (`homepageGallery`, `portraitsGallery`, `landscapeGallery`, `abstractGallery`, `natureGallery`) are imported directly into pages. The `collectionsPageMap` object at the bottom of `data.ts` maps URL slugs to gallery arrays, powering the dynamic route `app/collections/[collection]/page.tsx`. Collections appear on the collections index in the order defined in `collectionsPageMap`; the cover image for each collection card is `images[1]` (the second entry).

To add a new collection: add an exported array in `data.ts`, then register it in `collectionsPageMap`. The dynamic route generates all static params from `collectionsPageMap` keys automatically.

### Image URLs and CDN

Images are served from Bunny CDN via the `NEXT_PUBLIC_BUNNY_URL` env var. For local dev this is set to `/temp-local-images` in `.env.local`.

Two variants are expected per image file:
- `{filename}_thumb.webp` — used in the masonry grid
- `{filename}_full.webp` — used in the fullscreen overlay

The `bunny-tools/` directory contains a shell script for listing files in the CDN bucket.

### Component Model

- `ImageGallery` (`app/image-gallery.tsx`, client) — owns `selectedImage` state; shuffles images on mount; distributes images into 2 or 3 columns (JS-computed, not CSS `columns`) based on viewport width; renders `Image` cards
- `Image` (`app/image.tsx`, client) — individual image card with fade-in on load; loads `_thumb.webp`; clickable to open overlay
- `ImageOverlay` (`app/image-overlay.tsx`, client) — fullscreen modal with Framer Motion spring animation; displays `_full.webp` plus EXIF metadata (shutter, aperture, ISO, date); backdrop click or ESC closes it; scroll lock is managed by `ImageGallery`
- `Navbar` (`components/navbar.tsx`, client) — sidebar on desktop, animated burger menu on mobile; locks body scroll when open; closes on ESC

### Pages

- `/` — homepage gallery (`homepageGallery`)
- `/collections` — grid of collection covers linking to collection pages
- `/collections/[collection]` — dynamically generated from `collectionsPageMap`; `notFound()` for unknown slugs
- `/about` — static bio page with a portrait image from CDN (`alex.webp`)
- `/book` — embeds Cal.com via `@calcom/embed-react`; requires `NEXT_PUBLIC_CAL_USERNAME` env var
- `/contact` — embeds a Tally form

### Env Vars

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_BUNNY_URL` | CDN base URL for all images |
| `NEXT_PUBLIC_CAL_USERNAME` | Cal.com username/link for the booking embed |

### Page Pattern

New pages: export a default server component, import `Navbar` from `components/navbar.tsx`, pull data from `app/data.ts`. Set `export const metadata` for page title (uses `template: "%s | Alex Hurvitz Photography"` from `layout.tsx`).
