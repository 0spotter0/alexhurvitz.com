import type { Metadata } from "next";
import Link from "next/link";

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

const photos: {
  src: string;
  alt: string;
  creditName?: string;
  creditLink?: string;
}[] = [
  {
    src: "/music/Untitled2.webp",
    alt: "Alex Hurvitz",
  },
  {
    src: "/music/APD_20250212_AlexHurvitz01.webp",
    alt: "Alex Hurvitz",
    creditName: "Anna Powell Denton",
    creditLink: "https://instagram.com/annapowelldenton",
  },
  {
    src: "/music/IMG_3042.webp",
    alt: "Alex Hurvitz",
    creditName: "Annie Wu",
    creditLink: "https://instagram.com/anniedotexe",
  },
  {
    src: "/music/20260726-sgvsymphony-mangalounge-anniewu-17.webp",
    alt: "Alex Hurvitz",
    creditName: "Annie Wu",
    creditLink: "https://instagram.com/anniedotexe",
  },
  {
    src: "/music/alexhurvitz2.webp",
    alt: "Alex Hurvitz",
    creditName: "Annie Wu",
    creditLink: "https://instagram.com/anniedotexe",
  },
  {
    src: "/music/APD_20250212_AlexHurvitz04.webp",
    alt: "Alex Hurvitz",
    creditName: "Anna Powell Denton",
    creditLink: "https://instagram.com/annapowelldenton",
  },
  {
    src: "/music/041.webp",
    alt: "Alex Hurvitz",
    creditName: "Kamaron Farver",
    creditLink: "https://instagram.com/photos.by.farver",
  },
  {
    src: "/music/20260726-sgvsymphony-mangalounge-anniewu-18.webp",
    alt: "Alex Hurvitz",
    creditName: "Annie Wu",
    creditLink: "https://instagram.com/anniedotexe",
  },
  {
    src: "/music/20260613-sgvsymphony-kpop-anniewu-4.webp",
    alt: "Alex Hurvitz",
    creditName: "Annie Wu",
    creditLink: "https://instagram.com/anniedotexe",
  },
  {
    src: "/music/Untitled1.webp",
    alt: "Alex Hurvitz",
  },
];

export default function MediaPage() {
  return (
    <main className="max-w-5xl mx-auto w-full px-6">
      <h1 className="text-4xl font-light tracking-tight text-gray-800 mb-12">
        Videos
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((id) => (
          <div
            key={id}
            className="relative w-full"
            style={{ paddingBottom: "56.25%" }}
          >
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
          <div
            key={photo.src}
            className="break-inside-avoid mb-4 relative group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${process.env.NEXT_PUBLIC_BUNNY_URL}${photo.src}`}
              alt={photo.alt}
              className="w-full h-auto"
            />
            {photo.creditName && photo.creditLink && (
              <div className="absolute bottom-0 inset-x-0 px-2 py-1 backdrop-blur-sm w-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  href={photo.creditLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                >
                  <p className="underline text-xs text-white text-right">
                    {photo.creditName}
                  </p>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
