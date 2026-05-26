import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";

import { collectionsPageMap, ImageMetadata } from "@/app/data";
import { ImageGallery } from "@/app/image-gallery";
import { notFound } from "next/navigation";

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

  const imageCollection: ImageMetadata[] = collectionsPageMap[collection]

  if (!imageCollection) {
    notFound()
  }

  return (
    <>
      <Navbar title={collection.toUpperCase()} />
      <ImageGallery images={imageCollection} />
    </>
  );
}
