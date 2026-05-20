"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ImageMetadata } from "./data";

export function Image({
  image,
  onClick,
}: {
  image: ImageMetadata;
  onClick: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.img
      src={`${process.env.NEXT_PUBLIC_BUNNY_URL}/${image.filename}`}
      alt={image.title}
      className="w-full h-auto cursor-zoom-in select-none"
      draggable={false}
      loading="lazy"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      transition={{ duration: 4 }}
      onLoad={() => setLoaded(true)}
    />
  );
}
