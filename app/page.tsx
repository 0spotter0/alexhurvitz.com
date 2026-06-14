"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type PanelProps = {
  href: string;
  title: string;
  src: string;
  thumb: string;
};

function Panel({ href, title, src, thumb }: PanelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  const handleEnter = () => {
    // Touch devices fire mouseenter on tap; only play where hover truly exists
    // so we don't download the video right before navigating away.
    if (!window.matchMedia("(hover: hover)").matches) return;
    setActive(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleLeave = () => {
    setActive(false);
    videoRef.current?.pause();
  };

  return (
    <Link
      href={href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      className="group relative flex-1 flex flex-col items-center justify-center min-h-[50svh] sm:min-h-svh overflow-hidden px-10 py-16"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumb}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="none"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-800 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute inset-0 transition-colors duration-800 ${
          active ? "bg-black/30" : "bg-black/50"
        }`}
      />

      <div className="relative flex flex-col items-center text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-white/60 mb-3 group-hover:text-white/80 transition-colors duration-300">
          Alex Hurvitz
        </span>
        <span className="text-4xl sm:text-5xl font-light tracking-tight text-white transition-colors duration-300">
          {title}
        </span>
        <span className="mt-6 text-xs tracking-widest uppercase text-white/60 group-hover:text-white/90 transition-colors duration-300">
          Enter →
        </span>
      </div>
    </Link>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-svh flex flex-col sm:flex-row">
      <Panel
        href="/photo"
        title="Photography"
        src={`${process.env.NEXT_PUBLIC_BUNNY_URL}/choose/music-video.mp4`}
        thumb={`${process.env.NEXT_PUBLIC_BUNNY_URL}/choose/photo-video_thumb.webp`}
      />

      <div className="w-px bg-gray-200 hidden sm:block" />
      <div className="h-px bg-gray-200 sm:hidden" />

      <Panel
        href="/music"
        title="Music"
        src={`${process.env.NEXT_PUBLIC_BUNNY_URL}/choose/music-video.mp4`}
        thumb={`${process.env.NEXT_PUBLIC_BUNNY_URL}/choose/music-video_thumb.webp`}
      />
    </main>
  );
}
