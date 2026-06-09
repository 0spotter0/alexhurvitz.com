import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  SiApplemusic,
  SiSpotify,
  SiAmazonmusic,
  SiTidal,
} from "react-icons/si";
import { AiFillInstagram } from "react-icons/ai";
import { Navbar } from "@/app/music/navbar";

export const metadata: Metadata = { title: "Music" };

// const tracks: string[] = [];

const streamingLinks = [
  {
    label: "Apple Music",
    icon: (
      <SiApplemusic className="w-7 h-7 text-gray-400 group-hover:text-[#FF4E6B] transition-colors duration-400" />
    ),
    href: "https://music.apple.com",
  },
  {
    label: "Spotify",
    icon: (
      <SiSpotify className="w-7 h-7 text-gray-400 group-hover:text-[#1DB954] transition-colors duration-400" />
    ),
    href: "https://spotify.com",
  },
  {
    label: "Amazon Music",
    icon: (
      <SiAmazonmusic className="w-7 h-7 text-gray-400 group-hover:text-[#0077C1] transition-colors duration-400" />
    ),
    href: "https://music.amazon.com",
  },
  {
    label: "Tidal",
    icon: (
      <SiTidal className="w-7 h-7 text-gray-400 group-hover:text-black transition-colors duration-400" />
    ),
    href: "https://tidal.com",
  },
];

export default function MusicPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto w-full px-6 flex flex-col items-center">
        <Link
          href="https://www.instagram.com/alex_hurvitz/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 mb-10"
        >
          <AiFillInstagram className="size-6" />
          @alex_hurvitz
        </Link>

        <h1 className="text-3xl sm:text-4xl font-light text-gray-800 mb-10">
          Value (single) out now!
        </h1>

        {/* Album section */}
        <div className="flex flex-col sm:flex-row gap-10">
          {/* Left: album art + streaming links */}
          <div className="flex flex-col gap-8 flex-shrink-0">
            {/* Album art */}
            <div className="w-64 h-64 relative overflow-hidden shadow-md border border-gray-100 transition-transform hover:scale-101 duration-300 ease-in-out">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${process.env.NEXT_PUBLIC_BUNNY_URL}/music/value-cover.webp`}
                alt="Album cover"
                className="object-cover"
              />
            </div>

            {/* Album title + year */}
            {/* <div className="text-center"> */}
            {/*   <p className="text-base font-medium text-gray-800 tracking-tight"> */}
            {/*     Value */}
            {/*   </p> */}
            {/*   <p className="text-xs text-gray-400 mt-0.5">2026</p> */}
            {/* </div> */}

            {/* Streaming links */}
            <div className="group/streaming relative flex justify-center gap-5">
              {/* Coming soon popup */}
              <div className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gray-900 px-3 py-1 text-xs text-white opacity-0 transition-opacity duration-400 group-hover/streaming:opacity-40">
                Coming soon
              </div>
              {streamingLinks.map(({ label, icon }) => (
                <span
                  key={label}
                  aria-label={label}
                  title={label}
                  role="img"
                  className="group cursor-default hover:scale-105 transition-transform duration-200"
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>

          {/* Right: track list */}
          {/* <ol className="flex flex-col divide-y divide-gray-100 w-full"> */}
          {/*   {tracks.map((track, i) => ( */}
          {/*     <li key={track} className="flex items-center gap-4 py-3"> */}
          {/*       <span className="text-xs text-gray-300 w-5 text-right tabular-nums"> */}
          {/*         {i + 1} */}
          {/*       </span> */}
          {/*       <span className="text-sm text-gray-500">{track}</span> */}
          {/*     </li> */}
          {/*   ))} */}
          {/* </ol> */}
        </div>
      </main>
    </>
  );
}
