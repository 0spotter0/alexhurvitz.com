import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-svh flex flex-col sm:flex-row">
      <Link
        href="/photo"
        className="flex-1 flex flex-col items-center justify-center h-50% sm:min-h-svh px-10 py-16 group transition-colors duration-300 hover:bg-stone-100"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3 group-hover:text-gray-600 transition-colors duration-300">
          Alex Hurvitz
        </span>
        <span className="text-4xl sm:text-5xl font-light tracking-tight text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
          Photography
        </span>
        <span className="mt-6 text-xs tracking-widest uppercase text-gray-400 group-hover:text-gray-500 transition-colors duration-300">
          Enter →
        </span>
      </Link>

      <div className="w-px bg-gray-200 hidden sm:block" />
      <div className="h-px bg-gray-200 sm:hidden" />

      <Link
        href="/music"
        className="flex-1 flex flex-col items-center justify-center h-50% sm:min-h-svh px-10 py-16 group transition-colors duration-300 hover:bg-stone-100"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3 group-hover:text-gray-600 transition-colors duration-300">
          Alex Hurvitz
        </span>
        <span className="text-4xl sm:text-5xl font-light tracking-tight text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
          Music
        </span>
        <span className="mt-6 text-xs tracking-widest uppercase text-gray-400 group-hover:text-gray-500 transition-colors duration-300">
          Enter →
        </span>
      </Link>
    </main>
  );
}
