import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Alex Hurvitz Photography",
    template: "%s | Alex Hurvitz Photography",
  },
};

export default function PhotoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-6 pt-25 sm:p-10 min-h-screen flex flex-col sm:flex-row">
      {children}
    </div>
  );
}
