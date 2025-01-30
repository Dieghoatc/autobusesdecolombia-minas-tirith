"use client";

import Gallery from "../gallery/Gallery";
import { Hero } from "../hero/Hero";
import { Magazine } from "../magazine/Magazine";
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
