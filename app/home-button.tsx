import Link from "next/link";

export function HomeButton() {
  return (
    <Link
      href="/"
      className="w-fit z-50 rounded-full sm:rounded-none sm:rounded-l-full border border-gray-400/20 bg-gray-100 mt-10 px-6 py-3 tracking-tight sm:text-base text-gray-500 shadow-md transition-transform duration-300 hover:scale-103 sm:fixed sm:bottom-18 sm:right-0"
      style={{ textBoxTrim: "trim-start" }}
    >
      portfolios
    </Link>
  );
}
