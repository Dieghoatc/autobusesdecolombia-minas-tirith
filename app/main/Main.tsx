"use client";

import { Hero } from "./components/hero/Hero";
import { Magazine } from "./components/magazine/Magazine";
import { Gallery } from "./components/gallery/Gallery";
import "./main.css";

export default function Main() {
  return (
    <div className="main-container">
      <Hero />
      <Magazine />
      <Gallery />
    </div>
  );
}
