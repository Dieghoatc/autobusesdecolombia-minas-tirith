import type { Metadata } from "next";
import '@fontsource/mitr';
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "Autobuses de Colombia",
  description: "Portal de fotografia, noticias, información y opinión sobre el transporte en Colombia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <Analytics />
      <body>
        {children}
      </body>
    </html>
  );
}
