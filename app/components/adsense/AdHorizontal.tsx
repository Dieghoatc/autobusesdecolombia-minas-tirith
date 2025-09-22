"use client";

import { useEffect } from "react";

export function AdHorizontal() {

  
  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (error) {
      console.error("Error loading AdSense script:", error);
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
