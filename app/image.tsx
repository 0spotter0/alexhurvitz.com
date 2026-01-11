"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageMetadata } from "./data";

export function Image({ image }: { image: ImageMetadata }) {
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOverlayVisible(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <img
        src={`/testimg/${image.filename}`}
        alt={image.title}
        className="w-full h-auto cursor-zoom-in select-none"
        draggable={false}
        loading="lazy"
        onClick={() => setIsOverlayVisible(true)}
      />

      <AnimatePresence>
        {isOverlayVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, pointerEvents: "none" }}
            onClick={() => setIsOverlayVisible(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative flex flex-col sm:justify-between items-center sm:flex-row gap-10 p-10 w-full h-full"
            >
              <div className="w-full h-full relative">
                <img
                  src={`/testimg/${image.filename}`}
                  alt={image.title}
                  draggable={false}
                  className="w-full h-full object-contain select-none"
                />
              </div>
              <div
                className="flex flex-col text-white gap-2 my-auto w-full sm:w-2/5 ps-5 sm:ps-0 sm:pe-5 cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-lg font-medium">{image.title}</p>
                <p>{image.description}</p>
                <p className="text-sm italic">{image.monthYear}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
