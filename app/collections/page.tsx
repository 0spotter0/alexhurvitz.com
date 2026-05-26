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
      <div className="mx-auto sm:mx-0 sm:mt-20 h-fit grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-16 pb-8">
        {collections.map(([slug, images]) => {
          const cover = images[0];
          return (
            <Link
              key={slug}
              href={`/collections/${slug}`}
              className="group flex flex-col gap-3"
            >
              <div className="w-60 aspect-square overflow-hidden bg-neutral-100">
                <img
                  src={`${process.env.NEXT_PUBLIC_BUNNY_URL}/${cover.filename}_thumb.webp`}
                  alt={slug}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm uppercase tracking-widest underline-offset-2 decoration-1 [@media(hover:hover)]:group-hover:underline">{slug}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
