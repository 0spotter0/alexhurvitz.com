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
    <div className="pt-20 min-h-screen flex flex-col">
      {children}
    </div>
  );
}
