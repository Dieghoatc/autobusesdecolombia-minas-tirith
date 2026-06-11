import type { Metadata } from "next";
import { FormContact } from "./components/FormContact";
import { ContactInfo } from "./components/ContactInfo";

export const metadata: Metadata = {
  title: "Contáctanos | Autobuses de Colombia",
  description: "Ponte en contacto con Autobuses de Colombia para explorar alianzas, patrocinios, oportunidades de negocio o enviarnos sugerencias.",
};

export default function ContactPage() { 
  return (
    <div className="w-full min-h-[85vh] flex items-center justify-center py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 w-full items-center">
        
        {/* Left Side: Contact Information & Cards */}
        <div className="lg:col-span-6 w-full space-y-6">
          <ContactInfo />
        </div>

        {/* Right Side: Glassmorphic Contact Form */}
        <div className="lg:col-span-6 w-full">
          <div className="bg-zinc-900/20 border border-zinc-800/40 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider border-b border-zinc-800/60 pb-3">
              Enviar un Mensaje
            </h2>
            <FormContact />
          </div>
        </div>

      </div>
    </div>
  );
}
