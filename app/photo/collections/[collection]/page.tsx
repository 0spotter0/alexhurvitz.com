import type { Metadata } from "next";
import { Navbar } from "@/app/photo/navbar";

import { collectionsPageMap, ImageMetadata } from "@/app/photo/data";
import { ImageGallery } from "@/app/photo/image-gallery";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return Object.keys(collectionsPageMap).map((collection) => ({ collection }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const { collection } = await params;
  return { title: collection.charAt(0).toUpperCase() + collection.slice(1) };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;

  const imageCollection: ImageMetadata[] = collectionsPageMap[collection];

  if (!imageCollection) {
    notFound();
  }

  return (
    <>
      <Navbar title={collection.toUpperCase()} />
      <ImageGallery images={imageCollection} />
    </>
  );
}

