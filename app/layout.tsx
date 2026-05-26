import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Alex Hurvitz Photography",
    template: "%s | Alex Hurvitz Photography",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSans.variable} antialiased p-6 pt-28 sm:p-10 min-h-screen flex flex-col sm:flex-row`}
      >
        {children}
      </body>
    </html>
  );
}
