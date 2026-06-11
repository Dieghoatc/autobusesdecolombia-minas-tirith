import Image from "next/image";
import { HeroSearch } from "./HeroSearch";

import logo from "@/assets/abc_primary_logo.svg";

export function Hero() {
  return (
    <section className="relative w-full py-12 px-4 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0d1117] to-transparent pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center space-y-5">
        {/* Logo */}
        <div className="relative w-28 h-28 mx-auto mb-2">
          <Image
            src={logo}
            alt="Autobuses de Colombia"
            fill
            className="object-contain drop-shadow-[0_0_20px_rgba(0,191,255,0.15)]"
            priority
          />
        </div>

        {/* Headline */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          Autobuses de Colombia
        </h1>

        {/* Tagline */}
        <p className="text-base md:text-lg text-[#b0b0ba] max-w-xl mx-auto leading-relaxed">
          El mayor banco de imágenes de autobuses y transporte público en
          Colombia
        </p>

        {/* Search bar */}
        <div className="mt-6">
          <HeroSearch />
        </div>

        {/* Stats chips */}
        <div className="flex items-center justify-center gap-3 flex-wrap mt-4">
          <span className="inline-flex items-center gap-1.5 text-xs text-[#88889a] bg-white/[0.04] border border-white/[0.06] rounded-full px-3 py-1.5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Comunidad activa
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-[#88889a] bg-white/[0.04] border border-white/[0.06] rounded-full px-3 py-1.5 backdrop-blur-sm">
            📸 Fotografías de alta calidad
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-[#88889a] bg-white/[0.04] border border-white/[0.06] rounded-full px-3 py-1.5 backdrop-blur-sm">
            🚌 Transporte colombiano
          </span>
        </div>
      </div>
    </section>
  );
}