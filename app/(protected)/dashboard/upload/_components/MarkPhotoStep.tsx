"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Download, Loader2, RotateCcw, Stamp } from "lucide-react";

import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  fieldInput,
  fieldLabel,
  primaryButton,
  secondaryButton,
} from "@/lib/constants/formStyles";

import { ComboBox, type ComboBoxOption } from "../../_components/ComboBox";
import { ImagePreviewDialog } from "../../_components/ImagePreviewDialog";
import { StatusMessage, type Status } from "../../_components/StatusMessage";
import { markPhoto } from "../_lib/api";
import { useObjectUrl } from "../_lib/useObjectUrl";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_BYTES = 10 * 1024 * 1024;

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
  const [status, setStatus] = useState<Status | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const originalUrl = useObjectUrl(file);
  const markedUrl = useObjectUrl(markedPhoto);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null;
    setStatus(null);
    onMarked(null);

    if (selected && !ACCEPTED_TYPES.includes(selected.type)) {
      setStatus({ type: "error", message: "Solo se permiten archivos JPG, PNG, AVIF o WebP" });
      setFile(null);
      return;
    }
    if (selected && selected.size > MAX_BYTES) {
      setStatus({ type: "error", message: "El archivo debe ser menor a 10MB" });
      setFile(null);
      return;
    }
    setFile(selected);
  }

  async function handleMark() {
    if (!file || !photographerName || !location) return;

    setIsMarking(true);
    setStatus(null);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("author", photographerName);
      formData.append("location", location);

      onMarked(await markPhoto(formData));
      setStatus({ type: "success", message: "Foto marcada exitosamente" });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Error al marcar la foto",
      });
    } finally {
      setIsMarking(false);
    }
  }

  function handleReset() {
    setFile(null);
    setStatus(null);
    onMarked(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleDownload() {
    if (!markedUrl) return;
    const link = document.createElement("a");
    link.href = markedUrl;
    link.download = `marked_photo_${Date.now()}.avif`;
    link.click();
  }

  const canMark = !!file && !!photographerName && !!location && !isMarking;

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

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleMark}
          disabled={!canMark}
          className={`flex-1 px-4 py-2.5 text-sm ${primaryButton}`}
        >
          {isMarking ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Stamp className="w-4 h-4" />
          )}
          {isMarking ? "Marcando..." : "Marcar fotografía"}
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

      {originalUrl && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PhotoPreview
            title="Original"
            src={originalUrl}
            onOpen={() => setPreviewSrc(originalUrl)}
          />
          {markedUrl && (
            <PhotoPreview
              title="Con marca de agua"
              src={markedUrl}
              onOpen={() => setPreviewSrc(markedUrl)}
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
          )}
        </div>
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
}

function PhotoPreview({ title, src, onOpen, action }: PhotoPreviewProps) {
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
        <Image src={src} alt={title} fill unoptimized className="object-contain" />
      </button>
    </figure>
  );
}
