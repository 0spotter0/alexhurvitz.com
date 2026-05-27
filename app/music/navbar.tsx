"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "About", href: "/music/about" },
  { label: "Media", href: "/music/media" },
  { label: "Contact", href: "/music/contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/music" className="text-xl font-light tracking-tight text-gray-800 hover:text-gray-500 transition-colors duration-300">
          Alex Hurvitz
        </Link>
        <div className="flex items-center gap-8 text-xs tracking-widest text-gray-400">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`transition-colors duration-300 hover:text-gray-800 text-lg tracking-tight ${
                pathname === href ? "text-gray-800" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
