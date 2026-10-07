"use client";

import { useCallback, useMemo, useState } from "react";

import { ImageCard } from "@/app/components/image-card";
import { Modal } from "@/app/components/modal";
import { Vehicle } from "@/services/types/vehicle.type";

import { MASONRY_COLUMNS, TILE_SIZES, tileRatio } from "./masonry";
import { PhotoViewer } from "./PhotoViewer";

interface GalleryGridProps {
  vehicles: Vehicle[];
}

export function GalleryGrid({ vehicles }: GalleryGridProps) {
  const tiles = useMemo(
    () => vehicles.flatMap((vehicle) => vehicle.vehiclePhotos.map((photo) => ({ vehicle, photo }))),
    [vehicles]
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const closeViewer = useCallback(() => setSelectedIndex(null), []);

  return (
    <>
      <article
        key={vehicles[0]?.vehicle_id || "empty"}
        className={`w-full ${MASONRY_COLUMNS} animate-in fade-in duration-500`}
      >
        {tiles.map(({ vehicle, photo }, index) => (
          <div key={photo.vehicle_photo_id} className="mb-2 break-inside-avoid">
            <ImageCard
              image_url={photo.image_url}
              title={vehicle.model.model_name}
              company={vehicle.company?.company_name ?? ""}
              author={photo.photographer}
              aspectRatio={tileRatio(index)}
              sizes={TILE_SIZES}
              onOpen={() => setSelectedIndex(index)}
            />
          </div>
        ))}
      </article>

      <Modal isOpen={selectedIndex !== null} onClose={closeViewer}>
        {selectedIndex !== null && tiles[selectedIndex] && (
          <PhotoViewer tiles={tiles} index={selectedIndex} onNavigate={setSelectedIndex} />
        )}
      </Modal>
    </>
  );
}
