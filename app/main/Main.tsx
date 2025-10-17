"use client";

import { Gallery } from "./components/gallery/Gallery";
import { Magazine } from "./components/magazine";

import { useShowSidebarMenu } from "@/lib/store/useShowSidebarMenu";

export default function Main() {

  const { open } = useShowSidebarMenu();

  return (
    <div className="grid grid-cols-5">

      {open && <div className="col-span-1">

      </div>}
      <div className={open ? "col-span-4" : "col-span-5"}>
        <Magazine />
        <Gallery />
      </div>
    </div>
  );
}
