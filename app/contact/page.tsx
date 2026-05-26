import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { TallyEmbed } from "./tally-embed";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <Navbar title={"CONTACT"} />
      <div className="w-full h-full my-auto">
        <div className="flex flex-col gap-8 w-full max-w-[60ch]">
          <TallyEmbed />
        </div>
      </div>
</>
  );
}
