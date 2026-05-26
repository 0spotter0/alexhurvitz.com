import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { collectionsPageMap } from "@/app/data";

export const metadata: Metadata = { title: "Collections" };

export default function CollectionsPage() {
  const collections = Object.entries(collectionsPageMap);

  return (
    <>
      <Navbar title={"COLLECTIONS"} />
      <div className="flex-1 my-auto flex flex-col md:flex-row gap-4 md:h-[60vh] py-3">
        {collections.map(([slug, images]) => {
          const cover = images[1];
          return (
            <Link
              key={slug}
              href={`/collections/${slug}`}
              className="group w-full h-36 md:h-auto md:flex-1 hover:scale-103 transition-transform duration-300"
            >
              <div className="relative h-full border border-white/30 flex flex-col justify-end items-start md:items-end p-3 overflow-hidden group-hover:border-white/60 transition-colors duration-300">
                <img
                  src={`${process.env.NEXT_PUBLIC_BUNNY_URL}/${cover.filename}_thumb.webp`}
                  alt={slug}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                <span className="relative block md:hidden text-white/80 text-2xl uppercase tracking-[0.3em]">
                  {slug}
                </span>
                <span
                  className="relative hidden md:block text-white text-2xl uppercase tracking-[0.3em]"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  {slug}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
