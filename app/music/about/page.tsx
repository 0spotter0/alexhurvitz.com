import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/app/music/navbar";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto w-full px-6 py-24 flex flex-col md:flex-row items-start gap-16">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">
            About
          </p>
          <h1 className="text-4xl font-light tracking-tight text-gray-800 mb-6">
            Alex Hurvitz
          </h1>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Alex Hurvitz is a jazz pianist and composer based in New York City.
              His musical language draws from the bebop tradition while embracing
              contemporary harmonic ideas and original composition.
            </p>
            <p>
              He has performed at venues across the city and collaborated with
              musicians from a wide range of backgrounds, bringing a thoughtful
              and dynamic approach to every setting.
            </p>
            <p>
              When not performing, Alex dedicates time to writing original music
              that reflects his ongoing exploration of jazz as a living,
              evolving art form.
            </p>
          </div>
        </div>
        <div className="w-full md:w-80 shrink-0">
          <Image
            src="/temp-local-images-music/aboutme-alex.webp"
            alt="Alex Hurvitz at the piano"
            width={480}
            height={640}
            className="w-full object-cover"
            priority
          />
        </div>
      </main>
    </>
  );
}
