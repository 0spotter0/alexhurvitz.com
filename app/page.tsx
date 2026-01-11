import { Navbar } from "@/components/navbar";
import { imageGallery, type ImageMetadata } from "./data";
import { Image } from "./image";

export default function Home() {
  return (
    <>
      <Navbar title={"ALEX\nHURVITZ\nPHOTOGRAPHY"} />
      <div className="sm:columns-1 md:columns-2 lg:columns-3 h-fit gap-2 space-y-2 pb-8 ms-[25rem]">
        {imageGallery.map((image: ImageMetadata, index: number) => (
          <div key={index}>
            <Image image={image} />
          </div>
        ))}
      </div>
    </>
  );
}
