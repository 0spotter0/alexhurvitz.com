import type { Metadata } from "next";
import { AlbumLinks } from "@/app/music/album-links";
import { albums, type Album } from "@/app/music/albumData";
import { Fragment } from "react";

export const metadata: Metadata = { title: "Music" };

export default function MusicPage() {
  return (
    <main className="px-4 pt-4 sm:pt-0 max-w-4xl mx-auto w-full">
      <div className="mx-auto flex flex-col w-fit max-w-full">
        <h1 className="w-full text-center sm:text-left text-xs mb-6 font-medium uppercase tracking-wide text-gray-400">
          Newest Release
        </h1>
        <div className="space-y-20">
          {albums.map((album, index) => (
            <Fragment key={index}>
              <AlbumView {...album} />
            </Fragment>
          ))}
        </div>
      </div>
    </main>
  );
}

function AlbumView({ coverSrc, title, year, tracks, links }: Album) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-fit mx-auto sm:mx-0">
        <div className="w-64 sm:w-52 mx-auto aspect-square relative overflow-hidden shadow-md rounded-sm">
          <img
            src={coverSrc}
            alt="Album cover"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mx-auto text-center sm:text-left sm:mt-4">
          <p className="text-xl text-gray-800 tracking-tight">{title}</p>
          <p className="text-sm text-gray-400">{year}</p>
          <AlbumLinks links={links} />
        </div>
      </div>
      {tracks.length > 0 && (
        <ol className="flex flex-col divide-y divide-gray-100 w-full max-w-full sm:max-w-lg min-w-0">
          {tracks.map((track, i) => (
            <li key={i} className="flex items-center gap-4 py-3 min-w-0">
              <span className="text-xs text-gray-300 w-5 flex-shrink-0 text-right tabular-nums">
                {i + 1}
              </span>
              <span className="text-sm text-gray-500 pe-4 min-w-0 truncate">
                {track}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
