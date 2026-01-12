import { Navbar } from "@/components/navbar";
import { imageGallery } from "./data";
import { ImageGallery } from "./image-gallery";

export default function Home() {
  return (
    <>
      <Navbar title={"ALEX\nHURVITZ\nPHOTOGRAPHY"} />
      <ImageGallery images={imageGallery} />
    </>
  );
}
