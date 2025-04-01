import type { Metadata } from "next";
import "@fontsource/mitr";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Footer from "./components/footer/Footer";
import { Toaster } from "@/components/ui/toaster";
import Header from "./components/header/Header";
import autobusesdecolombia_image from "@/assets/autobusesdecolombia-01.png";

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
        url: autobusesdecolombia_image.src,
        width: 1200,
        height: 630,
        alt: "Autobuses de Colombia",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Header />
        {children}
        <Toaster />
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
