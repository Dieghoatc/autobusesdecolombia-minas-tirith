import type { Metadata } from "next";
import "@fontsource/mitr";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Autobuses de Colombia",
  description:
    "Descubre la mayor comunidad de aficionados a los autobuses en Colombia. Portal de fotografia, noticias, historias y eventos sobre el apasionante mundo del transporte público. Únete a nuestra comunidad y comparte tu pasión por los autobuses y el transporte en Colombia.",
  keywords: "autobuses, fotografía, transporte, comunidad, historias, noticias, galerias, información, autobuses de colombia, buses de colombia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
