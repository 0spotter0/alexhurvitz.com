import { homepageGallery } from "./photoData";
import { ImageGallery } from "./image-gallery";

export default function Home() {
  return <ImageGallery images={homepageGallery} />;
}
