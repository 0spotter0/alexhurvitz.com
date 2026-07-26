"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const sections = [
  { label: "photography", href: "/photo" },
  { label: "music", href: "/music" },
] as const;

type Section = (typeof sections)[number]["label"];

export function SectionTitle({
  current,
  className,
}: {
  current: Section;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filteredSections = sections.filter((s) => s.label !== current);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`relative inline-flex w-fit items-center gap-1.5 ${className ?? ""}`}
    >
      <Link
        href="/"
        className="underline decoration-1 underline-offset-2 transition-opacity hover:opacity-60"
      >
        alexhurvitz.com
      </Link>
      <span aria-hidden className="opacity-50">
        /
      </span>
      <div className="relative inline-flex">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-haspopup="menu"
          aria-expanded={open}
          className="inline-flex items-center gap-1 transition-opacity hover:opacity-60"
        >
          {current}
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="m6 9 6 6 6-6" />
          </motion.svg>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              key="section-menu"
              role="menu"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute -left-3 top-full z-50 mt-1 overflow-hidden rounded-md bg-white/70 px-3 py-2 backdrop-blur-sm"
            >
              {filteredSections.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="block text-gray-500 transition-colors hover:text-gray-900"
                >
                  {label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
