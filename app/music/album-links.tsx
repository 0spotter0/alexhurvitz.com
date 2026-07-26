"use client";

import Link from "next/link";
import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import {
  SiApplemusic,
  SiBandcamp,
  SiSoundcloud,
  SiSpotify,
} from "react-icons/si";

type AlbumLinks = {
  spotify?: string;
  apple?: string;
  soundcloud?: string;
  bandcamp?: string;
};

type PlatformLink = {
  key: keyof AlbumLinks;
  label: string;
  Icon: ComponentType<{ className?: string }>;
  className: string;
};

const platforms: PlatformLink[] = [
  {
    key: "spotify",
    label: "Spotify",
    Icon: SiSpotify,
    className: "hover:text-[#1DB954]",
  },
  {
    key: "apple",
    label: "Apple Music",
    Icon: SiApplemusic,
    className: "hover:text-[#FF4E6B]",
  },
  {
    key: "soundcloud",
    label: "Soundcloud",
    Icon: SiSoundcloud,
    className: "hover:text-[#FF5402]",
  },
  {
    key: "bandcamp",
    label: "Bandcamp",
    Icon: SiBandcamp,
    className: "hover:text-[#0AADD7]",
  },
];

export function AlbumLinks({
  links,
}: {
  links?: AlbumLinks;
}) {
  const available = platforms.filter((p) => links?.[p.key]);

  return (
    <div className="mt-5 flex justify-center sm:justify-start gap-4">
      {available.map(({ key, Icon, className }) => (
        <Link
          key={key}
          href={links![key]!}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-3 text-gray-400 transition-all duration-300 hover:scale-105 ${className}`}
        >
          <Icon className="w-7 h-7 flex-shrink-0" />
        </Link>
      ))}
    </div>
  );
}
