import type { Metadata } from "next";
import Image from "next/image"
import buildingImage from "@/public/assets/images/building.jpg"

export const metadata: Metadata = {
  title: "Rutas de Transporte Terrestre | Autobuses de Colombia",
  description: "Consulta las principales rutas de transporte terrestre intermunicipal en Colombia. Información sobre horarios, distancias y empresas operadoras.",
};

export default function TransportRoutes() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="font-bold text-2xl">Rutas de Transporte</h1>
            <p className="font-semibold">Pagina en construcción</p>
            <div className="w-full h-full flex items-center justify-center">
                <Image src={buildingImage} alt="" />
            </div>
        </div>
    )
}