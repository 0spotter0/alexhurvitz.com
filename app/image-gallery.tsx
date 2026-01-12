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
      document.body.style.paddingRight = `calc(${scrollbarWidth}px + 2.5rem)`;
    } else {
      setTimeout(() => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }, 150);
    }
  }, [selectedImage]);

  return (
    <>
      <div className="sm:columns-1 md:columns-2 lg:columns-3 h-fit gap-2 space-y-2 pb-8 ms-[25rem]">
        {images.map((image, index) => (
          <div key={index}>
            <Image image={image} onClick={() => setSelectedImage(image)} />
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
