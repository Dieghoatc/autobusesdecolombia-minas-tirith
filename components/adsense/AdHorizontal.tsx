import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: Array<() => void>;
  }
}

export function AdHorizontal() {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push(() => {});
      }
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

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
    </>
  );
}
