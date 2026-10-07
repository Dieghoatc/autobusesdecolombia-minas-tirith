import type { Metadata } from "next";
import Image from "next/image"
import buildingImage from "@/public/assets/images/building.jpg"

export const metadata: Metadata = {
  title: "Terminales de Transporte en Colombia | Autobuses de Colombia",
  description: "Encuentra información sobre las terminales de transporte terrestre de Colombia. Direcciones, teléfonos, horarios de atención y empresas asociadas.",
  robots: { index: false, follow: true },
};

export default function TransportTerminals() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="font-bold text-2xl">Terminales de Transporte</h1>
            <p className="font-semibold">Pagina en construcción</p>
            <div className="w-full h-full flex items-center justify-center">
                <Image src={buildingImage} alt="" />
            </div>
        </div>
    )
}