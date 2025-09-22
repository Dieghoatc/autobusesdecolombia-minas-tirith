'use client'

import Script from "next/script";

type AdSenceProps = {
  pId: string;
};

export function AdSence({ pId }: AdSenceProps) {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
      crossOrigin="anonymous"
      id="adsense-script"
      strategy="afterInteractive"
    />
  );
}
