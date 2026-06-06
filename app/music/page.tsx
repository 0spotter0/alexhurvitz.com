import type { Metadata } from "next";
import NextImage from "next/image";
import { SiApplemusic, SiSpotify, SiAmazonmusic, SiTidal } from "react-icons/si";
import { Navbar } from "@/app/music/navbar";

export const metadata: Metadata = { title: "Music" };

const tracks = [
  "Glenn Zaleski Trio Like Piece (Hopefully) / Timeless Thoughts ",
  "Dandelion Dream",
  "Where the Wind Leads",
  "Forgetting Again",
  "Endless Meadow",
  "Your Eyes",
  "Picnic Friend",
  "See You Again Tomorrow",
];

const streamingLinks = [
  { label: "Apple Music", icon: <SiApplemusic className="w-8 h-8" />, href: "https://music.apple.com" },
  { label: "Spotify", icon: <SiSpotify className="w-8 h-8" />, href: "https://spotify.com" },
  { label: "Amazon Music", icon: <SiAmazonmusic className="w-8 h-8" />, href: "https://music.amazon.com" },
  { label: "Tidal", icon: <SiTidal className="w-8 h-8" />, href: "https://tidal.com" },
];

export default function MusicPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto w-full px-6 py-24">
        <h1 className="text-5xl sm:text-5xl font-light tracking-tight text-gray-800 mb-16">
          [AlbumName] out now
        </h1>

        {/* Album section */}
        <div className="flex flex-col sm:flex-row gap-10">
          {/* Left: album art + streaming links */}
          <div className="flex flex-col gap-5 flex-shrink-0">
            {/* Album art */}
            <div className="w-64 h-64 relative overflow-hidden">
              <NextImage
                src="/temp-local-images-music/tmp-album-cover.jpg"
                alt="Album cover"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Album title + year */}
            <div>
              <p className="text-base font-medium text-gray-800 tracking-tight">Album Title</p>
              <p className="text-xs text-gray-400 mt-0.5">2026</p>
            </div>

            {/* Streaming links */}
            <div className="flex flex-row gap-3 flex-wrap">
              {streamingLinks.map(({ label, icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-800 transition-colors duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right: track list */}
          <ol className="flex flex-col divide-y divide-gray-100 w-full">
            {tracks.map((track, i) => (
              <li key={track} className="flex items-center gap-4 py-3">
                <span className="text-xs text-gray-300 w-5 text-right tabular-nums">{i + 1}</span>
                <span className="text-sm text-gray-500">{track}</span>
              </li>
            ))}
          </ol>
        </div>
      </main>
    </>
  );
}
