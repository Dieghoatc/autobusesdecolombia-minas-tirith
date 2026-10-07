"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Check, Copy, Download, Heart, QrCode, X } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { cn } from "@/lib/utils";
import qrImage from "@/public/assets/donations/breb-qr.png";

const BREB_KEY = "@tejedor269";
const QR_DOWNLOAD = "/assets/donations/breb-qr-bancolombia.png";

// After closing the banner it stays collapsed (floating QR button) this long
const DISMISS_DAYS = 7;
const STORAGE_KEY = "donation-banner-dismissed-until";

// Private / utility pages where asking for donations doesn't fit
const HIDDEN_PREFIXES = ["/dashboard", "/login"];

type BannerState = "hidden" | "expanded" | "collapsed";

function isDismissed(): boolean {
  try {
    return Number(localStorage.getItem(STORAGE_KEY)) > Date.now();
  } catch {
    return false;
  }
}

function rememberDismissal() {
  try {
    const until = Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, String(until));
  } catch {
    // Storage blocked: the banner just shows again next visit
  }
}

export function DonationBanner() {
  const pathname = usePathname();
  // Decided after mount (localStorage), so there is no flash for visitors who closed it
  const [state, setState] = useState<BannerState>("hidden");

  useEffect(() => {
    setState(isDismissed() ? "collapsed" : "expanded");
  }, []);

  if (state === "hidden" || HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  if (state === "collapsed") {
    return (
      <div className="fixed bottom-4 right-4 z-30">
        <DonationPopover>
          <button
            type="button"
            aria-label="Apoya el proyecto con una donación"
            title="Apoya el proyecto"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-400/30 bg-zinc-950/90 text-amber-300 shadow-lg shadow-black/50 backdrop-blur-md transition-transform hover:scale-105"
          >
            <QrCode className="h-5 w-5" />
          </button>
        </DonationPopover>
      </div>
    );
  }

  return (
    <>
      {/* Reserves the banner's height so it never covers the end of the page */}
      <div aria-hidden className="h-24 sm:h-20" />

      <aside
        aria-label="Apoya Autobuses de Colombia"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-white/[0.08] bg-zinc-950/90 backdrop-blur-xl animate-in slide-in-from-bottom duration-500"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:px-6">
          <Heart aria-hidden className="hidden h-5 w-5 flex-shrink-0 text-amber-400 sm:block" />
          <p className="flex-1 text-xs leading-snug text-zinc-300 sm:text-sm">
            <span className="font-semibold text-white">
              Autobuses de Colombia es un proyecto independiente.
            </span>{" "}
            <span className="hidden sm:inline">
              Si disfrutas de esta pasión, ayúdanos con un aporte: seguiremos trabajando en nuevas mejoras y funcionalidades.
            </span>
            <span className="sm:hidden">Ayúdanos a mantenerlo vivo con un aporte.</span>
          </p>

          <DonationPopover>
            <button
              type="button"
              className="flex flex-shrink-0 items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition-colors hover:bg-amber-400"
            >
              <QrCode aria-hidden className="h-4 w-4" />
              Donar<span className="hidden sm:inline"> con QR</span>
            </button>
          </DonationPopover>

          <button
            type="button"
            onClick={() => {
              rememberDismissal();
              setState("collapsed");
            }}
            aria-label="Cerrar aviso de donaciones"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </aside>
    </>
  );
}

function DonationPopover({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);

  async function copyKey() {
    try {
      await navigator.clipboard.writeText(BREB_KEY);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the key is visible to copy by hand
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        sideOffset={12}
        collisionPadding={12}
        className="w-72 rounded-2xl border-zinc-800 bg-zinc-950 p-4 text-white shadow-2xl shadow-black/60"
      >
        <p className="text-sm font-semibold">Apoya el proyecto</p>
        <p className="mt-1 text-xs leading-snug text-zinc-400">
          Escanea el código con la app de tu banco (Bre-B). Cualquier monto nos ayuda a mantener los servidores y seguir publicando contenido.
        </p>

        <div className="mt-3 overflow-hidden rounded-xl bg-white p-2">
          <Image
            src={qrImage}
            alt={`Código QR Bre-B para donar a Autobuses de Colombia, llave ${BREB_KEY}`}
            className="h-auto w-full"
            sizes="256px"
            unoptimized
          />
        </div>

        <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2">
          <span className="text-xs text-zinc-400">
            Llave Bre-B: <span className="font-semibold text-white">{BREB_KEY}</span>
          </span>
          <button
            type="button"
            onClick={copyKey}
            aria-label="Copiar llave Bre-B"
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
              copied ? "text-emerald-400" : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
            )}
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
        <p role="status" className="sr-only">
          {copied ? "Llave copiada" : ""}
        </p>

        <a
          href={QR_DOWNLOAD}
          download="donacion-autobuses-de-colombia-breb.png"
          className="mt-2 flex items-center justify-center gap-1.5 py-1 text-xs text-zinc-400 transition-colors hover:text-white"
        >
          <Download aria-hidden className="h-3.5 w-3.5" />
          Descargar QR (para pagar desde el celular)
        </a>
      </PopoverContent>
    </Popover>
  );
}
