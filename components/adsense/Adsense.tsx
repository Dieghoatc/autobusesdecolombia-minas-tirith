import Script from "next/script";

interface AdsenseAdProps {
  clientId: string;
}

export default function Adsense({ clientId }: AdsenseAdProps) {

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    ></Script>
  );
}
