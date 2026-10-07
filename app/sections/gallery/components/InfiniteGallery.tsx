"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

import type { APIVehicleResponse, Vehicle } from "@/services/types/vehicle.type";

import { GalleryGrid } from "./GalleryGrid";
import {
  historyEntryKey,
  readSnapshot,
  writeSnapshot,
  type GallerySnapshot,
} from "./galleryHistory";

// Start loading the next page this far before the end of the list
const PRELOAD_MARGIN = "1500px 0px";

interface InfiniteGalleryProps {
  initial: APIVehicleResponse;
  limit: number;
  // Transport category id; omit for the whole gallery
  category?: number;
}

function mergeVehicles(current: Vehicle[], incoming: Vehicle[]): Vehicle[] {
  // New uploads shift pages while scrolling; skip vehicles already shown
  const seen = new Set(current.map((vehicle) => vehicle.vehicle_id));
  return [...current, ...incoming.filter((vehicle) => !seen.has(vehicle.vehicle_id))];
}

export function InfiniteGallery({ initial, limit, category }: InfiniteGalleryProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initial.data);
  const [nextPage, setNextPage] = useState(initial.info.currentPage + 1);
  const [hasNext, setHasNext] = useState(initial.info.hasNext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [restoreY, setRestoreY] = useState<number | null>(null);

  const keyRef = useRef<string | null>(null);
  const loadingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ vehicles, nextPage, hasNext });
  stateRef.current = { vehicles, nextPage, hasNext };
  // Last position seen while on this page. Reading window.scrollY at unmount
  // could already reflect the next page.
  const scrollYRef = useRef(0);
  // Nothing is saved until a pending restore has been applied; otherwise the
  // first render (server page 1, scroll 0) would overwrite the snapshot.
  const readyRef = useRef(false);

  const save = useCallback(() => {
    if (!keyRef.current || !readyRef.current) return;
    const snapshot: GallerySnapshot = { ...stateRef.current, scrollY: scrollYRef.current };
    writeSnapshot(keyRef.current, snapshot);
  }, []);

  // Coming back to this history entry: restore the loaded list and scroll
  useEffect(() => {
    const key = historyEntryKey();
    keyRef.current = key;
    readyRef.current = false;

    const snapshot = readSnapshot(key);
    if (snapshot && snapshot.vehicles.length > 0) {
      setVehicles(snapshot.vehicles);
      setNextPage(snapshot.nextPage);
      setHasNext(snapshot.hasNext);
      setRestoreY(snapshot.scrollY);
    } else {
      readyRef.current = true;
    }
  }, []);

  // Tiles have fixed aspect ratios, so the height is final once rendered
  useLayoutEffect(() => {
    if (restoreY === null) return;
    window.scrollTo({ top: restoreY, behavior: "instant" });
    scrollYRef.current = restoreY;
    readyRef.current = true;
    setRestoreY(null);
  }, [restoreY]);

  // Keep the snapshot current while scrolling and before leaving the page
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      scrollYRef.current = window.scrollY;
      clearTimeout(timer);
      timer = setTimeout(save, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", save);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", save);
      save(); // client-side navigation away (e.g. to the vehicle page)
    };
  }, [save]);

  useEffect(() => {
    save();
  }, [vehicles, nextPage, hasNext, save]);

  const loadMore = useCallback(async () => {
    const { nextPage: page, hasNext: more } = stateRef.current;
    if (loadingRef.current || !more) return;

    loadingRef.current = true;
    setIsLoading(true);
    setError(false);
    try {
      const query = new URLSearchParams({ page: String(page), limit: String(limit) });
      if (category !== undefined) query.set("category", String(category));
      const response = await fetch(`/api/gallery?${query}`);
      if (!response.ok) throw new Error(String(response.status));
      const body = (await response.json()) as APIVehicleResponse;

      setVehicles((current) => mergeVehicles(current, body.data ?? []));
      setNextPage(page + 1);
      setHasNext(Boolean(body.info?.hasNext));
    } catch {
      setError(true);
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  }, [limit, category]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasNext || error) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: PRELOAD_MARGIN }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
    // Re-observe after each page so a still-visible sentinel triggers again
  }, [hasNext, error, loadMore, vehicles.length]);

  return (
    <>
      <GalleryGrid vehicles={vehicles} />

      <div ref={sentinelRef} aria-hidden className="h-px" />

      <div className="flex justify-center py-10 text-sm text-zinc-400" aria-live="polite">
        {isLoading && (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Cargando más fotos...
          </span>
        )}
        {error && !isLoading && (
          <button
            type="button"
            onClick={loadMore}
            className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-white transition-colors hover:bg-white/[0.08]"
          >
            No se pudieron cargar más fotos. Reintentar
          </button>
        )}
        {!hasNext && !isLoading && <span>Has llegado al final de la galería</span>}
      </div>
    </>
  );
}
