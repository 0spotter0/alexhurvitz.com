import type { Metadata } from "next";
import Link from "next/link";
import { HiCamera, HiMusicalNote } from "react-icons/hi2";
import {
  cardSocials as socials,
  type CardSocialLink,
} from "@/app/socialsData";

export const metadata: Metadata = {
  title: "Alex Hurvitz",
  description: "All my links in one place.",
};

type CardLink = CardSocialLink;

const portfolios: CardLink[] = [
  { label: "Photography", href: "/photo", Icon: HiCamera },
  { label: "Music", href: "/music", Icon: HiMusicalNote },
];

function CardButton({ label, href, Icon, external, className }: CardLink) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center gap-4 w-full border border-gray-200 bg-white p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-sm rounded-sm"
    >
      <Icon
        className={`w-6 h-6 shrink-0 text-gray-500 transition-colors duration-300 ${
          className ?? "group-hover:text-gray-900"
        }`}
      />
      <span className="text-base font-medium text-gray-900">{label}</span>
    </Link>
  );
}

export default function CardPage() {
  return (
    <main className="min-h-svh flex flex-col items-center px-6 py-16">
      <div className="w-full max-w-md flex flex-col items-center">
        <img
          src={`${process.env.NEXT_PUBLIC_BUNNY_URL}/alex.webp`}
          alt="Alex Hurvitz"
          className="w-32 h-32 rounded-full object-cover shadow-md object-top-right object-200"
        />

        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-gray-900">
          Alex Hurvitz
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          musician, composer, photographer
        </p>

        <div className="mt-10 w-full flex flex-col gap-3">
          <p className="text-center text-xs font-medium text-gray-500">
            check out my portfolios
          </p>
          {portfolios.map((link) => (
            <CardButton key={link.label} {...link} />
          ))}
        </div>

        <div className="mt-8 w-full">
          <p className="text-center text-xs font-medium text-gray-500">
            all my links
          </p>
          <div className="mt-3 flex flex-col gap-3">
            {socials.map((link) => (
              <CardButton key={link.label} {...link} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
