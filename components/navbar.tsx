"use client";

import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { collectionsPageMap } from "@/app/data";

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
      // const scrollbarWidth =
      //   window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      // document.body.style.paddingRight = `calc(${scrollbarWidth}px + 2.5rem)`;
    } else {
      setTimeout(() => {
        document.body.style.overflow = "";
        // document.body.style.paddingRight = "";
      }, 450);
    }
  }, [isBurgerMenuOpen]);

  return (
    <>
      <div className="hidden sm:block sticky top-10 self-start">
        <NavbarContent title={title} />
      </div>
      <div className="absolute inset-0 h-fit sm:hidden">
        <div>
          <div className="p-6 sm:p-10 bg-white mt-0 w-full flex justify-between items-center">
            <p className="text-2xl font-bold">{title}</p>
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
          <AnimatePresence mode="sync">
            {isBurgerMenuOpen && (
              <motion.div
                initial={{ translateY: -20, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                exit={{ translateY: -20, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-6 sm:p-10"
              >
                <NavbarContent closeBurger={() => setIsBurgerMenuOpen(false)} />
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

  return (
    <div className="flex flex-col w-[15rem] md:w-[25rem] h-[calc(100vh-5rem)]">
      {title && (
        <p className="whitespace-pre font-bold text-2xl md:text-4xl h-52">
          {title}
        </p>
      )}
      <div className="flex flex-col gap-6 underline-offset-2 decoration-1 flex-1">
        <Link href="/" className={pathname === "/" ? "underline" : ""}>
          home
        </Link>
        <Link href="/about" className={pathname === "/about" ? "underline" : ""}>
          about me
        </Link>
        <Link href="/collections" className={pathname === "/collections" ? "underline" : ""} onClick={closeBurger}>collections</Link>
        {Object.keys(collectionsPageMap).map((collection, index) => (
          <Link
            key={index}
            href={`/collections/${collection}`}
            onClick={closeBurger}
            className={`ms-10 ${pathname === `/collections/${collection}` ? " underline" : ""}`}
          >
            {collection}
          </Link>
        ))}
        <Link href="/contact" className={pathname === "/contact" ? "underline" : ""} onClick={closeBurger}>
          contact
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <Link
          href="https://www.instagram.com/real.alex.photo/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold flex items-center gap-2"
        >
          <AiFillInstagram className="size-6" />
          @real.alex.photo
        </Link>
        <p className="text-xs opacity-30">Copyright © 2025 by [Alex Hurvitz]</p>
      </div>
    </div>
  );
}
