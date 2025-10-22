"use client";

import { Gallery } from "./components/gallery/Gallery";
import { Magazine } from "./components/magazine";
import { Sidebar } from "./components/sidebar";

import { useShowSidebarMenu } from "@/lib/store/useShowSidebarMenu";

export default function Main() {
  const { open } = useShowSidebarMenu();

  return (
    <div className="grid grid-cols-12 overflow-hidden">
      {open && (
        <div className="sticky top-0 col-span-2 h-[100vh] overflow-y-auto">
          <Sidebar />
        </div>
      )}
      <div className={`${open ? "col-span-10" : "col-span-12"} h-[100vh] overflow-y-auto`}>
        <Magazine />
        <Gallery />
      </div>
    </div>
  );
}