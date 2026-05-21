# Alex Portfolio

Photography portfolio built with Next.js, TypeScript, and Tailwind CSS.

## Adding Images

All gallery data lives in `app/data.ts`. Each image is an `ImageMetadata` object:

```ts
{
  filename: "DSC04541.avif",   // required — filename in the CDN bucket
  orientation: "portrait",     // required — "portrait" | "landscape" | "square"
  title: "Sunset Over Ridge",  // optional
  monthYear: "January 2026",   // optional
  description: "...",          // optional
}
```

To add an image, upload the file to Bunny CDN and append an entry to the relevant gallery array in `app/data.ts` (e.g. `homepageGallery`, `landscapesGallery`). Images appear in the grid left to right, top to bottom in the order they are defined in the array.

## Adding a New Collection

1. Add a new gallery array in `app/data.ts`:

```ts
export const newGallery: ImageMetadata[] = [
  { filename: "DSC00001.avif", orientation: "landscape" },
  // ...
];
```

2. Register it in `collectionsPageMap` at the bottom of `app/data.ts`:

```ts
export const collectionsPageMap: Record<string, ImageMetadata[]> = {
  landscapes: landscapesGallery,
  night: nightGallery,
  portraits: portraitsGallery,
  wildlife: wildlifeGallery,
  new: newGallery, // add this line
};
```

The collection will be available at `/collections/new` automatically via the dynamic route. Collections appear on the collections page in the order they are defined in `collectionsPageMap`.

