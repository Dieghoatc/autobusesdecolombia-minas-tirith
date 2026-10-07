"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";

const ZOOM_LEVELS = [1, 2, 4] as const;
type Zoom = (typeof ZOOM_LEVELS)[number];

interface ImageCompareProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel: string;
  afterLabel: string;
}

// Split view in the style of squoosh.app: the "before" image on the left of the
// divider and the "after" image on the right. Drag the handle (or use the arrow
// keys) to move the divider; zoom in and scroll to inspect fine detail.
export function ImageCompare({
  beforeSrc,
  afterSrc,
  beforeLabel,
  afterLabel,
}: ImageCompareProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [zoom, setZoom] = useState<Zoom>(1);
  const [aspectRatio, setAspectRatio] = useState(4 / 3);

  function moveTo(clientX: number) {
    const rect = surfaceRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, percent)));
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    moveTo(event.clientX);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      moveTo(event.clientX);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const step = event.shiftKey ? 10 : 2;
    const next: Record<string, number> = {
      ArrowLeft: position - step,
      ArrowRight: position + step,
      Home: 0,
      End: 100,
    };
    if (event.key in next) {
      event.preventDefault();
      setPosition(Math.min(100, Math.max(0, next[event.key])));
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-zinc-500">
          Arrastra la línea para comparar. Usa el zoom para ver el detalle.
        </p>
        <div
          role="group"
          aria-label="Zoom"
          className="flex shrink-0 rounded-lg border border-zinc-800/80 bg-zinc-950/60 p-0.5"
        >
          {ZOOM_LEVELS.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setZoom(level)}
              aria-pressed={zoom === level}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                zoom === level
                  ? "bg-amber-500 text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {level}×
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="max-h-[70vh] overflow-auto rounded-xl border border-zinc-800/60 bg-zinc-950/60">
          {/* At 1x the whole image fits (limited by the width and by 70vh of height);
              zoom multiplies that size and the container scrolls */}
          <div
            ref={surfaceRef}
            className="relative mx-auto select-none"
            style={{
              width: `calc(min(100%, 70vh * ${aspectRatio}) * ${zoom})`,
              aspectRatio,
            }}
          >
            <Image
              src={beforeSrc}
              alt={beforeLabel}
              fill
              unoptimized
              draggable={false}
              className="object-contain"
              onLoad={(event) => {
                const { naturalWidth, naturalHeight } = event.currentTarget;
                if (naturalWidth && naturalHeight) {
                  setAspectRatio(naturalWidth / naturalHeight);
                }
              }}
            />
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 0 0 ${position}%)` }}
            >
              <Image
                src={afterSrc}
                alt={afterLabel}
                fill
                unoptimized
                draggable={false}
                className="object-contain"
              />
            </div>

            {/* Divider: the whole line is draggable, so it works at any zoom/scroll */}
            <div
              role="slider"
              tabIndex={0}
              aria-label="Posición de la comparación"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(position)}
              aria-valuetext={`${Math.round(position)}% ${beforeLabel}`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onKeyDown={handleKeyDown}
              className="group absolute inset-y-0 z-10 flex w-10 -translate-x-1/2 cursor-ew-resize touch-none justify-center outline-none"
              style={{ left: `${position}%` }}
            >
              <div className="h-full w-0.5 bg-white/90 shadow-[0_0_6px_rgba(0,0,0,0.6)]" />
              <div className="absolute top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-zinc-950/80 text-white shadow-lg group-focus-visible:ring-2 group-focus-visible:ring-amber-500">
                <MoveHorizontal className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Labels stay in the corners while scrolling a zoomed image */}
        <span className="pointer-events-none absolute left-2 top-2 rounded-md bg-black/70 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute right-2 top-2 rounded-md bg-amber-500/90 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-black">
          {afterLabel}
        </span>
      </div>
    </div>
  );
}
