import type { Metadata } from "next";
import type { ComponentType } from "react";
import Link from "next/link";
import {
  SiApplemusic,
  SiBandcamp,
  SiSoundcloud,
  SiSpotify,
  SiUnsplash,
} from "react-icons/si";
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { HiCamera, HiMusicalNote } from "react-icons/hi2";

export const metadata: Metadata = {
  title: "Alex Hurvitz",
  description: "All my links in one place.",
};

type CardLink = {
  label: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
  external?: boolean;
  className?: string;
};

const portfolios: CardLink[] = [
  { label: "Photography", href: "/photo", Icon: HiCamera },
  { label: "Music", href: "/music", Icon: HiMusicalNote },
];

const socials: CardLink[] = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/artist/6o2ttwvZOf3XaGIGmSynVN",
    Icon: SiSpotify,
    external: true,
    className: "group-hover:text-[#1DB954]",
  },
  {
    label: "Apple Music",
    href: "https://music.apple.com/us/artist/alex-hurvitz/6777116476",
    Icon: SiApplemusic,
    external: true,
    className: "group-hover:text-[#FF4E6B]",
  },
  {
    label: "Soundcloud",
    href: "https://soundcloud.com/alexhurvitz",
    Icon: SiSoundcloud,
    external: true,
    className: "group-hover:text-[#FF5402]",
  },
  {
    label: "Bandcamp",
    href: "https://alexhurvitz.bandcamp.com/",
    Icon: SiBandcamp,
    external: true,
    className: "group-hover:text-[#0AADD7]",
  },
  {
    label: "Instagram (@alex_hurvitz)",
    href: "https://www.instagram.com/alex_hurvitz/",
    Icon: AiFillInstagram,
    external: true,
    className: "group-hover:text-[#FF0080]",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@alexhurvitz752",
    Icon: AiFillYoutube,
    external: true,
    className: "group-hover:text-[#FF0000]",
  },
  {
    label: "Unsplash",
    href: "https://unsplash.com/@alex_hurvitz/collections",
    Icon: SiUnsplash,
    external: true,
    className: "group-hover:text-[#000000]",
  },
  {
    label: "Instagram (@real.alex.photo)",
    href: "https://www.instagram.com/real.alex.photo/",
    Icon: AiFillInstagram,
    external: true,
    className: "group-hover:text-[#FF0080]",
  },
];

function CardButton({ label, href, Icon, external, className }: CardLink) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center gap-4 w-full border border-gray-200 bg-white p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-sm rounded-sm"
    >
      <Icon
        className={`w-6 h-6 shrink-0 text-gray-500 transition-colors duration-300 ${
          className ?? "group-hover:text-gray-900"
        }`}
      />
      <span className="text-base font-medium text-gray-900">{label}</span>
    </Link>
  );
}

export default function CardPage() {
  return (
    <main className="min-h-svh flex flex-col items-center px-6 py-16">
      <div className="w-full max-w-md flex flex-col items-center">
        <img
          src={`${process.env.NEXT_PUBLIC_BUNNY_URL}/alex.webp`}
          alt="Alex Hurvitz"
          className="w-32 h-32 rounded-full object-cover shadow-md object-top-right object-200"
        />

        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-gray-900">
          Alex Hurvitz
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          musician, composer, photographer
        </p>

        <div className="mt-10 w-full flex flex-col gap-3">
          <p className="text-center text-xs font-medium text-gray-500">
            check out my portfolios
          </p>
          {portfolios.map((link) => (
            <CardButton key={link.label} {...link} />
          ))}
        </div>

        <div className="mt-8 w-full">
          <p className="text-center text-xs font-medium text-gray-500">
            all my links
          </p>
          <div className="mt-3 flex flex-col gap-3">
            {socials.map((link) => (
              <CardButton key={link.label} {...link} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
