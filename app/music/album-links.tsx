"use client";

import Link from "next/link";
import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  { key: "spotify", label: "Spotify", Icon: SiSpotify, className: "hover:text-[#1DB954]" },
  { key: "apple", label: "Apple Music", Icon: SiApplemusic, className: "hover:text-[#FF4E6B]" },
  { key: "soundcloud", label: "Soundcloud", Icon: SiSoundcloud, className: "hover:text-[#FF5402]" },
  { key: "bandcamp", label: "Bandcamp", Icon: SiBandcamp, className: "hover:text-[#0AADD7]" },
];

export function AlbumLinks({
  title,
  links,
}: {
  title: string;
  links?: AlbumLinks;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const available = platforms.filter((p) => links?.[p.key]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-base font-medium text-gray-800 tracking-tight text-left underline underline-offset-4 decoration-gray-300 hover:decoration-gray-800 transition-colors duration-300 cursor-pointer"
      >
        {title}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="relative w-full max-w-xs rounded-xl border border-gray-200 bg-white px-8 py-7 shadow-xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-800 transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>

              <p className="text-center text-sm font-medium text-gray-800 tracking-tight">
                {title}
              </p>
              <p className="mt-1 text-center text-xs font-medium uppercase tracking-wide text-gray-400">
                Listen on
              </p>

              <div className="mt-5 flex flex-col gap-4">
                {available.map(({ key, label, Icon, className }) => (
                  <Link
                    key={key}
                    href={links![key]!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 text-gray-400 transition-all duration-300 hover:scale-[1.02] ${className}`}
                  >
                    <Icon className="w-7 h-7 flex-shrink-0" />
                    <span className="text-sm tracking-tight">{label}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
