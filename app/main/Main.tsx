"use client";

import { Magazine } from "./components/magazine/Magazine";
import { Gallery } from "./components/gallery/Gallery";
import { Hero } from "./components/hero";
import { useIsMobile } from '@/lib/hooks/useIsMobile';

import "./main.css";

export default function Main() {
  const isMobile = useIsMobile();

  return (
    <div className="main-container">
      {!isMobile ? <Hero /> : " "}
      <Magazine />
      <Gallery />
    </div>
  );
}
