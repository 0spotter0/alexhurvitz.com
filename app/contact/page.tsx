import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <Navbar title={"CONTACT"} />
      <div className="w-full h-full sm:pt-10">
        <div className="flex flex-col gap-8 w-full max-w-2xl">
          <iframe
            src={process.env.NEXT_PUBLIC_GOOGLE_FORM_URL}
            width="100%"
            height="850"
          >
            Loading...
          </iframe>
        </div>
      </div>
    </>
  );
}
