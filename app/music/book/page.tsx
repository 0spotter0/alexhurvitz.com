import type { Metadata } from "next";
import { Navbar } from "@/app/music/navbar";
import { Booker } from "@/app/photo/book/booker";

export const metadata: Metadata = { title: "Book" };

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto w-full px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">
          Book
        </p>
        <h1 className="text-4xl font-light tracking-tight text-gray-800 mb-2">
          Book a lesson
        </h1>
        <div className="w-full">
          <Booker calUsername={process.env.NEXT_PUBLIC_CAL_MUSIC!} />
        </div>
      </main>
    </>
  );
}
