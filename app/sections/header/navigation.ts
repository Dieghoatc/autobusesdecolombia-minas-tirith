import {
  Bus,
  File,
  FileMinus,
  Newspaper,
  Rss,
  User,
  type LucideIcon,
} from "lucide-react";

export interface NavLink {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

export type NavEntry =
  | { type: "link"; href: string; label: string }
  | { type: "group"; label: string; items: NavLink[] };

// Single source for the desktop mega menu and the mobile menu.
// Pages under construction stay out until they are published:
// empresas-fabricantes, rutas-de-transporte, terminales-de-transporte, destinos, comunidad.
export const NAVIGATION: NavEntry[] = [
  { type: "link", href: "/galeria", label: "Galería" },
  {
    type: "group",
    label: "Explorar",
    items: [
      {
        href: "/empresas-de-transporte",
        label: "Empresas de transporte",
        description: "Conoce las empresas y sus flotas",
        icon: Bus,
      },
      {
        href: "/noticias",
        label: "Noticias",
        description: "La actualidad del transporte en Colombia",
        icon: Newspaper,
      },
      {
        href: "/blog",
        label: "Blog",
        description: "Historias, reseñas y artículos de la comunidad",
        icon: Rss,
      },
    ],
  },
  {
    type: "group",
    label: "Nosotros",
    items: [
      {
        href: "/nosotros",
        label: "Quiénes somos",
        description: "La comunidad detrás de Autobuses de Colombia",
        icon: User,
      },
      {
        href: "/politica-de-privacidad",
        label: "Política de privacidad",
        description: "Cómo tratamos tus datos",
        icon: File,
      },
      {
        href: "/terminos-y-condiciones",
        label: "Términos y condiciones",
        description: "Reglas de uso del portal",
        icon: FileMinus,
      },
    ],
  },
  { type: "link", href: "/contacto", label: "Contacto" },
];

export const LOGIN_HREF = "/dashboard";

export function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
