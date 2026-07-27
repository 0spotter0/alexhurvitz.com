import type { Metadata } from "next";
import { Navbar } from "@/app/music/navbar";
import { Socials } from "./socials";

export const metadata: Metadata = {
  title: {
    default: "Alex Hurvitz Music",
    template: "%s | Alex Hurvitz Music",
  },
};

export default function MusicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div data-music-scroll className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-24 sm:pt-32">{children}</div>
      <footer className="px-6 py-8 text-center">
        <Socials />
        <p className="text-xs opacity-60">Copyright © 2026 by [Alex Hurvitz]</p>
      </footer>
    </div>
  );
}
