"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  Bus, 
  Factory, 
  File, 
  FileMinus, 
  House, 
  Images, 
  Layers, 
  Mail, 
  MapPinCheck, 
  Newspaper, 
  Route, 
  Rss, 
  User, 
  Users 
} from 'lucide-react';
import { useShowSidebarMenu } from "@/lib/store/useShowSidebarMenu";

interface MenuItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface MenuSection {
  title?: string;
  items: MenuItem[];
}

const MENU_SECTIONS: MenuSection[] = [
  {
    items: [
      { href: "/", label: "Inicio", icon: House },
      { href: "/noticias", label: "Noticias", icon: Newspaper },
      { href: "/empresas-de-transporte", label: "Empresas de Transporte", icon: Bus },
      // { href: "/empresas-fabricantes", label: "Empresas Fabricantes", icon: Factory }, // Temporarily disabled for AdSense approval (Under Construction)
    ]
  },
  /* Temporarily disabled for AdSense approval (Under Construction)
  {
    title: "Transporte",
    items: [
      { href: "/rutas-de-transporte", label: "Rutas", icon: Route },
      { href: "/terminales-de-transporte", label: "Terminales de Transporte", icon: Layers },
      { href: "/destinos", label: "Destinos", icon: MapPinCheck },
    ]
  },
  */
  {
    title: "Nosotros",
    items: [
      { href: "/galeria", label: "Galería", icon: Images }, // Fixed broken URL from /galerias to /galeria
      { href: "/nosotros", label: "Nosotros", icon: User },
      // { href: "/comunidad", label: "Comunidad", icon: Users }, // Temporarily disabled for AdSense approval (Under Construction)
      { href: "/blog", label: "Blog", icon: Rss },
    ]
  },
  {
    title: "Legal",
    items: [
      { href: "/contacto", label: "Contacto", icon: Mail },
      { href: "/politica-de-privacidad", label: "Política de Privacidad", icon: File },
      { href: "/terminos-y-condiciones", label: "Términos y Condiciones", icon: FileMinus }, // Fixed broken URL from /terminos-condiciones to /terminos-y-condiciones
    ]
  }
];

interface MenuListProps {
  collapsed?: boolean;
}

export function MenuList({ collapsed = false }: MenuListProps) {
  const pathname = usePathname();
  const { setOpenMobile } = useShowSidebarMenu();

  const handleLinkClick = () => {
    setOpenMobile(false);
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <nav className="flex flex-col gap-4 py-2">
        {MENU_SECTIONS.map((section, sectionIdx) => (
          <div key={sectionIdx} className="flex flex-col">
            {/* Section Header */}
            {!collapsed && section.title && (
              <h2 className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase px-3 mb-1.5 mt-2">
                {section.title}
              </h2>
            )}

            {/* Section Divider (if collapsed, except first) */}
            {collapsed && sectionIdx > 0 && (
              <div className="w-8 h-[1px] bg-zinc-800/60 my-2 self-center animate-fade-in" />
            )}

            {/* Section Items */}
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      title={collapsed ? item.label : undefined}
                      className={`
                        flex items-center rounded-lg transition-all duration-200
                        ${collapsed 
                          ? "justify-center w-10 h-10 mx-auto" 
                          : "gap-3 px-3 py-2 text-sm font-medium w-full"
                        }
                        ${isActive 
                          ? "bg-white/[0.08] text-white shadow-sm" 
                          : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]"
                        }
                      `}
                    >
                      <Icon className={`flex-shrink-0 ${collapsed ? "w-5 h-5" : "w-[18px] h-[18px]"}`} />
                      {!collapsed && (
                        <span className="truncate">{item.label}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <footer className="py-6 mt-8 border-t border-zinc-900 text-center">
          <p className="text-[10px] text-zinc-500 font-medium">
            &copy; {new Date().getFullYear()} Autobuses de Colombia
          </p>
        </footer>
      )}
    </div>
  );
}