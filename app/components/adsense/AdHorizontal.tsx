"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    adsbygoogle: any[];
  }
}

export function AdHorizontal() {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error("Adsense error: ", error);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-1070802324735715"
      data-ad-slot="4701149950"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
