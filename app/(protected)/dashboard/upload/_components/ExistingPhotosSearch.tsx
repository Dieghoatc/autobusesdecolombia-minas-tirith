"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/app/components/ui/input";
import { fieldInput, secondaryButton } from "@/lib/constants/formStyles";
import type { DashboardVehicle } from "@/services/types/dashboard.type";

import { ImagePreviewDialog } from "../../_components/ImagePreviewDialog";
import { StatusMessage, type Status } from "../../_components/StatusMessage";
import { searchVehicles, type VehicleSearchType } from "../_lib/api";

const SEARCH_TYPES: { type: VehicleSearchType; label: string; placeholder: string }[] = [
  { type: "plate", label: "Placa", placeholder: "Buscar por placa" },
  { type: "serial", label: "Serial", placeholder: "Buscar por serial" },
];

// Lets the admin check which photos a vehicle already has before uploading.
export function ExistingPhotosSearch() {
  const [searchType, setSearchType] = useState<VehicleSearchType>("plate");
  const [value, setValue] = useState("");
  const [results, setResults] = useState<DashboardVehicle[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  async function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    if (!value.trim()) {
      setStatus({ type: "error", message: "Ingresa un valor para buscar" });
      return;
    }
    setIsLoading(true);
    setStatus(null);
    try {
      const { data } = await searchVehicles(searchType, value.trim());
      setResults(data);
      if (data.length === 0) {
        setStatus({ type: "info", message: "No se encontraron vehículos" });
      }
    } catch (error) {
      setResults(null);
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Error al buscar",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const placeholder = SEARCH_TYPES.find((s) => s.type === searchType)?.placeholder;

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="space-y-3">
        <div role="radiogroup" aria-label="Buscar por" className="flex gap-1 p-1 rounded-xl bg-zinc-950/60 border border-zinc-800/80 w-fit">
          {SEARCH_TYPES.map(({ type, label }) => (
            <button
              key={type}
              type="button"
              role="radio"
              aria-checked={searchType === type}
              onClick={() => setSearchType(type)}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-lg transition-colors",
                searchType === type ? "bg-amber-500 text-black" : "text-zinc-400 hover:text-white"
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
            className={fieldInput}
          />
          <button
            type="submit"
            disabled={isLoading}
            aria-label="Buscar"
            className={`px-3 ${secondaryButton}`}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          </button>
        </div>
      </form>

      <StatusMessage status={status} />

      {results?.map((vehicle) => (
        <article key={vehicle.vehicle_id} className="space-y-2">
          <h3 className="text-sm text-zinc-200">
            <span className="font-semibold">{vehicle.plate || "Sin placa"}</span>
            <span className="text-zinc-500"> · {vehicle.model?.model_name}</span>
          </h3>
          {vehicle.vehiclePhotos.length === 0 ? (
            <p className="text-xs text-zinc-500">Sin fotografías</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {vehicle.vehiclePhotos.map((photo) => (
                <button
                  key={photo.vehicle_photo_id}
                  type="button"
                  onClick={() => setPreviewSrc(photo.image_url)}
                  className="relative aspect-square rounded-lg overflow-hidden border border-zinc-800/60"
                >
                  <Image
                    src={photo.image_url}
                    alt={`${vehicle.plate} - ${photo.location}`}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </article>
      ))}

      <ImagePreviewDialog
        src={previewSrc}
        alt="Fotografía publicada"
        onClose={() => setPreviewSrc(null)}
      />
    </div>
  );
}
