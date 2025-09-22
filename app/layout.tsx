import type { Metadata, Viewport } from "next";

import { Analytics } from "@vercel/analytics/react";
import { AdSence } from "./components/adsense";

import { Toaster } from "@/app/components/ui/toaster";
import { Header } from "@/app/components/header/Header";
import { Footer } from "@/app/components/footer/Footer";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
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
        <AdSence pId="ca-pub-1070802324735715" />
      </head>
      <body>
        <Header />
        {/* <AdHorizontal /> */}
        <main>{children}</main>
        <Footer />
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
