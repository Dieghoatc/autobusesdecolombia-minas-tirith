import Image from "next/image"
import albertoTejedor from "@/public/assets/images/alberto_tejedor_villamizar.png"
import chevroletC10 from "@/public/assets/images/chevrolet_c10.avif"

import styles from "./AboutUs.module.css"

export default function AboutUs() {
    return (
        <main className="w-full flex flex-col items-center bg-gradient-to-b from-black via-neutral-950 to-black py-12 px-4">
            <section className="flex flex-col items-center justify-center w-full max-w-4xl">
                <div className="relative mb-8">
                    <div className={`${styles.image} w-40 h-60 shadow-2xl shadow-white/20 transition-transform hover:scale-105 duration-300`}>
                        <Image 
                            src={albertoTejedor} 
                            alt="Alberto Tejedor Villamizar" 
                            width={500} 
                            height={500}
                            className="object-cover"
                        />
                    </div>                    
                </div>
                <div className="w-full bg-neutral-900/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-neutral-800 overflow-hidden">
                    <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 p-6 text-center border-b border-neutral-800">
                        <h1 className="font-bold text-white text-3xl md:text-4xl mb-2">
                            Alberto Tejedor Villamizar
                        </h1>
                        <p className="text-neutral-400 text-sm md:text-base">
                            Fundador de Autobuses de Colombia
                        </p>
                    </div>

                    <div className="text-neutral-300 p-6 md:p-8 flex flex-col gap-6">
                        <div className="bg-neutral-800/40 rounded-xl p-6 border-l-4 border-white">
                            <p className="leading-relaxed">
                                <span className="font-bold text-white text-lg">Autobuses de Colombia</span> nace con el fin de ofrecer otra visión respecto al mundo del transporte en el país: tener un portal de fotografía, noticias, novedades e información dirigido a una comunidad que comparte la pasión por los autobuses colombianos.
                            </p>
                        </div>

                        <p className="leading-relaxed">
                            Hace <span className="font-semibold text-white text-lg">más de 20 años</span>, se creó una comunidad que compartía este hobby. En ella, se establecieron diferentes grupos a los que se unieron muchas personas, entre ellas conductores, mecánicos, propietarios, empresas e incluso marcas nacionales e internacionales del sector transporte.
                        </p>

                        <p className="leading-relaxed">
                            Este espacio es un punto de encuentro donde el mecánico ofrece sus servicios, los carroceros promueven sus productos, los concesionarios sus chasis y las empresas de transporte promocionan sus servicios. Participan tanto propietarios como conductores, y lo principal: los usuarios del transporte, que es la base mediante el uso de servicios, sus fotografías, discusiones y aportes que ayudan a construir este mundo del transporte.
                        </p>

                        <hr className="w-full border-neutral-700" />

                        <div className="bg-gradient-to-r from-neutral-800/30 to-transparent rounded-xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-white rounded"></span>
                                Mi Historia
                            </h2>
                            <p className="leading-relaxed">
                                Yo, <span className="font-semibold text-white">Alberto Tejedor Villamizar</span>, como conductor y propietario de transporte público en Bogotá, he compartido esta afición desde hace aproximadamente 40 años. Trabajé por más de siete años conduciendo colectivos en la antigua <span className="font-semibold text-neutral-200">Cootras Kennedy</span>. Recuerdo que empecé con un busetón modelo &apos;77 de mi padre, en la <span className="font-semibold text-neutral-200">Rápido Pensilvania</span>, y después conduje en Cootras Kennedy una camioneta <span className="font-semibold text-neutral-200">Chevrolet C10</span> y, posteriormente, una <span className="font-semibold text-neutral-200">Luv 1600</span>.
                            </p>
                        </div>

                        <div className="w-full flex flex-col justify-center items-center rounded-2xl overflow-hidden shadow-2xl border-2 border-neutral-800 hover:border-white transition-all duration-300 group">
                            <div className="relative w-full overflow-hidden bg-black">
                                <Image
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    src={chevroletC10}
                                    alt="Chevrolet C10 tomada en el barrio Mandalay de Bogotá"
                                    width={500}
                                    height={500}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <figcaption className="p-4 text-sm text-center bg-neutral-900/90 w-full border-t border-neutral-800">
                                <span className="text-white font-semibold">Chevrolet C10</span> <span className="text-neutral-400">tomada en el barrio Mandalay de Bogotá</span>
                            </figcaption>
                        </div>

                        <p className="leading-relaxed">
                            Posteriormente hice parte de la comunidad <span className="font-semibold text-neutral-200">&quot;busología&quot;</span> donde apasionados por estos temas del transporte nos reunimos para compartir fotografías, conocer personas y compartir experiencias relacionadas con esta pasión construyendo las primeras comunidades.
                        </p>

                        <hr className="w-full border-neutral-700" />

                        <div className="bg-gradient-to-r from-neutral-800/30 to-transparent rounded-xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-white rounded"></span>
                                Mis Proyectos
                            </h2>
                            <p className="leading-relaxed mb-4">
                                Mi primera página fue <span className="font-semibold text-neutral-200">ATVBuses</span> en el antiguo portal llamada Terra. Luego creó la página la antigua <span className="font-semibold text-neutral-200">Internationalbuscolombia.com</span> donde se empezó a tener una gran comunidad muy interesada en ampliar toda la información de actualidad junto a <span className="font-semibold text-neutral-200">busesantiguosdecolombia</span>, <span className="font-semibold text-neutral-200">museovirtualdeltransporte</span>, <span className="font-semibold text-neutral-200">taxisantiguosdecolombia</span>, <span className="font-semibold text-neutral-200">adcnoticiasdeltransporte</span> y la que hoy en día conocemos como <span className="font-semibold text-neutral-200">nuestros recuerdos</span>.
                            </p>
                        </div>

                        <div className="bg-gradient-to-r from-neutral-800/50 to-neutral-900/50 rounded-xl p-6 border border-neutral-700">
                            <p className="leading-relaxed text-center">
                                Gracias a estas experiencias me surgió la idea de crear <span className="text-white font-bold text-lg">Autobuses de Colombia</span>, un espacio siempre abierto a la comunidad y gracias amigos afines que ayudaron a construir el portal, donde se enfrentan diferentes retos que hoy en día con un nuevo impulso queremos seguir siendo una alternativa en este mundo del transporte.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}