import type { Metadata, Viewport } from "next";

import Script from "next/script";

import { SidebarMobile, SidebarDesktop } from "./sections/sidebar";
import { Header } from "./sections/header";

import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: "Autobuses de Colombia - ¡Mucho más para ver!",
  description:
    "Descubre la mayor comunidad de aficionados a los Autobuses de Colombia. Portal de fotografia, noticias, historias y eventos sobre el apasionante mundo del transporte público. Únete a nuestra comunidad y comparte tu pasión por los autobuses y el transporte en Colombia.",
  keywords:
    "autobuses de colombia, autobuses en colombia, buses de colombia, autobús colombia, bus colombia, autobuses colombia, buses colombianos, bus de colombia, autobuses colombianos, autobuses, buses, buses en colombia, buses de colombia, bus en colombia",
  authors: [{ name: "Autobuses de Colombia" }],
  publisher: "Autobuses de Colombia",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Autobuses de Colombia - ¡Mucho más para ver!",
    description:
      "Descubre la mayor comunidad de aficionados a los Autobuses de Colombia. Portal de fotografia, noticias, historias y eventos sobre el apasionante mundo del transporte público. Únete a nuestra comunidad y comparte tu pasión por los autobuses y el transporte en Colombia.",
    url: "https://autobusesdecolombia.com",
    siteName: "Autobuses de Colombia",
    images: [
      {
        url: "https://tusitio.com/og-image.jpg",
        height: 630,
        alt: "Texto alternativo descriptivo",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  other: {
    "google-adsense-account": "ca-pub-1070802324735715",
  },
  category: "Transporte en Colombia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1070802324735715"
        />
      </head>
      <body>
        <div className="flex">
          <div>
            <section className="hidden md:block">
              <SidebarDesktop />
            </section>
            <section className="block md:hidden">
              <SidebarMobile />
            </section>
          </div>
          <div className="flex-1">
            <div className="flex flex-col">
              <Header />
            </div>
            <div className="max-w-7xl mx-auto w-full">
              <main className="px-4 md:px-6">{children}</main>
            </div>
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
