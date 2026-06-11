import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buscar Autobuses | Autobuses de Colombia",
  description: "Busca fotografías, noticias y modelos de autobuses en la mayor comunidad de transporte de Colombia.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
