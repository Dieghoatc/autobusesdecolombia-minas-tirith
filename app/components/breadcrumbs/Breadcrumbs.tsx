"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { House, ChevronRight } from "lucide-react";

const BREADCRUMB_MAP: Record<string, string> = {
  noticias: "Noticias",
  galeria: "Galería",
  nosotros: "Sobre Nosotros",
  contacto: "Contacto",
  "empresas-de-transporte": "Empresas de Transporte",
  "empresas-fabricantes": "Empresas Fabricantes",
  "rutas-de-transporte": "Rutas de Transporte",
  "terminales-de-transporte": "Terminales de Transporte",
  destinos: "Destinos",
  comunidad: "Comunidad",
  "politica-de-privacidad": "Política de Privacidad",
  "terminos-y-condiciones": "Términos y Condiciones",
  login: "Iniciar Sesión",
  search: "Búsqueda",
  vehiculo: "Vehículos",
  modelo: "Modelos",
  "transport-category": "Categorías",
  upload: "Subir Foto",
  blog: "Blog",
};

function formatSlug(slug: string): string {
  // Decode URL encoded characters
  const decoded = decodeURIComponent(slug);
  // Capitalize each word and replace dashes with spaces
  return decoded
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function Breadcrumbs() {
  const pathname = usePathname();

  // Hide breadcrumbs on the homepage
  if (pathname === "/" || !pathname) {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbsList = [];

  let currentPath = "";

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    currentPath += `/${segment}`;

    // Skip pure numeric segments (e.g. IDs like 92) for cleaner navigation hierarchy
    if (/^\d+$/.test(segment)) {
      continue;
    }

    const label = BREADCRUMB_MAP[segment] || formatSlug(segment);

    breadcrumbsList.push({
      path: currentPath,
      label,
    });
  }

  // If there are no breadcrumbs to render, return null
  if (breadcrumbsList.length === 0) {
    return null;
  }

  return (
    <nav 
      aria-label="Breadcrumb"
      className="w-full flex items-center space-x-1.5 py-4 mb-4 overflow-x-auto no-scrollbar border-b border-zinc-900/60 text-xs text-zinc-500 font-medium select-none"
    >
      {/* Root Home Link */}
      <Link 
        href="/"
        className="flex items-center gap-1 hover:text-white transition-colors duration-200"
      >
        <House className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Inicio</span>
      </Link>

      {/* Dynamic crumbs list */}
      {breadcrumbsList.map((crumb, idx) => {
        const isLast = idx === breadcrumbsList.length - 1;

        return (
          <div key={crumb.path} className="flex items-center">
            <ChevronRight className="w-3 h-3 text-zinc-800 mx-1 flex-shrink-0" />
            {isLast ? (
              <span className="text-amber-500/90 font-bold truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.path}
                className="hover:text-white transition-colors duration-200 truncate max-w-[150px] sm:max-w-xs"
              >
                {crumb.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
