import { motion } from "framer-motion";
import { ImageMetadata } from "./data";

export function ImageOverlay({
  image,
  onClose,
}: {
  image: ImageMetadata;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: "none" }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md cursor-zoom-out"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative flex flex-col justify-center items-center sm:flex-row gap-10 ps-10 py-10 pe-10 sm:pe-4 w-full h-full overflow-y-auto"
      >
        <img
          src={`${process.env.NEXT_PUBLIC_BUNNY_URL}/${image.filename}_full.webp`}
          alt={image.filename}
          draggable={false}
          className={`object-contain ${
            image.orientation === "portrait" && "h-10/12 sm:h-full"
          } ${image.orientation === "landscape" && "w-full sm:w-8/12"} ${
            image.orientation === "square" && "w-full"
          } select-none`}
          loading="lazy"
        />
        <div
          className="self-start flex flex-col text-white gap-2 sm:my-auto w-fit cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          {image.shutter && <p className="font-semibold text-sm">{image.shutter}</p>}
          {image.aperture && <p className="font-semibold text-sm">{image.aperture}</p>}
          {image.iso && <p className="font-semibold text-sm">ISO {image.iso}</p>}
          <p className="mt-4 text-sm italic">{image.date}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
