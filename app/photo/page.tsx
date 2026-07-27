import { homepageGallery } from "./data";
import { ImageGallery } from "./image-gallery";

export default function Home() {
  return <ImageGallery images={homepageGallery} />;
}
