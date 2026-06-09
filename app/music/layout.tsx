import type { Metadata } from "next";

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
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 pt-24 sm:pt-32 sm:pb-32">{children}</div>
      <footer className="px-6 py-8 text-center">
        <p className="text-xs opacity-60">Copyright © 2026 by [Alex Hurvitz]</p>
      </footer>
    </div>
  );
}
