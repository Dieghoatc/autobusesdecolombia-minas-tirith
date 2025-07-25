"use client";

import { Magazine } from "./components/magazine/Magazine";
import { Gallery } from "./components/gallery/Gallery";
import { Hero } from "./components/hero";
import { useIsMobile } from '@/lib/hooks/useIsMobile';

export default function Main() {
  const isMobile = useIsMobile();

  return (
    <div>
      {!isMobile ? <Hero /> : " "}
      <Magazine />
      <Gallery />
    </div>
  );
}
