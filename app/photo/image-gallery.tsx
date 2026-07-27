"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ImageMetadata } from "./data";
import { Image } from "./image";
import { ImageOverlay } from "./image-overlay";

export function ImageGallery({ images }: { images: ImageMetadata[] }) {
  const [selectedImage, setSelectedImage] = useState<ImageMetadata | null>(
    null
  );
  const [shuffledImages, setShuffledImages] = useState(images);
  const [columnCount, setColumnCount] = useState(2);

  useEffect(() => {
    setShuffledImages([...images].sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    const update = () => setColumnCount(window.innerWidth >= 1024 ? 3 : 2);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (selectedImage) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";

      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      setTimeout(() => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }, 150);
    }
  }, [selectedImage]);

  // Estimate each image's rendered height relative to the (equal) column
  // width, so we can balance columns by height rather than by count. A pure
  // round-robin makes a column that draws several portraits far taller than
  // one that draws landscapes.
  const aspectHeight = (orientation: ImageMetadata["orientation"]) =>
    orientation === "portrait" ? 1.33 : orientation === "landscape" ? 0.75 : 1;

  const columns = Array.from(
    { length: columnCount },
    () => [] as ImageMetadata[]
  );
  const columnHeights = new Array(columnCount).fill(0);
  const gapHeight = 0.02; // approximate the flex `gap-2` between stacked images

  shuffledImages.forEach((image) => {
    let shortest = 0;
    for (let c = 1; c < columnCount; c++) {
      if (columnHeights[c] < columnHeights[shortest]) shortest = c;
    }
    columns[shortest].push(image);
    columnHeights[shortest] += aspectHeight(image.orientation) + gapHeight;
  });

  return (
    <>
      <div className="flex gap-2 pb-8 items-start">
        {columns.map((colImages, col) => (
          <div key={col} className="flex flex-col gap-2 flex-1">
            {colImages.map((image, i) => (
              <Image
                key={i}
                image={image}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <ImageOverlay
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
