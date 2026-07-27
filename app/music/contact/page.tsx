import type { Metadata } from "next";
import { Navbar } from "@/app/music/navbar";
import { TallyEmbed } from "./tally-embed";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-xl mx-auto w-full px-6">
        <h1 className="text-4xl font-light tracking-tight text-gray-800 mb-10">
          Get in touch
        </h1>
        <div className="max-w-[60ch]">
          <TallyEmbed />
        </div>
      </main>
    </>
  );
}
