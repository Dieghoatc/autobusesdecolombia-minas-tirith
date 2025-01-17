"use client";

import Gallery from "../gallery/Gallery";
import { Hero } from "../hero/Hero";
import "./main.css";

export default function Main() {
  return (
    <div className="main-container">
      <Hero />
      <Gallery />
    </div>
  );
}
