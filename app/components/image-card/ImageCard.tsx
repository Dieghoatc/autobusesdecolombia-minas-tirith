"use client";

import { Maximize2 } from "lucide-react";

import { CloudImage } from "@/app/components/cloud-image";
import { Photographer } from "@/services/types/vehicle.type";

interface ImageCardProps {
  image_url: string;
  title: string;
  company?: string;
  author: Photographer;
  // Tile shape, e.g. "4:5". Cloudinary crops the photo to it.
  aspectRatio?: string;
  // Rendered width of the tile in the parent layout, for the srcset choice
  sizes?: string;
  onOpen?: () => void;
}

export function ImageCard({
  image_url,
  title,
  company,
  author,
  aspectRatio = "4:3",
  sizes = "(max-width: 767px) 100vw, 30vw",
  onOpen,
}: ImageCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Ver ${title}${company ? ` de ${company}` : ""}`}
      className="group relative block w-full overflow-hidden rounded-xl bg-zinc-900 text-left outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
      style={{ aspectRatio: aspectRatio.replace(":", " / ") }}
    >
      <CloudImage
        src={image_url}
        alt={title}
        fill
        crop="fill"
        aspectRatio={aspectRatio}
        gravity="auto"
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />

      {/* Dim + reveal details on hover / keyboard focus */}
      <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/45 group-focus-visible:bg-black/45" />

      {company && (
        <span className="absolute left-3 top-3 max-w-[calc(100%-4rem)] truncate rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          {company}
        </span>
      )}
      <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <Maximize2 aria-hidden className="h-3.5 w-3.5" />
      </span>

      <span className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 scale-95 flex-col items-center gap-3 text-center opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
        <span className="line-clamp-2 text-lg md:text-xl font-extrabold uppercase leading-tight tracking-tight text-white drop-shadow-lg">
          {title}
        </span>
        <span className="flex items-center gap-1.5 rounded-lg border border-amber-400/30 bg-amber-500/15 px-3 py-1.5 text-xs font-semibold text-amber-300 backdrop-blur-md">
          <Maximize2 aria-hidden className="h-3.5 w-3.5" />
          Ver fotografía
        </span>
      </span>

      <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/70 to-transparent p-3 pt-8 text-xs text-white/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        {author.name}
      </span>
    </button>
  );
}
