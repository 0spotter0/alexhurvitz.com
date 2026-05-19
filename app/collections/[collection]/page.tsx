import { Navbar } from "@/components/navbar";

import { collectionsPageMap, ImageMetadata } from "@/app/data";
import { ImageGallery } from "@/app/image-gallery";
import { notFound } from "next/navigation";

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
