import type { Metadata } from "next";
import type { ComponentType } from "react";
import Link from "next/link";
import { SiApplemusic, SiSpotify } from "react-icons/si";
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { Navbar } from "@/app/music/navbar";

export const metadata: Metadata = { title: "Music" };

const tracks: string[] = ["Value (feat. Dan Ventura)"];

type PlatformLink = {
  label: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
  className?: string;
};

const socials: PlatformLink[] = [
  {
    label: "Apple Music",
    href: "https://music.apple.com/us/artist/alex-hurvitz/6777116476",
    Icon: SiApplemusic,
    className: "hover:text-[#FF4E6B]",
  },
  {
    label: "Spotify",
    Icon: SiSpotify,
    className: "hover:text-[#1DB954]",
    href: "https://open.spotify.com/artist/6o2ttwvZOf3XaGIGmSynVN",
  },
  {
    label: "Instagram",
    Icon: AiFillInstagram,
    className: "hover:text-[#FF0080]",

    href: "https://www.instagram.com/alex_hurvitz/",
  },
  {
    label: "YouTube",
    Icon: AiFillYoutube,
    className: "hover:text-[#FF0000]",
    href: "https://www.youtube.com/@alexhurvitz752",
  },
];

function PlatformIcon({ label, href, Icon, className }: PlatformLink) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={`text-gray-400 duration-200 hover:scale-110 text-gray-400 transition-all duration-300 ${className}`}
    >
      <Icon className={`w-7 h-7`} />
    </Link>
  );
}

export default function MusicPage() {
  return (
    <>
      <Navbar />
      <main className="px-8 pt-8 sm:pt-0 max-w-4xl mx-auto w-full">
        <div className="mx-auto flex flex-col w-fit max-w-full">
          <h1 className="w-full text-left text-xs mb-6 font-medium uppercase tracking-wide text-gray-400">
            New Release
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 w-full">
            <div className="flex flex-col gap-4 flex-shrink-0 w-full sm:w-64">
              <div className="w-full max-w-xs mx-auto sm:mx-0 sm:max-w-none sm:w-64 aspect-square relative overflow-hidden shadow-md border border-gray-100">
                <img
                  src={`${process.env.NEXT_PUBLIC_BUNNY_URL}/music/value-cover.webp`}
                  alt="Album cover"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-base font-medium text-gray-800 tracking-tight">
                  Value (feat. Dan Ventura) - Single
                </p>
                <p className="text-xs text-gray-400 mt-0.5">2026</p>
              </div>
            </div>
            {tracks.length > 0 && (
              <ol className="flex flex-col divide-y divide-gray-100 w-full max-w-full sm:max-w-md min-w-0">
                {tracks.map((track, i) => (
                  <li key={i} className="flex items-center gap-4 py-3 min-w-0">
                    <span className="text-xs text-gray-300 w-5 flex-shrink-0 text-right tabular-nums">
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-500 pe-4 min-w-0 truncate">
                      {track}
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </div>
          <div className="mx-auto w-fit px-8 sm:px-20 py-5 mt-12 rounded-xl border border-gray-100 bg-gray-50/50">
            <p className="text-center text-xs font-medium uppercase tracking-wide text-gray-400">
              Listen & follow
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-5">
              {socials.map((p) => (
                <PlatformIcon key={p.label} {...p} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
