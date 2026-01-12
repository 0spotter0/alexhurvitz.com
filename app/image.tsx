import { ImageMetadata } from "./data";

export function Image({
  image,
  onClick,
}: {
  image: ImageMetadata;
  onClick: () => void;
}) {
  return (
    <img
      src={`${process.env.NEXT_PUBLIC_BUNNY_URL}/${image.filename}`}
      alt={image.title}
      className="w-full h-auto cursor-zoom-in select-none"
      draggable={false}
      loading="lazy"
      onClick={onClick}
    />
  );
}
