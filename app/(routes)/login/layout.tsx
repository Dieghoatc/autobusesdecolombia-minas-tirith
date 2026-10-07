import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión | Autobuses de Colombia",
  description: "Inicia sesión en la plataforma de Autobuses de Colombia para publicar fotografías y colaborar con la comunidad.",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
