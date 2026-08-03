import Link from "next/link";
import { socials, type PlatformLink } from "@/app/socialsData";

function PlatformIcon({ label, href, Icon, className }: PlatformLink) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={`text-gray-400 duration-200 hover:scale-105 text-gray-400 transition-all duration-300 ${className}`}
    >
      <Icon className={`w-7 h-7`} />
    </Link>
  );
}

export function Socials() {
  return (
    <div className="mx-auto w-fit px-6 sm:px-10 py-5 my-8 rounded-xl">
      <p className="text-center text-xs font-medium uppercase tracking-wide text-gray-500">
        Listen & follow
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-5">
        {socials.map((p) => (
          <PlatformIcon key={p.label} {...p} />
        ))}
      </div>
    </div>
  );
}
