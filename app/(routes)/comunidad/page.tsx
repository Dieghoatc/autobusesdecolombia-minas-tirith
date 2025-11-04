import Image from "next/image"
import buildingImage from "@/public/assets/images/building.jpg"

export default function Comunity() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="font-bold text-2xl">Comunidad</h1>
            <p className="font-semibold">Pagina en construcción</p>
            <div className="w-full h-full flex items-center justify-center">
                <Image src={buildingImage} alt="" />
            </div>
        </div>
    )
}