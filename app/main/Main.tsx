"use client";

import { Magazine } from "./components/magazine/Magazine";
import { Gallery } from "./components/gallery/Gallery";
//import { Header } from "@/components/header";
//import { Hero } from "./components/hero";
//import { AdHorizontal } from "@/components/adsense/AdHorizontal";
import Footer from "@/components/footer/Footer";

import "./main.css";
//import { useIsMobile } from '@/lib/hooks/useIsMobile';

export default function Main() {

  //const isMobile = useIsMobile();

  return (
    <div className="main-container">
       <Magazine />
       <Gallery /> 
      {/* <AdHorizontal /> */}
      <Footer />
    </div>
  );
}
