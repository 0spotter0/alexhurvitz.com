import type { Metadata } from "next";
import { Navbar } from "@/app/music/navbar";

export const metadata: Metadata = { title: "Media" };

const videos = [
  "GCIsBh3iGO0",
  "BNmyaEhSLD0",
  "L-uRwTVlOUk",
  "GV8zDMtdhPs",
  "cuJ-g9w7-FQ",
  "VNENtCyiJYk",
  "kicb0-tnxkg",
  "3R80Peez2_g",
  "Eby08RWRpmg",
  "aEOgTle6C1g",
];

const photos = [
  { src: "/music/Untitled2.webp", alt: "Alex Hurvitz" },
  { src: "/music/APD_20250212_AlexHurvitz01.webp", alt: "Alex Hurvitz" },
  { src: "/music/Untitled1.webp", alt: "Alex Hurvitz" },
  { src: "/music/IMG_3042.webp", alt: "Alex Hurvitz" },
  { src: "/music/023.webp", alt: "Alex Hurvitz" },
  { src: "/music/alexhurvitz2.webp", alt: "Alex Hurvitz" },
  { src: "/music/APD_20250212_AlexHurvitz04.webp", alt: "Alex Hurvitz" },
  { src: "/music/041.webp", alt: "Alex Hurvitz" },
  { src: "/music/IMG_3045.webp", alt: "Alex Hurvitz" },
];

export default function MediaPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto w-full px-6">
        <h1 className="text-4xl font-light tracking-tight text-gray-800 mb-12">
          Videos
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${process.env.NEXT_PUBLIC_BUNNY_URL}${photo.src}`}
                alt={photo.alt}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
