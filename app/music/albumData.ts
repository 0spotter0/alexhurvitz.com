export interface Album {
  coverSrc: string;
  title: string;
  year: string;
  tracks: string[];
  links?: {
    spotify?: string;
    apple?: string;
    soundcloud?: string;
    bandcamp?: string;
  };
}

export const albums: Album[] = [
  {
    coverSrc: `${process.env.NEXT_PUBLIC_BUNNY_URL}/music/dandelion-cover.webp`,
    title: "Dandelion Dream",
    year: "2026",
    tracks: [
      "Glenn Zaleski Trio Like Piece (Hopefully) / Timeless Thoughts - Live",
      "Dandelion Dream - Live",
      "Where The Wind Leads - Live",
      "Forgetting Again - Live",
      "Endless Meadow - Live",
      "Your Eyes - Live",
      "Picnic Friend - Live",
      "See You Again Tomorrow - Live",
    ],
    links: {
      spotify:
        "https://open.spotify.com/album/4i1kGttOdX41I5vJgpoYOA?si=xsoigFchRWShzfL4rN-6gQ",
      apple: "https://music.apple.com/us/album/dandelion-dream/6792819745",
      soundcloud: "https://soundcloud.com/alexhurvitz/sets/dandelion-dream-1",
    },
  },
  {
    coverSrc: `${process.env.NEXT_PUBLIC_BUNNY_URL}/music/value-cover.webp`,
    title: "Value (feat. Dan Ventura) - Single",
    year: "2026",
    tracks: ["Value (feat. Dan Ventura)"],
    links: {
      spotify:
        "https://open.spotify.com/album/2Irfhy6jBYz1b3Y69CDsO0?si=KeA-aJrgRkqIu5eJ1WX3tw",
      apple:
        "https://music.apple.com/us/album/value-feat-dan-ventura-single/6777116475",
      soundcloud: "https://soundcloud.com/alexhurvitz/value-feat-dan-ventura",
    },
  },
];
