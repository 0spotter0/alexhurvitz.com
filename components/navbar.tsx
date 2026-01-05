import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";

export async function Navbar({ title }: { title: string }) {
  return (
    <div className="flex flex-col h-full w-[30rem]">
      <p className="whitespace-pre font-bold text-4xl h-52">{title}</p>
      <div className="flex flex-col gap-6 underline-offset-2 decoration-1 font-bold">
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
        className="font-bold mt-auto flex items-center gap-2"
      >
        <AiFillInstagram className="size-6" />
        @real.alex.photo
      </Link>
    </div>
  );
}
