import type { Metadata } from "next";
import Image from "next/image"
import buildingImage from "@/public/assets/images/building.jpg"

export const metadata: Metadata = {
  title: "Destinos de Viaje en Colombia | Autobuses de Colombia",
  description: "Explora los principales destinos turísticos y de viaje en Colombia. Encuentra información sobre rutas de autobuses, terminales y empresas de transporte para planear tu viaje.",
};

export default function Destinations() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="font-bold text-2xl">Destinos en Colombia</h1>
            <p className="font-semibold">Pagina en construcción</p>
            <div className="w-full h-full flex items-center justify-center">
                <Image src={buildingImage} alt="" />
            </div>
        </div>
    )
}