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
  const [columnCount, setColumnCount] = useState(2);

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
        document.body.style.paddingRight = `calc(${scrollbarWidth}px + 2.5rem)`;
      }
    } else {
      setTimeout(() => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }, 150);
    }
  }, [selectedImage]);

  const columns = Array.from({ length: columnCount }, (_, col) =>
    images.filter((_, i) => i % columnCount === col)
  );

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
