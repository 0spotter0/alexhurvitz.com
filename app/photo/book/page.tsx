import type { Metadata } from "next";
import { Navbar } from "@/app/photo/navbar";
import { Booker } from "./booker";

export const metadata: Metadata = { title: "Book" };

export default function BookPage() {
  return (
    <>
      <Navbar title={"BOOK"} />
      <div className="w-full h-full my-auto">
        <Booker calUsername={process.env.NEXT_PUBLIC_CAL_USERNAME!} />
      </div>
    </>
  );
}
