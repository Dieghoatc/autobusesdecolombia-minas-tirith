// Masonry layout shared by the gallery grid and its loading skeleton.

// CSS columns: tiles flow top-to-bottom in each column.
export const MASONRY_COLUMNS = "columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2";

// The API has no image dimensions, so tiles follow a fixed rhythm of aspect
// ratios (no layout shift while loading). Cloudinary crops each photo to its
// tile with g_auto, keeping the vehicle in frame. A cycle of 7 against 2–5
// columns keeps neighbouring tiles from lining up.
const TILE_RATIOS = ["4:5", "4:3", "1:1", "3:2", "5:6", "4:3", "3:4"] as const;

export type TileRatio = (typeof TILE_RATIOS)[number];

export function tileRatio(index: number): TileRatio {
  return TILE_RATIOS[index % TILE_RATIOS.length];
}

// Requested ~1.5x the tile width so 1x screens get a sharp image too.
export const TILE_SIZES =
  "(max-width: 767px) 75vw, (max-width: 1023px) 50vw, (max-width: 1279px) 38vw, 30vw";
