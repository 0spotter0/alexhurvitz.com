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

Two portfolios — **photography** and **music** — under one site, built with Next.js (App Router), React 19, TypeScript, Tailwind CSS 4, and Framer Motion.

The root `/` is a client-side landing chooser (`app/page.tsx`) with two hover-to-play video panels linking to `/photo` and `/music`. Each portfolio is a self-contained route group under `app/photo/*` and `app/music/*` with its own `layout.tsx` (title template), `navbar.tsx`, and data. The `HomeButton` (`app/home-button.tsx`) links back to the chooser.

### Data Layer

**Photo** gallery data lives in `app/photo/data.ts`. Each image is an `ImageMetadata` object:

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

Gallery arrays (`homepageGallery`, `portraitsGallery`, `landscapeGallery`, `abstractGallery`, `natureGallery`) are imported directly into pages. The `collectionsPageMap` object at the bottom of `app/photo/data.ts` maps URL slugs (`portraits`, `landscapes`, `abstract`, `nature`) to gallery arrays, powering the dynamic route `app/photo/collections/[collection]/page.tsx`. Collections appear on the collections index in the order defined in `collectionsPageMap`; the cover image for each collection card is `images[1]` (the second entry).

To add a new collection: add an exported array in `app/photo/data.ts`, then register it in `collectionsPageMap`. The dynamic route generates all static params from `collectionsPageMap` keys automatically.

**Music** data is inline per page rather than centralized: the album list (with `coverSrc`, `title`, `year`, `tracks`, and streaming `links`) lives in `app/music/page.tsx`; the media page's YouTube video IDs and photo list live in `app/music/media/page.tsx`; social platform links live in `app/music/socials.tsx`.

### Image URLs and CDN

Images are served from Bunny CDN via the `NEXT_PUBLIC_BUNNY_URL` env var. For local dev this is set to `/temp-local-images` in `.env.local`.

Two variants are expected per image file:
- `{filename}_thumb.webp` — used in the masonry grid
- `{filename}_full.webp` — used in the fullscreen overlay

The `bunny-tools/` directory contains a shell script for listing files in the CDN bucket.

### Component Model

Photo gallery (all under `app/photo/`, all client components):
- `ImageGallery` (`image-gallery.tsx`) — owns `selectedImage` state; shuffles images on mount; distributes images into 2 or 3 columns (JS-computed, not CSS `columns`) based on viewport width; renders `Image` cards
- `Image` (`image.tsx`) — individual image card with fade-in on load; loads `_thumb.webp`; clickable to open overlay
- `ImageOverlay` (`image-overlay.tsx`) — fullscreen modal with Framer Motion spring animation; displays `_full.webp` plus EXIF metadata (shutter, aperture, ISO, date); backdrop click or ESC closes it; scroll lock is managed by `ImageGallery`

Music:
- `AlbumLinks` (`app/music/album-links.tsx`, client) — streaming-platform popover per album
- `Socials` (`app/music/socials.tsx`) — social/platform link row

Each portfolio has its own `Navbar` (`app/photo/navbar.tsx`, `app/music/navbar.tsx`, client) — sidebar on desktop, animated burger menu on mobile; locks body scroll when open; closes on ESC. There is no shared `components/` navbar.

### Pages

Photo (`app/photo/`):
- `/photo` — homepage gallery (`homepageGallery`)
- `/photo/collections` — grid of collection covers linking to collection pages
- `/photo/collections/[collection]` — dynamically generated from `collectionsPageMap`; `notFound()` for unknown slugs
- `/photo/about` — static bio page with a portrait image from CDN (`alex.webp`)
- `/photo/book` — embeds Cal.com via `@calcom/embed-react`; uses `NEXT_PUBLIC_CAL_PHOTO`
- `/photo/contact` — embeds a Tally form via `NEXT_PUBLIC_TALLY_FORM_ID`

Music (`app/music/`):
- `/music` — album list with streaming links
- `/music/media` — embedded YouTube videos and photo grid
- `/music/about` — static bio page
- `/music/book` — Cal.com embed; uses `NEXT_PUBLIC_CAL_MUSIC`
- `/music/contact` — embeds a Tally form via `NEXT_PUBLIC_TALLY_FORM_ID`

### Env Vars

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_BUNNY_URL` | CDN base URL for all images |
| `NEXT_PUBLIC_CAL_PHOTO` | Cal.com username/link for the photo booking embed (`/photo/book`) |
| `NEXT_PUBLIC_CAL_MUSIC` | Cal.com username/link for the music booking embed (`/music/book`) |
| `NEXT_PUBLIC_TALLY_FORM_ID` | Tally form ID for the contact embeds (`/photo/contact`, `/music/contact`) |

### Page Pattern

New pages: decide which portfolio they belong to and add them under `app/photo/` or `app/music/`. Export a default server component, import that section's `Navbar` (`app/photo/navbar.tsx` or `app/music/navbar.tsx`), and pull data from `app/photo/data.ts` (photo) or inline (music). Set `export const metadata` for the page title — the section `layout.tsx` supplies the title template (`"%s | Alex Hurvitz Photography"` for photo, `"%s | Alex Hurvitz Music"` for music).
