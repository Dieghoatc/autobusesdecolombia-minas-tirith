import type { Metadata } from "next";
import "@fontsource/mitr";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Footer from "./components/footer/Footer";
import { Toaster } from "@/app/components/ui/toaster";
import Header from "./components/header/Header";
import abcBus from "./assets/autobusesdecolombia_bus.png";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Autobuses de Colombia - ¡Mucho más para ver!",
  description:
    "Descubre la mayor comunidad de aficionados a los Autobuses de Colombia. Portal de fotografia, noticias, historias y eventos sobre el apasionante mundo del transporte público. Únete a nuestra comunidad y comparte tu pasión por los autobuses y el transporte en Colombia.",
  keywords:
    "autobuses de colombia, autobuses en colombia, buses de colombia, autobus colombia, bus colombia, autobuses colombia, buses colombianos, bus de colombia, autobuses colombianos, autobuses, buses, buses en colombia, buses de colombia, bus en colombia, colombian bus",
  authors: [{ name: "Autobuses de Colombia" }],
  publisher: "Autobuses de Colombia",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://autobusesdecolombia.com",
    images: [
      {
        url: abcBus.src,
        width: 1200,
        height: 630,
        alt: "Autobuses de Colombia",
      },
    ],
  },
};

const GOOLGE_ADSENSE_CLIEND_ID = process.env.PUBLIC_GOOLGE_ADSENSE_CLIEND_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GOOLGE_ADSENSE_CLIEND_ID}`}
          crossOrigin="anonymous"
        ></Script>
        <Header />
        {children}
        <Toaster />
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
