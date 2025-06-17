"use client";

import { Magazine } from "./components/magazine/Magazine";
import { Gallery } from "./components/gallery/Gallery";
import { Header } from "@/components/header";
//import { AdHorizontal } from "@/components/adsense/AdHorizontal";

import "./main.css";

export default function Main() {
  return (
    <div className="main-container">
      <Header />
      {/* <AdHorizontal /> */}
      <Magazine />
      <Gallery />
    </div>
  );
}
