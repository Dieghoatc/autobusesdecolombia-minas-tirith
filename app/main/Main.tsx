"use client";

import { Magazine } from "./components/magazine/Magazine";
import { Gallery } from "./components/gallery/Gallery";
import { Header } from "@/components/header";
import { Hero } from "./components/hero";
//import { AdHorizontal } from "@/components/adsense/AdHorizontal";
import Footer from "@/components/footer/Footer";

import "./main.css";

export default function Main() {
  return (
    <div className="main-container">
      <Header />
      <Hero />
      <section>
        <Magazine />
      </section>

      <section>
        <Gallery />
      </section>
      <section>
        <Footer />
      </section>
      {/* <AdHorizontal /> */}
      {/*   <Gallery /> */}
      {/*  <Magazine /> */}
    </div>
  );
}
