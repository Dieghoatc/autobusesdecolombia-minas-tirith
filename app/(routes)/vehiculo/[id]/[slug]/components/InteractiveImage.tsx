"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

interface InteractiveImageProps {
  src: string;
  alt: string;
}

export function InteractiveImage({ src, alt }: InteractiveImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close full screen on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Prevent body scrolling when open
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Normal Viewport Image Container */}
      <div 
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center select-none group cursor-zoom-in"
        onContextMenu={(e) => e.preventDefault()}
      >
        <Image 
          src={src} 
          alt={alt} 
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain pointer-events-none select-none transition-transform duration-300 group-hover:scale-[1.02]"
        />
        
        {/* Floating Zoom Indicator on Hover */}
        <div className="absolute top-4 right-4 z-20 p-2 bg-black/60 border border-white/10 backdrop-blur-md rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <ZoomIn className="w-4 h-4" />
        </div>

        {/* Absolute transparent overlay catching left click to open and blocking right-clicks */}
        <div 
          onClick={() => setIsOpen(true)}
          className="absolute inset-0 z-10 bg-transparent" 
        />
      </div>

      {/* Full-Screen Zoom Lightbox Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center p-4 backdrop-blur-md cursor-zoom-out select-none animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Close button */}
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-[110] p-3 bg-zinc-900/60 border border-zinc-800/80 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-200 cursor-pointer"
            title="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Full Screen Image Viewport Wrapper */}
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center">
            <img 
              src={src} 
              alt={alt} 
              className="max-w-full max-h-full object-contain pointer-events-none select-none shadow-2xl rounded-lg border border-zinc-900" 
            />
            {/* Absolute overlay protecting the full-screen image */}
            <div className="absolute inset-0 z-[105] bg-transparent" />
          </div>
        </div>
      )}
    </>
  );
}
