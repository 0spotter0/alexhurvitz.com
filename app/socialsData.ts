import type { ComponentType } from "react";
import {
  SiApplemusic,
  SiBandcamp,
  SiSoundcloud,
  SiSpotify,
  SiUnsplash,
} from "react-icons/si";
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";

export type PlatformLink = {
  label: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
  className?: string;
};

/**
 * Single source of truth for the artist's social / follow URLs.
 * (Per-album streaming links live with each release, not here.)
 */
export const socialUrls = {
  spotify: "https://open.spotify.com/artist/6o2ttwvZOf3XaGIGmSynVN",
  appleMusic: "https://music.apple.com/us/artist/alex-hurvitz/6777116476",
  soundcloud: "https://soundcloud.com/alexhurvitz",
  bandcamp: "https://alexhurvitz.bandcamp.com/",
  instagram: "https://www.instagram.com/alex_hurvitz/",
  youtube: "https://www.youtube.com/@alexhurvitz752",
  unsplash: "https://unsplash.com/@alex_hurvitz/collections",
  instagramPhoto: "https://www.instagram.com/real.alex.photo/",
} as const;

/**
 * Listen & follow links rendered by the music `Socials` component.
 */
export const socials: PlatformLink[] = [
  {
    label: "Spotify",
    href: socialUrls.spotify,
    Icon: SiSpotify,
    className: "hover:text-[#1DB954]",
  },
  {
    label: "Apple Music",
    href: socialUrls.appleMusic,
    Icon: SiApplemusic,
    className: "hover:text-[#FF4E6B]",
  },
  {
    label: "Soundcloud",
    href: socialUrls.soundcloud,
    Icon: SiSoundcloud,
    className: "hover:text-[#FF5402]",
  },
  {
    label: "Bandcamp",
    href: socialUrls.bandcamp,
    Icon: SiBandcamp,
    className: "hover:text-[#0AADD7]",
  },
  {
    label: "Instagram",
    href: socialUrls.instagram,
    Icon: AiFillInstagram,
    className: "hover:text-[#FF0080]",
  },
  {
    label: "YouTube",
    href: socialUrls.youtube,
    Icon: AiFillYoutube,
    className: "hover:text-[#FF0000]",
  },
];

export type CardSocialLink = PlatformLink & { external?: boolean };

/**
 * "All my links" list rendered on the /card page. Uses `group-hover:`
 * variants and its own labels, but the same underlying URLs.
 */
export const cardSocials: CardSocialLink[] = [
  {
    label: "Spotify",
    href: socialUrls.spotify,
    Icon: SiSpotify,
    external: true,
    className: "group-hover:text-[#1DB954]",
  },
  {
    label: "Apple Music",
    href: socialUrls.appleMusic,
    Icon: SiApplemusic,
    external: true,
    className: "group-hover:text-[#FF4E6B]",
  },
  {
    label: "Soundcloud",
    href: socialUrls.soundcloud,
    Icon: SiSoundcloud,
    external: true,
    className: "group-hover:text-[#FF5402]",
  },
  {
    label: "Bandcamp",
    href: socialUrls.bandcamp,
    Icon: SiBandcamp,
    external: true,
    className: "group-hover:text-[#0AADD7]",
  },
  {
    label: "Instagram (@alex_hurvitz)",
    href: socialUrls.instagram,
    Icon: AiFillInstagram,
    external: true,
    className: "group-hover:text-[#FF0080]",
  },
  {
    label: "YouTube",
    href: socialUrls.youtube,
    Icon: AiFillYoutube,
    external: true,
    className: "group-hover:text-[#FF0000]",
  },
  {
    label: "Unsplash",
    href: socialUrls.unsplash,
    Icon: SiUnsplash,
    external: true,
    className: "group-hover:text-[#000000]",
  },
  {
    label: "Instagram (@real.alex.photo)",
    href: socialUrls.instagramPhoto,
    Icon: AiFillInstagram,
    external: true,
    className: "group-hover:text-[#FF0080]",
  },
];
