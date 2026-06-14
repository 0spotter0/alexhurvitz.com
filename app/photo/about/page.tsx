import type { Metadata } from "next";
import { Navbar } from "@/app/photo/navbar";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <Navbar title={"ABOUT ME"} />
      <div className="w-full h-full items-center justify-center">
        <div className="flex flex-col items-center gap-8 w-full">
          <img
            src={`${process.env.NEXT_PUBLIC_BUNNY_URL}/alex.webp`}
            alt="Picture of Alex"
            className="w-full sm:w-3/4"
          />
          <div className="space-y-4 w-full sm:w-3/4 pb-10">
            <p>
              Alex Hurvitz is a Los Angeles–based self-taught photographer who’s
              been behind the camera for nearly two years, capturing everything
              from live events and portraits to abstract details and fleeting
              moments that might otherwise go unnoticed. What draws Alex most to
              photography is its ability to tell stories and preserve emotion in
              a single frame.
            </p>
            <p>
              Beyond photography, Alex is also a jazz pianist and composer, with
              a deep passion for blending visual art and music together. One of
              Alex’s long-term creative goals is to combine his photography with
              his own original compositions, creating artistic experiences
              intended to leave viewers with a lasting and deeply personal
              response.
            </p>
            <p>
              Alex loves being involved in the photography scene and community,
              always excited by the opportunity to make new connections and
              collaborate creatively, all while capturing his work on a Sony A7R
              III.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
