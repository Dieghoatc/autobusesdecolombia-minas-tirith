import type { Metadata } from "next";

import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/app/components/ui/toaster";
import abcBus from "@/assets/autobusesdecolombia_bus.png";
import { Header } from "@/app/components/header/Header";
import { Footer } from "@/app/components/footer/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Autobuses de Colombia - ¡Mucho más para ver!",
    template: "%s | Autobuses de Colombia",
  },
  description:
    "Descubre la mayor comunidad de aficionados a los Autobuses de Colombia. Portal de fotografia, noticias, historias y eventos sobre el apasionante mundo del transporte público. Únete a nuestra comunidad y comparte tu pasión por los autobuses y el transporte en Colombia.",
  keywords:
    "autobuses de colombia, autobuses en colombia, buses de colombia, autobús colombia, bus colombia, autobuses colombia, buses colombianos, bus de colombia, autobuses colombianos, autobuses, buses, buses en colombia, buses de colombia, bus en colombia",
  authors: [{ name: "Autobuses de Colombia" }],
  publisher: "Autobuses de Colombia",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  verification: {
    google: "your-google-site-verification",
  },
  robots: "index, follow",
  other: {
    "google-adsense-account": "ca-pub-1070802324735715",
  },
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
  twitter: {
    card: "summary_large_image",
    title: "Autobuses de Colombia - ¡Mucho más para ver!",
    description:
      "Descubre la mayor comunidad de aficionados a los Autobuses de Colombia.",
    images: [abcBus.src],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <div id="root">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
