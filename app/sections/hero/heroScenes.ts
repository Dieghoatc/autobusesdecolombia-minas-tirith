// Hero scenes: each tab shows real photos from one transport category.
// Accent classes are full literals so Tailwind can see them.

export interface HeroSceneConfig {
  categoryId: number;
  slug: string;
  tab: string;
  headline: string;
  // Word in the headline painted with the Colombian flag brush
  highlight?: string;
  cta: string;
  accent: {
    glow: string; // radial glow behind the headline
    text: string;
    bar: string; // tab progress bar
  };
}

export const HERO_SCENES: HeroSceneConfig[] = [
  {
    categoryId: 1,
    slug: "transporte-interdepartamental",
    tab: "Interdepartamental",
    headline: "Los buses que conectan a Colombia",
    highlight: "Colombia",
    cta: "Ver interdepartamentales",
    accent: { glow: "rgba(245, 158, 11, 0.28)", text: "text-amber-300", bar: "bg-amber-400" },
  },
  {
    categoryId: 9,
    slug: "transporte-urbano",
    tab: "Urbano",
    headline: "La ciudad en movimiento, foto a foto",
    cta: "Ver transporte urbano",
    accent: { glow: "rgba(34, 211, 238, 0.24)", text: "text-cyan-300", bar: "bg-cyan-400" },
  },
  {
    categoryId: 4,
    slug: "nuestros-recuerdos",
    tab: "Clásicos",
    headline: "La memoria del transporte colombiano",
    highlight: "colombiano",
    cta: "Ver clásicos",
    accent: { glow: "rgba(244, 114, 182, 0.22)", text: "text-pink-300", bar: "bg-pink-400" },
  },
];

// Time each scene stays before auto-advancing (also the progress bar duration)
export const SCENE_DURATION_MS = 7000;

export const CARDS_PER_SCENE = 5;
