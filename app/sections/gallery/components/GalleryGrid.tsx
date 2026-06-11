"use client";

import { useState } from "react";
import Link from "next/link";
import { ImageCard } from "@/app/components/image-card";
import { Modal } from "@/app/components/modal";
import { formatURL } from "@/lib/helpers/formatURL";
import { Vehicle, VehiclePhoto } from "@/services/types/vehicle.type";
import {
  Building2,
  User,
  MapPin,
  Tag,
  Landmark,
  Calendar,
  ArrowRight,
} from "lucide-react";

interface GalleryGridProps {
  vehicles: Vehicle[];
}

export function GalleryGrid({ vehicles }: GalleryGridProps) {
  const [selected, setSelected] = useState<{
    vehicle: Vehicle;
    photo: VehiclePhoto;
  } | null>(null);

  const openPreview = (vehicle: Vehicle, photo: VehiclePhoto) => {
    setSelected({ vehicle, photo });
  };

  const closeModal = () => {
    setSelected(null);
  };

  const getDetailLink = (vehicle: Vehicle) => {
    return `/vehiculo/${vehicle.vehicle_id}/${formatURL(
      vehicle.model.model_name,
    )}${
      vehicle.company?.company_name
        ? "-" + formatURL(vehicle.company?.company_name)
        : ""
    }${
      vehicle.companySerial?.company_serial_code
        ? "-" + formatURL(vehicle.companySerial?.company_serial_code)
        : ""
    }`;
  };

  return (
    <>
      <article
        key={vehicles[0]?.vehicle_id || "empty"}
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in duration-500"
      >
        {vehicles.map((vehicle) =>
          vehicle.vehiclePhotos.map((photo) => (
            <div
              key={photo.vehicle_photo_id}
              onClick={() => openPreview(vehicle, photo)}
              className="focus:outline-none"
            >
              <ImageCard
                image_url={photo.image_url}
                title={vehicle.model.model_name}
                company={vehicle.company?.company_name ?? ""}
                author={photo.photographer}
              />
            </div>
          )),
        )}
      </article>

      <Modal isOpen={!!selected} onClose={closeModal}>
        {selected && (
          <div className="w-full min-h-screen bg-zinc-950/98 flex flex-col shadow-2xl animate-in fade-in duration-200">
            <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col">
              <div
                className="relative w-full h-[85vh] bg-black flex items-center justify-center p-4 border-b border-zinc-900 select-none"
                onContextMenu={(e) => e.preventDefault()}
              >
                <img
                  src={selected.photo.image_url}
                  alt={`${selected.vehicle.model.brand?.name || ""} ${selected.vehicle.model.model_name}`.trim()}
                  className="max-w-full max-h-full object-contain shadow-2xl pointer-events-none"
                />
                <div className="absolute inset-0 z-10 bg-transparent cursor-default" />
              </div>

              <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8 space-y-8 flex-1 flex flex-col justify-between">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800/60 pb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                      {selected.vehicle.model.brand?.name && (
                        <span className="text-zinc-400">
                          {selected.vehicle.model.brand.name}
                        </span>
                      )}
                      <span>{selected.vehicle.model.model_name}</span>
                    </h3>
                    <p className="text-zinc-400 font-medium text-sm flex items-center gap-2 mt-1">
                      <Building2 className="w-4 h-4 text-zinc-500" />
                      <span className="text-white">
                        {selected.vehicle.company?.company_name ||
                          "Empresa No Especificada"}
                      </span>
                      {selected.vehicle.companyService
                        ?.company_service_name && (
                        <>
                          <span className="text-zinc-700">•</span>
                          <span className="text-zinc-400">
                            {
                              selected.vehicle.companyService
                                .company_service_name
                            }
                          </span>
                        </>
                      )}
                    </p>
                  </div>

                  <div className="flex flex-col md:items-end text-left md:text-right">
                    <div className="flex items-center gap-2 md:justify-end text-zinc-400">
                      <User className="w-4 h-4 text-zinc-500" />
                      <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">
                        Fotógrafo
                      </span>
                    </div>
                    <span className="text-white font-semibold text-sm mt-0.5">
                      {selected.photo.photographer?.name || "Desconocido"}
                    </span>
                    {selected.photo.location && (
                      <span className="text-zinc-400 text-xs mt-1 flex items-center gap-1 md:justify-end">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{selected.photo.location}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mt-4">
                  {selected.vehicle.plate && (
                    <div className="flex flex-col gap-1.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Tag className="w-3 h-3 text-zinc-500" />
                        Placa / Patente
                      </span>
                      <span className="text-white font-semibold">
                        {selected.vehicle.plate}
                      </span>
                    </div>
                  )}

                  {selected.vehicle.companySerial?.company_serial_code && (
                    <div className="flex flex-col gap-1.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Tag className="w-3 h-3 text-zinc-500" />
                        Número Interno
                      </span>
                      <span className="text-white font-semibold">
                        {selected.vehicle.companySerial.company_serial_code}
                      </span>
                    </div>
                  )}

                  {selected.vehicle.model?.chassis?.chassis_name && (
                    <div className="flex flex-col gap-1.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Landmark className="w-3 h-3 text-zinc-500" />
                        Chasis
                      </span>
                      <span className="text-white font-semibold">
                        {selected.vehicle.model.chassis.brand?.name || ""}{" "}
                        {selected.vehicle.model.chassis.chassis_name}
                      </span>
                    </div>
                  )}

                  {selected.vehicle.model?.bodywork?.bodywork_name && (
                    <div className="flex flex-col gap-1.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Landmark className="w-3 h-3 text-zinc-500" />
                        Carrocería
                      </span>
                      <span className="text-white font-semibold">
                        {selected.vehicle.model.bodywork.brand?.name || ""}{" "}
                        {selected.vehicle.model.bodywork.bodywork_name}
                      </span>
                    </div>
                  )}

                  {selected.photo.created_at && (
                    <div className="flex flex-col gap-1.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-zinc-500" />
                        Fecha de Foto
                      </span>
                      <span className="text-white font-semibold">
                        {new Date(selected.photo.created_at).toLocaleDateString(
                          "es-ES",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-8 border-t border-zinc-900 flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6">
                  <button
                    onClick={closeModal}
                    className="flex items-center justify-center text-sm font-semibold text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-850 px-5 py-3 rounded-xl transition-all duration-200"
                  >
                    Cerrar Vista
                  </button>
                  <Link
                    href={getDetailLink(selected.vehicle)}
                    className="flex items-center justify-center gap-2 text-sm font-bold text-black bg-white hover:bg-zinc-200 px-6 py-3 rounded-xl transition-all duration-200 shadow-md shadow-black/25"
                  >
                    <span>Ver página completa de detalles</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
