import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <Navbar title={"ABOUT ME"} />
      <div className="w-full h-full items-center justify-center">
        <div className="flex flex-col gap-8 max-w-[60ch] sm:mt-20">
          <img
            src={`${process.env.NEXT_PUBLIC_BUNNY_URL}/alex.avif`}
            alt="Picture of Alex"
            className="w-1/2"
          />  
          <p className="w-full">
            hello world
          </p>
        </div>
      </div>
    </>
  );
}
