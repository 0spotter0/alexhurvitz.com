import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";

export async function Navbar({ title }: { title: string }) {
  return (
    <div className="fixed flex flex-col w-[25rem] h-[calc(100vh-5rem)]">
      <p className="whitespace-pre font-bold text-4xl h-52">{title}</p>
      <div className="flex flex-col gap-6 underline-offset-2 decoration-1 font-bold flex-1">
        <Link href="/" className="underline">
          home
        </Link>
        <Link href="/about" className="underline">
          about me
        </Link>
        <p>collections</p>
        <Link href="/collections/landscapes" className="ms-10 underline">
          landscapes
        </Link>
        <Link href="/collections/night" className="ms-10 underline">
          night
        </Link>
        <Link href="/collections/portraits" className="ms-10 underline">
          portraits
        </Link>
      </div>
      <Link
        href="https://www.instagram.com/real.alex.photo/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold flex items-center gap-2"
      >
        <AiFillInstagram className="size-6" />
        @real.alex.photo
      </Link>
    </div>
  );
}
