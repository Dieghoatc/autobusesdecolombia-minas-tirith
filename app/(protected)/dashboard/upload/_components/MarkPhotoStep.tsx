"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Download, Loader2, RotateCcw, Sparkles, Stamp } from "lucide-react";

import { Checkbox } from "@/app/components/ui/checkbox";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  fieldInput,
  fieldLabel,
  primaryButton,
  secondaryButton,
} from "@/lib/constants/formStyles";

import { ComboBox, type ComboBoxOption } from "../../_components/ComboBox";
import { ImageCompare } from "../../_components/ImageCompare";
import { ImagePreviewDialog } from "../../_components/ImagePreviewDialog";
import { StatusMessage, type Status } from "../../_components/StatusMessage";
import { markPhoto, optimizePhoto } from "../_lib/api";
import { useObjectUrl } from "../_lib/useObjectUrl";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
// Must match the API limit on /photo/mark, /photo/optimize and /vehicle
const MAX_BYTES = 5 * 1024 * 1024;
// Same default AVIF quality as squoosh.app (and the API)
const DEFAULT_QUALITY = 50;
// Wait for the slider to stop before re-encoding
const REENCODE_DELAY_MS = 500;

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

interface MarkPhotoStepProps {
  photographerOptions: ComboBoxOption[];
  cityOptions: ComboBoxOption[];
  photographerId: string | null;
  onPhotographerChange: (id: string | null) => void;
  cityId: string | null;
  onCityChange: (id: string | null) => void;
  photographerName: string | null;
  location: string | null;
  markedPhoto: Blob | null;
  onMarked: (photo: Blob | null) => void;
}

export function MarkPhotoStep({
  photographerOptions,
  cityOptions,
  photographerId,
  onPhotographerChange,
  cityId,
  onCityChange,
  photographerName,
  location,
  markedPhoto,
  onMarked,
}: MarkPhotoStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isMarking, setIsMarking] = useState(false);
  // Off: only convert the photo to an optimized AVIF, without watermark
  const [withWatermark, setWithWatermark] = useState(true);
  const [quality, setQuality] = useState(DEFAULT_QUALITY);
  const [status, setStatus] = useState<Status | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  // Only the latest request may update the result (re-encodes can overlap)
  const requestIdRef = useRef(0);
  const reencodeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(reencodeTimerRef.current), []);

  const originalUrl = useObjectUrl(file);
  const markedUrl = useObjectUrl(markedPhoto);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null;
    setStatus(null);
    setDimensions(null);
    onMarked(null);

    if (selected && !ACCEPTED_TYPES.includes(selected.type)) {
      setStatus({ type: "error", message: "Solo se permiten archivos JPG, PNG, AVIF o WebP" });
      setFile(null);
      return;
    }
    if (selected && selected.size > MAX_BYTES) {
      setStatus({ type: "error", message: "El archivo debe ser menor a 5MB" });
      setFile(null);
      return;
    }
    setFile(selected);
  }

  function handleWatermarkChange(checked: boolean) {
    setWithWatermark(checked);
    // The processed photo no longer matches the selected option
    setStatus(null);
    onMarked(null);
  }

  async function processPhoto(avifQuality: number) {
    if (!file) return;
    const requestId = ++requestIdRef.current;

    setIsMarking(true);
    setStatus(null);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("quality", String(avifQuality));

      let result: Blob;
      if (withWatermark && photographerName && location) {
        formData.append("author", photographerName);
        formData.append("location", location);
        result = await markPhoto(formData);
      } else {
        result = await optimizePhoto(formData);
      }
      if (requestId !== requestIdRef.current) return;

      onMarked(result);
      setStatus({
        type: "success",
        message: withWatermark ? "Foto marcada exitosamente" : "Foto optimizada exitosamente",
      });
    } catch (error) {
      if (requestId !== requestIdRef.current) return;
      setStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Error al procesar la foto",
      });
    } finally {
      if (requestId === requestIdRef.current) setIsMarking(false);
    }
  }

  function handleMark() {
    if (canMark) processPhoto(quality);
  }

  // Like squoosh.app: once there is a result, changing the quality re-encodes it
  function handleQualityChange(value: number) {
    setQuality(value);
    clearTimeout(reencodeTimerRef.current);
    if (markedPhoto) {
      reencodeTimerRef.current = setTimeout(() => processPhoto(value), REENCODE_DELAY_MS);
    }
  }

  function handleReset() {
    clearTimeout(reencodeTimerRef.current);
    requestIdRef.current++;
    setIsMarking(false);
    setFile(null);
    setDimensions(null);
    setStatus(null);
    onMarked(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleDownload() {
    if (!markedUrl) return;
    const link = document.createElement("a");
    link.href = markedUrl;
    link.download = `${withWatermark ? "marked" : "optimized"}_photo_${Date.now()}.avif`;
    link.click();
  }

  // The photographer and city are only needed here for the watermark text
  const canMark =
    !!file && !isMarking && (!withWatermark || (!!photographerName && !!location));

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="photographer" className={fieldLabel}>
            Fotógrafo/a
          </Label>
          <ComboBox
            id="photographer"
            options={photographerOptions}
            value={photographerId}
            onChange={onPhotographerChange}
            placeholder="Fotógrafo/a"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="city" className={fieldLabel}>
            Ciudad
          </Label>
          <ComboBox
            id="city"
            options={cityOptions}
            value={cityId}
            onChange={onCityChange}
            placeholder="Ciudad"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="photo" className={fieldLabel}>
          Fotografía
        </Label>
        <Input
          ref={fileInputRef}
          id="photo"
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          onChange={handleFileChange}
          className={`file:text-zinc-300 ${fieldInput}`}
        />
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="with-watermark"
          checked={withWatermark}
          onCheckedChange={(checked) => handleWatermarkChange(checked === true)}
          disabled={isMarking}
          className="mt-0.5 border-zinc-600 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 data-[state=checked]:text-black focus-visible:ring-amber-500/40"
        />
        <div className="space-y-0.5">
          <Label htmlFor="with-watermark" className="text-sm text-zinc-200 cursor-pointer">
            Agregar marca de agua
          </Label>
          <p className="text-xs text-zinc-500">
            {withWatermark
              ? "Agrega el logo, el fotógrafo/a y la ciudad, y convierte la foto a AVIF en su resolución original."
              : "Solo convierte la foto a AVIF, en su resolución original y sin marca de agua."}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="quality" className={fieldLabel}>
            Calidad AVIF
          </Label>
          <span className="text-sm font-semibold tabular-nums text-amber-400">
            {quality}
          </span>
        </div>
        <input
          id="quality"
          type="range"
          min={1}
          max={100}
          step={1}
          value={quality}
          onChange={(event) => handleQualityChange(Number(event.target.value))}
          className="w-full accent-amber-500 cursor-pointer"
        />
        <p className="text-xs text-zinc-500">
          {DEFAULT_QUALITY} es el valor estándar de Squoosh: reduce mucho el peso sin
          diferencia visible. Valores más altos pesan más.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleMark}
          disabled={!canMark}
          className={`flex-1 px-4 py-2.5 text-sm ${primaryButton}`}
        >
          {isMarking ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : withWatermark ? (
            <Stamp className="w-4 h-4" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          {withWatermark
            ? isMarking
              ? "Marcando..."
              : "Marcar fotografía"
            : isMarking
              ? "Optimizando..."
              : "Optimizar fotografía"}
        </button>
        {file && (
          <button
            type="button"
            onClick={handleReset}
            disabled={isMarking}
            className={`px-4 py-2.5 text-sm ${secondaryButton}`}
          >
            <RotateCcw className="w-4 h-4" />
            Nueva foto
          </button>
        )}
      </div>

      <StatusMessage status={status} />

      {originalUrl && markedUrl && file && markedPhoto ? (
        <div className="space-y-3">
          <div className="relative">
            <ImageCompare
              beforeSrc={originalUrl}
              afterSrc={markedUrl}
              beforeLabel="Original"
              afterLabel={withWatermark ? "Con marca" : "AVIF"}
            />
            {isMarking && (
              <div className="absolute inset-x-0 bottom-0 top-9 flex items-center justify-center rounded-xl bg-black/40">
                <Loader2 className="w-6 h-6 animate-spin text-white" />
              </div>
            )}
          </div>
          <SizeComparison
            original={file}
            result={markedPhoto}
            dimensions={dimensions}
            action={
              <button
                type="button"
                onClick={handleDownload}
                className={`px-3 py-1.5 text-xs ${secondaryButton}`}
              >
                <Download className="w-3.5 h-3.5" />
                Descargar
              </button>
            }
          />
        </div>
      ) : (
        originalUrl && (
          <PhotoPreview
            title="Original"
            src={originalUrl}
            onOpen={() => setPreviewSrc(originalUrl)}
            onLoadDimensions={setDimensions}
          />
        )
      )}

      <ImagePreviewDialog
        src={previewSrc}
        alt="Vista previa de la fotografía"
        onClose={() => setPreviewSrc(null)}
      />
    </div>
  );
}

interface PhotoPreviewProps {
  title: string;
  src: string;
  onOpen: () => void;
  action?: React.ReactNode;
  onLoadDimensions?: (dimensions: { width: number; height: number }) => void;
}

function PhotoPreview({ title, src, onOpen, action, onLoadDimensions }: PhotoPreviewProps) {
  return (
    <figure className="space-y-2">
      <figcaption className="flex items-center justify-between">
        <span className={fieldLabel}>{title}</span>
        {action}
      </figcaption>
      <button
        type="button"
        onClick={onOpen}
        className="relative block w-full aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800/60 bg-zinc-950/60"
      >
        <Image
          src={src}
          alt={title}
          fill
          unoptimized
          className="object-contain"
          onLoad={(event) =>
            onLoadDimensions?.({
              width: event.currentTarget.naturalWidth,
              height: event.currentTarget.naturalHeight,
            })
          }
        />
      </button>
    </figure>
  );
}

interface SizeComparisonProps {
  original: File;
  result: Blob;
  dimensions: { width: number; height: number } | null;
  action?: React.ReactNode;
}

// Size before and after, like the panels at the bottom of squoosh.app
function SizeComparison({ original, result, dimensions, action }: SizeComparisonProps) {
  const change = Math.round((1 - result.size / original.size) * 100);
  const originalFormat = original.type.replace("image/", "").toUpperCase();
  const resolution = dimensions ? `${dimensions.width} × ${dimensions.height}` : null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-stretch gap-3">
      <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/60 px-4 py-3">
        <p className={fieldLabel}>Original</p>
        <p className="mt-1 text-lg font-bold text-white tabular-nums">
          {formatBytes(original.size)}
        </p>
        <p className="text-xs text-zinc-500">
          {originalFormat}
          {resolution && ` · ${resolution}`}
        </p>
      </div>

      <div className="flex items-center justify-center">
        <span
          className={`rounded-full px-3 py-1 text-sm font-bold tabular-nums ${
            change > 0
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-amber-500/15 text-amber-400"
          }`}
        >
          {change > 0 ? `−${change}%` : `+${Math.abs(change)}%`}
        </span>
      </div>

      <div className="rounded-xl border border-amber-500/30 bg-zinc-950/60 px-4 py-3">
        <div className="flex items-start justify-between gap-2">
          <p className={fieldLabel}>Resultado</p>
          {action}
        </div>
        <p className="mt-1 text-lg font-bold text-white tabular-nums">
          {formatBytes(result.size)}
        </p>
        <p className="text-xs text-zinc-500">
          AVIF
          {change <= 0 && " · pesa más que el original, prueba una calidad menor"}
        </p>
      </div>
    </div>
  );
}
