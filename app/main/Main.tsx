"use client";

import { Gallery } from "./components/gallery/Gallery";
import { Magazine } from "./components/magazine";
import { Sidebar } from "./components/sidebar";

import { useShowSidebarMenu } from "@/lib/store/useShowSidebarMenu";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

export function Main() {
  const { open } = useShowSidebarMenu();
  const isMobile = useIsMobile();

  return (
    <div className="grid grid-cols-12 relative h-screen overflow-hidden">
      {!isMobile && open && (
        <aside className="col-span-2 sticky top-0 h-screen overflow-y-auto z-10 bg-black">
          <Sidebar />
        </aside>
      )}
      {isMobile && open && (
        <div className="absolute inset-0 z-50 bg-black/40">
          <aside
            className="absolute top-0 left-0 w-4/5 h-full bg-black shadow-lg overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar />
          </aside>
        </div>
      )}

      <main
        className={`
          ${
            !isMobile && open
              ? "col-span-10"
              : "col-span-12"
          } 
          h-screen overflow-y-auto transition-all duration-300
        `}
      >
        <Magazine />
        <Gallery />
      </main>
    </div>
  );
}
