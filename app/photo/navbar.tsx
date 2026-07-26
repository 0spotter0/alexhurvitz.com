"use client";

import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";
import { SiUnsplash } from "react-icons/si";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { collectionsPageMap } from "@/app/photo/data";
import { SectionTitle } from "@/app/section-title";

export function Navbar({ title }: { title: string }) {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsBurgerMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
    <>
      <div className="hidden sm:block sticky top-10 self-start">
        <NavbarContent title={title} />
      </div>
      <div className="absolute inset-0 h-fit sm:hidden z-10">
        <div>
          <div className="p-6 sm:p-10 bg-white mt-0 w-full flex justify-between items-center">
            <div className="flex flex-col gap-4">
              <SectionTitle current="photography" className="text-sm" />
              <p className="text-2xl font-medium tracking-wide">{title}</p>
            </div>
            <button
              onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
                    className="lucide lucide-x-icon lucide-x"
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
                    className="lucide lucide-menu-icon lucide-menu"
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
          <AnimatePresence initial={false}>
            {isBurgerMenuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden bg-white"
              >
                <div className="p-6 sm:p-10">
                  <NavbarContent
                    closeBurger={() => setIsBurgerMenuOpen(false)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

function NavbarContent({
  title,
  closeBurger,
}: {
  title?: string;
  closeBurger?: () => void;
}) {
  const pathname = usePathname();
  const isOnCollection = pathname.startsWith("/photo/collections/");
  const [isCollectionsOpen, setIsCollectionsOpen] =
    useState<boolean>(isOnCollection);

  return (
    <div className="flex flex-col w-[15rem] md:w-[20rem] h-[calc(100vh-5rem)]">
      <div className="sm:h-48">
        {title && (
          <>
            <SectionTitle
              current="photography"
              className="text-sm sm:text-base mb-3"
            />
            <p className="whitespace-pre font-medium tracking-wide text-lg sm:text-3xl">
              {title}
            </p>
          </>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:gap-6 underline-offset-2 decoration-1 sm:flex-1">
        <Link
          href="/photo"
          className={pathname === "/photo" ? "underline" : ""}
        >
          home
        </Link>
        <Link
          href="/photo/about"
          className={pathname === "/photo/about" ? "underline" : ""}
        >
          about me
        </Link>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Link
              href="/photo/collections"
              className={pathname === "/photo/collections" ? "underline" : ""}
              onClick={closeBurger}
            >
              collections
            </Link>
            <button
              type="button"
              aria-label="Toggle collections"
              aria-expanded={isCollectionsOpen}
              onClick={() => setIsCollectionsOpen((open) => !open)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ rotate: isCollectionsOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <path d="m6 9 6 6 6-6" />
              </motion.svg>
            </button>
          </div>
          <AnimatePresence initial={false}>
            {isCollectionsOpen && (
              <motion.div
                key="collections-dropdown"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-4 sm:gap-6 pt-4 sm:pt-6">
                  {Object.keys(collectionsPageMap).map((collection, index) => (
                    <Link
                      key={index}
                      href={`/photo/collections/${collection}`}
                      onClick={closeBurger}
                      className={`ms-10 ${pathname === `/photo/collections/${collection}` ? " underline" : ""}`}
                    >
                      {collection}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Link
          href="/photo/contact"
          className={pathname === "/photo/contact" ? "underline" : ""}
          onClick={closeBurger}
        >
          contact
        </Link>
        <Link
          href="/photo/book"
          className={pathname === "/photo/book" ? "underline" : ""}
          onClick={closeBurger}
        >
          book a session
        </Link>
      </div>
      <div className="fixed bottom-6 sm:static flex flex-col gap-4">
        <Link
          href="https://unsplash.com/@alex_hurvitz/collections"
          target="_blank"
          rel="noopener noreferrer"
          title="Unsplash"
          className="font-bold flex items-center gap-2"
        >
          <SiUnsplash className="ml-[2px] size-5" />
          @alex_hurvitz
        </Link>
        <Link
          href="https://www.instagram.com/real.alex.photo/"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
          className="font-bold flex items-center gap-2"
        >
          <AiFillInstagram className="size-6" />
          @real.alex.photo
        </Link>
        <p className="text-xs opacity-60 hidden sm:block">Copyright © 2026 by [Alex Hurvitz]</p>
      </div>
    </div>
  );
}
