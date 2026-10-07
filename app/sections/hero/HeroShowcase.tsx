"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { CloudImage } from "@/app/components/cloud-image";
import { cn } from "@/lib/utils";

import { ColombiaBrush } from "./ColombiaBrush";
import { SCENE_DURATION_MS, type HeroSceneConfig } from "./heroScenes";

export interface HeroCard {
  id: number;
  imageUrl: string;
  label: string;
}

export interface HeroScene extends HeroSceneConfig {
  cards: HeroCard[];
}

interface HeroShowcaseProps {
  scenes: HeroScene[];
  totalPhotos: number;
}

// Fan layout for the cards, center first in importance
const FAN = [
  { rotate: -14, y: 64, z: 1 },
  { rotate: -7, y: 22, z: 2 },
  { rotate: 0, y: 0, z: 3 },
  { rotate: 7, y: 22, z: 2 },
  { rotate: 14, y: 64, z: 1 },
];

const numberFormat = new Intl.NumberFormat("es-CO");

export function HeroShowcase({ scenes, totalPhotos }: HeroShowcaseProps) {
  const [active, setActive] = useState(0);
  const scene = scenes[active];
  const next = () => setActive((current) => (current + 1) % scenes.length);

  return (
    <section
      aria-label="Presentación"
      // Leaves room under the hero for the donation banner and a peek of the logo strip
      className="group/hero relative -mx-4 flex h-[clamp(620px,calc(100dvh-9rem),820px)] flex-col overflow-clip md:-mx-6"
    >
      {/* Backgrounds: blurred photo of each scene, cross-faded */}
      {scenes.map((item, index) => (
        <div
          key={item.slug}
          aria-hidden
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === active ? "opacity-100" : "opacity-0",
          )}
        >
          {item.cards[0] && (
            <CloudImage
              src={item.cards[0].imageUrl}
              alt=""
              fill
              sizes="50vw"
              blur="1200"
              priority={index === 0}
              className="scale-110 object-cover"
            />
          )}
        </div>
      ))}
      <div aria-hidden className="absolute inset-0 bg-black/70" />
      <div
        aria-hidden
        className="absolute inset-0 transition-[background] duration-1000"
        style={{
          background: `radial-gradient(60% 55% at 50% 30%, ${scene.accent.glow}, transparent 70%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent"
      />

      {/* Copy */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-shrink-0 flex-col items-center px-4 pt-10 text-center md:pt-14 [@media(max-height:820px)]:md:pt-8">
        <Link
          href="/galeria"
          className="mb-6 inline-flex items-center gap-2 rounded-full [@media(max-height:820px)]:mb-4 border border-white/10 bg-white/[0.06] py-1 pl-1 pr-3 text-xs text-zinc-200 backdrop-blur-md transition-colors hover:bg-white/[0.1] md:text-sm"
        >
          <span className="rounded-full bg-amber-400 px-2 py-0.5 text-[11px] font-bold text-black">
            Nuevo
          </span>
          Galería con desplazamiento infinito
          <ArrowRight aria-hidden className="h-3.5 w-3.5" />
        </Link>

        <h1
          key={scene.slug}
          className="text-balance pb-[0.2em] text-4xl font-extrabold leading-[1.05] tracking-tight text-white animate-in fade-in slide-in-from-bottom-3 duration-700 sm:text-5xl md:text-6xl lg:text-7xl [@media(max-height:820px)]:lg:text-6xl"
        >
          <Headline text={scene.headline} highlight={scene.highlight} />
        </h1>

        <p className="mt-5 max-w-2xl text-base text-zinc-300 md:text-lg [@media(max-height:820px)]:mt-3">
          El mayor banco de imágenes de autobuses y transporte público del país:{" "}
          <span className="font-semibold text-white">
            más de {numberFormat.format(totalPhotos)} fotografías
          </span>{" "}
          compartidas por la comunidad.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row [@media(max-height:820px)]:mt-6">
          <Link
            href="/galeria"
            className="flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-base font-bold text-black shadow-xl shadow-black/40 transition-colors hover:bg-zinc-200"
          >
            Explorar la galería
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
          <Link
            href={`/transport-category/${scene.categoryId}`}
            className={cn(
              "flex h-12 items-center gap-2 rounded-xl border border-white/15 bg-black/30 px-5 text-sm font-semibold backdrop-blur-md transition-colors hover:bg-black/50",
              scene.accent.text,
            )}
          >
            {scene.cta}
            <ArrowUpRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Fanned photo cards */}
      {/* In the flow below the copy, so it can never cover the CTAs; the
          section's overflow-clip crops the bottom of the fan (clip, not hidden:
          a focused tab must not scroll the hero internally) */}
      <div className="relative z-10 mt-10 min-h-[200px] flex-1 [@media(max-height:820px)]:mt-6">
        <div
          key={scene.slug}
          className="absolute inset-x-0 top-0 flex justify-center"
        >
          {scene.cards.map((card, index) => {
            const fan = FAN[index] ?? FAN[2];
            return (
              <Link
                key={card.id}
                href={`/transport-category/${scene.categoryId}`}
                tabIndex={-1}
                aria-hidden
                className={cn(
                  "group/card relative -mx-5 w-32 flex-shrink-0 rounded-2xl bg-white p-1.5 pb-7 shadow-2xl shadow-black/60 transition-transform duration-500 animate-in fade-in zoom-in-90 fill-mode-both sm:w-40 md:-mx-4 md:w-48 lg:w-52",
                  // Phones show the 3 central cards
                  (index === 0 || index === 4) && "hidden sm:block",
                )}
                style={{
                  transform: `translateY(${fan.y}px) rotate(${fan.rotate}deg)`,
                  zIndex: fan.z,
                  animationDelay: `${index * 70}ms`,
                }}
              >
                <span className="relative block aspect-[4/5] overflow-hidden rounded-xl bg-zinc-200">
                  <CloudImage
                    src={card.imageUrl}
                    alt=""
                    fill
                    crop="fill"
                    aspectRatio="4:5"
                    gravity="auto"
                    sizes="(max-width: 640px) 220px, 360px"
                    priority={active === 0}
                    className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                  />
                </span>
                <span className="absolute inset-x-2 bottom-1.5 truncate text-center text-[11px] font-semibold text-zinc-700 md:text-xs">
                  {card.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Scene tabs with auto-advance timer (paused on hover, off with reduced motion) */}
      <div
        role="tablist"
        aria-label="Categorías destacadas"
        className="absolute inset-x-0 bottom-6 z-20 flex justify-center gap-2 px-4"
      >
        {scenes.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.slug}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(index)}
              className={cn(
                "relative h-11 w-32 overflow-hidden rounded-xl border text-xs font-semibold backdrop-blur-xl transition-colors sm:h-14 sm:w-44 sm:text-sm",
                selected
                  ? "border-white/40 bg-white/85 text-black"
                  : "border-white/10 bg-black/40 text-white/80 hover:bg-black/60",
              )}
            >
              {item.tab}
              {selected && (
                <span
                  key={`${item.slug}-${active}`}
                  aria-hidden
                  onAnimationEnd={next}
                  className={cn(
                    "absolute bottom-0 left-0 h-1 w-full origin-left animate-progress motion-reduce:hidden group-hover/hero:[animation-play-state:paused]",
                    item.accent.bar,
                  )}
                  style={{ animationDuration: `${SCENE_DURATION_MS}ms` }}
                />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Headline({ text, highlight }: { text: string; highlight?: string }) {
  const at = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || at === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <ColombiaBrush>{highlight}</ColombiaBrush>
      {text.slice(at + highlight.length)}
    </>
  );
}
