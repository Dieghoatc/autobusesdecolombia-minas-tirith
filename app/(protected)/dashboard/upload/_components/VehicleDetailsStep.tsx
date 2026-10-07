"use client";

import { useMemo, useState } from "react";
import { Loader2, Search, UploadCloud, X } from "lucide-react";

import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  fieldInput,
  fieldLabel,
  primaryButton,
  secondaryButton,
} from "@/lib/constants/formStyles";
import type {
  DashboardVehicle,
  UploadCatalogs,
} from "@/services/types/dashboard.type";

import { ComboBox, type ComboBoxOption } from "../../_components/ComboBox";
import { StatusMessage, type Status } from "../../_components/StatusMessage";
import { searchVehicles, uploadVehiclePhoto } from "../_lib/api";

type CatalogField =
  | "vehicle_type_id"
  | "model_id"
  | "transport_category_id"
  | "company_id"
  | "company_service_id";

type NewVehicle = Record<CatalogField, string | null>;

const EMPTY_VEHICLE: NewVehicle = {
  vehicle_type_id: null,
  model_id: null,
  transport_category_id: null,
  company_id: null,
  company_service_id: null,
};

const REQUIRED_FIELDS: CatalogField[] = [
  "vehicle_type_id",
  "model_id",
  "transport_category_id",
  "company_id",
];

interface VehicleDetailsStepProps {
  catalogs: UploadCatalogs;
  markedPhoto: Blob | null;
  photographerId: string | null;
  location: string | null;
  onUploaded: () => void;
}

export function VehicleDetailsStep({
  catalogs,
  markedPhoto,
  photographerId,
  location,
  onUploaded,
}: VehicleDetailsStepProps) {
  const [plate, setPlate] = useState("");
  const [serial, setSerial] = useState("");
  const [vehicle, setVehicle] = useState<DashboardVehicle | null>(null);
  const [newVehicle, setNewVehicle] = useState<NewVehicle>(EMPTY_VEHICLE);
  const [isSearching, setIsSearching] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);

  const options = useMemo(
    () => ({
      vehicle_type_id: catalogs.vehicleTypes.map((item) => ({
        id: String(item.vehicle_type_id),
        label: item.name,
      })),
      model_id: catalogs.vehicleModels.map((item) => ({
        id: String(item.model_id),
        label: item.model_name,
      })),
      transport_category_id: catalogs.transportCategories.map((item) => ({
        id: String(item.transport_category_id),
        label: item.name,
      })),
      company_id: catalogs.companies.map((item) => ({
        id: String(item.company_id),
        label: item.company_name,
      })),
      company_service_id: catalogs.companyServices
        .filter(
          (item) =>
            !newVehicle.company_id ||
            String(item.company_id) === newVehicle.company_id
        )
        .map((item) => ({
          id: String(item.company_service_id),
          label: item.company_service_name,
        })),
    }),
    [catalogs, newVehicle.company_id]
  );

  const vehicleSummary = useMemo(() => {
    if (!vehicle) return [];
    const name = <T,>(list: T[], match: (item: T) => boolean, key: keyof T) => {
      const found = list.find(match);
      return found ? String(found[key]) : "—";
    };
    return [
      {
        label: "Tipo de vehículo",
        value: name(catalogs.vehicleTypes, (t) => t.vehicle_type_id === vehicle.vehicle_type_id, "name"),
      },
      { label: "Modelo", value: vehicle.model?.model_name ?? "—" },
      {
        label: "Categoría",
        value: name(
          catalogs.transportCategories,
          (c) => c.transport_category_id === vehicle.transport_category_id,
          "name"
        ),
      },
      {
        label: "Empresa",
        value: name(catalogs.companies, (c) => c.company_id === vehicle.company_id, "company_name"),
      },
      { label: "Fotos publicadas", value: String(vehicle.vehiclePhotos?.length ?? 0) },
    ];
  }, [vehicle, catalogs]);

  function setField(field: CatalogField, value: string | null) {
    setNewVehicle((current) => ({
      ...current,
      [field]: value,
      // A service belongs to a company: clear it when the company changes.
      ...(field === "company_id" ? { company_service_id: null } : {}),
    }));
  }

  async function handleSearch() {
    if (!plate.trim()) {
      setStatus({ type: "error", message: "Ingresa una placa para buscar" });
      return;
    }
    setIsSearching(true);
    setStatus(null);
    try {
      const { data } = await searchVehicles("plate", plate.trim());
      setVehicle(data[0] ?? null);
      if (!data[0]) {
        setStatus({
          type: "info",
          message: "Vehículo no registrado. Completa sus datos para crearlo.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Error al buscar el vehículo",
      });
    } finally {
      setIsSearching(false);
    }
  }

  function clearVehicle() {
    setVehicle(null);
    setStatus(null);
  }

  const isNewVehicleComplete = REQUIRED_FIELDS.every((field) => newVehicle[field]);
  const canUpload =
    !!markedPhoto &&
    !!photographerId &&
    !!location &&
    (!!vehicle || isNewVehicleComplete) &&
    !isUploading;

  async function handleUpload(event: React.FormEvent) {
    event.preventDefault();
    if (!canUpload || !markedPhoto || !photographerId || !location) return;

    setIsUploading(true);
    setStatus({ type: "info", message: "Subiendo imagen..." });
    try {
      const formData = new FormData();
      // The watermark service returns AVIF; normalise the type for the API.
      formData.append("photo", new Blob([markedPhoto], { type: "image/avif" }), "image.avif");
      formData.append("photographer_id", photographerId);
      formData.append("location", location);

      if (vehicle) {
        formData.append("vehicle_id", String(vehicle.vehicle_id));
      } else {
        formData.append("plate", plate.trim());
        formData.append("company_serial", serial.trim());
        for (const [field, value] of Object.entries(newVehicle)) {
          if (value) formData.append(field, value);
        }
      }

      await uploadVehiclePhoto(formData);
      setStatus({ type: "success", message: "Imagen subida exitosamente" });
      setPlate("");
      setSerial("");
      setVehicle(null);
      setNewVehicle(EMPTY_VEHICLE);
      onUploaded();
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Error al subir la foto",
      });
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form onSubmit={handleUpload} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="plate" className={fieldLabel}>
            Placa del vehículo
          </Label>
          <div className="flex gap-2">
            <Input
              id="plate"
              value={plate}
              onChange={(e) => setPlate(e.target.value.toUpperCase())}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              placeholder="XJS890"
              disabled={!!vehicle}
              className={fieldInput}
            />
            {vehicle ? (
              <button
                type="button"
                onClick={clearVehicle}
                aria-label="Cambiar vehículo"
                className={`px-3 ${secondaryButton}`}
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSearch}
                disabled={isSearching}
                aria-label="Buscar placa"
                className={`px-3 ${secondaryButton}`}
              >
                {isSearching ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>

        {!vehicle && (
          <div className="space-y-1.5">
            <Label htmlFor="serial" className={fieldLabel}>
              Serial de la empresa
            </Label>
            <Input
              id="serial"
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              placeholder="098726"
              className={fieldInput}
            />
          </div>
        )}
      </div>

      {vehicle ? (
        <dl className="grid grid-cols-2 md:grid-cols-5 gap-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm">
          {vehicleSummary.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-zinc-500 text-xs uppercase tracking-wider">{label}</dt>
              <dd className="text-zinc-200">{value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CatalogSelect label="Tipo de vehículo" field="vehicle_type_id" options={options.vehicle_type_id} value={newVehicle.vehicle_type_id} onChange={setField} />
          <CatalogSelect label="Modelo" field="model_id" options={options.model_id} value={newVehicle.model_id} onChange={setField} />
          <CatalogSelect label="Categoría de transporte" field="transport_category_id" options={options.transport_category_id} value={newVehicle.transport_category_id} onChange={setField} />
          <CatalogSelect label="Empresa" field="company_id" options={options.company_id} value={newVehicle.company_id} onChange={setField} />
          <CatalogSelect label="Servicio (opcional)" field="company_service_id" options={options.company_service_id} value={newVehicle.company_service_id} onChange={setField} />
        </div>
      )}

      <StatusMessage status={status} />

      <button
        type="submit"
        disabled={!canUpload}
        className={`w-full px-4 py-3 text-sm ${primaryButton}`}
      >
        {isUploading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <UploadCloud className="w-4 h-4" />
        )}
        {isUploading ? "Subiendo..." : "Publicar fotografía"}
      </button>
      {!markedPhoto && (
        <p className="text-xs text-zinc-500 text-center">
          Primero marca una fotografía en el paso 1.
        </p>
      )}
    </form>
  );
}

interface CatalogSelectProps {
  label: string;
  field: CatalogField;
  options: ComboBoxOption[];
  value: string | null;
  onChange: (field: CatalogField, value: string | null) => void;
}

function CatalogSelect({ label, field, options, value, onChange }: CatalogSelectProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={field} className={fieldLabel}>
        {label}
      </Label>
      <ComboBox
        id={field}
        options={options}
        value={value}
        onChange={(id) => onChange(field, id)}
        placeholder={label.replace(" (opcional)", "")}
      />
    </div>
  );
}
