"use client";

import Image from "next/image";
import { User, Heart } from "lucide-react";
import bpc from "@/public/assets/comunity/bpc.png";
import { Photographer } from "@/services/types/vehicle.type";

const userLogos = [{ id: 4, logo: bpc }];

interface ImageCardProps {
  image_url: string;
  title: string;
  company?: string;
  author: Photographer;
}

export function ImageCard({
  image_url,
  title,
  company,
  author,
}: ImageCardProps) {
  const userLogo = userLogos.find((logo) => logo.id === author.photographer_id);

  return (
    <div className="group relative w-full overflow-hidden rounded-xl bg-gray-900 shadow-md transition-all hover:shadow-xl aspect-[4/3] cursor-pointer">
      <Image
        src={image_url}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="absolute top-3 right-3 flex gap-2 opacity-0 transform translate-y-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-black transition-colors"
          onClick={(e) => e.preventDefault()}
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-4 flex items-center gap-3 opacity-0 transform translate-y-[10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white/20 bg-gray-800">
          {userLogo ? (
            <Image
              src={userLogo.logo}
              alt={author.name}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="text-white/70 h-5 w-5" />
          )}
        </div>
        <div className="flex flex-col truncate">
          <span className="font-semibold text-white text-sm truncate">
            {title}
          </span>
          <div className="flex items-center text-xs text-white/80 gap-1 truncate">
            {company && <span className="truncate">{company}</span>}
            {company && <span className="opacity-50">•</span>}
            <span className="truncate">{author.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
