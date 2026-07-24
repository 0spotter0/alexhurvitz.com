import Link from "next/link";
import type { ComponentType } from "react";
import {
  SiApplemusic,
  SiBandcamp,
  SiSoundcloud,
  SiSpotify,
} from "react-icons/si";
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";

type PlatformLink = {
  label: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
  className?: string;
};

const socials: PlatformLink[] = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/artist/6o2ttwvZOf3XaGIGmSynVN",
    Icon: SiSpotify,
    className: "hover:text-[#1DB954]",
  },
  {
    label: "Apple Music",
    href: "https://music.apple.com/us/artist/alex-hurvitz/6777116476",
    Icon: SiApplemusic,
    className: "hover:text-[#FF4E6B]",
  },
  {
    label: "Soundcloud",
    href: "https://soundcloud.com/alexhurvitz",
    Icon: SiSoundcloud,
    className: "hover:text-[#FF5402]",
  },
  {
    label: "Bandcamp",
    href: "https://alexhurvitz.bandcamp.com/",
    Icon: SiBandcamp,
    className: "hover:text-[#0AADD7]",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/alex_hurvitz/",
    Icon: AiFillInstagram,
    className: "hover:text-[#FF0080]",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@alexhurvitz752",
    Icon: AiFillYoutube,
    className: "hover:text-[#FF0000]",
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

export function Socials() {
  return (
    <div className="mx-auto w-fit px-8 sm:px-10 py-5 my-8 rounded-xl border border-gray-200 bg-gray-200/40">
      <p className="text-center text-xs font-medium uppercase tracking-wide text-gray-500">
        Listen & follow
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-5">
        {socials.map((p) => (
          <PlatformIcon key={p.label} {...p} />
        ))}
      </div>
    </div>
  );
}
