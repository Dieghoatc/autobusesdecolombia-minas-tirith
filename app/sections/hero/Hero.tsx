import Image from "next/image"

import logo from "@/assets/abc_primary_logo.svg"

export function Hero() {
    return (
        <section className="w-full py-6 px-4">
            <div className="max-w-4xl mx-auto text-center space-y-3">
                <div className="relative w-48 h-48 mx-auto">
                    <Image
                        src={logo}
                        alt="Autobuses de Colombia"
                        fill
                        className="object-contain"
                    />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    Autobuses de Colombia
                </h1>
                <p className="text-muted-foreground">
                    El mayor banco de imágenes de autobuses y transporte público en Colombia
                </p>
            </div>
        </section>
    )
}