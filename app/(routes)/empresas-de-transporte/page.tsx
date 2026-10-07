import { Building2, Map, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Empresas de Transporte | Autobuses de Colombia",
  description: "Directorio de empresas de transporte público en Colombia.",
};

const EMPRESAS_PLACEHOLDER = [
  { id: 1, name: "Expreso Bolivariano", routes: 120, type: "Intermunicipal" },
  { id: 2, name: "Copetran", routes: 95, type: "Intermunicipal" },
  { id: 3, name: "Berlinas del Fonce", routes: 80, type: "Intermunicipal" },
  { id: 4, name: "Flota La Macarena", routes: 45, type: "Intermunicipal" },
  { id: 5, name: "TransMilenio", routes: 150, type: "Masivo" },
  { id: 6, name: "SITP", routes: 300, type: "Urbano" },
];

export default function TransportCompanies() {
  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold text-foreground tracking-tight">
          Empresas de Transporte
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explora el directorio de las principales empresas de transporte público, masivo e intermunicipal en Colombia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EMPRESAS_PLACEHOLDER.map((empresa) => (
          <div 
            key={empresa.id}
            className="group bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/30 hover:bg-white/[0.04] p-6 rounded-2xl transition-all cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                  {empresa.name}
                </h3>
                <span className="inline-block px-2.5 py-1 rounded-md bg-white/[0.06] text-xs font-medium text-gray-300 mb-4">
                  {empresa.type}
                </span>
                
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Map className="w-4 h-4" />
                    <span>{empresa.routes} Rutas</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>Directorio</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center p-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/20">
        <h2 className="text-xl font-semibold text-white mb-2">¿Representas a una empresa?</h2>
        <p className="text-gray-400 mb-6 max-w-xl mx-auto">
          Únete a nuestro directorio y conecta con la mayor comunidad de transporte en Colombia.
        </p>
        <button className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-2.5 px-6 rounded-full transition-colors">
          Registrar Empresa
        </button>
      </div>
    </div>
  );
}