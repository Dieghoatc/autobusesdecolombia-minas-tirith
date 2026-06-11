import { vehicleQueryById } from "@/services/api/vehicleById.query";
import { 
  Building2, 
  Camera, 
  MapPin, 
  Hash, 
  Wrench, 
  Layers, 
  Cpu, 
  ShieldCheck,
  Calendar
} from "lucide-react";
import { notFound } from "next/navigation";
import { InteractiveImage } from "./components/InteractiveImage";

interface ImagePageProps {
  params: Promise<{ id: string; slug: string }>;
}

export default async function ImagePage({ params }: ImagePageProps) {
  const { id } = await params;
  const vehicle = await vehicleQueryById(Number(id));

  if (!vehicle || !vehicle.vehiclePhotos || vehicle.vehiclePhotos.length === 0) {
    notFound();
  }

  const vehicleImage = vehicle.vehiclePhotos[0].image_url;
  const plate = vehicle.plate;
  
  let companyName = "";
  let vehicleModel = "";
  let brand = "";
  let serial = "";
  let chassisBrand = "";
  let chassisName = "";
  let bodyworkBrand = "";
  let bodyworkName = "";
  let service = "";

  if (vehicle.company_id && vehicle.company) { 
    companyName = vehicle.company.company_name; 
  }
  
  if (vehicle.company_service_id && vehicle.companyService) { 
    service = vehicle.companyService.company_service_name; 
  }
  
  if (vehicle.model_id && vehicle.model) {
    vehicleModel = vehicle.model.model_name;
    
    if (vehicle.model.brand) {
      brand = vehicle.model.brand.name;
    }
    
    if (vehicle.model.chassis_id && vehicle.model.chassis) { 
      if (vehicle.model.chassis.brand) {
        chassisBrand = vehicle.model.chassis.brand.name; 
      }
      chassisName = vehicle.model.chassis.chassis_name; 
    }
    
    if (vehicle.model.bodywork_id && vehicle.model.bodywork) { 
      if (vehicle.model.bodywork.brand) {
        bodyworkBrand = vehicle.model.bodywork.brand.name; 
      }
      bodyworkName = vehicle.model.bodywork.bodywork_name; 
    }
    
    if (vehicle.company_serial_id && vehicle.companySerial) { 
      serial = vehicle.companySerial.company_serial_code; 
    }
    
    if (vehicle.company_service_id && vehicle.companyService) { 
      service = vehicle.companyService.company_service_name; 
    }
  }

  const photographer = vehicle?.vehiclePhotos[0]?.photographer?.name || "Desconocido";
  const location = vehicle?.vehiclePhotos[0]?.location || "Desconocido";
  const dateTaken = vehicle?.vehiclePhotos[0]?.created_at 
    ? new Date(vehicle.vehiclePhotos[0].created_at).toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    : "";

  return (
    <section className="w-full py-8 md:py-12 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-7xl mx-auto items-stretch">
        
        {/* Left: Photography Stage Viewport */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <InteractiveImage 
            src={vehicleImage} 
            alt={`${brand} ${vehicleModel}`} 
          />
        </div>

        {/* Right: Technical & Photographic Specification Dashboard */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            
            {/* Title / Brand Header */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-3">
                <Cpu className="w-3.5 h-3.5" />
                Especificaciones del Modelo
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none">
                {brand && <span className="text-zinc-500 font-medium mr-2">{brand}</span>}
                <span>{vehicleModel || "Modelo Desconocido"}</span>
              </h1>
            </div>

            {/* Operating Company Pill */}
            <div className="flex items-center gap-4 bg-zinc-900/40 border border-zinc-800/40 backdrop-blur-md rounded-2xl p-4">
              <div className="p-3 bg-zinc-950/80 border border-zinc-800/80 rounded-xl text-amber-500">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-0.5">
                  Empresa Operadora
                </p>
                <h2 className="text-white text-lg font-bold truncate">
                  {companyName || "Empresa No Especificada"}
                </h2>
              </div>
            </div>

            {/* Technical Detail Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Chassis Card */}
              {chassisName && (
                <div className="bg-zinc-900/20 border border-zinc-850/60 backdrop-blur-sm rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-amber-500">
                    <Wrench className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Chasis</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base leading-snug">
                      {chassisBrand && <span className="text-zinc-400 font-normal mr-1">{chassisBrand}</span>}
                      {chassisName}
                    </h3>
                  </div>
                </div>
              )}

              {/* Bodywork Card */}
              {bodyworkName && (
                <div className="bg-zinc-900/20 border border-zinc-850/60 backdrop-blur-sm rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-amber-500">
                    <Layers className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Carrocería</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base leading-snug">
                      {bodyworkBrand && <span className="text-zinc-400 font-normal mr-1">{bodyworkBrand}</span>}
                      {bodyworkName}
                    </h3>
                  </div>
                </div>
              )}

              {/* Photographer Card */}
              <div className="bg-zinc-900/20 border border-zinc-850/60 backdrop-blur-sm rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-500">
                  <Camera className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Fotógrafo</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base leading-snug">
                    {photographer}
                  </h3>
                  {location && (
                    <p className="text-zinc-500 text-xs flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{location}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Identification details card (Plate, Serial, Service) */}
              <div className="bg-zinc-900/20 border border-zinc-850/60 backdrop-blur-sm rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-500">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Identificación</span>
                </div>
                <div className="space-y-2">
                  {plate && (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-zinc-500 text-xs">Placa</span>
                      <span className="bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded text-xs font-mono font-bold uppercase border border-amber-500/25">
                        {plate}
                      </span>
                    </div>
                  )}
                  {serial && (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-zinc-500 text-xs">Interno</span>
                      <span className="text-zinc-300 text-xs font-mono font-semibold uppercase">
                        {serial}
                      </span>
                    </div>
                  )}
                  {service && (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-zinc-500 text-xs">Servicio</span>
                      <span className="text-zinc-300 text-xs font-medium truncate max-w-[120px]" title={service}>
                        {service}
                      </span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Shooting Date Footer Info */}
          {dateTaken && (
            <div className="text-zinc-600 text-xs flex items-center gap-1.5 border-t border-zinc-900 pt-4">
              <Calendar className="w-3.5 h-3.5" />
              <span>Publicado el {dateTaken}</span>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
