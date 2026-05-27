import type { Metadata } from "next";
import { Navbar } from "@/app/music/navbar";

export const metadata: Metadata = { title: "Music" };

export default function MusicPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto w-full px-6 py-24">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">
          Alex Hurvitz
        </p>
        <h1 className="text-5xl sm:text-6xl font-light tracking-tight text-gray-800 mb-4">
          Jazz Pianist<br />&amp; Composer
        </h1>
        <p className="text-sm uppercase tracking-widest text-gray-300 mt-8">
          Coming soon
        </p>
      </main>
    </>
  );
}
