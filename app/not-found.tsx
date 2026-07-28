import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-svh flex flex-col items-center justify-center text-center px-10 gap-6">
      <span className="text-2xl font-light">404: Page not found</span>
      <Link
        href="/"
        className="text-sm text-black/60 hover:text-black underline underline-offset-4 hover:underline-offset-6 transition-all duration-300"
      >
        home
      </Link>
    </main>
  );
}
