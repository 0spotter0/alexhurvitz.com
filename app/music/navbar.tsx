"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import favicon from "../favicon.ico";

import { SectionTitle } from "@/app/section-title";

const links = [
  { label: "Albums", href: "/music" },
  { label: "About", href: "/music/about" },
  { label: "Media", href: "/music/media" },
  { label: "Book", href: "/music/book" },
  { label: "Contact", href: "/music/contact" },
];

export function Navbar() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsBurgerMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close the menu once navigation to the new route has actually rendered,
  // so the menu overlay stays up until then (no flash of the old page).
  useEffect(() => {
    setIsBurgerMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isBurgerMenuOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      setTimeout(() => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }, 450);
    }
  }, [isBurgerMenuOpen]);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white">
      <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <SectionTitle
            current="music"
            className="text-lg font-light tracking-tight text-gray-800"
          />
        </div>

        {/* Desktop links */}
        <NavbarContent className="hidden sm:flex items-center gap-8 text-lg tracking-tight text-gray-400" />

        {/* Mobile burger button */}
        <button
          onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
          aria-label="Toggle menu"
          className="sm:hidden p-2 -mr-2 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <AnimatePresence mode="wait">
            {isBurgerMenuOpen ? (
              <motion.svg
                key="close"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </motion.svg>
            ) : (
              <motion.svg
                key="menu"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <path d="M4 5h16" />
                <path d="M4 12h16" />
                <path d="M4 19h16" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence initial={false}>
        {isBurgerMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="sm:hidden fixed inset-x-0 top-20 bottom-0 overflow-y-auto bg-white border-t border-gray-100"
          >
            <NavbarContent className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-8 text-2xl tracking-tight text-gray-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavbarContent({ className }: { className: string }) {
  const pathname = usePathname();

  return (
    <div className={className}>
      {links.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className={`transition-colors duration-300 hover:text-gray-800 font-light ${
            pathname === href ? "text-gray-800" : ""
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
