"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Loader2,
  MapPin,
} from "lucide-react";

import { CloudImage } from "@/app/components/cloud-image";
import { formatURL } from "@/lib/helpers/formatURL";
import { cn } from "@/lib/utils";
import type { Vehicle, VehiclePhoto } from "@/services/types/vehicle.type";

export interface ViewerTile {
  vehicle: Vehicle;
  photo: VehiclePhoto;
}

interface PhotoViewerProps {
  tiles: ViewerTile[];
  index: number;
  onNavigate: (index: number) => void;
}

const SWIPE_MIN_PX = 50;

export function vehicleDetailHref(vehicle: Vehicle): string {
  const parts = [
    vehicle.model.model_name,
    vehicle.company?.company_name,
    vehicle.companySerial?.company_serial_code,
  ].filter(Boolean) as string[];
  return `/vehiculo/${vehicle.vehicle_id}/${parts.map(formatURL).join("-")}`;
}

function formatPhotoDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

// Lightbox: photo stage + details panel, with prev/next (buttons, arrow keys, swipe).
// Rendered inside <Modal>, which owns closing (Esc, back button, close button).
export function PhotoViewer({ tiles, index, onNavigate }: PhotoViewerProps) {
  const { vehicle, photo } = tiles[index];
  const hasPrev = index > 0;
  const hasNext = index < tiles.length - 1;
  const [loadedId, setLoadedId] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && hasPrev) onNavigate(index - 1);
      if (event.key === "ArrowRight" && hasNext) onNavigate(index + 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, hasPrev, hasNext, onNavigate]);

  const brand = vehicle.model.brand?.name;
  const title = vehicle.model.model_name;
  const isLoading = loadedId !== photo.vehicle_photo_id;

  const specs = [
    { label: "Placa", value: vehicle.plate },
    { label: "Número interno", value: vehicle.companySerial?.company_serial_code },
    {
      label: "Chasis",
      value: vehicle.model.chassis
        ? `${vehicle.model.chassis.brand?.name ?? ""} ${vehicle.model.chassis.chassis_name}`.trim()
        : undefined,
    },
    {
      label: "Carrocería",
      value: vehicle.model.bodywork
        ? `${vehicle.model.bodywork.brand?.name ?? ""} ${vehicle.model.bodywork.bodywork_name}`.trim()
        : undefined,
    },
    { label: "Servicio", value: vehicle.companyService?.company_service_name },
  ].filter((spec): spec is { label: string; value: string } => Boolean(spec.value));

  return (
    <div className="flex h-[100dvh] w-full flex-col bg-black lg:grid lg:grid-cols-[minmax(0,1fr)_400px] animate-in fade-in duration-200">
      {/* Stage */}
      <div
        className="relative h-[56dvh] flex-shrink-0 select-none bg-black lg:h-full"
        onContextMenu={(event) => event.preventDefault()}
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          if (touchStartX.current === null) return;
          const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
          touchStartX.current = null;
          if (delta > SWIPE_MIN_PX && hasPrev) onNavigate(index - 1);
          if (delta < -SWIPE_MIN_PX && hasNext) onNavigate(index + 1);
        }}
      >
        <div className="absolute inset-0 lg:inset-6">
          <CloudImage
            key={photo.vehicle_photo_id}
            src={photo.image_url}
            alt={`${brand ?? ""} ${title}`.trim()}
            fill
            sizes="(max-width: 1023px) 100vw, calc(100vw - 400px)"
            loading="eager"
            fetchPriority="high"
            onLoad={() => setLoadedId(photo.vehicle_photo_id)}
            className={cn(
              "pointer-events-none object-contain transition-opacity duration-300",
              isLoading ? "opacity-0" : "opacity-100"
            )}
          />
        </div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 aria-label="Cargando fotografía" className="h-7 w-7 animate-spin text-zinc-500" />
          </div>
        )}

        <NavButton direction="prev" disabled={!hasPrev} onClick={() => onNavigate(index - 1)} />
        <NavButton direction="next" disabled={!hasNext} onClick={() => onNavigate(index + 1)} />

        <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium tabular-nums text-white/80 backdrop-blur-md">
          {index + 1} / {tiles.length}
        </span>
      </div>

      {/* Details */}
      <aside className="flex min-h-0 flex-1 flex-col border-t border-white/[0.06] bg-zinc-950 lg:border-l lg:border-t-0">
        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-6 lg:pt-20">
          <div className="flex flex-wrap items-center gap-2">
            {vehicle.transportCategory?.name && (
              <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-amber-300">
                {vehicle.transportCategory.name}
              </span>
            )}
            {brand && (
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                {brand}
              </span>
            )}
          </div>

          <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-white">
            {title}
          </h2>
          {vehicle.company?.company_name && (
            <p className="mt-1 text-sm text-zinc-400">{vehicle.company.company_name}</p>
          )}

          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3">
            <span
              aria-hidden
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-sm font-bold text-black"
            >
              {initials(photo.photographer?.name || "?")}
            </span>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wider text-zinc-500">Fotografía de</p>
              <p className="truncate text-sm font-semibold text-white">
                {photo.photographer?.name || "Desconocido"}
              </p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 px-1 text-xs text-zinc-400">
            {photo.location && (
              <span className="flex items-center gap-1.5">
                <MapPin aria-hidden className="h-3.5 w-3.5 text-zinc-500" />
                {photo.location}
              </span>
            )}
            {photo.created_at && (
              <span className="flex items-center gap-1.5">
                <Calendar aria-hidden className="h-3.5 w-3.5 text-zinc-500" />
                {formatPhotoDate(photo.created_at)}
              </span>
            )}
          </div>

          {specs.length > 0 && (
            <section className="mt-8">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                Ficha técnica
              </h3>
              <dl className="mt-2 divide-y divide-white/[0.06]">
                {specs.map(({ label, value }) => (
                  <div key={label} className="flex items-baseline justify-between gap-4 py-2.5 text-sm">
                    <dt className="text-zinc-400">{label}</dt>
                    <dd className="text-right font-medium text-white">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>

        <div className="border-t border-white/[0.06] p-4">
          {/* replace: swaps the modal's history entry, so one "back"
              returns to the gallery at the same scroll position */}
          <Link
            href={vehicleDetailHref(vehicle)}
            replace
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-bold text-black transition-colors hover:bg-zinc-200"
          >
            Ver ficha completa
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
          <p className="mt-3 hidden text-center text-[11px] text-zinc-600 lg:block">
            ← → para navegar · Esc para cerrar
          </p>
        </div>
      </aside>
    </div>
  );
}

interface NavButtonProps {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}

function NavButton({ direction, disabled, onClick }: NavButtonProps) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Foto anterior" : "Foto siguiente"}
      className={cn(
        "absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-md transition hover:bg-black/80 disabled:pointer-events-none disabled:opacity-0",
        direction === "prev" ? "left-3 lg:left-5" : "right-3 lg:right-5"
      )}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
