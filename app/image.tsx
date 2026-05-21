import { useState, useEffect, useRef } from "react";
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
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <motion.img
      ref={imgRef}
      src={`${process.env.NEXT_PUBLIC_BUNNY_URL}/${image.filename}`}
      alt={image.title}
      className="w-full h-auto cursor-zoom-in select-none"
      draggable={false}
      loading="lazy"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      onLoad={() => setLoaded(true)}
    />
  );
}
