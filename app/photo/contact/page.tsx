import type { Metadata } from "next";
import { Navbar } from "@/app/photo/navbar";
import { TallyEmbed } from "./tally-embed";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <Navbar title={"CONTACT"} />
      <div className="md:mr-30 w-full h-full my-auto">
        <div className="gap-8 mx-auto max-w-[60ch]">
          <TallyEmbed />
        </div>
      </div>
</>
  );
}
