import type { Metadata } from "next";
import { Booker } from "./booker";

export const metadata: Metadata = { title: "Book" };

export default function BookPage() {
  return (
    <div className="w-full h-full my-auto">
      <Booker calUsername={process.env.NEXT_PUBLIC_CAL_PHOTO!} />
    </div>
  );
}
