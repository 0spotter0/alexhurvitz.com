import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/app/music/navbar";

export const metadata: Metadata = { title: "Media" };

const videos = [
  "GCIsBh3iGO0",
  "BNmyaEhSLD0",
  "L-uRwTVlOUk",
  "GV8zDMtdhPs",
  "cuJ-g9w7-FQ",
  "VNENtCyiJYk",
  "3R80Peez2_g",
  "Eby08RWRpmg",
  "aEOgTle6C1g",
];

const photos = [
  { src: "/temp-local-images-music/Untitled2.webp", width: 1707, height: 2560, alt: "Alex Hurvitz" },
  { src: "/temp-local-images-music/APD_20250212_AlexHurvitz01.webp", width: 1707, height: 2560, alt: "Alex Hurvitz" },
  { src: "/temp-local-images-music/Untitled1.webp", width: 1707, height: 2560, alt: "Alex Hurvitz" },
  { src: "/temp-local-images-music/IMG_3042.webp", width: 2048, height: 1365, alt: "Alex Hurvitz" },
  { src: "/temp-local-images-music/023.webp", width: 1707, height: 2560, alt: "Alex Hurvitz" },
  { src: "/temp-local-images-music/alexhurvitz2.webp", width: 1638, height: 2048, alt: "Alex Hurvitz" },
  { src: "/temp-local-images-music/APD_20250212_AlexHurvitz04.webp", width: 1920, height: 2560, alt: "Alex Hurvitz" },
  { src: "/temp-local-images-music/041.webp", width: 2560, height: 2048, alt: "Alex Hurvitz" },
  { src: "/temp-local-images-music/024.webp", width: 1707, height: 2560, alt: "Alex Hurvitz" },
  { src: "/temp-local-images-music/IMG_3045.webp", width: 1638, height: 2048, alt: "Alex Hurvitz" },
  { src: "/temp-local-images-music/aboutme-alex.webp", width: 1365, height: 2048, alt: "Alex Hurvitz" },
  { src: "/temp-local-images-music/022.webp", width: 1707, height: 2560, alt: "Alex Hurvitz" },
];

export default function MediaPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto w-full px-6 py-10 sm:py-24">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">
          Media
        </p>
        <h1 className="text-4xl font-light tracking-tight text-gray-800 mb-12">
          Videos
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((id) => (
            <div key={id} className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${id}`}
                title={`YouTube video ${id}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          ))}
        </div>

        <h2 className="text-4xl font-light tracking-tight text-gray-800 mt-24 mb-12">
          Photos
        </h2>
        <div className="columns-2 md:columns-3 gap-4">
          {photos.map((photo) => (
            <div key={photo.src} className="break-inside-avoid mb-4">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
