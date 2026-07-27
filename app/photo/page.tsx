import { Navbar } from "@/app/photo/navbar";
import { homepageGallery } from "./data";
import { ImageGallery } from "./image-gallery";

export default function Home() {
  return (
    <>
      <Navbar />
      <ImageGallery images={homepageGallery} />
    </>
  );
}
