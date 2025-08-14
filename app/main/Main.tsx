"use client";

import { Gallery } from "./components/gallery/Gallery";
import { Magazine } from "./components/magazine";

export default function Main() {
  return (
    <div>
      <Magazine />
      <Gallery /> 
    </div>
  );
}
