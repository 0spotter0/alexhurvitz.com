"use client";
import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Tally?: { loadEmbeds: () => void };
  }
}

export function TallyEmbed() {
  useEffect(() => {
    window.Tally?.loadEmbeds();
  }, []);

  return (
    <>
      <iframe
        data-tally-src={`https://tally.so/embed/${process.env.NEXT_PUBLIC_TALLY_FORM_ID!}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
        loading="eager"
        width="100%"
        title="Contact me"
      />
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
      />
    </>
  );
}
