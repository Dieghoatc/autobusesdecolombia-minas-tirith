"use client";

import { useState } from "react";
import { Mail, Copy, Check, Clock, Sparkles } from "lucide-react";
import { useToast } from "@/lib/hooks/use-toast";

export function ContactInfo() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const emailAddress = "autobusesdecolombiaoficial@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      toast({
        title: "Copiado",
        description: "Correo electrónico copiado al portapapeles.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-4 animate-in fade-in duration-300">
          <Sparkles className="w-3.5 h-3.5" />
          Hablemos de Transporte
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none mb-6">
          Ponte en <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">contacto</span> con nosotros
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed">
          En Autobuses de Colombia, nuestra visión es consolidar el portal líder en 
          fotografía, actualidad e información del sector de transporte público en el país. 
          Si quieres ser parte de este gran proyecto, contáctanos para explorar alianzas, 
          patrocinios u oportunidades.
        </p>
      </div>

      <div className="bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-md rounded-2xl p-6 space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-zinc-950/80 border border-zinc-800/80 rounded-xl text-amber-500">
            <Mail className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-1">
              Correo Oficial
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium text-base truncate select-all">
                {emailAddress}
              </span>
              <button
                onClick={handleCopy}
                className="p-1.5 hover:bg-white/[0.08] text-zinc-400 hover:text-white rounded-lg transition-colors flex-shrink-0"
                title="Copiar correo"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 pt-4 border-t border-zinc-800/40">
          <div className="p-3 bg-zinc-950/80 border border-zinc-800/80 rounded-xl text-amber-500">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-1">
              Tiempo de Respuesta
            </h3>
            <p className="text-white text-base font-medium">
              Generalmente respondemos en menos de 24 horas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
