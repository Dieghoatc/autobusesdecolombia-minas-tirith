"use client";

import Script from "next/script";

export function AdHorizontal() {
  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1070802324735715"
        data-ad-slot="4701149950"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>

      <Script id="adsense-horizontal" strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </>
  );
}
