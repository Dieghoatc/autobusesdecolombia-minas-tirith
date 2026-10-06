"use client";

import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/app/components/ui/dialog";

interface ImagePreviewDialogProps {
  src: string | null;
  alt: string;
  onClose: () => void;
}

export function ImagePreviewDialog({ src, alt, onClose }: ImagePreviewDialogProps) {
  return (
    <Dialog open={!!src} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl p-2 bg-zinc-950 border-zinc-800 text-white">
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        {src && (
          <div className="relative w-full aspect-[4/3]">
            <Image src={src} alt={alt} fill unoptimized className="object-contain" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
