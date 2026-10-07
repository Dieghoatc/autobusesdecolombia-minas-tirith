"use client";

import { useMemo, useState } from "react";

import { cities, formatCityLocation } from "@/lib/constants/cities";
import { glassCard } from "@/lib/constants/formStyles";
import type { UploadCatalogs } from "@/services/types/dashboard.type";

import { ExistingPhotosSearch } from "./ExistingPhotosSearch";
import { MarkPhotoStep } from "./MarkPhotoStep";
import { VehicleDetailsStep } from "./VehicleDetailsStep";

const CITY_OPTIONS = cities.map((city, index) => ({
  id: String(index),
  label: `${city.city} - ${city.department}`,
}));

interface UploadWorkspaceProps {
  catalogs: UploadCatalogs;
}

// Two-step flow: 1) watermark the photo, 2) link it to a vehicle and publish.
export function UploadWorkspace({ catalogs }: UploadWorkspaceProps) {
  const [photographerId, setPhotographerId] = useState<string | null>(null);
  const [cityId, setCityId] = useState<string | null>(null);
  const [markedPhoto, setMarkedPhoto] = useState<Blob | null>(null);
  // Bumped after a successful upload to reset step 1 for the next photo.
  const [uploadCount, setUploadCount] = useState(0);

  const photographerOptions = useMemo(
    () =>
      catalogs.photographers
        .filter((photographer) => photographer.active !== false)
        .map((photographer) => ({
          id: String(photographer.photographer_id),
          label: photographer.name,
        })),
    [catalogs.photographers]
  );

  const photographerName =
    photographerOptions.find((option) => option.id === photographerId)?.label ?? null;
  const location = cityId !== null ? formatCityLocation(cities[Number(cityId)]) : null;

  function handleUploaded() {
    setMarkedPhoto(null);
    setUploadCount((count) => count + 1);
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
      <div className="xl:col-span-2 space-y-6">
        <Step number={1} title="Marcar fotografía">
          <MarkPhotoStep
            key={uploadCount}
            photographerOptions={photographerOptions}
            cityOptions={CITY_OPTIONS}
            photographerId={photographerId}
            onPhotographerChange={setPhotographerId}
            cityId={cityId}
            onCityChange={setCityId}
            photographerName={photographerName}
            location={location}
            markedPhoto={markedPhoto}
            onMarked={setMarkedPhoto}
          />
        </Step>
        <Step number={2} title="Datos del vehículo">
          <VehicleDetailsStep
            catalogs={catalogs}
            markedPhoto={markedPhoto}
            photographerId={photographerId}
            location={location}
            onUploaded={handleUploaded}
          />
        </Step>
      </div>

      <aside className="xl:sticky xl:top-4">
        <Step title="Buscar fotos existentes">
          <ExistingPhotosSearch />
        </Step>
      </aside>
    </div>
  );
}

interface StepProps {
  number?: number;
  title: string;
  children: React.ReactNode;
}

function Step({ number, title, children }: StepProps) {
  return (
    <section className={`p-5 md:p-6 ${glassCard}`}>
      <h2 className="flex items-center gap-3 text-sm font-bold text-white mb-5 uppercase tracking-wider border-b border-zinc-800/60 pb-3">
        {number !== undefined && (
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-black text-xs">
            {number}
          </span>
        )}
        {title}
      </h2>
      {children}
    </section>
  );
}
